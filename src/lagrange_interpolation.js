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
      <th><input type="checkbox" checked={point.enabled} onChange={(event) => setPointState(point.id, {enabled: event.target.checked})} /></th>
      <th><input type="number" className={styles.numberInput} step={0.1} value={point.x} onChange={(event) => setPointState(point.id, {x: Number(event.target.value)})} /></th>
      <th><input type="number" className={styles.numberInput} step={0.1} value={point.y} onChange={(event) => setPointState(point.id, {y: Number(event.target.value)})} /></th>
    </tr>
  ));
  return (
    <table className={styles.pointTable}>
      <thead>
        <tr><th>#</th><th>x</th><th>y</th></tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SvgSample({plotFunction, points, updatePoints}) {
  const [verticalLineCoord, setVerticalLineCoord] = useState(null);
  const svgRef = useRef(null);
  const svgLeft = () => svgRef.current.getBoundingClientRect().left + window.scrollX;
  const svgTop  = () => svgRef.current.getBoundingClientRect().top  + window.scrollY;

  // The cursor point, translated into svg coordinates
  const svgCoordinateOfEvent = function (event) {
    const pt = new DOMPoint(event.clientX, event.clientY);
    return pt.matrixTransform(svgRef.current.getScreenCTM().inverse());
  };
  const addPoint = function (event) {
    const cursorPoint = svgCoordinateOfEvent(event);

    const x = Number((scaleX.invert(cursorPoint.x)).toFixed(1));
    const y = Number((scaleY.invert(cursorPoint.y)).toFixed(1));
    const id = uuidv4();
    const newPoints = [
      ...points,
      {x, y, id, enabled: true}
    ];
    updatePoints(newPoints);
  }

  const moveVertical = function (event) {
    const cursorPoint = svgCoordinateOfEvent(event);
    setVerticalLineCoord(scaleX.invert(cursorPoint.x).toFixed(1));
    // const x = Number((scaleX.invert(cursorPoint.x)).toFixed(1));
    // const y = Number((scaleY.invert(cursorPoint.y)).toFixed(1));
    // const id = uuidv4();
    // const newPoints = [
    //   ...points,
    //   {x, y, id, enabled: true}
    // ];
    // updatePoints(newPoints);
  }


  const pointElements = points.filter(point => point.enabled).map(point => (
    <Fragment key={point.id}>
      <Point {...scalePoint(point)} />
      <line x1={scaleX(point.x)} y1={scaleY(point.y)} x2={scaleX(point.x)} y2={scaleY(0)} stroke={"red"} stroke-dasharray="4 8" />
      <Point x={scaleX(point.x)} y={scaleY(0)} fill="magenta" />
    </Fragment>
  ));

  return (
    <svg ref={svgRef} viewBox="0 0 1000 500" preserveAspectRatio="xMinYMin meet" className={styles.svgCanvas} onClick={(event) => addPoint(event)} onPointerMove={(event) => moveVertical(event)} >
      <HorizontalAxis scaleX={scaleX} scaleY={scaleY}  ticks={scaleX.ticks(10).filter(x => x != 0)} />
      <VerticalAxis scaleX={scaleX} scaleY={scaleY} />
      <Curve path={pathLine(plotFunction)} />
      {pointElements}
      <line x1={scaleX(verticalLineCoord)} y1={scaleY.range()[0]} x2={scaleX(verticalLineCoord)} y2={scaleY.range()[1]} stroke={"red"} stroke-dasharray="4 8" />
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
    updatePoints(points.map(point => (point.id != id) ? point : {...point, ...state}));
  }

  return (
    <>
    <h1>Интерполяционный многочлен Лагранжа</h1>
    <h2>Полиномиальная интерполяция</h2>
    <div className={styles.configurablePlot}>
      <SvgSample plotFunction={x => formula.evaluate({x: x})} points={points} updatePoints={updatePoints} />
      <PointTable points={points} setPointState={setPointState} />
    </div>
    <p>Formula is <MathComponent display={false} tex={formula.toTex()} /></p>
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
