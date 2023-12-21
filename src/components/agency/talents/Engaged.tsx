import { TalentGrid, TalentList } from "./talentView";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { TalentProps } from "../../../redux/types";
import { fetchEngageTalents } from "../../../redux/engagetalent.slice";

const Engaged = ({
  gridView,
  handleInvite,
  setSelectedProject,
  projects,
  setSelectedTalent,
  handleProfilePopUp,
  selectedTalent,
  setSelectedTalentID,
  selectedProject,
  setSuccessModal,
  successModal,
}: {
  gridView: boolean;
  handleInvite: any;
  setSelectedProject: any;
  projects: any;
  setSelectedTalent: any;
  handleProfilePopUp: any;
  selectedTalent: any;
  setSelectedTalentID: any;
  selectedProject: any;
  setSuccessModal: any;
  successModal: any;
}) => {
  // const { talents: resTalents } = useSelector(
  //   (state: RootState) => state.engagedtalent
  // );

  const { talentEngaged } = useSelector(
    (state: RootState) => state.engagedtalent
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchEngageTalents(false));
  }, [dispatch]);

  const [projectModal, setProjectModal] = useState(false);

  return (
    <>
      {gridView && (
        <div className="flex w-full justify-center ">
          <div className="flex justify-center md:justify-start space-y-4 md:space-y-0 gap-3  flex-wrap overflow-y-scroll h-[550px] w-full ">
            {/* {talents} */}
            {talentEngaged?.map((_: TalentProps, idx: number) => {
              return (
                <TalentGrid
                  key={idx}
                  _={_}
                  modal={projectModal}
                  setModal={() => setProjectModal}
                  idx={idx}
                  handleInvite={handleInvite}
                  setSelectedProject={setSelectedProject}
                  projects={projects}
                  setSelectedTalent={setSelectedTalent}
                  handleProfilePopUp={handleProfilePopUp}
                  selectedTalent={selectedTalent}
                  setSelectedTalentID={setSelectedTalentID}
                  selectedProject={selectedProject}
                  setSuccessModal={setSuccessModal}
                  successModal={successModal}
                />
              );
            })}
          </div>
        </div>
      )}
      {!gridView && (
        <div className="flex flex-col w-full gap-3">
          {talentEngaged?.map((_: TalentProps, idx: number) => {
            return (
              <TalentList
                talent={_}
                index={idx}
                handleInvite={""}
                setSelectedProject={""}
                projects={""}
                setSelectedTalent={""}
                handleProfilePopUp={() => {}}
                selectedTalent={""}
                setSelectedTalentID={""}
                selectedProject={""}
                setSuccessModal={""}
                successModal={true}
              />
            );
          })}
        </div>
        // <div className='flex flex-col w-full gap-3'>{listView}</div>
      )}
    </>
  );
};

export default Engaged;
