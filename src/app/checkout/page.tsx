import CheckoutHeader from "../components/CheckoutHeader";
import CheckoutPayment from "../components/CheckoutPayment";
import CheckoutShipping from "../components/CheckoutShipping";
import { useAppContext } from "../contexts";

export default function Checkout({
  searchParams,
}: {
  searchParams: { stage: string };
}) {
  let stage = searchParams?.stage;
  return (
    <div className="p-4">
      <CheckoutHeader searchParams={searchParams} />
      {!stage ? (
        <div>no stage</div>
      ) : stage == "shipping" ? (
        <CheckoutShipping />
      ) : stage == "payment" ? (
        <CheckoutPayment />
      ) : (
        <div>Review</div>
      )}
    </div>
  );
}
