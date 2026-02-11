"use client";

import { useCart } from "@/contexts/CartContext";
import { Button, Badge } from "@heroui/react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartIcon() {
  const { cart } = useCart();

  return (
    <Link href="/cart">
      <Button color="primary" variant="ghost" size="sm" className="relative"
        startContent={<ShoppingCart className="h-5 w-5" />}
      >
        {cart.totalItems > 0 && (
          <Badge 
            color="danger" 
            className="absolute -top-2 -right-2 min-w-[20px] h-5"
          >
            {cart.totalItems}
          </Badge>
        )}
      </Button>
    </Link>
  );
}
