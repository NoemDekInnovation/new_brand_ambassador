import { Button } from "../../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import useOutletOverview from "../../../hooks/modals/useOutletOverview";

import useDeleteOutlet from "../../../hooks/modals/useDeleteOutlet";
import useUpdateOutlet from "../../../hooks/modals/useUpdateOutlet";
import useManageOutlet from "../../../hooks/modals/useManageOutlet";
import useMakePublicOutlet from "../../../hooks/modals/useMakePublicOutlet";
import useMakePrivateOutlet from "../../../hooks/modals/useMakePrivateOutlet";

const formSchema = z.object({
  outletName: z.string().optional(),
  outletType: z.string().optional(),
  location: z.string().optional(),
  contactEmail: z.string().optional(),
  contactNumber: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  mondayStart: z.string().optional(),
  mondayEnd: z.string().optional(),
  tuesdayStart: z.string().optional(),
  tuesdayEnd: z.string().optional(),
  wednesdayStart: z.string().optional(),
  wednesdayEnd: z.string().optional(),
  thursdayStart: z.string().optional(),
  thursdayEnd: z.string().optional(),
  fridayStart: z.string().optional(),
  fridayEnd: z.string().optional(),
  sundayStart: z.string().optional(),
  sundayEnd: z.string().optional(),
  saturdayStart: z.string().optional(),
  saturdayEnd: z.string().optional(),

  outletPictures: z.any(),
});

export function OutletOverview() {
  const [index, setIndex] = useState(0);
  const { isOpen, onClose, data } = useOutletOverview();
  const deleteUser = useDeleteOutlet();
  const updateUser = useUpdateOutlet();
  const managePicture = useManageOutlet();
  const makePrivate = useMakePrivateOutlet();
  const makePublic = useMakePublicOutlet();
  const user = useSelector((state: RootState) => state.user);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const onCancel = () => {
    onClose();
    form.reset();
  };
  const datas = data?.data;

  return (
    <Dialog onOpenChange={onCancel} open={isOpen} modal defaultOpen={isOpen}>
      <DialogContent className="bg-white text-[#343637] lg:max-w-[80vw] p-0 rounded-t-lg">
        <div className="p-4">
          <div className="grid gap-4">
            <div className="grid  items-center gap-4 mx-2 md:mx-4">
              <div className=" space-y-4 h-[80vh] grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto sidebar-scroll">
                <div className="h-full">
                  <div className="h-4/5 w-full overflow-hidden">
                    <img
                      src={datas?.outletPictures[index]}
                      alt="pictures"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="h-1/5 w-full flex overflow-x-scroll sidebar-scroll">
                    {datas?.outletPictures.length > 0 &&
                      datas?.outletPictures.map((item: string, i: number) => (
                        <div
                          key={i}
                          className={` w-24 h-24 aspect-square relative cursor-pointer`}
                          onClick={() => setIndex(i)}
                        >
                          <img
                            src={item}
                            alt="shs"
                            className="object-cover aspect-square"
                          />
                        </div>
                      ))}
                  </div>
                </div>
                <div className="border h-full">
                  <h4 className="px-4 pt-4 text-xl md:text-2xl font-semibold">
                    {datas?.outletName}, {datas?.location}
                  </h4>
                  <div className="m-4 space-y-4 rounded-lg px-4">
                    <div className="flex gap-4 items-center">
                      <div className="w-40 text-sm">
                        <p>Outlet Name</p>
                      </div>
                      <div className=" text-sm">
                        <p>{datas?.outletName}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="w-40 text-sm">
                        <p>Outlet Type</p>
                      </div>
                      <div className=" text-sm">
                        <p>{datas?.outletType}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="w-40 text-sm">
                        <p>Outlet Status</p>
                      </div>
                      <div className=" text-sm">
                        <p>{datas?.metaData?.status}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="w-40 text-sm">
                        <p>Location</p>
                      </div>
                      <div className=" text-sm">
                        <p>{datas?.location}</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-center">
                      <div className="w-40 text-sm">
                        <p>Contact Email</p>
                      </div>
                      <div className=" text-sm">
                        <p>{datas?.contactEmail}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="w-40 text-sm">
                        <p>Contact Number</p>
                      </div>
                      <div className=" text-sm">
                        <p>{datas?.contactNumber}</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-center">
                      <div className="w-40 text-sm">
                        <p>Address</p>
                      </div>
                      <div className=" text-sm">
                        <p>
                          {datas?.address?.street}, {datas?.address?.city},{" "}
                          {datas?.address?.zipCode}, {datas?.address?.state}.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t flex flex-col justify-between p-4 space-y-4">
                    <div>
                      <p className="text-sm font-semibold">
                        Opening Days And Hours
                      </p>
                    </div>
                    <div className="space-y-2 px-4">
                      <div className="flex items-center gap-4">
                        <p className="text-sm w-40">Sunday</p>
                        <p className="text-sm">
                          {datas?.workingHours?.sunday || "Closed"}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-sm w-40">Monday</p>
                        <p className="text-sm">
                          {datas?.workingHours?.monday || "Closed"}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-sm w-40">Tuesday</p>
                        <p className="text-sm">
                          {datas?.workingHours?.tuesday || "Closed"}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-sm w-40">Wednesday</p>
                        <p className="text-sm">
                          {datas?.workingHours?.wednesday || "Closed"}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-sm w-40">Thursday</p>
                        <p className="text-sm">
                          {datas?.workingHours?.thursday || "Closed"}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-sm w-40">Friday</p>
                        <p className="text-sm">
                          {datas?.workingHours?.friday || "Closed"}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-sm w-40">Saturday</p>
                        <p className="text-sm">
                          {datas?.workingHours?.saturday || "Closed"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-end gap-2 p-2">
                    <Button
                      onClick={() => {
                        managePicture.setData(datas);
                        managePicture.onOpen();
                      }}
                      className="bg-[#F7F7F7] text-black w-full"
                    >
                      Manage Pictures
                    </Button>
                    <Button
                      onClick={() => {
                        updateUser.setData(datas);
                        updateUser.onOpen();
                      }}
                      className="border w-full"
                    >
                      Update
                    </Button>
                    {datas?.metaData?.status === "public" ? (
                      <Button
                        className="t p-3 hover:bg-white/70"
                        onClick={() => {
                          makePrivate.setData(datas);
                          makePrivate.onOpen();
                        }}
                      >
                        Make Private
                      </Button>
                    ) : (
                      <Button
                        className="t p-3 hover:bg-white/70"
                        onClick={() => {
                          makePublic.setData(datas);
                          makePublic.onOpen();
                        }}
                      >
                        Make Public
                      </Button>
                    )}
                    <Button
                      onClick={() => {
                        deleteUser.setData(datas);
                        deleteUser.onOpen();
                      }}
                      variant={"destructive"}
                      className="border w-full"
                    >
                      Delete
                    </Button>
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
