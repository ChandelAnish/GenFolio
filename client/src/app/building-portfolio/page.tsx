"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { GiArtificialHive } from "react-icons/gi";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import { useAppSelector } from "@/hooks/customHooks";
import { useRouter, useSearchParams } from "next/navigation";

const LoadingComponent = () => {
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const portfolioDetails = useAppSelector((store) => store.portfolioDetails);
  const router = useRouter();
  const hasCalledApi = useRef(false);
  const searchParams = useSearchParams();

  const extractedResumeDetails = useAppSelector(
    (store) => store.extractedResumeDetails
  );
  console.log(extractedResumeDetails);
  const entryType = searchParams.get("entryType");
  console.log(entryType);

  useEffect(() => {
    // Prevent double execution in Strict Mode
    if (hasCalledApi.current) return;

    const data =
      entryType == "upload"
        ? extractedResumeDetails
        : portfolioDetails.profileData?.name
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

    // Check if data exists and has meaningful content
    if (data && Object.keys(data).length > 0 && (data?.profileData?.name || data?.text )) {
      console.log(data)
      fetchData();
    } else {
      // No data found, show message and prepare to navigate back
      setLoading(false);
      setNoData(true);

      // Auto-navigate back after 3 seconds
      const timer = setTimeout(() => {
        router.back();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []); // Empty dependency array

  const handleGoBack = () => {
    router.back();
  };

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
      ) : noData ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-6"
        >
          <div className="text-red-500 text-6xl">
            <GiArtificialHive />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-2">
              No Portfolio Data Found
            </h2>
            <p className="text-gray-400 mb-1">
              Please complete your portfolio details first.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting you back in 3 seconds...
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoBack}
            className="w-full sm:w-auto border border-cyan-600 text-cyan-500 px-4 sm:px-6 py-1 sm:py-2 rounded-full flex items-center justify-center hover:bg-cyan-900 hover:bg-opacity-20 transition-all duration-300 text-sm sm:text-base"
          >
            <BiArrowBack /> &nbsp;
            <span>Go Back</span>
          </motion.button>
        </motion.div>
      ) : null}
    </div>
  );
};

export default LoadingComponent;
