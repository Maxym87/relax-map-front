import Link from "next/link";

export type NavLink = {
  href: string;
  label: string;
};

export type NavProps = {
  links: NavLink[];
  onClick?: () => void;
  navClassName?: string;
  listClassName?: string;
  linkClassName?: string;
};

export const Nav = ({
  links,
  onClick,
  navClassName,
  listClassName,
  linkClassName,
}: NavProps) => {
  return (
    <nav className={navClassName}>
      <ul className={listClassName}>
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className={linkClassName} onClick={onClick}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
