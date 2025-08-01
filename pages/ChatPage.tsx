import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Update the import path if AuthContext is located elsewhere, for example:
import { useAuth } from "../components/context/AuthContext";
// Or, if the file does not exist, create 'contexts/AuthContext.tsx' and export useAuth from there.
import { Chat, Message } from '../types';
import { apiService } from '../services/apiService';
import { SendIcon } from '../components/icons/SendIcon';

const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const { chatId } = useParams<{ chatId?: string }>();
  const navigate = useNavigate();
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (user) {
        apiService.fetchUserChats(user.id).then(userChats => {
            setChats(userChats);
            const chatToSelect = chatId 
                ? userChats.find(c => c.id === chatId)
                : userChats[0];

            if (chatToSelect) {
                if (currentChat?.id !== chatToSelect.id) {
                  setCurrentChat(chatToSelect);
                  apiService.fetchChatById(chatToSelect.id).then(fullChat => {
                      if (fullChat) setMessages(fullChat.messages);
                  });
                }
            }
        });
    }
  }, [user, chatId, currentChat?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);
  
  const selectChat = (chat: Chat) => {
    navigate(`/chat/${chat.id}`);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !currentChat || !user || isTyping) return;
    
    const textToSend = newMessage;
    setNewMessage('');

    try {
        const sentMessage = await apiService.sendMessage(currentChat.id, textToSend, user.id);
        setMessages(prev => [...prev, sentMessage]);

        // --- Mock real-time reply simulation ---
        setIsTyping(true);
        setTimeout(() => {
            const otherParticipant = currentChat.participants.find(p => p.id !== user.id);
            if (otherParticipant) {
                const reply: Message = {
                    id: `m${Date.now()}`,
                    senderId: otherParticipant.id,
                    text: "Sounds interesting! Let me think about it and I'll get back to you shortly.",
                    timestamp: new Date().toISOString(),
                };
                setMessages(prev => [...prev, reply]);
            }
            setIsTyping(false);
        }, 1500 + Math.random() * 1000); // Realistic delay
        
    } catch (error) {
        console.error("Failed to send message", error);
        setNewMessage(textToSend); // Restore input if send fails
    }
  };

  const otherParticipant = currentChat?.participants.find(p => p.id !== user?.id);

  return (
    <div className="flex h-[75vh] bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden">
      {/* Sidebar with chat list */}
      <aside className="w-1/3 border-r border-slate-200 dark:border-slate-700 overflow-y-auto">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold">Chats</h2>
        </div>
        <ul>
          {chats.map(chat => (
            <li key={chat.id} onClick={() => selectChat(chat)} className={`p-4 cursor-pointer border-l-4 ${currentChat?.id === chat.id ? 'border-indigo-500 bg-indigo-50 dark:bg-slate-700' : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}>
              <div className="flex items-center">
                <img src={chat.product.image} alt="product" className="w-10 h-10 rounded-md object-cover mr-3" />
                <div>
                  <p className="font-semibold text-sm">{chat.participants.find(p=>p.id !== user?.id)?.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[150px]">{chat.lastMessage}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main chat window */}
      <main className="w-2/3 flex flex-col">
        {currentChat && otherParticipant ? (
          <>
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center">
              <img src={otherParticipant.avatar} alt={otherParticipant.name} className="w-10 h-10 rounded-full mr-3" />
              <div>
                <p className="font-bold">{otherParticipant.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Discussing: {currentChat.product.title}</p>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto bg-slate-50 dark:bg-slate-900/70">
              <div className="space-y-4">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${msg.senderId === user?.id ? 'bg-indigo-500 text-white' : 'bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-100'}`}>
                      <p>{msg.text}</p>
                      <p className="text-xs opacity-75 mt-1 text-right">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-xl bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-100">
                        <div className="flex items-center space-x-1.5">
                            <div className="w-2 h-2 bg-slate-400 dark:bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-2 h-2 bg-slate-400 dark:bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-2 h-2 bg-slate-400 dark:bg-slate-400 rounded-full animate-bounce"></div>
                        </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
              <form onSubmit={handleSendMessage} className="flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-full focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-slate-100 dark:disabled:bg-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  aria-label="Chat message input"
                  disabled={isTyping}
                />
                <button type="submit" className="ml-4 p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Send message" disabled={isTyping || !newMessage}>
                  <SendIcon className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500 dark:text-slate-400">
            <p>Select a chat to start messaging.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatPage;