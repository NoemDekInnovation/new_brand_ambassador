import { Card, CardHeader, CardTitle } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";

import { BiSortAlt2 } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { Input } from "../../../ui/input";

import { ChangeEvent, useState } from "react";

import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import Available from "./Available";
import { setSearchTerm } from "../../../redux/talent/allProjects.slice";
import { FaArrowRight } from "react-icons/fa";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { setPageQuery } from "../../../redux/talent.slice";

export default function AvailableProjects({ screen }: { screen?: string }) {
  const { page, pageSize, totalPages, totalProjects } = useSelector(
    (state: RootState) => state.allTalentProject
  );

  const dispatch = useDispatch();

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const negativePage = pageSize - 1;
  const positivePage = pageSize + 1;

  return (
    <Card className="p-2 md:p-4 pt-0 md:pt-0 bg-white border-0">
      <CardHeader className="flex-row p-1 justify-between items-center ">
        <CardTitle className="">
          <p className="font-semibold text-[18px] whitespace-nowrap ">
            Available Projects
          </p>
        </CardTitle>

        <div className="flex gap-4 text-bm_black/75 text-[10px] whitespace-nowrap ">
          {screen && screen === "home" && (
            <div className="flex items-center gap-2">
              <div
                onClick={() => {
                  // setDefaultTab("projects");
                  localStorage.setItem("defaultTab", "projects"); // Store in local storage
                  // localStorage.setItem("defaultTalent", card_title); // Store in local storage
                  window.location.reload();
                }}
                className="text-[15px] leading-[18px] font-normal text-[#252525B2] cursor-pointer"
              >
                View all projects{" "}
              </div>

              <div className="text-[14px] text-[#252525B2]">
                <FaArrowRight className="w-[w8px]" />
              </div>
            </div>
          )}
          {!screen && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex gap-1 items-center">
                <BiSortAlt2 />
                Sort: {"  "}Relevance
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white p-3">
                <DropdownMenuItem className="hover:bg-black/10  text-[16px]">
                  Relevance
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-bm__beige" />
                <DropdownMenuItem className="hover:bg-black/10  text-[16px]">
                  Salary
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      <Separator className="my-2 bg-[#D7D8DA]" />
      <CardHeader className="flex-row p-1 justify-between items-center">
        <div className="flex w-full justify-between items-center text-[12px]">
          <div className="hidden lg:flex items-center border-0 rounded-md flex-1 w-full px-3 mr-3 md:mr-6 max-w-[400px]">
            <Input
              className="focus:border-0 focus:ring-0 focus:outline-none border max-w-[600px] h-[24px] px-[6px] py-[14px]"
              placeholder="Search"
              onChange={handleSearchTermChange}
            />
          </div>
          {screen && screen === "home" && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex gap-1 items-center">
                <BiSortAlt2 />
                Sort: {"  "}Relevance
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white p-3">
                <DropdownMenuItem className="hover:bg-black/10  text-[16px]">
                  Relevance
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-bm__beige" />
                <DropdownMenuItem className="hover:bg-black/10  text-[16px]">
                  Salary
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <div className="flex gap-4 text-bm_black/75 text-[10px] whitespace-nowrap">
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
      </CardHeader>
      <Separator className="my-2 bg-[#D7D8DA]" />
      <Available />
    </Card>
  );
}
