import { useSelector } from "react-redux";
import { Card } from "../../ui/card";
import { Dialog, DialogContent } from "../../ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { RootState } from "../../redux/store";
import { useState } from "react";
import { campaignAuthAxiosInstance } from "../../api/axios";
import { toast } from "../../ui/use-toast";
import { TbProgressCheck } from "react-icons/tb";
import { Separator } from "../../ui/seperator";
import Loading from "../Loading";

export const TalentInvitationModal = ({
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
  const [selectedTalentType, setSelectedTalentType] = useState<any>(null);

  const handleInvite = async () => {
    setIsLoading(true);
    if (selectedTalentType === null) {
      toast({
        description: "Please select a Talent type",
        variant: "destructive",
      });
      return;
    }
    if (user !== null) {
      try {
        const response = await campaignAuthAxiosInstance.post(
          `/invite-to-project`,
          [
            {
              opportunities: selectedTalentType,
              projectId: selectedProject._id,
              talentId: selectedTalent._id,
            },
          ],
          {
            headers: {
              Authorization: `Bearer ${user.authKey || ""}`,
            },
          }
        );
        // socket?.emit("new-notifiactions");

        setIsLoading(false);
        // setSuccessModal(false);
        setProjectModal(!projectModal);
        setSuccessModal(true);

        return setTimeout(() => {
          setSuccessModal(false);
          setProjectModal(false);
        }, 3000);
      } catch (error: any) {
        setIsLoading(false);
        toast({
          description: error?.response?.data?.message,
          variant: "destructive",
        });
      }
    }
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
                  Invite Talent to Project - {selectedProject?.projectTitle}
                </p>
                <button onClick={() => setProjectModal(false)}>x</button>
              </div>
              <div className="flex justify-center items-center items-center p-4  rounded-b-lg">
                <div className=" max-w-[800px] w-full flex flex-col items-end gap-3 ">
                  <Card className="flex flex-col p-5 w-full gap-4">
                    <div className="bg-bm__pink__bg p-3 w-full">
                      <p className="text-bm__grey__text__100">
                        The talent will receive a notification to apply for the
                        project
                      </p>
                    </div>
                    <Select
                      onValueChange={(e) => setSelectedTalentType(e)}
                      defaultValue={selectedTalentType || ""}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Talent Type" />
                      </SelectTrigger>
                      <SelectContent className="z-[2500] bg-white">
                        <SelectGroup>
                          {/* <SelectLabel>Brand Ambassador</SelectLabel> */}
                          <SelectItem value="brand-ambassador">
                            Brand Ambassador
                          </SelectItem>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="supervisor">Supervisor</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Card>
                  <div className="">
                    <button onClick={handleInvite} className="dark___btn">
                      Invite
                    </button>{" "}
                  </div>
                </div>
              </div>
            </div>

            {/* <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent> */}
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
