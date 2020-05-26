const initialState = {
  mapNum: 1,
};

const worldReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_WORLD":
      return {
        ...action.payload,
      };

    default:
      return state;
  }
};

export default worldReducer;
