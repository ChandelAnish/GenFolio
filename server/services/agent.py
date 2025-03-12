from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import getpass 
import os
import datetime
from langchain.agents import create_react_agent, AgentExecutor, tool
from langchain import hub
from writeOnFile import writeCodeInFile
from groq_ai import templeteGenerator, summery
from codeGenerator import generateCode

load_dotenv() 

if "GROQ_API_KEY" not in os.environ:
    os.environ["GROQ_API_KEY"] = getpass.getpass("Enter your Groq API key: ")


llm = ChatGroq(
    model="mixtral-8x7b-32768",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
    # other params...
)

prompt_template = hub.pull("hwchase17/react")

"""
**LangChain's React agent framework is designed to work with tools that take a single string input. This is because the agent generates a string as its action input, and the framework isn't built to naturally parse multiple arguments from the agent's reasoning.

**mostly the agents returns string.

when you define a tool with multiple parameters like this:
        def writeCodeInTheFile(fileName: str, code: str):

The agent actually needs to construct a JSON/dict object with these parameters, which is more complex and error-prone.



Instead, with a single string parameter:
        def writeCodeInTheFile(text: str):
            \"""Write code to a file. The text should be in the format 'filename: code'""\"

    The agent can more reliably work with this because:

        - It only needs to generate a single string
        - The string format is simpler for the LLM to understand
        - We handle the parsing of multiple parameters inside the function

You can make tools with multiple parameters work, but it requires:

    - More complex prompt engineering
    - Better structured output parsing
    - More sophisticated agent types (like structured tools)
"""

@tool 
def writeCodeInTheFile(text: str):
    """
    This method opens a given file for writing given code in client folder, creates the file if it does not exist.
    IMPORTANT: The text must be provided in the format 'filename: code' with a colon separator.
    The code must be the complete, unmodified code you want to save.
    """
    text = text.strip()
    print("\n\n",text)
    fileName, code = text.split(':',1)
    fileName = fileName.strip()
    code = code.strip()
    print("\n\n",fileName,"\n\n",code)
    # code = code[1:len(code)-1]
    writeCodeInFile(fileName=fileName, code=code)

@tool 
def generateTemplate():
    """function to retrieve template of the website that contains the descriptions of each section and its subsections of the website"""
    return templeteGenerator()

@tool 
def resumeSummery():
    """function returns the summery of the resume"""
    return summery

@tool 
def codeGenerator(query: str):
    """
    Function to generate code based on the given query.
    The query should be a clear description of what code needs to be generated.
    Returns properly formatted code as a string.
    """
    try:
        return generateCode(query=query)
    except Exception as e: # Exception in Python is a built-in base class for all standard exceptions.you're catching all exceptions that are derived from Exception.
        return f"Error generating code: {str(e)}"



tools=[resumeSummery, generateTemplate, codeGenerator, writeCodeInTheFile]


agent = create_react_agent(llm, tools, prompt_template)

agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True, handle_parsing_errors=True)

query = """
1. Retrieve the resume summary using the resumeSummery tool.  
2. Generate the website template based on the resume summary using the generateTemplate tool.  
3. Based on the generated template, create the portfolio website using HTML, JavaScript, Tailwind CSS, and CSS with the codeGenerator tool.  
   - Include a structured layout for sections like Header, Introduction, Technical Expertise, Projects, Experience, Certifications, Education, and Footer.  
   - Ensure responsiveness and clean UI using Tailwind CSS.  
4. Save the generated code files using the writeCodeInTheFile tool.  
   - Save the main HTML structure in `index.html`.  
   - Save JavaScript logic in `script.js`.  
   - Save styling in `styles.css`.  
   - Ensure all files are correctly named and structured for a functional website.  
"""
result=agent_executor.invoke({"input": query})