import React, { useState } from "react";
import { Card } from "../../../../../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../../ui/dropdown-menu";
import { BiSortAlt2 } from "react-icons/bi";
import Pagination from "../../../../../ui/Pagination";
import PublishedProject from "../PublishedProject";
import { AiOutlineSearch } from "react-icons/ai";
import NewProject from "../../NewProject";

const PublishedProjects = () => {
  const [tipsBox, setTipsBox] = useState(true);
  const [showNewProject, setShowNewProject] = useState(false);

  const toggleView = () => {
    setShowNewProject(!showNewProject);
  };
  const handlePageSizeChange = (size: any) => {
    // updateQuery({ pageSize: size });
  };
  const pageSize = 20;
  return (
    <>
      <Card className="bg-white h-full  p-0 flex flex-col">
        {/* <Card className="bg-white h-full min-h-[89vh] p-3 md:p-6 flex flex-col md:flex-row gap-3 md:gap-6"> */}
        {tipsBox && (
          <div className="bg-[#F8F0EB] p-3 m-4 flex items-start justify-between">
            <div className="p-2 flex-1 text-[#515457] text-[12px] font-normal">
              <h2>This page contains all project that you published. </h2>
              <div className="flex gap-1 items-center">
                <span className="bg-[#515457] ml-1 h-[3px] w-[3px] rounded-full"></span>
                <p>You can invite suitable Talent to your projects.</p>
              </div>
              <div className="flex gap-1 items-center">
                <span className="bg-[#515457] ml-1 h-[3px] w-[3px] rounded-full"></span>
                <p>You can view all applications.</p>
              </div>
            </div>
            <button
              onClick={() => setTipsBox(false)}
              className="cursor-pointer"
            >
              x
            </button>
          </div>
        )}
        <div className="border-y ">
          <div className="flex flex-col md:flex-row gap-3 bg-bm_card_grey p-4 w-full justify-between">
            <div className=" md:flex-1 ">
              <div className="px-3 bg-white mr-2 flex items-center w-full  max-w-[600px]  rounded-md">
                <AiOutlineSearch />
                <input
                  type="search"
                  placeholder="Search filter (Project name, project type and location)"
                  className="w-full bg-transparent outline-none text-[12px] p-2 my-auto"
                />
              </div>
            </div>
            <div className="w-[160px]">
              <button className="dark___btn" onClick={toggleView}>
                Create Project
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full items-center md:justify-end md:gap-6 md:px-4 py-3">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex gap-1 items-center">
                <BiSortAlt2 />
                <div className="flex text-[12px] font-normal text-{#252525]">
                  Sort: {"  "} Title: (A-Z){" "}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white p-3">
                <DropdownMenuItem className="hover:bg-black/10  text-[16px]">
                  Relevance
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-bm__beige" />
                <DropdownMenuItem className="hover:bg-black/10  text-[16px]">
                  Average Rating
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="max-w-[400px]">
              <Pagination
                count={10}
                currentPage={0}
                first=""
                last=""
                next=""
                prev=""
              />
            </div>
          </div>
        </div>
        <div className="p-4 py-6  overflow-y-auto h-[40vh]">
          {[1, 2, 3, 4].map((project) => {
            return <PublishedProject key={project} project={project} />;
          })}
        </div>
        <div className="flex w-full bg-bm_card_grey items-center justify-between md:gap-6 md:px-4 py-3 flex-col md:flex-row gap-2">
          <div className="flex items-center">
            <p className=" whitespace-nowrap  mr-2 text-[10px]">
              Rows Per Page:
            </p>
            <div className="flex items-center gap-3">
              {[10, 20, 30, 40, 50].map((n, idx) => {
                return (
                  <div
                    className={`hover:bg-gray-300 text-[10px]  ${
                      pageSize === n ? "bg-gray-300" : ""
                    } rounded p-2 transition-all duration-400 cursor-pointer`}
                    key={idx}
                    onClick={() => handlePageSizeChange(n)}
                  >
                    {n}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="max-w-[400px]">
            <Pagination
              count={10}
              currentPage={0}
              first=""
              last=""
              next=""
              prev=""
            />
          </div>
        </div>
      </Card>
      <NewProject cancelProject={toggleView} />
    </>
  );
};

export default PublishedProjects;
