import { useState } from 'react';
import { Search, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { SequenceRecord, exportSingleReadToCSV } from '../data/sequencesDataset';

interface Props {
  dataset: SequenceRecord[];
}

export default function SpeciesPage({ dataset }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const PER_PAGE = 15;

  const filteredRecords = dataset.filter((record) =>
    record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.seq.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedRecords = filteredRecords.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
  const totalPages = Math.ceil(filteredRecords.length / PER_PAGE);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="border-b border-[#D7D6D0] pb-4">
        <div className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider mb-1">
          Official Sequence Register
        </div>
        <h1 className="text-2xl font-extrabold text-[#1B5E20]">Test Samples</h1>
        <p className="text-xs text-[#555555] mt-1">
          Listing of all {dataset.length} raw sequence reads currently loaded in the system.
        </p>
      </div>

      {/* Science Banner Image 1: Field eDNA Sampling */}
      <div className="gov-card overflow-hidden">
        <div className="relative h-44 sm:h-52 w-full bg-[#1B5E20]">
          <img
            src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&h=400&fit=crop&auto=format"
            alt="Field aquatic eDNA water sampling"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 flex flex-col justify-end">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A5D6A7]">Field Methods</span>
            <h3 className="text-lg font-bold text-white">Environmental Water & Filter Sampling</h3>
            <p className="text-xs text-slate-200">
              DNA shed by organisms is collected on 0.22µm membrane filters across freshwater rivers and marine habitats.
            </p>
          </div>
        </div>
      </div>

      {/* Non-card Sequence Reads Register List */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#D7D6D0] pb-3">
          <div>
            <h2 className="text-lg font-extrabold text-[#1B5E20]">Test Samples</h2>
            <p className="text-xs text-[#555555]">
              Showing {filteredRecords.length} sequence reads. Expanded nucleotide view & single CSV record downloads.
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#777777]" />
            <input
              type="text"
              placeholder="Search read_id (e.g. SEQ_0012)..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-sm border border-[#D7D6D0] bg-white text-[#222222] focus:outline-none focus:border-[#2E7D32]"
            />
          </div>
        </div>

        {/* Clean Line-Item Register List */}
        <div className="divide-y divide-[#D7D6D0] border-t border-b border-[#D7D6D0] bg-white">
          {paginatedRecords.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#666666]">
              No sequence records found for "{searchTerm}".
            </div>
          ) : (
            paginatedRecords.map((record) => {
              const isExpanded = expandedId === record.id;
              return (
                <div key={record.id} className="py-3 px-4 hover:bg-[#FAF9F5] transition-colors space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-[#1B5E20] text-sm w-24 shrink-0">
                        {record.id}
                      </span>
                      <span className="text-[#555555] font-semibold">{record.len} bp</span>
                      <span className="text-[#777777]">•</span>
                      <span className="font-mono font-bold text-[#2E7D32]">GC: {record.gc}%</span>
                      <span className="text-[#777777]">•</span>
                      <span className="status-badge-pending text-[11px]">{record.status}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleExpand(record.id)}
                        className="px-2.5 py-1 text-xs text-[#1B5E20] font-bold border border-[#A5D6A7] bg-[#E8F5E9] rounded-sm hover:bg-[#C8E6C9] flex items-center gap-1 cursor-pointer"
                      >
                        {isExpanded ? (
                          <>
                            <span>Hide Sequence</span>
                            <ChevronUp className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            <span>View Full Sequence</span>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => exportSingleReadToCSV(record)}
                        className="px-2.5 py-1 text-xs text-[#444444] border border-[#D7D6D0] bg-white rounded-sm hover:bg-[#FAF9F5] flex items-center gap-1 cursor-pointer"
                        title="Download CSV record"
                      >
                        <Download className="w-3.5 h-3.5 text-[#2E7D32]" />
                        <span>CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* Sequence Preview / Full Sequence */}
                  <div className="text-xs">
                    <div className="dna-seq-box break-all leading-relaxed bg-[#FAF9F5] p-2 text-[#333333] border border-[#E0E0E0] rounded-sm font-mono text-[11px]">
                      {isExpanded ? record.seq : `${record.seq.substring(0, 120)}...`}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-3 text-xs text-[#555555]">
            <div>
              Page <span className="font-bold text-[#222222]">{page + 1}</span> of{' '}
              <span className="font-bold text-[#222222]">{totalPages}</span> ({filteredRecords.length} total records)
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="px-3 py-1 border border-[#D7D6D0] bg-white rounded-sm disabled:opacity-40 cursor-pointer"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="px-3 py-1 border border-[#D7D6D0] bg-white rounded-sm disabled:opacity-40 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Science Banner Image 2: Laboratory High-Throughput Sequencing */}
      <div className="gov-card overflow-hidden">
        <div className="relative h-44 sm:h-52 w-full bg-[#1B5E20]">
          <img
            src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&h=400&fit=crop&auto=format"
            alt="High-throughput DNA sequencing laboratory"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 flex flex-col justify-end">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A5D6A7]">Laboratory Pipeline</span>
            <h3 className="text-lg font-bold text-white">High-Throughput COI Gene Sequencing</h3>
            <p className="text-xs text-slate-200">
              Sequencing platforms generate millions of standardized 658bp COI barcode reads for high-resolution species identification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
