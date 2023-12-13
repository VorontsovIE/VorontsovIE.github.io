import React, { StrictMode, Fragment, useState, useRef } from "react";
import { createRoot } from 'react-dom/client';
import { v4 as uuidv4 } from 'uuid';
import { MathComponent } from "mathjax-react";
import {OperatorNode, SymbolNode, ConstantNode} from 'mathjs';
import {scaleLinear, line, curveMonotoneX} from "d3";
import styles from './lagrange_interpolation.css';
import {HorizontalAxis, VerticalAxis} from './d3-axis.js';

// import {useRef, useEffect} from "react";
// import {Expression, Fraction} from 'algebra.js';

// import {create, all} from 'mathjs';
// window.mathjs = create(all);

function Point({x, y, r=4, fill="black", stroke="black"}) {
  return <circle cx={x} cy={y} r={r} fill={fill} stroke={stroke} />
}

function Curve({path}) {
  return (
    <path d={path} fill="none" stroke="steelblue" strokeWidth={1.5} />
  );
}

let scaleX = scaleLinear().range([0, 1000]).domain([-10, 10]);
let scaleY = scaleLinear().range([500, 0]).domain([-10, 10]);
let scalePoint = (point) => ({...point, x: scaleX(point.x), y: scaleY(point.y)});

function pathLine(f) {
  let points = scaleX.ticks(100).map(x => [x, f(x)]).map(([x,y]) => [scaleX(x), scaleY(y)]);
  let pathGenerator = line().curve(curveMonotoneX);
  return pathGenerator(points);
}

function PointTable({points, setPointState}) {
  const rows = points.map((point, idx) => (
    <tr key={point.id}>
      <th>{idx + 1}</th>
      <th>{point.x}</th>
      <th>{point.y}</th>
      <th><input type="checkbox" checked={point.enabled} onChange={(event) => setPointState(point.id, event.target.checked)} /></th>
    </tr>
  ));
  return (
    <table>
      <thead>
        <tr><th>#</th><th>x</th><th>y</th><th>on/off</th></tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SvgSample({plotFunction, points, updatePoints}) {
  const svgRef = useRef(null);
  const svgLeft = () => svgRef.current.getBoundingClientRect().left + window.scrollX;
  const svgTop  = () => svgRef.current.getBoundingClientRect().top  + window.scrollY;

  const addPoint = function (event) {
    // The cursor point, translated into svg coordinates
    var pt = new DOMPoint(event.clientX, event.clientY);
    var cursorpt = pt.matrixTransform(svgRef.current.getScreenCTM().inverse());
    const canvasX = cursorpt.x;
    const canvasY = cursorpt.y;

    const x = Number((scaleX.invert(canvasX)).toFixed(1));
    const y = Number((scaleY.invert(canvasY)).toFixed(1));
    const id = uuidv4();
    const newPoints = [
      ...points,
      {x, y, id, enabled: true}
    ];
    updatePoints(newPoints);
  }


  const pointElements = points.filter(point => point.enabled).map(point => (
    <Fragment key={point.id}>
      <Point {...scalePoint(point)} />
      <line x1={scaleX(point.x)} y1={scaleY(point.y)} x2={scaleX(point.x)} y2={scaleY(0)} stroke={"red"} stroke-dasharray="4 8" />
      <Point x={scaleX(point.x)} y={scaleY(0)} fill="magenta" />
    </Fragment>
  ));

  return (
    <svg ref={svgRef} viewBox="0 0 1000 500" className={styles.svgCanvas} onClick={event => addPoint(event)}>
      <HorizontalAxis scaleX={scaleX} scaleY={scaleY}  ticks={scaleX.ticks(10).filter(x => x != 0)} />
      <VerticalAxis scaleX={scaleX} scaleY={scaleY} />
      <Curve path={pathLine(plotFunction)} />
      {pointElements}
    </svg>
  );
}

const pow = (a,b) => new OperatorNode('^', 'pow', [a,b]);
const square = (a) => pow(a, new ConstantNode(2));
const add = (a,b) => new OperatorNode('+', 'add', [a,b]);
const mul = (a,b) => new OperatorNode('*', 'multiply', [a,b]);
const subtract = (a,b) => new OperatorNode('-', 'subtract', [a,b]);
const sum = (vals) => vals.reduce((res, cur) => add(res,cur));
const prod = (vals) => vals.reduce((res, cur) => mul(res,cur));

const polyByZeros = (x, zeros) => prod(zeros.map(z => (z >= 0) ? subtract(x, new ConstantNode(z)) : add(x, new ConstantNode(-z))))

function LagrangeInterpolationPage() {
  const [points, setPoints] = useState([]);
  const [formula, setFormula] = useState( new ConstantNode(1) ); //String.raw`6.02 \cdot 10^{23}`);
  const updatePoints = (newPoints) => {
    setPoints(newPoints);
    setFormula( polyByZeros(new SymbolNode('x'), newPoints.filter(point => point.enabled).map(point => point.x)) );
  }
  const setPointState = function(id, state) {
    updatePoints(points.map(point => (point.id != id) ? point : {...point, enabled: state}));
  }

  return (
    <>
    <h1>Интерполяционный многочлен Лагранжа</h1>
    <h2>Полиномиальная интерполяция</h2>
    <SvgSample plotFunction={x => formula.evaluate({x: x})} points={points} updatePoints={updatePoints} />
    <p>Formula is <MathComponent display={false} tex={formula.toTex()} /></p>
    <PointTable points={points} setPointState={setPointState} />
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
