import { Card, CardContent } from "../../ui/card";
import { TbMap2, TbProgressCheck } from "react-icons/tb";
import { ImCancelCircle, ImStatsDots } from "react-icons/im";
import { Separator } from "../../ui/seperator";
import {
  MdFamilyRestroom,
  MdOutlineProductionQuantityLimits,
  MdPostAdd,
} from "react-icons/md";
import { BsFillCollectionFill } from "react-icons/bs";
import darkUnion from "../../assets/Union1.png";
import subtract from "../../assets/Subtract.png";
import subtract2 from "../../assets/Subtract2.png";
import subtract3 from "../../assets/Subtract3.png";
import TalentDetailsInfo from "./TalentDetailsInfo";
import { useState } from "react";
import { TalentProps } from "../../redux/types";
import { TalentType } from "../agency/TalentsView";

const InviteTalent = ({
  popUp,
  setPopUp,
  select,
  selectedProject,
}: {
  select: any;
  popUp: boolean;
  setPopUp: any;
  selectedProject: any;
}) => {
  const [selectedRole, setSelectedRole] = useState<TalentProps>();

  const handleProfilePopUp = (talent: any) => {
    // console.log(talent);
    setPopUp(!popUp);
    setSelectedRole(talent);
  };
  return (
    <div
      className={`fixed z-[1000] bg-black/50 w-[100%] items-center justify-end flex flex-col transition-all duration-1000 inset-0 ${
        popUp
          ? "translate-y-0 opacity-100 h-[100vh] -bottom-5"
          : "translate-y-[1000px] opacity-0 h-0"
      }`}
    >
      <Card className="p-4 relative bg-white w-[85vw] h-[95vh] ">
        <span className="absolute top-0 right-0 text-sm text-[#6F797A] p-8">
          <ImCancelCircle
            className="w-[20px] h-[20px] cursor-pointer"
            onClick={setPopUp}
          />
        </span>
        <div className="flex flex-row items-center p-4">
          <div className="text-[14px] font-medium capitalize">
            {selectedProject.projectTitle}
          </div>
          <div className="text-[15px] p-0 px-2">|</div>

          <div className="text-[12px] font-medium capitalize">
            {selectedProject.projectCategory}
          </div>
          <div className="text-[15px] p-0 px-2">|</div>

          <div className="text-[12px] font-medium capitalize">
            {selectedProject.projectCode}
          </div>
          <div className="text-[15px] p-0 px-2">|</div>

          <div className="text-[12px] font-medium capitalize text-green-500">
            Active
          </div>
        </div>
        <div className="flex items-center gap-4 relative">
          <Card className=" p-1.5 flex flex-col justify-center gap-1  border-bm__beige w-[230px] max-h-[270px] border rounded-[6px]">
            {/* <Separator className="bg-bm__gler" /> */}
            <div className="flex items-center gap-4 p-2  hover:bg-black/10 transform hover:scale-105 cursor-pointer">
              <div className="flex items-center gap-4 mr-2">
                <MdPostAdd />
                <p className="text-[14px] font-normal ">Project Post</p>
              </div>
            </div>
            <Separator className="bg-bm__gler/50" />
            <div className="flex items-center gap-4 p-2   hover:bg-black/10 transform hover:scale-105 cursor-pointer">
              <MdOutlineProductionQuantityLimits />

              <p className="text-[14px] font-normal">Products</p>
            </div>
            <Separator className="bg-bm__gler/50" />
            <div className="flex items-center gap-4 p-2  hover:bg-black/10 transform hover:scale-105 cursor-pointer">
              <BsFillCollectionFill />
              <p className="text-[14px] font-normal">Collaterals</p>
            </div>
            <Separator className="bg-bm__gler/50" />
            <div className="flex items-center gap-4 p-2  hover:bg-black/10 transform hover:scale-105 cursor-pointer">
              <TbMap2 />
              <p className="text-[14px] font-normal">Outlets</p>
            </div>
            <Separator className="bg-bm__gler/50" />
            <div className="flex items-center gap-4 p-2  hover:bg-black/10 transform hover:scale-105 cursor-pointer">
              <ImStatsDots />
              <p className="text-[14px] font-normal">Contract</p>
            </div>
          </Card>

          <div className="flex absolute flex-row justify-start items-start font-medium text-[12px] my-2  w-full max-w-[82%] right-5 -top-2 cursor-pointer">
            <div
              className="relative text-black flex items-center justify-center "
              onClick={() => select(1)}
            >
              <p className="absolute top-[25%]  z-20 text-[16px]">
                Project Overview
              </p>
              <img src={darkUnion} alt="" className=" z-5 w-[350px] h-[45px]" />
            </div>
            <div
              onClick={() => select(2)}
              className=" relative text-black flex items-center justify-center"
            >
              <p className="absolute text-white top-[25%] text-[16px] z-20">
                Invite Talent
                <span className="text-[14px] font-bold">(30)</span>
              </p>
              <img
                src={subtract3}
                alt=""
                className=" z-10 w-[350px] h-[45px]"
              />
            </div>
            <div
              onClick={() => select(3)}
              className=" relative text-black flex items-center justify-center"
            >
              <p className="absolute top-[25%] text-[16px] z-20">
                {" "}
                Applications<span className="text-[14px] font-bold">(300)</span>
              </p>
              <img src={subtract} alt="" className=" z-10 w-[350px] h-[45px]" />
            </div>
            <div
              className=" relative text-black flex items-center justify-center"
              onClick={() => select(4)}
            >
              <p className="absolute top-[25%] z-20 text-[16px]">
                {" "}
                Hire<span className="text-[14px] font-bold">(0)</span>
              </p>
              <img
                src={subtract2}
                alt=""
                className=" z-10 w-[350px] h-[45px]"
              />
            </div>
          </div>
        </div>
        <Card className=" flex border-0 absolute flex-col p-2 bg-white overflow-y-scroll h-[75vh] w-full max-w-[83%] right-0 top-0 mt-[130px] ">
          <TalentDetailsInfo handleProfilePopUp={handleProfilePopUp} />
        </Card>
      </Card>
    </div>
  );
};

export default InviteTalent;
