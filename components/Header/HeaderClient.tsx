"use client";

import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { Logo } from "@/components/Logo/Logo";
import { Nav } from "@/components/Nav/Nav";
import { HeaderActions } from "./HeaderActions";
import { HeaderMobileMenu } from "./HeaderMobileMenu";
import styles from "./Header.module.css";

const baseLinks = [
  { href: "/", label: "Головна" },
  { href: "/locations", label: "Місця відпочинку" },
];

const profileLink = { href: "/profile", label: "Мій профіль" };

export const HeaderClient = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const navLinks = isAuthenticated ? [...baseLinks, profileLink] : baseLinks;

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Logo />

        <div className={styles.desktopNav}>
          <Nav
            links={navLinks}
            listClassName={styles.desktopList}
            linkClassName={styles.desktopLink}
          />
        </div>

        <HeaderActions />

        <button
          className={`${styles.iconBtn} ${styles.burger}`}
          type="button"
          aria-label={isOpen ? "Закрити меню" : "Відкрити меню"}
          aria-expanded={isOpen}
          onClick={isOpen ? close : open}
        >
          <svg width="32" height="32" aria-hidden="true">
            <use
              href={
                isOpen
                  ? "/img/icons.svg#icon-close"
                  : "/img/icons.svg#icon-menu"
              }
            />
          </svg>
        </button>
      </div>

      {isOpen && <HeaderMobileMenu onClose={close} />}
    </header>
  );
};
