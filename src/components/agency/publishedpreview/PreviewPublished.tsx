import React, { ReactNode, useState } from "react";
import { Card } from "../../../ui/card";
import { Dialog, DialogContent, Overlay } from "@radix-ui/react-dialog";
import { TbMap2, TbProgressCheck } from "react-icons/tb";
import { ImCancelCircle } from "react-icons/im";
import { Separator } from "../../../ui/seperator";
import { MdOutlineProductionQuantityLimits, MdPostAdd } from "react-icons/md";
import { BsFillCollectionFill } from "react-icons/bs";
import darkUnion from "../../../assets/Union.png";
import subtract from "../../../assets/Subtract.png";
import subtract2 from "../../../assets/Subtract2.png";
import { Button } from "../../../ui/button";
import { useNavigate } from "react-router-dom";

import { AiOutlineEdit } from "react-icons/ai";
import { DayObject, daysOfWeek } from "../createproject/projectBudget";
import {
  AboutProjectProps,
  ProjectPostProps,
  RequiredTalentsProps,
} from "../../../redux/types";

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

const PreviewPublished = ({
  popUp,
  setPopUp,
}: {
  popUp: boolean;
  setPopUp: any;
}) => {
  //   next,
  //   cancel,
  //   aboutProject,
  //   document,
  //   requiredTalents,
  //   proposal,
  //   workDays,
  //   projectPost,
  //   projectName,
  //   setProjectPost,
  // }: {
  //   next?: () => void;
  //   cancel: () => void;
  //   aboutProject: AboutProjectProps;
  //   requiredTalents: RequiredTalentsProps[];
  //   workDays: string[];
  //   proposal: string;
  //   document: any;
  //   projectPost: any;
  //   projectName: any;
  //   setProjectPost: any;
  // }) => {
  // edit?: () => void;
  // const next = () => {};
  // const cancel = () => {};
  // const aboutProject = {
  //   projectTitle: "Project Title",
  //   projectCategory: "Project Category",
  //   projectCode: "Project Code",
  //   projectDescription: "Project Description",
  //   projectLocation: "Project Location",
  //   startDate: "",
  //   endDate: "",
  // };
  // const requiredTalents = [
  //   {
  //     opportunities: "Opportunities",
  //     talentType: "Talent Type",
  //     qualifications: "Qualifications",
  //     skills: ["Skill 1", "Skill 2", "Skill 3"],
  //     salary: "Salary",
  //     paymentOptions: "Payment Options",
  //   },
  // ];

  // const workDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  // const proposal = "Proposal";
  // const document = "Document";
  // const projectPost = {
  //   startDate: "",
  //   endDate: "",
  // };
  // const projectName = "Project Name";
  // const setProjectPost: any = () => {};
  // const setOverView = () => {};

  // function InfoCard({
  //   title,
  //   children,
  //   edit,
  // }: {
  //   title: string;
  //   children: ReactNode;
  //   edit?: () => void;
  // {
  //   const navigate = useNavigate();
  //   const handleClick = () => {
  //     // Navigate to the desired page
  //     navigate("/dashboard");
  //   };
  //   const handleInputChange = (
  //     e: React.ChangeEvent<HTMLInputElement>,
  //     fieldName: string
  //   ) => {
  //     const { value } = e.target;

  //     // setProjectPost((prevData: ProjectPostProps) => ({
  //     //   ...prevData,
  //     //   [fieldName]: value,
  //     // }));
  //     if (fieldName === "startDate" || fieldName === "endDate") {
  //       // Get the current date
  //       const currentDate = new Date();

  //       // Get the selected date
  //       const selectedDate = new Date(value + "T00:00:00");

  //       if (selectedDate < currentDate) {
  //         // Display an error message
  //         console.error("Selected date cannot be in the past");
  //         // Optionally, you can set an error state to display a message in your UI
  //       } else if (
  //         fieldName === "endDate" &&
  //         selectedDate <= new Date(aboutProject.startDate + "T00:00:00")
  //       ) {
  //         // Display an error message
  //         console.error("End date cannot be before or equal to start date");
  //         // Optionally, you can set an error state to display a message in your UI
  //       } else {
  //         // No error, update the state with truncated value
  //         const truncatedValue = value.slice(0, 250);
  //         setProjectPost((prevData: AboutProjectProps) => ({
  //           ...prevData,
  //           [fieldName]: truncatedValue,
  //         }));
  //       }
  //     } else {
  //       // For other fields, update the state directly with truncated value
  //       const truncatedValue = value.slice(0, 250);
  //       setProjectPost((prevData: AboutProjectProps) => ({
  //         ...prevData,
  //         [fieldName]: truncatedValue,
  //       }));
  //     }
  //   };

  //   const startDate = new Date(aboutProject.startDate);
  //   const endDate = new Date(aboutProject.endDate);

  //   const formattedStartDate = startDate.toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   });

  //   const formattedEndDate = endDate.toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   });

  //   const formattedDateRange = `${formattedStartDate} to ${formattedEndDate}`;
  // const [popUp, setPopUp] = useState(false);

  return (
    <div
      className={`fixed z-[1000] bg-black/50  w-[100%] items-center justify-end flex flex-col transition-all duration-1000 inset-0 ${
        popUp
          ? "translate-y-0 opacity-100 h-[100vh] -bottom-5"
          : "translate-y-[1000px] opacity-0 h-0"
      }`}
    >
      <Card className="p-4 relative bg-white w-[1280px] h-[89vh]">
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

          <div className="text-[12px] font-medium capitalize">Published</div>
        </div>
        <div className="flex items-center gap-4 relative">
          <Card className=" p-1.5 flex flex-col justify-center gap-1  border-bm__beige w-[230px] max-h-[200px] border rounded-[6px]">
            {/* <Separator className="bg-bm__gler" /> */}
            <div className="flex items-center gap-4 p-2  hover:bg-black/10 transform hover:scale-105 cursor-pointer">
              <div className="flex items-center gap-4 mr-2">
                <MdPostAdd />
                <p className="text-[14px] font-normal ">Project Post</p>
              </div>
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
        {/* <Card className=" flex absolute flex-col p-4 md:p-8 bg-white overflow-y-scroll h-[83vh]  w-[1000px] right-0 top-0 mt-[150px] pl-[50px]"> */}
        <div>
          <h1>Project Title</h1>
        </div>
        a {/* </Card> */}
      </Card>
    </div>
  );
};
// };

export default PreviewPublished;
