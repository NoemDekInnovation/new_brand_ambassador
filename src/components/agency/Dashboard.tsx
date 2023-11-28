import { useState, useRef, useEffect } from "react";
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
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Dashboard = () => {
  const [defaultTab, setDefaultTab] = useState("home");
  const { activeProject } = useSelector(
    (state: RootState) => state.activeProject
  );
  const { completeProject } = useSelector(
    (state: RootState) => state.completeProject
  );

  const talentRef = useRef<HTMLParagraphElement>(null);
  const projectsRef = useRef<HTMLParagraphElement>(null);
  const handleTabClick = (tab: string) => {
    if (tab === "Home") {
      console.log(talentRef.current?.innerHTML);

      if (talentRef.current) {
        const element = talentRef.current as HTMLParagraphElement;
        element.style.color = "#000000";
        element.style.fontWeight = "500";
        element.style.fontSize = "14px";
      } else {
        const element = talentRef.current as unknown as HTMLParagraphElement;
        element.style.color = "#800000";
        element.style.fontWeight = "600";
        element.style.fontSize = "15px";
      }
    } else if (tab === "Talent") {
      console.log(talentRef.current?.innerHTML);

      if (talentRef.current) {
        const element = talentRef.current as HTMLParagraphElement;
        element.style.color = "#800000";
        element.style.fontWeight = "600";
        element.style.fontSize = "15px";
      }
    } else if (tab === "Projects") {
      if (projectsRef.current) {
        const element = projectsRef.current as HTMLParagraphElement;
        element.style.color = "#800000";
        element.style.fontWeight = "600";
        element.style.fontSize = "15px";
      }
    }
  };

  return (
    <AgencyLayout>
      <Tabs defaultValue={defaultTab} className="w-full">
        <div className="flex flex-col lg:flex-row  justify-between w-full px-4 md:px-12 xl:px-40 bg-white  shadow-xl drop-shadow-lg space-y-4 md:space-y-0  overflow-x-scroll md:overflow-x-hidden overflow-y-hidden">
          <TabsList className="mb-4">
            <TabsTrigger
              value="home"
              className="hover:underline data-[state=active]:text-[#800000] data-[state=active]:font-semibold data-[state=active]:text-[15px]"
              onClick={() => handleTabClick("Home")}
            >
              Home
            </TabsTrigger>
            <Menubar className="border-0">
              <MenubarMenu>
                <MenubarTrigger className="border-0">
                  <div className="flex items-center space-x-3 cursor-pointer hover:underline">
                    <p ref={talentRef}>Talent</p>
                    {/* <TabsTrigger value="talent">Talent</TabsTrigger> */}
                    <img src={arrowIcon} alt="arrowicon" />
                  </div>
                </MenubarTrigger>
                <MenubarContent className="bg-white">
                  <MenubarItem>
                    <TabsTrigger
                      value="talent"
                      className="cursor-pointer hover:underline w-full items-start justify-start"
                      onClick={() => handleTabClick("Talent")}
                    >
                      Current Contracts
                    </TabsTrigger>
                  </MenubarItem>
                  <MenubarSeparator className="bg-bm__beige" />
                  <MenubarItem>
                    <TabsTrigger
                      value="talent"
                      className="cursor-pointer hover:underline w-full items-start justify-start"
                      onClick={() => handleTabClick("Talent")}
                    >
                      Favourites
                    </TabsTrigger>
                  </MenubarItem>
                  <MenubarSeparator className="bg-bm__beige" />
                  <MenubarItem>
                    <TabsTrigger
                      value="talent"
                      className="cursor-pointer hover:underline w-full items-start justify-start"
                      onClick={() => handleTabClick("Talent")}
                    >
                      Engaged Talent
                    </TabsTrigger>
                  </MenubarItem>
                  <MenubarSeparator className="bg-bm__beige" />
                  <MenubarItem>
                    <TabsTrigger
                      value="talent"
                      className="cursor-pointer hover:underline w-full items-start justify-start"
                      onClick={() => handleTabClick("Talent")}
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
                    <p ref={projectsRef}>Projects</p>
                    {/* <TabsTrigger value="talent">Talent</TabsTrigger> */}
                    <img src={arrowIcon} alt="arrowicon" />
                  </div>
                </MenubarTrigger>
                <MenubarContent className="bg-white">
                  <MenubarItem className="hover:underline">
                    <TabsTrigger
                      value="projects"
                      className="cursor-pointer hover:underline w-full items-start justify-start"
                      onClick={() => handleTabClick("Projects")}
                    >
                      Active
                    </TabsTrigger>
                  </MenubarItem>
                  <MenubarSeparator className="bg-bm__beige" />
                  <MenubarItem className="hover:underline">
                    <TabsTrigger
                      value="projects"
                      className="cursor-pointer hover:underline w-full items-start justify-start"
                      onClick={() => handleTabClick("Projects")}
                    >
                      Published
                    </TabsTrigger>
                  </MenubarItem>
                  <MenubarSeparator className="bg-bm__beige" />
                  <MenubarItem className="hover:underline">
                    <TabsTrigger
                      value="projects"
                      className="cursor-pointer hover:underline w-full items-start justify-start"
                      onClick={() => handleTabClick("Projects")}
                    >
                      Completed
                    </TabsTrigger>
                  </MenubarItem>
                  <MenubarSeparator className="bg-bm__beige" />
                  <MenubarItem className="hover:underline">
                    <TabsTrigger
                      value="projects"
                      className="cursor-pointer hover:underline w-full items-start justify-start"
                      onClick={() => handleTabClick("Projects")}
                    >
                      Drafts
                    </TabsTrigger>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>

            {/* <TabsTrigger value="projects">Projects</TabsTrigger>
            <img src={arrowIcon} alt="arrowicon" /> */}
            <TabsTrigger
              value="inventory"
              className="hover:underline data-[state=active]:text-[#800000] data-[state=active]:font-semibold data-[state=active]:text-[15px]"
            >
              Inventory
            </TabsTrigger>
            <img src={arrowIcon} alt="arrowicon" />
            <TabsTrigger
              value="outlets"
              className="hover:underline data-[state=active]:text-[#800000] data-[state=active]:font-semibold data-[state=active]:text-[15px]"
            >
              Outlets
            </TabsTrigger>
            <img src={arrowIcon} alt="arrowicon" />
            <TabsTrigger
              value="reports"
              className="hover:underline data-[state=active]:text-[#800000] data-[state=active]:font-semibold data-[state=active]:text-[15px]"
            >
              Reports
            </TabsTrigger>
            <img src={arrowIcon} alt="arrowicon" />
            <TabsTrigger
              value="users"
              className="hover:underline data-[state=active]:text-[#800000] data-[state=active]:font-semibold data-[state=active]:text-[15px]"
            >
              Users
            </TabsTrigger>
            <img src={arrowIcon} alt="arrowicon" />
          </TabsList>
          <div className="flex">
            <div className="flex items-center gap-2 mr-6">
              <div className="text-white bg-bm__niv px-2 rounded-sm">
                {activeProject.length || 0}
              </div>
              <p className="font-medium text-xs leading-[18px]">
                Active Projects
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-white bg-black px-2 rounded-sm">
                {completeProject.length || 0}
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
