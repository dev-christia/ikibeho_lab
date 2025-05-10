"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Search, Send, Plus } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderImage?: string | null;
  recipientId: string;
  subject?: string | null;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("inbox");
  const [searchQuery, setSearchQuery] = useState("");
  const [inboxMessages, setInboxMessages] = useState<Message[]>([]);
  const [sentMessages, setSentMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [composeMode, setComposeMode] = useState(false);
  const [newMessage, setNewMessage] = useState({
    recipient: "",
    subject: "",
    content: "",
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  // Mock data for demonstration
  useEffect(() => {
    if (status === "authenticated") {
      // In a real app, you would fetch this data from your API
      setTimeout(() => {
        setInboxMessages([
          {
            id: "1",
            senderId: "user1",
            senderName: "John Smith",
            senderImage: null,
            recipientId: session?.user?.id || "",
            subject: "Welcome to Web Development Course",
            content:
              "Hello! Welcome to the Web Development Bootcamp. I'm excited to have you in the class. Please let me know if you have any questions.",
            isRead: false,
            createdAt: "2025-05-09T14:30:00Z",
          },
          {
            id: "2",
            senderId: "user2",
            senderName: "Sarah Johnson",
            senderImage: null,
            recipientId: session?.user?.id || "",
            subject: "Group Project Information",
            content:
              "Hi there! I wanted to share some information about our upcoming group project. Let's schedule a time to discuss the details.",
            isRead: true,
            createdAt: "2025-05-08T10:15:00Z",
          },
          {
            id: "3",
            senderId: "user3",
            senderName: "David Lee",
            senderImage: null,
            recipientId: session?.user?.id || "",
            subject: "Question about Assignment #3",
            content:
              "I have a question about the third assignment. Could you clarify the requirements for the database section?",
            isRead: true,
            createdAt: "2025-05-07T16:45:00Z",
          },
        ]);

        setSentMessages([
          {
            id: "4",
            senderId: session?.user?.id || "",
            senderName: session?.user?.name || "You",
            recipientId: "user1",
            subject: "Re: Welcome to Web Development Course",
            content:
              "Thank you for the welcome! I'm excited to be part of the course. I do have a question about the schedule for next week.",
            isRead: true,
            createdAt: "2025-05-09T15:20:00Z",
          },
          {
            id: "5",
            senderId: session?.user?.id || "",
            senderName: session?.user?.name || "You",
            recipientId: "user3",
            subject: "Assignment Submission",
            content:
              "I've submitted my assignment for review. Please let me know if you need any clarification.",
            isRead: true,
            createdAt: "2025-05-06T09:30:00Z",
          },
        ]);

        setIsLoading(false);
      }, 1000);
    }
  }, [status, session]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredInboxMessages = inboxMessages.filter(
    (message) =>
      message.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (message.subject &&
        message.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSentMessages = sentMessages.filter(
    (message) =>
      (message.subject &&
        message.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    setComposeMode(false);

    // Mark as read if it's an inbox message
    if (activeTab === "inbox" && !message.isRead) {
      // In a real app, you would update this in the database
      setInboxMessages(
        inboxMessages.map((m) =>
          m.id === message.id ? { ...m, isRead: true } : m
        )
      );
    }
  };

  const handleComposeClick = () => {
    setSelectedMessage(null);
    setComposeMode(true);
    setNewMessage({
      recipient: "",
      subject: "",
      content: "",
    });
  };

  const handleNewMessageChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewMessage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendMessage = () => {
    // Validate form
    if (!newMessage.recipient.trim()) {
      toast.error("Please enter a recipient");
      return;
    }
    if (!newMessage.content.trim()) {
      toast.error("Please enter a message");
      return;
    }

    // In a real app, you would send this to your API
    toast.success("Message sent successfully");

    // Reset form
    setNewMessage({
      recipient: "",
      subject: "",
      content: "",
    });
    setComposeMode(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Messages</h1>
          <p className="text-gray-500">Manage your conversations</p>
        </div>
        <Button
          className="mt-4 md:mt-0 bg-pink-600 hover:bg-pink-700"
          onClick={handleComposeClick}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Message
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="relative mb-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search messages..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="w-full">
                  <TabsTrigger value="inbox" className="flex-1">
                    Inbox
                    {inboxMessages.filter((m) => !m.isRead).length > 0 && (
                      <span className="ml-2 bg-pink-600 text-white text-xs rounded-full px-2 py-0.5">
                        {inboxMessages.filter((m) => !m.isRead).length}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="sent" className="flex-1">
                    Sent
                  </TabsTrigger>
                </TabsList>
                <div className="mt-2">
                  <TabsContent
                    value="inbox"
                    className="m-0 h-[calc(100vh-300px)] overflow-y-auto"
                  >
                    {filteredInboxMessages.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No messages found
                      </div>
                    ) : (
                      <ul className="space-y-2">
                        {filteredInboxMessages.map((message) => (
                          <li
                            key={message.id}
                            className={`p-3 rounded-md cursor-pointer ${
                              selectedMessage?.id === message.id
                                ? "bg-pink-50"
                                : message.isRead
                                ? "hover:bg-gray-50"
                                : "bg-pink-50/30 hover:bg-pink-50/50 font-medium"
                            }`}
                            onClick={() => handleMessageClick(message)}
                          >
                            <div className="flex items-start gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={message.senderImage || ""}
                                  alt={message.senderName}
                                />
                                <AvatarFallback className="bg-pink-100 text-pink-800">
                                  {message.senderName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                  <p className="text-sm font-medium truncate">
                                    {message.senderName}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {formatDate(message.createdAt)}
                                  </p>
                                </div>
                                <p className="text-sm font-medium truncate">
                                  {message.subject}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  {message.content}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </TabsContent>
                  <TabsContent
                    value="sent"
                    className="m-0 h-[calc(100vh-300px)] overflow-y-auto"
                  >
                    {filteredSentMessages.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No messages found
                      </div>
                    ) : (
                      <ul className="space-y-2">
                        {filteredSentMessages.map((message) => (
                          <li
                            key={message.id}
                            className={`p-3 rounded-md cursor-pointer ${
                              selectedMessage?.id === message.id
                                ? "bg-pink-50"
                                : "hover:bg-gray-50"
                            }`}
                            onClick={() => handleMessageClick(message)}
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                  <p className="text-sm font-medium truncate">
                                    To: Recipient
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {formatDate(message.createdAt)}
                                  </p>
                                </div>
                                <p className="text-sm font-medium truncate">
                                  {message.subject}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  {message.content}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </TabsContent>
                </div>
              </Tabs>
            </CardHeader>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full">
            <CardContent className="p-6 h-[calc(100vh-220px)] flex flex-col">
              {!selectedMessage && !composeMode ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <div className="mb-4 p-4 rounded-full bg-gray-100">
                    <Send className="h-8 w-8" />
                  </div>
                  <p className="text-lg font-medium mb-2">
                    No message selected
                  </p>
                  <p className="text-sm text-center max-w-md">
                    Select a message from the list to view its contents or click
                    "New Message" to start a conversation.
                  </p>
                </div>
              ) : composeMode ? (
                <div className="flex flex-col h-full">
                  <h2 className="text-xl font-bold mb-4">New Message</h2>
                  <div className="space-y-4 flex-1">
                    <div>
                      <label
                        htmlFor="recipient"
                        className="text-sm font-medium block mb-1"
                      >
                        To:
                      </label>
                      <Input
                        id="recipient"
                        name="recipient"
                        value={newMessage.recipient}
                        onChange={handleNewMessageChange}
                        placeholder="Enter recipient's name or email"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="text-sm font-medium block mb-1"
                      >
                        Subject:
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={newMessage.subject}
                        onChange={handleNewMessageChange}
                        placeholder="Enter subject"
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="content"
                        className="text-sm font-medium block mb-1"
                      >
                        Message:
                      </label>
                      <Textarea
                        id="content"
                        name="content"
                        value={newMessage.content}
                        onChange={handleNewMessageChange}
                        placeholder="Type your message here..."
                        className="h-[calc(100%-30px)] min-h-[200px]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setComposeMode(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-pink-600 hover:bg-pink-700"
                      onClick={handleSendMessage}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="mb-4 pb-4 border-b">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={selectedMessage.senderImage || ""}
                            alt={selectedMessage.senderName}
                          />
                          <AvatarFallback className="bg-pink-100 text-pink-800">
                            {selectedMessage.senderName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {selectedMessage.senderName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(selectedMessage.createdAt)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleComposeClick}
                      >
                        Reply
                      </Button>
                    </div>
                    <h2 className="text-xl font-bold">
                      {selectedMessage.subject || "(No subject)"}
                    </h2>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <p className="whitespace-pre-line">
                      {selectedMessage.content}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
