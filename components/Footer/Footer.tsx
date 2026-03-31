import styles from "./Footer.module.css";
import { Logo } from "@/components/Logo/Logo";
import { Nav } from "@/components/Nav/Nav";

const footerLinks = [
  { href: "/", label: "Головна" },
  { href: "/locations", label: "Місця відпочинку" },
];

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <ul className={styles.socials}>
          <li>
            <a
              href="https://facebook.com"
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg width="24" height="24" aria-hidden="true">
                <use href="/img/icons.svg#icon-facebook" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com"
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg width="24" height="24" aria-hidden="true">
                <use href="/img/icons.svg#icon-instagram" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="https://x.com"
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              <svg width="24" height="24" aria-hidden="true">
                <use href="/img/icons.svg#icon-x" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="https://youtube.com"
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <svg width="24" height="24" aria-hidden="true">
                <use href="/img/icons.svg#icon-youtube" />
              </svg>
            </a>
          </li>
        </ul>

        <div className={styles.nav}>
          <Nav
            links={footerLinks}
            linkClassName={styles.navLink}
            listClassName={styles.navList}
          />
        </div>

        <div className={styles.divider} />

        <p className={styles.copy}>
          © {new Date().getFullYear()} Природні Мандри. Усі права захищені.
        </p>
      </div>
    </footer>
  );
};
