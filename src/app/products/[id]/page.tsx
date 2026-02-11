"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardBody, CardHeader, Image, Button } from "@heroui/react";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, ArrowLeft } from "lucide-react";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${params.id}`);
        if (!response.ok) {
          throw new Error("failed on fetching");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "error loading product");
      } finally {
        setLoading(false);
      }
    };
    if (params.id) { fetchProduct(); }
  }, [params.id]);
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        discountPercentage: product.discountPercentage,
        thumbnail: product.thumbnail,
        stock: product.stock,
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center pt-12">
        <div className="text-2xl font-bold mb-4">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center pt-12">
        <div className="text-2xl font-bold mb-4 text-red-500">
          Error: {error || "Product not found"}
        </div>
        <Button color="primary" onClick={() => router.back()}
          startContent={<ArrowLeft className="h-4 w-4" />}>
          Go Back
        </Button>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button color="primary" variant="light"
          onClick={() => router.back()}
          startContent={<ArrowLeft className="h-4 w-4" />}>Back
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardBody>
              <div className="grid grid-cols-1 gap-4">
                <Image alt={product.title} className="object-cover rounded-xl" src={product.thumbnail}
                  width="100%" height={400}
                />
                <div className="grid grid-cols-3 gap-2">
                  {product.images.slice(0, 3).map((image, index) => (
                    <Image key={index} alt={`${product.title} - Image ${index + 1}`}
                      className="object-cover rounded-lg" src={image} width="100%" height={120}/>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader className="flex-col items-start">
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <p className="text-lg text-default-500 mb-2">{product.brand}</p>
              <p className="text-small uppercase font-bold text-primary">{product.category}</p>
            </CardHeader>
            <CardBody>
              <p className="text-default-700 mb-6 leading-relaxed">{product.description}</p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-large font-semibold">{product.rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-medium text-default-600">
                  Stock: <span className="font-semibold">{product.stock} units</span>
                </span>
                {product.discountPercentage > 0 && (
                  <span className="text-medium text-success font-semibold">
                    Save {product.discountPercentage}%
                  </span>
                )}
              </div>
              <Button color="primary" size="lg" onClick={handleAddToCart}
                startContent={<ShoppingCart className="h-5 w-5" />} className="w-full">Add to Cart</Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
