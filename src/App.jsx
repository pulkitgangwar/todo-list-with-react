import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Box } from "@chakra-ui/layout";
import AddTodo from "./components/AddTodo";
import Header from "./components/Header";
import Todos from "./components/Todos";
import { setItem } from "./utils/storageFunc";

const App = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("todos")) {
      setItem("todos", []);
    }

    const allTodos = JSON.parse(localStorage.getItem("todos"));

    setTodos([...allTodos]);
  }, []);

  const handleDragEnd = (result) => {
    const newTodos = [...todos];
    const [reorderedTodos] = newTodos.splice(result?.source?.index, 1);
    newTodos.splice(result?.destination?.index, 0, reorderedTodos);
    setItem("todos", [...newTodos]);
    setTodos([...newTodos]);
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
              const newTodo = {
                id: Math.floor(Math.random() * 9999),
                completed: false,
                task: todo,
                createdAt: new Date().toISOString(),
                description,
              };
              setItem("todos", [...todos, newTodo]);
              setTodos([...todos, newTodo]);
            }}
          />
        ) : null}

        <Todos
          todos={todos}
          onTodoClick={(todo) => {
            const index = todos.findIndex((task) => task.id === todo.id);
            const [newCompletedTodo] = todos.splice(index, 1);
            newCompletedTodo.completed = !newCompletedTodo.completed;
            setItem("todos", [...todos, newCompletedTodo]);
            setTodos([...todos, newCompletedTodo]);
          }}
          onTodoRemove={(id) => {
            setItem("todos", [...todos.filter((todo) => todo.id !== id)]);
            setTodos([...todos.filter((todo) => todo.id !== id)]);
          }}
          onTodoEdit={(todo) => {
            const updatedTodoIndex = todos.findIndex(
              (task) => task.id === todo.id
            );
            todos.splice(updatedTodoIndex, 1, todo);
            setItem("todos", [...todos]);
            setTodos([...todos]);
          }}
        />
      </Box>
    </DragDropContext>
  );
};

export default App;
