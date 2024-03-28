import Dropzone from "react-dropzone";
import { Controller } from "react-hook-form";

import { FileUp } from "lucide-react";
import { GrAttachment } from "react-icons/gr";

export const FileUpload = ({
  form,
  name,
  title,
}: {
  form: any;
  name: string;
  title?: string;
}) => {
  return (
    <Controller
      control={form.control}
      name={name}
      defaultValue={[]}
      render={({ field }) => (
        <>
          <Dropzone onDrop={field.onChange}>
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="bg-white px-4 py-6 text-center rounded-md w-full cursor-pointer border border-[#DDDFE0]"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    gap: 8,
                  }}
                >
                  <div className="">
                    <GrAttachment />
                  </div>
                  <p className="text-sm">
                    {title || "Attach pictures or videos"}
                  </p>
                </div>
                <input
                  {...getInputProps()}
                  multiple
                  name={name}
                  onBlur={field.onBlur}
                />
              </div>
            )}
          </Dropzone>
          <ul className="flex gap-1 flex-wrap">
            {field.value &&
              field.value.map((f: any, index: any) => (
                <li key={index} className="text-sm">
                  <img
                    src={URL.createObjectURL(f)}
                    alt="Uploaded File"
                    className="w-16 aspect-square object-contain"
                  />
                </li>
              ))}
          </ul>
        </>
      )}
    />
  );
};
