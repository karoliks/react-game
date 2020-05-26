const initialState = {
  gamePlaying: false,
  currentGame: 1,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_GAME":
      return {
        ...action.payload,
      };
    case "END_GAME":
      return {
        ...action.payload,
      };
    case "SET_GAME":
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default gameReducer;
