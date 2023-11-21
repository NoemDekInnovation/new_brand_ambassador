import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link, useNavigate } from "react-router-dom";
import { Input } from '../ui/input';
import logo from "../assets/download-logo.png";
import avatar from '../assets/avatar.jpg';
import { logout } from "../redux/user.slice";

export default function NewNavBar() {
  const user = useSelector((state: RootState) => state.user);
  const [toggleMenubar, setToggleMenubar] = useState(false);

  // const router = useRouter();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleToggle = () => {
    setToggleMenubar(!toggleMenubar);
  };
  return (
    <div>
      <nav className="flex justify-between px-4  md:px-12 xl:px-40 items-center  text-[12px] font-medium bg-white py-10">
        <div className="flex items-center gap-2 md:gap-8 w-full">
          <div className="flex justify-between items-center w-full lg:w-fit">
            <Link to="/">
              <img src={logo} style={{}} alt="logo" width={140} height={50} />
            </Link>

            <div className="block lg:hidden ">
              <button
                id="nav"
                className="flex items-center px-3 py-2 border-2 rounded text-bm_black border-bm_black hover:text-bm_black hover:border-bm "
                onClick={handleToggle}
              >
                <svg
                  className="fill-current h-3 w-3"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="hidden lg:flex items-center border rounded-md w-full px-3">
            <AiOutlineSearch className="text-[15px] " />
            <Input
              className="border-0 focus:border-0 focus:ring-0 focus:outline-none "
              placeholder="Search"
            />
          </div>
        </div>
        <div className="hidden  lg:flex items-center ml-8 space-x-5 whitespace-nowrap">
          <p>Messages</p>

          <DropdownMenu>
            <DropdownMenuTrigger>
              {" "}
              <div className="flex items-center space-x-2 ml-4">
                <img src={avatar} width={40} height={40} alt="" />
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
              <DropdownMenuItem className="hover:bg-black/10">
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
                    navigate('/auth/login');
                  }}
                >
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      <div
        className={`flex flex-col lg:hidden  space-y-5 transition-all duration-200 ${
          // toggleMenubar ? "opacity-100 h-100 " : "opacity-0 h-0"

          toggleMenubar
            ? "opacity-100 h-100"
            : "-translate-y-[1000px] opacity-0 h-0"
        }`}
      >
        <div className="flex flex-col lg:hidden  space-y-5 p-3">
          <div className="flex bg-white items-center border rounded-md w-full px-3">
            <AiOutlineSearch className="text-[15px] " />
            <Input
              className="border-0 focus:border-0 focus:ring-0 focus:outline-none "
              placeholder="Search"
            />
          </div>
          <p>Messages</p>
          <div className="flex items-center space-x-2 ml-4">
            <div className="flex flex-col">
              <p className="text-[12px] font-normal">{user?.user?.firstName}</p>

              <p
                className="
              text-[10px] font-normal
              "
              >
                {user?.user?.role}
              </p>
            </div>
          </div>

          <Link to="/profile">
            <div className="hover:bg-black/10">Profile</div>
          </Link>
          <DropdownMenuSeparator className="bg-bm__beige" />
          <div className="hover:bg-black/10">Billing & Payments</div>
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
  );
}
