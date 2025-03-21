"use client";

import { fillConnectDetails } from "@/store/connect";
import { fillExperiencesDetails } from "@/store/experiences";
import { useAppDispatch } from "@/store/hooks";
import { fillIntroductionDetails } from "@/store/introduction";
import { fillProjectsDetails } from "@/store/projects";
import { fillToolsAndTechnologiesDetails } from "@/store/toolsAndTechnologies";
import { PortfolioData } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PromptButton from "./PromptButton";
import ThemeSelector from "./ThemeSelector";

export default function ActionDispatchWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>();

  useEffect(() => {
    const getPortfolioData = async () => {
      // const response = await axios.get("http://localhost:4000/building-portfolio/api");
      // const data = response.data;
      // console.log(data.portfolio.introduction)
      // return data.portfolio;
      const { data }: { data: PortfolioData } = await axios.get(
        "http://localhost:3000/api"
      );
      setPortfolioData(data);
    };
    getPortfolioData();
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (portfolioData) {
      dispatch(fillIntroductionDetails(portfolioData.introduction));
      dispatch(fillExperiencesDetails(portfolioData.experiences));
      dispatch(fillProjectsDetails(portfolioData.projects));
      dispatch(fillToolsAndTechnologiesDetails(portfolioData.toolsAndTechnologies));
      dispatch(fillConnectDetails(portfolioData.connect));
    }
  }, [portfolioData]);

  const handlePromptSubmit = async (prompt: string) => {
    // Send the prompt to your server
    console.log("Sending prompt to server:", prompt);

    try {
      const response = await axios.post(
        "http://localhost:8000/updatePortfolioData/updatePortfolioData",
        {
          username: portfolioData?.connect.mail,
          prompt: prompt,
          previousData: portfolioData,
        }
      );

      setPortfolioData(response.data)
      console.log("Response from server:", response.data);

      // Handle the response as needed
      return portfolioData;
    } catch (error) {
      console.error("Error sending prompt:", error);
      throw error;
    }
  };

  return (
    <>
      {children}
      <div className="fixed bottom-8 right-8 flex flex-col items-center justify-center gap-3">

      <PromptButton
        handlePromptSubmit={handlePromptSubmit}
        placeholder="Ask me anything..."
        buttonText="Ask AI"
      />
        <ThemeSelector/>
      </div>

    </>
  );
}
