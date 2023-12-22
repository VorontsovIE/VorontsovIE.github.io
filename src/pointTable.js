import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { allPointsSelector } from './selectors';
import {pointAdded, pointUpdated} from './plotSlice';
import styles from './lagrange_interpolation.css';

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

export {PointTable};
