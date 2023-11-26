import React from "react";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import { Textarea } from "../../../ui/textarea";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Progress } from "../../../ui/progress";
import { AddressProps } from "../../../redux/types";

export default function Address({
  next,
  prev,
  cancel,
  setAddress,
  address,
  create,
}: {
  create: () => void;
  next: () => void;
  prev: () => void;
  cancel: () => void;
  setAddress: any;
  address: AddressProps;
}) {
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
    <div className=" bg-[#F3F3F3]/30   px-4 md:px-12 xl:px-40 min-h-[70vh] py-10">
      <Card className="bg-white  h-full p-2 md:p-4 flex-col flex">
        <div className="flex gap-2 lg:justify-between font-medium text-[12px] my-2 flex-wrap">
          <p className="bg-[#D7D8DA] border border-bm__btn__grey p-2 rounded lg:p-4 ">
            Overview
          </p>
          <p className="bg-[#D7D8DA] border border-bm__btn__grey p-2 rounded lg:p-4 ">
            Personal Details
          </p>
          <p className="bg-black text-white p-4">Address</p>
          <p className="bg-[#D7D8DA] border border-bm__btn__grey p-2 rounded lg:p-4 ">
            Education & Certification
          </p>
          <p className="bg-[#D7D8DA] border border-bm__btn__grey p-2 rounded lg:p-4 ">
            Experience
          </p>
          <p className="bg-[#D7D8DA] border border-bm__btn__grey p-2 rounded lg:p-4 ">
            Skills & Opportunities
          </p>
          <p className="bg-[#D7D8DA] border border-bm__btn__grey p-2 rounded lg:p-4 ">
            Socials
          </p>
        </div>
        <CardContent className="border rounded-xl  p-3 flex-1 flex flex-col mt-3">
          <p>
            In other for us to get your location, we need to get your address.
            Filling your address will also help you get works close to you.
          </p>
          <Separator className=" my-3" />
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
                Street address
              </label>
            </div>

            <div className="relative md:col-span-1 z-0 w-full mb-6 group">
              <input
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
                L.G.A
              </label>
            </div>

            <div className="relative  md:col-span-2 z-0 w-full mb-6 group">
              <input
                type="text"
                name="state"
                id="state"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={address.state}
                onChange={(e) => handleInputChange(e, "state")}
                required
              />
              <label
                htmlFor="state"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                State
              </label>
            </div>
            <div className="relative  md:col-span-2 z-0 w-full mb-6 group">
              <input
                type="text"
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
                Zip Code
              </label>
            </div>
          </div>
        </CardContent>
        <Progress value={42} className="my-2 md:my-7" />

        <div className="flex flex-col md:flex-row justify-between mt-2 gap-4">
          <Button className="light__btn md:max-w-[100px]" onClick={cancel}>
            Close
          </Button>
          <div className="flex gap-4 flex-col md:flex-row">
            <Button className="light__btn" onClick={create}>
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
      </Card>
    </div>
  );
}
