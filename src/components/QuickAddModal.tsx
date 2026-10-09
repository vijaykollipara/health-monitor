import React, { useState } from 'react';
import { MealItem } from '../types';
import { APOTHECARY_ASSETS } from '../data/initialData';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMeal: (meal: MealItem) => void;
  onOpenScan: () => void;
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({
  isOpen,
  onClose,
  onAddMeal,
  onOpenScan,
}) => {
  const [dishName, setDishName] = useState('');
  const [calories, setCalories] = useState('320');
  const [protein, setProtein] = useState('18');
  const [carbs, setCarbs] = useState('35');
  const [fats, setFats] = useState('10');
  const [mealCategory, setMealCategory] = useState<'Breakfast' | 'Lunch' | 'Afternoon' | 'Dinner'>('Lunch');

  if (!isOpen) return null;

  const quickFormulations = [
    {
      name: 'Wild Salmon & Quinoa',
      cat: 'Lunch' as const,
      cal: 610,
      p: 46,
      c: 52,
      f: 19,
      desc: 'Pan-seared salmon with Andean quinoa & olives',
      img: APOTHECARY_ASSETS.salmonQuinoa,
    },
    {
      name: 'Poached Egg on Sourdough',
      cat: 'Breakfast' as const,
      cal: 420,
      p: 18,
      c: 34,
      f: 22,
      desc: 'Rustic sourdough with avocado mash & radish',
      img: APOTHECARY_ASSETS.poachedEgg,
    },
    {
      name: 'Greek Strained Yogurt',
      cat: 'Afternoon' as const,
      cal: 390,
      p: 28,
      c: 59,
      f: 7,
      desc: 'Wildflower honey & toasted walnuts',
      img: APOTHECARY_ASSETS.greekYogurt,
    },
    {
      name: 'Açaí Berry Energy Bowl',
      cat: 'Breakfast' as const,
      cal: 385,
      p: 9,
      c: 62,
      f: 11,
      desc: 'Chia seed canvas, banana slices & blueberries',
      img: APOTHECARY_ASSETS.acaiBowl,
    },
  ];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dishName.trim()) return;

    const newMeal: MealItem = {
      id: `meal-${Date.now()}`,
      name: dishName.trim(),
      category: mealCategory,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      calories: parseInt(calories, 10) || 300,
      protein: parseInt(protein, 10) || 15,
      carbs: parseInt(carbs, 10) || 30,
      fats: parseInt(fats, 10) || 10,
      description: 'Handcrafted apothecary provision',
      image: APOTHECARY_ASSETS.poachedEgg,
      verified: false,
    };

    onAddMeal(newMeal);
    onClose();
  };

  const handleAddPreset = (item: typeof quickFormulations[0]) => {
    const newMeal: MealItem = {
      id: `meal-${Date.now()}`,
      name: item.name,
      category: item.cat,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      calories: item.cal,
      protein: item.p,
      carbs: item.c,
      fats: item.f,
      description: item.desc,
      image: item.img,
      verified: true,
    };
    onAddMeal(newMeal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#211a18]/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-[#fff8f6] rounded-2xl shadow-2xl p-5 border-2 border-[#c59b27] space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-[#ede0dc]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#775a00] text-[22px]">
              menu_book
            </span>
            <h3 className="font-headline text-[18px] font-bold text-[#211a18]">
              Quick Add Dish to Journal
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#4e4635] hover:text-[#211a18] p-1 rounded-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scan Camera Action Banner */}
        <div
          onClick={() => {
            onClose();
            onOpenScan();
          }}
          className="p-3 rounded-xl bg-gradient-to-r from-[#ffdf98] via-[#c59b27] to-[#775a00] text-[#251a00] flex items-center justify-between cursor-pointer shadow-md hover:brightness-105 active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-[#775a00]">
              <span className="material-symbols-outlined text-[22px]">photo_camera</span>
            </div>
            <div>
              <span className="font-headline text-[15px] font-bold block text-[#251a00]">
                Optic AI Food Spectrometry
              </span>
              <span className="font-label-sm text-[10px] text-[#473500] uppercase font-bold">
                Scan plate with 60FPS neural lens
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#251a00]">arrow_forward</span>
        </div>

        {/* Quick Presets */}
        <div className="space-y-2">
          <span className="font-label-sm text-[10px] uppercase text-[#775a00] font-bold block">
            Apothecary Curated Formulations
          </span>
          <div className="grid grid-cols-2 gap-2">
            {quickFormulations.map((item, i) => (
              <div
                key={i}
                onClick={() => handleAddPreset(item)}
                className="p-2 rounded-lg bg-[#ffffff] border border-[#ede0dc] shadow-sm hover:border-[#c59b27] cursor-pointer flex flex-col justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <img src={item.img} alt={item.name} className="w-8 h-8 rounded object-cover" />
                  <span className="font-headline text-[13px] font-bold text-[#211a18] line-clamp-1">
                    {item.name}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1 font-label-sm text-[10px] text-[#4e4635]">
                  <span>{item.cal} kcal</span>
                  <span className="text-[#006d37] font-bold">P: {item.p}g</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Input Form */}
        <form onSubmit={handleCustomSubmit} className="space-y-3 pt-2 border-t border-[#ede0dc]">
          <span className="font-label-sm text-[10px] uppercase text-[#775a00] font-bold block">
            Custom Ingredient / Meal Recording
          </span>

          <div>
            <label className="font-label-sm text-[10px] text-[#4e4635] uppercase font-bold block mb-1">
              Plate or Beverage Name
            </label>
            <input
              type="text"
              required
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              placeholder="e.g. Bone Broth with Wild Thyme"
              className="w-full p-2 rounded-lg bg-white border border-[#d1c5af] text-sm text-[#211a18] outline-none focus:ring-1 focus:ring-[#775a00]"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            <div>
              <label className="font-label-sm text-[9px] text-[#4e4635] uppercase font-bold block mb-0.5">
                Calories
              </label>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-full p-1.5 rounded-lg bg-white border border-[#d1c5af] text-xs text-center font-bold"
              />
            </div>
            <div>
              <label className="font-label-sm text-[9px] text-[#4e4635] uppercase font-bold block mb-0.5">
                Protein (g)
              </label>
              <input
                type="number"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                className="w-full p-1.5 rounded-lg bg-white border border-[#d1c5af] text-xs text-center font-bold"
              />
            </div>
            <div>
              <label className="font-label-sm text-[9px] text-[#4e4635] uppercase font-bold block mb-0.5">
                Carbs (g)
              </label>
              <input
                type="number"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                className="w-full p-1.5 rounded-lg bg-white border border-[#d1c5af] text-xs text-center font-bold"
              />
            </div>
            <div>
              <label className="font-label-sm text-[9px] text-[#4e4635] uppercase font-bold block mb-0.5">
                Fats (g)
              </label>
              <input
                type="number"
                value={fats}
                onChange={(e) => setFats(e.target.value)}
                className="w-full p-1.5 rounded-lg bg-white border border-[#d1c5af] text-xs text-center font-bold"
              />
            </div>
          </div>

          <div className="flex gap-2">
            {(['Breakfast', 'Lunch', 'Afternoon', 'Dinner'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setMealCategory(cat)}
                className={`flex-1 py-1 rounded text-[11px] font-label-sm uppercase font-bold transition-all cursor-pointer ${
                  mealCategory === cat
                    ? 'bg-[#c59b27] text-white shadow-sm'
                    : 'bg-[#ede0dc] text-[#4e4635]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg font-label-md text-[12px] text-[#4e4635] hover:bg-[#ede0dc] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg font-label-md text-[12px] bg-gradient-to-r from-[#775a00] to-[#c59b27] text-white font-bold shadow active:translate-y-0.5 cursor-pointer"
            >
              Log to Journal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
