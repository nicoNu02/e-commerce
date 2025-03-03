import CartBody from "../components/CartBody";
import CloseCart from "../components/CloseCart";

export default function CartPage({
  isOpen,
  handleClose,
  path,
}: {
  isOpen: boolean;
  handleClose: () => void;
  path: string;
}) {
  const visible = isOpen && !path.includes("/product/");
  return (
    <div
      className={
        visible
          ? "w-full h-lvh bg-primary fixed top-0 right-0 z-50 transition ease-in-out delay-70 opacity-100 p-8 sm:w-full lg:w-3/6 md:w-4/6 touch-none overflow-y-auto shadow-2xl"
          : "w-full h-lvh bg-primary fixed top-0 right-0 translate-x-[100%] z-50 transition ease-in delay-50 opacity-0 sm:w-full lg:w-3/6 md:w-4/6 touch-none overflow-y-auto"
      }
    >
      {visible && (
        <>
          <CloseCart handleClose={handleClose} />
          <CartBody />
        </>
      )}
    </div>
  );
}
