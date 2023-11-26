import React from "react";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import { Textarea } from "../../../ui/textarea";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Progress } from "../../../ui/progress";
import { SocialsProps } from "../../../redux/types";

export default function Social({
  next,
  prev,
  cancel,
  socials,
  setSocials,
  create,
}: {
  create: () => void;
  next: () => void;
  prev: () => void;
  cancel: () => void;
  socials: SocialsProps;
  setSocials: any;
}) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const { name, value } = e.target;

    setSocials((prevData: SocialsProps) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  return (
    <div className=" bg-[#F3F3F3]/30   px-4 md:px-12 xl:px-40 min-h-[70vh] py-10">
      {/* <div className='fixed top-0 h-screen w-screen bg-[#F3F3F3]/30 z-[1000] mt-[20vh] px-4 md:px-12 xl:px-40 min-h-[70vh] py-10'> */}
      <Card className="bg-white  h-full p-2 md:p-4 flex-col flex">
        <div className="flex gap-2 lg:justify-between font-medium text-[12px] my-2 flex-wrap">
          <p className="bg-[#D7D8DA] border border-bm__btn__grey p-2 rounded lg:p-4 ">
            Overview
          </p>
          <p className="bg-[#D7D8DA] border border-bm__btn__grey p-2 rounded lg:p-4 ">
            Personal Details
          </p>
          <p className="bg-[#D7D8DA] border border-bm__btn__grey p-2 rounded lg:p-4 ">
            Address
          </p>
          <p className="bg-[#D7D8DA] border border-bm__btn__grey p-2 rounded lg:p-4 ">
            Education & Certification
          </p>
          <p className="bg-[#D7D8DA] border border-bm__btn__grey p-2 rounded lg:p-4 ">
            Experience
          </p>
          <p className="bg-[#D7D8DA] border border-bm__btn__grey p-2 rounded lg:p-4 ">
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
                name="linkedin"
                id="linkedin"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={socials.linkedin}
                onChange={(e) => handleInputChange(e, "linkedin")}
                required
              />
              <label
                htmlFor="linkedin"
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
                name="instagram"
                id="instagram"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={socials.instagram}
                onChange={(e) => handleInputChange(e, "instagram")}
                required
              />
              <label
                htmlFor="instagram"
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
                name="twitter"
                id="twitter"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={socials.twitter}
                onChange={(e) => handleInputChange(e, "twitter")}
                required
              />
              <label
                htmlFor="twitter"
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
                name="facebook"
                id="facebook"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={socials.facebook}
                onChange={(e) => handleInputChange(e, "facebook")}
                required
              />
              <label
                htmlFor="facebook"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Facebook profile
              </label>
            </div>
          </div>{" "}
        </CardContent>
        <Progress value={100} className="my-2 md:my-7" />

        <div className="flex flex-col md:flex-row justify-between mt-2 gap-4">
          <div className="flex gap-4">
            <Button className="light__btn max-w-[100px]" onClick={cancel}>
              Close
            </Button>
            <Button className="light__btn max-w-[100px]" onClick={prev}>
              Back
            </Button>
          </div>

          <div className="flex gap-4">
            <Button className="light__btn" onClick={create}>
              Create
            </Button>
            <Button
              className="dark__btn w-fit whitespace-nowrap"
              onClick={next}
            >
              Save
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
