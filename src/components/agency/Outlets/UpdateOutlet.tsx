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
import { toast } from "../../../ui/use-toast";
import { FileUpload } from "./FileUpload";
import { StatesSelect } from "./SelectOption";
import useUpdateOutlet from "../../../hooks/modals/useUpdateOutlet";

const formSchema = z.object({
  outletName: z.string().optional(),
  outletType: z.string().optional(),
  location: z.string().optional(),
  contactEmail: z.string().optional(),
  contactNumber: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  mondayStart: z.string().optional(),
  mondayEnd: z.string().optional(),
  tuesdayStart: z.string().optional(),
  tuesdayEnd: z.string().optional(),
  wednesdayStart: z.string().optional(),
  wednesdayEnd: z.string().optional(),
  thursdayStart: z.string().optional(),
  thursdayEnd: z.string().optional(),
  fridayStart: z.string().optional(),
  fridayEnd: z.string().optional(),
  sundayStart: z.string().optional(),
  sundayEnd: z.string().optional(),
  saturdayStart: z.string().optional(),
  saturdayEnd: z.string().optional(),

  outletPictures: z.any(),
});

export function UpdateOutletDialog() {
  const [loading, setLoading] = useState(false);
  const { isOpen, onClose, data } = useUpdateOutlet();

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
    setLoading(true);
    // ✅ This will be type-safe and validated.
    const formdata = new FormData();

    if (values.outletName) formdata.append("outletName", values.outletName);
    if (values.outletType) formdata.append("outletType", values.outletType);
    if (values.contactEmail)
      formdata.append("contactEmail", values.contactEmail);
    if (values.contactNumber)
      formdata.append("contactNumber", values.contactNumber);
    if (values.street) formdata.append("street", values.street);
    if (values.state) formdata.append("state", values.state);
    if (values.city) formdata.append("city", values.city);
    if (values.location) formdata.append("location", values.location);
    if (values.zipCode) formdata.append("zipCode", values.zipCode);

    // Append working hours if both start and end times are provided
    if (values.sundayStart && values.sundayEnd)
      formdata.append("sunday", `${values.sundayStart} - ${values.sundayEnd}`);
    if (values.mondayStart && values.mondayEnd)
      formdata.append("monday", `${values.mondayStart} - ${values.mondayEnd}`);
    if (values.tuesdayStart && values.tuesdayEnd)
      formdata.append(
        "tuesday",
        `${values.tuesdayStart} - ${values.tuesdayEnd}`
      );
    if (values.wednesdayStart && values.wednesdayEnd)
      formdata.append(
        "wednesday",
        `${values.wednesdayStart} - ${values.wednesdayEnd}`
      );
    if (values.thursdayStart && values.thursdayEnd)
      formdata.append(
        "thursday",
        `${values.thursdayStart} - ${values.thursdayEnd}`
      );
    if (values.fridayStart && values.fridayEnd)
      formdata.append("friday", `${values.fridayStart} - ${values.fridayEnd}`);
    if (values.saturdayStart && values.saturdayEnd)
      formdata.append(
        "saturday",
        `${values.saturdayStart} - ${values.saturdayEnd}`
      );

    // Append outlet pictures if available

    if (user?.user?.accountId !== undefined) {
      try {
        const response = await mediaAxiosInstance.patch(
          `/edit-outlet/${datas._id}`,
          formdata,
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
        toast({
          description: "Outlet successfully updated.",
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
          <DialogTitle className="md:text-xl">
            Update Outlet - {datas?.outletName}, {datas?.location}.
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
                                defaultValue={datas?.outletName}
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
                                defaultValue={datas?.outletType}
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
                                placeholder="Location *"
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
                                field={field}
                                defaultValue={datas?.address?.state}
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
                                  type="number"
                                  min={0}
                                  placeholder="Zip code*"
                                  defaultValue={datas?.address.zipCode}
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
                      Update Outlet
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
