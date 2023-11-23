import React from "react";
import { Card, CardContent, CardFooter } from "../../ui/card";
import { DropdownMenu, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { BiSortAlt2 } from "react-icons/bi";
import { Separator } from "../../ui/seperator";
import { AiOutlineSearch } from "react-icons/ai";
import { Input } from "../../ui/input";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import ActiveProjects from "./ActiveProjects";
import PublishedProject from "./PublishedProject";
import CompletedProjects from "./CompletedProjects";
import DraftsProjects from "./DraftsProjects";

type ProjectDetailsProps = {
  activeType: "Active" | "Published" | "Completed" | "Drafts";
};

const talents = [1, 2, 3].map((_, idx) => {
  return (
    <Card className="p-4 hover:bg-black/10 cursor-pointer" key={idx}>
      <CardContent className="p-0 space-y-1">
        <h3 className="font-medium text-[15px] ">
          Project Name {"  "}(in-store){" "}
        </h3>
        <p className="font-normal text-[15px]">
          This is the project description.. this is the project description
        </p>
        <div className="flex md:space-x-2 text-bm__niv text-[10px] font-medium items-center flex-wrap">
          <div className="text-[10px] font-medium">Project Code: NIV23 </div>
          <div className="text-[15px] p-0 px-2">|</div>
          <div className="text-[10px] font-medium">300 Brands Ambassador</div>
          <div className="text-[16px] p-0 px-2">|</div>
          {/* <br className="block md:hidden" /> */}

          <div className="text-[10px] font-medium">50 Supervisor</div>
        </div>
      </CardContent>
      <CardFooter className="mt-3 p-0 md:gap-6 flex-col sm:flex-row  sm:items-end">
        <div className="flex md:space-x-2 text-bm__grey__text text-[10px] h-full flex-wrap  ">
          <div className=" font-normal text-[8px]">Mon, Wed, Fri {"  "}</div>
          <div className="text-[10px] pb-1 font-black">.</div>

          <div className="font-normal text-[8px]">Nov 30 - December 30</div>
          <div className="text-[10px] pb-1 font-black">.</div>
          <div className="font-normal text-[8px]">
            Lagos, Abuja, Ogun, Plateau
          </div>
        </div>
        <button className="ox__btn max-w-fit text-[12px] mt-2 bg-[#93979D]">
          View Report
        </button>
      </CardFooter>
    </Card>
  );
});

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ activeType }) => {
  let projects;
  switch (activeType) {
    case "Active":
      projects = <ActiveProjects />;
      break;
    case "Published":
      projects = <PublishedProject />;
      break;
    case "Completed":
      projects = <CompletedProjects />;
      break;
    case "Drafts":
      projects = <DraftsProjects />;
      break;
    default:
      projects = null;
  }
  return (
    <CardContent className=" flex-1">
      <div className="flex justify-between">
        <p className="font-semibold text-[18px]">{`${activeType} Project`}</p>
        <div className="flex items-center gap-3 md:gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-1 items-center">
              <BiSortAlt2 />
              <p className="text-[12px] font-normal">Sort by: {"  "} Date</p>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
      </div>
      <Separator className="my-2 bg-[#D7D8DA]" />
      <div className="hidden lg:flex items-center border rounded-md w-1/2 px-3">
        <AiOutlineSearch className="text-[15px]" />
        <Input
          className="border-0 focus:border-0 focus:ring-0 focus:outline-none flex-1"
          placeholder="Search Project"
        />
      </div>
      <div className="flex justify-end items-center text-[10px] font-normal">
        1 - 3 of 3
        <BsChevronDoubleLeft className="mx-4" />
        <BsChevronLeft />
        <BsChevronRight className="mx-4" />
        <BsChevronDoubleRight />
      </div>

      <div className="flex justify-end my-3"> {/* <Pagination /> */}</div>
      <Separator className="bg-[#D7D8DA]" />
      <div className=" overflow-y-scroll h-[53vh] m-auto flex flex-col gap-3 md:gap-2 mt-8">
        {projects}
      </div>
      <Separator className="my-2 mt-6 bg-[#D7D8DA]" />
      <div className="flex justify-end my-3"> {/* <Pagination /> */}</div>
    </CardContent>
  );
};

export default ProjectDetails;
