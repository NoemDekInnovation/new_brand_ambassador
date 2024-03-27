import { useSelector } from "react-redux";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { RootState } from "../../redux/store";

export const TalentInvitationModal = ({
  projectModal,
  setProjectModal,
  project,
}: {
  project: any;
  projectModal: boolean;
  setProjectModal: any;
}) => {
  const { selectedProject } = useSelector(
    (state: RootState) => state.newProjects
  );

  return (
    <Dialog open={projectModal} onOpenChange={setProjectModal}>
      {projectModal && (
        <div className=" p-4 h-screen fixed inset-0 bg-black/20 z-[2000] flex justify-center">
          <div className="sm:max-w-[950px] w-full  bg-white text-black m-auto mx-3 rounded-b-lg">
            <div className="bg-black p-3 w-full justify-between text-white flex items-center capitalize">
              <p>Invite Talent to Project - {selectedProject?.projectTitle}</p>
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
                  <Select>
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
                  <button
                    onClick={() => setProjectModal(false)}
                    className="dark___btn"
                  >
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
  );
};
