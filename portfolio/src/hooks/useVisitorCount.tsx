"use client";
import { db } from "@/lib/firebase";
import { useAppDispatch } from "@/store/hooks";
import { fillIntroductionDetails } from "@/store/introduction";
import { PortfolioData } from "@/types";
import { onValue, ref } from "firebase/database";
import { useEffect } from "react";

export default function useVisitorCount(
  portfolioData: PortfolioData | undefined, username: string
) {
  // console.log(username)
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (username && portfolioData && portfolioData.introduction && Object.keys(portfolioData.introduction).length != 0) {
      const safeUsername = username.replace(/\./g, '%2E').replace(/@/g, '%40');

      fetch(`/api/${safeUsername}/track-visitor`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.count);
          dispatch(
            fillIntroductionDetails({
              ...portfolioData.introduction,
              visitorCount: data.count ?? undefined,
            })
          );
        });

      const visitRef = ref(db, `${safeUsername}/visits/ips`);
      const unsubscribe = onValue(visitRef, (snapshot) => {
        const data = snapshot.val();
        const count = data ? Object.keys(data).length : 0;

        dispatch(
          fillIntroductionDetails({
            ...portfolioData.introduction,
            visitorCount: count,
          })
        );
      });

      return () => unsubscribe();
    }
  }, [username, portfolioData]);
}
