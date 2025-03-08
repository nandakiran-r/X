import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon, Mic, MicOff } from "lucide-react";
import { GoogleGenerativeAI } from '@google/generative-ai';

// Define message type
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'sakhi';
  timestamp: Date;
}

// Sample default questions
const defaultQuestions = [
  "What foods help with PCOS?",
  "How can I reduce bloating naturally?",
  "Which Ayurvedic herbs balance hormones?",
  "Best yoga poses for period pain?",
  "How to improve sleep quality naturally?"
];

// Chat history storage
const STORAGE_KEY = 'sakhi_chat_history';

// Gemini API integration function with Ayurvedic principles
const getGeminiResponse = async (userMessage: string, chatHistory: Message[]) => {
  const API_KEY = import.meta.env.VITE_GEMINI_API;
  const genAI = new GoogleGenerativeAI(API_KEY);

  try {
    // Configure the model - use Gemini-1.5-pro for best results with this use case
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    // Prepare chat history for Gemini in the required format
    const formattedHistory = chatHistory
      .filter(msg => msg.id !== "welcome") // Skip the welcome message
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));
    
    // Create a chat session with system prompt focused on Ayurvedic principles
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: 'I need advice related to Ayurvedic health principles.' }],
        },
        {
          role: 'model',
          parts: [
            {
              text:
                "I understand you're seeking information about Ayurvedic health principles. I'm here to provide holistic wellness guidance based on traditional Ayurvedic practices. How can I assist you today?",
            },
          ],
        },
        {
          role: 'user',
          parts: [
            {
              text: `You are Sakhi, an Ayurvedic health assistant providing evidence-based information grounded in traditional Ayurvedic medicine and holistic wellness.
              
              IMPORTANT GUIDELINES:
              - Frame responses within Ayurvedic principles (Vata, Pitta, Kapha doshas)
              - Provide holistic, non-judgmental information about diet, lifestyle, and natural remedies
              - Emphasize the mind-body connection in health according to Ayurvedic tradition
              - Include specific Ayurvedic herbs, foods, and practices when relevant
              - For specific medical questions, always recommend consulting Ayurvedic practitioners or healthcare providers
              - Keep responses concise (under 150 words) and easy to understand
              - Focus on traditional Ayurvedic approaches to balance and wellness
              - If user appears to need medical attention, suggest seeking professional care
              - Recommend appropriate resources like https://ayush.gov.in
              
              KEY TOPICS TO ADDRESS:
              - Dietary recommendations according to dosha types
              - Herbal remedies and natural supplements
              - Daily routines (dinacharya) for optimal health
              - Seasonal practices (ritucharya) for balance
              - Women's health through Ayurvedic principles
              - Digestion and gut health (Agni concept)
              - Detoxification practices (Panchakarma principles)

              AUTOMATIC CONTACT RESPONSE:
              If the user asks about a specific topic, include the relevant contact details. Example:
              - AYUSH IEC & Education: 📞 011-2081 5347 | 📧 iec-ayush@nic.in
              - AYUSH Medicinal Plants: 📞 011-2372 7840 | 📧 ceo-nmpb@nic.in
              - AYUSH AYURGYAN: 📞 011-2081 5347 | 📧 emrayurgyan-ayush@gov.in
              - AYUSH Vigilance & Complaints: 📞 1800-11-0180 | Complaint Cell: 011-2460 0216
              - AYUSH General Queries: 📞 1800-11-22-02 | 📧 webmanager-ayush@gov.in
              
              Focus on providing practical, compassionate, and traditionally-grounded Ayurvedic guidance for holistic wellness.`
            },
          ],
        },
        ...formattedHistory, // Add the conversation history
      ],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.4, // Lower temperature for more consistent, factual responses
      },
    });
    
    // Send the user's message and wait for a response
    const result = await chat.sendMessage(userMessage);
    const response = result.response.text();
    return response;
  } catch (error) {
    console.error('Gemini API Error:', error);
    return "I apologize, but I'm having trouble connecting to my Ayurvedic knowledge base. Please try again or consult with an Ayurvedic practitioner for personalized guidance.";
  }
};

const Chat = () => {
  // State for messages with persistence
  const [messages, setMessages] = useState<Message[]>(() => {
    // Try to load messages from localStorage on initial render
    try {
      const savedMessages = localStorage.getItem(STORAGE_KEY);
      if (savedMessages) {
        // Parse the saved messages and convert string timestamps back to Date objects
        const parsed = JSON.parse(savedMessages);
        return parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
    return []; // Return empty array if no saved messages or error
  });
  
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add initial welcome message if no messages exist
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        content: "Namaste! I'm Sakhi, your Ayurvedic wellness guide. How can I support your health journey today?",
        sender: 'sakhi',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    // Update messages state with new user message
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    
    try {
      // Get response from Gemini API with current conversation history
      const response = await getGeminiResponse(input, updatedMessages);
      
      const sakhiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'sakhi',
        timestamp: new Date()
      };
      
      // Update messages with AI response
      setMessages(prev => [...prev, sakhiMessage]);
    } catch (error) {
      // Handle errors
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I couldn't process your Ayurvedic wellness inquiry. Please try again later or consult with an Ayurvedic practitioner for immediate guidance.",
        sender: 'sakhi',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    
    // Simulate a click on send button
    setTimeout(() => {
      handleSendMessage();
    }, 300);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Here you would implement actual speech recognition
      // For demo purposes, we'll just simulate it
      setTimeout(() => {
        setInput("How to improve sleep quality naturally?");
        setIsRecording(false);
      }, 3000);
    }
  };

  const clearChatHistory = () => {
    // Keep only the welcome message
    const welcomeMessage: Message = {
      id: "welcome",
      content: "Namaste! I'm Sakhi, your Ayurvedic wellness guide. How can I support your health journey today?",
      sender: 'sakhi',
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="container px-4 py-6 max-w-md mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 flex justify-between items-center"
      >
        <div>
          <h1 className="text-2xl font-bold mb-2">Ask Sakhi</h1>
          <p className="text-muted-foreground">Your Ayurvedic health assistant</p>
        </div>
        {messages.length > 1 && (
          <Button 
            variant="ghost" 
            onClick={clearChatHistory}
            className="text-xs"
          >
            Clear Chat
          </Button>
        )}
      </motion.div>

      {messages.length <= 1 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex-grow flex flex-col items-center justify-center"
        >
          <div className="w-20 h-20 rounded-full bg-sakhi-lavender flex items-center justify-center mb-4 shadow-sm">
            <span className="text-xl font-semibold text-primary-foreground">S</span>
          </div>
          <h2 className="text-lg font-medium mb-4">How can I help you today?</h2>
          <div className="w-full space-y-2">
            {defaultQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start text-left h-auto py-3 border-sakhi-gray hover:bg-sakhi-gray/20"
                onClick={() => handleQuickQuestion(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-grow overflow-y-auto mb-4 pr-2 fade-mask"
        >
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <Card className={`max-w-[80%] ${
                    message.sender === 'user' 
                      ? 'bg-sakhi-lavender border-sakhi-lavender' 
                      : 'bg-white'
                  }`}>
                    <CardContent className="p-3">
                      <p className={`text-sm ${
                        message.sender === 'user' 
                          ? 'text-primary-foreground' 
                          : 'text-foreground'
                      }`}>
                        {message.content}
                      </p>
                      <p className="text-[10px] text-muted-foreground text-right mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <Card>
                    <CardContent className="p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-100"></div>
                        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-200"></div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </motion.div>
      )}

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleRecording}
          className={isRecording ? "bg-red-100 text-red-500" : ""}
        >
          {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
        <Input
          placeholder="Ask about Ayurvedic health..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow"
        />
        <Button
          onClick={handleSendMessage}
          disabled={!input.trim() || isLoading}
          className="bg-sakhi-lavender text-primary-foreground hover:bg-sakhi-lavender/90"
        >
          <SendIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Chat;