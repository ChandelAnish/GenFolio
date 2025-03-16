import React from 'react';
import { GithubUser } from '@/types';

interface SearchGithubUsersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  users: GithubUser[];
  loading: boolean;
  error: string | null;
  onUserSelect: (username: string) => void;
}

const SearchGithubUsers: React.FC<SearchGithubUsersProps> = ({
  searchQuery,
  setSearchQuery,
  users,
  loading,
  error,
  onUserSelect
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border-[1px] border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-800 text-gray-400 bg-slate-600/40"
        />
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="overflow-y-auto flex-grow">
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="loader"></div>
            <span className="ml-2">Searching...</span>
          </div>
        ) : (
          <>
            {users.length > 0 ? (
              <div className="space-y-2 max-h-[20rem] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
                {users.map((user) => (
                  <div 
                    key={user.id}
                    onClick={() => onUserSelect(user.login)}
                    className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <img 
                      src={user.avatar_url} 
                      alt={`${user.login}'s avatar`}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <h3 className="font-medium">{user.login}</h3>
                      <a 
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Profile
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              searchQuery && (
                <div className="text-center py-6 text-gray-500">
                  No users found matching "{searchQuery}"
                </div>
              )
            )}
          </>
        )}
      </div>

      <style jsx>{`
        .loader {
          border: 3px solid #f3f3f3;
          border-radius: 50%;
          border-top: 3px solid #3498db;
          width: 20px;
          height: 20px;
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

export default SearchGithubUsers;