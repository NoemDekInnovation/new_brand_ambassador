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
import useLoading from "../../../hooks/modals/useLoading";
import useMakePrivateOutlet from "../../../hooks/modals/useMakePrivateOutlet";

export default function MakePrivateOutlet() {
  const { isOpen, onClose, data, setData } = useMakePrivateOutlet();
  const user = useSelector((state: RootState) => state.user);
  const loading = useLoading();

  const onCancel = () => {
    onClose();
    setData(null);
  };
  // 2. Define a submit handler.
  const datas = data?.data;

  async function onSubmit() {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    loading.onOpen();
    if (user?.user?.accountId !== undefined) {
      try {
        const response = await patchAxiosInstance.patch(
          `/publish-outlet/${datas._id}?status=private`,

          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
        toast({
          description: "Outlet successfully made private",
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
    <AlertDialog onOpenChange={onCancel} open={isOpen} defaultOpen={isOpen}>
      <AlertDialogContent className="bg-white p-0">
        <AlertDialogHeader className=" p-4 md:p-6 bg-[#343637] text-white rounded-t-lg">
          <AlertDialogTitle>
            Make Outlet Private - {datas?.centreName}, {datas?.location}.
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="space-y-4 p-4">
          <h4 className="font-medium text-lg md:text-xl">
            Are you sure you want to make this outlet private?{" "}
          </h4>
          <p>Outlet will not be visible to all agencies on Campaign </p>
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
