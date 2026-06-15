import os
import fitz

from moss import MossClient, DocumentInfo
from dotenv import load_dotenv

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


async def create_product_index(
    pdf_path: str,
    index_name: str
):
    """
    Creates a Moss index from a PDF manual.
    Returns the created index name.
    """

    project_id = os.getenv("MOSS_PROJECT_ID")
    project_key = os.getenv("MOSS_PROJECT_KEY")

    client = MossClient(
        project_id,
        project_key
    )

    print(f"Processing PDF: {pdf_path}")

    text = extract_pdf_text(pdf_path)

    chunks = create_chunks(text)

    docs = []

    for i, chunk in enumerate(chunks):
        docs.append(
            DocumentInfo(
                id=f"{index_name}_chunk_{i}",
                text=chunk
            )
        )

    print(f"Creating Moss index: {index_name}")

    await client.create_index(
        index_name,
        docs
    )

    print(f"Index created successfully: {index_name}")

    return index_name