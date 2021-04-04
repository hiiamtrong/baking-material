import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/Auth/authSlice'
export default configureStore({
  reducer: {
    auth: authSlice,
  },
})
