"use client";

import React, { useState, ChangeEvent, DragEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiUpload, FiEdit3, FiFileText, FiUser } from "react-icons/fi";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { extractPDFData } from "@/utils/pdfExtractor";
import { useRouter } from "next/navigation";
import axios from "axios";
import { fileToBase64 } from "@/utils/fileToBase64";
import { useAppDispatch } from "@/hooks/customHooks";
import { fillExtractedResumeDetails } from "@/store/extractedResumeDetailsSlice";
import { getGithubAvatarUrl } from "@/utils/getGithubAvatarUrl";
import { useUser } from "@clerk/nextjs";

export default function PortfolioInputChoice() {
  const router = useRouter();
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const {user} = useUser()
  const dispatch = useAppDispatch();

  const handleDrag = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file: File = e.dataTransfer.files[0];
      if (
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf")
      ) {
        setUploadedFile(file);
      } else {
        alert("Please upload a PDF file only.");
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const file: File = e.target.files[0];
      if (
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf")
      ) {
        setUploadedFile(file);
      } else {
        alert("Please upload a PDF file only.");
      }
    }
  };

  function extractGithubProfileUrl(links: string[]): string | undefined {
    return links.find(
      (link) =>
        link.startsWith("https://github.com/") &&
        !link.replace("https://github.com/", "").includes("/")
    );
  }

  const handleUploadSubmit = async (): Promise<void> => {
    if (uploadedFile) {
      setIsExtracting(true);
      try {
        const pdfData = await extractPDFData(uploadedFile);
        // console.log(pdfData);

        const base64File = await fileToBase64(uploadedFile);
        if (base64File) {
          try {
            const { data } = await axios.post(
              "http://localhost:4000/portfolio-details/add-profile-details/api",
              { file: base64File, userId: user?.id, category: "resume" }
            );
            console.log(data);
            console.log(pdfData);
            const githubProfileUrl = extractGithubProfileUrl(pdfData.links);
            let profileImage;
            if (githubProfileUrl) {
              profileImage = await getGithubAvatarUrl(githubProfileUrl);
            }
            dispatch(
              fillExtractedResumeDetails({
                ...pdfData,
                profileImage,
                resumeUrl: data.fileURL,
              })
            );
            router.push("/building-portfolio?entryType=upload");
          } catch (error) {
            console.error("Error uploading the PDF:", error);
          }
        } else {
          console.error("user name not found or base64File not generated");
        }
      } catch (error) {
        console.error("Error extracting PDF data:", error);
      } finally {
        setIsExtracting(false);
      }
    }
  };

  const handleRemoveFile = (): void => {
    setUploadedFile(null);
  };

  const formatFileSize = (bytes: number): string => {
    return (bytes / 1024 / 1024).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent text-center">
            Create Your Portfolio
          </h1>
          <p className="text-gray-400 text-base">
            Choose how you&apos;d like to build your portfolio
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Resume Option */}
          <motion.div
            className="border border-gray-700 rounded-2xl p-8 hover:border-cyan-500 transition-all duration-300"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-cyan-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUpload className="text-cyan-500 text-2xl" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                Upload Resume
              </h2>
              <p className="text-gray-400 text-sm">
                Let AI extract information from your existing resume
              </p>
            </div>

            {/* File Upload Area */}
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                dragActive
                  ? "border-cyan-500 bg-cyan-500 bg-opacity-10"
                  : "border-gray-600 hover:border-cyan-500"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {uploadedFile ? (
                <div className="text-center">
                  <FiFileText className="text-cyan-500 text-4xl mx-auto mb-4" />
                  <p className="text-white font-medium">{uploadedFile.name}</p>
                  <p className="text-gray-400 text-sm mb-4">
                    {formatFileSize(uploadedFile.size)} MB
                  </p>
                  <button
                    onClick={handleUploadSubmit}
                    disabled={isExtracting}
                    className={`bg-cyan-500 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 mx-auto ${
                      isExtracting
                        ? "opacity-75 cursor-not-allowed"
                        : "hover:bg-cyan-600"
                    }`}
                    type="button"
                  >
                    {isExtracting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span>Extracting...</span>
                      </>
                    ) : (
                      "Generate Portfolio"
                    )}
                  </button>
                  {!isExtracting && (
                    <button
                      onClick={handleRemoveFile}
                      className="ml-4 text-gray-400 hover:text-white transition-colors duration-300"
                      type="button"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  <AiOutlineCloudUpload className="text-gray-400 text-5xl mx-auto mb-4" />
                  <p className="text-white mb-2">
                    Drag and drop your resume here
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    or click to browse files
                  </p>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="bg-transparent border border-cyan-500 text-cyan-500 px-6 py-3 rounded-full hover:bg-cyan-600 hover:text-white transition-all duration-300 cursor-pointer inline-block font-medium"
                  >
                    Choose File
                  </label>
                  <p className="text-gray-500 text-xs mt-4">
                    PDF files only, max 10MB
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Manual Entry Option */}
          <motion.div
            className="border border-gray-700 rounded-2xl p-8 hover:border-cyan-500 transition-all duration-300"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-cyan-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiEdit3 className="text-cyan-500 text-2xl" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                Manual Entry
              </h2>
              <p className="text-gray-400 text-sm">
                Fill out your information step by step
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center text-gray-300">
                <FiUser className="text-cyan-500 mr-3" />
                <span>Personal Information</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FiFileText className="text-cyan-500 mr-3" />
                <span>Professional Experience</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FiEdit3 className="text-cyan-500 mr-3" />
                <span>Skills & Projects</span>
              </div>
            </div>

            <Link
              href="/portfolio-details/add-profile-details"
              className="mt-16 w-full font-medium text-center block bg-transparent border border-cyan-500 text-cyan-500 px-6 py-3 rounded-full hover:bg-cyan-600 hover:text-white transition-all duration-300 cursor-pointer"
            >
              Start Manual Entry
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
