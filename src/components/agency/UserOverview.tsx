import { Button } from "../../ui/button";
import { Dialog, DialogContent } from "../../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

import { useState } from "react";

import useUserOverview from "../../hooks/modals/useUserOverview";
import useUpdateUser from "../../hooks/modals/useUpdateUser";
import useSuspendUser from "../../hooks/modals/useSuspendUser";
import useDeleteUser from "../../hooks/modals/useDeleteUser";
import useResetUser from "../../hooks/modals/UserReset";

import { format, formatDistance, subDays } from "date-fns";

export function UserOverview() {
  const [index, setIndex] = useState(0);
  const { isOpen, onClose, data, setData } = useUserOverview();
  const updateUser = useUpdateUser();
  const suspendUser = useSuspendUser();
  const deleteUser = useDeleteUser();
  const resetUser = useResetUser();

  const onCancel = () => {
    onClose();
    setData(null);
  };

  if (!data) {
    return null;
  }
  const datas = data?.data;
  console.log(datas);

  const profile = [
    {
      name: "User ID",
      value: datas?.IDNumber,
    },
    {
      name: "First Name",
      value: datas?.firstName,
    },
    {
      name: "Last Name",
      value: datas?.lastName,
    },
    {
      name: "Email",
      value: datas?.email,
    },
    {
      name: "Phone Number",
      value: datas?.phone,
    },
  ];

  const profileSec = [
    {
      name: "Last Log in",
      value: formatDistance(
        subDays(new Date(datas?.metaData?.lastOnline), 3),
        new Date(),
        { addSuffix: true }
      ),
    },
    {
      name: "Duration",
      value: "----",
    },
    {
      name: "Created On",
      value: format(new Date(datas?.createdAt), "dd/MM/yyyy"),
    },
    {
      name: "Created By",
      value:
        datas?.metaData?.createdBy.firstName +
        " " +
        datas?.metaData?.createdBy.lastName,
    },
  ];

  console.log(datas);
  return (
    <Dialog onOpenChange={onCancel} open={isOpen} modal defaultOpen={isOpen}>
      <DialogContent className="bg-white text-[#343637] lg:max-w-[80vw] p-0 rounded-t-lg">
        <div className="p-4">
          <div className="grid gap-4">
            <div className="grid  items-center gap-4 mx-2 md:mx-4">
              <div className=" space-y-4 h-[75vh] overflow-y-auto sidebar-scroll">
                <div className="grid grid-cols-12 gap-8">
                  <div className="md:col-span-3 hidden md:block  border p-4 space-y-4">
                    <h4 className="text-2xl font-medium">
                      {datas?.firstName} {datas?.lastName}
                    </h4>
                    <p className="capitalize text-lg">
                      {datas?.metaData?.status}
                    </p>
                    <div className="space-y-4 flex-col flex">
                      <Button
                        className="bg-[#DDDFE0]"
                        onClick={() => {
                          updateUser.setData(datas);
                          updateUser.onOpen();
                        }}
                      >
                        Update User
                      </Button>
                      <Button
                        className="bg-[#DDDFE0]"
                        onClick={() => {
                          resetUser.setData(datas);
                          resetUser.onOpen();
                        }}
                      >
                        Reset Password
                      </Button>
                      <Button className="bg-[#DDDFE0]">Send Email</Button>
                      <Button
                        className="bg-[#DDDFE0]"
                        onClick={() => {
                          suspendUser.setData(datas);
                          suspendUser.onOpen();
                        }}
                      >
                        Suspend User
                      </Button>
                      <Button
                        className="bg-[#DDDFE0] text-red-900"
                        onClick={() => {
                          deleteUser.setData(datas);
                          deleteUser.onOpen();
                        }}
                      >
                        Delete User
                      </Button>
                    </div>
                  </div>
                  <div className="md:col-span-9 col-span-12">
                    <Tabs defaultValue="account" className="w-full">
                      <TabsList>
                        <TabsTrigger
                          value="account"
                          className="data-[state=active]:border-b-red-900"
                        >
                          User Details
                        </TabsTrigger>
                        <TabsTrigger
                          value="password"
                          className="data-[state=active]:border-b-red-900"
                        >
                          User Activities
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="account" className="py-6 px-2">
                        <div className="space-y-4">
                          {profile.map((item, i) => (
                            <div className="flex flex-row gap-4 items-center">
                              <div className="w-40">
                                <p className="text-xs">{item.name}</p>
                              </div>
                              <div>
                                <p className="text-xs ">{item.value}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-4 border p-4 rounded-lg my-4">
                          {profileSec.map((item, i) => (
                            <div className="flex flex-row gap-4 items-center">
                              <div className="w-40">
                                <p className="text-xs">{item.name}</p>
                              </div>
                              <div>
                                <p className="text-xs ">{item.value}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="password">
                        <p className="m-8 text-center">No activities yet.</p>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
