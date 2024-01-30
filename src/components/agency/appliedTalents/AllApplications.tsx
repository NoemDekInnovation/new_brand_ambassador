import { AppliedTalentGrid, TalentList } from "./talentView";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { Separator } from "../../../ui/seperator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { TbProgressCheck } from "react-icons/tb";
import { DialogOverlay } from "@radix-ui/react-dialog";
import { TalentProps } from "../../../redux/types";
import SelectOption from "../../../libs/select";

type AppProps =
  | "shortlisted"
  | "rejected"
  | "approvedHire"
  | "All"
  | "training";

const AllApplications = ({
  gridView,
  handleInvite,
  setSelectedProject,
  projects,
  setSelectedTalent,
  // handleProfilePopUp,
  selectedTalent,
  setSelectedTalentID,
  selectedProject,
  setSuccessModal,
  successModal,
  projectModal,
  setProjectModal,
  appStatus,
  gap,
  ProjectId,
  handleGroupSubmit,
  handleCheckedChange,
  bulkModal,
  offerSelectorList,
  offers,
  setBulkModal,
  setSelectedOffer,
  offerHandler,
  setAppStatus,
}: {
  setAppStatus: (value: React.SetStateAction<AppProps>) => void;
  bulkModal?: any;
  setBulkModal?: any;
  ProjectId: string;
  appStatus: string;
  gridView: boolean;
  handleInvite: any;
  offerSelectorList: any;
  setSelectedProject: any;
  projects: any;
  setSelectedTalent: any;
  // handleProfilePopUp: any;
  selectedTalent: any;
  setSelectedTalentID: any;
  selectedProject: any;
  setSuccessModal: any;
  successModal: any;
  gap?: number;
  projectModal?: any;
  setProjectModal?: any;
  handleCheckedChange?: any;
  handleGroupSubmit?: any;
  offers: any;
  setSelectedOffer: any;
  offerHandler: any;
}) => {
  const { talents: resTalents } = useSelector(
    (state: RootState) => state.talent
  );

  const { applications, applicationsQuery } = useSelector(
    (state: RootState) => state?.applications
  );

  // console.log(applications);

  const [popUp, setPopUp] = useState(false);
  const [selectedRole, setSelectedRole] = useState<TalentProps>();
  const [talentData, setTalentData] = useState<any>([]);
  const [talentDataType, setTalentDataType] = useState<any>([]);

  useEffect(() => {
    // console.log(applications);
    if (appStatus === "All") {
      if (applications !== null && applications?.length !== 0) {
        if (applications?.shortlists && applications?.shortlists?.length >= 0) {
          const app =
            applications?.shortlists?.map((talent: any) => {
              return talent?.talent;
            }) || [];
          return setTalentData(app);
        }

        const apps = applications?.data?.projectApplications || [];
        return setTalentData(
          apps.map((talent: any) => {
            return talent?.talent;
          })
        );
      }
    }

    if (appStatus !== "All") {
      if (applicationsQuery !== null && applicationsQuery?.length !== 0) {
        if (
          applicationsQuery?.shortlists &&
          applicationsQuery?.shortlists?.length >= 0
        ) {
          const app =
            applicationsQuery?.shortlists?.map((talent: any) => {
              return talent?.talent;
            }) || [];
          return setTalentData(app);
        }

        const apps = applications?.data?.projectApplications || [];
        return setTalentData(
          apps.map((talent: any) => {
            return talent?.talent;
          })
        );
      }
    }
  }, [applications, applicationsQuery]);

  const [isLoading, setIsLoading] = useState(false);

  const handleProfilePopUp = (talent: any) => {
    // console.log(talent);
    setPopUp(!popUp);
    setSelectedRole(talent);
  };

  const handleSelection = (value: any) => {
    const offerInfo = offers.filter(
      (offer: any) => offer !== value.toLowerCase()
    );
    setSelectedOffer(offerInfo);
  };

  return (
    <div className="relative">
      {gridView && (
        <div className="flex w-full justify-start">
          <div
            className={`flex justify-start md:justify-start space-y-4 md:space-y-0 gap-3 md:gap-x-${gap} mt-2  flex-wrap `}
          >
            {/* {talents} */}
            {talentData?.map((_: any, idx: number) => {
              return (
                <AppliedTalentGrid
                  key={idx}
                  _={_}
                  modal={projectModal}
                  setModal={setProjectModal}
                  idx={idx}
                  handleInvite={handleInvite}
                  setSelectedProject={setSelectedProject}
                  projects={projects}
                  setSelectedTalent={setSelectedTalent}
                  handleProfilePopUp={handleProfilePopUp}
                  selectedTalent={selectedTalent}
                  setSelectedTalentID={setSelectedTalentID}
                  selectedProject={selectedProject}
                  setSuccessModal={setSuccessModal}
                  successModal={successModal}
                />
              );
            })}
          </div>
        </div>
      )}
      {!gridView && (
        <div className="flex flex-col w-full gap-3">
          {talentData?.map((_: any, idx: number) => {
            return (
              <TalentList
                setAppStatus={setAppStatus}
                talent={_}
                index={idx}
                handleInvite={""}
                setSelectedProject={""}
                ProjectId={ProjectId}
                projects={""}
                setSelectedTalent={""}
                handleProfilePopUp={() => {}}
                selectedTalent={""}
                setSelectedTalentID={""}
                selectedProject={""}
                setSuccessModal={""}
                successModal={true}
                handleCheckedChange={handleCheckedChange}
                appStatus={appStatus}
              />
            );
          })}
        </div>
      )}

      <Dialog open={projectModal} onOpenChange={setProjectModal}>
        {projectModal && (
          <div className=" p-4 h-screen fixed inset-0 bg-black/20 z-[2000]">
            <DialogContent className="sm:max-w-[425px] bg-[#fff] z-[2000]">
              <DialogHeader>
                <DialogTitle className="text-[18px] flex items-center gap-2">
                  <div className="">
                    <svg
                      className="h-[18px]"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 256 256"
                      enable-background="new 0 0 256 256"
                    >
                      <metadata>
                        {" "}
                        Svg Vector Icons : http://www.onlinewebfonts.com/icon{" "}
                      </metadata>
                      <g>
                        <g>
                          <path fill="#000000" d="M10,29.7" />
                          <path
                            fill="#000000"
                            d="M49.8,217.8H20.9c-3.9,0-7.2-3.2-7.2-7.2v-79.6c0-3.9,3.2-7.2,7.2-7.2h28.9c3.9,0,7.2,3.2,7.2,7.2v79.6C57,214.6,53.8,217.8,49.8,217.8L49.8,217.8z M26.3,205.2h18v-68.6h-18V205.2z"
                          />
                          <path
                            fill="#000000"
                            d="M125,226.3c-49.6,0-71.9-21.7-72.9-22.7l8.9-9c0.2,0.2,22.7,21.5,72.9,18.8c34.9-1.9,76.7-20.5,98.5-31.4c0.3-0.1,1.1-0.6,0.9-1.7c-0.1-0.8-0.7-1.3-1.5-1.3c-18.3-1.6-45.3-1.9-69.7,6.2c-28.1,9.3-41.2,0-45.6-4.4c-5.3-5.4-7.3-12.7-5.1-19.1c1.9-5.5,6.6-9.2,12.6-10c2.1-0.3,6.8-1.7,15.2-8.1c2-1.6,1.5-3.6,1.1-4.4c-0.3-0.8-1.5-2.6-4-2.2c-62.8,9.9-68.4,9.2-70.6,9c-5.5-0.7-6.8-0.7-6.9-0.7c1.9,0-10.1,2.2-9.4-1l4.2,4.2l1.8-3.7l-3.3-7.5c1.7-5.5,6.2-4.9,15.1-3.8c1.5,0.1,10.8,0,67-8.9c7.5-1.2,14.6,2.7,17.6,9.8c3,7,1,14.8-5.1,19.4c-8.3,6.4-15.3,9.8-21.2,10.6c-1.6,0.2-2,0.9-2.2,1.6c-0.5,1.4,0,3.9,2.2,6.1c2.1,2.1,10.7,8.5,32.6,1.3c26.4-8.7,55.2-8.5,74.8-6.7c6.4,0.6,11.6,5.2,12.8,11.6c1.2,6.3-1.9,12.5-7.6,15.4c-27.7,13.9-68.2,30.8-103.5,32.7C131.3,226.2,128.1,226.3,125,226.3L125,226.3z"
                          />
                          <path fill="#000000" d="M199.8,62.6L199.8,62.6z" />
                          <path
                            fill="#000000"
                            d="M192,149.3c-3.5,0-6.3-2.8-6.3-6.3V78.3c0-3.5,2.8-6.3,6.3-6.3s6.3,2.8,6.3,6.3V143C198.3,146.5,195.5,149.3,192,149.3L192,149.3z"
                          />
                          <path fill="#000000" d="M232.2,95L232.2,95z" />
                          <path
                            fill="#000000"
                            d="M224.3,117h-64.7c-3.5,0-6.3-2.8-6.3-6.3c0-3.5,2.8-6.3,6.3-6.3h64.7c3.5,0,6.3,2.8,6.3,6.3C230.6,114.2,227.8,117,224.3,117z"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  Invite Talent
                </DialogTitle>
                <Separator className="bg-[#D7D8DA]" />
                <DialogDescription>
                  Invite talent to your project
                </DialogDescription>
              </DialogHeader>
              <Separator className="bg-[#D7D8DA]" />
              <div className="w-full ">
                <Select
                  onValueChange={(e) => setSelectedProject(e)}
                  defaultValue={selectedProject}
                  // className={ba}
                >
                  <SelectTrigger className="w-full bg-white  h-[46px]">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-[3000]">
                    {projects !== undefined &&
                      projects.map(
                        (
                          // { projectTitle, _id }: { projectTitle: any; _id: string },
                          project: any,
                          index: number
                        ) => {
                          return (
                            <SelectItem value={project.value} key={index}>
                              {project.label}
                            </SelectItem>
                          );
                        }
                      )}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full pb-2">
                <Select
                  onValueChange={(e) => setSelectedTalent(e)}
                  defaultValue={selectedTalent}
                >
                  <SelectTrigger className="w-full bg-white  h-[46px]">
                    <SelectValue placeholder="Select Talent Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-[3000]">
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="usher">Usher</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="bg-[#D7D8DA]" />

              <DialogFooter className="">
                <Button
                  type="submit"
                  className="dark__btn h-[46px]"
                  onClick={handleInvite}
                >
                  {isLoading && (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 mr-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                  Send Invite
                </Button>
              </DialogFooter>
            </DialogContent>
          </div>
        )}
               
      </Dialog>
      <Dialog open={bulkModal} onOpenChange={setBulkModal}>
        {bulkModal && (
          <div className=" p-4 h-screen fixed inset-0 bg-black/20 z-[2000]">
            <DialogContent className="sm:max-w-[425px] bg-[#fff] z-[2000]">
              <DialogHeader>
                <DialogTitle className="text-[18px] flex items-center gap-2 cursor-pointer">
                  Send Offer
                </DialogTitle>
              </DialogHeader>
              <Separator className="bg-[#D7D8DA]" />

              <div className="w-full pb-2">
                {/* <Select
                  onValueChange={(e) => setSelectedTalent(e)}
                  defaultValue={selectedTalent}
                >
                  <SelectTrigger className="w-full bg-white  h-[46px]">
                    <SelectValue placeholder="Select Offer" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-[3000]">
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="usher">Usher</SelectItem>
                    <SelectItem value="brand ambassador">
                      Brand Ambassador
                    </SelectItem>
                  </SelectContent>
                </Select> */}

                <SelectOption
                  id="origin"
                  name="origin"
                  defaultValue={"companyProfile.address[0].state"}
                  options={offerSelectorList}
                  onChange={(e: any) => handleSelection(e.value)}
                  placeholder="Select offer"
                  required
                  isDisabled={false}
                  className="max-w-[400px]"
                />
              </div>

              <Separator className="bg-[#D7D8DA]" />

              <DialogFooter className="">
                <Button
                  type="submit"
                  className="dark__btn h-[46px]"
                  onClick={offerHandler}
                >
                  {isLoading && (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 mr-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                  Send Offer
                </Button>
              </DialogFooter>
            </DialogContent>
          </div>
        )}
      </Dialog>
      <Dialog open={successModal}>
        <DialogContent className="bg-bm_card_grey flex flex-col items-center justify-center max-w-[360px] md:max-w-[500px] max-h-[300px] py-8">
          <TbProgressCheck className="font-normal text-[155px] text-green-700" />

          <div className="text-[18px] font-semibold">Invite Sent</div>
          <Separator />
          <div className="">
            Talent has been invited to apply to your project
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllApplications;
