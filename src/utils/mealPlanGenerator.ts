/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Recipe, CalorieGoalType, MarketSectionKey } from '../types/cookbook';
import { CANONICAL_RECIPES } from '../data/canonicalRecipes';

export interface PlannedDish {
  id: string;
  dishName: string;
  recipeId?: string;
  category: 'aves' | 'peixes' | 'carnes' | 'sopas' | 'vegetariano' | 'pequeno-almoco' | 'doces';
  mealType: 'breakfast' | 'lunch' | 'dinner';
  sideDish?: string;
  winePairing?: string;
  comfortSoup?: string;
  sweetTreat?: string;
  sweetTreatRecipeId?: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mainIngredients: string[];
  matchedIngredients?: string[];
  recipePayload?: Recipe;
  description: string;
}

export interface DayPlan {
  dayNumber: number; // 1 to 7
  dayOfWeek: string;
  breakfast: PlannedDish;
  lunch: PlannedDish;
  dinner: PlannedDish;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  pantryTip: string;
  prepAheadNotice?: string;
}

export interface SmartGroceryItem {
  id: string;
  name: string;
  amount: string;
  section: MarketSectionKey;
  sourceDishes: string[];
  isChecked: boolean;
}

export const POPULAR_CHIP_INGREDIENTS = [
  'Frango',
  'Peixe',
  'Bacalhau',
  'Batata',
  'Cogumelos',
  'Arroz',
  'Ovos',
  'Espinafres',
  'Tomate',
  'Cenoura',
  'Carne',
  'Feijão',
  'Maçã'
];

// Base canónica e expandida de pratos tradicionais portugueses e caseiros
export const DISH_DATABASE: PlannedDish[] = [
  // --- PEQUENOS-ALMOÇOS & FRUTAS ---
  {
    id: 'b-aveia-maca',
    dishName: 'Papas de Aveia com Maçã Bravo de Esmolfe e Canela',
    category: 'pequeno-almoco',
    mealType: 'breakfast',
    calories: 280,
    protein: 11,
    carbs: 48,
    fat: 5,
    mainIngredients: ['Maçã', 'Aveia', 'Canela'],
    description: 'Aveia cremosa cozida com leite de amêndoa, rodelas de maçã da serra douradas e canela em pó.',
    sideDish: 'Chá preto com casca de laranja',
    recipePayload: {
      id: 'papas-aveia-maca',
      slug: 'papas-aveia-maca',
      title: 'Papas de Aveia com Maçã Bravo de Esmolfe e Canela',
      originalTitle: 'Traditional Spiced Apple Porridge',
      subtitle: 'Energia matinal da horta com maçãs perfumadas da Beira Alta',
      category: 'doces',
      prepTimeMinutes: 5,
      cookTimeMinutes: 10,
      servings: 2,
      difficulty: 'Fácil',
      difficultyLevel: 'Fácil',
      dropCapLetter: 'A',
      historicalNote: 'Receita tradicional dos dias frios de outono, onde as maçãs caídas do pomar enriqueciam as papas de cereais da manhã.',
      pantrySecret: 'Adicione uma noz de manteiga no fim da cozedura para dar aveludado e brilho às papas.',
      tags: ['Pequeno-Almoço', 'Maçã', 'Canela', 'Aveia'],
      area: 'Portuguese',
      nutrition: { calories: 280, protein: 11, carbs: 48, fat: 5, servingSize: '1 taça (250g)' },
      originalSourceTitle: 'Receituário Tradicional da Beira',
      originalSourceUrl: 'https://pt.wikipedia.org/wiki/Ma%C3%A7%C3%A3_Bravo_de_Esmolfe',
      ingredients: [
        { item: 'Flocos de aveia integrais', amount: '100g' },
        { item: 'Leite gordo ou bebida vegetal', amount: '400ml' },
        { item: 'Maçã Bravo de Esmolfe fatiada', amount: '2 unidades' },
        { item: 'Canela de Ceilão em pó', amount: '1 colher de chá' },
        { item: 'Mel de rosmaninho', amount: '1 colher de sopa' }
      ],
      steps: [
        { stepNumber: 1, portugueseText: 'Coloque a aveia e o leite num tacho pequeno e leve ao lume médio, mexendo suavemente até engrossar.' },
        { stepNumber: 2, portugueseText: 'Numa frigideira com uma ponta de manteiga, salteie as fatias de maçã com a canela até caramelizarem levemente.' },
        { stepNumber: 3, portugueseText: 'Sirva as papas quentes na taça, decore com a maçã dourada e regue com um fio de mel de rosmaninho.' }
      ]
    }
  },
  {
    id: 'b-pao-compota-queijo',
    dishName: 'Pão Rústico de Centeio com Compota de Marmelo e Queijo Fresco',
    category: 'pequeno-almoco',
    mealType: 'breakfast',
    calories: 310,
    protein: 14,
    carbs: 45,
    fat: 8,
    mainIngredients: ['Pão', 'Queijo', 'Marmelo'],
    description: 'Fatias estaladiças de pão de forno de lenha com queijo fresco do dia e compota real.',
    sideDish: 'Café de filtro com leite vaporizado'
  },
  {
    id: 'b-ovos-escalfados-tomate',
    dishName: 'Torrada de Pão Alentejano com Ovos Mexidos e Tomate Grelhado',
    category: 'pequeno-almoco',
    mealType: 'breakfast',
    calories: 340,
    protein: 18,
    carbs: 32,
    fat: 16,
    mainIngredients: ['Ovos', 'Tomate', 'Pão'],
    description: 'Ovos do campo fofos com ervas finas e tomate rama caramelizado em azeite de lagar.',
    sideDish: 'Sumo de laranja do Algarve acabado de espremer'
  },
  {
    id: 'b-iogurte-nozes-pera',
    dishName: 'Tigela da Herdade: Iogurte Grego, Pêra Rocha Assada e Nozes',
    category: 'pequeno-almoco',
    mealType: 'breakfast',
    calories: 270,
    protein: 15,
    carbs: 28,
    fat: 11,
    mainIngredients: ['Pêra', 'Nozes', 'Iogurte'],
    description: 'Iogurte espesso com pedaços tépidos de pêra rocha assada no forno com pau de canela e nozes estaladiças.',
    sideDish: 'Infusão de cidreira e hortelã'
  },
  {
    id: 'b-salada-frutas-hortela',
    dishName: 'Salada de Frutas de Pomar com Hortelã e Sementes de Abóbora',
    category: 'pequeno-almoco',
    mealType: 'breakfast',
    calories: 210,
    protein: 6,
    carbs: 40,
    fat: 4,
    mainIngredients: ['Maçã', 'Laranja', 'Hortelã'],
    description: 'Cubes frescos de maçã, laranja e bagas silvestres com folhas de hortelã fresca e sementes tostadas.',
    sideDish: 'Chá verde com limão'
  },

  // --- ALMOÇOS DE TRADIÇÃO ---
  {
    id: 'l-chicken-hotpot',
    dishName: 'Chicken & Mushroom Hotpot (Caçarola de Frango e Cogumelos)',
    recipeId: 'chicken-mushroom-hotpot',
    category: 'aves',
    mealType: 'lunch',
    calories: 520,
    protein: 42,
    carbs: 40,
    fat: 20,
    mainIngredients: ['Frango', 'Cogumelos', 'Batata'],
    description: 'Frango tenro desfiado em molho de roux aveludado com cogumelos cremini, coroado com rodelas de batata estaladiça.',
    sideDish: 'Salada de agrião da ribeira com azeite e vinagre de sidra',
    winePairing: 'Vinho Branco Encorpado de Trás-os-Montes',
    recipePayload: CANONICAL_RECIPES.find((r) => r.id === 'chicken-mushroom-hotpot')
  },
  {
    id: 'l-fish-croquettes',
    dishName: 'Croquetes de Peixe Especiados com Batata e Ervas',
    recipeId: 'fish-cutlets-croquettes',
    category: 'peixes',
    mealType: 'lunch',
    calories: 490,
    protein: 36,
    carbs: 46,
    fat: 17,
    mainIngredients: ['Peixe', 'Batata', 'Ovos'],
    description: 'Peixe branco desfiado com batata esmagada e especiarias, envolto em pão ralado estaladiço e frito até dourar.',
    sideDish: 'Arroz malandrinho de tomate e pimentos com coentros',
    winePairing: 'Vinho Verde Loureiro bem fresco',
    recipePayload: CANONICAL_RECIPES.find((r) => r.id === 'fish-cutlets-croquettes')
  },
  {
    id: 'l-sopa-da-pedra',
    dishName: 'Sopa da Pedra do Alentejo (Receita Canónica Antiga)',
    recipeId: 'sopa-da-pedra-alentejana',
    category: 'carnes',
    mealType: 'lunch',
    calories: 560,
    protein: 38,
    carbs: 48,
    fat: 24,
    mainIngredients: ['Feijão', 'Batata', 'Cenoura', 'Carne'],
    description: 'Pote lendário de barro com feijão encarnado apurado, carnes ricas, chouriço de sangue e legumes da horta.',
    sideDish: 'Fatias de broa de milho fatiada e azeitonas britadas',
    winePairing: 'Vinho Tinto Alentejano com estágio em carvalho',
    recipePayload: CANONICAL_RECIPES.find((r) => r.id === 'sopa-da-pedra-alentejana')
  },
  {
    id: 'l-ensopado-borrego',
    dishName: 'Ensopado de Borrego do Solar com Hortelã Fresca',
    recipeId: 'ensopado-borrego-hortela',
    category: 'carnes',
    mealType: 'lunch',
    calories: 580,
    protein: 44,
    carbs: 34,
    fat: 29,
    mainIngredients: ['Carne', 'Pão', 'Hortelã'],
    description: 'Borrego estufado lentamente com marinada rica em vinho branco, servido sobre fatias de pão dourado em azeite.',
    sideDish: 'Fatias de pão de trigo alentejano frito em azeite de lagar',
    winePairing: 'Vinho Tinto Reserva do Douro ou Alentejo',
    recipePayload: CANONICAL_RECIPES.find((r) => r.id === 'ensopado-borrego-hortela')
  },
  {
    id: 'l-bacalhau-bras',
    dishName: 'Bacalhau à Brás Tradicional com Batata Palha Dourada e Ovos',
    category: 'peixes',
    mealType: 'lunch',
    calories: 540,
    protein: 41,
    carbs: 38,
    fat: 24,
    mainIngredients: ['Bacalhau', 'Batata', 'Ovos'],
    description: 'Lascados finos de bacalhau refogados em azeite e cebola, envolvidos com batata palha estaladiça e ovos cremosos.',
    sideDish: 'Azeitonas pretas galegas e salsa fresca picada',
    winePairing: 'Vinho Branco do Dão Encruzado',
    recipePayload: {
      id: 'bacalhau-a-bras-tradicional',
      slug: 'bacalhau-a-bras-tradicional',
      title: 'Bacalhau à Brás Tradicional da Baixa Pombalina',
      originalTitle: 'Traditional Lisbon Bacalhau à Brás',
      subtitle: 'A cremosidade perfeita do ovo ligado sem secar e o estaladiço da batata',
      category: 'peixes',
      prepTimeMinutes: 20,
      cookTimeMinutes: 20,
      servings: 4,
      difficulty: 'Médio',
      difficultyLevel: 'Médio',
      dropCapLetter: 'O',
      historicalNote: 'Criado pelo taberneiro Brás no Bairro Alto de Lisboa no final do século XIX, tornou-se num dos maiores tesouros do receituário português.',
      pantrySecret: 'Retire a frigideira do lume antes de juntar os ovos batidos: o calor residual da frigideira cozinha o ovo mantendo-o aveludado e brilhante.',
      tags: ['Bacalhau', 'Ovos', 'Batata Palha', 'Lisboa Clássica'],
      area: 'Portuguese',
      nutrition: { calories: 540, protein: 41, carbs: 38, fat: 24, servingSize: '1 prato fundo (350g)' },
      originalSourceTitle: 'Cozinha Tradicional de Lisboa',
      originalSourceUrl: 'https://pt.wikipedia.org/wiki/Bacalhau_%C3%A0_Br%C3%A1s',
      ingredients: [
        { item: 'Bacalhau demolhado e desfiado em lascas', amount: '400g' },
        { item: 'Batatas cortadas em palha fina', amount: '400g' },
        { item: 'Cebolas médias fatiadas em meias-luas finas', amount: '2 unidades' },
        { item: 'Dentes de alho picados', amount: '3 dentes' },
        { item: 'Ovos do campo batidos com uma pitada de sal', amount: '5 unidades' },
        { item: 'Azeite virgem extra de lagar', amount: '60ml' },
        { item: 'Azeitonas pretas e salsa picada', amount: 'A gosto' }
      ],
      steps: [
        { stepNumber: 1, portugueseText: 'Frite as batatas em óleo bem quente até ficarem louras e crocantes. Escorra em papel absorvente e reserve.' },
        { stepNumber: 2, portugueseText: 'Num tacho largo com o azeite, refogue a cebola e o alho em lume brando até a cebola ficar transparente sem queimar.' },
        { stepNumber: 3, portugueseText: 'Junte o bacalhau desfiado e envolva bem durante 3 a 4 minutos para ganhar os sabores do refogado.' },
        { stepNumber: 4, portugueseText: 'Adicione a batata palha e misture delicadamente. Apague o lume, verta os ovos batidos e mexa continuamente com colher de pau até obter um creme sedoso.' },
        { stepNumber: 5, portugueseText: 'Polvilhe imediatamente com salsa picada e decore com azeitonas pretas. Sirva quente.' }
      ]
    }
  },
  {
    id: 'l-arroz-frango-forno',
    dishName: 'Arroz de Frango no Forno com Chouriço de Portalegre',
    category: 'aves',
    mealType: 'lunch',
    calories: 510,
    protein: 39,
    carbs: 52,
    fat: 16,
    mainIngredients: ['Frango', 'Arroz', 'Cenoura'],
    description: 'Arroz agulha cozido no caldo apurado do frango, tostado no forno com rodelas de chouriço tradicional.',
    sideDish: 'Salada de couve-coração ripada com azeite e alho',
    winePairing: 'Vinho Tinto do Dão Elegante'
  },
  {
    id: 'l-caldeirada-peixes',
    dishName: 'Caldeirada Rica de Peixes da Costa com Batata e Tomate',
    category: 'peixes',
    mealType: 'lunch',
    calories: 470,
    protein: 43,
    carbs: 39,
    fat: 14,
    mainIngredients: ['Peixe', 'Batata', 'Tomate'],
    description: 'Camadas generosas de peixes brancos frescos, batatas às rodelas, cebola, tomate maduro e pimentos em azeite de lagar.',
    sideDish: 'Fatias de pão rústico torradas para ensopar no caldo',
    winePairing: 'Vinho Branco da Região de Setúbal'
  },
  {
    id: 'l-arroz-cogumelos-espinafres',
    dishName: 'Arroz Cremoso de Cogumelos Silvestres com Espinafres',
    category: 'vegetariano',
    mealType: 'lunch',
    calories: 430,
    protein: 16,
    carbs: 62,
    fat: 12,
    mainIngredients: ['Cogumelos', 'Arroz', 'Espinafres'],
    description: 'Arroz carolino aveludado salteado com cogumelos frescos, alho francês e folhas tenras de espinafre.',
    sideDish: 'Salada de nozes e fatias finas de maçã ácida',
    winePairing: 'Vinho Branco Maduro do Alentejo'
  },

  // --- JANTARES & CEIAS CONFORTÁVEIS ---
  {
    id: 'd-tortilha-batata-espinafres',
    dishName: 'Tortilha de Batata Nova e Espinafres com Queijo Curado',
    category: 'vegetariano',
    mealType: 'dinner',
    calories: 390,
    protein: 20,
    carbs: 32,
    fat: 19,
    mainIngredients: ['Batata', 'Espinafres', 'Ovos'],
    description: 'Tortilha alta e macia com cubos de batata salteada, espinafres da horta e queijo de cabra derretido.',
    comfortSoup: 'Creme de cenoura da horta com gengibre fresco',
    sweetTreat: 'Maçã Bravo de Esmolfe assada com canela e noz',
    sweetTreatRecipeId: 'tarte-maca-bravo-esmolfe'
  },
  {
    id: 'd-ovos-escalfados-tomatada',
    dishName: 'Ovos Escalfados em Tomatada Rústica com Pimentos e Hortelã',
    category: 'vegetariano',
    mealType: 'dinner',
    calories: 370,
    protein: 18,
    carbs: 26,
    fat: 21,
    mainIngredients: ['Ovos', 'Tomate', 'Hortelã'],
    description: 'Ovos cozinhados no vapor de um refogado apurado de tomate maduro, cebola doce, pimentos e aroma de hortelã.',
    comfortSoup: 'Sopa aveludada de abóbora com sementes tostadas',
    sweetTreat: 'Tigela de marmelada caseira com lascas de queijo curado'
  },
  {
    id: 'd-pataniscas-bacalhau',
    dishName: 'Pataniscas Douradas de Bacalhau da Despensa',
    category: 'peixes',
    mealType: 'dinner',
    calories: 420,
    protein: 28,
    carbs: 34,
    fat: 18,
    mainIngredients: ['Bacalhau', 'Ovos', 'Arroz'],
    description: 'Pataniscas leves e arejadas com bacalhau lascado, cebola e salsa, servidas com arroz de feijão malandrinho.',
    comfortSoup: 'Caldo verde da aldeia com rodela de chouriço',
    sweetTreat: 'Tarte clássica de Maçã Bravo de Esmolfe com Canela',
    sweetTreatRecipeId: 'tarte-maca-bravo-esmolfe'
  },
  {
    id: 'd-canja-galinha-hortela',
    dishName: 'Canja de Galinha do Campo com Arroz Carolino e Hortelã',
    category: 'aves',
    mealType: 'dinner',
    calories: 360,
    protein: 30,
    carbs: 32,
    fat: 11,
    mainIngredients: ['Frango', 'Arroz', 'Hortelã'],
    description: 'Caldo reconfortante de galinha do campo apurado com miúdos, arroz carolino e farto ramo de hortelã fresca.',
    comfortSoup: 'O próprio caldo rico da canja',
    sweetTreat: 'Biscoitos caseiros de canela com chá de camomila'
  },
  {
    id: 'd-pescada-cozida-coentros',
    dishName: 'Pescada à Antiga com Batatas Cozidas e Molho de Coentros',
    category: 'peixes',
    mealType: 'dinner',
    calories: 380,
    protein: 35,
    carbs: 34,
    fat: 10,
    mainIngredients: ['Peixe', 'Batata', 'Cenoura'],
    description: 'Postas de pescada fresca cozidas com batatas novas e cenoura, regadas com azeite virgem cru e coentros frescos.',
    comfortSoup: 'Sopa de alho-francês e abóbora menina',
    sweetTreat: 'Pêra rocha cozida em calda ligeira com casca de limão'
  },
  {
    id: 'd-feijoada-cogumelos',
    dishName: 'Feijoada de Cogumelos e Legumes da Horta da Avó',
    category: 'vegetariano',
    mealType: 'dinner',
    calories: 410,
    protein: 19,
    carbs: 56,
    fat: 11,
    mainIngredients: ['Cogumelos', 'Feijão', 'Cenoura', 'Tomate'],
    description: 'Feijão manteiga estufado com cogumelos frescos, couve-lombarda, cenoura e refogado perfumado com louro.',
    comfortSoup: 'Caldo ligeiro de legumes com hortelã',
    sweetTreat: 'Fatia de pão rústico com Compota Real de Marmelo',
    sweetTreatRecipeId: 'compota-marmelo-vinho-porto'
  },
  {
    id: 'd-frango-pucara-cenoura',
    dishName: 'Frango na Púcara com Cogumelos e Cenouras Caramelizadas',
    category: 'aves',
    mealType: 'dinner',
    calories: 440,
    protein: 38,
    carbs: 28,
    fat: 17,
    mainIngredients: ['Frango', 'Cogumelos', 'Cenoura'],
    description: 'Pedaços de frango cozinhados em pote de barro com cebolinhas, cenouras, cogumelos e cálice de vinho generoso.',
    comfortSoup: 'Creme de ervilhas com hortelã fresca',
    sweetTreat: 'Pêra bêbeda em vinho do Porto com canela'
  }
];

export const DAYS_OF_WEEK = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
  'Domingo'
];

export const PANTRY_TIPS_BY_DAY = [
  'Aproveite as aparas e carcaça do frango do almoço para preparar um caldo dourado e congelar.',
  'Se sobrarem croquetes ou pastéis, guarde em papel vegetal e reaqueça no forno a 180°C.',
  'O feijão e os guisados ganham profundidade e apuro no dia seguinte ao descansar no tacho de barro.',
  'A gordura aromática libertada pelos enchidos ao selar é ideal para refogar os legumes do jantar.',
  'Ao cozer legumes verdes como couves ou espinafres, use sempre água abundante já a ferver e tacho destapado para fixar a clorofila.',
  'Em dias de cozinhados lentos, use um difusor sob o tacho de ferro fundido para manter calor suave sem queimar o fundo.',
  'O domingo é o dia tradicional de reunir a despensa, rotular compotas caseiras e preparar a semana gastronómica.'
];

export const PREP_NOTICES_BY_DAY = [
  'Demolhar as leguminosas em água fresca de véspera para acelerar a cozedura.',
  'Temperar os peixes e carnes com alho e sal marinho 2 horas antes de cozinhar.',
  'Verificar a esterilização dos frascos de compota e fechar as tampas a vácuo.',
  'Descongelar gradualmente no frigorífico os ingredientes frescos do dia seguinte.',
  'Colocar as carnes da marinada de vinho branco e louro para ganhar aroma profundo.',
  'Separar ervas aromáticas frescas (coentros, hortelã e salsa) em copos com água limpa.',
  'Planear a lista de compras para a feira ou mercearia com os ingredientes em falta.'
];

/**
 * Calcula a correspondência de um prato com os ingredientes selecionados pelo utilizador
 */
export function matchIngredients(dish: PlannedDish, userIngredients: string[]): string[] {
  if (!userIngredients || userIngredients.length === 0) return [];
  const normalizedUser = userIngredients.map((i) => i.trim().toLowerCase());
  return dish.mainIngredients.filter((dishIng) =>
    normalizedUser.some((uIng) => dishIng.toLowerCase().includes(uIng) || uIng.includes(dishIng.toLowerCase()))
  );
}

/**
 * Algoritmo Canónico de Geração de Ementa Semanal da Avó
 */
export function generateWeeklyMealPlan(
  selectedIngredients: string[],
  goalType: CalorieGoalType,
  servings: number = 4
): DayPlan[] {
  // Ajuste do alvo calórico pelo objetivo
  const calorieMultiplier = goalType === 'defice' ? 0.82 : goalType === 'ganho' ? 1.22 : 1.0;

  const breakfastPool = DISH_DATABASE.filter((d) => d.mealType === 'breakfast');
  const lunchPool = DISH_DATABASE.filter((d) => d.mealType === 'lunch');
  const dinnerPool = DISH_DATABASE.filter((d) => d.mealType === 'dinner');

  // Ordena os pratos dando prioridade aos que contêm os ingredientes escolhidos pelo utilizador
  const scoreDish = (dish: PlannedDish) => {
    const matches = matchIngredients(dish, selectedIngredients);
    return matches.length * 10;
  };

  const sortedLunches = [...lunchPool].sort((a, b) => scoreDish(b) - scoreDish(a));
  const sortedDinners = [...dinnerPool].sort((a, b) => scoreDish(b) - scoreDish(a));
  const sortedBreakfasts = [...breakfastPool].sort((a, b) => scoreDish(b) - scoreDish(a));

  const plan: DayPlan[] = [];

  for (let i = 0; i < 7; i++) {
    const dayOfWeek = DAYS_OF_WEEK[i];
    const dayNumber = i + 1;

    // Rotação equilibrada de pratos sem repetição imediata
    const rawLunch = sortedLunches[i % sortedLunches.length];
    const rawDinner = sortedDinners[i % sortedDinners.length];
    const rawBreakfast = sortedBreakfasts[i % sortedBreakfasts.length];

    const lunch: PlannedDish = {
      ...rawLunch,
      matchedIngredients: matchIngredients(rawLunch, selectedIngredients),
      calories: Math.round(rawLunch.calories * calorieMultiplier),
      protein: Math.round(rawLunch.protein * calorieMultiplier),
      carbs: Math.round(rawLunch.carbs * calorieMultiplier),
      fat: Math.round(rawLunch.fat * calorieMultiplier)
    };

    const dinner: PlannedDish = {
      ...rawDinner,
      matchedIngredients: matchIngredients(rawDinner, selectedIngredients),
      calories: Math.round(rawDinner.calories * calorieMultiplier),
      protein: Math.round(rawDinner.protein * calorieMultiplier),
      carbs: Math.round(rawDinner.carbs * calorieMultiplier),
      fat: Math.round(rawDinner.fat * calorieMultiplier)
    };

    const breakfast: PlannedDish = {
      ...rawBreakfast,
      matchedIngredients: matchIngredients(rawBreakfast, selectedIngredients),
      calories: Math.round(rawBreakfast.calories * calorieMultiplier),
      protein: Math.round(rawBreakfast.protein * calorieMultiplier),
      carbs: Math.round(rawBreakfast.carbs * calorieMultiplier),
      fat: Math.round(rawBreakfast.fat * calorieMultiplier)
    };

    const totalCalories = breakfast.calories + lunch.calories + dinner.calories;
    const totalProtein = breakfast.protein + lunch.protein + dinner.protein;
    const totalCarbs = breakfast.carbs + lunch.carbs + dinner.carbs;
    const totalFat = breakfast.fat + lunch.fat + dinner.fat;

    plan.push({
      dayNumber,
      dayOfWeek,
      breakfast,
      lunch,
      dinner,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
      pantryTip: PANTRY_TIPS_BY_DAY[i],
      prepAheadNotice: PREP_NOTICES_BY_DAY[i]
    });
  }

  return plan;
}

/**
 * Troca um prato específico do dia por outro prato alternativo compatível
 */
export function swapMealInPlan(
  currentPlan: DayPlan[],
  dayIndex: number,
  mealType: 'breakfast' | 'lunch' | 'dinner',
  selectedIngredients: string[],
  goalType: CalorieGoalType
): DayPlan[] {
  const calorieMultiplier = goalType === 'defice' ? 0.82 : goalType === 'ganho' ? 1.22 : 1.0;
  const pool = DISH_DATABASE.filter((d) => d.mealType === mealType);
  const currentDishId = currentPlan[dayIndex][mealType].id;

  // Encontra opções diferentes da atual
  const alternatives = pool.filter((d) => d.id !== currentDishId);
  if (alternatives.length === 0) return currentPlan;

  // Dá preferência a uma que contenha ingredientes selecionados
  alternatives.sort((a, b) => matchIngredients(b, selectedIngredients).length - matchIngredients(a, selectedIngredients).length);
  const chosen = alternatives[0];

  const updatedDish: PlannedDish = {
    ...chosen,
    matchedIngredients: matchIngredients(chosen, selectedIngredients),
    calories: Math.round(chosen.calories * calorieMultiplier),
    protein: Math.round(chosen.protein * calorieMultiplier),
    carbs: Math.round(chosen.carbs * calorieMultiplier),
    fat: Math.round(chosen.fat * calorieMultiplier)
  };

  const updatedPlan = [...currentPlan];
  const targetDay = { ...updatedPlan[dayIndex], [mealType]: updatedDish };

  targetDay.totalCalories = targetDay.breakfast.calories + targetDay.lunch.calories + targetDay.dinner.calories;
  targetDay.totalProtein = targetDay.breakfast.protein + targetDay.lunch.protein + targetDay.dinner.protein;
  targetDay.totalCarbs = targetDay.breakfast.carbs + targetDay.lunch.carbs + targetDay.dinner.carbs;
  targetDay.totalFat = targetDay.breakfast.fat + targetDay.lunch.fat + targetDay.dinner.fat;

  updatedPlan[dayIndex] = targetDay;
  return updatedPlan;
}

/**
 * Constrói a lista inteligente de compras dividida em:
 * 1. Já tenho na Despensa (os ingredientes que o utilizador escolheu)
 * 2. Falta Comprar (os outros ingredientes agregados necessários)
 */
export function generateSmartGroceryLists(
  plan: DayPlan[],
  selectedIngredients: string[],
  servings: number = 4
): {
  alreadyInPantry: { name: string; isChecked: boolean }[];
  missingToBuy: SmartGroceryItem[];
} {
  const pantryList = selectedIngredients.map((item) => ({
    name: item,
    isChecked: true
  }));

  const itemsMap: Record<string, SmartGroceryItem> = {};

  // Extrai ingredientes necessários de todos os pratos planeados
  plan.forEach((day) => {
    [day.breakfast, day.lunch, day.dinner].forEach((dish) => {
      // Se tiver payload completo de receita
      if (dish.recipePayload && dish.recipePayload.ingredients) {
        dish.recipePayload.ingredients.forEach((ing) => {
          const key = ing.item.toLowerCase().trim();
          // Ignora se for exatamente um dos selecionados como despensa
          const isSelected = selectedIngredients.some((sel) =>
            key.includes(sel.toLowerCase()) || sel.toLowerCase().includes(key)
          );

          if (!isSelected) {
            if (!itemsMap[key]) {
              itemsMap[key] = {
                id: `smart-${key.replace(/\s+/g, '-')}`,
                name: ing.item,
                amount: ing.amount,
                section: determineSection(ing.item),
                sourceDishes: [dish.dishName],
                isChecked: false
              };
            } else if (!itemsMap[key].sourceDishes.includes(dish.dishName)) {
              itemsMap[key].sourceDishes.push(dish.dishName);
            }
          }
        });
      } else {
        // Usa os ingredientes principais do prato
        dish.mainIngredients.forEach((ing) => {
          const key = ing.toLowerCase().trim();
          const isSelected = selectedIngredients.some((sel) =>
            key.includes(sel.toLowerCase()) || sel.toLowerCase().includes(key)
          );

          if (!isSelected) {
            if (!itemsMap[key]) {
              itemsMap[key] = {
                id: `smart-${key.replace(/\s+/g, '-')}`,
                name: ing,
                amount: `${servings} doses`,
                section: determineSection(ing),
                sourceDishes: [dish.dishName],
                isChecked: false
              };
            } else if (!itemsMap[key].sourceDishes.includes(dish.dishName)) {
              itemsMap[key].sourceDishes.push(dish.dishName);
            }
          }
        });
      }
    });
  });

  // Acrescenta condimentos essenciais do compêndio caso não estejam
  const essentials = ['Azeite virgem extra de lagar', 'Sal marinho tradicional', 'Dentes de alho frescos', 'Cebolas da terra'];
  essentials.forEach((ess) => {
    const key = ess.toLowerCase();
    const isSelected = selectedIngredients.some((sel) =>
      key.includes(sel.toLowerCase()) || sel.toLowerCase().includes(key)
    );
    if (!isSelected && !itemsMap[key]) {
      itemsMap[key] = {
        id: `smart-${key.replace(/\s+/g, '-')}`,
        name: ess,
        amount: 'Q.b. da despensa',
        section: determineSection(ess),
        sourceDishes: ['Base de refogados da semana'],
        isChecked: false
      };
    }
  });

  const missingToBuy = Object.values(itemsMap);
  return {
    alreadyInPantry: pantryList,
    missingToBuy
  };
}

function determineSection(name: string): MarketSectionKey {
  const n = name.toLowerCase();
  if (n.includes('frango') || n.includes('carne') || n.includes('borrego') || n.includes('chouriço') || n.includes('morcela')) {
    return 'talho';
  }
  if (n.includes('peixe') || n.includes('bacalhau') || n.includes('pescada') || n.includes('marisco')) {
    return 'peixaria';
  }
  if (n.includes('ovo') || n.includes('leite') || n.includes('manteiga') || n.includes('queijo') || n.includes('iogurte')) {
    return 'lacticinios';
  }
  if (n.includes('batata') || n.includes('cenoura') || n.includes('cebola') || n.includes('alho') || n.includes('hortelã') || n.includes('coentro') || n.includes('espinafre') || n.includes('tomate') || n.includes('maçã') || n.includes('pera') || n.includes('laranja') || n.includes('legume')) {
    return 'hortifruti';
  }
  if (n.includes('arroz') || n.includes('farinha') || n.includes('feijão') || n.includes('açúcar') || n.includes('pão') || n.includes('aveia')) {
    return 'mercearia';
  }
  if (n.includes('canela') || n.includes('noz') || n.includes('cominho') || n.includes('especiaria')) {
    return 'especiarias';
  }
  if (n.includes('vinho') || n.includes('porto') || n.includes('frasco')) {
    return 'adega';
  }
  return 'condimentos';
}
