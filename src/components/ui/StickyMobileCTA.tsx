import React, { useEffect, useState } from "react";
import BrandButton from "@/components/ui/BrandButton";

export default function StickyMobileCTA({
  label,
  price,
  href,
}: { label: string; price?: string; href: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-3 inset-x-3 z-50 md:hidden">
      <div className="flex items-center gap-3 rounded-2xl shadow-lg border border-violet-200/60 bg-white px-3 py-2">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">{label}</div>
          {price && (
            <div className="text-xs text-slate-600">~${price} on Amazon</div>
          )}
        </div>
        <div className="ml-auto">
          <BrandButton href={href}>See price</BrandButton>
        </div>
      </div>
    </div>
  );
}
