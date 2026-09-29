import { DailyMealPlan } from '../types/cookbook';

export const WEEKLY_MEAL_PLAN: DailyMealPlan[] = [
  {
    dayOfWeek: 'Segunda-feira',
    dayNumber: 1,
    lunch: {
      dishName: 'Chicken & Mushroom Hotpot (Caçarola de Frango e Cogumelos)',
      recipeId: 'chicken-mushroom-hotpot',
      sideDish: 'Salada de agrião da horta com azeite virgem e vinagre de sidra',
      winePairing: 'Vinho Branco Encorpado de Trás-os-Montes'
    },
    dinner: {
      dishName: 'Caldo de Legumes da Horta com Feijão Verde e Hortelã',
      recipeId: undefined,
      comfortSoup: 'Sopa aveludada de abóbora menina com sementes tostadas',
      sweetTreat: 'Fatia de pão rústico com Compota Real de Marmelo'
    },
    pantryTip: 'Aproveite os ossos e aparas do frango do almoço para iniciar a base de caldo do meio da semana.',
    prepAheadNotice: 'Demolhar o feijão encarnado em água fria para a Sopa da Pedra da Quarta-feira.'
  },
  {
    dayOfWeek: 'Terça-feira',
    dayNumber: 2,
    lunch: {
      dishName: 'Croquetes / Pastéis de Peixe Especiados (Fish Cutlets)',
      recipeId: 'fish-cutlets-croquettes',
      sideDish: 'Arroz malandrinho de tomate e pimentos com coentros',
      winePairing: 'Vinho Verde Loureiro bem fresco'
    },
    dinner: {
      dishName: 'Tortilha de Batata e Espinafres com Queijo de Cabra',
      recipeId: undefined,
      comfortSoup: 'Creme de cenoura com gengibre fresco',
      sweetTreat: 'Maçã Bravo de Esmolfe assada com canela e noz'
    },
    pantryTip: 'Se sobrarem croquetes de peixe, guarde-os em recipiente forrado a papel vegetal: reaquecem perfeitamente no forno a 180°C mantendo o crocante.',
    prepAheadNotice: 'Temperar a carne de borrego da marinada se quiser adiantar o fim-de-semana.'
  },
  {
    dayOfWeek: 'Quarta-feira',
    dayNumber: 3,
    lunch: {
      dishName: 'Sopa da Pedra do Alentejo (Receita Canónica Antiga)',
      recipeId: 'sopa-da-pedra-alentejana',
      sideDish: 'Broa de milho fatiada e azeitonas britadas temperadas',
      winePairing: 'Vinho Tinto Alentejano com estágio em carvalho'
    },
    dinner: {
      dishName: 'Ceia Leve de Queijos Tradicionais e Frutos Secos',
      recipeId: undefined,
      comfortSoup: 'Caldo rico resultante do apuro da Sopa da Pedra',
      sweetTreat: 'Requeijão com Doce de Abóbora e Amêndoa'
    },
    pantryTip: 'A Sopa da Pedra fica ainda mais saborosa e apurada no dia seguinte após repousar no barro.',
    prepAheadNotice: 'Verificar a esterilização dos frascos de vidro para a confeção das compotas.'
  },
  {
    dayOfWeek: 'Quinta-feira',
    dayNumber: 4,
    lunch: {
      dishName: 'Arroz de Frango no Forno com Chouriço de Portalegre',
      recipeId: undefined,
      sideDish: 'Grelos de nabo salteados com alho e azeite de lagar',
      winePairing: 'Vinho Tinto do Dão elegante e mineral'
    },
    dinner: {
      dishName: 'Ovos Escalfados em Tomatada Rústica com Hortelã',
      recipeId: undefined,
      comfortSoup: 'Sopa de alho-francês e batata com azeite cru',
      sweetTreat: 'Tigela de Marmelada caseira com lascas de queijo curado'
    },
    pantryTip: 'Não deite fora a gordura libertada pelos chouriços ao dourar: é ouro líquido para aromatizar refogados.',
    prepAheadNotice: 'Fazer o descongelamento gradual de peixes ou carnes para o almoço de sexta.'
  },
  {
    dayOfWeek: 'Sexta-feira',
    dayNumber: 5,
    lunch: {
      dishName: 'Pescada à Antiga com Batatinhas Novas e Molho de Coentros',
      recipeId: undefined,
      sideDish: 'Couve-coração cozida com fio de azeite e vinagre',
      winePairing: 'Vinho Branco da Bairrada com boa acidez'
    },
    dinner: {
      dishName: 'Pataniscas Douradas de Bacalhau da Despensa',
      recipeId: undefined,
      comfortSoup: 'Caldo Verde da Aldeia com rodela de chouriço',
      sweetTreat: 'Tarte Clássica de Maçã Bravo de Esmolfe',
      sweetTreatRecipeId: 'tarte-maca-bravo-esmolfe'
    },
    pantryTip: 'Na cozedura da couve, use sempre a tampa colocada e água a ferver com sal para conservar a cor verde viva.',
    prepAheadNotice: 'Colocar a carne de borrego na marinada de vinho branco e alho para o sábado.'
  },
  {
    dayOfWeek: 'Sábado',
    dayNumber: 6,
    lunch: {
      dishName: 'Ensopado de Borrego do Solar com Hortelã Fresca',
      recipeId: 'ensopado-borrego-hortela',
      sideDish: 'Fatias de pão de trigo alentejano frito em azeite de lagar',
      winePairing: 'Vinho Tinto Reserva do Douro ou Alentejo'
    },
    dinner: {
      dishName: 'Tábua Festiva de Petiscos, Pimentos Padron e Enchidos',
      recipeId: undefined,
      comfortSoup: 'Consommé aromático com hortelã fresca',
      sweetTreat: 'Tarte de Maçã morna com bola de gelado de nata',
      sweetTreatRecipeId: 'tarte-maca-bravo-esmolfe'
    },
    pantryTip: 'Em dias de ensopado, cozinhe no fogo mais brando do fogão com o difusor de calor sob o tacho.',
    prepAheadNotice: 'Organizar os frascos de compota e imprimir os novos rótulos vintage para a feira.'
  },
  {
    dayOfWeek: 'Domingo',
    dayNumber: 7,
    lunch: {
      dishName: 'Banquete de Família: Assado Tradicional & Torta da Herdade',
      recipeId: 'chicken-mushroom-hotpot',
      sideDish: 'Legumes da horta assados com alecrim e dentes de alho inteiros',
      winePairing: 'Grande Reserva da adega de família'
    },
    dinner: {
      dishName: 'Ceia de Domingo: Sandes em Pão de Centeio com Frango Desfiado',
      recipeId: undefined,
      comfortSoup: 'Sopa de legumes ligeira com sementes de papoila',
      sweetTreat: 'Compota Real de Marmelo com Nozes e Biscoitos de Canela',
      sweetTreatRecipeId: 'compota-marmelo-vinho-porto'
    },
    pantryTip: 'O domingo é o dia canónico de etiquetar os frascos de compota feitos no fim de semana.',
    prepAheadNotice: 'Planear a lista de compras da feira municipal da manhã de segunda-feira.'
  }
];

export const GROCERY_CHECKLIST_TEMPLATE = [
  { category: 'Hortifrúti & Frutas', items: ['Maçãs Bravo de Esmolfe (2kg)', 'Marmelos aromáticos (3kg)', 'Batatas para assar (3kg)', 'Cebolas e alhos frescos', 'Agrião da ribeira', 'Hortelã da horta (2 molhos)', 'Coentros frescos', 'Cenouras e couve-lombarda'] },
  { category: 'Açougue & Peixaria', items: ['Frango do campo (1,5kg)', 'Carne de borrego da pá cortada (1kg)', 'Peixe branco fresco ou bacalhau (500g)', 'Chouriço de carne tradicional', 'Morcela / Chouriço de sangue', 'Entrecosto fumado (300g)'] },
  { category: 'Mercearia & Especiarias', items: ['Farinha de trigo tradicional T65', 'Farinha de arroz', 'Pão ralado caseiro', 'Feijão encarnado (1kg)', 'Açúcar de cana (2kg)', 'Paus de canela de Ceilão', 'Noz-moscada inteira', 'Cominho em grão ou moído', 'Mostarda em pó à moda antiga'] },
  { category: 'Laticínios & Ovos', items: ['Manteiga com sal artesanal (250g)', 'Ovos de galinha do campo (1 dúzia)', 'Queijo curado de ovelha', 'Requeijão fresco'] },
  { category: 'Adega & Conservação', items: ['Vinho do Porto Tawny reserva', 'Vinho branco maduro e seco', 'Azeite virgem extra de lagar', 'Frascos de vidro herméticos (6 unidades)', 'Fio de ráfia / juta para as tampas'] }
];
