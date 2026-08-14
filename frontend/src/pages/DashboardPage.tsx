import { useState, useEffect } from 'react';
import { Download, Plus, FileText, Activity, Microscope, CheckSquare, Search, Sparkles, RefreshCw } from 'lucide-react';
import { type Page } from '../App';
import { SequenceRecord, exportBulkToCSV } from '../data/sequencesDataset';

interface Props {
  navigate: (page: Page) => void;
  dataset: SequenceRecord[];
}

export default function DashboardPage({ navigate, dataset }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [records, setRecords] = useState<SequenceRecord[]>(dataset);
  const [classifyingId, setClassifyingId] = useState<string | null>(null);
  const [quickSeq, setQuickSeq] = useState('');
  const [quickResult, setQuickResult] = useState<string | null>(null);
  const [isQuickPredicting, setIsQuickPredicting] = useState(false);

  useEffect(() => {
    setRecords(dataset);
  }, [dataset]);

  useEffect(() => {
    const checkBackend = () => {
      fetch('http://localhost:8000/api/health')
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 'ok' && data.model_loaded) {
            setBackendStatus('online');
          } else {
            setBackendStatus('offline');
          }
        })
        .catch(() => setBackendStatus('offline'));
    };

    checkBackend();
    const interval = setInterval(checkBackend, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleClassifyRow = async (id: string, seq: string) => {
    setClassifyingId(id);
    try {
      const res = await fetch('http://localhost:8000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sequence: seq }),
      });
      if (res.ok) {
        const data = await res.json();
        setRecords((prev) =>
          prev.map((r) =>
            r.id === id
              ? {
                  ...r,
                  status:
                    data.status === 'success'
                      ? `${data.prediction} (${data.confidence}% • ${data.group})`
                      : `Below threshold (${data.confidence}%)`,
                }
              : r
          )
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setClassifyingId(null);
    }
  };

  const handleQuickPredict = async () => {
    const clean = quickSeq.replace(/[^ATCGNatcgn]/g, '').toUpperCase();
    if (clean.length < 50) {
      setQuickResult('Error: DNA sequence must be at least 50bp long.');
      return;
    }

    setIsQuickPredicting(true);
    setQuickResult(null);

    try {
      const res = await fetch('http://localhost:8000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sequence: clean }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'success') {
          setQuickResult(`Identified: ${data.prediction} (Confidence: ${data.confidence}%, Group: ${data.group})`);
        } else {
          setQuickResult(`Unknown Species / Low confidence (${data.confidence}%)`);
        }
      } else {
        setQuickResult('Backend prediction returned error.');
      }
    } catch (err) {
      setQuickResult('Could not reach backend API at http://localhost:8000');
    } finally {
      setIsQuickPredicting(false);
    }
  };

  const filtered = records.filter(
    (r) =>
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.seq.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const avgGC =
    records.length > 0
      ? (records.reduce((acc, r) => acc + r.gc, 0) / records.length).toFixed(1)
      : '0';

  const classifiedCount = records.filter(
    (r) => !r.status.toLowerCase().includes('pending')
  ).length;

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
            onClick={() => exportBulkToCSV(records)}
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

      {/* Metrics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="gov-card p-4 border-t-2 border-t-[#2E7D32]">
          <div className="text-xs text-[#666666] font-medium uppercase tracking-wider">Total Sample Reads</div>
          <div className="text-2xl font-bold text-[#1B5E20] mt-1">{records.length}</div>
          <div className="text-[11px] text-[#888888] mt-0.5">Active sequences in database</div>
        </div>

        <div className="gov-card p-4 border-t-2 border-t-[#1976D2]">
          <div className="text-xs text-[#666666] font-medium uppercase tracking-wider">Mean GC Content</div>
          <div className="text-2xl font-bold text-[#0D47A1] mt-1">{avgGC}%</div>
          <div className="text-[11px] text-[#888888] mt-0.5">Nucleotide base ratio</div>
        </div>

        <div className="gov-card p-4 border-t-2 border-t-[#7B1FA2]">
          <div className="text-xs text-[#666666] font-medium uppercase tracking-wider">Classified Reads</div>
          <div className="text-2xl font-bold text-[#4A148C] mt-1">{classifiedCount} / {records.length}</div>
          <div className="text-[11px] text-[#888888] mt-0.5">Taxonomy assigned reads</div>
        </div>

        <div className="gov-card p-4 border-t-2 border-t-[#388E3C]">
          <div className="text-xs text-[#666666] font-medium uppercase tracking-wider">ML Backend Service</div>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                backendStatus === 'online'
                  ? 'bg-[#2E7D32] animate-pulse'
                  : backendStatus === 'offline'
                  ? 'bg-[#C62828]'
                  : 'bg-[#F57C00]'
              }`}
            />
            <span className="text-sm font-bold text-[#222222]">
              {backendStatus === 'online' ? 'Online (ML Loaded)' : backendStatus === 'offline' ? 'Offline' : 'Checking...'}
            </span>
          </div>
          <div className="text-[11px] text-[#888888] mt-0.5">FastAPI :8000 Model Pipeline</div>
        </div>
      </div>

      {/* Real-time Quick Sequence Predictor */}
      <section className="gov-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#D7D6D0] pb-3">
          <div>
            <h2 className="text-base font-bold text-[#1B5E20] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#2E7D32]" />
              <span>Instant Sequence Classifier</span>
            </h2>
            <p className="text-xs text-[#555555]">
              Test any environmental DNA sequence against the 20-species LightGBM trained model.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Paste raw nucleotide sequence (min 50bp, e.g., TCTCTACTTAATTTTCGGTGCATGAGCTGGA...)"
            value={quickSeq}
            onChange={(e) => setQuickSeq(e.target.value)}
            className="flex-1 px-3 py-2 text-xs font-mono rounded-sm border border-[#D7D6D0] bg-white text-[#222222] focus:outline-none focus:border-[#2E7D32]"
          />
          <button
            onClick={handleQuickPredict}
            disabled={isQuickPredicting || quickSeq.trim().length === 0}
            className="btn-gov-primary text-xs flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isQuickPredicting ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Classifying...</span>
              </>
            ) : (
              <>
                <Microscope className="w-3.5 h-3.5" />
                <span>Classify Sequence</span>
              </>
            )}
          </button>
        </div>

        {quickResult && (
          <div className="p-3 bg-[#E8F5E9] border border-[#A5D6A7] text-[#1B5E20] text-xs rounded-sm font-semibold">
            {quickResult}
          </div>
        )}
      </section>

      {/* Dataset Reads Table */}
      <section className="gov-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D7D6D0] pb-3">
          <div>
            <h2 className="text-base font-bold text-[#1B5E20]">Sequence Reads Registry</h2>
            <p className="text-xs text-[#555555]">
              Showing {filtered.length} of {records.length} sequences
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#777777]" />
            <input
              type="text"
              placeholder="Search by ID or species status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-sm border border-[#D7D6D0] bg-white text-[#222222] focus:outline-none focus:border-[#2E7D32]"
            />
          </div>
        </div>

        <div className="overflow-x-auto border border-[#D7D6D0] rounded-sm max-h-96">
          <table className="gov-table text-xs">
            <thead>
              <tr>
                <th>Read ID</th>
                <th>Length</th>
                <th>GC %</th>
                <th>Classification Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 50).map((row) => (
                <tr key={row.id}>
                  <td className="font-mono font-bold text-[#2E7D32]">{row.id}</td>
                  <td>{row.len} bp</td>
                  <td className="font-mono">{row.gc}%</td>
                  <td>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-xs text-[11px] font-semibold ${
                        row.status.toLowerCase().includes('pending')
                          ? 'bg-[#FFF3E0] text-[#E65100]'
                          : row.status.toLowerCase().includes('invasive')
                          ? 'bg-[#FFEBEE] text-[#C62828]'
                          : 'bg-[#E8F5E9] text-[#1B5E20]'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleClassifyRow(row.id, row.seq)}
                      disabled={classifyingId === row.id}
                      className="px-2 py-1 text-[11px] font-bold text-[#2E7D32] bg-[#E8F5E9] hover:bg-[#C8E6C9] rounded-xs border border-[#A5D6A7] cursor-pointer disabled:opacity-50"
                    >
                      {classifyingId === row.id ? 'Running AI...' : 'Predict Species'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

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
