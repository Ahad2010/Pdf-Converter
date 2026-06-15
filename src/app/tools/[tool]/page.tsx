import { notFound } from 'next/navigation';
import { toolsConfig } from '@/lib/toolsConfig';
import ToolProcessor from '@/components/ToolProcessor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ tool: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool: toolId } = await params;
  const tool = toolsConfig[toolId];
  if (!tool) return { title: 'Tool Not Found' };
  return {
    title: `${tool.title} — PDFusion`,
    description: tool.desc,
  };
}

export default async function ToolPage({ params }: Props) {
  const { tool: toolId } = await params;
  const tool = toolsConfig[toolId];
  if (!tool) notFound();

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 pt-24 pb-20 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <div
              className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5 bg-gradient-to-br ${tool.gradient} shadow-xl`}
            >
              {tool.icon}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">{tool.title}</h1>
            <p className="text-base" style={{ color: 'var(--text-muted)' }}>{tool.desc}</p>
          </div>

          {/* Processor */}
          <ToolProcessor tool={tool} />

          {/* Security note */}
          <p className="text-center text-xs mt-6" style={{ color: 'var(--text-subtle)' }}>
            🔒 Files are processed locally in your browser and never uploaded to our servers.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
