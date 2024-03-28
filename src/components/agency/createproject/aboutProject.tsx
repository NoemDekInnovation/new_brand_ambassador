"use client";

import ChevBackground from "../../../ui/chevbackground";
import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import React, { useEffect, useState } from "react";
import { Textarea } from "../../../ui/textarea";
import { AboutProjectProps } from "../../../redux/types";
import Select from "react-select";
import SelectOption from "../../../libs/select";
import StateOptions from "../../../libs/stateOptions";

export default function AboutProject({
  next,
  prev,
  cancel,
  aboutProject,
  setAboutProject,
}: {
  next: () => void;
  prev: () => void;
  cancel: () => void;
  setAboutProject: any;
  aboutProject: AboutProjectProps;
}) {
  // const formValues = formInput.getValues()
  // console.log(formValues.projectTitle);
  console.log(aboutProject.startDate);
  useEffect(() => {
    const savedAboutProject =
      typeof window !== undefined && localStorage.getItem("aboutProject");
    if (savedAboutProject) {
      setAboutProject(JSON.parse(savedAboutProject));
    }
    // console.log(savedAboutProject);
  }, []);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    fieldName: string
  ) => {
    const { name, value } = e.target;

    // const truncatedValue = value.slice(0, 250);

    // setAboutProject((prevData: AboutProjectProps) => ({
    //   ...prevData,
    //   [fieldName]: truncatedValue,
    // }));
    if (fieldName === "startDate" || fieldName === "endDate") {
      // Get the current date
      const currentDate = new Date();

      // Get the selected date
      const selectedDate =
        fieldName === "startDate" ? currentDate : new Date(value + "T00:00:00");

      if (selectedDate < currentDate) {
        // Display an error message
        console.error("Selected date cannot be in the past");
        // Optionally, you can set an error state to display a message in your UI
      } else if (
        fieldName === "endDate" &&
        selectedDate <= new Date(aboutProject.startDate + "T00:00:00")
      ) {
        // Display an error message
        console.error("End date cannot be before or equal to start date");
        // Optionally, you can set an error state to display a message in your UI
      } else {
        // No error, update the state with truncated value
        const truncatedValue = value.slice(0, 250);
        setAboutProject((prevData: AboutProjectProps) => ({
          ...prevData,
          [fieldName]: truncatedValue,
        }));
      }
    } else {
      // For other fields, update the state directly with truncated value
      const truncatedValue = value.slice(0, 250);
      setAboutProject((prevData: AboutProjectProps) => ({
        ...prevData,
        [fieldName]: truncatedValue,
      }));
    }
    checkFormValidity();
  };
  const [isFormValid, setIsFormValid] = useState(false);

  const checkFormValidity = () => {
    const isFormValid = Object.values(aboutProject).every((field) => {
      // Check if the field is an array and every element in the array is a non-empty string
      if (Array.isArray(field)) {
        return field.every(
          (element) => typeof element === "string" && element.trim() !== ""
        );
      }
      return typeof field === "string" && field.trim() !== "";
    });

    setIsFormValid(isFormValid);
  };

  console.log({ aboutProject });

  const handleLocationChange = (selectedOptions: any) => {
    const selectedLocations = selectedOptions.map(
      (option: any) => option.value
    );

    setAboutProject((prevData: AboutProjectProps) => ({
      ...prevData,
      projectLocation: selectedLocations,
    }));
  };

  useEffect(() => {
    checkFormValidity();
  }, [aboutProject]);

  const projectCategoryOptions: any = [
    { value: "Advertising", label: "Advertising" },
    { value: "Branding", label: "Branding" },
    { value: "Content Creation", label: "Content Creation" },
    { value: "Digital Marketing", label: "Digital Marketing" },
    { value: "Event", label: "Event" },
    { value: "Experiential Marketing", label: "Experiential Marketing" },
    { value: "Influencer Marketing", label: "Influencer Marketing" },
    { value: "Marketing", label: "Marketing" },
    { value: "Public Relations", label: "Public Relations" },
    { value: "Social Media", label: "Social Media" },
    { value: "Strategy", label: "Strategy" },
    { value: "Other", label: "Other" },
  ];

  const locationOptions = StateOptions.map((location) => ({
    value: location.value,
    label: location.label,
  }));

  const newLocation = aboutProject?.projectLocation?.map((location: any) => ({
    value: location,
    label: location,
  }));

  const newCategory = {
    value: aboutProject.projectCategory,
    label: aboutProject.projectCategory,
  };

  const originalDate = new Date(aboutProject.startDate);

  const year = originalDate.getFullYear();
  const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
  const day = originalDate.getDate().toString().padStart(2, "0");

  const formattedDate =
    aboutProject.startDate !== undefined ? `${year}-${month}-${day}` : "";

  const endDate = new Date(aboutProject?.endDate);

  const yearx = originalDate.getFullYear();
  const monthx = (originalDate.getMonth() + 1).toString().padStart(2, "0");
  const dayx = endDate.getDate().toString().padStart(2, "0");

  const formattedDatex =
    aboutProject.endDate !== undefined ? `${yearx}-${monthx}-${dayx}` : "";

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
                      value={aboutProject.projectTitle}
                      onChange={(e) => handleInputChange(e, "projectTitle")}
                      required
                    />
                    {/* {errors.projectTitle && (
                      <p className="text-red-800 block mt-2">
                        {errors.projectTitle.message}
                      </p>
                    )} */}

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
                <div className="relative w-full mb-2 group">
                  <label
                    // htmlFor=""
                    className="text-[14px] text-bm__btn__grey"
                  >
                    Project Category
                  </label>
                  <SelectOption
                    // className="py-2.5"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white peer"
                    placeholder="Select Category "
                    id="projectCategory"
                    name="projectCategory"
                    onChange={(e: any) =>
                      setAboutProject((prevData: AboutProjectProps) => ({
                        ...prevData,
                        projectCategory: e.value,
                      }))
                    }
                    required
                    options={projectCategoryOptions}
                    defaultValue={newCategory}
                    isDisabled={false}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative  z-0 w-full mb-6 group">
                  {/* <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    id="projectCode"
                    name="projectCode"
                    value={aboutProject.projectCode}
                    onChange={(e) => handleInputChange(e, "projectCode")}
                    required
                  /> */}
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
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formattedDate}
                    onChange={(e) => handleInputChange(e, "startDate")}
                    required
                  />

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
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formattedDatex}
                      onChange={(e) => handleInputChange(e, "endDate")}
                      required
                    />
                    <label
                      htmlFor="floating_last_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    ></label>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative  z-0 w-full mb-6 group">
                  <label className="text-[14px] text-bm__btn__grey">
                    Location{" "}
                  </label>
                  {/* <SelectOption
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white peer"
                    id="projectLocation"
                    name="projectLocation"
                    defaultValue={aboutProject.projectLocation}
                    onChange={(e: any) =>
                      setAboutProject((prevData: AboutProjectProps) => ({
                        ...prevData,
                        projectLocation: e.value,
                      }))
                    }
                    placeholder="Select Location"
                    required
                    isDisabled={false}
                    options={StateOptions}
                  /> */}
                  <Select
                    defaultValue={newLocation}
                    isMulti
                    name="languages"
                    options={locationOptions}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0  border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    classNamePrefix="select"
                    onChange={handleLocationChange}
                  />
                </div>
              </div>
              <p className="text-[15px] font-medium  mb-3">
                Project Description
              </p>
              <Textarea
                placeholder="Describe your project here..."
                className="min-h-[250px]"
                id="projectDescription"
                name="projectDescription"
                value={aboutProject.projectDescription}
                onChange={(e) => handleInputChange(e, "projectDescription")}
                required
              />
              <p className="text-[12px] text-bm__btn__grey mt-3">
                {250 - aboutProject.projectDescription.length} Characters
                remaining
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
            {/* <Button className="dark__btn" type="button" onClick={next}>
              Save and Next
            </Button> */}
            <Button
              className="dark__btn"
              onClick={() => {
                next();
                localStorage.setItem(
                  "aboutProject",
                  JSON.stringify(aboutProject)
                );
              }}
              // disabled={!isFormValid}
            >
              Save and Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
