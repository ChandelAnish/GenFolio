from fastapi import Depends, APIRouter
from sqlmodel import  Session
from ..db import get_session
from typing import Annotated
from ..controllers.updatePortfolioData import generateUpdatedPortfolioData
from ..schemas import PortfolioData
from pydantic import BaseModel

router = APIRouter(
    prefix="/updatePortfolioData",
    tags=["Update Portfolio Data"]
)

SessionDep = Annotated[Session, Depends(get_session)]


class UpdatePortfolioData(BaseModel):
    username: str
    prompt: str
    previousData: PortfolioData

@router.post("/updatePortfolioData")
async def updateExperienceData(req: UpdatePortfolioData,session: SessionDep):
    return await generateUpdatedPortfolioData(req,session)

