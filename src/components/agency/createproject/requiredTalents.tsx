"use client";

import ChevBackground from "../../../ui/chevbackground";
import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import React, { useEffect, useState, useRef } from "react";
import Select, { SingleValue } from "react-select";
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
import { RequiredTalentsProps } from "../../../redux/types";
import { ImCancelCircle } from "react-icons/im";

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
  errors,
  requiredTalents,
  setRequiredTalents,
}: {
  next: () => void;
  prev: () => void;
  cancel: () => void;
  errors: any;
  setRequiredTalents: any;
  requiredTalents: RequiredTalentsProps[];
}) {
  const handleAddTalentType = () => {
    setRequiredTalents([
      ...requiredTalents,
      {
        opportunities: "",
        qualifications: "",
        skills: [],
      },
    ]);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target as { name: string; value: string };
    setIndex(index);
    // console.log(name, value);

    const updatedExperiences = [...requiredTalents];
    updatedExperiences[index][name] = value;
    setRequiredTalents(updatedExperiences);
    checkFormValidity();
  };

  const handleChangeTalent = (
    value: SingleValue<{ label: string; value: string }>,
    index: number
  ) => {
    if (value !== null) {
      const updatedTalentType = [...requiredTalents];
      updatedTalentType[index].opportunities = value.value;
      setRequiredTalents(updatedTalentType);
    }
    checkFormValidity();
  };

  const handleChangeQualification = (
    value: SingleValue<{ label: string; value: string }>,
    index: number
  ) => {
    if (value !== null) {
      const updatedTalentType = [...requiredTalents];
      updatedTalentType[index].qualifications = value.value;
      setRequiredTalents(updatedTalentType);
    }
    checkFormValidity();
  };

  const talentOptions: any = [
    { label: "Brand Ambassador", value: "ba" },
    { label: "Supervisor", value: "supervisor" },
    { label: "Usher", value: "usher" },
  ];

  const qualificationOptions = [
    { label: "Bachelors Degree", value: "Bachelors Degree" },
    { label: "Masters Degree", value: "Masters Degree" },
    { label: "Secondary School", value: "Secondary School" },
  ];

  const { loading, skills, error, skillsFetchSucess } = useSelector(
    (state: any) => state.skills
  ) as SkillsStateProps;

  // const [skillOption, setSkillOption] = useState<skillsOption[]>([]);
  // const [selectedSkill, setSelectedSkill] = useState<skillsOption | null>(null);
  // const [selectDummyData, setSelectDummyData] = useState("")
  const [example, setExample] = useState("");
  const [selectedIndex, setIndex] = useState(0);

  const [skillData, setSkillData] = useState<string[]>([]);
  const [skillStore, setSkillStore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedRequiredTalent =
      typeof window !== undefined && localStorage.getItem("requiredTalent");
    if (savedRequiredTalent) {
      setRequiredTalents(JSON.parse(savedRequiredTalent));
    }
    // console.log(savedRequiredTalent);
  }, []);

  const [repeat, setFormRepeat] = useState([
    { talent: "", qualifications: "", skills: [], skillStore: false },
  ]);

  const handleSkillSelect = (id: any, index: number) => {
    setSkillData([...skillData, id]);
    setSkillStore(false);
    // console.log(id);
    if (id !== null) {
      const updatedExperiences = [...requiredTalents];
      updatedExperiences[index].skills.push(id);
      setRequiredTalents(updatedExperiences);
    }
    checkFormValidity();
  };

  // const handleSkillDelete = (index: number) => {
  //   const updatedSkillData = [...skillData];
  //   updatedSkillData.splice(index, 1);
  //   console.log(updatedSkillData);
  //   setSkillData(updatedSkillData);
  // };

  const handleSkillDelete = (index: number) => {
    setSkillData((prevSkillData) => {
      const updatedSkillData = prevSkillData.filter((_, i) => i !== index);
      // console.log(updatedSkillData);
      return updatedSkillData;
    });
  };

  const handleRemoveTalentType = (indexToRemove: any) => {
    setRequiredTalents((prevTalents: any) => {
      const updatedTalents = [...prevTalents];
      updatedTalents.splice(indexToRemove, 2);
      return updatedTalents;
    });
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
        // console.log("Updated SkillData:", skillData);
      }, 2000);
      // checkFormValidity();
    }
  }, [skillsFetchSucess]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchSkills(example));
      setIsLoading(false);
      // checkFormValidity();
    };
    fetchData();
  }, [example, dispatch]);

  const [isFormValid, setIsFormValid] = useState(false);

  const checkFormValidity = () => {
    const isFormValid = Object.values(requiredTalents).every(
      (field) => typeof field === "string" && (field as string).trim() !== ""
    );

    setIsFormValid(isFormValid);
  };

  useEffect(() => {
    checkFormValidity();
  }, [requiredTalents, skillData, example]);

  return (
    <div className="px-4 pb-4  md:px-12 xl:px-40">
      <Card className="p-4 md:p-8 bg-white overflow-y-scroll h-[83vh]">
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
            <div className="flex flex-col w-[800px]">
              {requiredTalents.map((talent, index) => (
                <div key={index} className="">
                  <div className="flex justify-end">
                    <ImCancelCircle
                      className="cursor-pointer"
                      onClick={() => handleRemoveTalentType(index)}
                    />
                  </div>
                  <div className="  ">
                    <div className=" mb-6 relative w-full">
                      <div className="relative z-[50] w-full mb-2 group">
                        <label
                          htmlFor="floating_first_name"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 top-3 left-2 bg-white px-1"
                        >
                          Select Talent Type
                        </label>
                        <Select
                          options={talentOptions}
                          onChange={(e: any) => handleChangeTalent(e, index)}
                          className="mt-4 p-2 rounded-md w-full"
                          required
                          defaultValue={{
                            value: requiredTalents[index].opportunities,
                            label: requiredTalents[index].opportunities,
                          }}
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
                    <div className="relative z-[10] w-full mb-6 group">
                      <Select
                        options={qualificationOptions}
                        onChange={(e) => handleChangeQualification(e, index)}
                        className="mt-4 p-2 rounded-md w-full"
                        required
                        defaultValue={{
                          value: requiredTalents[index].qualifications,
                          label: requiredTalents[index].qualifications,
                        }}
                      />
                      {errors.qualifications && (
                        <p className="text-red-800 block mt-2">
                          {errors.qualifications.message}
                        </p>
                      )}

                      <label
                        htmlFor="qualification"
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
                              name="example"
                              id="example"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              onChange={(e) => {
                                setExample(e.target.value);
                                // handleInputChange(e, index);
                              }}

                              // value={example}
                            />
                          </div>
                          <label
                            htmlFor="example"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 top-3 left-2 bg-white px-1 mb-6"
                          >
                            Add relevant skills
                          </label>
                          <ul
                            key={skillData.length}
                            className="flex flex-wrap max-w-md"
                          >
                            {talent?.skills?.map((d, index) => (
                              <li className="p-2 flex items-center" key={index}>
                                <p className="flex items-center whitespace-nowrap justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 dark__btn max-w-[200px] cursor-pointer">
                                  {d}
                                  <GrFormClose
                                    className="ml-2 cursor-pointer"
                                    onClick={() => handleSkillDelete(index)}
                                  />
                                </p>
                              </li>
                            ))}
                          </ul>
                          {selectedIndex === index && (
                            <div className="relative z-50">
                              <div className="absolute max-h-80 overflow-y-auto bg-white p-2">
                                <ul className="list-none">
                                  {skillStore &&
                                    skills.results.map((skill, i) => (
                                      <li
                                        className="rounded bg-white px-4 py-2 mb-1 text-gray-800 max-w-xs"
                                        key={i}
                                      >
                                        <button
                                          onClick={() =>
                                            handleSkillSelect(skill, index)
                                          }
                                          className="ml-2"
                                        >
                                          {skill}
                                        </button>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </div>
                          )}
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
              onClick={handleAddTalentType}
              className="dark__btn max-w-[200px]"
            >
              Add talent type
            </Button>
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
                  "requiredTalent",
                  JSON.stringify(requiredTalents)
                );
              }}
              disabled={isFormValid}
            >
              Save and Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
