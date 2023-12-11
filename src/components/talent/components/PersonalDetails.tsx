import { Card, CardContent } from "../../../ui/card";
import { Button } from "../../../ui/button";
import { Separator } from "../../../ui/seperator";
import union from "../../../assets/Union1.png";
import subtract from "../../../assets/Subtract.png";
import subtract2 from "../../../assets/Subtract2.png";
import subtract3 from "../../../assets/Subtract3.png";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdPayments, MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { patchAxiosInstance } from "../../../api/axios";
import { PersonalProps } from "../../../redux/types";
import { Progress } from "../../../ui/progress";
import { useForm, Controller } from "react-hook-form";
import { Country, State } from "country-state-city";
import Select from "react-select";
import PhoneInput from "react-phone-number-input";
import { Dispatch, SetStateAction } from "react";
import "react-phone-number-input/style.css";
import SelectOption from "../../../libs/select";

export default function PersonalDetails({
  next,
  prev,
  cancel, 
  setPersonal,
  personal,
  create,
  handlePhoneChange,
  handleAltPhoneChange,
  nationalityOptions,
  originOptions,
  setSelectedNationality,
  setSelectedOrigin,
}: {
  create: () => void;
  next: () => void;
  prev: () => void;
  cancel: () => void;
  handlePhoneChange: (value: string) => void;
  handleAltPhoneChange: (value: string) => void;
  nationalityOptions: any;
  originOptions: any;
  setPersonal: any;
  setSelectedNationality: any;
  setSelectedOrigin: any;
  personal: PersonalProps;
}) {
  const skinColorOptions = [
    "Fair",
    "Light",
    "Medium",
    "Olive",
    "Dark",
    // Add more options as needed
  ];


  const [inputError, setInputError] = useState<string | null>(null);
  const [heightError, setHeightError] = useState<string | null>(null);

 
  const isAlphabeticWithSpace = /^[A-Za-z ]*$/;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const { name, value } = e.target;

    const isValidInput = isAlphabeticWithSpace.test(value);

    if (isValidInput || value === "") {
      setPersonal((prevData: PersonalProps) => ({
        ...prevData,
        [fieldName]: value,
      }));
      setInputError(null);
    } else {
      setInputError("Please enter only alphabet characters.");
    }
  };

  console.log("date", personal.DOB)

  const handleHeightChange = (event: { target: { value: any; }; }) => {
    // Get the entered value
    let inputValue = event.target.value;

    // Remove any non-numeric characters
    inputValue = inputValue.replace(/[^0-9]/g, "");

    // Update the state with the height in centimeters
    setPersonal({ ...personal, height: inputValue });
  };

  const handleSkinColorChange = (event: { target: { value: any; }; }) => {
    const { value } = event.target;
    setPersonal({ ...personal, skinColor: value });
  };


//  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//    const selectedOptions = Array.from(
//      event.target.selectedOptions,
//      (option: HTMLOptionElement) => option.value
//    );
//    setPersonal({ ...personal, languages: selectedOptions });
//  };
const handleLanguageChange = (selectedOptions: any) => {
  const selectedLanguages = selectedOptions.map((option: any) => option.value);
  setPersonal((prevPersonal: any) => ({
    ...prevPersonal,
    languages: selectedLanguages,
  }));
};




  const nigeriaLanguages = [
    { value: "Hausa", label: "Hausa" },
    { value: "Yoruba", label: "Yoruba" },
    { value: "Igbo", label: "Igbo" },
    { value: "English", label: "English" },
  ];      

  const languageOptions = nigeriaLanguages.map((language) => ({
    value: language.value,
    label: language.label,
  }));



  const newLang = personal.languages.map((language) => ({
    value: language,
    label: language,
  }));
console.log("lang", newLang);

 



    const originalDate = new Date(personal.DOB);

    const year = originalDate.getFullYear();
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
    const day = originalDate.getDate().toString().padStart(2, "0");

    const formattedDate = personal.DOB !== undefined ? `${year}-${month}-${day}` : "";

      // let formattedDOB = "-";

      // if (personal.DOB !== undefined) {
      //   formattedDOB = new Date(personal.DOB).toLocaleDateString("en-US", {
      //     year: "numeric",
      //     month: "long",
      //     day: "numeric",
      //   });
      // }

    console.log(formattedDate);


  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const { value } = e.target;
    
  

    // Perform additional validation as needed
    const isValidDate = isValidDateRange(value);

    if (isValidDate) {
      setPersonal((prevData: PersonalProps) => ({
        ...prevData,
        [fieldName]: value,
      }));
      setInputError(null);
    } else {
      setInputError("Please select a valid date.");
    }
  };

  const isValidDateRange = (dateString: string): boolean => {
    // Example: Perform validation to check if the date is within a specific range
    // You can use a library like date-fns or Moment.js for more advanced date validations
    return true; // Replace this with your validation logic
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setPersonal((prevData: PersonalProps) => ({
      ...prevData,
      gender: value,
    }));
  };
  const [selectedLanguages, setSelectedLanguages] = useState([]);     

  return (
    <div className=" bg-[#F3F3F3]/30   px-4 md:px-12 xl:px-40 h-[87.3vh] pt-10 overflow-hidden">
      <Card className="bg-white  h-full p-2 md:p-4  flex justify-between gap-[24px]">
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
        <div className="flex-1 overflow-y-scroll pr-2">
          <div className="flex justify-between font-medium text-[12px] my-2">
            <div className="relative text-black flex items-center justify-center">
              <p className="absolute top-[25%]  z-20 text-[16px]">Overview</p>
              <img src={union} alt="" className=" z-10  w-[300px] h-[50px]" />
            </div>
            <div className=" relative text-white flex items-center justify-center">
              <p className="absolute top-[25%] text-[16px] z-20">
                {" "}
                Personal Details
              </p>
              <img
                src={subtract3}
                alt=""
                className=" z-10 w-[300px] h-[50px]"
              />
            </div>
            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] z-20 text-[16px]"> Address</p>
              <img src={subtract} alt="" className=" z-10 w-[300px] h-[50px]" />
            </div>

            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[15%] leading-4 z-20 text-[14px]">
                {" "}
                Education & <br /> Certification
              </p>
              <img src={subtract} alt="" className=" z-10 w-[300px] h-[50px]" />
            </div>

            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] z-20 text-[16px]"> Experience</p>
              <img src={subtract} alt="" className=" z-10 w-[300px] h-[50px]" />
            </div>

            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[15%]  leading-4 z-20 text-[14px]">
                Skills &<br /> Opportunities
              </p>
              <img src={subtract} alt="" className=" z-10 w-[300px] h-[50px]" />
            </div>

            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] z-20 text-[16px]"> Socials</p>
              <img
                src={subtract2}
                alt=""
                className=" z-10 w-[300px] h-[50px]"
              />
            </div>
          </div>
          <CardContent className="border rounded-xl  p-8 flex-1 flex flex-col  mt-3">
            <p>
              Kindly fill in your personal details. This will help you get work
              easily.
            </p>
            <Separator className=" my-7 bg-[#D7D8DA]" />
            <div className="grid md:grid-cols-2 md:gap-6 mt-4">
              <div className="relative  z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={personal.firstName}
                  onChange={(e) => handleInputChange(e, "firstName")}
                />
                {inputError && (
                  <p className="text-red-500 text-sm">{inputError}</p>
                )}
                <label
                  htmlFor="firstName"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  First name
                </label>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={personal.lastName}
                  onChange={(e) => handleInputChange(e, "lastName")}
                />
                {inputError && (
                  <p className="text-red-500 text-sm">{inputError}</p>
                )}

                <label
                  htmlFor="lastName"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Last Name
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative  z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="middleName"
                  id="middleName"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={personal.middleName}
                  onChange={(e) => handleInputChange(e, "middleName")}
                  required
                />
                {inputError && (
                  <p className="text-red-500 text-sm">{inputError}</p>
                )}

                <label
                  htmlFor="middleName"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Middle name
                </label>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={personal.email}
                  onChange={(e) => handleInputChange(e, "email")}
                  required
                  disabled
                />
                <label
                  htmlFor="email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              {/* <div className="relative  z-0 w-full mb-6 group">
                <PhoneInput
                  placeholder="Enter phone number"
                  value={personal.phone}
                  onChange={handlePhoneChange}
                  defaultCountry="NG"
                  international
                  countryCallingCodeEditable={false}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer input-phone-number"
                />
                <label
                  htmlFor="phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Phone number
                </label>
              </div> */}

              <div className="relative z-0 w-full mb-6 group">
                <PhoneInput
                  placeholder="Enter phone number"
                  value={personal.alternatePhone}
                  onChange={handleAltPhoneChange}
                  defaultCountry="NG"
                  international
                  countryCallingCodeEditable={false}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer input-phone-number"
                />
                <label
                  htmlFor="phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Alternate Phone number
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative  z-0 w-full mb-6 group">
                <input
                  type="date"
                  name="DOB"
                  id="DOB"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={formattedDate || ""}
                  // onChange={(e) => handleInputChange(e, "DOB")}
                  onChange={(e) => handleDateChange(e, "DOB")}
                />
                <label
                  htmlFor="DOB"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Date of Birth
                </label>
              </div>

              {/* <div className="relative z-0 w-full mb-6 group">
                <select
                  name="gender"
                  id="gender"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={personal.gender}
                  // onChange={(e) => handleInputChange(e, "gender")}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="" disabled selected hidden>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <label
                  htmlFor="gender"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Gender
                </label>
              </div> */}
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative w-full mb-6 group">
                <SelectOption
                  id="nationality"
                  name="nationality"
                  defaultValue={{
                    value: personal.nationality,
                    label: personal.nationality,
                  }}
                  options={nationalityOptions}
                  onChange={(e: any) => setSelectedNationality(e?.value)}
                  placeholder="Select Nationality"
                  required
                  isDisabled={false}
                  className="appearance-none bg-transparent w-full py-2.5 px-0 focus:outline-none focus:border-blue-500 text-sm text-gray-900  border-gray-300 capitalize"
                />
                <label
                  htmlFor="nationality"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nationality
                </label>
              </div>

              <div className="relative w-full mb-6 group">
                <SelectOption
                  id="origin"
                  name="origin"
                  defaultValue={{
                    value: personal.origin,
                    label: personal.origin,
                  }}
                  options={originOptions}
                  onChange={(e: any) => setSelectedOrigin(e?.value)}
                  placeholder="State of origin"
                  required
                  isDisabled={false}
                  className="appearance-none bg-transparent w-full py-2.5 px-0 focus:outline-none focus:border-blue-500 text-sm text-gray-900  border-gray-300 capitalize"
                />
                <label
                  htmlFor="origin"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  State of origin
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative  z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="height"
                  id="height"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={personal.height}
                  onChange={handleHeightChange}
                  required
                />
                {heightError && (
                  <p className="text-red-500 text-sm">{heightError}</p>
                )}
                <label
                  htmlFor="height"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Height
                </label>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                {/* <input
                  type="text"
                  name="skinColor"
                  id="skinColor"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={personal.skinColor}
                  onChange={(e) => handleInputChange(e, "skinColor")}
                  required
                /> */}
                <select
                  name="skinColor"
                  id="skinColor"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={personal.skinColor}
                  // onChange={(e) => handleInputChange(e, "skinColor")}
                  onChange={handleSkinColorChange}
                  required
                >
                  <option value="" disabled hidden>
                    Select Skin Color
                  </option>
                  {skinColorOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="skinColor"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Skin color
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative  z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="dressSize"
                  id="dressSize"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={personal.dressSize}
                  onChange={(e) => handleInputChange(e, "dressSize")}
                />
                {inputError && (
                  <p className="text-red-500 text-sm">{inputError}</p>
                )}
                <label
                  htmlFor="dressSize"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Dress Size
                </label>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                {/* <SelectOption
                defaultValue={[nigeriaLanguages]}
                
                  name="languages"
                  id="languages"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={personal.languages}
                  onChange={handleLanguageChange}
                  
                  required 
                >
                  <option value="" disabled hidden>
                    Select Language
                  </option>
                  {nigeriaLanguages.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                /> */}
                <Select
                  defaultValue={newLang}
                  isMulti
                  name="languages"
                  options={languageOptions}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0  border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  classNamePrefix="select"
                  onChange={handleLanguageChange} 
                />
 
                <label
                  htmlFor="languages"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Languages
                </label>
              </div>
            </div>
          </CardContent>

          {/* <Progress value={28} className='my-2 md:my-7' /> */}

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
              <Button
                className="dark__btn w-fit whitespace-nowrap"
                onClick={() => {
                  create();
                  cancel();
                }}
              >
                Save
              </Button>
              <Button
                className="dark__btn w-fit whitespace-nowrap"
                // onClick={next}
                onClick={() => {
                  create();
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
