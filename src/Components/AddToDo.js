import React, { useState, useEffect } from "react";
import { addTodo, completed, deleteItem, filter } from "../redux/action";
import classNames from "classnames";
import { connect } from "react-redux";
import "../index.css";
const AddToDo = ({ todoList, addTodo, completed, deleteItem }) => {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState("all");
  const [completeItems, setCompleteItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [uncompleteItems, setUncompleteItems] = useState([]);

  const handleClick = (type) => {
    setSelected(type);
  };

  const handleAddToDo = () => {
    input && addTodo(input);
    setInput("");
  };

  function handleChange(event) {
    console.log("run");
    setInput(event.target.value);
  }

  const handleClickCompleted = (index, status) => {
    completed(index, status);
  };

  const deleteItemTodo = (index) => {
    deleteItem(index);
  };

  useEffect(() => {
    switch (selected) {
      case "all":
        setCompleteItems([]);
        setUncompleteItems([]);
        setAllItems(todoList);
        break;
      case "completed":
        setUncompleteItems([]);
        setAllItems([]);
        setCompleteItems(todoList.filter((todo) => todo.completed));
        break;
      case "uncomplete":
        setCompleteItems([]);
        setAllItems([]);
        setUncompleteItems(todoList.filter((todo) => !todo.completed));
        break;
      default:
        break;
    }
  }, [selected, todoList]);

  return (
    <div className="App">
      <input onChange={handleChange} value={input}></input>
      <button onClick={handleAddToDo} style={{ marginLeft: "10px" }}>
        Add Todo
      </button>
      <ul style={{ marginLeft: "0px", paddingLeft: "0px" }}>
        {allItems &&
          allItems.map((item, index) => (
            <li key={index} style={{ display: "flex" }}>
              <div
                style={{ width: "13%" }}
                className={classNames("TodoItem", {
                  "TodoItem-completed": item.completed
                })}
                onClick={() => handleClickCompleted(index, item.completed)}
              >
                {item.content}
              </div>
              <div onClick={() => deleteItemTodo(index)}>Delete</div>
            </li>
          ))}
        {completeItems &&
          completeItems.map((item, index) => (
            <li key={index} style={{ display: "flex" }}>
              <div
                className={classNames("TodoItem", {
                  "TodoItem-completed": item.completed
                })}
                onClick={() => handleClickCompleted(index, item.completed)}
              >
                {item.content}
              </div>
              <div
                style={{ marginLeft: "10%" }}
                onClick={() => deleteItemTodo(index)}
              >
                Delete
              </div>
            </li>
          ))}
        {uncompleteItems &&
          uncompleteItems.map((item, index) => (
            <li key={index} style={{ display: "flex" }}>
              <div
                style={{ textDecoration: "underline" }}
                className={classNames("TodoItem", {
                  "TodoItem-completed": item.completed
                })}
                onClick={() => handleClickCompleted(index, item.completed)}
              >
                {item.content}
              </div>
              <div style={{}} onClick={() => deleteItemTodo(index)}>
                Delete
              </div>
            </li>
          ))}
        {}
        <div className={classNames("filter")}>
          <button onClick={() => handleClick("all")}>All</button>
          <button onClick={() => handleClick("completed")}>Complete</button>
          <button onClick={() => handleClick("uncomplete")}>Uncomplete</button>
        </div>
      </ul>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { todoList: state.todos.arrayContent };
};

export default connect(mapStateToProps, {
  addTodo,
  completed,
  deleteItem,
  filter
})(AddToDo);
