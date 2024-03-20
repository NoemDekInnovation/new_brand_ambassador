import React, { FormEvent, useEffect, useState } from "react";
import { Card, CardContent } from "../../ui/card";
import { AiOutlineHeart, AiOutlineImport } from "react-icons/ai";
import { BsPersonFillAdd, BsTwitterX } from "react-icons/bs";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/seperator";
import {} from "../../redux/talent.slice";

import {
  FaCrown,
  FaFacebook,
  FaGraduationCap,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Certification } from "../talent/Profile";
import { PiStackSimpleFill } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

import girl1 from "../../assets/Rectangle 11 (1).png";
import girl2 from "../../assets/Gallery=Gallery6.png";
import girl3 from "../../assets/Profile 1 1.png";
import girl4 from "../../assets/Profile 2 1.png";
import girl5 from "../../assets/Rectangle 11 (1).png";
import Moment from "react-moment";

// const slides = [beauty, profile, blue, nivea, blue2];
const dialogSlide = [girl1, girl2, girl5];
const modalImage = [girl4, girl3, girl4];

export default function TalentProfile({
  selectedRole,
  inviteTalent,
  setPopUp,
}: {
  setPopUp: any;

  selectedRole: any;
  inviteTalent: any;
}) {
  const [curr, setCurr] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [toggleDialog, setToggleDialog] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % dialogSlide.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + dialogSlide.length) % dialogSlide.length
    );
  };

  const openDialog = (index: any) => {
    setSelectedImageIndex(index);
    setToggleDialog(true);
  };

  const handleMouseEnter = (index: any) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  // const prev = () => {
  //   setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  // };
  // const next = () => {
  //   setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  // };

  return (
    <div className="bg-white w-[90vw] max-h-[80vh] overflow-y-scroll p-3 md:p-6 rounded-xl">
      <div className="flex w-full justify-between ">
        <div className="gap-3 flex items-center whitespace-nowrap w-full ">
          <div className=" w-full flex flex-1 items-center gap-4">
            <p>{selectedRole?.fullName}</p>

            <AiOutlineHeart />
          </div>
          <Button
            className="dark__btn max-w-[100px] mr-4"
            onClick={inviteTalent}
          >
            Invite Talent
          </Button>
          <Button className="light__btn max-w-[100px]">Share</Button>
        </div>
        <Button onClick={() => setPopUp(false)}>x</Button>
      </div>
      <Separator className={"my-3"} />
      <div className="flex">
        <div className="flex  mr-2 flex-col gap-2 md:gap-4">
          <div className="h-[400px]  rounded-md w-[400px] flex items-center bg-black">
            {selectedRole?.profilePic &&
              selectedRole?.profilePic.length > 0 && (
                <img
                  src={selectedRole?.profilePic}
                  className="w-full h-full object-contain"
                  alt=""
                />
              )}
          </div>

          <div className="flex justify-evenly  gap-1 w-full max-w-[400px]">
            {/* <div className="flex justify-evenly w-[60w] lg:w-[40w] gap-1"> */}
            {/* {[1, 2, 3, 4, 5, 6, 7].map((photo) => (
                  <div className="" key={photo}>
                    <img
                      src={Logo}
                      alt={""}
                      style={{ width: "100%", height: "auto" }}
                      height={80}
                      width={40}
                    />
                  </div>
                ))} */}
          </div>
          <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-full  border rounded-[6px]">
            <div className="flex items-center gap-4">
              <FaGraduationCap />
              <p className="text-[15px] font-medium">
                Qualification & Certificates
              </p>
            </div>
            <Separator className="bg-bm__gler/50" />

            {/* {selectedRole?.education?.length > 0 &&
                      selectedRole.education.map(
                        (educationItem: Education, index: number) => (
                          <div key={index}>
                            <p className="text-[12px] font-normal capitalize">
                              {educationItem?.degree}
                            </p>
                          </div>
                        )
                      )} */}

            {/* {selectedRole?.education?.length > 0 && (
                          <>
                            <p className="text-[12px] font-normal capitalize">
                              {selectedRole.education[0].institution}
                            </p>
                            <p className="text-[12px] font-normal capitalize">
                              {selectedRole.education[0].degree}
                            </p>
                            <p className="text-[12px] font-normal capitalize">
                              {selectedRole.education[0].grade}
                            </p>
                            <p className="text-[12px] font-normal capitalize">
                              {selectedRole.education[0].gradYear}
                            </p>
                          </>
                        )} */}

            {selectedRole?.certifications?.map(
              (certificationItem: any, index: number) => (
                <div key={index}>
                  <p className="text-[12px] font-normal capitalize">
                    {certificationItem?.certificateName}
                  </p>
                </div>
              )
            )}
          </Card>

          <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-full  border rounded-[6px]">
            <p className="text-[15px] font-medium">Work you are open to </p>
            <Separator className="bg-bm__gler/50" />

            {
              // @ts-ignore
              selectedRole?.opportunities?.map(
                (opportunity: any, index: number) => (
                  <div key={index}>
                    <p className="text-[12px] font-normal capitalize">
                      {opportunity}
                    </p>
                  </div>
                )
              )
            }
          </Card>
          <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-full  border rounded-[6px]">
            <div className="flex items-center gap-4">
              <FaCrown />
              <p className="text-[15px] font-medium">Skills</p>
            </div>

            <Separator className="bg-bm__gler/50" />
            {/* <p className="text-[12px] font-normal">
                          Modelling . Singing . Dancing . Paintballing . Catwalk
                          . Leg walk . Pretty
                        </p> */}
            {/* {selectedRole?.skills?.length > 0 ? (
                      selectedRole?.skills.map((skill: [], index: number) => (
                        <p
                          key={index}
                          className="text-[12px] font-normal capitalize"
                        >
                          {skill}
                        </p>
                      ))
                    ) : (
                      <p className="text-[12px] font-normal">
                        No skills available
                      </p>
                    )} */}
          </Card>

          <Card className="p-6 flex flex-col justify-center gap-2 bg-white border-bm__beige w-full border rounded-[6px]">
            <p className="text-[15px] font-medium">Socials</p>

            <Separator className="bg-bm__gler/50" />
            <div className="flex items-center py-2">
              <FaLinkedin color="#0077b5" size={20} />
              <Link
                to={`https://www.linkedin.com/in/${selectedRole?.socials?.linkedin}`}
                target="_blank"
                className="text-[12px] font-normal ml-2 underline text-blue-600 hover:text-blue-800"
              >
                {selectedRole?.socials?.linkedin.substring(0, 20)}
              </Link>
            </div>
            <div className="flex items-center py-2">
              <FaInstagram color="#e4405f" size={20} />
              <Link
                to={`https://www.instagram.com/${selectedRole?.socials?.instagram}`}
                target="_blank"
                className="text-[12px] font-normal ml-2 underline text-blue-600 hover:text-blue-800"
              >
                {selectedRole?.socials?.instagram.substring(0, 20)}
              </Link>
            </div>
            <div className="flex items-center py-2">
              <BsTwitterX size={20} />
              <Link
                to={`https://twitter.com/${selectedRole?.socials?.twitter}`}
                target="_blank"
                className="text-[12px] font-normal ml-2 underline text-blue-600 hover:text-blue-800"
              >
                {selectedRole?.socials?.twitter.substring(0, 20)}
              </Link>
            </div>
            <div className="flex items-center py-2">
              <FaFacebook color="#1877f2" size={20} />
              <Link
                to={`https://www.facebook.com/${selectedRole?.socials?.facebook}`}
                target="_blank"
                className="text-[12px] font-normal ml-2 underline text-blue-600 hover:text-blue-800"
              >
                {selectedRole?.socials?.facebook.substring(0, 20)}
              </Link>
            </div>
          </Card>

          <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-full  border rounded-[6px]">
            <p className="text-[15px] font-medium">Languages</p>

            <Separator className="bg-bm__gler/50" />
            {/* <p className="text-[12px] font-normal">
                          Yoruba . English . Hausa{" "}
                        </p> */}
            {/* {selectedRole?.languages?.map(
                      (language: [], index: number) => (
                        <p
                          key={index}
                          className="text-[12px] font-normal capitalize"
                        >
                          {language}
                        </p>
                      )
                    )} */}
          </Card>
        </div>
        <div className="flex-1 space-y-4">
          <Card className="p-2 md:p-4">
            <h2>Overview</h2>
            <Separator className="bg-bm__beige my-3" />
            <p className="text-[12px] font-normal text-bm_black w-full min-h-[200px]">
              {selectedRole?.summary || "-"}
            </p>
          </Card>
          <Card className="p-2 md:p-4">
            <h2>Personal Details</h2>
            <Separator className="bg-bm__beige my-3" />
            <div className="flex gap-2">
              <p className="text-[12px] font-normal text-bm_black w-[110px] capitalize">
                First Name:
              </p>
              <p className="text-[12px] font-normal text-bm_black w-[110px] capitalize">
                {selectedRole?.firstName || "-"}
              </p>
            </div>
            <div className="flex gap-2">
              <p className="text-[12px] font-normal text-bm_black w-[110px] capitalize">
                Last Name:{" "}
              </p>
              <p className="text-[12px] font-normal text-bm_black w-[110px] capitalize">
                {selectedRole?.lastName || "-"}
              </p>
            </div>{" "}
            <div className="flex gap-2">
              <p className="text-[12px] font-normal text-bm_black w-[110px]">
                Middle Name:{" "}
              </p>
              <p className="text-[12px] font-normal text-bm_black w-[110px] capitalize">
                {selectedRole?.middleName || "-"}
              </p>
            </div>{" "}
            <div className="flex gap-2">
              <p className="text-[12px] font-normal text-bm_black w-[110px]">
                Email Address:
              </p>
              <p className="text-[12px] font-normal text-bm_black w-[110px]">
                {selectedRole?.email || "-"}
              </p>
            </div>{" "}
            <div className="flex gap-2">
              <p className="text-[12px] font-normal text-bm_black w-[110px]">
                Phone Number:{" "}
              </p>
              <p className="text-[12px] font-normal text-bm_black w-[110px]">
                {selectedRole?.phone || "-"}
              </p>
            </div>{" "}
            <div className="flex gap-2">
              <p className="text-[12px] font-normal text-bm_black w-[110px]">
                Alternate Number:
              </p>
              <p className="text-[12px] font-normal text-bm_black w-[110px]">
                {selectedRole?.alternatePhone || "-"}
              </p>
            </div>{" "}
            <div className="flex gap-2">
              <p className="text-[12px] font-normal text-bm_black w-[110px]">
                Date of Birth:{" "}
              </p>{" "}
              <p className="text-[12px] font-normal text-bm_black w-[110px]">
                <Moment format="MMM D, yyy ">{selectedRole?.DOB}</Moment>
              </p>
            </div>{" "}
            <div className="flex gap-2">
              <p className="text-[12px] font-normal text-bm_black w-[110px]">
                Gender:
              </p>
              <p className="text-[12px] font-normal text-bm_black w-[110px]">
                {selectedRole?.gender || "-"}
              </p>
            </div>{" "}
            <div className="flex gap-2">
              <p className="text-[12px] font-normal text-bm_black w-[110px]">
                Skin Color:
              </p>
            </div>{" "}
            <div className="flex gap-2">
              <p className="text-[12px] font-normal text-bm_black w-[110px]">
                State of Origin:
              </p>
              <p className="text-[12px] font-normal text-bm_black w-[110px]">
                {selectedRole?.origin || "-"}
              </p>
            </div>{" "}
            <div className="flex gap-2">
              <p className="text-[12px] font-normal text-bm_black w-[110px]">
                Height:
              </p>
              <p className="text-[12px] font-normal text-bm_black w-[110px]">
                {selectedRole?.height || "-"}
              </p>
            </div>{" "}
            <div className="flex gap-2">
              <p className="text-[12px] font-normal text-bm_black w-[110px]">
                Dress Size:
              </p>
              <p className="text-[12px] font-normal text-bm_black w-[110px]">
                {selectedRole?.dressSize || "-"}
              </p>
            </div>
          </Card>
          <Card className="p-6 flex flex-col justify-center gap-2 bg-white border-bm__beige w-full border rounded-[6px]">
            <div className="flex items-center gap-4">
              <FaLocationDot />
              <p className="text-[15px] font-medium">Address</p>
            </div>
            <Separator className="bg-bm__gler/50" />
            {selectedRole?.address?.map((addressItem: any, index: number) => (
              <div key={index}>
                <p className="text-[12px] font-normal capitalize">
                  {addressItem?.street ?? ""}
                </p>
                <p className="text-[12px] font-normal capitalize">
                  {addressItem?.city ?? ""}
                </p>
                <p className="text-[12px] font-normal capitalize">
                  {addressItem?.LGA ?? ""}
                </p>
                <p className="text-[12px] font-normal capitalize">
                  {addressItem?.state ?? ""}
                </p>
                <p className="text-[12px] font-normal capitalize">
                  {addressItem?.zipCode ?? ""}
                </p>
              </div>
            ))}
          </Card>

          <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-full  border rounded-[6px]">
            <div className="flex items-center gap-4">
              <FaGraduationCap />
              <p className="text-[15px] font-medium">
                Education & Certification
              </p>
            </div>
            <Separator className="bg-bm__gler/50" />
            {/* <div className="text-[12px] font-normal gap-2 flex flex-col">
                          <div className="flex items-center">
                            <p className="text-[12px] font-medium">
                              Education 1
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <p className="">BSc. in Modelling</p>
                            <PiStackSimpleFillp>Second Class</p>
                            <p>University of Ilorin</p>
                            <p>Class of 2019</p>
                          </div>
                        </div> */}
            {selectedRole?.education?.map(
              (educationItem: any, index: number) => (
                <div
                  key={index}
                  className="text-[12px] font-normal gap-2 flex flex-col"
                >
                  <div className="flex items-center">
                    <p className="text-[12px] font-medium">
                      Education {index + 1}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="capitalize">{educationItem?.degree}</p>
                    <p className="capitalize">{educationItem?.grade}</p>
                    <p className="capitalize">{educationItem?.institution}</p>

                    <p className="capitalize">
                      {new Date(educationItem?.gradYear).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>
              )
            )}

            <Separator className="bg-bm__gler/50" />
            {/* <div className="text-[12px] font-normal gap-2 flex flex-col">
                          <div className="flex items-center">
                            <p className="text-[12px] font-medium">
                              Certificate 1
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <PiStackSimpleFillp className="">Certificate in Dancing</p>
                            <p>J-Skills School of Dancing</p>
                            <p>2020</p>
                          </div>
                        </div> */}
            {selectedRole?.certifications?.map(
              (certificationItem: any, index: number) => (
                <div
                  key={index}
                  className="text-[12px] font-normal gap-2 flex flex-col"
                >
                  <div className="flex items-center">
                    <p className="text-[12px] font-medium">
                      Certificate {index + 1}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="capitalize">
                      {certificationItem?.certificateName}
                    </p>
                    <p className="capitalize">
                      {certificationItem?.organisation}
                    </p>
                    <p className="capitalize">{certificationItem?.certYear}</p>
                  </div>
                </div>
              )
            )}
          </Card>
          <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-full  border rounded-[6px]">
            <div className="flex items-center gap-4">
              <PiStackSimpleFill />

              <p className="text-[15px] font-medium">Experience</p>
            </div>
            <Separator className="bg-bm__gler/50" />
            <div className="text-[12px] font-normal gap-2 flex flex-col">
              {selectedRole?.experience?.map(
                (experienceItem: any, index: number) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex items-center">
                      <p className="text-[12px] font-medium">
                        Experience {index + 1}
                      </p>
                    </div>
                    <p className="capitalize">{experienceItem?.agencyName}</p>
                    <p className="capitalize">{experienceItem?.projectName}</p>
                    <p className="capitalize">
                      {experienceItem?.projectCategory}
                    </p>
                    <p className="capitalize">
                      {experienceItem?.projectDuration}
                    </p>
                    <p className="capitalize">
                      {/* {experienceItem.salary} */}₦
                      {parseFloat(experienceItem?.salary).toLocaleString(
                        "en-US"
                      )}
                    </p>
                    <p className="capitalize">{experienceItem?.year}</p>
                  </div>
                )
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
