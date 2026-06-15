import asyncio
import sys

from moss_indexer import (
    create_product_index
)

pdf_path = sys.argv[1]
index_name = sys.argv[2]

asyncio.run(
    create_product_index(
        pdf_path,
        index_name
    )
)