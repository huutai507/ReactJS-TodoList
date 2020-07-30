import React from "react";
import ReactDOM from "react-dom";
import AddToDo from "./Components/AddToDo";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <AddToDo />
  </Provider>,
  document.getElementById("root")
);
