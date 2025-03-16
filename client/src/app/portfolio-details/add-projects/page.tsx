import GitHubSearch from "@/components/GitHubSearch";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-transparent dark:bg-transparent text-gray-900 dark:text-gray-100 py-8 flex justify-center">
      <GitHubSearch />
    </div>
  );
}