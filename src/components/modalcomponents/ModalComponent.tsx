import React from "react";

type ModalTypes = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
const ModalComponent = ({ open, onClose, children }: ModalTypes) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center 
    transition-colors ${open ? "visible bg-black/20 z-40" : "invisible"}
    `}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg shadow p-6
        transition-all max-w-md 
        ${open ? "scale-100 opacity-100" : "scale-110 opacitiy-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 py-1 px-2 
            border border-neutral-200 rounded-md text-gray-400
            bg-white hover:bg-gray-50 hover:text-gray-600"
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalComponent;
