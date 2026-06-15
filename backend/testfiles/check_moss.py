import asyncio
import os

from dotenv import load_dotenv
from moss import MossClient, QueryOptions

load_dotenv()

async def main():
    client = MossClient(
        os.getenv("MOSS_PROJECT_ID"),
        os.getenv("MOSS_PROJECT_KEY")
    )

    print("Loading manual-index...")

    await client.load_index("manual-index")

    results = await client.query(
        "manual-index",
        "horn",
        QueryOptions(top_k=3)
    )

    print(f"Found {len(results.docs)} results")

    for doc in results.docs:
        print(doc.text[:200])

asyncio.run(main())