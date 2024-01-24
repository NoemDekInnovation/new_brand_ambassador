import React, { useState } from "react";
import SignatureCanvas from "react-signature-canvas";

export const SignaturePad = ({ setUrl }: { setUrl: any }) => {
  const [sign, setSign] = useState<any>(null);
  // const [url, setUrl] = useState("");

  const handleClear = () => {
    sign?.clear();
    setUrl("");
  };
  const handleGenerate = () => {
    const blobImg = sign.getTrimmedCanvas().toDataURL("image/png");
    // const blobImg = dataURItoBlob(newImg);
    // const blobIm = base64toBlob(sign.getTrimmedCanvas(), "image/png");
    // console.log(blobIm);

    setUrl(blobImg);
  };

  // // Function to convert a data URI to a Blob
  // function dataURItoBlob(dataURI: any) {
  //   const byteString = atob(dataURI.split(",")[1]);
  //   const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  //   const ab = new ArrayBuffer(byteString.length);
  //   const ia = new Uint8Array(ab);
  //   for (let i = 0; i < byteString.length; i++) {
  //     ia[i] = byteString.charCodeAt(i);
  //   }
  //   return new Blob([ab], { type: mimeString });
  // }

  // function base64toBlob(base64String: string, mimeType: string) {
  //   const byteString = atob(base64String);
  //   const arrayBuffer = new ArrayBuffer(byteString.length);
  //   const uint8Array = new Uint8Array(arrayBuffer);

  //   for (let i = 0; i < byteString.length; i++) {
  //     uint8Array[i] = byteString.charCodeAt(i);
  //   }

  //   return new Blob([arrayBuffer], { type: mimeType });
  // }

  return (
    <div>
      <div className="w-full bg-white">
        {/* <div style={{ border: "2px solid black", width: 500, height: 200 }}> */}
        <SignatureCanvas
          canvasProps={{ width: 900, height: 200, className: "sigCanvas" }}
          ref={(data) => setSign(data)}
        />
      </div>

      <br></br>
      <button style={{ height: "30px", width: "60px" }} onClick={handleClear}>
        Clear
      </button>
      <button
        style={{ height: "30px", width: "60px" }}
        onClick={handleGenerate}
      >
        Save
      </button>

      <br />
      <br />
      {/* <img src={url} /> */}
    </div>
  );
};
