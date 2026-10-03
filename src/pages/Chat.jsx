
import { useEffect, useRef, useState } from "react";
import "./Chat.css";
import {
  Bot,
  Plus,
  Search,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Paperclip,
  Send,
  Sparkles,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  MoreHorizontal,
  BookOpen,
  Headphones,
  ShieldCheck,
  Zap,
  X,
  FileText,
  ArrowUpRight,
} from "lucide-react";

const initialMessages = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hello! I'm AssistAI, your AI-powered support assistant. I can help you troubleshoot issues, answer questions, and find information from the knowledge base.\n\nHow can I help you today?",
    time: "Just now",
  },
];

const suggestions = [
  {
    icon: BookOpen,
    title: "Knowledge Base",
    description: "Find answers from support documentation",
    prompt: "How can I find relevant information in the knowledge base?",
  },
  {
    icon: Headphones,
    title: "Technical Support",
    description: "Troubleshoot a technical issue",
    prompt: "Help me troubleshoot a technical issue.",
  },
  {
    icon: ShieldCheck,
    title: "Account & Security",
    description: "Get help with account-related questions",
    prompt: "How can I improve the security of my account?",
  },
  {
    icon: Zap,
    title: "Quick Solutions",
    description: "Get quick answers to common questions",
    prompt: "Show me some common support solutions.",
  },
];

const conversationHistory = [
  {
    id: 1,
    title: "Account login issue",
    date: "Today",
  },
  {
    id: 2,
    title: "AWS deployment help",
    date: "Yesterday",
  },
  {
    id: 3,
    title: "Password reset assistance",
    date: "Yesterday",
  },
  {
    id: 4,
    title: "Billing and subscription",
    date: "Previous 7 days",
  },
];

function Chat() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const generateReply = (question) => {
    const text = question.toLowerCase();

    if (
      text.includes("password") ||
      text.includes("login") ||
      text.includes("account")
    ) {
      return "For account and login issues, try these steps:\n\n1. Verify that your email address is correct.\n2. Use the password reset option if you cannot sign in.\n3. Clear your browser cache and cookies.\n4. Try signing in using another browser.\n\nIf the issue continues, you may need assistance from the support team.\n\nNote: This is a sample frontend response. Connect the backend to retrieve verified account-specific guidance.";
    }

    if (
      text.includes("aws") ||
      text.includes("cloud") ||
      text.includes("deploy")
    ) {
      return "Here are some initial AWS troubleshooting steps:\n\n1. Check the deployment logs for errors.\n2. Verify that the required IAM permissions are configured.\n3. Confirm that your environment variables are set correctly.\n4. Check the status of the AWS service you are using.\n5. Review your application's CloudWatch logs.\n\nThis is a demonstration response. Actual AWS diagnostics will require backend integration.";
    }

    if (
      text.includes("security") ||
      text.includes("secure")
    ) {
      return "Here are some general account security practices:\n\n1. Use a strong, unique password.\n2. Enable multi-factor authentication.\n3. Never share your login credentials.\n4. Review active sessions regularly.\n5. Be cautious of suspicious links and attachments.\n\nFor account-specific security issues, contact the authorized support team.";
    }

    if (
      text.includes("knowledge") ||
      text.includes("document") ||
      text.includes("article")
    ) {
      return "The knowledge base is designed to help you find answers from support documentation.\n\nYou can search for a topic, browse available articles, and use relevant documentation to troubleshoot an issue.\n\nOnce the backend and document retrieval system are connected, AssistAI can retrieve relevant knowledge base content and provide source references.";
    }

    return `Thanks for your question!

I understand that you're asking:

"${question}"

Here are some general steps you can take:

1. Identify the exact issue and when it started.
2. Check the relevant settings and error messages.
3. Review the available support documentation.
4. Try a basic troubleshooting step.
5. Contact the support team if the problem persists.

This is currently a frontend demonstration response. Once AWS Bedrock and the backend API are integrated, AssistAI will generate AI-powered answers based on the configured knowledge base.`;
  };

  const handleSend = (messageText = input) => {
    const trimmedMessage = messageText.trim();

    if (!trimmedMessage || isTyping) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: trimmedMessage,
      time: "Just now",
    };

    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setIsTyping(true);

    window.setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: generateReply(trimmedMessage),
        time: "Just now",
      };

      setMessages((previous) => [
        ...previous,
        assistantMessage,
      ]);

      setIsTyping(false);
    }, 1000);
  };

  const handleNewChat = () => {
    setMessages(initialMessages);
    setInput("");
    setIsTyping(false);
    inputRef.current?.focus();
  };

  const handleCopy = async (message) => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopiedId(message.id);

      window.setTimeout(() => {
        setCopiedId(null);
      }, 1500);
    } catch (error) {
      console.error("Unable to copy message:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const isWelcomeScreen = messages.length === 1;

  return (
    <div className="chat-page">
      <aside
        className={`chat-history ${
          sidebarOpen ? "chat-history-open" : "chat-history-closed"
        }`}
      >
        <div className="chat-history-header">
          <div className="chat-history-brand">
            <div className="chat-brand-icon">
              <Bot size={20} />
            </div>

            <div>
              <h3>AssistAI</h3>
              <span>Support Assistant</span>
            </div>
          </div>

          <button
            className="chat-icon-button"
            onClick={() => setSidebarOpen(false)}
            title="Close sidebar"
            type="button"
          >
            <PanelLeftClose size={18} />
          </button>
        </div>

        <button
          className="chat-new-button"
          onClick={handleNewChat}
          type="button"
        >
          <Plus size={17} />
          <span>New conversation</span>
        </button>

        <div className="chat-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search conversations"
            aria-label="Search conversations"
          />
        </div>

        <div className="chat-history-list">
          <p className="chat-section-label">RECENT</p>

          {conversationHistory.map((conversation) => (
            <button
              key={conversation.id}
              className="chat-history-item"
              type="button"
              onClick={() => handleNewChat()}
            >
              <MessageSquare size={16} />
              <span>{conversation.title}</span>
              <MoreHorizontal size={16} className="history-more" />
            </button>
          ))}
        </div>

        <div className="chat-history-footer">
          <div className="chat-user-avatar">U</div>

          <div className="chat-user-info">
            <strong>Workspace User</strong>
            <span>Free workspace</span>
          </div>

          <MoreHorizontal size={18} />
        </div>
      </aside>

      <main className="chat-main">
        <header className="chat-topbar">
          <div className="chat-topbar-left">
            {!sidebarOpen && (
              <button
                className="chat-icon-button"
                onClick={() => setSidebarOpen(true)}
                title="Open sidebar"
                type="button"
              >
                <PanelLeftOpen size={19} />
              </button>
            )}

            <div className="chat-mobile-title">
              <div className="chat-mobile-icon">
                <Bot size={18} />
              </div>

              <div>
                <h2>AI Assistant</h2>
                <span>
                  <span className="chat-status-dot" />
                  Online
                </span>
              </div>
            </div>
          </div>

          <div className="chat-topbar-right">
            <span className="chat-model-label">
              <Sparkles size={14} />
              AI Support
            </span>

            <button
              className="chat-icon-button"
              onClick={handleNewChat}
              title="New chat"
              type="button"
            >
              <Plus size={18} />
            </button>
          </div>
        </header>

        <div className="chat-content">
          {isWelcomeScreen ? (
            <div className="chat-welcome">
              <div className="chat-welcome-icon">
                <Bot size={32} />
                <span className="chat-welcome-sparkle">
                  <Sparkles size={15} />
                </span>
              </div>

              <span className="chat-eyebrow">
                YOUR AI-POWERED SUPPORT COMPANION
              </span>

              <h1>
                How can I help
                <br />
                <span>you today?</span>
              </h1>

              <p className="chat-welcome-description">
                Ask a question, troubleshoot an issue, or explore
                our knowledge base. I'm here to help you find
                the answers you need.
              </p>

              <div className="chat-suggestions">
                {suggestions.map((suggestion) => {
                  const Icon = suggestion.icon;

                  return (
                    <button
                      key={suggestion.title}
                      className="chat-suggestion-card"
                      onClick={() => handleSend(suggestion.prompt)}
                      type="button"
                    >
                      <div className="chat-suggestion-icon">
                        <Icon size={19} />
                      </div>

                      <div className="chat-suggestion-text">
                        <strong>{suggestion.title}</strong>
                        <span>{suggestion.description}</span>
                      </div>

                      <ArrowUpRight
                        size={17}
                        className="chat-suggestion-arrow"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="chat-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-message chat-message-${message.role}`}
                >
                  <div className="chat-message-avatar">
                    {message.role === "assistant" ? (
                      <Bot size={18} />
                    ) : (
                      <span>U</span>
                    )}
                  </div>

                  <div className="chat-message-body">
                    <div className="chat-message-heading">
                      <strong>
                        {message.role === "assistant"
                          ? "AssistAI"
                          : "You"}
                      </strong>

                      <span>{message.time}</span>
                    </div>

                    <div className="chat-message-content">
                      {message.content.split("\n").map((line, index) => (
                        <p key={`${message.id}-${index}`}>
                          {line || "\u00A0"}
                        </p>
                      ))}
                    </div>

                    {message.role === "assistant" && (
                      <div className="chat-message-actions">
                        <button
                          type="button"
                          onClick={() => handleCopy(message)}
                          title="Copy response"
                        >
                          {copiedId === message.id ? (
                            <span>Copied!</span>
                          ) : (
                            <Copy size={15} />
                          )}
                        </button>

                        <button
                          type="button"
                          title="Helpful"
                          onClick={() => {}}
                        >
                          <ThumbsUp size={15} />
                        </button>

                        <button
                          type="button"
                          title="Not helpful"
                          onClick={() => {}}
                        >
                          <ThumbsDown size={15} />
                        </button>

                        <button
                          type="button"
                          title="Regenerate response"
                          onClick={() => {
                            if (messages.length > 1) {
                              const lastUserMessage = [...messages]
                                .reverse()
                                .find((item) => item.role === "user");

                              if (lastUserMessage) {
                                handleSend(lastUserMessage.content);
                              }
                            }
                          }}
                        >
                          <RotateCcw size={15} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="chat-message chat-message-assistant">
                  <div className="chat-message-avatar">
                    <Bot size={18} />
                  </div>

                  <div className="chat-message-body">
                    <div className="chat-message-heading">
                      <strong>AssistAI</strong>
                      <span>Generating response</span>
                    </div>

                    <div className="chat-typing">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="chat-composer-area">
          <div className="chat-composer">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message AssistAI..."
              rows={1}
              aria-label="Message AssistAI"
            />

            <div className="chat-composer-toolbar">
              <div className="chat-composer-tools">
                <button
                  type="button"
                  title="Attach file (coming soon)"
                  onClick={() => {}}
                >
                  <Paperclip size={17} />
                </button>

                <span className="chat-composer-divider" />

                <span className="chat-composer-hint">
                  <Sparkles size={13} />
                  AI-powered assistance
                </span>
              </div>

              <button
                className="chat-send-button"
                type="button"
                disabled={!input.trim() || isTyping}
                onClick={() => handleSend()}
                title="Send message"
              >
                {isTyping ? (
                  <X size={17} />
                ) : (
                  <Send size={17} />
                )}
              </button>
            </div>
          </div>

          <p className="chat-disclaimer">
            AssistAI can make mistakes. Verify important information.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Chat;
