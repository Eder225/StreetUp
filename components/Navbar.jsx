"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Fermeture du tiroir avec la touche Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Blocage du scroll body quand le tiroir est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("drawer-open");
    } else {
      document.body.classList.remove("drawer-open");
    }
    return () => document.body.classList.remove("drawer-open");
  }, [isOpen]);

  const navLinks = [
    { href: "/nouveautes", label: "Nouveautés", key: "nouveautes" },
    { href: "/vetements", label: "Vêtements", key: "vetements" },
    { href: "/sneakers", label: "Sneakers", key: "sneakers" },
    { href: "/accessoires", label: "Accessoires", key: "accessoires" },
  ];

  return (
    <header className="main-header">
      <div className="top-banner">Livraison gratuite dès 50.000 FCFA d'achats</div>

      <div className="nav-container">
        {/* Burger Button (Mobile) */}
        <div className="mobile-menu-toggle">
          <button
            type="button"
            id="burgerBtn"
            className="burger-btn"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
            aria-controls="mobileDrawer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Icône Burger */}
            <svg
              className={`icon icon-burger${isOpen ? " icon-burger--hidden" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              style={{ display: isOpen ? "none" : "block" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            {/* Icône Close */}
            <svg
              className="icon icon-close"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              style={{ display: isOpen ? "block" : "none" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Desktop */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`nav-link${pathname === link.href ? " active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Logo */}
        <div className="logo-wrapper">
          <Link href="/" className="logo-text">
            STREET<span className="logo-accent">UP</span>
          </Link>
        </div>

        {/* Actions (Recherche + Panier) */}
        <div className="actions-wrapper">
          <button className="action-btn" aria-label="Rechercher">
            <svg
              className="icon"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.603 10.601z"
              />
            </svg>
          </button>

          <Link href="/panier" className="cart-wrapper" aria-label="Voir le panier">
            <svg
              className="icon cart-icon"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
              />
            </svg>
            <span className="cart-badge">0</span>
          </Link>
        </div>
      </div>

      {/* Overlay (Mobile) */}
      <div
        id="drawerOverlay"
        className={`drawer-overlay${isOpen ? " is-active" : ""}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Tiroir Mobile */}
      <nav
        id="mobileDrawer"
        className={`mobile-drawer${isOpen ? " is-open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="drawer-header">
          <Link href="/" className="logo-text" onClick={() => setIsOpen(false)}>
            STREET<span className="logo-accent">UP</span>
          </Link>
          <button
            type="button"
            id="drawerCloseBtn"
            className="drawer-close-btn"
            aria-label="Fermer le menu"
            onClick={() => setIsOpen(false)}
          >
            <svg
              className="icon"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="drawer-links">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`drawer-link${pathname === link.href ? " active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
