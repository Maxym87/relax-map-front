import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/Logo/Logo";
import { Nav } from "@/components/Nav/Nav";
import styles from "./Header.module.css";
import { useAuthStore } from "@/lib/store/authStore";

const baseLinks = [
  { href: "/", label: "Головна" },
  { href: "/locations", label: "Місця відпочинку" },
];

const profileLink = { href: "/profile", label: "Мій профіль" };

type HeaderMobileMenuProps = {
  onClose: () => void;
};

export const HeaderMobileMenu = ({ onClose }: HeaderMobileMenuProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const onLogout = useAuthStore((state) => state.clearIsAuthenticated);

  const links = isAuthenticated ? [...baseLinks, profileLink] : baseLinks;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className={styles.mobileMenu}>
      <div className={`container ${styles.menuTop}`}>
        <Logo onClick={onClose} />

        {!isAuthenticated && (
          <div className={styles.menuTopAuth}>
            <Link
              href="/login"
              className={`${styles.authBtn} ${styles.loginBtn}`}
              onClick={onClose}
            >
              Вхід
            </Link>
            <Link
              href="/register"
              className={`${styles.authBtn} ${styles.registerBtn}`}
              onClick={onClose}
            >
              Реєстрація
            </Link>
          </div>
        )}

        {isAuthenticated && (
          <Link
            href="/locations/action/add"
            className={styles.publishBtnTop}
            onClick={onClose}
          >
            Опублікувати статтю
          </Link>
        )}

        <button
          className={styles.iconBtn}
          type="button"
          aria-label="Закрити меню"
          onClick={onClose}
        >
          <svg width="24" height="24" aria-hidden="true">
            <use href="/img/icons.svg#icon-close" />
          </svg>
        </button>
      </div>

      <div className={styles.menuNav}>
        <Nav
          links={links}
          onClick={onClose}
          navClassName={styles.menuNavInner}
          listClassName={styles.menuList}
          linkClassName={styles.menuLink}
        />
      </div>

      {!isAuthenticated && (
        <div className={`container ${styles.menuBottom}`}>
          <Link
            href="/login"
            className={`${styles.authBtn} ${styles.loginBtn}`}
            onClick={onClose}
          >
            Вхід
          </Link>
          <Link
            href="/register"
            className={`${styles.authBtn} ${styles.registerBtn}`}
            onClick={onClose}
          >
            Реєстрація
          </Link>
        </div>
      )}

      {isAuthenticated && user && (
        <div className={`container ${styles.menuBottomAuth}`}>
          <Link
            href="/locations/action/add"
            className={`${styles.publishBtnBottom}`}
            onClick={onClose}
          >
            Опублікувати статтю
          </Link>
          <div className={styles.userRow}>
            <div className={styles.avatar}>
              <Image
                src={user.avatarUrl}
                alt={user.name}
                width={36}
                height={36}
              />
            </div>
            <span className={styles.userName}>{user.name}</span>
            <div className={styles.userDivider} />
            <button
              className={styles.logoutBtn}
              type="button"
              aria-label="Вийти"
              onClick={onLogout}
            >
              <svg width="24" height="24" aria-hidden="true">
                <use href="/img/icons.svg#icon-logout" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
