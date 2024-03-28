"use client";

import ChevBackground from "../../../../../ui/chevbackground";
import { Button } from "../../../../../ui/button";
import { Card, CardContent } from "../../../../../ui/card";
import { Separator } from "../../../../../ui/seperator";
import React, { useEffect, useState } from "react";
import { Textarea } from "../../../../../ui/textarea";
// import { AboutProjectProps } from "../../../redux/types";
import Select from "react-select";
// import SelectOption from "../../../../../libs/select";
import StateOptions from "../../../../../libs/stateOptions";
import { AboutProjectProps } from "../../../../../redux/types";
import SelectOption from "../../../../../libs/select";
import { authAxiosInstance } from "../../../../../api/axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { toast } from "../../../../../ui/use-toast";

const statesOptions = [
  {
    value: "North Central",
    label: "North Central",
    options: [
      { value: "Benue", label: "Benue" },
      { value: "Kogi", label: "Kogi" },
      { value: "Kwara", label: "Kwara" },
      { value: "Nasarawa", label: "Nasarawa" },
      { value: "Niger", label: "Niger" },
      { value: "Plateau", label: "Plateau" },
      {
        value: "Abuja",
        label: "Federal Capital Territory (FCT)",
      },
    ],
  },
  {
    value: "North East",
    label: "North East",
    options: [
      { value: "Adamawa", label: "Adamawa" },
      { value: "Bauchi", label: "Bauchi" },
      { value: "Borno", label: "Borno" },
      { value: "Gombe", label: "Gombe" },
      { value: "Taraba", label: "Taraba" },
      { value: "Yobe", label: "Yobe" },
    ],
  },
  {
    value: "North West",
    label: "North West",
    options: [
      { value: "Jigawa", label: "Jigawa" },
      { value: "Kaduna", label: "Kaduna" },
      { value: "Kano", label: "Kano" },
      { value: "Katsina", label: "Katsina" },
      { value: "Kebbi", label: "Kebbi" },
      { value: "Sokoto", label: "Sokoto" },
      { value: "Zamfara", label: "Zamfara" },
    ],
  },
  {
    value: "South East",
    label: "South East",
    options: [
      { value: "Abia", label: "Abia" },
      { value: "Anambra", label: "Anambra" },
      { value: "Ebonyi", label: "Ebonyi" },
      { value: "Enugu", label: "Enugu" },
      { value: "Imo", label: "Imo" },
    ],
  },
  {
    value: "South South",
    label: "South South",
    options: [
      { value: "Akwa Ibom", label: "Akwa Ibom" },
      { value: "Bayelsa", label: "Bayelsa" },
      { value: "Cross River", label: "Cross River" },
      { value: "Delta", label: "Delta" },
      { value: "Edo", label: "Edo" },
      { value: "Rivers", label: "Rivers" },
    ],
  },
  {
    value: "South West",
    label: "South West",
    options: [
      { value: "Ekiti", label: "Ekiti" },
      { value: "Lagos", label: "Lagos" },
      { value: "Ogun", label: "Ogun" },
      { value: "Ondo", label: "Ondo" },
      { value: "Osun", label: "Osun" },
      { value: "Oyo", label: "Oyo" },
    ],
  },
];

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
  const [region, setRegion] = useState("");
  const [state, setState] = useState("");
  const [states, setStates] = useState<any>();
  const [cities, setCities] = useState<
    { value: string; label: string }[] | null
  >(null);
  // {region:string, state:string,city:string}[]
  const [selectedLocations, setSelectedLocations] = useState<any>([]);
  const [city, setCity] = useState("");

  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const savedAboutProject =
      typeof window !== undefined && localStorage.getItem("aboutProject");
    if (savedAboutProject) {
      setAboutProject(JSON.parse(savedAboutProject));
    }
    // console.log(savedAboutProject);
  }, []);
  //   setSelectedLocations({});
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

  const regionsOptions = [
    {
      value: "North Central",
      label: "North Central",
    },
    {
      value: "North East",
      label: "North East",
    },
    {
      value: "North West",
      label: "North West",
    },
    {
      value: "South East",
      label: "South East",
    },
    {
      value: "South South",
      label: "South South",
    },
    {
      value: "South West",
      label: "South West",
    },
  ];

  const locationOptions = StateOptions.map((location) => ({
    value: location.value,
    label: location.label,
  }));

  //   const newLocation = aboutProject?.projectLocation?.map((location) => ({
  //     value: location,
  //     label: location,
  //   }));

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

  const handleRegion = (e: any) => {
    setRegion(e.value);
    const newStates = statesOptions.filter((s) => s.value === e.value);
    setStates(newStates);
  };

  const handleStateSelection = async (e: any) => {
    console.log(e);
    // const res = await authAxiosInstance(`/nigerian-cities?state=${e.value}`);

    const formattedValue = e.value.replace(/\s/g, "+");

    if (user?.accountId !== undefined) {
      try {
        const res = await authAxiosInstance(
          `/nigerian-cities?state=${formattedValue}`,
          {
            headers: {
              Authorization: `Bearer ${user.authKey || ""}`,
            },
          }
        );

        const cities = res.data.cities.map((c: string) => {
          return {
            label: c,
            value: c,
          };
        });
        // console.log{cities}
        setState(formattedValue);
        setCities(cities);
      } catch (error: any) {
        console.error("Error while posting data:", error);

        toast({
          description: error?.response?.data?.message,
          variant: "destructive",
        });
      }
    }
  };

  const handleLocationSelection = (e: any) => {
    // console.log(e.value);
    e.preventDefault();
    const loc = { region, state, city };

    // Check if the city already exists in selectedLocations
    const isCityExists = selectedLocations.some(
      // @ts-ignore
      (location: any) => location?.city.toLowerCase() === city.toLowerCase()
    );

    if (!isCityExists) {
      setSelectedLocations([...selectedLocations, loc]);
      setRegion("");
      setState("");
      setCity("");
      setAboutProject((prevData: AboutProjectProps) => ({
        ...prevData,
        projectLocation: loc,
      }));
      return;
    } else {
      // Handle the case where the city already exists
      console.log("City already exists in selectedLocations.");
    }
  };
  //   console.log({ selectedLocations });

  return (
    <div className="px-4 pb-4  md:px-12 xl:px-40 ">
      <Card className="p-4 md:p-8 mt-5 bg-white border-none overflow-y-scroll h-[83vh]">
        <ChevBackground text="Tell us about your project" stage="2" />
        <p className="text-[12px] font-light">
          This helps your project stand out to the right candidates. it is the
          first thing they will see
        </p>
        <form>
          <Card className="w-full py-4 pt-8 my-4">
            <CardContent>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="mb-6">
                  <div className="relative  z-0 w-full mb-2 group">
                    <input
                      type="text"
                      id="floating_first_name"
                      className="block py-2.5 px-0 w-full text-[12px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={aboutProject.projectTitle}
                      onChange={(e) => handleInputChange(e, "projectTitle")}
                      required
                    />
                    <label
                      htmlFor="floating_first_name"
                      className="peer-focus:font-medium absolute text-[12px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                    className="block py-2.5 px-0 w-full text-[12px] text-gray-900 bg-transparent border-0 appearance-none dark:text-white peer"
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
                  <input
                    className="block py-2.5 px-0 w-full text-[12px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                    className="peer-focus:font-medium absolute text-[12px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Duration
                  </label>
                </div>
                <div className="flex gap-4 items-center">
                  to
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      className="block py-2.5 px-0 w-full text-[12px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                      className="peer-focus:font-medium absolute text-[12px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    ></label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full py-6 pt-12 my-4">
            <CardContent>
              <label className="text-[14px] text-bm__btn__grey">
                Location{" "}
              </label>
              <div className="grid md:grid-cols-5 md:gap-6">
                <div className="relative  z-0 w-full mb-6 group col-span-2">
                  <SelectOption
                    // className="py-2.5"
                    className="block py-2.5 px-0 w-full text-[12px] text-gray-900 bg-transparent border-0 appearance-none dark:text-white peer"
                    placeholder="Select Region "
                    id="projectCategory"
                    name="projectCategory"
                    onChange={handleRegion}
                    required
                    options={regionsOptions}
                    defaultValue={region}
                    isDisabled={false}
                  />
                  <SelectOption
                    // className="py-2.5"
                    className="block py-2.5 px-0 w-full text-[12px] text-gray-900 bg-transparent border-0 appearance-none dark:text-white peer"
                    placeholder="Select State "
                    id="projectCategory"
                    name="projectCategory"
                    onChange={handleStateSelection}
                    required
                    options={states}
                    defaultValue={state}
                    isDisabled={false}
                  />
                  {cities && (
                    <SelectOption
                      // className="py-2.5"
                      className="block py-2.5 px-0 w-full text-[12px] text-gray-900 bg-transparent border-0 appearance-none dark:text-white peer"
                      placeholder="Select City "
                      id="projectCategory"
                      name="projectCategory"
                      onChange={(e: any) => setCity(e.value)}
                      required
                      // @ts-ignore
                      options={cities && cities}
                      defaultValue={city}
                      isDisabled={false}
                    />
                  )}
                  <Button
                    className="p-3 mt-4 border border-[#DDDFE0]  bg-[#f7f7f7] w-full"
                    onClick={handleLocationSelection}
                  >
                    Add Location
                  </Button>
                </div>
                <div className="col-span-3">
                  <div className="flex flex-wrap gap-3 md:gap-8 px-3">
                    {selectedLocations.map((p: any, idx: number) => {
                      return (
                        <div
                          className="border border-[#D7D8DA] px-4 md:px-6 py-2 flex items-center"
                          key={idx}
                        >
                          <span className="mr-3">x</span>
                          <div className="flex gap-2">
                            <p>{p.region}</p>
                            <p>{p.state}</p>
                            <p>{p.city}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full py-6 pt-12 my-4">
            <CardContent>
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
            </CardContent>
          </Card>
        </form>
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
