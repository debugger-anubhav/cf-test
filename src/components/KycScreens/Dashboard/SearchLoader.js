import React from "react";
import {Player, Controls} from "@lottiefiles/react-lottie-player";
import loader from "@/assets/lottie-files/searchAnimation.json";

export default function SearchLoader({height, width}) {
  return (
    <div>
      {" "}
      <Player autoplay loop src={loader} style={{height, width}}>
        <Controls
          visible={false}
          buttons={["play", "repeat", "frame", "debug"]}
        />
      </Player>
    </div>
  );
}
