"use client";

import { Card as HeroUICard } from "@heroui/react";
import { forwardRef } from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  isPressable?: boolean;
  isDisabled?: boolean;
  shadow?: "none" | "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg";
}

const Card = forwardRef<HTMLDivElement, CardProps>(({
  children,
  className,
  isPressable = false,
  isDisabled = false,
  shadow = "md",
  radius = "lg",
  ...props
}, ref) => {
  return (
    <HeroUICard
      ref={ref}
      className={className}
      isPressable={isPressable}
      isDisabled={isDisabled}
      shadow={shadow}
      radius={radius}
      {...props}
    >
      {children}
    </HeroUICard>
  );
});

Card.displayName = "Card";

export { Card };
