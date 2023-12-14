import react from "react";
import { ImCancelCircle } from "react-icons/im";
import { RiStackshareLine } from "react-icons/ri";
import { Separator } from "../../../../ui/seperator";
import { Card, CardContent } from "../../../../ui/card";
import Logo from "../../../../assets/model.jpg";

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
        <div className="overflow-y-scroll h-[80vh]">
          <Card className="w-full pt-4 my-3">
            <CardContent>
              <div className="flex justify-between items-center">
                <h2 className="text-[14px] font-normal capitalize">
                  Application Letter
                </h2>
              </div>
              <Separator className="bg-bm__beige my-6" />
              <Card className="h-[40vh]">
                <div className="flex flex-col overflow-y-auto h-[40vh]">
                  <p className=" capitalize break-words p-4">
                    Lorem ipsum dolor sit amet consectetur. Viverra mattis vitae
                    odio in sem non eu elementum. Vehicula ut amet parturient
                    dui nam sit amet. Luctus mattis mattis viverra eleifend enim
                    bibendum viverra duis. At et vel elit nibh orci volutpat
                    diam tempus volutpat. Hendrerit ullamcorper dolor nunc
                    malesuada laoreet. Id venenatis integer ac et morbi ut
                    sagittis velit. Pharetra libero dolor eget lacinia.
                    Tristique leo eu augue lectus a sit et etiam nunc. Consequat
                    risus sit enim tristique nunc eget molestie. Ac sed vivamus
                    aliquam egestas at. Ullamcorper tellus facilisi mauris est
                    id. Hac quam interdum consequat lorem condimentum tincidunt
                    est. Eu auctor convallis urna est in maecenas nisi senectus.
                  </p>
                </div>
              </Card>
            </CardContent>
          </Card>
          <Card className="w-full pt-4 my-3">
            <CardContent>
              <div className="flex justify-between items-center">
                <h2 className="text-[14px] font-normal capitalize">
                  Attachments
                </h2>
              </div>
              <Separator className="bg-bm__beige my-6" />
              <Card className="h-[33vh]">
                <div className="flex items-center p-4 gap-4 ">
                  <img src={Logo} alt="" className="w-[200px] h-[250px]" />
                  <img src={Logo} alt="" className="w-[200px] h-[250px]" />
                </div>
              </Card>
            </CardContent>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default ApplicationTab;
