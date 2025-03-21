from pydantic import BaseModel
from typing import Optional, List

class userschema(BaseModel):
    name: str
    email: str
    password: str

class responseUserSchema(BaseModel):
    id:int
    name: str
    email: str
    password: str
    

# client request data schema
class RequestExperience(BaseModel):
    company: str
    role: str
    duration: str
    description: str
    highlights: List[str] = []

class RequestProject(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    technologies: List[str] = []
    link: str

class RequestProfileData(BaseModel):
    name: str
    githubUsername: str
    linkedinUsername: str
    email: str
    designation: str
    about: str
    profileImage: Optional[str] = None

class RequestSkill(BaseModel):
    id: str
    name: str
    category: str  # "frontend" | "backend" | "database" | "devops" | "mobile" | "other"

class RequestPortfolioDetails(BaseModel):
  profileData: RequestProfileData
  experience: List[RequestExperience]
  projects: List[RequestProject]
  skills: List[RequestSkill]





# portfolio data schemas
class Introduction(BaseModel):
    name: str
    designation: str
    about: str
    profileImage: str

class Experience(BaseModel):
    id: int
    company: str
    role: str
    duration: str
    description: str
    highlights: List[str]

class Technology(BaseModel):
    name: str

class Project(BaseModel):
    title: str
    description: str
    technologies: List[Technology]
    link: str

class ToolTechnology(BaseModel):
    name: str
    icon: str

class Connect(BaseModel):
    msg1: str
    github: str
    linkedin: str
    mail: str
    msg2: str

class PortfolioData(BaseModel):
    introduction: Introduction
    experiences: List[Experience]
    projects: List[Project]
    toolsAndTechnologies: List[ToolTechnology]
    connect: Connect

