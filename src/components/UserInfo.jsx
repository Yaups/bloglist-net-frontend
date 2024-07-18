import { Link } from 'react-router-dom'
import useWindowDimensions from '../hooks/useWindowDimensions'

const minMargin = 0
const marginFactor = 80

const UserInfo = ({ matchingUser }) => {
  const { width } = useWindowDimensions()
  const containerMargin = width < 500 ? minMargin : width / marginFactor

  if (!matchingUser) return null

  const listStyle = { listStyleType: 'none' }

  return (
    <div className="containter" style={{ padding: containerMargin }}>
      <h2 className="title">Blogs posted by {matchingUser.name}:</h2>
      <hr />
      <ul style={listStyle}>
        {matchingUser.blogs.map((blog) => (
          <div key={blog.id}>
            <li>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
            <hr />
          </div>
        ))}
      </ul>
    </div>
  )
}

export default UserInfo
