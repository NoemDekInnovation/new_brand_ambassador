import { ReactNode } from "react";
import NewNavBar from "./NewNavBar";
import Footer from "./Footer";
import Navbar from "./agency/Navbar";
import AgencyFooter from "./agency/AgencyFooter";
import addButton from "../../assets/Add Button.png";
import { TbSquarePlus2 } from "react-icons/tb";
import NewAgencyFooter from "./agency/NewAgencyFooter";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-bm_card_grey">
      <NewNavBar />
      <div className="flex">
        <div className="flex-1">{children}</div>
        {/* <div className="h-[66px] w-[66px] rounded-full bg-[#93979D] absolute right-12 top-52 flex items-center justify-center">
          <TbSquarePlus2 className="text-white text-3xl" />
        </div> */}
      </div>
      {/* <div className="h-[66px] w-[66px] rounded-full bg-[#93979D] absolute right-12 top-52 flex items-center justify-center">
        <TbSquarePlus2 className="text-white text-3xl" />
      </div> */}
      <AgencyFooter />
    </div>
  );
}

export function AgencyLayout({
  children,
  toggleMenubar,
  setToggleMenubar,
}: {
  toggleMenubar: boolean;
  setToggleMenubar: () => void;
  children: ReactNode;
}) {
  return (
    <div className="min-w-screen h-screen flex flex-col bg-bm_card_grey relative">
      <NewNavBar
        setToggleMenubar={setToggleMenubar}
        toggleMenubar={toggleMenubar}
      />
      <div className="flex-1 bg-bm_card_grey">{children}</div>
      {/* <div className="flex-1 pb-[200px] bg-bm_card_grey">{children}</div> */}
      {/* <div className="h-[66px] w-[66px] rounded-full bg-[#93979D] absolute right-12 top-52 flex items-center justify-center">
        <TbSquarePlus2 className="text-white text-3xl" />
      </div> */}
      <NewAgencyFooter />
    </div>
  );
}
