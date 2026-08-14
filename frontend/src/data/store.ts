export interface AnalysisRun {
  id: string;
  sampleName: string;
  date: string;
  speciesMatched: string;
  commonName: string;
  taxon: string;
  phylum: string;
  confidence: number; // percentage, e.g. 99.4
  status: 'Validated' | 'Processing' | 'Flagged';
  readCount: number;
  location: string;
  depth?: string;
  sequenceSnippet: string;
}

export interface SpeciesRecord {
  id: string;
  common: string;
  scientific: string;
  kingdom: string;
  phylum: string;
  classRank: string;
  order: string;
  family: string;
  genus: string;
  conservationStatus: 'Endangered' | 'Least Concern' | 'Vulnerable' | 'Critically Endangered' | 'Near Threatened';
  barcodes: number;
  avgGC: number;
  habitat: string;
  range: string;
  description: string;
  traits: string[];
  img: string;
}

// Initial Dataset of Analysis Runs
export const INITIAL_ANALYSIS_RUNS: AnalysisRun[] = [
  {
    id: 'RUN-2026-001',
    sampleName: 'Pacific_Deepwater_Station_14',
    date: '2026-08-14',
    speciesMatched: 'Salmo trutta',
    commonName: 'Brown Trout',
    taxon: 'Actinopterygii',
    phylum: 'Chordata',
    confidence: 99.4,
    status: 'Validated',
    readCount: 1420,
    location: 'Pacific Ocean (Depth 45m)',
    depth: '45m',
    sequenceSnippet: 'GGTACTGCCTTAAGACTTCTAATTCGCGCCGAATTAGGACAATCTGGAAGTCTAATTGGAGATGATCAGATCTACAATGTGATTGTTACGGCTCATGCGTTCGTAATAATTTTCTTCATAGTTATGCCAATCATGATTGGGGGATTTGGAAACTGACTAGTTCCTTTAATATTAGGGGCCCCTGACATGGCTTTCCCTCG',
  },
  {
    id: 'RUN-2026-002',
    sampleName: 'Amazon_Canopy_Filter_04',
    date: '2026-08-13',
    speciesMatched: 'Panthera onca',
    commonName: 'Jaguar',
    taxon: 'Mammalia',
    phylum: 'Chordata',
    confidence: 98.7,
    status: 'Validated',
    readCount: 890,
    location: 'Amazon Basin, Brazil',
    depth: 'Surface',
    sequenceSnippet: 'GTGGGGGGTGCTGTAGAAAGAGGTGCTGGCACAGGGTGAACTGTATACCCTCCTCTTTCTGCAGGAATTGCCCATGCGGGAGCATCTGTGGATCTTAGAATTTTTTCTTTACATCTTGCAGGAATCTCCTCTATTCTTGGAGCTGTGAACTTCATTACTACTATTATCAATATACGATCTTTTGGGATAAGATTAGATCG',
  },
  {
    id: 'RUN-2026-003',
    sampleName: 'Ganges_River_Metabarcoding_09',
    date: '2026-08-12',
    speciesMatched: 'Danio rerio',
    commonName: 'Zebrafish',
    taxon: 'Actinopterygii',
    phylum: 'Chordata',
    confidence: 96.2,
    status: 'Validated',
    readCount: 2310,
    location: 'Varanasi, India',
    depth: '2m',
    sequenceSnippet: 'TGCCAATCATGATTGGGGGATTTGGAAACTGACTAGTTCCTTTAATATTAGGGGCCCCTGACATGGCTTTCCCTCGACTTAATAATCTTAGATTCTGATTCTTACCCCCTGCATTAACTTTGCTCTTGGTGGGGGGTGCTGTAGAAAGAGGTGCTGGCACAGGGTGAACTGTATACCCTCCTCTTTCTGCAGGAATTGCC',
  },
  {
    id: 'RUN-2026-004',
    sampleName: 'Alpine_Soil_eDNA_12',
    date: '2026-08-11',
    speciesMatched: 'Apis mellifera',
    commonName: 'Western Honey Bee',
    taxon: 'Insecta',
    phylum: 'Arthropoda',
    confidence: 99.1,
    status: 'Validated',
    readCount: 1750,
    location: 'Swiss Alps (Alt 2400m)',
    depth: '0.1m',
    sequenceSnippet: 'CTGCAGGAATTGCCCATGCGGGAGCATCTGTGGATCTTAGAATTTTTTCTTTACATCTTGCAGGAATCTCCTCTATTCTTGGAGCTGTGAACTTCATTACTACTATTATCAATATACGATCTTTTGGGATAAGATTAGATCGTATCCCCTTATTTGTCTGAGCAGTGGGTATCACCGCCTTACTTTTACTCCTTAGCCTC',
  },
  {
    id: 'RUN-2026-005',
    sampleName: 'Coral_Reef_Lagoon_03',
    date: '2026-08-10',
    speciesMatched: 'Thunnus albacares',
    commonName: 'Yellowfin Tuna',
    taxon: 'Actinopterygii',
    phylum: 'Chordata',
    confidence: 94.8,
    status: 'Validated',
    readCount: 3120,
    location: 'Great Barrier Reef, Australia',
    depth: '15m',
    sequenceSnippet: 'TTAGAATTTTTTCTTTACATCTTGCAGGAATCTCCTCTATTCTTGGAGCTGTGAACTTCATTACTACTATTATCAATATACGATCTTTTGGGATAAGATTAGATCGTATCCCCTTATTTGTCTGAGCAGTGGGTATCACCGCCTTACTTTTACTCCTTAGCCTCCCCGTCCTAGCTGGGGCAATTACAATGCTTCTCACA',
  },
  {
    id: 'RUN-2026-006',
    sampleName: 'North_Sea_Water_Column_22',
    date: '2026-08-08',
    speciesMatched: 'Gadus morhua',
    commonName: 'Atlantic Cod',
    taxon: 'Actinopterygii',
    phylum: 'Chordata',
    confidence: 97.5,
    status: 'Validated',
    readCount: 1980,
    location: 'North Sea (Norway)',
    depth: '60m',
    sequenceSnippet: 'AGCATCTGTGGATCTTAGAATTTTTTCTTTACATCTTGCAGGAATCTCCTCTATTCTTGGAGCTGTGAACTTCATTACTACTATTATCAATATACGATCTTTTGGGATAAGATTAGATCGTATCCCCTTATTTGTCTGAGCAGTGGGTATCACCGCCTTACTTTTACTCCTTAGCCTCCCCGTCCTAGCTGGGGCAATTA',
  },
  {
    id: 'RUN-2026-007',
    sampleName: 'Madagascar_Rainforest_Pool_01',
    date: '2026-08-05',
    speciesMatched: 'Danaus plexippus',
    commonName: 'Monarch Butterfly',
    taxon: 'Insecta',
    phylum: 'Arthropoda',
    confidence: 98.2,
    status: 'Validated',
    readCount: 640,
    location: 'Masoala Peninsula, Madagascar',
    depth: 'Surface',
    sequenceSnippet: 'TTCTAATTCGCGCCGAATTAGGACAATCTGGAAGTCTAATTGGAGATGATCAGATCTACAATGTGATTGTTACGGCTCATGCGTTCGTAATAATTTTCTTCATAGTTATGCCAATCATGATTGGGGGATTTGGAAACTGACTAGTTCCTTTAATATTAGGGGCCCCTGACATGGCTTTCCCTCGACTTAATAATCTTAGA',
  },
];

// Initial Species Directory
export const SPECIES_DIRECTORY: SpeciesRecord[] = [
  {
    id: 'sp001',
    common: 'Monarch Butterfly',
    scientific: 'Danaus plexippus',
    kingdom: 'Animalia',
    phylum: 'Arthropoda',
    classRank: 'Insecta',
    order: 'Lepidoptera',
    family: 'Nymphalidae',
    genus: 'Danaus',
    conservationStatus: 'Endangered',
    barcodes: 142,
    avgGC: 47.8,
    habitat: 'Open meadows, milkweed fields',
    range: 'North America, Central America, Australia',
    description: 'Famous for its annual multi-generational migration of up to 4,800 km. COI gene barcoding confirms population structuring across international flyways.',
    traits: ['Migratory', 'Aposematic coloration', 'Host-specific (Asclepias)', 'Annual southern migration'],
    img: 'https://images.unsplash.com/photo-1683090531378-774503de9b08?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 'sp002',
    common: 'Western Honey Bee',
    scientific: 'Apis mellifera',
    kingdom: 'Animalia',
    phylum: 'Arthropoda',
    classRank: 'Insecta',
    order: 'Hymenoptera',
    family: 'Apidae',
    genus: 'Apis',
    conservationStatus: 'Least Concern',
    barcodes: 318,
    avgGC: 46.3,
    habitat: 'Diverse — forests, agricultural land, urban areas',
    range: 'Worldwide (introduced & native)',
    description: 'The world\'s most important managed pollinator. COI barcoding distinguishes among over 30 recognized subspecies.',
    traits: ['Eusocial', 'Pollinator', 'Hive architecture', 'Waggle dance communication'],
    img: 'https://images.unsplash.com/photo-1622666451957-29ee91197db0?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 'sp003',
    common: 'Brown Trout',
    scientific: 'Salmo trutta',
    kingdom: 'Animalia',
    phylum: 'Chordata',
    classRank: 'Actinopterygii',
    order: 'Salmoniformes',
    family: 'Salmonidae',
    genus: 'Salmo',
    conservationStatus: 'Least Concern',
    barcodes: 215,
    avgGC: 48.5,
    habitat: 'Cold freshwater rivers, glacial streams',
    range: 'Europe, Asia, Introduced globally',
    description: 'High-value indicator species for river ecosystem health. Environmental DNA (eDNA) sampling allows non-invasive tracking of migratory trout runs.',
    traits: ['Coldwater adapted', 'Stream-dwelling', 'Indicator species', 'Anadromous varieties'],
    img: 'https://images.unsplash.com/photo-1541329030945-0cac3ff5f910?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 'sp004',
    common: 'Bengal Tiger',
    scientific: 'Panthera tigris',
    kingdom: 'Animalia',
    phylum: 'Chordata',
    classRank: 'Mammalia',
    order: 'Carnivora',
    family: 'Felidae',
    genus: 'Panthera',
    conservationStatus: 'Endangered',
    barcodes: 89,
    avgGC: 46.6,
    habitat: 'Tropical rainforests, mangrove swamps, grasslands',
    range: 'India, Nepal, Bangladesh, Bhutan',
    description: 'Apex predator monitored in wild reserves using waterhole eDNA and fecal barcode extraction to track elusive individual tigers.',
    traits: ['Apex predator', 'Solitary hunter', 'Striped camouflage', 'Keystone species'],
    img: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 'sp005',
    common: 'Yellowfin Tuna',
    scientific: 'Thunnus albacares',
    kingdom: 'Animalia',
    phylum: 'Chordata',
    classRank: 'Actinopterygii',
    order: 'Perciformes',
    family: 'Scombridae',
    genus: 'Thunnus',
    conservationStatus: 'Near Threatened',
    barcodes: 195,
    avgGC: 47.8,
    habitat: 'Pelagic open ocean, warm tropical marine waters',
    range: 'Global tropical & subtropical oceans',
    description: 'Fast-swimming pelagic fish tracked using seawater metabarcoding to enforce sustainable fisheries management boundaries.',
    traits: ['Pelagic swimmer', 'Endothermic countercurrent exchange', 'Schooling behavior', 'Commercial importance'],
    img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 'sp006',
    common: 'Golden Eagle',
    scientific: 'Aquila chrysaetos',
    kingdom: 'Animalia',
    phylum: 'Chordata',
    classRank: 'Aves',
    order: 'Accipitriformes',
    family: 'Accipitridae',
    genus: 'Aquila',
    conservationStatus: 'Least Concern',
    barcodes: 94,
    avgGC: 45.5,
    habitat: 'Mountains, plateau highlands, open country',
    range: 'Holarctic distribution across Northern Hemisphere',
    description: 'Regal avian predator identified from shed feathers and nest eDNA swabs across remote mountain ranges.',
    traits: ['High-altitude hunter', 'Monogamous pair bonds', 'Keen vision', 'Territorial nesting'],
    img: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=600&h=400&fit=crop&auto=format',
  },
];

/** Client-side Export Helpers (Pure browser Blob download - no backend required) */

export function exportRunToCSV(run: AnalysisRun) {
  const headers = ['Run_ID', 'Sample_Name', 'Date', 'Species_Matched', 'Common_Name', 'Taxon_Class', 'Phylum', 'Confidence_Pct', 'Status', 'Read_Count', 'Location', 'Sequence_Snippet'];
  const row = [
    run.id,
    `"${run.sampleName}"`,
    run.date,
    `"${run.speciesMatched}"`,
    `"${run.commonName}"`,
    run.taxon,
    run.phylum,
    `${run.confidence}%`,
    run.status,
    run.readCount,
    `"${run.location}"`,
    `"${run.sequenceSnippet}"`
  ];

  const csvContent = `${headers.join(',')}\n${row.join(',')}`;
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${run.id}_eDNA_analysis.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportRunToJSON(run: AnalysisRun) {
  const jsonContent = JSON.stringify(run, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${run.id}_eDNA_analysis.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
