import React from 'react';
import { MealItem } from '../../types';

interface JournalScreenProps {
  meals: MealItem[];
  waterAmount: number;
  onAddWater: (amount: number) => void;
  onSelectMeal: (meal: MealItem) => void;
  onOpenQuickAdd: () => void;
  onOpenChat?: (prompt?: string) => void;
}

export const JournalScreen: React.FC<JournalScreenProps> = ({
  meals,
  waterAmount,
  onAddWater,
  onSelectMeal,
  onOpenQuickAdd,
  onOpenChat,
}) => {
  const targetCalories = 2100;
  const targetWater = 2500;
  const targetProtein = 120;
  const targetCarbs = 210;
  const targetFats = 65;

  const currentCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const currentProtein = meals.reduce((sum, m) => sum + m.protein, 0);
  const currentCarbs = meals.reduce((sum, m) => sum + m.carbs, 0);
  const currentFats = meals.reduce((sum, m) => sum + m.fats, 0);

  const caloriesLeft = Math.max(0, targetCalories - currentCalories);
  const quotaPercent = Math.min(100, Math.round((currentCalories / targetCalories) * 100));

  // Needle angle for 0 to 2500 kcal scale across 270 degree sweep from -135deg to +135deg
  const calNeedleAngle = Math.min(135, Math.max(-135, -135 + (currentCalories / 2500) * 270));

  // SVG dash calculation for 270-degree arc (circle circumference ~ 578px, 270 deg ~ 433px)
  // Max offset is 433 (empty), min is ~108 (full at 2500)
  const arcLength = 433;
  const arcOffset = Math.max(108, Math.round(433 - (Math.min(2500, currentCalories) / 2500) * 325));

  // Water level percentage
  const waterPercent = Math.min(100, (waterAmount / targetWater) * 100);

  return (
    <div className="flex flex-col w-full gap-4 pb-8">
      {/* Salutation & Physical Date Tag Banner */}
      <div className="relative bg-[#f9ebe7] rounded-xl p-4 shadow-[0_4px_12px_rgba(44,37,35,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] overflow-hidden border border-[#ede0dc]">
        <div className="flex justify-between items-start gap-2">
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-[#775a00] uppercase tracking-widest font-bold">
              Apothecary Ledger · Vol. IV
            </span>
            <h2 className="font-headline text-[24px] sm:text-[26px] font-bold text-[#211a18] tracking-tight mt-0.5 leading-tight">
              Good afternoon, Clara
            </h2>
            <p className="font-body text-[14px] text-[#4e4635] mt-0.5">
              Metabolic balance steady. {quotaPercent}% daily quota satisfied.
            </p>

            {onOpenChat && (
              <button
                type="button"
                onClick={() => onOpenChat()}
                className="mt-2.5 inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-[#ffffff] text-[#775a00] font-label-sm text-[10px] tracking-wider uppercase font-bold shadow-xs border border-[#d1c5af] hover:border-[#c59b27] active:scale-95 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px] text-[#006d37]">forum</span>
                <span>Consult Dr. Vance AI</span>
                <span className="material-symbols-outlined text-[12px] opacity-60">arrow_forward</span>
              </button>
            )}
          </div>
          <div className="shrink-0 flex flex-col items-center bg-[#ffffff] px-2.5 py-1.5 rounded-lg shadow-[inset_0_1px_2px_rgba(44,37,35,0.2),0_1px_0_rgba(255,255,255,0.9)] text-center border border-[#d1c5af]/50">
            <span className="font-label-sm text-[#775a00] uppercase leading-tight font-bold">
              THU
            </span>
            <span className="font-headline text-[18px] text-[#211a18] font-bold leading-tight">
              OCT 24
            </span>
          </div>
        </div>
      </div>

      {/* Primary Centerpiece: Analog Calorie Dial & Macronutrient Bank */}
      <div className="relative bg-[#ffffff] rounded-xl p-4 shadow-[0_6px_18px_rgba(44,37,35,0.09),inset_0_1px_0_rgba(255,255,255,0.95)] border border-[#ede0dc]">
        {/* Header of console card */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#ede0dc]/50">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#006d37] shadow-[0_0_6px_#34b768] animate-pulse"></span>
            <span className="font-label-sm text-[#4e4635] uppercase tracking-wider font-bold">
              Caloric Kinetic Balance
            </span>
          </div>
          <span className="font-label-sm text-[#775a00] uppercase tracking-widest bg-[#f9ebe7] px-2 py-0.5 rounded-full shadow-[inset_0_1px_2px_rgba(44,37,35,0.15)] font-bold">
            Calibrated 1:1
          </span>
        </div>

        {/* Analog Dial Cluster */}
        <div className="flex flex-col items-center relative py-1">
          {/* Dial Outer Rim Bezel (Brass extrusion & recessed inner well) */}
          <div className="relative w-64 h-64 rounded-full p-2.5 shadow-[0_8px_20px_rgba(44,37,35,0.28),inset_0_2px_3px_rgba(255,255,255,0.8)] bg-gradient-to-b from-[#ffdf98] via-[#c59b27] to-[#775a00] flex items-center justify-center">
            {/* Mechanical Sunken Cavity */}
            <div className="relative w-full h-full rounded-full bg-[#fff1ed] shadow-[inset_0_4px_10px_rgba(44,37,35,0.4),0_1px_0_rgba(255,255,255,0.8)] flex items-center justify-center overflow-hidden">
              {/* Radial Tick Marks & Numerical Index Scale (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 240 240">
                {/* Background Track */}
                <circle
                  cx="120"
                  cy="120"
                  fill="none"
                  r="92"
                  stroke="#ede0dc"
                  strokeDasharray="433"
                  strokeDashoffset="108"
                  strokeLinecap="round"
                  strokeWidth="10"
                  transform="rotate(135 120 120)"
                />
                {/* Active Golden Arc Progress */}
                <circle
                  cx="120"
                  cy="120"
                  fill="none"
                  r="92"
                  stroke="#c59b27"
                  strokeDasharray="433"
                  strokeDashoffset={arcOffset}
                  strokeLinecap="round"
                  strokeOpacity="0.95"
                  strokeWidth="10"
                  transform="rotate(135 120 120)"
                  className="transition-all duration-700 ease-out"
                />

                {/* Fine Brass Ticks */}
                {/* 0 kcal */}
                <line stroke="#807663" strokeWidth="2" x1="45" x2="55" y1="165" y2="157" />
                <text fill="#807663" fontFamily="Space Grotesk" fontSize="9" fontWeight="700" x="50" y="180">0</text>
                {/* 500 kcal tick */}
                <line stroke="#807663" strokeWidth="1.5" x1="38" x2="48" y1="105" y2="108" />
                {/* 1000 kcal */}
                <line stroke="#807663" strokeWidth="2" x1="68" x2="75" y1="52" y2="61" />
                <text fill="#807663" fontFamily="Space Grotesk" fontSize="9" fontWeight="700" x="64" y="44">1K</text>
                {/* 1500 kcal */}
                <line stroke="#807663" strokeWidth="2.5" x1="120" x2="120" y1="28" y2="40" />
                <text fill="#807663" fontFamily="Space Grotesk" fontSize="9" fontWeight="700" x="114" y="24">1.5K</text>
                {/* 2000 kcal */}
                <line stroke="#807663" strokeWidth="2" x1="172" x2="165" y1="52" y2="61" />
                <text fill="#807663" fontFamily="Space Grotesk" fontSize="9" fontWeight="700" x="172" y="44">2K</text>
                {/* 2500 kcal */}
                <line stroke="#807663" strokeWidth="2" x1="195" x2="185" y1="165" y2="157" />
                <text fill="#807663" fontFamily="Space Grotesk" fontSize="9" fontWeight="700" x="180" y="180">2.5K</text>
              </svg>

              {/* Mechanical Indicator Hand / Needle pointing to current calories */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-700 ease-out"
                style={{ transform: `rotate(${calNeedleAngle}deg)` }}
              >
                {/* Needle spine with casting shadow */}
                <div className="relative w-1.5 h-24 -mt-16 bg-gradient-to-t from-[#775a00] via-[#c59b27] to-[#eec14b] rounded-full shadow-[2px_4px_6px_rgba(44,37,35,0.45)]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[8px] border-b-[#ba1a1a]"></div>
                </div>
              </div>

              {/* Central Hub Anchor & Debossed Metric Core */}
              <div className="relative z-10 w-28 h-28 rounded-full bg-gradient-to-b from-[#f9ebe7] via-[#f3e5e2] to-[#ede0dc] shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_3px_8px_rgba(44,37,35,0.2)] p-2 flex flex-col items-center justify-center text-center border border-[#d1c5af]/40">
                {/* Center Rivet Head */}
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#ffdf98] to-[#775a00] shadow-[0_1px_3px_rgba(0,0,0,0.5),inset_0_1px_1px_#ffffff] mb-0.5"></div>
                <span className="font-headline text-[22px] font-bold text-[#211a18] leading-none mt-0.5 tracking-tight">
                  {currentCalories.toLocaleString()}
                </span>
                <span className="font-label-sm text-[10px] text-[#4e4635] font-bold leading-tight uppercase tracking-wider">
                  / {targetCalories.toLocaleString()} KCAL
                </span>
                <div className="mt-1 px-1.5 py-0.5 bg-[#ffffff] rounded shadow-[inset_0_1px_2px_rgba(44,37,35,0.2)]">
                  <span className="font-label-sm text-[10px] text-[#775a00] font-bold">
                    {caloriesLeft > 0 ? `${caloriesLeft} left` : `+${currentCalories - targetCalories} surplus`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Macronutrient Mini Dial Bank (Protein, Carbs, Fats) */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-2 bg-[#fff1ed] p-2 rounded-lg shadow-[inset_0_2px_4px_rgba(44,37,35,0.12)] border border-[#ede0dc]">
          {/* Protein Gauge */}
          <div className="flex flex-col items-center text-center bg-[#ffffff] py-2 px-1 rounded-md shadow-[0_2px_4px_rgba(44,37,35,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-14 h-14" viewBox="0 0 48 48">
                <circle cx="24" cy="24" fill="none" r="18" stroke="#ede0dc" strokeWidth="4" />
                <circle
                  cx="24"
                  cy="24"
                  fill="none"
                  r="18"
                  stroke="#c59b27"
                  strokeDasharray="113"
                  strokeDashoffset={Math.max(15, 113 - (Math.min(targetProtein, currentProtein) / targetProtein) * 87)}
                  strokeLinecap="round"
                  strokeWidth="4"
                  transform="rotate(-90 24 24)"
                />
              </svg>
              {/* Needle indicator */}
              <div
                className="absolute w-1 h-5 bg-[#c59b27] rounded shadow-[1px_1px_2px_rgba(0,0,0,0.4)] transition-transform duration-500"
                style={{
                  transform: `rotate(${-45 + (currentProtein / targetProtein) * 90}deg)`,
                  transformOrigin: 'bottom center',
                  bottom: '24px',
                }}
              />
              <div className="absolute w-2.5 h-2.5 rounded-full bg-[#775a00] shadow-inner" />
            </div>
            <span className="font-label-sm text-[10px] uppercase font-bold text-[#775a00] mt-1">
              Protein
            </span>
            <span className="font-body text-[14px] text-[#211a18] font-semibold">
              {currentProtein}g / {targetProtein}g
            </span>
          </div>

          {/* Carbs Gauge */}
          <div className="flex flex-col items-center text-center bg-[#ffffff] py-2 px-1 rounded-md shadow-[0_2px_4px_rgba(44,37,35,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-14 h-14" viewBox="0 0 48 48">
                <circle cx="24" cy="24" fill="none" r="18" stroke="#ede0dc" strokeWidth="4" />
                <circle
                  cx="24"
                  cy="24"
                  fill="none"
                  r="18"
                  stroke="#006d37"
                  strokeDasharray="113"
                  strokeDashoffset={Math.max(15, 113 - (Math.min(targetCarbs, currentCarbs) / targetCarbs) * 87)}
                  strokeLinecap="round"
                  strokeWidth="4"
                  transform="rotate(-90 24 24)"
                />
              </svg>
              {/* Needle indicator */}
              <div
                className="absolute w-1 h-5 bg-[#006d37] rounded shadow-[1px_1px_2px_rgba(0,0,0,0.4)] transition-transform duration-500"
                style={{
                  transform: `rotate(${-45 + (currentCarbs / targetCarbs) * 90}deg)`,
                  transformOrigin: 'bottom center',
                  bottom: '24px',
                }}
              />
              <div className="absolute w-2.5 h-2.5 rounded-full bg-[#006d37] shadow-inner" />
            </div>
            <span className="font-label-sm text-[10px] uppercase font-bold text-[#006d37] mt-1">
              Carbs
            </span>
            <span className="font-body text-[14px] text-[#211a18] font-semibold">
              {currentCarbs}g / {targetCarbs}g
            </span>
          </div>

          {/* Fats Gauge */}
          <div className="flex flex-col items-center text-center bg-[#ffffff] py-2 px-1 rounded-md shadow-[0_2px_4px_rgba(44,37,35,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-14 h-14" viewBox="0 0 48 48">
                <circle cx="24" cy="24" fill="none" r="18" stroke="#ede0dc" strokeWidth="4" />
                <circle
                  cx="24"
                  cy="24"
                  fill="none"
                  r="18"
                  stroke="#ba1a1a"
                  strokeDasharray="113"
                  strokeDashoffset={Math.max(15, 113 - (Math.min(targetFats, currentFats) / targetFats) * 87)}
                  strokeLinecap="round"
                  strokeWidth="4"
                  transform="rotate(-90 24 24)"
                />
              </svg>
              {/* Needle indicator */}
              <div
                className="absolute w-1 h-5 bg-[#ba1a1a] rounded shadow-[1px_1px_2px_rgba(0,0,0,0.4)] transition-transform duration-500"
                style={{
                  transform: `rotate(${-45 + (currentFats / targetFats) * 90}deg)`,
                  transformOrigin: 'bottom center',
                  bottom: '24px',
                }}
              />
              <div className="absolute w-2.5 h-2.5 rounded-full bg-[#ba1a1a] shadow-inner" />
            </div>
            <span className="font-label-sm text-[10px] uppercase font-bold text-[#ba1a1a] mt-1">
              Fats
            </span>
            <span className="font-body text-[14px] text-[#211a18] font-semibold">
              {currentFats}g / {targetFats}g
            </span>
          </div>
        </div>
      </div>

      {/* Hydration Tracker: Skeuomorphic Glass Flagon / Refractive Carafe */}
      <div className="relative bg-[#ffffff] rounded-xl p-4 shadow-[0_6px_18px_rgba(44,37,35,0.09),inset_0_1px_0_rgba(255,255,255,0.95)] border border-[#ede0dc]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006497] text-[20px]">water_drop</span>
            <span className="font-headline text-[18px] font-semibold text-[#211a18]">
              Hydration Reservoir
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-headline text-[18px] text-[#006497] font-bold">
              {waterAmount.toLocaleString()}
            </span>
            <span className="font-label-sm text-[#4e4635] uppercase text-[10px]">
              / {targetWater.toLocaleString()} ML
            </span>
          </div>
        </div>

        {/* Glass Carafe Chamber */}
        <div className="relative w-full h-36 rounded-lg bg-[#fff1ed] shadow-[inset_0_3px_8px_rgba(44,37,35,0.25)] flex items-end overflow-hidden p-2 border border-[#d1c5af]/40">
          {/* Background Etched Measurement Rules */}
          <div className="absolute inset-y-2 left-4 flex flex-col justify-between text-[#4e4635] font-label-sm text-[10px] z-20 pointer-events-none select-none opacity-85">
            <div className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-[#807663]"></span>
              <span>2500 ml</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-0.5 bg-[#807663]"></span>
              <span>2000 ml</span>
            </div>
            <div className="flex items-center gap-1 font-bold text-[#006497]">
              <span className="w-4 h-0.5 bg-[#006497]"></span>
              <span>1750 ml (Current)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-0.5 bg-[#807663]"></span>
              <span>1000 ml</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-[#807663]"></span>
              <span>500 ml</span>
            </div>
          </div>

          {/* Water Fluid Volume Layer */}
          <div
            className="relative w-full rounded-b-md transition-all duration-700 ease-out flex flex-col justify-between shadow-[inset_0_2px_8px_rgba(255,255,255,0.5),0_-2px_12px_rgba(0,100,151,0.35)]"
            style={{
              height: `${waterPercent}%`,
              background: 'linear-gradient(180deg, #77c2ff 0%, #006497 85%, #004f79 100%)',
            }}
          >
            {/* Animated Meniscus Highlight / Surface Refraction */}
            <div className="w-full h-2.5 bg-gradient-to-r from-[#cce5ff] via-white/80 to-[#77c2ff] opacity-90 shadow-[0_1px_3px_rgba(255,255,255,0.8)]"></div>
            {/* Ambient Water Bubbles */}
            <div className="relative w-full h-full overflow-hidden pointer-events-none opacity-40">
              <div className="absolute bottom-2 left-1/3 w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
              <div className="absolute bottom-6 left-2/3 w-2 h-2 rounded-full bg-white animate-ping"></div>
              <div className="absolute bottom-4 right-1/4 w-1 h-1 rounded-full bg-white"></div>
            </div>
          </div>

          {/* Specular Glass Carafe Front Sheen Overlay */}
          <div className="absolute inset-0 pointer-events-none rounded-lg bg-gradient-to-tr from-white/10 via-transparent to-white/40 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)]"></div>
        </div>

        {/* Push Control Mechanical Buttons */}
        <div className="grid grid-cols-3 gap-2 mt-3">
          <button
            type="button"
            onClick={() => onAddWater(250)}
            className="active:translate-y-0.5 py-2 px-1 rounded-md bg-gradient-to-b from-[#ffffff] to-[#f9ebe7] shadow-[0_3px_6px_rgba(44,37,35,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] flex flex-col items-center text-center transition-all cursor-pointer border border-[#ede0dc]"
          >
            <span className="material-symbols-outlined text-[#006497] text-[18px]">local_cafe</span>
            <span className="font-label-sm font-bold text-[#211a18] mt-0.5">+250 ml</span>
            <span className="font-label-sm text-[#4e4635] text-[9px] uppercase">Cup</span>
          </button>
          <button
            type="button"
            onClick={() => onAddWater(500)}
            className="active:translate-y-0.5 py-2 px-1 rounded-md bg-gradient-to-b from-[#ffffff] to-[#f9ebe7] shadow-[0_3px_6px_rgba(44,37,35,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] flex flex-col items-center text-center transition-all cursor-pointer border border-[#ede0dc]"
          >
            <span className="material-symbols-outlined text-[#006497] text-[18px]">sports_bar</span>
            <span className="font-label-sm font-bold text-[#211a18] mt-0.5">+500 ml</span>
            <span className="font-label-sm text-[#4e4635] text-[9px] uppercase">Flask</span>
          </button>
          <button
            type="button"
            onClick={() => onAddWater(750)}
            className="active:translate-y-0.5 py-2 px-1 rounded-md bg-gradient-to-b from-[#ffffff] to-[#f9ebe7] shadow-[0_3px_6px_rgba(44,37,35,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] flex flex-col items-center text-center transition-all cursor-pointer border border-[#ede0dc]"
          >
            <span className="material-symbols-outlined text-[#006497] text-[18px]">water_bottle</span>
            <span className="font-label-sm font-bold text-[#211a18] mt-0.5">+750 ml</span>
            <span className="font-label-sm text-[#4e4635] text-[9px] uppercase">Carafe</span>
          </button>
        </div>
      </div>

      {/* Today's Logged Meals: Archival Clipped Index Cards */}
      <div className="flex flex-col gap-2 mt-1">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#775a00] text-[20px]">book</span>
            <h3 className="font-headline text-[18px] font-semibold text-[#211a18]">
              Logged Provisions
            </h3>
          </div>
          <span className="font-label-sm uppercase tracking-wider text-[#4e4635] font-bold">
            {meals.length} Recorded
          </span>
        </div>

        {meals.map((meal) => (
          <div
            key={meal.id}
            onClick={() => onSelectMeal(meal)}
            className="relative bg-[#ffffff] rounded-xl p-2.5 sm:p-3 shadow-[0_4px_12px_rgba(44,37,35,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] flex gap-3 items-center border border-[#ede0dc] cursor-pointer hover:border-[#c59b27] transition-all group"
          >
            {/* Skeuomorphic Brass Paper Clip Motif */}
            <div className="absolute -top-2 left-6 w-3.5 h-6 rounded-full bg-gradient-to-b from-[#ffdf98] to-[#c59b27] shadow-[1px_2px_3px_rgba(0,0,0,0.3)] z-20 pointer-events-none" />

            {/* Meal Thumbnail */}
            <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.2),0_2px_5px_rgba(44,37,35,0.15)] bg-[#f9ebe7]">
              <img
                alt={meal.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src={meal.image}
              />
            </div>

            {/* Meal Details */}
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex justify-between items-start gap-1">
                <span className="font-label-sm text-[#775a00] font-bold uppercase tracking-wider">
                  {meal.category} · {meal.time}
                </span>
                <span className="font-label-md font-bold text-[#211a18] bg-[#f9ebe7] px-2 py-0.5 rounded shadow-[inset_0_1px_1px_rgba(44,37,35,0.1)]">
                  {meal.calories} kcal
                </span>
              </div>
              <h4 className="font-headline text-[17px] font-semibold text-[#211a18] truncate mt-0.5">
                {meal.name}
              </h4>
              <p className="font-body text-[13px] text-[#4e4635] line-clamp-1 mt-0.5">
                {meal.description}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-label-sm text-[10px] text-[#4e4635]">
                  P: <strong className="text-[#211a18]">{meal.protein}g</strong>
                </span>
                <span className="font-label-sm text-[10px] text-[#4e4635]">
                  C: <strong className="text-[#211a18]">{meal.carbs}g</strong>
                </span>
                <span className="font-label-sm text-[10px] text-[#4e4635]">
                  F: <strong className="text-[#211a18]">{meal.fats}g</strong>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tactile Stamped Floating Action Pushbutton: Quick Log */}
      <div className="pt-1 pb-2 flex justify-center">
        <button
          type="button"
          onClick={onOpenQuickAdd}
          className="group active:translate-y-1 transition-all flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-b from-[#ffdf98] via-[#c59b27] to-[#775a00] text-[#251a00] shadow-[0_6px_16px_rgba(44,37,35,0.28),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.35)] cursor-pointer hover:brightness-105"
        >
          <span className="material-symbols-outlined text-[#251a00] text-[22px] drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
            add_circle
          </span>
          <span className="font-label text-[14px] tracking-wider uppercase font-bold text-[#473500] drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
            Quick Add Dish
          </span>
          <span className="material-symbols-outlined text-[#251a00] text-[18px] opacity-75">
            tune
          </span>
        </button>
      </div>
    </div>
  );
};
