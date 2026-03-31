import styles from "./Footer.module.css";

export const FooterAuth = () => {
  return (
    <footer className={styles.footerAuth}>
      <p className={styles.footerAuthCopy}>
        © {new Date().getFullYear()} Relax Map
      </p>
    </footer>
  );
};
