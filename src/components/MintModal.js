import React from "react";

const MintModal = ({ isOpen, onClose }) => {
  return (
    <div
      className={`${
        isOpen ? "" : "hidden"
      } fixed inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none`}
    >
      <div className="z-10 relative w-auto max-w-lg mx-auto my-6">
        {/* Modal content */}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/* Modal header */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-black text-3xl font-semibold">Mint APE</h3>
            <button
              onClick={onClose}
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            >
              <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {/* Modal body */}
          <div className="relative p-6 flex-auto">
            {/* Add your modal content here */}
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-8 bg-black opacity-25"></div>
    </div>
  );
};

export default MintModal;
