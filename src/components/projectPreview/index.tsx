import React, { useEffect, useState } from "react";
import ProjectPreview from "./projectPreview";
import InviteTalent from "./InviteTalent";
import Application from "./Application";
import Hire from "./Hire";
import { TalentProps } from "../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { campaignAuthAxiosInstance } from "../../api/axios";
import { fetchApplications } from "../../redux/applicantions.slice";
import { fetchHiredTalent } from "../../redux/hire.slice";
// import { fetchHire } from "../../redux/hire.slice";

type ProjectDetailsProps = {
  activeType: "ProjectPreview" | "InviteTalent" | "Application" | "Contract";
};

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
  const [index, setIndex] = useState(0);
  const [talent, setTalent] = useState();
  const Id = selectedProject?._id;

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

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
          setTalentLength(response.data.data.hiredTalent);
        } catch (error) {
          // console.error("Error while fetiching Notifications:", error);
          // Handle error appropriately (e.g., show a user-friendly message)
        }
      }
    };
    fetchHired();
  }, [id, user]);

  const numberOfHired = talentLength?.length || 0;

  const handleClose = () => {
    setPopUp(false);
    setSelectedComponent(1);
  };

  useEffect(() => {
    dispatch(
      fetchApplications({ id: selectedProject?._id, queryParams: null })
    );
    dispatch(fetchHiredTalent({ id: selectedProject?._id }));
  }, [popUp]);

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
          // talent={talent}
          // setTalent={setTalent}
          numberOfHired={numberOfHired}
        />
      )}
    </div>
  );
};
