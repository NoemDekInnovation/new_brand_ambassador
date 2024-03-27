import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "../../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
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
import Pagination from "../../ui/Pagination";
import { setPageQuery } from "../../redux/talent.slice";
import { MdMoreVert } from "react-icons/md";

type ProjectDetailsProps = {
  activeType: "Active" | "Published" | "Completed" | "Drafts";
  setToggleMenubar: () => void;
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  activeType,
  setToggleMenubar,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // console.log(activeType);

  let projects;

  switch (activeType) {
    case "Active":
      projects = <ActiveProjects searchQuery={searchQuery} />;
      break;
    case "Published":
      projects = <PublishedProject searchQuery={searchQuery} />;
      break;
    case "Completed":
      projects = <CompletedProjects searchQuery={searchQuery} />;
      break;
    case "Drafts":
      projects = <DraftsProjects searchQuery={searchQuery} />;
      break;
    default:
      projects = null;
  }

  // const { user } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();

  const activeProjectData = useSelector(
    (state: RootState) => state.activeProject
  );
  const publishProjectData = useSelector(
    (state: RootState) => state.publishProject
  );
  const completeProjectData = useSelector(
    (state: RootState) => state.completeProject
  );

  const draftProjectData = useSelector(
    (state: RootState) => state.draftProject
  );

  let projectData: any;

  switch (activeType) {
    case "Active":
      projectData = activeProjectData;
      break;
    case "Published":
      projectData = publishProjectData;
      break;
    case "Completed":
      projectData = completeProjectData;
      break;
    default:
      projectData = draftProjectData;
  }

  const {
    totalPages,
    totalProjects,
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalProjects: number;
  } = projectData;

  const projectsToRender =
    activeType === "Active"
      ? activeProjectData?.totalProjects || 0
      : activeType === "Published"
      ? publishProjectData?.totalProjects || 0
      : activeType === "Completed"
      ? completeProjectData?.totalProjects || 0
      : draftProjectData?.totalProjects || 0;

  const negativePage = pageSize - 1;
  const positivePage = pageSize + 1;

  return (
    <CardContent className=" flex-1">
      <div className="flex justify-between">
        <p className="font-semibold text-[18px]">{`${activeType} Project`}</p>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex gap-1 items-center md:hidden">
            <MdMoreVert />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="shadow-md rounded-md bg-white p-3 z-[1000] w-[200px] gap-5">
            <DropdownMenuItem className="hover:bg-black/10  text-[16px]">
              Sort{" "}
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-bm__beige" />
            <DropdownMenuItem
              className="hover:bg-black/10  text-[16px]"
              onClick={setToggleMenubar}
            >
              More
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="hidden md:flex items-center gap-3 md:gap-6">
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex w-full justify-end items-center text-[10px] font-normal">
          {page * pageSize - negativePage}-
          {page * pageSize >= totalProjects ? totalProjects : page * pageSize}{" "}
          of {totalProjects}
          {page * pageSize - negativePage <= pageSize && (
            <BsChevronDoubleLeft className="ml-4 text-slate-400 p-1 text-[16px]" />
          )}
          {page * pageSize - negativePage >= positivePage && (
            <BsChevronDoubleLeft
              className="ml-4 hover:bg-slate-300 cursor-pointer p-1 text-[16px] rounded-sm"
              onClick={() => {
                dispatch(setPageQuery({ page: 1 }));
              }}
            />
          )}
          {page * pageSize - negativePage <= pageSize && (
            <BsChevronLeft className="mx-4 text-slate-400 p-1 text-[16px]" />
          )}
          {page * pageSize - negativePage >= positivePage && (
            <BsChevronLeft
              className="mx-4 hover:bg-slate-300 cursor-pointer p-1 text-[16px] rounded-sm"
              onClick={() => {
                dispatch(setPageQuery({ page: page - 1 }));
              }}
            />
          )}
          {page * pageSize < totalProjects && (
            <BsChevronRight
              className="mx-4 hover:bg-slate-300 cursor-pointer p-1 text-[16px] rounded-sm"
              onClick={() => {
                dispatch(setPageQuery({ page: page + 1 }));
              }}
            />
          )}
          {page * pageSize >= totalProjects && (
            <BsChevronRight className="mx-4 text-slate-400 p-1 text-[16px]" />
          )}
          {page * pageSize < totalProjects && (
            <BsChevronDoubleRight
              className="mr-4 hover:bg-slate-300 cursor-pointer p-1 text-[16px] rounded-sm"
              onClick={() => {
                dispatch(setPageQuery({ page: totalPages }));
              }}
            />
          )}
          {page * pageSize >= totalProjects && (
            <BsChevronDoubleRight className="text-slate-400 p-1 text-[16px] mr-4" />
          )}
        </div>
      </div>
      <Separator className="bg-[#D7D8DA] mt-2" />
      <div className=" overflow-scroll w-[280px] md:w-full h-[53vh] m-auto flex flex-col gap-3 md:gap-2 mt-2 pr-2">
        {projects}
      </div>
      <Separator className="my-2 mt-6 bg-[#D7D8DA]" />
      <div className="flex justify-end my-3">
        {/* <Pagination
          first={""}
          last={""}
          prev={""}
          next={""}
          currentPage={1}
          count={projectsToRender}
        /> */}
      </div>
    </CardContent>
  );
};

export default ProjectDetails;
