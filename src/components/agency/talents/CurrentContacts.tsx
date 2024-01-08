import { TalentGrid, TalentGrids, TalentList } from "./talentView";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { TalentProps } from "../../../redux/types";
import { useEffect, useState } from "react";
import { fetchEngageTalents } from "../../../redux/engagetalent.slice";

const CurrentContacts = ({
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
  const dispatch = useDispatch<AppDispatch>();

  const { talents: resTalents } = useSelector(
    (state: RootState) => state.engagedtalent
  );

  const { talentQuery } = useSelector((state: RootState) => state.talent);

  const [projectModal, setProjectModal] = useState(false);

  useEffect(() => {
    // console.log("Dispatching fetchEngageTalents");
    // dispatch(fetchEngageTalents(true))
    dispatch(fetchEngageTalents({ queryParams: talentQuery, status: true }));
  }, [dispatch]);

  return (
    <>
      {gridView && (
        <div className="flex w-full justify-center ">
          <div className="flex justify-center md:justify-start space-y-4 md:space-y-0 gap-3  flex-wrap overflow-y-scroll h-[550px] w-full ">
            {/* {talents} */}
            {resTalents?.map((_: TalentProps, idx: number) => {
              return (
                <TalentGrids
                  key={idx}
                  modal={projectModal}
                  setModal={() => setProjectModal}
                  _={_}
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
          {resTalents?.map((_: TalentProps, idx: number) => {
            return (
              <TalentList
                key={idx}
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

export default CurrentContacts;
