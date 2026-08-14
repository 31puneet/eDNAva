import { useState } from 'react';
import { Search, Download, Plus, Filter, FileText, FileCode, CheckCircle2, ChevronRight, AlertCircle, RefreshCw } from 'lucide-react';
import { type Page } from '../App';
import { SequenceRecord, exportSingleReadToCSV, exportSingleReadToJSON, exportBulkToCSV } from '../data/sequencesDataset';

interface Props {
  navigate: (page: Page) => void;
  dataset: SequenceRecord[];
}

export default function DashboardPage({ navigate, dataset }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [minLenFilter, setMinLenFilter] = useState<number>(0);
  const [page, setPage] = useState(0);
  const PER_PAGE = 15;

  // Filter dataset dynamically based on search query & length range
  const filteredRecords = dataset.filter((record) => {
    const matchesSearch =
      record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.seq.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLen = record.len >= minLenFilter;

    return matchesSearch && matchesLen;
  });

  const paginatedRecords = filteredRecords.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
  const totalPages = Math.ceil(filteredRecords.length / PER_PAGE);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#D7D6D0] pb-4">
        <div>
          <div className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider mb-1">
            Official Data Portal Console
          </div>
          <h1 className="text-2xl font-extrabold text-[#1B5E20]">eDNA Sequence Reads & Quality Summary</h1>
          <p className="text-xs text-[#555555]">
            Listing {filteredRecords.length} of {dataset.length} total sequence records. All metrics computed live from the raw CSV dataset.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Bulk CSV Export Button */}
          <button
            onClick={() => exportBulkToCSV(filteredRecords)}
            className="btn-gov-outline flex items-center gap-2 text-xs"
            title="Download visible records as CSV"
          >
            <Download className="w-4 h-4" />
            <span>Bulk Export CSV ({filteredRecords.length})</span>
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

      {/* Dataset Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="gov-card p-4">
          <div className="text-xs text-[#666666] font-medium uppercase">Active Records</div>
          <div className="text-2xl font-extrabold text-[#1B5E20]">{dataset.length} Reads</div>
          <div className="text-xs text-[#555555]">Dataset: SEQ_0000 - SEQ_0199</div>
        </div>

        <div className="gov-card p-4">
          <div className="text-xs text-[#666666] font-medium uppercase">Avg Read Length</div>
          <div className="text-2xl font-extrabold text-[#1B5E20]">
            {(dataset.reduce((a, b) => a + b.len, 0) / dataset.length).toFixed(1)} bp
          </div>
          <div className="text-xs text-[#555555]">Range: 198 bp - 208 bp</div>
        </div>

        <div className="gov-card p-4">
          <div className="text-xs text-[#666666] font-medium uppercase">Avg GC Content</div>
          <div className="text-2xl font-extrabold text-[#1B5E20]">
            {(dataset.reduce((a, b) => a + b.gc, 0) / dataset.length).toFixed(1)}%
          </div>
          <div className="text-xs text-[#555555]">Computed from (G+C)/Total</div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="gov-card p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#777777]" />
            <input
              type="text"
              placeholder="Search read_id (e.g. SEQ_0045)..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-sm border border-[#D7D6D0] bg-white text-[#222222] focus:outline-none focus:border-[#2E7D32]"
            />
          </div>

          {/* Min Length Filter */}
          <div className="flex items-center gap-2 text-xs text-[#555555]">
            <Filter className="w-4 h-4 text-[#2E7D32]" />
            <span className="font-semibold text-[#222222]">Min Length:</span>
            <select
              value={minLenFilter}
              onChange={(e) => { setMinLenFilter(Number(e.target.value)); setPage(0); }}
              className="px-2 py-1.5 rounded-sm border border-[#D7D6D0] bg-white text-xs text-[#222222] focus:outline-none"
            >
              <option value={0}>All Lengths</option>
              <option value={200}>&gt;= 200 bp</option>
              <option value={203}>&gt;= 203 bp</option>
              <option value={205}>&gt;= 205 bp</option>
            </select>
          </div>
        </div>

        {/* Reads Table */}
        <div className="overflow-x-auto border border-[#D7D6D0] rounded-sm">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Read ID</th>
                <th>Sequence Length</th>
                <th>GC Content %</th>
                <th>Classification Status</th>
                <th>DNA Sequence Read Preview</th>
                <th className="text-right">Export Read</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#666666]">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle className="w-6 h-6 text-[#888888]" />
                      <span>No matching sequence reads found.</span>
                      <button
                        onClick={() => { setSearchTerm(''); setMinLenFilter(0); }}
                        className="text-xs text-[#2E7D32] underline font-semibold cursor-pointer"
                      >
                        Reset filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedRecords.map((record) => (
                  <tr key={record.id}>
                    {/* Read ID */}
                    <td className="font-mono font-bold text-[#1B5E20]">{record.id}</td>

                    {/* Sequence Length */}
                    <td>{record.len} bp</td>

                    {/* GC Content */}
                    <td className="font-mono text-[#2E7D32] font-semibold">{record.gc}%</td>

                    {/* Classification Status (Honest placeholder) */}
                    <td>
                      <span className="status-badge-pending">
                        {record.status}
                      </span>
                    </td>

                    {/* Sequence Snippet */}
                    <td>
                      <span className="dna-seq-box max-w-[260px] inline-block truncate" title={record.seq}>
                        {record.seq.slice(0, 50)}...
                      </span>
                    </td>

                    {/* Export Actions */}
                    <td className="text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => exportSingleReadToCSV(record)}
                          className="px-2.5 py-1 rounded-sm bg-[#E8F5E9] hover:bg-[#C8E6C9] text-[#1B5E20] text-xs font-semibold border border-[#A5D6A7] cursor-pointer"
                          title="Export single read as CSV"
                        >
                          CSV
                        </button>
                        <button
                          onClick={() => exportSingleReadToJSON(record)}
                          className="px-2.5 py-1 rounded-sm bg-[#F5F5F5] hover:bg-[#E0E0E0] text-[#424242] text-xs font-semibold border border-[#BDBDBD] cursor-pointer"
                          title="Export single read as JSON"
                        >
                          JSON
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-2 text-xs text-[#555555]">
            <div>
              Showing Page <span className="font-bold text-[#222222]">{page + 1}</span> of{' '}
              <span className="font-bold text-[#222222]">{totalPages}</span> ({filteredRecords.length} records)
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
    </div>
  );
}
