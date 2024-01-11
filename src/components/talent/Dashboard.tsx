import React, { useState } from "react";
import { MainLayout } from "../Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import group from "../../assets/Group.jpg";
import Hometab from "./Hometab";
import ProjectTab from "./ProjectTab";
import Footer from "../Footer";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const TalentDashboard = () => {
  const { completeProject } = useSelector(
    (state: RootState) => state.completeProject
  );

  const [defaultTab, setDefaultTab] = useState(() => {
    const storedDefaultTab = localStorage.getItem("defaultTab");
    if (storedDefaultTab) {
      return storedDefaultTab;
    }
    return "home";
  });

  return (
    <MainLayout>
      {" "}
      <Tabs defaultValue={defaultTab} className="w-full">
        <div className="flex flex-col md:flex-row  justify-between w-full px-4   md:px-12 xl:px-40 bg-white  shadow-xl drop-shadow-lg space-y-4 md:space-y-0">
          <TabsList className="" defaultValue={"projects"}>
            <TabsTrigger
              value="home"
              className="hover:underline data-[state=active]:text-[#800000] data-[state=active]:font-semibold data-[state=active]:text-[15px]"
            >
              Home
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="hover:underline data-[state=active]:text-[#800000] data-[state=active]:font-semibold data-[state=active]:text-[15px]"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="hover:underline data-[state=active]:text-[#800000] data-[state=active]:font-semibold data-[state=active]:text-[15px]"
            >
              Reports
            </TabsTrigger>
          </TabsList>
          <div className="flex">
            <div className="flex items-center gap-2 mr-6">
              <img src={group} alt="" width={15} height={15} />
              <p className="">4.5</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-white bg-black px-2 rounded-sm">
                {completeProject.length || 0}
              </div>
              <p className="">Completed Projects</p>
            </div>
          </div>
        </div>
        <div className="flex overflow-hidden overflow-y-hidden h-[85.5vh]  xl:pl-40 md:pl-12 pl-4">
          <TabsContent value="home" className="w-full">
            <Hometab />
          </TabsContent>
          <TabsContent value="projects" className="w-full">
            <ProjectTab />
          </TabsContent>
          <TabsContent value="reports">Reports</TabsContent>
        </div>
      </Tabs>
    </MainLayout>
  );
};

export default TalentDashboard;
