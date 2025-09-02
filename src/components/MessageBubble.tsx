import React from 'react';
import { Check, CheckCheck } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const isUser = message.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className="max-w-xs md:max-w-md lg:max-w-lg">
        <div
          className={`rounded-lg px-4 py-2 shadow-sm transition-all duration-200 ${
            isUser
              ? 'bg-green-500 text-white rounded-br-none'
              : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.text}
          </p>
          <div className="flex items-center justify-end gap-1 mt-1">
            <span
              className={`text-xs ${
                isUser ? 'text-green-100' : 'text-gray-500'
              }`}
            >
              {formatTime(message.timestamp)}
            </span>
            {isUser && (
              <div className="flex items-center">
                {message.status === 'read' ? (
                  <CheckCheck className="w-3 h-3 text-blue-200" />
                ) : message.status === 'delivered' ? (
                  <CheckCheck className="w-3 h-3 text-green-200" />
                ) : (
                  <Check className="w-3 h-3 text-green-200" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;