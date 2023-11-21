import React from "react";
import { Card, CardContent } from "../../../ui/card";
// import { Separator } from '../../../ui/separator';
// import { Textarea } from '../../../ui/textarea';
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Separator } from "../../../ui/seperator";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdPayments, MdSettings } from "react-icons/md";
// import { Progress } from '@/components/ui/progress';

export default function Social({
  next,
  prev,
  cancel,
}: {
  next: () => void;
  prev: () => void;
  cancel: () => void;
}) {
  return (
    <div className=" bg-[#F3F3F3]/30   px-4 md:px-12 xl:px-40 min-h-[70vh] py-10  max-w-fit mx-auto">
      {/* <div className='fixed top-0 h-screen w-screen bg-[#F3F3F3]/30 z-[1000] mt-[20vh] px-4 md:px-12 xl:px-40 min-h-[70vh] py-10'> */}
      <Card className="bg-white  h-full p-2 md:p-4  flex justify-between gap-[24px]">
        <Card className=" p-6 flex flex-col justify-center gap-2  border-bm__beige w-[240px] max-h-[189px] border rounded-[6px]">
          <p className="text-[15px] font-medium">My Account</p>
          <Separator className="bg-bm__gler" />
          <div className="flex items-center gap-4 hover:bg-gray-400 transition-colors p-2 transform hover:scale-105 cursor-pointer">
            <BiSolidUserDetail />
            <p className="text-[12px] font-normal">Profile</p>
          </div>
          <Separator className="bg-bm__gler/50" />

          <div className="flex items-center gap-4  hover:bg-gray-400 transition-colors p-2 transform hover:scale-105 cursor-pointer">
            <MdPayments />
            <p className="text-[12px] font-normal">Billings & Payments</p>
          </div>
          <Separator className="bg-bm__gler/50" />

          <div className="flex items-center gap-4  hover:bg-gray-400 transition-colors p-2 transform hover:scale-105 cursor-pointer">
            <MdSettings />
            <p className="text-[12px] font-normal">Settings</p>
          </div>
        </Card>
        <div className="">
          <div className="flex justify-between font-medium text-[12px] my-2">
            <p className="bg-[#D7D8DA] border border-bm__btn__grey p-4 ">
              Overview
            </p>
            <p className="bg-[#D7D8DA] border border-bm__btn__grey p-4 ">
              Personal Details
            </p>
            <p className="bg-[#D7D8DA] border border-bm__btn__grey p-4 ">
              Address
            </p>
            <p className="bg-[#D7D8DA] border border-bm__btn__grey p-4 ">
              Education & Certification
            </p>
            <p className="bg-[#D7D8DA] border border-bm__btn__grey p-4 ">
              Experience
            </p>
            <p className="bg-[#D7D8DA] border border-bm__btn__grey p-4 ">
              Skills & Opportunities
            </p>
            <p className="bg-black text-white p-4">Socials</p>
          </div>
          <CardContent className="border rounded-xl  p-3 flex-1 flex flex-col  mt-3">
            <p>Add your social handles to boost your profile.</p>
            <Separator className=" my-3" />
            <div className="grid  md:gap-6 mt-4">
              <div className="relative  z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="floating_first_name"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  // value={formData.projectDuration.startDate}
                  // onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  LinkedIn profile
                </label>
              </div>
            </div>{" "}
            <div className="grid  md:gap-6 mt-4">
              <div className="relative  z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="floating_first_name"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  // value={formData.projectDuration.startDate}
                  // onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Instagram profile
                </label>
              </div>
            </div>{" "}
            <div className="grid  md:gap-6 mt-4">
              <div className="relative  z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="floating_first_name"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  // value={formData.projectDuration.startDate}
                  // onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Twitter profile
                </label>
              </div>
            </div>{" "}
            <div className="grid  md:gap-6 mt-4">
              <div className="relative  z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="floating_first_name"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  // value={formData.projectDuration.startDate}
                  // onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Facebook profile
                </label>
              </div>
            </div>{" "}
          </CardContent>
          {/* <Progress value={100} className='my-2 md:my-7' /> */}

          <div className="flex justify-between mt-2">
            <div className="flex gap-4">
              <Button className="light__btn max-w-[100px]" onClick={cancel}>
                Close
              </Button>
              <Button className="light__btn max-w-[100px]" onClick={prev}>
                Back
              </Button>
            </div>

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
