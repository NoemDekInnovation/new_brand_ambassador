import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/download-logo.png";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Input } from "../../ui/input";
import { AiOutlineSearch } from "react-icons/ai";
import avatar from "../../assets/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { logout } from "../../redux/user.slice";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="fixed z-[1000]">
      <nav className="flex justify-between px-4 md:px-12 xl:px-40 items-center  text-[12px] font-medium bg-white py-7 w-screen">
        <div className="flex items-center gap-2 md:gap-8 w-full">
          <div className="flex justify-between items-center w-full lg:w-fit">
            <Link to="/">
              <img src={logo} alt="logo" width={140} height={50} />
            </Link >
            {/* Mobile Menu */}
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
                    <div className="flex flex-col">
                      <div className="flex flex-col space-y-5">
                        <div className="flex bg-white items-center border rounded-md w-full px-3">
                          <AiOutlineSearch className="text-[15px] " />
                          <Input
                            className="border-0 focus:border-0 focus:ring-0 focus:outline-none "
                            placeholder="Search"
                          />
                        </div>
                        <p>Messages</p>
                        <div className="flex items-center space-x-2 ml-4">
                          <img
                            src={avatar}
                            alt="avatar"
                            width={40}
                            height={40}
                          />
                          <div className="flex flex-col">
                            <p className="text-[12px] font-normal">
                              {user?.user?.firstName}
                            </p>
                            <p className="text-[10px] font-normal">
                              {user?.user?.role}
                            </p>
                          </div>
                        </div>
                        <Link to="/profile">
                          <div className="hover:bg-black/10">Profile</div>
                        </Link>
                        <DropdownMenuSeparator className="bg-bm__beige" />
                        <div className="hover:bg-black/10">
                          Billing & Payments
                        </div>
                        <DropdownMenuSeparator className="bg-bm__beige" />
                        <div className="hover:bg-black/10">Settings</div>
                        <DropdownMenuSeparator className="bg-bm__beige" />
                        <Link
                          to="/api/auth/signout"
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(logout(""));
                            // signOut();
                            navigate("/auth/login");
                          }}
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Desktop View */}
          <div className="hidden lg:flex items-center border rounded-md w-full px-3">
            <AiOutlineSearch className="text-[15px] " />
            <Input
              className="border-0 focus:border-0 focus:ring-0 focus:outline-none "
              placeholder="Search"
            />
          </div>
          <div className="hidden  lg:flex items-center ml-8 space-x-5 whitespace-nowrap">
            <p>Messages</p>
            <DropdownMenu>
              <DropdownMenuTrigger>
                {""}
                <div className="flex items-center space-x-2 ml-4">
                  <img src={avatar} alt="avatar" width={40} height={40} />
                  <div className="flex flex-col">
                    <p className="text-[12px] font-normal">
                      {user?.user?.firstName}
                    </p>
                    <p
                      className="
              text-[10px] font-normal
              "
                    >
                      {user?.user?.role}
                    </p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white p-3">
                <DropdownMenuItem className="hover:bg-black/10 mt-2">
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-bm__beige" />
                <DropdownMenuItem className="hover:bg-black/10">
                  Billing & Payments
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-bm__beige" />
                <DropdownMenuItem className="hover:bg-black/10">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-bm__beige" />
                <DropdownMenuItem className="hover:bg-black/10">
                  <Link
                    to="/api/auth/signout"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(logout(""));
                      // signOut(); 
                      navigate("/auth/login");
                    }}
                  >
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
