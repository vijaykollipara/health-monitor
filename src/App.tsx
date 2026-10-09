import { useState } from 'react';
import { MealItem } from './types';
import { INITIAL_MEALS, APOTHECARY_ASSETS } from './data/initialData';
import { Header } from './components/Header';
import { BottomNav, ScreenType } from './components/BottomNav';
import { JournalScreen } from './components/screens/JournalScreen';
import { LensAiScreen } from './components/screens/LensAiScreen';
import { PantryScreen } from './components/screens/PantryScreen';
import { LedgerScreen } from './components/screens/LedgerScreen';
import { QuickAddModal } from './components/QuickAddModal';
import { ParchmentAuditModal } from './components/ParchmentAuditModal';
import { ApothecaryChatbot } from './components/ApothecaryChatbot';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('journal');
  const [meals, setMeals] = useState<MealItem[]>(INITIAL_MEALS);
  const [waterAmount, setWaterAmount] = useState<number>(1750);
  const [selectedMeal, setSelectedMeal] = useState<MealItem | undefined>(undefined);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState<boolean>(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [initialChatPrompt, setInitialChatPrompt] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const currentProtein = meals.reduce((sum, m) => sum + m.protein, 0);
  const currentCarbs = meals.reduce((sum, m) => sum + m.carbs, 0);
  const currentFats = meals.reduce((sum, m) => sum + m.fats, 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  };

  const handleOpenChat = (prompt?: string) => {
    setInitialChatPrompt(prompt || '');
    setIsChatOpen(true);
  };

  const handleAddWater = (amount: number) => {
    setWaterAmount((prev) => {
      const next = Math.min(2500, prev + amount);
      showToast(`+${amount} ml recorded in Hydration Reservoir`);
      return next;
    });
  };

  const handleSelectMeal = (meal: MealItem) => {
    setSelectedMeal(meal);
    setActiveScreen('pantry');
  };

  const handleConfirmLogFromLens = (newMeal: MealItem) => {
    setMeals((prev) => [newMeal, ...prev]);
    showToast(`“${newMeal.name}” recorded in Apothecary Ledger!`);
  };

  const handleAddCustomMeal = (newMeal: MealItem) => {
    setMeals((prev) => [newMeal, ...prev]);
    showToast(`“${newMeal.name}” recorded in Journal!`);
  };

  const handleToggleStar = (mealId: string) => {
    setMeals((prev) =>
      prev.map((m) => (m.id === mealId ? { ...m, starred: !m.starred } : m))
    );
  };

  const getScreenTitle = () => {
    switch (activeScreen) {
      case 'journal':
        return 'Journal';
      case 'lens-ai':
        return 'Lens Ai';
      case 'pantry':
        return 'Pantry';
      case 'ledger':
        return 'Ledger';
      default:
        return 'Journal';
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f6] font-body text-[#211a18] flex flex-col items-center selection:bg-[#ffdf98] selection:text-[#251a00] relative">
      {/* Toast Notification Notification Pill */}
      {toastMessage && (
        <div className="fixed top-22 z-50 px-4 py-2 rounded-full bg-[#211a18] text-[#ffffff] shadow-2xl font-label-sm text-[11px] tracking-wide flex items-center gap-2 border border-[#c59b27] animate-in fade-in slide-in-from-top-3">
          <span className="material-symbols-outlined text-[#34b768] text-[16px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Header */}
      <Header
        title={getScreenTitle()}
        showBack={activeScreen === 'lens-ai' || (activeScreen === 'pantry' && Boolean(selectedMeal))}
        onBack={() => {
          if (activeScreen === 'lens-ai') {
            setActiveScreen('journal');
          } else if (activeScreen === 'pantry') {
            setActiveScreen('journal');
          }
        }}
        onProfileClick={() => setShowProfileModal(true)}
        onOpenChat={() => handleOpenChat()}
      />

      {/* Main App Canvas Container */}
      <main className="w-full max-w-md pt-20 pb-28 px-4 flex-1 flex flex-col">
        {activeScreen === 'journal' && (
          <JournalScreen
            meals={meals}
            waterAmount={waterAmount}
            onAddWater={handleAddWater}
            onSelectMeal={handleSelectMeal}
            onOpenQuickAdd={() => setIsQuickAddOpen(true)}
            onOpenChat={(prompt) => handleOpenChat(prompt)}
          />
        )}

        {activeScreen === 'lens-ai' && (
          <LensAiScreen
            onConfirmLog={handleConfirmLogFromLens}
            onBack={() => setActiveScreen('journal')}
          />
        )}

        {activeScreen === 'pantry' && (
          <PantryScreen
            selectedMeal={selectedMeal}
            onBackToLedger={() => setActiveScreen('journal')}
            onToggleStar={handleToggleStar}
          />
        )}

        {activeScreen === 'ledger' && (
          <LedgerScreen
            onExportAudit={() => setIsAuditModalOpen(true)}
            onOpenChat={(prompt) => handleOpenChat(prompt)}
          />
        )}
      </main>

      {/* Floating Gemini Chatbot Trigger Pill (Bottom right above tab bar) */}
      <button
        type="button"
        onClick={() => handleOpenChat()}
        aria-label="Consult Gemini Chatbot"
        className="fixed bottom-22 right-4 z-40 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-[#211a18] via-[#362f2d] to-[#211a18] text-[#ffdf98] shadow-[0_6px_20px_rgba(44,37,35,0.35)] flex items-center gap-2 border border-[#c59b27] hover:scale-105 active:scale-95 transition-all cursor-pointer font-label-sm text-[11px] font-bold uppercase tracking-wider"
      >
        <span className="w-2 h-2 rounded-full bg-[#006d37] shadow-[0_0_6px_#34b768] animate-pulse"></span>
        <span className="material-symbols-outlined text-[17px] text-[#ffdf98]">forum</span>
        <span>Chat AI</span>
      </button>

      {/* Bottom Sticky Navigation */}
      <BottomNav
        activeScreen={activeScreen}
        onChangeScreen={(screen) => {
          setActiveScreen(screen);
        }}
      />

      {/* Gemini Chatbot Modal Thread */}
      <ApothecaryChatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        currentCalories={currentCalories}
        currentProtein={currentProtein}
        currentCarbs={currentCarbs}
        currentFats={currentFats}
        waterAmount={waterAmount}
        meals={meals}
        initialPrompt={initialChatPrompt}
      />

      {/* Quick Add Dish Modal */}
      <QuickAddModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        onAddMeal={handleAddCustomMeal}
        onOpenScan={() => setActiveScreen('lens-ai')}
      />

      {/* Archival Folio Audit PDF Modal */}
      <ParchmentAuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />

      {/* Clara Vance User Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#211a18]/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-[#fff8f6] rounded-2xl shadow-2xl p-5 border-2 border-[#c59b27] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#ede0dc]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#775a00] text-[22px]">
                  badge
                </span>
                <h3 className="font-headline text-[18px] font-bold text-[#211a18]">
                  Archival Folio Profile
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowProfileModal(false)}
                className="text-[#4e4635] hover:text-[#211a18] p-1 rounded-md cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-0.5 rounded-full brass-extruded shrink-0">
                <img
                  alt="Clara Vance"
                  className="w-16 h-16 rounded-full object-cover"
                  src={APOTHECARY_ASSETS.claraAvatar}
                />
              </div>
              <div>
                <h4 className="font-headline text-[18px] font-bold text-[#211a18]">
                  Clara Vance
                </h4>
                <p className="font-body text-[13px] text-[#4e4635]">
                  Metabolic Folio ID: #884-SAL
                </p>
                <span className="font-label-sm text-[10px] bg-[#34b768]/20 text-[#00411e] px-2 py-0.5 rounded-full font-bold inline-block mt-1">
                  Active Clinical Tracking
                </span>
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-[#ede0dc] font-label-sm text-[11px]">
              <div className="flex justify-between py-1 border-b border-[#ede0dc]/60">
                <span className="text-[#4e4635]">Caloric Daily Quota:</span>
                <span className="font-bold text-[#211a18]">2,100 kcal</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#ede0dc]/60">
                <span className="text-[#4e4635]">Hydration Target:</span>
                <span className="font-bold text-[#006497]">2,500 ml</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#ede0dc]/60">
                <span className="text-[#4e4635]">Weekly Average Deficit:</span>
                <span className="font-bold text-[#006d37]">-185 kcal</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#4e4635]">Compliance Score:</span>
                <span className="font-bold text-[#775a00]">92% Achieved</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowProfileModal(false)}
                className="px-4 py-1.5 rounded-lg font-label-md text-[12px] bg-gradient-to-r from-[#775a00] to-[#c59b27] text-white font-bold shadow active:translate-y-0.5 cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

