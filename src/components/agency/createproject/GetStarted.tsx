import ChevBackground from "../../../ui/chevbackground";
import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import React from "react";
import { Label } from "../../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";

export default function GetStarted({
  next,
  cancel,
}: {
  next: () => void;
  cancel: () => void;
}) {
  return (
    <div className="px-4 pb-4  md:px-12 xl:px-40">
      <Card className="p-4 md:p-8 m-8 bg-white">
        <ChevBackground text="Getting Started" stage="1" />
        <Card className="w-full py-6 my-7">
          <CardContent>
            <p className="text-[12px] font-light">
              Getting started, select any of the options below
            </p>
            <Separator className="my-3 md:my-8 bg-bm__beige" />
            <form action="">
              <RadioGroup defaultValue="option-one" className="space-y-10">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one">Create a new project</Label>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="option-two">Edit an existing draft</Label>
                  </div>
                  <div className="relative md:col-span-2 z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="floating_first_name"
                      id="floating_first_name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_first_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Select Project
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-three" id="option-three" />
                    <Label htmlFor="option-three">
                      {" "}
                      Reuse a previous project post
                    </Label>
                  </div>
                  <div className="relative md:col-span-2 z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="floating_first_name"
                      id="floating_first_name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_first_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Select Project
                    </label>
                  </div>
                </div>
              </RadioGroup>
            </form>
          </CardContent>
        </Card>
        <div className="flex justify-between">
          <div className="flex whitespace-nowrap gap-4 md:gap-8">
            <Button className="light__btn max-w-[100px]" onClick={cancel}>
              Cancel
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