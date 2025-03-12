from langchain_groq import ChatGroq
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import PromptTemplate
from typing import List
import json

load_dotenv()

llm = ChatGroq(
    model="mixtral-8x7b-32768",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
)


class Template(BaseModel):
    template: str

parser = JsonOutputParser(pydantic_object=Template)

prompt = PromptTemplate(
    template="Answer the user query.\n{format_instructions}\n{query}\n",
    input_variables=["query"],
    partial_variables={"format_instructions": parser.get_format_instructions()},
)


chain = prompt | llm | parser

summery = """
Anish Singh Chandel is a dedicated B.Tech student in Information Technology at CUSAT, Kochi, with an impressive CGPA of 9.43 (2022–2026). He has a strong foundation in DSA, Web Development, DBMS, Backend, OOPs, Software Engineering, and Frontend.

His technical expertise includes HTML, CSS, Tailwind CSS, Bootstrap, ReactJS, Redux, NodeJS, ExpressJS, RESTful APIs, MongoDB, MySQL, JavaScript, C, and C++. He is proficient in using developer tools like VS Code, Git/GitHub, Postman, MongoDB Compass, ChatGPT, Vercel, Render, and Netlify.

Key Projects:
Labour Hiring Website (2024): A job hiring platform with authentication, OTP-based login, and role-based access for labourers, recruiters, and admins. Features include job management, admin controls, and profile updates. (Tech Stack: HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, Prisma, NodeJS, ExpressJS).
Disaster Management Web App (2024): A web application that enables early warning systems, coordination platforms, community empowerment, and innovative shelter solutions for disaster relief. (Tech Stack: HTML, CSS, Bootstrap, JavaScript, NodeJS, ExpressJS).
Experience:
Anish has worked on enhancing full-stack web applications using React and Express, improving performance and user experience. He actively contributed to GirlScript Summer of Code and Social Summer of Code, where he developed and optimized web applications.

Certifications & Achievements:
Awarded a certificate for developing a disaster management web app at the 24-hour hackathon, Magnathon 2.0, focusing on early warning systems, coordination platforms, and community empowerment.
With a strong technical background and hands-on experience in full-stack development, Anish is passionate about building scalable, impactful web applications
"""

query = f"""
Given the following resume summary, generate a structured portfolio website outline that includes sections and subsections relevant to the person's skills, experience, projects, achievements, etc. The template should be organized and labeled clearly, following a hierarchy with main sections and their corresponding subsections.

Resume Summary:
{summery}

Expected Output Format:
The output should be a string which is like structured list with numbered sections, each containing relevant details.

1. Header
    - Full name
    - Title (e.g., Software Engineer, Data Scientist, etc.)
    - Subtitle (A brief tagline that highlights expertise or passion)
    - Call-to-action button (e.g., "Let's Connect")
    
2. Introduction
    - A brief self-introduction summarizing key strengths and interests

3. Technical Expertise
    - List of programming languages, frameworks, and tools

4. Key Projects
    - Project Name (Year)
    - Brief description
    - Tech stack used

5. Experience
    - Key roles and contributions in internships, jobs, or open-source projects

6. Certifications & Achievements
    - List of certifications and accomplishments

7. Education
    - Degree, University, Graduation Year
    - CGPA (if provided)

8. Footer
    - Social media links
    - Copyright information
    - Contact details
etc. add other required sections according to the resume summery.
"""

def templeteGenerator():
    result = chain.invoke({"query": query})
    return result['template']
print(templeteGenerator())

# result = chain.invoke({"query": query}) # result is a dictionary, and dictionaries do not have attributes like .portfolioTemplate. Instead, you should use dictionary key access eg : result["portfolioTemplate"]
# formatted_json = json.dumps(result, indent=4)  # Indents the JSON for readability. **formatted_json is a string
# print(formatted_json)