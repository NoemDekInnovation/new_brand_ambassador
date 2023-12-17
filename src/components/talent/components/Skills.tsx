import { Card, CardContent } from "../../../ui/card";
import { Button } from "../../../ui/button";
import { Separator } from "../../../ui/seperator";
import union from "../../../assets/Union1.png";
import subtract from "../../../assets/Subtract.png";
import subtract2 from "../../../assets/Subtract2.png";
import subtract3 from "../../../assets/Subtract3.png";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdPayments, MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import {
  campaignAuthAxiosInstance,
  patchAxiosInstance,
} from "../../../api/axios";
import {
  SkillsStateProps,
  fetchSkills,
  reset,
} from "../../../redux/skills.slice";
import { GrFormClose } from "react-icons/gr";
import { useToast } from "../../../ui/use-toast";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

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
  setOpportunites,
  setSkillData,
}: {
  create: () => void;
  next: () => void;
  prev: () => void;
  cancel: () => void;
  talentOptions: TalentOption[];
  skillsData: string[];
  setSkillData: any;
  handleSkillSelect: (id: any) => void;
  handleSkillDelete: (index: number) => void;
  setOpportunites: any;
}) {
  const { skills, skillsFetchSucess } = useSelector(
    (state: any) => state.skills
  ) as SkillsStateProps;


  const { user } = useSelector((state: RootState) => state.user);
  const { toast } = useToast();

  // console.log("skillsData", setSkillData);
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<TalentOption[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [example, setExample] = useState("");
  const [skillStore, setSkillStore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setIndex] = useState(0);



  const dispatch = useDispatch<AppDispatch>();
  const skillOptions =
    skillStore &&
    skills.results.map((skill) => ({ label: skill, value: skill }));

const handleInputChange = (newValue: any) => {
  setExample(newValue);
  // Additional logic if needed
};
  

  useEffect(() => {
    if (skillsFetchSucess) {
      setSkillStore(true);
      setTimeout(() => {
        dispatch(reset());
      }, 2000);
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




  return (
    <div className=" bg-[#F3F3F3]/30   px-4 md:px-12 xl:px-40 h-[87.3vh] pt-10">
      {/* <div className='fixed top-0 h-screen w-screen bg-[#F3F3F3]/30 z-[1000] mt-[20vh] px-4 md:px-12 xl:px-40 min-h-[70vh] py-10'> */}
      <Card className="bg-white  h-full p-2 md:p-4  flex justify-between gap-[24px]">
        <Card className=" p-1.5 flex flex-col justify-center gap-1  border-bm__beige w-[280px] max-h-[200px] border rounded-[6px]">
          <p className="text-[15px] font-semibold p-2">My Account</p>
          <Separator className="bg-bm__gler" />
          <div className="flex items-center gap-4 p-3  hover:bg-black/10 transform hover:scale-105 cursor-pointer bg-black/10">
            <div className="flex items-center gap-4 mr-2">
              <BiSolidUserDetail />
              <p className="text-[14px] font-normal ">Profile</p>
            </div>
          </div>
          <Separator className="bg-bm__gler/50" />
          <div className="flex items-center gap-4 p-3   hover:bg-black/10 transform hover:scale-105 cursor-pointer">
            <MdPayments />
            <p className="text-[14px] font-normal">Billings & Payments</p>
          </div>
          <Separator className="bg-bm__gler/50" />
          <div className="flex items-center gap-4 p-3  hover:bg-black/10 transform hover:scale-105 cursor-pointer">
            <MdSettings />
            <p className="text-[14px] font-normal">Settings</p>
          </div>
        </Card>
        <div className="flex-1 overflow-y-scroll pr-2">
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
              <img
                src={subtract3}
                alt=""
                className=" z-10 w-[300px] h-[50px]"
              />
            </div>

            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] text-[16px] z-20"> Socials</p>
              <img
                src={subtract2}
                alt=""
                className=" z-10 w-[300px] h-[50px]"
              />
            </div>
          </div>
          <CardContent className="border rounded-xl  p-8 flex-1 flex flex-col  mt-3">
            <p>Add your skills and the opportunities that you are open to.</p>
            <Separator className=" my-7 bg-[#D7D8DA]" />
            <div className="mt-2">
              <p>Skills</p>
              <div className="grid  md:gap-6 mt-4">
                <div className="relative  z-0 w-full mb-6 group">
                  {/* <input
                    type="text"
                    name="example"
                    id="example"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    // value={formData.projectDuration.startDate}
                    // onChange={handleInputChange}
                    required
                    onChange={(e) => {
                      setExample(e.target.value);
                    }}
                    // value={example}
                  /> */}

                  {/* <input
                    type="text"
                    name="example"
                    id="example"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    onChange={(e) => {
                      setExample(e.target.value);
                      // handleInputChange(e, index);
                    }}

                    // value={example}
                  /> */}
                  <Select
                    isMulti
                    name="example"
                    id="example"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                    placeholder="Type and select your skills"
                    options={skills?.results?.map((skill, index) => ({
                      label: skill,
                      value: index,
                    }))}
                    value={skillsData?.map((data, index) => ({
                      label: data,
                      value: index,
                    }))}
                    onChange={(selectedOptions) => {
                      const selectedSkills = selectedOptions?.map(
                        (option) => option.label
                      );
                      // setSkillData(selectedSkills);
                      if (selectedSkills?.length <= 5) {
                        setSkillData(selectedSkills);
                      } else {
                        console.warn("You can select a maximum of 5 skills.");
                      }
                    }}
                  />
                  <label
                    htmlFor="skills"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Type and select your skills
                  </label>
                  {/* <ul className="flex flex-wrap max-w-md">
                    {skillsData.map((data, index) => (
                      <li className="p-2 flex items-center " key={index}>
                        <p className="flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 dark__btn max-w-[200px] cursor-pointer">
                          {data}{" "}
                          <GrFormClose
                            className="ml-2 cursor-pointer"
                            onClick={() => handleSkillDelete(index)}
                          />
                        </p>
                      </li>
                    ))}
                  </ul> */}

                  {/* <div className="relative">
                    <div className="flex gap-2 lg:justify-between font-medium text-[12px] my-2 flex-wrap">
                      <ul className="list-none">
                        {skillStore &&
                          skills.results.map((skill, index) => (
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
                  </div> */}
                  <small>Maximun of 5 skills</small>
                </div>
              </div>
              <Separator className="bg-bm__beige my-7 md:my-6 py-[2px]" />
              {/* <p>Opportunities</p> */}
            </div>
            {/* <Separator className="bg-bm__beige my-4 md:mb-6" /> */}
          </CardContent>

          {/* <Progress value={85} className='my-2 md:my-7' /> */}
          <div className="flex justify-between mt-2">
            <div className="flex gap-4">
              <Button className="light__btn max-w-[100px]" onClick={cancel}>
                <Link to={"/profile"}>Close</Link>
              </Button>
              <Button className="light__btn max-w-[100px]" onClick={prev}>
                Back
              </Button>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="dark__btn"
                onClick={() => {
                  create();
                  setTimeout(() => {
                    toast({
                      description: "Changes Saved",
                    });
                  }, 2000);

                  cancel();
                }}
              >
                Save
              </Button>
              <Button
                className="dark__btn w-fit whitespace-nowrap"
                // onClick={next}
                onClick={() => {
                  create();
                  next();
                }}
              >
                Save and Next
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
