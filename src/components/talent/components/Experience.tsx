import React, { useState } from "react";
import { Card, CardContent } from "../../../ui/card";
import { Button } from "../../../ui/button";
import { Separator } from "../../../ui/seperator";
import union from "../../../assets/Union1.png";
import subtract from "../../../assets/Subtract.png";
import subtract2 from "../../../assets/Subtract2.png";
import subtract3 from "../../../assets/Subtract3.png";
import { BiSolidUserDetail } from "react-icons/bi";
import {
  MdOutlineAddCircleOutline,
  MdPayments,
  MdSettings,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { patchAxiosInstance } from "../../../api/axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export default function Experience({
  next,
  prev,
  cancel,
}: {
  next: () => void;
  prev: () => void;
  cancel: () => void;
  // experiences: ExperienceProps[];
}) {


const handleAddExperience = () => {
  setExperiences({
    experience: [
      ...experiences.experience,
      {
        agencyName: "",
        projectName: "",
        projectCategory: "",
        projectDuration: "",
        salary: "",
        year: "",
      },
    ],
  });
};

const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  index: number
) => {
  const { name, value } = e.target;

  const updatedExperiences = { ...experiences };
  updatedExperiences.experience[index][
    name as keyof (typeof updatedExperiences.experience)[0]
  ] = value;
  setExperiences(updatedExperiences);
};


const { user } = useSelector((state: RootState) => state.user);

const [loading, setLoading] = useState(false);
const [experiences, setExperiences] = useState({
  experience: [
    {
      agencyName: "",
      projectName: "",
      projectCategory: "",
      projectDuration: "",
      salary: "",
      year: "",
    },
  ],
});

const handleExperience = async () => {
  setLoading(true);
  const experiencesData = new FormData();
  experiences.experience.forEach((exp, index) => {
    experiencesData.append(`experience[${index}][agencyName]`, exp.agencyName);
    experiencesData.append(
      `experience[${index}][projectName]`,
      exp.projectName
    );
    experiencesData.append(
      `experience[${index}][projectCategory]`,
      exp.projectCategory
    );
    experiencesData.append(
      `experience[${index}][projectDuration]`,
      exp.projectDuration
    );
    experiencesData.append(`experience[${index}][salary]`, exp.salary);
    experiencesData.append(`experience[${index}][year]`, exp.year);
  });

  if (user?.accountId !== undefined) {
    try {
      const response = await patchAxiosInstance.patch(
        `/profile-details`,
        experiencesData,
        {
          headers: {
            Authorization: `Bearer ${user.authKey || ""}`,
          },
        }
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
};



  return (
    <div className=" bg-[#F3F3F3]/30   px-4 md:px-12 xl:px-40 h-[87.3vh] pt-10 overflow-hidden">
      <Card className="bg-white  h-full p-2 md:p-4  flex justify-between gap-[24px] ">
        <Card className=" p-1.5 flex flex-col justify-center gap-1  border-bm__beige w-[280px] max-h-[200px] border rounded-[6px]">
          <p className="text-[15px] font-semibold p-2">My Account</p>
          <Separator className="bg-bm__gler" />
          <div className="flex items-center gap-4 p-3  hover:bg-black/10 transform hover:scale-105 cursor-pointer">
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
              <p className="absolute top-[15%] text-[14px] leading-4 z-20">
                {" "}
                Education & <br /> Certification
              </p>
              <img src={subtract} alt="" className=" z-10 w-[300px] h-[50px]" />
            </div>

            <div className=" relative text-white flex items-center justify-center">
              <p className="absolute top-[25%] text-[16px] z-20"> Experience</p>
              <img
                src={subtract3}
                alt=""
                className=" z-10 w-[300px] h-[50px]"
              />
            </div>

            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[15%] text-[14px] leading-4 z-20">
                Skills &<br /> Opportunities
              </p>
              <img src={subtract} alt="" className=" z-10 w-[300px] h-[50px]" />
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
            <p>
              Your work experience puts you in a better position to get work.
            </p>

            <Separator className=" my-7 bg-[#D7D8DA]" />
            {experiences.experience.map((experience: any, index: any) => (
              <>
                <div className="mt-2" key={index}>
                  <p>Experience {index + 1}</p>
                  <div className="grid md:grid-cols-2 md:gap-6 mt-4">
                    <div className="relative  z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="agencyName"
                        id="agencyName"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={experience.agencyName}
                        onChange={(e) => handleInputChange(e, index)}
                        required
                      />
                      <label
                        htmlFor="floating_first_name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Name of Agency{" "}
                      </label>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="projectName"
                        id="projectName"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={experience.projectName}
                        onChange={(e) => handleInputChange(e, index)}
                        required
                      />
                      <label
                        htmlFor="floating_last_name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Project Name
                      </label>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative  z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="projectCategory"
                        id="projectCategory"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={experience.projectCategory}
                        onChange={(e) => handleInputChange(e, index)}
                        required
                      />
                      <label
                        htmlFor="floating_first_name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Category of project
                      </label>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="email"
                        name="projectDuration"
                        id="projectDuration"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={experience.projectDuration}
                        onChange={(e) => handleInputChange(e, index)}
                        required
                      />
                      <label
                        htmlFor="floating_last_name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Duration of project
                      </label>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative  z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="salary"
                        id="salary"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={experience.salary}
                        onChange={(e) => handleInputChange(e, index)}
                        required
                      />
                      <label
                        htmlFor="floating_first_name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Salary
                      </label>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="year"
                        id="year"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={experience.year}
                        onChange={(e) => handleInputChange(e, index)}
                        required
                      />
                      <label
                        htmlFor="floating_last_name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Year
                      </label>
                    </div>
                  </div>
                </div>
                <Separator className=" my-5 bg-[#D7D8DA]" />
              </>
            ))}
            <Button
              onClick={handleAddExperience}
              className="dark__btn max-w-[150px] whitespace-nowrap"
            >
              <div className="flex items-center gap-1">
                <MdOutlineAddCircleOutline className="text-[16px]" />
                Add Experience
              </div>
            </Button>
          </CardContent>
          {/* <Progress value={70} className='my-2 md:my-7' /> */}

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
              <Button className="dark__btn" onClick={next}>
                Save
              </Button>
              <Button
                className="dark__btn w-fit whitespace-nowrap"
                // onClick={next}
                onClick={() => {
                  handleExperience();
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
