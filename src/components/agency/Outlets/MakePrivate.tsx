import { Button } from "../../../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../ui/alert-dialog";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import { patchAxiosInstance } from "../../../api/axios";
import { useState } from "react";

import { toast } from "../../../ui/use-toast";
import useMakePrivate from "../../../hooks/modals/useMakePrivate";
import useLoading from "../../../hooks/modals/useLoading";

export default function MakePrivate() {
  const { isOpen, onClose, data, setData } = useMakePrivate();
  const user = useSelector((state: RootState) => state.user);
  const loading = useLoading();

  const onCancel = () => {
    onClose();
    setData(null);
  };
  // 2. Define a submit handler.
  const datas = data?.data;

  async function onSubmit() {
    try {
      loading.onOpen();

      if (!user?.user?.accountId) {
        throw new Error("User account ID is undefined");
      }

      const authToken = user?.user?.authKey || "";
      const response = await patchAxiosInstance.patch(
        `/publish-training-centre/${datas._id}`,
        { status: "private" },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      toast({
        description: "Center successfully made private",
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);

      if (error.response && error.response.status === 400) {
        toast({
          description: error.response.data.message || "Bad request",
          variant: "destructive",
        });
      } else if (error.response && error.response.status === 401) {
        toast({
          description: "Unauthorized. Please check your credentials.",
          variant: "destructive",
        });
      } else {
        toast({
          description: "An error occurred while processing your request.",
          variant: "destructive",
        });
      }
    } finally {
      loading.onClose();
    }
  }

  if (!data) {
    return null;
  }
  return (
    <AlertDialog onOpenChange={onCancel} open={isOpen} defaultOpen={isOpen}>
      <AlertDialogContent className="bg-white p-0">
        <AlertDialogHeader className=" p-4 md:p-6 bg-[#343637] text-white rounded-t-lg">
          <AlertDialogTitle>
            Make Training Center Private - {datas?.centreName},{" "}
            {datas?.location}.
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="space-y-4 p-4">
          <h4 className="font-medium text-lg md:text-xl">
            Are you sure you want to make this center private?{" "}
          </h4>
          <p>
            Training center will not be visible to all agencies on Campaign{" "}
          </p>
        </div>
        <AlertDialogFooter className="p-4 mt-0">
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={onSubmit}
            className="bg-[#63666A] text-white"
          >
            Make Private
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
