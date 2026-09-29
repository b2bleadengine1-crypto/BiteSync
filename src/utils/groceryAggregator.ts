import { DailyMealPlan, AggregatedGroceryItem, MarketSectionKey, MarketSectionMeta } from '../types/cookbook';
import { CANONICAL_RECIPES } from '../data/canonicalRecipes';

export const MARKET_SECTIONS: MarketSectionMeta[] = [
  {
    key: 'hortifruti',
    title: 'Hortifrúti, Ervas & Pomar',
    subtitle: 'Legumes da terra, batatas, cebolas, ervas frescas e fruta da época',
    badgeColor: '#2e6931',
    iconName: 'Carrot',
  },
  {
    key: 'talho',
    title: 'Talho & Fumeiro Tradicional',
    subtitle: 'Aves de capoeira, carnes de pasto e enchidos curados no fumeiro',
    badgeColor: '#8c2a3e',
    iconName: 'Beef',
  },
  {
    key: 'peixaria',
    title: 'Peixaria da Costa & Mariscos',
    subtitle: 'Pescada fresca, peixes brancos e bacalhau da cura tradicional',
    badgeColor: '#1d4ed8',
    iconName: 'Fish',
  },
  {
    key: 'lacticinios',
    title: 'Lacticínios & Ovos do Campo',
    subtitle: 'Manteiga artesanal, ovos de galinhas do monte e queijos curados',
    badgeColor: '#b45309',
    iconName: 'Egg',
  },
  {
    key: 'mercearia',
    title: 'Mercearia Fina & Farinhas',
    subtitle: 'Farinhas de moagem, leguminosas secas, arroz, pão e açúcar de cana',
    badgeColor: '#78350f',
    iconName: 'Wheat',
  },
  {
    key: 'condimentos',
    title: 'Azeites, Vinagres & Conservação',
    subtitle: 'Azeite virgem extra de lagar, vinagres de sidra e massa de pimentão',
    badgeColor: '#4d3223',
    iconName: 'Droplet',
  },
  {
    key: 'especiarias',
    title: 'Botica de Especiarias da Despensa',
    subtitle: 'Canela de Ceilão em pau, noz-moscada inteira, cominho e mostarda antiga',
    badgeColor: '#c59b27',
    iconName: 'Sparkles',
  },
  {
    key: 'adega',
    title: 'Adega & Frascos de Vidro',
    subtitle: 'Vinho do Porto de reserva, vinhos da refeição e frascos esterilizados',
    badgeColor: '#581c87',
    iconName: 'Wine',
  },
];

/**
 * Classifica um ingrediente na secção de mercado correta com base no seu nome e características
 */
export function classifyMarketSection(rawItemName: string): MarketSectionKey {
  const name = rawItemName.toLowerCase();

  // 1. Talho & Fumeiro
  if (
    name.includes('frango') ||
    name.includes('borrego') ||
    name.includes('entrecosto') ||
    name.includes('orelheira') ||
    name.includes('chouriço') ||
    name.includes('morcela') ||
    name.includes('toucinho') ||
    name.includes('carne') ||
    name.includes('costeleta')
  ) {
    return 'talho';
  }

  // 2. Peixaria
  if (
    name.includes('peixe') ||
    name.includes('pescada') ||
    name.includes('corvina') ||
    name.includes('bacalhau') ||
    name.includes('camarão') ||
    name.includes('salmão')
  ) {
    return 'peixaria';
  }

  // 3. Lacticínios & Ovos
  if (
    name.includes('manteiga') ||
    name.includes('ovo') ||
    name.includes('ovos') ||
    name.includes('queijo') ||
    name.includes('requeijão') ||
    name.includes('natas') ||
    name.includes('leite')
  ) {
    return 'lacticinios';
  }

  // 4. Hortifrúti, Legumes e Fruta
  if (
    name.includes('batata') ||
    name.includes('cebola') ||
    name.includes('alho') ||
    name.includes('cogumelo') ||
    name.includes('marmelo') ||
    name.includes('figo') ||
    name.includes('maçã') ||
    name.includes('limão') ||
    name.includes('hortelã') ||
    name.includes('coentro') ||
    name.includes('cenoura') ||
    name.includes('couve') ||
    name.includes('agrião') ||
    name.includes('espinafre') ||
    name.includes('tomate') ||
    name.includes('pimento') ||
    name.includes('grelos') ||
    name.includes('alecrim') ||
    name.includes('gengibre') ||
    name.includes('malagueta') ||
    name.includes('amora') ||
    name.includes('ameixa')
  ) {
    return 'hortifruti';
  }

  // 5. Adega
  if (
    name.includes('vinho') ||
    name.includes('porto') ||
    name.includes('aguardente') ||
    name.includes('frasco') ||
    name.includes('garrafa') ||
    name.includes('tampa') ||
    name.includes('ráfia') ||
    name.includes('juta')
  ) {
    return 'adega';
  }

  // 6. Azeites e Condimentos
  if (
    name.includes('azeite') ||
    name.includes('óleo') ||
    name.includes('vinagre') ||
    name.includes('pimentão doce') ||
    name.includes('massa de pimentão') ||
    name.includes('caldo de galinha')
  ) {
    return 'condimentos';
  }

  // 7. Especiarias
  if (
    name.includes('canela') ||
    name.includes('noz-moscada') ||
    name.includes('mostarda') ||
    name.includes('cominho') ||
    name.includes('pimenta') ||
    name.includes('sal marinho') ||
    name.includes('louro') ||
    name.includes('cravinho') ||
    name.includes('baunilha') ||
    name.includes('erva-doce')
  ) {
    return 'especiarias';
  }

  // 8. Mercearia Fina & Grãos (padrão)
  return 'mercearia';
}

/**
 * Ingredientes padrão para refeições sem receita canónica vinculada (receitas caseiras da semana)
 */
const HOMEMADE_MEALS_INGREDIENTS: Record<string, { item: string; amount: string }[]> = {
  'Caldo de Legumes da Horta com Feijão Verde e Hortelã': [
    { item: 'Feijão verde tenro em pedaços', amount: '300g' },
    { item: 'Batatas para caldo', amount: '400g' },
    { item: 'Cenouras frescas', amount: '2 unidades' },
    { item: 'Ramo de hortelã da horta', amount: '1 ramo' },
  ],
  'Tortilha de Batata e Espinafres com Queijo de Cabra': [
    { item: 'Ovos do campo frescos', amount: '6 unidades' },
    { item: 'Batatas novas em rodelas finas', amount: '500g' },
    { item: 'Folhas de espinafres frescos', amount: '200g' },
    { item: 'Queijo de cabra curado', amount: '100g' },
  ],
  'Arroz de Frango no Forno com Chouriço de Portalegre': [
    { item: 'Frango do campo em pedaços', amount: '800g' },
    { item: 'Arroz carolino tradicional', amount: '400g' },
    { item: 'Chouriço de Portalegre tradicional', amount: '1/2 unidade' },
    { item: 'Cebola média picada', amount: '1 unidade' },
    { item: 'Azeite virgem extra', amount: '50ml' },
  ],
  'Ovos Escalfados em Tomatada Rústica com Hortelã': [
    { item: 'Ovos do campo', amount: '4 unidades' },
    { item: 'Tomates maduros em pedaços', amount: '600g' },
    { item: 'Pimentos verdes', amount: '1 unidade' },
    { item: 'Cebola e alhos picados', amount: '1 cebola e 2 alhos' },
    { item: 'Hortelã da horta', amount: '1 molhinho' },
  ],
  'Pescada à Antiga com Batatinhas Novas e Molho de Coentros': [
    { item: 'Lombos de pescada fresca da costa', amount: '600g' },
    { item: 'Batatinhas novas para cozer', amount: '700g' },
    { item: 'Coentros frescos picados', amount: '1 molho generoso' },
    { item: 'Dentes de alho esmagados', amount: '4 dentes' },
  ],
  'Pataniscas Douradas de Bacalhau da Despensa': [
    { item: 'Bacalhau desfiado e demolhado', amount: '350g' },
    { item: 'Ovos de galinha do campo', amount: '4 unidades' },
    { item: 'Farinha de trigo T65', amount: '150g' },
    { item: 'Salsa fresca da horta picada', amount: '1 molho' },
  ],
};

/**
 * Função principal que agrega todos os ingredientes da Ementa Semanal,
 * permitindo filtrar por dias selecionados e multiplicador de comensais.
 */
export function aggregateWeeklyGroceryList(
  weeklyPlan: DailyMealPlan[],
  selectedDayNumbers: number[] = [1, 2, 3, 4, 5, 6, 7],
  servingsFactor: number = 1
): Record<MarketSectionKey, AggregatedGroceryItem[]> {
  const itemMap = new Map<string, {
    item: string;
    amounts: string[];
    section: MarketSectionKey;
    sourceRecipes: Set<string>;
  }>();

  // Filtra apenas os dias selecionados
  const activeDays = weeklyPlan.filter((d) => selectedDayNumbers.includes(d.dayNumber));

  for (const day of activeDays) {
    // 1. Processa Almoço
    if (day.lunch.recipeId) {
      const canonical = CANONICAL_RECIPES.find((r) => r.id === day.lunch.recipeId);
      if (canonical) {
        for (const ing of canonical.ingredients) {
          addItem(ing.item, ing.amount, canonical.title);
        }
      }
    } else if (HOMEMADE_MEALS_INGREDIENTS[day.lunch.dishName]) {
      for (const ing of HOMEMADE_MEALS_INGREDIENTS[day.lunch.dishName]) {
        addItem(ing.item, ing.amount, day.lunch.dishName);
      }
    }

    // 2. Processa Jantar
    if (day.dinner.recipeId) {
      const canonical = CANONICAL_RECIPES.find((r) => r.id === day.dinner.recipeId);
      if (canonical) {
        for (const ing of canonical.ingredients) {
          addItem(ing.item, ing.amount, canonical.title);
        }
      }
    } else if (HOMEMADE_MEALS_INGREDIENTS[day.dinner.dishName]) {
      for (const ing of HOMEMADE_MEALS_INGREDIENTS[day.dinner.dishName]) {
        addItem(ing.item, ing.amount, day.dinner.dishName);
      }
    }

    // 3. Processa Doce do Jantar se tiver receita associada
    if (day.dinner.sweetTreatRecipeId) {
      const sweetRecipe = CANONICAL_RECIPES.find((r) => r.id === day.dinner.sweetTreatRecipeId);
      if (sweetRecipe) {
        for (const ing of sweetRecipe.ingredients) {
          addItem(ing.item, ing.amount, sweetRecipe.title);
        }
      }
    }
  }

  function addItem(rawItem: string, rawAmount: string, recipeTitle: string) {
    // Normaliza chave de agregação
    const normalizedKey = rawItem
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/[\(].*?[\)]/g, '') // remove parenteses para agrupar
      .trim();

    const existing = itemMap.get(normalizedKey);
    const section = classifyMarketSection(rawItem);

    if (existing) {
      existing.amounts.push(rawAmount);
      existing.sourceRecipes.add(recipeTitle);
    } else {
      itemMap.set(normalizedKey, {
        item: rawItem,
        amounts: [rawAmount],
        section,
        sourceRecipes: new Set([recipeTitle]),
      });
    }
  }

  // Inicializa o mapa agrupado por secção
  const groupedResult: Record<MarketSectionKey, AggregatedGroceryItem[]> = {
    hortifruti: [],
    talho: [],
    peixaria: [],
    lacticinios: [],
    mercearia: [],
    condimentos: [],
    especiarias: [],
    adega: [],
  };

  let idCounter = 1;

  for (const [key, data] of itemMap.entries()) {
    // Formata quantidade agregada
    let displayAmount = data.amounts.join(' + ');

    // Aplica multiplicador se for diferente de 1
    if (servingsFactor !== 1) {
      displayAmount = displayAmount.replace(/(\d+([\.,]\d+)?)/g, (match) => {
        const num = parseFloat(match.replace(',', '.'));
        if (isNaN(num)) return match;
        const scaled = Math.round(num * servingsFactor * 10) / 10;
        return String(scaled).replace('.', ',');
      });
    }

    const groceryItem: AggregatedGroceryItem = {
      id: `grocery-${idCounter++}`,
      item: data.item,
      amount: displayAmount,
      section: data.section,
      sourceRecipes: Array.from(data.sourceRecipes),
      checked: false,
    };

    groupedResult[data.section].push(groceryItem);
  }

  // Ordena itens dentro de cada secção por nome
  for (const secKey of Object.keys(groupedResult) as MarketSectionKey[]) {
    groupedResult[secKey].sort((a, b) => a.item.localeCompare(b.item));
  }

  return groupedResult;
}
