import { ADD_TODO, COMPLETE, DELETE_ITEM, FILTER } from "./actionType.js";

let todoid = 0;

export const addTodo = (content) => ({
  type: ADD_TODO,
  payload: {
    id: todoid++,
    content,
    completed: false
  }
});

export const completed = (index, status) => ({
  type: COMPLETE,
  payload: {
    index,
    status
  }
});

export const deleteItem = (index) => ({
  type: DELETE_ITEM,
  payload: {
    index
  }
});

export const filter = (string) => ({
  type: FILTER,
  payload: {
    string
  }
});
