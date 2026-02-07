"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/eventos", label: "Eventos" },
  { href: "/viajes", label: "Viajes" },
  { href: "/calendario", label: "Calendario" }
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="brand">
          <span className="logo-dot" />
          <div>
            <p className="brand-name">Cole Together</p>
            <p className="brand-tag">Salidas y viajes con buena onda</p>
          </div>
        </div>
        <nav className="site-nav" aria-label="Navegacion principal">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={pathname === item.href ? "active" : ""}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
