"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Menu, ScanLine, X } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { NavText3D } from "@/components/nav-text-3d";

type LinkVariant = "signals" | "deals" | "discover" | "launches" | "radar";

const links: { href: string; label: string; variant: LinkVariant }[] = [
  { href: "/signals", label: "Sinais", variant: "signals" },
  { href: "/deals", label: "Ofertas", variant: "deals" },
  { href: "/discover", label: "Descobrir", variant: "discover" },
  { href: "/launches", label: "Lançamentos", variant: "launches" },
  { href: "/radar", label: "Radar", variant: "radar" },
];

export function SiteHeader() {
  const pathname = usePathname();
  return <HeaderContent key={pathname} pathname={pathname} />;
}

function HeaderContent({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const navRefs = useRef<Map<string, HTMLElement>>(new Map());
  const underlineRef = useRef<HTMLElement | null>(null);
  const close = () => setOpen(false);

  // Logo animação sutil
  useGSAP(() => {
    if (!logoRef.current) return;
    const tween = gsap.to(logoRef.current, {
      rotation: 6,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: "sine.inOut",
      transformOrigin: "center center",
    });
    return () => tween.kill();
  }, []);

  // Animação de entrada dos links quando o menu abre (mobile) com stagger
  useGSAP(() => {
    if (!open) return undefined;
    const items = Array.from(navRefs.current.values());
    const tl = gsap.timeline();
    tl.fromTo(
      items,
      { opacity: 0, y: 18, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger: 0.07,
        ease: "power3.out",
      }
    );
    return () => tl.kill();
  }, [open]);

  // Tinta (underline) da aba ativa animada com GSAP
  useGSAP(() => {
    const active = navRefs.current.get(pathname);
    if (!underlineRef.current || !active) return undefined;

    active.scrollIntoView({ block: "nearest", inline: "center" });

    const tl = gsap.timeline();
    tl.to(underlineRef.current, {
      width: active.offsetWidth,
      x: active.offsetLeft,
      duration: 0.5,
      ease: "expo.inOut",
    });
    return () => tl.kill();
  }, [pathname]);

  // Reposiciona a tinta ao redimensionar a janela.
  useEffect(() => {
    const onResize = () => {
      const active = navRefs.current.get(pathname);
      if (!underlineRef.current || !active) return;
      gsap.to(underlineRef.current, {
        width: active.offsetWidth,
        x: active.offsetLeft,
        duration: 0.5,
        ease: "expo.inOut",
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [pathname]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      close();
      toggle.current?.focus();
    }
  };

  return (
    <header
      id="top"
      className="site-header"
      onKeyDown={handleKeyDown}
    >
      <Link
        className="brand"
        href="/"
        aria-label="broadcastganes.com.br início"
        onClick={close}
      >
        <Image
          ref={logoRef}
          src="/logo.png"
          alt="broadcastganes.com.br"
          className="brand-logo"
          width={1254}
          height={1254}
          priority
        />
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
        {links.map(({ href, label, variant }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              onClick={close}
              className={`nav-link ${active ? "nav-link-active" : ""}`}
              ref={(el) => {
                if (el) navRefs.current.set(href, el);
              }}
            >
              <span className="nav-link-label">
                <NavText3D variant={variant}>{label}</NavText3D>
              </span>
              <span
                ref={active
                  ? (el) => {
                      if (el) underlineRef.current = el;
                      return () => {
                        if (underlineRef.current === el) underlineRef.current = null;
                      };
                    }
                  : undefined}
                className={`nav-link-underline nav-link-underline--${variant}`}
                aria-hidden="true"
              />
            </Link>
          );
        })}
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
