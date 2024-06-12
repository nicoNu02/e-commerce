import Header from "@/app/components/Header";
import SearchClient from "@/app/components/SearchClient";

export default function Orders() {
  return (
    <article className="h-full">
      <Header />
      <h1 className="text-2xl font-bold p-4">Pedidos</h1>
      <SearchClient />
    </article>
  );
}
