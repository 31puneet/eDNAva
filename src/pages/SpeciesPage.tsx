import { useState } from 'react';
import { Search, Filter, Info, Dna, Layers, ChevronDown, ChevronUp, Download } from 'lucide-react';
import { SequenceRecord, exportSingleReadToCSV } from '../data/sequencesDataset';

interface Props {
  dataset: SequenceRecord[];
}

export default function SpeciesPage({ dataset }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const PER_PAGE = 20;

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
      {/* Official Register Header */}
      <div className="border-b border-[#D7D6D0] pb-4">
        <div className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider mb-1">
          Official Sequence Register & Taxonomy Status
        </div>
        <h1 className="text-2xl font-extrabold text-[#1B5E20]">eDNA Dataset Sequence Register</h1>
        <p className="text-xs text-[#555555] mt-1">
          Official listing of all {dataset.length} raw sequence reads currently cataloged in the portal dataset.
        </p>
      </div>

      {/* Upfront Honest Classification Notice */}
      <div className="gov-card p-5 bg-[#FAF9F5] border-l-4 border-l-[#2E7D32]">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-[#333333]">
            <div className="font-bold text-sm text-[#1B5E20]">Taxonomic Classification Status</div>
            <p className="leading-relaxed">
              Species-level identification is automatically generated once the AI classification pipeline processes these sequence reads against standard reference gene databases. Shown below is the official raw sequence read register currently loaded in the system.
            </p>
          </div>
        </div>
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

      {/* List / Register Table Layout */}
      <div className="gov-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#D7D6D0] pb-3">
          <div>
            <h2 className="text-base font-bold text-[#1B5E20]">Cataloged Sequence Reads Directory</h2>
            <p className="text-xs text-[#555555]">Scannable record list with computed length, GC ratio %, and full sequence viewer.</p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#777777]" />
            <input
              type="text"
              placeholder="Search by read_id (e.g. SEQ_0012)..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-sm border border-[#D7D6D0] bg-white text-[#222222] focus:outline-none focus:border-[#2E7D32]"
            />
          </div>
        </div>

        {/* Clean Scannable Register Table */}
        <div className="overflow-x-auto border border-[#D7D6D0] rounded-sm">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Read ID</th>
                <th>Sequence Length</th>
                <th>GC Content %</th>
                <th>Classification</th>
                <th>Taxonomy Hierarchy (Future)</th>
                <th>Sequence Preview & Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#666666]">
                    No matching sequence records found for "{searchTerm}".
                  </td>
                </tr>
              ) : (
                paginatedRecords.map((record) => {
                  const isExpanded = expandedId === record.id;
                  return (
                    <tr key={record.id} className="align-top hover:bg-[#FAF9F5]">
                      {/* Read ID */}
                      <td className="font-mono font-bold text-[#1B5E20] py-3">{record.id}</td>

                      {/* Length */}
                      <td className="py-3">{record.len} bp</td>

                      {/* GC % */}
                      <td className="font-mono text-[#2E7D32] font-semibold py-3">{record.gc}%</td>

                      {/* Status */}
                      <td className="py-3">
                        <span className="status-badge-pending">
                          {record.status}
                        </span>
                      </td>

                      {/* Taxonomy Hierarchy Placeholder Column */}
                      <td className="py-3 text-xs text-[#777777] italic">
                        <div className="text-[11px] font-sans text-[#666666]">
                          Kingdom &gt; Phylum &gt; Class &gt; Order &gt; Family &gt; Genus &gt; Species
                        </div>
                        <span className="text-[10px] text-[#E65100] font-semibold">Awaiting Classifier</span>
                      </td>

                      {/* Sequence Preview & Expand Toggle */}
                      <td className="py-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="dna-seq-box max-w-[220px] sm:max-w-[300px] truncate inline-block">
                              {record.seq}
                            </span>
                            <button
                              onClick={() => toggleExpand(record.id)}
                              className="px-2 py-1 text-xs text-[#2E7D32] font-semibold hover:underline flex items-center gap-1 cursor-pointer shrink-0"
                            >
                              {isExpanded ? (
                                <>
                                  <span>Collapse</span>
                                  <ChevronUp className="w-3.5 h-3.5" />
                                </>
                              ) : (
                                <>
                                  <span>View Full</span>
                                  <ChevronDown className="w-3.5 h-3.5" />
                                </>
                              )}
                            </button>
                          </div>

                          {/* Expanded Full Sequence Box */}
                          {isExpanded && (
                            <div className="p-3 bg-[#F5F5F5] border border-[#D7D6D0] rounded-sm space-y-2 text-xs">
                              <div className="font-bold text-[#1B5E20]">Full Nucleotide Sequence Read ({record.len} bp):</div>
                              <div className="dna-seq-box text-xs break-all leading-relaxed bg-white p-2">
                                {record.seq}
                              </div>
                              <div className="flex justify-end">
                                <button
                                  onClick={() => exportSingleReadToCSV(record)}
                                  className="px-3 py-1 bg-[#E8F5E9] text-[#1B5E20] border border-[#A5D6A7] font-semibold text-[11px] rounded-sm hover:bg-[#C8E6C9] flex items-center gap-1 cursor-pointer"
                                >
                                  <Download className="w-3 h-3" />
                                  <span>Export CSV Record</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-3 text-xs text-[#555555]">
            <div>
              Showing Page <span className="font-bold text-[#222222]">{page + 1}</span> of{' '}
              <span className="font-bold text-[#222222]">{totalPages}</span> ({filteredRecords.length} total records)
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="px-3 py-1 border border-[#D7D6D0] bg-white rounded-sm disabled:opacity-40 cursor-pointer"
              >
                Previous Page
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="px-3 py-1 border border-[#D7D6D0] bg-white rounded-sm disabled:opacity-40 cursor-pointer"
              >
                Next Page
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
