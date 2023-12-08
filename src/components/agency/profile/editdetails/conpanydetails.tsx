import { Card, CardContent } from "../../../../ui/card";
import { Button } from "../../../../ui/button";
import { Input } from "../../../../ui/input";
import { Separator } from "../../../../ui/seperator";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdPayments, MdSettings } from "react-icons/md";
import darkUnion from "../../../../assets/long_union_2.png";
import subtract from "../../../../assets/long_subtract2.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { patchAxiosInstance } from "../../../../api/axios";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../ui/select";

export default function CompanyDetails({
  cancel,
  next,
  prev,
}: {
  next: () => void;
  prev: () => void;
  cancel: () => void;
}) {
  const { user } = useSelector((state: RootState) => state.user);

  const [loading, setLoading] = useState(false);
  const [companyProfile, setCompanyProfile] = useState({
    agencyType: "",
    officePhone: "",
    companyLogo: null as File | null,
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

  const handleEditCompany = async () => {
    setLoading(true);
    const companyData = new FormData();
    companyData.append("agencyType", companyProfile.agencyType);
    companyData.append("officePhone", companyProfile.officePhone);
    if (companyProfile.companyLogo !== null) {
      companyData.append("companyLogo", companyProfile.companyLogo);
    }
    companyData.append("website", companyProfile.website);
    companyProfile.address.forEach((address, index) => {
      companyData.append(`address[${index}][street]`, address.street);
      companyData.append(`address[${index}][city]`, address.city);
      companyData.append(`address[${index}][LGA]`, address.LGA);
      companyData.append(`address[${index}][state]`, address.state);
      companyData.append(`address[${index}][zipCode]`, address.zipCode);
    });

    if (user?.accountId !== undefined) {
      try {
        const response = await patchAxiosInstance.patch(
          `/agency-details`,
          companyData,
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
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // For nested fields
    if (name.startsWith("address.")) {
      // Extract the nested field name (e.g., city, street, LGA, etc.)
      const addressField = name.split(".")[1];

      // Update the state for the nested field
      setCompanyProfile({
        ...companyProfile,
        address: [
          {
            ...companyProfile.address[0],
            [addressField]: value,
          },
        ],
      });
    } else {
      // For non-nested fields
      setCompanyProfile({
        ...companyProfile,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files?.length) {
      const selectedFiles = Array.from(files);
      console.log("Selected File:", selectedFiles[0]);

      setCompanyProfile({
        ...companyProfile,
        [name]: selectedFiles[0],
      });
      console.log("Updated Company Profile:", companyProfile);
    }
  };

  const imageUrl = companyProfile.companyLogo
    ? URL.createObjectURL(companyProfile.companyLogo)
    : null;

  console.log("Image URL:", imageUrl);

  return (
    <div className=" bg-[#F3F3F3]/30   px-4 md:px-12 xl:px-40 pt-10 mx-auto p-24 overflow-hidden pb-0">
      <Card className="bg-white  h-[83vh] p-2 md:p-4  flex justify-between gap-[24px] overflow-hidden">
        <Card className=" p-1 flex flex-col justify-center gap-1  border-bm__beige w-[280px] max-h-[200px] border rounded-[6px]">
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
          <div className="flex justify-between font-medium text-[12px] my-2 space-x-[-10px]">
            <div className="relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] text-[16px] text-[#252525] z-20">
                Key Contact Details
              </p>
              <img
                src={darkUnion}
                alt=""
                className=" z-10 w-[800px] h-[50px]"
              />
            </div>
            <div className=" relative text-white flex items-center justify-center">
              <p className="absolute top-[25%] text-[16px] z-20">
                {" "}
                Company Details
              </p>
              <img
                src={subtract}
                alt=""
                className=" z-10 w-[800px]  h-[50px]"
              />
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
                  name="companyLogo"
                  style={{ display: "none" }}
                />
                <div className="mt-3 border w-[120px] h-[150px] flex justify-center text-center items-center text-[18px] font-light text-[#93979DB2]">
                  {/* Attach or drop photos here */}
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Profile"
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
                name="agencyName"
                id="agencyName"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                // value={formData.projectDuration.startDate}
                // onChange={handleInputChange}
                required
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Agency Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="agencyType"
                id="agencyType"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                // value={formData.projectDuration.endDate}
                // onChange={handleInputChange}
                value={companyProfile.agencyType}
                onChange={handleInputChange}
                required
              />
              {/* <Controller
                name="agencyType"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <div className="w-full pb-4">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select Type of Agency" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="Advertising Agency">
                          Advertising Agency
                        </SelectItem>
                        <SelectItem value="Branding Agency">
                          Branding Agency
                        </SelectItem>

                        <SelectItem value=" Public Relations Agency">
                          Public Relations Agency
                        </SelectItem>
                        <SelectItem value="Promotional Agency">
                          Promotional Agency
                        </SelectItem>
                        <SelectItem value="Event Agency">
                          Event Agency
                        </SelectItem>
                        <SelectItem value="Social Media Marketing Agency">
                          Social Media Marketing Agency
                        </SelectItem>
                        <SelectItem value="Production and Design Agency">
                          Production and Design Agency
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errMsg.agencyType && (
                      <small className="text-red-500">
                        {errMsg.agencyType}
                      </small>
                    )}
                  </div>
                )}
              /> */}
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Agency Type
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
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
                Email Address
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="officePhone"
                id="officePhone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                // value={formData.projectDuration.endDate}
                // onChange={handleInputChange}
                value={companyProfile.officePhone}
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Office Nmber
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="website"
                id="website"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                // value={formData.projectDuration.endDate}
                // onChange={handleInputChange}
                value={companyProfile.website}
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Website
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="floating_last_name"
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                // value={formData.projectDuration.endDate}
                // onChange={handleInputChange}
                value={companyProfile.officePhone}
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone Number
              </label>
            </div>
            <div className="grid md:grid-cols-5 md:gap-6 mt-4">
              <div className="relative md:col-span-4  z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="address.street"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  // value={formData.projectDuration.startDate}
                  // onChange={handleInputChange}
                  value={companyProfile.address[0].street}
                  onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Street address
                </label>
              </div>

              <div className="relative md:col-span-1 z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="address.city"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  // value={formData.projectDuration.endDate}
                  // onChange={handleInputChange}
                  value={companyProfile.address[0].city}
                  onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  City
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-5 md:gap-6">
              <div className="relative md:col-span-1  z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="address.LGA"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  // value={formData.projectDuration.startDate}
                  // onChange={handleInputChange}
                  value={companyProfile.address[0].LGA}
                  onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  LGA
                </label>
              </div>

              <div className="relative  md:col-span-2 z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="address.state"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  // value={formData.projectDuration.endDate}
                  // onChange={handleInputChange}
                  value={companyProfile.address[0].state}
                  onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  State
                </label>
              </div>
              <div className="relative  md:col-span-2 z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="address.zipCode"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  // value={formData.projectDuration.endDate}
                  // onChange={handleInputChange}
                  value={companyProfile.address[0].zipCode}
                  onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Zip Code
                </label>
              </div>
            </div>
          </CardContent>
          {/* <Progress value={14} className='my-2 md:my-7' /> */}
          <div className="flex justify-between mt-2">
            <div className="flex gap-2">
              <Link to={"/profile"}>
                <Button className="light__btn max-w-[100px]" onClick={cancel}>
                  Cancel
                </Button>
              </Link>
              <Button className="light__btn max-w-[100px]" onClick={prev}>
                Back
              </Button>
            </div>
            <div className="flex gap-4">
              <Link to={"/profile"}>
                <Button
                  className="dark__btn w-fit whitespace-nowrap"
                  // onClick={next}
                  onClick={handleEditCompany}
                >
                  Save
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
         
    </div>
  );
}
