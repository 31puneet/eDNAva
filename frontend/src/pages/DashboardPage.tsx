import { Download, Plus, FileText, Activity, Microscope, CheckSquare } from 'lucide-react';
import { type Page } from '../App';
import { SequenceRecord, exportBulkToCSV } from '../data/sequencesDataset';

interface Props {
  navigate: (page: Page) => void;
  dataset: SequenceRecord[];
}

export default function DashboardPage({ navigate, dataset }: Props) {
  const pipelineSteps = [
    {
      num: '1',
      title: 'Sequence Upload',
      desc: 'Upload your raw eDNA sample file (.csv or .fasta format) containing read IDs and DNA sequence letters.',
      icon: FileText,
    },
    {
      num: '2',
      title: 'Sequence QC & Check',
      desc: 'The system automatically checks sequence length and calculates GC content percentage for each read.',
      icon: Activity,
    },
    {
      num: '3',
      title: 'AI Species Classification',
      desc: 'Smart AI models compare DNA sequences against reference species databases to identify organisms.',
      icon: Microscope,
    },
    {
      num: '4',
      title: 'Results & CSV Export',
      desc: 'View biodiversity classification results, inspect sequence records, and download ready-to-use CSV reports.',
      icon: CheckSquare,
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#D7D6D0] pb-4">
        <div>
          <div className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider mb-1">
            Official Data Portal Console
          </div>
          <h1 className="text-2xl font-extrabold text-[#1B5E20]">eDNA Sequence Analysis Console</h1>
          <p className="text-xs text-[#555555]">
            Manage environmental DNA datasets, run quality assessment tools, and export reports.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Download Sample Data Button */}
          <button
            onClick={() => exportBulkToCSV(dataset)}
            className="btn-gov-outline flex items-center gap-2 text-xs"
            title="Download full dataset as CSV"
          >
            <Download className="w-4 h-4" />
            <span>Download Sample Data</span>
          </button>

          {/* Upload New Sample Button -> Routes to /dashboard/upload */}
          <button
            onClick={() => navigate('upload')}
            className="btn-gov-primary flex items-center gap-2 text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Sample File</span>
          </button>
        </div>
      </div>

      {/* Simple Pipeline Process Section */}
      <section className="gov-card p-8 space-y-6">
        <div className="border-b border-[#D7D6D0] pb-4">
          <h2 className="text-xl font-bold text-[#1B5E20] flex items-center gap-2">
            <Microscope className="w-5 h-5 text-[#2E7D32]" />
            <span>How The Pipeline Process Works</span>
          </h2>
          <p className="text-xs text-[#555555] mt-1">
            Simple 4-step workflow for processing environmental DNA sequence samples.
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
    </div>
  );
}
