import React, { useState } from "react";
import current from "../../assets/Current Projects.png";
import completed from "../../assets/Completed Projects.png";
import published from "../../assets/Published Projects.png";
import draft from "../../assets/Draft Projects.png";
import { CardContent } from "../../ui/card";
import { Separator } from "../../ui/seperator";

type ProjectType = "Active" | "Published" | "Completed" | "Drafts";

type ProjectTypeProps = {
  name: ProjectType;
  count: number;
  onClick: (name: ProjectType) => void;
  isActive: boolean
};

type ProjectListProps = {
  onProjectTypeChange: (type: ProjectType) => void;
  projectCount: Record<ProjectType, number>;
};

const getImageSrc = (projectType: any) => {
  switch (projectType) {
    case "Active":
      return current;   
    case "Published":
      return published;
    case "Completed":
      return completed;
    case "Drafts":
      return draft;
    default:
      return "";
  }
};

const ProjectType: React.FC<ProjectTypeProps> = ({ name, count, onClick, isActive }) => {

  return (
    <div
      className={`flex justify-between  ${
        isActive ? "bg-black/10" : ""
      }`}
      onClick={() => onClick(name)}
    >
      <div className="flex items-center">
        <img src={getImageSrc(name)} alt="" />
        <p className="ml-4">{name}</p>
      </div>
      <div className="text-white bg-bm__ox__red px-2 rounded-sm">{count}</div>
    </div>
  );
};

const ProjectList: React.FC<ProjectListProps> = ({
  onProjectTypeChange,
  projectCount,
}) => {
  const [activeProjectType, setActiveProjectType] =
    useState<ProjectType>("Active");
  const handleProjectTypeClick = (
    type: "Active" | "Published" | "Completed" | "Drafts"
  ) => {
    onProjectTypeChange(type);
        setActiveProjectType(type);

  };
  return (
    <>
      <CardContent className="p-1 flex flex-col justify-center gap-1 border rounded-[6px]">
        <div className="gap-4 p-3 hover:bg-black/10 cursor-pointer">
          <ProjectType
            name="Active"
            count={projectCount["Active"]}
            onClick={handleProjectTypeClick}
            isActive={activeProjectType === "Active"}
          />
        </div>
        <Separator className="shrink-0 h-[1px] w-full bg-bm__beige" />
        <div className="gap-4 p-3 hover:bg-black/10 cursor-pointer">
          <ProjectType
            name="Published"
            count={projectCount["Published"]}
            onClick={handleProjectTypeClick}
            isActive={activeProjectType === "Published"}
          />
        </div>
        <Separator className="shrink-0 h-[1px] w-full bg-bm__beige" />
        <div className="gap-4 p-3 hover:bg-black/10 cursor-pointer">
          <ProjectType
            name="Completed"
            count={projectCount["Completed"]}
            onClick={handleProjectTypeClick}
            isActive={activeProjectType === "Completed"}
          />
        </div>
        <Separator className="shrink-0 h-[1px] w-full bg-bm__beige" />
        <div className="gap-4 p-3 hover:bg-black/10 cursor-pointer">
          <ProjectType
            name="Drafts"
            count={projectCount["Drafts"]}
            onClick={handleProjectTypeClick}
            isActive={activeProjectType === "Drafts"}
          />
        </div>
      </CardContent>
    </>
  );
};

export default ProjectList;
