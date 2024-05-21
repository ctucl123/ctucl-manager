import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "100px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image src="/images/logos/logo3.png" alt="logo" height={100} width={200} priority />
      
    </LinkStyled>
  );
};

export default Logo;
