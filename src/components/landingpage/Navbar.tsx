import logo from "../../assets/download-logo.png";
import { Link } from "react-router-dom";
import { Separator } from "../../ui/seperator";
import { IoCloseSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <nav className="flex justify-between px-4 md:px-12 xl:px-40 items-center py-3 text-[12px] font-medium bg-white shadow-xl drop-shadow-lg z-50">
        <div className="md:flex gap-5 items-center">
          <img src={logo} alt="logo" className="w-[144px] h-[39px]" />
          <div className="">
            <div className="md:flex hidden gap-5">
              <div className="">Get Talent</div>
              <div className="">Find Work</div>
              <div className="">Pricing</div>
            </div>
          </div>
        </div>
        <div className="md:flex items-center gap-6 hidden">
          <div className="">
            <Link
              to={"/auth/login"}
              className=" text-bm__btn__grey bg-white px-6 py-3 rounded mx-2 hover:text-white hover:bg-bm__btn__grey"
            >
              Login
            </Link>
            <Link
              to={"/auth/signup"}
              className="bg-bm__btn__grey text-white hover:bg-white hover:text-bm__btn__grey px-6 py-3 rounded mx-2"
            >
              Create an account
            </Link>
          </div>
        </div>

        <div className="md:hidden top-0 left-0 w-full h-full z-50">
          <div className="flex items-center justify-end">
            <div onClick={() => setToggle((prev) => !prev)}>
              {toggle ? (
                <IoCloseSharp className="w-5 h-5" />
              ) : (
                <RxHamburgerMenu className="w-5 h-5" />
              )}
            </div>
            {toggle && (
              <div className="p-6 absolute top-20 right-0 bg-white rounded-xl z-50">
                <div className="flex flex-col items-start cursor-pointer">
                  <div className="px-2 py-1.5 text-sm font-semibold">
                    Get Talent
                  </div>
                  <div className="px-2 py-1.5 text-sm font-semibold">
                    Find Work
                  </div>
                  <div className="px-2 py-1.5 text-sm font-semibold">
                    Manage Projects
                  </div>
                </div>
                <Separator />

                <div className="flex items-center justify-center px-2 py-1.5 text-sm font-semibold my-4">
                  <Link
                    to={"/auth/login"}
                    className="text-bm_btn_gray bg-white px-6 py-3 rounded mx-2"
                  >
                    Login
                  </Link>
                  <Link
                    to={"/auth/signup"}
                    className="bg-bm__btn__grey text-white px-6 py-3 rounded mx-2"
                  >
                    Create an account
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
