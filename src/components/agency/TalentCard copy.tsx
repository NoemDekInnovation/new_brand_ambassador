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
import { IoLocationSharp, IoStarHalf, IoShareSocial } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";

const slides = [beauty, profile, blue, nivea, blue2];

export default function TalentCard() {
  const [curr, setCurr] = useState(0);
  const prev = () => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };
  const next = () => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };
  return (
    //   <Card className="w-[260px] relative">
    //     <div className="relative">
    //       <div className="bg-bm__card absolute z-30 right-0 top-2 p-2 rounded-l-md flex gap-2">
    //         <AiOutlineHeart />
    //         <DropdownMenu>
    //           <DropdownMenuTrigger>
    //             <AiOutlineMore />
    //           </DropdownMenuTrigger>
    //           <DropdownMenuContent className="bg-white p-3">
    //             <DropdownMenuItem className="hover:bg-black/10">
    //               Add to Project
    //             </DropdownMenuItem>
    //             <DropdownMenuSeparator className="bg-bm__beige" />
    //             <DropdownMenuItem className="hover:bg-black/10">
    //               Share{" "}
    //             </DropdownMenuItem>
    //           </DropdownMenuContent>
    //         </DropdownMenu>
    //       </div>
    //       <img
    //         src={beauty}
    //         alt=""
    //         width={260}
    //         height={260}
    //         style={{ borderRadius: 5 }}
    //         className=" hover:grayscale-0 grayscale"
    //       />
    //     </div>
    //     <div className="flex items-center gap-3 whitespace-nowrap p-2">
    //       <p className="text-[15px] font-medium">Gloria Michael</p>
    //       <span className="text-[12px] font-normal">24 yrs. 51.Ikeja Lagos</span>
    //     </div>{" "}
    //     <div className="flex items-center gap-2 whitespace-nowrap p-1">
    //       <p className="text-[12px] font-normal border-r-2 pr-2">
    //         Nivea, Coca Cola, ...
    //       </p>
    //       <span className="text-[12px] font-normal">In-store, Open Market</span>
    //     </div>
    //     <Separator />
    //     <div className="flex items-center gap-2 whitespace-nowrap p-2">
    //       <div className="text-[15px] font-medium border-r-2 pr-2 ">
    //         <span className="text-bm_ox_red">97% {"  "}</span>
    //         Work Success
    //       </div>
    //       <div className="text-[15px] font-medium">
    //         <span className="text-bm_ox_red">4.5 {"  "}</span>
    //         Ratings
    //       </div>
    //     </div>
    //   </Card>
    <Card className="w-[260px] overflow-hidden relative">
      <div className="absolute max-h-[40px] my-auto z-40  inset-0 flex items-center justify-between p-4">
        <button onClick={prev}>
          <FaAngleLeft color="white" />
        </button>
        <button onClick={next}>
          <FaAngleRight color="white" />
        </button>
      </div>
      {/* <AiOutlineHeart />
      
      <DropdownMenu>
        
        <DropdownMenuTrigger>
           <AiOutlineMore />
          
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="bg-white p-3">
          
          <DropdownMenuItem className="hover:bg-black/10">
             Add to Project 
          </DropdownMenuItem>
           <DropdownMenuSeparator className="bg-bm__beige" />
          
          <DropdownMenuItem className="hover:bg-black/10">
             Share 
          </DropdownMenuItem>
          
        </DropdownMenuContent>
        
      </DropdownMenu> */}
      <div className="absolute top-0 right-0 p-4 z-50 bg-white flex space-x-2 rounded-tl-3 rounded-bl-none rounded-tr-none rounded-br-none">
        <AiOutlineHeart />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <AiOutlineMore />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white p-3">
            <DropdownMenuItem className="hover:bg-black/10">
              Invite
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
        <div className="relative flex ">
          {slides.map((s, idx) => (
            <img
              src={s}
              alt=""
              width={260}
              height={260}
              className="z-50 hover:grayscale-0 grayscale"
              style={{ borderRadius: 5 }}
              key={idx}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 whitespace-nowrap p-2">
        <p className="text-[15px] font-medium">Gloria Michael</p>
        <span className="bg-[#00AB26] h-2 w-2 rounded-full"></span>
      </div>
      <Separator />
      <div className="flex items-center gap-2 whitespace-nowrap p-2">
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

      {/* <div className="absolute inset-0 flex items-center justify-between p-4">
        <button onClick={prev}>
          <FaAngleLeft />
        </button>
        <button onClick={next}>
          <FaAngleRight />
        </button>
      </div> */}
    </Card>
  );
}
