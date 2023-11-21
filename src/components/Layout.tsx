import { ReactNode } from "react";
import NewNavBar from "./NewNavBar";
import Footer from "./Footer";
import Navbar from "./agency/Navbar";
import AgencyFooter from "./agency/AgencyFooter";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-bm_card_grey">
      <NewNavBar />
      <div className="flex">
        <div className="flex-1">{children}</div>
      </div>
      <AgencyFooter />
    </div>
  );
}

export function AgencyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-screen flex flex-col bg-bm__layout">
      <NewNavBar />
      <div className="flex-1">{children}</div>
      <AgencyFooter />
    </div>
  );
}
