import { Button, Flex, Link } from "@chakra-ui/react";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      Sory, that community does not existor has been moved
      <Link href="/">
        <Button mt={4}>Go Home</Button>
      </Link>
    </Flex>
  );
};
export default NotFound;
