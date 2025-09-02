import { useState, useCallback } from 'react';

interface WebhookResponse {
  message?: string;
  response?: string;
  error?: string;
}

interface UseWebhookReturn {
  sendMessage: (message: string) => Promise<WebhookResponse>;
  isLoading: boolean;
  error: string | null;
}

export const useWebhook = (webhookUrl: string): UseWebhookReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (message: string): Promise<WebhookResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          timestamp: new Date().toISOString(),
          sender: 'user',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [webhookUrl]);

  return { sendMessage, isLoading, error };
};