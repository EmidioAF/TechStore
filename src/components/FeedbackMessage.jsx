export default function FeedbackMessage({ type = 'info', message }) {
  return (
    <div className={`feedback-message feedback-${type}`}>
      <p>{message}</p>
    </div>
  )
}