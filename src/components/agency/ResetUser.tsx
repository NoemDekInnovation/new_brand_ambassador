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

import { patchAxiosInstance } from "../../api/axios";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import useResetUser from "../../hooks/modals/UserReset";

const formSchema = z.object({
  type: z.enum(["all", "mentions"], {
    required_error: "You need to select a notification type.",
  }),
  password: z.string(),
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
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {}
  const password = form.watch("type");

  return (
    <Dialog onOpenChange={onCancel} open={isOpen} modal defaultOpen={isOpen}>
      <DialogContent className="bg-white lg:max-w-[900px] p-0 rounded-t-lg">
        <DialogHeader className=" p-4 md:p-6 bg-[#343637] text-white rounded-t-lg">
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
              <div className="border-t p-4">
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
                                Allow user to create password on his/her first
                                login attempt
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
              <div className="w-full flex justify-between">
                <Button
                  variant="ghost"
                  onClick={() => {
                    onClose();
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
                <Button variant="ghost" type="submit">
                  Save
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
