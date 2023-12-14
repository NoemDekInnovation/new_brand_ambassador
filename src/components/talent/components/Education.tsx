import { Card, CardContent } from "../../../ui/card";
import { Button } from "../../../ui/button";
import { Separator } from "../../../ui/seperator";
import union from "../../../assets/Union1.png";
import subtract from "../../../assets/Subtract.png";
import subtract2 from "../../../assets/Subtract2.png";
import subtract3 from "../../../assets/Subtract3.png";
import { BiSolidUserDetail } from "react-icons/bi";
import {
  MdClose,
  MdOutlineAddCircleOutline,
  MdOutlineRemoveCircleOutline,
  MdPayments,
  MdSettings,
} from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { patchAxiosInstance } from "../../../api/axios";
import { CertificateProps, EducationProps } from "../../../redux/types";
import { useForm } from "react-hook-form";
import { truncateSync } from "fs";
import { useToast } from "../../../ui/use-toast";
import { Required } from "../../Required";

interface EducationDetails {
  institution: string;
  degree: string;
  grade: string;
  gradYear: string;
}

interface CertificateDetails {
  certificateName: string;
  organisation: string;
  certYear: string;
}

export default function Education({
  next,
  prev,
  cancel,
  setEducation,
  education,
  setCertificate,
  certificate,
  create,
}: {
  create: () => void;
  next: () => void;
  prev: () => void;
  cancel: () => void;
  setEducation: any;
  education: EducationProps[];
  setCertificate: any;
  certificate: CertificateProps[];
}) {
  const { toast } = useToast();

  const handleAddEducation = () => {
    // Add a new empty experience object when the "Add Experience" button is clicked
    setEducation([
      ...education,
      {
        /* initialize with empty values */
      },
    ]);
  };
  const handleAddCertification = () => {
    // Add a new empty experience object when the "Add Experience" button is clicked
    setCertificate([
      ...certificate,
      {
        /* initialize with empty values */
      },
    ]);
  };

  const InputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    const updatedEducation = [...education];
    updatedEducation[index][name] = value;
    setEducation(updatedEducation);
  };

  // const handleEduInputChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>,
  //   index: number
  // ) => {
  //   const { name, value } = e.target;

  //   const updatedEducation = [...education];
  //   updatedEducation[index][name] = value;
  //   setEducation(updatedEducation);
  // };
  const handleEduInputChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const { value } = e.target;

    // Create a shallow copy of the education array
    const updatedEducation = [...education];

    // Create a new object with the updated degree property
    updatedEducation[index] = {
      ...updatedEducation[index],
      degree: value,
    };

    // Update the state with the new array
    setEducation(updatedEducation);
  };

  //  const handleCertInputChange = (
  //    e: React.ChangeEvent<HTMLInputElement>,
  //    index: number
  //  ) => {
  //    const { name, value } = e.target;

  //    const updatedCertificate = [...certificate];
  //    updatedCertificate[index][name] = value;
  //    setCertificate(updatedCertificate);
  //  };

  const handleCertInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    // Create a deep copy of the certificate at the specified index
    const updatedCertificate = certificate.map((cert, i) =>
      i === index ? { ...cert, [name]: value } : cert
    );

    setCertificate(updatedCertificate);
  };

  const handleRemoveEducation = (index: number) => {
    setEducation((prevEducation: EducationProps[]) => {
      const updatedEducation = [...prevEducation];
      updatedEducation.splice(index, 1);
      return updatedEducation;
    });
  };

  const handleRemoveCertification = (index: number) => {
    setCertificate((prevCertificate: CertificateProps[]) => {
      const updatedCertificate = [...prevCertificate];
      updatedCertificate.splice(index, 1);
      return updatedCertificate;
    });
  };

  return (
    <div className=" bg-[#F3F3F3]/30   px-4 md:px-12 xl:px-40 overflow-hidden  h-[87.3vh] pt-10">
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
              <p className="absolute top-[25%] text-[16px]  z-20">Overview</p>
              <img src={union} alt="" className=" z-10  w-[300px] h-[50px]" />
            </div>
            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] text-[16px] z-20 ">
                {" "}
                Personal Details
              </p>
              <img
                src={subtract}
                alt=""
                className=" z-10  w-[300px] h-[50px]"
              />
            </div>
            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] text-[16px] z-20"> Address</p>
              <img
                src={subtract}
                alt=""
                className=" z-10  w-[300px] h-[50px]"
              />
            </div>

            <div className=" relative text-white flex items-center justify-center">
              <p className="absolute top-[15%] text-[14px] leading-4 z-20 ">
                {" "}
                Education & <br /> Certification
              </p>
              <img
                src={subtract3}
                alt=""
                className=" z-10  w-[300px] h-[50px]"
              />
            </div>

            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] text-[16px] z-20"> Experience</p>
              <img
                src={subtract}
                alt=""
                className=" z-10  w-[300px] h-[50px]"
              />
            </div>

            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[15%] text-[14px]  leading-4 z-20">
                Skills &<br /> Opportunities
              </p>
              <img
                src={subtract}
                alt=""
                className=" z-10  w-[300px] h-[50px]"
              />
            </div>

            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] text-[16px] z-20"> Socials</p>
              <img
                src={subtract2}
                alt=""
                className=" z-10  w-[300px] h-[50px]"
              />
            </div>
          </div>
          <CardContent className="border rounded-xl  p-8 flex-1 flex flex-col  mt-3">
            <p>
              Your education & certifications will help you get better work
              opportunities.
            </p>
            <Separator className=" my-7 bg-[#D7D8DA]" />
            {education.map((e, index) => (
              <>
                <div className="mt-2 " key={e.id}>
                  <div className="flex items-center justify-between">
                    <Required className="text-[20px]">
                      Education {index + 1}
                    </Required>

                    <div
                      className="max-w-[30px] flex items-center justify-center cursor-pointer"
                      onClick={() => handleRemoveEducation(index)}
                    >
                      <MdClose className="text-[20px]" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 md:gap-6 mt-4">
                    <div className="relative  z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="institution"
                        id="institution"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={e.institution}
                        onChange={(e) => InputChange(e, index)}
                        required
                      />
                      <label
                        htmlFor="institution"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Institution
                      </label>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                      <select
                        name="degree"
                        id="degree"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        value={e.degree}
                        onChange={(e) => handleEduInputChange(e, index)}
                        required
                      >
                        <option value="" disabled selected>
                          Select a Degree
                        </option>
                        <option value="Bachelor's Degree">
                          Bachelor's Degree
                        </option>
                        <option value="Master's">Master's</option>
                        <option value="PhD">PhD</option>
                        <option value="SSCE">SSCE</option>
                        <option value="OND">OND</option>
                        <option value="NCE">NCE</option>
                        <option value="HND">HND</option>
                        <option value="PGD">PGD</option>
                      </select>
                      <label
                        htmlFor="degree"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Degree
                      </label>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <select
                        name="grade"
                        id="grade"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        value={e.grade}
                        onChange={(e) => handleEduInputChange(e, index)}
                        required
                      >
                        <option value="" disabled selected>
                          Select a Grade
                        </option>
                        <option value="First Class">First Class</option>
                        <option value="Second Class Upper">
                          Second Class Upper
                        </option>
                        <option value="Second Class Lower">
                          Second Class Lower
                        </option>
                        <option value="Third Class">Third Class</option>
                        <option value="Pass">Pass</option>
                        {/* Add more options as needed */}
                      </select>
                      <label
                        htmlFor="grade"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Grade
                      </label>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="date"
                        name="gradYear"
                        id="gradYear"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={e.gradYear}
                        onChange={(e) => InputChange(e, index)}
                        required
                      />
                      <label
                        htmlFor="gradYear"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Graduation Year
                      </label>
                    </div>
                  </div>
                </div>
                {/* <Button
                  className="dark__btn max-w-[180px] whitespace-nowrap flex items-center gap-2"
                  onClick={() => handleRemoveEducation(index)}
                >
                  <MdClose className="text-[20px]" />
                  <span className="truncate">Remove Education</span>
                </Button> */}
              </>
            ))}
            <Separator className="bg-bm__beige my-4 md:mb-6" />

            <Button
              className="dark__btn max-w-[140px] whitespace-nowrap"
              onClick={handleAddEducation}
            >
              <div className="flex items-center gap-1">
                <MdOutlineAddCircleOutline className="text-[16px]" />
                Add Education
              </div>
            </Button>
            <Separator className="bg-bm__beige my-7 md:my-6 py-[2px]" />

            {certificate.map((c, index) => (
              <>
                <div className="mt-2 relative" key={index}>
                  {/* <div className="flex items-center">
                    <div className="absolute top-1 left-[110px] bg-red-500 w-2 h-2 rounded-full"></div>
                    <p>Certification {index + 1}</p>
                  </div> */}
                  {/* <p>Certification {index + 1}</p> */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Required className="text-[20px]">
                        Certification {index + 1}
                      </Required>
                    </div>
                    <div
                      className="max-w-[30px] flex items-center justify-center cursor-pointer"
                      onClick={() => handleRemoveCertification(index)}
                    >
                      <MdClose className="text-[20px]" />
                    </div>
                  </div>
                  <div className="grid  md:gap-6 mt-4">
                    <div className="relative  z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="certificateName"
                        id="certificateName"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={c.certificateName}
                        onChange={(e) => handleCertInputChange(e, index)}
                        required
                      />
                      <label
                        htmlFor="certificateName"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Certificate name
                      </label>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative  z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="organisation"
                        id="organisation"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={c.organisation}
                        onChange={(e) => handleCertInputChange(e, index)}
                        required
                      />
                      <label
                        htmlFor="floating_first_name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Organisation
                      </label>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="email"
                        name="certYear"
                        id="certYear"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={c.certYear}
                        onChange={(e) => handleCertInputChange(e, index)}
                        required
                      />
                      <label
                        htmlFor="certYear"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Year
                      </label>
                    </div>
                  </div>
                </div>
                {/* <Button
                  className="dark__btn max-w-[180px] whitespace-nowrap flex items-center gap-2"
                  onClick={() => handleRemoveCertification(index)}
                >
                  <MdClose className="text-[20px]" />
                  <span className="truncate">Remove Certification</span>
                </Button> */}
              </>
            ))}
            <Separator className="bg-bm__beige my-4 md:mb-6" />

            <Button
              className="dark__btn max-w-[150px] whitespace-nowrap"
              onClick={handleAddCertification}
            >
              <div className="flex items-center gap-1">
                <MdOutlineAddCircleOutline className="text-[16px]" />
                Add Certification
              </div>
            </Button>
          </CardContent>
          {/* <Progress value={56} className='my-2 md:my-7' /> */}
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
                variant="default"
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
