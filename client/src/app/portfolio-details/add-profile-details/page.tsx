"use client";

import React, { useState, ChangeEvent } from "react";
import { Github, Linkedin, Mail, User, Info } from "lucide-react";
import { CldImage } from "next-cloudinary";
import axios from "axios";

interface ProfileData {
  name: string;
  githubUsername: string;
  linkedinUsername: string;
  email: string;
  designation: string;
  about: string;
  profileImage: string | null;
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

  const handleContinue = async (): Promise<void> => {
    try {
      const {data} = await axios.post(
        "http://localhost:3000/portfolio-details/add-profile-details/api",
        { profileImage: profileData.profileImage, name: profileData.name }
      );
      setProfileData((prev) => ({
        ...prev,
        profileImage: data.profileImageURL,
      }));
      console.log(data.profileImageURL)
      console.log("Profile Data:", profileData);
    } catch (error) {
      console.error("Image upload failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gray-900 p-8">
            <div className="flex flex-col items-center">
              <div className="relative h-40 w-40 mb-6">
                {profileData.profileImage ? (
                  <CldImage
                    src={profileData.profileImage}
                    width={500}
                    height={500}
                    alt="Profile Preview"
                    className="h-full w-full object-cover rounded-full border-4 border-cyan-500"
                  />
                ) : (
                  <div className="h-full w-full rounded-full bg-gray-700 border-4 border-cyan-500 flex items-center justify-center">
                    <User size={64} className="text-gray-400" />
                  </div>
                )}
              </div>

              <label className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300 w-full text-center">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          <div className="md:w-2/3 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Profile Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-cyan-500 block mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-cyan-500 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="text-cyan-500 block mb-1">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={profileData.designation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-cyan-500 focus:outline-none"
                  placeholder="Senior Developer"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-cyan-500 block mb-1">
                    <div className="flex items-center gap-1">
                      <Github size={16} />
                      <span>GitHub Username</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    name="githubUsername"
                    value={profileData.githubUsername}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-cyan-500 focus:outline-none"
                    placeholder="johndoe"
                  />
                </div>

                <div className="flex-1">
                  <label className="text-cyan-500 block mb-1">
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
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-cyan-500 focus:outline-none"
                    placeholder="johndoe"
                  />
                </div>
              </div>

              <div>
                <label className="text-cyan-500 block mb-1">
                  <div className="flex items-center gap-1">
                    <Mail size={16} />
                    <span>Email Address</span>
                  </div>
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-cyan-500 focus:outline-none"
                  placeholder="john.doe@example.com"
                />
              </div>

              <div>
                <label className="text-cyan-500 block mb-1">
                  <div className="flex items-center gap-1">
                    <Info size={16} />
                    <span>About</span>
                  </div>
                </label>
                <textarea
                  name="about"
                  value={profileData.about}
                  onChange={handleInputChange}
                  className="w-full h-32 px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-cyan-500 focus:outline-none resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <button
                onClick={handleContinue}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg transition-colors duration-300 mt-4 font-medium"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
