"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { GiArtificialHive } from "react-icons/gi";
import axios from "axios";
import { useAppSelector } from "@/hooks/customHooks";
import { useRouter } from "next/navigation";

const LoadingComponent = () => {
  const [loading, setLoading] = useState(true);
  const portfolioDetails = useAppSelector((store) => store.portfolioDetails);
  const router = useRouter();
  const hasCalledApi = useRef(false);

  useEffect(() => {
    // Prevent double execution in Strict Mode
    if (hasCalledApi.current) return;

    const data = portfolioDetails.profileData.name
      ? portfolioDetails
      : JSON.parse(sessionStorage.getItem("portfolioDetails") ?? "{}");

    console.log(data);

    const fetchData = async () => {
      setLoading(true);
      hasCalledApi.current = true;

      try {
        console.log("hello client");
        const response = await axios.post(
          "http://localhost:4000/building-portfolio/api",
          data
        );
        console.log(response.data);
        router.push("/dashboard");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    if (data && Object.keys(data).length > 0) {
      fetchData();
    }
  }, []); // Empty dependency array

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-transparent text-white">
      {loading ? (
        <div className="flex flex-col">
          <motion.div
            animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="text-cyan-500 text-6xl flex items-center justify-center"
          >
            <GiArtificialHive />
          </motion.div>
          <motion.div
            className="pt-4 text-lg font-bold bg-gradient-to-r from-white to-cyan-500 bg-clip-text text-transparent"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            Building your portfolio...
          </motion.div>
        </div>
      ) : null}
    </div>
  );
};

export default LoadingComponent;
