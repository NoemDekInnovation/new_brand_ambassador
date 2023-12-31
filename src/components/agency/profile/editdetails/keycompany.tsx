import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Card, CardContent } from "../../../../ui/card";
// import { Separator } from '../../../ui/separator';
// import { Textarea } from '../../../ui/textarea';
import { Button } from "../../../../ui/button";
import { Input } from "../../../../ui/input";
import { Separator } from "../../../../ui/seperator";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdPayments, MdSettings } from "react-icons/md";
import darkUnion from "../../../../assets/long_union.png";
import subtract from "../../../../assets/long_Subtract.png";
import { Link, useNavigate } from "react-router-dom";
// import { Progress } from '@/components/ui/progress';
import addButton from "../../../../assets/Add Button.png";
import { multerAxiosInstance, patchAxiosInstance } from "../../../../api/axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import Loading from "../../../Loading";
import PhoneInput from "react-phone-number-input";
import { useToast } from "../../../../ui/use-toast";

type E164Number = string;

export default function KeyCompany({
  next,
  cancel,
  keyCompany,
  setKeyCompany,
  create,
}: {
  next: () => void;
  cancel: () => void;
  create: () => void;
  keyCompany: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  // setKeyCompany: React.Dispatch<React.SetStateAction<{}>>;
  setKeyCompany: any;
}) {
  const { user } = useSelector((state: RootState) => state.user);
  const { agencyProfile } = useSelector((state: RootState) => state.talent);

  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    alternatePhone: "",
    profilePic: null as File | null,
    // profilePic: null as File | null,
  });
  const [inputError, setInputError] = useState<string | null>(null);
  const [phn, setPhn]: [E164Number, Dispatch<SetStateAction<E164Number>>] =
    useState("");
  const [altPhn, setAltPhn]: [
    E164Number,
    Dispatch<SetStateAction<E164Number>>
  ] = useState("");
  const [inVw, setInVw] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    if (agencyProfile) {
      setEditData({
        firstName: agencyProfile.firstName || "",
        lastName: agencyProfile.lastName || "",
        phone: agencyProfile.phone || "",
        profilePic: agencyProfile.profilePic,
        alternatePhone: agencyProfile.alternatePhone || "",
      });
      setPhn(agencyProfile.phone || "");
      setAltPhn(agencyProfile.alternatePhone || ""); // Set phone state separately if needed
    }
  }, [agencyProfile]);

  const handlePhoneChange = (value: string) => {
    setPhn(value);
  };

  const handleAltPhoneChange = (value: string) => {
    setAltPhn(value);
  };

  const handleEditSubmit = async () => {
    setLoading(true);
    const profileData = new FormData();
    profileData.append("firstName", editData.firstName);
    profileData.append("lastName", editData.lastName);
    profileData.append("phone", phn || editData.phone);
    profileData.append("alternatePhone", altPhn || editData.alternatePhone);
    // profileData.append("profilePic", editData.profilePic);
    if (editData.profilePic !== null) {
      if (typeof editData.profilePic !== "string") {
        profileData.append("profilePic", editData.profilePic);
      }
      profileData.append("profilePic", "");
    }

    if (user?.accountId !== undefined) {
      // console.log("authkey", user.authKey);
      try {
        const response = await patchAxiosInstance.patch(
          `/edit-admin`,
          // `/${user?.accountId}/edit-admin`,
          profileData,
          {
            headers: {
              Authorization: `Bearer ${user.authKey || ""}`,
            },
          }
        );

        setLoading(false);
      } catch (error) {
        setLoading(false);
        // Handle error
      }
    }
  };

  const isAlphabeticWithSpace = /^[A-Za-z ]*$/;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("Input changed:", e.target.value);

    const { name, value } = e.target;
    const isValidInput = isAlphabeticWithSpace.test(value);

    if (isValidInput || value === "") {
      setEditData({
        ...editData,
        [name]: value,
      });
      setInputError(null); // Clear the error if input is valid
    } else {
      setInputError("Please enter only alphabetic characters.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files?.length) {
      const selectedFiles = Array.from(files);
      setEditData({
        ...editData,
        [name]: selectedFiles[0],
      });
      setInVw(true);
    }
  };

  // const imageUrl = editData.profilePic
  //   ? URL.createObjectURL(editData.profilePic)
  //   : null;
  let imageUrl = null;

  if (editData.profilePic !== null) {
    try {
      imageUrl = URL.createObjectURL(editData.profilePic);
    } catch (error) {
      console.error("Failed to create object URL:", error);
    }
  }

  // console.log("Image URL:", imageUrl);

  // if (loading) {
  //   return <Loading />
  // }

  // if (edit) {

  // }

  const navigate = useNavigate();
  return (
    <div className=" bg-[#F3F3F3]/30  px-4 md:px-12 xl:px-40 pt-10 mx-auto p-24 pb-0 overflow-hidden">
      <Card className="bg-white h-[85vh] p-2 md:p-4 flex justify-between gap-[24px] overflow-hidden ">
        <Card className=" p-1 flex flex-col justify-center gap-1  border-bm__beige w-[280px] max-h-[200px] border rounded-[6px]">
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
        <div className="flex-1">
          <div className="flex justify-between font-medium text-[12px] my-2 space-x-[-10px]">
            <div className="relative text-white flex items-center justify-center">
              <p className="absolute top-[25%]  z-20 text-[16px] ">
                Key Contact Details
              </p>
              <img
                src={darkUnion}
                alt=""
                className=" z-10 w-[800px] h-[50px] "
              />
            </div>
            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] z-20 text-[16px] text-[#252525] ">
                {" "}
                Company Details
              </p>
              <img src={subtract} alt="" className=" z-10 w-[800px] h-[50px]" />
            </div>
          </div>
          <CardContent className="border rounded-xl  p-8 flex-1 flex flex-col  mt-3 ">
            <div className="pb-8">
              <label htmlFor="picture" className="cursor-pointer">
                <Input
                  id="picture"
                  type="file"
                  className="pb-4"
                  onChange={handleFileChange}
                  name="profilePic"
                  style={{ display: "none" }}
                />
                <div className="mt-3 border w-[120px] h-[150px] flex justify-center text-center items-center text-[18px] font-light text-[#93979DB2]">
                  {editData.profilePic !== null && !inVw ? (
                    <img
                      src={agencyProfile?.profilePic}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : inVw ? (
                    <img
                      src={
                        editData.profilePic !== null
                          ? URL.createObjectURL(editData.profilePic)
                          : ""
                      }
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    "Attach or drop photos here"
                  )}
                </div>
              </label>
            </div>
            <div className="relative  z-0 w-full mb-6 group">
              <input
                type="text"
                name="firstName"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                // value={formData.projectDuration.startDate}
                // onChange={handleInputChange}
                value={editData.firstName}
                onChange={handleInputChange}
                required
              />
              {inputError && (
                <p className="text-red-500 text-sm">{inputError}</p>
              )}
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="lastName"
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                // value={formData.projectDuration.endDate}
                // onChange={handleInputChange}
                value={editData.lastName}
                onChange={handleInputChange}
                required
              />
              {inputError && (
                <p className="text-red-500 text-sm">{inputError}</p>
              )}
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="email"
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                // value={formData.projectDuration.endDate}
                // onChange={handleInputChange}
                value={agencyProfile.email}
                disabled
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <PhoneInput
                placeholder="Enter phone number"
                value={editData.phone}
                onChange={handlePhoneChange}
                defaultCountry="NG"
                international
                countryCallingCodeEditable={false}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer input-phone-number"
              />
              <label
                htmlFor="floating_number"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone Number
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <PhoneInput
                placeholder="Enter phone number"
                // value={companyProfile.officePhone}
                value={editData?.alternatePhone}
                onChange={handleAltPhoneChange}
                defaultCountry="NG"
                international
                countryCallingCodeEditable={false}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer input-phone-number"
              />
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Alternate Phone Number
              </label>
            </div>
          </CardContent>
          {/* <Progress value={14} className='my-2 md:my-7' /> */}

          <div className="flex justify-between mt-2">
            <Link to={"/profile"}>
              <Button className="light__btn max-w-[100px]">Cancel</Button>
            </Link>
            <div className="flex gap-4">
              <Button
                className="dark__btn"
                onClick={() => {
                  handleEditSubmit();
                  setTimeout(() => {
                    toast({
                      description: "Changes Saved",
                    });
                    navigate("/profile");
                  }, 2000);
                }}
              >
                Save
              </Button>
              <Button
                className="dark__btn w-fit whitespace-nowrap"
                onClick={() => {
                  handleEditSubmit();
                  next();
                }}
              >
                Save and Next
              </Button>
            </div>
          </div>
        </div>
      </Card>
      {/* <img src={addButton} alt="" className="" /> */}
    </div>
  );
}
