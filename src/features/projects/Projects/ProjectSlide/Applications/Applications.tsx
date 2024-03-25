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
// import PublishedProject from "../PublishedProject";
import { AiOutlineSearch } from "react-icons/ai";
import PublishedProject from "../../ProjectTabs/PublishedProject";
import { Checkbox } from "../../../../../ui/checkbox";
import { TalentList } from "../../../../../components/newAgency/Talentlist";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../ui/select";

const Applications = () => {
  const [modal, setModal] = useState(false);

  const handlePageSizeChange = (size: any) => {
    // updateQuery({ pageSize: size });
  };

  const pageSize = 20;
  return (
    <>
      <div className="relative w-full gap-4 flex flex-col">
        <Card className="bg-white h-full  p-0 flex flex-col w-full">
          <div className="border-y ">
            <div className="flex flex-col md:flex-row gap-3 bg-bm_card_grey p-4 w-full justify-between">
              <div className=" md:max-w-[520px] w-full whitespace-nowrap gap-4 flex md:flex-1 ">
                <Select>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Action" />
                  </SelectTrigger>
                  <SelectContent className="z-[2500] bg-white">
                    <SelectGroup>
                      {/* <SelectLabel>Brand Ambassador</SelectLabel> */}
                      <SelectItem value="brand-ambassador">
                        Brand Ambassador
                      </SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="supervisor">Supervisor</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Invited Talent" />
                  </SelectTrigger>
                  <SelectContent className="z-[2500] bg-white">
                    <SelectGroup>
                      {/* <SelectLabel>Brand Ambassador</SelectLabel> */}
                      <SelectItem value="brand-ambassador">
                        Brand Ambassador
                      </SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="supervisor">Supervisor</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full">
                <div className="px-3 bg-white flex items-center w-full  max-w-[600px]  rounded-md ml-auto">
                  <AiOutlineSearch />
                  <input
                    type="search"
                    placeholder="Search filter (Project name, project type and location)"
                    className="w-full bg-transparent outline-none text-[12px] p-2"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <div className="flex items-center gap-3 md:px-4 py-3 px-2">
                <Checkbox />
                <p className="whitespace-nowrap">Select all</p>
              </div>
              <div className="flex flex-col md:flex-row w-full items-center md:justify-end md:gap-8 md:px-4">
                <div className="flex justify-between px-2 gap-2 w-full">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex gap-1 items-center">
                      <BiSortAlt2 />
                      <div className="flex text-[12px] font-normal text-{#252525]">
                        Sort: {"  "} Relevance{" "}
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
                  <div className="flex gap-2">View</div>
                </div>
                <div className="max-w-[400px] md: md:min-w-[300px]">
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
          </div>
          <div className="p-4 py-6  overflow-auto h-[40vh] flex flex-col gap-4 w-full overflow-x-scroll">
            {[1, 2, 3, 4].map((project) => {
              return (
                <>
                  <TalentList
                    project={project}
                    key={project}
                    talent={""}
                    index={0}
                    handleProfilePopUp={() => {}}
                    setSelectedTalentID={() => {}}
                    handleCheckedChange={() => {}}
                    setModal={setModal}
                    modal={modal}
                    checkInvite={true}
                    inviteStatus="applied"
                  />
                </>
              );
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
      </div>
    </>
  );
};

export default Applications;
