"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthNav() {
  const pathname = usePathname();

  return (
    <nav>
      <Link href="/sign-up">Реєстрація</Link>
      <Link href="/sign-in">Вхід</Link>
    </nav>
  );
}
