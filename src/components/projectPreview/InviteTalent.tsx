import { Card, CardContent } from "../../ui/card";
import { TbMap2, TbProgressCheck } from "react-icons/tb";
import { ImCancelCircle, ImStatsDots } from "react-icons/im";
import { Separator } from "../../ui/seperator";
import { MdOutlineProductionQuantityLimits, MdPostAdd } from "react-icons/md";
import { BsFillCollectionFill } from "react-icons/bs";
import TalentDetailsInfo from "./TalentDetailsInfo";
import { useState } from "react";
import { TalentProps } from "../../redux/types";
import { TalentType } from "../agency/TalentsView";
import Contract from "../agency/contract/Contract";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import TalentProfile from "../agency/TalentProfile";
import TalentImages from "../agency/TalentImages";
import { Button } from "../../ui/button";

const InviteTalent = ({
  popUp,
  setPopUp,
  select,
  selectedProject,
  numberOfHired,
}: // imagePopUp,
// setImagePopUp,
{
  select: any;
  popUp: boolean;
  setPopUp: any;
  selectedProject: any;
  numberOfHired: number;
}) => {
  const [selectedRole, setSelectedRole] = useState<TalentProps>();
  const [activePreview, setActivePreview] = useState("Project Post");
  const [imagePopUp, setImagePopUp] = useState(false);
  const [popUpx, setPopUpx] = useState(false);

  const { talents: resTalents, totalTalent } = useSelector(
    (state: RootState) => state.talent
  );

  const { applications } = useSelector(
    (state: RootState) => state?.applications
  );

  const handleProfilePopUp = (talent: any) => {
    // console.log(talent);
    setPopUpx(!popUpx);
    setSelectedRole(talent);
  };

  const handleImagePopUp = (talent: any) => {
    setImagePopUp(!imagePopUp);
    setSelectedRole(talent);
  };

  const { hiredTalent } = useSelector((state: RootState) => state?.hire);
  const handleInvite = () => {};
  return (
    <>
      <div
        className={`fixed z-[1000] bg-black/50 w-[100%] items-center justify-end flex flex-col transition-all duration-1000 inset-0 ${
          popUp
            ? "translate-y-0 opacity-100 h-[100vh] -bottom-5"
            : "translate-y-[1000px] opacity-0"
        }`}
      >
        <Card className="p-4 relative bg-white w-[85vw] h-[95vh] ">
          <span className="absolute top-0 right-0 text-sm text-[#6F797A] p-8">
            <ImCancelCircle
              className="w-[20px] h-[20px] cursor-pointer"
              onClick={setPopUp}
            />
          </span>
          <div className="flex flex-row items-center p-4">
            <div className="text-[14px] font-medium capitalize">
              {selectedProject.projectTitle}
            </div>
            <div className="text-[15px] p-0 px-2">|</div>

            <div className="text-[12px] font-medium capitalize">
              {selectedProject.projectCategory}
            </div>
            <div className="text-[15px] p-0 px-2">|</div>

            <div className="text-[12px] font-medium capitalize">
              {selectedProject.projectCode}
            </div>
            <div className="text-[15px] p-0 px-2">|</div>

            <div className="text-[12px] font-medium capitalize text-green-500">
              Active
            </div>
          </div>
          <div className="flex items-center gap-4 relative">
            <Card className=" p-1.5 flex flex-col justify-center gap-1  border-bm__beige w-[230px] max-h-[270px] border rounded-[6px]">
              {/* <Separator className="bg-bm__gler" /> */}
              <div
                className="flex items-center gap-4 p-2  hover:bg-black/10 transform hover:scale-105 cursor-pointer"
                onClick={() => {
                  setActivePreview("Project Post");
                }}
              >
                <div className="flex items-center gap-4 mr-2">
                  <MdPostAdd />
                  <p className="text-[14px] font-normal ">Project Post</p>
                </div>
              </div>
              <Separator className="bg-bm__gler/50" />
              <div
                className="flex items-center gap-4 p-2   hover:bg-black/10 transform hover:scale-105 cursor-pointer"
                onClick={() => {
                  setActivePreview("Products");
                }}
              >
                <MdOutlineProductionQuantityLimits />

                <p className="text-[14px] font-normal">Products</p>
              </div>
              <Separator className="bg-bm__gler/50" />
              <div
                className="flex items-center gap-4 p-2  hover:bg-black/10 transform hover:scale-105 cursor-pointer"
                onClick={() => {
                  setActivePreview("Collaterals");
                }}
              >
                <BsFillCollectionFill />
                <p className="text-[14px] font-normal">Collaterals</p>
              </div>
              <Separator className="bg-bm__gler/50" />
              <div
                className="flex items-center gap-4 p-2  hover:bg-black/10 transform hover:scale-105 cursor-pointer"
                onClick={() => {
                  setActivePreview("Outlets");
                }}
              >
                <TbMap2 />
                <p className="text-[14px] font-normal">Outlets</p>
              </div>
              <Separator className="bg-bm__gler/50" />
              <div
                className="flex items-center gap-4 p-2  hover:bg-black/10 transform hover:scale-105 cursor-pointer"
                onClick={() => {
                  setActivePreview("Contracts");
                }}
              >
                <ImStatsDots />
                <p className="text-[14px] font-normal">Offers & Contract</p>
              </div>
            </Card>
            {activePreview === "Project Post" && (
              <div className=" flex absolute flex-row justify-between items-start font-medium text-[12px] my-2  w-full max-w-[82%] right-5 -top-2 cursor-pointer">
                <div
                  onClick={() => select(1)}
                  className="relative text-black flex items-center justify-center w-full h-[55px]"
                >
                  <p className="absolute top-[25%]  z-20 text-[16px]">
                    Project Overview
                  </p>

                  <div className=" bg-[#f3f3f3] border  border-[#d7d8da]  border-r-[#f3f3f3] w-full h-[58px]  rounded-l-md"></div>
                  <div className="absolute right-[-21px] z-[1000] -rotate-45 bg-[#f3f3f3]  w-[40px] h-[40px]  border-r border-b border-[#d7d8da]"></div>
                  <div className="absolute right-[-28px] z-[500] -rotate-45 bg-white w-[40px] h-[40px] border-r border-b border-[#d7d8da]"></div>
                </div>

                <div
                  onClick={() => select(2)}
                  className="relative text-white flex items-center justify-center w-full"
                >
                  <p className="absolute top-[25%] text-[16px] z-20">
                    Invite Talent
                    <span className="text-[14px] font-bold">
                      ({totalTalent || 0})
                    </span>
                  </p>
                  <div className=" bg-white w-[8px] h-[55px]"></div>
                  <div className=" bg-black border border-[#d7d8da] w-full h-[58px]"></div>
                  <div className="absolute right-[-20px] z-[1000] -rotate-45 bg-black w-[40px] h-[40px] "></div>
                  <div className="absolute right-[-28px] z-[500] -rotate-45 bg-white w-[40px] h-[40px] border-r border-b border-[#d7d8da]"></div>
                </div>
                <div
                  onClick={() => select(3)}
                  className="relative text-black flex items-center justify-center w-full"
                >
                  <p className="absolute top-[25%] text-[16px] z-20">
                    {" "}
                    Applications
                    <span className="text-[14px] font-bold">
                      ({applications?.data?.projectApplications?.length || 0})
                    </span>
                  </p>
                  <div className=" bg-white w-[8px] h-[55px]"></div>
                  <div className=" bg-[#f3f3f3] border border-[#d7d8da] w-full h-[58px]"></div>
                  <div className="absolute right-[-21px] z-[1000] -rotate-45 bg-[#f3f3f3] border-r border-b border-[#d7d8da] w-[40px] h-[40px] "></div>
                  <div className="absolute right-[-28px] z-[500] -rotate-45 bg-white w-[40px] h-[40px] border-r border-b border-[#d7d8da]"></div>
                </div>
                <div
                  onClick={() => select(4)}
                  className="relative text-black flex items-center justify-center w-full"
                >
                  <p className="absolute top-[25%] z-20 text-[16px]">
                    {" "}
                    Hire
                    <span className="text-[14px] font-bold">
                      ({hiredTalent.length})
                    </span>
                  </p>
                  <div className=" bg-white w-[8px] h-[55px]"></div>
                  <div className=" bg-[#f3f3f3] border border-[#d7d8da]  w-full h-[58px] rounded-r-md"></div>
                </div>
              </div>
            )}
          </div>
          {activePreview === "Project Post" && (
            <Card className=" flex border-0 absolute flex-col p-2 bg-white w-full max-w-[83%] right-0 top-0 mt-[130px] ">
              <TalentDetailsInfo
                handleProfilePopUp={handleProfilePopUp}
                projectId={selectedProject._id}
                handleImagePopUp={handleImagePopUp}
              />
            </Card>
          )}
          {activePreview === "Contracts" && (
            <div className="absolute w-full max-w-[83%] right-0 top-0 mt-[50px]">
              <Contract selectedProject={selectedProject} />
            </div>
          )}
        </Card>
      </div>
      <div className="h-full w-full relative">
        <div
          className={`fixed left-0 bg-black/50  z-[1000]  w-[100%] items-center justify-end flex flex-col transition-all duration-1000 ${
            popUpx
              ? "translate-y-0 opacity-100 h-[100vh] -bottom-5"
              : "translate-y-[1000px] opacity-100 h-0 bottom-0"
          }`}
        >
          <TalentProfile
            selectedRole={selectedRole}
            inviteTalent={handleInvite}
            setPopUp={setPopUpx}
          />
        </div>
        <div
          className={`fixed bg-black/50  z-[1000] w-[100%] items-center justify-end flex flex-col transition-all duration-1000 ${
            imagePopUp
              ? "translate-y-0 opacity-100 h-[100vh] inset-0 -bottom-5"
              : "translate-y-[1000px] opacity-100 h-0 right-0 bottom-0"
          }`}
        >
          <div className="relative w-full ml-auto flex p-3">
            <div className="bg-"></div>
            <Button
              onClick={() => setImagePopUp(false)}
              className="bg-white p-2 text-black h-[35px] w-[35px] rounded-full text-[17px] ml-auto"
            >
              x
            </Button>
          </div>

          <TalentImages
            selectedRole={selectedRole}
            inviteTalent={handleInvite}
          />
        </div>
      </div>
    </>
  );
};

export default InviteTalent;
