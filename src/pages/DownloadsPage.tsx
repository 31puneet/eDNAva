import { useState } from 'react'

const categories = [
  {
    title: 'Reference Databases',
    items: [
      {
        name: 'BOLD COI Reference Database v2.1',
        desc: 'Curated cytochrome oxidase I barcode reference library with taxonomic annotations. Compatible with BOLD, QIIME2, and custom BLAST pipelines.',
        format: 'CSV',
        size: '245 MB',
        records: '74,820 sequences',
        updated: 'Aug 2026',
        featured: true,
      },
      {
        name: 'Arthropoda Barcode Library',
        desc: 'Specialized reference collection for insect and arachnid COI barcodes across 6,200 species.',
        format: 'FASTA',
        size: '89 MB',
        records: '22,400 sequences',
        updated: 'Jul 2026',
        featured: false,
      },
      {
        name: 'Plant ITS2 Reference Set',
        desc: 'ITS2 region barcodes for vascular plants, bryophytes, and ferns. Curated from herbarium voucher specimens.',
        format: 'FASTA',
        size: '54 MB',
        records: '18,900 sequences',
        updated: 'Jun 2026',
        featured: false,
      },
    ],
  },
  {
    title: 'Sample Datasets',
    items: [
      {
        name: 'Tutorial Dataset — 74 COI Reads',
        desc: 'The complete sample dataset from this platform. Use this to test your analysis pipeline before running your own data.',
        format: 'CSV',
        size: '48 KB',
        records: '74 sequences',
        updated: 'Aug 2026',
        featured: true,
      },
      {
        name: 'FASTQ Quality-Scored Barcodes',
        desc: 'Raw Illumina reads with quality scores for a mixed-species environmental sample.',
        format: 'FASTQ',
        size: '12 MB',
        records: '48,000 reads',
        updated: 'Jul 2026',
        featured: false,
      },
    ],
  },
  {
    title: 'Analysis Tools & Documentation',
    items: [
      {
        name: 'BOLD Alignment Pipeline v1.4',
        desc: 'Python scripts + command-line tool wrappers for end-to-end barcode quality filtering, alignment, and species assignment.',
        format: 'ZIP',
        size: '34 MB',
        records: 'Python 3.10+',
        updated: 'Aug 2026',
        featured: true,
      },
      {
        name: 'Platform User Manual',
        desc: 'Complete guide to uploading sequence data, searching the taxonomy database, and exporting results.',
        format: 'PDF',
        size: '3.2 MB',
        records: '92 pages',
        updated: 'Aug 2026',
        featured: false,
      },
    ],
  },
]

export default function DownloadsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [downloading, setDownloading] = useState<string | null>(null)

  const handleDownload = (name: string) => {
    setDownloading(name)
    setTimeout(() => setDownloading(null), 1500)
  }

  const displayed = activeCategory === 'all'
    ? categories
    : categories.filter(c => c.title === activeCategory)

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px' }}>
      {/* Page Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#0284c7', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
          Open Data Access
        </div>
        <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: 32, fontWeight: 800, color: '#072b4a', margin: '0 0 8px' }}>
          BOLD Downloads & Resources
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#64748b', margin: 0 }}>
          Download reference libraries, sample datasets, alignment pipelines, and technical manuals.
        </p>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
        {['all', ...categories.map(c => c.title)].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 16px', borderRadius: 6, border: '1px solid', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
              background: activeCategory === cat ? '#0284c7' : '#ffffff',
              color: activeCategory === cat ? '#ffffff' : '#475569',
              borderColor: activeCategory === cat ? '#0284c7' : '#cbd5e1',
            }}
          >
            {cat === 'all' ? 'All Resources' : cat}
          </button>
        ))}
      </div>

      {/* Resource Sections */}
      {displayed.map(cat => (
        <div key={cat.title} style={{ marginBottom: 44 }}>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 22, fontWeight: 700, color: '#072b4a', margin: '0 0 16px' }}>
            {cat.title}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
            {cat.items.map(item => (
              <div
                key={item.name}
                className="card-hover"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 10,
                  padding: 24,
                  display: 'flex', flexDirection: 'column', gap: 14,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge" style={{ background: '#f0f9ff', color: '#0284c7', border: '1px solid #bae6fd' }}>
                    .{item.format.toLowerCase()}
                  </span>
                  <span style={{ fontSize: 12, color: '#64748b' }}>{item.size}</span>
                </div>

                <div>
                  <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, fontWeight: 700, color: '#072b4a', margin: '0 0 6px' }}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: '#475569', margin: 0 }}>
                    {item.desc}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, borderTop: '1px solid #f1f5f9', pt: 10 }}>
                  <span style={{ color: '#64748b' }}>Records: <strong>{item.records}</strong></span>
                  <span style={{ color: '#64748b' }}>Updated: {item.updated}</span>
                </div>

                <button
                  className="btn-primary"
                  onClick={() => handleDownload(item.name)}
                  style={{ width: '100%', padding: '9px 16px', fontSize: 13 }}
                >
                  {downloading === item.name ? 'Downloading File...' : `Download ${item.format}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

