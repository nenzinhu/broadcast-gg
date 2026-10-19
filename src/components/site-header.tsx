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
  const navRefs = useRef<Map<string, HTMLElement>>(new Map());
  const underlineRef = useRef<HTMLElement | null>(null);
  const close = () => setOpen(false);

  // Refs dos elementos do jogo Atari
  const navesRef = useRef<SVGGElement>(null);
  const tirosRef = useRef<SVGGElement>(null);
  const explosoesRef = useRef<SVGGElement>(null);

  // Logo animação sutil (joystick flutuando)
  useGSAP(() => {
    if (!logoRef.current) return;
    const tween = gsap.to(logoRef.current, {
      y: -6,
      rotation: 4,
      repeat: -1,
      yoyo: true,
      duration: 1.6,
      ease: "sine.inOut",
      transformOrigin: "center center",
    });
    return () => tween.kill();
  }, []);

  // Animação Atari: ao tocar, naves surgem e o controle dispara tiros com explosões
  const handleLogoEnter = useCallback(() => {
    if (!navesRef.current || !tirosRef.current || !explosoesRef.current) return;

    // Limpa estados anteriores
    gsap.killTweensOf([navesRef.current, tirosRef.current, explosoesRef.current]);
    gsap.set(navesRef.current, { opacity: 1 });
    gsap.set(tirosRef.current, { opacity: 0 });
    gsap.set(explosoesRef.current, { opacity: 0 });

    const tl = gsap.timeline({ repeat: -1 });

    // Nave esquerda aparece e se move
    tl.to(
      navesRef.current,
      {
        attr: { transform: "translate(20, 40)" },
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      },
      0
    )
      // Tiro da esquerda
      .to(
        tirosRef.current,
        {
          attr: { transform: "translate(60, 48)" },
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        },
        0.6
      )
      // Explosão nave esquerda
      .to(
        explosoesRef.current,
        {
          attr: { cx: 70, cy: 48, r: 0 },
          opacity: 1,
          duration: 0.05,
        },
        0.95
      )
      .to(
        explosoesRef.current,
        { attr: { r: 10 }, opacity: 0, duration: 0.25, ease: "power2.out" },
        1
      )
      // Nave direita aparece e se move
      .to(
        navesRef.current,
        {
          attr: { transform: "translate(160, 40)" },
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        1.5
      )
      // Tiro da direita
      .to(
        tirosRef.current,
        {
          attr: { transform: "translate(130, 48)" },
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        },
        2.1
      )
      // Explosão nave direita
      .to(
        explosoesRef.current,
        {
          attr: { cx: 120, cy: 48, r: 0 },
          opacity: 1,
          duration: 0.05,
        },
        2.45
      )
      .to(
        explosoesRef.current,
        { attr: { r: 10 }, opacity: 0, duration: 0.25, ease: "power2.out" },
        2.5
      );
  }, []);

  const handleLogoLeave = useCallback(() => {
    gsap.killTweensOf([navesRef.current, tirosRef.current, explosoesRef.current]);
    gsap.set(navesRef.current, { opacity: 0, attr: { transform: "translate(0,0)" } });
    gsap.set(tirosRef.current, { opacity: 0, attr: { transform: "translate(0,0)" } });
    gsap.set(explosoesRef.current, { opacity: 0, attr: { r: 0 } });
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
          viewBox="0 0 220 200"
          aria-label="broadcastganes.com.br"
          role="img"
          onMouseEnter={handleLogoEnter}
          onMouseLeave={handleLogoLeave}
          style={{ cursor: "pointer", display: "block" }}
        >
          {/* Ondas de Wi-Fi - lado esquerdo */}
          <path d="M30 80 Q45 65 60 80" fill="none" stroke="#00ff87" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          <path d="M25 80 Q50 45 75 80" fill="none" stroke="#00ff87" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
          <path d="M20 80 Q55 25 90 80" fill="none" stroke="#00ff87" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />

          {/* Ondas de Wi-Fi - lado direito */}
          <path d="M190 80 Q175 65 160 80" fill="none" stroke="#00ff87" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          <path d="M195 80 Q170 45 145 80" fill="none" stroke="#00ff87" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
          <path d="M200 80 Q165 25 130 80" fill="none" stroke="#00ff87" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />

          {/* Base do joystick Atari (maior) */}
          <rect x="34" y="112" width="152" height="60" rx="18" fill="#0b1120" stroke="#00ff87" strokeWidth="3" />
          <rect x="50" y="122" width="120" height="14" rx="7" fill="#151e30" />
          {/* Detalhe frontal da base */}
          <rect x="74" y="138" width="72" height="18" rx="5" fill="#151e30" stroke="#00ff87" strokeWidth="1.5" />

          {/* Haste do joystick (maior) */}
          <rect x="94" y="60" width="32" height="54" rx="10" fill="#0b1120" stroke="#00ff87" strokeWidth="3" />
          {/* Bola do joystick (maior) */}
          <circle cx="110" cy="52" r="20" fill="#00ff87" stroke="#ffffff" strokeWidth="2" />
          <circle cx="104" cy="46" r="5" fill="#ffffff" opacity="0.9" />

          {/* Antena Wi-Fi central */}
          <line x1="110" y1="52" x2="110" y2="30" stroke="#00ff87" strokeWidth="3" strokeLinecap="round" />
          <path d="M94 30 Q110 18 126 30" fill="none" stroke="#00ff87" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
          <path d="M80 30 Q110 10 140 30" fill="none" stroke="#00ff87" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          <path d="M66 30 Q110 0 154 30" fill="none" stroke="#00ff87" strokeWidth="3" strokeLinecap="round" opacity="0.45" />

          {/* Naves Atari (alvos) */}
          <g ref={navesRef} opacity="0">
            {/* Nave esquerda */}
            <rect x="18" y="36" width="18" height="10" rx="2" fill="#fff700" />
            <rect x="22" y="38" width="10" height="6" rx="1" fill="#0b1120" />
            {/* Nave direita */}
            <rect x="184" y="36" width="18" height="10" rx="2" fill="#ff00de" />
            <rect x="188" y="38" width="10" height="6" rx="1" fill="#0b1120" />
          </g>

          {/* Tiros */}
          <g ref={tirosRef} opacity="0">
            <circle cx="56" y="44" r="3" fill="#00ff87" />
            <circle cx="154" y="44" r="3" fill="#ff00de" />
          </g>

          {/* Explosões */}
          <g ref={explosoesRef} opacity="0">
            <circle cx="70" cy="44" r="0" fill="none" stroke="#fff700" strokeWidth="3" />
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
