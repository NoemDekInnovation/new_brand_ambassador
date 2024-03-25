import React from "react";
import { ProjectTabs } from "../ProjectTabs";
import TopProjectCard from "../TopProjectCard";

const ProjectsView = ({ newProject }: { newProject: () => void }) => {
  return (
    <div className="bg-white  h-full">
      <div className=" h-full px-4 md:px-12 xl:px-40 flex py-10 md:space-x-8 flex-col items-center space-y-8 md:flex-row md:space-y-0 md:items-start">
        <div className="h-full space-y-8 flex-1 flex flex-col items-center sm:block">
          <h1>Projects</h1>
          <ProjectTabs />
          <div className="sm:hidden w-full">
            <TopProjectCard card_width="w-full" />
          </div>
        </div>
        <div className="space-y-8 hidden sm:block">
          <div className="">
            <TopProjectCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsView;
