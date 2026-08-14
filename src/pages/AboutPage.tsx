import { useState } from 'react'

const whyItems = [
  {
    q: 'Why is species identification so difficult without DNA?',
    a: 'Morphological identification — the traditional method — requires years of expert training, is impossible with fragmented specimens, and fails entirely for life stages like eggs, larvae, or microscopic organisms. A single tropical tree can shed pollen indistinguishable from dozens of relatives. In gut contents, fecal samples, or environmental water, visual ID is simply not possible. DNA barcoding solves this by reading a molecular label that exists in every cell, regardless of the specimen\'s condition or life stage.',
  },
  {
    q: 'Why does biodiversity monitoring matter right now?',
    a: 'We are in the midst of the sixth mass extinction event, with species disappearing at an estimated 100–1,000 times the background rate. Most extinctions are occurring in groups — insects, nematodes, fungi — that are poorly catalogued. We cannot protect what we cannot identify. Rapid, scalable species identification through DNA barcoding is not merely useful — it is a prerequisite for understanding what we are losing and where conservation resources should go.',
  },
  {
    q: 'Why do we need a dedicated database platform?',
    a: 'Raw sequence data in public repositories like NCBI GenBank is enormous but unstructured for ecological use. Barcodes require curated reference libraries tied to voucher specimens, geographic coordinates, and taxonomic annotations. BIOCODE provides exactly this: a searchable, uploadable, versioned reference system designed for field scientists, not bioinformaticians. Your sequence goes in; a species match comes out.',
  },
  {
    q: 'Why the COI gene specifically?',
    a: 'The cytochrome oxidase I (COI) gene was selected as the standard animal barcode region by Paul Hebert\'s group at the University of Guelph in 2003. It evolves fast enough to distinguish species but slowly enough for primers to work across the animal kingdom. Its 658-bp "barcode region" can be amplified from a single hair, a dried museum specimen over a century old, or a drop of water from a pond. Plants use complementary markers (rbcL and matK) due to COI\'s lower variability in the plant kingdom.',
  },
]

const howSteps = [
  {
    step: '01',
    title: 'Specimen Collection',
    desc: 'A tissue sample is collected — a leg from an insect, a fin clip from a fish, a leaf punch from a plant, or even a water filter from an environmental sample. As little as 10 mg of tissue is sufficient. Samples are preserved in ethanol or dried and stored.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#14b8a6" strokeWidth="1.8"/>
        <circle cx="12" cy="9" r="2.5" stroke="#d4a843" strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    step: '02',
    title: 'DNA Extraction',
    desc: 'Cells are lysed and genomic DNA is isolated using chemical or mechanical methods. Kits like the DNeasy Blood & Tissue Kit are standard. The goal is a clean DNA solution free of PCR inhibitors that would block downstream amplification.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6 3c0 2 4 2 4 4S6 9 6 11s4 2 4 4-4 2-4 4" stroke="#14b8a6" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M18 3c0 2-4 2-4 4s4 2 4 4-4 2-4 4 4 2 4 4" stroke="#d4a843" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    step: '03',
    title: 'PCR Amplification',
    desc: 'Universal primers — LCO1490 and HCO2198 for COI — amplify just the 658-bp barcode region from the mixed genomic DNA. The polymerase chain reaction creates millions of copies of this specific fragment. Gel electrophoresis confirms a successful reaction.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="10" width="4" height="10" rx="1" fill="#14b8a6" fillOpacity="0.3" stroke="#14b8a6" strokeWidth="1.5"/>
        <rect x="10" y="6" width="4" height="14" rx="1" fill="#14b8a6" fillOpacity="0.3" stroke="#14b8a6" strokeWidth="1.5"/>
        <rect x="16" y="2" width="4" height="18" rx="1" fill="#d4a843" fillOpacity="0.3" stroke="#d4a843" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    step: '04',
    title: 'Sequencing',
    desc: 'The amplified product is sent for Sanger sequencing (for individual samples) or next-generation sequencing on platforms like Illumina MiSeq (for bulk environmental samples). The result is a string of A, T, G, C nucleotides — the barcode itself.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 10h16M4 14h10M4 18h12" stroke="#14b8a6" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="18" cy="16" r="3" stroke="#d4a843" strokeWidth="1.8"/>
        <path d="M20.5 18.5l2 2" stroke="#d4a843" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    step: '05',
    title: 'Database Matching',
    desc: 'The raw sequence is uploaded here (or to BOLD Systems / GenBank) and compared against curated reference libraries using algorithms like BLAST or machine-learning classifiers. A species identification is returned with a similarity percentage and confidence score.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#14b8a6" strokeWidth="1.8"/>
        <path d="M9 12l2 2 4-4" stroke="#d4a843" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    step: '06',
    title: 'Taxonomic Annotation & Reporting',
    desc: 'Confirmed identifications are attached to voucher specimen metadata — GPS coordinates, date, collector, habitat, and life stage. This georeferenced record enters the public database, enriching the global map of biodiversity and supporting future surveys.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#14b8a6" strokeWidth="1.8"/>
        <path d="M14 2v6h6" stroke="#14b8a6" strokeWidth="1.8"/>
        <path d="M8 13h8M8 17h5" stroke="#d4a843" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const faqs = [
  {
    q: 'How accurate is DNA barcoding for species identification?',
    a: 'For well-represented groups with complete reference libraries, accuracy exceeds 98%. Accuracy drops in taxa with sparse references, recent radiations with low COI divergence, or hybrid zones. Confidence scores and percentage similarity thresholds (typically >97% for species-level ID) guide interpretation.',
  },
  {
    q: 'Can I use this platform for environmental DNA (eDNA) samples?',
    a: 'Yes. FASTQ files from metabarcoding runs (Illumina, Oxford Nanopore, PacBio) can be uploaded directly. The pipeline handles multiplexed samples and outputs taxonomic profiles at the species, genus, or family level depending on barcode recovery quality.',
  },
  {
    q: 'Is the platform suitable for non-model organisms?',
    a: 'Absolutely — that\'s the point. Non-model organisms are the ones most poorly represented in traditional morphological keys. As long as a reference sequence exists in the database for the taxon (or a close relative), identification is possible. Contributing new reference barcodes is encouraged.',
  },
  {
    q: 'How should I cite sequences downloaded from this platform?',
    a: 'Each record has a citable DOI. For bulk downloads, cite the database version (e.g., "BIOCODE COI Reference Database v2.1, August 2026") and list the accession range in your methods section. Published analyses using >10 records should link to the platform for reproducibility.',
  },
  {
    q: 'What quality standards are required for uploaded sequences?',
    a: 'Sequences should be a minimum of 300 bp for partial barcodes, or 500+ bp for standard BOLD-compatible records. Phred quality scores below Q20 should be trimmed. Ambiguous bases (N) are tolerated up to 5% of the read length. Sequences failing quality checks are flagged in the dashboard.',
  },
]

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [openWhy, setOpenWhy] = useState<number | null>(0)

  return (
    <div>
      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: 420 }}>
        <img
          src="https://images.unsplash.com/photo-1760475267146-fd3747fb5054?w=1400&h=500&fit=crop&auto=format"
          alt="Archival natural history specimen illustration — two birds"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(6,15,28,0.97) 0%, rgba(6,15,28,0.85) 60%, rgba(6,15,28,0.7) 100%)' }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '90px 24px 70px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{ width: 36, height: 1, background: '#14b8a6' }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#14b8a6', letterSpacing: '0.12em', textTransform: 'uppercase' }}>About BIOCODE</span>
          </div>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: '#dde9f8', margin: '0 0 18px', lineHeight: 1.1, maxWidth: 680 }}>
            The Science Behind<br />
            <span style={{ color: '#14b8a6', fontWeight: 600 }}>DNA Barcoding</span>
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, lineHeight: 1.7, color: '#7a98b8', maxWidth: 560, margin: 0 }}>
            Understanding why molecular species identification is one of the most consequential tools in 21st-century biology — and how it actually works in practice.
          </p>
        </div>
      </section>

      {/* Mission statement */}
      <div style={{ background: '#0b1a2e', borderTop: '1px solid rgba(20,184,166,0.12)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#14b8a6', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
              Platform Mission
            </div>
            <blockquote style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 300, fontStyle: 'italic', color: '#dde9f8', lineHeight: 1.5, margin: 0 }}>
              "To make molecular species identification as routine and accessible as a GPS coordinate — every specimen, every habitat, every scientist, anywhere on Earth."
            </blockquote>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 24px' }}>

        {/* Why section */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36 }}>
            <div style={{ width: 40, height: 40, background: 'rgba(212,168,67,0.12)', border: '1px solid rgba(212,168,67,0.3)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Fraunces, serif', fontSize: 18, color: '#d4a843', fontWeight: 700 }}>?</span>
            </div>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 34, fontWeight: 400, color: '#dde9f8', margin: 0 }}>Why Is This Necessary?</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {whyItems.map((item, i) => (
              <div
                key={i}
                style={{
                  background: '#0b1a2e',
                  border: '1px solid',
                  borderColor: openWhy === i ? 'rgba(212,168,67,0.3)' : 'rgba(255,255,255,0.06)',
                  borderRadius: 10,
                  overflow: 'hidden',
                  marginBottom: 8,
                }}
              >
                <button
                  onClick={() => setOpenWhy(openWhy === i ? null : i)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <span style={{ fontFamily: 'Fraunces, serif', fontSize: 17, fontWeight: 600, color: '#dde9f8', flex: 1, paddingRight: 16 }}>
                    {item.q}
                  </span>
                  <span style={{ color: openWhy === i ? '#d4a843' : '#3a5577', fontSize: 22, lineHeight: 1, minWidth: 20, textAlign: 'center' }}>
                    {openWhy === i ? '−' : '+'}
                  </span>
                </button>
                {openWhy === i && (
                  <div style={{ padding: '0 24px 24px' }}>
                    <div style={{ width: 40, height: 1, background: 'rgba(212,168,67,0.4)', marginBottom: 14 }} />
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.75, color: '#7a98b8', margin: 0 }}>
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* How section */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36 }}>
            <div style={{ width: 40, height: 40, background: 'rgba(20,184,166,0.12)', border: '1px solid rgba(20,184,166,0.3)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 34, fontWeight: 400, color: '#dde9f8', margin: 0 }}>How Does It Work?</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {howSteps.map((step, i) => (
              <div
                key={step.step}
                className="card-hover"
                style={{
                  background: '#0b1a2e',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 12, padding: '24px',
                  display: 'flex', flexDirection: 'column', gap: 14,
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  {step.icon}
                  <span style={{ fontFamily: 'Fraunces, serif', fontSize: 36, fontWeight: 700, color: 'rgba(20,184,166,0.1)', lineHeight: 1 }}>
                    {step.step}
                  </span>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 600, color: '#dde9f8', margin: '0 0 10px' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, lineHeight: 1.7, color: '#7a98b8', margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
                {i < howSteps.length - 1 && (
                  <div style={{ position: 'absolute', right: -11, top: '50%', transform: 'translateY(-50%)', color: '#14b8a6', fontSize: 18, display: window.innerWidth > 900 ? 'block' : 'none' }}>
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Key facts banner */}
        <div style={{ background: 'linear-gradient(135deg, #0d9488 0%, #0b1a2e 60%)', borderRadius: 16, padding: '44px 40px', marginBottom: 80, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%', background: 'url(https://images.unsplash.com/photo-1760035989428-fdd19ce150de?w=600&h=400&fit=crop&auto=format) center/cover', opacity: 0.15 }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>By the Numbers</div>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 30, fontWeight: 400, color: '#fff', margin: '0 0 28px' }}>The Scale of the Challenge</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 24 }}>
              {[
                { val: '~8.7M', label: 'Estimated species on Earth' },
                { val: '<25%', label: 'Currently described' },
                { val: '~1M', label: 'Species threatened with extinction' },
                { val: '658 bp', label: 'Standard barcode length' },
                { val: '>10M', label: 'Barcodes in global databases' },
                { val: '2003', label: 'Year COI barcoding proposed' },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 600, color: '#fff', lineHeight: 1 }}>{item.val}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 34, fontWeight: 400, color: '#dde9f8', margin: 0 }}>Frequently Asked Questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  background: '#0b1a2e',
                  border: `1px solid ${openFaq === i ? 'rgba(20,184,166,0.25)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 10, overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 500, color: '#dde9f8', flex: 1, paddingRight: 16 }}>
                    {faq.q}
                  </span>
                  <span style={{ color: openFaq === i ? '#14b8a6' : '#3a5577', fontSize: 20, lineHeight: 1, minWidth: 20 }}>
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 22px 20px' }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.75, color: '#7a98b8', margin: 0 }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
