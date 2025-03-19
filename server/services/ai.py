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
    model="gemini-1.5-pro",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
    # other params...
)

load_dotenv()

llm = ChatGroq(
    model="mixtral-8x7b-32768",
    temperature=0,
    max_tokens=None,
    timeout=None,
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


chain = prompt | google_llm | parser


async def portfolioDataGenerator(requestPortfolioData: RequestProfileData):
    query = f"""
Generate a JSON response strictly following this Pydantic schema.

Enhance the details provided by the user, correct the spelling mistakes and use strong verbs so that it is more impactful.

Here is the input data:
{requestPortfolioData}

"""
    result = chain.invoke({"query": query})
    return result


# print(portfolioDataGenerator())

# result = chain.invoke({"query": query}) # result is a dictionary, and dictionaries do not have attributes like .portfolioTemplate. Instead, you should use dictionary key access eg : result["portfolioTemplate"]
# formatted_json = json.dumps(result, indent=4)  # Indents the JSON for readability. **formatted_json is a string
# print(formatted_json)
