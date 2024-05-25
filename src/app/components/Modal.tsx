import React from "react";
import ModalClient from "./ModalClient";
const Modal = ({ children }: { children: React.ReactNode }) => {
  return <ModalClient>{children}</ModalClient>;
};

export default Modal;
