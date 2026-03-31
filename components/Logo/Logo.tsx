import Link from "next/link";

type LogoProps = {
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
};

export const Logo = ({ onClick, className, iconClassName }: LogoProps) => {
  return (
    <Link
      href="/"
      className={className}
      aria-label="Relax Map — на головну"
      onClick={onClick}
    >
      <svg width="129" height="40" className={iconClassName} aria-hidden="true">
        <use href="/img/icons.svg#icon-logo" />
      </svg>
    </Link>
  );
};
