import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WebpageToPdfClient from './WebpageToPdfClient';

export const metadata: Metadata = {
  title: 'Web Page to PDF — PDFusion',
  description: 'Convert any website URL or HTML page to PDF directly in your browser.',
};

export default function WebpageToPdfPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 pt-24 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5 bg-gradient-to-br from-yellow-500 to-orange-500 shadow-xl">
              🌐
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Web Page to PDF</h1>
            <p className="text-base" style={{ color: 'var(--text-muted)' }}>
              Paste a URL to open the page, then use your browser&apos;s print dialog to save as PDF —
              or paste HTML directly for instant conversion.
            </p>
          </div>
          <WebpageToPdfClient />
          <p className="text-center text-xs mt-6" style={{ color: 'var(--text-subtle)' }}>
            🔒 All processing happens in your browser. No data is sent to our servers.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
