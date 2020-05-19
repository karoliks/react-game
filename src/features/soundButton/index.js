import React from "react";
import door from "./doorOpen_1.ogg";

// Currently not in use, but works:)

function SoundButton() {
  var sound = new Audio();
  sound.src = door;
  return (
    <div>
      <button onClick={() => sound.play()}>Click me!</button>
    </div>
  );
}

export default SoundButton;
