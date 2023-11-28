import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import { Textarea } from "../../../ui/textarea";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Progress } from "../../../ui/progress";
import { GrFormClose } from "react-icons/gr";
import { SkillsStateProps, fetchSkills } from "../../../redux/skills.slice";
import { useSelector, useDispatch } from "react-redux";
import { SkillProp } from "../../../redux/types";
import { AppDispatch } from "../../../redux/store";
import union from "../../../assets/Union1.png";
import subtract from "../../../assets/Subtract.png";
import subtract2 from "../../../assets/Subtract2.png";
import subtract3 from "../../../assets/Subtract3.png";

type TalentOption = {
  label: string;
  value: string;
};

export default function Skills({
  next,
  prev,
  cancel,
  create,
  handleSkillSelect,
  handleSkillDelete,
  skillsData,
  talentOptions,
}: {
  create: () => void;
  next: () => void;
  prev: () => void;
  cancel: () => void;
  talentOptions: TalentOption[];
  skillsData: string[];
  handleSkillSelect: (id: any) => void;
  handleSkillDelete: (index: number) => void;
}) {
  const { loading, skills, error, skillsFetchSucess } = useSelector(
    (state: any) => state.skills
  ) as SkillsStateProps;
  // console.log(skills);

  const [inputValue, setInputValue] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<TalentOption[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [example, setExample] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setIsSearching(true);

    if (value) {
      const searchLower = value.toLowerCase();
      const filtered = talentOptions.filter((option) =>
        option.label.toLowerCase().includes(searchLower)
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  };

  const handleOptionClick = (value: string) => {
    setInputValue(value);
    setIsSearching(false);
    setFilteredOptions([]);
  };
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchSkills(example));
  }, [example]);

  return (
    <div className=" bg-[#F3F3F3]/30   px-4 md:px-12 xl:px-40 h-[87.3vh] py-10">
      {/* <div className='fixed top-0 h-screen w-screen bg-[#F3F3F3]/30 z-[1000] mt-[20vh] px-4 md:px-12 xl:px-40 min-h-[70vh] py-10'> */}
      <Card className="bg-white  h-full p-2 md:p-4 flex-col flex">
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
          <div className=" relative text-black flex items-center justify-center">
            <p className="absolute top-[25%] text-[16px] z-20"> Address</p>
            <img src={subtract} alt="" className=" z-10 w-[300px] h-[50px]" />
          </div>

          <div className=" relative text-black flex items-center justify-center">
            <p className="absolute top-[15%] text-[14px]  leading-4 z-20">
              {" "}
              Education & <br /> Certification
            </p>
            <img src={subtract} alt="" className=" z-10 w-[300px] h-[50px]" />
          </div>

          <div className=" relative text-black flex items-center justify-center">
            <p className="absolute top-[25%] text-[16px] z-20"> Experience</p>
            <img src={subtract} alt="" className=" z-10 w-[300px] h-[50px]" />
          </div>

          <div className=" relative text-white flex items-center justify-center">
            <p className="absolute top-[15%] text-[14px] leading-4 z-20">
              Skills &<br /> Opportunities
            </p>
            <img src={subtract3} alt="" className=" z-10 w-[300px] h-[50px]" />
          </div>

          <div className=" relative text-black flex items-center justify-center">
            <p className="absolute top-[25%] text-[16px] z-20"> Socials</p>
            <img src={subtract2} alt="" className=" z-10 w-[300px] h-[50px]" />
          </div>
        </div>
        <CardContent className="border rounded-xl  p-8 flex-1 flex flex-col  mt-3">
          <p>Add your skills and the opportunities that you are open to.</p>

          <Separator className=" my-7 bg-[#D7D8DA]" />
          <div className="mt-2">
            <p>Skills</p>
            <div className="grid  md:gap-6 mt-4">
              <div className="relative  z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="floating_first_name"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  // value={formData.projectDuration.startDate}
                  // onChange={handleInputChange}
                  required
                  onChange={(e) => {
                    setExample(e.target.value);
                  }}
                  value={example}
                />
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Type and select your skills
                </label>
                <ul className="flex flex-wrap max-w-md">
                  {skillsData.map((data, index) => (
                    <li className="p-2 flex items-center" key={index}>
                      <p className="flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 dark__btn max-w-[200px] cursor-pointer">
                        {data}{" "}
                        <GrFormClose
                          className="ml-2 cursor-pointer"
                          onClick={() => handleSkillDelete(index)}
                        />
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="relative">
                  <div className="flex gap-2 lg:justify-between font-medium text-[12px] my-2 flex-wrap">
                    <ul className="list-none">
                      {skills.results.map((skill, index) => (
                        <li
                          className="rounded bg-white px-4 py-2 mb-1 text-gray-800 max-w-xs"
                          key={index}
                        >
                          <button
                            onClick={() => handleSkillSelect(skill)}
                            disabled={skillsData.length >= 5}
                            className="ml-2"
                          >
                            {skill}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <small>Maximun of 5 skills</small>
              </div>
            </div>
            <Separator className="bg-bm__beige my-7 md:my-6 py-[2px]" />
            <p>Opportunities</p>
            <div className="grid  md:gap-6  mt-4">
              <div className="relative z-0 w-full mb-6 group">
                {/* <input
                  type='text'
                  name='floating_first_name'
                  id='floating_first_name'
                  className='block py-2.5 px-0S w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                  placeholder=' '
                  // value={formData.projectDuration.startDate}
                  // onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor='floating_first_name'
                  className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                  Type and select the opportunities that you are open to
                </label> */}

                <input
                  type="text"
                  name="floating_first_name"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  // value={formData.projectDuration.startDate}
                  // onChange={handleInputChange}
                  value={inputValue}
                  onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Type and select the opportunities that you are open to
                </label>
                {isSearching && inputValue && filteredOptions.length === 0 && (
                  <div className="absolute z-10 w-full bg-white py-2 px-4 text-sm text-gray-900">
                    Not found
                  </div>
                )}
                {isSearching && filteredOptions.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white shadow-md max-h-60 overflow-auto">
                    {filteredOptions.map((option) => (
                      <li
                        key={option.value}
                        onClick={() => handleOptionClick(option.label)}
                        className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                )}

                {/* <small>Maximun of 5 skills</small> */}
              </div>
            </div>
          </div>
        </CardContent>
        {/* <Progress value={85} className="my-2 md:my-7" /> */}
        <div className="flex flex-col md:flex-row justify-between my-2 gap-4">
          <div className="flex gap-4">
            <Button className="light__btn md:max-w-[100px]" onClick={cancel}>
              Close
            </Button>
            <Button className="light__btn max-w-[100px]" onClick={prev}>
              Back
            </Button>
          </div>
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
