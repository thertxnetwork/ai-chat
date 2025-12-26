# AI Chat - React Native Expo AI Chatbot

A production-ready AI chatbot application built with React Native Expo and powered by Hugging Face's serverless AI models. Features complete authentication system, chat session management, settings page, and warm earth-tone design with Inter font.

## ✨ Features

- 🔐 **Authentication System**: Login/signup with secure session storage
- 💬 **Chat Sessions**: Multiple conversations with sidebar management
- ⚙️ **Settings Page**: Account, preferences, AI configuration, and more
- 🤖 **AI-Powered Conversations**: Integrated with Hugging Face Inference API (DialoGPT)
- 🎨 **Warm Earth-Tone Design**: Professional color palette with Inter font
- 📱 **Cross-Platform**: Works on iOS, Android, and Web via Expo Go
- 🔄 **Conversation Management**: Create, delete, and switch between chat sessions
- ⚡ **Serverless**: No backend required - uses Hugging Face's serverless inference API
- 🎯 **TypeScript**: Fully typed for better development experience
- 💾 **Persistent Storage**: Chat history and sessions saved locally

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- **Expo Go app** on your phone (for testing)
  - iOS: https://apps.apple.com/app/expo-go/id982107779
  - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

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

**Start the Expo development server:**
```bash
npm start
```

This will:
1. Start the Metro bundler
2. Show a QR code in your terminal
3. Provide options to open in web browser or Expo Go

**Using Expo Go (Recommended for Development):**
1. Make sure you have Expo Go installed on your phone
2. Scan the QR code with:
   - **iOS**: Use the Camera app
   - **Android**: Use the Expo Go app's built-in QR scanner
3. The app will load on your phone!

**Web Version:**
```bash
npm run web
```
Opens the app in your default web browser.

## 📱 Navigation Structure

```
App
├── Login Screen (unauthenticated)
└── Main App (authenticated)
    ├── Chat Drawer Navigation
    │   ├── Sidebar (chat sessions list)
    │   └── Chat Screen (active conversation)
    └── Settings Screen (via header button)
```

## 🎨 UI Features

### Authentication
- Clean login/signup interface
- Email/password authentication
- Secure session persistence with AsyncStorage

### Chat Interface
- **Sidebar Drawer**: Swipeable sidebar with all chat sessions
- **Message Bubbles**: User messages (faded copper) and AI messages (white with border)
- **Typing Indicator**: Animated AI icon while thinking
- **Smooth Scrolling**: Auto-scroll to latest messages
- **Timestamps**: Time display for each message
- **Session Management**: Create, select, and delete conversations

### Design System
- **Color Palette**: Warm earth tones (Almond Cream, Pale Oak, Tan, Faded Copper, Coffee Bean, Toffee Brown)
- **Typography**: Inter font family (400, 500, 600, 700 weights)
- **Responsive**: Keyboard-aware layouts and safe areas

### Settings Page
- User account information
- Theme preferences (coming soon)
- Notification settings
- Language options  
- AI model configuration
- API key management
- About & version info
- Logout functionality

## 🤖 AI Models

The app uses Hugging Face's Inference API with the DialoGPT model by default. You can easily switch to other models by modifying `config.ts`:

Available models:
- `microsoft/DialoGPT-medium` (default) - Conversational AI
- `microsoft/DialoGPT-large` - Better responses, slower
- `facebook/blenderbot-400M-distill` - Alternative conversational model
- `google/flan-t5-base` - Instruction-following model

## 📱 Screenshots

### Login Screen
Beautiful authentication interface with warm earth tones

### Chat with Sidebar
Swipeable drawer navigation with session management

### Settings Screen
Comprehensive settings with account, preferences, and AI configuration

### Chat Interface
Clean messaging UI with AI assistant responses

## 🔧 Technical Stack

- **Framework**: React Native with Expo SDK 54
- **Language**: TypeScript
- **Navigation**: 
  - @react-navigation/native
  - @react-navigation/native-stack
  - @react-navigation/drawer
- **UI Libraries**: 
  - @expo-google-fonts/inter (Typography)
  - @expo/vector-icons (Icons)
  - expo-linear-gradient (Gradients)
- **Storage**: @react-native-async-storage/async-storage
- **HTTP Client**: Axios
- **AI Provider**: Hugging Face Inference API
- **Animation**: react-native-reanimated, react-native-gesture-handler

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
├── components/              # React components
│   ├── MessageBubble.tsx       # Individual message display
│   ├── ChatInput.tsx           # Message input component
│   ├── TypingIndicator.tsx     # Loading animation
│   └── Sidebar.tsx             # Chat sessions drawer
├── contexts/               # Context providers
│   ├── AuthContext.tsx         # Authentication state
│   └── ChatContext.tsx         # Chat session management
├── screens/                # Screen components
│   ├── LoginScreen.tsx         # Authentication UI
│   ├── ChatScreen.tsx          # Main chat interface
│   └── SettingsScreen.tsx      # Settings page
├── services/               # API services
│   └── HuggingFaceService.ts   # Hugging Face API integration
├── App.tsx                 # Main application with navigation
├── theme.ts                # Color palette and design tokens
├── config.ts               # Configuration file
├── types.ts                # TypeScript type definitions
├── babel.config.js         # Babel configuration
├── app.json                # Expo configuration
├── package.json            # Dependencies
└── README.md               # This file
```

## 🐛 Troubleshooting

### Model Loading Error
If you see "The AI model is currently loading", wait 30-60 seconds and try again. Serverless models need to warm up on first use.

### Rate Limiting
If you encounter rate limits, add a Hugging Face API token in `config.ts` for higher limits (free tier available).

### Network Errors
Ensure you have a stable internet connection. The app requires internet to communicate with the AI API.

### Expo Go Connection Issues
- Make sure your phone and computer are on the same network
- Try restarting the Expo development server with `npm start -c`
- Clear Expo Go app cache on your phone

### Fonts Not Loading
If fonts don't appear correctly, wait for them to download on first launch, or restart the app.

## 💡 Development Tips

**Using Expo Go (Recommended):**
- Fast refresh/hot reload works automatically
- No need for Xcode or Android Studio
- Test on real devices instantly
- Perfect for UI development and testing

**Testing on Web:**
- Run `npm run web` for browser testing
- Great for quick UI iterations
- All features work except native-specific APIs

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

