"use client";

import { ReactNode } from "react";

interface ButtonProps {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  label,
  icon,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  ariaLabel,
  type = "button",
}: ButtonProps) {
  // Base styles (always applied)
  const baseStyles =
    "inline-flex items-center gap-2 font-medium rounded-lg shadow-sm transition-all duration-200 focus:outline-none";

  // Size variants
  const sizeVariants = {
    sm: "px-3 sm:px-4 py-1.5 sm:py-2 text-sm",
    md: "px-5 sm:px-6 py-2.5 sm:py-3 text-base",
    lg: "px-6 sm:px-7 py-3 sm:py-4 text-lg",
  };

  // Color variants with hover, focus, and active states
  const colorVariants = {
    primary:
      "bg-primary-600 dark:bg-primary-500 text-white hover:bg-primary-700 dark:hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-2 dark:focus:ring-offset-neutral-950 active:scale-95",
    secondary:
      "bg-secondary-600 dark:bg-secondary-500 text-white hover:bg-secondary-700 dark:hover:bg-secondary-600 focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400 focus:ring-offset-2 dark:focus:ring-offset-neutral-950 active:scale-95",
    outline:
      "bg-transparent dark:bg-transparent border border-primary-600 dark:border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-neutral-800 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-2 dark:focus:ring-offset-neutral-950 active:scale-95",
    danger:
      "bg-error dark:bg-error text-white hover:bg-red-700 dark:hover:bg-red-600 focus:ring-2 focus:ring-error focus:ring-offset-2 dark:focus:ring-offset-neutral-950 active:scale-95",
  };

  // Disabled state
  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  // Combine all classes
  const finalClassName = `${baseStyles} ${sizeVariants[size]} ${colorVariants[variant]} ${disabledStyles} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || label}
      className={finalClassName}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </button>
  );
}
