import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Repository } from './GitHubSearch';

interface RepositoriesProps {
  username: string;
  onRepoToggle: (repo: Repository, isSelected: boolean) => void;
  selectedRepos: Repository[];
}

const Repositories: React.FC<RepositoriesProps> = ({ 
  username, 
  onRepoToggle,
  selectedRepos 
}) => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
        setRepos(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load repositories');
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [username]);

  const isRepoSelected = (repoId: number) => {
    return selectedRepos.some(repo => repo.id === repoId);
  };

  if (loading) return (
    <div className="text-center py-10">
      <div className="loader mx-auto mb-2"></div>
      <p>Loading repositories...</p>
    </div>
  );
  
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;
  if (repos.length === 0) return <div className="text-center py-10">No repositories found</div>;

  return (
    <div className="max-h-[20rem] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent dark:bg-transparent p-2">
      <div className="space-y-2">
        {repos.map((repo) => {
          const selected = isRepoSelected(repo.id);
          
          return (
            <div 
              key={repo.id}
              className={`p-4 rounded-lg transition-colors ${
                selected 
                  ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' 
                  : 'border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex items-start">
                <div className="flex-grow">
                  <div className="flex items-center flex-wrap">
                    <h3 className="text-lg font-medium">
                      {repo.name}
                    </h3>
                  </div>
                  
                  
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    {/* Repositories link */}
                    <a 
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline text-xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View on GitHub
                    </a>
                  </div>

                </div>
                
                <div className="ml-4 flex-shrink-0">
                  <input 
                    type="checkbox"
                    checked={selected}
                    onChange={(e) => onRepoToggle(repo, e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <style jsx>{`
        .loader {
          border: 3px solid #f3f3f3;
          border-radius: 50%;
          border-top: 3px solid #3498db;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Repositories;