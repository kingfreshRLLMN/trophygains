"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/workout-plans", label: "Workout Plans" },
  { href: "/nutrition-plans", label: "Nutrition" },
  { href: "/ebooks", label: "Ebooks" },
  { href: "/custom-coaching", label: "Coaching" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link className="flex items-center gap-3" href="/">
          <Image
            alt="TrophyGains logo"
            className="h-16 w-16 rounded-full border border-gold-soft/80 bg-white object-contain shadow-xl shadow-gold/10"
            height={96}
            priority
            src="/trophygains-logo-cropped.png"
            width={96}
          />
          <span className="hidden text-lg font-black tracking-wide min-[390px]:inline">Trophy Gains</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link className="pressable text-sm font-semibold text-zinc-300 transition hover:text-gold-soft" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link className="pressable relative rounded-md border border-white/15 p-3 transition hover:border-gold/60" href="/checkout" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-xs font-black text-black">
                {count}
              </span>
            ) : null}
          </Link>
          <button className="pressable rounded-md border border-white/15 p-3 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-black px-6 py-5 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-3">
            {links.map((link) => (
              <Link className="rounded-md px-3 py-3 text-sm font-bold text-zinc-200 hover:bg-white/10" href={link.href} key={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
