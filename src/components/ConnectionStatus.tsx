import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, AlertCircle } from 'lucide-react';

interface ConnectionStatusProps {
  webhookUrl: string;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ webhookUrl }) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkConnection = async () => {
    setIsChecking(true);
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          test: true,
          message: 'Connection test',
        }),
      });
      
      setIsConnected(response.status < 500);
    } catch (error) {
      setIsConnected(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [webhookUrl]);

  if (isConnected === null) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-yellow-400 mr-2" />
          <p className="text-sm text-yellow-800">Checking webhook connection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`border-l-4 p-3 ${
      isConnected 
        ? 'bg-green-50 border-green-400' 
        : 'bg-red-50 border-red-400'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {isConnected ? (
            <Wifi className="w-5 h-5 text-green-500 mr-2" />
          ) : (
            <WifiOff className="w-5 h-5 text-red-500 mr-2" />
          )}
          <p className={`text-sm ${
            isConnected ? 'text-green-800' : 'text-red-800'
          }`}>
            Webhook {isConnected ? 'Connected' : 'Disconnected'}
          </p>
        </div>
        <button
          onClick={checkConnection}
          disabled={isChecking}
          className={`text-xs px-3 py-1 rounded-full border transition-all duration-200 ${
            isConnected
              ? 'text-green-700 border-green-300 hover:bg-green-100'
              : 'text-red-700 border-red-300 hover:bg-red-100'
          } ${isChecking ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isChecking ? 'Checking...' : 'Test'}
        </button>
      </div>
    </div>
  );
};

export default ConnectionStatus;