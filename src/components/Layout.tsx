import { ReactNode } from "react";
import Navbar from "./agency/Navbar";
import Footer from "./landingpage/Footer";
import AgencyFooter from "./agency/AgencyFooter";

export function AgencyLayout({children}: {children: ReactNode}) {
    return (
        <div className="min-h-screen flex flex-xol bg-bm__layout">
            <Navbar />
            <div className="flex-1 mt-24 flex flex-col">{children}</div>
            {/* <Footer /> */}
            {/* <AgencyFooter /> */}
        </div>
    )
}

