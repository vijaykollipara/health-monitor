import React, { useState } from 'react';
import { MealItem } from '../../types';
import { APOTHECARY_ASSETS } from '../../data/initialData';

interface LensAiScreenProps {
  onConfirmLog: (meal: MealItem) => void;
  onBack: () => void;
}

export const LensAiScreen: React.FC<LensAiScreenProps> = ({
  onConfirmLog,
  onBack: _onBack,
}) => {
  const [mode, setMode] = useState<'photo' | 'barcode' | 'scale'>('photo');
  const [flashActive, setFlashActive] = useState<boolean>(true);
  const [portionMultiplier, setPortionMultiplier] = useState<number>(1.0);
  const [portionLabel, setPortionLabel] = useState<string>('1.0x (Regular Serving)');
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);

  // Preset specimen options for user to test optical AI
  const [currentSpecimenIndex, setCurrentSpecimenIndex] = useState<number>(0);

  const specimenSamples = [
    {
      name: 'Vibrant Açaí Berry Bowl',
      desc: 'Infused with chia seed canvas & sliced bananas',
      target: 'ACAI BOWL',
      conf: '96.4%',
      vol: '~340ml',
      image: APOTHECARY_ASSETS.acaiBowl,
      baseCalories: 385,
      baseCarbs: 62,
      baseProtein: 9,
      baseLipids: 11,
      baseFiber: 8,
      match: '96%',
      category: 'Breakfast' as const,
      components: [
        { name: 'Açaí Puree (180g)', icon: 'eco' },
        { name: 'Banana Slices (60g)', icon: 'nutrition' },
        { name: 'Chia Seeds (15g)', icon: 'grain' },
        { name: 'Wild Blueberries (30g)', icon: 'spa' },
        { name: 'Toasted Almonds (12g)', icon: 'bakery_dining' },
      ],
      detailedIngredients: [
        { name: 'Organic Brazilian Açaí Puree', detail: 'Wild harvested • 180g', calories: 140 },
        { name: 'Cavendish Banana Slices', detail: 'Freshly cut • 60g', calories: 55 },
        { name: 'Chia Seed Gelee & Berries', detail: 'Omega-3 base • 45g', calories: 90 },
        { name: 'Toasted Almond Shavings', detail: 'Dry roasted • 12g', calories: 100 },
      ]
    },
    {
      name: 'Artisan Quinoa Salmon',
      desc: 'Pan-seared salmon, kalamata olives, lemon vinaigrette',
      target: 'SALMON QUINOA',
      conf: '98.1%',
      vol: '~380ml',
      image: APOTHECARY_ASSETS.salmonQuinoa,
      baseCalories: 610,
      baseCarbs: 52,
      baseProtein: 46,
      baseLipids: 19,
      baseFiber: 7,
      match: '98%',
      category: 'Lunch' as const,
      components: [
        { name: 'Norwegian Salmon (180g)', icon: 'set_meal' },
        { name: 'Andean Quinoa (120g)', icon: 'grain' },
        { name: 'Blistered Tomatoes (80g)', icon: 'eco' },
        { name: 'Cold Olive Oil (15ml)', icon: 'opacity' },
      ],
      detailedIngredients: [
        { name: 'Norwegian Salmon Fillet', detail: 'Fresh ocean cut • 180g', calories: 370 },
        { name: 'Tricolor Quinoa & Herb Pilaf', detail: 'Steamed with parsley • 120g', calories: 160 },
        { name: 'Charred Asparagus & Cherry Tomatoes', detail: 'Cast-iron blistered • 80g', calories: 35 },
        { name: 'Olive Oil & Lemon Emulsion', detail: 'Cold-pressed dressing • 1 tbsp', calories: 45 },
      ]
    },
  ];

  const currentDish = specimenSamples[currentSpecimenIndex];

  // Dynamic calculated values
  const calVal = Math.round(currentDish.baseCalories * portionMultiplier);
  const carbVal = Math.round(currentDish.baseCarbs * portionMultiplier);
  const proteinVal = Math.round(currentDish.baseProtein * portionMultiplier);
  const lipidVal = Math.round(currentDish.baseLipids * portionMultiplier);
  const fiberVal = Math.round(currentDish.baseFiber * portionMultiplier);

  const handleSetPortion = (multiplier: number, label: string) => {
    setPortionMultiplier(multiplier);
    setPortionLabel(label);
  };

  const handleTriggerShutter = () => {
    setIsFlashing(true);
    setTimeout(() => {
      setIsFlashing(false);
    }, 180);
  };

  const handleConfirmLog = () => {
    const newMeal: MealItem = {
      id: `meal-${Date.now()}`,
      name: currentDish.name,
      category: currentDish.category,
      time: '14:20',
      calories: calVal,
      protein: proteinVal,
      carbs: carbVal,
      fats: lipidVal,
      fiber: fiberVal,
      sodium: 280,
      description: currentDish.desc,
      image: currentDish.image,
      ingredients: currentDish.detailedIngredients,
      verified: true,
    };

    setIsLogged(true);
    onConfirmLog(newMeal);

    setTimeout(() => {
      setIsLogged(false);
    }, 2500);
  };

  return (
    <div className="flex flex-col w-full pb-8 space-y-4">
      {/* Mechanical HUD Mode Selector (Rotary Rail) */}
      <div className="w-full bg-[#f9ebe7] rounded-xl p-2.5 shadow-md flex items-center justify-between gap-2 border border-[#ede0dc]">
        {/* Rotary Dial Strip */}
        <div className="flex items-center gap-1.5 p-1 bg-[#ede0dc] rounded-lg shadow-inner">
          <button
            type="button"
            onClick={() => setMode('photo')}
            className={`px-3 py-1.5 rounded-md font-label-md text-[12px] shadow-sm flex items-center gap-1 transition-all cursor-pointer ${
              mode === 'photo'
                ? 'bg-gradient-to-b from-[#ffdf98] to-[#c59b27] text-[#251a00] font-bold'
                : 'text-[#4e4635] hover:bg-[#f9ebe7]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">photo_camera</span>
            PHOTO AI
          </button>
          <button
            type="button"
            onClick={() => setMode('barcode')}
            className={`px-3 py-1.5 rounded-md font-label-md text-[12px] transition-all flex items-center gap-1 cursor-pointer ${
              mode === 'barcode'
                ? 'bg-gradient-to-b from-[#ffdf98] to-[#c59b27] text-[#251a00] font-bold shadow-sm'
                : 'text-[#4e4635] hover:bg-[#f9ebe7]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">qr_code_scanner</span>
            BARCODE
          </button>
          <button
            type="button"
            onClick={() => setMode('scale')}
            className={`px-3 py-1.5 rounded-md font-label-md text-[12px] transition-all flex items-center gap-1 cursor-pointer ${
              mode === 'scale'
                ? 'bg-gradient-to-b from-[#ffdf98] to-[#c59b27] text-[#251a00] font-bold shadow-sm'
                : 'text-[#4e4635] hover:bg-[#f9ebe7]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">scale</span>
            SCALE
          </button>
        </div>

        {/* Tactile Flash Toggle Switch with Indicator Ruby/Emerald Jewel */}
        <div className="flex items-center gap-2 pr-1">
          <div
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              flashActive
                ? 'bg-[#34b768] shadow-[0_0_8px_rgba(52,183,104,0.8)]'
                : 'bg-[#ba1a1a] shadow-[0_0_8px_rgba(186,26,26,0.8)]'
            }`}
          />
          <button
            type="button"
            aria-label="Toggle Flash Mode"
            onClick={() => setFlashActive(!flashActive)}
            className="relative h-8 w-14 rounded-full bg-[#ede0dc] p-1 shadow-inner flex items-center cursor-pointer"
          >
            <div
              className={`w-6 h-6 rounded-full bg-gradient-to-b from-[#ffffff] to-[#d1c5af] shadow-md flex items-center justify-center transform transition-transform duration-300 ${
                flashActive ? 'translate-x-6' : 'translate-x-0'
              }`}
            >
              <span className={`material-symbols-outlined text-[14px] ${flashActive ? 'text-[#775a00]' : 'text-[#807663]'}`}>
                bolt
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Skeuomorphic Viewfinder Chamber */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#362f2d] shadow-xl aspect-[4/3] select-none flex items-center justify-center border-2 border-[#807663]/40">
        {/* Camera Viewport Feed */}
        <img
          alt="Camera Viewport Food Feed"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-200 ${
            isFlashing ? 'brightness-200 contrast-125' : 'opacity-90'
          }`}
          src={currentDish.image}
        />

        {/* Specimen Switcher Ribbon on Viewfinder */}
        <div className="absolute top-2 inset-x-2 z-30 flex justify-between items-center pointer-events-auto">
          <button
            type="button"
            onClick={() =>
              setCurrentSpecimenIndex((prev) => (prev === 0 ? specimenSamples.length - 1 : prev - 1))
            }
            className="px-2 py-1 rounded bg-[#211a18]/70 backdrop-blur-md text-[#ffffff] font-label-sm text-[10px] uppercase flex items-center gap-1 active:scale-95 transition-transform cursor-pointer border border-[#807663]/40"
          >
            <span className="material-symbols-outlined text-[12px]">chevron_left</span>
            Switch Food
          </button>

          <span className="px-2 py-0.5 rounded bg-[#211a18]/70 backdrop-blur-md text-[#ffdf98] font-label-sm text-[10px] tracking-widest uppercase">
            SPECIMEN #{currentSpecimenIndex + 1}
          </span>

          <button
            type="button"
            onClick={() =>
              setCurrentSpecimenIndex((prev) => (prev + 1) % specimenSamples.length)
            }
            className="px-2 py-1 rounded bg-[#211a18]/70 backdrop-blur-md text-[#ffffff] font-label-sm text-[10px] uppercase flex items-center gap-1 active:scale-95 transition-transform cursor-pointer border border-[#807663]/40"
          >
            Next
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          </button>
        </div>

        {/* Viewfinder Optical Grid & Crosshairs */}
        <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between z-20">
          {/* Top Row Brass Brackets */}
          <div className="flex justify-between items-start mt-6">
            <div className="w-6 h-6 border-t-2 border-l-2 border-[#ffdf98] shadow-[0_1px_2px_rgba(0,0,0,0.8)]"></div>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#362f2d]/85 backdrop-blur-sm shadow-sm border border-[#807663]/40">
              <span className="material-symbols-outlined text-[#ba1a1a] text-[12px] animate-pulse">
                fiber_manual_record
              </span>
              <span className="font-label-sm text-[10px] text-[#ffffff] tracking-widest uppercase font-bold">
                AI OPTIC 60FPS
              </span>
            </div>
            <div className="w-6 h-6 border-t-2 border-r-2 border-[#ffdf98] shadow-[0_1px_2px_rgba(0,0,0,0.8)]"></div>
          </div>

          {/* Live AI Detection Bounding Box */}
          <div className="relative mx-auto my-auto w-48 h-36 border border-dashed border-[#ffdf98]/90 rounded-xl bg-[#ffdf98]/10 backdrop-blur-[1px] flex flex-col justify-between p-2 shadow-2xl animate-pulse">
            <div className="flex justify-between items-center">
              <span className="font-label-sm text-[9px] bg-[#c59b27] text-[#473500] px-1.5 py-0.5 rounded shadow font-bold">
                TARGET: {currentDish.target}
              </span>
              <span className="font-label-sm text-[9px] text-[#ffdf98] tracking-tighter font-bold">
                CONF: {currentDish.conf}
              </span>
            </div>
            {/* Reticle Center Crosshair */}
            <div className="self-center flex items-center justify-center">
              <span className="material-symbols-outlined text-[#ffdf98] text-[28px] opacity-90 drop-shadow">
                filter_center_focus
              </span>
            </div>
            <div className="flex justify-between items-center font-label-sm text-[9px] text-[#fff1ed] opacity-95 font-semibold">
              <span>VOL: {currentDish.vol}</span>
              <span>CAL: ~{calVal} kcal</span>
            </div>
          </div>

          {/* Bottom Row Brass Brackets */}
          <div className="flex justify-between items-end">
            <div className="w-6 h-6 border-b-2 border-l-2 border-[#ffdf98] shadow-[0_1px_2px_rgba(0,0,0,0.8)]"></div>
            <div className="flex items-center gap-3 bg-[#362f2d]/85 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-[#807663]/40">
              <span className="font-label-sm text-[10px] text-[#fff1ed]">ISO 100</span>
              <span className="font-label-sm text-[10px] text-[#ffdf98] font-bold">f/2.4</span>
              <span className="font-label-sm text-[10px] text-[#fff1ed]">1/250s</span>
            </div>
            <div className="w-6 h-6 border-b-2 border-r-2 border-[#ffdf98] shadow-[0_1px_2px_rgba(0,0,0,0.8)]"></div>
          </div>
        </div>
      </div>

      {/* Slotted Printed Ticket / Polaroid Card (AI Analysis Printout) */}
      <div className="relative w-full bg-[#fff1ed] rounded-xl shadow-lg p-4 space-y-4 overflow-hidden border border-[#ede0dc]">
        {/* Decorative Paper Top Serration Pattern */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-[#ede0dc] flex justify-between overflow-hidden opacity-60">
          <div className="w-full flex justify-between space-x-1">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-[#fff8f6] rotate-45 -translate-y-1" />
            ))}
          </div>
        </div>

        {/* Header & Recognition Tag */}
        <div className="flex items-start justify-between pt-1">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#006d37]"></span>
              <span className="font-label-sm text-[10px] text-[#006d37] uppercase tracking-wider font-bold">
                Neural Spectrometry Verified
              </span>
            </div>
            <h2 className="font-headline text-[20px] font-bold text-[#211a18]">
              {currentDish.name}
            </h2>
            <p className="font-body text-[14px] text-[#4e4635]">
              {currentDish.desc}
            </p>
          </div>
          <div className="px-2.5 py-1 rounded bg-[#77c2ff] text-[#004f79] font-label-md text-[12px] font-bold shadow-sm">
            {currentDish.match} Match
          </div>
        </div>

        {/* Calorie Gauge Readout & Macro Dial Cluster */}
        <div className="grid grid-cols-4 gap-2 py-1">
          {/* Main Energy Block */}
          <div className="col-span-4 bg-[#f9ebe7] rounded-lg p-3 shadow-inner flex items-center justify-between border border-[#ede0dc]">
            <div className="flex items-baseline gap-2">
              <span className="font-headline text-[30px] font-bold text-[#775a00] leading-none">
                {calVal}
              </span>
              <span className="font-label-md text-[12px] text-[#4e4635] font-bold tracking-wider uppercase">
                KILOCALORIES
              </span>
            </div>
            <div className="flex items-center gap-1 text-[#006d37] font-label-sm text-[11px] font-bold">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              BALANCED FUEL
            </div>
          </div>

          {/* Macro Meter 1: Carbs */}
          <div className="bg-[#f9ebe7] rounded-lg p-2.5 shadow-sm text-center flex flex-col justify-between border border-[#ede0dc]">
            <span className="font-label-sm text-[10px] text-[#4e4635] font-bold">CARBS</span>
            <span className="font-headline text-[18px] font-bold text-[#211a18] my-1">
              {carbVal}g
            </span>
            <div className="w-full h-1.5 bg-[#ede0dc] rounded-full overflow-hidden">
              <div className="h-full bg-[#775a00] w-3/4 rounded-full"></div>
            </div>
          </div>

          {/* Macro Meter 2: Protein */}
          <div className="bg-[#f9ebe7] rounded-lg p-2.5 shadow-sm text-center flex flex-col justify-between border border-[#ede0dc]">
            <span className="font-label-sm text-[10px] text-[#4e4635] font-bold">PROTEIN</span>
            <span className="font-headline text-[18px] font-bold text-[#211a18] my-1">
              {proteinVal}g
            </span>
            <div className="w-full h-1.5 bg-[#ede0dc] rounded-full overflow-hidden">
              <div className="h-full bg-[#006d37] w-1/3 rounded-full"></div>
            </div>
          </div>

          {/* Macro Meter 3: Lipids */}
          <div className="bg-[#f9ebe7] rounded-lg p-2.5 shadow-sm text-center flex flex-col justify-between border border-[#ede0dc]">
            <span className="font-label-sm text-[10px] text-[#4e4635] font-bold">LIPIDS</span>
            <span className="font-headline text-[18px] font-bold text-[#211a18] my-1">
              {lipidVal}g
            </span>
            <div className="w-full h-1.5 bg-[#ede0dc] rounded-full overflow-hidden">
              <div className="h-full bg-[#006497] w-2/5 rounded-full"></div>
            </div>
          </div>

          {/* Macro Meter 4: Fiber */}
          <div className="bg-[#f9ebe7] rounded-lg p-2.5 shadow-sm text-center flex flex-col justify-between border border-[#ede0dc]">
            <span className="font-label-sm text-[10px] text-[#4e4635] font-bold">FIBER</span>
            <span className="font-headline text-[18px] font-bold text-[#211a18] my-1">
              {fiberVal}g
            </span>
            <div className="w-full h-1.5 bg-[#ede0dc] rounded-full overflow-hidden">
              <div className="h-full bg-[#c59b27] w-1/2 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Identified Components Badges */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-[10px] text-[#4e4635] uppercase tracking-wider font-bold">
              Identified Components
            </span>
            <span className="font-label-sm text-[10px] text-[#775a00] font-bold">
              {currentDish.components.length} Specimen Tags
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {currentDish.components.map((comp, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-full bg-[#f9ebe7] text-[#211a18] font-label-sm text-[10px] shadow-sm flex items-center gap-1 border border-[#ede0dc]"
              >
                <span className="material-symbols-outlined text-[#775a00] text-[13px]">
                  {comp.icon}
                </span>
                {comp.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Mechanical Console: Portion Calibrator & Shutter Controls */}
      <div className="w-full bg-[#f9ebe7] rounded-2xl p-4 shadow-md space-y-4 border border-[#ede0dc]">
        {/* Portion Gauge Selector (Knurled Detent Stepper) */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center gap-2">
            <span className="font-label-sm text-[10px] text-[#4e4635] uppercase tracking-wider font-bold">
              Portion Gauge Calibration
            </span>
            <span className="font-label-md text-[12px] text-[#775a00] font-bold shrink-0">
              {portionLabel}
            </span>
          </div>

          <div className="flex items-center justify-between bg-[#ede0dc] p-1 rounded-xl shadow-inner gap-1">
            <button
              type="button"
              onClick={() => handleSetPortion(0.5, '0.5x Petite Cup')}
              className={`flex-1 py-1.5 rounded-lg font-label-md text-[12px] transition-all text-center cursor-pointer ${
                portionMultiplier === 0.5
                  ? 'bg-[#ffffff] text-[#211a18] shadow-sm font-bold'
                  : 'text-[#4e4635] hover:text-[#211a18]'
              }`}
            >
              0.5× Petite
            </button>
            <button
              type="button"
              onClick={() => handleSetPortion(1.0, '1.0x Regular Serving')}
              className={`flex-1 py-1.5 rounded-lg font-label-md text-[12px] transition-all text-center cursor-pointer ${
                portionMultiplier === 1.0
                  ? 'bg-[#ffffff] text-[#211a18] shadow-sm font-bold'
                  : 'text-[#4e4635] hover:text-[#211a18]'
              }`}
            >
              1.0× Regular
            </button>
            <button
              type="button"
              onClick={() => handleSetPortion(1.5, '1.5x Grand Bowl')}
              className={`flex-1 py-1.5 rounded-lg font-label-md text-[12px] transition-all text-center cursor-pointer ${
                portionMultiplier === 1.5
                  ? 'bg-[#ffffff] text-[#211a18] shadow-sm font-bold'
                  : 'text-[#4e4635] hover:text-[#211a18]'
              }`}
            >
              1.5× Grand
            </button>
          </div>
        </div>

        {/* Tactile Shutter & Journal Logging Actuator */}
        <div className="flex items-center gap-3 pt-1">
          {/* High-End Skeuomorphic Brass Shutter Actuator */}
          <button
            type="button"
            aria-label="Trigger Shutter Scan"
            onClick={handleTriggerShutter}
            className="relative w-16 h-16 rounded-full bg-gradient-to-b from-[#ffdf98] to-[#c59b27] p-1 shadow-lg active:scale-95 transition-transform flex items-center justify-center shrink-0 cursor-pointer"
          >
            <div className="w-full h-full rounded-full bg-[#ffffff] p-1 shadow-inner flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#ffdf98] to-[#c59b27] shadow-md flex items-center justify-center">
                <span className="material-symbols-outlined text-[#473500] text-[24px]">lens</span>
              </div>
            </div>
          </button>

          {/* Primary Confirmation Bar */}
          <button
            type="button"
            onClick={handleConfirmLog}
            className={`flex-1 h-16 rounded-xl font-label-lg text-[13px] sm:text-[14px] shadow-md active:translate-y-0.5 transition-all flex items-center justify-center gap-2 px-4 cursor-pointer font-bold tracking-wider uppercase ${
              isLogged
                ? 'bg-[#006d37] text-[#ffffff]'
                : 'bg-gradient-to-r from-[#775a00] to-[#c59b27] text-[#ffffff] hover:brightness-105'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isLogged ? 'check' : 'assignment_turned_in'}
            </span>
            <span>
              {isLogged ? 'REGISTERED IN APOTHECARY LOG' : 'CONFIRM & LOG MEAL'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
