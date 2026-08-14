import { type Page } from '../App'

interface Props {
  navigate: (page: Page) => void
}

const stats = [
  { value: '74', label: 'DNA Sequences', sub: 'COI barcode reads' },
  { value: '28', label: 'Species Identified', sub: 'across 7 phyla' },
  { value: '12', label: 'Countries', sub: 'collection sites' },
  { value: '658 bp', label: 'Avg. Barcode Length', sub: 'standard COI region' },
]

const sections = [
  {
    id: 'dashboard' as Page,
    label: 'Data',
    title: 'Sequence Dashboard',
    desc: 'Search, upload, and analyze DNA barcode sequences. Import CSV, FASTA, or FASTQ files and explore records with rich filtering tools.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="#14b8a6" strokeWidth="1.8"/>
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="#14b8a6" strokeWidth="1.8"/>
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="#14b8a6" strokeWidth="1.8"/>
        <path d="M14 17.5h7M17.5 14v7" stroke="#d4a843" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    accent: '#14b8a6',
    tag: 'Upload & Search',
  },
  {
    id: 'downloads' as Page,
    label: 'Downloads',
    title: 'Downloadable Resources',
    desc: 'Access reference databases, alignment tools, sample datasets, and analysis pipelines. All resources are freely available.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 3v13m0 0l-4-4m4 4l4-4" stroke="#14b8a6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2" stroke="#d4a843" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    accent: '#d4a843',
    tag: 'Free Access',
  },
  {
    id: 'species' as Page,
    label: 'Species Info',
    title: 'Species Explorer',
    desc: 'Browse taxonomy, specimen records, geographic distribution, and trait profiles for identified species in the database.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="#14b8a6" strokeWidth="1.8"/>
        <path d="M11 7v4l2 2" stroke="#14b8a6" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M20 20l-3-3" stroke="#d4a843" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="11" cy="11" r="2" fill="#14b8a6" fillOpacity="0.3"/>
      </svg>
    ),
    accent: '#14b8a6',
    tag: 'Taxonomy',
  },
  {
    id: 'about' as Page,
    label: 'About',
    title: 'Why DNA Barcoding?',
    desc: 'Learn about the science behind the platform — why barcoding is necessary, how the technology works, and the mission driving this research.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#14b8a6" strokeWidth="1.8"/>
        <path d="M12 8v1m0 3v5" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="8.5" r="0.5" fill="#d4a843"/>
      </svg>
    ),
    accent: '#d4a843',
    tag: 'Science & Mission',
  },
]

const recentSeqs = [
  { id: 'SEQ_0000', len: 202, status: 'Processed', region: 'COI' },
  { id: 'SEQ_0007', len: 198, status: 'Processed', region: 'COI' },
  { id: 'SEQ_0014', len: 206, status: 'Processed', region: 'COI' },
  { id: 'SEQ_0021', len: 195, status: 'Pending', region: 'COI' },
  { id: 'SEQ_0028', len: 203, status: 'Processed', region: 'COI' },
]

export default function HomePage({ navigate }: Props) {
  return (
    <div>
      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: 580 }}>
        <img
          src="https://images.unsplash.com/photo-1675611215498-886c954d9266?w=1600&h=700&fit=crop&auto=format"
          alt="Dense forest canopy — biodiversity habitat"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 60%',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(6,15,28,0.95) 0%, rgba(6,15,28,0.75) 50%, rgba(6,15,28,0.88) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(20,184,166,0.03) 40px, rgba(20,184,166,0.03) 41px)',
        }} />

        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '100px 24px 80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{ width: 36, height: 1, background: '#14b8a6' }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#14b8a6', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              DNA Barcoding Database
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 300,
            lineHeight: 1.08,
            color: '#dde9f8',
            margin: '0 0 20px',
            maxWidth: 720,
          }}>
            Decoding Life,<br />
            <span style={{ color: '#14b8a6', fontWeight: 600 }}>One Barcode</span>
            {' '}at a Time
          </h1>

          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 18,
            lineHeight: 1.7,
            color: '#7a98b8',
            maxWidth: 560,
            margin: '0 0 36px',
          }}>
            A comprehensive platform for DNA barcode sequence analysis, species identification, and biodiversity monitoring. Upload your sequences and let the data speak.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => navigate('dashboard')} style={{ fontSize: 15, padding: '12px 28px' }}>
              Explore Database
            </button>
            <button className="btn-outline" onClick={() => navigate('about')} style={{ fontSize: 15, padding: '12px 28px' }}>
              Learn How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ background: '#0b1a2e', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 24px',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: '28px 24px',
              borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 34, fontWeight: 600, color: '#14b8a6', lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#dde9f8', marginTop: 6 }}>
                {s.label}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#3a5577', marginTop: 2 }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section cards */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 24px' }}>
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 36, fontWeight: 400, color: '#dde9f8', margin: '0 0 12px' }}>
            Platform Sections
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#7a98b8', margin: 0 }}>
            Navigate to any section — each opens as a dedicated research tool.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {sections.map(sec => (
            <button
              key={sec.id}
              onClick={() => navigate(sec.id)}
              className="card-hover"
              style={{
                background: '#0b1a2e',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12,
                padding: '32px 28px',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                {sec.icon}
                <span className="badge" style={{ background: `${sec.accent}18`, color: sec.accent, border: `1px solid ${sec.accent}30` }}>
                  {sec.tag}
                </span>
              </div>
              <div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#3a5577', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                  {sec.label}
                </div>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 600, color: '#dde9f8', margin: '0 0 10px' }}>
                  {sec.title}
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, lineHeight: 1.65, color: '#7a98b8', margin: 0 }}>
                  {sec.desc}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: sec.accent, fontSize: 13, fontWeight: 500, marginTop: 'auto' }}>
                Open section
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Recent sequences preview */}
      <section style={{ background: '#0b1a2e', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
            <div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#14b8a6', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                Recent Activity
              </div>
              <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 26, fontWeight: 400, color: '#dde9f8', margin: 0 }}>
                Latest Sequence Records
              </h2>
            </div>
            <button className="btn-outline" onClick={() => navigate('dashboard')} style={{ whiteSpace: 'nowrap' }}>
              View All →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '160px 80px 80px 100px 1fr',
              padding: '10px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
              color: '#3a5577', letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              <span>Read ID</span>
              <span>Length</span>
              <span>Region</span>
              <span>Status</span>
              <span>Sequence Preview</span>
            </div>
            {recentSeqs.map((seq, i) => (
              <div
                key={seq.id}
                className="seq-row"
                style={{
                  display: 'grid', gridTemplateColumns: '160px 80px 80px 100px 1fr',
                  padding: '14px 16px',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onClick={() => navigate('dashboard')}
              >
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#14b8a6' }}>{seq.id}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#7a98b8' }}>{seq.len} bp</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#d4a843' }}>{seq.region}</span>
                <span>
                  <span className="badge" style={{
                    background: seq.status === 'Processed' ? 'rgba(20,184,166,0.12)' : 'rgba(212,168,67,0.12)',
                    color: seq.status === 'Processed' ? '#14b8a6' : '#d4a843',
                    border: `1px solid ${seq.status === 'Processed' ? 'rgba(20,184,166,0.25)' : 'rgba(212,168,67,0.25)'}`,
                  }}>
                    {seq.status}
                  </span>
                </span>
                <span className="dna-chip" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', opacity: 0.6 }}>
                  GGTACTGCCTTAAGACTTCTAATTCGCGCCGAATTAGGACAATCTGGAAGTCTAATTGG…
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero image 2 / CTA */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: 320 }}>
        <img
          src="https://images.unsplash.com/photo-1683090531378-774503de9b08?w=1400&h=400&fit=crop&auto=format"
          alt="Butterfly on flower — biodiversity specimen"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(6,15,28,0.95) 40%, rgba(6,15,28,0.6) 100%)' }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '80px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 34, fontWeight: 400, color: '#dde9f8', margin: 0, maxWidth: 500 }}>
            Have sequence data to contribute?
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#7a98b8', margin: 0, maxWidth: 460 }}>
            Upload your CSV, FASTA, or FASTQ files directly to the dashboard. Your data enriches the global biodiversity record.
          </p>
          <div>
            <button className="btn-primary" onClick={() => navigate('dashboard')} style={{ fontSize: 15, padding: '12px 28px' }}>
              Start Uploading
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
