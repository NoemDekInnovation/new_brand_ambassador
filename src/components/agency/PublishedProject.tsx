import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "../../ui/card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchpublishproject } from "../../redux/publishProject";
import { Dialog } from "../../ui/dialog";
import PreviewPublished from "./publishedpreview/PreviewPublished";
import AboutProject from "./createproject/aboutProject";
import aboutProject from "./createproject/aboutProject";
// import { fetchPublishProject } from "../../redux/createproject/activeProject.slice";

const PublishedProject = () => {
  const { user } = useSelector((state: RootState) => state.user);
  // console.log(user);
  const { publishProject } = useSelector(
    (state: RootState) => state.publishProject
  );
  const dispatch = useDispatch<AppDispatch>();
  const [popUp, setPopUp] = useState(false);

  const handleProfilePopUp = (talent: any) => {
    setPopUp(!popUp);
    // console.log("worked", popUp);
    // setSelectedRole(talent);
  };

  const [isDialogVisible, setDialogVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCardClick = (publishProject: any) => {
    setSelectedProject(publishProject);
    setDialogVisible(true);
  };

  const handleDialogClose = () => {
    setSelectedProject(null);
    setDialogVisible(false);
  };

  useEffect(() => {
    dispatch(fetchpublishproject());
  }, [dispatch]);

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

  const talents = publishProject?.map((project, idx) => {
    const formattedLocation = Array.isArray(project?.projectLocation)
      ? project.projectLocation.join(", ")
      : "";

    return (
      <>
        <Card
          className="p-4 relative hover:bg-black/10 cursor-pointer"
          key={idx}
          onClick={handleProfilePopUp}
        >
          <span className="absolute top-0 right-0 text-sm text-[#800000] pr-2 pt-2">
            Closes on{" "}
            {new Date(project.projectDuration?.endDate).toLocaleDateString(
              "en-US",
              options
            )}
          </span>
          <CardContent className="p-0 space-y-1">
            <h3 className="font-medium text-[15px] capitalize">
              {/* Project Name {"  "}(in-store){" "} */}
              {project?.projectTitle}
            </h3>
            <p className="font-normal text-[15px] capitalize">
              {/* This is the project description.. this is the project description */}
              {project?.projectDescription}
            </p>
            <div className="flex md:space-x-2 text-[#800000] text-[10px] font-medium items-center flex-wrap">
              <div className="text-[10px] font-medium capitalize">
                {/* Project Code: NIV23 */}
                Project Code: {project?.projectCode}
              </div>
              <div className="text-[15px] p-0 px-2">|</div>
              <div className="text-[10px] font-medium">
                0 Brands Ambassador Applications
                {}
              </div>
              <div className="text-[16px] p-0 px-2">|</div>
              {/* <br className="block md:hidden" /> */}

              <div className="text-[10px] font-medium">
                0 Supervisor Applications
              </div>
            </div>
          </CardContent>
          <CardFooter className="mt-3 p-0 md:gap-6 flex-col sm:flex-row  sm:items-end">
            <div className="flex md:space-x-2 text-bm__grey__text text-[10px] h-full flex-wrap  ">
              <div className=" font-normal text-[8px] capitalize">
                {/* Mon, Wed, Fri {"  "} */}
                {formatWorkingDays(project?.workingDays)} {"  "}
              </div>
              <div className="text-[10px] pb-1 font-black">.</div>

              <div
                className="font-normal text-[8px] capitalize
            "
              >
                {/* Nov 30 - December 30 */}
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
                {/* Lagos, Abuja, Ogun, Plateau */}
                {/* {project.projectLocation} */}
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
      {talents}
      <PreviewPublished popUp={popUp} setPopUp={() => setPopUp(!popUp)} />
    </>
  );
};

export default PublishedProject;
