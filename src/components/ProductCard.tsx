import { Card, CardBody, CardHeader, Image, Button } from "@heroui/react";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}
export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      discountPercentage: product.discountPercentage,
      thumbnail: product.thumbnail,
      stock: product.stock,
    });
  };

  const handleImageClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <Card className="py-4 max-w-[300px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large uppercase">{product.title}</h4>
        <small className="text-default-500">{product.brand}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image alt={product.title}
          className="object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
          src={product.thumbnail} width={270} height={200} onClick={handleImageClick}
        />
        <p className="text-tiny uppercase font-bold mt-2">{product.category}</p>
        <p className="text-default-500 text-small mt-1 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-small">{product.rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-small text-default-500">Stock: {product.stock}</span>
          <Button color="primary" size="sm"
            onClick={handleAddToCart} startContent={<ShoppingCart className="h-4 w-4" />}>Add to Cart</Button>
        </div>
      </CardBody>
    </Card>
  );
}
