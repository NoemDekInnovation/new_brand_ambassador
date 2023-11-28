import React from "react";
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
import { Link } from "react-router-dom";
// import { Progress } from '@/components/ui/progress';
import addButton from "../../../../assets/Add Button.png";

export default function KeyCompany({
  next,
  cancel,
  keyCompany,
  setKeyCompany,
}: {
  next: () => void;
  cancel: () => void;
  keyCompany: {};
  setKeyCompany: React.Dispatch<React.SetStateAction<{}>>;
}) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyCompany({
      ...keyCompany,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputFileChange = (event: { target: any }) => {
    const selectedFile = event.target.files[0]; // Assuming you only allow single file uploads

    // You can perform additional checks on the file if needed (e.g., file type, size)

    // Display the selected file name or perform other actions
    // console.log("Selected file:", file.name);
  };

  return (
    <div className=" bg-[#F3F3F3]/30  px-4 md:px-12 xl:px-40 pt-10 mx-auto p-24 pb-0 overflow-hidden">
      <Card className="bg-white h-[85vh] p-2 md:p-4 flex justify-between gap-[24px] overflow-hidden ">
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
            <div className="pb-8 cursor-pointer">
              <Input
                type="file"
                className="hidden pb-4"
                onChange={handleInputFileChange}
              />
              <label
                htmlFor="fileInput"
                className="mt-3 border w-[120px] h-[150px] flex justify-center text-center items-center text-[18px] font-light text-[#93979DB2]"
              >
                Attach or drop photos here
              </label>
            </div>
            <div className="relative  z-0 w-full mb-6 group">
              <input
                type="text"
                name="floating_first_name"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                // value={formData.projectDuration.startDate}
                onChange={handleInputChange}
                required
              />
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
                name="floating_last_name"
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                // value={formData.projectDuration.endDate}
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Middle Name
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
                onChange={handleInputChange}
                required
              />
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
                name="floating_last_name"
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                // value={formData.projectDuration.endDate}
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
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
          </CardContent>
          {/* <Progress value={14} className='my-2 md:my-7' /> */}

          <div className="flex justify-between mt-2">
            <Link to={"/profile"}>
              <Button className="light__btn max-w-[100px]">Cancel</Button>
            </Link>
            <div className="flex gap-4">
              <Button className="dark__btn" onClick={next}>
                Save
              </Button>
              <Button
                className="dark__btn w-fit whitespace-nowrap"
                onClick={next}
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
