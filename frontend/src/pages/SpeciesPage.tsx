import { useState } from 'react';
import { Search, ShieldAlert, ShieldCheck, Microscope } from 'lucide-react';

interface Props {
  dataset: any[]; // Kept so we don't break App.tsx which passes dataset to this page
}

const TARGET_SPECIES = [
  { name: 'Dreissena polymorpha', desc: 'The zebra mussel is a small freshwater mussel originally native to the lakes of southern Russia and Ukraine. It is a highly aggressive invasive species that attaches to hard surfaces and rapidly biofouls water infrastructure, drastically altering local ecosystems by outcompeting native filter feeders.' },
  { name: 'Micropterus salmoides', desc: 'The largemouth bass is a carnivorous freshwater gamefish native to eastern and central North America. It serves as an apex predator in many aquatic environments, playing a crucial role in regulating populations of smaller fish and maintaining the balance of the ecosystem.' },
  { name: 'Daphnia pulex', desc: 'The water flea is a microscopic planktonic crustacean found in diverse permanent freshwater habitats across the Americas, Europe, and Australia. It is a keystone species in freshwater food webs, serving as a primary food source for many small fish and aquatic insects.' },
  { name: 'Neogobius melanostomus', desc: 'The round goby is an invasive bottom-dwelling fish native to the Black and Caspian seas. It aggressively outcompetes native benthic fish for food and habitat, and is known for preying on the eggs of native species, leading to severe declines in local biodiversity.' },
  { name: 'Cyprinus carpio', desc: 'The common carp is a widespread freshwater fish of eutrophic waters in lakes and large rivers in Europe and Asia. Introduced globally, it is considered highly invasive as its feeding behavior uproots aquatic vegetation and increases water turbidity, degrading water quality.' },
  { name: 'Salvelinus fontinalis', desc: 'The brook trout is a species of freshwater fish in the salmon family native to Eastern North America. It is highly sensitive to poor water quality and pollution, making it an excellent indicator species for monitoring the health and purity of cold-water streams.' },
  { name: 'Pterois volitans', desc: 'The red lionfish is a venomous marine fish native to the Indo-Pacific region. As a highly successful invasive species in the Atlantic Ocean, it has no natural predators and decimates local reef fish populations, severely impacting coral reef ecosystems.' },
  { name: 'Carcinus maenas', desc: 'The European green crab is a versatile and resilient coastal predator native to the northeast Atlantic Ocean. It is a globally damaging invasive species that preys heavily on native bivalves, crabs, and juvenile fish, causing massive economic losses to shellfish industries.' },
  { name: 'Petromyzon marinus', desc: 'The sea lamprey is a parasitic jawless fish native to the Atlantic Ocean. When introduced to the Great Lakes, it became a devastating invasive predator that uses its suction-cup mouth to latch onto and feed on the blood and fluids of native fish like lake trout.' },
  { name: 'Acipenser fulvescens', desc: 'The lake sturgeon is a temperate freshwater fish native to the interconnected aquatic systems of North America. It is a slow-growing, late-maturing species that is currently threatened by habitat loss and historical overfishing, making it a key conservation target.' },
  { name: 'Esox lucius', desc: 'The northern pike is a predatory freshwater fish found throughout the northern hemisphere. Known for its aggressive ambush hunting tactics, it helps maintain healthy populations of prey species and is considered a critical component of many freshwater lake ecosystems.' },
  { name: 'Oncorhynchus mykiss', desc: 'The rainbow trout is a species of salmonid native to cold-water tributaries of the Pacific Ocean in Asia and North America. It is highly valued for sport fishing and aquaculture, but can outcompete native fish when introduced outside of its natural range.' },
  { name: 'Didymosphenia geminata', desc: 'Often called "rock snot," this freshwater diatom produces massive amounts of stalk material to form thick, brown mats on stream bottoms. Although native to northern regions, it acts invasively by smothering benthic habitats and altering invertebrate communities.' },
  { name: 'Channa argus', desc: 'The northern snakehead is a predatory fish native to China, Russia, and the Korean Peninsula. It is a highly aggressive invasive species in North America that can survive in poorly oxygenated water and even out of water for days, posing a severe threat to native fish and amphibians.' },
  { name: 'Asterias rubens', desc: 'The common starfish is a marine invertebrate found in the northeastern Atlantic Ocean. As a keystone predator in benthic marine ecosystems, it primarily feeds on bivalve mollusks, playing a critical role in controlling mussel populations and maintaining biodiversity.' },
  { name: 'Mnemiopsis leidyi', desc: 'The warty comb jelly is a species of tentaculate ctenophore native to the western Atlantic coastal waters. When introduced to the Black Sea via ballast water, its explosive population growth devastated local zooplankton and caused the collapse of commercial fisheries.' },
  { name: 'Hypophthalmichthys molitrix', desc: 'The silver carp is a species of freshwater cyprinid fish native to eastern Asia. Cultivated globally for aquaculture, it has escaped into wild river systems where its massive filter-feeding capacity outcompetes native species for plankton, drastically altering the food web.' },
  { name: 'Craspedacusta sowerbii', desc: 'The freshwater jellyfish is a hydrozoan native to the Yangtze River basin in China. Now found in freshwater lakes and reservoirs worldwide, it intermittently forms massive, unpredictable blooms, though its long-term ecological impact on native zooplankton remains under study.' },
  { name: 'Eriocheir sinensis', desc: 'The Chinese mitten crab is a medium-sized burrowing crab native to the coastal estuaries of eastern Asia. It is a highly invasive species in Europe and North America that causes severe structural damage to riverbanks through its extensive burrowing and outcompetes native crabs.' },
  { name: 'Potamopyrgus antipodarum', desc: 'The New Zealand mud snail is a tiny aquatic snail that reproduces rapidly via parthenogenesis. As an invasive species globally, it achieves incredibly high population densities that consume the primary food sources of native macroinvertebrates, altering the entire ecosystem structure.' }
];

export default function SpeciesPage({ dataset }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSpecies = TARGET_SPECIES.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="border-b border-[#D7D6D0] pb-4">
        <div className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider mb-1">
          Official Sequence Register
        </div>
        <h1 className="text-2xl font-extrabold text-[#1B5E20]">Target Species Database</h1>
        <p className="text-xs text-[#555555] mt-1">
          Database of recognized native and invasive indicator species monitored by the eDNA pipeline.
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

      {/* Species Database Section */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#D7D6D0] pb-3">
          <div>
            <h2 className="text-lg font-extrabold text-[#1B5E20]">Registered Organisms</h2>
            <p className="text-xs text-[#555555]">
              Showing {filteredSpecies.length} monitored target species.
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#777777]" />
            <input
              type="text"
              placeholder="Search by scientific or common name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-sm border border-[#D7D6D0] bg-white text-[#222222] focus:outline-none focus:border-[#2E7D32]"
            />
          </div>
        </div>

        {/* Official Register List */}
        <div className="bg-white pt-4">
          {filteredSpecies.map((species, idx) => (
            <div key={idx} className="mb-6">
              <p className="text-[13px] text-[#222222] leading-relaxed">
                <strong className="text-[#1B5E20] italic">{idx + 1}. {species.name}: </strong> 
                {species.desc}
              </p>
            </div>
          ))}
          {filteredSpecies.length === 0 && (
            <div className="py-12 text-center text-sm text-[#666666]">
              No registered species found matching "{searchTerm}".
            </div>
          )}
        </div>
      </div>

      {/* Science Banner Image 2: Laboratory High-Throughput Sequencing */}
      <div className="gov-card overflow-hidden mt-8">
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
