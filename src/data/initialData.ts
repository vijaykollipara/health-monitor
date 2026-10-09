import { MealItem, DayLog, HydrationDay } from '../types';

export const APOTHECARY_ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN3Dm4EyNzsx9TQQ2mBiHFjayPsbZLliycevvUeoJccHYoURtkUxOsMg2gyEhymHwWG8PenxzBT5RDv1wjahUmUUDo793lJBv3v_Y75vQCnfjHlYYsjxkA-wvSq6zcYlJaoqOXxezU2DgWcDRwPcaGqlkpL-BB1JBMJe8fQjGIwhf4NX9NhuOdHNCgndGjmZt_YFP2QEWaz9SNxlxWgZO1QlnUlhCkGFjSqY2cSl4bAJmiUHaegTQ3',
  claraAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWYDNIzYyB8PE0fYzXJp1RgkCao9s4D7WRUDxl2qpl39C8P7gTPcvfo1nucFFnNw036fUNr827wA1N27jJ9s50YHkq_lgjn5AJMjF_fPCJwhjRo9lcFVqV0x8S7VJ_QlHwpq0rmjQu7o8ao8qnmyCQrZz8QYFZioSL8ygyhlXA2iDgbcEi1vnpJOrCfI-_Qao3MeOJY05cg6RsEyOBLlWfVoZItzVXjDEu1WoWD-2bW9sASHXmfIbJ',
  poachedEgg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlBSXTSyk6wHaD9dch1OE9SRW12slPqmEKXg0Y02WibZj9lTxGiXt5m8N_PfEMhBFBmEoTiOdyxyjASqc9dhKM9vtKWNo2scJbT333dfgvP9Jws61FZ-a7Ta-QWlr0awi5a33B-tlcuabTozQPR78m-DosSWdzkSLIk2IqcmaU2w56ZMMJFNvsXk7nFks_w1KlSfLN4dEgjfjzFS38Lsu6L22_D_sPzxxl4h-7ce4iZ7mXltCaOH9O',
  salmonQuinoa: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA31WXcYDFtt_oOp2yPkmOY4yKWEDnnNpi58R_M-m-k4vN8OnFQBf52ScAyGxDM1p7TipN9ikLxSTe5r3GKq6HDCYdBEPSrEn_3pd6eNWp5Vf_RR81U0OZ5IvneTnkdD2ert8rmMBkR_aqUCRqir3rXqkZqXT-cucKmIq71Hu92o4spSrkuon5cDPc7GDoeQ3-GWim1U6spG2ILc_etcAQhNxgRsEIktBED5CU7ozr6letzHhppwKGC',
  greekYogurt: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADxONjKpT8Oz7BgeTvBhkonLUxgCbB1fFGpqI1NWEih3lw3aqZFvJCuh1vfX2RJGyWN-XKZs10ukfzXbELcDWgCdf5n7SQqt1-n6_FRTSVuGOxnRDlpXRGVoJSrP_EH2o0gXOQ7z1KpdTZjFISartGQzVyCQxH7xegMm1okpf_zbwj1PBShS79dgCdBKgisRrIJSpiB3KvjdsANg31KZx6-5jCnhzNVamScc_SiL_mNAZBoivGTaYR',
  acaiBowl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoYQKn-po6f2s79TrNgttclRxLBrVEwhspE6PmzxOFyRF3eAKY-PV67L6f4PK-6G5h2wA9y5cN6qB1oICePb-kdtcT07-JqZbnBSZ1klQ4GsYbllNyG4zimkZJt6bi1-xQEeeaDYiN2Uftdy2IzTeMG6S9eY2oJJgDabayrs_uqB9PLNveyA3nypZqcrYHxdpAdD9mC-Nlr048yekR3FP6yMfQuZlsG6YalhR7Ec3mI8f4z2Yyi3I4',
  pantrySalmon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvKqsJLCuqq0TEYboy3jPr_jiJfh8GSwq-mHOnZd7drlQxHcQANnS-T40xzxSo1Bs8T0ps_syaV1Ob9Btk5pvQz8aOXz37jVJWmUKfJYwQMZWc5vwgxO_zPQ5RJHZ68NyXjs-vYG43cq9QTgFNDZqbDZkIxrcFMk8JEB7Kf50fEMxxHcPXhR_Q0dEBtNzYDRETbooA6Uiiruu6UI1Vvq0maUznGIF8c5SLGIxgUhLQ1rLbAR0K5MTT'
};

export const INITIAL_MEALS: MealItem[] = [
  {
    id: 'meal-1',
    name: 'Poached Egg & Avocado',
    category: 'Breakfast',
    time: '08:15',
    calories: 420,
    protein: 18,
    carbs: 34,
    fats: 22,
    fiber: 6,
    sodium: 320,
    description: 'Rustic sourdough, cracked pepper, garden radish, chives',
    image: APOTHECARY_ASSETS.poachedEgg,
    verified: true,
    ingredients: [
      { name: 'Organic Pastured Eggs', detail: 'Soft poached • 2 units', calories: 140 },
      { name: 'Artisan Sourdough Slice', detail: 'Stone-milled wheat • 65g', calories: 155 },
      { name: 'Hass Avocado Mash', detail: 'Cold mashed with lemon • 70g', calories: 110 },
      { name: 'Watermelon Radish & Herbs', detail: 'Chive baton garnish • 20g', calories: 15 },
    ]
  },
  {
    id: 'meal-2',
    name: 'Artisan Quinoa Salmon',
    category: 'Lunch',
    time: '13:10',
    calories: 610,
    protein: 46,
    carbs: 52,
    fats: 19,
    fiber: 7,
    sodium: 480,
    description: 'Pan-seared salmon, kalamata olives, lemon vinaigrette',
    image: APOTHECARY_ASSETS.salmonQuinoa,
    verified: true,
    ingredients: [
      { name: 'Norwegian Salmon Fillet', detail: 'Fresh ocean cut • 180g', calories: 370 },
      { name: 'Tricolor Quinoa & Herb Pilaf', detail: 'Steamed with parsley • 120g', calories: 160 },
      { name: 'Charred Asparagus & Cherry Tomatoes', detail: 'Cast-iron blistered • 80g', calories: 35 },
      { name: 'Olive Oil & Lemon Emulsion', detail: 'Cold-pressed dressing • 1 tbsp', calories: 45 },
    ]
  },
  {
    id: 'meal-3',
    name: 'Greek Yogurt & Honey',
    category: 'Afternoon',
    time: '16:30',
    calories: 390,
    protein: 28,
    carbs: 59,
    fats: 7,
    fiber: 4,
    sodium: 110,
    description: 'Wildflower honey, crushed walnut halves, organic curd',
    image: APOTHECARY_ASSETS.greekYogurt,
    verified: true,
    ingredients: [
      { name: 'Traditional Strained Curd', detail: 'Organic whole milk • 200g', calories: 180 },
      { name: 'Mountain Wildflower Honey', detail: 'Raw unpasteurized • 1.5 tbsp', calories: 95 },
      { name: 'English Walnut Halves', detail: 'Toasted stone pieces • 25g', calories: 115 },
    ]
  }
];

export const WEEKLY_LOGS: DayLog[] = [
  { day: 'Monday', dayShort: 'M', calories: 2050, target: 2100, status: 'Achieved' },
  { day: 'Tuesday', dayShort: 'T', calories: 1980, target: 2100, status: 'Achieved' },
  { day: 'Wednesday', dayShort: 'W', calories: 2120, target: 2100, status: 'Surplus (+20)' },
  { day: 'Thursday', dayShort: 'Th*', calories: 1420, target: 2100, status: 'In Progress', isCurrent: true },
  { day: 'Friday', dayShort: 'F', calories: 2000, target: 2100, status: 'Projected Plan', isProjected: true },
  { day: 'Saturday', dayShort: 'Sa', calories: 2200, target: 2100, status: 'Projected Plan', isProjected: true },
  { day: 'Sunday', dayShort: 'Su', calories: 2100, target: 2100, status: 'Projected Plan', isProjected: true },
];

export const HYDRATION_WEEK: HydrationDay[] = [
  { day: 'Mon', amountLiters: 2.6, achieved: true },
  { day: 'Tue', amountLiters: 2.5, achieved: true },
  { day: 'Wed', amountLiters: 2.7, achieved: true },
  { day: 'Thu', amountLiters: 1.75, achieved: false, isCurrent: true },
  { day: 'Fri', amountLiters: 0, achieved: false },
  { day: 'Sat', amountLiters: 0, achieved: false },
  { day: 'Sun', amountLiters: 0, achieved: false },
];
