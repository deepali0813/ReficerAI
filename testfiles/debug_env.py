import os
from dotenv import load_dotenv

load_dotenv()

print("PROJECT_ID:", repr(os.getenv("MOSS_PROJECT_ID")))
print("PROJECT_KEY:", repr(os.getenv("MOSS_PROJECT_KEY")))