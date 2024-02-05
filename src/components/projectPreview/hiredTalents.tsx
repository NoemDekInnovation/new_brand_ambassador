import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "../../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { BiSortAlt2 } from "react-icons/bi";
import { TbLayoutGrid } from "react-icons/tb";
import {
  AiOutlineHeart,
  AiOutlineMore,
  AiOutlineSearch,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { Separator } from "@radix-ui/react-separator";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import Pagination from "../../ui/Pagination";
import { ProjectProps, TalentProps } from "../../redux/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "../../ui/dialog";
import {
  // Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Button } from "../../ui/button";
import { authAxiosInstance, campaignAuthAxiosInstance } from "../../api/axios";
import Logo from "../../assets/beauty.jpg";
import { Input } from "../../ui/input";
import { SelectGroup, SelectLabel } from "../../ui/select";
import { TalentType } from "../agency/TalentsView";
import SelectOption from "../../libs/select";
import AllApplications from "../agency/appliedTalents/AllApplications";
import CurrentContacts from "../agency/appliedTalents/CurrentContacts";
import FavoriteTalents from "../agency/appliedTalents/FavoriteTalents";
import Engaged from "../agency/appliedTalents/Engaged";
import MyTalents from "../agency/appliedTalents/MyTalents";

import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { Checkbox } from "../../ui/checkbox";
import {
  fetchApplications,
  // filterApplications,
  setApproval,
} from "../../redux/applicantions.slice";
import { Empty } from "../Empty";
import { RiStackshareLine } from "react-icons/ri";

function truncateText(text: any, maxLength: any) {
  if (!text || text.length <= maxLength) {
    return text;
  }

  const truncatedText =
    text
      .split(" ")
      .slice(0, maxLength - 1)
      .join(" ") + "...";

  return truncatedText;
}

const HireTalents = ({
  handleProfilePopUp,
  index,
  popUp,
  setPopUp,
  ProjectId,
}: {
  handleProfilePopUp: (talent: TalentProps) => void;
  index: number;
  popUp: boolean;
  setPopUp: any;
  ProjectId: string;
}) => {
  const handleApplyPopUp = (talent: any) => {
    // setSelectedTalent(talent);
    // console.log("popUp", popUp);
    setPopUp(!popUp);
    // setSelectedRole(talent);
  };

  const [talent, setTalent] = useState<any>();
  console.log(talent);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const id = ProjectId;

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchHired = async () => {
      if (user?.user !== undefined) {
        try {
          const response = await campaignAuthAxiosInstance(
            `/hired-talent/${id}`,
            {
              headers: {
                Authorization: `Bearer ${user?.user?.authKey || ""}`,
              },
            }
          );
          setTalent(response?.data?.data?.hiredTalent);
        } catch (error) {
          // console.error("Error while fetiching Notifications:", error);
          // Handle error appropriately (e.g., show a user-friendly message)
        }
      }
    };
    fetchHired();
    // setIsLoading(false);
  }, [id, user]);
  return (
    <>
      <Card className="w-full pt-4 my-3 overflow-y-scroll h-[80vh]">
        <CardContent>
          {/* <Card className="h-[40vh]"> */}
          <div className="flex flex-col overflow-y-auto h-[40vh] gap-3">
            {talent?.map((tal: any, index: number) => (
              <div key={index} className="bg-white border rounded flex">
                <div onClick={() => handleProfilePopUp(tal?.talent)}>
                  {tal?.talent?.profilePic === "" && (
                    <img
                      src={Logo}
                      alt=""
                      width={260}
                      height={260}
                      style={{
                        borderRadius: 5,
                        height: 108,
                        width: 86,
                      }}
                      className=" hover:grayscale-0 grayscale "
                    />
                  )}
                  {tal?.talent?.profilePic && (
                    <img
                      src={tal?.talent?.profilePic}
                      alt=""
                      width={260}
                      height={260}
                      style={{ borderRadius: 5 }}
                      className=" hover:grayscale-0 grayscale  w-[196px] h-[162px] object-cover"
                    />
                  )}
                </div>
                <div className="p-2 w-full">
                  <div className="flex w-full justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {" "}
                      <p
                        className="text-[15px] font-medium cursor-pointer capitalize"
                        onClick={() => handleApplyPopUp(tal?.talent)}
                      >
                        {tal?.talent?.fullName}
                      </p>
                      <AiOutlineHeart />
                    </div>
                    <div className="flex items-center">
                      {tal?.talent?.metaData?.isActive && (
                        <div className="text-[#00AB26] text-[10px] font-normal">
                          Available
                        </div>
                      )}
                      {!tal?.talent?.metaData?.isActive && (
                        <div className="text-[#FF0000] text-[10px] font-normal">
                          Unavailable
                        </div>
                      )}
                      <div className="flex items-center">
                        <div className="text-[15px] p-0 px-2">|</div>
                        <p className="text-[10px] font-normal capitalize">
                          {/* Brand Ambassador */}
                          {tal?.talent?.opportunities}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    {" "}
                    <p className="text-[12px] font-normal mb-3 ">
                      {" "}
                      {truncateText(tal?.talent?.summary || "-", 20)}
                    </p>
                    <div className="flex flex-row text-[10px] font-normal">
                      <p className="border-r border-r-bm__faint__text pr-1 mr-1 capitalize">
                        {tal?.talent?.age || "-"}
                      </p>
                      <p className="border-r border-r-bm__faint__text pr-1 mr-1 capitalize">
                        {tal?.talent?.height || "-"}
                      </p>
                      {/* <p className="capitalize`">{tal?.talent?.address[0]?.city}</p> */}
                      <p className="border-r border-r-bm__faint__text pr-1 mr-1 capitalize">
                        {tal?.talent?.address[0]?.state || "-"}
                      </p>
                      {tal?.talent?.experience[0] && (
                        <p>{tal?.talent?.experience[0]?.agencyName || "-"}</p>
                      )}
                      {tal?.talent?.experience[1] && (
                        <p>{tal?.talent?.experience[1]?.agencyName || "-"}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="flex items-center gap-2 whitespace-nowrap ">
                      <div className=" border-r-2 pr-2 text-[10px] font-bold">
                        <span className="text-bm__ox__red text-[12px] font-semibold">
                          97% {"  "}
                        </span>
                        Work Success
                      </div>
                      <div className="text-[10px] font-bold">
                        <span className="text-bm__ox__red text-[12px] font-semibold">
                          4.5 {"  "}
                        </span>
                        Ratings
                      </div>
                    </div>{" "}
                  </div>
                  <div className="flex gap-4 justify-end">
                    <button
                      className="light__btn text-[14px] py-0"
                      style={{ width: "100px" }}
                    >
                      <div className="flex items-center gap-2">
                        <RiStackshareLine
                          style={{
                            fontSize: "1em",
                            flex: "none",
                          }}
                        />
                        <span>Share</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* </Card> */}
        </CardContent>
      </Card>
    </>
  );
};

export default HireTalents;
