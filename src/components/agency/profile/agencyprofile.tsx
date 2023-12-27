import React, { useState, useEffect } from "react";
import { MainLayout } from "../../Layout";
import { Card } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import { BiSolidUserDetail } from "react-icons/bi";
import { Progress } from "../../..//ui/progress";
import { Link } from "react-router-dom";
import Pic from "../../../assets/model.jpg";
import { RiEdit2Fill } from "react-icons/ri";
import { TiContacts } from "react-icons/ti";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { MdPayments, MdSettings } from "react-icons/md";
import addButton from "../../../assets/Add Button.png";
import { patchAxiosInstance } from "../../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchAgencyProfile } from "../../../redux/talent.slice";

const AgencyProfile = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { agencyProfile } = useSelector((state: RootState) => state.talent);

  const dispatch = useDispatch<AppDispatch>();

  // console.log("agencyProfile",agencyProfile);

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phone: "",
    profilePic: "",
    companyLogo: "",
    agencyName: "",
    agencyType: "",
    officePhone: "",
    website: "",
    address: [
      {
        street: "",
        city: "",
        LGA: "",
        state: "",
        zipCode: "",
      },
    ],
  });

  useEffect(() => {
    // const updateProfile = async () => {
    //   if (user?.accountId !== undefined) {
    //     try {
    //       const response = await patchAxiosInstance.get(`/get-agency-profile`, {
    //         headers: {
    //           Authorization: `Bearer ${user.authKey || ""}`,
    //         },
    //       });
    //       setProfileData(response.data.data);
    //       console.log(response)
    //       // Handle the response here if needed
    //     } catch (error) {
    //       // Handle errors here
    //     }
    //   }
    // };
    // updateProfile();
    dispatch(fetchAgencyProfile());
  }, []);

  return (
    <MainLayout>
      <div className="flex overflow-hidden  bg-bm_card_gray">
        <div className="flex-1 ">
          <div className=" flex pt-10  md:space-x-8 flex-col items-center space-y-8 md:flex-row md:space-y-0 md:items-start">
            <div className="bg-white flex w-full max-w-[1500px] mx-auto h-[83vh] p-[24px] pb-2 gap-[24px] justify-center ">
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
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-4">
                  <div className="bg-black w-fit rounded-[5px] px-1 text-[18px]">
                    <BiSolidUserDetail className="text-white w-fit" />
                  </div>
                  <p className="text-[16px] font-bold">Profile</p> 
                  <p className="ml-20 bg-bm__ox__red px-2 text-white rounded-md">
                    60%
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700  my-2 mb-7">
                  <div
                    className="bg-bm__ox__red h-1.5 rounded-full "
                    style={{ width: "33%" }}
                  ></div>
                </div>
                <div className="w-full overflow-y-scroll pr-2">
                  <div className=" flex w-full gap-4 h-fit">
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex w-full  justify-between items-center ">
                        <p className="text-[15px] font-bold capitalize">
                          {agencyProfile.firstName} {agencyProfile.lastName}
                        </p>
                        <div className="flex items-center gap-2 bg-[#93979D] text-white p-2 rounded-md">
                          <RiEdit2Fill />
                          <Link to={"edit-agency-profile"}>Edit Profile</Link>
                        </div>
                      </div>
                      <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-full  border rounded-[6px] ">
                        <div className="flex  justify-between items-center text-black">
                          <div className="flex items-center">
                            <div className="flex items-center gap-4">
                              <TiContacts />
                              <p className="text-[15px] font-medium flex-start">
                                Key Contact Details
                              </p>
                            </div>
                          </div>
                          <RiEdit2Fill className="cursor-pointer" />
                        </div>
                        <Separator className="bg-bm__gler/50" />
                        <div className="h-[150px] w-[120px] rounded-md">
                          <img src={agencyProfile.profilePic} alt="img" />
                        </div>
                        <div className="text-[12px] font-normal gap-2 flex flex-col mt-4">
                          <div className="pt-10 flex items-center">
                            <p className="w-[120px] text-[12px] font-semibold">
                              First Name:
                            </p>
                            {/* <p className="">Noah</p> */}
                            <p className="capitalize">
                              {agencyProfile.firstName}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="w-[120px] text-[12px] font-semibold">
                              Last Name:
                            </p>
                            <p className="capitalize">
                              {agencyProfile.lastName}
                            </p>
                          </div>

                          <div className="flex items-center">
                            <p className="w-[120px] text-[12px] font-semibold">
                              Phone Number:
                            </p>
                            <p className="">{agencyProfile.phone}</p>
                          </div>
                          <div className="flex items-center">
                            <p className="w-[120px] text-[12px] font-semibold">
                              Alt Phone Number:
                            </p>
                            <p className="">{agencyProfile.alternatePhone}</p>
                          </div>
                        </div>
                      </Card>
                      <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-full  border rounded-[6px]">
                        <div className="flex  justify-between items-center text-black">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center">
                              <HiOutlineOfficeBuilding className="cursor-pointer" />
                            </div>
                            <p className="text-[15px] font-medium flex-start">
                              Company Details
                            </p>
                          </div>

                          <RiEdit2Fill />
                        </div>
                        <Separator className="bg-bm__gler/50" />
                        <div className="h-[170px] w-[120px] rounded-md">
                          <img src={agencyProfile.companyLogo} alt="img" />
                        </div>
                        <div className="text-[12px] font-normal gap-2 flex flex-col">
                          <div className="text-[12px] font-normal gap-2 flex flex-col">
                            <div className="pt-10 flex items-center">
                              <p className="w-[120px] text-[12px] font-semibold">
                                Agency Name:
                              </p>
                              <p className="">{agencyProfile.agencyName}</p>
                            </div>
                            <div className="flex items-center">
                              <p className="w-[120px] text-[12px] font-semibold capitalize">
                                Agency Type:
                              </p>
                              <p className="">{agencyProfile.agencyType}</p>
                            </div>
                            <div className="flex items-center">
                              <p className="w-[120px] text-[12px] font-semibold">
                                Email Address:
                              </p>
                              <p className="">{agencyProfile.email}</p>
                            </div>
                            <div className="flex items-center">
                              <p className="w-[120px] text-[12px] font-semibold">
                                Office Number:
                              </p>
                              <p className="">{agencyProfile.officePhone}</p>
                            </div>
                            <div className="flex items-center">
                              <p className="w-[120px] text-[12px] font-semibold">
                                Website:
                              </p>
                              <p className="">{agencyProfile.website}</p>
                            </div>
                          </div>
                          <div className="flex">
                            <p className="w-[120px] text-[12px] font-semibold">
                              Office Address 1:
                            </p>
                            <p className=" capitalize">
                              {agencyProfile &&
                                agencyProfile.address &&
                                agencyProfile.address[0] && (
                                  <>
                                    {agencyProfile?.address[0]?.street},
                                    {agencyProfile?.address[0]?.city}, <br />
                                    {agencyProfile?.address[0]?.LGA},
                                    {agencyProfile?.address[0]?.state} <br />
                                    {agencyProfile?.address[0]?.zipCode}
                                  </>
                                )}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <img src={addButton} alt="" className="pr-50" /> */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AgencyProfile;
