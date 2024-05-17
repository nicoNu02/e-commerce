import React from "react";
import ModalClient from "./ModalClient";
const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalClient>
      <div className="w-full h-screen fixed top-0 left-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm color">
        {children}
      </div>
    </ModalClient>
  );
};

export default Modal;
