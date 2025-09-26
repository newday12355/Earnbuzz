import { MessageCircle, X, Send } from "lucide-react";
import { useState } from "react";

export const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi! I'm here to help you with any questions about FairMoney. How can I assist you today?" }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const quickReplies = {
    "💳 Loan Applications": "You can apply for loans up to ₦1,000,000. Requirements include valid ID, bank account, and minimum 3 months transaction history. Would you like to start an application?",
    "💰 Account Balance": "Your current balance is displayed on the dashboard. Use the eye icon to show/hide your balance for privacy. For balance inquiries or transaction issues, I can help.",
    "📱 Technical Support": "If you're experiencing app issues, try updating to the latest version or restart your device. For persistent issues, please describe the problem.",
    "📞 Contact Support": "For urgent matters, please call our 24/7 hotline. Our support team is available to assist you with any account or service issues."
  };

  const handleQuickReply = (option: string) => {
    const userMessage = { type: "user", text: option };
    const botReply = { type: "bot", text: quickReplies[option as keyof typeof quickReplies] };
    
    setMessages(prev => [...prev, userMessage, botReply]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = { type: "user", text: inputMessage };
    const botReply = { type: "bot", text: "Thank you for your message. Our support team will assist you shortly. For urgent matters, please call our hotline at 0700-FAIRMONEY." };
    
    setMessages(prev => [...prev, userMessage, botReply]);
    setInputMessage("");
  };

  return (
    <>
      {/* Chat FAB */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform animate-bounce"
        >
          <MessageCircle className="w-7 h-7 text-white" />
        </button>
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-end p-4 z-50">
          <div className="bg-card rounded-t-3xl w-full max-w-sm h-96 shadow-xl animate-in slide-in-from-bottom-4 duration-300 flex flex-col">
            {/* Header */}
            <div className="fairmoney-gradient rounded-t-3xl p-4 flex items-center justify-between text-white">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Live Chat</h3>
                  <p className="text-xs opacity-90">We're here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-3 rounded-lg text-sm ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground ml-8' 
                      : 'bg-muted/50 mr-8'
                  }`}>
                    {message.type === 'bot' && (
                      <div className="flex items-start space-x-2 mb-2">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">FM</span>
                        </div>
                      </div>
                    )}
                    {message.text}
                  </div>
                </div>
              ))}
              
              {/* Quick Reply Options */}
              {messages.length === 1 && (
                <div className="space-y-2 mt-4">
                  {Object.keys(quickReplies).map((option) => (
                    <button
                      key={option}
                      onClick={() => handleQuickReply(option)}
                      className="w-full text-left p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                    >
                      <p className="text-sm font-medium text-foreground">{option}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-primary text-primary-foreground p-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};