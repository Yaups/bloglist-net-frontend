import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
  name: 'message',
  initialState: { text: null, error: false, tid: null },
  reducers: {
    setText(state, action) {
      return { ...state, text: action.payload }
    },
    clearText(state) {
      return { ...state, text: null }
    },
    setTimeoutId(state, action) {
      return { ...state, tid: action.payload }
    },
    setError(state, action) {
      return { ...state, error: action.payload }
    },
  },
})

export const { setText, clearText, setTimeoutId, setError } =
  messageSlice.actions

export const setNotification = (notificationText, timeInSeconds, isError) => {
  return async (dispatch, getState) => {
    const timeInMs = timeInSeconds * 1000

    const existingTid = getState().message.tid
    clearTimeout(existingTid)

    const tid = setTimeout(() => dispatch(clearText()), timeInMs)
    dispatch(setTimeoutId(tid))

    dispatch(setError(isError))
    dispatch(setText(notificationText))
  }
}

export default messageSlice.reducer
