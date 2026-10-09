import React, { useState, useRef, useEffect } from 'react';
import { MealItem } from '../types';

export interface ChatMessageItem {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  modelUsed?: string;
}

interface ApothecaryChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  currentCalories: number;
  currentProtein: number;
  currentCarbs: number;
  currentFats: number;
  waterAmount: number;
  meals: MealItem[];
  initialPrompt?: string;
}

export const ApothecaryChatbot: React.FC<ApothecaryChatbotProps> = ({
  isOpen,
  onClose,
  currentCalories,
  currentProtein,
  currentCarbs,
  currentFats,
  waterAmount,
  meals,
  initialPrompt,
}) => {
  const [modelType, setModelType] = useState<'gemini-3.5-flash' | 'gemini-3.1-pro-preview' | 'gemini-3.1-flash-lite'>('gemini-3.5-flash');
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessageItem[]>([
    {
      id: 'msg-welcome',
      role: 'model',
      text: `Good afternoon, Clara. I am reviewing Vol. IV of your Apothecary Ledger. Today's caloric intake sits at ${currentCalories.toLocaleString()} kcal (68% quota), with 92g protein and 1,750 ml hydration in your reservoir.\n\nHow may I formulate or analyze your metabolic provisions today?`,
      timestamp: 'Today, 2:15 PM',
      modelUsed: 'gemini-3.5-flash',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      setInputText(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  if (!isOpen) return null;

  const currentContext = {
    calories: currentCalories,
    caloriesLeft: Math.max(0, 2100 - currentCalories),
    protein: currentProtein,
    carbs: currentCarbs,
    fats: currentFats,
    water: waterAmount,
    mealNames: meals.map((m) => m.name),
  };

  const getSystemInstruction = () => {
    if (modelType === 'gemini-3.1-pro-preview') {
      return `You are the Clinical Pharmacopeia Specialist for the Apothecary Health Gauge app.
Role: Advanced metabolic reasoning, bioenergetics, macronutrient synergy calculations, and deep lipid balance analysis.
Tone: Erudite, deeply clinical, authoritative, offering rich biological explanations for Clara Vance.`;
    }
    if (modelType === 'gemini-3.1-flash-lite') {
      return `You are the Rapid Provision Assistant for the Apothecary Health Gauge app.
Role: Fast, concise dietary estimates, instant portion calories, and quick nutritional facts.
Tone: Efficient, helpful, brief, and immediate.`;
    }
    return `You are Dr. Vance, Master Apothecary & Clinical Nutritionist for the Apothecary Health Gauge app.
Role: Holistic dietary balance, mindful energy pacing, personalized evening recipes, and daily ledger analysis for Clara Vance.
Tone: Warm, elegant, encouraging, treating food tracking as mindful sensory medicine.`;
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessageItem = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);

    try {
      // Build API request payload with conversation history
      const formattedHistory = newMessages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: formattedHistory,
          model: modelType,
          systemInstruction: getSystemInstruction(),
          currentContext,
        }),
      });

      const data = await response.json();

      if (data.success && data.reply) {
        const modelMessage: ChatMessageItem = {
          id: `model-${Date.now()}`,
          role: 'model',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: data.model || modelType,
        };
        setMessages((prev) => [...prev, modelMessage]);
      } else {
        throw new Error(data.error || 'Apothecary transmission failed.');
      }
    } catch (err: any) {
      const errorMessage: ChatMessageItem = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: `*Apothecary Dispatch Interruption:* ${err.message || 'Unable to consult the model at this moment. Please verify connection and retry.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: modelType,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const promptSuggestions = [
    'How do I balance my essential lipids today?',
    'Suggest a light 300 kcal evening formulation.',
    'Evaluate my weekly ledger deficit.',
    'Why did my energy peak on Wednesday at 115g protein?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#211a18]/70 backdrop-blur-md p-2 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-lg h-[92vh] max-h-[780px] bg-[#fff8f6] rounded-2xl shadow-2xl border-2 border-[#c59b27] flex flex-col overflow-hidden relative">
        {/* Top Bound Brass Header */}
        <div className="bg-[#f9ebe7] p-3 sm:p-4 border-b border-[#ede0dc] shadow-sm flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-1.5 rounded-lg brass-extruded flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#251a00] text-[20px]">
                psychology
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#006d37] shadow-[0_0_6px_#34b768] animate-pulse"></span>
                <span className="font-label-sm text-[10px] text-[#775a00] uppercase tracking-wider font-bold">
                  Gemini Intelligence Dispatch
                </span>
              </div>
              <h2 className="font-headline text-[17px] font-bold text-[#211a18] truncate">
                Dr. Vance · Apothecary Chatbot
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white analog-card flex items-center justify-center text-[#4e4635] hover:text-[#211a18] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Model & Role Selection Strip */}
        <div className="bg-[#f3e5e2] px-3 py-2 border-b border-[#ede0dc] flex items-center justify-between gap-1 overflow-x-auto text-[11px] font-label-sm shrink-0">
          <span className="text-[#4e4635] uppercase font-bold shrink-0 hidden sm:inline">
            Model Engine:
          </span>

          <div className="flex items-center gap-1 w-full sm:w-auto justify-between sm:justify-end">
            <button
              type="button"
              onClick={() => setModelType('gemini-3.5-flash')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer font-bold ${
                modelType === 'gemini-3.5-flash'
                  ? 'bg-[#ffffff] text-[#775a00] shadow-sm border border-[#c59b27]'
                  : 'text-[#4e4635] hover:text-[#211a18]'
              }`}
            >
              General (3.5 Flash)
            </button>
            <button
              type="button"
              onClick={() => setModelType('gemini-3.1-pro-preview')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer font-bold ${
                modelType === 'gemini-3.1-pro-preview'
                  ? 'bg-[#ffffff] text-[#775a00] shadow-sm border border-[#c59b27]'
                  : 'text-[#4e4635] hover:text-[#211a18]'
              }`}
            >
              Complex (3.1 Pro)
            </button>
            <button
              type="button"
              onClick={() => setModelType('gemini-3.1-flash-lite')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer font-bold ${
                modelType === 'gemini-3.1-flash-lite'
                  ? 'bg-[#ffffff] text-[#775a00] shadow-sm border border-[#c59b27]'
                  : 'text-[#4e4635] hover:text-[#211a18]'
              }`}
            >
              Fast (Flash Lite)
            </button>
          </div>
        </div>

        {/* Real-time Health Snapshot Bar */}
        <div className="bg-[#fff1ed] px-3 py-1.5 border-b border-[#ede0dc] flex items-center justify-between text-[11px] font-label-sm text-[#4e4635] shrink-0">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[#775a00] text-[13px]">local_fire_department</span>
            <strong>{currentCalories} / 2,100 kcal</strong>
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[#006497] text-[13px]">water_drop</span>
            <strong>{waterAmount} / 2,500 ml</strong>
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[#ba1a1a] text-[13px]">grain</span>
            <strong>Fats: {currentFats}g / 65g</strong>
          </span>
        </div>

        {/* Scrollable Message Thread */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3.5 bg-gradient-to-b from-[#fff8f6] to-[#fff1ed]">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[94%] ${
                  isUser ? 'ml-auto' : 'mr-auto'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] font-label-sm text-[#807663]">
                  <span>{isUser ? 'Clara Vance' : 'Dr. Vance (Apothecary)'}</span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                  {msg.modelUsed && (
                    <span className="px-1.5 py-0.2 rounded bg-[#ede0dc] text-[#5a4300] font-bold">
                      {msg.modelUsed}
                    </span>
                  )}
                </div>

                <div
                  className={`p-3.5 rounded-xl shadow-sm text-[14px] leading-relaxed font-body ${
                    isUser
                      ? 'bg-gradient-to-br from-[#c59b27] to-[#775a00] text-white rounded-tr-none shadow-md font-medium'
                      : 'bg-[#ffffff] text-[#211a18] rounded-tl-none border border-[#ede0dc] shadow-[0_2px_8px_rgba(44,37,35,0.06)]'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex flex-col items-start max-w-[90%] mr-auto">
              <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] font-label-sm text-[#807663]">
                <span>Consulting Pharmacopeia Ledger ({modelType})...</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#ffffff] border border-[#ede0dc] shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#c59b27] animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-[#c59b27] animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-[#c59b27] animate-bounce [animation-delay:0.4s]"></div>
                <span className="font-label-sm text-[11px] text-[#4e4635] ml-1">Formulating response...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Prompts */}
        <div className="px-3 pt-2 bg-[#fff1ed] border-t border-[#ede0dc]/80 overflow-x-auto flex gap-1.5 pb-1 shrink-0">
          {promptSuggestions.map((sug, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(sug)}
              className="px-2.5 py-1 rounded-full bg-[#ffffff] text-[#4e4635] hover:text-[#211a18] hover:border-[#c59b27] border border-[#d1c5af]/60 font-label-sm text-[10px] whitespace-nowrap cursor-pointer transition-colors shadow-xs"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Message Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-[#f9ebe7] border-t border-[#ede0dc] flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your dietary inquiry, recipe idea, or food..."
            className="flex-1 p-2.5 rounded-xl bg-white border border-[#d1c5af] text-[14px] text-[#211a18] font-body outline-none focus:ring-1 focus:ring-[#775a00] placeholder:text-[#807663]/70"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-md ${
              inputText.trim() && !isLoading
                ? 'bg-gradient-to-br from-[#ffdf98] via-[#c59b27] to-[#775a00] text-[#251a00] hover:brightness-105 active:scale-95'
                : 'bg-[#ede0dc] text-[#807663] cursor-not-allowed opacity-60'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
