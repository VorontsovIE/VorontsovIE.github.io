import React from "react";
function HorizontalAxisTick({x, y, text}) {
  const transformation = `translate(${x}, ${y})`;
  return (
    <g transform={transformation}>
      <line x1={0} y1={-3} x2={0} y2={3} stroke={"black"} />
      <text transform={"translate(-2, -5)"}>{text}</text>
    </g>
  );
}

function VerticalAxisTick({x, y, text}) {
  const transformation = `translate(${x}, ${y})`;
  return (
    <g transform={transformation}>
      <line x1={-3} y1={0} x2={2} y2={0} stroke={"black"} />
      <text transform={"translate(2, -5)"}>{text}</text>
    </g>
  );
}

function HorizontalAxis({scaleX, scaleY, ticks}) {
  const y = scaleY(0);
  const tickValues = ticks ?? scaleX.ticks(10);
  const tickElements = tickValues.map((x, i) => <HorizontalAxisTick key={i} x={scaleX(x)} y={y} text={x.toString()} />);
  return (
    <>
      <line x1={scaleX.range()[0]} y1={y} x2={scaleX.range()[1]} y2={y} stroke={"black"} />
      {tickElements}
    </>
  );
}

function VerticalAxis({scaleX, scaleY, ticks}) {
  const x = scaleX(0);
  const tickValues = ticks ?? scaleY.ticks(10);
  const tickElements = tickValues.map((y, i) => <VerticalAxisTick key={i} x={x} y={scaleY(y)} text={y.toString()} />);
  return (
    <>
      <line x1={x} y1={scaleX.range()[0]} x2={x} y2={scaleX.range()[1]} stroke={"black"} />
      {tickElements}
    </>
  );
}

export {HorizontalAxis, VerticalAxis};
