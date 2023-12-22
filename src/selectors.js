import { createDraftSafeSelector } from '@reduxjs/toolkit';
import {polyByZeros} from './polynomials';

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

export {allPointsSelector, enabledPointsSelector, formulaSelector};
