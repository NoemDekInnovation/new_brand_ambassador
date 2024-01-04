import React, { useState } from "react";
import NewProject from "../agency/createproject/index";
import ProjectsView from "./ProjectView";

export default function ProjectTab() {
  const [showNewProject, setShowNewProject] = useState(false);

  const toggleView = () => {
    setShowNewProject(!showNewProject);
  };

  return (
    <div>
      {showNewProject ? (
        <NewProject cancelProject={toggleView} />
      ) : (
        <ProjectsView newProject={toggleView} />
      )}
    </div>
  );
}
