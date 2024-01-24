import React, { ChangeEvent, useRef, useState } from "react";
import { Card, CardContent } from "../../../ui/card";
import { ImAttachment, ImCancelCircle } from "react-icons/im";
import { Separator } from "../../../ui/seperator";
import ItemCard from "./ItemCard";
import { Button } from "../../../ui/button";
import {
  DayObject,
  daysOfWeek,
} from "../../agency/createproject/projectBudget";
import { GiPaperClip } from "react-icons/gi";
import { IoMdShare } from "react-icons/io";
import { Input } from "../../../ui/input";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  campaignAuthAxiosInstance,
  patchAxiosInstance,
} from "../../../api/axios";
import ProjectOverviewCard from "./ProjectOverviewCard";
import ApplicationCard from "./ApplicationCard";
import ContractOfferCard from "./ContractOfferCard";
import union from "../../../assets/Unionss.png";

import darkUnion from "../../../assets/Unions.png";
import subtract from "../../../assets/subtract-lenght-2.jpg";
import subtract2 from "../../../assets/subtract-lenght-1.jpg";
import subtract1 from "../../../assets/subtract-lenght.jpg";
import subtract3 from "../../../assets/subtract-lenght-3.jpg";

const ContractPreview = ({
  selectedProject,
  popUp,
  setPopUp,
  close,
}: {
  setPopUp: any;
  close: any;
  setApply: any;
  apply: boolean;
  popUp: boolean;
  selectedProject: any;
}) => {
  const startDate = new Date(
    selectedProject?.project?.projectDuration?.startDate
  );
  const endDate = new Date(selectedProject?.project?.projectDuration?.endDate);
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

  const [activeCard, setActiveCard] = useState("Project Overview");

  let contractCard;
  switch (activeCard) {
    case "Project Overview":
      contractCard = (
        <ProjectOverviewCard
          selectedProject={selectedProject}
          formattedEndDate={formattedEndDate}
          formattedStartDate={formattedStartDate}
        />
      );
      break;
    case "Application":
      contractCard = <ApplicationCard selectedProject={selectedProject} />;
      break;
    case "Contract Offer":
      contractCard = (
        <ContractOfferCard
          selectedProject={selectedProject}
          setPopUp={setPopUp}
          close={close}
        />
      );
      break;

    default:
      break;
  }

  return (
    <div
      className={`fixed z-[1000] bg-black/50  w-[100%] items-center justify-end flex flex-col transition-all duration-1000 inset-0 ${
        popUp
          ? "translate-y-0 opacity-100 h-[100vh] -bottom-5"
          : "translate-y-[1000px] opacity-0 "
      }`}
    >
      <Card className="p-4 relative bg-white w-[90VW] h-[95vh] overflow-hidden md:p-10">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <h2 className="capitalize font-bold text-[16px]">
              {selectedProject?.project?.projectTitle}
            </h2>
            <div className="h-6 w-[1px] bg-black"></div>
            <h2 className="capitalize font-semibold text-[14px]">
              {selectedProject?.project?.projectCategory}
            </h2>
            <div className="h-6 w-[1px] bg-black"></div>
            <h2 className="capitalize font-semibold text-[14px]">
              {" "}
              {selectedProject?.project?.projectCode}
            </h2>
            <div className="h-6 w-[1px] bg-black font-semibold "></div>
            <h2 className="font-semibold text-[14px]">
              Closes: {formattedEndDate}
            </h2>
          </div>
          <div className="flex gap-2">
            <span className=" text-sm text-[#6F797A]">
              <ImCancelCircle
                className="w-[20px] h-[20px] cursor-pointer ml-2 md:ml-6"
                onClick={() => {
                  close();
                  setPopUp();
                }}
              />
            </span>
          </div>
        </div>
        <Separator className="bg-bm__beige my-2 mb-10 " />

        <div className=" flex  flex-row justify-start items-start font-medium text-[12px] my-2  w-full  right-5 -top-2 cursor-pointer">
          <div
            onClick={() => setActiveCard("Project Overview")}
            className="relative  flex items-center justify-center  mb-2 md:mb-6 cursor-pointer "
          >
            <p
              className={`${
                activeCard === "Project Overview" ? "text-white" : "text-black"
              } absolute top-[25%]  z-20 text-[16px]`}
            >
              Project Overview
            </p>
            {activeCard === "Project Overview" && (
              <img
                src={darkUnion}
                alt=""
                className=" z-5 w-[2500px] h-[45px]"
              />
            )}

            {activeCard !== "Project Overview" && (
              <img src={union} alt="" className=" z-5 w-[2500px] h-[45px]" />
            )}
          </div>
          <div
            onClick={() => setActiveCard("Application")}
            className=" relative flex items-center justify-center  mb-2 md:mb-6 cursor-pointer"
          >
            <p
              className={`${
                activeCard === "Application" ? "text-white" : "text-black"
              } absolute top-[25%]  z-20 text-[16px]`}
            >
              {" "}
              Application
            </p>
            {activeCard === "Application" && (
              <img
                src={subtract1}
                alt=""
                className=" z-5 w-[2500px] h-[45px]"
              />
            )}
            {activeCard !== "Application" && (
              <img src={subtract} alt="" className=" z-5 w-[2500px] h-[45px]" />
            )}{" "}
          </div>
          <div
            onClick={() => setActiveCard("Contract Offer")}
            className=" relative flex items-center justify-center  mb-2 md:mb-6 cursor-pointer"
          >
            <p
              className={`${
                activeCard === "Contract Offer" ? "text-white" : "text-black"
              } absolute top-[25%]  z-20 text-[16px]`}
            >
              {" "}
              Offer and Contract
            </p>
            {/* <img src={subtract2} alt="" className=" z-10 w-[350px] h-[45px]" /> */}
            {activeCard === "Contract Offer" && (
              <img
                src={subtract3}
                alt=""
                className=" z-5 w-[2500px] h-[45px]"
              />
            )}
            {activeCard !== "Contract Offer" && (
              <img
                src={subtract2}
                alt=""
                className=" z-5 w-[2500px] h-[45px]"
              />
            )}{" "}
          </div>
        </div>

        {contractCard}
      </Card>
    </div>
  );
};

export default ContractPreview;
