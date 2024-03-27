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

import useUpdateUser from "../../hooks/modals/useUpdateUser";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { patchAxiosInstance } from "../../api/axios";
import { useState } from "react";
import { toast } from "../../ui/use-toast";
import useLoading from "../../hooks/modals/useLoading";

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  IDNumber: z.string().optional(),
  email: z.string().optional(),
});

export default function UpdateUser() {
  const { isOpen, onClose, data, setData } = useUpdateUser();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const loadingCase = useLoading();

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onCancel = () => {
    onClose();
    form.reset();
    setData(null);
  };
  const datas = data?.data;
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);
    loadingCase.onOpen();

    if (user?.user?.accountId !== undefined) {
      try {
        const response = await patchAxiosInstance.patch(
          `/edit-staff/${datas._id}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
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
        setLoading(false);
        loadingCase.onClose();
      }
    }
  }
  if (!data) {
    return null;
  }

  return (
    <Dialog onOpenChange={onCancel} open={isOpen} modal defaultOpen={isOpen}>
      <DialogContent className="bg-white lg:max-w-[900px] p-0 rounded-t-lg">
        <DialogHeader className=" p-4 md:p-6 bg-[#343637] text-white rounded-t-lg">
          <DialogTitle>
            Update User - {datas?.firstName} {datas?.lastName}
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <div className="grid gap-4 py-4">
            <div className="grid  items-center gap-4 mx-2 md:mx-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="rounded-lg border space-y-8">
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
                                placeholder="IDNumber *"
                                defaultValue={datas?.IDNumber}
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
                                placeholder="First Name"
                                defaultValue={datas?.firstName}
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
                                placeholder="Last Name"
                                defaultValue={datas?.lastName}
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4  px-4">
                      <div>
                        <Input
                          className="w-full p-4 h-12 relative"
                          placeholder="email"
                          defaultValue={datas?.email}
                          disabled
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="w-full p-4 h-12 relative"
                                placeholder="Phone Number"
                                defaultValue={datas?.phone}
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      type="submit"
                      className="bg-[#63666A] text-white py-4 h-12"
                    >
                      {loading && (
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="inline w-4 h-4 mr-3 text-white animate-spin"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          />
                        </svg>
                      )}
                      Update User
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
