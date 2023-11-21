import { ReactNode } from "react";
import NewNavBar from "./NewNavBar";
import Footer from "./Footer";
import Navbar from "./agency/Navbar";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-bm__layout">
      <NewNavBar />
      <div className="flex">
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

export function AgencyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-xol bg-bm__layout">
      <Navbar />
      <div className="flex-1 mt-24 flex flex-col">{children}</div>
      {/* <Footer /> */}
      {/* <AgencyFooter /> */}
    </div>
  );
}
