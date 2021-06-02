import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import React, { useState } from "react";

const AddTodo = ({ onTodoSubmit }) => {
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    e.currentTarget.blur();
    if (!todo) return;
    onTodoSubmit({ todo, description: description ? description : null });
    setTodo("");
    setDescription("");
  };
  return (
    <form onSubmit={handleClick}>
      <Flex pb={8} flexDirection="column" gridGap="8">
        <Input
          placeholder={"Enter Your Todo"}
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter your description"
        />
        <Button colorScheme="teal" type="submit">
          Add
        </Button>
      </Flex>
    </form>
  );
};

export default AddTodo;
