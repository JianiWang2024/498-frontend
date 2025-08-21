// Lab 2 - Message Bubble Component
// This component displays individual chat messages in a bubble format.
function MessageBubble({ role, text, requiresHuman, emotionAnalysis }) {
  const getMessageClass = () => {
    let className = `chat-bubble ${role}`;
    if (requiresHuman) {
      className += ' human-transfer';
    }
    return className;
  };

  return (
    <div className={getMessageClass()}>
      {requiresHuman && (
        <div className="human-transfer-indicator">
          🔄 Connecting to human agent...
        </div>
      )}
      {text}
      {emotionAnalysis && emotionAnalysis.emotions && emotionAnalysis.emotions.length > 0 && (
        <div className="emotion-indicator">
          Detected emotions: {emotionAnalysis.emotions.join(', ')}
        </div>
      )}
    </div>
  );
}

export default MessageBubble;
