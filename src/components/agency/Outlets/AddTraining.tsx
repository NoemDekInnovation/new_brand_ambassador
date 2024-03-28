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
import CustomInput from "../../../ui/customInput";

const formSchema = z.object({
  centerName: z.string(),
  location: z.string(),
  contactEmail: z.string(),
  contactNumber: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),

  centrePictures: z.any(),
});

export function AddTrainDialog() {
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const { isOpen, onClose } = useCreateTraining();
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
    loadingCase.onOpen();
    // ✅ This will be type-safe and validated.
    const formdata = new FormData();
    formdata.append("centreName", values.centerName);
    formdata.append("contactEmail", values.contactEmail);
    formdata.append("contactNumber", values.contactNumber);
    formdata.append("street", values.street);
    formdata.append("state", values.state);
    formdata.append("city", values.city);
    formdata.append("location", values.location);
    formdata.append("zipCode", values.zipCode);

    for (let i = 0; i < values.centrePictures.length; i++) {
      formdata.append(`centrePictures`, values.centrePictures[i]);
    }
    if (user?.user?.accountId !== undefined) {
      try {
        const response = await mediaAxiosInstance.post(
          `/create-training-centre`,
          formdata,
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
        toast({
          description: "Center successfully created",
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
          <DialogTitle className="md:text-xl">Add Training Center</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <div className="grid gap-4">
            <div className="grid  items-center gap-4 mx-2 md:mx-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="rounded-lg border space-y-8 h-[55vh] overflow-y-auto sidebar-scroll">
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
                              <CustomInput
                                required
                                label="Center Name"
                                field={field}
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
                              <CustomInput
                                required
                                label="Location"
                                field={field}
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
                              <CustomInput
                                required
                                label="Contact Email"
                                field={field}
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
                              <CustomInput
                                required
                                label="Contact Number"
                                field={field}
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
                                <CustomInput
                                  required
                                  label="Street"
                                  field={field}
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
                                <CustomInput
                                  required
                                  label="City"
                                  field={field}
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
                              <StatesSelect field={field} />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <CustomInput
                                  required
                                  label="Zip code"
                                  field={field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-4 px-4">
                      <p className="text-sm font-medium">
                        Attach Center Pictures
                      </p>
                      <FileUpload form={form} name="centrePictures" />
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
