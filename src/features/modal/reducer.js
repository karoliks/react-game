const initialState = {
  show: false,
  chosenAnswer: -1,
  character: {},
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_MODAL":
      return {
        ...state,
        show: true,
      };
    case "HIDE_MODAL":
      return {
        ...state,
        show: false,
        chosenAnswer: -1,
      };
    case "UPDATE_ANSWER":
      return { ...state, chosenAnswer: action.payload, show: false };
    case "SET_VALUES_FOR_CHARACTER":
      return { ...state, character: action.payload };
    default:
      return state;
  }
};

export default modalReducer;
