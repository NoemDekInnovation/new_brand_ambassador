import React from "react";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import { Button } from "../../../ui/button";
import { Progress } from "../../../ui/progress";
import { CertificateProps, EducationProps } from "../../../redux/types";
import union from "../../../assets/Union1.png";
import subtract from "../../../assets/Subtract.png";
import subtract2 from "../../../assets/Subtract2.png";
import subtract3 from "../../../assets/Subtract3.png";
import { MdOutlineAddCircleOutline } from "react-icons/md";

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
  const handleEduInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    const updatedEducation = [...education];
    updatedEducation[index][name] = value;
    setEducation(updatedEducation);
  };
  const handleCertInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    const updatedCertificate = [...certificate];
    updatedCertificate[index][name] = value;
    setCertificate(updatedCertificate);
  };
  return (
    <div className=" bg-[#F3F3F3]/30   px-4 md:px-12 xl:px-40 min-h-[70vh] py-5">
      <Card className="bg-white  h-[79vh] p-8 md:p-4 flex-col flex overflow-y-scroll">
        <div className="flex justify-between font-medium text-[12px] my-2 ">
          <div className="relative text-black flex items-center justify-center">
            <p className="absolute top-[25%] text-[16px]  z-20">Overview</p>
            <img src={union} alt="" className=" z-10  w-[300px] h-[50px]" />
          </div>
          <div className=" relative text-black flex items-center justify-center">
            <p className="absolute top-[25%] text-[16px] z-20 ">
              {" "}
              Personal Details
            </p>
            <img src={subtract} alt="" className=" z-10  w-[300px] h-[50px]" />
          </div>
          <div className=" relative text-black flex items-center justify-center">
            <p className="absolute top-[25%] text-[16px] z-20"> Address</p>
            <img src={subtract} alt="" className=" z-10  w-[300px] h-[50px]" />
          </div>

          <div className=" relative text-white flex items-center justify-center">
            <p className="absolute top-[15%] text-[14px] leading-4 z-20 ">
              {" "}
              Education & <br /> Certification
            </p>
            <img src={subtract3} alt="" className=" z-10  w-[300px] h-[50px]" />
          </div>

          <div className=" relative text-black flex items-center justify-center">
            <p className="absolute top-[25%] text-[16px] z-20"> Experience</p>
            <img src={subtract} alt="" className=" z-10  w-[300px] h-[50px]" />
          </div>

          <div className=" relative text-black flex items-center justify-center">
            <p className="absolute top-[15%] text-[14px]  leading-4 z-20">
              Skills &<br /> Opportunities
            </p>
            <img src={subtract} alt="" className=" z-10  w-[300px] h-[50px]" />
          </div>

          <div className=" relative text-black flex items-center justify-center">
            <p className="absolute top-[25%] text-[16px] z-20"> Socials</p>
            <img src={subtract2} alt="" className=" z-10  w-[300px] h-[50px]" />
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
              <div className="mt-2" key={index}>
                <p>Education {index + 1}</p>
                <div className="grid md:grid-cols-2 md:gap-6 mt-4">
                  <div className="relative  z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="institution"
                      id="institution"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={e.institution}
                      onChange={(e) => handleEduInputChange(e, index)}
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
                    <input
                      type="text"
                      name="degree"
                      id="degree"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={e.degree}
                      onChange={(e) => handleEduInputChange(e, index)}
                      required
                    />
                    <label
                      htmlFor="degree"
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
                      value={e.grade}
                      onChange={(e) => handleEduInputChange(e, index)}
                      required
                    />
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
                      onChange={(e) => handleEduInputChange(e, index)}
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
              <div className="mt-2" key={index}>
                <p>Certification {index + 1}</p>
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
                      name="floating_first_name"
                      id="floating_first_name"
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
        <Progress value={56} className="my-2 md:my-7" />
        <div className="flex flex-col md:flex-row justify-between mt-2 gap-4">
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
