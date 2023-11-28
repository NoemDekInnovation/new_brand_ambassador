"use client";

import ChevBackground from "../../../ui/chevbackground";
import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RequiredTalentsProps } from "../../../redux/types";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";
import { Label } from "../../../ui/label";

type DayOfWeek = "S" | "M" | "T" | "W" | "T" | "F" | "S" | string;

export interface DayObject {
  value: string;
  label: DayOfWeek;
}

export const daysOfWeek: DayObject[] = [
  { value: "Sun", label: "S" },
  { value: "Mon", label: "M" },
  { value: "Tue", label: "T" },
  { value: "Wed", label: "W" },
  { value: "Thur", label: "T" },
  { value: "Fri", label: "F" },
  { value: "Sat", label: "S" },
];

export default function ProjectBudget({
  next,
  prev,
  cancel,
  errors,
  requiredTalents,
  setRequiredTalents,
  workDays,
  setWorkDays,
}: {
  next: () => void;
  prev: () => void;
  cancel: () => void;
  errors: any;
  setRequiredTalents: any;
  requiredTalents: RequiredTalentsProps[];
  workDays: string[];
  setWorkDays: any;
}) {
  // const { control } = useForm();
  // const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);

  // const handleDayToggle = (day: DayOfWeek): void => {
  //   setSelectedDays((prevSelectedDays: DayOfWeek[]) => {
  //     if (prevSelectedDays.includes(day)) {
  //       return prevSelectedDays.filter((selectedDay) => selectedDay !== day);
  //     } else {
  //       return [...prevSelectedDays, day];
  //     }
  //   });
  // };
  // console.log(selectedDays);

  const handleDayToggle = (day: DayOfWeek): void => {
    setWorkDays((prevSelectedDays: DayOfWeek[]) => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter((selectedDay) => selectedDay !== day);
      } else {
        return [...prevSelectedDays, day];
      }
    });
  };

  function formatAsNaira(value: string): string {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, "");

    // Add commas to the string for better readability
    const numberWithCommas = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Return the formatted value with the Naira symbol
    // return `₦${numberWithCommas}`;
    return value
  }

  const handlePaymentChange = (row: any, index: number) => {
    const updatedTalentType = [...requiredTalents];
    updatedTalentType[index].paymentOptions = row;
    setRequiredTalents(updatedTalentType);
  };

  useEffect(() => {
    const savedProjectBudget =
      typeof window !== undefined && localStorage.getItem("projectBudget");
    if (savedProjectBudget) {
      setRequiredTalents(JSON.parse(savedProjectBudget));
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target as { name: string; value: string };

    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, "");

    // Format the numeric value as Naira
    const formattedValue = formatAsNaira(numericValue);

    const updatedExperiences = [...requiredTalents];
    updatedExperiences[index][name] = value;
    setRequiredTalents(updatedExperiences);
  };

  return (
    // <div className="px-4 pb-4  md:px-12 xl:px-40">
    //   <Card className="p-4 md:p-8 mt-5 bg-white h-[2000px]">
    //     <ChevBackground text="Tell us your budget for this project" stage="4" />
    //     <Card className="w-full py-6 my-7">
    //       <CardContent>
    //         <p className="text-[12px] font-light">
    //           This will help available talents to know the amount they will be
    //           earning
    //         </p>
    //         <Separator className="my-3 md:my-8 bg-bm__beige" />
    //         {/* <p className="text-[15px] font-medium  mb-3">Project Title</p> */}
    //         <form>
    //           <div className="grid md:grid-cols-2 md:gap-6">
    //             <div className="relative  z-0 w-full mb-6 group">
    //               {/* <input
    //                 type="text"
    //                 name="floating_first_name"
    //                 id="floating_first_name"
    //                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //                 placeholder=" "

    //               // {...register("workingDays", { required: true })}
    //               // required
    //               /> */}
    //               {/* <div className="pt-2 flex gap-6 max-w-3xl mt-2 mb-4">
    //                 <div className="bg-bm_card_grey text-bm_black rounded-md p-2 px-3">
    //                   S
    //                 </div>
    //                 <div className="bg-bm_card_grey text-bm_black rounded-md p-2 px-3">
    //                   M
    //                 </div>
    //                 <div className="bg-bm_card_grey text-bm_black rounded-md p-2 px-3">
    //                   T
    //                 </div>
    //                 <div className="bg-bm_card_grey text-bm_black rounded-md p-2 px-3">
    //                   W
    //                 </div>
    //                 <div className="bg-bm_card_grey text-bm_black rounded-md p-2 px-3">
    //                   T
    //                 </div>
    //                 <div className="bg-bm_card_grey text-bm_black rounded-md p-2 px-3">
    //                   F
    //                 </div>
    //                 <div className="bg-bm_card_grey text-bm_black rounded-md p-2 px-3">
    //                   S
    //                 </div>
    //               </div> */}
    //               <div className="pt-2 flex gap-3 max-w-3xl mt-2 mb-4 cursor-pointer flex-wrap">
    //                 {daysOfWeek.map(({ label, value }: DayObject, index) => (
    //                   <div
    //                     key={index}
    //                     className={`bg-bm_card_grey rounded-md p-2 px-3 font-semibold ${
    //                       selectedDays.includes(value)
    //                         ? "bg-[#252525] text-white"
    //                         : ""
    //                     }`}
    //                     onClick={() => handleDayToggle(value)}
    //                     // {...register(`workingDays[${value}]`)}
    //                   >
    //                     {label}
    //                   </div>
    //                 ))}
    //               </div>

    //               {errors.workingDays &&
    //                 errors.workingDays.type === "required" && (
    //                   <p className="max-w-[350px] text-[#f21e08] py-[2px] px-0 mt-[2px] fo font-light">
    //                     working days is required.
    //                   </p>
    //                 )}
    //               <label
    //                 htmlFor="floating_first_name"
    //                 className="peer-focus:font-medium absolute text-[12px] leading-[18px] font-normal  text-[#252525] dark:text-gray-400 duration-300 transform -translate-y-6 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    //               >
    //                 Working Days
    //               </label>
    //             </div>
    //           </div>
    //           <div className="grid md:grid-cols-2 md:gap-6">
    //             <div className="mb-6">
    //               <div className="relative z-0 w-full mb-2 group">
    //                 {/* <input
    //                   type="text"
    //                   // name="floating_first_name"
    //                   id="floating_first_name"
    //                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //                   placeholder=" "

    //                 // {...register( "opportunities")}
    //                 // required

    //                 // onChange={handleInputChange}

    //                 /> */}
    //                 <div className="pt-2 flex gap-4 max-w-3xl mt-2 flex-wrap">
    //                   <input
    //                     type="radio"
    //                     name="daily"
    //                     id="daily"
    //                     className="h-6 w-6"
    //                   />
    //                   <label className="text-[12px]">Daily</label>
    //                   <input
    //                     type="radio"
    //                     name="weekly"
    //                     id="weekly"
    //                     className="h-6 w-6"
    //                   />
    //                   <label className="text-[12px]">Weekly</label>
    //                   <input
    //                     type="radio"
    //                     name="monthly"
    //                     id="monthly"
    //                     className="h-6 w-6"
    //                   />
    //                   <label className="text-[12px]">Monthly</label>
    //                 </div>
    //                 {/* <p className="text-[15px] font-medium  mb-3">0</p>
    //                 <Separator className="my-3 md:my-8 bg-bm__beige" /> */}
    //                 <div className="pt-2">
    //                   <p className="text-[12px] text-bm__btn__grey">
    //                     &#x20A6; 0
    //                   </p>

    //                   <Separator className="bg-bm__beige my-2" />
    //                 </div>
    //                 <label
    //                   htmlFor="floating_first_name"
    //                   className="peer-focus:font-medium absolute text-[12px] leading-3 text-[#252525] dark:text-gray-400 duration-300 transform -translate-y-6  top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    //                 >
    //                   Brand Ambassador
    //                 </label>
    //               </div>
    //               {/* <p className="text-[12px] text-bm__btn__grey">
    //                 E.g, Supervisor, Brand Ambassador, Usher, etc.
    //               </p> */}
    //             </div>
    //           </div>
    //           <div className="grid md:grid-cols-2 md:gap-6">
    //             <div className="relative  z-0 w-full mb-6 group">
    //               {/* <input
    //                 type="text"
    //                 name="floating_first_name"
    //                 id="floating_first_name"
    //                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //                 placeholder=" "
    //                 required
    //               /> */}
    //               <div className="pt-2 flex gap-4 max-w-3xl mt-2 flex-wrap">
    //                 <input
    //                   type="radio"
    //                   name="daily"
    //                   id="daily"
    //                   className="h-6 w-6"
    //                 />
    //                 <label className="text-[12px]">Daily</label>
    //                 <input
    //                   type="radio"
    //                   name="weekly"
    //                   id="weekly"
    //                   className="h-6 w-6"
    //                 />
    //                 <label className="text-[12px]">Weekly</label>
    //                 <input
    //                   type="radio"
    //                   name="monthly"
    //                   id="monthly"
    //                   className="h-6 w-6"
    //                 />
    //                 <label className="text-[12px]">Monthly</label>
    //               </div>
    //               <div className="pt-2">
    //                 <p className="text-[12px] text-bm__btn__grey">&#x20A6; 0</p>

    //                 <Separator className="bg-bm__beige my-2" />
    //               </div>
    //               <label
    //                 htmlFor="floating_first_name"
    //                 className="peer-focus:font-medium absolute text-[12px] leading-3 text-[#252525] dark:text-gray-400 duration-300 transform -translate-y-6 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    //               >
    //                 Supervisor
    //               </label>
    //             </div>
    //           </div>
    //         </form>
    //       </CardContent>
    //     </Card>
    //     <div className="flex justify-between">
    //       <div className="flex whitespace-nowrap gap-4 md:gap-8">
    //         <Button className="light__btn max-w-[100px]" onClick={cancel}>
    //           Cancel
    //         </Button>
    //         <Button className="light__btn max-w-[100px]" onClick={prev}>
    //           Back
    //         </Button>
    //       </div>
    //       <div className="flex whitespace-nowrap gap-4 md:gap-8">
    //         <Button className="dark__btn" onClick={next}>
    //           Save and Next
    //         </Button>
    //       </div>
    //     </div>
    //   </Card>
    // </div>
    <div className="px-4 pb-4  md:px-12 xl:px-40">
      <Card className="p-4 md:p-8  bg-white">
        <ChevBackground text="Tell us your budget for this project" stage="4" />
        <Card className="w-full py-6 my-7">
          <CardContent>
            <p className="text-[12px] font-normal">
              This will help available talents to know the amount they will be
              earning
            </p>
            <Separator className="my-3 md:my-8 bg-bm__beige" />
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative  z-0 w-full mb-6 group">
                <div className="pt-2 flex gap-2 max-w-3xl mt-2 mb-4 cursor-pointer flex-wrap font-semibold">
                  {daysOfWeek.map(({ label, value }: DayObject, index) => (
                    <div
                      key={index}
                      className={` rounded-md p-2 px-3 ${
                        workDays.includes(value)
                          ? "bg-[#252525] text-white"
                          : "bg-bm_card_grey"
                      }`}
                      onClick={() => handleDayToggle(value)}
                    >
                      {label}
                    </div>
                  ))}
                </div>

                {errors.workingDays &&
                  errors.workingDays.type === "required" && (
                    <p className="max-w-[350px] text-[#f21e08] py-[2px] px-0 mt-[2px] fo font-light">
                      working days is required.
                    </p>
                  )}
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-semi-bold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Working days
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              {requiredTalents.map((talent, index) => (
                <div className="mb-6" key={index}>
                  <div className="relative z-0 w-full mb-2 group">
                    <RadioGroup
                      defaultValue=""
                      className="pt-2 flex gap-4 max-w-3xl mt-2 flex-wrap"
                      onValueChange={(e) => handlePaymentChange(e, index)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="daily" id="daily" />
                        <Label htmlFor="daily" className="text-[12px]">
                          Daily
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="weekly" id="weekly" />
                        <Label htmlFor="weekly" className="text-[12px]">
                          Weekly
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly" className="text-[12px]">
                          Monthly
                        </Label>
                      </div>
                    </RadioGroup>
                    <div className="pt-2">
                      <div className="">
                        <div className="relative z-0 w-full mb-6 group">
                          <input
                            type="salary"
                            id="salary"
                            name="salary"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={requiredTalents[index].salary || ""}
                            onChange={(e) => handleInputChange(e, index)}
                          />
                          {errors.qualifcations && (
                            <p className="text-red-800 block mt-2">
                              {errors.qualifications.message}
                            </p>
                          )}

                          <label
                            htmlFor="salary"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 top-3 left-2 bg-white px-1 peer-focus:font-medium duration-300 scale-75 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            &#x20A6;
                          </label>
                        </div>
                      </div>
                      {/* <Separator className="bg-bm__beige my-2" /> */}
                    </div>
                    <label
                      htmlFor="floating_first_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      {talent.talentType}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-4 md:mb-0">
            <Button
              className="light__btn max-w-full md:max-w-[100px]"
              onClick={cancel}
            >
              Cancel
            </Button>
            <Button
              className="light__btn max-w-full md:max-w-[100px]"
              onClick={prev}
            >
              Back
            </Button>
          </div>
          <div className="flex gap-4 md:gap-8">
            <Button
              className="dark__btn"
              onClick={() => {
                next();
                localStorage.setItem(
                  "projectBudget",
                  JSON.stringify(requiredTalents)
                );
              }}
            >
              Save and Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
