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
import useCreateUser from "../../hooks/modals/UserCreate";
import { toast } from "../../ui/use-toast";
import useLoading from "../../hooks/modals/useLoading";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string().min(11).max(11),
  IDNumber: z.string(),
  password: z.string().optional(),
  type: z.enum(["all", "mentions"], {
    required_error: "You need to select a password option.",
  }),
});

export function CreateUserDialog() {
  const [loading, setLoading] = useState(false);
  const { isOpen, onClose } = useCreateUser();
  const loadingCase = useLoading();

  const user = useSelector((state: RootState) => state.user);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const onCancel = () => {
    onClose();
    form.reset();
  };
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    setLoading(true);
    loadingCase.onOpen();
    // ✅ This will be type-safe and validated.
    if (user?.user?.accountId !== undefined) {
      try {
        const response = await patchAxiosInstance.post(
          `/create-staff`,
          values,
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
        toast({
          description: "User successfully created",
        });
        form.reset();
        onClose();
      } catch (error: any) {
        console.error("Error submitting form:", error);
        if (error.response && error.response.status === 400) {
          // Extract and display the specific error message from the API response
          toast({
            description:
              error?.response?.data?.error || error?.response?.data?.message,
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
        loadingCase.onClose();
      }
    }
  }

  // const handleSubmit = async () => {
  //   setLoading(true);

  //   const formData = new FormData();

  // };
  const password = form.watch("type");

  return (
    <Dialog onOpenChange={onCancel} open={isOpen} modal defaultOpen={isOpen}>
      <DialogContent className="bg-white lg:max-w-[900px] gap-0 p-0 rounded-t-lg">
        <DialogHeader className=" p-4 md:p-6 bg-[#343637] text-white rounded-t-lg">
          <DialogTitle className="md:text-xl">Create User</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <div className="grid gap-4">
            <div className="grid  items-center gap-4 mx-2 md:mx-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="rounded-lg border space-y-4">
                    <p className="text-base m-4 font-medium">
                      User Information
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
                      <FormField
                        control={form.control}
                        name="IDNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="w-full p-4 h-12 relative"
                                disabled={loading}
                                placeholder="User ID *"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="w-full p-4 h-12 relative"
                                disabled={loading}
                                placeholder="First Name"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="w-full p-4 h-12 relative"
                                disabled={loading}
                                placeholder="Last Name"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4  px-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="w-full p-4 h-12 relative"
                                disabled={loading}
                                placeholder="Email"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="w-full p-4 h-12 relative"
                                disabled={loading}
                                placeholder="Phone Number"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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
                                      Allow user to create password on first
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

                  <DialogFooter className="py-2 mt-0 mb-0 m-0">
                    <Button
                      type="submit"
                      className="bg-[#63666A] text-white py-4 h-12"
                    >
                      Create User
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
