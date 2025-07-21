import React from "react";
import { ResumeData } from "@/store/resumeSlice";

interface ProfessionalThemeProps {
  data: ResumeData;
  type?: string;
}

const ProfessionalTheme: React.FC<ProfessionalThemeProps> = ({
  data,
  type = "display",
}) => {
  // Helper function to render bullet separator
  const BulletSeparator = () => (
    <span
      className={`${
        type === "download" ? "mx-1" : "mx-2"
      } w-[5px] h-[5px] bg-black rounded-full`}
    ></span>
  );

  // px-14 py-6
  return (
    <div
      className={`max-w-4xl mx-auto bg-white ${
        type === "download" ? "px-2 py-0" : "px-12 py-7"
      } text-sm leading-tight text-black`}
    >
      {/* Header Section */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold uppercase tracking-wide mb-1">
          {data.personalInfo.fullname}
        </h1>
        <div className="w-full h-px bg-black mb-1"></div>
        <div
          className={`flex justify-center items-center flex-wrap ${
            type === "download" ? "text-[13px]" : "text-sm"
          }`}
        >
          <span className="font-medium">{data.personalInfo.phone}</span>
          <BulletSeparator />
          <a
            href={`mailto:${data.personalInfo.email}`}
            className="text-blue-600 hover:underline font-medium"
          >
            {data.personalInfo.email}
          </a>
          <BulletSeparator />
          <a
            href={`https://${data.personalInfo.linkedin}`}
            className="text-blue-600 hover:underline font-medium"
          >
            {data.personalInfo.linkedin}
          </a>
          <BulletSeparator />
          <a
            href={`https://${data.personalInfo.github}`}
            className="text-blue-600 hover:underline font-medium"
          >
            {data.personalInfo.github}
          </a>
        </div>
        <div className="w-full h-px bg-black mb-1"></div>
      </div>

      {/* Education Section */}
      <div className="mb-4">
        <h2 className="text-md font-bold uppercase mb-0">Education</h2>
        <div className="w-full h-px bg-black mb-2"></div>
        <div>
          <div className="leading-tight flex">
            <div className="flex flex-col justify-between items-start">
              <div className="font-bold">{data.education.program}</div>
              <div className="font-medium">{data.education.university}</div>
              <div className="font-medium">{data.education.college}</div>
            </div>
            <div className="flex flex-col justify-between items-end flex-1 ml-6">
              <div className="font-medium text-right">
                {new Date(data.education.graduation) < new Date()
                  ? `Graduated ${data.education.graduation}`
                  : `Graduating ${data.education.graduation}`}
              </div>
              <div className="font-bold text-right">{data.education.grade}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Skills Section */}
      <div className="mb-4">
        <h2 className="text-md font-bold uppercase mb-0">Technical Skills</h2>
        <div className="w-full h-px bg-black mb-2"></div>
        <div className="leading-tight">
          {data.skills.map((skillCategory, index) => (
            <div key={index} className="flex mb-0">
              <span className="font-bold min-w-fit">
                {skillCategory.category}:
              </span>
              <span className="ml-2 font-medium">
                {skillCategory.skills.join(", ")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Section */}
      <div className="mb-4">
        <h2 className="text-md font-bold uppercase mb-0">Experience</h2>
        <div className="w-full h-px bg-black mb-2"></div>
        <div className="space-y-3">
          {data.experience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-1">
                <div className="font-bold">
                  {exp.company}, {exp.location}: {exp.position}
                  {exp.link && (
                    <span>
                      {" "}
                      (
                      <a
                        href={exp.link}
                        className="text-blue-600 hover:underline font-bold"
                      >
                        LINK
                      </a>
                      )
                    </span>
                  )}
                </div>
                <div className="font-medium">{exp.duration}</div>
              </div>
              <ul className="list-disc ml-5 space-y-0">
                {exp.responsibilities.map((resp, respIndex) => (
                  <li key={respIndex} className="font-medium">
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div className="mb-4">
        <h2 className="text-md font-bold uppercase mb-0">Projects</h2>
        <div className="w-full h-px bg-black mb-2"></div>
        <div className="space-y-3">
          {data.projects.map((project, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-0">
                <div className="font-bold">{project.title}</div>
                <div className="font-medium">{project.duration}</div>
              </div>
              <div className="mb-1">
                {project.link && (
                  <a
                    href={project.link}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Link
                  </a>
                )}
                {project.sourceCode && (
                  <>
                    <span className="mx-1">|</span>
                    <a
                      href={project.sourceCode}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Source Code
                    </a>
                  </>
                )}
              </div>
              <ul className="list-disc ml-5 space-y-0">
                {project.highlights.map((highlight, highlightIndex) => (
                  <li key={highlightIndex} className="font-medium">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Accomplishments Section */}
      <div className="mb-4">
        <h2 className="text-md font-bold uppercase mb-0">Accomplishments</h2>
        <div className="w-full h-px bg-black mb-2"></div>
        <div className="space-y-1">
          {data.accomplishments.map((accomplishment, index) => (
            <div key={index}>
              <ul className="list-disc ml-5">
                <li className="font-medium">
                  <span className="font-bold">{accomplishment.title}: </span>
                  {accomplishment.link && (
                    <span>
                      {" "}
                      (
                      <a
                        href={accomplishment.link}
                        className="text-blue-600 hover:underline font-bold"
                      >
                        LINK
                      </a>
                      ){" "}
                    </span>
                  )}
                  {accomplishment.description}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Position of Responsibility Section */}
      <div className="mb-4">
        <h2 className="text-md font-bold uppercase mb-0">
          Position Of Responsibility
        </h2>
        <div className="w-full h-px bg-black mb-2"></div>
        <div className="space-y-3">
          {data.positionsOfResponsibility.map((position, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-0">
                <div className="font-bold">{position.title}</div>
                <div className="font-medium">{position.duration}</div>
              </div>
              <ul className="list-disc ml-5">
                <li className="font-medium">{position.description}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTheme;