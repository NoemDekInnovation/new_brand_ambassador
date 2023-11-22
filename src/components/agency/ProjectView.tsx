import React, { FormEvent, useState } from "react";
import { Card, CardContent, CardFooter } from "../../ui/card";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/seperator";
import { BiSortAlt2 } from "react-icons/bi";

import { useForm } from "react-hook-form";
import validator from "validator";
import { DropdownMenu, DropdownMenuTrigger } from "../../ui/dropdown-menu";

import { multerAxiosInstance } from "../../api/axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useToast } from "../../ui/use-toast";
import { TopProjectCard } from "./ListCard";

// import Pagination from "../../ui/Pagination";
import { AiOutlineReload } from "react-icons/ai";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import create from "../../assets/Add.png"
import current from "../../assets/Current Projects.png"
import completed from "../../assets/Completed Projects.png"
import published from "../../assets/Published Projects.png"
import draft from "../../assets/Draft Projects.png"

export default function ProjectsView({
  newProject,
}: {
  newProject: () => void;
}) {
  const [talentFile, setTalentFile] = useState<File>({} as File);
  const [formData, setFormData] = useState(new FormData());
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const { user } = useSelector((state: RootState) => state.user);

  const talents = [1, 2, 3].map((_, idx) => {
    return (
      <Card className="p-4" key={idx}>
        <CardContent className="p-0 space-y-1">
          <h3 className="font-medium text-[15px] ">
            Project Name {"  "}(in-store){" "}
          </h3>
          <p className="font-normal text-[15px]">
            This is the project description.. this is the project description
          </p>
          <div className="flex md:space-x-2 text-bm__niv text-[10px] font-medium items-center flex-wrap">
            <div className="">ID: NIV020 </div>
            <div className="text-[16px] p-0  pb-2 px-2">.</div>
            <div className=""> Outlet: Shoprite Ikeja</div>
            <div className="text-[16px] p-0  pb-2 px-2">.</div>
            {/* <br className="block md:hidden" /> */}

            <div className="">Supervisor: Adenekan Shoneye </div>
          </div>
        </CardContent>
        <CardFooter className="mt-3 p-0 md:gap-6 flex-col sm:flex-row  sm:items-end">
          <div className="flex md:space-x-2 text-bm__grey__text text-[10px] h-full flex-wrap  ">
            <div className="">Mon, Wed, Fri {"  "}</div>
            <div className="text-[11px] p-0  pb-1 px-1">.</div>

            <div className="">Nov 30 - December 30</div>
            <div className="text-[11px] p-0  pb-1 px-1">.</div>
            <div className="">Lagos, Abuja, Ogun, Plateau</div>
          </div>
          <button className="ox__btn max-w-fit text-[12px] mt-2">
            Add Report
          </button>
        </CardFooter>
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

    if (!talentFile) {
      alert("Please upload file");
      return;
    }
    try {
      setIsLoading(true);
      if (user !== null) {
        const fileData = new FormData();
        fileData.append("document", talentFile);

        const response = await multerAxiosInstance.post(
          `${user.accountId}/import-talent`,
          fileData // Pass the FormData object directly
        );
        setIsLoading(false);
        console.log(response);
        setTalentFile({} as File);
      }
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-bm_card_grey  h-full  ">
      <div className="px-4 md:px-12 xl:px-40 flex py-10 md:space-x-8 flex-col items-center space-y-8 md:flex-row md:space-y-0 md:items-start">
        <div className=" space-y-8 flex-1 flex flex-col items-center sm:block">
          <Card className="bg-white h-full p-3 md:p-6 flex flex-col md:flex-row gap-3 md:gap-6">
            <CardContent className="flex-col flex p-0 gap-3 md:gap-6">
              <div className="flex gap-2 md:gap-4 justify-between w-full">
                <img src={create} alt="" />
                <Button
                  className="dark__btn whitespace-nowrap flex items-center"
                  onClick={newProject}
                >
                  <img src={create} alt="" className="mr-2" />
                  Create Project
                </Button>
              </div>
              <Card className="min-w-[250px]">
                <CardContent className="py-3 md:py-6 space-y-3">
                  <div className="flex justify-between ">
                    <div className="flex items-center">
                      {/* <AiOutlineReload /> */}
                      <img src={current} alt="" className="mr-3" />
                      <p>Current</p>{" "}
                    </div>
                    <div className="text-white bg-bm__ox__red px-2 rounded-sm">
                      3
                    </div>
                  </div>
                  <Separator className="bg-bm__beige" />
                  <div className="flex justify-between ">
                    <div className="flex items-center">
                      {/* <FaRegArrowAltCircleUp /> */}
                      <img src={published} alt="" className="mr-3" />
                      <p>Published</p>
                    </div>
                    <div className="text-white bg-bm__ox__red px-2 rounded-sm">
                      2
                    </div>
                  </div>
                  <Separator className="bg-bm__beige" />
                  <div className="flex justify-between ">
                    <div className="flex items-center">
                      <img src={completed} alt="" className="mr-3" />
                    <p>Completed</p>
                    </div>
                    <div className="text-white bg-bm__ox__red px-2 rounded-sm">
                      33
                    </div>
                  </div>
                  <Separator className="bg-bm__beige" />
                  <div className="flex justify-between ">
                  <div className="flex items-center">
                    <img src={draft} alt="" className="mr-3" />
                    <p>Drafts</p>
                  </div>
                    <div className="text-white bg-bm__ox__red px-2 rounded-sm">
                      10
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardContent className=" flex-1">
              <div className="flex justify-between">
                <p className="font-semibold text-[18px]">Active Projects</p>
                <div className="flex items-center gap-3 md:gap-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex gap-1 items-center">
                      <BiSortAlt2 />
                      Sort by: {"  "} Average Rating
                    </DropdownMenuTrigger>
                  </DropdownMenu>
                </div>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-end my-3">
                {" "}
                {/* <Pagination /> */}
              </div>
              <Separator className="my-2" />
              <div className=" m-auto flex flex-col gap-3 md:gap-12 mt-8">
                {talents}
              </div>
              <Separator className="my-2 mt-6" />
              <div className="flex justify-end my-3">
                {" "}
                {/* <Pagination /> */}
              </div>
            </CardContent>
          </Card>
          <div className="sm:hidden w-full">
            <TopProjectCard card_title="Top Projects" card_width="w-full" />
          </div>
        </div>
        <div className="space-y-8 hidden sm:block">
          <div className="">
            <TopProjectCard card_title="Top Projects" />
          </div>
        </div>
      </div>
    </div>
  );
}
