"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowUpRight, Menu, ScanLine, X } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { NavText3D } from "@/components/nav-text-3d";

type LinkVariant = "signals" | "deals" | "discover" | "launches" | "central" | "radar";

const links: { href: string; label: string; variant: LinkVariant }[] = [
  { href: "/signals", label: "Sinais", variant: "signals" },
  { href: "/deals", label: "Ofertas", variant: "deals" },
  { href: "/discover", label: "Descobrir", variant: "discover" },
  { href: "/releases", label: "Lançamentos", variant: "launches" },
  { href: "/central#catalogo", label: "Central", variant: "central" },
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
  const containerRef = useRef<HTMLDivElement>(null);
  const brandToplineRef = useRef<HTMLSpanElement>(null);
  const brandBottomlineRef = useRef<HTMLSpanElement>(null);
  const navRefs = useRef<Map<string, HTMLElement>>(new Map());
  const underlineRef = useRef<HTMLElement | null>(null);
  const close = () => setOpen(false);
  const ondaCounter = useRef(0);

  // Animação de entrada do nome do site (BROADCAST GAMES)
  useGSAP(() => {
    if (!brandToplineRef.current || !brandBottomlineRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tl = gsap.timeline();
    tl.fromTo(
      brandToplineRef.current,
      { opacity: 0, y: 20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.7)" }
    )
      .fromTo(
        brandBottomlineRef.current,
        { opacity: 0, y: 20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.7)" },
        "-=0.3"
      );
  }, []);

  // Brilho pulsante contínuo no nome do site
  useGSAP(() => {
    if (!brandToplineRef.current || !brandBottomlineRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(
      [brandToplineRef.current, brandBottomlineRef.current],
      {
        filter: "drop-shadow(0 0 20px rgba(0,255,135,0.9))",
        textShadow: "0 0 12px rgba(0,255,135,0.7)",
        duration: 1.2,
        ease: "sine.inOut",
      },
      0
    );
  }, []);

  // Animação de ondas de rádio se expandindo ao clicar no logo
  const handleLogoClick = useCallback(() => {
    if (!containerRef.current || !logoRef.current) return;

    // Efeito de ativação no logo + nome
    gsap.to([logoRef.current, brandToplineRef.current, brandBottomlineRef.current], {
      scale: 1.08,
      rotation: 4,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
      transformOrigin: "center center",
    });

    // Gera 4 ondas de rádio concêntricas a partir do centro do logo
    const ondaIds = [++ondaCounter.current, ++ondaCounter.current, ++ondaCounter.current, ++ondaCounter.current];
    const delays = [0, 0.1, 0.2, 0.3];

    ondaIds.forEach((_id, i) => {
      const onda = document.createElement("div");
      onda.className = "radio-onda";
      containerRef.current!.appendChild(onda);

      const rect = containerRef.current!.getBoundingClientRect();
      const imgRect = logoRef.current!.getBoundingClientRect();
      const cx = imgRect.left - rect.left + imgRect.width / 2;
      const cy = imgRect.top - rect.top + imgRect.height / 2;
      onda.style.left = `${cx}px`;
      onda.style.top = `${cy}px`;
      onda.style.width = "0";
      onda.style.height = "0";

      const tl = gsap.timeline();
      tl.to(onda, {
        "--s": 3.2,
        "--o": 0,
        duration: 1.4,
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

    // Flash central ao clicar
    const flash = document.createElement("div");
    flash.className = "radio-flash";
    containerRef.current!.appendChild(flash);
    const cx2 = logoRef.current!.getBoundingClientRect().left -
      containerRef.current!.getBoundingClientRect().left +
      logoRef.current!.getBoundingClientRect().width / 2;
    const cy2 = logoRef.current!.getBoundingClientRect().top -
      containerRef.current!.getBoundingClientRect().top +
      logoRef.current!.getBoundingClientRect().height / 2;
    flash.style.left = `${cx2}px`;
    flash.style.top = `${cy2}px`;

    gsap.to(flash, {
      "--r": 70,
      "--o": 0,
      duration: 0.6,
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
        aria-label="BROADCAST.GG início"
        onClick={close}
      >
        <div
          ref={containerRef}
          className="logo-container"
          onClick={handleLogoClick}
          style={{ cursor: "pointer", position: "relative", display: "inline-block" }}
        >
          <Image
            ref={logoRef}
            src="/logo-radio.png"
            alt="BROADCAST.GG"
            className="brand-logo"
            width={400}
            height={400}
            priority
            style={{ display: "block", borderRadius: "12px" }}
          />
          <div className="brand-text">
            <span
              ref={brandToplineRef}
              className="brand-topline"
            >
              BROADCAST
            </span>
            <span
              ref={brandBottomlineRef}
              className="brand-bottomline"
            >
              GAMES
            </span>
          </div>
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
          const hrefPath = href.split("#")[0];
          const active = pathname === hrefPath;
          const showDealsToast = () => {
            window.dispatchEvent(
              new CustomEvent("broadcast-toast", {
                detail: { message: "🔥 12 jogos em promoção agora" },
              }),
            );
          };
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              onClick={close}
              onMouseEnter={variant === "deals" ? showDealsToast : undefined}
              className={`nav-link ${active ? "nav-link-active" : ""}`}
              ref={(el) => {
                if (el) navRefs.current.set(hrefPath, el);
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
