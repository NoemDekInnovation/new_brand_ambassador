import React from "react";
import { MainLayout } from "../Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import group from "../../assets/Group.jpg";
import Hometab from "./Hometab";
import Footer from "../Footer";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const TalentDashboard = () => {
        const { completeProject } = useSelector(
          (state: RootState) => state.completeProject
        );
  return (
    <MainLayout>
      {" "}
      <Tabs defaultValue="home" className="w-full">
        <div className="flex flex-col md:flex-row  justify-between w-full px-4   md:px-12 xl:px-40 bg-white  shadow-xl drop-shadow-lg space-y-4 md:space-y-0">
          <TabsList className="">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
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
        <div className="flex overflow-hidden overflow-y-hidden h-[82vh] mb-2 xl:pl-40 md:pl-12 pl-4">
          <TabsContent value="home" className="w-full">
            <Hometab />
          </TabsContent>
          <TabsContent value="projects">Projects</TabsContent>
          <TabsContent value="reports">Reports</TabsContent>
        </div>
      </Tabs>
    </MainLayout>
  );
};

export default TalentDashboard;
