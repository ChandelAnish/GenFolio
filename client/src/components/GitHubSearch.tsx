// components/GitHubSearch.tsx
"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchGithubUsers from './SearchGithubUsers';
import Repositories from './Repositories';


// Types
export interface GithubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}

export default function GitHubSearch() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedRepos, setSelectedRepos] = useState<Repository[]>([]);

  // Search for GitHub users on input change
  useEffect(() => {
    const searchUsers = async () => {
      if (!searchQuery.trim()) {
        setUsers([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`https://api.github.com/search/users?q=${searchQuery}`);
        setUsers(response.data.items);
        setLoading(false);
      } catch (err) {
        setError('Error searching for users');
        setLoading(false);
      }
    };

    // Debounce search to avoid too many requests
    const debounceTimeout = setTimeout(() => {
      searchUsers();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const handleUserSelect = (username: string) => {
    setSelectedUser(username);
    setSelectedRepos([]);
  };

  const handleRepoToggle = (repo: Repository, isSelected: boolean) => {
    if (isSelected) {
      setSelectedRepos(prev => [...prev, repo]);
    } else {
      setSelectedRepos(prev => prev.filter(r => r.id !== repo.id));
    }
  };

  const handleContinue = () => {
    const selectedReposInfo = selectedRepos.map(repo => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
      language: repo.language
    }));
    
    console.log(selectedReposInfo);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 flex flex-col items-center mt-28">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-500 bg-clip-text text-transparent">Add Projects from GitHub</h1>
      
      <div className="flex justify-center w-full">
        {/* github user list */}
        {!selectedUser && <div className='w-full'>
          <SearchGithubUsers
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            users={users}
            loading={loading}
            error={error}
            onUserSelect={handleUserSelect}
          />
        </div>}
        
        {/* Repositories list */}
        {selectedUser && (
          <div className="w-full">
            {selectedUser && (
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                  <button 
                    onClick={() => setSelectedUser(null)}
                    className="flex items-center text-blue-600 hover:underline text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                    Back
                  </button>
                  <span className="text-sm text-gray-500">{selectedRepos.length} selected</span>
                </div>
                
                <Repositories
                  username={selectedUser} 
                  onRepoToggle={handleRepoToggle}
                  selectedRepos={selectedRepos}
                />
                
                <div className="mt-auto pt-4 border-gray-200 dark:border-gray-700">
                  <button 
                    onClick={handleContinue}
                    disabled={selectedRepos.length === 0}
                    className={`w-full py-3 rounded-md text-white font-medium transition-colors ${
                      selectedRepos.length > 0 
                        ? 'bg-gradient-to-br from-white/70 to-cyan-500/70 hover:bg-cyan-700' 
                        : 'bg-gray-400/40 cursor-not-allowed'
                    }`}
                  >
                    Continue with {selectedRepos.length} {selectedRepos.length === 1 ? 'repository' : 'repositories'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}