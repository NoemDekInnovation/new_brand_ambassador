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
import PhoneInput from "react-phone-number-input";
import { PersonalProps } from "../../../redux/types";
import { useToast } from "../../../ui/use-toast";
import createProject from "../../../assets/created-project.png";
import Select from "react-select";
import { Required } from "../../Required";
import Loading from "../../Loading";

type TalentOption = {
  label: string;
  value: string;
};

export default function Overview({
  next,
  cancel,
  overView,
  setOverView,
  create,
  handlePhoneChange,
  setPersonal,
  personal,
  talentOptions,
  opportunities,
  setOpportunites,
}: {
  create: () => void;
  next: () => void;
  cancel: () => void;
  handlePhoneChange: (value: string) => void;
  talentOptions: TalentOption[];
  setOpportunites: any;
  personal: PersonalProps;
  opportunities: any;
  setPersonal: any;
  overView: {
    summary: string;
    profilePic: any;
  };
  setOverView: any;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [inView, setInView] = useState<File>({} as File);
  const [inVw, setInVw] = useState(false);
  const { toast } = useToast();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setPersonal((prevData: PersonalProps) => ({
      ...prevData,
      gender: value,
    }));
  };

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

  const newOpp = opportunities?.map((opportunity: any) => ({
    value: opportunity,
    label: opportunity,
  }));

  const handleOptionClick = (selectedOptions: any) => {
    const selectedLanguages = selectedOptions.map(
      (option: any) => option.value
    );
    setOpportunites(selectedLanguages);
  };

  const [isLoading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  return isLoading ? (
    <Loading />
  ) : (
    <div className=" bg-[#F3F3F3]/30  px-4 md:px-12 xl:px-40 h-[87.3vh] pt-10 overflow-hidden">
      <Card className="bg-white  h-full p-2 md:p-4  flex justify-between gap-[24px]">
        <Card className=" p-1.5 flex flex-col justify-center gap-1  border-bm__beige w-[280px] max-h-[200px] border rounded-[6px]">
          <p className="text-[15px] font-semibold p-2">My Account</p>
          <Separator className="bg-bm__gler" />
          <div className="flex items-center gap-4 p-3  hover:bg-black/10 transform hover:scale-105 cursor-pointer bg-black/10">
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
            <label htmlFor="picture" className="cursor-pointer">
              <Input
                id="picture"
                type="file"
                className="pb-4"
                onChange={handleFileChange}
                name="profilePic"
                style={{ display: "none" }}
              />
              <div className="mt-3 text-[18px] font-light text-[#93979DB2] relative">
                <Required>Profile Picture</Required>
                <div className="border w-[156px] h-[156px] relative">
                  {overView.profilePic !== "" && !inVw ? (
                    <img
                      src={overView?.profilePic}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  ) : inVw ? (
                    <img
                      src={URL.createObjectURL(overView?.profilePic)}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    "Attach or drop photos here"
                  )}
                </div>
              </div>
            </label>

            <Separator
              className="py-[2px] my-7 bg-[#D7D8DA]
"
            />

            <div className="grid md:grid-cols-2 md:gap-6 mt-4">
              <div className="relative  z-0 w-full mb-6 group">
                <PhoneInput
                  placeholder="Enter phone number"
                  value={personal.phone}
                  onChange={handlePhoneChange}
                  defaultCountry="NG"
                  international
                  countryCallingCodeEditable={false}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer input-phone-number"
                />
                <label
                  htmlFor="phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  <Required className="text-[20px]">Phone numbers</Required>
                </label>
              </div>

              {/* <p>Opportunities</p> */}
              <div>
                {/* <p className="mb-4">Opportunities</p> */}
                <div className="relative z-0 w-full mb-6 group">
                  <Select
                    defaultValue={opportunities?.map((opportunity: any) => ({
                      value: opportunity,
                      label: opportunity,
                    }))}
                    isMulti
                    name="oppor"
                    options={talentOptions}
                    className="block py-2.5 capitalize px-0 w-full text-sm text-gray-900 bg-transparent border-0  border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    classNamePrefix="select"
                    onChange={handleOptionClick}
                  />
                  <label
                    htmlFor="opportunities"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    <Required className="text-[20px]">
                      Select the opportunities that you are open to
                    </Required>
                  </label>
                </div>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <select
                  name="gender"
                  id="gender"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={personal.gender}
                  // onChange={(e) => handleInputChange(e, "gender")}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="" disabled selected hidden>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <label
                  htmlFor="gender"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  <Required className="text-[20px]">Gender</Required>
                </label>
              </div>
            </div>
            <Separator className="py-[1px] my-7 bg-[#D7D8DA]" />
            <p className="text-[12px] font-light">
              Use this space to show agencies you have the skills and experience
              they are looking for. Keep it short and make sure it is error
              free.
            </p>
            <Separator className=" my-3  bg-[#D7D8DA5C]" />
            <textarea
              className="flex-1 min-h-[300px] rounded-lg p-3 border border-[#E5E5E5]"
              placeholder="Summarise your strength and skills"
              value={overView?.summary}
              onChange={handleTextareaChange}
              maxLength={250}
            />
            <p className="text-[10px] mb-7">250 characters</p>
          </CardContent>
          {/* <Progress value={14} className='my-2 md:my-7' /> */}

          <div className="flex justify-between mt-2">
            <Button className="light__btn max-w-[100px]" onClick={cancel}>
              <Link to={"/profile"}>Close</Link>
            </Button>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="dark__btn"
                onClick={() => {
                  create();
                  setTimeout(() => {
                    toast({
                      description: "Changes Saved",
                    });
                  }, 2000);
                  cancel();
                }}
              >
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
