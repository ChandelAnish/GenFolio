from fastapi import FastAPI, Depends
from sqlmodel import SQLModel, Session
from .db import engine, get_session
from typing import Annotated
from .routers import portfolioData, users, updatePortfolioData
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:4000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()

#including the users router
app.include_router(users.router)

#including the portfolio router
app.include_router(portfolioData.router)

#including the update portfolio router
app.include_router(updatePortfolioData.router)