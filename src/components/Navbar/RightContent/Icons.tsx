import { Flex, Icon } from '@chakra-ui/react';
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import React from 'react';
import {
    IoFilterCircleOutline,
    IoNotificationsOutline,
    IoVideocamOutline,
} from "react-icons/io5";
type IconsProps = {

};

const Icons: React.FC<IconsProps> = () => {

    return (
        <Flex>
            <Flex display={{ base: "none", md: "flex" }} align="center"
                borderRight="1px solid"
                borderColor="gray.200">

            </Flex >
            <Flex
                mr={1.5}
                ml={1.5}
                padding={1}
                cursor="pointer"
                borderRadius={4}
                _hover={{ bg: "gray.200" }}
            ></Flex>
            <Icon as={BsArrowUpRightCircle} fontSize={20} />
            <Flex
                mr={1.5}
                ml={1.5}
                padding={1}
                cursor="pointer"
                borderRadius={4}
                _hover={{ bg: "gray.200" }}
            ></Flex>
            <Icon as={IoFilterCircleOutline} fontSize={22} />
            <Flex
                mr={1.5}
                ml={1.5}
                padding={1}
                cursor="pointer"
                borderRadius={4}
                _hover={{ bg: "gray.200" }}
            ></Flex>
            <Icon as={IoVideocamOutline} fontSize={22} />
            <>
                <Flex
                    mr={1.5}
                    ml={1.5}
                    padding={1}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: "gray.200" }}
                ></Flex>
                <Icon as={BsChatDots} fontSize={20} />
                <Flex
                    mr={1.5}
                    ml={1.5}
                    padding={1}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: "gray.200" }}
                ></Flex>
                <Icon as={IoNotificationsOutline} fontSize={20} />
                <Flex
                    display={{ base: "none", md: "flex" }}
                    mr={1.5}
                    ml={1.5}
                    padding={1}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: "gray.200" }}
                ></Flex>
                <Icon as={GrAdd} fontSize={20} />
            </>
        </Flex>
    )
}
export default Icons;