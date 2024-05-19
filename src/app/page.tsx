import { Suspense } from "react";
import SwiperDefault from "./_swipers/swiperDefault";
import Loading from "./components/loading";
import Header from "./components/Header";
import Shipping from "./components/Shipping";
import prismaExample from "./api/db";

export default async function Home() {
  const users = await prismaExample();
  console.log(users);
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
