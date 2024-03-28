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

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import { mediaAxiosInstance, patchAxiosInstance } from "../../../api/axios";
import { toast } from "../../../ui/use-toast";
import { FileUpload } from "./FileUpload";
import { OutletType, StatesSelect } from "./SelectOption";
import useCreateTraining from "../../../hooks/modals/UserCreateTraining";
import useLoading from "../../../hooks/modals/useLoading";
import useUpdateCenter from "../../../hooks/modals/useUpdateCenter";

const formSchema = z.object({
  centerName: z.string().optional(),
  location: z.string().optional(),
  contactEmail: z.string().optional(),
  contactNumber: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),

  centrePictures: z.any(),
});

export function UpdateTrainDialog() {
  const [loading, setLoading] = useState(false);
  const { isOpen, onClose, data } = useUpdateCenter();
  const loadingCase = useLoading();

  const user = useSelector((state: RootState) => state.user);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const onCancel = () => {
    onClose();
    form.reset();
  };

  const datas = data?.data;
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    loadingCase.onOpen();
    // ✅ This will be type-safe and validated.
    const formdata = new FormData();
    if (values.centerName) {
      formdata.append("centreName", values.centerName);
    }
    if (values.contactEmail) {
      formdata.append("contactEmail", values.contactEmail);
    }
    if (values.contactNumber) {
      formdata.append("contactNumber", values.contactNumber);
    }
    if (values.street) {
      formdata.append("street", values.street);
    }
    if (values.state) {
      formdata.append("state", values.state);
    }
    if (values.city) {
      formdata.append("city", values.city);
    }
    if (values.location) {
      formdata.append("location", values.location);
    }
    if (values.zipCode) {
      formdata.append("zipCode", values.zipCode);
    }

    for (let i = 0; i < values.centrePictures.length; i++) {
      formdata.append(`centrePictures`, values.centrePictures[i]);
    }
    if (user?.user?.accountId !== undefined) {
      try {
        const response = await mediaAxiosInstance.put(
          `/edit-training-centre`,
          formdata,
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
        toast({
          description: "Center successfully edited.",
        });
        form.reset();
        onClose();
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
        loadingCase.onClose();
      }
    }
  }

  // const handleSubmit = async () => {
  //   setLoading(true);

  //   const formData = new FormData();

  // };

  return (
    <Dialog onOpenChange={onCancel} open={isOpen} modal defaultOpen={isOpen}>
      <DialogContent className="bg-white text-[#343637] lg:max-w-[900px] p-0 rounded-t-lg">
        <DialogHeader className=" p-4 md:p-6 bg-[#343637] text-white rounded-t-lg">
          <DialogTitle className="md:text-xl">
            Update Training Center
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <div className="grid gap-4">
            <div className="grid  items-center gap-4 mx-2 md:mx-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="rounded-lg border space-y-8 h-[45vh] overflow-y-auto sidebar-scroll">
                    <p className=" mx-4 my-2 text-sm font-medium">
                      Center Information
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2  gap-4  px-4">
                      <FormField
                        name="centerName"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="w-full p-4 h-12 relative"
                                disabled={loading}
                                placeholder="Center Name"
                                defaultValue={datas?.centreName}
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="w-full p-4 h-12 relative"
                                disabled={loading}
                                placeholder="Location*"
                                defaultValue={datas?.location}
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="w-full p-4 h-12 relative"
                                disabled={loading}
                                type="email"
                                placeholder="Contact Email"
                                defaultValue={datas?.contactEmail}
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="contactNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="w-full p-4 h-12 relative"
                                disabled={loading}
                                placeholder="Contact Number"
                                defaultValue={datas?.contactNumber}
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className=" space-y-4 border-y-1 md:px-4 px-2">
                      <p className="text-sm font-medium">Address</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="street"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className="w-full p-4 h-12 relative"
                                  disabled={loading}
                                  placeholder="Street"
                                  defaultValue={datas?.address?.street}
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className="w-full p-4 h-12 relative"
                                  disabled={loading}
                                  placeholder="City"
                                  defaultValue={datas?.address?.city}
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          name="state"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <StatesSelect
                                defaultValue={datas?.address?.state}
                                field={field}
                              />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className="w-full p-4 h-12 relative"
                                  disabled={loading}
                                  placeholder="Postal Code"
                                  defaultValue={datas?.address?.zipCode}
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      type="submit"
                      className="bg-[#63666A] text-white py-4 h-12"
                    >
                      Add Center
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
