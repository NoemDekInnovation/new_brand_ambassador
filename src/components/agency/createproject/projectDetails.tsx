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

export default function ProjectDetails({
  next,
  prev,
  cancel,
}: // formData
//   setDefault,
{
  next?: () => void;
  prev: () => void;
  cancel: () => void;
  // formData: aboutProjectSchemaType
  //   setDefault: Dispatch<SetStateAction<string>>;
}) {
  function InfoCard({
    title,
    children,
  }: {
    title: string;
    children: ReactNode;
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
            <h2 className="text-[18px] font-medium">{title}</h2>
            {/* <AiOutlineEdit className="text-[16px] rounded-md " /> */}
            <a
              onClick={handleClick}
              className="text-[16px] rounded-md cursor-pointer"
            >
              <AiOutlineEdit />
            </a>
          </div>
          {/* <Separator /> */}
          {children}
        </CardContent>
      </Card>
    );
  }

  // const projectTitle = formData.projectTitle
  // const projectDescription = formData.projectDescription

  return (
    <div className="px-4 pb-4  md:px-12 xl:px-40">
      <Card className="p-4 md:p-8 mt-5 bg-white overflow-y-scroll h-[83vh]">
        <div className=" flex justify-between px-2 items-center">
          <h3 className="font-semibold text-[15px]">Project Details</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="dark__btn max-w-[200px]">
                Post this project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[360px] bg-[#F3F3F3]">
              <DialogHeader className="flex flex-col items-center">
                <img
                  src={createdproject}
                  alt=""
                  className="w-[55.36px] h-[55.34px] mt-2 mb-3"
                />
                <DialogDescription className="text-center font-medium text-[18px] pb-3">
                  Your Project has been Posted Successfuly
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        <InfoCard title="Nivea Marketing">
          <div className="py-2 flex flex-col gap-3">
            <p>In-Store</p>
            <p>NIVM</p>
          </div>
          <Separator className="bg-[#D7D8DA5C]" />
          <p className="text-[14px] pt-3">
            Project Description: Lorem ipsum dolor sit amet consectetur. Sit
            amet gravida tempus proin accumsan. Consequat aliquam quis nulla leo
            duis consequat porta vulputate penatibus. Blandit lorem amet
            volutpat diam ut dignissim viverra orci.
          </p>

          {/* <p>{projectDescription} </p> */}
        </InfoCard>
        <InfoCard title="Brand Ambassador">
          <div className="pt-3">
            <p>BSc.</p>
            <Separator className="bg-[#D7D8DA5C] mt-3" />
          </div>
          <div className="pt-3">
            <p>Skills</p>
            <div className="pt-2 flex gap-6 max-w-3xl">
              <Button className="light__btn">Dancing</Button>
              <Button className="light__btn">Singing</Button>
              <Button className="light__btn">Talkative</Button>
              <Button className="light__btn">Ability to Market</Button>
            </div>
            <Separator className="bg-[#D7D8DA5C] mt-3" />
          </div>
          <div className="pt-3 flex flex-col gap-3">
            <p>Budget</p>
            <div className="flex justify-between items-center">
              <div className="pt-2 flex gap-6 max-w-3xl">N10,000 per week</div>
              <AiOutlineEdit className="text-[16px] rounded-md " />
            </div>
          </div>

          <Separator className="bg-[#D7D8DA5C] my-4 py-[2px]" />
          <div className="flex justify-between items-center">
            <h2 className="text-[18px] font-medium">Supervisor</h2>
            <AiOutlineEdit className="text-[16px] rounded-md " />
          </div>
          <div className="pt-3">
            <p>BSc.</p>
            <Separator className="bg-[#D7D8DA5C] mt-3" />
          </div>
          <div className="pt-3">
            <p>Skills</p>
            <div className="pt-2 flex gap-6 max-w-3xl">
              <Button className="light__btn">Monitoring Spirit</Button>
              <Button className="light__btn">Awareness</Button>
              <Button className="light__btn">Project Management</Button>
              <Button className="light__btn">Ability to Market</Button>
            </div>
            <Separator className="bg-[#D7D8DA5C] mt-3" />
          </div>
          <div className="pt-3 flex flex-col gap-3">
            <p>Budget</p>
            <div className="flex justify-between items-center">
              <div className="pt-2 flex gap-6 max-w-3xl">N10,000 per week</div>
              <AiOutlineEdit className="text-[16px] rounded-md " />
            </div>
          </div>
        </InfoCard>

        <InfoCard title="September 1st 2023 to January 13th 2024">
          <div className="pt-3">
            <Separator className="bg-[#D7D8DA5C] mt-3" />
            <p className="pt-5">Working Days</p>
            <div className="pt-3 flex gap-6 max-w-3xl">
              <div className="bg-bm_card_grey text-bm_black rounded-md p-2 px-3">
                S
              </div>
              <div className="text-bm_card_grey bg-bm_black rounded-md p-2 px-3">
                M
              </div>
              <div className="bg-bm_card_grey text-bm_black rounded-md p-2 px-3">
                T
              </div>
              <div className="text-bm_card_grey bg-bm_black rounded-md p-2 px-3">
                W
              </div>
              <div className="bg-bm_card_grey text-bm_black rounded-md p-2 px-3">
                T
              </div>
              <div className="bg-bm_card_grey text-bm_black rounded-md p-2 px-3">
                F
              </div>
              <div className="bg-bm_card_grey text-bm_black rounded-md p-2 px-3">
                S
              </div>
              {/* {formData.workingDays} */}
            </div>
            <Separator className="bg-[#D7D8DA5C] mt-3" />
          </div>
          <div className="pt-5">
            <p>Location</p>
            <div className="pt-3 flex gap-6 max-w-3xl">
              <Button className="light__btn">Lagos</Button>
              <Button className="light__btn">Abuja</Button>
              <Button className="light__btn">Plateau</Button>
              <Button className="light__btn">Ogun</Button>
              <Button className="light__btn">Ibadan</Button>
              <Button className="light__btn">Kwara</Button>
              <Button className="light__btn">Osun</Button>
            </div>
          </div>
        </InfoCard>
        <InfoCard title="Application Requirements">
          <Separator className="bg-[#D7D8DA5C] mt-3" />
          <p className="text-[14px] pt-3">
            Proposal Requirements: Lorem ipsum dolor sit amet consectetur. Sit
            amet gravida tempus proin accumsan. Consequat aliquam quis nulla leo
            duis consequat porta vulputate penatibus. Blandit lorem amet
            volutpat diam ut dignissim viverra orci.Proposal Requirements: Lorem
            ipsum dolor sit amet consectetur. Sit amet gravida tempus proin
            accumsan. Consequat aliquam quis nulla leo duis consequat porta
            vulputate penatibus. Blandit lorem amet volutpat diam ut dignissim
            viverra orci.Proposal Requirements: Lorem ipsum dolor sit amet
            consectetur. Sit amet gravida tempus proin accumsan. Consequat
            aliquam quis nulla leo duis consequat porta vulputate penatibus.
            Blandit lorem amet volutpat diam ut dignissim viverra orci.
            {/* {formData.projectRequirements} */}
          </p>
          <Separator className="bg-[#D7D8DA5C] mt-3" />
          <div className="flex gap-4 mt-4">
            <button className="border rounded-md p-2 hover:underline flex items-center">
              <ImAttachment className="text-[16px]" />
              Brand Ambassador Requirements.pdf
            </button>
            <button className="border rounded-md p-2 hover:underline flex items-center">
              <ImAttachment className="text-[16px]" />
              Supervisor Requirements.pdf
            </button>
          </div>
        </InfoCard>
        <InfoCard title="Tell us the period for this project post">
          <Separator className="bg-[#D7D8DA5C] mt-3" />
          <div className="grid md:grid-cols-2 md:gap-6 mt-4 md:mt-8">
            <div className="relative  z-0 w-full mb-6 group">
              <input
                type="date"
                name="floating_first_name"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />

              {/* {formData.projectDuration.startDate} */}
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
                  name="floating_last_name"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />

                {/* {formData.projectDuration.endDate} */}
                <label
                  htmlFor="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                ></label>
              </div>
            </div>
          </div>
        </InfoCard>

        <div className="flex justify-between mb-2">
          <div className="flex whitespace-nowrap gap-4 md:gap-8">
            <Button className="light__btn max-w-[100px]" onClick={cancel}>
              Cancel
            </Button>
            <Button className="light__btn max-w-[100px]" onClick={prev}>
              Back
            </Button>
          </div>
          <div className="flex whitespace-nowrap gap-4 md:gap-8">
            <Button className="light__btn max-w-[200px]" onClick={prev}>
              Save as draft
            </Button>
            <Button
              className="dark__btn"
              //   onClick={() => {
              //     setDefault;
              //     // router.push("/dashboard");
              //   }}
            >
              Publish this project{" "}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
