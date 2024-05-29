"use client";

const CloseCart = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <button
      onClick={handleClose}
      className="mb-4 font-bold text-xl text-white touch-auto"
    >
      X
    </button>
  );
};

export default CloseCart;
