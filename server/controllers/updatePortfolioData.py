from ..services.updatePortfolioSectionsAI import updatedPortfolioDataGenerator


async def generateUpdatedPortfolioData(req, session):
    updatedPortfolioData = await updatedPortfolioDataGenerator(
        previousData=req.previousData, userPrompt=req.prompt
    )
    return updatedPortfolioData
