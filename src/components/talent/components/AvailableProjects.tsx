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

      {card_content.content.map((_, idx) => {
        return (
          <div key={idx} className="border rounded mb-4 p-3">
            <div className="flex w-full">
              <CardContent className="p-0 space-y-1 flex-1">
                <div className="flex space-x-2">
                  <img src={drago} alt="" width={18} height={18} />
                  <p className="border-r px-2 text-[12px]">Cool Ltd.</p>
                  {/* <p className="text-bm__ox__red text-[10px] flex items-center gap-1">
                    {" "}
                    <GoChecklist className="text-[13px]" />
                    Unverified
                  </p> */}
                  <p className="text-green-900 text-[10px] flex items-center gap-1">
                    {" "}
                    <GoChecklist className="text-[13px]" />
                    Verified
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <h3 className="font-medium text-[15px] ">
                    Project Name{" "}
                    <span className="text-[10px] mx-1">(In-store)</span>
                  </h3>
                  <CiHeart />
                </div>
                <p className="font-normal text-[10px] text-[#252525]">
                  This is the project description.. this is the project
                  description
                </p>
                {card_content.isCurrent && (
                  <div className="flex md:space-x-2 text-bm__niv text-[10px] font-medium items-center flex-wrap">
                    <div className="">ID: NIV020 </div>
                    <div className="text-[16px] p-0  pb-2 px-2">.</div>
                    <div className=""> Outlet: Shoprite Ikeja</div>
                    <div className="text-[16px] p-0  pb-2 px-2">.</div>
                    {/* <br className="block md:hidden" /> */}

                    <div className="">Supervisor: Adenekan Shoneye </div>
                  </div>
                )}
              </CardContent>
              <div className="flex text-[10px]">
                <p className="border-r h-fit border-bm__beige pr-3 mr-3">
                  Posted: Oct 25,2023
                </p>
                <p className=" h-fit text-bm__ox__red">Closes: Oct 25,2023</p>
              </div>
            </div>
            <CardFooter className="mt-3 p-0 md:gap-6 flex-col sm:flex-row  sm:items-end">
              <div className="flex md:space-x-2 text-bm__grey__text text-[10px] h-full flex-wrap  ">
                <div className="">Mon, Wed, Fri {"  "}</div>
                <div className="text-[11px] p-0  pb-1 px-1">.</div>

                <div className="">Nov 30 - December 30</div>
                <div className="text-[11px] p-0  pb-1 px-1">.</div>
                <div className="">Lagos, Abuja, Ogun, Plateau</div>
              </div>
              {!card_content.isCurrent && (
                <button className="dark__btn max-w-fit text-[12px] mt-2 ">
                  Apply
                </button>
              )}
              {card_content.isCurrent && (
                <button className="ox__btn max-w-fit text-[12px] mt-2">
                  Add Report
                </button>
              )}
            </CardFooter>
          </div>
        );
      })}
      <Separator className="my-2 bg-[#d7d8da]" />
      <div className="flex justify-between mt-3 items-center">
        <div className="flex items-center">
          <p className=" text-[#d7d8da] mr-2 text-[10px]">Rows Per Page:</p>
          <div className="border border-gray-300 rounded px-2">
            <span className="hover:bg-gray-200 cursor-pointer mr-2">10</span>
            <span className="hover:bg-gray-200 cursor-pointer mr-2">20</span>
            <span className="hover:bg-gray-200 cursor-pointer mr-2">30</span>
            <span className="hover:bg-gray-200 cursor-pointer mr-2">40</span>
            <span className="hover:bg-gray-200 cursor-pointer">50</span>
          </div>
        </div>

        <div className="flex gap-8 text-bm_black/75 text-[10px] whitespace-nowrap">
          <div className="">First</div>

          <div className="flex gap-8 text-bm_black/75 text-[14px]">
            <BiChevronLeft />
            <p className="text-[10px]">Back</p>

            <p className="text-[10px]">1 - 4 of 4</p>

            <p className="text-[10px]">Next</p>
            <BiChevronRight />
            <p className="text-[10px]">Last</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
