"use client";
import React, { useState, useEffect, useRef } from "react";
import { X, Plus, Search, ArrowRight } from "lucide-react";
import { useAppDispatch } from "@/hooks/customHooks";
import { fillInitialProfileDetails, fillSkills } from "@/store/portfolioDetailsSlice";
import { useRouter } from "next/navigation";
import { Skill } from "@/types";


const SkillsSelector: React.FC = () => {
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState("");
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch()
  const router = useRouter()

  // Sample skills database
  const allSkills: Skill[] = [
    { id: "1", name: "React", category: "frontend" },
    { id: "2", name: "Next.js", category: "frontend" },
    { id: "3", name: "TypeScript", category: "frontend" },
    { id: "4", name: "JavaScript", category: "frontend" },
    { id: "5", name: "HTML/CSS", category: "frontend" },
    { id: "6", name: "Tailwind CSS", category: "frontend" },
    { id: "7", name: "Angular", category: "frontend" },
    { id: "8", name: "Vue.js", category: "frontend" },
    { id: "9", name: "Node.js", category: "backend" },
    { id: "10", name: "Express", category: "backend" },
    { id: "11", name: "Python", category: "backend" },
    { id: "12", name: "Django", category: "backend" },
    { id: "13", name: "Flask", category: "backend" },
    { id: "14", name: "Java", category: "backend" },
    { id: "15", name: "Spring Boot", category: "backend" },
    { id: "16", name: "MongoDB", category: "database" },
    { id: "17", name: "PostgreSQL", category: "database" },
    { id: "18", name: "MySQL", category: "database" },
    { id: "19", name: "Docker", category: "devops" },
    { id: "20", name: "Kubernetes", category: "devops" },
    { id: "21", name: "AWS", category: "devops" },
    { id: "22", name: "Firebase", category: "backend" },
    { id: "23", name: "React Native", category: "mobile" },
    { id: "24", name: "Flutter", category: "mobile" },
    { id: "25", name: "Swift", category: "mobile" },
    { id: "26", name: "GraphQL", category: "backend" },
    { id: "27", name: "Redux", category: "frontend" },
    { id: "28", name: "Sass", category: "frontend" },
    { id: "29", name: "Go", category: "backend" },
    { id: "30", name: "Rust", category: "backend" },
  ];

    useEffect(() => {
      // load profile data details from session storage
      const sessionProfileData = JSON.parse(
        sessionStorage.getItem("portfolioDetails") ?? "{}"
      );
      if (Object.keys(sessionProfileData).length != 0) {
        // console.log(sessionProfileData.skills);
        dispatch(fillInitialProfileDetails(sessionProfileData));
        setSelectedSkills(sessionProfileData.skills)
      }
    },[]);

  // Filter skills based on search term
  const filteredSkills = allSkills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedSkills.some((selected) => selected.id === skill.id)
  );

  // Group skills by category
  const groupedSkills = filteredSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Handler for adding a skill
  const handleAddSkill = (skill: Skill) => {
    setSelectedSkills([...selectedSkills, skill]);
    setSearchTerm("");
    setShowSuggestions(false);
    setError("");
  };

  // Handler for removing a skill
  const handleRemoveSkill = (skillId: string) => {
    setSelectedSkills(selectedSkills.filter((skill) => skill.id !== skillId));
  };

  // Handler for continue button
  const handleContinue = () => {
    if (selectedSkills.length < 5) {
      setError("Please select at least 5 skills.");
      return;
    }
    dispatch(fillSkills(selectedSkills))
    // console.log("Selected Skills:", selectedSkills);
    router.push('/building-portfolio')
  };

  // Handler for adding a custom skill
  const handleAddCustomSkill = () => {
    if (
      searchTerm.trim() &&
      !allSkills.some(
        (skill) => skill.name.toLowerCase() === searchTerm.toLowerCase()
      )
    ) {
      const newSkill: Skill = {
        id: `custom-${Date.now()}`,
        name: searchTerm.trim(),
        category: "other",
      };
      handleAddSkill(newSkill);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showSuggestions) {
        const suggestions = Object.values(groupedSkills).flat();
        if (e.key === "ArrowDown") {
          setActiveSuggestionIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : prev
          );
        } else if (e.key === "ArrowUp") {
          setActiveSuggestionIndex((prev) => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === "Enter") {
          if (
            activeSuggestionIndex >= 0 &&
            suggestions[activeSuggestionIndex]
          ) {
            handleAddSkill(suggestions[activeSuggestionIndex]);
          } else {
            handleAddCustomSkill();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSuggestions, groupedSkills, activeSuggestionIndex]);

  // Category display names
  const categoryNames: Record<string, string> = {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    devops: "DevOps",
    mobile: "Mobile",
    other: "Other",
  };

  // Get skill badge color based on category
  const getSkillColor = (category: string) => {
    const colors: Record<string, string> = {
      frontend: "bg-cyan-600",
      backend: "bg-green-500",
      database: "bg-purple-500",
      devops: "bg-orange-500",
      mobile: "bg-pink-500",
      other: "bg-gray-500",
    };
    return colors[category] || colors.other;
  };

  return (
    <div className="w-full max-w-2xl bg-gray-800/20 border border-gray-700 rounded-lg p-6 shadow-lg mx-auto">
      <div className="flex justify-start">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-cyan-500 bg-clip-text text-transparent mb-6">
          Select Your Skills
        </h2>
      </div>

      {/* Selected skills */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedSkills.map((skill) => (
            <div
              key={skill.id}
              className={`${getSkillColor(
                skill.category
              )} text-white px-3 py-1 rounded-full flex items-center gap-1`}
            >
              <span>{skill.name}</span>
              <button
                onClick={() => handleRemoveSkill(skill.id)}
                className="ml-1 bg-white bg-opacity-20 rounded-full p-1 hover:bg-opacity-30 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          {selectedSkills.length === 0 && (
            <p className="text-gray-400 text-sm">
              No skills selected. Start typing to add skills.
            </p>
          )}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {/* Search input */}
      <div className="relative">
        <div className="flex items-center border-[1px] border-gray-700 rounded-md focus-within:border-cyan-500/50 bg-gray-600/20">
          <div className="pl-3 text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
              setActiveSuggestionIndex(-1);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Search skills..."
            className="w-full px-3 py-2 bg-transparent text-white focus:outline-none"
            ref={inputRef}
          />
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && searchTerm && (
          <div className="absolute z-10 mt-1 w-full bg-gray-800 rounded-md shadow-lg max-h-60 overflow-auto">
            {Object.keys(groupedSkills).length > 0 ? (
              Object.entries(groupedSkills).map(([category, skills]) => (
                <div key={category}>
                  <div className="px-4 py-2 text-sm text-gray-400">
                    {categoryNames[category].toUpperCase()}
                  </div>
                  {skills.map((skill, index) => {
                    const flatIndex = Object.values(groupedSkills)
                      .flat()
                      .indexOf(skill);
                    return (
                      <div
                        key={skill.id}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-600 flex items-center justify-between ${
                          flatIndex === activeSuggestionIndex
                            ? "bg-gray-600"
                            : ""
                        }`}
                        onClick={() => handleAddSkill(skill)}
                      >
                        <span className="text-white">{skill.name}</span>
                        <Plus size={16} className="text-cyan-500" />
                      </div>
                    );
                  })}
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-400">
                No matching skills found. Press Enter to add "{searchTerm}" as a
                custom skill.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick add section */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-400 mb-2">
          Popular Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {allSkills.slice(0, 8).map(
            (skill) =>
              !selectedSkills.some((s) => s.id === skill.id) && (
                <button
                  key={skill.id}
                  onClick={() => handleAddSkill(skill)}
                  className="bg-gray-700/50 border-[1px] border-gray-500/90 hover:bg-gray-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  <Plus size={14} />
                  <span>{skill.name}</span>
                </button>
              )
          )}
        </div>
      </div>

      {/* Skills count and Continue button */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-400">
          {selectedSkills.length} skills selected
        </div>
        <button
          onClick={handleContinue}
          className="bg-cyan-600/90 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors duration-300"
        >
          <span>Continue</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default SkillsSelector;
