import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authAPI from 'api/authApi'
import { LocalStorages } from 'utils/localStorages'

export const login = createAsyncThunk('/auth/login', async (payload) => {
  const { token, refreshToken, user } = await authAPI
    .login(payload)
    .catch((err) => {
      console.log(err)
    })
  LocalStorages.setToken(token)
  LocalStorages.setRefreshToken(refreshToken)
  LocalStorages.setUser(user)
  return user
})

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(LocalStorages.get(LocalStorages.USER)) || {},
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.user = action.payload
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    clearUser: (state) => {
      LocalStorages.remove(LocalStorages.TOKEN)
      LocalStorages.remove(LocalStorages.REFRESH_TOKEN)
      LocalStorages.remove(LocalStorages.USER)
      state.user = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = authSlice.actions

export default authSlice.reducer
