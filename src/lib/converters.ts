import { PDFDocument, degrees, rgb, StandardFonts, PDFFont } from 'pdf-lib';

// ─── Helpers ────────────────────────────────────────────────────────────────

async function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result as ArrayBuffer);
    fr.onerror = rej;
    fr.readAsArrayBuffer(file);
  });
}

function downloadBytes(bytes: Uint8Array, filename: string, mime = 'application/pdf') {
  const blob = new Blob([bytes], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export type ProgressCallback = (pct: number, msg: string) => void;

// ─── Image → PDF ────────────────────────────────────────────────────────────

export async function imagesToPdf(
  files: File[],
  onProgress?: ProgressCallback,
): Promise<void> {
  const pdf = await PDFDocument.create();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    onProgress?.(Math.round((i / files.length) * 80), `Processing ${file.name}…`);

    const bytes = await readFileAsArrayBuffer(file);
    const type = file.type;
    let image;

    if (type === 'image/jpeg' || type === 'image/jpg') {
      image = await pdf.embedJpg(bytes);
    } else if (type === 'image/png') {
      image = await pdf.embedPng(bytes);
    } else if (type === 'image/webp') {
      // Convert webp → png via canvas
      const blob = new Blob([bytes], { type: 'image/webp' });
      const bmp = await createImageBitmap(blob);
      const canvas = document.createElement('canvas');
      canvas.width = bmp.width;
      canvas.height = bmp.height;
      canvas.getContext('2d')!.drawImage(bmp, 0, 0);
      const pngBlob = await new Promise<Blob>((r) => canvas.toBlob((b) => r(b!), 'image/png'));
      const pngBuf = await pngBlob.arrayBuffer();
      image = await pdf.embedPng(pngBuf);
    } else {
      throw new Error(`Unsupported image type: ${type}`);
    }

    const page = pdf.addPage([image.width, image.height]);
    page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
  }

  onProgress?.(90, 'Saving PDF…');
  const bytes = await pdf.save();
  onProgress?.(100, 'Done!');

  const name = files.length === 1
    ? files[0].name.replace(/\.[^.]+$/, '') + '.pdf'
    : 'images-converted.pdf';
  downloadBytes(bytes, name);
}

// ─── Merge PDFs ─────────────────────────────────────────────────────────────

export async function mergePdfs(
  files: File[],
  onProgress?: ProgressCallback,
): Promise<void> {
  const merged = await PDFDocument.create();

  for (let i = 0; i < files.length; i++) {
    onProgress?.(Math.round((i / files.length) * 85), `Merging ${files[i].name}…`);
    const buf = await readFileAsArrayBuffer(files[i]);
    const src = await PDFDocument.load(buf);
    const pages = await merged.copyPages(src, src.getPageIndices());
    pages.forEach((p) => merged.addPage(p));
  }

  onProgress?.(92, 'Saving…');
  const bytes = await merged.save();
  onProgress?.(100, 'Done!');
  downloadBytes(bytes, 'merged.pdf');
}

// ─── Split PDF ───────────────────────────────────────────────────────────────

export async function splitPdf(
  file: File,
  rangeStr: string,
  onProgress?: ProgressCallback,
): Promise<void> {
  const buf = await readFileAsArrayBuffer(file);
  const src = await PDFDocument.load(buf);
  const total = src.getPageCount();

  // Parse range string e.g. "1-3, 5, 7-9"
  const ranges = parseRanges(rangeStr, total);

  for (let i = 0; i < ranges.length; i++) {
    onProgress?.(Math.round((i / ranges.length) * 90), `Creating part ${i + 1}…`);
    const pages = ranges[i];
    const newPdf = await PDFDocument.create();
    const copied = await newPdf.copyPages(src, pages.map((p) => p - 1));
    copied.forEach((p) => newPdf.addPage(p));
    const bytes = await newPdf.save();
    const filename = `${file.name.replace(/\.pdf$/i, '')}_part${i + 1}.pdf`;
    downloadBytes(bytes, filename);
    await delay(300);
  }

  onProgress?.(100, 'Done!');
}

function parseRanges(str: string, total: number): number[][] {
  if (!str.trim()) {
    // No range — split every page
    return Array.from({ length: total }, (_, i) => [i + 1]);
  }
  return str.split(',').map((part) => {
    part = part.trim();
    if (part.includes('-')) {
      const [a, b] = part.split('-').map(Number);
      const result: number[] = [];
      for (let i = a; i <= Math.min(b, total); i++) result.push(i);
      return result;
    }
    return [Number(part)];
  });
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── Rotate PDF ──────────────────────────────────────────────────────────────

export async function rotatePdf(
  file: File,
  angle: 90 | 180 | 270,
  onProgress?: ProgressCallback,
): Promise<void> {
  onProgress?.(20, 'Loading PDF…');
  const buf = await readFileAsArrayBuffer(file);
  const pdf = await PDFDocument.load(buf);

  onProgress?.(50, 'Rotating pages…');
  const pages = pdf.getPages();
  pages.forEach((p) => p.setRotation(degrees(angle)));

  onProgress?.(85, 'Saving…');
  const bytes = await pdf.save();
  onProgress?.(100, 'Done!');
  downloadBytes(bytes, `${file.name.replace(/\.pdf$/i, '')}_rotated.pdf`);
}

// ─── Watermark ───────────────────────────────────────────────────────────────

export async function addWatermark(
  file: File,
  text: string,
  opacity = 0.25,
  onProgress?: ProgressCallback,
): Promise<void> {
  onProgress?.(20, 'Loading PDF…');
  const buf = await readFileAsArrayBuffer(file);
  const pdf = await PDFDocument.load(buf);
  const font: PDFFont = await pdf.embedFont(StandardFonts.HelveticaBold);

  onProgress?.(50, 'Adding watermark…');
  const pages = pdf.getPages();
  pages.forEach((page) => {
    const { width, height } = page.getSize();
    const fontSize = Math.min(width, height) * 0.1;
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    page.drawText(text, {
      x: (width - textWidth) / 2,
      y: height / 2,
      size: fontSize,
      font,
      color: rgb(0.5, 0.5, 0.5),
      opacity,
      rotate: degrees(45),
    });
  });

  onProgress?.(85, 'Saving…');
  const bytes = await pdf.save();
  onProgress?.(100, 'Done!');
  downloadBytes(bytes, `${file.name.replace(/\.pdf$/i, '')}_watermarked.pdf`);
}

// ─── Page Numbers ────────────────────────────────────────────────────────────

export async function addPageNumbers(
  file: File,
  position: 'bottom-center' | 'bottom-right' | 'bottom-left' = 'bottom-center',
  onProgress?: ProgressCallback,
): Promise<void> {
  onProgress?.(20, 'Loading PDF…');
  const buf = await readFileAsArrayBuffer(file);
  const pdf = await PDFDocument.load(buf);
  const font = await pdf.embedFont(StandardFonts.Helvetica);

  onProgress?.(50, 'Adding page numbers…');
  const pages = pdf.getPages();
  const total = pages.length;

  pages.forEach((page, i) => {
    const { width, height } = page.getSize();
    const text = `${i + 1} / ${total}`;
    const fontSize = 10;
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    const margin = 20;

    let x = (width - textWidth) / 2;
    if (position === 'bottom-right') x = width - textWidth - margin;
    if (position === 'bottom-left') x = margin;

    page.drawText(text, {
      x,
      y: margin,
      size: fontSize,
      font,
      color: rgb(0.3, 0.3, 0.3),
    });
  });

  onProgress?.(85, 'Saving…');
  const bytes = await pdf.save();
  onProgress?.(100, 'Done!');
  downloadBytes(bytes, `${file.name.replace(/\.pdf$/i, '')}_numbered.pdf`);
}

// ─── Protect PDF ─────────────────────────────────────────────────────────────

export async function protectPdf(
  file: File,
  userPassword: string,
  onProgress?: ProgressCallback,
): Promise<void> {
  onProgress?.(20, 'Loading PDF…');
  const buf = await readFileAsArrayBuffer(file);
  const pdf = await PDFDocument.load(buf);

  onProgress?.(60, 'Applying encryption…');
  const bytes = await pdf.save({
    userPassword,
    ownerPassword: userPassword + '_owner',
    permissions: {
      printing: 'highResolution',
      modifying: false,
      copying: false,
      annotating: false,
      fillingForms: true,
      contentAccessibility: true,
      documentAssembly: false,
    },
  });

  onProgress?.(100, 'Done!');
  downloadBytes(bytes, `${file.name.replace(/\.pdf$/i, '')}_protected.pdf`);
}

// ─── Unlock PDF ──────────────────────────────────────────────────────────────

export async function unlockPdf(
  file: File,
  password: string,
  onProgress?: ProgressCallback,
): Promise<void> {
  onProgress?.(20, 'Loading PDF…');
  const buf = await readFileAsArrayBuffer(file);
  let pdf: PDFDocument;
  try {
    pdf = await PDFDocument.load(buf, { password });
  } catch {
    throw new Error('Wrong password or PDF is not encrypted.');
  }

  onProgress?.(60, 'Removing password…');
  const bytes = await pdf.save();
  onProgress?.(100, 'Done!');
  downloadBytes(bytes, `${file.name.replace(/\.pdf$/i, '')}_unlocked.pdf`);
}

// ─── Compress PDF (basic) ────────────────────────────────────────────────────

export async function compressPdf(
  file: File,
  onProgress?: ProgressCallback,
): Promise<void> {
  onProgress?.(20, 'Loading PDF…');
  const buf = await readFileAsArrayBuffer(file);
  const pdf = await PDFDocument.load(buf, { updateMetadata: false });

  onProgress?.(60, 'Optimizing…');
  // Remove unused objects by re-saving (basic compression)
  const bytes = await pdf.save({ useObjectStreams: true });
  onProgress?.(100, 'Done!');

  const original = file.size;
  const compressed = bytes.length;
  const saved = Math.max(0, Math.round((1 - compressed / original) * 100));

  downloadBytes(bytes, `${file.name.replace(/\.pdf$/i, '')}_compressed.pdf`);
  return Promise.resolve();
}

// ─── PDF → Images (via canvas, requires pdfjs) ───────────────────────────────

export async function pdfToImages(
  file: File,
  format: 'jpeg' | 'png',
  quality: number = 0.92,
  onProgress?: ProgressCallback,
): Promise<void> {
  onProgress?.(5, 'Loading PDF renderer…');

  // Dynamic import to avoid SSR issues
  const pdfjsLib = await import('pdfjs-dist');

  // Use the bundled worker from node_modules
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.mjs',
    import.meta.url,
  ).toString();

  const buf = await readFileAsArrayBuffer(file);
  const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buf) });
  const pdfDoc = await loadingTask.promise;
  const total = pdfDoc.numPages;

  for (let pageNum = 1; pageNum <= total; pageNum++) {
    onProgress?.(
      Math.round((pageNum / total) * 90),
      `Rendering page ${pageNum} of ${total}…`,
    );

    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 });

    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d')!;

    await page.render({ canvasContext: ctx, viewport }).promise;

    const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
    const ext = format === 'jpeg' ? 'jpg' : 'png';
    const blob = await new Promise<Blob>((r) =>
      canvas.toBlob((b) => r(b!), mimeType, quality),
    );

    const suffix = total > 1 ? `_page${pageNum}` : '';
    downloadBlob(blob, `${file.name.replace(/\.pdf$/i, '')}${suffix}.${ext}`);

    // Small delay between downloads so browser doesn't block them
    if (total > 1) await delay(400);
  }

  onProgress?.(100, 'Done!');
}
