import { Card, CardBody, CardHeader, Image, Button } from "@heroui/react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <Card className="py-4 max-w-[300px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large uppercase">{product.title}</h4>
        <small className="text-default-500">{product.brand}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt={product.title}
          className="object-cover rounded-xl"
          src={product.thumbnail}
          width={270}
          height={200}
        />
        <p className="text-tiny uppercase font-bold mt-2">{product.category}</p>
        <p className="text-default-500 text-small mt-1 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-lg font-bold">${discountedPrice.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-default-500 line-through ml-2">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-small">{product.rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-small text-default-500">Stock: {product.stock}</span>
          <Button color="primary" size="sm">
            Add to Cart
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
