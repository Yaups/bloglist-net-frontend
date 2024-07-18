import { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const style = { display: visible ? '' : 'none' }

  return (
    <div>
      <div style={style}>{props.children}</div>
      <button className="button" onClick={() => setVisible(!visible)}>
        {visible ? 'Cancel' : props.buttonText}
      </button>
    </div>
  )
}

Togglable.propTypes = {
  buttonText: PropTypes.string.isRequired,
}

export default Togglable
