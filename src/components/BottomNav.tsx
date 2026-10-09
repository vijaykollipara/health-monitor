import React from 'react';

export type ScreenType = 'journal' | 'lens-ai' | 'ledger' | 'pantry';

interface BottomNavProps {
  activeScreen: ScreenType;
  onChangeScreen: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeScreen,
  onChangeScreen,
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#fff1ed]/95 backdrop-blur-2xl shadow-[0_-6px_24px_rgba(44,37,35,0.12)] border-t border-[#ede0dc]">
      <div className="max-w-md mx-auto flex justify-between items-center h-20 px-4">
        {/* Journal Tab */}
        <button
          type="button"
          onClick={() => onChangeScreen('journal')}
          aria-label="Navigate to Journal"
          aria-current={activeScreen === 'journal' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[54px] min-h-[48px] px-2.5 py-1.5 rounded-lg transition-transform cursor-pointer ${
            activeScreen === 'journal'
              ? 'text-[#c59b27] bg-[#ffffff] [box-shadow:inset_0_2px_4px_rgba(44,37,35,0.35)] translate-y-0.5'
              : 'analog-card bg-[#ffffff] text-[#4e4635] hover:text-[#211a18] active:translate-y-0.5'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">menu_book</span>
          <span className="font-label-sm text-[10px] tracking-wider uppercase mt-0.5 font-bold">
            Journal
          </span>
        </button>

        {/* Scan Center Button */}
        <button
          type="button"
          onClick={() => onChangeScreen('lens-ai')}
          aria-label="Open Optical Food Scanner"
          aria-current={activeScreen === 'lens-ai' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center -mt-5 w-14 h-14 rounded-full brass-extruded text-[#251a00] transition-transform active:scale-95 cursor-pointer shadow-lg ${
            activeScreen === 'lens-ai' ? 'ring-2 ring-[#775a00] scale-105' : ''
          }`}
        >
          <span className="material-symbols-outlined text-[26px]">photo_camera</span>
          <span className="font-label-sm text-[9px] tracking-widest uppercase font-bold text-[#473500] -mt-0.5">
            Scan
          </span>
        </button>

        {/* Ledger Tab */}
        <button
          type="button"
          onClick={() => onChangeScreen('ledger')}
          aria-label="Navigate to Ledger"
          aria-current={activeScreen === 'ledger' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[54px] min-h-[48px] px-2.5 py-1.5 rounded-lg transition-transform cursor-pointer ${
            activeScreen === 'ledger'
              ? 'text-[#c59b27] bg-[#ffffff] [box-shadow:inset_0_2px_4px_rgba(44,37,35,0.35)] translate-y-0.5'
              : 'analog-card bg-[#ffffff] text-[#4e4635] hover:text-[#211a18] active:translate-y-0.5'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">query_stats</span>
          <span className="font-label-sm text-[10px] tracking-wider uppercase mt-0.5 font-bold">
            Ledger
          </span>
        </button>

        {/* Pantry Tab */}
        <button
          type="button"
          onClick={() => onChangeScreen('pantry')}
          aria-label="Navigate to Pantry"
          aria-current={activeScreen === 'pantry' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[54px] min-h-[48px] px-2.5 py-1.5 rounded-lg transition-transform cursor-pointer ${
            activeScreen === 'pantry'
              ? 'text-[#c59b27] bg-[#ffffff] [box-shadow:inset_0_2px_4px_rgba(44,37,35,0.35)] translate-y-0.5'
              : 'analog-card bg-[#ffffff] text-[#4e4635] hover:text-[#211a18] active:translate-y-0.5'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">inventory_2</span>
          <span className="font-label-sm text-[10px] tracking-wider uppercase mt-0.5 font-bold">
            Pantry
          </span>
        </button>
      </div>
    </nav>
  );
};
