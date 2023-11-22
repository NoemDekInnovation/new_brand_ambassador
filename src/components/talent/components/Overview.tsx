import React from "react";
import { Card, CardContent } from "../../../ui/card";
// import { Separator } from '../../../ui/separator';
// import { Textarea } from '../../../ui/textarea';
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
// import { Progress } from '@/components/ui/progress';
import { Separator } from "../../../ui/seperator";
import darkUnion from "../../../assets/Union.png";
import subtract from "../../../assets/Subtract.png";
import subtract2 from "../../../assets/Subtract2.png";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdPayments, MdSettings } from "react-icons/md";

export default function Overview({
  next,
  cancel,
  overView,
  setOverView,
}: {
  next: () => void;
  cancel: () => void;
  overView: {};
  setOverView: React.Dispatch<React.SetStateAction<{}>>;
}) {
  return (
    <div className=" bg-[#F3F3F3]/30  px-4 md:px-12 xl:px-40 h-[87.3vh] pt-10 overflow-hidden">
      <Card className="bg-white  h-full p-2 md:p-4  flex justify-between gap-[24px]">
        <Card className=" p-6 flex flex-col justify-center gap-2  border-bm__beige  max-h-[189px] border rounded-[6px]">
          <p className="text-[15px] font-medium">My Account</p>
          <Separator className="bg-bm__gler" />
          <div className="flex items-center gap-4 p-2 hover:bg-gray-400 transition-colors transform hover:scale-105 cursor-pointer">
            <BiSolidUserDetail />
            <p className="text-[12px] font-normal">Profile</p>
          </div>
          <Separator className="bg-bm__gler/50" />
          <div className="flex items-center gap-4 p-2 hover:bg-gray-400 transition-colors transform hover:scale-105 cursor-pointer">
            <MdPayments />
            <p className="text-[12px] font-normal">Billings & Payments</p>
          </div>
          <Separator className="bg-bm__gler/50" />
          <div className="flex items-center gap-4 p-2 hover:bg-gray-400 transition-colors transform hover:scale-105 cursor-pointer">
            <MdSettings />
            <p className="text-[12px] font-normal">Settings</p>
          </div>
        </Card>
        <div className="flex-1 overflow-y-scroll pr-2">
          <div className="flex justify-between font-medium text-[12px] my-2 space-x-[10px]">
            <div className="relative text-white flex items-center justify-center">
              <p className="absolute top-[25%]  z-20">Overview</p>
              <img src={darkUnion} alt="" className=" z-10 w-[150px]" />
            </div>
            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[15%]  leading-4 z-20">
                {" "}
                Personal <br /> Details
              </p>
              <img src={subtract} alt="" className=" z-10 w-[150px]" />
            </div>
            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] z-20"> Address</p>
              <img src={subtract} alt="" className=" z-10 w-[150px]" />
            </div>

            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[15%]  leading-4 z-20">
                {" "}
                Education & <br /> Certification
              </p>
              <img src={subtract} alt="" className=" z-10 w-[150px]" />
            </div>

            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] z-20"> Experience</p>
              <img src={subtract} alt="" className=" z-10 w-[150px]" />
            </div>

            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[15%]  leading-4 z-20 w-[150px]">
                Skills &<br /> Opportunities
              </p>
              <img src={subtract} alt="" className=" z-10 w-[150px]" />
            </div>

            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] z-20"> Socials</p>
              <img src={subtract2} alt="" className=" z-10 w-[150px]" />
            </div>
          </div>
          <CardContent className="border rounded-xl  p-3 pb-0 flex-1 flex flex-col  mt-3">
            <p>Show agencies the best version of yourself.</p>

            <Separator className=" my-3" />
            <Input type="file" className="hidden" />
            <div className="mt-3 border w-[156px] h-[156px] flex justify-center text-center items-center text-[18px] font-light text-[#93979DB2]">
              Attach or drop photos here
            </div>
            <p className="text-[13px] font-light mb-3">
              Attach as many photos as possible.
            </p>
            <Separator className="py-[2px] my-3" />
            <p className="text-[12px] font-light">
              Use this space to show agencies you have the skills and experience
              they are looking for. Keep it short and make sure it is error
              free.
            </p>
            <Separator className=" my-3" />
            <textarea
              className="flex-1 min-h-[300px] rounded-lg p-3 border border-[#E5E5E5]"
              placeholder="Summarise your strength and skills"
            />
            <small className="text-[10px]">250 characters</small>
          </CardContent>
          {/* <Progress value={14} className='my-2 md:my-7' /> */}

          <div className="flex justify-between mt-2">
            <Button className="light__btn max-w-[100px]" onClick={cancel}>
              Close
            </Button>
            <div className="flex gap-4">
              <Button className="light__btn" onClick={next}>
                Create
              </Button>
              <Button
                className="dark__btn w-fit whitespace-nowrap"
                onClick={next}
              >
                Save and Next
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
