import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "../../ui/card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchpublishproject } from "../../redux/publishProject";
import { ProjectViewCard } from "../projectPreview";
// import { fetchPublishProject } from "../../redux/createproject/activeProject.slice";

const PublishedProject = ({ searchQuery }: { searchQuery: string }) => {
  const { user } = useSelector((state: RootState) => state.user);
  // console.log(user);
  const { publishProject, totalProjects } = useSelector(
    (state: RootState) => state.publishProject
  );

  const { pageQuery } = useSelector((state: RootState) => state.talent);

  const dispatch = useDispatch<AppDispatch>();
  const [popUp, setPopUp] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [id, setId] = useState<string>();

  const handleProfilePopUp = (project: any) => {
    setPopUp(!popUp);
    setSelectedProject(project);
  };

  useEffect(() => {
    dispatch(fetchpublishproject(pageQuery));
  }, [dispatch, pageQuery]);

  if (!Array.isArray(publishProject)) {
    return <div>Loading...</div>;
  }
  const formatWorkingDays = (workingDays?: string[]) => {
    return workingDays?.join(", ") || "";
  };

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const filteredProjects = publishProject?.filter((project: any) => {
    // Check if project and project.name are defined before calling toLowerCase()
    return (
      project?.projectTitle &&
      project?.projectTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const projects = filteredProjects?.map((project, idx) => {
    const formattedLocation = Array.isArray(project?.projectLocation)
      ? project.projectLocation.join(", ")
      : "";

    return (
      <>
        <Card
          className="p-4 relative hover:bg-black/10 cursor-pointer"
          key={idx}
          onClick={() => handleProfilePopUp(project)}
        >
          <span className="absolute top-0 right-0 text-sm text-[#800000] pr-2 pt-2">
            Closes on{" "}
            {new Date(project.projectDuration?.endDate).toLocaleDateString(
              "en-US",
              options
            )}
          </span>
          <CardContent className="p-0 space-y-1 mt-3">
            <h3 className="font-medium text-[15px] capitalize">
              {project?.projectTitle}
            </h3>
            <p className="font-normal text-[15px] capitalize">
              {project?.projectDescription}
            </p>
            <div className="flex md:space-x-2 text-[#800000] text-[10px] font-medium items-center flex-wrap">
              <div className="text-[10px] font-medium capitalize">
                Project Code: {project?.projectCode}
              </div>
              <div className="text-[15px] p-0 px-2">|</div>
              <div className="text-[10px] font-medium flex gap-1 ">
                {project?.totalBAs}
                {"  "}
                <span className="hidden md:flex">
                  Brand Ambassador Applications
                </span>
                <span className="md:hidden flex">Ba</span>
              </div>
              <div className="text-[16px] p-0 px-2">|</div>
              <div className="text-[10px] font-medium flex gap-1 ">
                {project?.totalSupervisors}
                {"  "}
                <span className="hidden md:flex">Supervisor Applications</span>
                <span className="md:hidden flex">Supervisor</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="mt-3 p-0 md:gap-6 flex-col sm:flex-row  sm:items-end items-start">
            <div className="flex md:space-x-2 text-bm__grey__text text-[10px] h-full flex-wrap  ">
              <div className=" font-normal text-[8px] capitalize">
                {formatWorkingDays(project?.workingDays)} {"  "}
              </div>
              <div className="text-[10px] pb-1 font-black">.</div>

              <div
                className="font-normal text-[8px] capitalize
            "
              >
                {new Date(
                  project.projectDuration?.startDate
                ).toLocaleDateString("en-US", options)}{" "}
                {" - "}
                {new Date(project.projectDuration?.endDate).toLocaleDateString(
                  "en-US",
                  options
                )}
              </div>
              <div className="text-[10px] pb-1 font-black">.</div>
              <div className="font-normal text-[8px] capitalize">
                {formattedLocation}
              </div>
            </div>
            <button className="ox__btn max-w-fit text-[12px] mt-2 bg-[#93979D]">
              View Report
            </button>
          </CardFooter>
        </Card>
      </>
    );
  });

  function next(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      {projects}

      <ProjectViewCard
        popUp={popUp}
        setPopUp={() => setPopUp(!popUp)}
        selectedProject={selectedProject}
        id={id}
        setId={setId}
      />
    </>
  );
};

export default PublishedProject;
