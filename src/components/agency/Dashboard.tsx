import { useState, useRef, useEffect } from "react";
import { AgencyLayout } from "../Layout";
import { AppDispatch } from "../../redux/store";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchactiveproject } from "../../redux/ActiveProject";
import { fetchcompleteproject } from "../../redux/completeProject";

const Dashboard = () => {
  const [toggleMenubar, setToggleMenubar] = useState(false);

  const [defaultTab, setDefaultTab] = useState(() => {
    const storedDefaultTab = localStorage.getItem("defaultTab");
    if (storedDefaultTab) {
      return storedDefaultTab;
    }
    return "home";
  });
  const { totalProjects: totalActiveProjects } = useSelector(
    (state: RootState) => state.activeProject
  );
  const { totalProjects: totalCompleteProjects } = useSelector(
    (state: RootState) => state.completeProject
  );

  const talentRef = useRef<HTMLParagraphElement>(null);
  const projectsRef = useRef<HTMLParagraphElement>(null);

  const handleTabClick = (tab: string, active_Content: string = "") => {
    // Reset styles for all tabs
    if (talentRef.current) {
      talentRef.current.style.color = "#000000";
      talentRef.current.style.fontWeight = "500";
      talentRef.current.style.fontSize = "14px";
    }

    if (projectsRef.current) {
      projectsRef.current.style.color = "#000000";
      projectsRef.current.style.fontWeight = "500";
      projectsRef.current.style.fontSize = "14px";
    }

    // Apply styles for the clicked tab
    if (tab === "Home") {
      // No need to update styles for Home tab
    } else if (tab === "Talent") {
      if (talentRef.current) {
        talentRef.current.style.color = "#800000";
        talentRef.current.style.fontWeight = "600";
        talentRef.current.style.fontSize = "15px";
      }
    } else if (tab === "Projects") {
      // console.log("jimmy");
      const content = active_Content;
      // Stringify the object before storing it in localStorage
      const stringifiedContent = JSON.stringify(content);

      // Store the stringified content in localStorage
      localStorage.setItem("defaultProject", stringifiedContent);
      if (projectsRef.current) {
        projectsRef.current.style.color = "#800000";
        projectsRef.current.style.fontWeight = "600";
        projectsRef.current.style.fontSize = "15px";
      }
    }
    if (tab === "Talent") {
      const content = active_Content;
      localStorage.setItem("defaultTalent", content); // Store in local storage
    }
  };

  useEffect(() => {
    const storedDefaultTab = localStorage.getItem("defaultTab");
    if (storedDefaultTab) {
      // setDefaultTab(storedDefaultTab);
    }
  }, []); // Empty dependency array ensures it runs only once on component mount

  return (
    <AgencyLayout
      setToggleMenubar={() => setToggleMenubar(!toggleMenubar)}
      toggleMenubar={toggleMenubar}
    >
      <Tabs defaultValue={defaultTab} className="w-full">
        <div className="flex flex-col md:flex-row   justify-between w-full px-4 md:px-12 xl:px-40 bg-white  shadow-xl drop-shadow-lg space-y-4 md:space-y-0  overflow-x-auto  md:overflow-x-hidden overflow-y-hidden">
          <div className="hidden md:flex">
            <TabsList className="mb-4">
              {/* <TabsList className="mb-4 flex flex-col bg-green-300 "> */}
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
                        onClick={() =>
                          handleTabClick("Talent", "Current Contracts")
                        }
                      >
                        Current Contracts
                      </TabsTrigger>
                    </MenubarItem>
                    <MenubarSeparator className="bg-bm__beige" />
                    <MenubarItem>
                      <TabsTrigger
                        value="talent"
                        className="cursor-pointer hover:underline w-full items-start justify-start"
                        onClick={() => handleTabClick("Talent", "Favorites")}
                      >
                        Favorites
                      </TabsTrigger>
                    </MenubarItem>
                    <MenubarSeparator className="bg-bm__beige" />
                    <MenubarItem>
                      <TabsTrigger
                        value="talent"
                        className="cursor-pointer hover:underline w-full items-start justify-start"
                        onClick={() => handleTabClick("Talent", "Engaged")}
                      >
                        Engaged Talent
                      </TabsTrigger>
                    </MenubarItem>
                    <MenubarSeparator className="bg-bm__beige" />
                    <MenubarItem>
                      <TabsTrigger
                        value="talent"
                        className="cursor-pointer hover:underline w-full items-start justify-start"
                        onClick={() => handleTabClick("Talent", "My Talent")}
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
                      <img src={arrowIcon} alt="arrowicon" />
                    </div>
                  </MenubarTrigger>
                  <MenubarContent className="bg-white">
                    <MenubarItem className="hover:underline">
                      <TabsTrigger
                        value="projects"
                        className="cursor-pointer hover:underline w-full items-start justify-start"
                        onClick={() => handleTabClick("Projects", "Active")}
                      >
                        Active
                      </TabsTrigger>
                    </MenubarItem>
                    <MenubarSeparator className="bg-bm__beige" />
                    <MenubarItem className="hover:underline">
                      <TabsTrigger
                        value="projects"
                        className="cursor-pointer hover:underline w-full items-start justify-start"
                        onClick={() => handleTabClick("Projects", "Published")}
                      >
                        Published
                      </TabsTrigger>
                    </MenubarItem>
                    <MenubarSeparator className="bg-bm__beige" />
                    <MenubarItem className="hover:underline">
                      <TabsTrigger
                        value="projects"
                        className="cursor-pointer hover:underline w-full items-start justify-start"
                        onClick={() => handleTabClick("Projects", "Completed")}
                      >
                        Completed
                      </TabsTrigger>
                    </MenubarItem>
                    <MenubarSeparator className="bg-bm__beige" />
                    <MenubarItem className="hover:underline">
                      <TabsTrigger
                        value="projects"
                        className="cursor-pointer hover:underline w-full items-start justify-start"
                        onClick={() => handleTabClick("Projects", "Drafts")}
                      >
                        Drafts
                      </TabsTrigger>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
              <TabsTrigger
                value="inventory"
                className="hover:underline data-[state=active]:text-[#800000] data-[state=active]:font-semibold data-[state=active]:text-[15px]"
                onClick={() => handleTabClick("inventory")}
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
          </div>
          <div
            className={`md:hidden flex flex-col relative  space-y-5 transition-all duration-200 ${
              toggleMenubar
                ? "opacity-100 h-100"
                : "-translate-y-[1000px] opacity-0 h-0"
            }`}
          >
            <TabsList className="md:mb-4 flex flex-col h-full items-start justify-start left-[-20px] relative">
              {/* <TabsList className="mb-4 flex flex-col bg-green-300 "> */}
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
                        onClick={() =>
                          handleTabClick("Talent", "Current Contracts")
                        }
                      >
                        Current Contracts
                      </TabsTrigger>
                    </MenubarItem>
                    <MenubarSeparator className="bg-bm__beige" />
                    <MenubarItem>
                      <TabsTrigger
                        value="talent"
                        className="cursor-pointer hover:underline w-full items-start justify-start"
                        onClick={() => handleTabClick("Talent", "Favorites")}
                      >
                        Favorites
                      </TabsTrigger>
                    </MenubarItem>
                    <MenubarSeparator className="bg-bm__beige" />
                    <MenubarItem>
                      <TabsTrigger
                        value="talent"
                        className="cursor-pointer hover:underline w-full items-start justify-start"
                        onClick={() => handleTabClick("Talent", "Engaged")}
                      >
                        Engaged Talent
                      </TabsTrigger>
                    </MenubarItem>
                    <MenubarSeparator className="bg-bm__beige" />
                    <MenubarItem>
                      <TabsTrigger
                        value="talent"
                        className="cursor-pointer hover:underline w-full items-start justify-start"
                        onClick={() => handleTabClick("Talent", "My Talent")}
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
                      <img src={arrowIcon} alt="arrowicon" />
                    </div>
                  </MenubarTrigger>
                  <MenubarContent className="bg-white">
                    <MenubarItem className="hover:underline">
                      <TabsTrigger
                        value="projects"
                        className="cursor-pointer hover:underline w-full items-start justify-start"
                        onClick={() => handleTabClick("Projects", "Active")}
                      >
                        Active
                      </TabsTrigger>
                    </MenubarItem>
                    <MenubarSeparator className="bg-bm__beige" />
                    <MenubarItem className="hover:underline">
                      <TabsTrigger
                        value="projects"
                        className="cursor-pointer hover:underline w-full items-start justify-start"
                        onClick={() => handleTabClick("Projects", "Published")}
                      >
                        Published
                      </TabsTrigger>
                    </MenubarItem>
                    <MenubarSeparator className="bg-bm__beige" />
                    <MenubarItem className="hover:underline">
                      <TabsTrigger
                        value="projects"
                        className="cursor-pointer hover:underline w-full items-start justify-start"
                        onClick={() => handleTabClick("Projects", "Completed")}
                      >
                        Completed
                      </TabsTrigger>
                    </MenubarItem>
                    <MenubarSeparator className="bg-bm__beige" />
                    <MenubarItem className="hover:underline">
                      <TabsTrigger
                        value="projects"
                        className="cursor-pointer hover:underline w-full items-start justify-start"
                        onClick={() => handleTabClick("Projects", "Drafts")}
                      >
                        Drafts
                      </TabsTrigger>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
              <TabsTrigger
                value="inventory"
                className="hover:underline data-[state=active]:text-[#800000] data-[state=active]:font-semibold data-[state=active]:text-[15px]"
                onClick={() => handleTabClick("inventory")}
              >
                Inventory
              </TabsTrigger>
              {/* <img src={arrowIcon} alt="arrowicon" /> */}
              <TabsTrigger
                value="outlets"
                className="hover:underline data-[state=active]:text-[#800000] data-[state=active]:font-semibold data-[state=active]:text-[15px]"
              >
                Outlets
              </TabsTrigger>
              {/* <img src={arrowIcon} alt="arrowicon" /> */}
              <TabsTrigger
                value="reports"
                className="hover:underline data-[state=active]:text-[#800000] data-[state=active]:font-semibold data-[state=active]:text-[15px]"
              >
                Reports
              </TabsTrigger>
              {/* <img src={arrowIcon} alt="arrowicon" /> */}
              <TabsTrigger
                value="users"
                className="hover:underline data-[state=active]:text-[#800000] data-[state=active]:font-semibold data-[state=active]:text-[15px]"
              >
                Users
              </TabsTrigger>
              {/* <img src={arrowIcon} alt="arrowicon" /> */}
            </TabsList>
          </div>
          <div className="flex mb-3 h-[40px]">
            <div className="flex items-center gap-2 mr-6">
              <div className="text-white bg-bm__niv px-2 rounded-sm">
                {totalActiveProjects || 0}
              </div>
              <p className="font-medium text-xs leading-[18px]">
                Active Projects
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-white bg-black px-2 rounded-sm">
                {totalCompleteProjects || 0}
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
            <ProjectTab />
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
