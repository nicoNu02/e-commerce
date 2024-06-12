import { Suspense } from "react";
import SwiperDefault from "./_swipers/swiperDefault";
import Loading from "./components/loading";
import Header from "./components/Header";
import Shipping from "./components/Shipping";
import SwiperCategory from "./_swipers/swiperCategory";
import { FetchProducts, fetchCategories, fetchImages } from "../../fetchData";
import WhatsappIcon from "./components/WhatsappIcon";

export default async function Home() {
  const products = await FetchProducts();
  const categories = await fetchCategories();
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Header />
        <WhatsappIcon />
        <Shipping />
        <SwiperDefault
          title={"Productos"}
          description={"Todo lo de nuestra tienda"}
          products={products}
        />
        <SwiperCategory categories={categories} />
      </Suspense>
    </>
  );
}
