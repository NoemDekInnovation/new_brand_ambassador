import { TalentGrid, TalentGrids, TalentList } from "./talentView";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { TalentProps } from "../../../redux/types";
import { fetchEngageTalents } from "../../../redux/engagetalent.slice";
import { fetchCurrentEngageTalents } from "../../../redux/currentengage.slice";

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
  const { engageTalents } = useSelector(
    (state: RootState) => state.currentengage
  );
  const { talentQuery } = useSelector((state: RootState) => state.talent);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // console.log("Dispatching fetchEngageTalents");
    // dispatch(fetchEngageTalents(false));
    // dispatch(fetchEngageTalents({ status: false }));
    dispatch(
      fetchCurrentEngageTalents({
        queryParams: talentQuery,
        status: false,
      })
    );
  }, [dispatch]);

  const [projectModal, setProjectModal] = useState(false);
  console.log(engageTalents);

  return (
    <>
      {gridView && (
        <div className="flex w-full justify-center ">
          <div className="flex justify-center md:justify-start space-y-4 md:space-y-0 gap-3  flex-wrap overflow-y-scroll h-[550px] w-full ">
            {/* {talents} */}
            {engageTalents?.map((_: any, idx: number) => {
              return (
                <TalentGrid
                  key={idx}
                  _={_?.talent}
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
          {engageTalents?.map((_: any, idx: number) => {
            return (
              <TalentList
                talent={_?.talent}
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
