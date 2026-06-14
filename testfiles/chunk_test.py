import fitz

pdf_path = "uploads/ActivaManual.pdf"

doc = fitz.open(pdf_path)

text = ""

for page in doc:
    text += page.get_text()

doc.close()

# Chunk into 1000-character pieces
chunk_size = 1000

chunks = [
    text[i:i + chunk_size]
    for i in range(0, len(text), chunk_size)
]

print(f"Total chunks: {len(chunks)}")

for i, chunk in enumerate(chunks[:3]):
    print(f"\n--- CHUNK {i+1} ---\n")
    print(chunk[:300])