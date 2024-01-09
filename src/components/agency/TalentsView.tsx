import { AppDispatch, RootState } from "../../redux/store";
import {
  authAxiosInstance,
  campaignAuthAxiosInstance,
  patchAxiosInstance,
} from "../../api/axios";
import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "../../ui/card";
import { AiOutlineHeart, AiOutlineImport } from "react-icons/ai";
import { DropdownMenuSeparator } from "../../ui/dropdown-menu";
// import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import validator from "validator";
import {
  TalentQueryProp,
  fetchAgencyTalents,
  fetchFavoriteTalents,
  fetchTalents,
  setFailedImport,
  setSuccessImport,
  setTalentQuery,
} from "../../redux/talent.slice";
import { BsPersonFillAdd } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Input } from "../../ui/input";
import PreviewBoard from "./PreviewBoard";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { TbProgressCheck } from "react-icons/tb";
// import Pagination from "../Pagination";
import { ProjectProps, TalentProps } from "../../redux/types";
import { Separator } from "../../ui/seperator";
import Loading from "../Loading";
import TalentList from "./TalentList";
import TalentDetailsInfo from "./TalentDetailsInfo";
import Logo from "../../assets/beauty.jpg";
import {} from "../../redux/talent.slice";
import { fetchEngageTalents } from "../../redux/engagetalent.slice";
import { fetchAgencyTalentss } from "../../redux/agencyTalent.slice";
import { fetchFavouriteProjects } from "../../redux/favourite.slice";
import { fetchCurrentEngageTalents } from "../../redux/currentengage.slice";

export type TalentType =
  | "All Talent"
  | "Current Contracts"
  | "Favorites"
  | "Engaged"
  // | "Leading Talent"
  | "My Talent";

export default function TalentsView({
  newProject,
  setProjectId,
  setTalent,
}: {
  newProject: () => void;
  setProjectId: any;
  setTalent: any;
}) {
  const [talentFile, setTalentFile] = useState<File>({} as File);
  const [formData, setFormData] = useState(new FormData());
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [gridView, setGridView] = useState(true);
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedOppor, setSelectedOppor] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [ageRange, setAgeRange] = useState({ start: "", end: "" });
  const [selectedRole, setSelectedRole] = useState<TalentProps>();
  const [projects, setProjects] = useState<ProjectProps[]>();
  const [successModal, setSuccessModal] = useState(false);
  const [successModalx, setSuccessModalx] = useState(true);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTalent, setSelectedTalent] = useState("");
  const [selectedTalentID, setSelectedTalentID] = useState("");
  const [activeTalentClick, setActiveTalentClick] = useState<boolean | null>(
    false
  );

  const [sortQuery, setSortQuery] = useState<TalentQueryProp | null>(null);

  const [activeType, setActiveType] = useState<TalentType | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  const { talents: current } = useSelector(
    (state: RootState) => state.engagedtalent
  );

  const { totalTalent } = useSelector((state: RootState) => state.talent);

  const { talentEngaged } = useSelector(
    (state: RootState) => state.engagedtalent
  );

  const { favourites: fav } = useSelector(
    (state: RootState) => state.favouriteProject
  );

  const { totalTalent: totalAgencyTalent } = useSelector(
    (state: RootState) => state.agency
  );

  const { engageTalents } = useSelector(
    (state: RootState) => state.currentengage
  );

  const talentCount = {
    "All Talent": totalTalent || 0,
    "Current Contracts": current?.length || 0,
    Favorites: fav?.length || 0,
    Engaged: engageTalents?.length || 0,
    "My Talent": totalAgencyTalent || 0,
  };

  const onTalentTypeChnage = (type: TalentType) => {
    setActiveType(type);
  };

  useEffect(() => {
    setTimeout(() => {
      const storedDefaultTalent: any = localStorage.getItem("defaultTalent");
      if (!activeTalentClick) {
        if (storedDefaultTalent) {
          return setActiveType(storedDefaultTalent);
        }
        return setActiveType("All Talent");
      }
    }, 1000);
  }, [activeType]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchTalents(null));
    dispatch(fetchEngageTalents({ queryParams: null, status: true }));
    dispatch(fetchCurrentEngageTalents({ queryParams: null, status: false }));
    dispatch(fetchFavouriteProjects(null));
    dispatch(fetchAgencyTalentss(null));

    const fetchProjects = async () => {
      if (user?.accountId !== undefined) {
        try {
          const response = await campaignAuthAxiosInstance(
            `/published-projects`,
            {
              headers: {
                Authorization: `Bearer ${user.authKey || ""}`,
              },
            }
          );
          setProjects(response?.data?.data.projects);
        } catch (error) {
          // console.error("Error while fetiching projects:", error);
          // Handle error appropriately (e.g., show a user-friendly message)
        }
      }
    };

    fetchProjects();
    setIsLoading(false);
  }, [user?.accountId]);

  const handleProfilePopUp = (talent: any) => {
    // console.log(talent);
    setPopUp(!popUp);
    setSelectedRole(talent);
  };

  const handleViewToggle = () => {
    setGridView(!gridView);
  };

  const handleGenderChange = (gender: any) => {
    updateQuery({ gender });
  };

  const handleRoleChange = (role: any) => {
    updateQuery({ opportunities: role });
  };

  const handleStartAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgeRange({ ...ageRange, start: e.target.value });
    updateQuery({ minAge: e.target.value });
  };

  const handleEndAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgeRange({ ...ageRange, end: e.target.value });
    updateQuery({ maxAge: e.target.value });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuery({ location: e.target.value });
  };

  // const updateQuery = (newValues: Partial<TalentQuery>) => {
  const updateQuery = (newValues: any) => {
    setSortQuery((prevQuery: any) => ({ ...prevQuery, ...newValues }));
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(setTalentQuery(sortQuery));
    }, 1000);
  }, [sortQuery]);

  const handleClear = () => {
    setSelectedLocation("all");
    setSelectedOppor("all");
    setAgeRange({ ...ageRange, start: "" });
    setAgeRange({ ...ageRange, end: "" });
    setSelectedGender("all");
    setSortQuery(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      const selectedFiles = Array.from(files);
      setTalentFile(selectedFiles[0]);
    }
  };

  const handleTalentFileUpload = async (e: FormEvent) => {
    e.preventDefault();
    // console.log(talentFile);

    if (talentFile === undefined) {
      alert("Please upload file");
      return;
    }
    try {
      setIsLoading(true);
      if (user !== null) {
        const fileData = new FormData();
        fileData.append("document", talentFile);

        const response = await patchAxiosInstance.post(
          `/import-talent`,
          fileData, // Pass the FormData object directly,
          {
            headers: {
              Authorization: `Bearer ${user.authKey || ""}`,
            },
          }
        );

        // console.log("rest real", response?.data?.failedToImport);
        setIsLoading(false);
        dispatch(setFailedImport(response.data.failedToImport));
        dispatch(setSuccessImport(response.data.successfullyImported));
        setTalentFile({} as File);
        setPreview(true);
      }
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  const handleInvite = async () => {
    setIsLoading(true);
    if (user !== null) {
      try {
        const response = await authAxiosInstance.post(
          `${user.accountId}/invite-to-project`,
          {
            opportunities: selectedTalent,
            projectId: selectedProject,
            talentId: selectedTalentID,
          }
        );

        setIsLoading(false);
        setSuccessModal(true);
      } catch (error) {
        setIsLoading(false);

        // console.log(error);
      }
    }
  };

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
      project: "",
      talentType: "",
    },
  });

  let errMsg = {
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    project: "",
    talentType: "",
  };
  if (
    errors?.email?.type === "required" ||
    (watch("email") && !validator.isEmail(watch("email")))
  ) {
    errMsg.email = "Please enter a valid email address.";
  }

  if (errors?.firstName?.type === "required") {
    errMsg.firstName = "Please enter talents first name";
  }

  if (errors?.lastName?.type === "required") {
    errMsg.lastName = "Please enter talents last name";
  }

  if (errors?.phone?.type === "required") {
    errMsg.phone = "Please enter talents phone number";
  }
  if (errors?.project?.type === "required") {
    errMsg.project = "Please select a project";
  }
  if (errors?.talentType?.type === "required") {
    errMsg.talentType = "Please select a talent type";
  }

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const isError = Object.values(errMsg).every(
      (error) => error === null || error === ""
    );
    if (isError) {
      try {
        // setIsLoading(true);
        const requestData = {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          // projectId: data.project,
          // opportunities: data.talentType,
          email: data.email,
        };
        const response = await campaignAuthAxiosInstance.post(
          `/register-talent`,
          requestData,
          {
            headers: {
              Authorization: `Bearer ${user?.authKey}`,
            },
          }
        );

        if (
          response !== undefined
          // &&
          // response.status === 201
        ) {
          setSuccessModal(true);
          setIsLoading(false);

          setError("");
          setMessage(response.data.message);
          // setResLink(newAccountResponse.data.link);
          return setTimeout(() => {
            setSuccessModal(false);
          }, 3000);
        }
        setIsLoading(false);
        setError(
          "Please enter your credentials correctly or check your internet connection."
        );
        setMessage("");
      } catch (error: any) {
        setIsLoading(false);

        // const keys = Object.keys(error.response.data);
        const errorMsg = error.response;

        if (errorMsg.status === 400) {
          alert(errorMsg.data.message);
        }

        setError(errorMsg);
        return;

        // setError(
        //   'Something went wrong. Please check your internet connection.'
        // );
        // setMessage('');
      }
    }
  };

  // if (isLoading) {
  //   return <Loading />;
  // }

  // const handleCloseModal = () => {
  //   // Set the successModal to false to hide the modal
  //   setSuccessModal(false);
  // };

  return (
    <>
      {isLoading && <Loading />}
      <div className="relative">
        <div className="h-full w-full relative">
          <div
            className={`fixed z-[1000] bg-black/50  w-[100%] items-center justify-end flex flex-col transition-all duration-1000 ${
              popUp
                ? "translate-y-0 opacity-100 h-[100vh] -bottom-5"
                : "translate-y-[1000px] opacity-0 h-0"
            }`}
          >
            {/* <div className="bg-white w-[90vw] min-h-[80vh] p-3 md:p-6 rounded-xl"> */}
            <div className="flex w-full justify-between ">
              <div className="gap-3 flex items-center whitespace-nowrap w-full ">
                <div className=" w-full flex flex-1 items-center gap-4">
                  <p>{selectedRole?.fullName}</p>

                  <AiOutlineHeart />
                </div>
                <Button className="dark__btn max-w-[100px] mr-4">
                  Invite Talent
                </Button>
                <Button className="light__btn max-w-[100px]">Share</Button>
              </div>
              <Button onClick={() => setPopUp(false)}>x</Button>
            </div>
            <Separator className={"my-3"} />
            <div className="flex gap-2 md:gap-4">
              <div className="flex justify-evenly w-[60w] lg:w-[40w] gap-1">
                {[1, 2, 3, 4, 5, 6, 7].map((photo) => (
                  <div className="" key={photo}>
                    {/* <img
                      src={Logo}
                      alt={""}
                      style={{ width: "100%", height: "auto" }}
                      height={80}
                      width={40}
                    /> */}
                  </div>
                ))}
              </div>
              <div className="mb-3">
                <p>Qualification & Certificates</p>
                <Separator className="bg-bm__beige my-3" />
                <p>BSc. Modelling</p>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <Card className="p-2 md:p-4">
                <h2>Overview</h2>
                <Separator className="bg-bm__beige my-3" />
                <p className="text-[12px] font-normal text-bm_black w-[110px]">
                  {selectedRole?.summary || "-"}
                </p>
              </Card>
              <Card className="p-2 md:p-4">
                <h2>Personal Details</h2>
                <Separator className="bg-bm__beige my-3" />
                <div className="flex gap-2">
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    First Name:
                  </p>
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    {selectedRole?.firstName || "-"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    Last Name:{" "}
                  </p>
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    {selectedRole?.lastName || "-"}
                  </p>
                </div>{" "}
                <div className="flex gap-2">
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    Middle Name:{" "}
                  </p>
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    {selectedRole?.middleName || "-"}
                  </p>
                </div>{" "}
                <div className="flex gap-2">
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    Email Address:
                  </p>
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    {selectedRole?.email || "-"}
                  </p>
                </div>{" "}
                <div className="flex gap-2">
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    Phone Number:{" "}
                  </p>
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    {selectedRole?.phone || "-"}
                  </p>
                </div>{" "}
                <div className="flex gap-2">
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    Alternate Number:
                  </p>
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    {selectedRole?.alternatePhone || "-"}
                  </p>
                </div>{" "}
                <div className="flex gap-2">
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    Date of Birth:{" "}
                  </p>{" "}
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    {selectedRole?.DOB || "-"}
                  </p>
                </div>{" "}
                <div className="flex gap-2">
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    Gender:
                  </p>
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    {selectedRole?.gender || "-"}
                  </p>
                </div>{" "}
                <div className="flex gap-2">
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    Skin Color:
                  </p>
                </div>{" "}
                <div className="flex gap-2">
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    State of Origin:
                  </p>
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    {selectedRole?.origin || "-"}
                  </p>
                </div>{" "}
                <div className="flex gap-2">
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    Height:
                  </p>
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    {selectedRole?.height || "-"}
                  </p>
                </div>{" "}
                <div className="flex gap-2">
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    Dress Size:
                  </p>
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    {selectedRole?.dressSize || "-"}
                  </p>
                </div>
              </Card>
            </div>
          </div>

          <div className="bg-bm_card_grey  h-full w-full ">
            <div className="px-4 md:px-12 xl:px-40 min-h-[70vh] py-10">
              <Card className="bg-white h-full p-3 md:p-6 flex flex-col md:flex-row gap-3 md:gap-6">
                <CardContent className="flex-col flex p-0 gap-3 md:gap-6">
                  <div className="flex gap-2 md:gap-4 justify-between w-full">
                    <Dialog
                    // open={successModalx}
                    // onOpenChange={() => setSuccessModalx(false)}
                    >
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
                                {errMsg.phone && (
                                  <small className="text-red-500">
                                    {errMsg.phone}
                                  </small>
                                )}
                              </div>
                            )}
                          />
                        </div>
                        <DropdownMenuSeparator className="bg-bm__beige mb-3" />
                        <p className="text-[12px] md:text-[15px]">
                          Do you want to add this talent to your project?{" "}
                        </p>
                        <Controller
                          name="project"
                          control={control}
                          rules={{ required: false }}
                          render={({ field }) => (
                            <div className="w-full ">
                              <Select
                                onValueChange={(e) => setProjectId(e)}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="w-full bg-white">
                                  <SelectValue placeholder="Select project" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                  {projects !== undefined &&
                                    projects.map(
                                      ({ projectTitle, _id }, index) => {
                                        return (
                                          <SelectItem value={_id} key={index}>
                                            {projectTitle}
                                          </SelectItem>
                                        );
                                      }
                                    )}
                                </SelectContent>
                              </Select>
                              {errMsg.project && (
                                <small className="text-red-500">
                                  {errMsg.project}
                                </small>
                              )}
                            </div>
                          )}
                        />
                        <Controller
                          name="talentType"
                          control={control}
                          rules={{ required: false }}
                          render={({ field }) => (
                            <div className="w-full pb-2">
                              <Select
                                onValueChange={(e) => setTalent(e)}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="w-full bg-white">
                                  <SelectValue placeholder="Select Talent Type" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                  <SelectItem value="supervisor">
                                    Supervisor
                                  </SelectItem>
                                  <SelectItem value="usher">Usher</SelectItem>
                                </SelectContent>
                              </Select>
                              {errMsg.talentType && (
                                <small className="text-red-500">
                                  {errMsg.talentType}
                                </small>
                              )}
                            </div>
                          )}
                        />
                        <DropdownMenuSeparator className="bg-bm__beige mb-3" />
                        <p className="text-[12px] md:text-[15px]">
                          Click continue to fill out the rest of the profile
                        </p>
                        <DropdownMenuSeparator className="bg-bm__beige mb-3" />
                        <div className="flex justify-between gap-8">
                          <Button className="light__btn" onClick={newProject}>
                            Continue
                          </Button>

                          <Button
                            className="dark__btn"
                            onClick={handleSubmit(onSubmit)}
                          >
                            Create Talent
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Dialog
                      open={successModal}
                      onOpenChange={() => setSuccessModal(false)}
                    >
                      <DialogContent className="bg-bm_card_grey flex flex-col items-center justify-center max-w-[360px] py-16">
                        <TbProgressCheck className="font-normal text-[155px] text-green-700" />
                        <div className="">Talent Created Successfully</div>
                        <p>
                          A link has been sent to the Talent email address
                          provided to complete his/her registration.
                        </p>
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
                            After successful import, a link will be sent to each
                            email addresses provided to complete their
                            registration.
                          </p>
                          <p>
                            {" "}
                            You can download the CSV file template to fill out
                            the talent form.
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
                      </DialogContent>
                    </Dialog>
                    <Dialog
                      open={preview}
                      onOpenChange={() => setPreview(!preview)}
                    >
                      <DialogContent className="w-full min-w-[80vw] p-2 md:p-6 shadow-md bg-white">
                        <PreviewBoard />
                      </DialogContent>
                    </Dialog>
                  </div>
                  <TalentList
                    talentCount={talentCount}
                    onTalentTypeChnage={onTalentTypeChnage}
                    setActiveTalentClick={setActiveTalentClick}
                    activeTalentClick={activeTalentClick}
                  />
                  <Card>
                    <CardContent className="py-3 md:py-6 space-y-3 overflow-y-scroll h-[30vh]">
                      <div className="flex flex-col">
                        <p className="text-[14px] font-semibold mb-2">Gender</p>
                        <Separator className="bg-bm__beige" />
                        {/* <RadioGroup value={selectedGender} onChange={handleGenderChange}></RadioGroup> */}
                        <RadioGroup
                          defaultValue=""
                          className="mt-2"
                          onValueChange={handleGenderChange}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label
                              htmlFor="male"
                              className="text-[14px] font-normal"
                            >
                              Male
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
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
                        <p className="text-[14px] font-semibold mb-2">
                          {" "}
                          Talent Type
                        </p>
                        <Separator className="bg-bm__beige" />
                        <RadioGroup
                          defaultValue=""
                          className="mt-2"
                          onValueChange={handleRoleChange}
                        >
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
                            <Label
                              htmlFor="ba"
                              className="text-[14px] font-normal"
                            >
                              Brand Ambassador
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="supervisor"
                              id="supervisor"
                            />
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
                      <div className="">
                        <p className="text-[14px] font-semibold mb-2">Age</p>
                        <Separator className="bg-bm__beige mb-2" />
                        <div className="flex gap-1 items-center justify-around">
                          <Input
                            className="max-w-[80px]"
                            value={ageRange.start}
                            onChange={handleStartAgeChange}
                          />
                          to
                          <Input
                            className="max-w-[80px]"
                            value={ageRange.end}
                            onChange={handleEndAgeChange}
                          />
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
                            onChange={handleLocationChange}
                          />
                        </div>
                      </div>
                      <button className="dark__btn p-2 " onClick={handleClear}>
                        Clear Filter
                      </button>
                    </CardContent>
                  </Card>
                </CardContent>
                <TalentDetailsInfo
                  activeType={activeType || "All Talent"}
                  handleProfilePopUp={handleProfilePopUp}
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
