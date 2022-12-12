import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {
    initialize(state) {
      if (!localStorage.getItem("todos")) {
        localStorage.setItem("todos", JSON.stringify([]));
      }

      const allTodos = JSON.parse(localStorage.getItem("todos"));

      state.todos = allTodos;
    },
    dragEnd(state, action) {
      const newTodos = [...state.todos];
      const [reorderedTodos] = newTodos.splice(
        action.payload.result?.source?.index,
        1
      );
      newTodos.splice(
        action.payload.result?.destination?.index,
        0,
        reorderedTodos
      );
      localStorage.setItem("todos", JSON.stringify([...newTodos]));
      state.todos = newTodos;
    },
    add(state, action) {
      localStorage.setItem(
        "todos",
        JSON.stringify([...state.todos, action.payload])
      );
      state.todos.push(action.payload);
    },
    toggleCompleted(state, action) {
      console.log(action);
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      console.log(todo);
      if (todo) {
        todo.completed = !todo.completed;
      }
      localStorage.setItem("todos", JSON.stringify([...state.todos]));
    },
    remove(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      localStorage.setItem("todos", JSON.stringify([...state.todos]));
    },
    edit(state, action) {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.task = action.payload.task;
        todo.description = action.payload.description;
      }
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
});

export const todoActions = todoSlice.actions;

export default todoSlice.reducer;
