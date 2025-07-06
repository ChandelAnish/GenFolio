import axios from "axios";

interface GitHubUser {
  avatar_url: string;
}

export async function getGithubAvatarUrl(
  usernameOrUrl: string
): Promise<string> {
  const username = usernameOrUrl
    .trim()
    .replace(/^https?:\/\/(www\.)?github\.com\//i, "")
    .split("/")[0];

  if (!username) {
    throw new Error("No GitHub username found in the input.");
  }

  try {
    const { data } = await axios.get<GitHubUser>(
      `https://api.github.com/users/${username}`
    );
    return data.avatar_url;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status ?? "unknown";
      throw new Error(
        `GitHub request failed with status ${status} for “${username}”.`
      );
    }

    throw err;
  }
}
