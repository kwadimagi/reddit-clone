import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
import { auth } from "../../firebase/ClientApp";
import Directory from "./Directory/Directory";
import useDirectory from "../../hooks/useDirectory";
import { defaultMenuItem } from "../../atoms/directoryMenuAtom";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();
  return (
    <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      justify={{ md: "space-between" }}
      cursor="pointer"
      onClick={() => onSelectMenuItem(defaultMenuItem)}
    >
      <Flex align="center" width={{ base: "40pt", md: "auto" }}>
        <Image src="/images/GH-Police.png" height="30px" rounded={30} />
        {/* <Image
          src="/images/GH-Police.png"
          height="46px"
          display={{ base: "none", md: "unset" }}
        /> */}
      </Flex>
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
