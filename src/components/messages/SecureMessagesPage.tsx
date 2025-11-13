import { useState } from "react";
import { DashboardLayout } from "../schedule/DashboardLayout";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import {
  Search,
  Send,
  FileText,
  Calendar,
  TestTube,
  Video,
  ExternalLink,
  Eye,
  Pill,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: "Patient" | "Doctor" | "System";
  messageType: "Text" | "Prescription" | "Report" | "JoinCall" | "System";
  messageContent: string;
  sentAt: string;
  isRead: boolean;
  readAt?: string;
  attachmentId?: string;
  attachmentType?: string;
}

interface Conversation {
  id: string;
  patientId: string;
  patientName: string;
  patientCode: string;
  patientAvatar?: string;
  appointmentId?: string;
  appointmentDate?: string;
  lastMessageAt: string;
  lastMessageSnippet: string;
  unreadCount: number;
}

interface SecureMessagesPageProps {
  onNavigate: (page: string, patientId?: string) => void;
}

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    patientId: "1",
    patientName: "Abhay Raj",
    patientCode: "PT-2025-1847",
    appointmentId: "apt-1",
    appointmentDate: "2025-11-12",
    lastMessageAt: "2025-11-12T14:35:00",
    lastMessageSnippet: "Thank you, doctor. I have one more question about...",
    unreadCount: 2,
  },
  {
    id: "conv-2",
    patientId: "2",
    patientName: "Riya Patel",
    patientCode: "PT-2025-1849",
    appointmentId: "apt-2",
    appointmentDate: "2025-11-10",
    lastMessageAt: "2025-11-12T10:20:00",
    lastMessageSnippet: "I've uploaded the CBC report you requested.",
    unreadCount: 1,
  },
  {
    id: "conv-3",
    patientId: "3",
    patientName: "Tejaswini Singh",
    patientCode: "PT-2025-1848",
    appointmentId: "apt-3",
    appointmentDate: "2025-11-11",
    lastMessageAt: "2025-11-11T16:45:00",
    lastMessageSnippet: "Got it, I'll follow the instructions carefully.",
    unreadCount: 0,
  },
  {
    id: "conv-4",
    patientId: "4",
    patientName: "Vikram Singh",
    patientCode: "PT-2025-1850",
    appointmentId: "apt-4",
    appointmentDate: "2025-11-09",
    lastMessageAt: "2025-11-09T11:30:00",
    lastMessageSnippet: "Thank you for the prescription, doctor!",
    unreadCount: 0,
  },
  {
    id: "conv-5",
    patientId: "5",
    patientName: "Priya Sharma",
    patientCode: "PT-2025-1851",
    appointmentDate: "2025-11-05",
    lastMessageAt: "2025-11-05T09:15:00",
    lastMessageSnippet: "I'm feeling much better now. Thanks!",
    unreadCount: 0,
  },
];

const MOCK_MESSAGES: Message[] = [
  {
    id: "msg-1",
    conversationId: "conv-1",
    senderId: "patient-1",
    senderType: "Patient",
    messageType: "Text",
    messageContent: "Good morning, doctor! I wanted to follow up on the medication you prescribed.",
    sentAt: "2025-11-12T09:15:00",
    isRead: true,
    readAt: "2025-11-12T09:20:00",
  },
  {
    id: "msg-2",
    conversationId: "conv-1",
    senderId: "doctor-1",
    senderType: "Doctor",
    messageType: "Text",
    messageContent:
      "Good morning, Abhay! Yes, of course. How are you feeling? Any side effects or concerns?",
    sentAt: "2025-11-12T09:22:00",
    isRead: true,
    readAt: "2025-11-12T09:25:00",
  },
  {
    id: "msg-3",
    conversationId: "conv-1",
    senderId: "patient-1",
    senderType: "Patient",
    messageType: "Text",
    messageContent:
      "I'm feeling much better, but I noticed some mild dizziness in the mornings. Is that normal?",
    sentAt: "2025-11-12T09:30:00",
    isRead: true,
    readAt: "2025-11-12T09:35:00",
  },
  {
    id: "msg-4",
    conversationId: "conv-1",
    senderId: "doctor-1",
    senderType: "Doctor",
    messageType: "Text",
    messageContent:
      "That can be a common side effect during the first week. Make sure you're taking it with food and staying well hydrated. If it persists beyond a week, let me know.",
    sentAt: "2025-11-12T09:40:00",
    isRead: true,
    readAt: "2025-11-12T09:42:00",
  },
  {
    id: "msg-5",
    conversationId: "conv-1",
    senderId: "doctor-1",
    senderType: "Doctor",
    messageType: "Prescription",
    messageContent: "I have sent you a new prescription.",
    sentAt: "2025-11-12T10:00:00",
    isRead: true,
    readAt: "2025-11-12T10:05:00",
    attachmentId: "rx-123",
  },
  {
    id: "msg-6",
    conversationId: "conv-1",
    senderId: "patient-1",
    senderType: "Patient",
    messageType: "Text",
    messageContent: "Thank you, doctor. I have one more question about the dosage timing.",
    sentAt: "2025-11-12T14:30:00",
    isRead: false,
  },
  {
    id: "msg-7",
    conversationId: "conv-1",
    senderId: "patient-1",
    senderType: "Patient",
    messageType: "Text",
    messageContent: "Should I take it before or after meals?",
    sentAt: "2025-11-12T14:35:00",
    isRead: false,
  },
  {
    id: "msg-8",
    conversationId: "conv-2",
    senderId: "system",
    senderType: "System",
    messageType: "System",
    messageContent: "--- Dr. Ipsum completed the consultation on Nov 10, 2025 ---",
    sentAt: "2025-11-10T11:00:00",
    isRead: true,
  },
  {
    id: "msg-9",
    conversationId: "conv-2",
    senderId: "doctor-1",
    senderType: "Doctor",
    messageType: "Text",
    messageContent:
      "Hi Riya, I need you to upload your latest CBC and lipid profile reports when you have them.",
    sentAt: "2025-11-10T11:05:00",
    isRead: true,
    readAt: "2025-11-10T14:30:00",
  },
  {
    id: "msg-10",
    conversationId: "conv-2",
    senderId: "patient-2",
    senderType: "Patient",
    messageType: "Report",
    messageContent: "I've uploaded the CBC report you requested.",
    sentAt: "2025-11-12T10:20:00",
    isRead: false,
    attachmentId: "report-456",
    attachmentType: "CBC_Report.pdf",
  },
  {
    id: "msg-11",
    conversationId: "conv-3",
    senderId: "doctor-1",
    senderType: "Doctor",
    messageType: "JoinCall",
    messageContent: "Your consultation is starting soon.",
    sentAt: "2025-11-11T15:00:00",
    isRead: true,
    readAt: "2025-11-11T15:02:00",
    attachmentId: "call-789",
  },
  {
    id: "msg-12",
    conversationId: "conv-3",
    senderId: "patient-3",
    senderType: "Patient",
    messageType: "Text",
    messageContent: "Got it, I'll follow the instructions carefully. Thank you!",
    sentAt: "2025-11-11T16:45:00",
    isRead: true,
    readAt: "2025-11-11T16:50:00",
  },
];

export function SecureMessagesPage({ onNavigate }: SecureMessagesPageProps) {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConversation = conversations.find((c) => c.id === selectedConversationId);

  const conversationMessages = messages
    .filter((m) => m.conversationId === selectedConversationId)
    .sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime());

  const handleConversationClick = (conversationId: string) => {
    setSelectedConversationId(conversationId);

    // Mark messages as read
    setMessages(
      messages.map((msg) =>
        msg.conversationId === conversationId && msg.senderType === "Patient" && !msg.isRead
          ? { ...msg, isRead: true, readAt: new Date().toISOString() }
          : msg
      )
    );

    // Update unread count
    setConversations(
      conversations.map((conv) =>
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
      )
    );
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversationId) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: selectedConversationId,
      senderId: "doctor-1",
      senderType: "Doctor",
      messageType: "Text",
      messageContent: messageInput.trim(),
      sentAt: new Date().toISOString(),
      isRead: false,
    };

    setMessages([...messages, newMessage]);

    // Update conversation's last message
    setConversations(
      conversations.map((conv) =>
        conv.id === selectedConversationId
          ? {
              ...conv,
              lastMessageAt: newMessage.sentAt,
              lastMessageSnippet: newMessage.messageContent,
            }
          : conv
      )
    );

    setMessageInput("");
    toast.success("Message sent");
  };

  const handleCreatePrescription = () => {
    if (selectedConversation) {
      onNavigate("patient-details", selectedConversation.patientId);
      toast.info("Opening patient details to create prescription");
    }
  };

  const handleRequestLabTest = () => {
    if (selectedConversation) {
      onNavigate("report-requests");
      toast.info("Opening lab test request page");
    }
  };

  const handleBookFollowup = () => {
    onNavigate("schedule");
    toast.info("Opening schedule to book follow-up");
  };

  const handleViewPatientDetails = () => {
    if (selectedConversation) {
      onNavigate("patient-details", selectedConversation.patientId);
    }
  };

  const handleViewPrescription = (attachmentId: string) => {
    toast.success(`Opening prescription ${attachmentId}`);
  };

  const handleViewReport = (attachmentId: string, attachmentType: string) => {
    toast.success(`Opening report: ${attachmentType}`);
  };

  const handleJoinCall = (attachmentId: string) => {
    onNavigate("live-consultation");
  };

  return (
    <DashboardLayout currentPage="messages" onNavigate={onNavigate}>
      <div className="h-[calc(100vh-200px)] flex gap-4">
        {/* Column 1: Conversation List */}
        <Card className="w-96 flex flex-col">
          <CardContent className="p-0 flex flex-col h-full">
            {/* Header & Search */}
            <div className="p-4 border-b space-y-3 flex-shrink-0">
              <h1 className="text-[#174880]">Messages</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by patient name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Conversation List */}
            <ScrollArea className="flex-1">
              <div className="divide-y">
                {filteredConversations.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <p>No conversations found</p>
                  </div>
                ) : (
                  filteredConversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => handleConversationClick(conv.id)}
                      className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                        selectedConversationId === conv.id ? "bg-[#174880] hover:bg-[#174880]" : ""
                      }`}
                    >
                      <div className="flex gap-3">
                        <Avatar className="h-12 w-12 flex-shrink-0">
                          <AvatarImage src={conv.patientAvatar} alt={conv.patientName} />
                          <AvatarFallback
                            className={
                              selectedConversationId === conv.id
                                ? "bg-white text-[#174880]"
                                : "bg-[#174880] text-white"
                            }
                          >
                            {getInitials(conv.patientName)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0 flex flex-col">
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <h3
                              className={`font-medium truncate ${
                                selectedConversationId === conv.id ? "text-white" : ""
                              }`}
                            >
                              {conv.patientName}
                            </h3>
                            <span
                              className={`text-xs flex-shrink-0 ${
                                selectedConversationId === conv.id
                                  ? "text-blue-100"
                                  : "text-gray-500"
                              }`}
                            >
                              {formatTimestamp(conv.lastMessageAt)}
                            </span>
                          </div>

                          <p
                            className={`text-sm truncate ${
                              selectedConversationId === conv.id
                                ? "text-blue-100"
                                : conv.unreadCount > 0
                                ? "text-gray-900 font-medium"
                                : "text-gray-500"
                            }`}
                          >
                            {conv.lastMessageSnippet}
                          </p>

                          {conv.unreadCount > 0 && selectedConversationId !== conv.id && (
                            <Badge className="mt-2 bg-red-500 text-white hover:bg-red-600 self-start">
                              {conv.unreadCount} new
                            </Badge>
                          )}
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Column 2: Active Chat Window */}
        <Card className="flex-1 flex flex-col">
          {!selectedConversation ? (
            <CardContent className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <p>Select a conversation from the list to view your messages.</p>
              </div>
            </CardContent>
          ) : (
            <CardContent className="p-0 flex flex-col h-full">
              {/* Chat Header */}
              <div className="p-4 border-b flex-shrink-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-[#174880]">{selectedConversation.patientName}</h2>
                    <p className="text-sm text-gray-600">{selectedConversation.patientCode}</p>
                    {selectedConversation.appointmentDate && (
                      <p className="text-xs text-gray-500 mt-1">
                        Regarding Appointment:{" "}
                        {new Date(selectedConversation.appointmentDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleViewPatientDetails}
                    className="text-[#174880]"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Full Patient Details
                  </Button>
                </div>
              </div>

              {/* Message Log */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {conversationMessages.map((msg) => {
                    if (msg.senderType === "System") {
                      return (
                        <div key={msg.id} className="flex justify-center">
                          <p className="text-xs text-gray-500 italic">{msg.messageContent}</p>
                        </div>
                      );
                    }

                    const isDoctor = msg.senderType === "Doctor";

                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isDoctor ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] ${
                            isDoctor ? "items-end" : "items-start"
                          } flex flex-col`}
                        >
                          <div
                            className={`rounded-lg p-3 ${
                              isDoctor
                                ? "bg-[#174880] text-white"
                                : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            {msg.messageType === "Text" && (
                              <p className="text-sm">{msg.messageContent}</p>
                            )}

                            {msg.messageType === "Prescription" && (
                              <div className="space-y-3">
                                <p className="text-sm">{msg.messageContent}</p>
                                <Button
                                  variant={isDoctor ? "secondary" : "default"}
                                  size="sm"
                                  onClick={() => handleViewPrescription(msg.attachmentId!)}
                                  className={
                                    isDoctor ? "bg-white text-[#174880] hover:bg-gray-100" : ""
                                  }
                                >
                                  <Pill className="mr-2 h-4 w-4" />
                                  View Prescription
                                </Button>
                              </div>
                            )}

                            {msg.messageType === "Report" && (
                              <div className="space-y-3">
                                <p className="text-sm">{msg.messageContent}</p>
                                <p className="text-xs opacity-80">
                                  File: {msg.attachmentType || "Report.pdf"}
                                </p>
                                <Button
                                  variant={isDoctor ? "secondary" : "default"}
                                  size="sm"
                                  onClick={() =>
                                    handleViewReport(
                                      msg.attachmentId!,
                                      msg.attachmentType || "Report"
                                    )
                                  }
                                  className={
                                    isDoctor
                                      ? "bg-white text-[#174880] hover:bg-gray-100"
                                      : "bg-[#174880]"
                                  }
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Report
                                </Button>
                              </div>
                            )}

                            {msg.messageType === "JoinCall" && (
                              <div className="space-y-3">
                                <p className="text-sm">{msg.messageContent}</p>
                                <Button
                                  variant={isDoctor ? "secondary" : "default"}
                                  size="sm"
                                  onClick={() => handleJoinCall(msg.attachmentId!)}
                                  className={
                                    isDoctor
                                      ? "bg-white text-[#174880] hover:bg-gray-100"
                                      : "bg-green-600 hover:bg-green-700"
                                  }
                                >
                                  <Video className="mr-2 h-4 w-4" />
                                  Join Call
                                </Button>
                              </div>
                            )}
                          </div>

                          <p className="text-xs text-gray-500 mt-1 px-1">
                            {formatTimestamp(msg.sentAt)}
                            {isDoctor && msg.isRead && msg.readAt && (
                              <span className="ml-2">
                                · Read at{" "}
                                {new Date(msg.readAt).toLocaleTimeString("en-US", {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                })}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>

              {/* Message Input & Action Bar */}
              <div className="border-t p-4 space-y-3 flex-shrink-0">
                {/* Action Shortcuts */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCreatePrescription}
                    className="text-[#174880]"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Create New Prescription
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRequestLabTest}
                    className="text-[#174880]"
                  >
                    <TestTube className="mr-2 h-4 w-4" />
                    Request Lab Test
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBookFollowup}
                    className="text-[#174880]"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Follow-up
                  </Button>
                </div>

                {/* Text Input */}
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    rows={2}
                    className="resize-none"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="bg-[#174880] self-end"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}