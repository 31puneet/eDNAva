import { Leaf, Award } from 'lucide-react';
import { type Page } from '../App';

interface Props {
  navigate: (page: Page) => void;
}

export default function AboutPage({ navigate }: Props) {
  return (
    <div className="space-y-10 pb-12">
      {/* Header Banner */}
      <div className="border-b border-[#D7D6D0] pb-4">
        <div className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider mb-1">
          Public Science Information & Documentation
        </div>
        <h1 className="text-3xl font-extrabold text-[#1B5E20]">About eDNA BioTrack</h1>
        <p className="text-xs text-[#555555] mt-1">
          Standardized environmental DNA sequencing management and biodiversity monitoring portal.
        </p>
      </div>

      {/* SIH 2025 Original Project Highlight Box */}
      <div className="gov-card p-6 bg-[#E8F5E9] border-l-4 border-l-[#2E7D32]">
        <div className="flex items-start gap-3">
          <Award className="w-6 h-6 text-[#1B5E20] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-[#333333]">
            <div className="font-bold text-sm text-[#1B5E20]">Smart India Hackathon (SIH 2025) Original Project</div>
            <p className="leading-relaxed">
              <strong>eDNA BioTrack</strong> is an original software platform developed for the <strong>Smart India Hackathon (SIH) 2025</strong>. It provides an accessible, public science interface for environmental DNA dataset validation, sequence quality control, and automated taxonomy pipeline management.
            </p>
          </div>
        </div>
      </div>

      {/* "WHAT" Section */}
      <section className="gov-card p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-3 border-b border-[#D7D6D0] pb-3">
          <div className="p-2 bg-[#E8F5E9] text-[#1B5E20] border border-[#A5D6A7] rounded-sm">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase text-[#2E7D32]">1. Platform Overview</div>
            <h2 className="text-xl font-bold text-[#222222]">What Is Environmental DNA (eDNA) Analysis?</h2>
          </div>
        </div>

        <p className="text-sm text-[#444444] leading-relaxed">
          Environmental DNA (eDNA) refers to cellular and extra-cellular genetic material naturally shed by living organisms into their surrounding ecosystems—such as river water, lake sediment, forest soil, or airborne particulates. By collecting a single environmental sample, scientists can extract genetic fragments from hundreds of co-existing species without physical capture or habitat disruption.
        </p>
        <p className="text-sm text-[#444444] leading-relaxed">
          <strong>eDNA BioTrack</strong> acts as a standardized data portal. It accepts sequence datasets (`read_id` and `dna_sequence`), computes quality assurance metrics (read length, GC percentage), and prepares records for neural network taxonomy matching against international gene repositories.
        </p>
      </section>

      {/* "WHY" Section */}
      <section className="space-y-4">
        <div className="border-b border-[#D7D6D0] pb-2">
          <h2 className="text-lg font-bold text-[#1B5E20]">2. Why eDNA & Automated Classification Matters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="gov-card p-5 space-y-2">
            <div className="w-7 h-7 rounded-full bg-[#2E7D32] text-white flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h3 className="text-sm font-bold text-[#222222]">Non-Invasive Conservation</h3>
            <p className="text-xs text-[#555555] leading-relaxed">
              Detect rare, endangered, or nocturnal organisms without setting physical traps or disturbing delicate wilderness habitats.
            </p>
          </div>

          <div className="gov-card p-5 space-y-2">
            <div className="w-7 h-7 rounded-full bg-[#2E7D32] text-white flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h3 className="text-sm font-bold text-[#222222]">Early Invasive Detection</h3>
            <p className="text-xs text-[#555555] leading-relaxed">
              Identify invasive aquatic species or crop pathogens early from micro-liter water samples before ecological damage occurs.
            </p>
          </div>

          <div className="gov-card p-5 space-y-2">
            <div className="w-7 h-7 rounded-full bg-[#2E7D32] text-white flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h3 className="text-sm font-bold text-[#222222]">Scalable Public Monitoring</h3>
            <p className="text-xs text-[#555555] leading-relaxed">
              Enables standard biodiversity accounting across river basins, national forest reserves, and coastal marine sanctuaries.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
