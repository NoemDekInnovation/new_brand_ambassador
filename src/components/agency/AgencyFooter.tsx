import { Card, CardHeader, CardTitle } from "../../ui/card";
import copyright from "../../assets/layer1.png";
import { Separator } from "../../ui/seperator";

const AgencyFooter = () => {
  return (
    <Card className="w-[300px] h-[200px] bg-white flex flex-col items-center text-center">
      <CardHeader>
        <CardTitle className="flex gap-2 font-semibold">
          <img
            src={copyright}
            alt=""
            className="w-[25px] h-[25px] object-contain"
          />
          <h1 className="font-semibold text-base">2023 Campaign</h1>
        </CardTitle>
      </CardHeader>
      <Separator className="w-2/3" />
      <div className="mt-2">
        <div className="flex flex-col items-center">
          <p className="text-lg font-medium">Terms of Service</p>
          <div className=" my-5"></div>
          <div className="flex items-center gap-5">
            <p className="text-lg font-medium mb-1">Privacy</p> 
            <div className="border-r border-gray-500 h-[15px] mx-3 w-[1px]"></div> 
            <p className="text-lg font-medium mb-1">Help</p> 
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AgencyFooter;
