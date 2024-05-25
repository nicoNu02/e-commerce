import { Suspense } from "react";
import SwiperDefault from "./_swipers/swiperDefault";
import Loading from "./components/loading";
import Header from "./components/Header";
import Shipping from "./components/Shipping";
import CartModal from "./components/CartModal";
import SwiperCategory from "./_swipers/swiperCategory";
import { FetchProducts, fetchCategories, fetchImages } from "../../fetchData";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    cart: string;
    modal: string;
  };
}) {
  const images = await fetchImages();
  const products = await FetchProducts();
  const categories = await fetchCategories();
  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <CartModal searchParams={searchParams} />
      <Shipping />
      <SwiperDefault products={products} images={images} />
      <SwiperCategory categories={categories} />
    </Suspense>
  );
}
