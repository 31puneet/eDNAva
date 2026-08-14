import os
import random
import time
from typing import List
from Bio import Entrez, SeqIO
from Bio.Seq import Seq
from Bio.SeqRecord import SeqRecord

Entrez.email = "researcher@ednava.org"

SPECIES_MAP = {
    "Native": [
        "Micropterus salmoides", "Lepomis macrochirus", "Perca flavescens", 
        "Esox lucius", "Sander vitreus", "Pomoxis nigromaculatus", 
        "Ambloplites rupestris", "Salvelinus fontinalis", "Catostomus commersonii", 
        "Notemigonus crysoleucas"
    ],
    "Invasive": [
        "Dreissena polymorpha", "Hypophthalmichthys nobilis", "Channa argus", 
        "Petromyzon marinus", "Faxonius rusticus"
    ],
    "Other": [
        "Daphnia pulex", "Chironomus riparius", "Microcystis aeruginosa", 
        "Anas platyrhynchos", "Lithobates catesbeianus"
    ]
}

def fetch_genomes(species_name: str, max_records: int = 2) -> List[str]:
    """Fetches multiple independent genome accessions to ensure rigorous train/test isolation."""
    query = f"{species_name}[Organism] AND (mitochondrion[Title] OR COI[Title] OR cytochrome oxidase subunit I[Title])"
    try:
        handle = Entrez.esearch(db="nucleotide", term=query, retmax=max_records, sort="relevance")
        record = Entrez.read(handle)
        handle.close()

        if not record["IdList"]:
            raise RuntimeError(f"Error: No genomes found on NCBI for {species_name}.")

        seq_ids = record["IdList"]
        fetch_handle = Entrez.efetch(db="nucleotide", id=",".join(seq_ids), rettype="fasta", retmode="text")
        records = list(SeqIO.parse(fetch_handle, "fasta"))
        fetch_handle.close()
        
        # Lowered length threshold to match fragment window size
        sequences = [str(r.seq) for r in records if len(str(r.seq)) >= 200]
        
        # Ensure we always have exactly 2 distinct records for strict Train/Test isolation
        if len(sequences) < max_records:
            raise RuntimeError(f"Error: Only {len(sequences)} real records found for {species_name}. Need {max_records}.")
            
        return sequences[:max_records]
    except Exception as e:
        import sys
        print(f"  Fatal Error fetching {species_name}: {e}. Stopping pipeline to prevent garbage data.")
        sys.exit(1)

def generate_fragments(sequence: str, species: str, group: str, split_tag: str, count: int, window_size: int = 200) -> List[SeqRecord]:
    fragments = []
    seq_len = len(sequence)
    if seq_len < window_size:
        return fragments

    step = max(1, (seq_len - window_size) // count)
    species_formatted = species.replace(' ', '_')
    
    for i in range(0, seq_len - window_size + 1, step):
        if len(fragments) >= count:
            break
        record = SeqRecord(
            seq=Seq(sequence[i:i+window_size]),
            # Store the scientific species name as the primary label
            id=f"{species_formatted}|{group}|{split_tag}",
            description=""
        )
        fragments.append(record)
        
    while len(fragments) < count:
        start = random.randint(0, seq_len - window_size)
        record = SeqRecord(
            seq=Seq(sequence[start:start+window_size]),
            id=f"{species_formatted}|{group}|{split_tag}",
            description=""
        )
        fragments.append(record)

    return fragments

def main():
    random.seed(42)  # Ensure reproducible dataset generation
    
    output_dir = os.path.join(os.path.dirname(__file__), "..", "data")
    os.makedirs(output_dir, exist_ok=True)
    output_file = os.path.join(output_dir, "lake_ecosystem.fasta")
    
    all_records = []
    print("Starting Data Generation...\n")
    
    for group, species_list in SPECIES_MAP.items():
        for species in species_list:
            print(f"Fetching: {species} ({group})")
            time.sleep(0.5)  # Respect NCBI 3 req/sec rate limit
            # Fetch 2 physically distinct genomes from NCBI
            genomes = fetch_genomes(species, max_records=2)
            
            # Record 0 used for Train (800 seqs), Record 1 for Test (200 seqs)
            train_frags = generate_fragments(genomes[0], species, group, "Train", 800)
            test_frags = generate_fragments(genomes[1], species, group, "Test", 200)
            
            all_records.extend(train_frags)
            all_records.extend(test_frags)
            
    random.shuffle(all_records)
    
    with open(output_file, "w") as f:
        for i, record in enumerate(all_records):
            record.id = f"seq_{i:05d}|{record.id}"
            SeqIO.write(record, f, "fasta")
            
    print(f"\nSuccess! Generated {len(all_records)} sequences at {os.path.abspath(output_file)}")

if __name__ == "__main__":
    main()
