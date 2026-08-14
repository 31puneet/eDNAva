import { useState } from 'react'

const SPECIES = [
  {
    id: 'sp001',
    common: 'Monarch Butterfly',
    scientific: 'Danaus plexippus',
    family: 'Nymphalidae',
    order: 'Lepidoptera',
    class: 'Insecta',
    phylum: 'Arthropoda',
    habitat: 'Open meadows, milkweed fields',
    range: 'North America, Central America',
    conservationStatus: 'Endangered',
    barcodes: 12,
    avgGC: 47.8,
    description: 'The monarch butterfly is one of the most recognizable species in North America, famous for its annual multi-generational migration of up to 4,800 km. DNA barcoding using the COI gene has confirmed population structuring across its vast range and revealed cryptic subspecies in isolated island populations.',
    traits: ['Migratory', 'Aposematic coloration', 'Host-specific (Asclepias)', 'Annual southern migration'],
    img: 'https://images.unsplash.com/photo-1683090531378-774503de9b08?w=600&h=400&fit=crop&auto=format',
    imgAlt: 'Monarch butterfly on a flower',
    color: '#d4a843',
  },
  {
    id: 'sp002',
    common: 'European Honey Bee',
    scientific: 'Apis mellifera',
    family: 'Apidae',
    order: 'Hymenoptera',
    class: 'Insecta',
    phylum: 'Arthropoda',
    habitat: 'Diverse — forests, agricultural land, urban areas',
    range: 'Worldwide (introduced)',
    conservationStatus: 'Least Concern',
    barcodes: 8,
    avgGC: 46.3,
    description: 'The western honey bee is the world\'s most important managed pollinator. COI barcoding distinguishes among over 30 recognized subspecies, supporting honey bee breeding programs and tracking the spread of Africanized hybrid populations. Barcoding has also enabled rapid identification of colony collapse disorder-related pathogens.',
    traits: ['Eusocial', 'Pollinator', 'Hive architecture', 'Waggle dance communication'],
    img: 'https://images.unsplash.com/photo-1622666451957-29ee91197db0?w=600&h=400&fit=crop&auto=format',
    imgAlt: 'Flowers in a meadow — honey bee habitat',
    color: '#d4a843',
  },
  {
    id: 'sp003',
    common: 'Atlantic Salmon',
    scientific: 'Salmo salar',
    family: 'Salmonidae',
    order: 'Salmoniformes',
    class: 'Actinopterygii',
    phylum: 'Chordata',
    habitat: 'Cold rivers and northern Atlantic Ocean',
    range: 'North Atlantic, European and North American rivers',
    conservationStatus: 'Least Concern',
    barcodes: 9,
    avgGC: 48.4,
    description: 'Atlantic salmon occupy both freshwater and marine environments across their lifecycle. DNA barcoding has been critical for distinguishing wild stocks from farmed escapees and for forensic identification of salmon products in the seafood supply chain. Population-specific COI haplotypes trace river-of-origin with high accuracy.',
    traits: ['Anadromous', 'Semelparous', 'Homing behavior', 'Commercial fishery species'],
    img: 'https://images.unsplash.com/photo-1541329030945-0cac3ff5f910?w=600&h=400&fit=crop&auto=format',
    imgAlt: 'Deer in a green habitat — illustration of vertebrate wildlife',
    color: '#60a5fa',
  },
  {
    id: 'sp004',
    common: 'Saola',
    scientific: 'Pseudoryx nghetinhensis',
    family: 'Bovidae',
    order: 'Artiodactyla',
    class: 'Mammalia',
    phylum: 'Chordata',
    habitat: 'Dense wet evergreen forests',
    range: 'Annamite Mountains, Vietnam & Laos',
    conservationStatus: 'Critically Endangered',
    barcodes: 3,
    avgGC: 45.9,
    description: 'Discovered only in 1992, the saola is one of the world\'s rarest large mammals. Known from fewer than a dozen confirmed records, it is sometimes called the "Asian unicorn." DNA barcoding from hair and fecal samples has been pivotal in verifying presence and understanding its relationship to other bovids without capturing live animals.',
    traits: ['Extremely rare', 'Forest-dependent', 'Non-gregarious', 'No captive population'],
    img: 'https://images.unsplash.com/photo-1783992984260-1c64fad9eed2?w=600&h=400&fit=crop&auto=format',
    imgAlt: 'Saola standing in lush forest understory',
    color: '#f87171',
  },
  {
    id: 'sp005',
    common: 'English Oak',
    scientific: 'Quercus robur',
    family: 'Fagaceae',
    order: 'Fagales',
    class: 'Magnoliopsida',
    phylum: 'Tracheophyta',
    habitat: 'Temperate deciduous forests and woodlands',
    range: 'Europe, Southwest Asia',
    conservationStatus: 'Least Concern',
    barcodes: 5,
    avgGC: 42.1,
    description: 'One of Europe\'s most ecologically important trees, English oak supports over 500 insect species and dozens of lichens and fungi. ITS2 and matK barcodes separate it from closely related oaks with overlapping morphology, enabling plant surveys across degraded habitats where leaf material is fragmentary.',
    traits: ['Long-lived (500–1000 yr)', 'Keystone species', 'Mast-producing', 'Used for ITS2 barcoding'],
    img: 'https://images.unsplash.com/photo-1675611215498-886c954d9266?w=600&h=400&fit=crop&auto=format',
    imgAlt: 'Dense forest — English oak woodland habitat',
    color: '#34d399',
  },
  {
    id: 'sp006',
    common: 'Purple Loosestrife',
    scientific: 'Lythrum salicaria',
    family: 'Lythraceae',
    order: 'Myrtales',
    class: 'Magnoliopsida',
    phylum: 'Tracheophyta',
    habitat: 'Wetlands, riverbanks, disturbed moist soils',
    range: 'Europe (native), North America (invasive)',
    conservationStatus: 'Invasive / Regulated',
    barcodes: 4,
    avgGC: 41.7,
    description: 'Purple loosestrife is a striking wetland plant that has become a major invasive species across North American marshes, outcompeting native vegetation including cattails and sedges. Rapid barcoding using rbcL and ITS2 enables early detection in environmental DNA (eDNA) surveys before visible establishment.',
    traits: ['Invasive in N. America', 'Pollinator magnet', 'High reproductive output', 'eDNA detectable'],
    img: 'https://images.unsplash.com/photo-1653265543374-d7c348619b86?w=600&h=400&fit=crop&auto=format',
    imgAlt: 'Purple loosestrife flowers growing in water',
    color: '#c084fc',
  },
]

const statusColor = (s: string) => {
  if (s.includes('Endangered')) return { bg: 'rgba(248,113,113,0.12)', text: '#f87171', border: 'rgba(248,113,113,0.25)' }
  if (s.includes('Invasive')) return { bg: 'rgba(251,146,60,0.12)', text: '#fb923c', border: 'rgba(251,146,60,0.25)' }
  if (s.includes('Concern')) return { bg: 'rgba(52,211,153,0.12)', text: '#34d399', border: 'rgba(52,211,153,0.25)' }
  return { bg: 'rgba(255,255,255,0.08)', text: '#7a98b8', border: 'rgba(255,255,255,0.15)' }
}

export default function SpeciesPage() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string | null>(null)
  const [filter, setFilter] = useState('all')

  const filtered = SPECIES.filter(s => {
    const q = search.toLowerCase()
    const match = s.common.toLowerCase().includes(q) || s.scientific.toLowerCase().includes(q) || s.family.toLowerCase().includes(q)
    if (filter === 'all') return match
    if (filter === 'vertebrate') return match && s.phylum === 'Chordata'
    if (filter === 'invertebrate') return match && s.phylum === 'Arthropoda'
    if (filter === 'plant') return match && s.phylum === 'Tracheophyta'
    return match
  })

  const selectedSpecies = SPECIES.find(s => s.id === selected)

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#14b8a6', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
          Species Info
        </div>
        <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 40, fontWeight: 400, color: '#dde9f8', margin: '0 0 10px' }}>
          Species Explorer
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#7a98b8', margin: 0 }}>
          Browse taxonomy, barcode records, geographic range, and conservation status for species in the database.
        </p>
      </div>

      {/* Search + filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
            <circle cx="11" cy="11" r="7" stroke="#3a5577" strokeWidth="2"/>
            <path d="M20 20l-3-3" stroke="#3a5577" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            placeholder="Search species, family, or scientific name…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 38 }}
          />
        </div>
        {['all', 'vertebrate', 'invertebrate', 'plant'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '9px 16px', borderRadius: 7, border: '1px solid', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
              background: filter === f ? '#14b8a6' : 'transparent',
              color: filter === f ? '#060f1c' : '#7a98b8',
              borderColor: filter === f ? '#14b8a6' : 'rgba(255,255,255,0.1)',
              transition: 'all 0.18s', textTransform: 'capitalize',
            }}
          >
            {f === 'all' ? 'All Groups' : f}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedSpecies ? '1fr 420px' : '1fr', gap: 24 }}>
        {/* Species grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, alignContent: 'start' }}>
          {filtered.map(sp => {
            const sc = statusColor(sp.conservationStatus)
            return (
              <button
                key={sp.id}
                onClick={() => setSelected(selected === sp.id ? null : sp.id)}
                className="card-hover"
                style={{
                  background: '#0b1a2e',
                  border: `1px solid ${selected === sp.id ? 'rgba(20,184,166,0.5)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 12, overflow: 'hidden',
                  cursor: 'pointer', textAlign: 'left',
                  boxShadow: selected === sp.id ? '0 0 24px rgba(20,184,166,0.15)' : 'none',
                }}
              >
                <div style={{ position: 'relative', height: 160, backgroundColor: '#102038' }}>
                  <img
                    src={sp.img}
                    alt={sp.imgAlt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,26,46,0.9) 0%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: 10, left: 14, right: 14 }}>
                    <span className="badge" style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`, fontSize: 10 }}>
                      {sp.conservationStatus}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '16px 18px 18px' }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'italic', fontSize: 12, color: '#7a98b8', marginBottom: 4 }}>
                    {sp.scientific}
                  </div>
                  <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 600, color: '#dde9f8', margin: '0 0 10px' }}>
                    {sp.common}
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', color: '#3a5577' }}>{sp.order} · {sp.phylum}</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#14b8a6' }}>
                      {sp.barcodes} barcodes
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
          {filtered.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 0', color: '#3a5577', fontFamily: 'Inter, sans-serif', fontSize: 14 }}>
              No species match your search.
            </div>
          )}
        </div>

        {/* Species detail panel */}
        {selectedSpecies && (
          <div style={{
            background: '#0b1a2e',
            border: '1px solid rgba(20,184,166,0.25)',
            borderRadius: 14,
            overflow: 'hidden',
            alignSelf: 'start',
            position: 'sticky', top: 80,
          }}>
            <div style={{ position: 'relative', height: 220, backgroundColor: '#102038' }}>
              <img
                src={selectedSpecies.img}
                alt={selectedSpecies.imgAlt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,26,46,1) 0%, rgba(11,26,46,0.3) 60%)' }} />
              <button
                onClick={() => setSelected(null)}
                style={{
                  position: 'absolute', top: 12, right: 12,
                  background: 'rgba(6,15,28,0.7)', border: 'none', color: '#7a98b8',
                  width: 30, height: 30, borderRadius: '50%', cursor: 'pointer', fontSize: 18,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >×</button>
              <div style={{ position: 'absolute', bottom: 16, left: 20 }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'italic', fontSize: 13, color: '#7a98b8', marginBottom: 4 }}>
                  {selectedSpecies.scientific}
                </div>
                <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 26, fontWeight: 600, color: '#dde9f8', margin: 0 }}>
                  {selectedSpecies.common}
                </h2>
              </div>
            </div>

            <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Taxonomy table */}
              <div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#3a5577', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
                  Taxonomy
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px' }}>
                  {[
                    ['Phylum', selectedSpecies.phylum],
                    ['Class', selectedSpecies.class],
                    ['Order', selectedSpecies.order],
                    ['Family', selectedSpecies.family],
                  ].map(([label, val]) => (
                    <div key={label}>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#3a5577' }}>{label}</div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#dde9f8' }}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: 20, padding: '14px 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {[
                  { label: 'Barcode Records', val: `${selectedSpecies.barcodes}` },
                  { label: 'Avg GC %', val: `${selectedSpecies.avgGC}%` },
                  { label: 'Gene Region', val: 'COI' },
                ].map(item => (
                  <div key={item.label}>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#3a5577', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 3 }}>{item.label}</div>
                    <div style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 600, color: '#14b8a6' }}>{item.val}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#3a5577', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>About</div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, lineHeight: 1.7, color: '#7a98b8', margin: 0 }}>
                  {selectedSpecies.description}
                </p>
              </div>

              {/* Traits */}
              <div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#3a5577', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Key Traits</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {selectedSpecies.traits.map(t => (
                    <span key={t} className="badge" style={{ background: 'rgba(20,184,166,0.08)', color: '#7a98b8', border: '1px solid rgba(255,255,255,0.08)', fontSize: 11, fontFamily: 'Inter, sans-serif' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Range */}
              <div style={{ fontSize: 13 }}>
                <span style={{ fontFamily: 'Inter, sans-serif', color: '#3a5577', marginRight: 8 }}>Range:</span>
                <span style={{ fontFamily: 'Inter, sans-serif', color: '#7a98b8' }}>{selectedSpecies.range}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
