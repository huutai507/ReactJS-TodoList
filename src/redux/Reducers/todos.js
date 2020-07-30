import { ADD_TODO, COMPLETE, DELETE_ITEM, FILTER } from "../actionType";
const initialState = {
  arrayContent: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      console.log(state.arrayContent);
      const { id, content, completed } = action.payload;
      return {
        ...state,
        arrayContent: [...state.arrayContent, { id, content, completed }]
      };
    }

    case COMPLETE: {
      const { index, status } = action.payload;
      return {
        ...state,
        arrayContent: [
          ...state.arrayContent.slice(0, index),
          { ...state.arrayContent[index], completed: !status },
          ...state.arrayContent.slice(index + 1)
        ]
      };
    }

    case DELETE_ITEM: {
      const { index } = action.payload;
      return {
        ...state,
        arrayContent: [
          ...state.arrayContent.slice(0, index),
          ...state.arrayContent.slice(index + 1)
        ]
      };
    }
    case FILTER: {
      const { string } = action.payload;
      console.log(state.arrayContent);
      return {
        ...state,
        arrayContent:
          string === "all"
            ? state.arrayContent
            : string === "complete"
            ? state.arrayContent.filter((item) => item.completed)
            : string === "uncomplete"
            ? state.arrayContent.filter((item) => !item.completed)
            : state.arrayContent
      };
    }
    default:
      return state;
  }
}
