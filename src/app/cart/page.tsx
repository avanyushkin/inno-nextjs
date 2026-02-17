"use client";

import { useCartStore } from "@/stores/cartStore";
import { Button, Card, Image, Input } from "@heroui/react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

const TAX_RATE = 0.08;

const EmptyCart = () => (
  <div className="container mx-auto px-4 py-8 text-center">
    <ShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-4" />
    <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
    <Link href="/">
      <Button color="primary" size="lg">Continue Shopping</Button>
    </Link>
  </div>
);

const CartItem = ({ item }: { item: any }) => {
  const { removeFromCart, updateQuantity } = useCartStore();
  const discountedPrice = item.price * (1 - item.discountPercentage / 100);

  return (
    <Card className="p-4">
      <div className="flex gap-4">
        <Image src={item.thumbnail} alt={item.title} width={120} height={120} className="object-cover rounded-lg" />
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-600 text-sm">Stock: {item.stock}</p>
            </div>
            <Button color="danger" variant="light" size="sm" isIconOnly onClick={() => removeFromCart(item.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex justify-between items-end mt-4">
            <div className="flex items-center gap-2">
              <Button size="sm" isIconOnly onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                <Minus className="h-4 w-4" />
              </Button>
              <Input type="number" value={item.quantity} onChange={(e) => updateQuantity(item.id, +e.target.value)} className="w-16 text-center" min={1} max={item.stock} />
              <Button size="sm" isIconOnly onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-bold">${(discountedPrice * item.quantity).toFixed(2)}</div>
              {item.discountPercentage > 0 && (
                <div className="text-sm text-gray-500 line-through">${(item.price * item.quantity).toFixed(2)}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

function CartContent() {
  const { items, totalItems, totalPrice, clearCart } = useCartStore();

  if (!items.length) return <EmptyCart />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart ({totalItems} items)</h1>
        <Button color="danger" variant="flat" onClick={clearCart} startContent={<Trash2 className="h-4 w-4" />}>
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => <CartItem key={item.id} item={item} />)}
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-4">
            <h2 className="text-xl font-bold pb-4">Order Summary</h2>
            <div className="space-y-4">
              {[ [`Subtotal (${totalItems} items)`, totalPrice], ['Shipping', 0], ['Tax', totalPrice * TAX_RATE],].map(([label, value]) => (
                <div key={label as string} className="flex justify-between">
                  <span>{label}</span>
                  <span>{value === 0 ? 'Free' : `$${(value as number).toFixed(2)}`}</span>
                </div>
              ))}
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${(totalPrice * (1 + TAX_RATE)).toFixed(2)}</span>
                </div>
              </div>
              
              <Button color="primary" size="lg" className="w-full">Proceed to Checkout</Button>
              <Link href="/">
                <Button variant="flat" className="w-full">Continue Shopping</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <ProtectedRoute>
      <CartContent />
    </ProtectedRoute>
  );
}