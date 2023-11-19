import React from "react";
import { MainLayout } from "../Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import group from "../../assets/Group.jpg";
import Hometab from "./Hometab";

const TalentDashboard = () => {
  return (
    <MainLayout>
      {" "}
      <Tabs defaultValue="home" className="w-full">
        <div className="flex flex-col md:flex-row  justify-between w-full px-4 pb-4  md:px-12 xl:px-40 bg-white  shadow-xl drop-shadow-lg space-y-4 md:space-y-0">
          <TabsList className=" ">
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
              <div className="text-white bg-bm__ox__red px-2 rounded-sm">
                22
              </div>
              <p className="">Completed Projects</p>
            </div>
          </div>
        </div>
        <TabsContent value="home" className="w-full">
          <Hometab />
        </TabsContent>
        <TabsContent value="projects">Projects</TabsContent>
        <TabsContent value="reports">Reports</TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default TalentDashboard;
