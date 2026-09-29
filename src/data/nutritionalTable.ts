/**
 * Tabela de Composição Nutricional de Referência Culinária (PortFIR INSA / TACO)
 * Valores nutricionais médios por 100g de alimento comestível.
 */

export interface FoodCompositionItem {
  id: string;
  name: string;
  category: string;
  calories: number; // kcal por 100g
  protein: number;  // g
  carbs: number;    // g
  fat: number;      // g
  fiber: number;    // g
  defaultGramsPerPortion: number;
  portionUnit: string;
}

export const PORTUGUESE_NUTRITIONAL_TABLE: FoodCompositionItem[] = [
  // Carnes e Aves
  { id: 'frango-peito', name: 'Frango do Campo (Peito sem pele)', category: 'Carnes e Aves', calories: 165, protein: 31.0, carbs: 0.0, fat: 3.6, fiber: 0.0, defaultGramsPerPortion: 150, portionUnit: '1 bife / pedaço médio (150g)' },
  { id: 'frango-coxa', name: 'Frango do Campo (Coxa assada)', category: 'Carnes e Aves', calories: 215, protein: 26.0, carbs: 0.0, fat: 12.0, fiber: 0.0, defaultGramsPerPortion: 180, portionUnit: '1 coxa com sobrecoxa (180g)' },
  { id: 'borrego', name: 'Carne de Borrego do Pasto (Pá)', category: 'Carnes e Aves', calories: 240, protein: 20.0, carbs: 0.0, fat: 17.5, fiber: 0.0, defaultGramsPerPortion: 180, portionUnit: '1 porção de ensopado (180g)' },
  { id: 'chourico-carne', name: 'Chouriço de Carne Tradicional', category: 'Charcutaria', calories: 380, protein: 21.0, carbs: 1.5, fat: 32.0, fiber: 0.0, defaultGramsPerPortion: 50, portionUnit: '5 rodelas grossas (50g)' },
  { id: 'morcela', name: 'Morcela / Chouriço de Sangue', category: 'Charcutaria', calories: 375, protein: 14.0, carbs: 3.0, fat: 34.0, fiber: 0.0, defaultGramsPerPortion: 60, portionUnit: '3 rodelas (60g)' },
  { id: 'entrecosto-fumado', name: 'Entrecosto Fumado na Lenha', category: 'Carnes e Aves', calories: 310, protein: 18.0, carbs: 0.0, fat: 26.0, fiber: 0.0, defaultGramsPerPortion: 120, portionUnit: '1 pedaço com osso (120g)' },
  
  // Peixes e Ovos
  { id: 'pescada', name: 'Pescada Branca Fresca da Costa', category: 'Peixes', calories: 84, protein: 18.2, carbs: 0.0, fat: 1.2, fiber: 0.0, defaultGramsPerPortion: 160, portionUnit: '1 posta média (160g)' },
  { id: 'bacalhau', name: 'Bacalhau Demolhado Tradicional', category: 'Peixes', calories: 105, protein: 23.0, carbs: 0.0, fat: 0.8, fiber: 0.0, defaultGramsPerPortion: 180, portionUnit: '1 posta demolhada (180g)' },
  { id: 'ovo', name: 'Ovo de Galinha do Monte (Classe M/L)', category: 'Lacticínios e Ovos', calories: 143, protein: 12.6, carbs: 0.7, fat: 9.5, fiber: 0.0, defaultGramsPerPortion: 55, portionUnit: '1 ovo inteiro (55g)' },

  // Tubérculos, Legumes e Hortícolas
  { id: 'batata', name: 'Batata Nova (Cozida com casca)', category: 'Hortícolas e Raízes', calories: 77, protein: 2.0, carbs: 17.5, fat: 0.1, fiber: 2.1, defaultGramsPerPortion: 150, portionUnit: '1 batata média (150g)' },
  { id: 'cogumelos', name: 'Cogumelos Frescos (Paris / Cremini)', category: 'Hortícolas e Raízes', calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3, fiber: 1.0, defaultGramsPerPortion: 100, portionUnit: '1 chávena laminada (100g)' },
  { id: 'cebola', name: 'Cebola Fresca', category: 'Hortícolas e Raízes', calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fiber: 1.7, defaultGramsPerPortion: 80, portionUnit: '1 cebola média (80g)' },
  { id: 'cenoura', name: 'Cenoura Fresca da Horta', category: 'Hortícolas e Raízes', calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2, fiber: 2.8, defaultGramsPerPortion: 100, portionUnit: '1 cenoura média (100g)' },
  { id: 'couve-lombarda', name: 'Couve-lombarda da Aldeia', category: 'Hortícolas e Raízes', calories: 27, protein: 2.0, carbs: 4.5, fat: 0.2, fiber: 3.1, defaultGramsPerPortion: 120, portionUnit: '1 tigela ripada (120g)' },
  { id: 'feijao-encarnado', name: 'Feijão Encarnado Cozido', category: 'Leguminosas', calories: 127, protein: 8.7, carbs: 22.8, fat: 0.5, fiber: 6.4, defaultGramsPerPortion: 160, portionUnit: '1 concha funda (160g)' },

  // Frutas de Conserva e Pomar
  { id: 'marmelo', name: 'Marmelo Fresco Dourado', category: 'Frutas', calories: 57, protein: 0.4, carbs: 15.3, fat: 0.1, fiber: 1.9, defaultGramsPerPortion: 150, portionUnit: '1 marmelo médio (150g)' },
  { id: 'compota-marmelo', name: 'Compota / Marmelada de Marmelo', category: 'Doces e Conservas', calories: 270, protein: 0.3, carbs: 67.0, fat: 0.1, fiber: 1.5, defaultGramsPerPortion: 35, portionUnit: '1 colher de sopa farta (35g)' },
  { id: 'figo', name: 'Figo Pingo de Mel Fresco', category: 'Frutas', calories: 74, protein: 0.8, carbs: 19.2, fat: 0.3, fiber: 2.9, defaultGramsPerPortion: 60, portionUnit: '1 figo médio (60g)' },
  { id: 'maca-esmolfe', name: 'Maçã Bravo de Esmolfe', category: 'Frutas', calories: 52, protein: 0.3, carbs: 13.8, fat: 0.2, fiber: 2.4, defaultGramsPerPortion: 140, portionUnit: '1 maçã média (140g)' },
  { id: 'laranja', name: 'Laranja de Setúbal Sumarenta', category: 'Frutas', calories: 47, protein: 0.9, carbs: 11.8, fat: 0.1, fiber: 2.4, defaultGramsPerPortion: 160, portionUnit: '1 laranja média descascada (160g)' },
  { id: 'amoras', name: 'Amoras Silvestres da Ribeira', category: 'Frutas', calories: 43, protein: 1.4, carbs: 9.6, fat: 0.5, fiber: 5.3, defaultGramsPerPortion: 80, portionUnit: '1 punhado generoso (80g)' },

  // Lacticínios, Gorduras e Farinhas
  { id: 'manteiga', name: 'Manteiga Tradicional com Sal', category: 'Lacticínios e Gorduras', calories: 717, protein: 0.8, carbs: 0.1, fat: 81.0, fiber: 0.0, defaultGramsPerPortion: 15, portionUnit: '1 noz / colher de sopa (15g)' },
  { id: 'azeite', name: 'Azeite Virgem Extra de Lagar', category: 'Lacticínios e Gorduras', calories: 884, protein: 0.0, carbs: 0.0, fat: 100.0, fiber: 0.0, defaultGramsPerPortion: 13, portionUnit: '1 colher de sopa rasa (13g)' },
  { id: 'farinha-trigo', name: 'Farinha de Trigo T65 Rústica', category: 'Cereais e Farinhas', calories: 364, protein: 10.3, carbs: 76.3, fat: 1.0, fiber: 2.7, defaultGramsPerPortion: 40, portionUnit: '2 colheres de sopa cheias (40g)' },
  { id: 'pao-ralado', name: 'Pão Ralado Caseiro / Migalhas', category: 'Cereais e Farinhas', calories: 395, protein: 13.0, carbs: 72.0, fat: 5.0, fiber: 4.5, defaultGramsPerPortion: 30, portionUnit: '2 colheres de sopa (30g)' },
  { id: 'pao-alentejano', name: 'Pão Alentejano de Trigo', category: 'Cereais e Farinhas', calories: 265, protein: 8.5, carbs: 54.0, fat: 1.2, fiber: 3.5, defaultGramsPerPortion: 50, portionUnit: '1 fatia média (50g)' },
  { id: 'queijo-ovelha', name: 'Queijo de Ovelha Curado da Serra', category: 'Lacticínios e Ovos', calories: 380, protein: 24.0, carbs: 1.0, fat: 31.0, fiber: 0.0, defaultGramsPerPortion: 40, portionUnit: '1 fatia / cunha pequena (40g)' },
  { id: 'vinho-porto', name: 'Vinho do Porto Tawny de Reserva', category: 'Adega', calories: 155, protein: 0.2, carbs: 12.0, fat: 0.0, fiber: 0.0, defaultGramsPerPortion: 60, portionUnit: '1 cálice de sobremesa (60ml)' },
];

/**
 * Tabela de conversão de medidas culinárias tradicionais da avó para gramas
 */
export const HOUSEHOLD_MEASUREMENTS_CONVERTER: Record<string, number> = {
  'colher de café': 2,
  'colher de chá': 5,
  'colher de sobremesa': 10,
  'colher de sopa': 15,
  'colher de sopa cheia': 20,
  'noz de manteiga': 15,
  'chávena de chá': 150,
  'chávena almoçadeira': 240,
  'copo de água': 200,
  'cálice de licor / porto': 60,
  'pitada generosa': 2,
  'fatia média': 50,
  'posta média': 160,
  'unidade média': 120,
};

/**
 * Calcula calorias e macronutrientes para um dado alimento e gramas
 */
export function calculateNutrientsForGrams(item: FoodCompositionItem, grams: number) {
  const factor = grams / 100;
  return {
    calories: Math.round(item.calories * factor),
    protein: Math.round(item.protein * factor * 10) / 10,
    carbs: Math.round(item.carbs * factor * 10) / 10,
    fat: Math.round(item.fat * factor * 10) / 10,
    fiber: Math.round(item.fiber * factor * 10) / 10,
  };
}
