import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "../../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { BiSortAlt2 } from "react-icons/bi";
import { TbLayoutGrid } from "react-icons/tb";
import {
  AiOutlineHeart,
  AiOutlineMore,
  AiOutlineSearch,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { Separator } from "@radix-ui/react-separator";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import Pagination from "../../ui/Pagination";
import { ProjectProps, TalentProps } from "../../redux/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "../../ui/dialog";
import {
  // Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Button } from "../../ui/button";
import { authAxiosInstance, campaignAuthAxiosInstance } from "../../api/axios";
import Logo from "../../assets/beauty.jpg";
import { Input } from "../../ui/input";
import { SelectGroup, SelectLabel } from "../../ui/select";
import { TalentType } from "../agency/TalentsView";
import SelectOption from "../../libs/select";
import AllApplications from "../agency/appliedTalents/AllApplications";
import CurrentContacts from "../agency/appliedTalents/CurrentContacts";
import FavoriteTalents from "../agency/appliedTalents/FavoriteTalents";
import Engaged from "../agency/appliedTalents/Engaged";
import MyTalents from "../agency/appliedTalents/MyTalents";

import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { Checkbox } from "../../ui/checkbox";
import {
  fetchApplications,
  // filterApplications,
  setApproval,
} from "../../redux/applicantions.slice";
import { Empty } from "../Empty";

// const categoryOptions: any = [
//   { value: "All Talents", label: "All Talent" },
//   { value: "Current Contacts", label: "Current Contacts" },
//   { value: "Favorites", label: "Favorites" },
//   { value: "Engaged", label: "Engaged" },
//   { value: "My Talent", label: "My Talent" },
//   { value: "Invited", label: "Invited" },
// ];

// const appOptions: any = [
//   { value: "All Applications", label: "All Applications" },
//   { value: "My Talent", label: "My Talent" },
//   { value: "Favorites", label: "Favorites" },
//   { value: "Current Contacts", label: "Current Contacts" },
//   { value: "Engaged", label: "Engaged" },
//   { value: "Invited", label: "Invited" },
// ];

// const actionOptions: any = [
//   { value: "Shortlist", label: "Shortlist" },
//   { value: "Approve Hire", label: "Approve Hire" },
//   { value: "Send Message", label: "Send Message" },
// ];

// const talentOptions: any = [
//   { value: "Ba", label: "Ba" },
//   { value: " Supervisor", label: "Supervisor" },
// ];

//   // activeType,
//   handleProfilePopUp,
//   ProjectId,
// }: {
//   handleProfilePopUp: (talent: TalentProps) => void;
//   ProjectId: string;
// }) => {
//   let pageTalents;

//   type AppProps = "shortlisted" | "rejected" | "approvedHire" | "All";
//   // console.log("activeType", activeType);

//   const [gridView, setGridView] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [popUp, setPopUp] = useState(false);
//   const [selectedGender, setSelectedGender] = useState("all");
//   const [selectedOppor, setSelectedOppor] = useState("all");
//   const [selectedLocation, setSelectedLocation] = useState("all");
//   const [ageRange, setAgeRange] = useState({ start: "", end: "" });
//   const [selectedRole, setSelectedRole] = useState<TalentProps>();
//   const [projects, setProjects] = useState<ProjectProps[]>();
//   const [successModal, setSuccessModal] = useState(false);
//   const [selectedProject, setSelectedProject] = useState("");
//   const [selectedTalent, setSelectedTalent] = useState("");
//   const [selectedTalentID, setSelectedTalentID] = useState("");
//   const [projectModal, setProjectModal] = useState(false);
//   const [activeType, setActiveType] = useState<TalentType>("All Talents");
//   const [appStatus, setAppStatus] = useState<AppProps>("All");

// const filteredTalents = resTalents?.filter((talent, idx) => {
//   const talentgender = talent?.gender;
//   const talentRole = talent?.opportunities;
//   const talentAge = talent?.age;
//   const talentAddress = talent?.address[0];
//   // const size = sellers..toLowerCase();
//   // const search = searchTerm.toLowerCase();
//   const searchLocation = selectedLocation.toLowerCase();

//   if (
//     selectedGender === "all" &&
//     selectedOppor === "all" &&
//     selectedLocation === "all" &&
//     ageRange.start === "" &&
//     ageRange.end === ""
//   ) {
//     return talent;
//   }
//   const isGenderMatch = selectedGender === talentgender;
//   const isRoleMatch = selectedOppor === talentRole;
//   const isOfAge =
//     talentAge >= parseInt(ageRange.start) &&
//     talentAge <= parseInt(ageRange.end);
//   const isCity = talentAddress?.city.includes(searchLocation);
//   const isState = talentAddress?.state.includes(searchLocation);

//   if (isGenderMatch) {
//     if (
//       selectedOppor === "all" &&
//       selectedLocation === "all" &&
//       ageRange.start === "" &&
//       ageRange.end === ""
//     ) {
//       return isGenderMatch;
//     }
//     if (
//       selectedOppor !== "all" &&
//       selectedLocation === "all" &&
//       ageRange.start === "" &&
//       ageRange.end === ""
//     ) {
//       return isGenderMatch && isRoleMatch;
//     }
//     if (
//       selectedOppor !== "all" &&
//       selectedLocation === "all" &&
//       ageRange.start !== "" &&
//       ageRange.end !== ""
//     ) {
//       return isGenderMatch && isRoleMatch && isOfAge;
//     }

//     if (
//       selectedOppor !== "all" &&
//       selectedLocation !== "all" &&
//       ageRange.start !== "" &&
//       ageRange.end !== ""
//     ) {
//       return isGenderMatch && isRoleMatch && (isCity || isState) && isOfAge;
//     }
//   }
//   return talent;
// });

// switch (activeType) {
//   case "All Talents":
//     pageTalents = (
//       <AllApplications
//         gridView={gridView}
//         successModal={successModal}
//         setSuccessModal={setSuccessModal}
//         handleInvite={handleInvite}
//         setSelectedProject={setSelectedProject}
//         projects={projects}
//         setSelectedTalent={setSelectedTalent}
//         // handleProfilePopUp={handleProfilePopUp}
//         selectedTalent={selectedTalent}
//         setSelectedTalentID={setSelectedTalentID}
//         selectedProject={selectedProject}
//         projectModal={projectModal}
//         ProjectId={ProjectId}
//         appStatus={appStatus}
//         setProjectModal={setProjectModal}
//         gap={14}
//       />
//     );
//     break;
//   // case "Current Contacts":
//   //   pageTalents = (
//   //     <CurrentContacts
//   //       gridView={gridView}
//   //       successModal={successModal}
//   //       setSuccessModal={setSuccessModal}
//   //       handleInvite={handleInvite}
//   //       setSelectedProject={setSelectedProject}
//   //       projects={projects}
//   //       setSelectedTalent={setSelectedTalent}
//   //       handleProfilePopUp={handleProfilePopUp}
//   //       selectedTalent={selectedTalent}
//   //       setSelectedTalentID={setSelectedTalentID}
//   //       selectedProject={selectedProject}
//   //     />
//   //   );
//   //   break;
//   // case "Favorites":
//   //   pageTalents = (
//   //     <FavoriteTalents
//   //       gridView={gridView}
//   //       successModal={successModal}
//   //       setSuccessModal={setSuccessModal}
//   //       handleInvite={handleInvite}
//   //       setSelectedProject={setSelectedProject}
//   //       projects={projects}
//   //       setSelectedTalent={setSelectedTalent}
//   //       handleProfilePopUp={handleProfilePopUp}
//   //       selectedTalent={selectedTalent}
//   //       setSelectedTalentID={setSelectedTalentID}
//   //       selectedProject={selectedProject}
//   //     />
//   //   );
//   //   break;
//   // case "Engaged":
//   //   pageTalents = (
//   //     <Engaged
//   //       gridView={gridView}
//   //       successModal={successModal}
//   //       setSuccessModal={setSuccessModal}
//   //       handleInvite={handleInvite}
//   //       setSelectedProject={setSelectedProject}
//   //       projects={projects}
//   //       setSelectedTalent={setSelectedTalent}
//   //       handleProfilePopUp={handleProfilePopUp}
//   //       selectedTalent={selectedTalent}
//   //       setSelectedTalentID={setSelectedTalentID}
//   //       selectedProject={selectedProject}
//   //     />
//   //   );
//   //   break;
//   // case "My Talents":
//   //   pageTalents = (
//   //     <MyTalents
//   //       gridView={gridView}
//   //       successModal={successModal}
//   //       setSuccessModal={setSuccessModal}
//   //       handleInvite={handleInvite}
//   //       setSelectedProject={setSelectedProject}
//   //       projects={projects}
//   //       setSelectedTalent={setSelectedTalent}
//   //       handleProfilePopUp={handleProfilePopUp}
//   //       selectedTalent={selectedTalent}
//   //       setSelectedTalentID={setSelectedTalentID}
//   //       selectedProject={selectedProject}
//   //     />
//   //   );
//   //   break;
//   default:
//     pageTalents = null;
// }

const HireTalents = () => {
  return (
    <>
      <Separator className="bg-bm__gler/50" />
      {/* <div className="overflow-y-scroll h-[80vh]"> */}
      <Card className="w-full pt-4 my-3 overflow-y-scroll h-[80vh]">
        <CardContent>
          {/* <Card className="h-[40vh]"> */}
          <div className="flex flex-col overflow-y-auto h-[40vh]">
            <p className=" capitalize break-words p-4">
              <Empty children />
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default HireTalents;
