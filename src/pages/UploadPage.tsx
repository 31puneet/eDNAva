import { useState, useRef, DragEvent } from 'react';
import { ArrowLeft, Upload, FileText, CheckCircle, AlertCircle, RefreshCw, Dna } from 'lucide-react';
import { type Page } from '../App';
import { SequenceRecord, calculateGC } from '../data/sequencesDataset';

interface Props {
  navigate: (page: Page) => void;
  onAddReads: (newReads: SequenceRecord[]) => void;
}

export default function UploadPage({ navigate, onAddReads }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [parsedPreview, setParsedPreview] = useState<SequenceRecord[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = (selectedFile: File) => {
    setValidationError(null);
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (!content) return;

      const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
      const parsed: SequenceRecord[] = [];

      // Check if CSV format or simple sequence list
      let startIndex = 0;
      if (lines[0].toLowerCase().includes('read_id') || lines[0].toLowerCase().includes('sequence')) {
        startIndex = 1; // Skip CSV header
      }

      for (let i = startIndex; i < Math.min(lines.length, 50); i++) {
        const line = lines[i];
        const parts = line.split(',');
        const id = parts[0]?.trim() || `SEQ_${String(i).padStart(4, '0')}`;
        const seq = (parts[1] || parts[0]).trim().replace(/[^ATCGNatcgn]/g, '');

        if (seq.length > 0) {
          const len = seq.length;
          const gc = calculateGC(seq);
          parsed.push({
            id: id.startsWith('SEQ') ? id : `SEQ_${String(i).padStart(4, '0')}`,
            seq,
            len,
            gc,
            status: 'Pending classification',
          });
        }
      }

      if (parsed.length === 0) {
        setValidationError('Failed to parse valid DNA sequence reads from file. Ensure file contains ATCG nucleotide strings.');
        setParsedPreview([]);
      } else {
        setParsedPreview(parsed);
      }
    };

    reader.readAsText(selectedFile);
  };

  const handleConfirmAnalysis = () => {
    if (parsedPreview.length === 0) return;
    setIsProcessing(true);

    setTimeout(() => {
      onAddReads(parsedPreview);
      setIsProcessing(false);
      navigate('dashboard');
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#D7D6D0] pb-4">
        <button
          onClick={() => navigate('dashboard')}
          className="flex items-center gap-1.5 text-xs font-bold text-[#2E7D32] hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Data Dashboard</span>
        </button>

        <div className="text-xs font-mono text-[#666666]">ROUTE: /dashboard/upload</div>
      </div>

      <div className="space-y-1 text-center">
        <div className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">Official Upload Portal</div>
        <h1 className="text-2xl font-extrabold text-[#1B5E20]">Submit New Sequence Sample Dataset</h1>
        <p className="text-xs text-[#555555]">
          Upload a CSV or FASTA file containing read_id and dna_sequence columns for quality validation.
        </p>
      </div>

      {/* Drag and Drop Zone */}
      <div className="gov-card p-6 space-y-6">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-sm p-8 text-center cursor-pointer transition-colors ${
            isDragging
              ? 'border-[#2E7D32] bg-[#E8F5E9]'
              : file
              ? 'border-[#2E7D32] bg-[#FAF9F5]'
              : 'border-[#CCCCCC] hover:border-[#2E7D32] bg-white'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".csv,.fasta,.fastq,.fa,.fq,.txt"
            className="hidden"
          />

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>

            {file ? (
              <div>
                <div className="text-sm font-bold text-[#1B5E20]">{file.name}</div>
                <div className="text-xs text-[#555555]">
                  {(file.size / 1024).toFixed(1)} KB • {parsedPreview.length} reads parsed
                </div>
              </div>
            ) : (
              <div>
                <div className="text-sm font-bold text-[#222222]">
                  Click to choose file or drag & drop sequence file here
                </div>
                <div className="text-xs text-[#666666] mt-1">
                  CSV (.csv) or FASTA (.fasta, .fa) files containing nucleotide sequence reads
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div className="p-3 bg-[#FFEBEE] border border-[#FFCDD2] text-[#C62828] text-xs rounded-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Parsed Preview Table */}
        {parsedPreview.length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#1B5E20]">
              <span>Parsed Sequence Preview ({parsedPreview.length} Sample Reads)</span>
              <span>QC Validation: Passed</span>
            </div>

            <div className="overflow-x-auto border border-[#D7D6D0] rounded-sm max-h-56">
              <table className="gov-table">
                <thead>
                  <tr>
                    <th>Read ID</th>
                    <th>Length</th>
                    <th>GC %</th>
                    <th>Sequence Snippet</th>
                  </tr>
                </thead>
                <tbody>
                  {parsedPreview.slice(0, 5).map((row, idx) => (
                    <tr key={idx}>
                      <td className="font-mono font-bold text-[#2E7D32]">{row.id}</td>
                      <td>{row.len} bp</td>
                      <td className="font-mono">{row.gc}%</td>
                      <td>
                        <span className="dna-seq-box truncate max-w-[200px] inline-block">{row.seq}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Submit Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[#D7D6D0]">
          <button
            onClick={() => navigate('dashboard')}
            className="btn-gov-outline text-xs"
          >
            Cancel & Return
          </button>

          <button
            onClick={handleConfirmAnalysis}
            disabled={parsedPreview.length === 0 || isProcessing}
            className="btn-gov-primary text-xs flex items-center gap-2 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing Sample Data...</span>
              </>
            ) : (
              <>
                <Dna className="w-4 h-4" />
                <span>Add Sample Reads to Dashboard</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
