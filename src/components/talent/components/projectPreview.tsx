import React, { ChangeEvent, useRef, useState } from "react";
import { Card, CardContent } from "../../../ui/card";
import { ImAttachment, ImCancelCircle } from "react-icons/im";
import { Separator } from "../../../ui/seperator";
import ItemCard from "./ItemCard";
import { Button } from "../../../ui/button";
import {
  DayObject,
  daysOfWeek,
} from "../../agency/createproject/projectBudget";
import { GiPaperClip } from "react-icons/gi";
import { IoMdShare } from "react-icons/io";
import { Input } from "../../../ui/input";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  campaignAuthAxiosInstance,
  patchAxiosInstance,
} from "../../../api/axios";
import { toast } from "../../../ui/use-toast";
import SelectOption from "../../../libs/select";

const talentOptions: any = [
  { value: "supervisor", label: "Supervisor" },
  { value: "ba", label: "Brand Ambassador" },
  { value: "usher", label: "Usher" },
];

const ProjectPreview = ({
  popUp,
  setPopUp,
  selectedProject,
  apply,
  close,
  setApply,
  applied,
}: {
  applied?: boolean;
  setApply: any;
  close: any;
  apply: boolean;
  popUp: boolean;
  setPopUp: any;
  selectedProject: any;
}) => {
  const startDate = new Date(
    selectedProject?.project?.projectDuration?.startDate
  );
  const endDate = new Date(selectedProject?.project?.projectDuration?.endDate);
  const formattedStartDate = startDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedEndDate = endDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const { user } = useSelector((state: RootState) => state.user);

  const [selectedFileName, setSelectedFileName] = useState("");
  const [documents, setDocuments] = useState<File[]>([]);
  const [letterContent, setLetterContent] = useState("");
  const [talentType, setTalentType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setLetterContent(event.target.value);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    const selectedFiles = fileInput.files;

    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      setDocuments((prevDocuments) => [...prevDocuments, ...filesArray]);
    }
    fileInput.value = "";
  };

  const handleDivClick = () => {
    // Trigger a click event on the hidden input
    fileInputRef?.current?.click();
  };

  const handleSubmit = async () => {
    setLoading(true);

    const formData = new FormData();

    formData.append("letter", letterContent);
    formData.append("opportunities", talentType);

    documents.forEach((file, index) => {
      formData.append("document", file);
    });

    if (user?.accountId !== undefined) {
      try {
        const response = await patchAxiosInstance.post(
          `/project-application/${selectedProject.project._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.authKey || ""}`,
            },
          }
        );
        console.log(response.data);
        setTimeout(() => {
          toast({
            description: "Your Application was sent successfully",
          });
        }, 2000);

        return setTimeout(() => {
          setPopUp(false);
        }, 3000);
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.error("Error submitting application", error);
      }
    }
  };

  const handleReject = async () => {
    setLoading(true);

    if (user?.accountId !== undefined) {
      try {
        const response = await campaignAuthAxiosInstance.get(
          `/reject-invite/${selectedProject.project._id}`,

          {
            headers: {
              Authorization: `Bearer ${user.authKey || ""}`,
            },
          }
        );

        return setTimeout(() => {
          setPopUp(false);
        }, 3000);
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.error("Error submitting application", error);
      }
    }
  };

  const handleRoleChange = (role: any) => {
    setTalentType(role);
  };
  return (
    <div
      className={`fixed z-[1000] bg-black/50  w-[100%] items-center justify-end flex flex-col transition-all duration-1000 inset-0 ${
        popUp
          ? "translate-y-0 opacity-100 h-[100vh] -bottom-5"
          : "translate-y-[1000px] opacity-0 "
      }`}
    >
      <Card className="p-4 relative bg-white w-[90VW] h-[95vh] overflow-hidden md:p-10">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <h2 className="capitalize font-bold text-[16px]">
              {selectedProject?.project?.projectTitle}
            </h2>
            <div className="h-6 w-[1px] bg-black"></div>
            <h2 className="capitalize font-semibold text-[14px]">
              {selectedProject?.project?.projectCategory}
            </h2>
            <div className="h-6 w-[1px] bg-black"></div>
            <h2 className="capitalize font-semibold text-[14px]">
              {" "}
              {selectedProject?.project?.projectCode}
            </h2>
            <div className="h-6 w-[1px] bg-black font-semibold "></div>
            <h2 className="font-semibold text-[14px]">
              Closes: {formattedEndDate}
            </h2>
          </div>
          <div className="flex gap-2">
            {!apply && !applied && (
              <>
                <button
                  className="dark__btn max-w-fit text-[12px] "
                  onClick={setApply}
                >
                  Apply
                </button>
                <button
                  onClick={handleReject}
                  className="outlined__red__btn max-w-fit text-[12px] "
                >
                  Reject
                </button>
                <button className="light__btn max-w-fit text-[12px] flex items-center gap-2">
                  <span>
                    <IoMdShare />
                  </span>
                  Share{" "}
                </button>
              </>
            )}

            {apply && !applied && (
              <button
                className="dark__btn max-w-fit text-[12px] "
                onClick={handleSubmit}
              >
                {loading && (
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
                Send Application
              </button>
            )}
            <span className=" text-sm text-[#6F797A]">
              <ImCancelCircle
                className="w-[20px] h-[20px] cursor-pointer ml-2 md:ml-6"
                onClick={() => {
                  close();
                  setPopUp();
                }}
              />
            </span>
          </div>
        </div>
        <Separator className="bg-bm__beige my-2 mb-10 " />
        <div className="flex flex-col overflow-y-scroll h-full pb-10">
          <ItemCard title={"Description"}>
            <h2>In-Store</h2>
            <Separator className="bg-bm__beige my-4" />

            <p>{selectedProject?.project?.projectDescription || "-"}</p>
          </ItemCard>
          <ItemCard title={"Talent Type and Budget"}>
            <CardContent>
              {selectedProject?.project?.talent.map(
                (talent: any, idx: number) => {
                  return (
                    <div className="capitalize" key={idx}>
                      <h2>{talent?.opportunities}</h2>

                      <div className="pt-4">
                        <p className=" capitalize text-[16px] font-normal">
                          {/* <p>BSc.</p> */}
                          {talent?.qualifications || "-"}
                        </p>
                        <Separator className="bg-bm__beige my-3" />
                      </div>
                      <div className="pt-2">
                        <p>Skills</p>
                        <div className="py-3 flex gap-6 max-w-3xl flex-wrap">
                          {talent?.skills.map((skill: string, idx: number) => {
                            return (
                              <div className="" key={idx}>
                                <Button className="light__btn max-w-fit capitalize">
                                  {skill}
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                        <Separator className="bg-bm__beige my-2" />
                      </div>
                      <div className="pt-2">
                        <p>Budget</p>
                        <div className="flex justify-between items-center">
                          {(talent?.salary && (
                            <div className="pt-2 flex gap-6 max-w-3xl capitalize">
                              {talent?.salary} {talent?.paymentOptions}
                            </div>
                          )) ||
                            "-"}{" "}
                        </div>
                      </div>
                      <Separator className="bg-bm__beige my-4 py-[2px]" />
                    </div>
                  );
                }
              )}
              {/* <Separator className="bg-bm__beige my-4 py-[2px]" /> */}
            </CardContent>
          </ItemCard>
          <ItemCard title={"Duration and Location"}>
            <CardContent>
              <div className="flex justify-between items-center">
                <h2 className="text-[18px] font-medium capitalize">
                  {formattedStartDate} to {formattedEndDate}
                </h2>
              </div>

              <Separator className="bg-bm__beige my-4" />
              <div className="py-3">
                <p>Working Days</p>
                <div className="pt-2 flex gap-4 max-w-3xl mt-2 mb-4 cursor-pointer flex-wrap">
                  {daysOfWeek.map(({ label, value }: DayObject, index) => (
                    <div
                      key={index}
                      className={` rounded-md p-2 px-3 mb-4 capitalize font-semibold 
                        ${
                          selectedProject?.project?.workingDays.includes(value)
                            ? "bg-[#252525] text-white"
                            : "bg-bm_card_grey"
                        }`}
                    >
                      {label}
                    </div>
                  ))}
                </div>
                <Separator className="bg-bm__beige my-2" />
              </div>
              <div className="pt-2">
                <p className="mb-2">Location</p>
                <div className="py-2 flex gap-6 max-w-3xl flex-wrap">
                  {selectedProject?.project?.projectLocation.lenght === 0 &&
                    "-"}
                  {selectedProject?.project?.projectLocation.map(
                    (_: any, idx: number) => {
                      return (
                        <Button
                          className="light__btn  max-w-fit capitalize"
                          key={idx}
                        >
                          {_}
                        </Button>
                      );
                    }
                  )}{" "}
                </div>
                {/* <Separator className="bg-bm__beige my-2" /> */}
              </div>
            </CardContent>
          </ItemCard>
          <ItemCard title={"Requirements"}>
            <p>{selectedProject?.project?.projectRequirements || "-"}</p>

            <Separator className="bg-bm__beige my-4" />

            {selectedProject?.project?.document.map((_: any, idx: number) => {
              return (
                <a
                  key={idx}
                  className="capitalize border p-2 rounded-lg w-fit border-bm_black flex items-center text-[12px]"
                  href={_}
                >
                  <span>
                    <GiPaperClip className="mr-2 text-[18px]" />
                  </span>
                  {_}
                </a>
              );
            })}
          </ItemCard>

          {apply && (
            <>
              <ItemCard title={"Application"} red={true}>
                <div className="flex items-center gap-2">
                  {" "}
                  <p className="whitespace-nowrap">Talent Type {"   "}:</p>{" "}
                  <SelectOption
                    className="block max-w-[280px] px-0 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white peer"
                    placeholder="Select Talent "
                    id="projectTalent"
                    name="projectTalent"
                    onChange={(e: any) => handleRoleChange(e.value)}
                    required
                    options={talentOptions}
                    defaultValue={talentType}
                    isDisabled={false}
                  />
                </div>
                <Separator className="bg-bm__beige my-4" />

                <p>Use the input field to fill out the project requirement.</p>

                <Separator className="bg-bm__beige my-4" />
                <textarea
                  name=""
                  id=""
                  className="w-full border border-bm__beige min-h-[200px]  text-[14px] p-2 "
                  placeholder="Write your application letter ..."
                  value={letterContent}
                  onChange={handleTextareaChange}
                />
                <small>250 {"  "} Characters</small>
              </ItemCard>{" "}
              <ItemCard title={"Attachments"} red={true}>
                <p>Add as many attachments as required by the project</p>
                <Separator className="bg-bm__beige my-4" />
                {/* <Button
                  className="w-full mt-4  border p-8 rounded-lg  border-bm_black"
                  onClick={handleDivClick}
                >
                  <div className="flex items-center gap-1">
                    <ImAttachment className="text-[16px]" />
                    Attach file
                  </div>
                </Button> */}
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <Button
                  className="w-full mt-4  border p-8 rounded-lg  border-bm_black"
                  onClick={handleDivClick}
                >
                  <div className="flex items-center gap-1">
                    <ImAttachment className="text-[16px]" />
                    Attach file
                  </div>
                </Button>
                {documents.length > 0 && (
                  <div>
                    <ul>
                      {documents.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* {selectedProject?.project?.document.map(
                  (_: any, idx: number) => {
                    return (
                      <a
                        key={idx}
                        className="capitalize border p-2 rounded-lg w-fit border-bm_black flex items-center text-[12px]"
                        href={_}
                      >
                        <span>
                          <GiPaperClip className="mr-2 text-[18px]" />
                        </span>
                        {_}
                      </a>
                    );
                  }
                )} */}

                <Input
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  name="document"
                  required
                />
                {selectedFileName && <p>{selectedFileName}</p>}
              </ItemCard>
              {!applied && (
                <div className="flex w-full justify-between mb-8">
                  <button
                    className="light__btn max-w-fit text-[12px] "
                    onClick={() => {
                      close();
                      setPopUp();
                    }}
                  >
                    Cancel Application
                  </button>
                  <button
                    className="dark__btn max-w-fit text-[12px] "
                    onClick={handleSubmit}
                  >
                    {loading && (
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
                    Send Application
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProjectPreview;
