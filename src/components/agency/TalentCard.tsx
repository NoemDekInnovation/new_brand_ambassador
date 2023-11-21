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
import girl1 from "../../assets/Rectangle 11 (1).png"
import girl2 from "../../assets/Gallery=Gallery6.png"
import girl3 from "../../assets/Profile 1 1.png"
import girl4 from "../../assets/Profile 2 1.png"
import Age from "../../assets/Age.png"
import height from "../../assets/Height.png" 
import post from "../../assets/Project Post.png"
import category from "../../assets/Category.png"
import group from "../../assets/Group.png"

import { IoIosHeartEmpty } from "react-icons/io";
import AgencyPop from "./AgencyPop";

const slides = [beauty, profile, blue, nivea, blue2];
const dialogSlide = [girl1, girl2];
const modalImage = [girl4,girl3]

export default function TalentCard() {
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
          <AiOutlineHeart />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <AiOutlineMore />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white p-3">
              <DropdownMenuItem className="hover:bg-black/10">
                <RiStackshareLine />
                <span className="ml-2">Invite</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-bm__beige" />
              <DropdownMenuItem className="hover:bg-black/10">
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
                          <div className="text-[8px] font-medium">24 years</div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <img src={height} alt="" />
                          <div className="text-[8px] font-medium">51</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 mb-1">
                        <img src={post} alt="" className="h-[12px] w-[12px]" />
                        <div className="text-[8px] font-medium">
                          Nivea, Coca Cola, Pepsi, Noemdek
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <img
                          src={category}
                          alt=""
                          className="h-[12px] w-[12px]"
                        />
                        <div className="text-[8px] font-medium">
                          In-Store, Open Market, Traffic
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <img src={group} alt="" className="h-[12px] w-[12px]" />
                        <div className="text-[8px] font-medium">97%</div>
                      </div>
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
                  className=" h-full object-contain"
                  onClick={() => handleImageClick(currentImageIndex)}
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-row items-center justify-between px-4 mt-2">
                  <button onClick={handlePrevImage} style={{ color: "white" }}>
                    &lt;
                  </button>
                  <button onClick={handleNextImage} style={{ color: "white" }}>
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
                    className="object-fill"
                  />
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="px-1">
        <div className="flex items-center gap-3 whitespace-nowrap px-2 py-1">
          <p className="text-[12px] font-medium">Gloria Michael</p>
          <span className="bg-[#00AB26] h-2 w-2 rounded-full"></span>
        </div>
        <Separator />
        <div className="flex items-center gap-2 whitespace-nowrap px-2 py-1">
          <div className="flex items-center gap-2">
            <IoLocationSharp />
            <p className="text-[8px] font-medium leading-3 text-[#252525]">
              Ikeja, Lagos
            </p>
          </div>
          <div className="w-[1px] h-3 bg-[#D7D8DA]"></div>
          <div className="flex items-center gap-2">
            <IoStarHalf />
            <p>4.5</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
