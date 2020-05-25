const initialState = {
  mapNum: 1,
  gamePlaying: false,
};

const worldReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_WORLD":
      return {
        ...action.payload,
      };
    case "START_GAME":
      return {
        ...action.payload,
      };
    case "END_GAME":
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default worldReducer;
