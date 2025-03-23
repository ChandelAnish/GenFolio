"use client";

import { useState, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import { Copy } from "lucide-react";
import { GiArtificialHive } from "react-icons/gi";
import Image from "next/image";

export default function DashboardPage() {
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [profileImg, setProfileImg] = useState<string>('/defaultUserImage.png')
  const [username, setUsername] = useState<string>('')
  
  // Generate portfolio URL based on user info - this would typically come from your backend
  useEffect(() => {
    const sessionProfileData = JSON.parse(
        sessionStorage.getItem("portfolioDetails") ?? "{}"
      );
    setUsername(sessionProfileData.profileData.email)
    setProfileImg(sessionProfileData.profileData.profileImage)
    setPortfolioUrl(`http://localhost:3000/api/${sessionProfileData.profileData.email}`);
  }, []);
  
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(portfolioUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <nav className="px-6 py-4 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center">
          <GiArtificialHive className="text-4xl mr-2 text-cyan-400" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-500 bg-clip-text text-transparent">
            GenFolio
          </h1>
        </div>
        <div className="flex items-center">
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>
      
      {/* Main Content - Two Grid Layout */}
      <main className="container mx-auto p-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-36 mt-12">
          {/* Profile Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-cyan-500 shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-cyan-500/40">
              <img 
                src={profileImg} 
                alt="Profile Picture"
                // fill
                className="object-cover"
                // priority
              />
            </div>
            <h2 className="mt-6 text-md font-bold text-gray-300">{username}</h2>
            <p className="mt-2 text-gray-400">Showcase your best work</p>
          </div>
          
          {/* Preview Card Section */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-cyan-500/10 border border-gray-700">
              <div className="relative h-48 w-full">
                <Image
                  src="/portfolioPreview.png"
                  alt="Portfolio Preview"
                  fill
                  className="object-cover blur-[3px]"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Your Portfolio</h3>
                <p className="text-gray-400 mb-4">A beautiful showcase of your projects and skills</p>
                
                {/* Portfolio URL section */}
                <div className="mt-4 flex items-center">
                  <div className="flex-1 bg-gray-700 rounded-l-md px-4 py-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {portfolioUrl}
                  </div>
                  <button
                    onClick={handleCopyUrl}
                    className={`flex items-center justify-center px-4 py-2 rounded-r-md transition-colors duration-200 ${
                      isCopied 
                        ? "bg-green-600 hover:bg-green-700" 
                        : "bg-cyan-600 hover:bg-cyan-700"
                    }`}
                  >
                    <Copy size={16} className="mr-2" />
                    {isCopied ? "Copied!" : "Copy"}
                  </button>
                </div>
                
                <div className="mt-6">
                  <a 
                    href={portfolioUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-gradient-to-r from-white to-cyan-500 px-4 py-2 rounded-md font-medium text-gray-900 hover:from-gray-100 hover:to-cyan-600 transition-all duration-200"
                  >
                    Visit Portfolio
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}