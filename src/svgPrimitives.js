import React from "react";
function Point({x, y, r=4, fill="black", stroke="black"}) {
  return <circle cx={x} cy={y} r={r} fill={fill} stroke={stroke} />
}

function Curve({path}) {
  return (
    <path d={path} fill="none" stroke="steelblue" strokeWidth={1.5} />
  );
}

export {Point, Curve};
