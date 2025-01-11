"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export const NavItem = ({
  link,
  name,
  classes,
}: {
  link: string;
  name: string;
  classes?: string;
}) => {
  const pathname = usePathname();

  const isActive = pathname === link;

  return (
    <Link href={link}>
      <span
        className={`transition ${classes} ${
          isActive
            ? "font-medium text-primary hover:text-primaryDark"
            : "text-blackish hover:text-gray-500"
        }`}
      >
        {name}
      </span>
    </Link>
  );
};
