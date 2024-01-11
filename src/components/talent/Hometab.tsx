import React, { useEffect } from "react";
import { CurrentProject } from "./components/CurrentProject";
import AvailableProjects from "./components/AvailableProjects";
import { MyApplication } from "./components/MyApplication";
import { AgencyCard } from "./components/AgencyCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchAllProjects } from "../../redux/talent/allProjects.slice";

const Hometab = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { pageQuery } = useSelector((state: RootState) => state.talent);

  useEffect(() => {
    dispatch(fetchAllProjects(pageQuery));
  }, [dispatch, pageQuery]);

  return (
    <div className="bg-bm_card_grey  h-full overflow-y-scroll">
      <div className="pr-4 md:pr-12 xl:pr-40 flex pt-10 md:space-x-8 flex-col items-center space-y-8 md:flex-row md:space-y-0 md:items-start">
        <div className=" space-y-8 flex-1 flex flex-col items-center sm:block">
          <CurrentProject />
          <div className="sm:hidden w-full">
            <MyApplication card_title="My Applications" card_width="w-full" />
          </div>

          <AvailableProjects screen="home" />
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
