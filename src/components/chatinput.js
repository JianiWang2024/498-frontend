import { useState } from 'react';

// Lab 2 - Chat Input Component
// This component handles user input and sends messages to the chat.
function ChatInput({ onSend }) {
  const [input, setInput] = useState('');
  return (
    <div className="chat-input-bar">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask a question..."
      />
      <button onClick={() => {
        if (input.trim()) {
          onSend(input);
          setInput('');
        }
      }}>Send</button>
    </div>
  );
}

export default ChatInput;
