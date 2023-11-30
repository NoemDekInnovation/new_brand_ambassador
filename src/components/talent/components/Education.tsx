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
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useState } from "react";
import { patchAxiosInstance } from "../../../api/axios";

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
}: {
  next: () => void;
  prev: () => void;
  cancel: () => void;
}) {
  const { user } = useSelector((state: RootState) => state.user);

  const [loading, setLoading] = useState(false);
  const [educationDetails, setEducationDetails] = useState({
    education: [
      {
        institution: "",
        degree: "",
        grade: "",
        gradYear: "",
      },
    ],
  });
  const [certificateDetails, setCertificateDetails] = useState({
    certifications: [
      {
        certificateName: "",
        organisation: "",
        certYear: "",
      },
    ],
  });

  const handleEducation = async () => {
    setLoading(true);
    const educationData = new FormData();
    // Adding education details to FormData
    educationDetails.education.forEach((edu, index) => {
      educationData.append(`education[${index}][institution]`, edu.institution);
      educationData.append(`education[${index}][degree]`, edu.degree);
      educationData.append(`education[${index}][grade]`, edu.grade);
      educationData.append(`education[${index}][gradYear]`, edu.gradYear);
    });

    // Adding certificate details to FormData
    certificateDetails.certifications.forEach((cert, index) => {
      educationData.append(
        `certifications[${index}][certificateName]`,
        cert.certificateName
      );
      educationData.append(
        `certifications[${index}][organisation]`,
        cert.organisation
      );
      educationData.append(`certifications[${index}][certYear]`, cert.certYear);
    });

        if (user?.accountId !== undefined) {
          try {
            const response = await patchAxiosInstance.patch(
              `/profile-details`,
              educationData,
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
  }

const handleInput = (
  value: string,
  field: keyof EducationDetails | keyof CertificateDetails,
  index: number,
  category: "education" | "certifications"
): void => {
  if (category === "education") {
    const updatedEducation = [...educationDetails.education];
    (updatedEducation[index] as any)[field] = value;
    setEducationDetails({ education: updatedEducation });
  } else if (category === "certifications") {
    const updatedCertifications = [...certificateDetails.certifications];
    (updatedCertifications[index] as any)[field] = value;
    setCertificateDetails({ certifications: updatedCertifications });
  }
};

const handleAddEducation = () => {
  setEducationDetails((prevDetails) => ({
    education: [
      ...prevDetails.education,
      {
        institution: "",
        degree: "",
        grade: "",
        gradYear: "",
      },
    ],
  }));
};

const handleAddCertification = () => {
  setCertificateDetails((prevDetails) => ({
    certifications: [
      ...prevDetails.certifications,
      {
        certificateName: "",
        organisation: "",
        certYear: "",
      },
    ],
  }));
};



  

  return (
    <div className=" bg-[#F3F3F3]/30   px-4 md:px-12 xl:px-40 overflow-hidden  h-[87.3vh] pt-10">
      <Card className="bg-white  h-full p-2 md:p-4  flex justify-between gap-[24px]">
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
            {/* <div className="mt-2">
              <p>Education 1</p>
              <div className="grid md:grid-cols-2 md:gap-6 mt-4">
                <div className="relative  z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="institution"
                    id="institution"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    // value={formData.projectDuration.startDate}
                    // onChange={handleInputChange}
                    value={educationDetails.education[0].institution}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInput(e.target.value, "institution", 0, "education")
                    }
                    required
                  />
                  <label
                    htmlFor="floating_first_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Institution
                  </label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="degree"
                    id="degree"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    // value={formData.projectDuration.endDate}
                    // onChange={handleInputChange}
                    value={educationDetails.education[0].degree}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInput(e.target.value, "degree", 0, "education")
                    }
                    required
                  />
                  <label
                    htmlFor="floating_last_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Degree
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative  z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="grade"
                    id="grade"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    // value={formData.projectDuration.startDate}
                    // onChange={handleInputChange}
                    value={educationDetails.education[0].grade}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInput(e.target.value, "grade", 0, "education")
                    }
                    required
                  />
                  <label
                    htmlFor="floating_first_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Grade
                  </label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="gradYear"
                    id="gradYear"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    // value={formData.projectDuration.endDate}
                    // onChange={handleInputChange}
                    value={educationDetails.education[0].gradYear}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInput(e.target.value, "gradYear", 0, "education")
                    }
                    required
                  />
                  <label
                    htmlFor="floating_last_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Graduation Year
                  </label>
                </div>
              </div>
            </div> */}
            {educationDetails.education.map((edu, index) => (
              <div key={index} className="mt-2">
                <p>Education {index + 1}</p>
                <div className="grid md:grid-cols-2 md:gap-6 mt-4">
                  <div className="relative  z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="institution"
                      id={`institution_${index}`}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      // value={formData.projectDuration.startDate}
                      // onChange={handleInputChange}
                      value={edu.institution}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInput(
                          e.target.value,
                          "institution",
                          0,
                          "education"
                        )
                      }
                      required
                    />
                    <label
                      htmlFor="floating_first_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Institution
                    </label>
                  </div>

                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="degree"
                      id={`degree_${index}`}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      // value={formData.projectDuration.endDate}
                      // onChange={handleInputChange}
                      value={edu.degree}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInput(e.target.value, "degree", 0, "education")
                      }
                      required
                    />
                    <label
                      htmlFor="floating_last_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Degree
                    </label>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative  z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="grade"
                      id={`grade_${index}`}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      // value={formData.projectDuration.startDate}
                      // onChange={handleInputChange}
                      value={edu.grade}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInput(e.target.value, "grade", 0, "education")
                      }
                      required
                    />
                    <label
                      htmlFor="floating_first_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Grade
                    </label>
                  </div>

                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="gradYear"
                      id={`gradYear_${index}`}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      // value={formData.projectDuration.endDate}
                      // onChange={handleInputChange}
                      value={edu.gradYear}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInput(e.target.value, "gradYear", 0, "education")
                      }
                      required
                    />
                    <label
                      htmlFor="floating_last_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Graduation Year
                    </label>
                  </div>
                </div>
              </div>
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

            {/* <div className="mt-2">
              <p>Certification 1</p>
              <div className="grid  md:gap-6 mt-4">
                <div className="relative  z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="certificateName"
                    id="certificateName"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    // value={formData.projectDuration.startDate}
                    // onChange={handleInputChange}
                    value={certificateDetails.certifications[0].certificateName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInput(
                        e.target.value,
                        "certificateName",
                        0,
                        "certifications"
                      )
                    }
                    required
                  />
                  <label
                    htmlFor="floating_first_name"
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
                    // value={formData.projectDuration.startDate}
                    // onChange={handleInputChange}
                    value={certificateDetails.certifications[0].organisation}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInput(
                        e.target.value,
                        "organisation",
                        0,
                        "certifications"
                      )
                    }
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
                    name="floating_last_name"
                    id="floating_last_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    // value={formData.projectDuration.endDate}
                    // onChange={handleInputChange}
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
            </div> */}
            {certificateDetails.certifications.map((cert, index) => (
              <div key={index} className="mt-2">
                <p>Certification {index + 1}</p>
                <div className="grid  md:gap-6 mt-4">
                  <div className="relative  z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="certificateName"
                      id={`certificateName_${index}`}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      // value={formData.projectDuration.startDate}
                      // onChange={handleInputChange}
                      value={cert.certificateName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInput(
                          e.target.value,
                          "certificateName",
                          0,
                          "certifications"
                        )
                      }
                      required
                    />
                    <label
                      htmlFor="floating_first_name"
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
                      id={`organisation_${index}`}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      // value={formData.projectDuration.startDate}
                      // onChange={handleInputChange}
                      value={cert.organisation}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInput(
                          e.target.value,
                          "organisation",
                          0,
                          "certifications"
                        )
                      }
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
                      type="text"
                      name="certYear"
                      id={`certYear_${index}`}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      // value={formData.projectDuration.endDate}
                      // onChange={handleInputChange}
                      value={cert.certYear}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInput(
                          e.target.value,
                          "certYear",
                          0,
                          "certifications"
                        )
                      }
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
              <Button className="dark__btn" onClick={next}>
                Save
              </Button>
              <Button
                className="dark__btn w-fit whitespace-nowrap"
                // onClick={next}
                onClick={() => {
                  handleEducation();
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
