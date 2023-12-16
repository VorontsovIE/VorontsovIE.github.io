import { configureStore } from '@reduxjs/toolkit'
import plotReducer from './plotSlice'

export default configureStore({
  reducer: {
    plot: plotReducer,
  }
});
