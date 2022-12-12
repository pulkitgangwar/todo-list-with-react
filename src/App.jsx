import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Box } from "@chakra-ui/layout";
import AddTodo from "./components/AddTodo";
import Header from "./components/Header";
import Todos from "./components/Todos";
import { useDispatch } from "react-redux";
import { todoActions } from "./store/todos";

const App = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(todoActions.initialize());
  }, [dispatch]);

  const handleDragEnd = (result) => {
    dispatch(todoActions.dragEnd({ result }));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box p={10}>
        <Header
          setIsDropDownOpen={setIsDropDownOpen}
          isDropDownOpen={isDropDownOpen}
        />
        {isDropDownOpen ? (
          <AddTodo
            onTodoSubmit={({ todo, description }) => {
              dispatch(
                todoActions.add({
                  id: window.crypto.randomUUID(),
                  completed: false,
                  task: todo,
                  createdAt: new Date().toISOString(),
                  description,
                })
              );
            }}
          />
        ) : null}

        <Todos />
      </Box>
    </DragDropContext>
  );
};

export default App;
