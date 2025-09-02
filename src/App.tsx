import React from 'react';
import ChatInterface from './components/ChatInterface';
import ConnectionStatus from './components/ConnectionStatus';

const webhookUrl = 'https://n8n.srv846726.hstgr.cloud/webhook-test/df689c06-a70a-4ffe-80bc-72cacf9084f6';

function App() {
  return (
    <div className="h-screen flex flex-col">
      {/* Connection Status Banner */}
      <ConnectionStatus webhookUrl={webhookUrl} />
      
      {/* Main Chat Interface */}
      <div className="flex-1">
        <ChatInterface />
      </div>
    </div>
  );
}

export default App;