import { Text } from "@chakra-ui/layout";
import { List } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import TodoElement from "./TodoElement";

const Todos = () => {
  const [currentId, setCurrentId] = useState("");
  const todos = useSelector((state) => state.todos.todos);

  console.log("re rendering todos");

  return (
    <>
      <Box>
        <Text fontWeight="black" fontSize="2xl">
          Todos ({todos.length})
        </Text>
        <List spacing={3}>
          {!todos.length ? (
            <p>Please provide some todo</p>
          ) : (
            <Droppable droppableId={"Todos"}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {todos.map((todo, index) => (
                    <TodoElement
                      key={index}
                      todo={todo}
                      currentId={currentId}
                      setCurrentId={setCurrentId}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </List>
      </Box>
    </>
  );
};

export default Todos;
