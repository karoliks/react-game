const initialState = {
  show: false,
  chosenAnswer: -1,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_MODAL":
      return {
        ...action.payload,
      };
    case "UPDATE_ANSWER":
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default modalReducer;
