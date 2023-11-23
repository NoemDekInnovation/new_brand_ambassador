"use client";

import ChevBackground from "../../../ui/chevbackground";
import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import React from "react";
import { Textarea } from "../../../ui/textarea";

export default function AboutProject({
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
  // const formValues = formInput.getValues()
  // console.log(formValues.projectTitle);

  return (
    <div className="px-4 pb-4  md:px-12 xl:px-40 ">
      <Card className="p-4 md:p-8 mt-5 bg-white overflow-y-scroll h-[83vh]">
        <ChevBackground text="Tell us about your project" stage="2" />
        <Card className="w-full py-6 my-7">
          <CardContent>
            <p className="text-[12px] font-light">
              This helps your project stand out to the right candidates. it is
              the first thing they will see
            </p>
            <Separator className="my-3 md:my-8 bg-bm__beige" />
            <form>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="mb-6">
                  <div className="relative  z-0 w-full mb-2 group">
                    <input
                      type="text"
                      id="floating_first_name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      {...register("projectTitle")}
                    />
                    {errors.projectTitle && (
                      <p className="text-red-800 block mt-2">
                        {errors.projectTitle.message}
                      </p>
                    )}

                    <label
                      htmlFor="floating_first_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Project Title{" "}
                    </label>
                  </div>
                  <p className="text-[12px] text-bm__btn__grey">
                    E.g, Nivea Activation, Lush Marketing, etc.
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative  z-0 w-full mb-6 group">
                  <input
                    type="text"
                    id="floating_first_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    {...register("projectCategory")}
                  />
                  {errors.projectCategory && (
                    <p className="text-red-800 block mt-2">
                      {errors.projectCategory.message}
                    </p>
                  )}

                  <label
                    htmlFor="floating_first_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Project Category
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative  z-0 w-full mb-6 group">
                  <input
                    type="text"
                    id="floating_first_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    {...register("projectCode")}
                  />
                  {errors.projectCode && (
                    <p className="text-red-800 block mt-2">
                      {errors.projectCode.message}
                    </p>
                  )}
                  <label
                    htmlFor="floating_first_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Project Code
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative  z-0 w-full mb-6 group">
                  <input
                    type="date"
                    id="startDate"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    {...register("projectDuration.startDate")}
                  />
                  {errors.projectDuration && (
                    <p className="text-red-800 block mt-2">
                      {errors.projectDuration.startDate.message}
                    </p>
                  )}

                  <label
                    htmlFor="floating_first_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Duration
                  </label>
                </div>
                <div className="flex gap-4 items-center">
                  to
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="date"
                      id="floating_last_name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      {...register("=projectDuration.endDate")}
                    />
                    {errors.projectDuration && (
                      <p className="text-red-800 block mt-2">
                        {errors.projectDuration.endDate.message}
                      </p>
                    )}
                    <label
                      htmlFor="floating_last_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    ></label>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative  z-0 w-full mb-6 group">
                  <input
                    type="text"
                    id="floating_first_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    {...register("projectLocation")}
                  />
                  {errors.projectLocation && (
                    <p className="text-red-800 block mt-2">
                      {errors.projectLocation.message}
                    </p>
                  )}
                  <label
                    htmlFor="floating_first_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Location{" "}
                  </label>
                </div>
              </div>
              <p className="text-[15px] font-medium  mb-3">
                Project Description
              </p>

              <Textarea
                placeholder="Describe your project here..."
                className="min-h-[250px]"
                {...register("projectDescription")}
              />
              {errors.projectDescription && (
                <p className="text-red-800 block mt-2">
                  {errors.projectDescription.message}
                </p>
              )}
              <p className="text-[12px] text-bm__btn__grey mt-3">
                250 Characters
              </p>
            </form>
          </CardContent>
        </Card>
        <div className="flex justify-between mb-5">
          <div className="flex whitespace-nowrap gap-4 md:gap-8">
            <Button className="light__btn max-w-[100px]" onClick={cancel}>
              Cancel
            </Button>
            <Button className="light__btn max-w-[100px]" onClick={prev}>
              Back
            </Button>
          </div>
          <div className="flex whitespace-nowrap gap-4 md:gap-8">
            <Button className="dark__btn" type="button" onClick={next}>
              Save and Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
