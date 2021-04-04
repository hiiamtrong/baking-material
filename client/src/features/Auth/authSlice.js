import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authAPI from 'api/authApi'
import { LocalStorages } from 'utils/localStorages'

export const login = createAsyncThunk('/auth/login', async (payload) => {
  const credentials = await authAPI.login(payload).catch((err) => {
    console.log(err)
  })
  return credentials
})

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: LocalStorages.getUser(),
    token: LocalStorages.getToken(),
    refreshToken: LocalStorages.getRefreshToken(),
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      LocalStorages.setCredentials(action.payload)

      Object.assign(state, action.payload)
      state.isLoading = false
    },
    [login.rejected]: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    [login.pending]: (state) => {
      state.isLoading = true
    },
  },
  reducers: {
    clearUser: (state) => {
      LocalStorages.remove(LocalStorages.TOKEN)
      LocalStorages.remove(LocalStorages.REFRESH_TOKEN)
      LocalStorages.remove(LocalStorages.USER)
      state.user = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { clearUser } = authSlice.actions

export default authSlice.reducer
