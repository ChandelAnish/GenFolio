from fastapi import Depends, APIRouter
from sqlmodel import  Session
from ..db import get_session
from typing import Annotated
from ..controllers.portfolioData import generatePortfolioData
from ..schemas import RequestPortfolioDetails, ExtractedResumeData

router = APIRouter(
    prefix="/portfolioData",
    tags=["Portfolio-Data"]
)

SessionDep = Annotated[Session, Depends(get_session)]

#get portfolio data
@router.post("/")
async def getPortfolioData(req: RequestPortfolioDetails | ExtractedResumeData,session: SessionDep):
    return await generatePortfolioData(req,session)
