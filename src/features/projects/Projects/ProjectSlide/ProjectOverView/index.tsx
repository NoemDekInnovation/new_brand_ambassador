import React, { Fragment, useState } from "react";
import { Card, CardContent } from "../../../../../ui/card";
import { Separator } from "../../../../../ui/seperator";
import { AppDispatch, RootState } from "../../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../../ui/button";
import {
  DayObject,
  daysOfWeek,
} from "../../../../../components/agency/createproject/projectBudget";
import { ProjectDeleteModal } from "./ProjectDeleteModal";
import { setSelectedProject } from "../../../../../redux/revmap/projects";

const ProjectOverview = ({
  setProjectPopUp,
}: {
  setProjectPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const { selectedProject } = useSelector(
    (state: RootState) => state.newProjects
  );

  const [modal, setModal] = useState(false);

  const startDate = new Date(selectedProject?.projectDuration?.startDate);
  const endDate = new Date(selectedProject?.projectDuration?.endDate);
  const formattedStartDate = startDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedEndDate = endDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const PstartDate = new Date(selectedProject?.projectPost?.startDate);
  const PendDate = new Date(selectedProject?.projectPost?.endDate);
  const FormattedPstartDate = PstartDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const FormattedPendDate = PendDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleModalPop = () => {
    // dispatch(setSelectedProject(talent));
    setModal(true);
  };

  return (
    <>
      <div className="flex-1 flex gap-3 md:gap-6 flex-col">
        <Card className="w-full flex justify-end rounded-none bg-[#F7F7F7] p-2 py-3">
          <div className="flex gap-3 w-full md:w-fit">
            <button className="dark___btn hidden md:block whitespace-nowrap">
              Edit Project
            </button>
            <button className="dark___btn block md:hidden mr-auto">Edit</button>
            <button className="ox__btn" onClick={handleModalPop}>
              Delete Project
            </button>
          </div>
        </Card>
        <div className=" overflow-y-scroll h-[70vh] pr-2 flex flex-col gap-4">
          <Card className="p-3 text-[12px] flex flex-col gap-4 font-normal text-bm__grey__text__100">
            <h2 className="text-[18px] font-medium text-black capitalize">
              {selectedProject?.projectTitle}
            </h2>
            <div className="text-[12px] font-medium capitalize">
              {selectedProject?.projectCategory}
            </div>
            <div className="text-[12px] font-medium capitalize">
              {selectedProject?.projectCode}
            </div>
            <Separator />
            <p className=" capitalize overflow-hidden break-words text-[12p]">
              Project Description:
              {selectedProject?.projectDescription || "-"}
            </p>
          </Card>
          <Card className="p-3 text-[12px] flex flex-col gap-4 font-normal text-bm__grey__text__100">
            {selectedProject?.talent.map((talent: any, idx: number) => {
              return (
                <Fragment key={idx}>
                  {" "}
                  <h3 className="capitalize text-[15px] font-medium">
                    {talent?.opportunities}
                  </h3>{" "}
                  <p className=" capitalize text-[12px] font-normal">
                    {talent?.qualifications || "-"}
                  </p>
                  <Separator />
                  <h4>Skills</h4>
                  <div className="flex gap-3 flex-wrap">
                    {talent?.skills.map((skill: string, idx: number) => {
                      return (
                        <div
                          key={idx}
                          className="capitalize border border-bm__beige rounded-md bg-bm_card_grey px-2 py-1"
                        >
                          {skill}
                        </div>
                      );
                    })}
                  </div>
                  <Separator />
                  <p>Budget</p>
                  <p className="text-[15px] capitalize">
                    N{talent?.salary}
                    <span className="mx-1"></span>
                    {talent?.paymentOptions}
                  </p>
                </Fragment>
              );
            })}
          </Card>
          <Card className="w-full pt-4 my-3">
            <CardContent>
              <div className="flex justify-between items-center">
                <h2 className="text-[15px] font-medium capitalize">
                  {formattedStartDate} to {formattedEndDate}
                </h2>
              </div>

              <Separator className="bg-bm__beige my-4" />
              <div className="py-3">
                <p className="text-[12px]">Working Days</p>
                <div className="pt-2 flex gap-4 max-w-3xl mt-2 mb-4 cursor-pointer flex-wrap">
                  {daysOfWeek.map(
                    ({ label, value }: DayObject, index: number) => (
                      <div
                        key={index}
                        className={` rounded-md p-2 px-3 mb-4 flex items-center justify-center h-10 w-10 capitalize font-semibold 
                        ${
                          selectedProject?.workingDays.includes(value)
                            ? "bg-[#252525] text-white"
                            : "bg-bm_card_grey"
                        }`}
                      >
                        {label}
                      </div>
                    )
                  )}
                </div>
                <Separator className="bg-bm__beige my-2 " />
              </div>
              <div className="pt-2">
                <p className="mb-2 text-[12px]">Location</p>
                <div className="py-2 flex gap-6 max-w-3xl flex-wrap">
                  {/* {(selectedProject?.projectLocation !== undefined &&
                    selectedProject.projectLocation.map(
                      (location: any, idx: any) => {
                        return (
                          (
                            <div
                              key={idx}
                              className="capitalize border border-bm__beige rounded-md bg-bm_card_grey px-2 py-1 text-[12px]"
                            >
                              {location}
                            </div>
                          ) || "-"
                        );
                      }
                    )) ||
                    "-"} */}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full pt-4 my-3">
            <CardContent>
              <div className="flex justify-between items-center">
                <h2 className="text-[15px] font-medium capitalize">
                  Application Requirements
                </h2>
              </div>
              <Separator className="bg-bm__beige my-3" />
              <div className="flex flex-col overflow-y-auto h-[10vh]">
                <p className=" capitalize overflow-hidden break-words text-[12px]">
                  Application requirements:{" "}
                  {selectedProject?.projectRequirements || "-"}
                </p>
              </div>
              <Separator className="bg-bm__beige my-2" />
            </CardContent>
          </Card>
          <Card className="w-full py-4 my-3 text-[15px]">
            <CardContent>
              <div className="flex flex-col mb-4 gap-2">
                <p className=" text-[12px]">Posted On</p>
                {FormattedPstartDate}
              </div>
              <div className="flex flex-col gap-2">
                <p className=" text-[12px]">Closed On</p>
                {FormattedPendDate}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ProjectDeleteModal
        projectModal={modal}
        setModal={setModal}
        setProjectModal={setProjectPopUp}
        project={1}
      />
    </>
  );
};

export default React.memo(ProjectOverview);
