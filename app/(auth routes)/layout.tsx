"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    router.refresh();
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <header>
        <Image
          src="/logo.svg"
          alt="Relax Map"
          width={120}
          height={32}
          priority
        />
      </header>

      <main>{children}</main>

      <footer>
        <p>© 2025 Relax Map</p>
      </footer>
    </div>
  );
}
