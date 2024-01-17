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
import { useDispatch, useSelector } from "react-redux";
import AllInvitations from "./AllInvitations";
import AppliedInvitations from "./AppliedInvitiations";
import NotAppliedInvitations from "./NotApplied";
import RejectedInvitations from "./Rejected.tsx";
import ContractOffers from "./ContractOffers";
import AcceptOffers from "./AcceptOffers";
import DeclinedOffers from "./DeclinedOffers";
import { setProjectQuery } from "../../../redux/talent/allProjects.slice";
import { setProjectQueryx } from "../../../redux/contract-offer";

type ApplicationType =
  | "Contract Offers"
  | "Applied"
  | "Accepted Offers"
  | "Declined Offer";

export default function ApplicationsScreen({}) {
  const dispatch = useDispatch();

  const { talentInvitations } = useSelector(
    (state: RootState) => state.talentInvite
  );
  const { talentApplications, totalApplications } = useSelector(
    (state: RootState) => state.talentApplication
  );

  const { totalOffers, totalAccepted, totalRejected } = useSelector(
    (state: RootState) => state.contractOffer
  );

  const [isLoading, setIsLoading] = useState(false);
  const [applications, setApplications] = useState<ApplicationType>("Applied");
  const [searchQuery, setSearchQuery] = useState("");

  const handleInviteChange = (type: ApplicationType) => {
    setApplications(type);
    if (type === "Accepted Offers") {
      dispatch(setProjectQueryx({ status: "accepted" }));
    }

    if (type === "Declined Offer") {
      dispatch(setProjectQueryx({ status: "rejected" }));
    }
  };

  const filteredApplications = talentApplications?.filter((project: any) => {
    // Check if project and project.name are defined before calling toLowerCase()
    return (
      project?.project?.projectTitle &&
      project?.project?.projectTitle
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  let applicationList;

  switch (applications) {
    case "Applied":
      applicationList = (
        <AppliedInvitations invitations={filteredApplications} />
      );
      break;
    case "Contract Offers":
      applicationList = <ContractOffers />;
      break;
    case "Accepted Offers":
      applicationList = <AcceptOffers />;
      break;
    case "Declined Offer":
      applicationList = <DeclinedOffers />;
      break;
    default:
      applicationList = null;
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
    // applied = [...inviteLength];
  }, []);

  const appliedInvite = talentInvitations?.invitations?.filter(
    (project: any, idx: number) => {
      return project?.status === "applied";
    }
  );

  const notAppliedInvite = talentInvitations?.invitations?.filter(
    (project: any, idx: number) => {
      return project?.status === "notApplied";
    }
  );

  const rejectedInvite = talentInvitations?.invitations?.filter(
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
          <div className="flex border border-bm__beige w-fit">
            <p
              onClick={() => handleInviteChange("Applied")}
              className={`px-4 py-1 border-r border-bm__beige text-[12px] font-medium text-center cursor-pointer
             hover:bg-black/10 transition-all duration-300 
            ${
              applications === "Applied" &&
              "bg-black/10 transition-all duration-300 "
            }`}
            >
              My Applications{" "}
              <span className="text-[12px] font-bold">
                ({totalApplications})
              </span>
            </p>
            <p
              onClick={() => handleInviteChange("Contract Offers")}
              className={`px-4 py-1 text-[12px] font-medium  border-r border-bm__beige  cursor-pointer  hover:bg-black/10 transition-all duration-300
            ${
              applications === "Contract Offers" &&
              "bg-black/10 transition-all duration-300 "
            }
            `}
            >
              Offers {"  "}
              <span className="text-[12px] font-bold">({totalOffers})</span>
            </p>
            <p
              onClick={() => handleInviteChange("Accepted Offers")}
              className={`px-4 py-1 text-[12px] font-medium  border-r border-bm__beige  cursor-pointer  hover:bg-black/10 transition-all duration-300
            ${
              applications === "Accepted Offers" &&
              "bg-black/10 transition-all duration-300 "
            }
            `}
            >
              Accepted Offers {"  "}
              <span className="text-[12px] font-bold">({totalAccepted})</span>
            </p>{" "}
            <p
              onClick={() => handleInviteChange("Declined Offer")}
              className={`px-4 py-1 text-[12px] font-medium  cursor-pointer  hover:bg-black/10 transition-all duration-300
            ${
              applications === "Declined Offer" &&
              "bg-black/10 transition-all duration-300 "
            }
            `}
            >
              Declined Offers {"  "}
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
        {applicationList}
      </Card>
    </>
  );
}
