import { useEffect, useRef } from "react";
import create from "../assets/created-project.png";

const InviteTalentModal = ({
  isOpen,
  onClose,
  statusMessage,
}: {
  isOpen: any;
  onClose: any;
  statusMessage: string;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Check if the click is outside the modal content
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    // Attach the event listener when the modal is open
    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    // Detach the event listener when the modal is closed
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onClose]);
  return (
    <div
      className={`fixed inset-0 overflow-y-auto ${
        isOpen ? "visible" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div ref={modalRef} className="bg-white p-6 rounded shadow-lg w-96">
          <div className="text-center mb-4">
            <img src={create} alt="Project Created" className="mb-4 mx-auto" />
            <h2 className="text-2xl font-semibold">
              Talent Invited Successfully!
              {/* {statusMessage} */}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteTalentModal;
