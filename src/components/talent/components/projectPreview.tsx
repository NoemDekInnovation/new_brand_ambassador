import React, { ChangeEvent, useRef, useState } from "react";
import { Card, CardContent } from "../../../ui/card";
import { ImAttachment, ImCancelCircle } from "react-icons/im";
import { Separator } from "../../../ui/seperator";
import ItemCard from "./ItemCard";
import { Button } from "../../../ui/button";
import {
  DayObject,
  daysOfWeekx,
} from "../../agency/createproject/projectBudget";
import { GiPaperClip } from "react-icons/gi";
import { IoMdShare } from "react-icons/io";
import { Input } from "../../../ui/input";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { patchAxiosInstance } from "../../../api/axios";

const ProjectPreview = ({
  popUp,
  setPopUp,
  selectedProject,
  apply,
  close,
  setApply,
}: {
  setApply: any;
  close: any;
  apply: boolean;
  popUp: boolean;
  setPopUp: any;
  selectedProject: any;
}) => {
  const startDate = new Date(selectedProject?.projectDuration?.startDate);
  const endDate = new Date(selectedProject?.projectDuration?.endDate);
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
  console.log("selected", selectedProject);

  const { user } = useSelector((state: RootState) => state.user);

  const [selectedFileName, setSelectedFileName] = useState("");
  const [documents, setDocuments] = useState<File[]>([]);
  const [letterContent, setLetterContent] = useState("");

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
    const formData = new FormData();

    formData.append("letter", letterContent);

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
      } catch (error) {
        console.error("Error submitting application", error);
      }
    }
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
            <h2>Project Name</h2>
            <h2>Project Category</h2>
            <h2>Project Code</h2>
            <h2>Closes: Nov 28, 2023</h2>
          </div>
          <div className="flex gap-2">
            {!apply && (
              <>
                <button
                  className="dark__btn max-w-fit text-[12px] "
                  onClick={setApply}
                >
                  Apply
                </button>
                <button className="outlined__red__btn max-w-fit text-[12px] ">
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

            {apply && (
              <button className="dark__btn max-w-fit text-[12px] ">
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
                  {daysOfWeekx.map(({ label, value }: DayObject, index) => (
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
              <ItemCard title={"Application Letter"} red={true}>
                <p>Tell the Agency why you should be contracted</p>

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
              <div className="flex w-full justify-between mb-8">
                <button className="light__btn max-w-fit text-[12px] ">
                  Cancel Application
                </button>
                <button
                  className="dark__btn max-w-fit text-[12px] "
                  onClick={handleSubmit}
                >
                  Send Application
                </button>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProjectPreview;
