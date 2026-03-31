import Link from "next/link";
import styles from "./Header.module.css";

export const HeaderAuth = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link
          href="/"
          className={styles.logo}
          aria-label="Relax Map — на головну"
        >
          <svg
            width="129"
            height="36"
            className={styles.logoIcon}
            aria-hidden="true"
          >
            <use href="/img/icons.svg#icon-logo" />
          </svg>
        </Link>
      </div>
    </header>
  );
};
