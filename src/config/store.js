import { createStore, combineReducers } from "redux";
import playerReducer from "../features/player/reducer";
import mapReducer from "../features/map/reducer";
import worldReducer from "../features/world/reducer";
import modalReducer from "../features/modal/reducer";
import statsReducer from "../features/stats/reducer";

const rootReducer = combineReducers({
  player: playerReducer,
  map: mapReducer,
  world: worldReducer,
  modal: modalReducer,
  stats: statsReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
