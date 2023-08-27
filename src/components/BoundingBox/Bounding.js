import React from "react";
import { Rnd } from "react-rnd";

const Box = ({ id, a, b }) => {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "dashed 4px red",
    background: "rgba(240, 240, 240, 0.5)",
  };
  return (
    <Rnd
      id={id}
      style={style}
      bounds=".childDivClass"
      default={{
        x: a,
        y: b,
        width: 100,
        height: 100,
      }}
    ></Rnd>
  );
};

export default Box;
