import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const onBackdropHandler = () => {
    document.body.style.overflow = "auto";
    onClose();
  };
  const modalRoot = document.querySelector("#modal");

  return (
    <>
      {modalRoot &&
        createPortal(
          <>
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] w-full h-screen z-10" onClick={onBackdropHandler} />
            <div className="bg-white fixed top-[5vh] left-[50%] shadow-[0_0_6.3px_0_rgba(0,0,0,0.2)] w-[60%] -translate-x-1/2 z-20 rounded-xl overflow-hidden">
              {children}
            </div>
          </>,
          modalRoot
        )}
    </>
  );
};

export default Modal;
