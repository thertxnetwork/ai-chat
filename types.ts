// Type definitions for the chat application

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatResponse {
  generated_text?: string;
  error?: string;
}
