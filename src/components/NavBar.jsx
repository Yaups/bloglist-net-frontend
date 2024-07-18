import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { useState } from 'react'

const NavBar = () => {
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState(false)

  const logout = () => {
    dispatch(setUser(null))
    window.localStorage.removeItem('user')
    navigate('/blogs')
  }

  return (
    <div>
      <hr />
      <nav
        className="navbar is-light"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a
            role="button"
            className={`navbar-burger ${isActive ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar-blog-app"
            onClick={() => setIsActive(!isActive)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="navbar-blog-app"
          className={`navbar-menu ${isActive ? 'is-active' : ''}`}
        >
          <div className="navbar-start">
            <Link className="navbar-item" to="/blogs">
              Blogs
            </Link>
            <Link className="navbar-item" to="/users">
              Users
            </Link>
            <Link className="navbar-item" to="/about">
              About
            </Link>
            {!user && (
              <Link className="navbar-item" to="/login">
                Log in
              </Link>
            )}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {user && (
                  <>
                    <div style={{ marginBottom: 7, marginRight: 20 }}>
                      <i>Logged in as {user.name} </i>
                    </div>
                    <button
                      onClick={logout}
                      className="button is-rounded is-outlined"
                    >
                      Log out
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <hr />
    </div>
  )
}

export default NavBar
