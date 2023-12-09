import React, { StrictMode } from "react";
import { createRoot } from 'react-dom/client';

import * as d3 from "d3";
import {useRef, useEffect} from "react";
import { MathComponent } from "mathjax-react";

window.d3 = d3;

function line(f) {
  let scaleX = d3.scaleLinear().range([0, 300]).domain([0, 13]);
  let scaleY = d3.scaleLinear().range([150, 0]).domain([-1, 1]);
  let points = scaleX.ticks(100).map(x => [x, f(x)]).map(([x,y]) => [scaleX(x), scaleY(y)]);
  let pathGenerator = d3.line().curve(d3.curveMonotoneX);
  return pathGenerator(points);
}

function Curve({path}) {
  return (
    <path d={path} fill="none" stroke="steelblue" stroke-width={1.5} />
  );
}

function SvgSample() {
  return (
    <svg style={{
      border: "2px solid gold"
    }}>
      <Curve path={line(x=>Math.sin(x))} />
    </svg>
  );
}

function LagrangeInterpolationPage(){
  return (
    <>
    <h1>Интерполяционный многочлен Лагранжа</h1>
    <h2>Полиномиальная интерполяция</h2>
    <SvgSample />
    <p>Avogadro's constant is <MathComponent display={false} tex={String.raw`6.02 \cdot 10^{23}`} /></p>
    </>
  );
}
function main() {
  const root = createRoot(document.getElementById('react-root'));
  root.render(<LagrangeInterpolationPage />);
}

main()
