import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    set(_state, action) {
      return action.payload
    },
  },
})

export const { set, remove } = userSlice.actions

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch(set(user))
  }
}

export default userSlice.reducer
