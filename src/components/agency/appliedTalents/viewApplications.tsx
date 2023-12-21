import React, { ReactNode, useEffect, useState } from "react";
import { Card, CardContent } from "../../../ui/card";
import { Dialog, DialogContent, Overlay } from "@radix-ui/react-dialog";
import { TbMap2, TbProgressCheck } from "react-icons/tb";
import { ImCancelCircle, ImStatsDots } from "react-icons/im";
import { Separator } from "../../../ui/seperator";
import {
  MdFamilyRestroom,
  MdOutlineProductionQuantityLimits,
  MdPostAdd,
} from "react-icons/md";
import { BsFillCollectionFill } from "react-icons/bs";
import darkUnion from "../../assets/Union.png";
import subtract from "../../assets/Subtract.png";
import subtract2 from "../../assets/Subtract2.png";
import { Button } from "../../../ui/button";
import { useNavigate } from "react-router-dom";

import { AiOutlineEdit } from "react-icons/ai";
import {
  DayObject,
  daysOfWeek,
  // daysOfWeekx,
} from "../../agency/createproject/projectBudget";
import {
  AboutProjectProps,
  ProjectPostProps,
  ProjectProps,
  RequiredTalentsProps,
} from "../../../redux/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { campaignAuthAxiosInstance } from "../../../api/axios";
import { RiStackshareLine } from "react-icons/ri";
import ProfileTab from "./applicationTab/profileTab";
import ApplicationTab from "./applicationTab/applicationTab";
import MessageTab from "./applicationTab/messageTab";
// import ContractTab from "./applicationTab/contractTab";
import { ProfileView } from "./applicationTab";

const ViewApplication = ({
  popUp,
  setPopUp,
  select,
}: //   selectedProject,
{
  select: any;
  popUp: boolean;
  setPopUp: any;
  //   selectedProject: any;
  // workDays: [];
}) => {
  return (
    <div
      className={`fixed z-[1000] bg-black/50  w-[100%] items-center justify-end flex flex-col transition-all duration-1000 inset-0 ${
        popUp
          ? "translate-y-0 opacity-100 h-[100vh] -bottom-5"
          : "translate-y-[1000px] opacity-0 h-0"
      }`}
    >
      {/* <Card className="p-4 relative bg-white w-[1280px] h-[95vh]">
        <span className="absolute top-0 right-0 text-sm text-[#6F797A] p-6 flex items-center gap-8">
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
          <ImCancelCircle
            className="w-[20px] h-[20px] cursor-pointer"
            onClick={setPopUp}
          />
        </span>
        <div className="p-4">
          <p className="text-[18px] font-semibold">Talent Name</p>
        </div>
        <Separator className="bg-bm__gler/50" />
        <div className="flex items-center gap-7 px-7 my-7">
          <p className="text-[14px] cursor-pointer hover:underline">Profile</p>
          <p className="text-[14px] cursor-pointer hover:underline bg-red-500 w-[1000px]">
            Application
          </p>
          <p className="text-[14px] cursor-pointer hover:underline">Messages</p>

          <p className="text-[14px] cursor-pointer hover:underline">Contract</p>
        </div>
        <Separator className="bg-[#D7D8DA]" />
      </Card> */}
      <ProfileView popUp={popUp} setPopUp={setPopUp} selectedProject={null} />
    </div>
  );
};
// };

export default ViewApplication;
