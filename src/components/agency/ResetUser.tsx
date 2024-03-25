import { Button } from "../../ui/button";
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import useResetUser from "../../hooks/modals/UserReset";
import axiosInstance from "../../api/axios";
import { toast } from "../../ui/use-toast";

const formSchema = z.object({
  type: z.enum(["all", "mentions"], {
    required_error: "You need to select a notification type.",
  }),
  password: z.string().optional(),
});

export default function ResetUser() {
  const { isOpen, onClose, data, setData } = useResetUser();

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const datas = data?.data;

  const onCancel = () => {
    onClose();
    form.reset();
    setData(null);
  };
  const password = form.watch("type");

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("fhfh");
    if (password === "mentions") {
      try {
        const url = "/forgot-password";
        const response = await axiosInstance.patch(url + `/${datas?._id}`, {
          password: values.password,
        });

        toast({
          description: "User successfully updated",
        });
        onCancel();
      } catch (error: any) {
        console.error("Error submitting form:", error);
        if (error.response && error.response.status === 400) {
          // Extract and display the specific error message from the API response
          toast({
            description:
              error?.response?.data?.message || error?.response?.data?.error,
            variant: "destructive",
          });
        } else {
          // Display a generic error message for other error scenarios
          toast({
            description:
              error?.response?.data?.error || error?.response?.data?.message,
            variant: "destructive",
          });
        }
      } finally {
      }
    } else {
      try {
        const url = "/forgot-password";
        const response = await axiosInstance.post(url, {
          email: datas.email,
        });
        console.log(response);
        toast({
          description: "An email has been sent to the user.",
        });
        onCancel();
      } catch (error: any) {
        console.error("Error submitting form:", error);
        if (error.response && error.response.status === 400) {
          // Extract and display the specific error message from the API response
          toast({
            description:
              error?.response?.data?.message || error?.response?.data?.error,
            variant: "destructive",
          });
        } else {
          // Display a generic error message for other error scenarios
          toast({
            description:
              error?.response?.data?.error || error?.response?.data?.message,
            variant: "destructive",
          });
        }
      } finally {
      }
    }
  }

  return (
    <Dialog onOpenChange={onCancel} open={isOpen} modal defaultOpen={isOpen}>
      <DialogContent className="bg-white lg:max-w-[900px] p-0 rounded-t-lg">
        <DialogHeader className=" p-4 md:p-6 bg-[#343637] capitalize text-white rounded-t-lg">
          <DialogTitle>
            Reset Password - {datas?.firstName} {datas?.lastName}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 py-4"
          >
            <div>
              <div className="">
                <p className="text-base m-4 font-medium">Password</p>
                <div className="mx-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="all" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Allow user to reset password (A link will be
                                sent to the user&apos;s email to reset his/her
                                password)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="mentions" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Create password
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="relative">
                  {password === "mentions" && (
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="w-full p-4 h-12 relative mt-2"
                              placeholder="Password *"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <div className="w-full mx-4 flex justify-between">
                <Button
                  variant="ghost"
                  className="border h-12"
                  onClick={() => {
                    onClose();
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="ghost"
                  className="bg-[#63666A] text-white py-4 h-12"
                  type="submit"
                >
                  Reset Password
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
