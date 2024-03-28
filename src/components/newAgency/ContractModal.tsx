import { useSelector } from "react-redux";
import { Dialog, DialogContent } from "../../ui/dialog";
import { RootState } from "../../redux/store";
import { useState } from "react";
import { campaignAuthAxiosInstance } from "../../api/axios";
import { toast } from "../../ui/use-toast";
import { TbProgressCheck } from "react-icons/tb";
import { Separator } from "../../ui/seperator";
import Loading from "../Loading";

export const ContractModal = ({
  projectModal,
  setProjectModal,
}: {
  projectModal: boolean;
  setProjectModal: any;
}) => {
  const { selectedProject } = useSelector(
    (state: RootState) => state.newProjects
  );
  const { user } = useSelector((state: RootState) => state.user);
  const { selectedTalent } = useSelector((state: RootState) => state.newtalent);

  const [isLoading, setIsLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const handleInvite = async () => {
    setIsLoading(true);
    // if (selectedTalentType === null) {
    //   toast({
    //     description: "Please select a Talent type",
    //     variant: "destructive",
    //   });
    //   return;
    // }
    // if (user !== null) {
    //   try {
    //     const response = await campaignAuthAxiosInstance.post(
    //       `/invite-to-project`,
    //       [
    //         {
    //           opportunities: selectedTalentType,
    //           projectId: selectedProject._id,
    //           talentId: selectedTalent._id,
    //         },
    //       ],
    //       {
    //         headers: {
    //           Authorization: `Bearer ${user.authKey || ""}`,
    //         },
    //       }
    //     );
    //     // socket?.emit("new-notifiactions");

    //     setIsLoading(false);
    //     // setSuccessModal(false);
    //     setProjectModal(!projectModal);
    //     setSuccessModal(true);

    //     return setTimeout(() => {
    //       setSuccessModal(false);
    //       setProjectModal(false);
    //     }, 3000);
    //   } catch (error: any) {
    //     setIsLoading(false);
    //     toast({
    //       description: error?.response?.data?.message,
    //       variant: "destructive",
    //     });
    //   }
    // }
  };

  return isLoading ? (
    <div>
      <Loading />
    </div>
  ) : (
    <>
      <Dialog open={projectModal} onOpenChange={setProjectModal}>
        {projectModal && (
          <div className=" p-4 h-screen fixed inset-0 bg-black/20 z-[2000] flex justify-center">
            <div className="sm:max-w-[950px] w-full  bg-white text-black m-auto mx-3 rounded-b-lg">
              <div className="bg-black p-3 w-full justify-between text-white flex items-center capitalize">
                <p>
                  Send Contract <span className="lowercase">to</span>{" "}
                  {selectedTalent.firstName}
                  {"  "} {selectedTalent.lastName}{" "}
                </p>
                <button onClick={() => setProjectModal(false)}>x</button>
              </div>
              <div className="flex justify-center items-center items-center p-4  rounded-b-lg">
                <div className=" max-w-[800px] w-full flex flex-col items-end gap-3 ">
                  {/* <Card className="border-none"> */}
                  {/* <div className=" p-3 w-full">
                    <p className="text-bm__grey__text__100 text-[18px]">
                      Are you sure you want to invite this talent for training?{" "}
                    </p>
                    <p className="text-bm__grey__text__100 text-[12px]">
                      Talent will receive notification to accept or decline this
                      training invite.{" "}
                    </p>
                  </div> */}
                  {/* </Card> */}
                  <div className="">
                    <button onClick={handleInvite} className="dark___btn">
                      Send Contract
                    </button>{" "}
                  </div>
                </div>
              </div>
            </div>
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
    </>
  );
};
