import { Recipe } from '../types/cookbook';
import { PORTUGUESE_RECIPES } from './portugueseRecipes';

export { PORTUGUESE_RECIPES };

export const BASE_CANONICAL_RECIPES: Recipe[] = [
  {
    id: 'chicken-mushroom-hotpot',
    slug: 'chicken-mushroom-hotpot',
    title: 'Chicken & Mushroom Hotpot (Caçarola de Frango e Cogumelos)',
    originalTitle: 'Chicken & Mushroom Hotpot',
    subtitle: 'Instruções canónicas para o mestre cozinheiro — Todos os 5 passos verificados',
    category: 'aves',
    prepTimeMinutes: 25,
    cookTimeMinutes: 45,
    servings: 4,
    difficulty: 'Médio',
    difficultyLevel: 'Médio',
    dropCapLetter: 'H',
    historicalNote: 'Originário dos lares rústicos do norte de Inglaterra e adaptado aos fornos a lenha de família, este prato combina a suculência do frango de campo com o perfume terroso dos cogumelos silvestres, coroado com batatas douradas em escama.',
    pantrySecret: 'Para que as batatas fiquem estaladiças como folhados, pincele com manteiga derretida fervente 10 minutos antes do fim e polvilhe uma pitada de flor de sal.',
    tags: ['Frango do Campo', 'Cogumelos Frescos', 'Forno', 'Conforto Familiar'],
    area: 'British',
    nutrition: {
      calories: 485,
      protein: 38.5,
      carbs: 36.0,
      fat: 19.5,
      fiber: 3.5,
      servingSize: '1 prato individual (380g)',
    },
    originalSourceTitle: 'BBC Good Food / Compêndio Clássico',
    originalSourceUrl: 'https://www.bbcgoodfood.com/recipes/chicken-mushroom-hotpot',
    videoTutorialTitle: 'Tele-Cozinha: Técnica do Roux Perfeito e Selagem das Batatas',
    ingredients: [
      { item: 'Peitos ou coxas de frango cozinhados e desfiados', amount: '500g', originalAmount: '500g cooked chicken' },
      { item: 'Cogumelos frescos (cremini ou paris) laminados', amount: '250g', originalAmount: '250g button mushrooms' },
      { item: 'Cebola picada finamente', amount: '1 unidade grande', originalAmount: '1 large onion' },
      { item: 'Manteiga artesanal com sal', amount: '40g + 1 colher para pincelar', originalAmount: '40g butter' },
      { item: 'Farinha de trigo de moagem tradicional', amount: '40g (2 colheres de sopa)', originalAmount: '40g plain flour' },
      { item: 'Caldo de galinha caseiro (ou cubo esfarelado)', amount: '500ml', originalAmount: '500ml chicken stock' },
      { item: 'Noz-moscada ralada na hora', amount: '1 pitada generosa', originalAmount: 'Pinch of freshly grated nutmeg' },
      { item: 'Mostarda em pó à moda antiga', amount: '1 colher de chá', originalAmount: '1 tsp mustard powder' },
      { item: 'Batatas médias para assar, descascadas e laminadas', amount: '600g (3-4 batatas)', originalAmount: '600g potatoes, sliced' },
      { item: 'Pimenta preta de moinho e sal marinho', amount: 'A gosto', originalAmount: 'To taste' }
    ],
    steps: [
      {
        stepNumber: 1,
        originalText: 'Heat oven to 200C/180C fan/gas 6. Put the butter in a medium-size saucepan and place over a medium heat. Add the onion and leave to cook for 5 mins, stirring occasionally. Add the mushrooms to the saucepan with the onions.',
        portugueseText: 'Aqueça o forno a 200 °C (180 °C com ventilação). Coloque a manteiga num tacho médio em lume médio. Adicione a cebola e deixe cozinhar durante 5 minutos, mexendo ocasionalmente. Junte os cogumelos ao tacho com as cebolas.',
        notes: 'Cozinhe até os cogumelos libertarem o aroma terroso e a cebola ficar translúcida sem queimar.'
      },
      {
        stepNumber: 2,
        originalText: 'Once the onion and mushrooms are almost cooked, stir in the flour – this will make a thick paste called a roux. If you are using a stock cube, crumble the cube into the roux now and stir well. Put the roux over a low heat and stir continuously for 2 mins – this will cook the flour and stop the sauce from having a floury taste.',
        portugueseText: 'Assim que a cebola e os cogumelos estiverem quase cozinhados, envolva a farinha para formar uma pasta espessa (roux). Se usar um cubo de caldo, esfarele-o agora na mistura e mexa bem. Cozinhe em lume brando mexendo continuamente durante 2 minutos para cozer a farinha.',
        notes: 'Estes 2 minutos a cozer a farinha são vitais para que o molho não fique com sabor a farinha crua.'
      },
      {
        stepNumber: 3,
        originalText: "Take the roux off the heat. Slowly add the fresh stock, if using, or pour in 500ml water if you've used a stock cube, stirring all the time. Once all the liquid has been added, season with pepper, a pinch of nutmeg and mustard powder. Put the saucepan back onto a medium heat and slowly bring it to the boil, stirring all the time. Once the sauce has thickened, place on a very low heat. Add the cooked chicken and vegetables to the sauce and stir well. Grease a medium-size ovenproof pie dish with a little butter and pour in the chicken and mushroom filling.",
        portugueseText: 'Retire do lume e adicione lentamente o caldo fresco (ou 500 ml de água se usou cubo), mexendo sempre. Tempere com pimenta, uma pitada de noz-moscada e mostarda em pó. Leve novamente a lume médio até levantar fervura, mexendo até engrossar. Reduza para lume muito brando, junte o frango cozinhado e os legumes e envolva. Unte uma assadeira média com manteiga e verta o recheio.',
        notes: 'Verta o líquido em fio contínuo para evitar grumos, batendo com batedor de varas.'
      },
      {
        stepNumber: 4,
        originalText: 'Carefully lay the potatoes on top of the hot-pot filling, overlapping them slightly, almost like a pie top.',
        portugueseText: 'Disponha cuidadosamente as rodelas de batata sobre o recheio, sobrepondo-as ligeiramente como a cobertura de uma tarte.',
        notes: 'Faça círculos concêntricos de fora para dentro para um acabamento clássico de compêndio.'
      },
      {
        stepNumber: 5,
        originalText: 'Brush the potatoes with a little melted butter and cook in the oven for about 35 mins. The hot-pot is ready once the potatoes are cooked and golden brown.',
        portugueseText: 'Pincele as batatas com um pouco de manteiga derretida e leve ao forno durante cerca de 35 minutos. O prato está pronto quando as batatas estiverem macias e douradas.',
        notes: 'Deixe repousar 5 minutos fora do forno antes de servir na própria terrina.'
      }
    ]
  },
  {
    id: 'fish-cutlets-croquettes',
    slug: 'fish-cutlets-croquettes',
    title: 'Croquetes / Pastéis de Peixe Especiados (Fish Cutlets)',
    originalTitle: 'Spiced Fish Cutlets / Croquettes',
    subtitle: 'Instruções canónicas completas e renumeradas sem quebras',
    restorationNote: 'Na versão anterior truncada, esta receita exibia o cabeçalho "PASSO 2" isolado no cartão 3 e ficava truncada no cartão 4 logo após "Coloque as migalhas de pão". Esta versão canónica recuperou o passo 3 na íntegra e restaurou o passo 4 de fritura.',
    category: 'peixes',
    prepTimeMinutes: 30,
    cookTimeMinutes: 20,
    servings: 4, // 15 croquetes
    difficulty: 'Médio',
    difficultyLevel: 'Médio',
    dropCapLetter: 'C',
    historicalNote: 'Típicos dos receituários costeiros e herança culinária dos portos coloniais, estes pastéis combinam a textura aveludada do peixe branco com batata cozida e a frescura das ervas e especiarias moídas.',
    pantrySecret: 'Para que a crosta fique ultra crocante e o croquete não abra na frigideira, leve os croquetes já moldados ao frigorífico durante 15 minutos antes de passar pelo pão ralado.',
    tags: ['Peixe Fresco', 'Petisco Tradicional', 'Panado Dourado', 'Fritura Dourada'],
    area: 'British',
    nutrition: {
      calories: 340,
      protein: 26.0,
      carbs: 32.0,
      fat: 12.0,
      fiber: 2.2,
      servingSize: '3 croquetes médios (180g)',
    },
    originalSourceTitle: 'Arquivo Tradicional / TheMealDB Canonical',
    originalSourceUrl: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52959',
    videoTutorialTitle: 'Tele-Cozinha: Ponto de Cozedura do Peixe e Panagem sem Desmanchar',
    ingredients: [
      { item: 'Peixe branco limpo (pescada, corvina ou bacalhau fresco)', amount: '450g', originalAmount: '450g white fish fillets' },
      { item: 'Batatas cozidas com pele e esmagadas ainda mornas', amount: '350g (2 batatas médias)', originalAmount: '350g mashed boiled potatoes' },
      { item: 'Pimenta verde (malagueta suave) picada muito fininho', amount: '1 unidade', originalAmount: '1 green chili, minced' },
      { item: 'Coentros frescos picados', amount: '2 colheres de sopa', originalAmount: '2 tbsp fresh coriander' },
      { item: 'Cominho moído de moinho', amount: '1 colher de café', originalAmount: '1 tsp ground cumin' },
      { item: 'Alho esmagado e gengibre fresco ralado', amount: '1 colher de chá de cada', originalAmount: '1 tsp garlic & ginger paste' },
      { item: 'Farinha de arroz (para ligar a massa com leveza)', amount: '2 colheres de sopa', originalAmount: '2 tbsp rice flour' },
      { item: 'Ovos de galinhas criadas ao ar livre', amount: '3 unidades (1 para a massa + 2 para panar)', originalAmount: '3 eggs' },
      { item: 'Pão ralado caseiro / migalhas de pão estaladiças', amount: '150g', originalAmount: '150g breadcrumbs' },
      { item: 'Óleo para fritar e sal marinho', amount: 'Q.b.', originalAmount: 'Oil for frying, sea salt' }
    ],
    steps: [
      {
        stepNumber: 1,
        originalText: 'Place the fish in a saucepan with enough water to cover. Simmer gently over low heat for 10 minutes with the lid on. Drain and rinse the fish (flake it, removing any small bones).',
        portugueseText: 'Coloque o peixe numa panela com água suficiente para cobrir. Leve ao lume brando e cozinhe suavemente durante 10 minutos em fogo baixo com a tampa colocada. Escorra e lave o peixe (desfie-o retirando eventuais espinhas).',
        notes: 'Retire cuidadosamente todas as espinhas com os dedos limpos enquanto o peixe arrefece.'
      },
      {
        stepNumber: 2,
        originalText: 'In a large bowl, combine the fish, mashed boiled potatoes, green chili, coriander, cumin, black pepper, garlic, and ginger. Season with salt, add rice flour, mix thoroughly, and crack 1 egg to bind. Divide into 15 equal portions, shaping into small logs.',
        portugueseText: 'Coloque o peixe, a batata cozida esmagada, a pimenta verde (malagueta), o coentro, o cominho, a pimenta preta, o alho e o gengibre numa tigela grande. Tempere com sal, adicione a farinha de arroz, misture bem e parta 1 ovo para ligar. Mexa a mistura e divida em 15 porções iguais, moldando pequenas toras (croquetes cilíndricos).',
        notes: 'Molde os croquetes com as mãos ligeiramente oleadas para obter uma superfície lisa e homogénea.'
      },
      {
        stepNumber: 3,
        originalText: 'Beat the remaining eggs in a shallow bowl. Place the breadcrumbs on a flat plate. Dip each croquette first into the beaten egg, then roll generously in breadcrumbs until evenly coated.',
        portugueseText: 'Parta os ovos restantes numa tigela e bata levemente. Coloque as migalhas de pão (pão ralado) num prato raso. Passe cada croquete primeiro pelo ovo batido e, em seguida, envolva bem nas migalhas de pão até ficar uniformemente coberto.',
        isRestored: true,
        notes: 'Pressione delicadamente o pão ralado para que adira bem a toda a superfície cilíndrica.'
      },
      {
        stepNumber: 4,
        originalText: 'Heat oil in a deep skillet over medium heat. Fry the fish croquettes in small batches for 3 to 4 minutes, turning gently until golden brown and crispy on all sides. Drain on paper towels and serve piping hot.',
        portugueseText: 'Aqueça óleo numa frigideira funda em lume médio. Frite os croquetes de peixe em pequenos lotes durante 3 a 4 minutos, virando-os cuidadosamente até ficarem bem dourados e estaladiços de todos os lados. Escorra sobre papel absorvente e sirva quente.',
        isRestored: true,
        notes: 'Nunca sobrecarregue a frigideira para que o óleo não arrefeça e os croquetes fiquem estaladiços sem gordura excessiva.'
      }
    ]
  },
  {
    id: 'sopa-da-pedra-alentejana',
    slug: 'sopa-da-pedra-alentejana',
    title: 'Sopa da Pedra do Alentejo (Receita Canónica Antiga)',
    originalTitle: 'Traditional Alentejo Stone Soup',
    subtitle: 'O clássico dos caldeirões de ferro com enchidos fumados e feijão encarnado',
    category: 'sopas',
    prepTimeMinutes: 30,
    cookTimeMinutes: 90,
    servings: 6,
    difficulty: 'Especialista',
    difficultyLevel: 'Especialista',
    dropCapLetter: 'E',
    historicalNote: 'Conta a lenda do frade pedinte que, com uma pedra bem lavada num pote de barro ao lume e a generosidade de cada aldeão que lhe acrescentava uma couve, um chouriço ou um punhado de feijão, nasceu o caldo mais rico de Portugal.',
    pantrySecret: 'A pedra basáltica redonda bem lavada vai mesmo para o fundo do pote durante a fervura lenta: ajuda na distribuição térmica uniforme do barro.',
    tags: ['Feijão Encarnado', 'Chouriço de Sangue', 'Pote de Barro', 'Lenda Culinária'],
    area: 'Portuguese',
    nutrition: {
      calories: 510,
      protein: 34.0,
      carbs: 42.0,
      fat: 22.0,
      fiber: 8.5,
      servingSize: '1 tigela de sopa de refeição (450ml)',
    },
    originalSourceTitle: 'Compêndio de Tradições Populares Portuguesas',
    originalSourceUrl: 'https://pt.wikipedia.org/wiki/Sopa_da_pedra',
    videoTutorialTitle: 'Tele-Cozinha: O Ritual do Feijão Manteiga e Apuramento dos Fumados',
    ingredients: [
      { item: 'Feijão encarnado demolhado de véspera', amount: '500g' },
      { item: 'Orelheira ou entrecosto fumado de porco', amount: '300g' },
      { item: 'Chouriço de carne tradicional', amount: '1 unidade inteira' },
      { item: 'Morcela ou chouriço de sangue da serra', amount: '1 unidade' },
      { item: 'Toucinho entremeado salgado', amount: '100g' },
      { item: 'Batatas cortadas aos cubos pequenos', amount: '400g' },
      { item: 'Cenouras em rodelas grossas', amount: '2 unidades' },
      { item: 'Couve-lombarda ripada à mão', amount: '1/2 unidade' },
      { item: 'Dentes de alho esmagados com casca', amount: '4 dentes' },
      { item: 'Folha de louro e ramo de coentros frescos', amount: '1 raminho' }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: 'Lave muito bem uma pedra de rio lisa. Num caldeirão alto, coloque o feijão demolhado, a pedra, as carnes fumadas, os chouriços inteiros e o toucinho. Cubra com água abundante e leve a lume vivo.',
        notes: 'Assim que levantar fervura, escume a espuma da superfície e reduza para lume brando.'
      },
      {
        stepNumber: 2,
        portugueseText: 'Deixe cozer suavemente durante cerca de 1 hora até as carnes ficarem tenras. Retire as carnes e os enchidos para uma travessa, corte em pedaços e rodelas e reserve em local morno.',
        notes: 'O caldo fica impregnado de cor rubi profunda vinda do feijão e dos enchidos.'
      },
      {
        stepNumber: 3,
        portugueseText: 'Junte ao caldo as batatas aos cubos, as cenouras, o alho, o louro e a couve ripada. Cozinhe por mais 25 minutos até os vegetais estarem sumarentos e macios.',
        notes: 'Esmague algumas batatas com a colher de pau contra a parede do pote para dar aveludado ao caldo.'
      },
      {
        stepNumber: 4,
        portugueseText: 'Volte a introduzir as carnes fatiadas na panela, rectifique o sal e adicione os coentros frescos picados. Sirva em tigelas de barro com fatias grossas de pão alentejano rústico.',
        notes: 'Quem encontrar a pedra na sua tigela tem honra de contar uma história à mesa!'
      }
    ]
  },
  {
    id: 'compota-marmelo-vinho-porto',
    slug: 'compota-marmelo-vinho-porto',
    title: 'Compota Real de Marmelo com Vinho do Porto e Noz',
    originalTitle: 'Royal Quince & Tawny Port Preserve',
    subtitle: 'Doce canónico de outono para guarda em frascos herméticos de vidro',
    category: 'doces',
    prepTimeMinutes: 35,
    cookTimeMinutes: 60,
    servings: 6, // 4 frascos de 250ml
    difficulty: 'Fácil',
    difficultyLevel: 'Fácil',
    dropCapLetter: 'O',
    historicalNote: 'O marmelo, venerado desde a antiguidade clássica como símbolo de fertilidade e afeto, ganha nos conventos portugueses uma textura aveludada quando fervido lentamente com açúcar de cana e um cálice generoso de vinho do Porto envelhecido.',
    pantrySecret: 'Nunca deite fora os caroços e as cascas limpas: coloque-os numa gaze amarrada dentro do tacho. É aí que reside a pectina pura que confere o corte firme à marmelada.',
    tags: ['Frutas de Outono', 'Pectina Natural', 'Vinho do Porto', 'Conserva'],
    area: 'Portuguese',
    nutrition: {
      calories: 120,
      protein: 0.4,
      carbs: 29.0,
      fat: 0.1,
      fiber: 1.2,
      servingSize: '2 colheres de sopa fartas (40g)',
    },
    originalSourceTitle: 'Caderno de Receitas Manuscrito da Quinta',
    originalSourceUrl: 'https://pt.wikipedia.org/wiki/Marmelada',
    videoTutorialTitle: 'Tele-Cozinha: O Ponto de Estrada no Prato Gelado e Esterilização de Frascos',
    ingredients: [
      { item: 'Marmelos maduros e aromáticos colhidos em Outono', amount: '1,2 kg (líquido limpo: 1kg)' },
      { item: 'Açúcar de cana cristal branco ou louro', amount: '750g (proporção de ouro)' },
      { item: 'Vinho do Porto Tawny ou Ruby reserva', amount: '100ml' },
      { item: 'Casca de 1 limão fino sem a parte branca', amount: '2 tiras' },
      { item: 'Pau de canela de Ceilão autêntico', amount: '1 unidade' },
      { item: 'Miolo de nozes da época partidas aos pedaços', amount: '80g' },
      { item: 'Água pura de nascente', amount: '200ml' }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: 'Lave os marmelos esfregando o cotão da casca. Descasque-os, retire os corações duros e corte a polpa em cubos médios. Coloque as cascas e caroços num saquinho de musselina limpo.',
        notes: 'O saquinho de musselina liberta a pectina sem deixar resíduos granulados na compota.'
      },
      {
        stepNumber: 2,
        portugueseText: 'Num tacho de cobre ou fundo pesado, coloque os marmelos em cubos, a água, a casca de limão, o pau de canela e o saquinho de cascas. Deixe cozer em lume brando durante 15 minutos até a fruta amaciar.',
        notes: 'A fruta começará a libertar um tom amarelo dourado quente e perfume floral.'
      },
      {
        stepNumber: 3,
        portugueseText: 'Retire o saquinho de cascas espremendo o seu sumo precioso. Adicione o açúcar e o cálice de vinho do Porto. Mexa com colher de pau em lume brando durante 40 a 50 minutos até atingir o ponto de estrada rubi.',
        notes: 'Teste o ponto: deite uma gota num prato frio e passe o dedo; se abrir estrada sem fechar, está perfeito.'
      },
      {
        stepNumber: 4,
        portugueseText: 'Junte as nozes picadas nos últimos 3 minutos. Verta a compota ainda a ferver para frascos de vidro esterilizados, feche hermeticamente e vire-os de cabeça para baixo durante 20 minutos para criar vácuo natural.',
        notes: 'Coloque o seu rótulo personalizado do BiteSync e guarde na despensa fresca até 1 ano.'
      }
    ]
  },
  {
    id: 'tarte-maca-bravo-esmolfe',
    slug: 'tarte-maca-bravo-esmolfe',
    title: 'Tarte Clássica de Maçã Bravo de Esmolfe com Canela',
    originalTitle: 'Heirloom Apple Tart with Ceylon Cinnamon',
    subtitle: 'Crosta quebradiça com manteiga da serra e maçãs perfumadas em flor',
    category: 'doces',
    prepTimeMinutes: 30,
    cookTimeMinutes: 40,
    servings: 8,
    difficulty: 'Fácil',
    difficultyLevel: 'Fácil',
    dropCapLetter: 'A',
    historicalNote: 'A maçã Bravo de Esmolfe, cultivada na Beira Alta desde o século XVIII, tem uma polpa sumarenta, doce e ligeiramente acidulada que dispensa açúcares pesados e perfuma a cozinha inteira durante a cozedura.',
    pantrySecret: 'Polvilhe a base da massa com 1 colher de amêndoa moída antes de assentar as fatias de maçã: absorve o excesso de sumo sem empapar a massa.',
    tags: ['Maçã de Denominação', 'Massa Estaladiça', 'Chá da Tarde', 'Canela'],
    area: 'Portuguese',
    nutrition: {
      calories: 295,
      protein: 3.5,
      carbs: 44.0,
      fat: 11.5,
      fiber: 2.8,
      servingSize: '1 fatia média (130g)',
    },
    originalSourceTitle: 'Caderno de Confeitaria Doméstica',
    originalSourceUrl: 'https://pt.wikipedia.org/wiki/Ma%C3%A7%C3%A3_Bravo_de_Esmolfe',
    videoTutorialTitle: 'Tele-Cozinha: Corte Fino em Meia-Lua e Montagem em Roseta',
    ingredients: [
      { item: 'Massa quebrada caseira amanteigada', amount: '1 base redonda' },
      { item: 'Maçãs Bravo de Esmolfe ou Reinetas', amount: '5 unidades' },
      { item: 'Manteiga derretida sem sal', amount: '30g' },
      { item: 'Açúcar amarelo ou mascavado fino', amount: '3 colheres de sopa' },
      { item: 'Canela de Ceilão em pó', amount: '1 colher de sobremesa' },
      { item: 'Sumo de 1/2 limão fresco', amount: '1 colher de sopa' },
      { item: 'Geleia de marmelo ou damasco para abrilhantar', amount: '2 colheres de sopa' }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: 'Forre uma tarteira com a massa quebrada, pique o fundo com um garfo e leve ao frigorífico enquanto prepara o recheio de fruta.',
        notes: 'Manter a massa fria até entrar no forno bem quente garante estaladiço sem murchar.'
      },
      {
        stepNumber: 2,
        portugueseText: 'Descasque 2 maçãs, corte aos cubinhos e cozinhe com 1 colher de açúcar e sumo de limão até formar um puré rústico. Espalhe este puré no fundo da tarte.',
        notes: 'O puré serve de colchão aveludado sob as fatias decorativas.'
      },
      {
        stepNumber: 3,
        portugueseText: 'Descasque as 3 maçãs restantes e corte em meias-luas muito finas. Disponha-as em círculos concêntricos sobre o puré, sobrepondo ligeiramente como pétalas de rosa.',
        notes: 'Pincele cada fatia com a manteiga derretida e polvilhe a canela e o açúcar restante.'
      },
      {
        stepNumber: 4,
        portugueseText: 'Leve ao forno a 190 °C durante 35 a 40 minutos até os bordos da massa dourarem e as pontas das maçãs caramelizarem. Ao retirar, pincele delicadamente com a geleia morna para dar brilho de montra.',
        notes: 'Sirva tépida com uma colher de natas frescas batidas sem açúcar.'
      }
    ]
  },
  {
    id: 'ensopado-borrego-hortela',
    slug: 'ensopado-borrego-hortela',
    title: 'Ensopado de Borrego do Solar com Hortelã Fresca',
    originalTitle: 'Solar Farmstead Lamb Stew with Wild Mint',
    subtitle: 'Cozedura lenta ao fogão de ferro com fatias de pão frito em azeite virgem',
    category: 'carnes',
    prepTimeMinutes: 25,
    cookTimeMinutes: 75,
    servings: 5,
    difficulty: 'Especialista',
    difficultyLevel: 'Especialista',
    dropCapLetter: 'N',
    historicalNote: 'Prato nobre das herdades do sul em dias de festa da tosquia e Páscoa, onde a carne de pasto é temperada de véspera com vinho branco da adega e coroada com hortelã da ribeira.',
    pantrySecret: 'A hortelã só entra nos últimos 2 minutos de apuro do molho com o tacho tapado: o vapor aprisiona os óleos essenciais sem queimar as folhas.',
    tags: ['Borrego da Pastagem', 'Pão Frito', 'Hortelã Fresca', 'Festa Tradicional'],
    area: 'Portuguese',
    nutrition: {
      calories: 540,
      protein: 42.0,
      carbs: 28.0,
      fat: 27.0,
      fiber: 3.0,
      servingSize: '1 prato de ensopado com pão (400g)',
    },
    originalSourceTitle: 'Culinária Tradicional Portuguesa (Maria de Lourdes Modesto)',
    originalSourceUrl: 'https://pt.wikipedia.org/wiki/Ensopado_de_borrego',
    videoTutorialTitle: 'Tele-Cozinha: Ponto da Marinada e Selagem em Azeite de Lagar',
    ingredients: [
      { item: 'Carne de borrego da pá e costeletas cortada em pedaços', amount: '1 kg' },
      { item: 'Vinho branco maduro e seco', amount: '250ml' },
      { item: 'Cebolas médias picadas', amount: '2 unidades' },
      { item: 'Dentes de alho esmagados', amount: '5 dentes' },
      { item: 'Massa de pimentão doce tradicional', amount: '1 colher de sopa cheia' },
      { item: 'Azeite virgem extra de lagar', amount: '80ml' },
      { item: 'Ramos fartos de hortelã da ribeira', amount: '1 molho generoso' },
      { item: 'Pão de trigo alentejano do dia anterior em fatias', amount: '8 fatias' }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: 'Num alguidar de barro, tempere a carne com o vinho branco, alho, louro, massa de pimentão, sal e pimenta. Deixe marinar durante pelo menos 4 horas (ideal de véspera).',
        notes: 'A marinada amacia as fibras da carne e perfuma o fundo do guisado.'
      },
      {
        stepNumber: 2,
        portugueseText: 'Num tacho de ferro fundido, aqueça o azeite e aloure os pedaços de carne bem escorridos. Junte a cebola picada e deixe refogar suavemente até ficar transparente.',
        notes: 'Selar bem a carne cria os açúcares caramelizados que dão cor e profundidade ao caldo.'
      },
      {
        stepNumber: 3,
        portugueseText: 'Verta a marinada sobre a carne e acrescente água quente suficiente até cobrir metade. Tape hermeticamente e deixe estufar em lume brando durante 60 minutos até a carne se soltar do osso.',
        notes: 'Mantenha o lume baixíssimo, apenas um borbulhar tímido no centro do tacho.'
      },
      {
        stepNumber: 4,
        portugueseText: 'Frite as fatias de pão numa frigideira com um fio de azeite até dourarem. Disponha o pão no fundo de uma travessa funda, verta o borrego e o caldo fervente por cima e cubra com a hortelã fresca.',
        notes: 'O pão absorve o molho rico e aveludado com o perfume refrescante da hortelã.'
      }
    ]
  }
];

export const CANONICAL_RECIPES: Recipe[] = [
  ...PORTUGUESE_RECIPES,
  ...BASE_CANONICAL_RECIPES
];

