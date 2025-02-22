import Link from "next/link";

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
            <Link
              href={"/checkout?stage=shipping"}
              className="text-base font-bold sm:text-2xl"
            >
              Envío
            </Link>
          </div>
          <div className="w-1/3 flex flex-col items-center justify-center">
            {stage !== "shipping" ? (
              <Link
                href={"/checkout?stage=payment"}
                className="text-base font-bold sm:text-2xl"
              >
                Pago
              </Link>
            ) : (
              <div className="text-base font-bold sm:text-2xl">Pago</div>
            )}
          </div>
          <div className="w-1/3 flex flex-col items-center justify-center">
            <Link
              href={"/checkout?stage=review"}
              className="text-base font-bold sm:text-2xl"
            >
              Revisión
            </Link>
          </div>
        </div>
        <div className="h-2 w-full overflow-hidden relative">
          <div className="w-full bg-pink h-[0.5px] absolute top-[2.5px]"></div>
          <div
            className={
              stage == "shipping"
                ? "bg-pink w-1/3 h-full rounded-md transition ease-in-out delay-50"
                : stage == "payment"
                ? "bg-pink w-1/3 h-full rounded-md translate-x-[100%] transition ease-in-out delay-50"
                : stage == "review"
                ? "bg-pink w-1/3 h-full rounded-md translate-x-[200%] transition ease-in-out delay-50"
                : "bg-pink w-1/3 h-full translate-x-[300%] hidden"
            }
          ></div>
        </div>
      </div>
    </header>
  );
}
