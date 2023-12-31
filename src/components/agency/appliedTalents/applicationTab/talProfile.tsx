// import { MainLayout } from "../Layout";
import { Card } from "../../../../ui/card";
import { Separator } from "../../../../ui/seperator";
import { BiSolidUserDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
// import Footer from "../Footer";
import { Button } from "../../../../ui/button";
import { MdPayments, MdSettings } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { FaChartPie, FaCrown, FaGraduationCap } from "react-icons/fa";
import { TiContacts } from "react-icons/ti";
import { FaLocationDot } from "react-icons/fa6";
import { PiStackSimpleFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { patchAxiosInstance } from "../../../../api/axios";

const TalProfile = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const [talentData, setTalentData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    profilePic: "",
    languages: [],
    skills: [],
    opportunities: "",
    address: [],
    education: [],
    certifications: [],
    experience: [],
    socials: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
    summary: "",
  });

  useEffect(() => {
    const updateTalent = async () => {
      if (user?.accountId !== undefined) {
        try {
          const response = await patchAxiosInstance.get(`/get-talent-profile`, {
            headers: {
              Authorization: `Bearer ${user.authKey || ""}`,
            },
          });
          setTalentData(response.data.data);
        } catch (error) {}
      }
    };
    updateTalent();
  }, []);

  return (
    <>
      <div className="flex overflow-hidden bg-bm_card_grey">
        <div className="flex-1">
          <div className="bg-white flex w-full max-w-[1600px] mx-auto h-[79vh] p-[24px] pb-2  gap-[24px]">
            <div className="flex flex-col">
              <div className="w-full overflow-y-scroll pr-2">
                <div className=" flex w-full gap-4 h-fit">
                  <div className=" w-full max-w-[240px] flex flex-col gap-2">
                    {/* <img src="" className='' alt="" /> */}
                    <div className="h-[300px]  rounded-md">
                      <img src={talentData.profilePic} className="" alt="" />
                    </div>

                    <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-[240px]  border rounded-[6px]">
                      <div className="flex items-center gap-4">
                        <FaGraduationCap />
                        <p className="text-[15px] font-medium">
                          Qualification & Certificates
                        </p>
                      </div>
                      <Separator className="bg-bm__gler/50" />
                      {/* <p className="text-[12px] font-normal">
                          BSc. Modelling
                        </p> */}
                      {talentData.education.map((qualification, index) => (
                        <p key={index} className="text-[12px] font-normal">
                          {qualification}
                        </p>
                      ))}

                      {/* <p className="text-[12px] font-normal">
                          Certificate in Dancing
                        </p> */}
                      {talentData.certifications.map((certificate, index) => (
                        <p key={index} className="text-[12px] font-normal">
                          {certificate}
                        </p>
                      ))}
                    </Card>

                    <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-[240px]  border rounded-[6px]">
                      <p className="text-[15px] font-medium">
                        Work you are open to{" "}
                      </p>
                      <Separator className="bg-bm__gler/50" />
                      <p className="text-[12px] font-normal">
                        Usher . In-Store Marketer . Open Market Marketer . Brand
                        Ambassador . Brand Ambassador Supervisor . In-Store
                        Supervisor
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
                      {talentData.skills.length > 0 ? (
                        talentData.skills.map((skill, index) => (
                          <p key={index} className="text-[12px] font-normal">
                            {skill}
                          </p>
                        ))
                      ) : (
                        <p className="text-[12px] font-normal">
                          No skills available
                        </p>
                      )}
                    </Card>
                    <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-[240px]  border rounded-[6px]">
                      <p className="text-[15px] font-medium">Socials</p>

                      <Separator className="bg-bm__gler/50" />
                      <p className="text-[12px] font-normal">Noah Omolade </p>
                      <p className="text-[12px] font-normal">IamNoah </p>
                      <p className="text-[12px] font-normal"> IamNoah </p>
                      <p className="text-[12px] font-normal">Noah Omolade </p>
                    </Card>
                    <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-[240px]  border rounded-[6px]">
                      <p className="text-[15px] font-medium">Languages</p>

                      <Separator className="bg-bm__gler/50" />
                      {/* <p className="text-[12px] font-normal">
                          Yoruba . English . Hausa{" "}
                        </p> */}
                      {talentData.languages.map((language, index) => (
                        <p key={index} className="text-[12px] font-normal">
                          {language}
                        </p>
                      ))}
                    </Card>
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex w-full  justify-between items-center ">
                      <p className="text-[16px] font-bold">
                        {talentData.firstName} {talentData.lastName}
                      </p>
                    </div>
                    <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-full  border rounded-[6px]">
                      <div className="flex items-center gap-4">
                        <FaChartPie />

                        <p className="text-[15px] font-medium">Overview</p>
                      </div>
                      <Separator className="bg-bm__gler/50" />
                      <p className="text-[12px] font-normal">
                        Lorem ipsum dolor sit amet consectetur. Tristique
                        egestas nulla a ac imperdiet in. A dignissim neque risus
                        mattis. Justo sed pretium tristique aliquam. Tempus in
                        elementum arcu suscipit. Neque volutpat placerat sem sem
                        quis.
                        {talentData.summary}
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
                          <p className="">{talentData.firstName}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-[120px] text-[12px] font-medium">
                            Last Name:
                          </p>
                          <p className="">{talentData.lastName}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-[120px] text-[12px] font-medium">
                            Middle Name:
                          </p>
                          <p className="">Omolola</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-[120px] text-[12px] font-medium">
                            Date of Birth:
                          </p>
                          <p className="">-</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-[120px] text-[12px] font-medium">
                            Email Address:
                          </p>
                          <p className="">-</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-[120px] text-[12px] font-medium">
                            Phone Number:
                          </p>
                          <p className="">-</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-[120px] text-[12px] font-medium">
                            Alternate Number:
                          </p>
                          <p className="">-</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-[120px] text-[12px] font-medium">
                            Gender:
                          </p>
                          <p className="">-</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-[120px] text-[12px] font-medium">
                            Skin Color:
                          </p>
                          <p className="">-</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-[120px] text-[12px] font-medium">
                            Height:
                          </p>
                          <p className="">-</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-[120px] text-[12px] font-medium">
                            Dress Size:
                          </p>
                          <p className="">-</p>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-6 flex flex-col justify-center gap-2 bg-white border-bm__beige w-full border rounded-[6px]">
                      <div className="flex items-center gap-4">
                        <FaLocationDot />
                        <p className="text-[15px] font-medium">Address</p>
                      </div>
                      <Separator className="bg-bm__gler/50" />

                      {(talentData.address as string[])?.length > 0 ? (
                        (talentData.address as string[]).map(
                          (addressLine, index) => (
                            <div
                              key={index}
                              className="text-[12px] font-normal gap-2 flex flex-col"
                            >
                              <div className="flex items-center">
                                <p className="text-[12px] font-medium">
                                  Address {index + 1}
                                </p>
                              </div>
                              <div className="flex flex-col">
                                {addressLine.split(",").map((line, i) => (
                                  <p key={i} className="text-[12px]">
                                    {line.trim()}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )
                        )
                      ) : (
                        <p>No address information available</p>
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
                      <div className="text-[12px] font-normal gap-2 flex flex-col">
                        <div className="flex items-center">
                          <p className="text-[12px] font-medium">Education 1</p>
                        </div>
                        <div className="flex flex-col">
                          <p className="">BSc. in Modelling</p>
                          <p>Second Class</p>
                          <p>University of Ilorin</p>
                          <p>Class of 2019</p>
                        </div>
                      </div>
                      <Separator className="bg-bm__gler/50" />
                      <div className="text-[12px] font-normal gap-2 flex flex-col">
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
                      </div>
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
                        <div className="flex flex-col">
                          <p className="">Madison & Park Limited</p>
                          <p>Nivea Radiant and Beauty</p>
                          <p>In-Store Project</p>

                          <p>6 Months</p>
                          <p>10,000 per week</p>
                          <p>2021</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TalProfile;
