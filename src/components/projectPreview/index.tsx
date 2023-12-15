import React, { useState } from "react";
import ProjectPreview from "./projectPreview";
import InviteTalent from "./InviteTalent";
import Application from "./Application";
import Hire from "./Hire";
import { TalentProps } from "../../redux/types";

type ProjectDetailsProps = {
  activeType: "ProjectPreview" | "InviteTalent" | "Application" | "Contract";
};

export const ProjectViewCard = ({
  popUp,
  setPopUp,
  selectedProject,
  id,
  setId,
}: // talent,
// index,
// activeType,
{
  popUp: boolean;
  setPopUp: any;
  selectedProject: any;
  id: any;
  setId: any;
  // talent: any;
  // index: number;
  // activeType: any;
}) => {
  const [selectedComponent, setSelectedComponent] = useState(1);
  const [index, setIndex] = useState(0);
  const [talent, setTalent] = useState();

  // let projects;
  // switch (activeType) {
  //   case "ProjectPreview":
  //     projects = (
  //       <ProjectPreview
  //         selectedProject={selectedProject}
  //         id={id}
  //         setId={setId}
  //       />
  //     );
  //     break;
  //   case "InviteTalent":
  //     projects = (
  //       <InviteTalent selectedProject={selectedProject} id={id} setId={setId} />
  //     );
  //     break;
  //   case "Application":
  //     projects = (
  //       <Application selectedProject={selectedProject} id={id} setId={setId} />
  //     );
  //     break;
  //   case "Contract":
  //     projects = (
  //       <Contract selectedProject={selectedProject} id={id} setId={setId} />
  //     );
  //     break;
  //   default:
  //     projects = null;
  // }

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
        <Hire
          popUp={popUp}
          setPopUp={() => setPopUp(!popUp)}
          select={setSelectedComponent}
          selectedProject={selectedProject}
          index={index}
          talent={talent}
        />
      )}
    </div>
  );
};
