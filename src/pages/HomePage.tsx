import { Leaf, ArrowRight, ChevronRight } from 'lucide-react';
import { type Page } from '../App';

interface Props {
  navigate: (page: Page) => void;
}

export default function HomePage({ navigate }: Props) {
  return (
    <div className="space-y-10 pb-12">
      {/* Official Government Hero Banner */}
      <section className="gov-card p-8 md:p-12 border-l-4 border-l-[#2E7D32]">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8F5E9] text-[#1B5E20] border border-[#A5D6A7] text-xs font-bold uppercase tracking-wider rounded-sm">
            <Leaf className="w-4 h-4 text-[#2E7D32]" />
            <span>National Biodiversity Information System</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1B5E20] tracking-tight leading-tight">
            Environmental DNA (eDNA) Biodiversity Analysis Platform
          </h1>

          <p className="text-base text-[#444444] leading-relaxed">
            An official public science portal providing standardized quality assessment, sequence data management, and AI-assisted taxonomic classification for environmental DNA monitoring across terrestrial and aquatic ecosystems.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => navigate('dashboard')}
              className="btn-gov-primary flex items-center gap-2 text-sm"
            >
              <span>Go to Data Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('about')}
              className="btn-gov-outline flex items-center gap-2 text-sm"
            >
              <span>Learn More About Platform</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Quick Access Teasers */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => navigate('dashboard')}
          className="gov-card p-6 cursor-pointer hover:border-[#2E7D32] transition-colors space-y-3"
        >
          <div className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">Portal Console</div>
          <h3 className="text-lg font-bold text-[#1B5E20]">Sequence Reads Dashboard</h3>
          <p className="text-xs text-[#555555] leading-relaxed">
            Inspect all 200 real sequence reads, search by read_id, filter by sequence length, and export single or bulk CSV files.
          </p>
          <div className="text-xs font-bold text-[#2E7D32] flex items-center gap-1 pt-2">
            <span>Open Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div
          onClick={() => navigate('species')}
          className="gov-card p-6 cursor-pointer hover:border-[#2E7D32] transition-colors space-y-3"
        >
          <div className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">Taxonomy Status</div>
          <h3 className="text-lg font-bold text-[#1B5E20]">Species & Classification Directory</h3>
          <p className="text-xs text-[#555555] leading-relaxed">
            Review dataset reads requiring classification, and view the official taxonomic rank template for model predictions.
          </p>
          <div className="text-xs font-bold text-[#2E7D32] flex items-center gap-1 pt-2">
            <span>View Taxonomy Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div
          onClick={() => navigate('about')}
          className="gov-card p-6 cursor-pointer hover:border-[#2E7D32] transition-colors space-y-3"
        >
          <div className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">Documentation</div>
          <h3 className="text-lg font-bold text-[#1B5E20]">About Platform & Methodology</h3>
          <p className="text-xs text-[#555555] leading-relaxed">
            Read plain-language explanations of eDNA analysis, conservation impacts, non-invasive monitoring, and technical pipeline standards.
          </p>
          <div className="text-xs font-bold text-[#2E7D32] flex items-center gap-1 pt-2">
            <span>Read About Section</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </section>
    </div>
  );
}
