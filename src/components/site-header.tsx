"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, AudioLines, Menu, ScanLine, X } from "lucide-react";

const links = [
  { href: "/signals", label: "Signals" },
  { href: "/deals", label: "Deals" },
  { href: "/discover", label: "Discover" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the menu when the route changes (render-time adjustment).
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Move focus into the menu when it opens so keyboard users continue there.
  useEffect(() => {
    if (open) navRef.current?.querySelector("a")?.focus();
  }, [open]);

  // Escape closes the mobile menu and returns focus to its toggle.
  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (!open || event.key !== "Escape") return;
    setOpen(false);
    toggleRef.current?.focus();
  }

  const isCurrent = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="site-header" onKeyDown={handleKeyDown}>
      <Link className="brand" href="/" aria-label="BROADCAST.GG início">
        <AudioLines aria-hidden="true" />
        <span>
          BROADCAST<span className="lime">.GG</span>
        </span>
      </Link>
      <nav
        ref={navRef}
        id="primary-nav"
        aria-label="Navegação principal"
        className={open ? "nav-open" : ""}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isCurrent(link.href) ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <Link
          className="header-radar"
          href="/radar"
          aria-current={isCurrent("/radar") ? "page" : undefined}
        >
          <ScanLine size={16} aria-hidden="true" />
          <span>Meu radar</span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X size={20} aria-hidden="true" />
          ) : (
            <Menu size={20} aria-hidden="true" />
          )}
          <span className="sr-only">
            {open ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          </span>
        </button>
      </div>
    </header>
  );
}