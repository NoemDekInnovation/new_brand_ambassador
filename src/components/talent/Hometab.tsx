import React from "react";
import { CurrentProject } from "./components/CurrentProject";
import AvailableProjects from "./components/AvailableProjects";
import { MyApplication } from "./components/MyApplication";
import { AgencyCard } from "./components/AgencyCard";

const Hometab = () => {
  return (
    <div className="bg-bm_card_grey  h-full">
      <div className="px-4 md:px-12 xl:px-40 flex py-10 md:space-x-8 flex-col items-center space-y-8 md:flex-row md:space-y-0 md:items-start">
        <div className=" space-y-8 flex-1 flex flex-col items-center sm:block">
          <CurrentProject />
          <div className="sm:hidden w-full">
            <MyApplication card_title="My Applications" card_width="w-full" />
          </div>

          <AvailableProjects />
          <div className="sm:hidden w-full">
            <AgencyCard card_title="Agencies" card_width="w-full" />
          </div>
        </div>
        <div className="space-y-8 hidden sm:block">
          <MyApplication card_title="My Applications" />
          <div className="">
            <AgencyCard card_title="Agencies" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hometab;
