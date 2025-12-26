# AI Chat - React Native Expo AI Chatbot

A stunning, modern AI chatbot application built with React Native Expo and powered by Hugging Face's serverless AI models. Features a beautiful gradient UI, real-time chat interface, and seamless AI conversations.

## ✨ Features

- 🤖 **AI-Powered Conversations**: Integrated with Hugging Face Inference API (DialoGPT)
- 🎨 **Modern UI Design**: Beautiful gradient header, smooth animations, and polished message bubbles
- 💬 **Real-time Chat**: Instant messaging with typing indicators
- 📱 **Cross-Platform**: Works on iOS, Android, and Web
- 🔄 **Conversation Management**: Clear chat history and start fresh conversations
- ⚡ **Serverless**: No backend required - uses Hugging Face's serverless inference API
- 🎯 **TypeScript**: Fully typed for better development experience

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI (installed automatically)
- For iOS: macOS with Xcode
- For Android: Android Studio with Android SDK

### Installation

1. Clone the repository:
```bash
git clone https://github.com/thertxnetwork/ai-chat.git
cd ai-chat
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Configure Hugging Face API:
   - Open `config.ts`
   - Add your Hugging Face API token for higher rate limits
   - Get a free token at: https://huggingface.co/settings/tokens

### Running the App

#### Start the development server:
```bash
npm start
```

#### Run on specific platforms:
```bash
# iOS (requires macOS)
npm run ios

# Android
npm run android

# Web
npm run web
```

#### Using Expo Go App:
1. Install Expo Go on your phone:
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

2. Scan the QR code shown in the terminal with:
   - iOS: Camera app
   - Android: Expo Go app

## 🎨 UI Features

- **Gradient Header**: Beautiful purple gradient with AI branding
- **Message Bubbles**: Distinct styles for user and AI messages
- **Typing Indicator**: Animated dots while AI is thinking
- **Smooth Scrolling**: Auto-scroll to latest messages
- **Modern Input**: Rounded input field with send button
- **Timestamps**: Time display for each message
- **Clear Chat**: Quick reset button in the header

## 🤖 AI Models

The app uses Hugging Face's Inference API with the DialoGPT model by default. You can easily switch to other models by modifying `config.ts`:

Available models:
- `microsoft/DialoGPT-medium` (default) - Conversational AI
- `microsoft/DialoGPT-large` - Better responses, slower
- `facebook/blenderbot-400M-distill` - Alternative conversational model
- `google/flan-t5-base` - Instruction-following model

## 📱 Screenshots

The app features:
- Clean, modern chat interface
- Beautiful gradient header with AI icon
- User messages in blue bubbles (right-aligned)
- AI messages in gray bubbles (left-aligned)
- Smooth animations and transitions
- Responsive keyboard handling

## 🔧 Technical Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **UI Libraries**: 
  - expo-linear-gradient (gradient backgrounds)
  - @expo/vector-icons (icons)
- **HTTP Client**: Axios
- **AI Provider**: Hugging Face Inference API

## 📝 Configuration

### API Key Setup (Optional)

For better rate limits and faster responses, add your Hugging Face API token:

1. Get a free token at https://huggingface.co/settings/tokens
2. Open `config.ts`
3. Add your token:
```typescript
export const HUGGING_FACE_CONFIG = {
  API_URL: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
  API_KEY: 'your_token_here', // Add your token
};
```

### Switching AI Models

To use a different AI model, update the `API_URL` in `config.ts`:

```typescript
export const HUGGING_FACE_CONFIG = {
  API_URL: 'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill',
  API_KEY: '',
};
```

## 🏗️ Project Structure

```
ai-chat/
├── components/           # React components
│   ├── MessageBubble.tsx    # Individual message display
│   ├── ChatInput.tsx        # Message input component
│   └── TypingIndicator.tsx  # Loading animation
├── services/            # API services
│   └── HuggingFaceService.ts # Hugging Face API integration
├── App.tsx             # Main application component
├── config.ts           # Configuration file
├── types.ts            # TypeScript type definitions
├── package.json        # Dependencies
└── README.md          # This file
```

## 🐛 Troubleshooting

### Model Loading Error
If you see "The AI model is currently loading", wait 30-60 seconds and try again. Serverless models need to warm up on first use.

### Rate Limiting
If you encounter rate limits, add a Hugging Face API token in `config.ts` for higher limits.

### Network Errors
Ensure you have a stable internet connection. The app requires internet to communicate with the AI API.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Powered by [Hugging Face](https://huggingface.co/) AI models
- Built with [Expo](https://expo.dev/)
- Icons by [Ionicons](https://ionic.io/ionicons)

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Made with ❤️ using React Native Expo and Hugging Face AI

