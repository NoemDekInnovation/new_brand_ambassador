import React, { useState } from "react";
import { Card } from "../../../../../ui/card";
import ProjectSlide from "../../ProjectSlide";

const PublishedProject = ({ project }: { project: number }) => {
  const [popUp, setPopUp] = useState(false);

  return (
    <>
      <Card className="p-2 mb-3">
        <div className="flex flex-col justify-between mb-3 gap-1">
          <div className="flex justify-between flex-col-reverse md:flex-row gap-1">
            <p className="text-[18px] font-medium">
              Nivea Bold & Beautiful Launch
            </p>
            <p className="text-[12px] font-normal">Closed on 25/11/23</p>
          </div>

          <p className="text-[12] font-medium">in-Store | NIV23</p>
          <p className="text-[12px] font-normal text-[#515457]">
            This is the project description.. this is the project description..
            This is the project description.. this is the project description
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 justify-between">
          <div className="flex text-[12px] font-normal text-[#515457]">
            Nov 30 - Dec 30 . Lagos, Abuja, Ogun, Plateau
          </div>
          <div className="w-[170px]">
            <button className="dark___btn" onClick={() => setPopUp(true)}>
              Applications(270)
            </button>
          </div>
        </div>
      </Card>
      {project === 1 && <ProjectSlide popUp={popUp} setPopUp={setPopUp} />}{" "}
    </>
  );
};

export default PublishedProject;
