"use client";
import Link from "next/link";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<Map<string, HTMLElement>>(new Map());
  const underlineRef = useRef<HTMLElement | null>(null);
  const close = () => setOpen(false);
  const ondaCounter = useRef(0);

  // Flutuação contínua do logo
  useGSAP(() => {
    if (!logoRef.current) return;
    const tween = gsap.to(logoRef.current, {
      y: -5,
      repeat: -1,
      yoyo: true,
      duration: 1.8,
      ease: "sine.inOut",
      transformOrigin: "center center",
    });
    return () => tween.kill();
  }, []);

  // Animação criativa de expansão Wi-Fi ao clicar no logo Atari
  const handleLogoClick = useCallback(() => {
    if (!containerRef.current || !logoRef.current) return;

    gsap.to(logoRef.current, {
      scale: 1.06,
      rotation: 3,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
      transformOrigin: "center center",
    });

    const ondaIds = [++ondaCounter.current, ++ondaCounter.current, ++ondaCounter.current];
    const delays = [0, 0.12, 0.24];

    ondaIds.forEach((_id, i) => {
      const onda = document.createElement("div");
      onda.className = "wifi-onda";
      containerRef.current!.appendChild(onda);

      const rect = containerRef.current!.getBoundingClientRect();
      const imgRect = logoRef.current!.getBoundingClientRect();
      const cx = imgRect.left - rect.left + imgRect.width / 2;
      const cy = imgRect.top - rect.top + imgRect.height / 2 - 10;
      onda.style.left = `${cx}px`;
      onda.style.top = `${cy}px`;
      onda.style.width = "0";
      onda.style.height = "0";

      const tl = gsap.timeline();
      tl.to(onda, {
        "--s": 2.6,
        "--o": 0,
        duration: 1.1,
        ease: "power2.out",
        onUpdate: () => {
          const s = parseFloat(getComputedStyle(onda).getPropertyValue("--s").trim()) || 1;
          const o = parseFloat(getComputedStyle(onda).getPropertyValue("--o").trim()) || 1;
          onda.style.transform = `translate(-50%, -50%) scale(${s})`;
          onda.style.opacity = String(o);
        },
        onComplete: () => onda.remove(),
      }, delays[i]);
    });

    const flash = document.createElement("div");
    flash.className = "wifi-flash";
    containerRef.current!.appendChild(flash);
    const cx2 = logoRef.current!.getBoundingClientRect().left -
      containerRef.current!.getBoundingClientRect().left +
      logoRef.current!.getBoundingClientRect().width / 2;
    const cy2 = logoRef.current!.getBoundingClientRect().top -
      containerRef.current!.getBoundingClientRect().top +
      logoRef.current!.getBoundingClientRect().height / 2 - 10;
    flash.style.left = `${cx2}px`;
    flash.style.top = `${cy2}px`;

    gsap.to(flash, {
      "--r": 60,
      "--o": 0,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => {
        const r = parseFloat(getComputedStyle(flash).getPropertyValue("--r").trim()) || 0;
        const o = parseFloat(getComputedStyle(flash).getPropertyValue("--o").trim()) || 1;
        flash.style.transform = `translate(-50%, -50%) scale(${r / 20})`;
        flash.style.opacity = String(o);
      },
      onComplete: () => flash.remove(),
    });
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
        <div
          ref={containerRef}
          className="logo-container"
          onClick={handleLogoClick}
          style={{ cursor: "pointer", position: "relative", display: "inline-block" }}
        >
          <svg
            ref={logoRef}
            className="brand-logo"
            viewBox="0 0 220 200"
            aria-label="broadcastganes.com.br"
            role="img"
            style={{ display: "block" }}
          >
            {/* Ondas de Wi-Fi - lado esquerdo */}
            <path d="M30 80 Q45 65 60 80" fill="none" stroke="#00ff87" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
            <path d="M25 80 Q50 45 75 80" fill="none" stroke="#00ff87" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
            <path d="M20 80 Q55 25 90 80" fill="none" stroke="#00ff87" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />

            {/* Ondas de Wi-Fi - lado direito */}
            <path d="M190 80 Q175 65 160 80" fill="none" stroke="#00ff87" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
            <path d="M195 80 Q170 45 145 80" fill="none" stroke="#00ff87" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
            <path d="M200 80 Q165 25 130 80" fill="none" stroke="#00ff87" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />

            {/* Base do joystick Atari */}
            <rect x="34" y="112" width="152" height="60" rx="18" fill="#0b1120" stroke="#00ff87" strokeWidth="3" />
            <rect x="50" y="122" width="120" height="14" rx="7" fill="#151e30" />
            <rect x="74" y="138" width="72" height="18" rx="5" fill="#151e30" stroke="#00ff87" strokeWidth="1.5" />

            {/* Haste do joystick */}
            <rect x="94" y="60" width="32" height="54" rx="10" fill="#0b1120" stroke="#00ff87" strokeWidth="3" />
            {/* Bola do joystick */}
            <circle cx="110" cy="52" r="20" fill="#00ff87" stroke="#ffffff" strokeWidth="2" />
            <circle cx="104" cy="46" r="5" fill="#ffffff" opacity="0.9" />

            {/* Antena Wi-Fi central */}
            <line x1="110" y1="52" x2="110" y2="30" stroke="#00ff87" strokeWidth="3" strokeLinecap="round" />
            <path d="M94 30 Q110 18 126 30" fill="none" stroke="#00ff87" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
            <path d="M80 30 Q110 10 140 30" fill="none" stroke="#00ff87" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
            <path d="M66 30 Q110 0 154 30" fill="none" stroke="#00ff87" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
          </svg>
        </div>
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
