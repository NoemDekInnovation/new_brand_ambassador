import React from "react";
import { MainLayout } from "../Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import group from "../../assets/Group.jpg";
import Hometab from "./Hometab";
import Footer from "../Footer";

const TalentDashboard = () => {
  return (
    <MainLayout>
      {" "}
      <Tabs defaultValue="home" className="w-full">
        <div className="flex flex-col md:flex-row  justify-between w-full pr-4 pb-4  md:pr-12 xl:pr-40 bg-white  shadow-xl drop-shadow-lg space-y-4 md:space-y-0">
          <TabsList className=" pl-4  md:pl-12 xl:pl-40">
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
        <div className="flex overflow-hidden overflow-y-hidden h-[80vh]">
          <Footer />
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
