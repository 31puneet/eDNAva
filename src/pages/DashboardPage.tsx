import { useState, useRef, DragEvent } from 'react'

const ALL_SEQUENCES = [
  { id: 'SEQ_0000', len: 202, gc: 48.5, seq: 'GGTACTGCCTTAAGACTTCTAATTCGCGCCGAATTAGGACAATCTGGAAGTCTAATTGGAGATGATCAGATCTACAATGTGATTGTTACGGCTCATGCGTTCGTAATAATTTTCTTCATAGTTATGCCAATCATGATTGGGGGATTTGGAAACTGACTAGTTCCTTAAATATTAGGGCCCCTGACATGGCTTTCCCTCGAC' },
  { id: 'SEQ_0001', len: 198, gc: 46.2, seq: 'GTGGGGGGTGCTGTAGAAAGAGGTGCTGGCACAGGGTGAACTGTATACCCTCCTCTTTCTGCAGGAATTGCCCATGCGGGAGCATCTGTGGATCTTAGAATTTTTTCTTTACATCTTGCAGGAATTTCCCATGCGGGAGCATCTGTGGATCTTAGAATTTTTCTTTTACATCTTGCAGGAATTGCCCATGCG' },
  { id: 'SEQ_0002', len: 195, gc: 47.1, seq: 'TGCCAATCATGTTGGGGGATTTGGAAACTGACTAGTTCCTTTAATATTAGGGCCCCTGACATGGCTTTCCCTCGACTTAATAATCTTAGATTCTGATTCTTACCCCCTGCATTAACTTTGCTCTTGGTGGGGGGTGCTGTAGAAAGAGGTGCTGGCACAGGGTGAACTGTATAC' },
  { id: 'SEQ_0003', len: 201, gc: 49.0, seq: 'CTGCAGGAATTGCCCATGCGGGAGCATCTGTGGATCTTAGAATTTTTTCTTTACATCTTGCAGGAATCTCCTCTATTCTTGGAGCTGTGAACTTCATTACTACTATTATCAATATACGATCTTTGGGATAAGATTAGATCGTATCCCTTATTTGTCTGAGCAGTGGGTATCACCGCCTTACTTTTACTCCTTAGCCTC' },
  { id: 'SEQ_0004', len: 199, gc: 45.8, seq: 'TTAGAATTTTTCTTTACATCTTGCAGGAATCTCCTCTATTCTTGGAGCTGTGAACTTCATTACTACTATTATCAATATACGATCTTTGGGATAAGATTAGATCGTATCCCTTATTTGTCTGAGCAGTGGGTATCACCGCCTTACTTTACTCCTTAGCCTC' },
  { id: 'SEQ_0005', len: 203, gc: 47.8, seq: 'AGCATCTGTGGATCTTAGAATTTTTTTCTTTACATCTTGCAGGAATCTCCTCTATTCTTGGAGCTGTGAACTTCATTACTACTATTATCAATATACGATCTTTGGGATAAGATTAGATCGTATCCCTTATTTGTCTGAGCAGTGGGTATCACCGCCTTACT' },
  { id: 'SEQ_0006', len: 196, gc: 48.2, seq: 'TTCTAATTCGCGCCGAATTAGGACAATCTGGAAGTCTAATTGGAGATGATCAGATCTACAATGTGATTGTTACGGCTCATGCGTTCGTAATAATTTTCTTCATAGTTATGCCAATCATGATTGGGGGATTTGGAAACTGACTAGTTCCTTAAATATTAGGGCCCCTGACATGGCTTTCCCTCGACTTAATAATCTTAG' },
  { id: 'SEQ_0007', len: 198, gc: 46.6, seq: 'CTTTTTTTTTCTGTATTTGGTCAGGAATAGTAGGTACTGCCTTAAGACTTCTAATTCGCGCCGAATTAGGACAATCTGGAAGTCTAATTGGAGATGATCAGATCTACAATGTGATTGTTACGGCTCATGCGTTCGTAATAATTTTCTTCATAGTTATGCCAATCATGATTGGG' },
  { id: 'SEQ_0008', len: 204, gc: 47.3, seq: 'GGTGAACTGTATACCCTCCTCTTTCTGCAGGAATTGCCCATGCGGGAGCATCTGTGGATCTTAGAATTTTTTCTTTACATCTTGCAGGAATCTCCTCTATTCTTGGAGCTGTGAACTTCATTACTACTATTATCAATATACGATCTTTGGGATAAGATTAGATCGTATCC' },
  { id: 'SEQ_0009', len: 197, gc: 45.5, seq: 'ATTAACTTTGCTCTTGGTGGGGGGTGCTGTAGAAAGAGGTGCTGGCACAGGGTGAACTGTATACCCTCCTCTTTCTGCAGGAATTGCCCATGCGGGAGCATCTGTGGATCTTAGAATTTTTTCTTTACATCTTGCAGGAATCTCCTCTATTCTTGGAGCTGTGAACTTCATTAC' },
  { id: 'SEQ_0010', len: 200, gc: 48.0, seq: 'CAATGTGATTGTTACGGCTCATGCGTTCGTAATAATTTTCTTCATAGTTATGCCAATCATGATTGGGGGATTTGGAAACTGACTAGTTCCTTAAATATTAGGGCCCCTGACATGGCTTTCCCTCGACTTAATAATCTTAGATTCTGATTCTTACCCCCTGCATTAACTTTGCTCTT' },
  { id: 'SEQ_0011', len: 201, gc: 46.9, seq: 'AATCTGGAAGTCTAATTGGAGATGATCAGATCTACAATGTGATTGTTACGGCTCATGCGTTCGTAATAATTTTCTTCATAGTTATGCCAATCATGATTGGGGGATTTGGAAACTGACTAGTTCCTTAAATATTAGGGCCCCTGACATGGCTTTCCCTCGACTTAATAATCTTAGAT' },
  { id: 'SEQ_0012', len: 198, gc: 47.5, seq: 'CCAATCATGATTGGGGGATTTGGAAACTGACTAGTTCCTTTAATATTAGGGCCCCTGACATGGCTTTCCCTCGACTTAATAATCTTAGATTCTGATTCTTACCCCCTGCATTAACTTTGCTCTTGGTGGGGGGTGCTGTAGAAAGAGGTGCTGGCACAGGGTGAACTGTATAC' },
  { id: 'SEQ_0013', len: 202, gc: 48.8, seq: 'GAATAGTAGGTACTGCCTTAAGACTTCTAATTCGCGCCGAATTAGGACAATCTGGAAGTCTAATTGGAGATGATCAGATCTACAATGTGATTGTTACGGCTCATGCGTTCGTAATAATTTTCTTCATAGTTATGCCAATCATGATTGGGGGATTTGGAAACTGACTAGTTCCTTTAATATTAGGGCCCCTGACATGGCT' },
  { id: 'SEQ_0014', len: 199, gc: 47.0, seq: 'GATTGTTACGGCTCATGCGTTCGTAATAATTTTCTTCATAGTTATGCCAATCATGATTGGGGGATTTGGAAACTGACTAGTTCCTTAAATATTAGGGCCCCTGACATGGCTTTCCCTCGACTTAATAATCTTAGATTCTGATTCTTACCCCCTGCATTAACTTTGCTCTTGGTGGGGGG' },
  { id: 'SEQ_0015', len: 196, gc: 46.4, seq: 'TTTTTTCTGTATTTGGTCAGGAATAGTAGGTACTGCCTTAAGACTTCTAATTCGCGCCGAATTAGGACAATCTGGAAGTCTAATTGGAGATGATCAGATCTACAATGTGATTGTTACGGCTCATGCGTTCGTAATAATTTTCTTCATAGTTATGCCAATCATGATTGGGG' },
  { id: 'SEQ_0016', len: 203, gc: 48.3, seq: 'GCACAGGGTGAACTGTATACCCTCCTCTTTCTGCAGGAATTGCCCATGCGGGAGCATCTGTGGATCTTAGAATTTTTTTCTTTACATCTTGCAGGAATCTCCTCTATTCTTGGAGCTGTGAACTTCATTACTACTATTATCAATATACGATCTTTGGGATAAGATTAGATCGTATCC' },
  { id: 'SEQ_0017', len: 200, gc: 47.2, seq: 'CTGCCCTTAAGACTTCTAATTCGCGCCGAATTAGGACAATCTGGAAGTCTAATTGGAGATGATCAGATCTACAATGTGATTGTTACGGCTCATGCGTTCGTAATAATTTTCTTCATAGTTATGCCAATCATGATTGGGGGATTTGGAAACTGACTAGTTCCTTAAATATTAGGG' },
  { id: 'SEQ_0018', len: 198, gc: 46.7, seq: 'TGAACTGTATACCCTCCTCTTTCTGCAGGAATTGCCCATGCGGGAGCATCTGTGGATCTTAGAATTTTTTTCTTTACATCTTGCAGGAATCTCCTCTATTCTTGGAGCTGTGAACTTCATTACTACTATTATCAATATACGATCTTTGGGATAAGATTAGATCGTATCCCTTATTTGTCT' },
  { id: 'SEQ_0019', len: 201, gc: 47.9, seq: 'GTATTTGGTCAGGAATAGTAGGTACTGCCTTAAGACTTCTAATTCGCGCCGAATTAGGACAATCTGGAAGTCTAATTGGAGATGATCAGATCTACAATGTGATTGTTACGGCTCATGCGTTCGTAATAATTTTCTTCATAGTTATGCCAATCATGATTGGGGGATTTGGAAACTGACTAGTTCCT' },
  { id: 'SEQ_0020', len: 199, gc: 48.1, seq: 'GTGCTGGCACAGGGTGAACTGTATACCCTCCTCTTTCTGCAGGAATTGCCCATGCGGGAGCATCTGTGGATCTTAGAATTTTTTTCTTTACATCTTGCAGGAATCTCCTCTATTCTTGGAGCTGTGAACTTCATTACTACTATTATCAATATACGATCTTTGGGATAAGATTAGATCGTAT' },
  { id: 'SEQ_0021', len: 197, gc: 46.3, seq: 'CCGAATTAGGACAATCTGGAAGTCTAATTGGAGATGATCAGATCTACAATGTGATTGTTACGGCTCATGCGTTCGTAATAATTTTCTTCATAGTTATGCCAATCATGATTGGGGGATTTGGAAACTGACTAGTTCCTTAAATATTAGGGCCCCTGACATGGCTTTCCCTCGAC' },
  { id: 'SEQ_0022', len: 202, gc: 47.6, seq: 'CTTTCTGCAGGAATTGCCCATGCGGGAGCATCTGTGGATCTTAGAATTTTTTTCTTTACATCTTGCAGGAATCTCCTCTATTCTTGGAGCTGTGAACTTCATTACTACTATTATCAATATACGATCTTTGGGATAAGATTAGATCGTATCCCTTATTTGTCTGAGCAGTGGGTATCACCGCCT' },
  { id: 'SEQ_0023', len: 200, gc: 47.8, seq: 'ATCAGATCTACAATGTGATTGTTACGGCTCATGCGTTCGTAATAATTTTCTTCATAGTTATGCCAATCATGATTGGGGGATTTGGAAACTGACTAGTTCCTTAAATATTAGGGCCCCTGACATGGCTTTCCCTCGACTTAATAATCTTAGATTCTGATTCTTACCCCCTGCATTAACTTTGCTCT' },
  { id: 'SEQ_0024', len: 196, gc: 46.8, seq: 'AGAGGTGCTGGCACAGGGTGAACTGTATACCCTCCTCTTTCTGCAGGAATTGCCCATGCGGGAGCATCTGTGGATCTTAGAATTTTTTTCTTTACATCTTGCAGGAATCTCCTCTATTCTTGGAGCTGTGAACTTCATTACTACTATTATCAATATACGATCTTTGGGATAAGATT' },
  { id: 'SEQ_0025', len: 203, gc: 48.4, seq: 'ACTTCTAATTCGCGCCGAATTAGGACAATCTGGAAGTCTAATTGGAGATGATCAGATCTACAATGTGATTGTTACGGCTCATGCGTTCGTAATAATTTTCTTCATAGTTATGCCAATCATGATTGGGGGATTTGGAAACTGACTAGTTCCTTAAATATTAGGGCCCCTGACATGGCTTTCC' },
  { id: 'SEQ_0026', len: 198, gc: 46.5, seq: 'GTTCGTAATAATTTTCTTCATAGTTATGCCAATCATGATTGGGGGATTTGGAAACTGACTAGTTCCTTTAATATTAGGGCCCCTGACATGGCTTTCCCTCGACTTAATAATCTTAGATTCTGATTCTTACCCCCTGCATTAACTTTGCTCTTGGTGGGGGGTGCTGTAGAAAGAGGTGCTGGCACAGG' },
  { id: 'SEQ_0027', len: 200, gc: 47.0, seq: 'GATTTGGAAACTGACTAGTTCCTTTAATATTAGGGCCCCTGACATGGCTTTCCCTCGACTTAATAATCTTAGATTCTGATTCTTACCCCCTGCATTAACTTTGCTCTTGGTGGGGGGTGCTGTAGAAAGAGGTGCTGGCACAGGGTGAACTGTATACCCTCCTCTTTCTGCAGG' },
  { id: 'SEQ_0028', len: 202, gc: 47.7, seq: 'CCCCTGACATGGCTTTCCCTCGACTTAATAATCTTAGATTCTGATTCTTACCCCCTGCATTAACTTTGCTCTTGGTGGGGGGTGCTGTAGAAAGAGGTGCTGGCACAGGGTGAACTGTATACCCTCCTCTTTCTGCAGGAATTGCCCATGCGGGAGCATCTGTGGATCTTAGAATTTTTTT' },
]

type FileType = 'CSV' | 'FASTA' | 'FASTQ' | null

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [dragging, setDragging] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; type: FileType; size: string }[]>([])
  const [expandedSeq, setExpandedSeq] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const fileRef = useRef<HTMLInputElement>(null)
  const PER_PAGE = 10

  const filtered = ALL_SEQUENCES.filter(s => {
    const q = searchQuery.toLowerCase()
    return s.id.toLowerCase().includes(q) || s.seq.toLowerCase().includes(q)
  })
  const paginated = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE)
  const totalPages = Math.ceil(filtered.length / PER_PAGE)

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    const files = Array.from(e.dataTransfer.files)
    processFiles(files)
  }

  const processFiles = (files: File[]) => {
    const newFiles = files.map(f => {
      let type: FileType = null
      if (f.name.endsWith('.csv')) type = 'CSV'
      else if (f.name.endsWith('.fasta') || f.name.endsWith('.fa')) type = 'FASTA'
      else if (f.name.endsWith('.fastq') || f.name.endsWith('.fq')) type = 'FASTQ'
      const size = f.size > 1024 * 1024 ? `${(f.size / 1024 / 1024).toFixed(1)} MB` : `${(f.size / 1024).toFixed(0)} KB`
      return { name: f.name, type, size }
    })
    setUploadedFiles(prev => [...newFiles, ...prev])
  }

  const gcColor = (gc: number) => {
    if (gc < 45) return '#d4a843'
    if (gc > 52) return '#e07060'
    return '#14b8a6'
  }

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px' }}>
      {/* Page header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#14b8a6', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
          Data Section
        </div>
        <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 40, fontWeight: 400, color: '#dde9f8', margin: '0 0 10px' }}>
          Sequence Dashboard
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#7a98b8', margin: 0 }}>
          Search the barcode database, upload new sequence files, and explore individual records.
        </p>
      </div>

      {/* Upload zone */}
      <div style={{ marginBottom: 40, background: '#0b1a2e', borderRadius: 14, padding: 28, border: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 600, color: '#dde9f8', margin: 0 }}>
            Upload Sequence Files
          </h2>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['CSV', 'FASTA', 'FASTQ'] as const).map(fmt => (
              <span key={fmt} className="badge" style={{ background: 'rgba(20,184,166,0.1)', color: '#14b8a6', border: '1px solid rgba(20,184,166,0.2)' }}>
                .{fmt.toLowerCase()}
              </span>
            ))}
          </div>
        </div>

        <div
          className={`upload-zone${dragging ? ' dragging' : ''}`}
          style={{ padding: '48px 24px', textAlign: 'center' }}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
        >
          <input
            ref={fileRef}
            type="file"
            multiple
            accept=".csv,.fasta,.fa,.fastq,.fq"
            style={{ display: 'none' }}
            onChange={e => processFiles(Array.from(e.target.files || []))}
          />
          <div style={{ marginBottom: 16 }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.5 }}>
              <path d="M12 3v13m0-13L8 7m4-4l4 4" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#7a98b8', margin: '0 0 6px' }}>
            Drag & drop your files here, or <span style={{ color: '#14b8a6', textDecoration: 'underline' }}>browse</span>
          </p>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#3a5577', margin: 0 }}>
            Accepts .csv · .fasta / .fa · .fastq / .fq
          </p>
        </div>

        {uploadedFiles.length > 0 && (
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#3a5577', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
              Queued Files
            </div>
            {uploadedFiles.map((f, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '10px 14px',
                background: '#102038', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)',
              }}>
                <span className="badge" style={{ background: 'rgba(20,184,166,0.15)', color: '#14b8a6', border: '1px solid rgba(20,184,166,0.25)', minWidth: 52 }}>
                  {f.type || '???'}
                </span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#dde9f8', flex: 1 }}>{f.name}</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#3a5577' }}>{f.size}</span>
                <span className="badge" style={{ background: 'rgba(20,184,166,0.1)', color: '#14b8a6' }}>Ready</span>
                <button
                  onClick={() => setUploadedFiles(prev => prev.filter((_, j) => j !== i))}
                  style={{ background: 'none', border: 'none', color: '#3a5577', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: '0 2px' }}
                >×</button>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button className="btn-primary">Process All Files</button>
              <button className="btn-outline" onClick={() => setUploadedFiles([])}>Clear Queue</button>
            </div>
          </div>
        )}
      </div>

      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 260, position: 'relative' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#3a5577' }}>
            <circle cx="11" cy="11" r="7" stroke="#3a5577" strokeWidth="2"/>
            <path d="M20 20l-3-3" stroke="#3a5577" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            placeholder="Search by read ID or sequence…"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setPage(0) }}
            style={{ paddingLeft: 40 }}
          />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ width: 160 }}>
          <option value="all">All Records</option>
          <option value="processed">Processed</option>
          <option value="pending">Pending</option>
        </select>
        <button className="btn-outline">
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div style={{ background: '#0b1a2e', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
        {/* Table header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '140px 80px 80px 70px 1fr 40px',
          padding: '12px 20px',
          background: '#102038',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
          color: '#3a5577', letterSpacing: '0.07em', textTransform: 'uppercase',
        }}>
          <span>Read ID</span>
          <span>Length</span>
          <span>GC %</span>
          <span>Region</span>
          <span>Sequence</span>
          <span></span>
        </div>

        {paginated.map((seq, i) => (
          <div key={seq.id}>
            <div
              className="seq-row"
              style={{
                display: 'grid', gridTemplateColumns: '140px 80px 80px 70px 1fr 40px',
                padding: '13px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => setExpandedSeq(expandedSeq === seq.id ? null : seq.id)}
            >
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#14b8a6' }}>{seq.id}</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#7a98b8' }}>{seq.len} bp</span>
              <span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: gcColor(seq.gc) }}>
                  {seq.gc.toFixed(1)}%
                </span>
              </span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#d4a843' }}>COI</span>
              <span className="dna-chip" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', opacity: 0.55 }}>
                {seq.seq.slice(0, 80)}…
              </span>
              <span style={{ color: '#3a5577', fontSize: 18, textAlign: 'center', userSelect: 'none' }}>
                {expandedSeq === seq.id ? '▾' : '▸'}
              </span>
            </div>
            {expandedSeq === seq.id && (
              <div style={{
                padding: '16px 20px 20px',
                background: '#060f1c',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{ display: 'flex', gap: 20, marginBottom: 14, flexWrap: 'wrap' }}>
                  {[
                    { label: 'Read ID', val: seq.id },
                    { label: 'Length', val: `${seq.len} bp` },
                    { label: 'GC Content', val: `${seq.gc.toFixed(1)}%` },
                    { label: 'Region', val: 'COI (Cytochrome Oxidase I)' },
                    { label: 'Status', val: 'Processed' },
                  ].map(item => (
                    <div key={item.label}>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#3a5577', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 3 }}>
                        {item.label}
                      </div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#dde9f8' }}>
                        {item.val}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#3a5577', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 8 }}>
                  Full DNA Sequence
                </div>
                <div className="dna-chip" style={{
                  background: '#0b1a2e',
                  border: '1px solid rgba(20,184,166,0.15)',
                  borderRadius: 8,
                  padding: '14px 16px',
                  fontSize: 12,
                  opacity: 1,
                  letterSpacing: '0.06em',
                  lineHeight: 1.8,
                }}>
                  {seq.seq}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#3a5577' }}>
          Showing {page * PER_PAGE + 1}–{Math.min((page + 1) * PER_PAGE, filtered.length)} of {filtered.length} records
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            className="btn-outline"
            style={{ padding: '6px 14px', fontSize: 13 }}
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              style={{
                padding: '6px 12px', fontSize: 13, borderRadius: 6, border: 'none', cursor: 'pointer',
                background: page === i ? '#14b8a6' : '#102038',
                color: page === i ? '#060f1c' : '#7a98b8',
                fontWeight: page === i ? 700 : 400,
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="btn-outline"
            style={{ padding: '6px 14px', fontSize: 13 }}
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
