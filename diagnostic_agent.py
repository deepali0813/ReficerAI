import asyncio
import os
import fitz
import google.generativeai as genai

from dotenv import load_dotenv
from moss import MossClient, QueryOptions, DocumentInfo

load_dotenv()

# CONFIG
# ------------------------

MOSS_PROJECT_ID = os.getenv("MOSS_PROJECT_ID")
MOSS_PROJECT_KEY = os.getenv("MOSS_PROJECT_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

INDEX_NAME = "manual-index"

# ------------------------
# GEMINI
# ------------------------

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


# ------------------------
# MOSS SEARCH
# ------------------------
client = None
async def search_docs(query):

    results = await client.query(
        INDEX_NAME,
        query,
        QueryOptions(top_k=3)
    )

    context = ""

    for doc in results.docs:
        if len(doc.text) > 200:
            context += doc.text + "\n\n"

    return context

async def initialize_moss():

    global client

    client = MossClient(
        os.getenv("MOSS_PROJECT_ID"),
        os.getenv("MOSS_PROJECT_KEY")
    )

    print("Loading index...")

    await client.load_index(INDEX_NAME)

    print("Index loaded successfully!")
# ------------------------
# DIAGNOSTIC AGENT
# ------------------------

async def diagnose(issue, history,  retrieved_docs):

  

    prompt = f"""
You are an experienced product technician.

Current Issue:
{issue}

Conversation History:
{history}

Relevant Documentation:
{retrieved_docs}

MULTILINGUAL RULES:
1. Automatically detect the user's language from the conversation history.
2. Always respond in the SAME language as the user.
3. If the user switches language, continue in the new language.
4. Support English, Hindi, Punjabi, Hinglish and other Indian languages.
5. Keep technical terms untranslated when appropriate.

DIAGNOSTIC RULES:
1. Never ask the user to repeat the problem.
2. Never ask the same question twice.
3. Use conversation history to remember previous answers.
4. Ask only ONE diagnostic question at a time.
5. Eliminate possible causes step-by-step.
6. Behave like an experienced mechanic/technician.
7. Explain briefly WHY you are asking the question.
8. If enough evidence exists, provide:
   - Probable cause
   - Recommended action
   - Reference to documentation

RESPONSE FORMAT:

Question:
<question>

Why I'm asking:
<short reason>

OR

Diagnosis:
<diagnosis>

Recommended Action:
<solution>
"""

    try:
        response = model.generate_content(prompt)
        return response.text.strip()

    except Exception as e:
        return f"AI service temporarily unavailable: {str(e)}"

async def main():

    await initialize_moss()
    print("=== Product Diagnostic Assistant ===")

    current_issue = input("\nDescribe your problem: ")
    retrieved_docs = await search_docs(current_issue)
    conversation_history = [
        f"User: {current_issue}"
    ]

    while True:

        history = "\n".join(conversation_history)

        answer = await diagnose(
            current_issue,
            history,
            retrieved_docs
        )

        print("\nAssistant:")
        print(answer)

        conversation_history.append(
            f"Assistant: {answer}"
        )

        user_reply = input(
             "\nYou: "
            )

        if user_reply.lower() in [
          "end",
          "exit",
          "quit",
          "stop"
        ]:
         print("\nDiagnostic session ended.")
         break

        conversation_history.append(
         f"User: {user_reply}"
        )
if __name__ == "__main__":
    asyncio.run(main())