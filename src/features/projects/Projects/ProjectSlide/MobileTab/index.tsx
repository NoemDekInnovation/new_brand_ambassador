import { Card } from "../../../../../ui/card";

export const MobileTab = ({
  mobile,
  setMobile,
  setActiveTab,
  activeTab,
}: {
  mobile: boolean;
  setMobile: any;
  setActiveTab: any;
  activeTab: string;
}) => {
  return (
    <Card
      className={`w-full max-w-[240px] p-3 ${mobile ? "h-screen" : "h-fit"}`}
    >
      <div className="w-full flex justify-end">
        {mobile && <button onClick={() => setMobile(false)}>x</button>}{" "}
      </div>
      <h2 className="text-[24px] font-medium">Nivea Bold & Beauty Launch</h2>
      <p className="text-[12px] font-normal text-bm__grey__text__100">
        Closed on 25/11/23
      </p>
      <div className="flex flex-col gap-4 mt-12 ">
        <p
          className={`p-3 cursor-pointer hover:bg-[#F7F7F7] ${
            activeTab === "project_overview" &&
            " border-b border-b-2 border-b-[#800000] font-semibold text-[15px]  bg-[#F7F7F7]"
          }`}
          onClick={() => setActiveTab("project_overview")}
        >
          Project Overview
        </p>
        <p
          className={`p-3 cursor-pointer hover:bg-[#F7F7F7] ${
            activeTab === "applications" &&
            " border-b border-b-2 border-b-[#800000] font-semibold text-[15px]  bg-[#F7F7F7]"
          }`}
          onClick={() => setActiveTab("applications")}
        >
          Applications
        </p>
        <p
          className={`p-3 cursor-pointer hover:bg-[#F7F7F7] ${
            activeTab === "hires" &&
            " border-b border-b-2 border-b-[#800000] font-semibold text-[15px]  bg-[#F7F7F7]"
          }`}
          onClick={() => setActiveTab("hires")}
        >
          Hires
        </p>
        <p
          className={`p-3 cursor-pointer hover:bg-[#F7F7F7] ${
            activeTab === "products" &&
            " border-b border-b-2 border-b-[#800000] font-semibold text-[15px]  bg-[#F7F7F7]"
          }`}
          onClick={() => setActiveTab("products")}
        >
          Products
        </p>
        <p
          className={`p-3 cursor-pointer hover:bg-[#F7F7F7] ${
            activeTab === "collaterals" &&
            " border-b border-b-2 border-b-[#800000] font-semibold text-[15px]  bg-[#F7F7F7]"
          }`}
          onClick={() => setActiveTab("collaterals")}
        >
          {" "}
          Collaterals
        </p>
        <p
          className={`p-3 cursor-pointer hover:bg-[#F7F7F7] ${
            activeTab === "outlets" &&
            " border-b border-b-2 border-b-[#800000] font-semibold text-[15px]  bg-[#F7F7F7]"
          }`}
          onClick={() => setActiveTab("outlets")}
        >
          Outlets
        </p>
        <p
          className={`p-3 cursor-pointer hover:bg-[#F7F7F7] ${
            activeTab === "contracts" &&
            " border-b border-b-2 border-b-[#800000] font-semibold text-[15px]  bg-[#F7F7F7]"
          }`}
          onClick={() => setActiveTab("contracts")}
        >
          Contracts
        </p>
      </div>
    </Card>
  );
};
