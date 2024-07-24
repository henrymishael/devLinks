"use client";
import {
  EyeIcon,
  Link2,
  LinkIcon,
  UserCircle2,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Logo from "~/components/common/Logo";
import { Button } from "~/components/ui/button";
import logo from "~/assets/logoEmpty.svg";
import Image from "next/image";

interface NavItem {
  name: string;
  icon: LucideIcon;
  href: string;
}

const navlinks: NavItem[] = [
  { name: "Link", icon: LinkIcon, href: "/Home/dashboard" },
  { name: "Profile Details", icon: UserCircle2, href: "/Home/Profile" },
];

const Header = () => {
  const pathname = usePathname();
  const [scrolling, setIsScrolling] = useState<boolean>(false);

  const handleScrollEvent = () => {
    if (window.scrollY > 1) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  });
  return (
    <>
      <header
        className={` hidden md:flex items-center justify-between mx-auto rounded-xl w-full max-w-7xl bg-white pl-6 pr-4 py-4 `}
      >
        <Logo size='small' />
        <nav className='flex gap-4'>
          {navlinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-row items-center gap-3 px-[27px] py-[11px] rounded-lg group  ${
                pathname === item.href ? "bg-[#EFEBFF]" : ""
              }`}
            >
              <item.icon
                size={20}
                className={`${
                  pathname === item.href
                    ? "text-primary"
                    : "text-secondary-foreground group-hover:text-primary"
                } `}
              />
              <p
                className={`${
                  pathname === item.href
                    ? "text-primary"
                    : "text-secondary-foreground group-hover:text-primary"
                }  heading-s  `}
              >
                {item.name}
              </p>
            </Link>
          ))}
        </nav>
        <Button variant={"outline"}>Preview</Button>
      </header>
      <header
        className={` ${
          scrolling ? "shadow-md py-2" : "shadow-none py-4"
        } flex fixed  top-0 z-50 md:hidden items-center justify-between w-full bg-white pl-6 pr-4 `}
      >
        <div className='w-[52px] '>
          <Image src={logo} alt={"mobile"} />
        </div>
        <nav className='flex gap-4'>
          {navlinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-row items-center  px-[27px] py-[11px] rounded-lg   ${
                pathname === item.href ? "bg-[#EFEBFF]" : ""
              }`}
            >
              <item.icon
                size={20}
                className={`${
                  pathname === item.href
                    ? "text-primary"
                    : "text-secondary-foreground hover:text-primary"
                } `}
              />
            </Link>
          ))}
        </nav>
        <Button variant={"outline"}>
          <EyeIcon />
        </Button>
      </header>
    </>
  );
};

export default Header;
