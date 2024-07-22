import Togglable from './Togglable'
import BlogForm from './BlogForm'
import WelcomeInfo from './WelcomeInfo'
import Loading from './Loading'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useWindowDimensions from '../hooks/useWindowDimensions'

const flexContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: 20,
  flexWrap: 'wrap',
}

const minMargin = 0
const marginFactor = 80

const BlogList = ({ showWelcomeInfo, user }) => {
  const blogs = useSelector(({ blogs }) => blogs)

  const { width } = useWindowDimensions()
  const containerMargin = width < 500 ? minMargin : width / marginFactor

  const isLoading = !blogs || blogs.length === 0

  return (
    <>
      {!user && showWelcomeInfo && (
        <>
          <WelcomeInfo />
          <hr />
        </>
      )}
      <div className="container" style={{ padding: containerMargin }}>
        <h2 className="title">Blogs</h2>
        {user && (
          <div>
            <hr />
            <Togglable buttonText="Open new blog form">
              <h5 className="title is-5">Post a new blog:</h5>
              <BlogForm />
            </Togglable>
          </div>
        )}
        <hr />
        {isLoading && <Loading />}
        <div className="buttons" style={flexContainerStyle}>
          {blogs
            .toSorted((a, b) => b.likes - a.likes)
            .map((blog) => (
              <button key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                  <div style={{ fontSize: 18, margin: 8 }}>
                    {blog.title} - {blog.author}
                  </div>
                </Link>
              </button>
            ))}
        </div>
        <hr />
      </div>
    </>
  )
}

export default BlogList
