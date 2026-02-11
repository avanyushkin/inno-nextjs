"use client";

import { Input as HeroUIInput } from "@heroui/react";
import { forwardRef } from "react";

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  variant?: "flat" | "bordered" | "faded" | "underlined";
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  description?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  placeholder,
  type = "text",
  variant = "bordered",
  color = "default",
  size = "md",
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  isInvalid = false,
  errorMessage,
  description,
  startContent,
  endContent,
  className,
  value,
  defaultValue,
  onChange,
  name,
  ...props
}, ref) => {
  return (
    <HeroUIInput
      ref={ref}
      label={label}
      placeholder={placeholder}
      type={type}
      variant={variant}
      color={color}
      size={size}
      isRequired={isRequired}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      description={description}
      startContent={startContent}
      endContent={endContent}
      className={className}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      name={name}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
