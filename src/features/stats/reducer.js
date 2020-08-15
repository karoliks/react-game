const initialState = {
  coins: 49,
};

const statsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_COINS":
      return {
        ...action.payload,
      };
    case "REDUCE_COINS":
      return {
        ...state,
        coins: state.coins - action.payload,
      };
    default:
      return state;
  }
};

export default statsReducer;
