from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
import json

load_dotenv()

google_llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
    # other params...
)

groq_llm = ChatGroq(
    model="mixtral-8x7b-32768",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
)

class Code(BaseModel):
    code: str = Field(description="code of the given question")
    
parser = JsonOutputParser(pydantic_object=Code)

prompt = PromptTemplate(
    template="You are a code generator. Respond strictly in JSON format:\n{format_instructions}\nUser Query:\n{query}",
    input_variables=["query"],
    partial_variables={"format_instructions": parser.get_format_instructions()},
)

# chain = prompt | google_llm | parser
chain = prompt | groq_llm | parser

def generateCode(query: str)->str:
    result = chain.invoke({"query":query})
    return result["code"]

# print(generateCode("write a c++ program to print contents of array"))