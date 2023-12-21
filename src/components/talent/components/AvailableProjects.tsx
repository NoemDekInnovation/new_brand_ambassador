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
import { ChangeEvent, useEffect, useState } from "react";
import { campaignAuthAxiosInstance } from "../../../api/axios";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import AllInvitations from "./AllInvitations";
import Available from "./Available";
import { setSearchTerm } from "../../../redux/talent/allProjects.slice";

const card_content = {
  isCurrent: false,
  content: [1, 2, 3, 4, 5],
};

export default function AvailableProjects({}) {
  const { user } = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState();

  useEffect(() => {
    setIsLoading(true);

    const fetchProjects = async () => {
      if (user?.accountId !== undefined) {
        try {
          const response = await campaignAuthAxiosInstance("", {
            headers: {
              Authorization: `Bearer ${user.authKey || ""}`,
            },
          });
          setProjects(response?.data?.data.projects);
        } catch (error) {
          console.error("Error while fetiching projects:", error);
          // Handle error appropriately (e.g., show a user-friendly message)
        }
      }
    };
    fetchProjects();
    setIsLoading(false);
  }, [user?.accountId]);

  const dispatch = useDispatch();

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
    // dispatch(setCurrentPage(1)); // Resets current page when search term changes
  };

  return (
    <Card className="p-2 md:p-4 pt-0 md:pt-0 bg-white border-0">
      <CardHeader className="flex-row p-1 justify-between items-center ">
        <CardTitle className="">
          <p className="font-semibold text-[18px] whitespace-nowrap ">
            Available Projects
          </p>
        </CardTitle>

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

          <div className="flex gap-4 text-bm_black/75 text-[10px] whitespace-nowrap">
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
      <Available />
    </Card>
  );
}
