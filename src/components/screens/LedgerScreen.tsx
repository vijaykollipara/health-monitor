import React, { useState } from 'react';
import { WEEKLY_LOGS, HYDRATION_WEEK } from '../../data/initialData';

interface LedgerScreenProps {
  onExportAudit: () => void;
  onOpenChat?: (initialPrompt?: string) => void;
}

export const LedgerScreen: React.FC<LedgerScreenProps> = ({ onExportAudit, onOpenChat }) => {
  const [activeTab, setActiveTab] = useState<'calories' | 'macros' | 'hydration'>('calories');
  const [inspectedDay, setInspectedDay] = useState<{ day: string; cal: number; status: string } | null>(null);
  const [isAcknowledged, setIsAcknowledged] = useState<boolean>(false);
  const [showPairingsModal, setShowPairingsModal] = useState<boolean>(false);

  const handleInspect = (day: string, cal: number, status: string) => {
    setInspectedDay({ day, cal, status });
    setTimeout(() => {
      setInspectedDay(null);
    }, 2800);
  };

  return (
    <div className="flex flex-col w-full gap-4 pb-8">
      {/* Toast Feedback for Day Inspection */}
      {inspectedDay && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-[#362f2d] text-[#fceeea] shadow-xl font-label-sm text-[11px] flex items-center gap-2 transition-all border border-[#c59b27] animate-in fade-in slide-in-from-top-2">
          <span className="material-symbols-outlined text-[16px] text-[#ffdf98]">analytics</span>
          <span>
            Folio Record: <strong>{inspectedDay.day}</strong> • {inspectedDay.cal} kcal ({inspectedDay.status})
          </span>
        </div>
      )}

      {/* Interactive View State Toggle */}
      <div className="w-full bg-[#f3e5e2] rounded-xl p-1.5 shadow-[inset_0_2px_4px_rgba(44,37,35,0.25)] flex items-center gap-1 border border-[#ede0dc]">
        <button
          type="button"
          onClick={() => setActiveTab('calories')}
          className={`flex-1 py-2 px-2.5 rounded-lg transition-all active:translate-y-0.5 flex items-center justify-center gap-1.5 font-label-sm text-[11px] cursor-pointer ${
            activeTab === 'calories'
              ? 'bg-[#ffffff] text-[#211a18] shadow-[0_2px_5px_rgba(44,37,35,0.18)] font-bold'
              : 'text-[#4e4635] hover:text-[#211a18]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#c59b27] shadow-[0_0_4px_rgba(197,155,39,0.8)]"></span>
          <span>Caloric Balance</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('macros')}
          className={`flex-1 py-2 px-2.5 rounded-lg transition-all active:translate-y-0.5 flex items-center justify-center gap-1.5 font-label-sm text-[11px] cursor-pointer ${
            activeTab === 'macros'
              ? 'bg-[#ffffff] text-[#211a18] shadow-[0_2px_5px_rgba(44,37,35,0.18)] font-bold'
              : 'text-[#4e4635] hover:text-[#211a18]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#d1c5af]"></span>
          <span>Macros Split</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hydration')}
          className={`flex-1 py-2 px-2.5 rounded-lg transition-all active:translate-y-0.5 flex items-center justify-center gap-1.5 font-label-sm text-[11px] cursor-pointer ${
            activeTab === 'hydration'
              ? 'bg-[#ffffff] text-[#211a18] shadow-[0_2px_5px_rgba(44,37,35,0.18)] font-bold'
              : 'text-[#4e4635] hover:text-[#211a18]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#006497]"></span>
          <span>Hydration</span>
        </button>
      </div>

      {/* Main Bound Ledger Card */}
      <div className="relative w-full rounded-xl bg-[#fff1ed] shadow-[0_6px_16px_rgba(44,37,35,0.14),0_1px_3px_rgba(44,37,35,0.08)] overflow-hidden border border-[#ede0dc]">
        {/* Top Brass Spine & Ledger Rivets */}
        <div className="h-4 w-full bg-gradient-to-r from-[#251a00] via-[#c59b27] to-[#251a00] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.35)] flex items-center justify-around px-4">
          <div className="w-2 h-2 rounded-full bg-[#ffffff] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]"></div>
          <div className="w-2 h-2 rounded-full bg-[#ffffff] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]"></div>
          <div className="w-2 h-2 rounded-full bg-[#ffffff] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]"></div>
          <div className="w-2 h-2 rounded-full bg-[#ffffff] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]"></div>
          <div className="w-2 h-2 rounded-full bg-[#ffffff] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]"></div>
        </div>

        {/* Ledger Content Area with Ruled Ledger Aesthetics */}
        <div className="p-4 bg-gradient-to-b from-[#ffffff] via-[#fff1ed] to-[#fff1ed] relative">
          {/* Watermark Apothecary Symbol */}
          <div className="absolute right-3 top-6 opacity-[0.06] pointer-events-none select-none">
            <span className="material-symbols-outlined text-[130px] text-[#775a00]">balance</span>
          </div>

          {/* Ledger Header & Stamped Ribbon */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#775a00] text-[18px]">menu_book</span>
                <span className="font-label-sm text-[10px] tracking-widest uppercase text-[#4e4635] font-bold">
                  Archival Folio • Vol. IV
                </span>
              </div>
              {/* Embossed Silk Ribbon Tag */}
              <div className="px-2.5 py-0.5 rounded-full bg-[#34b768] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_2px_4px_rgba(0,65,30,0.25)] flex items-center gap-1">
                <span className="material-symbols-outlined text-[#00411e] text-[14px]">verified</span>
                <span className="font-label-sm text-[10px] text-[#00411e] uppercase tracking-wide font-bold">
                  92% Compliance
                </span>
              </div>
            </div>

            <h2 className="font-headline text-[24px] sm:text-[26px] font-bold text-[#211a18]">
              Weekly Nutrition Ledger
            </h2>
            <p className="font-body text-[14px] text-[#4e4635] italic">
              Week of Oct 21 – Oct 27, 2024 • Archival Records of Clara Vance
            </p>
          </div>

          {/* Ruled Divider Line */}
          <div className="w-full h-[1px] bg-[#d1c5af]/60 my-3 shadow-[0_1px_0_rgba(255,255,255,0.9)]"></div>

          {/* SECTION: Caloric Cylinder & Wire Scale */}
          {activeTab === 'calories' && (
            <div className="flex flex-col gap-2 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#775a00] text-[16px]">tune</span>
                  <span className="font-label-md text-[12px] uppercase tracking-wider text-[#211a18] font-bold">
                    Intake Abacus vs Target
                  </span>
                </div>
                <span className="font-label-sm text-[10px] text-[#807663] font-semibold">
                  Target: 2,100 kcal
                </span>
              </div>

              {/* 3D Abacus Bar Visualizer */}
              <div className="relative w-full rounded-xl bg-[#f9ebe7] shadow-[inset_0_2px_6px_rgba(44,37,35,0.28),0_1px_0_rgba(255,255,255,0.9)] p-2 sm:p-3 overflow-hidden border border-[#ede0dc]">
                {/* Engraved Wire Target Baseline at 2,100 kcal (approx 72% height) */}
                <div className="absolute inset-x-2 top-[32%] z-20 flex items-center pointer-events-none">
                  <div className="w-full h-[2px] bg-[#c59b27] shadow-[0_1px_2px_rgba(0,0,0,0.3)] opacity-90 border-t border-dashed border-[#775a00]"></div>
                  <span className="absolute right-1 -top-3.5 px-1 py-0.5 rounded bg-[#5a4300] text-[#ffdf98] font-label-sm text-[9px] tracking-tighter shadow-sm font-bold">
                    2,100
                  </span>
                </div>

                {/* 7-Column Brass Cylinder Grid */}
                <div className="grid grid-cols-7 gap-1.5 h-44 items-end pt-5 pb-2 relative z-10">
                  {WEEKLY_LOGS.map((item) => {
                    const isProjected = item.isProjected;
                    const isCurrent = item.isCurrent;
                    const heightPercent = Math.min(100, Math.round((item.calories / 3000) * 100));

                    return (
                      <div
                        key={item.day}
                        onClick={() => handleInspect(item.day, item.calories, item.status)}
                        className="flex flex-col items-center h-full justify-end group cursor-pointer transition-transform"
                      >
                        <span
                          className={`font-label-sm text-[9px] sm:text-[10px] -mb-1 font-bold ${
                            isCurrent
                              ? 'text-[#006497]'
                              : isProjected
                              ? 'text-[#807663]'
                              : 'text-[#4e4635] group-hover:text-[#211a18]'
                          }`}
                        >
                          {isProjected ? `~${(item.calories / 1000).toFixed(1)}k` : item.calories}
                        </span>

                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full max-w-[28px] rounded-t-lg transition-transform group-hover:scale-105 ${
                            isCurrent
                              ? 'bg-gradient-to-r from-[#006497] via-[#77c2ff] to-[#006497] shadow-[inset_0_2px_3px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.4),0_2px_4px_rgba(44,37,35,0.2)] relative'
                              : isProjected
                              ? 'bg-[#ede0dc] shadow-[inset_0_1px_2px_rgba(44,37,35,0.2)] border-t-2 border-[#d1c5af] border-dashed opacity-75'
                              : 'bg-gradient-to-r from-[#5a4300] via-[#c59b27] to-[#775a00] shadow-[inset_0_2px_2px_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(0,0,0,0.5),0_3px_5px_rgba(44,37,35,0.2)]'
                          }`}
                        >
                          {isCurrent && (
                            <span className="absolute inset-x-0 top-0 h-1 rounded-t-lg bg-white/70 animate-pulse" />
                          )}
                        </div>

                        <span
                          className={`font-label-sm text-[10px] mt-1.5 uppercase font-bold ${
                            isCurrent ? 'text-[#006497]' : isProjected ? 'text-[#807663]' : 'text-[#211a18]'
                          }`}
                        >
                          {item.dayShort}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Metric Readout with Physical Wax Seal Deficit Stamp */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#f9ebe7] shadow-[0_2px_6px_rgba(44,37,35,0.08)] border border-[#ede0dc] mt-1">
                <div className="flex flex-col">
                  <span className="font-label-sm text-[10px] text-[#4e4635] uppercase tracking-wider font-bold">
                    Weekly Daily Average
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-headline text-[22px] font-bold text-[#211a18]">
                      2,015
                    </span>
                    <span className="font-body text-[14px] text-[#4e4635]">
                      kcal / day
                    </span>
                  </div>
                </div>

                {/* Stamped Green Wax Seal */}
                <div className="relative flex items-center justify-center p-2 rounded-full bg-gradient-to-br from-[#34b768] via-[#006d37] to-[#00411e] shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.5),0_4px_8px_rgba(0,109,55,0.35)] text-white">
                  <div className="w-14 h-14 rounded-full border border-dashed border-white/40 flex flex-col items-center justify-center text-center p-1">
                    <span className="font-label-sm text-[9px] uppercase leading-none font-bold">
                      Deficit
                    </span>
                    <span className="font-label-md text-[13px] font-bold leading-tight mt-0.5">
                      -185
                    </span>
                    <span className="font-label-sm text-[9px] leading-none opacity-85">
                      kcal
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: Macro Split View */}
          {activeTab === 'macros' && (
            <div className="flex flex-col gap-2 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-[12px] uppercase tracking-wider text-[#211a18] font-bold">
                  Weekly Balance Weights
                </span>
                <span className="font-label-sm text-[10px] text-[#775a00] font-bold">
                  Balanced Ratio
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-lg bg-[#f9ebe7] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_4px_rgba(44,37,35,0.08)] flex flex-col items-center text-center border border-[#ede0dc]">
                  <span className="font-label-sm text-[10px] text-[#4e4635] uppercase font-bold">Protein</span>
                  <span className="font-headline text-[18px] font-bold text-[#211a18] mt-1">112g</span>
                  <span className="font-label-sm text-[10px] text-[#006d37] font-semibold">26% • Optimal</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#f9ebe7] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_4px_rgba(44,37,35,0.08)] flex flex-col items-center text-center border border-[#ede0dc]">
                  <span className="font-label-sm text-[10px] text-[#4e4635] uppercase font-bold">Carbohydrates</span>
                  <span className="font-headline text-[18px] font-bold text-[#211a18] mt-1">214g</span>
                  <span className="font-label-sm text-[10px] text-[#775a00] font-semibold">50% • Stable</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#f9ebe7] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_4px_rgba(44,37,35,0.08)] flex flex-col items-center text-center border border-[#ede0dc]">
                  <span className="font-label-sm text-[10px] text-[#4e4635] uppercase font-bold">Healthy Lipids</span>
                  <span className="font-headline text-[18px] font-bold text-[#211a18] mt-1">54g</span>
                  <span className="font-label-sm text-[10px] text-[#ba1a1a] font-semibold">24% • Need +15g</span>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: Hydration Habit Tracker (7 Coin Slots with Blue Wax Drops) */}
          <div className="flex flex-col gap-1 mt-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#006497] text-[16px]">water_drop</span>
                <span className="font-label-md text-[12px] uppercase tracking-wider text-[#211a18] font-bold">
                  Hydration Apothecary Habit
                </span>
              </div>
              <span className="font-label-sm text-[10px] text-[#006497] font-bold">
                2,500 ml Goal
              </span>
            </div>
            <p className="font-body text-[14px] text-[#4e4635]">
              Weekly average: <strong className="text-[#211a18]">2,420 ml / day</strong> •{' '}
              <span className="text-[#006d37] font-bold">4-day streak intact</span>
            </p>

            {/* Coin Slot Grid */}
            <div className="grid grid-cols-7 gap-1.5 p-2 rounded-xl bg-[#f3e5e2] shadow-[inset_0_2px_5px_rgba(44,37,35,0.25)] border border-[#ede0dc] mt-1">
              {HYDRATION_WEEK.map((h) => (
                <div
                  key={h.day}
                  onClick={() =>
                    handleInspect(
                      h.day,
                      Math.round(h.amountLiters * 1000),
                      h.achieved ? 'Hydration Quota Met' : 'In Progress'
                    )
                  }
                  className="flex flex-col items-center gap-1 cursor-pointer"
                >
                  <span
                    className={`font-label-sm text-[10px] uppercase font-bold ${
                      h.isCurrent ? 'text-[#006497]' : 'text-[#4e4635]'
                    }`}
                  >
                    {h.day}
                  </span>

                  {h.achieved ? (
                    <div
                      className="w-9 h-9 rounded-full bg-gradient-to-b from-[#006497] to-[#004f79] shadow-[inset_0_2px_3px_rgba(255,255,255,0.8),0_3px_6px_rgba(0,100,151,0.4)] flex items-center justify-center text-white active:scale-95 transition-transform"
                      title={`${h.amountLiters}L`}
                    >
                      <span className="material-symbols-outlined text-[18px]">water_drop</span>
                    </div>
                  ) : h.isCurrent ? (
                    <div className="w-9 h-9 rounded-full bg-[#ffffff] shadow-[inset_0_2px_4px_rgba(44,37,35,0.35)] relative overflow-hidden flex items-center justify-center border-2 border-[#006497]/40">
                      <div className="absolute inset-x-0 bottom-0 h-[70%] bg-[#77c2ff] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]"></div>
                      <span className="material-symbols-outlined text-[16px] text-[#006497] relative z-10">
                        hourglass_top
                      </span>
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#f9ebe7] shadow-[inset_0_2px_4px_rgba(44,37,35,0.3)] flex items-center justify-center text-[#807663] opacity-60">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ede0dc]"></span>
                    </div>
                  )}

                  <span
                    className={`font-label-sm text-[10px] font-bold ${
                      h.achieved
                        ? 'text-[#006d37]'
                        : h.isCurrent
                        ? 'text-[#006497]'
                        : 'text-[#807663]'
                    }`}
                  >
                    {h.amountLiters > 0 ? `${h.amountLiters}L` : '-'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: AI Nutritionist Pinned Parchment Note */}
      <div className="relative w-full rounded-xl bg-[#fff1ed] shadow-[0_8px_20px_rgba(44,37,35,0.14)] p-4 pt-5 overflow-visible border border-[#ede0dc]">
        {/* Physical Brass Pushpin at Top Center */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#ffdf98] via-[#c59b27] to-[#251a00] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_6px_rgba(0,0,0,0.4)] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ffffff] opacity-80"></div>
          </div>
          <div className="w-1 h-2 bg-[#5a4300] -mt-0.5 shadow-sm"></div>
        </div>

        {/* Parchment Header with Quill Icon */}
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#775a00] text-[20px]">edit_note</span>
            <span className="font-label-md text-[12px] text-[#775a00] uppercase tracking-wider font-bold">
              Apothecary Intelligence Dispatch
            </span>
          </div>
          <span className="font-label-sm text-[10px] text-[#807663] font-mono">OCT.24 // 08:30</span>
        </div>

        {/* Handcrafted Advisory Note */}
        <div className="p-3 rounded-lg bg-[#ffffff]/85 shadow-[inset_0_1px_3px_rgba(44,37,35,0.15)] flex flex-col gap-2 mt-1 border border-[#ede0dc]">
          <p className="font-body text-[16px] text-[#211a18] leading-relaxed italic">
            “Clara, your protein intake peaked on Wednesday at{' '}
            <span className="font-bold text-[#775a00] not-italic">115g</span>. Notice how your afternoon cognitive energy sustained longer without the typical 3 PM slump.”
          </p>
          <div className="flex items-start gap-2 pt-1 border-t border-[#d1c5af]/40">
            <span className="material-symbols-outlined text-[#006d37] text-[18px] shrink-0 mt-0.5">
              tips_and_updates
            </span>
            <p className="font-body text-[14px] text-[#4e4635] leading-snug">
              <strong className="text-[#211a18]">Prescription Tip:</strong> Adding{' '}
              <span className="text-[#775a00] font-bold">15g</span> pumpkin seeds or soaked walnuts on Friday will balance your essential dietary lipids effortlessly.
            </p>
          </div>
        </div>

        {/* Action Row for Dispatch Note */}
        <div className="flex flex-wrap items-center justify-between pt-2 mt-1 gap-2">
          <button
            type="button"
            onClick={() => setIsAcknowledged(true)}
            className={`px-3 py-1.5 rounded-md text-[#211a18] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_4px_rgba(44,37,35,0.1)] active:translate-y-0.5 flex items-center gap-1 font-label-sm text-[11px] transition-all cursor-pointer border border-[#ede0dc] ${
              isAcknowledged ? 'bg-[#34b768]/20 text-[#00411e] font-bold' : 'bg-[#f9ebe7] hover:bg-[#ede0dc]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px] text-[#006d37]">
              {isAcknowledged ? 'done_all' : 'check_circle'}
            </span>
            <span>{isAcknowledged ? 'Noted in Folio' : 'Acknowledge Note'}</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setShowPairingsModal(true)}
              className="px-2.5 py-1.5 rounded-md bg-[#f9ebe7] text-[#775a00] border border-[#d1c5af] hover:bg-[#ffffff] shadow-sm active:translate-y-0.5 flex items-center gap-1 font-label-sm text-[11px] font-bold transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">restaurant_menu</span>
              <span>Pairings</span>
            </button>

            {onOpenChat && (
              <button
                type="button"
                onClick={() => onOpenChat("Why did my protein intake peak on Wednesday at 115g, and how can I balance lipids on Friday?")}
                className="px-3 py-1.5 rounded-md bg-gradient-to-r from-[#c59b27] to-[#775a00] text-white shadow-[0_2px_5px_rgba(119,90,0,0.3)] active:translate-y-0.5 flex items-center gap-1 font-label-sm text-[11px] font-bold transition-all cursor-pointer hover:brightness-105"
              >
                <span className="material-symbols-outlined text-[14px]">psychology</span>
                <span>Ask Dr. Vance AI</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Weekly Pantry & Micro-Log Snapshot / Export Folio Trigger */}
      <div className="p-3 rounded-xl bg-[#f9ebe7] shadow-[0_2px_6px_rgba(44,37,35,0.1)] flex items-center justify-between border border-[#ede0dc]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-[#ffffff] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_4px_rgba(44,37,35,0.12)] flex items-center justify-center shrink-0 border border-[#ede0dc]">
            <span className="material-symbols-outlined text-[#775a00] text-[22px]">receipt_long</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline text-[17px] font-bold text-[#211a18] truncate">
              Full Ledger Audit
            </span>
            <span className="font-body text-[13px] text-[#4e4635] truncate">
              Export stamped parchment PDF for clinical practitioner
            </span>
          </div>
        </div>

        <button
          type="button"
          aria-label="Export Folio"
          onClick={onExportAudit}
          className="p-2 rounded-lg bg-[#ffffff] text-[#775a00] shadow-[0_2px_5px_rgba(44,37,35,0.15)] active:translate-y-0.5 shrink-0 cursor-pointer hover:bg-[#fff8f6] border border-[#ede0dc]"
        >
          <span className="material-symbols-outlined text-[20px]">file_download</span>
        </button>
      </div>

      {/* Lipid Pairings Modal */}
      {showPairingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#211a18]/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-[#fff8f6] rounded-2xl shadow-2xl p-5 border-2 border-[#c59b27] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#ede0dc]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#775a00] text-[22px]">
                  spa
                </span>
                <h3 className="font-headline text-[18px] font-bold text-[#211a18]">
                  Curated Healthy Lipids
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPairingsModal(false)}
                className="text-[#4e4635] hover:text-[#211a18] p-1 rounded-md"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="font-body text-[14px] text-[#4e4635]">
              Formulations to satisfy Clara’s +15g essential lipid quota:
            </p>

            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-[#ffffff] border border-[#ede0dc] flex items-center justify-between">
                <div>
                  <h4 className="font-headline text-[15px] font-bold text-[#211a18]">Soaked Walnut Halves</h4>
                  <p className="font-body text-[12px] text-[#4e4635]">15g • 98 kcal • Omega-3 DHA/EPA booster</p>
                </div>
                <span className="font-label-sm text-[#006d37] font-bold">+10g Lipids</span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#ffffff] border border-[#ede0dc] flex items-center justify-between">
                <div>
                  <h4 className="font-headline text-[15px] font-bold text-[#211a18]">Raw Roasted Pumpkin Seeds</h4>
                  <p className="font-body text-[12px] text-[#4e4635]">15g • 85 kcal • Zinc & Magnesium mineral rich</p>
                </div>
                <span className="font-label-sm text-[#006d37] font-bold">+7g Lipids</span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#ffffff] border border-[#ede0dc] flex items-center justify-between">
                <div>
                  <h4 className="font-headline text-[15px] font-bold text-[#211a18]">Cold-Pressed Avocado Drizzle</h4>
                  <p className="font-body text-[12px] text-[#4e4635]">1 tsp • 40 kcal • Monounsaturated oleic acid</p>
                </div>
                <span className="font-label-sm text-[#006d37] font-bold">+5g Lipids</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowPairingsModal(false)}
                className="px-4 py-1.5 rounded-lg font-label-md text-[12px] bg-gradient-to-r from-[#775a00] to-[#c59b27] text-white font-bold shadow active:translate-y-0.5 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
