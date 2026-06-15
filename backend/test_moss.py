import asyncio
import os
import fitz

from dotenv import load_dotenv
from moss import MossClient, QueryOptions, DocumentInfo

load_dotenv()


def extract_pdf_text(pdf_path):
    doc = fitz.open(pdf_path)

    text = ""

    for page in doc:
        text += page.get_text()

    doc.close()

    return text


def create_chunks(text, chunk_size=1000):
    chunks = []

    for i in range(0, len(text), chunk_size):
        chunks.append(text[i:i + chunk_size])

    return chunks


async def main():
    project_id = os.getenv("MOSS_PROJECT_ID")
    project_key = os.getenv("MOSS_PROJECT_KEY")

    print("Connecting to Moss...")

    client = MossClient(project_id, project_key)

    # ===== STEP 1: READ PDF =====

    pdf_path = "uploads/ActivaManual.pdf"  # change filename if needed

    print("Extracting PDF text...")

    text = extract_pdf_text(pdf_path)

    print(f"Total text length: {len(text)}")

    # ===== STEP 2: CHUNK TEXT =====

    chunks = create_chunks(text)

    print(f"Total chunks created: {len(chunks)}")

    # ===== STEP 3: CONVERT TO DOCUMENTS =====

    docs = []

    for i, chunk in enumerate(chunks):
        docs.append(
            DocumentInfo(
                id=f"chunk_{i}",
                text=chunk
            )
        )

    # ===== STEP 4: CREATE INDEX =====

    index_name = "manual-index"

    print("Creating index...")

    await client.create_index(
        index_name,
        docs
    )

    print("Index created successfully!")

    # ===== STEP 5: LOAD INDEX =====

    print("Loading index...")

    await client.load_index(index_name)

    print("Index loaded!")

    # ===== STEP 6: SEARCH =====

    query = input("\nEnter your query: ")

    results = await client.query(
        index_name,
        query,
        QueryOptions(top_k=5)
    )

    print(f"\nFound {len(results.docs)} results:\n")

    for i, doc in enumerate(results.docs, start=1):
        print(f"\n========== RESULT {i} ==========\n")
        print(doc.text[:1000])  # print first 1000 chars


if __name__ == "__main__":
    asyncio.run(main())