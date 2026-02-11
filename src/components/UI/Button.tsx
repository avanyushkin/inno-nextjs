"use client";

import { Button as HeroUIButton } from "@heroui/react";
import { forwardRef } from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost";
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
  isLoading?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = "solid",
  color = "primary",
  size = "md",
  isDisabled = false,
  isLoading = false,
  startContent,
  endContent,
  className,
  type = "button",
  onClick,
  fullWidth = false,
  ...props
}, ref) => {
  return (
    <HeroUIButton
      ref={ref}
      variant={variant}
      color={color}
      size={size}
      isDisabled={isDisabled}
      isLoading={isLoading}
      startContent={startContent}
      endContent={endContent}
      className={className}
      type={type}
      onClick={onClick}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </HeroUIButton>
  );
});

Button.displayName = "Button";

export { Button };
