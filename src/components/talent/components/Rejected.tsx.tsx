import React, { useEffect, useState } from "react";
import drago from "../../../assets/drago.jpg";

import { CardContent, CardFooter } from "../../../ui/card";

import Moment from "react-moment";

import { CiHeart } from "react-icons/ci";
import { GoChecklist } from "react-icons/go";
import ProjectPreview from "./projectPreview";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchTalentInvitations } from "../../../redux/talentInvitations.slice";

const RejectedInvitations = () => {
  const [selectedProject, setSelectedProject] = useState();
  const [popUp, setPopUp] = useState(false);

  const handleProfilePopUp = (project: any) => {
    setSelectedProject(project);
    setPopUp(!popUp);
    // setSelectedRole(talent);
  };
  console.log(popUp);

  const { talentInvitations } = useSelector(
    (state: RootState) => state.talentInvite
  );
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState();
  const [apply, setApply] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    setIsLoading(true);

    dispatch(fetchTalentInvitations());
  }, []);

  return (
    <>
      <div>
        {talentInvitations?.invitations?.map((project: any, idx: number) => {
          return (
            project.status === "rejected" && (
              <div
                key={idx}
                className="border rounded mb-4 p-3 hover:bg-black/10 transition-all duration-300 cursor-pointer"
              >
                <div className="flex w-full">
                  <CardContent className="p-0 space-y-1 flex-1">
                    <div className="flex space-x-2">
                      <img src={drago} alt="" width={18} height={18} />
                      <p className="border-r px-2 text-[12px]">Cool Ltd.</p>
                      {/* <p className="text-bm__ox__red text-[10px] flex items-center gap-1">
                    {" "}
                    <GoChecklist className="text-[13px]" />
                    Unverified
                  </p> */}
                      <p className="text-green-900 text-[10px] flex items-center gap-1">
                        {" "}
                        <GoChecklist className="text-[13px]" />
                        Verified
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <h3
                        className="font-medium text-[15px] "
                        onClick={() => handleProfilePopUp(project)}
                      >
                        {project?.project?.projectTitle}

                        <span className="text-[10px] mx-1">(In-store)</span>
                      </h3>
                      <CiHeart />
                    </div>
                    <p className="font-normal text-[10px] text-[#252525]">
                      {project?.project?.projectDescription}
                    </p>
                  </CardContent>
                  <div className="flex text-[10px]">
                    <p className="border-r h-fit border-bm__beige pr-3 mr-3">
                      Published: {"  "}
                      <Moment format="MMM D, yyy ">
                        {project?.project?.projectPost?.startDate}
                      </Moment>
                    </p>
                    <p className=" h-fit text-bm__ox__red">
                      Closes:{" "}
                      <Moment format="MMM D, yyy ">
                        {project?.project?.projectPost?.endDate}
                      </Moment>
                    </p>
                  </div>
                </div>
                <CardFooter className="mt-3 p-0 md:gap-6 flex-col sm:flex-row  sm:items-end">
                  <div className="flex md:space-x-2 text-bm__grey__text text-[10px] h-full flex-wrap  ">
                    {project?.project?.workingDays.map(
                      (_: any, idx: number) => {
                        return (
                          <div key={idx} className="capitalize">
                            {_},
                          </div>
                        );
                      }
                    )}
                    <div className="text-[11px] p-0  pb-1 px-1">.</div>
                    <div className="">
                      <Moment format="D MMM ">
                        {project?.project?.projectDuration?.startDate}
                      </Moment>
                      {"  "}-{"   "}
                      <Moment format="D MMM ">
                        {project?.project?.projectDuration?.endDate}
                      </Moment>
                    </div>
                    <div className="text-[11px] p-0  pb-1 px-1">.</div>
                    {project?.project?.projectLocation.map(
                      (_: any, idx: number) => {
                        return (
                          <div key={idx} className="capitalize">
                            {_},
                          </div>
                        );
                      }
                    )}{" "}
                  </div>
                </CardFooter>
              </div>
            )
          );
        })}
      </div>
      <ProjectPreview
        popUp={popUp}
        apply={apply}
        setApply={() => setApply(true)}
        close={() => setApply(false)}
        setPopUp={() => setPopUp(!popUp)}
        selectedProject={selectedProject}
      />
    </>
  );
};

export default RejectedInvitations;
