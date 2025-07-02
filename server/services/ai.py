from langchain_groq import ChatGroq
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import PromptTemplate
from typing import List
import json
from ..schemas import PortfolioData, RequestProfileData
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

google_llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash-001",
    temperature=0.2,
    max_tokens=None,
    timeout=None,
    max_retries=2,
    # other params...
)

# llm = ChatGroq(
#     model="llama-3.3-70b-versatile",
#     temperature=0,
#     max_tokens=None,
#     timeout=None,
#     max_retries=2,
# )

llama70_llm = ChatGroq(
    model="llama-3.3-70b-versatile", # 32,768 token
    temperature=0.2,
    max_tokens=4096,
    timeout=60,
    max_retries=2,
)
gemma2_llm = ChatGroq(
    model="gemma2-9b-it",# 8,192 token
    temperature=0.2,
    max_tokens=4096,
    timeout=60,
    max_retries=2,
)

parser = JsonOutputParser(
    pydantic_object=PortfolioData
)  #  PortfolioData should be derived from pydantic.BaseModel. The JsonOutputParser expects a Pydantic model as the pydantic_object parameter.
# Pydantic ensures that the data structure follows the defined schema and performs automatic validation.

prompt = PromptTemplate(
    template="Generate portfolio data in JSON response strictly following this Pydantic schema.\n{format_instructions}\n{query}\n",
    input_variables=["query"],
    partial_variables={"format_instructions": parser.get_format_instructions()},
)

# List of LLMs in order of preference (primary -> fallback)
llm_models = [
    ("google_llm", google_llm),
    ("llama70_llm", llama70_llm),
    ("gemma2_llm", gemma2_llm),
]

async def portfolioDataGenerator(requestPortfolioData: RequestProfileData):
    query = f"""
Generate a JSON response strictly following this Pydantic schema.

1. Improve all descriptions with powerful language, strong action verbs, and professional tone.
2. Fix any spelling or grammatical errors throughout.
3. Maintain the exact JSON structure - do not add or remove any keys from objects

Ensure that:
    - Each technology in 'toolsAndTechnologies' is an object with "name" and "icon" keys.The "icon" should be the corresponding react-icons component name for the given technology.
    - All fields must strictly follow the schema structure.

Here is the input data:
{requestPortfolioData}

"""
    
    # Try each LLM in order until one succeeds
    last_exception = None
    for model_name, model in llm_models:
        try:
            print(f"Trying {model_name}...")
            chain = prompt | model | parser
            result = chain.invoke({"query": query})
            print(f"Successfully generated portfolio data using {model_name}")
            return result
        except Exception as e:
            print(f"Error with {model_name}: {e}")
            last_exception = e
            continue
    
    # If all LLMs fail, raise the last exception
    if last_exception:
        print("All LLM models failed")
        raise last_exception
    
    return None


# print(portfolioDataGenerator())

# result = chain.invoke({"query": query}) # result is a dictionary, and dictionaries do not have attributes like .portfolioTemplate. Instead, you should use dictionary key access eg : result["portfolioTemplate"]
# formatted_json = json.dumps(result, indent=4)  # Indents the JSON for readability. **formatted_json is a string
# print(formatted_json)