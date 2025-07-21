"use client";

import ProfessionalTheme from "@/components/resume-themes/ProfessionalTheme";
import React, { useRef, useState } from "react";
import { savePDF } from "@progress/kendo-react-pdf";
import ThemeSelector from "@/components/ThemeSelector";
import PromptButton from "@/components/PromptButton";
import { MdOutlineFileDownload, MdFileDownloadDone } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  Inter,
  Roboto,
  Lato,
  Open_Sans,
  Montserrat,
  Playfair_Display,
  Crimson_Text,
  Merriweather,
  PT_Serif,
} from "next/font/google";
import { useParams } from "next/navigation";

// Initialize Google Fonts
const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});
const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });
const crimsonText = Crimson_Text({
  weight: ["400", "600"],
  subsets: ["latin"],
});
const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});
const ptSerif = PT_Serif({ weight: ["400", "700"], subsets: ["latin"] });

// Font mapping object
const fontMap = {
  default: inter,
  roboto: roboto,
  lato: lato,
  openSans: openSans,
  montserrat: montserrat,
  playfair: playfair,
  crimsonText: crimsonText,
  merriweather: merriweather,
  ptSerif: ptSerif,
};

export default function Page() {
  const params = useParams();

  const resumeRef = useRef<HTMLDivElement>(null);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  const resumeData = useSelector((state: RootState) => state.resume.data);
  const selectedTheme = useSelector(
    (state: RootState) => state.resume.selectedTheme
  );
  console.log(selectedTheme);
  const fontStyle = useSelector((state: RootState) => state.resume.fontStyle);

  const currentFont = fontMap[fontStyle as keyof typeof fontMap] || inter;

  // ensuring username string
  const username = Array.isArray(params.username)
    ? params.username[0]
    : params.username || "";

  const downloadPDF = () => {
    if (resumeRef.current) {
      savePDF(resumeRef.current, {
        paperSize: "A4",
        scale: 0.75,
        fileName: `${resumeData.personalInfo.fullname.replace(
          /\s+/g,
          "_"
        )}_Resume.pdf`,
        margin: {
          top: "1cm",
          left: "1cm",
          right: "1cm",
          bottom: "1cm",
        },
      });
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Download Button */}
        <div className="fixed bottom-8 right-8 flex flex-col items-center justify-center gap-3">
          <PromptButton
            handlePromptSubmit={() => {}}
            placeholder="Ask me Edit anything..."
            buttonText="Edit with AI"
          />
          <ThemeSelector username={username} variant="resume" />
          <button
            id="download-button"
            onClick={downloadPDF}
            className={`${downloaded ? "bg-green-400/80" : "bg-gray-800"} ${
              downloaded ? "bg-green-400/80" : "hover:bg-gray-700"
            } text-white p-3 rounded-full shadow-lg z-50 transition-all duration-300`}
            aria-label="Download PDF"
          >
            {downloaded ? (
              <MdFileDownloadDone
                size={24}
                className="transition-transform duration-300"
              />
            ) : (
              <MdOutlineFileDownload
                size={24}
                className="transition-transform duration-300"
              />
            )}
          </button>
        </div>
        {(selectedTheme === "default") ? <div>
          {/* Visible Resume (Display Mode) */}
          <div
            className={`bg-white shadow-lg rounded-lg overflow-hidden ${currentFont.className}`}
          >
            <ProfessionalTheme data={resumeData} type="display" />
          </div>

          {/* Hidden Resume (Download Mode) */}
          <div
            className={`absolute -left-[9999px] top-0 ${currentFont.className}`}
          >
            <div ref={resumeRef}>
              <ProfessionalTheme data={resumeData} type="download" />
            </div>
          </div>
        </div>
        : ""
      }
      </div>
    </div>
  );
}
