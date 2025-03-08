
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon, Mic, MicOff } from "lucide-react";

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

// Sample responses
const sampleResponses: Record<string, string> = {
  "What foods help with PCOS?": 
    "For PCOS, focus on anti-inflammatory foods like leafy greens, berries, and fatty fish. Include cinnamon, turmeric, and flaxseeds which may help balance hormones. Limit processed foods, refined carbs, and sugars as they can worsen insulin resistance. A diet rich in fiber and healthy fats is beneficial.",
  "How can I reduce bloating naturally?": 
    "To reduce bloating naturally, try drinking ginger or fennel tea, both of which aid digestion. Avoid gas-producing foods like beans, carbonated drinks, and certain vegetables. Stay hydrated and eat smaller, more frequent meals. Gentle yoga poses like Cat-Cow and Child's pose can also help relieve gas and bloating.",
  "Which Ayurvedic herbs balance hormones?": 
    "Ayurvedic herbs that help balance hormones include Shatavari (supports female reproductive system), Ashwagandha (regulates cortisol and reduces stress), Triphala (supports digestion and elimination of toxins), and Brahmi (balances the nervous system). Always consult with an Ayurvedic practitioner before starting any herbal supplements.",
  "Best yoga poses for period pain?": 
    "For period pain relief, try these gentle yoga poses: Supta Baddha Konasana (Reclined Butterfly) to relieve tension in the pelvic area, Cat-Cow to improve circulation to the reproductive organs, Child's Pose to relax the lower back, and Supported Bridge Pose with a bolster for abdominal comfort. Practice these poses with slow, deep breathing.",
  "How to improve sleep quality naturally?": 
    "To improve sleep naturally, establish a regular sleep schedule and create a calming bedtime routine. Try drinking warm milk with nutmeg or ashwagandha before bed. Avoid electronic devices 1-2 hours before sleeping. Practice meditation or gentle yoga to relax your mind. Keep your bedroom cool, dark, and quiet for optimal sleep conditions."
};

// Generate a response based on user question
const generateResponse = (question: string): string => {
  // Check for exact matches in our predefined responses
  if (sampleResponses[question]) {
    return sampleResponses[question];
  }
  
  // Generate a generic response for other questions
  return "Based on Ayurvedic principles, this is something you might want to discuss with a qualified practitioner. Would you like me to suggest some general wellness practices instead?";
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(userMessage.content);
      
      const sakhiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'sakhi',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, sakhiMessage]);
      setIsLoading(false);
    }, 1500);
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

  return (
    <div className="container px-4 py-6 max-w-md mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <h1 className="text-2xl font-bold mb-2">Ask Sakhi</h1>
        <p className="text-muted-foreground">Your Ayurvedic health assistant</p>
      </motion.div>

      {messages.length === 0 ? (
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
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow"
        />
        <Button
          onClick={handleSendMessage}
          disabled={!input.trim()}
          className="bg-sakhi-lavender text-primary-foreground hover:bg-sakhi-lavender/90"
        >
          <SendIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Chat;
