import CheckoutHeader from "../components/CheckoutHeader";
import CheckoutPayment from "../components/CheckoutPayment";
import CheckoutReview from "../components/CheckoutReview";
import CheckoutShipping from "../components/CheckoutShipping";
import { useAppContext } from "../contexts";

export default function Checkout({
  searchParams,
}: {
  searchParams: { stage: string };
}) {
  let stage = searchParams?.stage;
  return (
    <>
      <div className="w-full bg-white border-b-2 h-32 mb-4 flex justify-center items-center">
        <h1 className="text-2xl font-bold text-rose-400">Gift Regaleria</h1>
      </div>
      <div className="p-4">
        <CheckoutHeader searchParams={searchParams} />
        {!stage ? (
          <div>no stage</div>
        ) : stage == "shipping" ? (
          <CheckoutShipping />
        ) : stage == "payment" ? (
          <CheckoutPayment />
        ) : (
          <CheckoutReview />
        )}
      </div>
    </>
  );
}
