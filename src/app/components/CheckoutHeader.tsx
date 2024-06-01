export default function CheckoutHeader({
  searchParams,
}: {
  searchParams: { stage: string };
}) {
  let stage = searchParams?.stage;
  return (
    <header>
      <div className="w-full flex flex-col relative ">
        <div className="w-full flex mb-2">
          <div className="w-1/3 flex flex-col items-center justify-center">
            <h2 className="text-base font-bold sm:text-2xl">Envío</h2>
          </div>
          <div className="w-1/3 flex flex-col items-center justify-center">
            <h2 className="text-base font-bold sm:text-2xl"> Pago</h2>
          </div>
          <div className="w-1/3 flex flex-col items-center justify-center">
            <h2 className="text-base font-bold sm:text-2xl">Revisión</h2>
          </div>
        </div>
        <div className="h-2 w-full overflow-hidden relative">
          <div className="w-full bg-black h-[0.5px] absolute top-[2.5px]"></div>
          <div
            className={
              stage == "shipping"
                ? "bg-black w-1/3 h-full rounded-md transition ease-in-out delay-50"
                : stage == "payment"
                ? "bg-black w-1/3 h-full rounded-md translate-x-[100%] transition ease-in-out delay-50"
                : stage == "review"
                ? "bg-black w-1/3 h-full rounded-md translate-x-[200%] transition ease-in-out delay-50"
                : "bg-black w-1/3 h-full translate-x-[300%] hidden"
            }
          ></div>
        </div>
      </div>
    </header>
  );
}
