import React, { FormEvent, useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "../../ui/card";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/seperator";
import { BiSortAlt2 } from "react-icons/bi";

import { useForm } from "react-hook-form";
import validator from "validator";
import { DropdownMenu, DropdownMenuTrigger } from "../../ui/dropdown-menu";

import { multerAxiosInstance } from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useToast } from "../../ui/use-toast";
import { TopProjectCard } from "./ListCard";

// import Pagination from "../../ui/Pagination";
import { AiOutlineReload, AiOutlineSearch } from "react-icons/ai";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import create from "../../assets/Add.png";
import current from "../../assets/Current Projects.png";
import completed from "../../assets/Completed Projects.png";
import published from "../../assets/Published Projects.png";
import draft from "../../assets/Draft Projects.png";
import { Input } from "../../ui/input";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import ProjectList from "./ProjectList";
import ProjectDetails from "./ProjectDetails";
import ActiveProject, { fetchactiveproject } from "../../redux/ActiveProject";
import { act } from "react-dom/test-utils";
import { fetchcompleteproject } from "../../redux/completeProject";
import { fetchdraftproject } from "../../redux/draftProject.slice";
import { fetchpublishproject } from "../../redux/publishProject";
import { IoMdClose } from "react-icons/io";

type ProjectType = "Active" | "Published" | "Completed" | "Drafts";

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
  const [activeType, setActiveType] = useState<ProjectType | null>(null);
  const [activeProjectClick, setActiveProjectClick] = useState<boolean | null>(
    false
  );
  const [toggleMenubar, setToggleMenubar] = useState(false);

  const { toast } = useToast();
  const { user } = useSelector((state: RootState) => state.user);
  const { totalProjects: totalPublishedProjects } = useSelector(
    (state: RootState) => state.publishProject
  );
  const { totalProjects: totalCompleteProjects } = useSelector(
    (state: RootState) => state.completeProject
  );
  const { draftProject } = useSelector(
    (state: RootState) => state.draftProject
  );

  const { activeProject } = useSelector(
    (state: RootState) => state.activeProject
  );

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
        // console.log(response);
        setTalentFile({} as File);
      }
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  const dispatch = useDispatch<AppDispatch>();

  const projectCount = {
    Active: activeProject?.length || 0,
    Published: totalPublishedProjects || 0,
    Completed: totalCompleteProjects || 0,
    Drafts: draftProject?.length || 0,
  };

  useEffect(() => {
    setTimeout(() => {
      const storedDefaultProject = localStorage.getItem("defaultProject");
      if (!activeProjectClick && storedDefaultProject) {
        const parsedDefaultProject = JSON.parse(storedDefaultProject);
        console.log(
          activeProjectClick,
          storedDefaultProject,
          parsedDefaultProject
        );
        setActiveType(parsedDefaultProject);
      } else if (!activeProjectClick) {
        setActiveType("Active");
      }
    }, 1000);
  }, [activeProjectClick]);

  useEffect(() => {
    dispatch(fetchactiveproject(null));
    dispatch(fetchcompleteproject(null));
    dispatch(fetchdraftproject());
    dispatch(fetchpublishproject(null));
  }, [dispatch]);

  const handleProjectTypeChange = (type: ProjectType) => {
    setToggleMenubar(!toggleMenubar);
    setActiveType(type);
  };

  return (
    <div className="bg-bm_card_grey  h-full  ">
      <div className=" h-full px-4 md:px-12 xl:px-40 flex py-10 md:space-x-8 flex-col items-center space-y-8 md:flex-row md:space-y-0 md:items-start">
        <div className="h-full space-y-8 flex-1 flex flex-col items-center sm:block">
          <Card className="bg-white h-full min-h-[89vh] p-3 md:p-6 flex flex-col md:flex-row gap-3 md:gap-6">
            <div className={`${!toggleMenubar && "hidden"} md:block`}>
              <CardContent className="flex-col flex p-0 gap-3 md:gap-6">
                <div className="w-full flex md:hidden ">
                  <IoMdClose
                    className="text-end ml-auto"
                    onClick={() => setToggleMenubar(!toggleMenubar)}
                  />
                </div>
                <div className="flex gap-2 md:gap-4 justify-between w-full">
                  {/* <img src={create} alt="" /> */}
                  <Button
                    className="dark__btn whitespace-nowrap flex items-center"
                    onClick={newProject}
                  >
                    <img src={create} alt="" className="mr-2" />
                    Create Project
                  </Button>
                </div>
                <Card className="min-w-[250px]">
                  {/* former card content was here */}
                  <ProjectList
                    projectCount={projectCount}
                    onProjectTypeChange={handleProjectTypeChange}
                    setActiveProjectClick={setActiveProjectClick}
                    activeProjectClick={activeProjectClick}
                  />
                </Card>
              </CardContent>
            </div>
            {/* second card content */}
            <div className={`${toggleMenubar && "hidden"} w-full`}>
              <ProjectDetails
                activeType={activeType || "Active"}
                setToggleMenubar={() => setToggleMenubar(!toggleMenubar)}
              />
            </div>
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
