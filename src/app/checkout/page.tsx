import CheckoutHeader from "../components/CheckoutHeader";
import CheckoutPayment from "../components/CheckoutPayment";
import CheckoutReview from "../components/CheckoutReview";
import CheckoutShipping from "../components/CheckoutShipping";
import Header from "../components/Header";

export default function Checkout({
  searchParams,
}: {
  searchParams: { stage: string };
}) {
  let stage = searchParams?.stage;
  return (
    <>
      {/* Divider */}
      <Header />
      <div className="h-1 bg-pink"></div>
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
