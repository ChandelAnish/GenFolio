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
import LoadingSpinner from "./LoadingSpinner";

export default function ActionDispatchWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<Boolean>(false);
  const [portfolioData, setPortfolioData] = useState<PortfolioData>();

  useEffect(() => {
    const getPortfolioData = async () => {
      setLoading(true);
      const { data }: { data: PortfolioData } = await axios.get(
        "http://localhost:3000/api"
      );
      setPortfolioData(data);
      setLoading(false);
    };
    getPortfolioData();
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (portfolioData) {
      dispatch(fillIntroductionDetails(portfolioData.introduction));
      dispatch(fillExperiencesDetails(portfolioData.experiences));
      dispatch(fillProjectsDetails(portfolioData.projects));
      dispatch(
        fillToolsAndTechnologiesDetails(portfolioData.toolsAndTechnologies)
      );
      dispatch(fillConnectDetails(portfolioData.connect));
    }
  }, [portfolioData]);

  const handlePromptSubmit = async (prompt: string) => {
    // Send the prompt to your server
    console.log("Sending prompt to server:", prompt);

    try {
      const aiResponse = await axios.post(
        "http://localhost:8000/updatePortfolioData/updatePortfolioData",
        {
          username: portfolioData?.connect.mail,
          prompt: prompt,
          previousData: portfolioData,
        }
      );
      const newPortfolioData = aiResponse.data;
      setPortfolioData(newPortfolioData);
      console.log("Response from ai server:", aiResponse.data);
      try {
        const dbResponse = await axios.patch("http://localhost:3000/api", {
          newPortfolioData,
        });
        console.log(dbResponse.data);
      } catch (error) {
        console.error("error saving to database");
      }
    } catch (error) {
      console.error("Error sending prompt:", error);
      throw error;
    }
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {children}
          <div className="fixed bottom-8 right-8 flex flex-col items-center justify-center gap-3">
            <PromptButton
              handlePromptSubmit={handlePromptSubmit}
              placeholder="Ask me anything..."
              buttonText="Ask AI"
            />
            <ThemeSelector />
          </div>
        </>
      )}
    </>
  );
}
