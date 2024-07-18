import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/messageReducer'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URI } from '../config'

const minMargin = 0
const marginFactor = 3.8

const LoginForm = () => {
  const { width } = useWindowDimensions()
  const containerMargin = width < 500 ? minMargin : width / marginFactor

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const loginSuccess = await performLogin(username, password)

    if (loginSuccess) {
      setUsername('')
      setPassword('')

      navigate('/blogs')
    }
  }

  const performLogin = async (username, password) => {
    try {
      const response = await axios.post(`${BACKEND_URI}/login`, {
        username,
        password,
      })

      if (response) {
        dispatch(setUser(response.data))
        window.localStorage.setItem('user', JSON.stringify(response.data))

        return true
      }
    } catch {
      dispatch(
        setNotification(
          'Login failed. Check username/password and connection to server.',
          5,
          true,
        ),
      )
    }
  }

  return (
    <div>
      <div
        className="container"
        style={{ marginLeft: containerMargin, marginRight: containerMargin }}
      >
        <br />
        <h2 className="title">Log in:</h2>
        <form className="form">
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                id="login-username"
                className="input"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                id="login-password"
                className="input"
              />
            </div>
          </div>
          <button
            className="button"
            type="submit"
            onClick={handleSubmit}
            id="login-button"
          >
            Log in
          </button>
        </form>
      </div>
      <br />
      <hr />
    </div>
  )
}

export default LoginForm
