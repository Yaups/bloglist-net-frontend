import Togglable from './Togglable'
import BlogForm from './BlogForm'
import WelcomeInfo from './WelcomeInfo'
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
        <div className="container" style={flexContainerStyle}>
          {blogs
            .toSorted((a, b) => b.likes - a.likes)
            .map((blog) => (
              <div key={blog.id} className="blog">
                <div className="button is-link is-light is-outlined">
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title} - {blog.author}
                  </Link>
                </div>
                <br />
              </div>
            ))}
        </div>
        <hr />
      </div>
    </>
  )
}

export default BlogList
