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

import { useState } from "react";

import { RootState } from "../../../redux/store";
import { patchAxiosInstance } from "../../../api/axios";
import useDeleteCenter from "../../../hooks/modals/useDeleteCenter";
import { toast } from "../../../ui/use-toast";
import useLoading from "../../../hooks/modals/useLoading";

export default function DeleteCenter() {
  const { isOpen, onClose, setData, data } = useDeleteCenter();
  const user = useSelector((state: RootState) => state.user);
  const loading = useLoading();

  const onCancel = () => {
    onClose();
    setData(null);
  };
  // 2. Define a submit handler.
  const datas = data?.data;

  async function onSubmit() {
    loading.onOpen();
    if (user?.user?.accountId !== undefined) {
      try {
        const response = await patchAxiosInstance.delete(
          `/delete-training-centre/${datas._id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
        toast({
          description: "Center successfully deleted",
        });
      } catch (error: any) {
        console.error("Error submitting form:", error);
        if (error.response && error.response.status === 400) {
          // Extract and display the specific error message from the API response
          toast({
            description: error?.response?.data?.message,
            variant: "destructive",
          });
        } else {
          // Display a generic error message for other error scenarios
          toast({
            description: error?.response?.data?.message,
            variant: "destructive",
          });
        }
      } finally {
        loading.onClose();
      }
    }
  }
  if (!data) {
    return null;
  }
  return (
    <AlertDialog onOpenChange={onClose} open={isOpen} defaultOpen={isOpen}>
      <AlertDialogContent className="p-0 bg-white">
        <AlertDialogHeader className=" p-4 md:p-6 bg-[#343637] text-white rounded-t-lg">
          <AlertDialogTitle>
            Delete Center - {datas?.centreName}, {datas?.location}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="space-y-4 p-4">
          <h4 className="font-medium text-lg md:text-xl">
            Are you sure you want to delete this training center?
          </h4>
          <p>
            This training center will be deleted completely from the system.
          </p>
        </div>
        <AlertDialogFooter className="p-4 mt-0">
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={onSubmit}
            className="text-white   bg-[#800000] hover:bg-rose-400"
          >
            Confirm Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
