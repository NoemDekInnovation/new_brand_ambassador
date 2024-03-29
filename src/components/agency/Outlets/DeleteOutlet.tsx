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
import useDeleteOutlet from "../../../hooks/modals/useDeleteOutlet";

export default function DeleteOutlet() {
  const { isOpen, onClose, setData, data } = useDeleteOutlet();
  const user = useSelector((state: RootState) => state.user);

  const onCancel = () => {
    onClose();
    setData(null);
  };
  // 2. Define a submit handler.
  const datas = data?.data;

  async function onSubmit() {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (user?.user?.accountId !== undefined) {
      try {
        const response = await patchAxiosInstance.delete(
          `/delete-outlet/${datas._id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
        toast({
          description: "Outlet successfully deleted",
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
            Delete Outlet - {datas?.outletName}, {datas?.location}.
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="space-y-4 p-4">
          <h4 className="font-medium text-lg md:text-xl">
            Are you sure you want to delete this outlet?
          </h4>
          <p>This outlet will be deleted completely from the system.</p>
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
