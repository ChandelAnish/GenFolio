"use client";

import React, { useState, ChangeEvent, useEffect, FormEvent } from "react";
import {
  Github,
  Linkedin,
  Mail,
  User,
  Info,
  Check,
  X,
  Loader2,
} from "lucide-react";
import axios from "axios";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { ProfileData } from "@/types";
import { useAppDispatch } from "@/hooks/customHooks";
import {
  fillInitialProfileDetails,
  fillprofileDetails,
} from "@/store/portfolioDetailsSlice";
import { useUser } from "@clerk/nextjs";

interface GitHubValidationStatus {
  status: "checking" | "valid" | "invalid" | "idle";
  avatarUrl: string | null;
}

const ProfileComponent: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    githubUsername: "",
    linkedinUsername: "",
    email: "",
    designation: "",
    about: "",
    profileImage: null,
  });

  const router = useRouter();
  const dispatch = useAppDispatch();

  const [githubValidation, setGithubValidation] =
    useState<GitHubValidationStatus>({
      status: "idle",
      avatarUrl: null,
    });

  const debouncedGithubUsername = useDebounce(profileData.githubUsername, 500);
  const {user} = useUser()
  
  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setProfileData((prev) => ({
        ...prev,
        email: user?.primaryEmailAddress?.emailAddress || "", 
      }));
    }
  }, [user]);

  useEffect(() => {
    // load profile data details from session storage
    const sessionProfileData = JSON.parse(
      sessionStorage.getItem("portfolioDetails") ?? "{}"
    );
    if (Object.keys(sessionProfileData).length != 0) {
      // console.log(sessionProfileData)
      dispatch(fillInitialProfileDetails(sessionProfileData));
      setProfileData(sessionProfileData.profileData)
    }
  }, []);

  // Check GitHub username validity
  useEffect(() => {
    const validateGithubUsername = async () => {
      if (debouncedGithubUsername.trim() === "") {
        setGithubValidation({ status: "idle", avatarUrl: null });
        return;
      }

      setGithubValidation((prev) => ({ ...prev, status: "checking" }));

      try {
        const response = await axios.get(
          `https://api.github.com/users/${debouncedGithubUsername}`
        );
        setGithubValidation({
          status: "valid",
          avatarUrl: response.data.avatar_url,
        });

        // If no profile image is set yet, use GitHub avatar
        if (
          !profileData.profileImage ||
          profileData.profileImage.includes("githubusercontent.com")
        ) {
          // console.log(response.data.avatar_url);
          setProfileData((prev) => ({
            ...prev,
            profileImage: response.data.avatar_url,
          }));
        }
      } catch (error) {
        console.log(error)
        setGithubValidation({ status: "invalid", avatarUrl: null });
      }
    };

    if (debouncedGithubUsername) {
      validateGithubUsername();
    }
  }, [debouncedGithubUsername]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result) {
          setProfileData((prev) => ({
            ...prev,
            profileImage: event.target?.result as string,
            /*
            event.target.result:
            - This contains the file data URL, which is a Base64-encoded string representing the image.
            - Example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
            */
          }));
        }
      };
      /*
        - This function runs when the FileReader has finished reading the image file.
        - It receives an event (event) of type ProgressEvent<FileReader>, which contains the file data.
      */

      reader.readAsDataURL(file);
      /* 
        - This starts reading the selected image file.
        - The file is converted into a data URL format (Base64 string).
        - Once the file is completely read, the onload function above is triggered.
      */
    }
  };

  const [loading, setLoading] = useState(false);

  const handleContinue = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      setLoading(true);
      if (profileData.profileImage) {
        const { data } = await axios.post(
          "http://localhost:4000/portfolio-details/add-profile-details/api",
          { profileImage: profileData.profileImage, name: profileData.email }
        );
        setProfileData((prev) => ({
          ...prev,
          profileImage: data.profileImageURL,
        }));
        // console.log(data.profileImageURL);

        dispatch(
          fillprofileDetails({
            ...profileData,
            profileImage: data.profileImageURL,
          })
        );
      }
      // console.log("Profile Data:", profileData);
      setLoading(false);
      router.push("/portfolio-details/add-experience");
    } catch (error) {
      console.error("Image upload failed : ", error);
      setLoading(false);
    }
  };

  const renderGithubStatusIcon = () => {
    switch (githubValidation.status) {
      case "checking":
        return <Loader2 size={20} className="text-cyan-500 animate-spin" />;
      case "valid":
        return (
          <Check
            size={20}
            className="text-green-500 transition-opacity duration-1000 ease-in-out delay-150"
          />
        );
      case "invalid":
        return <X size={20} className="text-red-500 animate-pulse" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent p-4">
      <div className="w-full max-w-4xl bg-gray-800/20 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
        <form onSubmit={(e) => handleContinue(e)}>
          <div className="md:flex">
            <div className="md:w-1/2 p-8 flex flex-col items-center">
              <div className="flex flex-col items-center h-full justify-center">
                <div className="relative h-80 w-80 mb-6">
                  {profileData.profileImage ? (
                    <img
                      src={profileData.profileImage}
                      alt="Profile Preview"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="h-full w-full rounded-full bg-gray-600/25 flex items-center justify-center">
                      <User size={64} className="text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
              <label className="flex items-center justify-center w-full py-3 border-2 border-dashed border-cyan-500/50 rounded-lg text-cyan-400/80 hover:border-cyan-500 hover:text-cyan-300 transition-colors mt-auto">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <div className="md:w-2/3 p-8">
              <div className="flex items-start">
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-cyan-500 bg-clip-text text-transparent mb-6">
                  Profile Information
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-cyan-500 block mb-1 text-sm">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-600/20 text-sm text-white border-[1px] border-gray-700 focus:border-cyan-500/50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-cyan-500 block mb-1 text-sm">
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={profileData.designation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-600/20 text-sm text-white border-[1px] border-gray-700 focus:border-cyan-500/50 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-cyan-500 block mb-1 text-sm">
                      <div className="flex items-center gap-1">
                        <Github size={16} />
                        <span>GitHub Username</span>
                      </div>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="githubUsername"
                        value={profileData.githubUsername}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-gray-600/20 text-sm text-white border-[1px] border-gray-700 focus:border-cyan-500/50 focus:outline-none"
                      />
                      {profileData.githubUsername && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          {renderGithubStatusIcon()}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <label className="text-cyan-500 block mb-1 text-sm">
                      <div className="flex items-center gap-1">
                        <Linkedin size={16} />
                        <span>LinkedIn Username</span>
                      </div>
                    </label>
                    <input
                      type="text"
                      name="linkedinUsername"
                      value={profileData.linkedinUsername}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-gray-600/20 text-sm text-white border-[1px] border-gray-700 focus:border-cyan-500/50 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-cyan-500 block mb-1 text-sm">
                    <div className="flex items-center gap-1">
                      <Mail size={16} />
                      <span>Email Address</span>
                    </div>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    // onChange={handleInputChange}
                    readOnly
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-600/20 text-sm text-gray-500 border-[1px] border-gray-700 focus:border-cyan-500/50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-cyan-500 block mb-1 text-sm">
                    <div className="flex items-center gap-1">
                      <Info size={16} />
                      <span>About</span>
                    </div>
                  </label>
                  <textarea
                    name="about"
                    value={profileData.about}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-600/20 text-sm text-white border-[1px] border-gray-700 focus:border-cyan-500/50 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="text-white bg-cyan-500 hover:bg-cyan-700 focus:ring-2 focus:outline-none focus:ring-cyan-500 font-medium rounded-lg px-5 py-3 text-center me-2 dark:bg-cyan-600/90 dark:hover:bg-cyan-500 dark:focus:ring-cyan-400 inline-flex items-center w-full transition-colors duration-300 mt-4 justify-center"
                >
                  {loading && (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                  Continue
                </button>

                {/* <button
                  type="submit"
                  className="w-full bg-cyan-600/90 hover:bg-cyan-500 text-white py-3 rounded-lg transition-colors duration-300 mt-4 font-medium"
                >
                  Continue
                </button> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileComponent;
