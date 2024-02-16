import React, { useEffect } from "react";
import { Separator } from "../../../ui/seperator";
import { Card } from "../../../ui/card";
import Logo from "../../../assets/beauty.jpg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { AiOutlineHeart, AiOutlineMore } from "react-icons/ai";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { DialogFooter, DialogHeader } from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { authAxiosInstance } from "../../../api/axios";
import { TalentProps } from "../../../redux/types";
import TalentCard from "../TalentCard";

import beauty from "../../../assets/beauty.jpg";
import profile from "../../../assets/Profile 2 1.png";
import blue from "../../../assets/WhatsApp Image 2023-10-10 at 01.02 2.png";
import nivea from "../../../assets/IMG_2641 1.png";
import blue2 from "../../../assets/Profile 1 1.png";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { useState } from "react";
import { IoLocationSharp, IoShareSocial, IoStarHalf } from "react-icons/io5";
import { RiStackshareLine } from "react-icons/ri";
import girl1 from "../../../assets/Rectangle 11 (1).png";
import girl2 from "../../../assets/Gallery=Gallery6.png";
import girl3 from "../../../assets/Profile 1 1.png";
import girl4 from "../../../assets/Profile 2 1.png";
import girl5 from "../../../assets/Rectangle 11 (1).png";
import Age from "../../../assets/Age.png";
import height from "../../../assets/Height.png";
import post from "../../../assets/Project Post.png";
import category from "../../../assets/Category.png";
import group from "../../../assets/Group.png";

import { IoIosHeartEmpty } from "react-icons/io";
import { TalentsProps } from "../../../redux/talent.slice";
import HeartIcon from "../../../libs/HeartIcon";
import { Checkbox } from "../../../ui/checkbox";
import { RxPerson } from "react-icons/rx";
import Moment from "react-moment";

export const TalentList = ({
  talent,
  index,
  handleInvite,
  setSelectedProject,
  projects,
  setSelectedTalent,
  handleProfilePopUp,
  selectedTalent,
  setSelectedTalentID,
  selectedProject,
  setSuccessModal,
  successModal,
  handleCheckedChange,
  setModal,
  modal,
  checkInvite,
}: {
  checkInvite?: boolean;
  talent: any;
  index: number;
  handleInvite: any;
  setSelectedProject: any;
  projects: any;
  setSelectedTalent: any;
  handleProfilePopUp: (talent: TalentProps) => void;
  selectedTalent: any;
  selectedProject: any;
  setSelectedTalentID: any;
  setSuccessModal: any;
  successModal: boolean;
  setModal?: any;
  modal?: boolean;
  handleCheckedChange?: any;
}) => {
  const handleModalPop = () => {
    setSelectedTalentID(talent._id);
    setModal(!modal);
  };

  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const currentTime = new Date();

    let lastOnline: Date | string = talent.metaData.lastOnline; // Check the type of lastOnline before parsing
    // Parse the string into a Date object
    if (typeof lastOnline === "string") {
      lastOnline = new Date(lastOnline);
    }

    const timeDifference = currentTime.getTime() - lastOnline.getTime();
    if (timeDifference < 5 * 60 * 1000) {
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }
  }, []);

  if (checkInvite) {
    return (
      checkInvite &&
      talent?.isInvited && (
        <div key={index} className="bg-white border rounded flex">
          <div onClick={() => handleProfilePopUp(talent)}>
            {talent.profilePic === "" && (
              <div className="bg-black/70 w-[86px] h-[108px] rounded-md">
                {/* <img
              src={Logo}
              alt=""
              style={{
                borderRadius: 5,
              }}
              className=" hover:grayscale-0 grayscale w-full max-w-[86px] h-full max-h-[108px] object-cover"
            /> */}
                <RxPerson />
              </div>
            )}
            {talent.profilePic && (
              <div className="bg-black/70 w-[86px] h-[108px] rounded-md">
                <img
                  src={talent.profilePic}
                  alt=""
                  style={{ borderRadius: 5 }}
                  className=" hover:grayscale-0 grayscale w-full max-w-[86px] h-full max-h-[108px] object-cover"
                />
              </div>
            )}
          </div>
          <div className="p-2 w-full">
            <div className="flex w-full justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  onCheckedChange={() => handleCheckedChange(talent._id)}
                />

                <p className="text-[15px] font-medium capitalize">
                  {talent?.firstName}
                  {"   "}
                  {talent?.lastName}
                </p>
                <HeartIcon
                  selectedTalentID={talent?._id}
                  favorites={talent?.favorites}
                />
              </div>

              <div className="flex items-center ">
                {isOnline && (
                  <div className="text-[#00AB26] text-[10px] font-normal border-r-2 pr-2">
                    Available
                  </div>
                )}
                {!isOnline && (
                  <div className="text-[#FF0000] text-[10px] font-normal border-r-2 pr-2">
                    Unavailable
                  </div>
                )}
                <div className="capitalize pl-2   text-[10px]">
                  {talent?.opportunities[0]}
                </div>
              </div>
            </div>
            <div className="mb-3">
              {" "}
              <p className="text-[10px] font-normal">
                {" "}
                {talent?.summary || "-"}
              </p>
              <div className="flex flex-row text-[8px] font-normal">
                <p className="border-r border-r-bm__faint__text pr-1 mr-1">
                  {talent?.age}
                </p>
                <p className="border-r border-r-bm__faint__text pr-1 mr-1">
                  {talent?.height}
                </p>
                <p>{talent?.address[0]?.city}</p>,
                <p className="border-r border-r-bm__faint__text pr-1 mr-1">
                  {talent?.address[0]?.state}
                </p>
                {talent?.experience[0] && (
                  <p>{talent?.experience[0]?.agencyName},</p>
                )}
                {talent?.experience[1] && (
                  <p>{talent?.experience[1]?.agencyName},</p>
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
              <div className="flex gap-4">
                <button className="light__btn text-[10px]">Share</button>
                {talent?.isInvited ? (
                  <button
                    className="dark__btn text-[10px]"
                    // onClick={() => handleModalPop()}
                  >
                    Invited
                  </button>
                ) : (
                  <button
                    className="dark__btn text-[10px]"
                    onClick={() => handleModalPop()}
                  >
                    Invite
                  </button>
                )}{" "}
              </div>
            </div>
          </div>
        </div>
      )
    );
  }

  return (
    <div key={index} className="bg-white border rounded flex">
      <div onClick={() => handleProfilePopUp(talent)}>
        {talent.profilePic === "" && (
          <div className="bg-black/70 w-[86px] h-[108px] rounded-md">
            {/* <img
              src={Logo}
              alt=""
              style={{
                borderRadius: 5,
              }}
              className=" hover:grayscale-0 grayscale w-full max-w-[86px] h-full max-h-[108px] object-cover"
            /> */}
            {/* <RxPerson /> */}
            {talent.gender === "male" && (
              <img
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gU3ZnIFZlY3RvciBJY29ucyA6IGh0dHA6Ly93d3cub25saW5ld2ViZm9udHMuY29tL2ljb24gLS0+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjU2IDI1NiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8bWV0YWRhdGE+IFN2ZyBWZWN0b3IgSWNvbnMgOiBodHRwOi8vd3d3Lm9ubGluZXdlYmZvbnRzLmNvbS9pY29uIDwvbWV0YWRhdGE+DQo8Zz48Zz48Zz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNMTIzLjEsMTBDMTAyLjYsMTEuNCw4NCwyMy42LDc0LjksNDEuOGMtNC4zLDguNC01LjksMTUuNi01LjcsMjUuN2MwLjIsMjcuNywxMy4xLDU5LjcsMzAuNyw3Ni43YzksOC42LDE3LjcsMTIuOCwyNy40LDEyLjhjNSwwLjEsOC0wLjYsMTMuMS0zYzE1LjctNy4zLDMxLjYtMjguOSw0MC42LTU1LjJjNC41LTEzLjQsNi43LTI4LDUuNy0zNy44Yy0yLTE4LjMtMTIuOC0zNC42LTI4LjgtNDMuNkMxNDcuNCwxMS43LDEzNS45LDkuMywxMjMuMSwxMHogTTE0My4yLDUzLjJjNS41LDEuMyw5LjYsMi43LDE1LjgsNS40YzcuMywzLjEsMTUsNS4xLDIxLjIsNS41bDIuMSwwLjFsLTAuMSw0LjljLTAuNiwyMi44LTE0LDUzLjktMzAuMyw3MC40Yy0xMywxMy4yLTI1LjksMTUuNy0zOS42LDcuOGMtMTAtNS44LTE4LjgtMTYuMy0yNi4xLTMxLjJjLTUuNS0xMS4zLTkuOC0yNC45LTExLjUtMzYuMWMtMC42LTMuOC0wLjYtNC41LDAuMS02LjdjMS44LTUuNiw3LjEtMTIuNCwxMi4xLTE1LjRjNC4yLTIuNSw0LjMtMi41LDMsMC4xYy0yLjQsNC42LTMuNCwxMS0yLjYsMTYuNWMwLjgsNiwxLDYuMSwzLDIuNGM1LjUtMTAsMTIuOS0xOC40LDIwLjMtMjMuMWwxLjQtMC45bC0wLjksMS40Yy00LjgsNy4zLTcuMiwxNi45LTYuNiwyNi4zYzAuNSw4LjMsMC41LDguMyw1LDAuOWMyLjItMy41LDUuNi04LjYsNy42LTExLjNjNi45LTkuMywxNy42LTE4LjksMjAuNS0xOC4yQzEzOC4zLDUyLDE0MC44LDUyLjYsMTQzLjIsNTMuMnoiLz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNODUsMTU2LjljLTE0LjYsNC45LTIxLjgsNy43LTMxLjcsMTIuNWMtMjEsMTAuMy0zMi44LDIyLTM4LjcsMzguNmMtMyw4LjMtNS4zLDIyLjEtNC41LDI2LjhjMC42LDMuNiwyLjQsNy4zLDQuNCw4LjhjMy41LDIuNi0zLjIsMi41LDExMi4zLDIuNWMxMTcuMywwLDEwOC42LDAuMiwxMTMuMy0yLjljNC44LTMuMiw2LjUtNy44LDUuNy0xNS4zYy0zLjgtMzUuMi0yMy41LTUzLjYtNzYuNC03MS4zYy0xMi44LTQuMy0xMS44LTQuMi0xMS44LTEuOGMwLDcuMy01LjEsMTUuMy0xMiwxOC44Yy01LjQsMi43LTkuMSwzLjQtMTcuNiwzLjRjLTguNSwwLTEyLjItMC43LTE3LjYtMy40Yy02LjktMy41LTEyLTExLjUtMTItMTguOGMwLTEuMy0wLjItMi0wLjYtMkM5Ny41LDE1Mi44LDkxLjcsMTU0LjcsODUsMTU2Ljl6Ii8+PC9nPjwvZz48L2c+DQo8L3N2Zz4="
                width="256"
                height="256"
              />
            )}

            {talent.gender === "female" && (
              <img
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gU3ZnIFZlY3RvciBJY29ucyA6IGh0dHA6Ly93d3cub25saW5ld2ViZm9udHMuY29tL2ljb24gLS0+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjU2IDI1NiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8bWV0YWRhdGE+IFN2ZyBWZWN0b3IgSWNvbnMgOiBodHRwOi8vd3d3Lm9ubGluZXdlYmZvbnRzLmNvbS9pY29uIDwvbWV0YWRhdGE+DQo8Zz48Zz48Zz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNMTIzLjIsMTAuMmMtMTAuOSwwLjktMTcuOSw0LjItMjAuNyw5LjhjLTAuNiwxLjEtMS4zLDEuOS0xLjYsMS45Yy0wLjMsMC0yLjUsMC44LTQuOCwxLjdDODUuNywyOCw3NywzNi43LDcyLjQsNDcuNWMtNC43LDExLjEtNS4xLDIxLjItMS42LDQyLjVjMSw2LjIsMS40LDEwLDEuNCwxNi4xYzAuMSw4LjUtMC42LDExLjctMy41LDE5bC0xLjMsMy4xbDEuMywyLjFjMyw1LjEsMTEuNCwxMS4yLDIwLjEsMTQuNWwyLjgsMWwzLjgtMS4yYzExLjEtMy43LDE2LTguNSwxNi44LTE2LjRjMC40LTMuMSwwLjMtMy4yLTEuNC00LjZjLTguNi03LjEtMTUuMy0xNi4zLTE5LTI2LjNjLTEuMy0zLjUtMi43LTEwLjctMy4xLTE3Yy0wLjYtNywxLjUtMTEuMyw5LjktMjAuNGM0LjctNS4xLDcuOC0xMC4xLDEwLTE2LjNjMC41LTEuNCwxLTIuNywxLjEtMi43YzAuMS0wLjEsMS40LDEuMSwzLjEsMi43YzMsMyw4LjIsNS44LDEyLjQsNi44YzEuMywwLjMsNS41LDEsOS40LDEuNmMxMi40LDEuOCwxNC43LDMuNiwyMSwxNmMzLjYsNyw2LjcsMTEuMSwxMC4xLDEyLjhsMS44LDFsLTAuNCwzLjVjLTEuMywxMy4xLTksMjcuNC0xOS41LDM2LjJsLTMuNywzLjFsMC4zLDMuMmMwLjYsOC4xLDUuMiwxMi45LDE1LjksMTYuNWw0LjcsMS42bDQuNC0xLjhjMi41LTEsNi4yLTIuOSw4LjMtNC4yYzQuMi0yLjcsOS43LTcuOSwxMC43LTEwLjJjMC42LTEuNCwwLjUtMS45LTEuMi01LjNjLTEtMi4xLTIuMy01LjgtMi45LTguM2MtMS41LTYuMy0xLjItMTYsMS0yOGM0LjctMjUuNywxLjMtNDIuMS0xMS42LTU3LjZDMTYxLjYsMTYuMywxNDIuNCw4LjYsMTIzLjIsMTAuMnoiLz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNODgsMTQ3LjRjLTEuNCwwLjUtNy4zLDIuNy0xMy4zLDQuOGMtMTIuNyw0LjYtMjIuOCw5LjQtMjcuMSwxMi45Yy04LDYuNS0xMy44LDE4LTE2LjMsMzIuNGMtMi42LDE1LjIsMSwyNC4yLDEyLjQsMzAuOGMyMS4xLDEyLjMsNTguMiwxOS4xLDk1LjMsMTcuNGMyOC4yLTEuMyw1Mi40LTYuNyw2OS42LTE1LjVjNS44LTMsOC4yLTQuNywxMC45LTcuNWM0LjUtNC44LDYtMTAsNS42LTE4LjdjLTAuOS0xNS45LTcuNS0zMS4yLTE2LjgtMzguN2MtMy44LTMuMS0xMS4xLTYuOS0xOS05LjljLTctMi43LTI0LjItOS0yNC41LTljLTAuMSwwLTEsMS41LTIsMy40Yy01LjcsMTAuNS0xOS42LDI0LjUtMjkuMSwyOS41Yy00LjYsMi4zLTcuMSwyLjMtMTEuNywwYy05LjUtNS0yNC40LTIwLjItMjkuNC0zMGMtMC44LTEuNi0xLjctMy0xLjktM0M5MC43LDE0Ni40LDg5LjUsMTQ2LjgsODgsMTQ3LjR6Ii8+PC9nPjwvZz48L2c+DQo8L3N2Zz4="
                width="256"
                height="256"
              />
            )}
          </div>
        )}
        {talent.profilePic && (
          <div className="bg-black/70 w-[86px] h-[108px] rounded-md">
            <img
              src={talent.profilePic}
              alt=""
              style={{ borderRadius: 5 }}
              className=" hover:grayscale-0 grayscale w-full max-w-[86px] h-full max-h-[108px] object-cover"
            />
          </div>
        )}
      </div>
      <div className="p-2 w-full">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-3">
            <Checkbox onCheckedChange={() => handleCheckedChange(talent._id)} />

            <p className="text-[15px] font-medium capitalize">
              {talent?.firstName}
              {"   "}
              {talent?.lastName}
            </p>
            <HeartIcon
              selectedTalentID={talent?._id}
              favorites={talent?.favorites}
            />
          </div>

          <div className="flex items-center ">
            {isOnline && (
              <div className="text-[#00AB26] text-[10px] font-normal border-r-2 pr-2">
                Available
              </div>
            )}
            {!isOnline && (
              <div className="text-[#FF0000] text-[10px] font-normal border-r-2 pr-2">
                Unavailable
              </div>
            )}
            <div className="capitalize pl-2   text-[10px]">
              {talent?.opportunities[0]}
            </div>
          </div>
        </div>
        <div className="mb-3">
          {" "}
          <p className="text-[10px] font-normal"> {talent?.summary || "-"}</p>
          <div className="flex flex-row text-[8px] font-normal">
            <p className="border-r border-r-bm__faint__text pr-1 mr-1">
              {talent?.age}
            </p>
            <p className="border-r border-r-bm__faint__text pr-1 mr-1">
              {talent?.height}
            </p>
            <p>{talent?.address[0]?.city}</p>,
            <p className="border-r border-r-bm__faint__text pr-1 mr-1">
              {talent?.address[0]?.state}
            </p>
            {talent?.experience[0] && (
              <p>{talent?.experience[0]?.agencyName},</p>
            )}
            {talent?.experience[1] && (
              <p>{talent?.experience[1]?.agencyName},</p>
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
          <div className="flex gap-4">
            <button className="light__btn text-[10px]">Share</button>
            {talent?.isInvited ? (
              <button
                className="dark__btn text-[10px]"
                // onClick={() => handleModalPop()}
              >
                Invited
              </button>
            ) : (
              <button
                className="dark__btn text-[10px]"
                onClick={() => handleModalPop()}
              >
                Invite
              </button>
            )}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export const TalentGrid = ({
  _,
  handleProfilePopUp,
  setSelectedTalentID,
  setModal,
  modal,
  handleCheckedChange,
  preview,
  checkInvite,
}: {
  _: any;
  handleProfilePopUp?: (talent?: TalentProps) => void;
  setSelectedTalentID?: any;
  setModal: any;
  modal?: boolean;
  handleCheckedChange?: any;
  preview?: boolean;
  checkInvite?: boolean;
}) => {
  const slides = _.profilePic !== "" ? [_.profilePic] : [<RxPerson />];
  const dialogSlide = [girl1, girl2, girl5];
  const modalImage = [girl4, girl3, girl4];

  const [curr, setCurr] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [toggleDialog, setToggleDialog] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % dialogSlide.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + dialogSlide.length) % dialogSlide.length
    );
  };

  const openDialog = (index: any) => {
    setSelectedImageIndex(index);
    setToggleDialog(true);
  };

  const handleMouseEnter = (index: any) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  const prev = () => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };
  const next = () => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };
  const handleModalPop = () => {
    setSelectedTalentID(_._id);
    setModal(!modal);
  };

  const truncateWords = (text: string, maxWords: number) => {
    const words = text.split(" ");
    const truncated = words.slice(0, maxWords).join(" ");

    return truncated + (words.length > maxWords ? "..." : "");
  };

  const cityState = _?.address?.[0]?.city
    ? `${_.address[0].city} ${_?.address[0].state}`
    : "N/A";

  const truncatedCityState = truncateWords(cityState, 3);

  if (checkInvite) {
    return (
      checkInvite &&
      _?.isInvited && (
        <>
          <Card className="bg-white h-[262px] w-[196px]">
            <div className="h-[196px] overflow-hidden relative">
              <div className="absolute max-h-[40px] my-auto z-40  inset-0 flex items-center justify-between p-4">
                <button onClick={prev}>
                  <FaAngleLeft color="white" />
                </button>
                <button onClick={next}>
                  <FaAngleRight color="white" />
                </button>
              </div>
              <div className="absolute top-1 rounded-l-md right-0  z-50 bg-white flex  justify-between items-center    w-[54px] h-[30px] px-2">
                {/* <AiOutlineHeart /> */}
                <HeartIcon selectedTalentID={_._id} favorites={_.favorites} />
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <AiOutlineMore />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white p-3 space-y-2 shadow-sm rounded-sm border">
                    <DropdownMenuItem
                      className="hover:bg-black/10 flex items-center"
                      onClick={() => handleModalPop()}
                    >
                      <RiStackshareLine />
                      <span className="ml-2">Invite</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-bm__beige" />
                    <DropdownMenuItem className="hover:bg-black/10 flex items-center">
                      <IoShareSocial />
                      <span className="ml-2">Share</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div
                className="flex relative transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${curr * 100}%)` }}
              >
                <div className="relative flex">
                  {slides.map((s, index) => (
                    <div
                      className="w-[196px] h-[262px] relative"
                      key={index}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => openDialog(index)}
                    >
                      {_.profilePic !== "" && (
                        <img
                          src={s}
                          alt=""
                          className="z-50 hover:grayscale-0 grayscale  w-[196px] h-[262px] object-cover"
                          style={{ borderRadius: 5 }}
                        />
                      )}

                      {_.profilePic === "" && (
                        <div className="flex items-center justify-center">
                          {/* <RxPerson className=" text-[200px]" /> */}
                          {_.gender === "male" && (
                            <img
                              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gU3ZnIFZlY3RvciBJY29ucyA6IGh0dHA6Ly93d3cub25saW5ld2ViZm9udHMuY29tL2ljb24gLS0+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjU2IDI1NiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8bWV0YWRhdGE+IFN2ZyBWZWN0b3IgSWNvbnMgOiBodHRwOi8vd3d3Lm9ubGluZXdlYmZvbnRzLmNvbS9pY29uIDwvbWV0YWRhdGE+DQo8Zz48Zz48Zz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNMTIzLjEsMTBDMTAyLjYsMTEuNCw4NCwyMy42LDc0LjksNDEuOGMtNC4zLDguNC01LjksMTUuNi01LjcsMjUuN2MwLjIsMjcuNywxMy4xLDU5LjcsMzAuNyw3Ni43YzksOC42LDE3LjcsMTIuOCwyNy40LDEyLjhjNSwwLjEsOC0wLjYsMTMuMS0zYzE1LjctNy4zLDMxLjYtMjguOSw0MC42LTU1LjJjNC41LTEzLjQsNi43LTI4LDUuNy0zNy44Yy0yLTE4LjMtMTIuOC0zNC42LTI4LjgtNDMuNkMxNDcuNCwxMS43LDEzNS45LDkuMywxMjMuMSwxMHogTTE0My4yLDUzLjJjNS41LDEuMyw5LjYsMi43LDE1LjgsNS40YzcuMywzLjEsMTUsNS4xLDIxLjIsNS41bDIuMSwwLjFsLTAuMSw0LjljLTAuNiwyMi44LTE0LDUzLjktMzAuMyw3MC40Yy0xMywxMy4yLTI1LjksMTUuNy0zOS42LDcuOGMtMTAtNS44LTE4LjgtMTYuMy0yNi4xLTMxLjJjLTUuNS0xMS4zLTkuOC0yNC45LTExLjUtMzYuMWMtMC42LTMuOC0wLjYtNC41LDAuMS02LjdjMS44LTUuNiw3LjEtMTIuNCwxMi4xLTE1LjRjNC4yLTIuNSw0LjMtMi41LDMsMC4xYy0yLjQsNC42LTMuNCwxMS0yLjYsMTYuNWMwLjgsNiwxLDYuMSwzLDIuNGM1LjUtMTAsMTIuOS0xOC40LDIwLjMtMjMuMWwxLjQtMC45bC0wLjksMS40Yy00LjgsNy4zLTcuMiwxNi45LTYuNiwyNi4zYzAuNSw4LjMsMC41LDguMyw1LDAuOWMyLjItMy41LDUuNi04LjYsNy42LTExLjNjNi45LTkuMywxNy42LTE4LjksMjAuNS0xOC4yQzEzOC4zLDUyLDE0MC44LDUyLjYsMTQzLjIsNTMuMnoiLz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNODUsMTU2LjljLTE0LjYsNC45LTIxLjgsNy43LTMxLjcsMTIuNWMtMjEsMTAuMy0zMi44LDIyLTM4LjcsMzguNmMtMyw4LjMtNS4zLDIyLjEtNC41LDI2LjhjMC42LDMuNiwyLjQsNy4zLDQuNCw4LjhjMy41LDIuNi0zLjIsMi41LDExMi4zLDIuNWMxMTcuMywwLDEwOC42LDAuMiwxMTMuMy0yLjljNC44LTMuMiw2LjUtNy44LDUuNy0xNS4zYy0zLjgtMzUuMi0yMy41LTUzLjYtNzYuNC03MS4zYy0xMi44LTQuMy0xMS44LTQuMi0xMS44LTEuOGMwLDcuMy01LjEsMTUuMy0xMiwxOC44Yy01LjQsMi43LTkuMSwzLjQtMTcuNiwzLjRjLTguNSwwLTEyLjItMC43LTE3LjYtMy40Yy02LjktMy41LTEyLTExLjUtMTItMTguOGMwLTEuMy0wLjItMi0wLjYtMkM5Ny41LDE1Mi44LDkxLjcsMTU0LjcsODUsMTU2Ljl6Ii8+PC9nPjwvZz48L2c+DQo8L3N2Zz4="
                              width="256"
                              height="256"
                            />
                          )}
                          {_.gender === "" && (
                            <img
                              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gU3ZnIFZlY3RvciBJY29ucyA6IGh0dHA6Ly93d3cub25saW5ld2ViZm9udHMuY29tL2ljb24gLS0+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjU2IDI1NiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8bWV0YWRhdGE+IFN2ZyBWZWN0b3IgSWNvbnMgOiBodHRwOi8vd3d3Lm9ubGluZXdlYmZvbnRzLmNvbS9pY29uIDwvbWV0YWRhdGE+DQo8Zz48Zz48Zz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNMTIzLjEsMTBDMTAyLjYsMTEuNCw4NCwyMy42LDc0LjksNDEuOGMtNC4zLDguNC01LjksMTUuNi01LjcsMjUuN2MwLjIsMjcuNywxMy4xLDU5LjcsMzAuNyw3Ni43YzksOC42LDE3LjcsMTIuOCwyNy40LDEyLjhjNSwwLjEsOC0wLjYsMTMuMS0zYzE1LjctNy4zLDMxLjYtMjguOSw0MC42LTU1LjJjNC41LTEzLjQsNi43LTI4LDUuNy0zNy44Yy0yLTE4LjMtMTIuOC0zNC42LTI4LjgtNDMuNkMxNDcuNCwxMS43LDEzNS45LDkuMywxMjMuMSwxMHogTTE0My4yLDUzLjJjNS41LDEuMyw5LjYsMi43LDE1LjgsNS40YzcuMywzLjEsMTUsNS4xLDIxLjIsNS41bDIuMSwwLjFsLTAuMSw0LjljLTAuNiwyMi44LTE0LDUzLjktMzAuMyw3MC40Yy0xMywxMy4yLTI1LjksMTUuNy0zOS42LDcuOGMtMTAtNS44LTE4LjgtMTYuMy0yNi4xLTMxLjJjLTUuNS0xMS4zLTkuOC0yNC45LTExLjUtMzYuMWMtMC42LTMuOC0wLjYtNC41LDAuMS02LjdjMS44LTUuNiw3LjEtMTIuNCwxMi4xLTE1LjRjNC4yLTIuNSw0LjMtMi41LDMsMC4xYy0yLjQsNC42LTMuNCwxMS0yLjYsMTYuNWMwLjgsNiwxLDYuMSwzLDIuNGM1LjUtMTAsMTIuOS0xOC40LDIwLjMtMjMuMWwxLjQtMC45bC0wLjksMS40Yy00LjgsNy4zLTcuMiwxNi45LTYuNiwyNi4zYzAuNSw4LjMsMC41LDguMyw1LDAuOWMyLjItMy41LDUuNi04LjYsNy42LTExLjNjNi45LTkuMywxNy42LTE4LjksMjAuNS0xOC4yQzEzOC4zLDUyLDE0MC44LDUyLjYsMTQzLjIsNTMuMnoiLz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNODUsMTU2LjljLTE0LjYsNC45LTIxLjgsNy43LTMxLjcsMTIuNWMtMjEsMTAuMy0zMi44LDIyLTM4LjcsMzguNmMtMyw4LjMtNS4zLDIyLjEtNC41LDI2LjhjMC42LDMuNiwyLjQsNy4zLDQuNCw4LjhjMy41LDIuNi0zLjIsMi41LDExMi4zLDIuNWMxMTcuMywwLDEwOC42LDAuMiwxMTMuMy0yLjljNC44LTMuMiw2LjUtNy44LDUuNy0xNS4zYy0zLjgtMzUuMi0yMy41LTUzLjYtNzYuNC03MS4zYy0xMi44LTQuMy0xMS44LTQuMi0xMS44LTEuOGMwLDcuMy01LjEsMTUuMy0xMiwxOC44Yy01LjQsMi43LTkuMSwzLjQtMTcuNiwzLjRjLTguNSwwLTEyLjItMC43LTE3LjYtMy40Yy02LjktMy41LTEyLTExLjUtMTItMTguOGMwLTEuMy0wLjItMi0wLjYtMkM5Ny41LDE1Mi44LDkxLjcsMTU0LjcsODUsMTU2Ljl6Ii8+PC9nPjwvZz48L2c+DQo8L3N2Zz4="
                              width="256"
                              height="256"
                            />
                          )}

                          {_.gender === "female" && (
                            <img
                              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gU3ZnIFZlY3RvciBJY29ucyA6IGh0dHA6Ly93d3cub25saW5ld2ViZm9udHMuY29tL2ljb24gLS0+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjU2IDI1NiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8bWV0YWRhdGE+IFN2ZyBWZWN0b3IgSWNvbnMgOiBodHRwOi8vd3d3Lm9ubGluZXdlYmZvbnRzLmNvbS9pY29uIDwvbWV0YWRhdGE+DQo8Zz48Zz48Zz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNMTIzLjIsMTAuMmMtMTAuOSwwLjktMTcuOSw0LjItMjAuNyw5LjhjLTAuNiwxLjEtMS4zLDEuOS0xLjYsMS45Yy0wLjMsMC0yLjUsMC44LTQuOCwxLjdDODUuNywyOCw3NywzNi43LDcyLjQsNDcuNWMtNC43LDExLjEtNS4xLDIxLjItMS42LDQyLjVjMSw2LjIsMS40LDEwLDEuNCwxNi4xYzAuMSw4LjUtMC42LDExLjctMy41LDE5bC0xLjMsMy4xbDEuMywyLjFjMyw1LjEsMTEuNCwxMS4yLDIwLjEsMTQuNWwyLjgsMWwzLjgtMS4yYzExLjEtMy43LDE2LTguNSwxNi44LTE2LjRjMC40LTMuMSwwLjMtMy4yLTEuNC00LjZjLTguNi03LjEtMTUuMy0xNi4zLTE5LTI2LjNjLTEuMy0zLjUtMi43LTEwLjctMy4xLTE3Yy0wLjYtNywxLjUtMTEuMyw5LjktMjAuNGM0LjctNS4xLDcuOC0xMC4xLDEwLTE2LjNjMC41LTEuNCwxLTIuNywxLjEtMi43YzAuMS0wLjEsMS40LDEuMSwzLjEsMi43YzMsMyw4LjIsNS44LDEyLjQsNi44YzEuMywwLjMsNS41LDEsOS40LDEuNmMxMi40LDEuOCwxNC43LDMuNiwyMSwxNmMzLjYsNyw2LjcsMTEuMSwxMC4xLDEyLjhsMS44LDFsLTAuNCwzLjVjLTEuMywxMy4xLTksMjcuNC0xOS41LDM2LjJsLTMuNywzLjFsMC4zLDMuMmMwLjYsOC4xLDUuMiwxMi45LDE1LjksMTYuNWw0LjcsMS42bDQuNC0xLjhjMi41LTEsNi4yLTIuOSw4LjMtNC4yYzQuMi0yLjcsOS43LTcuOSwxMC43LTEwLjJjMC42LTEuNCwwLjUtMS45LTEuMi01LjNjLTEtMi4xLTIuMy01LjgtMi45LTguM2MtMS41LTYuMy0xLjItMTYsMS0yOGM0LjctMjUuNywxLjMtNDIuMS0xMS42LTU3LjZDMTYxLjYsMTYuMywxNDIuNCw4LjYsMTIzLjIsMTAuMnoiLz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNODgsMTQ3LjRjLTEuNCwwLjUtNy4zLDIuNy0xMy4zLDQuOGMtMTIuNyw0LjYtMjIuOCw5LjQtMjcuMSwxMi45Yy04LDYuNS0xMy44LDE4LTE2LjMsMzIuNGMtMi42LDE1LjIsMSwyNC4yLDEyLjQsMzAuOGMyMS4xLDEyLjMsNTguMiwxOS4xLDk1LjMsMTcuNGMyOC4yLTEuMyw1Mi40LTYuNyw2OS42LTE1LjVjNS44LTMsOC4yLTQuNywxMC45LTcuNWM0LjUtNC44LDYtMTAsNS42LTE4LjdjLTAuOS0xNS45LTcuNS0zMS4yLTE2LjgtMzguN2MtMy44LTMuMS0xMS4xLTYuOS0xOS05LjljLTctMi43LTI0LjItOS0yNC41LTljLTAuMSwwLTEsMS41LTIsMy40Yy01LjcsMTAuNS0xOS42LDI0LjUtMjkuMSwyOS41Yy00LjYsMi4zLTcuMSwyLjMtMTEuNywwYy05LjUtNS0yNC40LTIwLjItMjkuNC0zMGMtMC44LTEuNi0xLjctMy0xLjktM0M5MC43LDE0Ni40LDg5LjUsMTQ2LjgsODgsMTQ3LjR6Ii8+PC9nPjwvZz48L2c+DQo8L3N2Zz4="
                              width="256"
                              height="256"
                            />
                          )}
                        </div>
                      )}
                      {hoveredIndex === index && (
                        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 h-[50%] z-10">
                          <div className="flex flex-col m-2">
                            <div className="flex items-center space-x-4 mb-1">
                              <div className="flex items-center space-x-1">
                                <img src={Age} alt="" />
                                <div className="text-[8px] font-medium">
                                  <Moment format="D ">{_?.DOB}</Moment>
                                  years
                                </div>
                              </div>
                              <div className="flex items-center space-x-1">
                                <img src={height} alt="" />
                                <div className="text-[8px] font-medium">
                                  {_?.height}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 mb-1">
                              <img
                                src={post}
                                alt=""
                                className="h-[12px] w-[12px]"
                              />
                              <div className="text-[8px] font-medium flex gap-2 flex-wrap">
                                {/* Nivea, Coca Cola, Pepsi, Noemdek */}
                                {_?.experience.map(
                                  (ex: { agencyName: string }, idx: number) => {
                                    return <div key={idx}>{ex.agencyName}</div>;
                                  }
                                ) || "-"}
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <img
                                src={category}
                                alt=""
                                className="h-[12px] w-[12px]"
                              />
                              <div className="text-[8px] font-medium flex gap-2 flex-wrap">
                                {/* In-Store, Open Market, Traffic */}
                                {_?.experience.map(
                                  (
                                    ex: {
                                      projectCategory: string;
                                    },
                                    idx: number
                                  ) => {
                                    return (
                                      <div key={idx}>{ex.projectCategory}</div>
                                    );
                                  }
                                ) || "-"}
                              </div>
                            </div>
                            {/* <div className="flex items-center space-x-1">
                          <img
                            src={group}
                            alt=""
                            className="h-[12px] w-[12px]"
                          />
                          <div className="text-[8px] font-medium">97%</div>
                        </div> */}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <Dialog open={toggleDialog} onOpenChange={setToggleDialog}>
                  <DialogContent className="bg-white p-0 flex flex-col items-center">
                    <div className="flex items-center space-x-3 mt-2 mb-4">
                      <div className="flex items-center space-x-3">
                        <p className="text-[18px] font-medium">
                          Gloria Michael
                        </p>
                        <span className="bg-[#00AB26] h-2 w-2 rounded-full"></span>
                        <div className="border-l border-[#D7D8DA] h-8"></div>
                        <p className="text-[12px] font-medium text-[#252525]">
                          Ikeja, Lagos
                        </p>
                        <div className="flex items-center space-x-1">
                          <IoStarHalf />
                          <div className="border-l border-[#D7D8DA] h-8"></div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <IoIosHeartEmpty />
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="hover:bg-black/10 flex items-center">
                            <IoShareSocial />
                            <span className="ml-2">Share</span>
                          </div>
                          <div className="hover:bg-black/10">Invite</div>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <img
                        src={modalImage[currentImageIndex]}
                        alt={`girl-${currentImageIndex + 1}`}
                        width={400}
                        height={533}
                        className=" h-full w-full"
                        onClick={() => handleImageClick(currentImageIndex)}
                      />
                      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-row items-center justify-between px-4 mt-2">
                        <button
                          onClick={handlePrevImage}
                          style={{ color: "white" }}
                        >
                          &lt;
                        </button>
                        <button
                          onClick={handleNextImage}
                          style={{ color: "white" }}
                        >
                          &gt;
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-row items-center flex-wrap p-0 m-0">
                      {dialogSlide.slice(0, 7).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`girl-${index + 1}`}
                          className="h-[80px]"
                        />
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {handleProfilePopUp && (
              <div className="px-1 cursor-pointer">
                <div className="flex items-center gap-3 whitespace-nowrap px-2 py-1">
                  {preview && (
                    <Checkbox
                      onCheckedChange={() => handleCheckedChange(_._id)}
                    />
                  )}

                  <p
                    className="text-[12px] font-medium capitalize"
                    onClick={() => handleProfilePopUp(_)}
                  >
                    {_?.firstName} {_?.lastName}
                  </p>
                  <span className="bg-[#00AB26] h-2 w-2 rounded-full"></span>
                </div>
                <Separator />
                <div className="flex items-center gap-2 whitespace-nowrap px-2 py-1">
                  <div className="flex items-center gap-2">
                    <IoLocationSharp />
                    <p className="text-[10px] font-medium leading-3 text-[#252525] capitalize">
                      {truncatedCityState}
                    </p>
                  </div>
                  <div className="w-[1px] h-3 bg-[#D7D8DA]"></div>
                  <div className="flex items-center gap-2">
                    {/* <IoStarHalf />
                <p>4.5</p> */}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </>
      )
    );
  }

  return (
    <>
      <Card className="bg-white h-[262px] w-[196px]">
        <div className="h-[196px] overflow-hidden relative">
          <div className="absolute max-h-[40px] my-auto z-40  inset-0 flex items-center justify-between p-4">
            <button onClick={prev}>
              <FaAngleLeft color="white" />
            </button>
            <button onClick={next}>
              <FaAngleRight color="white" />
            </button>
          </div>
          <div className="absolute top-1 rounded-l-md right-0  z-50 bg-white flex  justify-between items-center    w-[54px] h-[30px] px-2">
            {/* <AiOutlineHeart /> */}
            <HeartIcon selectedTalentID={_._id} favorites={_.favorites} />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <AiOutlineMore />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white p-3 space-y-2 shadow-sm rounded-sm border">
                <DropdownMenuItem
                  className="hover:bg-black/10 flex items-center"
                  onClick={() => handleModalPop()}
                >
                  <RiStackshareLine />
                  <span className="ml-2">Invite</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-bm__beige" />
                <DropdownMenuItem className="hover:bg-black/10 flex items-center">
                  <IoShareSocial />
                  <span className="ml-2">Share</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div
            className="flex relative transition-transform ease-out duration-500"
            style={{ transform: `translateX(-${curr * 100}%)` }}
          >
            <div className="relative flex">
              {slides.map((s, index) => (
                <div
                  className="w-[196px] h-[262px] relative"
                  key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => openDialog(index)}
                >
                  {_.profilePic !== "" && (
                    <img
                      src={s}
                      alt=""
                      className="z-50 hover:grayscale-0 grayscale  w-[196px] h-[262px] object-cover"
                      style={{ borderRadius: 5 }}
                    />
                  )}

                  {_.profilePic === "" && (
                    <div className="flex items-center justify-center">
                      {/* <RxPerson className=" text-[200px]" /> */}
                      {_.gender === "male" && (
                        <img
                          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gU3ZnIFZlY3RvciBJY29ucyA6IGh0dHA6Ly93d3cub25saW5ld2ViZm9udHMuY29tL2ljb24gLS0+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjU2IDI1NiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8bWV0YWRhdGE+IFN2ZyBWZWN0b3IgSWNvbnMgOiBodHRwOi8vd3d3Lm9ubGluZXdlYmZvbnRzLmNvbS9pY29uIDwvbWV0YWRhdGE+DQo8Zz48Zz48Zz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNMTIzLjEsMTBDMTAyLjYsMTEuNCw4NCwyMy42LDc0LjksNDEuOGMtNC4zLDguNC01LjksMTUuNi01LjcsMjUuN2MwLjIsMjcuNywxMy4xLDU5LjcsMzAuNyw3Ni43YzksOC42LDE3LjcsMTIuOCwyNy40LDEyLjhjNSwwLjEsOC0wLjYsMTMuMS0zYzE1LjctNy4zLDMxLjYtMjguOSw0MC42LTU1LjJjNC41LTEzLjQsNi43LTI4LDUuNy0zNy44Yy0yLTE4LjMtMTIuOC0zNC42LTI4LjgtNDMuNkMxNDcuNCwxMS43LDEzNS45LDkuMywxMjMuMSwxMHogTTE0My4yLDUzLjJjNS41LDEuMyw5LjYsMi43LDE1LjgsNS40YzcuMywzLjEsMTUsNS4xLDIxLjIsNS41bDIuMSwwLjFsLTAuMSw0LjljLTAuNiwyMi44LTE0LDUzLjktMzAuMyw3MC40Yy0xMywxMy4yLTI1LjksMTUuNy0zOS42LDcuOGMtMTAtNS44LTE4LjgtMTYuMy0yNi4xLTMxLjJjLTUuNS0xMS4zLTkuOC0yNC45LTExLjUtMzYuMWMtMC42LTMuOC0wLjYtNC41LDAuMS02LjdjMS44LTUuNiw3LjEtMTIuNCwxMi4xLTE1LjRjNC4yLTIuNSw0LjMtMi41LDMsMC4xYy0yLjQsNC42LTMuNCwxMS0yLjYsMTYuNWMwLjgsNiwxLDYuMSwzLDIuNGM1LjUtMTAsMTIuOS0xOC40LDIwLjMtMjMuMWwxLjQtMC45bC0wLjksMS40Yy00LjgsNy4zLTcuMiwxNi45LTYuNiwyNi4zYzAuNSw4LjMsMC41LDguMyw1LDAuOWMyLjItMy41LDUuNi04LjYsNy42LTExLjNjNi45LTkuMywxNy42LTE4LjksMjAuNS0xOC4yQzEzOC4zLDUyLDE0MC44LDUyLjYsMTQzLjIsNTMuMnoiLz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNODUsMTU2LjljLTE0LjYsNC45LTIxLjgsNy43LTMxLjcsMTIuNWMtMjEsMTAuMy0zMi44LDIyLTM4LjcsMzguNmMtMyw4LjMtNS4zLDIyLjEtNC41LDI2LjhjMC42LDMuNiwyLjQsNy4zLDQuNCw4LjhjMy41LDIuNi0zLjIsMi41LDExMi4zLDIuNWMxMTcuMywwLDEwOC42LDAuMiwxMTMuMy0yLjljNC44LTMuMiw2LjUtNy44LDUuNy0xNS4zYy0zLjgtMzUuMi0yMy41LTUzLjYtNzYuNC03MS4zYy0xMi44LTQuMy0xMS44LTQuMi0xMS44LTEuOGMwLDcuMy01LjEsMTUuMy0xMiwxOC44Yy01LjQsMi43LTkuMSwzLjQtMTcuNiwzLjRjLTguNSwwLTEyLjItMC43LTE3LjYtMy40Yy02LjktMy41LTEyLTExLjUtMTItMTguOGMwLTEuMy0wLjItMi0wLjYtMkM5Ny41LDE1Mi44LDkxLjcsMTU0LjcsODUsMTU2Ljl6Ii8+PC9nPjwvZz48L2c+DQo8L3N2Zz4="
                          width="256"
                          height="256"
                        />
                      )}
                      {_.gender === "" && (
                        <img
                          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gU3ZnIFZlY3RvciBJY29ucyA6IGh0dHA6Ly93d3cub25saW5ld2ViZm9udHMuY29tL2ljb24gLS0+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjU2IDI1NiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8bWV0YWRhdGE+IFN2ZyBWZWN0b3IgSWNvbnMgOiBodHRwOi8vd3d3Lm9ubGluZXdlYmZvbnRzLmNvbS9pY29uIDwvbWV0YWRhdGE+DQo8Zz48Zz48Zz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNMTIzLjEsMTBDMTAyLjYsMTEuNCw4NCwyMy42LDc0LjksNDEuOGMtNC4zLDguNC01LjksMTUuNi01LjcsMjUuN2MwLjIsMjcuNywxMy4xLDU5LjcsMzAuNyw3Ni43YzksOC42LDE3LjcsMTIuOCwyNy40LDEyLjhjNSwwLjEsOC0wLjYsMTMuMS0zYzE1LjctNy4zLDMxLjYtMjguOSw0MC42LTU1LjJjNC41LTEzLjQsNi43LTI4LDUuNy0zNy44Yy0yLTE4LjMtMTIuOC0zNC42LTI4LjgtNDMuNkMxNDcuNCwxMS43LDEzNS45LDkuMywxMjMuMSwxMHogTTE0My4yLDUzLjJjNS41LDEuMyw5LjYsMi43LDE1LjgsNS40YzcuMywzLjEsMTUsNS4xLDIxLjIsNS41bDIuMSwwLjFsLTAuMSw0LjljLTAuNiwyMi44LTE0LDUzLjktMzAuMyw3MC40Yy0xMywxMy4yLTI1LjksMTUuNy0zOS42LDcuOGMtMTAtNS44LTE4LjgtMTYuMy0yNi4xLTMxLjJjLTUuNS0xMS4zLTkuOC0yNC45LTExLjUtMzYuMWMtMC42LTMuOC0wLjYtNC41LDAuMS02LjdjMS44LTUuNiw3LjEtMTIuNCwxMi4xLTE1LjRjNC4yLTIuNSw0LjMtMi41LDMsMC4xYy0yLjQsNC42LTMuNCwxMS0yLjYsMTYuNWMwLjgsNiwxLDYuMSwzLDIuNGM1LjUtMTAsMTIuOS0xOC40LDIwLjMtMjMuMWwxLjQtMC45bC0wLjksMS40Yy00LjgsNy4zLTcuMiwxNi45LTYuNiwyNi4zYzAuNSw4LjMsMC41LDguMyw1LDAuOWMyLjItMy41LDUuNi04LjYsNy42LTExLjNjNi45LTkuMywxNy42LTE4LjksMjAuNS0xOC4yQzEzOC4zLDUyLDE0MC44LDUyLjYsMTQzLjIsNTMuMnoiLz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNODUsMTU2LjljLTE0LjYsNC45LTIxLjgsNy43LTMxLjcsMTIuNWMtMjEsMTAuMy0zMi44LDIyLTM4LjcsMzguNmMtMyw4LjMtNS4zLDIyLjEtNC41LDI2LjhjMC42LDMuNiwyLjQsNy4zLDQuNCw4LjhjMy41LDIuNi0zLjIsMi41LDExMi4zLDIuNWMxMTcuMywwLDEwOC42LDAuMiwxMTMuMy0yLjljNC44LTMuMiw2LjUtNy44LDUuNy0xNS4zYy0zLjgtMzUuMi0yMy41LTUzLjYtNzYuNC03MS4zYy0xMi44LTQuMy0xMS44LTQuMi0xMS44LTEuOGMwLDcuMy01LjEsMTUuMy0xMiwxOC44Yy01LjQsMi43LTkuMSwzLjQtMTcuNiwzLjRjLTguNSwwLTEyLjItMC43LTE3LjYtMy40Yy02LjktMy41LTEyLTExLjUtMTItMTguOGMwLTEuMy0wLjItMi0wLjYtMkM5Ny41LDE1Mi44LDkxLjcsMTU0LjcsODUsMTU2Ljl6Ii8+PC9nPjwvZz48L2c+DQo8L3N2Zz4="
                          width="256"
                          height="256"
                        />
                      )}

                      {_.gender === "female" && (
                        <img
                          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gU3ZnIFZlY3RvciBJY29ucyA6IGh0dHA6Ly93d3cub25saW5ld2ViZm9udHMuY29tL2ljb24gLS0+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjU2IDI1NiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8bWV0YWRhdGE+IFN2ZyBWZWN0b3IgSWNvbnMgOiBodHRwOi8vd3d3Lm9ubGluZXdlYmZvbnRzLmNvbS9pY29uIDwvbWV0YWRhdGE+DQo8Zz48Zz48Zz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNMTIzLjIsMTAuMmMtMTAuOSwwLjktMTcuOSw0LjItMjAuNyw5LjhjLTAuNiwxLjEtMS4zLDEuOS0xLjYsMS45Yy0wLjMsMC0yLjUsMC44LTQuOCwxLjdDODUuNywyOCw3NywzNi43LDcyLjQsNDcuNWMtNC43LDExLjEtNS4xLDIxLjItMS42LDQyLjVjMSw2LjIsMS40LDEwLDEuNCwxNi4xYzAuMSw4LjUtMC42LDExLjctMy41LDE5bC0xLjMsMy4xbDEuMywyLjFjMyw1LjEsMTEuNCwxMS4yLDIwLjEsMTQuNWwyLjgsMWwzLjgtMS4yYzExLjEtMy43LDE2LTguNSwxNi44LTE2LjRjMC40LTMuMSwwLjMtMy4yLTEuNC00LjZjLTguNi03LjEtMTUuMy0xNi4zLTE5LTI2LjNjLTEuMy0zLjUtMi43LTEwLjctMy4xLTE3Yy0wLjYtNywxLjUtMTEuMyw5LjktMjAuNGM0LjctNS4xLDcuOC0xMC4xLDEwLTE2LjNjMC41LTEuNCwxLTIuNywxLjEtMi43YzAuMS0wLjEsMS40LDEuMSwzLjEsMi43YzMsMyw4LjIsNS44LDEyLjQsNi44YzEuMywwLjMsNS41LDEsOS40LDEuNmMxMi40LDEuOCwxNC43LDMuNiwyMSwxNmMzLjYsNyw2LjcsMTEuMSwxMC4xLDEyLjhsMS44LDFsLTAuNCwzLjVjLTEuMywxMy4xLTksMjcuNC0xOS41LDM2LjJsLTMuNywzLjFsMC4zLDMuMmMwLjYsOC4xLDUuMiwxMi45LDE1LjksMTYuNWw0LjcsMS42bDQuNC0xLjhjMi41LTEsNi4yLTIuOSw4LjMtNC4yYzQuMi0yLjcsOS43LTcuOSwxMC43LTEwLjJjMC42LTEuNCwwLjUtMS45LTEuMi01LjNjLTEtMi4xLTIuMy01LjgtMi45LTguM2MtMS41LTYuMy0xLjItMTYsMS0yOGM0LjctMjUuNywxLjMtNDIuMS0xMS42LTU3LjZDMTYxLjYsMTYuMywxNDIuNCw4LjYsMTIzLjIsMTAuMnoiLz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNODgsMTQ3LjRjLTEuNCwwLjUtNy4zLDIuNy0xMy4zLDQuOGMtMTIuNyw0LjYtMjIuOCw5LjQtMjcuMSwxMi45Yy04LDYuNS0xMy44LDE4LTE2LjMsMzIuNGMtMi42LDE1LjIsMSwyNC4yLDEyLjQsMzAuOGMyMS4xLDEyLjMsNTguMiwxOS4xLDk1LjMsMTcuNGMyOC4yLTEuMyw1Mi40LTYuNyw2OS42LTE1LjVjNS44LTMsOC4yLTQuNywxMC45LTcuNWM0LjUtNC44LDYtMTAsNS42LTE4LjdjLTAuOS0xNS45LTcuNS0zMS4yLTE2LjgtMzguN2MtMy44LTMuMS0xMS4xLTYuOS0xOS05LjljLTctMi43LTI0LjItOS0yNC41LTljLTAuMSwwLTEsMS41LTIsMy40Yy01LjcsMTAuNS0xOS42LDI0LjUtMjkuMSwyOS41Yy00LjYsMi4zLTcuMSwyLjMtMTEuNywwYy05LjUtNS0yNC40LTIwLjItMjkuNC0zMGMtMC44LTEuNi0xLjctMy0xLjktM0M5MC43LDE0Ni40LDg5LjUsMTQ2LjgsODgsMTQ3LjR6Ii8+PC9nPjwvZz48L2c+DQo8L3N2Zz4="
                          width="256"
                          height="256"
                        />
                      )}
                    </div>
                  )}
                  {hoveredIndex === index && (
                    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 h-[50%] z-10">
                      <div className="flex flex-col m-2">
                        <div className="flex items-center space-x-4 mb-1">
                          <div className="flex items-center space-x-1">
                            <img src={Age} alt="" />
                            <div className="text-[8px] font-medium">
                              <Moment format="D ">{_?.DOB}</Moment>
                              years
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <img src={height} alt="" />
                            <div className="text-[8px] font-medium">
                              {_?.height}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 mb-1">
                          <img
                            src={post}
                            alt=""
                            className="h-[12px] w-[12px]"
                          />
                          <div className="text-[8px] font-medium flex gap-2 flex-wrap">
                            {/* Nivea, Coca Cola, Pepsi, Noemdek */}
                            {_?.experience.map(
                              (ex: { agencyName: string }, idx: number) => {
                                return <div key={idx}>{ex.agencyName}</div>;
                              }
                            ) || "-"}
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <img
                            src={category}
                            alt=""
                            className="h-[12px] w-[12px]"
                          />
                          <div className="text-[8px] font-medium flex gap-2 flex-wrap">
                            {/* In-Store, Open Market, Traffic */}
                            {_?.experience.map(
                              (
                                ex: {
                                  projectCategory: string;
                                },
                                idx: number
                              ) => {
                                return (
                                  <div key={idx}>{ex.projectCategory}</div>
                                );
                              }
                            ) || "-"}
                          </div>
                        </div>
                        {/* <div className="flex items-center space-x-1">
                          <img
                            src={group}
                            alt=""
                            className="h-[12px] w-[12px]"
                          />
                          <div className="text-[8px] font-medium">97%</div>
                        </div> */}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Dialog open={toggleDialog} onOpenChange={setToggleDialog}>
              <DialogContent className="bg-white p-0 flex flex-col items-center">
                <div className="flex items-center space-x-3 mt-2 mb-4">
                  <div className="flex items-center space-x-3">
                    <p className="text-[18px] font-medium">Gloria Michael</p>
                    <span className="bg-[#00AB26] h-2 w-2 rounded-full"></span>
                    <div className="border-l border-[#D7D8DA] h-8"></div>
                    <p className="text-[12px] font-medium text-[#252525]">
                      Ikeja, Lagos
                    </p>
                    <div className="flex items-center space-x-1">
                      <IoStarHalf />
                      <div className="border-l border-[#D7D8DA] h-8"></div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <IoIosHeartEmpty />
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="hover:bg-black/10 flex items-center">
                        <IoShareSocial />
                        <span className="ml-2">Share</span>
                      </div>
                      <div className="hover:bg-black/10">Invite</div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src={modalImage[currentImageIndex]}
                    alt={`girl-${currentImageIndex + 1}`}
                    width={400}
                    height={533}
                    className=" h-full w-full"
                    onClick={() => handleImageClick(currentImageIndex)}
                  />
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-row items-center justify-between px-4 mt-2">
                    <button
                      onClick={handlePrevImage}
                      style={{ color: "white" }}
                    >
                      &lt;
                    </button>
                    <button
                      onClick={handleNextImage}
                      style={{ color: "white" }}
                    >
                      &gt;
                    </button>
                  </div>
                </div>

                <div className="flex flex-row items-center flex-wrap p-0 m-0">
                  {dialogSlide.slice(0, 7).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`girl-${index + 1}`}
                      className="h-[80px]"
                    />
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {handleProfilePopUp && (
          <div className="px-1 cursor-pointer">
            <div className="flex items-center gap-3 whitespace-nowrap px-2 py-1">
              {preview && (
                <Checkbox onCheckedChange={() => handleCheckedChange(_._id)} />
              )}

              <p
                className="text-[12px] font-medium capitalize"
                onClick={() => handleProfilePopUp(_)}
              >
                {_?.firstName} {_?.lastName}
              </p>
              <span className="bg-[#00AB26] h-2 w-2 rounded-full"></span>
            </div>
            <Separator />
            <div className="flex items-center gap-2 whitespace-nowrap px-2 py-1">
              <div className="flex items-center gap-2">
                <IoLocationSharp />
                <p className="text-[10px] font-medium leading-3 text-[#252525] capitalize">
                  {truncatedCityState}
                </p>
              </div>
              <div className="w-[1px] h-3 bg-[#D7D8DA]"></div>
              <div className="flex items-center gap-2">
                {/* <IoStarHalf />
                <p>4.5</p> */}
              </div>
            </div>
          </div>
        )}
      </Card>
    </>
  );
};

export const TalentGrids = ({
  _,
  idx,
  handleInvite,
  setSelectedProject,
  projects,
  setSelectedTalent,
  handleProfilePopUp,
  selectedTalent,
  setSelectedTalentID,
  selectedProject,
  setSuccessModal,
  successModal,
  setModal,
  modal,
}: {
  _: any;
  idx?: number;
  handleInvite?: any;
  setSelectedProject?: any;
  projects?: any;
  setSelectedTalent?: any;
  handleProfilePopUp?: (talent?: TalentProps) => void;
  selectedTalent?: any;
  selectedProject?: any;
  setSelectedTalentID?: any;
  setSuccessModal?: any;
  successModal?: boolean;
  setModal: any;
  modal?: boolean;
}) => {
  // const slides = [beauty, profile, blue, nivea, blue2];
  const slides =
    _?.talent?.profilePic !== ""
      ? [_?.talent?.profilePic]
      : [beauty, profile, blue, nivea, blue2];
  const dialogSlide = [girl1, girl2, girl5];
  const modalImage = [girl4, girl3, girl4];

  const [curr, setCurr] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [toggleDialog, setToggleDialog] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % dialogSlide.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + dialogSlide.length) % dialogSlide.length
    );
  };

  const openDialog = (index: any) => {
    setSelectedImageIndex(index);
    setToggleDialog(true);
  };

  const handleMouseEnter = (index: any) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  const prev = () => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };
  const next = () => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };
  const handleModalPop = () => {
    setSelectedTalentID(_._id);
    setModal(!modal);
  };

  const truncateWords = (text: string, maxWords: number) => {
    const words = text.split(" ");
    const truncated = words.slice(0, maxWords).join(" ");

    return truncated + (words.length > maxWords ? "..." : "");
  };

  // const cityState = `${_?.address[0]?.city} ${_?.address[0]?.state}`;
  // const cityState = _?.talent?.address?.[0]?.talent?.city
  //   ? `${_?talent?.address[0].city} ${_?.talent?.address[0].state}`
  //   : "N/A";

  const cityState = _.talent?.address?.[0]?.city
    ? `${_.talent?.address[0].city} ${_.talent?.address[0].state}`
    : "N/A";

  const truncatedCityState = truncateWords(cityState, 3);

  return (
    <>
      <Card className="bg-white h-[262px] w-[196px]">
        <div className="h-[196px] overflow-hidden relative">
          <div className="absolute max-h-[40px] my-auto z-40  inset-0 flex items-center justify-between p-4">
            <button onClick={prev}>
              <FaAngleLeft color="white" />
            </button>
            <button onClick={next}>
              <FaAngleRight color="white" />
            </button>
          </div>
          <div className="absolute top-1 rounded-l-md right-0  z-50 bg-white flex  justify-between items-center    w-[54px] h-[30px] px-2">
            {/* <AiOutlineHeart /> */}
            <HeartIcon selectedTalentID={_._id} favorites={_.favorites} />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <AiOutlineMore />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white p-3 space-y-2 shadow-sm rounded-sm border">
                <DropdownMenuItem
                  className="hover:bg-black/10 flex items-center"
                  onClick={() => handleModalPop()}
                >
                  <RiStackshareLine />
                  <span className="ml-2">Invite</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-bm__beige" />
                <DropdownMenuItem className="hover:bg-black/10 flex items-center">
                  <IoShareSocial />
                  <span className="ml-2">Share</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div
            className="flex relative transition-transform ease-out duration-500"
            style={{ transform: `translateX(-${curr * 100}%)` }}
          >
            <div className="relative flex">
              {slides.map((s, index) => (
                <div
                  className="w-[196px] h-[262px] relative"
                  key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => openDialog(index)}
                >
                  <img
                    src={s}
                    alt=""
                    className="z-50 hover:grayscale-0 grayscale  w-[196px] h-[262px] object-cover"
                    style={{ borderRadius: 5 }}
                  />
                  {hoveredIndex === index && (
                    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 h-[50%] z-10">
                      <div className="flex flex-col m-2">
                        <div className="flex items-center space-x-4 mb-1">
                          <div className="flex items-center space-x-1">
                            <img src={Age} alt="" />
                            <div className="text-[8px] font-medium">
                              {_?.talent?.DOB} years
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <img src={height} alt="" />
                            <div className="text-[8px] font-medium">
                              {" "}
                              {_?.height || "-"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 mb-1">
                          <img
                            src={post}
                            alt=""
                            className="h-[12px] w-[12px]"
                          />
                          <div className="text-[8px] font-medium">
                            {/* Nivea, Coca Cola, Pepsi, Noemdek */}
                            {/* {_?.experience || "-"} */}
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <img
                            src={category}
                            alt=""
                            className="h-[12px] w-[12px]"
                          />
                          <div className="text-[8px] font-medium">
                            {/* In-Store, Open Market, Traffic */}
                            {/* {_?.experience || "-"} */}
                            {_?.experience || "-"}
                          </div>
                        </div>
                        {/* <div className="flex items-center space-x-1">
                          <img
                            src={group}
                            alt=""
                            className="h-[12px] w-[12px]"
                          />
                          <div className="text-[8px] font-medium">97%</div>
                        </div> */}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Dialog open={toggleDialog} onOpenChange={setToggleDialog}>
              <DialogContent className="bg-white p-0 flex flex-col items-center">
                <div className="flex items-center space-x-3 mt-2 mb-4">
                  <div className="flex items-center space-x-3">
                    <p className="text-[18px] font-medium">Gloria Michael</p>
                    <span className="bg-[#00AB26] h-2 w-2 rounded-full"></span>
                    <div className="border-l border-[#D7D8DA] h-8"></div>
                    <p className="text-[12px] font-medium text-[#252525]">
                      Ikeja, Lagos
                    </p>
                    <div className="flex items-center space-x-1">
                      <IoStarHalf />
                      <div className="border-l border-[#D7D8DA] h-8"></div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <IoIosHeartEmpty />
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="hover:bg-black/10 flex items-center">
                        <IoShareSocial />
                        <span className="ml-2">Share</span>
                      </div>
                      <div className="hover:bg-black/10">Invite</div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src={modalImage[currentImageIndex]}
                    alt={`girl-${currentImageIndex + 1}`}
                    width={400}
                    height={533}
                    className=" h-full w-full"
                    onClick={() => handleImageClick(currentImageIndex)}
                  />
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-row items-center justify-between px-4 mt-2">
                    <button
                      onClick={handlePrevImage}
                      style={{ color: "white" }}
                    >
                      &lt;
                    </button>
                    <button
                      onClick={handleNextImage}
                      style={{ color: "white" }}
                    >
                      &gt;
                    </button>
                  </div>
                </div>

                <div className="flex flex-row items-center flex-wrap p-0 m-0">
                  {dialogSlide.slice(0, 7).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`girl-${index + 1}`}
                      className="h-[80px]"
                    />
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="px-1">
          <div className="flex items-center gap-3 whitespace-nowrap px-2 py-1">
            <p className="text-[12px] font-medium capitalize">
              {_.talent?.fullName}
            </p>
            <span className="bg-[#00AB26] h-2 w-2 rounded-full"></span>
          </div>
          <Separator />
          <div className="flex items-center gap-2 whitespace-nowrap px-2 py-1">
            <div className="flex items-center gap-2">
              <IoLocationSharp />
              <p className="text-[10px] font-medium leading-3 text-[#252525] capitalize">
                {truncatedCityState}
              </p>
            </div>
            <div className="w-[1px] h-3 bg-[#D7D8DA]"></div>
            <div className="flex items-center gap-2">
              {/* <IoStarHalf />
            <p>4.5</p> */}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
