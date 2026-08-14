import { useState } from 'react'

const categories = [
  {
    title: 'Reference Databases',
    icon: '🗄',
    items: [
      {
        name: 'BIOCODE COI Reference Database v2.1',
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
      {
        name: 'Marine Invertebrate COI Library',
        desc: 'Barcodes for polychaetes, echinoderms, molluscs, and crustaceans from coastal to deep-sea habitats.',
        format: 'CSV',
        size: '67 MB',
        records: '14,300 sequences',
        updated: 'May 2026',
        featured: false,
      },
    ],
  },
  {
    title: 'Sample Datasets',
    icon: '🧬',
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
        desc: 'Raw Illumina reads with quality scores for a mixed-species environmental sample. Ideal for testing quality filtering workflows.',
        format: 'FASTQ',
        size: '12 MB',
        records: '48,000 reads',
        updated: 'Jul 2026',
        featured: false,
      },
      {
        name: 'Multi-Locus Barcode Set',
        desc: 'Paired COI + ITS2 sequences for 200 plant-insect interaction specimens from a tropical transect.',
        format: 'FASTA',
        size: '8.4 MB',
        records: '400 sequences',
        updated: 'Jun 2026',
        featured: false,
      },
    ],
  },
  {
    title: 'Analysis Tools',
    icon: '🔧',
    items: [
      {
        name: 'BioCode Alignment Pipeline v1.4',
        desc: 'Shell scripts + Python wrappers for end-to-end barcode processing: quality filtering, alignment to reference, and species ID scoring.',
        format: 'ZIP',
        size: '34 MB',
        records: 'Python 3.10+',
        updated: 'Aug 2026',
        featured: true,
      },
      {
        name: 'Species ID Classifier (ML Model)',
        desc: 'Pre-trained random forest model for COI-based species identification. Includes training data and evaluation notebooks.',
        format: 'ZIP',
        size: '156 MB',
        records: 'scikit-learn 1.4',
        updated: 'Jul 2026',
        featured: false,
      },
      {
        name: 'GC Content & Quality Filter Script',
        desc: 'Lightweight Python script for filtering sequences by GC content, length, and Phred quality score thresholds.',
        format: 'ZIP',
        size: '420 KB',
        records: 'Python 3.8+',
        updated: 'May 2026',
        featured: false,
      },
    ],
  },
  {
    title: 'Documentation',
    icon: '📄',
    items: [
      {
        name: 'Platform User Manual',
        desc: 'Complete guide to uploading data, searching the database, interpreting GC content, and exporting results.',
        format: 'PDF',
        size: '3.2 MB',
        records: '92 pages',
        updated: 'Aug 2026',
        featured: false,
      },
      {
        name: 'COI Barcode Protocol (Wet Lab)',
        desc: 'Step-by-step wet lab protocol for COI amplification, including primer sequences, PCR conditions, and Sanger sequencing prep.',
        format: 'PDF',
        size: '1.8 MB',
        records: '24 pages',
        updated: 'Mar 2026',
        featured: false,
      },
      {
        name: 'Taxonomy Annotation Checklist',
        desc: 'Reference CSV matching informal species names to ITIS-approved taxonomy. Updated quarterly from the GBIF backbone.',
        format: 'CSV',
        size: '8.1 MB',
        records: '312,000 entries',
        updated: 'Aug 2026',
        featured: false,
      },
    ],
  },
]

const formatColor = (f: string) => {
  const map: Record<string, { bg: string; text: string }> = {
    CSV: { bg: 'rgba(20,184,166,0.12)', text: '#14b8a6' },
    FASTA: { bg: 'rgba(212,168,67,0.12)', text: '#d4a843' },
    FASTQ: { bg: 'rgba(160,100,220,0.12)', text: '#c084fc' },
    ZIP: { bg: 'rgba(96,165,250,0.12)', text: '#60a5fa' },
    PDF: { bg: 'rgba(248,113,113,0.12)', text: '#f87171' },
  }
  return map[f] || { bg: 'rgba(255,255,255,0.08)', text: '#7a98b8' }
}

export default function DownloadsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [downloading, setDownloading] = useState<string | null>(null)

  const handleDownload = (name: string) => {
    setDownloading(name)
    setTimeout(() => setDownloading(null), 1800)
  }

  const displayed = activeCategory === 'all'
    ? categories
    : categories.filter(c => c.title === activeCategory)

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#14b8a6', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
          Downloads
        </div>
        <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 40, fontWeight: 400, color: '#dde9f8', margin: '0 0 10px' }}>
          Downloadable Resources
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#7a98b8', margin: 0 }}>
          Reference databases, sample datasets, analysis tools, and documentation — all freely available.
        </p>
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 36, flexWrap: 'wrap' }}>
        {['all', ...categories.map(c => c.title)].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 16px', borderRadius: 8, border: '1px solid', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
              background: activeCategory === cat ? '#14b8a6' : 'transparent',
              color: activeCategory === cat ? '#060f1c' : '#7a98b8',
              borderColor: activeCategory === cat ? '#14b8a6' : 'rgba(255,255,255,0.1)',
              transition: 'all 0.18s',
            }}
          >
            {cat === 'all' ? 'All Resources' : cat}
          </button>
        ))}
      </div>

      {/* Category sections */}
      {displayed.map(cat => (
        <div key={cat.title} style={{ marginBottom: 52 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
            <span style={{ fontSize: 20 }}>{cat.icon}</span>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 24, fontWeight: 600, color: '#dde9f8', margin: 0 }}>
              {cat.title}
            </h2>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
            {cat.items.map(item => {
              const fc = formatColor(item.format)
              const isDownloading = downloading === item.name
              return (
                <div
                  key={item.name}
                  className="card-hover"
                  style={{
                    background: '#0b1a2e',
                    border: `1px solid ${item.featured ? 'rgba(20,184,166,0.25)' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: 12,
                    padding: '24px',
                    display: 'flex', flexDirection: 'column', gap: 14,
                    position: 'relative',
                  }}
                >
                  {item.featured && (
                    <div style={{
                      position: 'absolute', top: 16, right: 16,
                      fontFamily: 'JetBrains Mono, monospace', fontSize: 9,
                      background: 'rgba(212,168,67,0.15)', color: '#d4a843',
                      border: '1px solid rgba(212,168,67,0.3)',
                      padding: '2px 7px', borderRadius: 4, letterSpacing: '0.08em', textTransform: 'uppercase',
                    }}>
                      Featured
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className="badge" style={{ background: fc.bg, color: fc.text, border: `1px solid ${fc.text}30`, fontSize: 12 }}>
                      .{item.format.toLowerCase()}
                    </span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#3a5577' }}>{item.size}</span>
                  </div>

                  <div>
                    <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 17, fontWeight: 600, color: '#dde9f8', margin: '0 0 8px', lineHeight: 1.3 }}>
                      {item.name}
                    </h3>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, lineHeight: 1.6, color: '#7a98b8', margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: 20, paddingTop: 4, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#3a5577', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>Records</div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#dde9f8' }}>{item.records}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#3a5577', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>Updated</div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#dde9f8' }}>{item.updated}</div>
                    </div>
                  </div>

                  <button
                    className="btn-primary"
                    onClick={() => handleDownload(item.name)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                  >
                    {isDownloading ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
                          <circle cx="12" cy="12" r="9" stroke="#060f1c" strokeWidth="2.5" strokeDasharray="28" strokeDashoffset="8"/>
                        </svg>
                        Preparing…
                      </>
                    ) : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M12 3v13m0 0l-4-4m4 4l4-4" stroke="#060f1c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="#060f1c" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        Download {item.format}
                      </>
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
