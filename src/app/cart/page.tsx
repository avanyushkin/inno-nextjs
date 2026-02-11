"use client";

import { useCart } from "@/contexts/CartContext";
import { Button, Card, CardBody, CardHeader, Image, Input } from "@heroui/react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <ShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-4" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <Link href="/">
            <Button color="primary" size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart ({cart.totalItems} items)</h1>
        <Button 
          color="danger" 
          variant="flat" 
          onClick={clearCart}
          startContent={<Trash2 className="h-4 w-4" />}
        >
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => {
            const discountedPrice = item.price * (1 - item.discountPercentage / 100);
            return (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={120}
                    height={120}
                    className="object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <div className="flex justify-between start">
                      <div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-gray-600 text-sm">Stock: {item.stock}</p>
                      </div>
                      <Button
                        color="danger"
                        variant="light"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        startContent={<Trash2 className="h-4 w-4" />}
                      />
                    </div>
                    
                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center gap-2">
                        <Button
                          color="primary"
                          variant="flat"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          isIconOnly
                          startContent={<Minus className="h-4 w-4" />}
                        />
                        <Input
                          type="number"
                          value={item.quantity.toString()}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                          className="w-16 text-center"
                          min="1"
                          max={item.stock}
                        />
                        <Button
                          color="primary"
                          variant="flat"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          isIconOnly
                          startContent={<Plus className="h-4 w-4" />}
                        />
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          ${(discountedPrice * item.quantity).toFixed(2)}
                        </div>
                        {item.discountPercentage > 0 && (
                          <div className="text-sm text-gray-500 line-through">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-4">
            <CardHeader className="pb-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({cart.totalItems} items)</span>
                <span>${cart.totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(cart.totalPrice * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${(cart.totalPrice * 1.08).toFixed(2)}</span>
                </div>
              </div>
              <Button color="primary" size="lg" className="w-full">
                Proceed to Checkout
              </Button>
              <Link href="/">
                <Button variant="flat" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
