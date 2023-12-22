import React, { StrictMode, Fragment, useState, useRef } from "react";
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux'
import { nanoid, createDraftSafeSelector } from '@reduxjs/toolkit'
import { MathComponent } from "mathjax-react";
import {scaleLinear, line, curveMonotoneX} from "d3";
import styles from './lagrange_interpolation.css';
import {HorizontalAxis, VerticalAxis} from './d3-axis';
import store from './store'
import {svgCoordinateOfEvent} from './manipulateSvg'
import {Curve, Point} from './svgPrimitives'
import {pointAdded, pointUpdated} from './plotSlice'
import {polyByZeros} from './polynomials'

let scaleX = scaleLinear().range([0, 1000]).domain([-10, 10]);
let scaleY = scaleLinear().range([500, 0]).domain([-10, 10]);
let scalePoint = (point) => ({...point, x: scaleX(point.x), y: scaleY(point.y)});

const allPointsSelector = createDraftSafeSelector(
  [(state) => state],
  (state) => state.plot.points
);

const enabledPointsSelector = createDraftSafeSelector(
  [(state) => state],
  (state) => state.plot.points.filter(point => point.enabled)
);

const formulaSelector = createDraftSafeSelector(
  [(state) => enabledPointsSelector(state)],
  (points) => polyByZeros(points.map(point => point.x))
);


function pathLine(f, scaleX, scaleY) {
  let points = scaleX.ticks(100).map(x => [x, f(x)]).map(([x,y]) => [scaleX(x), scaleY(y)]);
  let pathGenerator = line().curve(curveMonotoneX);
  return pathGenerator(points);
}

function PointTableRow({point}) {
  const dispatch = useDispatch();
  return (
    <tr>
      <td><input type="checkbox" checked={point.enabled} onChange={(event) => dispatch(pointUpdated({id: point.id, update: {enabled: event.target.checked}})) } /></td>
      <td><input type="number" className={styles.numberInput} step={0.1} value={point.x} onChange={(event) => dispatch(pointUpdated({id: point.id, update: {x: Number(event.target.value)}})) } /></td>
      <td><input type="number" className={styles.numberInput} step={0.1} value={point.y} onChange={(event) => dispatch(pointUpdated({id: point.id, update: {y: Number(event.target.value)}})) } /></td>
    </tr>
  );
}

function PointTable() {
  const points = useSelector(allPointsSelector);
  const rows = points.map((point, idx) => <PointTableRow point={point} key={point.id} />);
  return (
    <table className={styles.pointTable}>
      <thead>
        <tr><th>#</th><th>x</th><th>y</th></tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

const addPoint = function (event, svgRef, dispatch) {
  const cursorPoint = svgCoordinateOfEvent(event, svgRef);

  const x = Number((scaleX.invert(cursorPoint.x)).toFixed(1));
  const y = Number((scaleY.invert(cursorPoint.y)).toFixed(1));
  const id = nanoid();
  const enabled = true;
  dispatch( pointAdded({x,y,id,enabled}) );
}

function HangingPoint({point}) {
  return (
    <>
      <Point {...scalePoint(point)} />
      <line x1={scaleX(point.x)} y1={scaleY(point.y)} x2={scaleX(point.x)} y2={scaleY(0)} stroke={"red"} stroke-dasharray="4 8" />
      <Point x={scaleX(point.x)} y={scaleY(0)} fill="magenta" />
    </>
  );
}

function SvgSample({plotFunction}) {
  const dispatch = useDispatch();

  const [verticalLineCoord, setVerticalLineCoord] = useState(null);
  const svgRef = useRef(null);

  const moveVertical = function (event) {
    const cursorPoint = svgCoordinateOfEvent(event, svgRef);
    setVerticalLineCoord(scaleX.invert(cursorPoint.x).toFixed(1));
  }

  const points = useSelector(enabledPointsSelector);
  const pointElements = points.map(point => <HangingPoint point={point} key={point.id} />);

  return (
    <svg ref={svgRef} viewBox="0 0 1000 500" preserveAspectRatio="xMinYMin meet" className={styles.svgCanvas} onClick={(event) => addPoint(event, svgRef, dispatch)} onPointerMove={(event) => moveVertical(event)} >
      <HorizontalAxis scaleX={scaleX} scaleY={scaleY} ticks={scaleX.ticks(10).filter(x => x != 0)} />
      <VerticalAxis scaleX={scaleX} scaleY={scaleY} />
      <Curve path={pathLine(plotFunction, scaleX, scaleY)} />
      {pointElements}
      <line x1={scaleX(verticalLineCoord)} y1={scaleY.range()[0]} x2={scaleX(verticalLineCoord)} y2={scaleY.range()[1]} stroke="red" stroke-dasharray="4 8" />
    </svg>
  );
}

function LagrangeInterpolationPage() {
  const formula = useSelector(formulaSelector);

  return (
    <>
    <h1>Интерполяционный многочлен Лагранжа</h1>
    <h2>Полиномиальная интерполяция</h2>
    <div className={styles.configurablePlot}>
      <SvgSample plotFunction={x => formula.evaluate({x: x})} />
      <PointTable />
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
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

main()
