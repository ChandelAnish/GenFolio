"use client";

import { useState, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import { Copy, Edit, Palette } from "lucide-react";
import { GiArtificialHive } from "react-icons/gi";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

const themes = [
  {
    id: "modern",
    name: "Modern",
    preview: "/themes/modern-preview.png",
    colors: ["#3B82F6", "#1E40AF", "#DBEAFE"],
  },
  {
    id: "minimal",
    name: "Minimal",
    preview: "/themes/minimal-preview.png",
    colors: ["#6B7280", "#374151", "#F9FAFB"],
  },
  {
    id: "creative",
    name: "Creative",
    preview: "/themes/creative-preview.png",
    colors: ["#F59E0B", "#D97706", "#FEF3C7"],
  },
  {
    id: "professional",
    name: "Professional",
    preview: "/themes/professional-preview.png",
    colors: ["#059669", "#047857", "#D1FAE5"],
  },
  {
    id: "dark",
    name: "Dark",
    preview: "/themes/dark-preview.png",
    colors: ["#1F2937", "#111827", "#F3F4F6"],
  },
];

export default function DashboardPage() {
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("modern");
  const [username, setUsername] = useState<string | undefined>("");
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    setUsername(user?.primaryEmailAddress?.emailAddress);
    setPortfolioUrl(
      `http://localhost:3000/portfolio/${user?.primaryEmailAddress?.emailAddress}`
    );
  }, [user]);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(portfolioUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleEditPortfolio = () => {
    window.location.href = `http://localhost:3000/portfolio/${user?.primaryEmailAddress?.emailAddress}/edit`;
  };

  const currentTheme = themes.find((theme) => theme.id === selectedTheme);

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
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
            {/* Themes Section */}
            <div className="flex flex-col">
              <div className="flex items-center mb-6">
                <Palette className="text-cyan-400 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-white">
                  Choose Your Theme
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {themes.map((theme) => (
                  <div
                    key={theme.id}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-[1.02] bg-gray-800/50 backdrop-blur-sm ${
                      selectedTheme === theme.id
                        ? "border-cyan-400 shadow-lg shadow-cyan-400/20 ring-1 ring-cyan-400/30"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                    onClick={() => setSelectedTheme(theme.id)}
                  >
                    <div className="h-20 sm:h-24 bg-gradient-to-br from-gray-800 to-gray-750 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-sm text-gray-400 font-medium">
                          Preview
                        </div>
                      </div>
                      {/* Color dots representing theme */}
                      <div className="absolute bottom-2 left-2 flex space-x-1">
                        {theme.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-3 h-3 rounded-full border-2 border-white/20 shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="p-3 min-h-[3.5rem] flex flex-col justify-between">
                      <h3 className="text-sm font-semibold text-white">
                        {theme.name}
                      </h3>
                      <div className="h-5 flex items-center">
                        {selectedTheme === theme.id && (
                          <div className="text-xs text-cyan-400 font-medium flex items-center">
                            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                            Selected
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Preview Card Section */}
            <div className="flex flex-col items-center w-full">
              {/* Current Selection */}
              <div className="w-full max-w-md mb-4 lg:mb-6 p-4 bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700/50">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Current Selection
                </h3>
                <div className="flex items-center">
                  <div className="flex space-x-2 mr-4">
                    {currentTheme?.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-5 h-5 rounded-full border-2 border-white/20 shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="text-cyan-400 font-semibold text-lg">
                    {currentTheme?.name} Theme
                  </span>
                </div>
              </div>

              {/* Preview Card */}
              <div className="w-full max-w-md bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-cyan-500/10 border border-gray-700/50">
                <div className="relative h-40 sm:h-48 w-full overflow-hidden">
                  <Image
                    src="/portfolioPreview.png"
                    alt="Portfolio Preview"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    <span className="text-xs text-cyan-400 font-semibold">
                      {currentTheme?.name} Theme
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-6 bg-gray-800/80 backdrop-blur-sm">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">
                    Your Portfolio
                  </h3>
                  <p className="text-gray-300 mb-4 sm:mb-6 text-sm leading-relaxed">
                    A beautiful showcase of your projects and skills
                  </p>

                  {/* Portfolio URL section */}
                  <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-stretch sm:items-center rounded-lg overflow-hidden border border-gray-600/50">
                    <div className="flex-1 bg-gray-700/50 px-3 sm:px-4 py-2 sm:py-3 overflow-hidden">
                      <div className="text-xs sm:text-sm text-gray-300 truncate font-mono">
                        {portfolioUrl}
                      </div>
                    </div>
                    <button
                      onClick={handleCopyUrl}
                      className={`flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 transition-all duration-200 font-medium text-sm sm:text-base ${
                        isCopied
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-cyan-600 hover:bg-cyan-700 text-white"
                      }`}
                    >
                      <Copy size={16} className="mr-2" />
                      {isCopied ? "Copied!" : "Copy"}
                    </button>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-4 py-3 rounded-lg font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
                    >
                      Visit Portfolio
                    </a>

                    <button
                      onClick={handleEditPortfolio}
                      className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-3 rounded-lg font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                    >
                      <Edit size={16} className="mr-2" />
                      Edit Portfolio with AI
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
