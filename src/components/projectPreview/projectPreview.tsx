import React, { ReactNode, useState } from "react";
import { Card, CardContent } from "../../ui/card";
import { Dialog, DialogContent, Overlay } from "@radix-ui/react-dialog";
import { TbMap2, TbProgressCheck } from "react-icons/tb";
import { ImCancelCircle, ImStatsDots } from "react-icons/im";
import { Separator } from "../../ui/seperator";
import {
  MdFamilyRestroom,
  MdOutlineProductionQuantityLimits,
  MdPostAdd,
} from "react-icons/md";
import { BsFillCollectionFill } from "react-icons/bs";
import darkUnion from "../../assets/Union.png";
import subtract from "../../assets/Subtract.png";
import subtract2 from "../../assets/Subtract2.png";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";

import { AiOutlineEdit } from "react-icons/ai";
// import { DayObject, daysOfWeek } from "/createproject/projectBudget";
import {
  AboutProjectProps,
  ProjectPostProps,
  RequiredTalentsProps,
} from "../../redux/types";

// interface InfoCardProps {
//   title: string;
//   children: ReactNode;
// }

// function InfoCard({ title, children }: InfoCardProps): JSX.Element {
//   // Function implementation goes here

//   return <div>{children || null}</div>;
// }

// // }

// interface PreviewPublishedProps {
//   next: () => void;
//   cancel: () => void;
//   aboutProject: AboutProjectProps;
//   requiredTalents: RequiredTalentsProps[];
//   workDays: string[];
//   proposal: string;
//   document: any;
//   projectPost: any;
//   projectName: any;
//   setProjectPost: any;
// }

const ProjectPreview = ({
  popUp,
  setPopUp,
}: {
  popUp: boolean;
  setPopUp: any;
}) => {
  return (
    <div
      className={`fixed z-[1000] bg-black/50  w-[100%] items-center justify-end flex flex-col transition-all duration-1000 inset-0 ${
        popUp
          ? "translate-y-0 opacity-100 h-[100vh] -bottom-5"
          : "translate-y-[1000px] opacity-0 h-0"
      }`}
    >
      <Card className="p-4 relative bg-white w-[1280px] h-[95vh]">
        <span className="absolute top-0 right-0 text-sm text-[#6F797A] p-8">
          <ImCancelCircle
            className="w-[20px] h-[20px] cursor-pointer"
            onClick={setPopUp}
          />
        </span>
        <div className="flex flex-row items-center p-4">
          <div className="text-[14px] font-medium capitalize">Project Name</div>
          <div className="text-[15px] p-0 px-2">|</div>

          <div className="text-[12px] font-medium capitalize">
            Project category
          </div>
          <div className="text-[15px] p-0 px-2">|</div>

          <div className="text-[12px] font-medium capitalize">Project Code</div>
          <div className="text-[15px] p-0 px-2">|</div>

          <div className="text-[12px] font-medium capitalize text-green-500">
            Active
          </div>
        </div>
        <div className="flex items-center gap-4 relative">
          <Card className=" p-1.5 flex flex-col justify-center gap-1  border-bm__beige w-[230px] max-h-[270px] border rounded-[6px]">
            {/* <Separator className="bg-bm__gler" /> */}
            <div className="flex items-center gap-4 p-2  hover:bg-black/10 transform hover:scale-105 cursor-pointer">
              <div className="flex items-center gap-4 mr-2">
                <MdPostAdd />
                <p className="text-[14px] font-normal ">Project Post</p>
              </div>
            </div>
            <Separator className="bg-bm__gler/50" />
            <div className="flex items-center gap-4 p-2   hover:bg-black/10 transform hover:scale-105 cursor-pointer">
              <MdFamilyRestroom />

              <p className="text-[14px] font-normal">Talents</p>
            </div>
            <Separator className="bg-bm__gler/50" />

            <div className="flex items-center gap-4 p-2   hover:bg-black/10 transform hover:scale-105 cursor-pointer">
              <MdOutlineProductionQuantityLimits />

              <p className="text-[14px] font-normal">Products</p>
            </div>
            <Separator className="bg-bm__gler/50" />
            <div className="flex items-center gap-4 p-2  hover:bg-black/10 transform hover:scale-105 cursor-pointer">
              <BsFillCollectionFill />
              <p className="text-[14px] font-normal">Collaterals</p>
            </div>
            <Separator className="bg-bm__gler/50" />
            <div className="flex items-center gap-4 p-2  hover:bg-black/10 transform hover:scale-105 cursor-pointer">
              <TbMap2 />
              <p className="text-[14px] font-normal">Outlets</p>
            </div>
            <Separator className="bg-bm__gler/50" />
            <div className="flex items-center gap-4 p-2  hover:bg-black/10 transform hover:scale-105 cursor-pointer">
              <ImStatsDots />
              <p className="text-[14px] font-normal">Reports</p>
            </div>
          </Card>

          <div className="flex absolute flex-row justify-start items-start font-medium text-[12px] my-2 max-w-[970px] right-5 -top-2">
            <div className="relative text-white flex items-center justify-center ">
              <p className="absolute top-[25%]  z-20 text-[16px]">
                Project Overview
              </p>
              <img src={darkUnion} alt="" className=" z-5 w-[300px] h-[45px]" />
            </div>
            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] text-[16px] z-20">
                Invite Talent
              </p>
              <img src={subtract} alt="" className=" z-10 w-[300px] h-[45px]" />
            </div>
            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] text-[16px] z-20">
                {" "}
                Applications
              </p>
              <img src={subtract} alt="" className=" z-10 w-[300px] h-[45px]" />
            </div>
            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] z-20 text-[16px]"> Contracts</p>
              <img
                src={subtract2}
                alt=""
                className=" z-10 w-[300px] h-[45px]"
              />
            </div>
          </div>
        </div>
        <Card className=" flex absolute flex-col p-4 md:p-8 bg-white overflow-y-scroll h-[75vh]  w-[1000px] right-0 top-0 mt-[150px] pl-[50px]">
          {/* <div>
          <h1>Project Title</h1>
        </div> */}{" "}
          <Card className="w-full pt-2 my-3">
            <CardContent>
              <div className="flex justify-between items-center">
                <h2 className="text-[18px] font-medium capitalize">title 1</h2>
              </div>

              <div className="pt-2">
                <p className="py-2 text-[16px] font-normal">
                  {/* {aboutProject.projectCategory} */}
                  project Category: -
                </p>
                <p className="py-2 text-[16px] font-normal">
                  {/* {aboutProject.projectCode} */}
                  project Code: -
                </p>
                <Separator className="bg-bm__beige my-3" />
                <div className="flex flex-col overflow-y-auto h-[10vh]">
                  <p className=" capitalize overflow-hidden break-words">
                    Project Description:{" "}
                    {/* {aboutProject.projectDescription || "-"} */}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full pt-4 my-3">
            <CardContent>
              {["requiredTalents"].map((_: any, idx: number) => {
                return (
                  <div className="" key={idx}>
                    <h2>Brand Amassabor</h2>
                    {/* <div className="flex justify-between items-center">
                  <h2 className="text-[18px] font-medium capitalize">
                    {_.talentType || "-"}
                  </h2>
                </div> */}
                    <div className="pt-4">
                      <p className=" capitalize text-[16px] font-normal">
                        <p>BSc.</p>
                        {/* {requiredTalents[0].qualifications || "-"} */}
                      </p>
                      <Separator className="bg-bm__beige my-3" />
                    </div>
                    <div className="pt-2">
                      <p>Skills</p>
                      <div className="py-3 flex gap-6 max-w-3xl flex-wrap">
                        {/* {_.skills.map((skill, idx) => {
                            return (
                              <div className="" key={idx}>
                                <Button className="light__btn max-w-fit capitalize">
                                  {skill}
                                </Button>
                              </div>
                            );
                          })} */}
                      </div>
                      <Separator className="bg-bm__beige my-2" />
                    </div>
                    <div className="pt-2">
                      <p>Budget</p>
                      <div className="flex justify-between items-center">
                        {(_.salary && (
                          <div className="pt-2 flex gap-6 max-w-3xl capitalize">
                            {/* {_.salary} {requiredTalents[0].paymentOptions} */}
                          </div>
                        )) ||
                          "-"}{" "}
                      </div>
                    </div>
                    <Separator className="bg-bm__beige my-4 py-[2px]" />
                  </div>
                );
              })}
              {/* <Separator className="bg-bm__beige my-4 py-[2px]" /> */}
            </CardContent>
          </Card>
          <Card className="w-full pt-4 my-3">
            <CardContent>
              <div className="flex justify-between items-center">
                <h2 className="text-[18px] font-medium capitalize">
                  September 1st 2014 to September 20th 2015
                </h2>
              </div>

              <Separator className="bg-bm__beige my-4" />
              <div className="py-3">
                <p>Working Days</p>
                <div className="pt-2 flex gap-4 max-w-3xl mt-2 mb-4 cursor-pointer flex-wrap">
                  {/* {daysOfWeek.map(({ label, value }: DayObject, index) => (
                      <div
                        key={index}
                        className={` rounded-md p-2 px-3 mb-4 capitalize font-semibold 
                        ${
                          workDays.includes(value)
                            ? "bg-[#252525] text-white"
                            : "bg-bm_card_grey"
                        }`
                      }
                      >
                        {label}
                      </div>
                    ))} */}
                </div>
                <Separator className="bg-bm__beige my-2" />
              </div>
              <div className="pt-2">
                <p className="mb-2">Location</p>
                <div className="py-2 flex gap-6 max-w-3xl flex-wrap">
                  {/* {(aboutProject.projectLocation !== undefined && (
                      <Button className="light__btn  max-w-fit capitalize">
                        {aboutProject.projectLocation}
                      </Button>
                    )) ||
                      "-"} */}
                </div>
                {/* <Separator className="bg-bm__beige my-2" /> */}
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
                  {/* {proposal || "-"}{" "} */}
                  Application requirements:
                </p>
              </div>
              <Separator className="bg-bm__beige my-2" />
            </CardContent>
          </Card>
          <Card className="w-full py-4 my-3">
            <CardContent>
              <div className="flex flex-col mb-4 gap-2">
                <p>Posted On</p>
                <p>September 20th 2023</p>
              </div>
              <div className="flex flex-col gap-2">
                <p>Closed On</p>
                <p>September 20th 2023</p>
              </div>
            </CardContent>
          </Card>
          {/*  */}
        </Card>
      </Card>
    </div>
  );
};
// };

export default ProjectPreview;