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

const Profile = () => {
  return (
    <MainLayout>
      <div className="flex overflow-hidden h-[85vh] bg-bm_card_grey">
        <div className="flex-1 overflow-y-scroll p-2">
          <div className=" flex py-10 md:space-x-8 flex-col items-center space-y-8 md:flex-row md:space-y-0 md:items-start">
            <div className="bg-white flex w-full max-w-[1600px] mx-auto min-h-[70vh] p-[24px]  gap-[24px]">
              <Card className=" p-6 flex flex-col justify-center gap-2  border-bm__beige w-[240px] max-h-[189px] border rounded-[6px]">
                <p className="text-[15px] font-medium">My Account</p>
                <Separator className="bg-bm__gler" />
                <div className="flex items-center gap-4 p-1 hover:bg-gray-400 transition-colors transform hover:scale-105 cursor-pointer">
                  <BiSolidUserDetail />
                  <p className="text-[12px] font-normal">Profile</p>
                </div>
                <Separator className="bg-bm__gler/50" />
                <div className="flex items-center gap-4 p-1 hover:bg-gray-400 transition-colors transform hover:scale-105 cursor-pointer">
                  <MdPayments />
                  <p className="text-[12px] font-normal">Billings & Payments</p>
                </div>
                <Separator className="bg-bm__gler/50" />
                <div className="flex items-center gap-4 p-1 hover:bg-gray-400 transition-colors transform hover:scale-105 cursor-pointer">
                  <MdSettings />
                  <p className="text-[12px] font-normal">Settings</p>
                </div>
              </Card>
              <div className="w-full">
                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-black w-fit rounded-[5px] px-1 text-[18px]">
                      <BiSolidUserDetail className="text-white w-fit" />
                    </div>
                    <p>Profile</p>
                    <p className="ml-20 bg-bm__ox__red px-2 text-white rounded-md">
                      33%
                    </p>
                  </div>
                  <Link to={"/dashboard"}>
                    <Button className="border border-black text-[18px] p-3 rounded-[40px] h-[40px] w-[40px]">
                      x
                    </Button>
                  </Link>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700  my-2">
                  <div
                    className="bg-bm__ox__red h-1.5 rounded-full"
                    style={{ width: "33%" }}
                  ></div>
                </div>
                <div className=" flex w-full gap-4 h-fit">
                  <div className=" w-full max-w-[240px] flex flex-col gap-2">
                    {/* <img src="" className='' alt="" /> */}
                    <div className="h-[300px] bg-green-200 rounded-md"></div>

                    <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-[240px]  border rounded-[6px]">
                      <p className="text-[15px] font-medium">
                        Qualification & Certificates
                      </p>
                      <Separator className="bg-bm__gler/50" />
                      <p className="text-[12px] font-normal">BSc. Modelling</p>

                      <p className="text-[12px] font-normal">
                        Certificate in Dancing
                      </p>
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
                      <p className="text-[15px] font-medium">Skills</p>

                      <Separator className="bg-bm__gler/50" />
                      <p className="text-[12px] font-normal">
                        Modelling . Singing . Dancing . Paintballing . Catwalk .
                        Leg walk . Pretty
                      </p>
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
                      <p className="text-[12px] font-normal">
                        Yoruba . English . Hausa{" "}
                      </p>
                    </Card>
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex w-full  justify-between items-center ">
                      <p>Noah Samuel Omolola</p>
                      <Link to={"edit-profile"}>Edit Profile</Link>
                    </div>
                    <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-full  border rounded-[6px]">
                      <p className="text-[15px] font-medium">Overview</p>
                      <Separator className="bg-bm__gler/50" />
                      <p className="text-[12px] font-normal">
                        Lorem ipsum dolor sit amet consectetur. Tristique
                        egestas nulla a ac imperdiet in. A dignissim neque risus
                        mattis. Justo sed pretium tristique aliquam. Tempus in
                        elementum arcu suscipit. Neque volutpat placerat sem sem
                        quis.
                      </p>
                    </Card>
                    <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-full  border rounded-[6px]">
                      <p className="text-[15px] font-medium">
                        Personal Details
                      </p>
                      <Separator className="bg-bm__gler/50" />
                      <div className="text-[12px] font-normal gap-2 flex flex-col">
                        <div className="flex items-center">
                          <p className="w-[120px]">First Name:</p>
                          <p className="">Noah</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-[120px]">Last Name:</p>
                          <p className="">Samuel</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-[120px]">Middle Name:</p>
                          <p className="">Omolola</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-[120px]">Date of Birth:</p>
                          <p className="">-</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-[120px]">Email Address:</p>
                          <p className="">-</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-[120px]">Phone Number:</p>
                          <p className="">-</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-[120px]">Alternate Number:</p>
                          <p className="">-</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-[120px]">Gender:</p>
                          <p className="">-</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-[120px]">Skin Color:</p>
                          <p className="">-</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-[120px]">Height:</p>
                          <p className="">-</p>
                        </div>
                        <div className="flex items-center">
                          <p className="w-[120px]">Dress Size:</p>
                          <p className="">-</p>
                        </div>
                      </div>
                    </Card>
                    <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-full  border rounded-[6px]">
                      <p className="text-[15px] font-medium">Address</p>
                      <Separator className="bg-bm__gler/50" />
                      <div className="text-[12px] font-normal gap-2 flex flex-col">
                        <div className="flex items-center">
                          <p className="">Address 1</p>
                        </div>
                        <div className="flex flex-col">
                          <p className="">
                            1b, Rosewood Close, Off Royal-Palm Drive,
                          </p>
                          <p>Osborne Forseshore Estate Phase 2,</p>
                          <p>Ikoyi L.G.A.</p>

                          <p>Lagos State</p>
                          <p>233312</p>
                        </div>
                      </div>
                    </Card>
                    <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-full  border rounded-[6px]">
                      <p className="text-[15px] font-medium">
                        Education & Certification
                      </p>
                      <Separator className="bg-bm__gler/50" />
                      <div className="text-[12px] font-normal gap-2 flex flex-col">
                        <div className="flex items-center">
                          <p className="">Education 1</p>
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
                          <p className="">Certificate 1</p>
                        </div>
                        <div className="flex flex-col">
                          <p className="">Certificate in Dancing</p>
                          <p>J-Skills School of Dancing</p>
                          <p>2020</p>
                        </div>
                      </div>
                    </Card>
                    <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-full  border rounded-[6px]">
                      <p className="text-[15px] font-medium">Experience</p>
                      <Separator className="bg-bm__gler/50" />
                      <div className="text-[12px] font-normal gap-2 flex flex-col">
                        <div className="flex items-center">
                          <p className="">Experience 1</p>
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
    </MainLayout>
  );
};

export default Profile;
