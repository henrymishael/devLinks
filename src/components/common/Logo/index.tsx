import Image from "next/image";
import Link from "next/link";
import React from "react";
import logoLarge from "~/assets/Logo(large).svg";
import logoSmall from "~/assets/Logo(small).svg";

interface Props {
  size: "large" | "small";
}

const Logo = ({ size }: Props) => {
  const isSmall = size === "small";
  return (
    <Link href={"/"}>
      {isSmall ? (
        <Image src={logoSmall} alt='small' width='146' height='32' />
      ) : (
        <Image src={logoLarge} alt='large' width='183' height='40' />
      )}
    </Link>
  );
};

export default Logo;
