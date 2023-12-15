import create from "../assets/created-project.png";

const OfferModal = ({ isOpen, onClose }: { isOpen: any; onClose: any }) => {
  return (
    <div
      className={`fixed inset-0 overflow-y-auto ${
        isOpen ? "visible" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded shadow-lg w-96">
          <div className="text-center mb-4">
            <img src={create} alt="Project Created" className="mb-4 mx-auto" />
            <h2 className="text-2xl font-semibold">Offer Created!</h2>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="dark___btn px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferModal;
