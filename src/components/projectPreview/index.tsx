import React, { useState } from "react";
import ProjectPreview from "./projectPreview";
import InviteTalent from "./InviteTalent";
import Application from "./Application";
import Contract from "./Contract";

export const ProjectViewCard = ({
  popUp,
  setPopUp,
  selectedProject,
  id,
  setId,
}: {
  popUp: boolean;
  setPopUp: any;
  selectedProject: any;
  id: any;
  setId: any;
}) => {
  const [selectedComponent, setSelectedComponent] = useState(1);

  return (
    <div>
      {selectedComponent === 1 && (
        <ProjectPreview
          popUp={popUp}
          setPopUp={() => setPopUp(!popUp)}
          select={setSelectedComponent}
          selectedProject={selectedProject}
        />
      )}
      {selectedComponent === 2 && (
        <InviteTalent
          popUp={popUp}
          setPopUp={() => setPopUp(!popUp)}
          select={setSelectedComponent}
          selectedProject={selectedProject}
        />
      )}
      {selectedComponent === 3 && (
        <Application
          popUp={popUp}
          setPopUp={() => setPopUp(!popUp)}
          select={setSelectedComponent}
          selectedProject={selectedProject}
          // setId={setId}
        />
      )}
      {selectedComponent === 4 && (
        <Contract
          popUp={popUp}
          setPopUp={() => setPopUp(!popUp)}
          select={setSelectedComponent}
          selectedProject={selectedProject}
        />
      )}
    </div>
  );
};
