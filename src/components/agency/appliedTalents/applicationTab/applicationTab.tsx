import react from "react";
import { ImCancelCircle } from "react-icons/im";
import { RiStackshareLine } from "react-icons/ri";
import { Separator } from "../../../../ui/seperator";
import { Card, CardContent } from "../../../../ui/card";

const ApplicationTab = ({
  popUp,
  setPopUp,
  select,
  setSelectedComponent,
}: //   selectedProject,
{
  setSelectedComponent: any;
  select: any;
  popUp: boolean;
  setPopUp: any;
  //   selectedProject: any;
  // workDays: [];
}) => {
  return (
    <div
      className={`fixed z-[1000] bg-black/50  w-[100%] items-center justify-end flex flex-col transition-all duration-1000 inset-0 ${
        popUp
          ? "translate-y-0 opacity-100 h-[100vh] -bottom-5"
          : "translate-y-[1000px] opacity-0 h-0"
      }`}
    >
      <Card className="p-4 relative bg-white w-[1280px] h-[95vh]">
        <span className="absolute top-0 right-0 text-sm text-[#6F797A] p-6 flex items-center gap-8">
          <button
            className="light__btn text-[14px] py-0"
            style={{ width: "100px" }}
          >
            <div className="flex items-center gap-2">
              <RiStackshareLine
                style={{
                  fontSize: "1em",
                  flex: "none",
                }}
              />
              <span>Share</span>
            </div>
          </button>
          <ImCancelCircle
            className="w-[20px] h-[20px] cursor-pointer"
            onClick={setPopUp}
          />
        </span>
        <div className="p-4">
          <p className="text-[18px] font-semibold">Talent Name</p>
        </div>
        <Separator className="bg-bm__gler/50" />
        <div className="flex items-center gap-4 px-7 mt-7">
          <p
            className="text-[12px] cursor-pointer hover:underline"
            onClick={() => setSelectedComponent(1)}
          >
            Profile
          </p>
          <p
            className="text-[12px] cursor-pointer hover:underline"
            onClick={() => setSelectedComponent(2)}
          >
            Application
          </p>
          <p
            className="text-[12px] cursor-pointer hover:underline"
            onClick={() => setSelectedComponent(3)}
          >
            Messages
          </p>
          <p
            className="text-[12px] cursor-pointer hover:underline"
            onClick={() => setSelectedComponent(4)}
          >
            Contract
          </p>
        </div>
        <Separator className="bg-[#D7D8DA]" />
        <p>Application</p>
      </Card>
    </div>
  );
};

export default ApplicationTab;
