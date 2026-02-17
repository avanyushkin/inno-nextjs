import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

export const dynamic = 'force-static';
export const updateTime = 1800; // every 30 min upd

async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error("fail on fetching");
    }
    const data = await response.json();
    return data.products;
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
