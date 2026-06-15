import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PDFusion — AI-Powered PDF Platform',
  description: 'The most powerful PDF platform. Convert, edit, compress, sign and manage PDFs with AI assistance.',
  keywords: 'PDF converter, PDF editor, merge PDF, compress PDF, AI PDF, OCR, PDF tools',
  authors: [{ name: 'PDFusion' }],
  openGraph: {
    title: 'PDFusion — AI-Powered PDF Platform',
    description: 'All your PDF tools in one place. Powered by AI.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
