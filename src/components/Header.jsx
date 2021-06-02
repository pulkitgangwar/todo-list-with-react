import { Button } from "@chakra-ui/button";
import { Box, Flex, Spacer, Text } from "@chakra-ui/layout";
import React from "react";

const Header = ({ setIsDropDownOpen, isDropDownOpen }) => {
  return (
    <Box w={"100%"} pb={4}>
      <Flex alignItems="center">
        <Text
          fontSize={"3xl"}
          cursor="pointer"
          display="inline-block"
          fontWeight={"bold"}
        >
          Todoist
        </Text>
        <Spacer />
        <Button
          variant="solid"
          colorScheme="teal"
          onClick={(e) => setIsDropDownOpen(!isDropDownOpen)}
        >
          {isDropDownOpen ? "Close" : "Add Todo"}
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
