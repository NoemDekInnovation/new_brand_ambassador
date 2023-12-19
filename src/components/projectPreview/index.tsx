import React, { useEffect, useState } from "react";
import ProjectPreview from "./projectPreview";
import InviteTalent from "./InviteTalent";
import Application from "./Application";
import Hire from "./Hire";
import { TalentProps } from "../../redux/types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { campaignAuthAxiosInstance } from "../../api/axios";

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
  const Id = selectedProject?._id;
  // console.log(`id: ${id}`);
  const user = useSelector((state: RootState) => state.user);

  const [talentLength, setTalentLength] = useState([]);

  useEffect(() => {
    const fetchHired = async () => {
      if (user?.user !== undefined) {
        try {
          const response = await campaignAuthAxiosInstance(
            `/hired-talent/${Id}`,
            {
              headers: {
                Authorization: `Bearer ${user?.user?.authKey || ""}`,
              },
            }
          );
          // console.log(response.data.data);
          setTalentLength(response.data.data.hiredTalent);
        } catch (error) {
          // console.error("Error while fetiching Notifications:", error);
          // Handle error appropriately (e.g., show a user-friendly message)
        }
      }
    };
    fetchHired();
    // setIsLoading(false);
  }, [id, user]);

  const numberOfHired = talentLength?.length || 0;
  // console.log("me", talentLength);

  const handleClose = () => {
    setPopUp(false);
    setSelectedComponent(1);
  };

  return (
    <div>
      {selectedComponent === 1 && (
        <ProjectPreview
          popUp={popUp}
          setPopUp={() => handleClose()}
          select={setSelectedComponent}
          selectedProject={selectedProject}
          numberOfHired={numberOfHired}
        />
      )}
      {selectedComponent === 2 && (
        <InviteTalent
          popUp={popUp}
          setPopUp={() => handleClose()}
          select={setSelectedComponent}
          selectedProject={selectedProject}
          numberOfHired={numberOfHired}
        />
      )}
      {selectedComponent === 3 && (
        <Application
          popUp={popUp}
          setPopUp={() => handleClose()}
          select={setSelectedComponent}
          selectedProject={selectedProject}
          numberOfHired={numberOfHired}

          // setId={setId}
        />
      )}
      {selectedComponent === 4 && (
        <Hire
          popUp={popUp}
          setPopUp={() => handleClose()}
          select={setSelectedComponent}
          selectedProject={selectedProject}
          index={index}
          talent={talent}
          setTalent={setTalent}
          numberOfHired={numberOfHired}
        />
      )}
    </div>
  );
};
