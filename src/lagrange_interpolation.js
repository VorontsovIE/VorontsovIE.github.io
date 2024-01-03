import React, { StrictMode, Fragment, useState, useRef } from "react";
import {  createRoot } from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { nanoid, createDraftSafeSelector } from '@reduxjs/toolkit';
import { MathComponent } from "mathjax-react";
import {scaleLinear, line, curveMonotoneX} from "d3";
import styles from './lagrange_interpolation.css';
import {HorizontalAxis, VerticalAxis} from './d3-axis';
import store from './store';
import {svgCoordinateOfEvent, eventCoordinates} from './manipulateSvg';
import {Curve, Point} from './svgPrimitives';
import {pointAdded} from './plotSlice';
import {PointTable} from './pointTable';
import {enabledPointsSelector, formulaSelector} from './selectors';
import {SvgContext, useSvgContext} from './svgContext';

const eventPoint = function (event, svg, scaleX, scaleY) {
  const {x,y} = eventCoordinates(event, svg, scaleX, scaleY);
  const point = {
    x: Number(x.toFixed(1)),
    y: Number(y.toFixed(1)),
    id: nanoid(),
    enabled: true,
  };
  return point;
}

function pathLine(f, scaleX, scaleY) {
  let points = scaleX.ticks(100).map(x => [x, f(x)]).map(([x,y]) => [scaleX(x), scaleY(y)]);
  let pathGenerator = line().curve(curveMonotoneX);
  return pathGenerator(points);
}

function CurveByFunction({plotFunction}) {
  const {scaleX, scaleY} = useSvgContext();
  return <Curve path={pathLine(plotFunction, scaleX, scaleY)} />;
}

function HangingPoint({point}) {
  const {scaleX, scaleY, scalePoint} = useSvgContext();

  return (
    <>
      <Point {...scalePoint(point)} />
      <line x1={scaleX(point.x)} y1={scaleY(point.y)} x2={scaleX(point.x)} y2={scaleY(0)} stroke="red" strokeDasharray="4 8" />
      <Point x={scaleX(point.x)} y={scaleY(0)} fill="magenta" />
    </>
  );
}

const VerticalDashedLine = function({x}) {
  const {scaleX, scaleY} = useSvgContext();
  return <line x1={scaleX(x)} y1={scaleY.range()[0]} x2={scaleX(x)} y2={scaleY.range()[1]} stroke="red" strokeDasharray="4 8" />
}

function SvgSample({plotFunction}) {
  const dispatch = useDispatch();

  const [verticalLineCoord, setVerticalLineCoord] = useState(null);
  const svgRef = useRef(null);

  const moveVertical = function (event) {
    const {x} = eventCoordinates(event, svgRef.current, scaleX, scaleY);
    setVerticalLineCoord(x.toFixed(1));
  }

  const points = useSelector(enabledPointsSelector);
  const pointElements = points.map(point => <HangingPoint point={point} key={point.id} />);

  const scaleX = scaleLinear().range([0, 1000]).domain([-10, 10]);
  const scaleY = scaleLinear().range([500, 0]).domain([-10, 10]);
  const scalePoint = (point) => ({...point, x: scaleX(point.x), y: scaleY(point.y)});

  const addPoint = function (event) {
    const point = eventPoint(event, svgRef.current, scaleX, scaleY)
    dispatch( pointAdded(point) );
  }

  const contextValue = {svgRef, scaleX, scaleY, scalePoint};

  return (
    <SvgContext.Provider value={contextValue}>
      <svg ref={svgRef} viewBox="0 0 1000 500" preserveAspectRatio="xMinYMin meet" className={styles.svgCanvas} onClick={(event) => addPoint(event)} onPointerMove={(event) => moveVertical(event)} >
        <HorizontalAxis scaleX={scaleX} scaleY={scaleY} ticks={scaleX.ticks(10).filter(x => x != 0)} />
        <VerticalAxis scaleX={scaleX} scaleY={scaleY} />
        <CurveByFunction plotFunction={plotFunction} />
        {pointElements}
        <VerticalDashedLine x={verticalLineCoord} />
      </svg>
    </SvgContext.Provider>
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
