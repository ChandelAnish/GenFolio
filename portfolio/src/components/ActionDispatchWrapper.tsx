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

export default function ActionDispatchWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<PortfolioData>();

  useEffect(() => {
    const getPortfolioData = async () => {
      // const response = await axios.get("http://localhost:4000/building-portfolio/api");
      // const data = response.data;
      // console.log(data.portfolio.introduction)
      // return data.portfolio;
      const { data }: { data: PortfolioData } = await axios.get(
        "http://localhost:3000/api"
      );
      setData(data);
    };
    getPortfolioData();
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(fillIntroductionDetails(data.introduction));
      dispatch(fillExperiencesDetails(data.experiences));
      dispatch(fillProjectsDetails(data.projects));
      dispatch(fillToolsAndTechnologiesDetails(data.toolsAndTechnologies));
      dispatch(fillConnectDetails(data.connect));
    }
  }, [data]);

  return <>{children}</>;
}
