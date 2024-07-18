import { useSelector } from 'react-redux'

const Message = () => {
  const [message, error] = useSelector(({ message }) => [
    message.text,
    message.error,
  ])

  if (!message) return null

  const errorStyle = 'notification is-danger is-light'
  const successStyle = 'notification is-success is-light'
  const selectedStyle = error ? errorStyle : successStyle

  return (
    <div id="notification-message" className={selectedStyle}>
      {message}
    </div>
  )
}

export default Message
