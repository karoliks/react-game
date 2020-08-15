const initialState = {
  mapNum: 1,
  unlockedStuff: { bridge: false },
  currentCharacter: "jim",
  historyProgress: {
    jim: {
      name: "Jim",
      message:
        "Hey there! I can build a bridge to help you cross the river if you give me 50 coins",
      answers: {
        answers: ["Ok, I'll be back when I have enough money"],
        chargeAtZero: false,
      },
      className: "big-farmer",
      moneyCharge: 50,
      storeChangeIfZero: {
        type: "SHOW_BRIDGE",
        payload: false,
      },
    },
    guard: {
      name: "Guard",
      message: "Good day! I am guarding this chest. Just wanted you to know.",
      answers: {
        answers: [
          "Ofc, no problem",
          "if you say so",
          "you ar not a very good guard",
          "okidoki",
        ],
        chargeAtZero: false,
      },
      storeChangeIfZero: { type: "DEFAULT", payload: true },

      className: "big-guard",
    },
    chestOpened: false, // move up to unlocked stuff?
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
    case "JIM_AFTER_ENOUGH_MONEY":
      return {
        ...state,
        historyProgress: {
          ...state.historyProgress,
          jim: {
            ...state.historyProgress.jim,
            answers: {
              answers: ["Yes, please do!", "Not now"],
              chargeAtZero: true,
            },
            storeChangeIfZero: {
              type: "SHOW_BRIDGE",
              payload: true,
            },
          },
        },
      };
    case "JIM_AFTER_BUILT_BRIDGE":
      return {
        ...state,
        historyProgress: {
          ...state.historyProgress,
          jim: {
            ...state.historyProgress.jim,
            message: "The bridge is finished! Happy to help!",
            answers: {
              answers: [],
              chargeAtZero: false,
            },
          },
        },
      };

    default:
      return state;
  }
};

export default worldReducer;
