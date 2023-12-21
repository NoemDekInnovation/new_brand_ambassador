import ChevBackground from "../../../ui/chevbackground";
import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
// import { useRouter } from "next/router";
import React, {
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";

import { useNavigate } from "react-router-dom";

import { AiOutlineEdit } from "react-icons/ai";

import createdproject from "../../../assets/created-project.png";
import { DialogDescription } from "@radix-ui/react-dialog";
import { ImAttachment } from "react-icons/im";
import {
  AboutProjectProps,
  ProjectPostProps,
  RequiredTalentsProps,
} from "../../../redux/types";
import { DayObject, daysOfWeek } from "./projectBudget";
import PostProjectModal from "../../../libs/postProject";

export default function ProjectDetails({
  next,
  prev,
  cancel,
  aboutProject,
  document,
  requiredTalents,
  proposal,
  workDays,
  projectPost,
  projectName,
  submit,
  setProjectPost,
  edit,
  onModalOpen,
}: // formData
//   setDefault,
{
  submit: (draft: boolean) => void;
  next?: () => void;
  prev: () => void;
  cancel: () => void;
  aboutProject: AboutProjectProps;
  requiredTalents: RequiredTalentsProps[];
  workDays: string[];
  proposal: string;
  document: any;
  projectPost: any;
  projectName: any;
  setProjectPost: any;
  edit: (string: string) => void;
  onModalOpen: any
  // formData: aboutProjectSchemaType
  //   setDefault: Dispatch<SetStateAction<string>>;
}) {
  function InfoCard({
    title,
    children,
    edit,
  }: {
    title: string;
    children: ReactNode;
    edit?: () => void;
  }) {
    const navigate = useNavigate();
    const handleClick = () => {
      // Navigate to the desired page
      navigate("/dashboard");
    };
    return (
      <Card className="w-full pt-4 my-7">
        <CardContent>
          <div className="flex justify-between items-center">
            <h2 className="text-[18px] font-medium capitalize">{title}</h2>
            <button onClick={edit}>
              <AiOutlineEdit className="text-[16px] rounded-md " />
            </button>
          </div>
          {/* <Separator /> */}
          {children}
        </CardContent>
      </Card>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const { value } = e.target;

    // setProjectPost((prevData: ProjectPostProps) => ({
    //   ...prevData,
    //   [fieldName]: value,
    // }));
    if (fieldName === "startDate" || fieldName === "endDate") {
      // Get the current date
      const currentDate = new Date();

      // Get the selected date
      const selectedDate =
        fieldName === "startDate" ? currentDate : new Date(value + "T00:00:00");

      if (selectedDate < currentDate) {
        // Display an error message
        console.error("Selected date cannot be in the past");
        // Optionally, you can set an error state to display a message in your UI
      } else if (
        fieldName === "endDate" &&
        selectedDate <= new Date(aboutProject.startDate + "T00:00:00")
      ) {
        // Display an error message
        console.error("End date cannot be before or equal to start date");
        // Optionally, you can set an error state to display a message in your UI
      } else {
        // No error, update the state with truncated value
        const truncatedValue = value.slice(0, 250);
        setProjectPost((prevData: AboutProjectProps) => ({
          ...prevData,
          [fieldName]: truncatedValue,
        }));
      }
    } else {
      // For other fields, update the state directly with truncated value
      const truncatedValue = value.slice(0, 250);
      setProjectPost((prevData: AboutProjectProps) => ({
        ...prevData,
        [fieldName]: truncatedValue,
      }));
    }
  };

  const startDate = new Date(aboutProject.startDate);
  const endDate = new Date(aboutProject.endDate);

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

  const formattedDateRange = `${formattedStartDate} to ${formattedEndDate}`;

  return (
    <div className="px-4 pb-4  md:px-12 xl:px-40">
      <Card className="p-4 md:p-8  bg-white overflow-y-scroll h-[83vh]">
        <div className="flex flex-col sm:flex-row justify-between px-2 items-center">
          <h3 className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg">
            Project Details
          </h3>
          <button
            className="dark__btn w-full sm:w-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mt-2 sm:mt-0"
            onClick={() => submit(false)}
          >
            Post this project
          </button>
        </div>

        <InfoCard
          title={aboutProject.projectTitle}
          edit={() => edit("aboutProject")}
        >
          <div className="pt-2">
            <p className="py-2 text-[16px] font-normal">
              {aboutProject.projectCategory}
            </p>
            <p className="py-2 text-[16px] font-normal">
              {aboutProject.projectCode}
            </p>
            <Separator className="bg-bm__beige my-3" />
            {/* <p className=" capitalize text-[14px]">
              Project Description: {aboutProject.projectDescription || "-"}
            </p> */}
            <div className="flex flex-col overflow-y-auto h-[10vh]">
              <p className=" capitalize overflow-hidden break-words">
                Project Description: {aboutProject.projectDescription || "-"}
              </p>
            </div>
          </div>
        </InfoCard>
        <InfoCard
          title={requiredTalents[0].opportunities}
          edit={() => edit("requiredTalents")}
        >
          {requiredTalents.map((_, idx) => {
            return (
              <div className="" key={idx}>
                {/* <div className="flex justify-between items-center">
                  <h2 className="text-[18px] font-medium capitalize">
                    {_.talentType || "-"}
                  </h2>
                </div> */}
                <div className="pt-2">
                  <p className=" capitalize text-[16px] font-normal">
                    {requiredTalents[0].qualifications || "-"}
                  </p>
                  <Separator className="bg-bm__beige my-3" />
                </div>
                <div className="pt-2">
                  <p>Skills</p>
                  <div className="py-3 flex gap-6 max-w-3xl flex-wrap">
                    {_.skills.map((skill, idx) => {
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
                    {(_.salary && (
                      <div className="pt-2 flex gap-6 max-w-3xl capitalize">
                        {_.salary} {requiredTalents[0].paymentOptions}
                      </div>
                    )) ||
                      "-"}{" "}
                    <AiOutlineEdit className="text-[16px] rounded-md " />
                  </div>
                </div>
                <Separator className="bg-bm__beige my-4 py-[2px]" />
              </div>
            );
          })}
          {/* <Separator className="bg-bm__beige my-4 py-[2px]" /> */}
        </InfoCard>

        <InfoCard title={formattedDateRange} edit={() => edit("projectBudget")}>
          <Separator className="bg-bm__beige my-4" />
          <div className="py-3">
            <p>Working Days</p>
            <div className="pt-2 flex gap-4 max-w-3xl mt-2 mb-4 cursor-pointer flex-wrap">
              {daysOfWeek.map(({ label, value }: DayObject, index) => (
                <div
                  key={index}
                  className={` rounded-md p-2 px-3 mb-4 capitalize font-semibold ${
                    workDays.includes(value)
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
              {(aboutProject.projectLocation !== undefined && (
                <Button className="light__btn  max-w-fit capitalize">
                  {aboutProject.projectLocation}
                </Button>
              )) ||
                "-"}
            </div>
            {/* <Separator className="bg-bm__beige my-2" /> */}
          </div>
        </InfoCard>
        <InfoCard
          title="Application Requirement"
          edit={() => edit("talentRequirement")}
        >
          <Separator className="bg-bm__beige my-3" />
          <div className="flex flex-col overflow-y-auto h-[10vh]">
            <p className=" capitalize overflow-hidden break-words">
              {proposal || "-"}{" "}
            </p>
          </div>
          <Separator className="bg-bm__beige my-2" />

          <div className="flex gap-4 mt-4">
            {/* <button className="border rounded-md p-2 ">

              Brand Ambassador Requirements.pdf
            </button>
            {document}
            <button className="border rounded-md p-2 "> this
              Supervisor Requirements.pdf

            </button> */}
          </div>
        </InfoCard>
        <InfoCard
          title="Tell us the period for this project post"
          edit={() => edit("aboutProject")}
        >
          <Separator className="bg-bm__beige my-3" />
          <div className="grid md:grid-cols-2 md:gap-6 mt-4 md:mt-8">
            <div className="relative  z-0 w-full mb-6 group">
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer capitalize"
                placeholder=" "
                required
                value={projectPost.startDate}
                onChange={(e) => handleInputChange(e, "startDate")}
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Duration
              </label>
            </div>
            <div className="flex gap-4 items-center">
              to
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer capitalize"
                  placeholder=" "
                  required
                  onChange={(e) => handleInputChange(e, "endDate")}
                  value={projectPost.endDate}
                />
                <label
                  htmlFor="endDate"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                ></label>
              </div>
            </div>
          </div>
        </InfoCard>

        <div className="flex flex-col md:flex-row md:justify-between w-full">
          <div className="flex flex-row justify-between gap-4 md:gap-8 mb-4 md:mb-0">
            <Button className="light__btn max-w-[100px]" onClick={cancel}>
              Cancel
            </Button>
            <Button className="light__btn max-w-[100px]" onClick={prev}>
              Back
            </Button>
          </div>

          <div className="flex whitespace-nowrap gap-4 md:gap-8">
            <Button
              className="light__btn max-w-[200px]"
              onClick={() => submit(true)}
            >
              Save as draft
            </Button>
            <Button className="dark__btn" onClick={() => submit(false)}>
              Post this project{" "}
            </Button>
            {/* <Button className="dark__btn" onClick={() => console.log("submit")}>
              Post this project{" "}
            </Button> */}
          </div>
        </div>
      </Card>
    </div>
  );
}
