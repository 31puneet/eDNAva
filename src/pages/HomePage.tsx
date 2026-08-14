import { Leaf, Dna, FileText, ArrowRight, ChevronRight, Activity, Microscope, CheckSquare } from 'lucide-react';
import { type Page } from '../App';
import { INITIAL_DATASET_SEQUENCES } from '../data/sequencesDataset';

interface Props {
  navigate: (page: Page) => void;
}

export default function HomePage({ navigate }: Props) {
  // Live computed stats from the 200 real CSV sequence read records
  const totalReads = INITIAL_DATASET_SEQUENCES.length; // 200
  const avgLength = (
    INITIAL_DATASET_SEQUENCES.reduce((acc, curr) => acc + curr.len, 0) / totalReads
  ).toFixed(1);
  const avgGC = (
    INITIAL_DATASET_SEQUENCES.reduce((acc, curr) => acc + curr.gc, 0) / totalReads
  ).toFixed(1);

  const realStats = [
    { label: 'Total Sequence Reads', value: `${totalReads} Reads`, sub: 'Parsed from active dataset' },
    { label: 'Avg Sequence Length', value: `${avgLength} bp`, sub: 'Standardized COI marker length' },
    { label: 'Avg GC Content', value: `${avgGC}%`, sub: 'Calculated from nucleotide reads' },
    { label: 'AI Classification Status', value: 'Pending', sub: 'Model execution required' },
  ];

  const pipelineSteps = [
    {
      num: '1',
      title: 'Sequence Upload',
      desc: 'Submit raw environmental DNA sequence files (.csv, .fasta) containing read_id and dna_sequence strings.',
      icon: FileText,
    },
    {
      num: '2',
      title: 'Sequence QC & Metrics',
      desc: 'Automated calculation of sequence read length and nucleotide GC content percentage.',
      icon: Activity,
    },
    {
      num: '3',
      title: 'AI Classification',
      desc: 'Deep learning taxonomy classifier matches gene barcodes against official reference databases.',
      icon: Microscope,
    },
    {
      num: '4',
      title: 'Biodiversity Portal Results',
      desc: 'View validated taxonomy rankings, export individual read records, or download bulk dataset CSV reports.',
      icon: CheckSquare,
    },
  ];

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

      {/* Live Dataset Stats Strip */}
      <section className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-[#1B5E20] flex items-center gap-1.5">
          <Dna className="w-4 h-4" />
          <span>Active Dataset Summary (Live Computed Metrics)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {realStats.map((stat, i) => (
            <div key={i} className="gov-card p-5 border-t-2 border-t-[#2E7D32]">
              <div className="text-xs text-[#666666] font-medium uppercase tracking-wider">{stat.label}</div>
              <div className="text-2xl font-extrabold text-[#1B5E20] my-1">{stat.value}</div>
              <div className="text-xs text-[#555555]">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* "How It Works" 4-Step Section */}
      <section className="gov-card p-8 space-y-6">
        <div className="border-b border-[#D7D6D0] pb-4">
          <h2 className="text-xl font-bold text-[#1B5E20] flex items-center gap-2">
            <Microscope className="w-5 h-5 text-[#2E7D32]" />
            <span>How The Pipeline Process Works</span>
          </h2>
          <p className="text-xs text-[#555555] mt-1">
            Standardized four-stage workflow for processing environmental DNA sequence samples.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pipelineSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="p-5 border border-[#E0E0E0] bg-[#FAF9F5] rounded-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-full bg-[#2E7D32] text-white flex items-center justify-center font-bold text-xs">
                    {step.num}
                  </span>
                  <Icon className="w-5 h-5 text-[#2E7D32]" />
                </div>
                <h3 className="text-sm font-bold text-[#222222]">{step.title}</h3>
                <p className="text-xs text-[#555555] leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
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
