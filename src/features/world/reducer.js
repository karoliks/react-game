const initialState = {
  mapNum: 1,
  unlockedStuff: { bridge: false },
};

const worldReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_WORLD":
      return {
        ...state,
        mapNum: action.payload,
      };
    case "SHOW_BRIDGE":
      return {
        ...state,
        unlockedStuff: { ...state.unlockedStuff, bridge: action.payload },
      };

    default:
      return state;
  }
};

export default worldReducer;
