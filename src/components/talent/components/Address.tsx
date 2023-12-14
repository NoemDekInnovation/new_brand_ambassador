import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../../ui/card";
import { Button } from "../../../ui/button";
import { Separator } from "../../../ui/seperator";
import union from "../../../assets/Union1.png";
import subtract from "../../../assets/Subtract.png";
import subtract2 from "../../../assets/Subtract2.png";
import subtract3 from "../../../assets/Subtract3.png";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdPayments, MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { patchAxiosInstance } from "../../../api/axios";
import { AddressProps } from "../../../redux/types";
import { useForm, Controller } from "react-hook-form";
import { State } from "country-state-city";
import Select from "react-select";
import SelectOption from "../../../libs/select";
import { useToast } from "../../../ui/use-toast";
import { Required } from "../../Required";

export default function Address({
  next,
  prev,
  cancel,
  setAddress,
  address,
  originOptions,
  setSelectedOrigin,
  setCityOrigin,
  cityOptions,
  create,
}: {
  create: () => void;
  next: () => void;
  prev: () => void;
  cancel: () => void;
  setAddress: any;
  address: AddressProps;
  originOptions: any;
  setSelectedOrigin: any;
  setCityOrigin: any;
  cityOptions: any;
}) {
  let stateData = State.getAllStates();
  const stateOptions = stateData.map((state) => ({
    value: state.name,
    label: state.name,
  }));

  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const { value } = e.target;

    setAddress((prevData: AddressProps) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  return (
    <div className=" bg-[#F3F3F3]/30   px-4 md:px-12 xl:px-40 h-[87.3vh] pt-10">
      {/* <div className='fixed top-0 h-screen w-screen bg-[#F3F3F3]/30 z-[1000] mt-[20vh] px-4 md:px-12 xl:px-40 min-h-[70vh] py-10'> */}
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
          <div className="flex justify-between font-medium text-[12px] my-2">
            <div className="relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] text-[16px] z-20">Overview</p>
              <img src={union} alt="" className=" z-10 w-[300px] h-[50px]" />
            </div>
            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] text-[16px] z-20">
                {" "}
                Personal Details
              </p>
              <img src={subtract} alt="" className=" z-10 w-[300px] h-[50px]" />
            </div>
            <div className=" relative text-white flex items-center justify-center">
              <p className="absolute top-[25%] text-[16px] z-20"> Address</p>
              <img
                src={subtract3}
                alt=""
                className=" z-10 w-[300px] h-[50px]"
              />
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
              <img src={subtract} alt="" className=" z-10 w-[300px] h-[50px]" />
            </div>

            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] text-[16px] z-20"> Socials</p>
              <img
                src={subtract2}
                alt=""
                className=" z-10 w-[300px] h-[50px]"
              />
            </div>
          </div>
          <CardContent className="border rounded-xl  p-8 flex-1 flex flex-col mt-3">
            <p>
              In other for us to get your location, we need to get your address.
              Filling your address will also help you get works close to you.
            </p>
            <Separator className=" my-7 bg-[#D7D8DA]" />
            <div className="grid md:grid-cols-5 md:gap-6 mt-4">
              <div className="relative md:col-span-4  z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="street"
                  id="street"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={address.street}
                  onChange={(e) => handleInputChange(e, "street")}
                  required
                />
                <label
                  htmlFor="street"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  <Required className="text-[20px]">Street address</Required>
                </label>
              </div>

              <div className="relative md:col-span-1  w-full mb-6 group">
                {/* <input
                  type="text"
                  name="city"
                  id="city"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={address.city}
                  onChange={(e) => handleInputChange(e, "city")}
                  required
                />
                <label
                  htmlFor="city"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  City
                </label> */}
                <SelectOption
                  id="city"
                  name="city"
                  defaultValue={{
                    value: address.city,
                    label: address.city,
                  }}
                  options={cityOptions}
                  onChange={(e: any) => setCityOrigin(e?.value)}
                  placeholder="City"
                  required
                  isDisabled={false}
                  className="appearance-none bg-transparent w-full py-2.5 px-0 focus:outline-none focus:border-blue-500 text-sm text-gray-900  border-gray-300 capitalize"
                />
                <label
                  htmlFor="city"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 top-2 left-2 -z-1 origin-[0] peer-focus:font-medium  transform -translate-y-6 scale-75 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  <Required className="text-[20px]">City</Required>
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-5 md:gap-6">
              <div className="relative md:col-span-1  z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="LGA"
                  id="LGA"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={address.LGA}
                  onChange={(e) => handleInputChange(e, "LGA")}
                  required
                />
                <label
                  htmlFor="LGA"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  <Required className="text-[20px]">L.G.A</Required>
                </label>
              </div>

              <div className="relative  md:col-span-2 z-0 w-full mb-6 group">
                <SelectOption
                  id="state"
                  name="state"
                  defaultValue={{
                    value: address.state,
                    label: address.state,
                  }}
                  options={originOptions}
                  onChange={(e: any) => setSelectedOrigin(e?.value)}
                  placeholder="State of origin"
                  required
                  isDisabled={false}
                  className="appearance-none bg-transparent w-full py-2.5 px-0 focus:outline-none focus:border-blue-500 text-sm text-gray-900  border-gray-300 capitalize"
                />
                <label
                  htmlFor="state"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  <Required className="text-[20px]">State</Required>
                </label>
              </div>
              <div className="relative  md:col-span-2 z-0 w-full mb-6 group">
                <input
                  type="number"
                  name="zipCode"
                  id="zipCode"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={address.zipCode}
                  onChange={(e) => handleInputChange(e, "zipCode")}
                  required
                />
                <label
                  htmlFor="zipCode"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  <Required className="text-[20px]">

                  Zip Code
                  </Required>
                                 </label>
              </div>
            </div>
          </CardContent>
          {/* <Progress value={42} className='my-2 md:my-7' /> */}

          <div className="flex justify-between mt-2">
            <div className="flex gap-4">
              <Button className="light__btn max-w-[100px]" onClick={cancel}>
                <Link to={"/profile"}>Close</Link>
              </Button>
              <Button className="light__btn max-w-[100px]" onClick={prev}>
                Back
              </Button>
            </div>
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
                // onClick={next}
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
