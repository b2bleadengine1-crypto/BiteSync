/**
 * Compêndio de Medidas da Avó & Tabela de Substituições Tradicionais
 */

export interface MeasureConversion {
  name: string;
  volumeOrWeight: string;
  details: string;
  grandmotherTip: string;
}

export interface IngredientSubstitution {
  ingredient: string;
  category: string;
  substitutes: {
    name: string;
    ratio: string;
    culinaryImpact: string;
  }[];
}

export const GRANDMOTHER_MEASURES: MeasureConversion[] = [
  {
    name: '1 Chávena de Chá',
    volumeOrWeight: '240 ml (líquidos) · 140 g (farinha) · 200 g (açúcar)',
    details: 'Equivale à clássica chávena almoçadeira de porcelana.',
    grandmotherTip: 'Nunca calque a farinha na chávena: deite com uma colher e passe as costas de uma faca no bordo.',
  },
  {
    name: '1 Chávena de Café',
    volumeOrWeight: '60 ml',
    details: 'Pequena chávena de louça usada para licores, azeite ou caldos concentrados.',
    grandmotherTip: 'Ideal para medir caldos de carne ou vinho de cheiro na finalização de ensopados.',
  },
  {
    name: '1 Colher de Sopa',
    volumeOrWeight: '15 ml · ~12 g farinha · ~15 g açúcar · ~14 g manteiga',
    details: 'Talher de sopa de estanho ou prata tradicional bem raso.',
    grandmotherTip: 'Uma colher bem cheia (em monte) equivale quase ao dobro de uma rasa.',
  },
  {
    name: '1 Colher de Chá',
    volumeOrWeight: '5 ml · ~4 g especiarias moídas',
    details: 'Medida áurea para noz-moscada, canela, fermento ou mostarda em pó.',
    grandmotherTip: 'Para especiarias fortes como cravo ou pimenta caiena, use sempre rasa.',
  },
  {
    name: '1 Cálice Tradicional',
    volumeOrWeight: '50 ml',
    details: 'Cálice de cristal de Vinho do Porto, Madeira ou aguardente velha.',
    grandmotherTip: 'Adicione sempre fora do fogo direto para não evaporar o aroma antes de envolver no tacho.',
  },
  {
    name: '1 Pitada Generosa',
    volumeOrWeight: '~1 g a 1.5 g',
    details: 'A porção apreendida entre as pontas do polegar e do indicador.',
    grandmotherTip: 'Uma pitada de flor de sal nos doces realça o açúcar; uma pitada de açúcar no tomate tira a acidez.',
  },
  {
    name: '1 Onça (oz)',
    volumeOrWeight: '28.35 g',
    details: 'Medida clássica dos velhos compêndios britânicos e de além-mar.',
    grandmotherTip: 'Muito comum em carnes assadas e bolos vitorianos (16 oz = 1 libra).',
  },
  {
    name: '1 Libra (lb)',
    volumeOrWeight: '453.6 g (aprox. meio quilo)',
    details: 'Usada para peças inteiras de carne, bacalhau seco e sacos de farinha.',
    grandmotherTip: 'Se a receita pedir 1 lb de farinha, meça 3 chávenas de chá cheias e 2 colheres de sopa.',
  },
];

export const INGREDIENT_SUBSTITUTIONS: IngredientSubstitution[] = [
  {
    ingredient: 'Farinha de Trigo',
    category: 'Cereais & Moagens',
    substitutes: [
      {
        name: 'Farinha de Arroz',
        ratio: '1:1 (mesma proporção)',
        culinaryImpact: 'Confere leveza superior, crocância estaladiça aos fritos e é 100% isenta de glúten.',
      },
      {
        name: 'Amido de Milho (Maizena) ou Polvilho Doce',
        ratio: 'Usar 70% da dose de trigo',
        culinaryImpact: 'Textura aveludada em cremes e pudins; se for para engrossar molhos, dilua sempre em água fria.',
      },
      {
        name: 'Farinha de Aveia Integral Moída',
        ratio: '1:1',
        culinaryImpact: 'Aroma tostado rústico com maior teor de fibras alimentares; ideal para tartes e pães rápidos.',
      },
    ],
  },
  {
    ingredient: 'Manteiga Tradicional',
    category: 'Gorduras Nobres',
    substitutes: [
      {
        name: 'Azeite Virgem Extra da Herdade',
        ratio: '3/4 chávena de azeite para cada 1 chávena de manteiga',
        culinaryImpact: 'Gordura saudável de coração; preserva a humidade dos bolos durante mais dias com sabor frutado.',
      },
      {
        name: 'Puré de Maçã Cozida / Marmelo',
        ratio: '1:1 em bolos doces e compotas',
        culinaryImpact: 'Reduz calorias em 70% mantendo a massa suculenta e naturalmente adocicada.',
      },
      {
        name: 'Banha de Porco Ibérico Curada',
        ratio: '1:1 em massas salgadas e empadas',
        culinaryImpact: 'O segredo conventual para massas quebradas ultra-estaladiças que se desfazem na boca.',
      },
    ],
  },
  {
    ingredient: 'Natas Espessas (Creme de Leite)',
    category: 'Laticínios',
    substitutes: [
      {
        name: 'Leite Gordo com Manteiga Derretida',
        ratio: '3/4 chávena de leite + 1/4 chávena de manteiga derretida',
        culinaryImpact: 'Recria exatamente o teor lipídico de 30% das natas culinárias para molhos de forno.',
      },
      {
        name: 'Iogurte Grego Natural com gotas de limão',
        ratio: '1:1',
        culinaryImpact: 'Acidez refrescante e cremosa com dobro das proteínas e muito menos calorias saturadas.',
      },
      {
        name: 'Leite de Côco Artesanal (Creme Superior)',
        ratio: '1:1 em pratos orientais e sopas',
        culinaryImpact: 'Aveludado nobre e vegan com toque aromático exótico excelente em ensopados e caldos.',
      },
    ],
  },
  {
    ingredient: 'Ovos de Galinha',
    category: 'Ligantes da Cozinha',
    substitutes: [
      {
        name: 'Ovo de Linhaça (Ovo Dourado)',
        ratio: '1 colher de sopa de linhaça moída + 3 colheres de água morna por ovo',
        culinaryImpact: 'Deixe repousar 5 minutos até criar mucilagem gelatinosa; liga massas de biscoitos e croquetes com perfeição.',
      },
      {
        name: 'Banana Madura Esmagada',
        ratio: '1/2 banana média por cada ovo',
        culinaryImpact: 'Excelente em doces de forno, conferindo hidratação e perfume natural sem necessidade de gordura.',
      },
      {
        name: 'Aquafaba (Água de cozedura de grão-de-bico)',
        ratio: '3 colheres de sopa por ovo (ou 2 colheres por clara)',
        culinaryImpact: 'Bate em castelo firme exatamente como claras de ovo para mousses, suspiros e soufflés aéreos.',
      },
    ],
  },
  {
    ingredient: 'Açúcar Branco Refinado',
    category: 'Adoçantes',
    substitutes: [
      {
        name: 'Mel Silvestre de Flor de Laranjeira ou Alecrim',
        ratio: '3/4 chávena de mel para 1 chávena de açúcar (reduzir líquidos em 2 colheres)',
        culinaryImpact: 'Aroma floral e antibacteriano natural com caramelização mais rápida e dourada no forno.',
      },
      {
        name: 'Melaço de Cana Tradicional / Açúcar Mascavado',
        ratio: '1:1',
        culinaryImpact: 'Tons âmbar escuros e notas minerais profundas características dos bolos tradicionais da Madeira.',
      },
    ],
  },
  {
    ingredient: 'Vinho do Porto / Vinho de Cozinha',
    category: 'Vinhos de Apuro',
    substitutes: [
      {
        name: 'Vinho Tinto Maduro + 1 colher de açúcar mascavado',
        ratio: '1:1',
        culinaryImpact: 'Emula perfeitamente o corpo aveludado e o teor alcoólico frutado do Porto em molhos de carne e compotas.',
      },
      {
        name: 'Caldo de Carne + 1 colher de vinagre balsâmico com mel',
        ratio: '1:1 (Opção 100% sem álcool)',
        culinaryImpact: 'Aporte de acidez e umami profundo ideal para quem prefere refeições sem teor alcoólico.',
      },
    ],
  },
];

export interface SOSKitchenRemedy {
  problem: string;
  grandmotherRemedy: string;
  scientificReason: string;
  icon: string;
}

export const SOS_KITCHEN_REMEDIES: SOSKitchenRemedy[] = [
  {
    problem: 'Comida demasiado Salgada (Guisados ou Sopas)',
    grandmotherRemedy: 'Descasque 1 batata crua média, corte ao meio e deite no tacho a ferver durante 10 minutos. Em alternativa, adicione 1 colher de chá de vinagre de sidra com 1 colher de açúcar.',
    scientificReason: 'O amido poroso da batata crua absorve sal e água por osmose; o contraste entre o ácido e o doce anula a perceção das papilas gustativas para o sódio.',
    icon: '🧂',
  },
  {
    problem: 'Molho Deslaçado ou Talhado (Maionese, Molho Branco ou Natas)',
    grandmotherRemedy: 'Retire de imediato do lume. Deite 1 colher de sopa de água bem gelada (ou 1 cubo de gelo picado) e bata energicamente com um batedor de varas de arame.',
    scientificReason: 'O choque térmico súbito contrai as moléculas lipídicas e permite restabelecer a emulsão entre a água e as gorduras.',
    icon: '🥣',
  },
  {
    problem: 'Excesso de Acidez (Molho de Tomate ou Vinha d’Alhos)',
    grandmotherRemedy: 'Adicione 1/4 de colher de café de bicarbonato de sódio (fará uma efervescência suave) ou junte 1 cenoura inteira descascada ralada muito fininha.',
    scientificReason: 'O bicarbonato neutraliza quimicamente o ácido cítrico e málico; a cenoura liberta frutose natural suave sem mascarar os aromas.',
    icon: '🍅',
  },
  {
    problem: 'Comida a Pegar ao Fundo com Cheiro a Queimado',
    grandmotherRemedy: 'NUNCA raspe o fundo. Mude imediatamente o conteúdo superior para outro tacho limpo, coloque uma côdea de pão seco sobre a comida e tape com um pano húmido durante 5 minutos.',
    scientificReason: 'O miolo e a côdea porosa do pão absorvem os compostos voláteis de fumo e pirólise, eliminando o travo a queimado do guisado.',
    icon: '🔥',
  },
  {
    problem: 'Carne Dura ou Rija em Estufados / Assados',
    grandmotherRemedy: 'Adicione cascas de maçã lavadas, 1 cálice de aguardente/vinho generoso ou 2 rodelas de kiwi fresco ao caldo e cozinhe tapado em lume muito brando.',
    scientificReason: 'As enzimas proteolíticas da maçã e do kiwi quebram as fibras de colagénio da carne, tornando-a macia sem se desfazer.',
    icon: '🥩',
  },
  {
    problem: 'Calda de Açúcar ou Compota Cristalizada no Fundo',
    grandmotherRemedy: 'Junte 1 colher de sobremesa de sumo de limão fresco e 2 colheres de água quente. Leve a aquecer em lume brando em banho-maria.',
    scientificReason: 'O ácido cítrico quebra a sacarose cristalizada em glicose e frutose (açúcar invertido), impedindo a recristalização.',
    icon: '🍯',
  },
];

