import React from 'react';
import { APOTHECARY_ASSETS } from '../data/initialData';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
  onProfileClick?: () => void;
  onOpenChat?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  showBack = false,
  onProfileClick,
  onOpenChat,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 pt-safe bg-[#fff1ed]/90 backdrop-blur-xl shadow-[0_4px_16px_rgba(44,37,35,0.06)] border-b border-[#ede0dc]/60">
      <div className="max-w-md mx-auto h-20 px-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {showBack && onBack ? (
            <button
              aria-label="Navigate back"
              onClick={onBack}
              className="w-11 h-11 rounded-lg analog-card bg-[#ffffff] flex items-center justify-center text-[#211a18] active:translate-y-0.5 transition-transform shrink-0 cursor-pointer hover:bg-[#fff8f6]"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
          ) : null}

          <div className="p-1 rounded-lg bg-[#f9ebe7] analog-card flex items-center justify-center shrink-0">
            <img
              alt="Apothecary Health Gauge Logo"
              className="h-8 w-auto object-contain"
              src={APOTHECARY_ASSETS.logo}
            />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-[#775a00] uppercase tracking-widest truncate">
              Apothecary Gauge
            </span>
            <h1 className="font-headline text-[18px] leading-6 font-semibold text-[#211a18] truncate">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Gemini Chatbot Actuator Button */}
          {onOpenChat && (
            <button
              type="button"
              onClick={onOpenChat}
              aria-label="Consult Gemini Apothecary Chatbot"
              title="Consult Gemini AI"
              className="w-9 h-9 rounded-lg bg-[#ffffff] analog-card flex items-center justify-center text-[#775a00] active:translate-y-0.5 transition-all cursor-pointer hover:border-[#c59b27] border border-[#ede0dc] relative group"
            >
              <span className="material-symbols-outlined text-[19px]">forum</span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#006d37] shadow-[0_0_5px_#34b768]"></span>
            </button>
          )}

          <div className="analog-card rounded-md bg-[#ffffff] px-2 py-1 flex flex-col items-center justify-center min-w-[38px] text-center shadow-sm">
            <span className="font-label-sm text-[#775a00] uppercase leading-none font-bold">
              OCT
            </span>
            <span className="font-headline text-[18px] text-[#211a18] font-bold leading-none mt-0.5">
              24
            </span>
          </div>

          <button
            type="button"
            onClick={onProfileClick}
            aria-label="User Profile"
            className="p-0.5 rounded-full brass-extruded shrink-0 cursor-pointer active:scale-95 transition-transform"
          >
            <img
              alt="Clara Vance Profile"
              className="w-8 h-8 rounded-full object-cover"
              src={APOTHECARY_ASSETS.claraAvatar}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
