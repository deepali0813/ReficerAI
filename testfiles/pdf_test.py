# test_indexer.py

import asyncio
from moss_indexer import create_product_index

async def main():

    index_name = await create_product_index(
        "uploads/ActivaManual.pdf",
        "test-activa-index"
    )

    print("Created:", index_name)

asyncio.run(main())