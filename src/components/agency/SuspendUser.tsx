import { Button } from "../../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../ui/alert-dialog";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { patchAxiosInstance } from "../../api/axios";
import { useState } from "react";

import useSuspendUser from "../../hooks/modals/useSuspendUser";
import { toast } from "../../ui/use-toast";

export default function SuspendUser() {
  const { isOpen, onClose, data, setData } = useSuspendUser();
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
        const response = await patchAxiosInstance.post(
          `/suspend-staff/${datas._id}?suspendAction=suspend`,
          {
            firstName: datas?.firstName,
            lastName: datas?.lastName,
            phone: datas?.phone,
            IDNumber: datas?.IDNumber,
          },
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
        toast({
          description: "User successfully suspended",
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
    <AlertDialog onOpenChange={onCancel} open={isOpen} defaultOpen={isOpen}>
      <AlertDialogContent className="bg-white p-0">
        <AlertDialogHeader className=" p-4 md:p-6 bg-[#343637] text-white rounded-t-lg">
          <AlertDialogTitle>
            Suspend User - {datas?.firstName} {datas?.lastName}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="space-y-4 p-4">
          <h4 className="font-medium text-lg md:text-xl">
            Are you sure you want to suspend this user?
          </h4>
          <p>
            This user&apos;s account will be suspend and user won&apos;t have be
            able to log-in.
          </p>
        </div>
        <AlertDialogFooter className="p-4 mt-0">
          <AlertDialogAction
            onClick={onSubmit}
            className="text-white   bg-[#63666A] hover:bg-gray-400"
          >
            Unsuspend User
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
