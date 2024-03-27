import React, { useState } from "react";
// import NewProject from "./NewProject";
import ProjectsView from "./ProjectsView";
import NewProject from "../../../components/agency/createproject";

const ProjectScreen = () => {
  const [showNewProject, setShowNewProject] = useState(false);

  const toggleView = () => {
    setShowNewProject(!showNewProject);
  };

  return (
    <div className="h-full">
      <ProjectsView newProject={toggleView} />
    </div>
  );
};

export default ProjectScreen;
