import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    set(_state, action) {
      return action.payload
    },
  },
})

export const { set } = usersSlice.actions

export const setUsers = (users) => {
  return async (dispatch) => {
    dispatch(set(users))
  }
}

export default usersSlice.reducer
