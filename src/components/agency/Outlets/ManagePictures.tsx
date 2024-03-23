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
import useManageOutlet from "../../../hooks/modals/useManageOutlet";

const formSchema = z.object({
  outletPictures: z.any(),
});

export function ManagePictures() {
  const [loading, setLoading] = useState(false);
  const { isOpen, onClose, data, setData } = useManageOutlet();

  const user = useSelector((state: RootState) => state.user);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [selectedIndices, setSelectedIndices] = useState<string[]>([]);

  const handleCheckboxChange = (index: string) => {
    // Toggle the selection of the index
    setSelectedIndices((prevSelectedIndices) => {
      if (prevSelectedIndices.includes(index)) {
        // If index is already selected, remove it
        return prevSelectedIndices.filter((i) => i !== index);
      } else {
        // If index is not selected, add it
        return [...prevSelectedIndices, index];
      }
    });
  };
  console.log(selectedIndices);
  const datas = data?.data;
  const onCancel = () => {
    onClose();
    form.reset();
    setData(null);
    setSelectedIndices([]);
  };
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    setLoading(true);
    // ✅ This will be type-safe and validated.
    const formdata = new FormData();

    for (let i = 0; i < values.outletPictures.length; i++) {
      formdata.append(`outletPictures`, values.outletPictures[i]);
    }
    if (user?.user?.accountId !== undefined) {
      try {
        const response = await mediaAxiosInstance.patch(
          `/edit-outlet-pictures/${datas._id}`,
          formdata,
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
        toast({
          description: "Outlet pictures successfully added.",
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

  async function deletePicturez() {
    // Do something with the form values.
    setLoading(true);
    // ✅ This will be type-safe and validated.

    if (user?.user?.accountId !== undefined) {
      try {
        const response = await mediaAxiosInstance.patch(
          `/edit-outlet-pictures/${datas._id}`,
          { picturesToBeDeleted: selectedIndices },
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
        toast({
          description: "Outlet pictures successfully deleted.",
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
  if (!datas) {
    return null;
  }

  return (
    <Dialog onOpenChange={onCancel} open={isOpen} modal defaultOpen={isOpen}>
      <DialogContent className="bg-white text-[#343637] lg:max-w-[900px] p-0 rounded-t-lg">
        <DialogHeader className=" p-4 md:p-6 bg-[#343637] text-white rounded-t-lg">
          <DialogTitle className="md:text-xl">
            Manage Outlet Pictures - {datas?.outletName}, {datas?.location}
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
                  <div className="space-y-4 overflow-y-auto sidebar-scroll h-[70vh]">
                    <div className="bg-[#F7F7F7] flex w-full items-center gap-4 p-4">
                      <FileUpload
                        title="Add or drop pictures or videos"
                        name="outletPictures"
                        form={form}
                      />
                      <Button
                        type="submit"
                        className="bg-[#63666A] text-white py-4 h-12"
                      >
                        Upload
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-0 ">
                      {datas?.outletPictures.length > 0 ? (
                        datas?.outletPictures.map((item: string, i: number) => (
                          <div
                            key={i}
                            className={` aspect-square relative cursor-pointer ${
                              selectedIndices.includes(item)
                                ? "border-blue-500 border-4"
                                : ""
                            }`}
                          >
                            <div className="absolute top-2 left-2 z-10">
                              <input
                                type="checkbox"
                                checked={selectedIndices.includes(item)}
                                onChange={() => handleCheckboxChange(item)}
                                className="bg-white w-4 h-4"
                              />
                            </div>

                            <img
                              src={item}
                              alt="shs"
                              className="object-cover aspect-square"
                            />
                          </div>
                        ))
                      ) : (
                        <div className="my-4">
                          <p>No pictures for the outlet</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      disabled={selectedIndices.length < 1}
                      onClick={deletePicturez}
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
                      Delete {selectedIndices.length > 0 && "Selected"}
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
