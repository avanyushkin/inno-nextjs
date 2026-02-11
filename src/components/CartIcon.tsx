"use client";

import { useCartStore } from "@/stores/cartStore";
import { Button, Badge } from "@heroui/react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartIcon() {
  const { totalItems } = useCartStore();

  return (
    <Link href="/cart">
      <Button color="primary" variant="ghost" size="sm" className="relative"
        startContent={<ShoppingCart className="h-5 w-5" />}
      >
        {totalItems > 0 && (
          <Badge 
            color="danger" 
            className="absolute -top-2 -right-2 min-w-[20px] h-5"
          >
            {totalItems}
          </Badge>
        )}
      </Button>
    </Link>
  );
}
