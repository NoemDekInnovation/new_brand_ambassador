import { Card, CardContent } from "../../../../ui/card";
import { Button } from "../../../../ui/button";
import { Input } from "../../../../ui/input";
import { Separator } from "../../../../ui/seperator";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdPayments, MdSettings } from "react-icons/md";
import darkUnion from "../../../../assets/long_union_2.png";
import subtract from "../../../../assets/long_subtract2.png";
import { Link } from "react-router-dom";

export default function CompanyDetails({
  cancel,
  next,
  prev,
}: {
  next: () => void;
  prev: () => void;
  cancel: () => void;
}) {
  return (
    <div className=" bg-[#F3F3F3]/30   px-4 md:px-12 xl:px-40 py-10 mx-auto p-24">
      <Card className="bg-white  h-full p-2 md:p-4  flex justify-between gap-[24px] ">
        <Card className=" p-6 flex flex-col justify-center gap-2  border-bm__beige w-[240px] max-h-[189px] border rounded-[6px]">
          <p className="text-[15px] font-medium">My Account</p>
          <Separator className="bg-bm__gler" />
          <div className="flex items-center gap-4  hover:bg-black/10 transform hover:scale-105 p-2 cursor-pointer">
            <BiSolidUserDetail />
            <p className="text-[12px] font-normal">Profile</p>
          </div>
          <Separator className="bg-bm__gler/50" />

          <div className="flex items-center gap-4   hover:bg-black/10 transform hover:scale-105 p-2 cursor-pointer">
            <MdPayments />
            <p className="text-[12px] font-normal">Billings & Payments</p>
          </div>
          <Separator className="bg-bm__gler/50" />

          <div className="flex items-center gap-4   hover:bg-black/10 transform hover:scale-105 p-2 cursor-pointer">
            <MdSettings />
            <p className="text-[12px] font-normal">Settings</p>
          </div>
        </Card>
        <div className="flex-1">
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
          <CardContent className="border rounded-xl  p-5 flex-1 flex flex-col  mt-3 ">
            <div className="pb-8">
              <Input type="file" className="hidden pb-4" />
              <div className="mt-3 border w-[120px] h-[150px] flex justify-center text-center items-center text-[18px] font-light text-[#93979DB2]">
                Attach or drop photos here
              </div>
            </div>
            <Separator className=" my-3" />
            <div className="relative  z-0 w-full mb-6 group">
              <input
                type="text"
                name="floating_first_name"
                id="floating_first_name"
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
                Office Nmber
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
                Phone Number
              </label>
            </div>
            <div className="grid md:grid-cols-5 md:gap-6 mt-4">
              <div className="relative md:col-span-4  z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="floating_first_name"
                  id="floating_first_name"
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
                  Street address
                </label>
              </div>

              <div className="relative md:col-span-1 z-0 w-full mb-6 group">
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
                  City
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-5 md:gap-6">
              <div className="relative md:col-span-1  z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="floating_first_name"
                  id="floating_first_name"
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
                  LGA
                </label>
              </div>

              <div className="relative  md:col-span-2 z-0 w-full mb-6 group">
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
                  State
                </label>
              </div>
              <div className="relative  md:col-span-2 z-0 w-full mb-6 group">
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
