import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxStoreProvider } from "react-redux";
import App from "./App";
import store from "./store";

ReactDOM.render(
  <ChakraProvider>
    <ReduxStoreProvider store={store}>
      <App />
    </ReduxStoreProvider>
  </ChakraProvider>,
  document.getElementById("root")
);
