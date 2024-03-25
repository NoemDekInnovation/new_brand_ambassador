import React, { useState } from "react";
import NewProject from "./NewProject";
import ProjectsView from "./ProjectsView";

const ProjectScreen = () => {
  const [showNewProject, setShowNewProject] = useState(false);

  const toggleView = () => {
    setShowNewProject(!showNewProject);
  };

  return (
    <div className="h-full">
      {" "}
      {showNewProject ? (
        <NewProject cancelProject={toggleView} />
      ) : (
        <ProjectsView newProject={toggleView} />
      )}
    </div>
  );
};

export default ProjectScreen;
