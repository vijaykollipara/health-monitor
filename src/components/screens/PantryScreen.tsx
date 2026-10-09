import React, { useState } from 'react';
import { MealItem } from '../../types';
import { APOTHECARY_ASSETS } from '../../data/initialData';

interface PantryScreenProps {
  selectedMeal?: MealItem;
  onBackToLedger: () => void;
  onToggleStar?: (mealId: string) => void;
}

export const PantryScreen: React.FC<PantryScreenProps> = ({
  selectedMeal,
  onBackToLedger,
  onToggleStar,
}) => {
  // Default fallback is the Mediterranean Grilled Salmon & Quinoa
  const defaultMeal: MealItem = {
    id: 'meal-2',
    name: 'Mediterranean Grilled Salmon & Quinoa',
    category: 'Lunch',
    time: '1:10 PM',
    calories: 610,
    protein: 44,
    carbs: 48,
    fats: 22,
    fiber: 7,
    sodium: 480,
    description:
      'Pan-seared Norwegian fillet seasoned with wild dill, cured lemons, tossed tri-color Andean quinoa, and fire-charred spears.',
    image: APOTHECARY_ASSETS.pantrySalmon,
    verified: true,
    ingredients: [
      { name: 'Norwegian Salmon Fillet', detail: 'Fresh ocean cut • 180g', calories: 370 },
      { name: 'Tricolor Quinoa & Herb Pilaf', detail: 'Steamed with parsley • 120g', calories: 160 },
      { name: 'Charred Asparagus & Cherry Tomatoes', detail: 'Cast-iron blistered • 80g', calories: 35 },
      { name: 'Olive Oil & Lemon Emulsion', detail: 'Cold-pressed dressing • 1 tbsp', calories: 45 },
    ],
  };

  const currentMeal = selectedMeal || defaultMeal;

  const [portionMultiplier, setPortionMultiplier] = useState<number>(1.0);
  const [isStarred, setIsStarred] = useState<boolean>(Boolean(currentMeal.starred));
  const [showFineTuneModal, setShowFineTuneModal] = useState<boolean>(false);
  const [customNotes, setCustomNotes] = useState<string>('');

  const baseCal = currentMeal.calories;
  const baseMass = 380;
  const baseProtein = currentMeal.protein;
  const baseFats = currentMeal.fats;
  const baseCarbs = currentMeal.carbs;
  const baseFiber = currentMeal.fiber || 7;
  const baseSodium = currentMeal.sodium || 480;

  const currentCal = Math.round(baseCal * portionMultiplier);
  const currentMass = Math.round(baseMass * portionMultiplier);
  const currentProtein = Math.round(baseProtein * portionMultiplier);
  const currentFats = Math.round(baseFats * portionMultiplier);
  const currentCarbs = Math.round(baseCarbs * portionMultiplier);
  const currentFiber = Math.round(baseFiber * portionMultiplier);
  const currentSodium = Math.round(baseSodium * portionMultiplier);

  const proteinBarWidth = Math.min(100, Math.round(72 * portionMultiplier));
  const fatBarWidth = Math.min(100, Math.round(56 * portionMultiplier));
  const carbBarWidth = Math.min(100, Math.round(48 * portionMultiplier));

  const handleStarToggle = () => {
    setIsStarred(!isStarred);
    if (onToggleStar) {
      onToggleStar(currentMeal.id);
    }
  };

  return (
    <div className="flex flex-col w-full pb-6 space-y-4">
      {/* Top Navigation & Return Tab */}
      <div className="flex items-center justify-between px-1">
        <button
          type="button"
          onClick={onBackToLedger}
          className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-[#fff1ed] text-[#4e4635] font-label-md text-[12px] transition-transform active:translate-y-0.5 shadow-sm border border-[#ede0dc] cursor-pointer hover:text-[#211a18]"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>DIARY LEDGER</span>
        </button>

        <div className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md bg-[#f3e5e2] text-[#775a00] font-label-sm text-[10px] tracking-widest uppercase font-bold border border-[#ede0dc]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#006d37]"></span>
          VERIFIED ENTRY
        </div>
      </div>

      {/* Physical Carte de Cuisine: Embossed Recipe & Health Card */}
      <article className="relative bg-[#ffffff] rounded-xl shadow-[0_6px_20px_rgba(44,37,35,0.12),0_1px_3px_rgba(44,37,35,0.08)] overflow-hidden border border-[#ede0dc]">
        {/* Photo Framing with Archival Embossed Mat */}
        <div className="p-3 bg-[#fff1ed] pb-2">
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-[inset_0_2px_5px_rgba(44,37,35,0.35),0_1px_0_rgba(255,255,255,0.9)] bg-[#f9ebe7]">
            {/* Brass Photo Corners */}
            <div className="absolute top-1.5 left-1.5 z-10 w-4 h-4 bg-[#c59b27] shadow-sm -rotate-45 -translate-x-1.5 -translate-y-1.5"></div>
            <div className="absolute top-1.5 right-1.5 z-10 w-4 h-4 bg-[#c59b27] shadow-sm rotate-45 translate-x-1.5 -translate-y-1.5"></div>
            <div className="absolute bottom-1.5 left-1.5 z-10 w-4 h-4 bg-[#c59b27] shadow-sm rotate-45 -translate-x-1.5 translate-y-1.5"></div>
            <div className="absolute bottom-1.5 right-1.5 z-10 w-4 h-4 bg-[#c59b27] shadow-sm -rotate-45 translate-x-1.5 translate-y-1.5"></div>

            <img
              alt={currentMeal.name}
              className="w-full h-full object-cover"
              src={currentMeal.image || APOTHECARY_ASSETS.pantrySalmon}
            />

            {/* Lens Scan Badge Overlay */}
            <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#fff1ed]/90 backdrop-blur-md text-[#211a18] shadow-sm border border-[#ede0dc]">
              <span className="material-symbols-outlined text-[14px] text-[#775a00]">view_in_ar</span>
              <span className="font-label-sm text-[10px] uppercase font-bold">Source: AI Lens Scan</span>
            </div>
          </div>

          {/* Meta Stamp */}
          <div className="flex items-center justify-between pt-2.5 px-1 text-[#4e4635] font-label-sm text-[10px] tracking-wider font-bold">
            <span>LOGGED TODAY • {currentMeal.time}</span>
            <span className="text-[#775a00] uppercase font-bold">
              MEAL № {currentMeal.category === 'Breakfast' ? '1' : currentMeal.category === 'Lunch' ? '2' : '3'} ({currentMeal.category.toUpperCase()})
            </span>
          </div>
        </div>

        {/* Title & Plate Description */}
        <div className="px-4 pt-3 pb-2 bg-[#ffffff]">
          <h2 className="font-headline text-[22px] sm:text-[24px] font-bold text-[#211a18] leading-tight">
            {currentMeal.name}
          </h2>
          <p className="font-body text-[14px] text-[#4e4635] mt-1">
            {currentMeal.description}
          </p>
        </div>

        {/* Apothecary Calorie Dial & Serving Gauge */}
        <div className="mx-3 my-2 p-3.5 rounded-lg bg-[#f9ebe7] shadow-[inset_0_2px_4px_rgba(44,37,35,0.18)] border border-[#ede0dc]">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-label-sm text-[10px] text-[#775a00] uppercase tracking-widest block font-bold">
                Total Caloric Heat
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="font-headline text-[28px] sm:text-[30px] text-[#211a18] leading-none font-bold">
                  {currentCal}
                </span>
                <span className="font-label-md text-[12px] text-[#4e4635] uppercase font-bold">
                  kcal
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-label-sm text-[10px] text-[#4e4635] uppercase tracking-wider block font-bold">
                Standard Portion
              </span>
              <span className="font-label-lg text-[14px] text-[#211a18] font-bold block mt-0.5">
                1 Bowl / {currentMass}g
              </span>
            </div>
          </div>

          {/* Tactile Knurled Brass Multiplier Slider */}
          <div className="mt-3.5 pt-3 bg-[#fff1ed]/90 rounded-md p-2.5 shadow-[inset_0_1px_2px_rgba(44,37,35,0.1)] border border-[#ede0dc]">
            <div className="flex justify-between items-center mb-1">
              <label
                htmlFor="portion-range"
                className="font-label-sm text-[10px] text-[#211a18] uppercase tracking-wider flex items-center gap-1 font-bold"
              >
                <span className="material-symbols-outlined text-[15px] text-[#775a00]">tune</span>
                Adjust Serving Multiplier
              </label>
              <span className="font-label-sm text-[11px] font-bold bg-[#ffdf98] text-[#251a00] px-1.5 py-0.5 rounded shadow-sm">
                {portionMultiplier.toFixed(2).replace(/\.00$/, '.0')}x
              </span>
            </div>
            <input
              id="portion-range"
              type="range"
              min="0.5"
              max="2.0"
              step="0.25"
              value={portionMultiplier}
              onChange={(e) => setPortionMultiplier(parseFloat(e.target.value))}
              className="w-full h-2 rounded-lg bg-[#ede0dc] appearance-none cursor-pointer accent-[#775a00]"
            />
            <div className="flex justify-between font-label-sm text-[9px] text-[#807663] mt-1 px-0.5 font-semibold">
              <span>0.5x (Snack)</span>
              <span>1.0x (Standard)</span>
              <span>1.5x (Hearty)</span>
              <span>2.0x (Double)</span>
            </div>
          </div>
        </div>

        {/* Official Pharmacopeia Nutrition Grid */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#ede0dc]/50">
            <span className="font-label-md text-[12px] uppercase tracking-wider text-[#211a18] font-bold">
              Nutritional Balance
            </span>
            <span className="font-label-sm text-[10px] text-[#4e4635] font-bold">
              % Daily Intake
            </span>
          </div>

          {/* Macro Meter 1: Protein */}
          <div className="py-2">
            <div className="flex justify-between items-baseline mb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c59b27] shadow-sm"></span>
                <span className="font-label-md text-[12px] text-[#211a18] font-bold">Crude Protein</span>
              </div>
              <div className="font-label-sm text-[11px]">
                <span className="text-[#211a18] font-bold text-[13px]">{currentProtein}g</span>
                <span className="text-[#4e4635] ml-1">({Math.round(36 * portionMultiplier)}% DV)</span>
              </div>
            </div>
            <div className="w-full h-2 rounded-full bg-[#f9ebe7] shadow-[inset_0_1px_3px_rgba(44,37,35,0.3)] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#775a00] to-[#c59b27] rounded-full transition-all duration-300"
                style={{ width: `${proteinBarWidth}%` }}
              ></div>
            </div>
            <p className="font-body text-[12px] text-[#4e4635] mt-0.5 italic">
              Wild Cold-Water Salmon & Andean Quinoa
            </p>
          </div>

          {/* Macro Meter 2: Dietary Fats */}
          <div className="py-2">
            <div className="flex justify-between items-baseline mb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006497] shadow-sm"></span>
                <span className="font-label-md text-[12px] text-[#211a18] font-bold">Essential Lipids & Fats</span>
              </div>
              <div className="font-label-sm text-[11px]">
                <span className="text-[#211a18] font-bold text-[13px]">{currentFats}g</span>
                <span className="text-[#4e4635] ml-1">({Math.round(28 * portionMultiplier)}% DV)</span>
              </div>
            </div>
            <div className="w-full h-2 rounded-full bg-[#f9ebe7] shadow-[inset_0_1px_3px_rgba(44,37,35,0.3)] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#006497] to-[#77c2ff] rounded-full transition-all duration-300"
                style={{ width: `${fatBarWidth}%` }}
              ></div>
            </div>
            <p className="font-body text-[12px] text-[#4e4635] mt-0.5 italic">
              Extra Virgin Greek Olive Oil & Omega-3s
            </p>
          </div>

          {/* Macro Meter 3: Carbohydrates */}
          <div className="py-2">
            <div className="flex justify-between items-baseline mb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006d37] shadow-sm"></span>
                <span className="font-label-md text-[12px] text-[#211a18] font-bold">Complex Carbohydrates</span>
              </div>
              <div className="font-label-sm text-[11px]">
                <span className="text-[#211a18] font-bold text-[13px]">{currentCarbs}g</span>
                <span className="text-[#4e4635] ml-1">({Math.round(16 * portionMultiplier)}% DV)</span>
              </div>
            </div>
            <div className="w-full h-2 rounded-full bg-[#f9ebe7] shadow-[inset_0_1px_3px_rgba(44,37,35,0.3)] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#006d37] to-[#34b768] rounded-full transition-all duration-300"
                style={{ width: `${carbBarWidth}%` }}
              ></div>
            </div>
            <p className="font-body text-[12px] text-[#4e4635] mt-0.5 italic">
              Ancient Quinoa seed & tender asparagus shoots
            </p>
          </div>

          {/* Micronutrients Secondary Tray */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg bg-[#fff1ed] flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_3px_rgba(44,37,35,0.06)] border border-[#ede0dc]">
              <span className="font-label-sm text-[10px] text-[#4e4635] uppercase tracking-wider font-bold">
                Dietary Fiber
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-headline text-[18px] font-bold text-[#211a18]">
                  {currentFiber}g
                </span>
                <span className="font-label-sm text-[10px] text-[#006d37] font-bold">
                  {Math.round(25 * portionMultiplier)}% DV
                </span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#fff1ed] flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_3px_rgba(44,37,35,0.06)] border border-[#ede0dc]">
              <span className="font-label-sm text-[10px] text-[#4e4635] uppercase tracking-wider font-bold">
                Electrolyte (Sodium)
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-headline text-[18px] font-bold text-[#211a18]">
                  {currentSodium}mg
                </span>
                <span className="font-label-sm text-[10px] text-[#4e4635] font-semibold">
                  {Math.round(21 * portionMultiplier)}% DV
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Itemized Pantry Index / Manifest Receipt */}
        <div className="mx-3 my-2 p-3 bg-[#fff1ed] rounded-lg shadow-[inset_0_1px_3px_rgba(44,37,35,0.1)] border border-[#ede0dc]">
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-1 text-[#775a00]">
              <span className="material-symbols-outlined text-[16px]">receipt_long</span>
              <span className="font-label-sm text-[10px] uppercase tracking-widest font-bold">
                Itemized Ingredients
              </span>
            </div>
            <span className="font-label-sm text-[10px] text-[#4e4635] font-semibold">Weight & Energy</span>
          </div>

          <div className="space-y-1.5 font-label-md text-[12px]">
            {currentMeal.ingredients && currentMeal.ingredients.length > 0 ? (
              currentMeal.ingredients.map((ing, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-1.5 px-2 bg-[#ffffff] rounded shadow-sm border border-[#ede0dc]/60"
                >
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="text-[#211a18] truncate font-semibold">{ing.name}</span>
                    <span className="text-[#4e4635] text-[11px] font-normal">{ing.detail}</span>
                  </div>
                  <span className="text-[#775a00] font-bold shrink-0">
                    {Math.round(ing.calories * portionMultiplier)} kcal
                  </span>
                </div>
              ))
            ) : (
              <div className="p-2 text-center text-sm text-[#4e4635]">
                Standard apothecary formulation
              </div>
            )}
          </div>
        </div>

        {/* Tactile Mechanical Controls / Action Footers */}
        <div className="p-3 bg-[#f3e5e2]/60 flex flex-col gap-2.5 border-t border-[#ede0dc]">
          {/* Save Button (Brass Extruded Pushbutton) */}
          <button
            type="button"
            onClick={handleStarToggle}
            className={`w-full py-3 px-4 rounded-lg font-label-md text-[12px] tracking-wider uppercase font-bold flex items-center justify-center gap-2 transition-transform active:translate-y-0.5 cursor-pointer shadow-md ${
              isStarred
                ? 'bg-[#c59b27] text-[#473500] shadow-inner border border-[#775a00]'
                : 'brass-extruded text-[#251a00]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px] text-[#473500]"
              style={{ fontVariationSettings: isStarred ? "'FILL' 1" : "'FILL' 0" }}
            >
              star
            </span>
            <span>
              {isStarred ? 'Recipe Preserved in Favorites' : 'Add to Starred Formulations'}
            </span>
          </button>

          {/* Edit Ingredients Button */}
          <button
            type="button"
            onClick={() => setShowFineTuneModal(true)}
            className="w-full py-2.5 px-4 rounded-lg bg-[#ffffff] analog-card text-[#4e4635] hover:text-[#211a18] font-label-md text-[12px] tracking-wider uppercase font-bold flex items-center justify-center gap-1.5 transition-transform active:translate-y-0.5 cursor-pointer border border-[#ede0dc]"
          >
            <span className="material-symbols-outlined text-[18px]">edit_note</span>
            <span>Fine-Tune Portions & Items</span>
          </button>
        </div>
      </article>

      {/* Physical Micro Stamp Footnote */}
      <div className="text-center py-1">
        <p className="font-label-sm text-[10px] text-[#807663] tracking-widest uppercase">
          Apothecary Ledger Archive • Index № 884-SAL
        </p>
      </div>

      {/* Fine-Tune Portions Modal */}
      {showFineTuneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#211a18]/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-[#fff8f6] rounded-2xl shadow-2xl p-5 border-2 border-[#c59b27] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#ede0dc]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#775a00] text-[20px]">
                  science
                </span>
                <h3 className="font-headline text-[18px] font-bold text-[#211a18]">
                  Fine-Tune Formulation
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowFineTuneModal(false)}
                className="text-[#4e4635] hover:text-[#211a18] p-1 rounded-md"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="font-body text-[14px] text-[#4e4635]">
              Adjust custom culinary notes or portion modifiers for Clara’s archive record.
            </p>

            <div className="space-y-2">
              <label className="font-label-sm text-[10px] uppercase text-[#775a00] font-bold block">
                Archival Preparation Notes
              </label>
              <textarea
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="e.g., Substitute lemon dressing for balsamic vinegar, extra parsley."
                className="w-full p-2.5 rounded-lg bg-[#ffffff] border border-[#d1c5af] text-sm text-[#211a18] focus:ring-1 focus:ring-[#775a00] outline-none h-20 resize-none font-body"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowFineTuneModal(false)}
                className="px-3 py-1.5 rounded-lg font-label-md text-[12px] text-[#4e4635] hover:bg-[#ede0dc] transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowFineTuneModal(false)}
                className="px-4 py-1.5 rounded-lg font-label-md text-[12px] bg-gradient-to-r from-[#775a00] to-[#c59b27] text-white font-bold shadow active:translate-y-0.5"
              >
                Save to Ledger
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
