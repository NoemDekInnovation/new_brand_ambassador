import { AiOutlineHeart, AiOutlineMore } from "react-icons/ai";
import { Card } from "../../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Separator } from "../../ui/seperator";
import beauty from "../../assets/beauty.jpg";
import profile from "../../assets/Profile 2 1.png";
import blue from "../../assets/WhatsApp Image 2023-10-10 at 01.02 2.png";
import nivea from "../../assets/IMG_2641 1.png";
import blue2 from "../../assets/Profile 1 1.png";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { useState } from "react";
import { IoLocationSharp, IoShareSocial, IoStarHalf } from "react-icons/io5";
import { RiStackshareLine } from "react-icons/ri";
import { Dialog, DialogContent } from "../../ui/dialog";
import girl1 from "../../assets/Rectangle 11 (1).png";
import girl2 from "../../assets/Gallery=Gallery6.png";
import girl3 from "../../assets/Profile 1 1.png";
import girl4 from "../../assets/Profile 2 1.png";
import girl5 from "../../assets/Rectangle 11 (1).png";
import Age from "../../assets/Age.png";
import height from "../../assets/Height.png";
import post from "../../assets/Project Post.png";
import category from "../../assets/Category.png";
import group from "../../assets/Group.png";

import { IoIosHeartEmpty } from "react-icons/io";
import AgencyPop from "./AgencyPop";
import Moment from "react-moment";

const slides = [beauty, profile, blue, nivea, blue2];
const dialogSlide = [girl1, girl2, girl5];
const modalImage = [girl4, girl3, girl4];

export default function TalentImages({
  selectedRole,
  inviteTalent,
}: {
  selectedRole: any;
  inviteTalent: any;
}) {
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

  return (
    <div className="flex justify-center items-center h-full w-full p-4">
      <Card className="flex flex-col bg-white h-full max-h-[747px]  w-full max-w-[600px]">
        <div className="flex w-full justify-bewteen p-3 items-center">
          <div className="flex flex-1 gap-2 items-center">
            <p>{selectedRole?.fullName}</p>
            <p className="border-x border-x-2 px-2 text-[9px] font-normal text-bm_black w-[110px]">
              {selectedRole?.age}yrs, {selectedRole?.height},{" "}
              {`${
                selectedRole?.origin?.length > 6 &&
                selectedRole?.origin.slice(0, 6)
              }...`}
              {selectedRole?.origin?.length <= 6 && selectedRole?.origin}
            </p>
            <AiOutlineHeart />
          </div>
          <div className="flex gap-2">
            <button className="light__btn">Share</button>
            <button className="dark__btn" onClick={inviteTalent}>
              Invite
            </button>
          </div>
        </div>
        <div className="flex-1 w-full overflow-hidden relative">
          <div className="absolute max-h-[40px] my-auto z-40  inset-0 flex items-center justify-between p-4">
            <button onClick={prev}>
              <FaAngleLeft color="white" />
            </button>
            <button onClick={next}>
              <FaAngleRight color="white" />
            </button>
          </div>
          <div
            className=" h-full w-full flex relative transition-transform ease-out duration-500"
            style={{ transform: `translateX(-${curr * 100}%)` }}
          >
            <div className="relative flex h-full w-full w-[600px] bg-black">
              {/* {slides.map((s, index) => (
                <div
                  className=" h-full max-h-[600px]  w-[600px] relative bg-blue-300"
                  key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => openDialog(index)}
                >
                  <div className="bg-gray-200 w-[600px]">
                    <img
                      src={s}
                      alt=""
                      className="z-50 hover:grayscale-0 grayscale   h-[600px]  w-[600px] object-cover"
                      style={{ borderRadius: 5 }}
                    />
                  </div>
                </div>
              ))} */}

              <img
                src={selectedRole?.profilePic}
                className="w-full h-full object-contain"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="w-full  flex items-center justify-center  h-[96px]">
          <p className="text-center my-auto">No ablum yet</p>
        </div>
      </Card>
    </div>
  );
}
