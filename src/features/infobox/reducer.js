const initialState = {
  show: false,
  type: {
    className: "chest-milestone",
    title: "Chest unlocked!",
    text: "Congratulations! You managed to open the magic chest",
  },
};

const infoboxReducer = (state = initialState, action) => {
  switch (action.type) {
    case "HIDE_INFOBOX":
      return {
        ...state,
        show: false,
      };
    case "SHOW_INFOBOX":
      return {
        ...state,
        show: true,
      };
    case "TOGGLE_INFOBOX":
      return {
        ...state,
        show: !state.show,
      };
    case "UPDATE_INFOBOX_INFO":
      return {
        ...action.payload,
      };

    default:
      return state;
  }
};

export default infoboxReducer;
