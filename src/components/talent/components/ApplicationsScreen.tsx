import drago from "../../../assets/drago.jpg";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import { Separator } from "../../../ui/seperator";

import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
  BiSortAlt2,
} from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { Input } from "../../../ui/input";
import { CiHeart } from "react-icons/ci";
import { GoChecklist } from "react-icons/go";
import { useEffect, useState } from "react";
import { campaignAuthAxiosInstance } from "../../../api/axios";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import AllInvitations from "./AllInvitations";
import AppliedInvitations from "./AppliedInvitiations";
import NotAppliedInvitations from "./NotApplied";
import RejectedInvitations from "./Rejected.tsx";

type InviteType = "All Invitations" | "Applied" | "Not Applied" | "Rejected";

export default function ApplicationsScreen({}) {
  const { talentInvitations } = useSelector(
    (state: RootState) => state.talentInvite
  );

  const [isLoading, setIsLoading] = useState(false);
  const [invites, setInvites] = useState<InviteType>("All Invitations");

  const handleInviteChange = (type: InviteType) => {
    setInvites(type);
  };

  let inviteList;

  switch (invites) {
    case "All Invitations":
      inviteList = <AllInvitations />;
      break;
    case "Applied":
      inviteList = <AppliedInvitations />;
      break;
    case "Not Applied":
      inviteList = <NotAppliedInvitations />;
      break;
    case "Rejected":
      inviteList = <RejectedInvitations />;
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
          console.log(project);
        }
        return;
      }
    );
    applied = [...inviteLength];
  }, []);

  const appliedInvite = talentInvitations?.invitations.filter(
    (project: any, idx: number) => {
      return project?.status === "applied";
    }
  );

  const notAppliedInvite = talentInvitations?.invitations.filter(
    (project: any, idx: number) => {
      return project?.status === "notApplied";
    }
  );

  const rejectedInvite = talentInvitations?.invitations.filter(
    (project: any, idx: number) => {
      return project?.status === "rejected";
    }
  );
  return (
    <>
      <Card className="p-2 md:p-4 pt-0 md:pt-0 bg-white border-0">
        <CardHeader className="flex-row p-1 justify-between items-center ">
          <CardTitle className="">
            <p className="font-semibold text-[18px] whitespace-nowrap ">
              My Applications
            </p>
          </CardTitle>
        </CardHeader>
        <Separator className="my-2 bg-[#D7D8DA]" />
        <CardHeader className="flex-row p-1 justify-between items-center ">
          <div className="flex border border-bm__beige w-full">
            {/* <p
              onClick={() => handleInviteChange("All Invitations")}
              className={`px-4 py-1 border-r border-bm__beige text-[12px] font-medium text-center cursor-pointer
              hover:bg-black/10 transition-all duration-300 ${
                invites === "All Invitations" &&
                "bg-black/10 transition-all duration-300 "
              }`}
            >
              All Invitations{" "}
              <span className="text-[12px] font-bold">
                ({talentInvitations?.invitations?.length})
              </span>
            </p> */}
            <p
              onClick={() => handleInviteChange("Applied")}
              className={`px-4 py-1 border-r border-bm__beige text-[12px] font-medium text-center cursor-pointer
             hover:bg-black/10 transition-all duration-300 
            ${
              invites === "Applied" &&
              "bg-black/10 transition-all duration-300 "
            }`}
            >
              My Applications{" "}
              <span className="text-[12px] font-bold">
                ({appliedInvite.length})
              </span>
            </p>
            {/* <p
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
                ({notAppliedInvite.length})
              </span>
            </p> */}
            <p
              onClick={() => handleInviteChange("Rejected")}
              className={`px-4 py-1 text-[12px] font-medium  cursor-pointer  hover:bg-black/10 transition-all duration-300
            ${
              invites === "Rejected" &&
              "bg-black/10 transition-all duration-300 "
            }
            `}
            >
              Contract Offers {"  "}
              <span className="text-[12px] font-bold">
                ({rejectedInvite.length})
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
              Accepted Offers {"  "}
              <span className="text-[12px] font-bold">
                ({rejectedInvite.length})
              </span>
            </p>{" "}
            <p
              onClick={() => handleInviteChange("Rejected")}
              className={`px-4 py-1 text-[12px] font-medium  cursor-pointer  hover:bg-black/10 transition-all duration-300
            ${
              invites === "Rejected" &&
              "bg-black/10 transition-all duration-300 "
            }
            `}
            >
              Rejected Offers {"  "}
              <span className="text-[12px] font-bold">
                ({rejectedInvite.length})
              </span>
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
              <div className="">1 - 5 of 750 </div>

              <div className="flex gap-4 text-bm_black/75 text-[14px]">
                <BiChevronLeft />
                <BiChevronsLeft />
                <BiChevronsRight />
                <BiChevronRight />
              </div>
            </div>
          </div>
        </CardHeader>
        <Separator className="my-2 bg-[#D7D8DA]" />
        {inviteList}
      </Card>
    </>
  );
}
