import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchpublishproject } from "../../redux/publishProject";
import { fetchcompleteproject } from "../../redux/completeProject";
import { fetchdraftproject } from "../../redux/draftProject.slice";
import { fetchactiveproject } from "../../redux/ActiveProject";

type ProjectDetailsProps = {
  activeType: "Active" | "Published" | "Completed" | "Drafts";
};

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

  const { user } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchProjects = async () => {
      if (user?.accountId) {
        if (activeType === "Active") {
          dispatch(fetchactiveproject());
        } else if (activeType === "Published") {
          dispatch(fetchpublishproject());
        } else if (activeType === "Completed") {
          dispatch(fetchcompleteproject());
        } else if (activeType === "Drafts") {
          dispatch(fetchdraftproject());
        }
      }
    };
    fetchProjects();
  }, []);
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
      <div className="flex justify-between">
        <div className="hidden lg:flex items-center border rounded-md w-1/2 px-3 ">
          <AiOutlineSearch className="text-[15px]" />
          <Input
            className="border-0 focus:border-0 focus:ring-0 focus:outline-none flex-1"
            placeholder="Search Project"
          />
        </div>
        <div className="flex justify-end items-center text-[10px] font-normal ">
          1 - 3 of 3
          <BsChevronDoubleLeft className="mx-4" />
          <BsChevronLeft />
          <BsChevronRight className="mx-4" />
          <BsChevronDoubleRight />
        </div>
      </div>
      <Separator className="bg-[#D7D8DA] mt-2" />
      <div className=" overflow-y-scroll h-[53vh] m-auto flex flex-col gap-3 md:gap-2 mt-2 pr-2">
        {projects}
      </div>
      <Separator className="my-2 mt-6 bg-[#D7D8DA]" />
      <div className="flex justify-end my-3"> {/* <Pagination /> */}</div>
    </CardContent>
  );
};

export default ProjectDetails;
