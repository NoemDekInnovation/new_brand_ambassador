import React, { FormEvent, useState } from "react";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/seperator";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Input } from "../../ui/input";
import { BsPersonFillAdd } from "react-icons/bs";
import { AiOutlineImport } from "react-icons/ai";
import { BiSortAlt2 } from "react-icons/bi";
import beauty from "../../assets/beauty.jpg";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Controller, useForm } from "react-hook-form";
import validator from "validator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { TbLayoutGrid } from "react-icons/tb";
import {
  AiOutlineHeart,
  AiOutlineUnorderedList,
  AiOutlineMore,
} from "react-icons/ai";
// import { multerAxiosInstance } from "@/utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useToast } from "../../ui/use-toast";
import PreviewBoard from "./PreviewBoard";
// import { setFailedImport, setSuccessImport } from "@/redux/talent.slice";

export default function TalentTab() {
  const [talentFile, setTalentFile] = useState<File>({} as File);
  const [formData, setFormData] = useState(new FormData());
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  //   const dispatch = useDispatch();
  //   const { user } = useSelector((state: RootState) => state.user);

  const talents = [1, 2, 3, 4, 5, 6, 7, 8, 9, 20, 21, 332, 43].map((_, idx) => {
    return (
      <Card className="w-[260px] relative" key={idx}>
        <div className="relative">
          <div className="bg-bm__card absolute z-30 right-0 top-2 p-2 rounded-l-md flex gap-2">
            <AiOutlineHeart />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <AiOutlineMore />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white p-3">
                <DropdownMenuItem className="hover:bg-black/10">
                  Add to Project
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-bm__beige" />
                <DropdownMenuItem className="hover:bg-black/10">
                  Share{" "}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <img
            src={beauty}
            alt=""
            width={260}
            height={260}
            style={{ borderRadius: 5 }}
            className=" hover:grayscale-0 grayscale"
          />
        </div>
        <div className="flex items-center gap-3 whitespace-nowrap p-2">
          <p className="text-[15px] font-medium">Gloria Michael</p>
          <span className="text-[12px] font-normal">
            24 yrs. 51.Ikeja Lagos
          </span>
        </div>{" "}
        <div className="flex items-center gap-2 whitespace-nowrap p-1">
          <p className="text-[12px] font-normal border-r-2 pr-2">
            Nivea, Coca Cola, ...
          </p>
          <span className="text-[12px] font-normal">In-store, Open Market</span>
        </div>
        <Separator />
        <div className="flex items-center gap-2 whitespace-nowrap p-2">
          <div className="text-[15px] font-medium border-r-2 pr-2 ">
            <span className="text-bm_ox_red">97% {"  "}</span>
            Work Success
          </div>
          <div className="text-[15px] font-medium">
            <span className="text-bm_ox_red">4.5 {"  "}</span>
            Ratings
          </div>
        </div>
      </Card>
    );
  });

  const {
    control,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
    },
  });

  let errMsg = {
    email: "",
    firstName: "",
    lastName: "",
  };

  if (errors?.email?.type === "required") {
    errMsg.email = "Please enter your email address";
  }

  if (
    errors?.email?.type === "required" ||
    (watch("email") && !validator.isEmail(watch("email")))
  ) {
    errMsg.email = "Please enter a valid email address.";
  }

  if (errors?.firstName?.type === "required") {
    errMsg.firstName = "Please enter your first name";
  }

  if (errors?.lastName?.type === "required") {
    errMsg.lastName = "Please enter your last name";
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      const selectedFiles = Array.from(files);
      setTalentFile(selectedFiles[0]);
    }
  };

  const handleTalentFileUpload = async (e: FormEvent) => {
    e.preventDefault();

    // if (!talentFile) {
    //   alert("Please upload file");
    //   return;
    // }
    // try {
    //   setIsLoading(true);
    //   if (user !== null) {
    //     const fileData = new FormData();
    //     fileData.append("document", talentFile);

    //     const response = await multerAxiosInstance.post(
    //       ${user.accountId}/import-talent,
    //       fileData // Pass the FormData object directly
    //     );
    //     setIsLoading(false);
    //     console.log(response);
    //     console.log(response.data);
    //     console.log(response.data.failedToImport);

    //     dispatch(setFailedImport(response.data.failedToImport));
    //     dispatch(setSuccessImport(response.data.successfulImported));
    //     setTalentFile({} as File);
    //     setPreview(true);
    //   }
    // } catch (error: any) {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="bg-bm_card_grey  h-full w-full ">
      <div className="px-4 md:px-12 xl:px-40 min-h-[70vh] py-10">
        <Card className="bg-white h-full p-3 md:p-6 flex flex-col md:flex-row gap-3 md:gap-6">
          <CardContent className="flex-col flex p-0 gap-3 md:gap-6">
            <div className="flex gap-2 md:gap-4 justify-between w-full">
              <Dialog>
                <DialogTrigger className="dark__btn whitespace-nowrap flex items-center">
                  <BsPersonFillAdd className="text-[17px] mr-2" />
                  Add Talent
                </DialogTrigger>
                <DialogContent className="w-full max-w-[400px] p-2 md:p-6 shadow-md bg-white">
                  <DialogHeader className="p-0">
                    <div className="flex items-center">
                      <BsPersonFillAdd className="text-[17px] mr-2" />
                      <DialogTitle>Add Talent</DialogTitle>
                    </div>
                    <DropdownMenuSeparator className="bg-bm__beige my-3" />
                  </DialogHeader>

                  <div className="text-[12px]  md:text-[15px] gap-4 flex flex-col">
                    <p>
                      A link will be sent to the email address provided to
                      complete the registration
                    </p>
                  </div>
                  <DropdownMenuSeparator className="bg-bm__beige mb-3" />
                  <div className="">
                    <Controller
                      name="firstName"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <div className="w-full pb-4">
                          <input
                            {...field}
                            type="text"
                            placeholder="First name"
                            name="firstName"
                            className="w-full sm:h-12 rounded-lg p-2 text-[12px] sm:p-4 sm:text-[14px] ring-1 ring-bm_btn_grey "
                          />
                          {errMsg.firstName && (
                            <small className="text-red-500">
                              {errMsg.firstName}
                            </small>
                          )}
                        </div>
                      )}
                    />
                    <Controller
                      name="lastName"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <div className="w-full pb-4">
                          <input
                            {...field}
                            type="text"
                            placeholder="Last name"
                            name="lastName"
                            className="w-full sm:h-12 rounded-lg p-2 text-[12px] sm:p-4 sm:text-[14px] ring-1 ring-bm_btn_grey "
                          />
                          {errMsg.lastName && (
                            <small className="text-red-500">
                              {errMsg.lastName}
                            </small>
                          )}
                        </div>
                      )}
                    />
                    <Controller
                      name="email"
                      // name='email'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <div className="w-full pb-4">
                          <input
                            {...field}
                            type="email"
                            placeholder="Email address"
                            name="email"
                            className="w-full sm:h-12 rounded-lg p-2 text-[12px] sm:p-4 sm:text-[14px] ring-1 ring-bm_btn_grey "
                          />
                          {errMsg.email && (
                            <small className="text-red-500">
                              {errMsg.email}
                            </small>
                          )}
                        </div>
                      )}
                    />
                    <Controller
                      name="phone"
                      // name='email'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <div className="w-full pb-4">
                          <input
                            {...field}
                            type="tel"
                            placeholder="Phone number"
                            name="phone"
                            className="w-full sm:h-12 rounded-lg p-2 text-[12px] sm:p-4 sm:text-[14px] ring-1 ring-bm_btn_grey "
                          />
                          {/* {errMsg.email && (
                          <small className="text-red-500">{errMsg.email}</small>
                        )} */}
                        </div>
                      )}
                    />
                  </div>
                  <DropdownMenuSeparator className="bg-bm__beige mb-3" />
                  <p className="text-[12px] md:text-[15px]">
                    Do you want to add this talent to your project?{" "}
                  </p>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <div className="w-full pb-4">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Select project" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="Project 1">Project 1</SelectItem>
                            <SelectItem value="Project 2">Project 2</SelectItem>
                          </SelectContent>
                        </Select>
                        {/* {errMsg.agencyType && (
                            <small className="text-red-500">
                              {errMsg.agencyType}
                            </small>
                          )} */}
                      </div>
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <div className="w-full pb-4">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Role" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="Advertising Agency">
                              Role 1{" "}
                            </SelectItem>
                            <SelectItem value="Branding Agency">
                              Role 2{" "}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {/* {errMsg.agencyType && (
                            <small className="text-red-500">
                              {errMsg.agencyType}
                            </small>
                          )} */}
                      </div>
                    )}
                  />
                  <DropdownMenuSeparator className="bg-bm__beige mb-3" />
                  <p className="text-[12px] md:text-[15px]">
                    Click continue to fill out the rest of the profile
                  </p>
                  <DropdownMenuSeparator className="bg-bm__beige mb-3" />
                  <div className="flex justify-between gap-8">
                    <Button className="light__btn">Continue</Button>

                    <Button className="dark__btn">Create Talent</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger className="dark__btn whitespace-nowrap">
                  Import
                </DialogTrigger>

                <DialogContent className="w-full max-w-[360px] p-2 md:p-6 shadow-md bg-white">
                  <DialogHeader className="p-0">
                    <div className="flex items-center">
                      <AiOutlineImport className="text-[17px] mr-2" />
                      <DialogTitle>Import Talent</DialogTitle>
                    </div>
                    <DropdownMenuSeparator className="bg-bm__beige my-3" />
                  </DialogHeader>

                  <div className="text-[12px] gap-4 flex flex-col">
                    <p>
                      After successful import, a link will be sent to each email
                      addresses provided to complete their registration.
                    </p>
                    <p>
                      {" "}
                      You can download the CSV file template to fill out the
                      talent form.
                    </p>
                  </div>
                  <DropdownMenuSeparator className="bg-bm__beige my-3" />
                  <Input type="file" onChange={handleFileChange} />
                  <Button
                    className="dark__btn"
                    onClick={handleTalentFileUpload}
                  >
                    {isLoading && (
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 mr-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                    Import CSV File
                  </Button>

                  <Button className="dark__btn mt-2">
                    Download CSV File Template
                  </Button>
                  {/* {message && (
                    <div
                      className="p-4 mb-4 my-2 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                      role="alert"
                    >
                      <span className="font-medium">Success alert!</span>{" "}
                      {message}
                    </div>
                  )}
                  {error && (
                    <div className=" bg-red-100 w-full max-w-[480px] text-red-700 text-center p-2 rounded-lg mb-2 transition-all duration-1000">
                      {error}
                    </div>
                  )} */}
                </DialogContent>
              </Dialog>
              <Dialog open={preview} onOpenChange={() => setPreview(!preview)}>
                <DialogContent className="w-full min-w-[80vw] p-2 md:p-6 shadow-md bg-white">
                  <PreviewBoard />
                </DialogContent>
              </Dialog>
            </div>
            <Card>
              <CardContent className="p-1.5 flex flex-col justify-center gap-1  border-bm__beige w-[280px] max-h-[210px] border rounded-[6px]">
                <div className="hover:bg-black/10 transform hover:scale-105 cursor-pointer">
                  <p className="text-[#252525B2] text-[14px] font-normal p-3 mr-3">
                    All Talents
                  </p>
                  <Separator className="bg-[#D7D8DA]" />
                </div>
                <div className="flex justify-between hover:bg-black/10 transform hover:scale-105 cursor-pointer">
                  <div className=" flex items-center gap-10 ">
                    <p className="text-[#252525B2] text-[14px] font-normal p-3">
                      Current Contacts
                    </p>
                    <p className="text-white bg-bm__ox__red px-2 rounded-sm ">
                      25
                    </p>
                  </div>
                </div>
                <Separator className="bg-[#D7D8DA]" />
                <div className=" hover:bg-black/10 transform hover:scale-105 cursor-pointer">
                  <p className="text-[#252525B2] text-[14px] font-normal p-3 mr-3">
                    {" "}
                    Favorites
                  </p>
                </div>
                <Separator className="bg-[#D7D8DA]" />
                <div className=" hover:bg-black/10 transform hover:scale-105 cursor-pointer">
                  <p className="text-[#252525B2] text-[14px] font-normal p-3 mr-3">
                    Engaged
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="py-3 md:py-6 space-y-3 overflow-y-scroll h-[43vh]">
                <div className="flex flex-col ">
                  <p className="mb-2 font-semibold">Gender</p>
                  <Separator className="bg-[#D7D8DA]" />
                  <RadioGroup defaultValue="male" className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">
                        <p className="text-[14px] font-normal">Male</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 pb-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label
                        htmlFor="female"
                        className="text-[14px] font-normal"
                      >
                        Female
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <Separator className="bg-bm__beige h-[2px]" />
                <div className=" ">
                  <p className="py-2 font-semibold"> Talent Type</p>
                  <Separator className="bg-[#D7D8DA]" />
                  <RadioGroup defaultValue="male" className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="usher" id="usher" />
                      <Label
                        htmlFor="usher"
                        className="text-[14px] font-normal"
                      >
                        Usher
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ba" id="ba" />
                      <Label htmlFor="ba" className="text-[14px] font-normal">
                        Brand Ambassador
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 pb-2">
                      <RadioGroupItem value="supervisor" id="supervisor" />
                      <Label
                        htmlFor="supervisor"
                        className="text-[14px] font-normal"
                      >
                        Supervisor
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <Separator className="bg-bm__beige h-[2px]" />
                <div className="pb-4">
                  <p className="py-3 font-semibold">Age</p>
                  <Separator className="bg-[#D7D8DA] mb-2" />
                  <div className="flex gap-1 items-center pt-2">
                    <Input className="max-w-[80px]" />
                    to
                    <Input className="max-w-[80px]" />
                  </div>
                </div>
                <Separator className="bg-bm__beige h-[2px]" />
                <div className="pb-4">
                  <p className="py-2 font-semibold">Location</p>
                  <Separator className="bg-[#D7D8DA] mb-2" />
                  <div className="flex gap-1 items-center justify-center pt-2">
                    <Input
                      className="max-w-[210px]"
                      placeholder="Search location"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
          <CardContent className=" flex-1">
            <div className="flex justify-between">
              <p className="font-semibold text-[18px]">Talent</p>
              <div className="flex items-center gap-3 md:gap-6">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex gap-1 items-center">
                    <BiSortAlt2 />
                    Sort: {"  "} Average Rating
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white p-3">
                    <DropdownMenuItem className="hover:bg-black/10  text-[16px]">
                      Relevance
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-bm__beige" />
                    <DropdownMenuItem className="hover:bg-black/10  text-[16px]">
                      Average Rating
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex gap-2 md:gap-4 items-center">
                  <span className="flex items-center gap-1">
                    View:{"  "} <TbLayoutGrid />
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex gap-1 items-center">
                      <AiOutlineUnorderedList />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white p-3">
                      <DropdownMenuItem className="hover:bg-black/10">
                        Work Success
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-bm__beige" />
                      <DropdownMenuItem className="hover:bg-black/10">
                        Average Rating
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-black/10">
                        Name (A - Z){" "}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            <Separator className="my-2" />
            <div className=" m-auto grid grid-cols-4 gap-3 md:gap-12 mt-8  overflow-y-scroll h-[83vh]">
              {/* <div className="container m-auto grid grid-cols-4 gap-3"> */}
              {talents}
            </div>
          </CardContent>
        </Card>
      </div>
         
    </div>
  );
}
