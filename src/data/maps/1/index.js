import store from "../../../config/store";

// prettier-ignore
function tiles1(){
const bridgeShouldShow = store.getState().world.unlockedStuff.bridge;

  return [
    [0, 115, 115, 115, 115, 115, 0, 0, 117, 0, 0, 0, 0, 0, 0, 115, 115, 115, 115, 115],
    [0, 0, 116, 116, 116, 0, 0, 0, 117, 0, 0, 0, 0, 0, 0, 0, 0, 0, 115, 115],
    [0, 0, 0, 116, 116, 0, 0, 118, 117, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 115],
    [0, 0, 0, 0, 0, 0, 0, 2, (bridgeShouldShow ? 5 : 117), 0, 116, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 117, 116, 116, 0, 0, 0, 0, 0, 0, 0, 0, 116],
    [116, 0, 0, 0, 0, 0, 0, 0, 117, 116, 116, 0, 0, 0, 0, 0, 0, 0, 0, 116],
    [116, 0, 0, 0, 0, 0, 0, 0, 120, 122, 122, 121, 0, 0, 0, 0, 0, 116, 3, 116],
    [116, 115, 0, 0, 0, 0, 0, 0, 0, 115, 115, 117, 0, 0, 0, 0, 116, 124, 0, 116],
    [116, 115, 119, 1, 0, 0, 0, 0, 0, 0, 115, 117, 0, 0, 0, 123, 123, 2, 4, 116],
    [116, 115, 0, 0, 0, 0, 116, 0, 0, 0, 0, 117, 0, 123, 123, 123, 123, 116, 116, 116],
  ];
}

export { tiles1 };