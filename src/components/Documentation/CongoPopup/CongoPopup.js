import React from "react";
import {Player, Controls} from "@lottiefiles/react-lottie-player";
import loader from "@/assets/lottie-files/congratulations.json";
const CongoPopup = ({height, width}) => {
  return (
    <Player autoplay loop src={loader} style={{height, width}}>
      <Controls
        visible={false}
        buttons={["play", "repeat", "frame", "debug"]}
      />
    </Player>
  );
};

export default CongoPopup;
