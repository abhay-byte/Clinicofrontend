import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Paperclip, MoreVertical, Check, CheckCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";

interface Message {
  id: string;
  text: string;
  sender: "doctor" | "patient";
  timestamp: Date;
  status?: "sent" | "delivered" | "seen";
}

const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    text: "Good morning, Doctor. Should I continue this medicine?",
    sender: "patient",
    timestamp: new Date(Date.now() - 3600000),
    status: "seen",
  },
  {
    id: "2",
    text: "Yes, continue for 3 more days and drink plenty of water.",
    sender: "doctor",
    timestamp: new Date(Date.now() - 3000000),
    status: "seen",
  },
  {
    id: "3",
    text: "Thank you, Doctor. I'm feeling much better today.",
    sender: "patient",
    timestamp: new Date(Date.now() - 1800000),
    status: "seen",
  },
  {
    id: "4",
    text: "That's great to hear! Keep taking rest and stay hydrated.",
    sender: "doctor",
    timestamp: new Date(Date.now() - 600000),
    status: "delivered",
  },
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [unreadCount] = useState(2);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "doctor",
      timestamp: new Date(),
      status: "sent",
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 h-[60px] w-[60px] rounded-full shadow-lg transition-all"
            style={{
              background: "linear-gradient(135deg, #174880 0%, #2196F3 100%)",
            }}
          >
            <div className="relative flex items-center justify-center">
              <MessageCircle className="h-7 w-7 text-white" />
              {unreadCount > 0 && (
                <Badge
                  className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full border-2 border-white bg-red-500 p-0 text-xs"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  {unreadCount}
                </Badge>
              )}
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 flex h-[480px] w-[360px] flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-4"
              style={{
                background: "linear-gradient(135deg, #174880 0%, #2196F3 100%)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10 border-2 border-white">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Riya" />
                    <AvatarFallback>RS</AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                </div>
                <div>
                  <p className="text-sm text-white" style={{ fontWeight: 600 }}>
                    Riya Sharma
                  </p>
                  <p className="text-xs text-white/80">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Patient Profile</DropdownMenuItem>
                    <DropdownMenuItem>View Prescription</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">End Chat</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chat Body */}
            <ScrollArea className="flex-1 bg-gray-50 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "doctor" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] ${message.sender === "doctor" ? "items-end" : "items-start"} flex flex-col gap-1`}
                    >
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          message.sender === "doctor"
                            ? "rounded-br-sm"
                            : "rounded-bl-sm"
                        }`}
                        style={{
                          backgroundColor: message.sender === "doctor" ? "#174880" : "#E5E7EB",
                          color: message.sender === "doctor" ? "white" : "#1F2937",
                        }}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <div
                        className={`flex items-center gap-1 px-1 ${message.sender === "doctor" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <span className="text-xs text-gray-500">
                          {formatTime(message.timestamp)}
                        </span>
                        {message.sender === "doctor" && message.status && (
                          <span className="text-xs">
                            {message.status === "seen" ? (
                              <CheckCheck className="h-3 w-3" style={{ color: "#2196F3" }} />
                            ) : message.status === "delivered" ? (
                              <CheckCheck className="h-3 w-3 text-gray-400" />
                            ) : (
                              <Check className="h-3 w-3 text-gray-400" />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Footer */}
            <div className="border-t bg-white p-3">
              <div className="flex items-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 shrink-0 text-gray-500 hover:text-gray-700"
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
                <div className="flex-1">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message…"
                    className="resize-none border-gray-300 bg-gray-50 focus-visible:ring-1"
                    style={{ borderRadius: "20px", padding: "8px 16px" }}
                  />
                </div>
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="h-9 w-9 shrink-0 rounded-full"
                  style={{
                    backgroundColor: inputValue.trim() ? "#174880" : "#D1D5DB",
                  }}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
