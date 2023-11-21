import React, { ReactNode } from "react";

const AgencyPop = ({
  isVisible,
  onClose,
  children,
}: {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode 
}) => {
  if (!isVisible) return null;
  return (
    <div
      className="fixed inset bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      onClick={() => onClose()}
    >
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-2 rounded">{children}</div>
      </div>
    </div>
  );
}; 

export default AgencyPop;


          {
            /* <AgencyPop isVisible={showModal} onClose={() => setShowModal(false)}>
            <div className="flex items-center space-x-4 pb-4 mb-4 border-b border-[#D7D8DA]">
              <div className="flex items-center space-x-3">
                <p className="text-[18px] font-medium">Gloria Michael</p>
                <span className="bg-[#00AB26] h-2 w-2 rounded-full"></span>
                <div className="border-l border-[#D7D8DA] h-8"></div>
                <p className="text-[12px] font-medium text-[#252525]">
                  Ikeja, Lagos
                </p>
                <div className="flex items-center space-x-1">
                  <IoStarHalf />
                  <div className="border-l border-[#D7D8DA] h-8"></div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <IoIosHeartEmpty />
                </div>

                <div className="flex items-center space-x-4">
                  <div className="hover:bg-black/10 flex items-center">
                    <IoShareSocial />
                    <span className="ml-2">Share</span>
                  </div>
                  <div className="hover:bg-black/10">Invite</div>
                </div>
              </div>
            </div>
          </AgencyPop> */
          }
