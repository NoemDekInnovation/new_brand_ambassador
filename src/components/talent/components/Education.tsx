import { Card, CardContent } from "../../../ui/card";
import { Button } from "../../../ui/button";
import { Separator } from "../../../ui/seperator";
import union from "../../../assets/Union1.png";
import subtract from "../../../assets/Subtract.png";
import subtract2 from "../../../assets/Subtract2.png";
import subtract3 from "../../../assets/Subtract3.png";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdPayments, MdSettings } from "react-icons/md";

export default function Education({
  next,
  prev,
  cancel,
}: {
  next: () => void;
  prev: () => void;
  cancel: () => void;
}) {
  return (
    <div className=" bg-[#F3F3F3]/30   px-4 md:px-12 xl:px-40 min-h-[70vh] py-10">
      <Card className="bg-white  h-full p-2 md:p-4  flex justify-between gap-[24px]">
        <Card className=" p-6 flex flex-col justify-center gap-2  border-bm__beige max-h-[189px] border rounded-[6px]">
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
          <div className="flex justify-between font-medium text-[12px] my-2">
            <div className="relative text-black flex items-center justify-center">
              <p className="absolute top-[25%]  z-20">Overview</p>
              <img src={union} alt="" className=" z-10  w-[150px]" />
            </div>
            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[15%]  leading-4 z-20  w-[150px]">
                {" "}
                Personal <br /> Details
              </p>
              <img src={subtract} alt="" className=" z-10  w-[150px]" />
            </div>
            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] z-20"> Address</p>
              <img src={subtract} alt="" className=" z-10  w-[150px]" />
            </div>

            <div className=" relative text-white flex items-center justify-center">
              <p className="absolute top-[15%]  leading-4 z-20  w-[150px]">
                {" "}
                Education & <br /> Certification
              </p>
              <img src={subtract3} alt="" className=" z-10  w-[150px]" />
            </div>

            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] z-20"> Experience</p>
              <img src={subtract} alt="" className=" z-10  w-[150px]" />
            </div>

            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[15%]  leading-4 z-20">
                Skills &<br /> Opportunities
              </p>
              <img src={subtract} alt="" className=" z-10  w-[150px]" />
            </div>

            <div className=" relative text-black flex items-center justify-center">
              <p className="absolute top-[25%] z-20"> Socials</p>
              <img src={subtract2} alt="" className=" z-10  w-[150px]" />
            </div>
          </div>
          <CardContent className="border rounded-xl  p-3 flex-1 flex flex-col  mt-3">
            <p>
              Your education & certifications will help you get better work
              opportunities.
            </p>
            <Separator className=" my-3" />
            <div className="mt-2">
              <p>Education 1</p>
              <div className="grid md:grid-cols-2 md:gap-6 mt-4">
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
                    Institution
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
                    Degree
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
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
                    Grade
                  </label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="email"
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
                    Graduation Year
                  </label>
                </div>
              </div>
            </div>
            <Separator className="bg-bm__beige mb-3 md:mb-6" />
            <Button className="dark__btn max-w-[120px] whitespace-nowrap">
              Add Education
            </Button>
            <Separator className="bg-bm__beige my-3 md:my-6 py-[2px]" />

            <div className="mt-2">
              <p>Certification 1</p>
              <div className="grid  md:gap-6 mt-4">
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
                    Certificate name
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
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
                    Organisation
                  </label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="email"
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
                    Year
                  </label>
                </div>
              </div>
            </div>
            <Separator className="bg-bm__beige mb-3 md:mb-6" />

            <Button className="dark__btn max-w-[150px] whitespace-nowrap">
              Add Certification
            </Button>
          </CardContent>
          {/* <Progress value={56} className='my-2 md:my-7' /> */}
          <div className="flex justify-between mt-2">
            <div className="flex gap-4">
              <Button className="light__btn max-w-[100px]" onClick={cancel}>
                Close
              </Button>
              <Button className="light__btn max-w-[100px]" onClick={prev}>
                Back
              </Button>
            </div>
            <div className="flex gap-4">
              <Button className="light__btn" onClick={next}>
                Create
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
    </div>
  );
}
