import React from "react";
import { Resizable } from "re-resizable";

const ResizableComponent = ({
  children,
  value,
  handleChange,
  box,
  handleOnStop,
}) => {
  return (
    // Resizable component
    <Resizable
      style={{ border: "1px solid black", padding: "5px" }}
      // This is default size
      defaultSize={value}
      // This is actual size
      size={value}
      // This runs when we stop resizing
      onResizeStop={(e, direction, ref, val) => {
        handleOnStop(direction, val, box);
      }}
      // This runs while we are resizing
      onResize={(e, direction, ref, val) => {
        handleChange(direction, val, box);
      }}
      // Enable resize from all sides and corners
      enable={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
    >
      {/* It gets child as prop from parent component  */}
      {children}
    </Resizable>
  );
};

export default ResizableComponent;
