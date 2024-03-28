import ChevBackground from "../../../ui/chevbackground";
import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import React, { useEffect, useState } from "react";
import { Label } from "../../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchdraftproject } from "../../../redux/draftProject.slice";
import { fetchcompleteproject } from "../../../redux/completeProject";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";

export default function GetStarted({
  next,
  cancel,
  projectName,
  setProjectName,
  setReusableProject,
}: {
  next: () => void;
  cancel: () => void;
  projectName: any;
  setProjectName: any;
  setReusableProject: any;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const { draftProject } = useSelector(
    (state: RootState) => state.draftProject
  );

  const { completeProject } = useSelector(
    (state: RootState) => state.completeProject
  );

  const [projectSource, setProjectSource] = useState("new");
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [projectsDropdown, setProjectsDropdown] = useState<
    { label: string; value: string; id: string }[]
  >([]);

  const [existingProjectsDropdown, setExistingProjectsDropdown] = useState<
    { label: string; value: string; id: string }[]
  >([]);

  // const [gender, setSelectedProject] = useState("");

  // console.log(draftProject);

  useEffect(() => {
    if (user?.accountId) {
      dispatch(fetchdraftproject());
      dispatch(fetchcompleteproject(null));
    }
  }, [dispatch, user]);

  useEffect(() => {
    setProjectsDropdown(
      completeProject.map((project) => ({
        id: project._id,
        label: project.projectTitle,
        value: project.projectCode,
      }))
    );

    setExistingProjectsDropdown(
      draftProject.map((project) => ({
        id: project._id,
        label: project.projectTitle,
        value: project.projectCode,
      }))
    );
  }, []);

  if (!Array.isArray(draftProject)) {
    return <div>Loading...</div>;
  }

  // const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedProject(event.target.value);
  // };

  // const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   // Capitalize the selected value before updating the state
  //   const capitalizedValue =
  //     e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
  //   setSelectedProject(capitalizedValue);
  // };

  const handleProjectChange = (e: any) => {
    const project = draftProject.filter((p) => p?._id === e);
    setReusableProject(project[0]);
    setSelectedProject(e);
  };

  const handleProjectChangeX = (e: any) => {
    const project = completeProject.filter((p) => p?._id === e);
    setReusableProject(project[0]);
    setSelectedProject(e);
  };

  const handleSourceChange = (source: any) => {
    setProjectSource(source);
    if (source === "new") {
      setReusableProject(null);
    }
  };

  return (
    <div className="px-4 pb-4  md:px-12 xl:px-40">
      <Card className="p-4 md:p-8 mt-5 bg-white">
        <ChevBackground text="Getting Started" stage="1" />
        <Card className="w-full py-6 my-7">
          <CardContent>
            <p className="text-[12px] font-light">
              Getting started, select any of the options below
            </p>
            <Separator className="my-3 md:my-8 bg-bm__beige" />
            <form action="">
              <RadioGroup
                defaultValue="new"
                className="space-y-10"
                // value={selectedProject?._id}
                onValueChange={handleSourceChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="neW" id="option-one" />
                  <Label htmlFor="new">Create a new project</Label>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="existing" id="option-two" />
                    <Label htmlFor="existing">Edit an existing draft</Label>
                  </div>
                  <div className="relative md:col-span-2 z-0 w-full mb-6 group">
                    <div className="w-full ">
                      <Select
                        onValueChange={handleProjectChange}
                        defaultValue={selectedProject}
                      >
                        <SelectTrigger className="w-full bg-white  h-[46px]">
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent className="bg-white overflow-y-scroll h-[40vh]">
                          {existingProjectsDropdown !== undefined &&
                            existingProjectsDropdown.map(
                              (
                                // { projectTitle, _id }: { projectTitle: any; _id: string },
                                project: any,
                                index: number
                              ) => {
                                return (
                                  <SelectItem
                                    value={project.id}
                                    key={index}
                                    className="capitalize"
                                  >
                                    {project.label.charAt(0).toUpperCase() +
                                      project.label.slice(1)}
                                  </SelectItem>
                                );
                              }
                            )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reuse" id="reuse" />
                    <Label htmlFor="reuse">
                      {" "}
                      Reuse a previous project post
                    </Label>
                  </div>
                  <div className="relative md:col-span-2 z-0 w-full mb-6 group">
                    {/* <input
                      type="text"
                      name="floating_first_name"
                      id="floating_first_name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    /> */}
                    <div className="w-full ">
                      <Select
                        onValueChange={handleProjectChangeX}
                        defaultValue={selectedProject}
                      >
                        <SelectTrigger className="w-full bg-white  h-[46px]">
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent className="bg-white overflow-y-scroll h-[40vh]">
                          {projectsDropdown !== undefined &&
                            projectsDropdown.map(
                              (
                                // { projectTitle, _id }: { projectTitle: any; _id: string },
                                project: any,
                                index: number
                              ) => {
                                return (
                                  <SelectItem
                                    value={project.id}
                                    key={index}
                                    className="capitalize"
                                  >
                                    {project.label.charAt(0).toUpperCase() +
                                      project.label.slice(1)}
                                  </SelectItem>
                                );
                              }
                            )}
                        </SelectContent>
                      </Select>
                    </div>
                    {/* <label
                      htmlFor="floating_first_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Select Project
                    </label> */}
                  </div>
                </div>
              </RadioGroup>
            </form>
          </CardContent>
        </Card>
        <div className="flex justify-between">
          <div className="flex whitespace-nowrap gap-4 md:gap-8">
            <Button className="light__btn max-w-[100px]" onClick={cancel}>
              Cancel
            </Button>
          </div>
          <div className="flex whitespace-nowrap gap-4 md:gap-8">
            <Button className="dark__btn" onClick={next}>
              Save and Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
