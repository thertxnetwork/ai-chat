import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Message } from '../types';

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface ChatContextType {
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  createSession: () => void;
  selectSession: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
  addMessage: (message: Message) => void;
  updateSessionTitle: (sessionId: string, title: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    saveSessions();
  }, [sessions]);

  const loadSessions = async () => {
    try {
      const sessionsJson = await AsyncStorage.getItem('chatSessions');
      if (sessionsJson) {
        const loadedSessions = JSON.parse(sessionsJson).map((s: any) => ({
          ...s,
          createdAt: new Date(s.createdAt),
          updatedAt: new Date(s.updatedAt),
          messages: s.messages.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp),
          })),
        }));
        setSessions(loadedSessions);
        if (loadedSessions.length > 0) {
          setCurrentSession(loadedSessions[0]);
        } else {
          createInitialSession();
        }
      } else {
        createInitialSession();
      }
    } catch (error) {
      console.error('Error loading sessions:', error);
      createInitialSession();
    }
  };

  const saveSessions = async () => {
    try {
      await AsyncStorage.setItem('chatSessions', JSON.stringify(sessions));
    } catch (error) {
      console.error('Error saving sessions:', error);
    }
  };

  const createInitialSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [
        {
          id: '1',
          text: "Hi! I'm your AI assistant. How can I help you today?",
          isUser: false,
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSessions([newSession]);
    setCurrentSession(newSession);
  };

  const createSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [
        {
          id: '1',
          text: "Hi! I'm your AI assistant. How can I help you today?",
          isUser: false,
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSessions([newSession, ...sessions]);
    setCurrentSession(newSession);
  };

  const selectSession = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      setCurrentSession(session);
    }
  };

  const deleteSession = (sessionId: string) => {
    const updatedSessions = sessions.filter((s) => s.id !== sessionId);
    setSessions(updatedSessions);
    
    if (currentSession?.id === sessionId) {
      if (updatedSessions.length > 0) {
        setCurrentSession(updatedSessions[0]);
      } else {
        createInitialSession();
      }
    }
  };

  const addMessage = (message: Message) => {
    if (!currentSession) return;

    const updatedSession = {
      ...currentSession,
      messages: [...currentSession.messages, message],
      updatedAt: new Date(),
      title: currentSession.messages.length === 1 && message.isUser
        ? message.text.slice(0, 30) + (message.text.length > 30 ? '...' : '')
        : currentSession.title,
    };

    setCurrentSession(updatedSession);
    setSessions(sessions.map((s) => (s.id === currentSession.id ? updatedSession : s)));
  };

  const updateSessionTitle = (sessionId: string, title: string) => {
    setSessions(sessions.map((s) => (s.id === sessionId ? { ...s, title } : s)));
    if (currentSession?.id === sessionId) {
      setCurrentSession({ ...currentSession, title });
    }
  };

  return (
    <ChatContext.Provider
      value={{
        sessions,
        currentSession,
        createSession,
        selectSession,
        deleteSession,
        addMessage,
        updateSessionTitle,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
