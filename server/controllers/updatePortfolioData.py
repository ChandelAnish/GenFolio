from ..services.updatePortfolioSectionsAI import portfolioSectionDataGenerator


async def generateUpdatedPortfolioData(req, session):
    updatedPortfolioData = await portfolioSectionDataGenerator(
        previousData=req.previousData, userPrompt=req.prompt
    )
    return updatedPortfolioData
