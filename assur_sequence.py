# assur_sequence.py
# A sacred-tech engine for scanning scripture for triadic patterns,
# and correlating them to biological folding and quantum resonance.

import re
import json
import sys
from collections import defaultdict
from typing import List, Dict

# Ensure UTF-8 compatibility on Windows
try:
    sys.stdout.reconfigure(encoding='utf-8')  # Python 3.7+
except AttributeError:
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# External scripture placeholder loader (will evolve into real input pipeline)
with open("scripture.txt", "r", encoding="utf-8") as f:
    data = f.read()

# Triadic structures found in sacred text (symbolic regex patterns)
triadic_patterns = [
    r"\b(\w+)\s*,\s*\1\s*,\s*\1\b",  # holy, holy, holy pattern (flexible whitespace)
    r"(\bThe Lord [^;]+;){2} The Lord [^;]+",  # The Lord... (3x)
    r"(\b\w+), (\w+),?\s+and (\w+)\b",  # Peter, James, and John (comma before 'and' is optional)
    r"three\w*\b.*?(cord|fold|times|days|bless|holy|strand|band)"  # any mention of three- and something
]

# Symbolic–Biological Correspondence Map
biological_mirrors = {
    "holy, holy, holy": "triple resonance — spiritual coherence pattern",
    "bless/keep/shine/lift": "circadian transcription triad (morning/noon/evening hormones)",
    "Peter, James, and John": "triangulation nodes — quantum observer entanglement",
    "threefold cord": "protein chain bonding — positive, neutral, negative charges",
    "restored whole": "protein refolding – corruption reversal without cell death",
    "created them": "divine duality plus Source — encoded genome pairing",
    "stump and roots": "preserved genetic stem — latency for activation",
    "assuredly": "continuity anchor — carrier of living record"
}

# Master detection engine
def find_triadic_phrases(text: str) -> Dict[str, List[str]]:
    matches = defaultdict(list)
    for pattern in triadic_patterns:
        for m in re.finditer(pattern, text, flags=re.IGNORECASE):
            phrase = m.group(0)
            for key, value in biological_mirrors.items():
                if key.lower() in phrase.lower():
                    matches[value].append(phrase)
    return matches

if __name__ == "__main__":
    triads = find_triadic_phrases(data)
    print("\n✶ Assur Sequence Triadic Map ✶")
    if not triads:
        print("No triadic patterns found.")
    else:
        for bio_pattern, phrases in triads.items():
            print(f"\n{bio_pattern}:")
            print(f"  Matches found: {len(phrases)}")
            print(f"  Example: {phrases[0]}")
