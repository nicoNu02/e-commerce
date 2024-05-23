import { Suspense } from "react";
import SwiperDefault from "./_swipers/swiperDefault";
import Loading from "./components/loading";
import Header from "./components/Header";
import Shipping from "./components/Shipping";
import CartModal from "./components/CartModal";

export default async function Home({ searchParams }) {
  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <CartModal searchParams={searchParams} />
      <Shipping />
      <SwiperDefault />
      <SwiperDefault />
      <SwiperDefault />
      <SwiperDefault />
      <SwiperDefault />
    </Suspense>
  );
}
