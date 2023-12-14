import React, { useState } from "react";
// import ProjectPreview from "./projectPreview";
// import InviteTalent from "./InviteTalent";
// import Application from "./Application";
// import Contract from "./Contract";
import ProfileTab from "./profileTab";
import ApplicationTab from "./applicationTab";
import MessageTab from "./messageTab";
import ContractTab from "./ContractTab";
// import HireTab from "./contractTab";

export const ProfileView = ({
  popUp,
  setPopUp,
  selectedProject,
}: {
  popUp: boolean;
  setPopUp: any;
  selectedProject: any;
}) => {
  const [selectedComponent, setSelectedComponent] = useState(1);

  return (
    <div>
      {selectedComponent === 1 && (
        <ProfileTab
          popUp={popUp}
          setPopUp={() => setPopUp(!popUp)}
          select={setSelectedComponent}
          setSelectedComponent={setSelectedComponent}
        />
      )}
      {selectedComponent === 2 && (
        <ApplicationTab
          popUp={popUp}
          setPopUp={() => setPopUp(!popUp)}
          select={setSelectedComponent}
          setSelectedComponent={setSelectedComponent}
        />
      )}
      {selectedComponent === 3 && (
        <MessageTab
          popUp={popUp}
          setPopUp={() => setPopUp(!popUp)}
          select={setSelectedComponent}
          setSelectedComponent={setSelectedComponent}
        />
      )}
      {selectedComponent === 4 && (
        <ContractTab
          popUp={popUp}
          setPopUp={() => setPopUp(!popUp)}
          select={setSelectedComponent}
          setSelectedComponent={setSelectedComponent}
        />
      )}
    </div>
  );
};
