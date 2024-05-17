import { Suspense } from "react";
import SwiperDefault from "./_swipers/swiperDefault";
import Loading from "./components/loading";
import Header from "./components/Header";
import Shipping from "./components/Shipping";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <Shipping />
      <SwiperDefault />
      <SwiperDefault />
      <SwiperDefault />
      <SwiperDefault />
      <SwiperDefault />
    </Suspense>
  );
}
