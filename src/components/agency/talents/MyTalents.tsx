import { TalentGrid, TalentList } from "./talentView";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { fetchAgencyTalents } from "../../../redux/talent.slice";
import { TalentProps } from "../../../redux/types";
import { fetchAgencyTalentss } from "../../../redux/agencyTalent.slice";

const MyTalents = ({
  gridView,
  handleInvite,
  setSelectedProject,
  projects,
  setSelectedTalent,
  handleProfilePopUp,
  handleImagePopUp,
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
  handleImagePopUp: any;
  selectedTalent: any;
  setSelectedTalentID: any;
  selectedProject: any;
  setSuccessModal: any;
  successModal: any;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const { agencyTalents: resTalents } = useSelector(
    (state: RootState) => state.agency
  );
  const { talentQuery, pageQuery } = useSelector(
    (state: RootState) => state.talent
  );

  useEffect(() => {
    dispatch(fetchAgencyTalentss(talentQuery));
  }, [dispatch, talentQuery]);

  useEffect(() => {
    dispatch(fetchAgencyTalentss(pageQuery));
  }, [dispatch, pageQuery]);

  const [projectModal, setProjectModal] = useState(false);

  return (
    <>
      {gridView && (
        <div className="flex w-full justify-center ">
          <div className="flex justify-center md:justify-start space-y-4 md:space-y-0 gap-3  flex-wrap overflow-y-scroll h-[550px] w-full ">
            {/* {talents} */}
            {resTalents?.map((_: TalentProps, idx: number) => {
              return (
                <TalentGrid
                  key={idx}
                  _={_}
                  modal={projectModal}
                  setModal={setProjectModal}
                  handleProfilePopUp={handleProfilePopUp}
                  handleImagePopUp={handleImagePopUp}
                  setSelectedTalentID={setSelectedTalentID}
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
                modal={projectModal}
                setModal={setProjectModal}
                key={idx}
                talent={_}
                index={idx}
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
        // <div className='flex flex-col w-full gap-3'>{listView}</div>
      )}
    </>
  );
};

export default MyTalents;
