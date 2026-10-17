"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { ArrowUpRight, AudioLines, Menu, ScanLine, X } from "lucide-react";
const links = [
  ["/signals", "Signals"],
  ["/deals", "Deals"],
  ["/discover", "Discover"],
  ["/radar", "Radar"],
];
export function SiteHeader() {
  const pathname = usePathname();
  return <HeaderContent key={pathname} pathname={pathname} />;
}
function HeaderContent({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);
  return (
    <header
      id="top"
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          close();
          toggle.current?.focus();
        }
      }}
    >
      <Link
        className="brand"
        href="/"
        aria-label="BROADCAST.GG início"
        onClick={close}
      >
        <AudioLines aria-hidden="true" />
        <span>
          BROADCAST<span className="lime">.GG</span>
        </span>
      </Link>
      <button
        ref={toggle}
        className="menu-toggle"
        aria-label="Abrir navegação"
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <nav
        id="primary-navigation"
        aria-label="Navegação principal"
        className={open ? "is-open" : ""}
      >
        {links.map(([href, label]) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname === href ? "page" : undefined}
            onClick={close}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <Link
          className="header-radar"
          href="/radar"
          aria-label="Meu radar"
          onClick={close}
        >
          <ScanLine size={16} aria-hidden="true" />
          <span>Meu radar</span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
