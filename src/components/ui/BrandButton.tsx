import React from "react";

type Props = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  newTab?: boolean;
  rel?: string;
  disabled?: boolean;
};

export default function BrandButton({
  href,
  onClick,
  children,
  className = "",
  fullWidth = false,
  newTab = true,
  rel = "nofollow sponsored noopener noreferrer",
  disabled = false,
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-full text-white " +
    "px-5 py-2 shadow-sm hover:shadow-md active:scale-[.99] transition " +
    "bg-gradient-to-r from-fuchsia-500 to-violet-600 " +
    (fullWidth ? "w-full " : "");

  const cls = base + (disabled ? " opacity-60 pointer-events-none " : "") + className;

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        target={newTab ? "_blank" : undefined}
        rel={rel}
        aria-disabled={disabled}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cls}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
}
