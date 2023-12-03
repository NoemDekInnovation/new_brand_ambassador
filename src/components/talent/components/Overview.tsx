import React, { useRef, useState } from "react";
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
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { patchAxiosInstance } from "../../../api/axios";
import { Textarea } from "../../../ui/textarea";
import { Progress } from "@radix-ui/react-progress";

export default function Overview({
  next,
  cancel,
  overView,
  setOverView,
  create,
}: {
  create: () => void;
  next: () => void;
  cancel: () => void;
  overView: {
    summary: string;
    profilePic: any;
  };
  setOverView: any;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [inView, setInView] = useState<File>({} as File);
  const [inVw, setInVw] = useState(false);

  const handleDivClick = () => {
    // Trigger a click event on the hidden input
    fileInputRef?.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files?.length) {
      const selectedFile = Array.from(files);
      setOverView({
        ...overView,
        [name]: selectedFile[0],
      });
      setInVw(true);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Update the state with the user's input
    setOverView({
      ...overView,
      summary: e.target.value,
    });
  };

  return (
    <div className=" bg-[#F3F3F3]/30  px-4 md:px-12 xl:px-40 h-[87.3vh] pt-10 overflow-hidden">
      <Card className="bg-white  h-full p-2 md:p-4  flex justify-between gap-[24px]">
        <Card className=" p-1.5 flex flex-col justify-center gap-1  border-bm__beige w-[280px] max-h-[200px] border rounded-[6px]">
          <p className="text-[15px] font-semibold p-2">My Account</p>
          <Separator className="bg-bm__gler" />
          <div className="flex items-center gap-4 p-3  hover:bg-black/10 transform hover:scale-105 cursor-pointer">
            <div className="flex items-center gap-4 mr-2">
              <BiSolidUserDetail />
              <p className="text-[14px] font-normal ">Profile</p>
            </div>
          </div>
          <Separator className="bg-bm__gler/50" />
          <div className="flex items-center gap-4 p-3   hover:bg-black/10 transform hover:scale-105 cursor-pointer">
            <MdPayments />
            <p className="text-[14px] font-normal">Billings & Payments</p>
          </div>
          <Separator className="bg-bm__gler/50" />
          <div className="flex items-center gap-4 p-3  hover:bg-black/10 transform hover:scale-105 cursor-pointer">
            <MdSettings />
            <p className="text-[14px] font-normal">Settings</p>
          </div>
        </Card>
        <div className="flex-1 overflow-y-scroll pr-2">
          <div className="flex justify-between font-medium text-[12px] my-2 ">
            <div className="relative text-white flex items-center justify-center ">
              <p className="absolute top-[25%]  z-20 text-[16px]">Overview</p>
              <img src={darkUnion} alt="" className=" z-5 w-[300px] h-[50px]" />
            </div>
            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] text-[16px] z-20">
                {" "}
                Personal Details
              </p>
              <img src={subtract} alt="" className=" z-10 w-[300px] h-[50px]" />
            </div>
            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] text-[16px] z-20"> Address</p>
              <img src={subtract} alt="" className=" z-10 w-[300px] h-[50px]" />
            </div>

            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[15%] text-[14px] leading-4 z-20">
                {" "}
                Education & <br /> Certification
              </p>
              <img src={subtract} alt="" className=" z-10 w-[300px] h-[50px]" />
            </div>

            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] text-[16px] z-20"> Experience</p>
              <img src={subtract} alt="" className=" z-10 w-[300px] h-[50px]" />
            </div>

            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[15%] text-[14px] leading-4 z-20">
                Skills &<br /> Opportunities
              </p>
              <img src={subtract} alt="" className=" w-[300px] h-[50px]" />
            </div>

            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] z-20 text-[16px]"> Socials</p>
              <img
                src={subtract2}
                alt=""
                className=" z-10 w-[300px] h-[50px]"
              />
            </div>
          </div>
          <CardContent className="border rounded-xl  p-8 pb-0 flex-1 flex flex-col  mt-3">
            <p>Show agencies the best version of yourself.</p>

            <Separator className=" my-3 bg-[#D7D8DA5C]" />
            {/* <Input type="file" className="hidden" />
            <div className="my-3 border w-[156px] h-[156px] flex justify-center text-center items-center text-[18px] font-light text-[#93979DB2]">
              Attach or drop photos here
            </div>
            <p className="text-[13px] font-light mb-3">
              Attach as many photos as possible.
            </p> */}
            <label htmlFor="picture" className="cursor-pointer">
              <Input
                id="picture"
                type="file"
                className="pb-4"
                ref={fileInputRef}
                onChange={handleFileChange}
                name="profilePic"
                style={{ display: "none" }}
              />

              <div
                onClick={handleDivClick}
                className="mt-3 border w-[156px] h-[156px] flex justify-center text-center items-center text-[18px] font-light text-[#93979DB2]"
              >
                {/* Attach or drop photos here */}
                {inVw ? (
                  <img
                    src={URL.createObjectURL(overView?.profilePic)}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  "Attach or drop photos here"
                )}
              </div>
            </label>
            <Separator
              className="py-[2px] my-7 bg-[#D7D8DA]
"
            />
            <p className="text-[12px] font-light">
              Use this space to show agencies you have the skills and experience
              they are looking for. Keep it short and make sure it is error
              free.
            </p>
            <Separator className=" my-7  bg-[#D7D8DA5C]" />
            <textarea
              className="flex-1 min-h-[300px] rounded-lg p-3 border border-[#E5E5E5]"
              placeholder="Summarise your strength and skills"
              value={overView?.summary}
              onChange={handleTextareaChange}
            />
            <p className="text-[10px] mb-7">250 characters</p>
          </CardContent>
          {/* <Progress value={14} className='my-2 md:my-7' /> */}

          <div className="flex justify-between mt-2">
            <Button className="light__btn max-w-[100px]" onClick={cancel}>
              <Link to={"/profile"}>Close</Link>
            </Button>
            <div className="flex gap-4">
              <Button className="dark__btn" onClick={next}>
                Save
              </Button>
              <Button
                className="dark__btn w-fit whitespace-nowrap"
                onClick={() => {
                  create();
                  next();
                }}
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
