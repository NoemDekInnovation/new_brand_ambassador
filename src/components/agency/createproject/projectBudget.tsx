"use client";

import ChevBackground from "../../../ui/chevbackground";
import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type DayOfWeek = "S" | "M" | "T" | "W" | "T" | "F" | "S" | string;

interface DayObject {
  value: string;
  label: DayOfWeek;
}

const daysOfWeek: DayObject[] = [
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
  register,
  errors,
}: {
  next: () => void;
  prev: () => void;
  cancel: () => void;
  register: any;
  errors: any;
}) {
  const { control } = useForm();
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);

  const handleDayToggle = (day: DayOfWeek): void => {
    setSelectedDays((prevSelectedDays: DayOfWeek[]) => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter((selectedDay) => selectedDay !== day);
      } else {
        return [...prevSelectedDays, day];
      }
    });
  };
  console.log(selectedDays);

  return (
    <div className="px-4 pb-4  md:px-12 xl:px-40">
      <Card className="p-4 md:p-8 m-8 bg-white">
        <ChevBackground text="Tell us your budget for this project" stage="4" />
        <Card className="w-full py-6 my-7">
          <CardContent>
            <p className="text-[12px] font-light">
              This will help available talents to know the amount they will be
              earning
            </p>
            <Separator className="my-3 md:my-8 bg-bm__beige" />
            {/* <p className="text-[15px] font-medium  mb-3">Project Title</p> */}
            <form>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative  z-0 w-full mb-6 group">
                  {/* <input
                    type="text"
                    name="floating_first_name"
                    id="floating_first_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "

                  // {...register("workingDays", { required: true })}
                  // required
                  /> */}
                  {/* <div className="pt-2 flex gap-6 max-w-3xl mt-2 mb-4">
                    <div className="bg-bm_card_grey text-bm_black rounded-md p-2 px-3">
                      S
                    </div>
                    <div className="bg-bm_card_grey text-bm_black rounded-md p-2 px-3">
                      M
                    </div>
                    <div className="bg-bm_card_grey text-bm_black rounded-md p-2 px-3">
                      T
                    </div>
                    <div className="bg-bm_card_grey text-bm_black rounded-md p-2 px-3">
                      W
                    </div>
                    <div className="bg-bm_card_grey text-bm_black rounded-md p-2 px-3">
                      T
                    </div>
                    <div className="bg-bm_card_grey text-bm_black rounded-md p-2 px-3">
                      F
                    </div>
                    <div className="bg-bm_card_grey text-bm_black rounded-md p-2 px-3">
                      S
                    </div>
                  </div> */}
                  <div className="pt-2 flex gap-6 max-w-3xl mt-2 mb-4 cursor-pointer flex-wrap">
                    {daysOfWeek.map(({ label, value }: DayObject, index) => (
                      <div
                        key={index}
                        className={`bg-bm_card_grey rounded-md p-2 px-3 ${
                          selectedDays.includes(value)
                            ? "bg-[#252525] text-white"
                            : ""
                        }`}
                        onClick={() => handleDayToggle(value)}
                        // {...register(`workingDays[${value}]`)}
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
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Working days
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="mb-6">
                  <div className="relative z-0 w-full mb-2 group">
                    {/* <input
                      type="text"
                      // name="floating_first_name"
                      id="floating_first_name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "

                    // {...register( "opportunities")}
                    // required

                    // onChange={handleInputChange}


                    /> */}
                    <div className="pt-2 flex gap-4 max-w-3xl mt-2 flex-wrap">
                      <input
                        type="radio"
                        name="daily"
                        id="daily"
                        className="h-6 w-6"
                      />
                      <label>Daily</label>
                      <input
                        type="radio"
                        name="weekly"
                        id="weekly"
                        className="h-6 w-6"
                      />
                      <label>Weekly</label>
                      <input
                        type="radio"
                        name="monthly"
                        id="monthly"
                        className="h-6 w-6"
                      />
                      <label>Monthly</label>
                    </div>
                    {/* <p className="text-[15px] font-medium  mb-3">0</p>
                    <Separator className="my-3 md:my-8 bg-bm__beige" /> */}
                    <div className="pt-2">
                      <p className="text-[12px] text-bm__btn__grey">
                        &#x20A6; 0
                      </p>

                      <Separator className="bg-bm__beige my-2" />
                    </div>
                    <label
                      htmlFor="floating_first_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Brand Ambassador
                    </label>
                  </div>
                  {/* <p className="text-[12px] text-bm__btn__grey">
                    E.g, Supervisor, Brand Ambassador, Usher, etc.
                  </p> */}
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative  z-0 w-full mb-6 group">
                  {/* <input
                    type="text"
                    name="floating_first_name"
                    id="floating_first_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  /> */}
                  <div className="pt-2 flex gap-4 max-w-3xl mt-2 flex-wrap">
                    <input
                      type="radio"
                      name="daily"
                      id="daily"
                      className="h-6 w-6"
                    />
                    <label>Daily</label>
                    <input
                      type="radio"
                      name="weekly"
                      id="weekly"
                      className="h-6 w-6"
                    />
                    <label>Weekly</label>
                    <input
                      type="radio"
                      name="monthly"
                      id="monthly"
                      className="h-6 w-6"
                    />
                    <label>Monthly</label>
                  </div>
                  <div className="pt-2">
                    <p className="text-[12px] text-bm__btn__grey">&#x20A6; 0</p>

                    <Separator className="bg-bm__beige my-2" />
                  </div>
                  <label
                    htmlFor="floating_first_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Supervisor
                  </label>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="flex justify-between">
          <div className="flex whitespace-nowrap gap-4 md:gap-8">
            <Button className="light__btn max-w-[100px]" onClick={cancel}>
              Cancel
            </Button>
            <Button className="light__btn max-w-[100px]" onClick={prev}>
              Back
            </Button>
          </div>
          <div className="flex whitespace-nowrap gap-4 md:gap-8">
            <Button className="dark__btn" onClick={next}>
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
