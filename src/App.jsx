import { useEffect } from 'react'
import TitleHeader from './components/TitleHeader'
import AboutMe from './components/AboutMe'
import Message from './components/Message'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UsersInfo from './components/UsersInfo'
import UserInfo from './components/UserInfo'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import AccountDeletion from './components/AccountDeletion'
import { useDispatch, useSelector } from 'react-redux'
import { initialiseBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import { setUsers } from './reducers/usersReducer'
import usersService from './services/users'
import { Routes, Route, useMatch, Navigate } from 'react-router-dom'

const App = () => {
  const user = useSelector(({ user }) => user)
  const users = useSelector(({ users }) => users)
  const blogs = useSelector(({ blogs }) => blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialiseBlogs())
  }, [dispatch])

  useEffect(() => {
    const getUsers = async () => {
      const users = await usersService.getAll()
      dispatch(setUsers(users))
    }
    getUsers()
  }, [dispatch])

  useEffect(() => {
    const existingUser = JSON.parse(window.localStorage.getItem('user'))
    if (existingUser) {
      dispatch(setUser(existingUser))
    }
  }, [dispatch])

  const userMatch = useMatch('/users/:id')
  const matchingUser =
    userMatch && users
      ? users.find((user) => user.id === userMatch.params.id)
      : null

  return (
    <div className="container" style={{ padding: 30 }}>
      <TitleHeader />
      <NavBar />

      <Message />

      <Routes>
        <Route path="/" element={<BlogList showWelcomeInfo user={user} />} />
        <Route path="/blogs" element={<BlogList user={user} />} />
        <Route path="/users" element={<UsersInfo />} />
        <Route
          path="/users/:id"
          element={<UserInfo matchingUser={matchingUser} />}
        />
        <Route path="/blogs/:blogId" element={<Blog />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/account_deletion" element={<AccountDeletion />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
