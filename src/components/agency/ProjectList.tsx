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
};

type ProjectListProps = {
  onProjectTypeChange: (type: ProjectType) => void;
  projectCount: Record<ProjectType, number>;
};

const getImageSrc = (projectType: any) => {
  switch (projectType) {
    case "Active":
      return "./../assets/Current Projects.png";
    case "Published":
      return "../../assets/Published Projects.png";
    case "Completed":
      return "../../assets/Completed Projects.png";
    case "Drafts":
      return "./../assets/Draft Projects.png";
    default:
      return ""; 
  }
};

const ProjectType: React.FC<ProjectTypeProps> = ({ name, count, onClick }) => {
  const [isActive, setIsActive] = useState(false);



  return (
    <div className="flex justify-between " onClick={() => onClick(name)}>
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
  const handleProjectTypeClick = (
    type: "Active" | "Published" | "Completed" | "Drafts"
  ) => {
    onProjectTypeChange(type);
  };
  return (
    <>
      <CardContent className="py-3 md:py-6 space-y-3 cursor-pointer">
        <div className="custom-hover">
          <ProjectType
            name="Active" 
            count={projectCount["Active"]}
            onClick={handleProjectTypeClick}
          />
        </div>
        <Separator className="shrink-0 h-[1px] w-full bg-bm__beige" />
        <div className="custom-hover">
          <ProjectType
            name="Published"
            count={projectCount["Published"]}
            onClick={handleProjectTypeClick}
          />
        </div>
        <Separator className="shrink-0 h-[1px] w-full bg-bm__beige" />
        <div className="custom-hover">
          <ProjectType
            name="Completed"
            count={projectCount["Completed"]}
            onClick={handleProjectTypeClick}
          />
        </div>
        <Separator className="shrink-0 h-[1px] w-full bg-bm__beige" />
        <div className="custom-hover">
          <ProjectType
            name="Drafts"
            count={projectCount["Drafts"]}
            onClick={handleProjectTypeClick}
          />
        </div>
      </CardContent>
    </>
  );
};

export default ProjectList;
