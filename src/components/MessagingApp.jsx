import React, { useState, useRef, useEffect } from 'react';

const MessagingApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentUser] = useState(() => {
    const saved = localStorage.getItem('chat_username');
    if (saved) return saved;
    const generated = `user-${Math.random().toString(36).slice(2, 6)}`;
    localStorage.setItem('chat_username', generated);
    return generated;
  });
  const messagesEndRef = useRef(null);
  const wsRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Connect to LAN WebSocket server
  useEffect(() => {
    const host = window.location.hostname;
    const url = `ws://${host}:3001`;
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data && typeof data.text === 'string') {
          const display = {
            id: data.id || `${Date.now()}`,
            text: data.text,
            sender: data.sender || 'anonymous',
            timestamp: new Date(data.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages((prev) => [...prev, display]);
        }
      } catch {}
    });

    return () => {
      try { ws.close(); } catch {}
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;
    try {
      wsRef.current?.send(JSON.stringify({ type: 'message', text: inputMessage.trim(), sender: currentUser }));
    } catch {}
    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-slate-100">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-slate-900 font-bold text-lg">💬</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold">Messaging App</h1>
                <p className="text-sm text-slate-400">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                <span className="text-slate-400">📞</span>
              </button>
              <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                <span className="text-slate-400">📹</span>
              </button>
              <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                <span className="text-slate-400">⋯</span>
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === currentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.sender === currentUser
                    ? 'bg-emerald-500 text-slate-900'
                    : 'bg-slate-700 text-slate-100'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === currentUser ? 'text-slate-700' : 'text-slate-400'
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-slate-800/50 backdrop-blur-sm border-t border-slate-700 px-6 py-4">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
            <button
              type="button"
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <span className="text-slate-400">📎</span>
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="w-full bg-slate-700 text-slate-100 px-4 py-3 rounded-2xl border border-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={inputMessage.trim() === ''}
              className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-slate-900 px-6 py-3 rounded-2xl font-semibold transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessagingApp;
