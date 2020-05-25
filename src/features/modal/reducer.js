const initialState = {
  show: false,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_MODAL":
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default modalReducer;
