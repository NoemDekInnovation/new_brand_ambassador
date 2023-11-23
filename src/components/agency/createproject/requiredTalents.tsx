"use client";

import ChevBackground from "../../../ui/chevbackground";
import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSkills,
  reset,
  SkillsStateProps,
} from "../../../redux/skills.slice";
import { AppDispatch } from "../../../redux/store";
import { GrFormClose } from "react-icons/gr";
import { MdOutlineAddCircleOutline } from "react-icons/md";

const animatedComponents = makeAnimated();

const customStyles = {
  control: (provided: any, state: { isFocused: any }) => ({
    ...provided,
    border: state.isFocused ? "2px solid blue" : "2px solid gray", // Border style on focus
    borderRadius: "8px",
    boxShadow: state.isFocused ? "0 0 0 1px blue" : "none", // Box shadow on focus
    "&:hover": {
      borderColor: "blue", // Border color on hover
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "lightgray", // Background color of the dropdown menu
  }),
  option: (provided: any, state: { isSelected: any }) => ({
    ...provided,
    backgroundColor: state.isSelected ? "white" : "white", // Background color of selected option
    color: state.isSelected ? "black" : "black", // Text color of selected option
    "&:hover": {
      backgroundColor: "lightblue", // Background color of option on hover
    },
  }),
};

interface skillsOption {
  value: string;
  label: string;
}

export default function RequiredTalents({
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
  const talentOptions = [
    { label: "Brand Ambassador", value: "brand ambassador" },
    { label: "Supervisor", value: "supervisor" },
    { label: "Usher", value: "usher" },
  ];

  const { loading, skills, error, skillsFetchSucess } = useSelector(
    (state: any) => state.skills
  ) as SkillsStateProps;

  // const [skillOption, setSkillOption] = useState<skillsOption[]>([]);
  // const [selectedSkill, setSelectedSkill] = useState<skillsOption | null>(null);
  // const [selectDummyData, setSelectDummyData] = useState("")
  const [example, setExample] = useState("");
  const [skillData, setSkillData] = useState<string[]>([]);
  const [skillStore, setSkillStore] = useState<boolean>(false);

  const [repeat, setFormRepeat] = useState([
    { talent: "", qualifications: "", skills: [], skillStore: false },
  ]);

  const handleSkillSelect = (id: any) => {
    setSkillData([...skillData, id]);
    setSkillStore(false);
    console.log(id);
  };

  const handleSkillDelete = (index: number) => {
    const updatedSkillData = [...skillData];
    updatedSkillData.splice(index, 1);
    setSkillData(updatedSkillData);
  };

  const [formData, setFormData] = useState([
    { talent: "", qualifications: "", skills: "" },
  ]);

  const handleAddTalent = () => {
    setFormData([...formData, { talent: "", qualifications: "", skills: "" }]);
  };

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (skillsFetchSucess) {
      setSkillStore(true);
      setTimeout(() => {
        dispatch(reset());
      }, 2000);
    }
  }, [skillsFetchSucess]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  useEffect(() => {
    dispatch(fetchSkills(example));
  }, [example]);

  return (
    <div className="px-4 pb-4  md:px-12 xl:px-40">
      <Card className="p-4 md:p-8 mt-5 bg-white h-[2000px]">
        <ChevBackground
          text="Specify the talent you want and the skills required"
          stage="3"
        />
        <Card className="w-full py-6 my-7">
          <CardContent>
            <p className="text-[12px] font-light">
              Specify the required talent and qualification for your project.
            </p>
            <Separator className="my-3 md:my-8 bg-bm__beige" />
            {/* <p className="text-[15px] font-medium  mb-3">Project Title</p> */}
            <div className="grid md:grid-cols-2 gap-6">
              {formData.map((form, index) => (
                <div key={index} className="">
                  <div className="  ">
                    <div className=" mb-6 relative w-full">
                      <div className="relative w-full mb-2 group">
                        <label
                          htmlFor="floating_first_name"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 top-3 left-2 bg-white px-1"
                        >
                          Select Talent Type
                        </label>
                        <Select
                          options={talentOptions}
                          // {...register()}

                          className="mt-4 p-2 rounded-md w-full"
                        />
                      </div>
                      {errors.opportunities && (
                        <p className="text-red-800 block mt-2">
                          {errors.opportunities.message}
                        </p>
                      )}
                      <p className="text-[12px] text-bm__btn__grey pl-2">
                        E.g, Supervisor, Brand Ambassador, Usher, etc.
                      </p>
                    </div>
                  </div>

                  <div className="">
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="qualifications"
                        id="qualifications"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      {errors.qualifications && (
                        <p className="text-red-800 block mt-2">
                          {errors.qualifications.message}
                        </p>
                      )}

                      <label
                        htmlFor="floating_first_name"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 top-3 left-2 bg-white px-1 peer-focus:font-medium duration-300 scale-75 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Qualification{" "}
                      </label>
                    </div>
                  </div>

                  <div className="mt-14">
                    <div className="mb-6 relative">
                      <div className="relative  w-full mb-2 group">
                        <label
                          htmlFor="floating_first_name"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 top-3 left-2 bg-white px-1 mb-6"
                        >
                          Add relevant skills
                        </label>
                        <div className="relative">
                          <div className="flex justify-between">
                            <input
                              type="text"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              // {...register()}
                              onChange={(e) => {
                                setExample(e.target.value);
                                // dispatch(fetchSkills(e.target.value))
                              }}
                              value={example}
                            />
                            {/* <button onClick={() => {
                              dispatch(fetchSkills(example))
                            }} className="dark__btn max-w-[100px] text-white rounded">search</button> */}
                          </div>

                          <label
                            htmlFor="floating_first_name"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 top-3 left-2 bg-white px-1 mb-6"
                          >
                            Add relevant skills
                          </label>

                          <ul className="flex flex-wrap max-w-md">
                            {skillData.map((d, index) => (
                              <li className="p-2 flex items-center" key={index}>
                                <p className="flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 dark__btn max-w-[200px] cursor-pointer">
                                  {d}
                                  <GrFormClose
                                    className="ml-2 cursor-pointer"
                                    onClick={() => handleSkillDelete(index)}
                                  />
                                </p>
                              </li>
                            ))}
                          </ul>

                          <div className="relative">
                            <div className="absolute max-h-80 overflow-y-auto bg-white p-2">
                              <ul className="list-none">
                                {skillStore &&
                                  skills.results.map((skill, i) => (
                                    <li
                                      className="rounded bg-white px-4 py-2 mb-1 text-gray-800 max-w-xs"
                                      key={i}
                                    >
                                      <button
                                        onClick={() => handleSkillSelect(skill)}
                                        className="ml-2"
                                      >
                                        {skill}
                                      </button>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      {errors.opportunities && (
                        <p className="text-red-800 block mt-2">
                          {errors.opportunities.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              onClick={handleAddTalent}
              className="dark__btn max-w-[200px]"
            >
              <div className="flex items-center gap-1">
                <MdOutlineAddCircleOutline className="text-[16px]" />
                Add talent type
              </div>
            </Button>
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
              Save and Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
