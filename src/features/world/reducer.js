const initialState = {
  mapNum: 1,
  unlockedStuff: { bridge: false },
  currentCharacter: "jim",
  historyProgress: {
    jim: { bridgeCreated: false },
    guard: { chestOpened: false },
  },
};

// things should probably not be updated here before

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
    case "SET_CURRENT_CHARACTER":
      return {
        ...state,

        currentCharacter: action.payload,
      };

    default:
      return state;
  }
};

export default worldReducer;
