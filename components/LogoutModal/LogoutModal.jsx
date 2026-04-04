"use client";

import styles from "./LogoutModal.module.css";
import { useEffect } from "react";

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  // 🔒 Закриття по ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // 🔒 Блокування скролу
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className={styles.overlay} onClick={onClose}></div>

      {/* Modal */}
      <div className={styles.modal}>
        <h2 className={styles.title}>Підтвердження виходу</h2>

        <p className={styles.text}>
          Ви дійсно хочете вийти з акаунту?
        </p>

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>
            Скасувати
          </button>

          <button className={styles.confirm} onClick={onConfirm}>
            Вийти
          </button>
        </div>
      </div>
    </>
  );
}