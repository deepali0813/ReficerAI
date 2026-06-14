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



# ------------------------
# GEMINI
# ------------------------

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


# ------------------------
# MOSS SEARCH
# ------------------------
client = None
async def search_docs(query,index_name):

    results = await client.query(
        index_name,
        query,
        QueryOptions(top_k=3)
    )

    context = ""

    for doc in results.docs:
        if len(doc.text) > 200:
            context += doc.text + "\n\n"

    return context

async def initialize_moss(index_name):

    global client

    client = MossClient(
        os.getenv("MOSS_PROJECT_ID"),
        os.getenv("MOSS_PROJECT_KEY")
    )

    print("Loading index...")

    await client.load_index(index_name)

    print("Index loaded successfully!")
# ------------------------
# DIAGNOSTIC AGENT
# ------------------------
language = "English"
async def diagnose(issue, history,  retrieved_docs):

  

    prompt = f"""
Detected Language: {language}

IMPORTANT:
Respond ONLY in {language}.
Do not switch languages.
Do not mix languages.
Translate headings into {language}.

You are an experienced product technician.

Current Issue:
{issue}

Conversation History:
{history}

Relevant Documentation:
{retrieved_docs}

MULTILINGUAL RULES:
1. Use the language of the user's MOST RECENT message.
2. Never switch languages on your own.
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
9. Before asking a new question, use the conversation history and retrieved documentation.
   Do not ignore newly retrieved documentation.
LANGUAGE FORMAT RULES:

1. Detect the user's language.
2. ALL output must be in the user's language.
3. Translate section headings too.
4. Never mix English headings with Hindi/Punjabi responses.
5. Keep only technical product names untranslated if needed.

Examples:

English:
Question:
Do the headlights work?

Why I'm asking:
This helps determine whether the issue is battery related.

Hindi:
प्रश्न:
क्या हेडलाइट काम कर रही है?

मैं यह क्यों पूछ रहा हूँ:
इससे पता चलेगा कि समस्या बैटरी से जुड़ी है या नहीं.

Punjabi:
ਸਵਾਲ:
ਕੀ ਹੈਡਲਾਈਟ ਕੰਮ ਕਰ ਰਹੀ ਹੈ?

ਮੈਂ ਇਹ ਕਿਉਂ ਪੁੱਛ ਰਿਹਾ ਹਾਂ:
ਇਸ ਨਾਲ ਪਤਾ ਲੱਗੇਗਾ ਕਿ ਸਮੱਸਿਆ ਬੈਟਰੀ ਨਾਲ ਸੰਬੰਧਿਤ ਹੈ ਜਾਂ ਨਹੀਂ.
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
    
    conversation_history = [
        f"User: {current_issue}"
    ]

    while True:

        history = "\n".join(conversation_history)
        search_query = f"""
        Issue: {current_issue}

        Conversation:
        {history}
        """

        retrieved_docs = await search_docs(search_query)
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