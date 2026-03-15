'use client';

import { useState, useRef, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Brain, Send, User, Loader2, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
      </div>
    }>
      <ChatContent />
    </Suspense>
  );
}

function ChatContent() {
  const { projects, tasks, notes, profile, user } = useStore();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'مرحباً! أنا مساعدك الذكي 🤖. كيف يمكنني مساعدتك اليوم في إدارة مشاريعك ومهامك؟'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (initialQuery && messages.length === 1) {
      // Trigger send for initial query
      handleInitialQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleInitialQuery = async (query: string) => {
    setInput(query);
    setTimeout(() => {
      handleSend(query);
    }, 100);
  };

  const handleSend = async (overrideInput?: string) => {
    const messageText = overrideInput || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          projects,
          tasks,
          notes,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'عذراً، حدث خطأ أثناء محاولة الاتصال بالذكاء الاصطناعي. يرجى المحاولة مرة أخرى.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url;

  return (
    <div className="flex flex-col h-[calc(100vh)] bg-gray-50">
      {/* Header */}
      <div className="px-8 pt-8 pb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-violet-100 text-violet-600 rounded-xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">المساعد الذكي (AI)</h1>
            <p className="text-gray-500 mt-1">تحدثت معي لتحليل مشاريعك، البحث عن مهام، أو تذكر تفاصيل معينة.</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden px-8 pb-8 flex flex-col">
        <Card className="flex-1 flex flex-col overflow-hidden border-gray-200 shadow-sm">
          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-4 max-w-[85%]",
                  msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                {/* Avatar */}
                <div className="flex-shrink-0 mt-1">
                  {msg.role === 'user' ? (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200 overflow-hidden">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="User" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center shadow-sm">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={cn(
                    "px-4 py-3 rounded-2xl",
                    msg.role === 'user'
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-white border text-gray-800 rounded-tl-none shadow-sm"
                  )}
                >
                  {msg.role === 'user' ? (
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  ) : (
                    <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-gray-800 prose-pre:text-gray-100 text-gray-800">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4 max-w-[80%] mr-auto">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center shadow-sm">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="px-5 py-4 rounded-2xl bg-white border border-gray-200 text-gray-800 rounded-tl-none flex items-center shadow-sm">
                  <Loader2 className="w-5 h-5 text-violet-500 animate-spin" />
                  <span className="ml-3 text-gray-500 text-sm">أفكر...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input Area */}
          <div className="p-4 border-t bg-gray-50/50">
            <div className="flex items-center gap-2 max-w-4xl mx-auto relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="اسألني أي شيء عن مشاريعك..."
                className="flex-1 py-6 pr-4 pl-12 rounded-xl border-gray-300 focus-visible:ring-violet-500 text-base shadow-sm"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute left-1.5 h-10 w-10 p-0 rounded-lg bg-violet-600 hover:bg-violet-700 text-white shadow-sm transition-all disabled:opacity-50 disabled:bg-gray-400"
              >
                <Send className="h-5 w-5 rtl:scale-x-[-1]" />
              </Button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
              <Sparkles className="h-3 w-3" />
              توضيح: قد يرتكب الذكاء الاصطناعي الأخطاء. تأكد من مراجعة المعلومات المهمة.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
