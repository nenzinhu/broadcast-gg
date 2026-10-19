"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect, useCallback } from "react";
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
  const logoRef = useRef<SVGSVGElement>(null);
  const naveRef = useRef<SVGRectElement>(null);
  const tiroRef = useRef<SVGCircleElement>(null);
  const explosaoRef = useRef<SVGCircleElement>(null);
  const grupoTiroRef = useRef<SVGGElement>(null);
  const navRefs = useRef<Map<string, HTMLElement>>(new Map());
  const underlineRef = useRef<HTMLElement | null>(null);
  const close = () => setOpen(false);

  // Logo animação sutil (joystick flutuando)
  useGSAP(() => {
    if (!logoRef.current) return;
    const tween = gsap.to(logoRef.current, {
      rotation: 5,
      repeat: -1,
      yoyo: true,
      duration: 1.4,
      ease: "sine.inOut",
      transformOrigin: "center center",
    });
    return () => tween.kill();
  }, []);

  // Animação de tiro do Atari no hover do logo
  const handleLogoEnter = useCallback(() => {
    if (!grupoTiroRef.current || !naveRef.current || !tiroRef.current || !explosaoRef.current) return;
    const tl = gsap.timeline();
    tl.to(grupoTiroRef.current, { opacity: 1, duration: 0.15 })
      .to(naveRef.current, { y: -4, duration: 0.08, yoyo: true, repeat: 1 }, 0)
      .to(tiroRef.current, { x: 170, duration: 0.55, ease: "power2.out" }, 0.1)
      .to(
        explosaoRef.current,
        { r: 14, opacity: 0, duration: 0.25, ease: "power2.out" },
        0.55
      )
      .to(grupoTiroRef.current, { opacity: 0, duration: 0.2 }, 0.85);
    // guarda a timeline para matar no leave se necessário
    (grupoTiroRef.current as any)._tl = tl;
  }, []);

  const handleLogoLeave = useCallback(() => {
    gsap.killTweensOf([naveRef.current, tiroRef.current, explosaoRef.current, grupoTiroRef.current]);
    gsap.set(grupoTiroRef.current, { opacity: 0 });
    gsap.set(tiroRef.current, { x: 110 });
    gsap.set(explosaoRef.current, { r: 0, opacity: 0 });
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
        <svg
          ref={logoRef}
          className="brand-logo"
          viewBox="0 0 200 180"
          aria-label="broadcastganes.com.br"
          role="img"
          onMouseEnter={handleLogoEnter}
          onMouseLeave={handleLogoLeave}
          style={{ cursor: "pointer", display: "block" }}
        >
          {/* Base do joystick Atari */}
          <rect x="38" y="105" width="124" height="52" rx="14" fill="#0b1120" stroke="#00ff87" strokeWidth="2.5" />
          <rect x="52" y="114" width="96" height="10" rx="5" fill="#151e30" />
          {/* Detalhe frontal da base */}
          <rect x="70" y="126" width="60" height="14" rx="4" fill="#151e30" stroke="#00ff87" strokeWidth="1" />

          {/* Haste do joystick */}
          <rect x="86" y="62" width="28" height="44" rx="8" fill="#0b1120" stroke="#00ff87" strokeWidth="2.5" />
          {/* Bola do joystick */}
          <circle cx="100" cy="56" r="16" fill="#00ff87" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="96" cy="52" r="4" fill="#ffffff" opacity="0.9" />

          {/* Antena Wi-Fi saindo da bola */}
          <line x1="100" y1="56" x2="100" y2="32" stroke="#00ff87" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M86 32 Q100 22 114 32" fill="none" stroke="#00ff87" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
          <path d="M74 32 Q100 14 126 32" fill="none" stroke="#00ff87" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          <path d="M62 32 Q100 6 138 32" fill="none" stroke="#00ff87" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />

          {/* Grupo tiro Atari - nave atirando */}
          <g
            ref={grupoTiroRef}
            opacity="0"
          >
            {/* Nave */}
            <rect
              ref={naveRef}
              x="92"
              y="22"
              width="16"
              height="10"
              rx="2"
              fill="#fff700"
            />
            <rect x="96" y="24" width="8" height="6" rx="1" fill="#0b1120" />
            {/* Tiro */}
            <circle
              ref={tiroRef}
              cx="110"
              cy="27"
              r="3"
              fill="#ff00de"
            />
            {/* Explosão ao final do trajeto */}
            <circle
              ref={explosaoRef}
              cx="170"
              cy="27"
              r="0"
              fill="none"
              stroke="#fff700"
              strokeWidth="2.5"
              opacity="0"
            />
          </g>
        </svg>
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
