import React, { StrictMode, useState, useRef } from "react";
import { createRoot } from 'react-dom/client';
import styles from './lagrange_interpolation.css';

import {scaleLinear, line, curveMonotoneX} from "d3";
// import {useRef, useEffect} from "react";
import { MathComponent } from "mathjax-react";
import { v4 as uuidv4 } from 'uuid';

function Point({x, y, r=4}) {
  return <circle cx={x} cy={y} r={r} />
}

function Curve({path}) {
  return (
    <path d={path} fill="none" stroke="steelblue" strokeWidth={1.5} />
  );
}

function pathLine(f) {
  let scaleX = scaleLinear().range([0, 800]).domain([0, 13]);
  let scaleY = scaleLinear().range([500, 0]).domain([-1, 1]);
  let points = scaleX.ticks(100).map(x => [x, f(x)]).map(([x,y]) => [scaleX(x), scaleY(y)]);
  let pathGenerator = line().curve(curveMonotoneX);
  return pathGenerator(points);
}

function SvgSample() {
  const [points, setPoints] = useState([]);

  const svgRef = useRef(null);
  const svgLeft = () => svgRef.current.getBoundingClientRect().left + window.scrollX;
  const svgTop  = () => svgRef.current.getBoundingClientRect().top  + window.scrollY;

  let addPoint = function (event) {
    const coordX = Math.round(event.pageX - svgLeft());
    const coordY = Math.round(event.pageY - svgTop());
    setPoints([
      ...points,
      {
        x: coordX,
        y: coordY,
        id: uuidv4(),
      }
    ]);
  }

  return (
    <svg ref={svgRef} className={styles.svgCanvas} onClick={event => addPoint(event)}>
      <Curve path={pathLine(x=>Math.sin(x))} />
      {points.map( point => <Point key={point.id} {...point} /> )}
    </svg>
  );
}

function LagrangeInterpolationPage(){
  let [formula, setFormula] = useState(String.raw`6.02 \cdot 10^{23}`);
  let changeFormula = () => setFormula(String.raw`x^2+2x+1=0`);
  return (
    <>
    <h1>Интерполяционный многочлен Лагранжа</h1>
    <h2 onClick={changeFormula}>Полиномиальная интерполяция</h2>
    <SvgSample />
    <p>Formula is <MathComponent display={false} tex={formula} /></p>
    </>
  );
}

function App() {
  return (
    <StrictMode>
      <LagrangeInterpolationPage />
    </StrictMode>
  );
}

function main() {
  const root = createRoot(document.getElementById('react-root'));
  root.render(<App />);
}

main()
