from langchain_groq import ChatGroq
from dotenv import load_dotenv
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import PromptTemplate
from ..schemas import PortfolioData
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

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
)

async def portfolioSectionDataGenerator(previousData, userPrompt: str):
        
    parser = JsonOutputParser(pydantic_object=PortfolioData)

    prompt = PromptTemplate(
        template="Generate a JSON response strictly following this Pydantic schema to update the portfolio data based on the user query.\n{format_instructions}\n{query}\n",
        input_variables=["query"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )
    
    query = f"""
1. Generate a JSON response strictly following this Pydantic schema.
2. Ensure the response preserves the original structure of the data but reflects the modifications requested by the user.
3. Maintain consistency in formatting and keys while only modifying relevant parts.
4. Maintain the exact JSON structure - do not add/remove keys from objects
5. Do not change anything that the user hasn't specifically requested

For array modifications (the only structural changes allowed):
- You MAY add or remove entire elements from experiences, projects, or toolsAndTechnologies arrays
- You MAY add or remove items from the highlights array within experiences
- You MAY add or remove technologies within projects, following it's object structure. 
- You MAY add technologies to toolsAndTechnologies but must include both "name" and "icon" (use valid react-icons component names)
- You MUST maintain the structure of all existing elements (keep all keys)

Term translations for better understanding:
- "Hero section" = introduction object
- "Experience card" = individual experiences in the experiences array
- "Project card" = individual projects in the projects array
- "Spotlight project" = the projects array itself
- "Add topics to project" = add technologies to a project
- "End messages/let's connect message"/last message = msg1 and msg2 in connect object
- "My tech arsenal" = toolsAndTechnologies array
- "Connect/footer/end/last section" = connect object

Do not invent metrics or technologies that weren't mentioned. Return the complete JSON with all requested modifications while preserving the exact structure.

Here is the user prompt. Perform the requested modifications while strictly preserving the original format.
{userPrompt}

Here is the previous data of the the portfolio:
{previousData}
"""
        
    # chain = prompt | google_llm | parser
    chain = prompt | llm | parser
    result = chain.invoke({"query": query})

    return result
