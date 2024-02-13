import React, { useState } from "react";
import { Card, CardContent } from "../../ui/card";
import { TbMap2 } from "react-icons/tb";
import { ImCancelCircle, ImStatsDots } from "react-icons/im";
import { Separator } from "../../ui/seperator";
import { MdOutlineProductionQuantityLimits, MdPostAdd } from "react-icons/md";
import { BsFillCollectionFill } from "react-icons/bs";
import { Button } from "../../ui/button";
import { DayObject, daysOfWeek } from "../agency/createproject/projectBudget";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Contract from "../agency/contract/Contract";

const ProjectPreview = ({
  popUp,
  setPopUp,
  select,
  selectedProject,
}: {
  select: any;
  popUp: boolean;
  setPopUp: any;
  selectedProject: any;
  numberOfHired: number;
}) => {
  const [activePreview, setActivePreview] = useState("Project Post");
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
  const FormattedPstartDate = startDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const FormattedPendDate = endDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const { talents: resTalents, totalTalent } = useSelector(
    (state: RootState) => state.talent
  );

  const { applications } = useSelector(
    (state: RootState) => state?.applications
  );
  const { hiredTalent } = useSelector((state: RootState) => state?.hire);

  return (
    <div
      className={`fixed z-[1000] bg-black/50  w-[100%] items-center justify-end flex flex-col transition-all duration-1000 inset-0 ${
        popUp
          ? "translate-y-0 opacity-100 h-[100vh] -bottom-5"
          : "translate-y-[1000px] opacity-0"
      }`}
    >
      <Card className="p-4 relative bg-white w-[85vw] h-[95vh]">
        <span className="absolute top-0 right-0 text-sm text-[#6F797A] p-8">
          <ImCancelCircle
            onClick={() => {
              setPopUp(false);
            }}
          />
        </span>
        <div className="flex flex-row items-center p-4">
          <div className="text-[14px] font-medium capitalize">
            {selectedProject?.projectTitle}
          </div>
          <div className="text-[15px] p-0 px-2">|</div>

          <div className="text-[12px] font-medium capitalize">
            {selectedProject?.projectCategory}
          </div>
          <div className="text-[15px] p-0 px-2">|</div>

          <div className="text-[12px] font-medium capitalize">
            {selectedProject?.projectCode}
          </div>
          <div className="text-[15px] p-0 px-2">|</div>

          <div className="text-[12px] font-medium capitalize text-green-500">
            Active
          </div>
        </div>
        <div className="flex items-center gap-4 relative">
          <Card className=" p-1.5 flex flex-col justify-center gap-1  border-bm__beige w-[230px] max-h-[270px] border rounded-[6px]">
            {/* <Separator className="bg-bm__gler" /> */}
            <div
              className="flex items-center gap-4 p-2  hover:bg-black/10 transform hover:scale-105 cursor-pointer"
              onClick={() => {
                setActivePreview("Project Post");
              }}
            >
              <div className="flex items-center gap-4 mr-2">
                <MdPostAdd />
                <p className="text-[14px] font-normal ">Project Post</p>
              </div>
            </div>
            <Separator className="bg-bm__gler/50" />
            <div
              className="flex items-center gap-4 p-2   hover:bg-black/10 transform hover:scale-105 cursor-pointer"
              onClick={() => {
                setActivePreview("Products");
              }}
            >
              <MdOutlineProductionQuantityLimits />

              <p className="text-[14px] font-normal">Products</p>
            </div>
            <Separator className="bg-bm__gler/50" />
            <div
              className="flex items-center gap-4 p-2  hover:bg-black/10 transform hover:scale-105 cursor-pointer"
              onClick={() => {
                setActivePreview("Collaterals");
              }}
            >
              <BsFillCollectionFill />
              <p className="text-[14px] font-normal">Collaterals</p>
            </div>
            <Separator className="bg-bm__gler/50" />
            <div
              className="flex items-center gap-4 p-2  hover:bg-black/10 transform hover:scale-105 cursor-pointer"
              onClick={() => {
                setActivePreview("Outlets");
              }}
            >
              <TbMap2 />
              <p className="text-[14px] font-normal">Outlets</p>
            </div>
            <Separator className="bg-bm__gler/50" />
            <div
              className="flex items-center gap-4 p-2  hover:bg-black/10 transform hover:scale-105 cursor-pointer"
              onClick={() => {
                setActivePreview("Contracts");
              }}
            >
              <ImStatsDots />
              <p className="text-[14px] font-normal">Offers & Contract</p>
            </div>
          </Card>

          {activePreview === "Project Post" && (
            <div className=" flex absolute flex-row justify-between items-start font-medium text-[12px] my-2  w-full max-w-[82%] right-5 -top-2 cursor-pointer">
              <div
                onClick={() => select(1)}
                className="relative text-white flex items-center justify-center w-full h-[55px]"
              >
                <p className="absolute top-[25%]  z-20 text-[16px]">
                  Project Overview
                </p>

                <div className=" bg-black border  border-[#d7d8da]  border-r-black w-full h-[58px]  rounded-l-md"></div>
                <div className="absolute right-[-21px] z-[1000] -rotate-45 bg-black  w-[40px] h-[40px]  border-r border-b border-[#d7d8da]"></div>
                <div className="absolute right-[-28px] z-[500] -rotate-45 bg-white w-[40px] h-[40px] border-r border-b border-[#d7d8da]"></div>
              </div>
              <div
                onClick={() => select(2)}
                className="relative text-black flex items-center justify-center w-full"
              >
                <p className="absolute top-[25%] text-[16px] z-20">
                  Invite Talent
                  <span className="text-[14px] font-bold">
                    ({totalTalent || 0})
                  </span>
                </p>
                <div className=" bg-white w-[8px] h-[55px]"></div>
                <div className=" bg-[#f3f3f3] border border-[#d7d8da] w-full h-[58px]"></div>
                <div className="absolute right-[-21px] z-[1000] -rotate-45 bg-[#f3f3f3] border-r border-b border-[#d7d8da] w-[40px] h-[40px] "></div>
                <div className="absolute right-[-28px] z-[500] -rotate-45 bg-white w-[40px] h-[40px] border-r border-b border-[#d7d8da]"></div>
              </div>
              <div
                onClick={() => select(3)}
                className="relative text-black flex items-center justify-center w-full"
              >
                <p className="absolute top-[25%] text-[16px] z-20">
                  {" "}
                  Applications
                  <span className="text-[14px] font-bold">
                    ({applications?.data?.projectApplications?.length || 0})
                  </span>
                </p>
                <div className=" bg-white w-[8px] h-[55px]"></div>
                <div className=" bg-[#f3f3f3] border border-[#d7d8da] w-full h-[58px]"></div>
                <div className="absolute right-[-21px] z-[1000] -rotate-45 bg-[#f3f3f3] border-r border-b border-[#d7d8da] w-[40px] h-[40px] "></div>
                <div className="absolute right-[-28px] z-[500] -rotate-45 bg-white w-[40px] h-[40px] border-r border-b border-[#d7d8da]"></div>
              </div>
              <div
                onClick={() => select(4)}
                className="relative text-black flex items-center justify-center w-full"
              >
                <p className="absolute top-[25%] z-20 text-[16px]">
                  {" "}
                  Hire
                  <span className="text-[14px] font-bold">
                    ({hiredTalent.length})
                  </span>
                </p>
                <div className=" bg-white w-[8px] h-[55px]"></div>
                <div className=" bg-[#f3f3f3] border border-[#d7d8da]  w-full h-[58px] rounded-r-md"></div>
              </div>
            </div>
          )}
        </div>
        {activePreview === "Project Post" && (
          <Card className=" flex absolute flex-col p-4 md:p-8 bg-white overflow-y-scroll h-[75vh]  w-full max-w-[83%] right-0 top-0 mt-[150px] pl-[50px]">
            <Card className="w-full pt-2 my-3">
              <CardContent>
                <div className="flex justify-between items-center">
                  <h2 className="text-[18px] font-medium capitalize">
                    {selectedProject?.projectTitle}
                  </h2>
                </div>

                <div className="pt-2">
                  <p className="py-2 text-[16px] font-normal capitalize">
                    {selectedProject?.projectCategory || "-"}
                  </p>
                  <p className="py-2 text-[16px] font-normal">
                    {selectedProject?.projectCode || "-"}
                  </p>
                  <Separator className="bg-bm__beige my-3" />
                  <div className="flex flex-col overflow-y-auto h-[10vh]">
                    <p className=" capitalize overflow-hidden break-words">
                      Project Description:
                      {selectedProject?.projectDescription || "-"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full pt-4 my-3">
              <CardContent>
                {selectedProject?.talent.map((talent: any, idx: number) => {
                  return (
                    <div className="capitalize" key={idx}>
                      <h2>{talent?.opportunities}</h2>

                      <div className="pt-4">
                        <p className=" capitalize text-[16px] font-normal">
                          {talent?.qualifications || "-"}
                        </p>
                        <Separator className="bg-bm__beige my-3" />
                      </div>
                      <div className="pt-2">
                        <p>Skills</p>
                        <div className="py-3 flex gap-6 max-w-3xl flex-wrap">
                          {talent?.skills.map((skill: string, idx: number) => {
                            return (
                              <div className="" key={idx}>
                                <Button className="light__btn max-w-fit capitalize">
                                  {skill}
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                        <Separator className="bg-bm__beige my-2" />
                      </div>
                      <div className="pt-2">
                        <p>Budget</p>
                        <div className="flex justify-between items-center">
                          {(talent?.salary && (
                            <div className="pt-2 flex gap-6 max-w-3xl capitalize">
                              {talent?.salary} {talent?.paymentOptions}
                            </div>
                          )) ||
                            "-"}{" "}
                        </div>
                      </div>
                      <Separator className="bg-bm__beige my-4 py-[2px]" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
            <Card className="w-full pt-4 my-3">
              <CardContent>
                <div className="flex justify-between items-center">
                  <h2 className="text-[18px] font-medium capitalize">
                    {formattedStartDate} to {formattedEndDate}
                  </h2>
                </div>

                <Separator className="bg-bm__beige my-4" />
                <div className="py-3">
                  <p>Working Days</p>
                  <div className="pt-2 flex gap-4 max-w-3xl mt-2 mb-4 cursor-pointer flex-wrap">
                    {daysOfWeek.map(({ label, value }: DayObject, index) => (
                      <div
                        key={index}
                        className={` rounded-md p-2 px-3 mb-4 capitalize font-semibold 
                        ${
                          selectedProject?.workingDays.includes(value)
                            ? "bg-[#252525] text-white"
                            : "bg-bm_card_grey"
                        }`}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                  <Separator className="bg-bm__beige my-2" />
                </div>
                <div className="pt-2">
                  <p className="mb-2">Location</p>
                  <div className="py-2 flex gap-6 max-w-3xl flex-wrap">
                    {(selectedProject?.projectLocation !== undefined &&
                      selectedProject.projectLocation.map(
                        (location: any, idx: any) => {
                          return (
                            (
                              <Button
                                key={idx}
                                className="light__btn  max-w-fit capitalize"
                              >
                                {location}
                              </Button>
                            ) || "-"
                          );
                        }
                      )) ||
                      "-"}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full pt-4 my-3">
              <CardContent>
                <div className="flex justify-between items-center">
                  <h2 className="text-[18px] font-medium capitalize">
                    Application Requiremnts
                  </h2>
                </div>
                <Separator className="bg-bm__beige my-3" />
                <div className="flex flex-col overflow-y-auto h-[10vh]">
                  <p className=" capitalize overflow-hidden break-words">
                    Application requirements:{" "}
                    {selectedProject?.projectRequirements || "-"}
                  </p>
                </div>
                <Separator className="bg-bm__beige my-2" />
              </CardContent>
            </Card>
            <Card className="w-full py-4 my-3">
              <CardContent>
                <div className="flex flex-col mb-4 gap-2">
                  <p>Posted On</p>
                  {FormattedPstartDate}
                </div>
                <div className="flex flex-col gap-2">
                  <p>Closed On</p>
                  {FormattedPendDate}
                </div>
              </CardContent>
            </Card>
          </Card>
        )}

        {activePreview === "Contracts" && (
          <div className="absolute w-full max-w-[83%] right-0 top-0 mt-[50px]">
            <Contract selectedProject={selectedProject} />
          </div>
        )}
      </Card>
    </div>
  );
};
// };

export default ProjectPreview;
