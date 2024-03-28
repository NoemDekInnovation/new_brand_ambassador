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

import useCenterOverview from "../../../hooks/modals/useCenterOverview";
import useDeleteCenter from "../../../hooks/modals/useDeleteCenter";
import useUpdateCenter from "../../../hooks/modals/useUpdateCenter";
import useManagePictureCenter from "../../../hooks/modals/useManagePicture";

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

export function CenterOverview() {
  const [index, setIndex] = useState(0);
  const { isOpen, onClose, data } = useCenterOverview();
  const deleteUser = useDeleteCenter();
  const updateUser = useUpdateCenter();
  const managePicture = useManagePictureCenter();

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
              <div className=" space-y-4 h-[75vh] grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto sidebar-scroll">
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
                        <p>Centre Name</p>
                      </div>
                      <div className=" text-sm">
                        <p>{datas?.centreName}</p>
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

                  <div className="flex justify-between items-end gap-4 p-4">
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
