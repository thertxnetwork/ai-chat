// Configuration for Hugging Face API
export const HUGGING_FACE_CONFIG = {
  // You can use the public API endpoint or add your own API key for higher rate limits
  // Get your API key from: https://huggingface.co/settings/tokens
  API_URL: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
  API_KEY: '', // Optional: Add your Hugging Face API token here for better rate limits
};

// Alternative models you can try:
// - 'facebook/blenderbot-400M-distill' (conversational AI)
// - 'microsoft/DialoGPT-large' (larger, better responses)
// - 'google/flan-t5-base' (instruction-following model)
