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
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";
import useAddOutlet from "../../../hooks/modals/useAddOutlet";
import { toast } from "../../../ui/use-toast";
import { FileUpload } from "./FileUpload";
import { StatesSelect } from "./SelectOption";

const formSchema = z.object({
  outletName: z.string(),
  outletType: z.string(),
  location: z.string(),
  contactEmail: z.string(),
  contactNumber: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  mondayStart: z.string(),
  mondayEnd: z.string(),
  tuesdayStart: z.string(),
  tuesdayEnd: z.string(),
  wednesdayStart: z.string(),
  wednesdayEnd: z.string(),
  thursdayStart: z.string(),
  thursdayEnd: z.string(),
  fridayStart: z.string(),
  fridayEnd: z.string(),
  sundayStart: z.string(),
  sundayEnd: z.string(),
  saturdayStart: z.string(),
  saturdayEnd: z.string(),

  outletPictures: z.any(),
});

export function AddOutletDialog() {
  const [loading, setLoading] = useState(false);
  const { isOpen, onClose } = useAddOutlet();

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
    // ✅ This will be type-safe and validated.
    const formdata = new FormData();
    formdata.append("outletName", values.outletName);
    formdata.append("outletType", values.outletType);
    formdata.append("contactEmail", values.contactEmail);
    formdata.append("contactNumber", values.contactNumber);
    formdata.append("street", values.street);
    formdata.append("state", values.state);
    formdata.append("city", values.city);
    formdata.append("location", values.location);
    formdata.append("zipCode", values.zipCode);
    formdata.append(
      "sunday",
      `${values.sundayStart + " - " + values.sundayEnd}`
    );
    formdata.append(
      "monday",
      `${values.mondayStart + " - " + values.mondayEnd}`
    );
    formdata.append(
      "tuesday",
      `${values.tuesdayStart + " - " + values.tuesdayEnd}`
    );
    formdata.append(
      "wednesday",
      `${values.wednesdayStart + " - " + values.wednesdayEnd}`
    );
    formdata.append(
      "thursday",
      `${values.thursdayStart + " - " + values.thursdayEnd}`
    );
    formdata.append(
      "friday",
      `${values.fridayStart + " - " + values.fridayEnd}`
    );
    formdata.append(
      "saturday",
      `${values.saturdayStart + " - " + values.saturdayEnd}`
    );

    for (let i = 0; i < values.outletPictures.length; i++) {
      formdata.append(`outletPictures`, values.outletPictures[i]);
    }
    if (user?.user?.accountId !== undefined) {
      try {
        const response = await mediaAxiosInstance.post(
          `/create-outlet`,
          formdata,
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
        toast({
          description: "Outlet successfully created",
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
        setLoading(false);
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
          <DialogTitle className="md:text-xl">Add Outlet</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <div className="grid gap-4">
            <div className="grid  items-center gap-4 mx-2 md:mx-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="rounded-lg border space-y-4 h-[70vh] overflow-y-auto sidebar-scroll">
                    <p className=" mx-4 my-2 text-sm font-medium">
                      Outlet Information
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4">
                      <FormField
                        control={form.control}
                        name="outletName"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="w-full p-4 h-12 relative"
                                disabled={loading}
                                placeholder="Outlet Name *"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="outletType"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="w-full p-4 h-12 relative"
                                disabled={loading}
                                placeholder="Outlet Type"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  px-4">
                      <FormField
                        control={form.control}
                        name="location"
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
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className=" space-y-4 border-y-1 p-4">
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
                          name="city"
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
                      </div>
                    </div>

                    <div className=" space-y-4 border-b-1 p-4">
                      <p className="text-sm font-medium">
                        Working Days And Hours
                      </p>
                      <div className="space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-x-12">
                        <div className="flex items-center gap-2">
                          <Label className="w-24 text-sm">Monday</Label>
                          <FormField
                            control={form.control}
                            name="mondayStart"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-fit p-4 h-12 relative"
                                    disabled={loading}
                                    type="time"
                                    placeholder="First Name"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <span>-</span>
                          <FormField
                            control={form.control}
                            name="mondayEnd"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-fit p-4 h-12 relative"
                                    disabled={loading}
                                    type="time"
                                    placeholder="First Name"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="w-24 text-sm">Friday</Label>
                          <FormField
                            control={form.control}
                            name="fridayStart"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-fit p-4 h-12 relative"
                                    disabled={loading}
                                    type="time"
                                    placeholder="First Name"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <span>-</span>
                          <FormField
                            control={form.control}
                            name="fridayEnd"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-fit p-4 h-12 relative"
                                    disabled={loading}
                                    type="time"
                                    placeholder="First Name"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>{" "}
                        <div className="flex items-center gap-2">
                          <Label className="w-24 text-sm">Tuesday</Label>
                          <FormField
                            control={form.control}
                            name="tuesdayStart"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-fit p-4 h-12 relative"
                                    disabled={loading}
                                    type="time"
                                    placeholder="First Name"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <span>-</span>
                          <FormField
                            control={form.control}
                            name="tuesdayEnd"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-fit p-4 h-12 relative"
                                    disabled={loading}
                                    type="time"
                                    placeholder="First Name"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="w-24 text-sm">Saturday</Label>
                          <FormField
                            control={form.control}
                            name="saturdayStart"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-fit p-4 h-12 relative"
                                    disabled={loading}
                                    type="time"
                                    placeholder="First Name"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <span>-</span>
                          <FormField
                            control={form.control}
                            name="saturdayEnd"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-fit p-4 h-12 relative"
                                    disabled={loading}
                                    type="time"
                                    placeholder="First Name"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="w-24 text-sm">Wednesday</Label>
                          <FormField
                            control={form.control}
                            name="wednesdayStart"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-fit p-4 h-12 relative"
                                    disabled={loading}
                                    type="time"
                                    placeholder="First Name"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <span>-</span>
                          <FormField
                            control={form.control}
                            name="wednesdayEnd"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-fit p-4 h-12 relative"
                                    disabled={loading}
                                    type="time"
                                    placeholder="First Name"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="w-24 text-sm">Sunday</Label>
                          <FormField
                            control={form.control}
                            name="sundayStart"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-fit p-4 h-12 relative"
                                    disabled={loading}
                                    type="time"
                                    placeholder="First Name"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <span>-</span>
                          <FormField
                            control={form.control}
                            name="sundayEnd"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-fit p-4 h-12 relative"
                                    disabled={loading}
                                    type="time"
                                    placeholder="First Name"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="w-24 text-sm">Thursday</Label>
                          <FormField
                            control={form.control}
                            name="thursdayStart"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-fit p-4 h-12 relative"
                                    disabled={loading}
                                    type="time"
                                    placeholder="First Name"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <span>-</span>
                          <FormField
                            control={form.control}
                            name="thursdayEnd"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-fit p-4 h-12 relative"
                                    disabled={loading}
                                    type="time"
                                    placeholder="First Name"
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
                    <div className="space-y-4 px-4">
                      <p className="text-sm font-medium">
                        Attach Outlet Pictures
                      </p>
                      <FileUpload form={form} name="outletPictures" />
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
                      Add Outlet
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
