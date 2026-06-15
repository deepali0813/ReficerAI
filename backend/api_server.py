from fastapi import FastAPI
from pydantic import BaseModel
from pymongo import MongoClient
from dotenv import load_dotenv
from bson import ObjectId
import os
from diagnostic_agent import (diagnose , search_docs )

load_dotenv()
mongo_client = MongoClient(
    os.getenv("MONGODB_URI")
)
app = FastAPI()

class ChatRequest(BaseModel):
    productId: str
    message: str
    history: list = []

db = mongo_client["Reficerai"]
products_collection = db["products"]

@app.get("/")
def home():
    return {
        "message": "Backend Running"
    }

@app.post("/chat")
async def chat(request: ChatRequest):
    product = products_collection.find_one(
    {"_id": ObjectId(request.productId)}
)

    if not product:
      return {
        "success": False,
        "response": "Product not found"
    }

    index_name = product["mossIndexId"]
    if not index_name:
     return {
        "success": False,
        "response": "No Moss index found for this product."
    }

    history_text = ""

    for msg in request.history:
        history_text += (
         f"{msg.get('role','')}: "
         f"{msg.get('content','')}\n"
        )



    retrieved_docs = await search_docs(
        request.message,
        index_name
    )
    response = await diagnose(
         request.message,
         history_text,
         retrieved_docs
        )

    return {
     "success": True,
     "response": response
    }