export interface MealItem {
  id: string;
  name: string;
  category: 'Breakfast' | 'Lunch' | 'Afternoon' | 'Dinner';
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber?: number;
  sodium?: number;
  description: string;
  image: string;
  ingredients?: Array<{
    name: string;
    detail: string;
    calories: number;
  }>;
  starred?: boolean;
  verified?: boolean;
}

export interface DayLog {
  day: string;
  dayShort: string;
  calories: number;
  target: number;
  status: string;
  isCurrent?: boolean;
  isProjected?: boolean;
}

export interface HydrationDay {
  day: string;
  amountLiters: number;
  achieved: boolean;
  isCurrent?: boolean;
}
