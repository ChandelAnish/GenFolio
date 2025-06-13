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
import useVisitorCount from "@/hooks/useVisitorCount";
import ErrorComponent from "./ErrorComponent";

export default function ActionDispatchWrapper({
  children,
  username,
}: {
  children: React.ReactNode;
  username: string;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [portfolioData, setPortfolioData] = useState<PortfolioData>();

  useEffect(() => {
    const getPortfolioData = async () => {
      try {
        setLoading(true);
        const { data }: { data: PortfolioData | { error: string } } =
          await axios.get(`http://localhost:3000/api/${username}`);

        if ("error" in data) {
          setError(data.error);
          console.error("API Error:", data.error);
        } else {
          setPortfolioData(data);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          console.error("Request failed:", err.message);
        } else {
          setError("Something went wrong");
          console.error("Unknown error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    getPortfolioData();
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (portfolioData && Object.keys(portfolioData).length != 0) {
      dispatch(fillIntroductionDetails(portfolioData.introduction));
      dispatch(fillExperiencesDetails(portfolioData.experiences));
      dispatch(fillProjectsDetails(portfolioData.projects));
      dispatch(
        fillToolsAndTechnologiesDetails(portfolioData.toolsAndTechnologies)
      );
      dispatch(fillConnectDetails(portfolioData.connect));
      setLoading(false);
    }
  }, [portfolioData]);

  useVisitorCount(portfolioData, username);

  const handlePromptSubmit = async (prompt: string) => {
    // Send the prompt to your server
    console.log("Sending prompt to server:", prompt);

    try {
      const aiResponse = await axios.post(
        `http://localhost:8000/updatePortfolioData/updatePortfolioData`,
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
        const dbResponse = await axios.patch(
          `http://localhost:3000/api/${username}`,
          {
            newPortfolioData,
          }
        );
        console.log(dbResponse.data);
      } catch (error) {
        console.error("error saving to database : ", error);
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
      ) : error ? (
        <ErrorComponent message={error} variant="fullscreen" />
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
