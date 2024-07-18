import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'

const LoggedInAs = () => {
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(setUser(null))
    window.localStorage.removeItem('user')
  }

  return (
    <div>
      <i>Logged in as {user.name}</i>{' '}
      <button className="button is-small is-rounded" onClick={logout}>
        Log out
      </button>
    </div>
  )
}

export default LoggedInAs
