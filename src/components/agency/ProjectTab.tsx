import React, { Dispatch, SetStateAction, useState } from "react";
import NewProject from "../agency/createproject/index";
import ProjectsView from "./ProjectView";

export default function ProjectTab({
  setDefault,
}: {
  setDefault: Dispatch<SetStateAction<string>>;
}) {
  const [showNewProject, setShowNewProject] = useState(false);

  const toggleView = () => {
    setShowNewProject(!showNewProject);
  };

  return (
    <div>
      {showNewProject ? (
        <NewProject cancelProject={toggleView} setDefault={setDefault} />
      ) : (
        <ProjectsView newProject={toggleView} />
      )}
    </div>
  );
}
