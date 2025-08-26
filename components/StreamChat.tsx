'use client';

import { useState, useEffect } from 'react';

interface StreamChatProps {
  streamId: string;
}

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
}

export default function StreamChat({ streamId }: StreamChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');

  // Mock chat messages for demo
  useEffect(() => {
    const mockMessages: ChatMessage[] = [
      {
        id: '1',
        username: 'StreamFan123',
        message: 'Great stream! 👍',
        timestamp: new Date(Date.now() - 60000)
      },
      {
        id: '2',
        username: 'TechEnthusiast',
        message: 'How long have you been streaming?',
        timestamp: new Date(Date.now() - 30000)
      },
      {
        id: '3',
        username: 'ViewerOne',
        message: 'This is awesome content!',
        timestamp: new Date(Date.now() - 10000)
      }
    ];
    setMessages(mockMessages);
  }, [streamId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !username.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      username,
      message: newMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  return (
    <div className="card p-4 h-96 flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Live Chat</h3>
      
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className="text-sm">
            <span className="font-medium text-primary-400">{msg.username}:</span>
            <span className="ml-2 text-dark-300">{msg.message}</span>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSendMessage} className="space-y-2">
        {!username && (
          <input
            type="text"
            placeholder="Enter your username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 bg-dark-700 rounded border border-dark-600 text-sm"
          />
        )}
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 px-3 py-2 bg-dark-700 rounded border border-dark-600 text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded text-sm font-medium transition-colors"
            disabled={!username.trim() || !newMessage.trim()}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}