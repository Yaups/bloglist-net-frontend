import { Link } from 'react-router-dom'

const TitleHeader = () => (
  <div>
    <Link to={'/'}>
      <h1 className="title" style={{ textAlign: 'center' }}>
        Tom&apos;s Blog List
      </h1>
    </Link>
  </div>
)

export default TitleHeader
