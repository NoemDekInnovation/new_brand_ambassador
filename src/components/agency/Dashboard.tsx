import { useState } from "react";
import { AgencyLayout } from "../Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import arrowIcon from "../../assets/teenyicons_down-solid.png";
import HomeTab from "./HomeTab";
import TalentTab from "./TalentTab";
import ProjectTab from "./ProjectTab";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "../../ui/menubar";

const Dashboard = () => {
  const [defaultTab, setDefaultTab] = useState("home");

  return (
    <AgencyLayout>
      <Tabs defaultValue={defaultTab} className="w-full">
        <div className="flex flex-col lg:flex-row  justify-between w-full px-4 md:px-12 xl:px-40 bg-white  shadow-xl drop-shadow-lg space-y-4 md:space-y-0  overflow-x-scroll md:overflow-x-hidden overflow-y-hidden">
          <TabsList className="mb-4">
            <TabsTrigger value="home" className="hover:underline">
              Home
            </TabsTrigger>
            <Menubar className="border-0">
              <MenubarMenu>
                <MenubarTrigger className="border-0">
                  <div className="flex items-center space-x-3 cursor-pointer hover:underline">
                    <p></p>Talent
                    {/* <TabsTrigger value="talent">Talent</TabsTrigger> */}
                    <img src={arrowIcon} alt="arrowicon" />
                  </div>
                </MenubarTrigger>
                <MenubarContent className="bg-white">
                  <MenubarItem>
                    <TabsTrigger
                      value="talent"
                      className="cursor-pointer hover:underline"
                    >
                      Current Contracts
                    </TabsTrigger>
                  </MenubarItem>
                  <MenubarSeparator className="bg-bm__beige" />
                  <MenubarItem>
                    <TabsTrigger
                      value="talent"
                      className="cursor-pointer hover:underline"
                    >
                      Favourites
                    </TabsTrigger>
                  </MenubarItem>
                  <MenubarSeparator className="bg-bm__beige" />
                  <MenubarItem>
                    <TabsTrigger
                      value="talent"
                      className="cursor-pointer hover:underline"
                    >
                      Engaged Talent
                    </TabsTrigger>
                  </MenubarItem>
                  <MenubarSeparator className="bg-bm__beige" />
                  <MenubarItem>
                    <TabsTrigger
                      value="talent"
                      className="cursor-pointer hover:underline"
                    >
                      My Talent
                    </TabsTrigger>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            <Menubar className="border-0">
              <MenubarMenu>
                <MenubarTrigger className="border-0">
                  <div className="flex items-center space-x-3 cursor-pointer hover:underline">
                    <p>Projects</p>
                    {/* <TabsTrigger value="talent">Talent</TabsTrigger> */}
                    <img src={arrowIcon} alt="arrowicon" />
                  </div>
                </MenubarTrigger>
                <MenubarContent className="bg-white">
                  <MenubarItem className="hover:underline">
                    <TabsTrigger value="projects">Active</TabsTrigger>
                  </MenubarItem>
                  <MenubarSeparator className="bg-bm__beige" />
                  <MenubarItem className="hover:underline">
                    <TabsTrigger value="projects">Published</TabsTrigger>
                  </MenubarItem>
                  <MenubarSeparator className="bg-bm__beige" />
                  <MenubarItem className="hover:underline">
                    <TabsTrigger value="projects">Completed</TabsTrigger>
                  </MenubarItem>
                  <MenubarSeparator className="bg-bm__beige" />
                  <MenubarItem className="hover:underline">
                    <TabsTrigger value="projects">Drafts</TabsTrigger>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>

            {/* <TabsTrigger value="projects">Projects</TabsTrigger>
            <img src={arrowIcon} alt="arrowicon" /> */}
            <TabsTrigger value="inventory" className="hover:underline">
              Inventory
            </TabsTrigger>
            <img src={arrowIcon} alt="arrowicon" />
            <TabsTrigger value="outlets" className="hover:underline">
              Outlets
            </TabsTrigger>
            <img src={arrowIcon} alt="arrowicon" />
            <TabsTrigger value="reports" className="hover:underline">
              Reports
            </TabsTrigger>
            <img src={arrowIcon} alt="arrowicon" />
            <TabsTrigger value="users" className="hover:underline">
              Users
            </TabsTrigger>
            <img src={arrowIcon} alt="arrowicon" />
          </TabsList>
          <div className="flex">
            <div className="flex items-center gap-2 mr-6">
              <div className="text-white bg-bm__niv px-2 rounded-sm">5</div>
              <p className="font-medium text-xs leading-[18px]">
                Active Projects
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-white bg-bm__ox__red px-2 rounded-sm">
                22
              </div>
              <p className="font-medium text-xs leading-[18px]">
                Completed Projects
              </p>
            </div>
          </div>
        </div>
        <div className="flex overflow-hidden overflow-y-hidden h-[82vh] mb-2 ">
          <TabsContent value="home" className="w-full">
            <HomeTab />
          </TabsContent>
          <TabsContent className="w-full" value="talent">
            <TalentTab />
          </TabsContent>
          <TabsContent className="w-full" value="projects">
            <ProjectTab setDefault={setDefaultTab} />
          </TabsContent>
          <TabsContent className="w-full" value="inventory">
            Inventory
          </TabsContent>
          <TabsContent className="w-full" value="outlets">
            Outlets
          </TabsContent>
          <TabsContent className="w-full" value="reports">
            Reports
          </TabsContent>
          <TabsContent className="w-full" value="users"></TabsContent>
        </div>
      </Tabs>
    </AgencyLayout>
  );
};

export default Dashboard;
