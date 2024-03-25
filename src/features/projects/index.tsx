import React, { useState } from "react";
import { AgencyLayout } from "../../components/Layout";
import ProjectTab from "../../components/agency/ProjectTab";
import ProjectScreen from "./Projects";

const Projects = () => {
  const [toggleMenubar, setToggleMenubar] = useState(false);

  return (
    <AgencyLayout
      setToggleMenubar={() => setToggleMenubar(!toggleMenubar)}
      toggleMenubar={toggleMenubar}
    >
      <ProjectScreen />
    </AgencyLayout>
  );
};

export default Projects;
