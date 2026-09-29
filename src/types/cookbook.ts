/**
 * Tipos e Modelos de Dados para o BiteSync Studio
 */

export interface NutritionalInfo {
  calories: number; // kcal por porção ou 100g
  protein: number;  // g
  carbs: number;    // g
  fat: number;      // g
  fiber?: number;   // g
  sugar?: number;   // g
  sodium?: number;  // mg
  servingSize?: string;
}

export interface RecipeStep {
  stepNumber: number;
  originalText?: string;
  portugueseText: string;
  notes?: string;
  isRestored?: boolean; // Destaca passos que foram restaurados após truncagem prévia
}

export interface Ingredient {
  item: string;
  amount: string;
  originalAmount?: string;
  category?: 'carnes' | 'peixes' | 'legumes' | 'especiarias' | 'laticinios' | 'despensa' | 'frutas';
  estimatedGrams?: number;
  calories?: number;
}

export type RecipeDifficulty = 'Fácil' | 'Médio' | 'Especialista';

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  originalTitle: string;
  subtitle: string;
  historicalNote?: string;
  restorationNote?: string; // Nota de restauro se aplicável (ex: Fish Cutlets)
  category: 'aves' | 'peixes' | 'sopas' | 'doces' | 'carnes' | 'conservas' | string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: RecipeDifficulty | 'Tradição Demorada' | string;
  difficultyLevel: RecipeDifficulty | string; // Nível de Dificuldade: 'Fácil' | 'Médio' | 'Especialista'
  dropCapLetter: string;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  videoTutorialUrl?: string;
  videoTutorialTitle?: string;
  originalSourceTitle: string;
  originalSourceUrl: string;
  pantrySecret: string; // Segredo da Avó
  tags: string[];
  nutrition?: NutritionalInfo;
  area?: string; // Mapeamento por país (strArea da TheMealDB ou origem cultural)
  isPortugueseTraditional?: boolean;
}

export interface FruitGuideItem {
  id: string;
  name: string;
  latinName: string;
  season: 'Outono' | 'Inverno' | 'Primavera' | 'Verão' | 'Todo o Ano';
  pectinLevel: 'Muito Alta' | 'Alta' | 'Média' | 'Baixa';
  sugarRatioPerKg: string; // Ex: 750g açúcar por 1kg polpa
  description: string;
  historicalNote: string;
  harvestAdvice: string;
  preservationTechniques: string[];
  recommendedUses: string[];
  grandmotherSecret: string;
  nutrition?: NutritionalInfo;
}

export interface VintageLabelConfig {
  id: string;
  productName: string;
  subtitle: string;
  category?: string;
  batchCode?: string;
  vintageYear: string;
  preparedDate?: string;
  expirationDate?: string;
  makerNote: string;
  ingredients: string;
  grandmotherAdvice: string;
  frameStyle: 'baroque_ornament' | 'botanical_classic' | 'farmhouse_crest' | 'apothecary_border';
  inkColor: 'burgundy' | 'sepia' | 'forest_green' | 'iron_black' | string;
  fontStyle: 'classic_serif' | 'ornate' | 'calligraphic';
  barcode?: string;
  nutriscore?: string;
  showQrCode?: boolean;
  nutrition?: NutritionalInfo;
}

export interface DailyMealPlan {
  dayOfWeek: string;
  dayNumber: number;
  lunch: {
    dishName: string;
    recipeId?: string;
    sideDish: string;
    winePairing?: string;
    estimatedCalories?: number;
  };
  dinner: {
    dishName: string;
    recipeId?: string;
    comfortSoup: string;
    sweetTreat: string;
    sweetTreatRecipeId?: string;
    estimatedCalories?: number;
  };
  pantryTip: string;
  prepAheadNotice?: string;
}

export type MarketSectionKey = 
  | 'hortifruti' 
  | 'talho' 
  | 'peixaria' 
  | 'lacticinios' 
  | 'mercearia' 
  | 'condimentos' 
  | 'especiarias' 
  | 'adega';

export interface MarketSectionMeta {
  key: MarketSectionKey;
  title: string;
  subtitle: string;
  badgeColor: string;
  iconName: string;
}

export interface AggregatedGroceryItem {
  id: string;
  item: string;
  amount: string;
  numericAmount?: number;
  unit?: string;
  section: MarketSectionKey;
  sourceRecipes: string[]; // Nomes dos pratos de origem
  checked: boolean;
  isCustom?: boolean;
  notes?: string;
}

// Módulos Canónicos de Navegação BiteSync
export type ActiveNavTab = 
  | 'inicio' 
  | 'home'
  | 'explorar' 
  | 'search'
  | 'scan' 
  | 'ementa' 
  | 'planner'
  | 'macros' 
  | 'receitas' 
  | 'frutas' 
  | 'rotulos' 
  | 'calorias' 
  | 'dossier' 
  | 'add'
  | 'menu';

// Tipos para o Módulo V: Balança do Alquimista / Conta Calorias
export type CalorieGoalType = 'defice' | 'manutencao' | 'ganho';

export interface CalorieGoalConfig {
  goalType: CalorieGoalType;
  targetCalories: number;
  targetProtein: number; // g
  targetCarbs: number;   // g
  targetFat: number;     // g
}

export interface CalorieLogEntry {
  id: string;
  title: string;
  category: 'receita' | 'fruta' | 'rotulo' | 'refeicao' | 'ingrediente' | 'manual';
  portionDescription: string;
  portions: number;
  grams?: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  timestamp: string;
  timeLabel?: string;
  icon?: string;
}

// Modelos de APIs Externas
export interface OpenFoodFactsProduct {
  code: string;
  product_name?: string;
  brands?: string;
  nutriscore_grade?: string;
  nova_group?: number;
  allergens_tags?: string[];
  nutriments?: {
    'energy-kcal_100g'?: number;
    'energy-kcal_serving'?: number;
    proteins_100g?: number;
    carbohydrates_100g?: number;
    fat_100g?: number;
    sugars_100g?: number;
    fiber_100g?: number;
  };
  ingredients_text?: string;
  image_url?: string;
}

export interface FruityviceFruit {
  name: string;
  id: number | string;
  family: string;
  order: string;
  genus: string;
  nutritions: {
    calories: number;
    fat: number;
    sugar: number;
    carbohydrates: number;
    protein: number;
  };
}

export interface DummyJsonRecipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  image: string;
}
