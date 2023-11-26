import React from "react";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import { Button } from "../../../ui/button";
import { Progress } from "../../../ui/progress";
import { CertificateProps, EducationProps } from "../../../redux/types";

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
    <div className=" bg-[#F3F3F3]/30   px-4 md:px-12 xl:px-40 min-h-[70vh] py-10">
      <Card className="bg-white  h-full p-2 md:p-4 flex-col flex">
        <div className="flex gap-2 lg:justify-between font-medium text-[12px] my-2 flex-wrap">
          <p className="bg-[#D7D8DA] border border-bm__btn__grey p-2 rounded lg:p-4 ">
            Overview
          </p>
          <p className="bg-[#D7D8DA] border border-bm__btn__grey p-2 rounded lg:p-4 ">
            Personal Details
          </p>
          <p className="bg-[#D7D8DA] border border-bm__btn__grey p-2 rounded lg:p-4 ">
            Address
          </p>
          <p className="bg-black text-white p-4">Education & Certification</p>
          <p className="bg-[#D7D8DA] border border-bm__btn__grey p-2 rounded lg:p-4 ">
            Experience
          </p>
          <p className="bg-[#D7D8DA] border border-bm__btn__grey p-2 rounded lg:p-4 ">
            Skills & Opportunities
          </p>
          <p className="bg-[#D7D8DA] border border-bm__btn__grey p-2 rounded lg:p-4 ">
            Socials
          </p>
        </div>
        <CardContent className="border rounded-xl  p-3 flex-1 flex flex-col  mt-3">
          <p>
            Your education & certifications will help you get better work
            opportunities.
          </p>
          <Separator className=" my-3" />
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
          <Separator className="bg-bm__beige mb-3 md:mb-6" />
          <Button
            className="dark__btn max-w-[120px] whitespace-nowrap"
            onClick={handleAddEducation}
          >
            Add Education
          </Button>
          <Separator className="bg-bm__beige my-3 md:my-6 py-[2px]" />
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
          <Separator className="bg-bm__beige mb-3 md:mb-6" />

          <Button
            className="dark__btn max-w-[150px] whitespace-nowrap"
            onClick={handleAddCertification}
          >
            Add Certification
          </Button>
        </CardContent>
        <Progress value={56} className="my-2 md:my-7" />
        <div className="flex flex-col md:flex-row justify-between mt-2 gap-4">
          <Button className="light__btn md:max-w-[100px]" onClick={cancel}>
            Close
          </Button>
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
