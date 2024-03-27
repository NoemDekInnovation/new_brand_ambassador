import React, { useState } from "react";
import { Card } from "../../../../ui/card";
import ProjectOverview from "./ProjectOverView";
import Applications from "./Applications";
import { MobileTab } from "./MobileTab";
import { RxHamburgerMenu } from "react-icons/rx";

const ProjectSlide = ({
  popUp,
  setPopUp,
}: {
  popUp: boolean;
  setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [activeTab, setActiveTab] = useState("project_overview");
  const [mobile, setMobile] = useState(false);

  let view;

  switch (activeTab) {
    case "project_overview":
      view = <ProjectOverview />;
      break;

    case "applications":
      view = <Applications />;
      break;

    default:
      break;
  }
  return (
    <>
      <div
        className={`fixed z-[1000] bg-black/30 w-[100%] items-center justify-end flex flex-col transition-all duration-1000 inset-0 px-2 md:px-20 ${
          popUp
            ? "translate-y-0 opacity-100 h-[100vh] -bottom-5"
            : "translate-y-[1000px] opacity-0"
        }`}
      >
        <Card className="rounded-b-none w-full bg-white mx-2 h-[90vh] md:mx-8  p-3 md:px-6">
          <div className="flex justify-between items-center">
            <div className="md:hidden">
              <RxHamburgerMenu
                onClick={() => {
                  setMobile(!mobile);
                }}
              />
            </div>
            <div className="flex justify-end gap-8 my-4 ml-auto">
              <button>Pop-out</button>
              <button onClick={() => setPopUp(false)}> X</button>
            </div>
          </div>
          <div className="  w-full  flex flex-col md:flex-row gap-4">
            <div className="hidden md:block">
              <MobileTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setMobile={setMobile}
                mobile={false}
              />
            </div>

            {view}
          </div>
        </Card>
      </div>
      <div
        className={`bg-white duration-1000 transition-all fixed z-[1000] bottom-0 left-0 ${
          mobile
            ? "translate-x-0 opacity-100 -bottom-5"
            : "translate-x-[-1000px] opacity-0"
        }`}
      >
        <MobileTab
          mobile={true}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setMobile={setMobile}
        />
      </div>
    </>
  );
};

export default ProjectSlide;
