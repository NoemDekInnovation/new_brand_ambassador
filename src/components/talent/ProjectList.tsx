import React, { useState } from "react";
import current from "../../assets/Current Projects.png";
import completed from "../../assets/Completed Projects.png";
import published from "../../assets/Published Projects.png";
import draft from "../../assets/Draft Projects.png";
import { CardContent } from "../../ui/card";
import { Separator } from "../../ui/seperator";
type ProjectType =
  | "Available Projects"
  | "Current Project"
  | "Invitations"
  | "My Applications"
  | "Saved Projects"
  | "Completed Projects";

type ProjectTypeProps = {
  name: ProjectType;
  count?: number;
  onClick: (name: ProjectType) => void;
  isActive: boolean;
};

type ProjectListProps = {
  onProjectTypeChange: (type: ProjectType) => void;
  projectCount: Record<ProjectType, number>;
};

const getImageSrc = (projectType: any) => {
  switch (projectType) {
    case "Available Projects":
      return current;
    case "Invitations":
      return published;
    // case "Completed":
    //   return completed;
    // case "Drafts":
    //   return draft;
    default:
      return "";
  }
};

enum projectColors {
  green = "bg-bm__niv",
  black = "bg-black",
  orange = "bg-bm_card__orange",
  grey = "bg-[#93979D]",
  red = "bg-[#800000]",
}

const getProjectColor = (type: ProjectType): string => {
  switch (type) {
    case "Current Project":
      return projectColors.red;
    case "Invitations":
      return projectColors.green;
    default:
      return "";
  }
};

const ProjectType: React.FC<ProjectTypeProps> = ({
  name,
  count,
  onClick,
  isActive,
}) => {
  const backgroundColor = getProjectColor(name);
  return (
    <div
      className={`flex justify-between p-4 ${isActive ? "bg-black/10" : ""}`}
      onClick={() => onClick(name)}
    >
      <div className="flex items-center">
        <p className="ml-4">{name}</p>
      </div>
      {/* <div className="text-white bg-bm__ox__red px-2 rounded-sm">{count}</div> */}
      {/* <div className={`text-white ${projectColors[name]} px-2 rounded-sm`}> */}
      <div className={`text-white ${backgroundColor} px-2 rounded-sm`}>
        {count}
      </div>
    </div>
  );
};
const ProjectList: React.FC<ProjectListProps> = ({
  onProjectTypeChange,
  projectCount,
}) => {
  const [activeProjectType, setActiveProjectType] =
    useState<ProjectType>("Available Projects");
  const handleProjectTypeClick = (
    type:
      | "Available Projects"
      | "Current Project"
      | "Invitations"
      | "My Applications"
      | "Saved Projects"
      | "Completed Projects"
  ) => {
    onProjectTypeChange(type);
    setActiveProjectType(type);
  };
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <CardContent className="p-1 flex flex-col justify-center gap-1 border rounded-[6px]">
        <div className="gap-4 hover:bg-black/10 cursor-pointer">
          <ProjectType
            name="Available Projects"
            // count={projectCount["Available Projects"]}
            onClick={handleProjectTypeClick}
            isActive={activeProjectType === "Available Projects"}
          />
        </div>
        <Separator className="shrink-0 h-[1px] w-full bg-bm__beige" />
        <div className="gap-4 hover:bg-black/10 cursor-pointer">
          <ProjectType
            name="Current Project"
            count={projectCount["Current Project"]}
            onClick={handleProjectTypeClick}
            isActive={activeProjectType === "Current Project"}
          />
        </div>
        <Separator className="shrink-0 h-[1px] w-full bg-bm__beige" />
        <div className="gap-4 hover:bg-black/10 cursor-pointer">
          <ProjectType
            name="Invitations"
            count={projectCount["Invitations"]}
            onClick={handleProjectTypeClick}
            isActive={activeProjectType === "Invitations"}
          />
        </div>
        <Separator className="shrink-0 h-[1px] w-full bg-bm__beige" />
        <div className="gap-4 hover:bg-black/10 cursor-pointer">
          <ProjectType
            name="My Applications"
            // count={projectCount["My Applications"]}
            onClick={handleProjectTypeClick}
            isActive={activeProjectType === "My Applications"}
          />
        </div>
        <Separator className="shrink-0 h-[1px] w-full bg-bm__beige" />
        <div className="gap-4 hover:bg-black/10 cursor-pointer">
          <ProjectType
            name="Saved Projects"
            // count={projectCount["Saved Projects"]}
            onClick={handleProjectTypeClick}
            isActive={activeProjectType === "Saved Projects"}
          />
        </div>{" "}
        <Separator className="shrink-0 h-[1px] w-full bg-bm__beige" />
        <div className="gap-4 hover:bg-black/10 cursor-pointer">
          <ProjectType
            name="Completed Projects"
            // count={projectCount["Completed Projects"]}
            onClick={handleProjectTypeClick}
            isActive={activeProjectType === "Completed Projects"}
          />
        </div>
      </CardContent>
    </>
  );
};

export default ProjectList;
