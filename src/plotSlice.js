import { createSlice } from '@reduxjs/toolkit'

export const plotSlice = createSlice({
  name: 'plot',
  initialState: {
    points: [],
  },
  reducers: {
    pointAdded: (state, action) => {
      state.points.push(action.payload)
    },
    pointUpdated: (state, action) => {
      const targetPoint = state.points.find(point => point.id == action.payload.id);
      Object.assign(targetPoint, action.payload.update);
    },
  }
});

export const { pointAdded, pointUpdated } = plotSlice.actions;
export default plotSlice.reducer;
