import { RxPerson } from "react-icons/rx";
import { Checkbox } from "../../ui/checkbox";
import HeartIcon from "../../libs/HeartIcon";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../../ui/dialog";
import { TalentInvitationModal } from "./TalentInvitationModal";

export const TalentList = ({
  talent,
  index,
  handleProfilePopUp,
  setSelectedTalentID,
  handleCheckedChange,
  setModal,
  modal,
  inviteStatus,
  project,
  checkInvite,
}: {
  talent: any;
  index: number;
  handleProfilePopUp: (talent: any) => void;
  //   handleProfilePopUp: (talent: TalentProps) => void;
  setSelectedTalentID: any;
  handleCheckedChange?: any;
  setModal?: any;
  modal: boolean;
  checkInvite?: boolean;
  project: any;
  inviteStatus: "applied" | "invite" | "training" | "hired";
}) => {
  const handleModalPop = () => {
    console.log("chip", { modal });

    setSelectedTalentID(talent?._id);
    setModal(true);
  };

  console.log({ modal });

  const [isOnline, setIsOnline] = useState(false);

  let statusButton;
  switch (inviteStatus) {
    case "applied":
      statusButton = (
        <button
          className="dark__btn text-[10px]"
          onClick={() => handleModalPop()}
        >
          Invite for training
        </button>
      );
      break;
    case "invite":
      statusButton = (
        <button
          className="dark__btn text-[10px]"
          onClick={() => handleModalPop()}
        >
          Invite
        </button>
      );

      break;
    case "training":
      statusButton = (
        <button
          className="dark__btn text-[10px]"
          onClick={() => handleModalPop()}
        >
          Send Contract
        </button>
      );
      break;
    default:
      break;
  }

  return (
    <>
      <div
        key={index}
        className="bg-white border rounded flex w-full min-w-[700px]"
      >
        <div className="">
          <div className="bg-black/70 w-[86px] h-[108px] rounded-md">
            {/* <img
              src={Logo}
              alt=""
              style={{
                borderRadius: 5,
              }}
              className=" hover:grayscale-0 grayscale w-full max-w-[86px] h-full max-h-[108px] object-cover"
            /> */}
            {/* <RxPerson /> */}
            {talent.gender === "male" && (
              <img
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gU3ZnIFZlY3RvciBJY29ucyA6IGh0dHA6Ly93d3cub25saW5ld2ViZm9udHMuY29tL2ljb24gLS0+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjU2IDI1NiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8bWV0YWRhdGE+IFN2ZyBWZWN0b3IgSWNvbnMgOiBodHRwOi8vd3d3Lm9ubGluZXdlYmZvbnRzLmNvbS9pY29uIDwvbWV0YWRhdGE+DQo8Zz48Zz48Zz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNMTIzLjEsMTBDMTAyLjYsMTEuNCw4NCwyMy42LDc0LjksNDEuOGMtNC4zLDguNC01LjksMTUuNi01LjcsMjUuN2MwLjIsMjcuNywxMy4xLDU5LjcsMzAuNyw3Ni43YzksOC42LDE3LjcsMTIuOCwyNy40LDEyLjhjNSwwLjEsOC0wLjYsMTMuMS0zYzE1LjctNy4zLDMxLjYtMjguOSw0MC42LTU1LjJjNC41LTEzLjQsNi43LTI4LDUuNy0zNy44Yy0yLTE4LjMtMTIuOC0zNC42LTI4LjgtNDMuNkMxNDcuNCwxMS43LDEzNS45LDkuMywxMjMuMSwxMHogTTE0My4yLDUzLjJjNS41LDEuMyw5LjYsMi43LDE1LjgsNS40YzcuMywzLjEsMTUsNS4xLDIxLjIsNS41bDIuMSwwLjFsLTAuMSw0LjljLTAuNiwyMi44LTE0LDUzLjktMzAuMyw3MC40Yy0xMywxMy4yLTI1LjksMTUuNy0zOS42LDcuOGMtMTAtNS44LTE4LjgtMTYuMy0yNi4xLTMxLjJjLTUuNS0xMS4zLTkuOC0yNC45LTExLjUtMzYuMWMtMC42LTMuOC0wLjYtNC41LDAuMS02LjdjMS44LTUuNiw3LjEtMTIuNCwxMi4xLTE1LjRjNC4yLTIuNSw0LjMtMi41LDMsMC4xYy0yLjQsNC42LTMuNCwxMS0yLjYsMTYuNWMwLjgsNiwxLDYuMSwzLDIuNGM1LjUtMTAsMTIuOS0xOC40LDIwLjMtMjMuMWwxLjQtMC45bC0wLjksMS40Yy00LjgsNy4zLTcuMiwxNi45LTYuNiwyNi4zYzAuNSw4LjMsMC41LDguMyw1LDAuOWMyLjItMy41LDUuNi04LjYsNy42LTExLjNjNi45LTkuMywxNy42LTE4LjksMjAuNS0xOC4yQzEzOC4zLDUyLDE0MC44LDUyLjYsMTQzLjIsNTMuMnoiLz48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNODUsMTU2LjljLTE0LjYsNC45LTIxLjgsNy43LTMxLjcsMTIuNWMtMjEsMTAuMy0zMi44LDIyLTM4LjcsMzguNmMtMyw4LjMtNS4zLDIyLjEtNC41LDI2LjhjMC42LDMuNiwyLjQsNy4zLDQuNCw4LjhjMy41LDIuNi0zLjIsMi41LDExMi4zLDIuNWMxMTcuMywwLDEwOC42LDAuMiwxMTMuMy0yLjljNC44LTMuMiw2LjUtNy44LDUuNy0xNS4zYy0zLjgtMzUuMi0yMy41LTUzLjYtNzYuNC03MS4zYy0xMi44LTQuMy0xMS44LTQuMi0xMS44LTEuOGMwLDcuMy01LjEsMTUuMy0xMiwxOC44Yy01LjQsMi43LTkuMSwzLjQtMTcuNiwzLjRjLTguNSwwLTEyLjItMC43LTE3LjYtMy40Yy02LjktMy41LTEyLTExLjUtMTItMTguOGMwLTEuMy0wLjItMi0wLjYtMkM5Ny41LDE1Mi44LDkxLjcsMTU0LjcsODUsMTU2Ljl6Ii8+PC9nPjwvZz48L2c+DQo8L3N2Zz4="
                width="256"
                height="256"
              />
            )}
          </div>
        </div>{" "}
        <div className="p-2 w-full">
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-3">
              <Checkbox
                onCheckedChange={() => handleCheckedChange(talent?._id)}
              />

              <p className="text-[15px] font-medium capitalize">
                Junior Hop
                {/* {talent?.firstName} */}
                {"   "}
                {/* {talent?.lastName} */}
              </p>
              <HeartIcon selectedTalentID={2} favorites={true} />
            </div>
            <div className="flex items-center ">
              <div className="text-[#00AB26] text-[10px] font-normal border-r-2 pr-2">
                Available
              </div>
              {/* {isOnline && (
              <div className="text-[#00AB26] text-[10px] font-normal border-r-2 pr-2">
                Available
              </div>
            )} */}
              {/* {!isOnline && (
              <div className="text-[#FF0000] text-[10px] font-normal border-r-2 pr-2">
                Unavailable
              </div>
            )} */}
              <div className="capitalize pl-2   text-[10px]">
                {/* {talent?.opportunities[0]} */}
              </div>
            </div>
          </div>
          <div className="mb-3">
            {" "}
            <p className="text-[10px] font-normal"> {talent?.summary || "-"}</p>
            <div className="flex flex-row text-[8px] font-normal">
              <p className="border-r border-r-bm__faint__text pr-1 mr-1">
                {talent?.age}
              </p>
              <p className="border-r border-r-bm__faint__text pr-1 mr-1">
                {talent?.height}
              </p>
              <p>{talent && talent?.address[0]?.city}</p>,
              <p className="border-r border-r-bm__faint__text pr-1 mr-1">
                {talent && talent?.address[0]?.state}
              </p>
              {talent && talent?.experience[0] && (
                <p>{talent && talent?.experience[0]?.agencyName},</p>
              )}
              {talent && talent?.experience[1] && (
                <p>{talent && talent?.experience[1]?.agencyName},</p>
              )}
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-2 whitespace-nowrap ">
              <div className=" border-r-2 pr-2 text-[10px] font-bold">
                <span className="text-bm__ox__red text-[12px] font-semibold">
                  97% {"  "}
                </span>
                Work Success
              </div>
              <div className="text-[10px] font-bold">
                <span className="text-bm__ox__red text-[12px] font-semibold">
                  4.5 {"  "}
                </span>
                Ratings
              </div>
            </div>{" "}
            <div className="flex gap-4">
              {/* <button className="light__btn text-[10px]">Share</button> */}
              {talent?.isInvited ? (
                <button
                  className="dark__btn text-[10px]"
                  // onClick={() => handleModalPop()}
                >
                  Invited
                </button>
              ) : (
                <>{statusButton}</>
              )}{" "}
            </div>
          </div>
        </div>
      </div>
      <TalentInvitationModal
        projectModal={modal}
        setProjectModal={setModal}
        project={project}
      />
    </>
  );
};
