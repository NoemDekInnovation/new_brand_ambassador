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
import { ChangeEvent, useEffect, useState } from "react";

import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import AllInvitations from "./AllInvitations";
import AppliedInvitations from "./AppliedInvitiations";
import NotAppliedInvitations from "./NotApplied";
import RejectedInvitations from "./Rejected.tsx";
import { TalentQueryProp, setTalentQuery } from "../../../redux/talent.slice";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";

type InviteType = "All Invitations" | "Applied" | "Not Applied" | "Rejected";

export default function Invitations({}) {
  const {
    talentInvitations,
    page,
    pageSize,
    totalApplied,
    totalInvitations,
    totalNotApplied,
    totalPages,
    totalRejected,
  } = useSelector((state: RootState) => state.talentInvite);

  const [isLoading, setIsLoading] = useState(false);
  const [invites, setInvites] = useState<InviteType>("All Invitations");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortQuery, setSortQuery] = useState<TalentQueryProp | null>(null);

  const dispatch = useDispatch();

  const handleInviteChange = (type: InviteType) => {
    setInvites(type);
  };

  const filteredInvitations = talentInvitations?.invitations.filter(
    (project: any) => {
      // Check if project and project.name are defined before calling toLowerCase()
      return (
        project?.project?.projectTitle &&
        project?.project?.projectTitle
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }
  );

  let inviteList;

  switch (invites) {
    case "All Invitations":
      inviteList = <AllInvitations invitations={filteredInvitations} />;
      break;
    case "Applied":
      inviteList = <AppliedInvitations invitations={filteredInvitations} />;
      break;
    case "Not Applied":
      inviteList = <NotAppliedInvitations invitations={filteredInvitations} />;
      break;
    case "Rejected":
      inviteList = <RejectedInvitations invitations={filteredInvitations} />;
      break;
    default:
      inviteList = null;
  }

  let applied;
  let notApplied;
  let rejected;

  useEffect(() => {
    const inviteLength = talentInvitations?.invitations?.map(
      (project: any, idx: number) => {
        if (project?.status === "applied") {
          // console.log(project);
        }
        return;
      }
    );
    applied = [...inviteLength];
  }, []);

  const negativePage = pageSize - 1;
  const positivePage = pageSize + 1;

  const updateQuery = (newValues: any) => {
    setSortQuery((prevQuery: any) => ({ ...prevQuery, ...newValues }));
  };

  const handlePageChange = (size: any) => {
    updateQuery({ page: size });
  };

  const handlePageSizeChange = (size: any) => {
    updateQuery({ pageSize: size });
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(setTalentQuery(sortQuery));
    }, 1000);
  }, [sortQuery]);

  return (
    <>
      <Card className="p-2 md:p-4 pt-0 md:pt-0 bg-white border-0">
        <CardHeader className="flex-row p-1 justify-between items-center ">
          <CardTitle className="">
            <p className="font-semibold text-[18px] whitespace-nowrap ">
              Project Invitations
            </p>
          </CardTitle>
        </CardHeader>
        <Separator className="my-2 bg-[#D7D8DA]" />
        <CardHeader className="flex-row p-1 justify-between items-center ">
          <div className="flex border border-bm__beige w-full">
            <p
              onClick={() => handleInviteChange("All Invitations")}
              className={`px-4 py-1 border-r border-bm__beige text-[12px] font-medium text-center cursor-pointer
              hover:bg-black/10 transition-all duration-300 ${
                invites === "All Invitations" &&
                "bg-black/10 transition-all duration-300 "
              }`}
            >
              All Invitations{" "}
              <span className="text-[12px] font-bold">
                ({totalInvitations})
              </span>
            </p>
            <p
              onClick={() => handleInviteChange("Applied")}
              className={`px-4 py-1 border-r border-bm__beige text-[12px] font-medium text-center cursor-pointer
             hover:bg-black/10 transition-all duration-300 
            ${
              invites === "Applied" &&
              "bg-black/10 transition-all duration-300 "
            }`}
            >
              Applied{" "}
              <span className="text-[12px] font-bold">({totalApplied})</span>
            </p>
            <p
              onClick={() => handleInviteChange("Not Applied")}
              className={`px-4 py-1 border-r border-bm__beige text-[12px] font-medium text-center cursor-pointer
             hover:bg-black/10 transition-all duration-300 
            ${
              invites === "Not Applied" &&
              "bg-black/10 transition-all duration-300 "
            }`}
            >
              Not Applied{" "}
              <span className="text-[12px] font-bold">
                {" "}
                ({totalNotApplied})
              </span>
            </p>
            <p
              onClick={() => handleInviteChange("Rejected")}
              className={`px-4 py-1 text-[12px] font-medium  cursor-pointer  hover:bg-black/10 transition-all duration-300
            ${
              invites === "Rejected" &&
              "bg-black/10 transition-all duration-300 "
            }
            `}
            >
              Rejected{" "}
              <span className="text-[12px] font-bold">({totalRejected})</span>
            </p>
          </div>
        </CardHeader>
        <Separator className="my-2 bg-[#D7D8DA]" />
        <CardHeader className="flex-row p-1 justify-between items-center">
          <div className="flex w-full justify-between items-center text-[12px]">
            <div className="hidden lg:flex items-center border-0 rounded-md flex-1 w-full px-3 mr-3 md:mr-6 max-w-[400px]">
              <Input
                className="focus:border-0 focus:ring-0 focus:outline-none border max-w-[600px] h-[24px] px-[6px] py-[14px]"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-4 text-bm_black/75 text-[10px] whitespace-nowrap">
              <div className="flex gap-4 text-bm_black/75 text-[10px] whitespace-nowrap ">
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
              </div>
              <div className="">
                {" "}
                {page * pageSize - negativePage}-
                {page * pageSize >= totalInvitations
                  ? totalInvitations
                  : page * pageSize}{" "}
                of {totalInvitations}{" "}
              </div>

              <div className="flex gap-4 text-bm_black/75 text-[14px]">
                {page * pageSize - negativePage <= pageSize && (
                  <BsChevronDoubleLeft className="ml-4 text-slate-400 p-1 text-[16px]" />
                )}
                {page * pageSize - negativePage >= positivePage && (
                  <BsChevronDoubleLeft
                    className="ml-4 hover:bg-slate-300 cursor-pointer p-1 text-[16px] rounded-sm"
                    onClick={() => handlePageChange(1)}
                  />
                )}
                {page * pageSize - negativePage <= pageSize && (
                  <BsChevronLeft className="mx-4 text-slate-400 p-1 text-[16px]" />
                )}
                {page * pageSize - negativePage >= positivePage && (
                  <BsChevronLeft
                    className="mx-4 hover:bg-slate-300 cursor-pointer p-1 text-[16px] rounded-sm"
                    onClick={() => handlePageChange(page - 1)}
                  />
                )}
                {page * pageSize < totalApplied && (
                  <BsChevronRight
                    className="mx-4 hover:bg-slate-300 cursor-pointer p-1 text-[16px] rounded-sm"
                    // onClick={() => {
                    //   dispatch(setPageQuery({ page: page + 1 }));
                    // }}
                    onClick={() => handlePageChange(page + 1)}
                  />
                )}
                {page * pageSize >= totalApplied && (
                  <BsChevronRight className="mx-4 text-slate-400 p-1 text-[16px]" />
                )}
                {page * pageSize < totalApplied && (
                  <BsChevronDoubleRight
                    className="mr-4 hover:bg-slate-300 cursor-pointer p-1 text-[16px] rounded-sm"
                    onClick={() => handlePageChange(totalPages)}
                  />
                )}
                {page * pageSize >= totalApplied && (
                  <BsChevronDoubleRight className="text-slate-400 p-1 text-[16px] mr-4" />
                )}{" "}
              </div>
            </div>
          </div>
        </CardHeader>
        <Separator className="my-2 bg-[#D7D8DA]" />
        {inviteList}
        <Separator className="my-2 bg-[#d7d8da]" />
        <div className="flex justify-between mt-3 items-center">
          <div className="flex items-center">
            <p className=" whitespace-nowrap  mr-2 text-[10px]">
              Rows Per Page:
            </p>
            <div className="flex items-center gap-3">
              {[10, 20, 30, 40, 50].map((n, idx) => {
                return (
                  <div
                    className={`hover:bg-gray-300 ${
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

          <div className="flex gap-8 text-bm_black/75 text-[10px] whitespace-nowrap">
            <div className="">First</div>

            <div className="flex gap-8 text-bm_black/75 text-[14px]">
              {/* <BiChevronLeft /> */}
              <p className="text-[10px]">Back</p>

              <p className="text-[10px]">
                {page * pageSize - negativePage} -{" "}
                {page * pageSize >= totalInvitations
                  ? totalInvitations
                  : page * pageSize}{" "}
                of {totalInvitations}
              </p>

              <p className="text-[10px]">Next</p>
              {/* <BiChevronRight /> */}
              <p className="text-[10px]">Last</p>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
