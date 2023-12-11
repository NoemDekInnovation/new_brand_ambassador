// import { MainLayout } from "../Layout";
// import { Card } from "../../ui/card";
// import { Separator } from "../../ui/seperator";
// import { BiSolidUserDetail } from "react-icons/bi";
// import { Link } from "react-router-dom";
// import Footer from "../Footer";
// import { Button } from "../../ui/button";
import { MainLayout } from "../Layout";
import { Card } from "../../ui/card";
import { Separator } from "../../ui/seperator";
import { BiSolidUserDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import { Button } from "../../ui/button";
import { MdPayments, MdSettings } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { FaChartPie, FaCrown, FaGraduationCap } from "react-icons/fa";
import { TiContacts } from "react-icons/ti";
import { FaLocationDot } from "react-icons/fa6";
import { PiStackSimpleFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { patchAxiosInstance } from "../../api/axios";
import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import { BsTwitter, BsTwitterX } from "react-icons/bs";
import { fetchUserTalentsData } from "../../redux/talent.slice";

interface Certification {
  certificateName: string;
  organisation: string;
  certYear: number;
  // Add other properties if needed
}

interface Education {
  degree: string;
  institution: string;
  grade: string;
  gradYear: string;
}

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { talentData } = useSelector((state: RootState) => state.talent);

  console.log("talent",talentData);

      const dispatch = useDispatch<AppDispatch>(); 


  useEffect(() => {
    // const updateTalent = async () => {
    //   if (user?.accountId !== undefined) {
    //     try {
    //       const response = await patchAxiosInstance.get(`/get-talent-profile`, {
    //         headers: {
    //           Authorization: `Bearer ${user.authKey || ""}`,
    //         },
    //       });
    //       setTalentData(response.data.data);
    //     } catch (error) {}
    //   }
    // };
    // updateTalent();
    dispatch(fetchUserTalentsData())

  }, []);
  // console.log(talentData)

  let formattedDOB = "-";

if (talentData.DOB !== undefined) {
   formattedDOB = new Date(talentData?.DOB).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

   
  return (
    <MainLayout>
      <div className="flex overflow-hidden bg-bm_card_grey">
        <div className="flex-1">
          <div className=" flex pt-10 md:space-x-8 flex-col items-center space-y-8 md:flex-row md:space-y-0 md:items-start">
            <div className="bg-white flex w-full max-w-[1600px] mx-auto h-[83vh] p-[24px] pb-2  gap-[24px]">
              <Card className=" p-1.5 flex flex-col justify-center gap-1  border-bm__beige w-[280px] max-h-[200px] border rounded-[6px]">
                <p className="text-[15px] font-semibold p-2">My Account</p>
                <Separator className="bg-bm__gler" />
                <div className="flex items-center gap-4 p-3  hover:bg-black/10 transform hover:scale-105 cursor-pointer bg-black/10">
                  <div className="flex items-center gap-4 mr-2 w-full h-full">
                    <BiSolidUserDetail />
                    <p className="text-[14px] font-normal">Profile</p>
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
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-black w-fit rounded-[5px] px-1 text-[18px]">
                      <BiSolidUserDetail className="text-white w-fit" />
                    </div>
                    <p className="text-[16px] font-bold">Profile</p>
                    <p className="ml-20 bg-bm__ox__red px-2 text-white rounded-md">
                      33%
                    </p>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700  my-2 mb-7">
                  <div
                    className="bg-bm__ox__red h-1.5 rounded-full"
                    style={{ width: "33%" }}
                  ></div>
                </div>
                <div className="w-full overflow-y-scroll pr-2">
                  <div className=" flex w-full gap-4 h-fit">
                    <div className=" w-full max-w-[240px] flex flex-col gap-2">
                      {/* <img src="" className='' alt="" /> */}
                      <div className="h-[300px]  rounded-md">
                        <img src={talentData?.profilePic} className="" alt="" />
                      </div>

                      <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-[240px]  border rounded-[6px]">
                        <div className="flex items-center gap-4">
                          <FaGraduationCap />
                          <p className="text-[15px] font-medium">
                            Qualification & Certificates
                          </p>
                        </div>
                        <Separator className="bg-bm__gler/50" />

                        {/* {talentData?.education?.map(
                          (educationItem: Education, index: number) => (
                            <div key={index}>
                              <p className="text-[12px] font-normal capitalize">
                                {educationItem?.degree}
                              </p>
                            </div>
                          )
                        )} */}
                        {/* <p className="text-[12px] font-normal capitalize">
                          {talentData?.education[0].institution}
                        </p>
                        <p className="text-[12px] font-normal capitalize">
                          {talentData?.education[0].degree}
                        </p>
                        {/* <p className="text-[12px] font-normal capitalize">
                          {talentData?.education[0].grade}
                        </p> */}
                        {/* <p className="text-[12px] font-normal capitalize">{talentData?.education[0].gradYear}</p> */}
                        {talentData?.certifications?.map(
                          (certificationItem: Certification, index: number) => (
                            <div key={index}>
                              <p className="text-[12px] font-normal capitalize">
                                {certificationItem?.certificateName}
                              </p>
                              {/* <p className="text-[12px] font-normal">
                                Organization: {certificationItem.organisation}
                              </p>
                              <p className="text-[12px] font-normal">
                                Certification Year: {certificationItem.certYear}
                              </p> */}
                            </div>
                          )
                        )}
                      </Card>

                      <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-[240px]  border rounded-[6px]">
                        <p className="text-[15px] font-medium">
                          Work you are open to{" "}
                        </p>
                        <Separator className="bg-bm__gler/50" />
                        <p className="text-[12px] font-normal capitalize">
                          {/* Usher . In-Store Marketer . Open Market Marketer .
                          Brand Ambassador . Brand Ambassador Supervisor .
                          In-Store Supervisor */}
                          {talentData?.opportunities}
                        </p>
                      </Card>
                      <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-[240px]  border rounded-[6px]">
                        <div className="flex items-center gap-4">
                          <FaCrown />
                          <p className="text-[15px] font-medium">Skills</p>
                        </div>

                        <Separator className="bg-bm__gler/50" />
                        {/* <p className="text-[12px] font-normal">
                          Modelling . Singing . Dancing . Paintballing . Catwalk
                          . Leg walk . Pretty
                        </p> */}
                        {talentData?.skills?.length > 0 ? (
                          talentData?.skills.map((skill: [], index: number) => (
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
                        )}
                      </Card>

                      <Card className="p-6 flex flex-col justify-center gap-2 bg-white border-bm__beige w-[240px] border rounded-[6px]">
                        <p className="text-[15px] font-medium">Socials</p>

                        <Separator className="bg-bm__gler/50" />
                        <div className="flex items-center py-2">
                          <FaLinkedin color="#0077b5" size={20} />
                          <Link
                            to={`https://www.linkedin.com/in/${talentData?.socials?.linkedin}`}
                            target="_blank"
                            className="text-[12px] font-normal ml-2"
                          >
                            {talentData?.socials?.linkedin}
                          </Link>
                        </div>
                        <div className="flex items-center py-2">
                          <FaInstagram color="#e4405f" size={20} />
                          <Link
                            to={`https://www.instagram.com/${talentData?.socials?.instagram}`}
                            target="_blank"
                            className="text-[12px] font-normal ml-2"
                          >
                            {talentData?.socials?.instagram}
                          </Link>
                        </div>
                        <div className="flex items-center py-2">
                          <BsTwitterX size={20} />
                          <Link
                            to={`https://twitter.com/${talentData?.socials?.twitter}`}
                            target="_blank"
                            className="text-[12px] font-normal ml-2"
                          >
                            {talentData?.socials?.twitter}
                          </Link>
                        </div>
                        <div className="flex items-center py-2">
                          <FaFacebook color="#1877f2" size={20} />
                          <Link
                            to={`https://www.facebook.com/${talentData?.socials?.facebook}`}
                            target="_blank"
                            className="text-[12px] font-normal ml-2"
                          >
                            {talentData?.socials?.facebook}
                          </Link>
                        </div>
                      </Card>

                      <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-[240px]  border rounded-[6px]">
                        <p className="text-[15px] font-medium">Languages</p>

                        <Separator className="bg-bm__gler/50" />
                        {/* <p className="text-[12px] font-normal">
                          Yoruba . English . Hausa{" "}
                        </p> */}
                        {talentData?.languages?.map(
                          (language: [], index: number) => (
                            <p
                              key={index}
                              className="text-[12px] font-normal capitalize"
                            >
                              {language}
                            </p>
                          )
                        )}
                      </Card>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex w-full  justify-between items-center ">
                        <p className="text-[16px] font-bold capitalize">
                          {talentData?.firstName} {talentData?.lastName}
                        </p>
                        <div className="flex items-center gap-2 bg-[#93979D] text-white p-2 rounded-md">
                          <RiEdit2Fill />
                          <Link to={"edit-profile"}>Edit Profile</Link>
                        </div>
                      </div>
                      <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-full  border rounded-[6px]">
                        <div className="flex items-center gap-4">
                          <FaChartPie />

                          <p className="text-[15px] font-medium">Overview</p>
                        </div>
                        <Separator className="bg-bm__gler/50" />
                        <p className="text-[12px] font-normal capitalize">
                          {/* Lorem ipsum dolor sit amet consectetur. Tristique
                          egestas nulla a ac imperdiet in. A dignissim neque
                          risus mattis. Justo sed pretium tristique aliquam.
                          Tempus in elementum arcu suscipit. Neque volutpat
                          placerat sem sem quis. */}
                          {talentData?.summary}
                        </p>
                      </Card>
                      <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-full  border rounded-[6px]">
                        <div className="flex items-center gap-4">
                          <TiContacts />
                          <p className="text-[15px] font-medium">
                            Personal Details
                          </p>
                        </div>
                        <Separator className="bg-bm__gler/50" />
                        <div className="text-[12px] font-normal gap-2 flex flex-col">
                          <div className="flex items-center">
                            <p className="w-[120px] text-[12px] font-medium">
                              First Name:
                            </p>
                            <p className="capitalize">
                              {talentData?.firstName}
                            </p>
                          </div>
                          <div className="flex items-center capitalize">
                            <p className="w-[120px] text-[12px] font-medium">
                              Last Name:
                            </p>
                            <p className="capitalize">{talentData?.lastName}</p>
                          </div>
                          <div className="flex items-center">
                            <p className="w-[120px] text-[12px] font-medium">
                              Middle Name:
                            </p>
                            <p className="capitalize">
                              {talentData?.middleName}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="w-[120px] text-[12px] font-medium capitalize">
                              Date of Birth:
                            </p>
                            {/* <p className="capitalize">{talentData.DOB}</p> */}
                            <p className="capitalize">{formattedDOB}</p>
                          </div>
                          <div className="flex items-center">
                            <p className="w-[120px] text-[12px] font-medium capitalize">
                              Email Address:
                            </p>
                            <p className="capitalize">{talentData?.email}</p>
                          </div>
                          <div className="flex items-center">
                            <p className="w-[120px] text-[12px] font-medium capitalize">
                              Phone Number:
                            </p>
                            <p className="capitalize">{talentData.phone}</p>
                          </div>
                          <div className="flex items-center">
                            <p className="w-[120px] text-[12px] font-medium capitalize">
                              Alternate Number:
                            </p>
                            <p className="capitalize">
                              {talentData?.alternatePhone}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="w-[120px] text-[12px] font-medium">
                              Gender:
                            </p>
                            <p className="capitalize">{talentData?.gender}</p>
                          </div>
                          <div className="flex items-center">
                            <p className="w-[120px] text-[12px] font-medium">
                              Skin Color:
                            </p>
                            <p className="capitalize">
                              {talentData?.skinColor}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="w-[120px] text-[12px] font-medium">
                              State of Origin:
                            </p>
                            <p className="capitalize">
                              {talentData?.origin}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="w-[120px] text-[12px] font-medium">
                              Height:
                            </p>
                            <p className="">{talentData?.height}cm</p>
                          </div>
                          <div className="flex items-center">
                            <p className="w-[120px] text-[12px] font-medium">
                              Dress Size:
                            </p>
                            <p className="capitalize">
                              {talentData?.dressSize}
                            </p>
                          </div>
                        </div>
                      </Card>
                      {/* <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-full  border rounded-[6px]">
                        <div className="flex items-center gap-4">
                          <FaLocationDot />
                          <p className="text-[15px] font-medium">Address</p>
                        </div>
                        <Separator className="bg-bm__gler/50" />
                        <div className="text-[12px] font-normal gap-2 flex flex-col">
                          <div className="flex items-center">
                            <p className="text-[12px] font-medium">Address 1</p>
                          </div>
                          <div className="flex flex-col">
                            <p className="text-[12px]">
                              1b, Rosewood Close, Off Royal-Palm Drive,
                            </p>
                            <p>Osborne Forseshore Estate Phase 2,</p>
                            <p>Ikoyi L.G.A.</p>

                            <p>Lagos State</p>
                            <p>233312</p>
                          </div>
                        </div>
                      </Card> */}
                      <Card className="p-6 flex flex-col justify-center gap-2 bg-white border-bm__beige w-full border rounded-[6px]">
                        <div className="flex items-center gap-4">
                          <FaLocationDot />
                          <p className="text-[15px] font-medium">Address</p>
                        </div>
                        <Separator className="bg-bm__gler/50" />
                        {talentData?.address?.map(
                          (addressItem: any, index: number) => (
                            <div key={index}>
                              <p className="text-[12px] font-normal capitalize">
                                {addressItem?.street}
                              </p>
                              <p className="text-[12px] font-normal capitalize">
                                {addressItem?.city}
                              </p>
                              <p className="text-[12px] font-normal capitalize">
                                {addressItem?.LGA}
                              </p>
                              <p className="text-[12px] font-normal capitalize">
                                {addressItem?.state}
                              </p>
                              <p className="text-[12px] font-normal capitalize">
                                {addressItem?.zipCode}
                              </p>
                            </div>
                          )
                        )}
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
                            <p>Second Class</p>
                            <p>University of Ilorin</p>
                            <p>Class of 2019</p>
                          </div>
                        </div> */}
                        {/* {talentData?.education?.map(
                          (educationItem: Education, index: number) => (
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
                                <p className="capitalize">
                                  {educationItem?.degree}
                                </p>
                                <p className="capitalize">
                                  {educationItem?.grade}
                                </p>
                                <p className="capitalize">
                                  {educationItem?.institution}
                                </p>

                                <p className="capitalize">
                                  {new Date(
                                    educationItem?.gradYear
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>
                          )
                        )} */}

                        <Separator className="bg-bm__gler/50" />
                        {/* <div className="text-[12px] font-normal gap-2 flex flex-col">
                          <div className="flex items-center">
                            <p className="text-[12px] font-medium">
                              Certificate 1
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <p className="">Certificate in Dancing</p>
                            <p>J-Skills School of Dancing</p>
                            <p>2020</p>
                          </div>
                        </div> */}
                        {talentData?.certifications?.map(
                          (certificationItem: Certification, index: number) => (
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
                                <p className="capitalize">
                                  {certificationItem?.certYear}
                                </p>
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
                          <div className="flex items-center">
                            <p className="text-[12px] font-medium">
                              Experience 1
                            </p>
                          </div>
                          {talentData?.experience?.map(
                            (experienceItem: any, index: number) => (
                              <div key={index} className="flex flex-col">
                                <p className="capitalize">
                                  {experienceItem?.agencyName}
                                </p>
                                <p className="capitalize">
                                  {experienceItem?.projectName}
                                </p>
                                <p className="capitalize">
                                  {experienceItem?.projectCategory}
                                </p>
                                <p className="capitalize">
                                  {experienceItem?.projectDuration}
                                </p>
                                <p className="capitalize">
                                  {/* {experienceItem.salary} */}₦
                                  {parseFloat(
                                    experienceItem?.salary
                                  ).toLocaleString("en-US")}
                                </p>
                                <p className="capitalize">
                                  {experienceItem?.year}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
