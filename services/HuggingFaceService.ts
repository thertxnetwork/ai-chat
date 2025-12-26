import axios from 'axios';
import { HUGGING_FACE_CONFIG } from '../config';
import { ChatResponse } from '../types';

/**
 * Service for interacting with Hugging Face Inference API
 */
export class HuggingFaceService {
  private apiUrl: string;
  private apiKey: string;
  private conversationHistory: string[] = [];

  constructor() {
    this.apiUrl = HUGGING_FACE_CONFIG.API_URL;
    this.apiKey = HUGGING_FACE_CONFIG.API_KEY;
  }

  /**
   * Send a message to the AI model and get a response
   */
  async sendMessage(message: string): Promise<string> {
    try {
      // Add user message to conversation history
      this.conversationHistory.push(message);

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // Add authorization header if API key is provided
      if (this.apiKey) {
        headers['Authorization'] = `Bearer ${this.apiKey}`;
      }

      const response = await axios.post(
        this.apiUrl,
        {
          inputs: message,
          parameters: {
            max_length: 200,
            temperature: 0.7,
            top_p: 0.9,
            return_full_text: false,
          },
        },
        {
          headers,
          timeout: 30000, // 30 second timeout
        }
      );

      // Handle different response formats
      let aiResponse = '';
      
      if (Array.isArray(response.data)) {
        // DialoGPT format
        aiResponse = response.data[0]?.generated_text || 'Sorry, I could not generate a response.';
      } else if (response.data.generated_text) {
        aiResponse = response.data.generated_text;
      } else if (response.data[0]?.generated_text) {
        aiResponse = response.data[0].generated_text;
      } else {
        aiResponse = 'Sorry, I could not understand the response format.';
      }

      // Remove the input text if it's included in the response
      if (aiResponse.startsWith(message)) {
        aiResponse = aiResponse.substring(message.length).trim();
      }

      // Add AI response to conversation history
      this.conversationHistory.push(aiResponse);

      return aiResponse || "I'm not sure how to respond to that.";
    } catch (error: any) {
      console.error('Error calling Hugging Face API:', error);
      
      if (error.response) {
        // API returned an error response
        const status = error.response.status;
        if (status === 503) {
          return "The AI model is currently loading. Please try again in a few moments.";
        } else if (status === 429) {
          return "Too many requests. Please wait a moment and try again.";
        } else if (status === 401) {
          return "API authentication failed. Please check your API key.";
        }
        return `Error: ${error.response.data?.error || 'Failed to get response from AI'}`;
      } else if (error.request) {
        // Request was made but no response received
        return "Network error. Please check your internet connection.";
      }
      
      return "An unexpected error occurred. Please try again.";
    }
  }

  /**
   * Clear conversation history
   */
  clearHistory() {
    this.conversationHistory = [];
  }

  /**
   * Get conversation history
   */
  getHistory(): string[] {
    return [...this.conversationHistory];
  }
}

export const huggingFaceService = new HuggingFaceService();
