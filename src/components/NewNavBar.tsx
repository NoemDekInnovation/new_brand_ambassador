import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import logo from "../assets/download-logo.png";
import { logout } from "../redux/user.slice";
import logoutImg from "../assets/logout.png";
import { Separator } from "../ui/seperator";
import { campaignAuthAxiosInstance } from "../api/axios";
import { fetchTalentInvitations } from "../redux/talentInvitations.slice";
import ProjectPreview from "./talent/components/projectPreview";
import BadgeAvatars from "../ui/avatar";
import { fetchactiveproject } from "../redux/ActiveProject";
import { fetchcompleteproject } from "../redux/completeProject";
import { fetchTalentApplications } from "../redux/talentApplications.slice";
import { fetchFavouriteProjects } from "../redux/favourite.slice";
import { Socket, io } from "socket.io-client";

export default function NewNavBar({
  toggleMenubar,
  setToggleMenubar,
}: {
  toggleMenubar?: boolean;
  setToggleMenubar?: () => void;
}) {
  const user = useSelector((state: RootState) => state.user);
  const { talentInvitations } = useSelector(
    (state: RootState) => state.talentInvite
  );
  // Define the type for your state variable
  type SocketType = Socket<any, any> | null;

  // Initialize your state variable
  const [socket, setSocket] = useState<SocketType>(null);
  // const [toggleMenubar, setToggleMenubar] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<any | null>(null);
  const [offers, setOffers] = useState<any | null>(null);
  const [popUp, setPopUp] = useState(false);
  const [selectedProject, setSelectedProject] = useState();
  const [projects, setProjects] = useState();
  const [apply, setApply] = useState(false);

  const navigate = useNavigate();

  // const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  // const handleToggle = () => {
  //   setToggleMenubar(!toggleMenubar);
  // };

  const capitalizeFirstLetter = (str: string | undefined): string => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const fetchOffers = async () => {
    if (user?.user?.accountId !== undefined) {
      try {
        const response = await campaignAuthAxiosInstance("get-talent-offers", {
          headers: {
            Authorization: `Bearer ${user?.user?.authKey || ""}`,
          },
        });
        setOffers(response?.data.data.offers);
      } catch (error) {
        console.error("Error while fetiching Notifications:", error);
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);

    const fetchNotifications = async () => {
      if (user?.user?.accountId !== undefined) {
        try {
          const response = await campaignAuthAxiosInstance(
            "all-notifications",
            {
              headers: {
                Authorization: `Bearer ${user?.user?.authKey || ""}`,
              },
            }
          );
          console.log(response?.data);
          setNotifications(response?.data?.notifications);
        } catch (error) {
          // console.error("Error while fetiching Notifications:", error);
          // Handle error appropriately (e.g., show a user-friendly message)
        }
      }
    };
    fetchOffers();
    fetchNotifications();
    setIsLoading(false);
  }, [user?.user?.accountId]);

  useEffect(() => {
    dispatch(fetchTalentInvitations());
    dispatch(fetchactiveproject(null));
    dispatch(fetchFavouriteProjects(null));
    dispatch(fetchcompleteproject(null));
    dispatch(fetchTalentApplications(null));
  }, [dispatch]);

  const handleProfilePopUp = (info: any) => {
    const projectId = info?.messages[0]?.message.substring(37, 61).trim();
    // console.log("pro2", projectId);
    const appliedInvite = talentInvitations?.invitations.filter(
      (project: any, idx: number) => {
        return project?.project?._id === projectId;
      }
    );
    setSelectedProject(appliedInvite[0]);
    setPopUp(!popUp);
  };

  const [notificationsx, setNotificationsx] = useState<any>([]);
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   socket?.on("new-notifiactions", (data: any) => {
  //     console.log("rapta", data);
  //   });
  // }, [socket]);

  const displayNotification = ({
    senderName,
    type,
  }: {
    senderName: string;
    type: any;
  }) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
      <span className="notification">{`${senderName} ${action} your post.`}</span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  // console.log(notificationsx);

  return (
    <>
      <div>
        <nav className="flex justify-between px-4  md:px-12 xl:px-40 items-center  text-[12px] font-medium bg-white pt-7 md:py-7">
          <div className="flex items-center gap-2 md:gap-8 flex-1">
            <div className="flex justify-between items-center lg:w-fit w-full">
              <Link to="/dashboard">
                <img src={logo} style={{}} alt="logo" width={140} height={50} />
              </Link>

              <div className="block lg:hidden ml-auto">
                <button
                  id="nav"
                  className="flex items-center px-3 py-2 border-2 rounded text-bm_black border-bm_black hover:text-bm_black hover:border-bm "
                  onClick={setToggleMenubar}
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
            <div className="hidden lg:flex items-center border rounded-md w-full  px-3">
              <AiOutlineSearch className="text-[15px] " />
              <Input
                className="border-0 focus:border-0 focus:ring-0 focus:outline-none "
                placeholder="Search"
              />
            </div>
          </div>
          <div className="hidden  lg:flex items-center ml-8 space-x-5 whitespace-nowrap relative">
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {" "}
                  <p>
                    Notifications{" "}
                    <span className="text-red-900 absolute -top-[0.6PX]">
                      {notifications?.length}
                    </span>
                  </p>{" "}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white p-3">
                  <p>Notifications</p>
                  {notifications !== null &&
                    notifications?.map((notification: any, idx: number) => (
                      <div key={idx}>
                        {notification.messages?.map(
                          (message: any, messageIdx: number) => (
                            <React.Fragment key={messageIdx}>
                              <DropdownMenuItem
                                className={`hover:bg-black/10  ${
                                  !message.isRead && "bg-black/10"
                                }`}
                                onClick={() => handleProfilePopUp(notification)}
                              >
                                {message.message}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-bm__beige" />
                            </React.Fragment>
                          )
                        )}
                      </div>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogContent className="bg-[#F3F3F3] max-w-[360px] max-h-[282px] flex flex-col">
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-center m-3">
                    <img src={logoutImg} alt="" />
                  </DialogTitle>
                  <DialogDescription className="text-[#252525] font-medium text-[18px] text-center w-[288px] pt-5">
                    Are you sure you want to logout?
                  </DialogDescription>
                </DialogHeader>
                <Separator />
                <div className="flex justify-between">
                  <button>Cancel</button>
                  <Link
                    to="/api/auth/signout"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(logout(""));
                      // signOut();
                      navigate("/auth/login");
                    }}
                    className="inline-block px-6 py-3 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                  >
                    Logout
                  </Link>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {" "}
                  <div className="flex items-center space-x-2 ml-4 max-h-[40px]">
                    {user?.user?.companyLogo || user?.user?.profilePic ? (
                      <div
                        className="rounded-full overflow-hidden"
                        style={{ width: "50px", height: "50px" }}
                      >
                        <img
                          src={
                            user?.user?.companyLogo || user?.user?.profilePic
                          }
                          width={40}
                          height={40}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <BadgeAvatars />
                    )}
                    <div className="flex flex-col w-[47px] h-[30px]">
                      <p className="text-[12px] font-normal">
                        {capitalizeFirstLetter(
                          user?.user?.firstName || user?.user?.agencyName
                        )}
                      </p>

                      <p
                        className="
              text-[10px] font-normal
              "
                      >
                        {capitalizeFirstLetter(user?.user?.role)}
                      </p>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white p-3">
                  <DropdownMenuItem className="hover:bg-black/10 block">
                    <Link to="/profile">
                      <div>Profile</div>
                    </Link>
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
                    <DialogTrigger>Logout</DialogTrigger>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogContent className="bg-[#F3F3F3] max-w-[360px] max-h-[282px] flex flex-col">
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-center m-3">
                    <img src={logoutImg} alt="" />
                  </DialogTitle>
                  <DialogDescription className="text-[#252525] font-medium text-[18px] text-center w-[288px] pt-5">
                    Are you sure you want to logout?
                  </DialogDescription>
                </DialogHeader>
                <Separator />
                <div className="flex justify-between">
                  <button>Cancel</button>
                  <Link
                    to="/api/auth/signout"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(logout(""));
                      // signOut();
                      navigate("/auth/login");
                    }}
                    className="inline-block px-6 py-3 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                  >
                    Logout
                  </Link>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </nav>

        <div
          className={`flex flex-col lg:hidden  space-y-5 transition-all duration-200 ${
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
      <ProjectPreview
        popUp={popUp}
        close={() => setApply(false)}
        setApply={() => setApply(true)}
        setPopUp={() => setPopUp(!popUp)}
        selectedProject={selectedProject}
        apply={apply}
        // projectId={project?._id}
      />
    </>
  );
}
