import React, { useState } from "react";
import SignatureCanvas from "react-signature-canvas";

export const SignaturePad = () => {
  const [sign, setSign] = useState<any>(null);
  const [url, setUrl] = useState("");

  const handleClear = () => {
    sign?.clear();
    setUrl("");
  };
  const handleGenerate = () => {
    setUrl(sign.getTrimmedCanvas().toDataURL("image/png"));
  };

  console.log(url);

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
