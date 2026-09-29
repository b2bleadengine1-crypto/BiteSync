const fs = require('fs');
const path = require('path');

const recipes = [
  // ==========================================
  // 1. PETISCOS E ENTRADAS (11 Receitas)
  // ==========================================
  {
    id: "pt-peixinhos-da-horta",
    slug: "peixinhos-da-horta",
    title: "Peixinhos da Horta Estaladiços",
    originalTitle: "Peixinhos da Horta Tradicionais",
    subtitle: "Vagens tenras de feijão-verde envolvidas em polme aveludado e fritas até dourarem",
    category: "petiscos",
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    servings: 4,
    difficulty: "Fácil",
    difficultyLevel: "Fácil",
    dropCapLetter: "P",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Petisco", "Estremadura", "Tradicional", "Vegetariano"],
    nutrition: {
      calories: 220,
      protein: 5.5,
      carbs: 26.0,
      fat: 10.5,
      fiber: 3.8,
      servingSize: "1 porção de petisco (120g)"
    },
    ingredients: [
      { item: "Feijão-verde tenro sem fios", amount: "400g", estimatedGrams: 400, category: "legumes" },
      { item: "Farinha de trigo sem fermento", amount: "150g", estimatedGrams: 150, category: "despensa" },
      { item: "Ovos frescos", amount: "2 un", estimatedGrams: 100, category: "laticinios" },
      { item: "Água com gás bem fresca", amount: "100ml", estimatedGrams: 100, category: "despensa" },
      { item: "Azeite ou óleo para fritar", amount: "300ml", estimatedGrams: 280, category: "despensa" },
      { item: "Sal marinho fino e pimenta", amount: "1 colher de chá", estimatedGrams: 5, category: "especiarias" },
      { item: "Limão cortado em gomos", amount: "1 un", estimatedGrams: 80, category: "frutas" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Arranje o feijão-verde retirando as pontas e os fios laterais. Coza em água a ferver com sal durante 4 a 5 minutos [⏳ 5 minutos] até ficar al dente. Escorra e passe por água fria com gelo.",
        notes: "O choque térmico fixa a cor verde viva e preserva a crocância."
      },
      {
        stepNumber: 2,
        portugueseText: "Numa tigela, bata os ovos com uma pitada de sal e pimenta. Junte a farinha gradualmente e envolva a água com gás até formar um polme liso e cremoso que agarre na colher.",
        notes: "A água com gás fria liberta bolhas que deixam o frito ultra crocante."
      },
      {
        stepNumber: 3,
        portugueseText: "Passe as vagens de feijão-verde pelo polme, garantindo que ficam completamente cobertas. Frite em azeite/óleo bem quente a 180°C durante 2 a 3 minutos até dourarem dos dois lados.",
        notes: "Não sobrecarregue a frigideira para o óleo não arrefecer."
      },
      {
        stepNumber: 4,
        portugueseText: "Escorra sobre papel absorvente, polvilhe com uma pitada de flor de sal e sirva de imediato com gomos de limão fresco.",
        notes: "Petisco que deu origem ao tempura japonês levado pelos navegadores portugueses no século XVI."
      }
    ],
    pantrySecret: "Usar água com gás bem gelada na massa do polme para que o choque térmico no azeite quente forme uma crosta estaladiça e sequinha.",
    originalSourceTitle: "Tradição das Hortas Saloias de Lisboa",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Peixinhos_da_horta"
  },
  {
    id: "pt-salada-de-polvo",
    slug: "salada-de-polvo",
    title: "Salada de Polvo Fresco com Vinagrete",
    originalTitle: "Salada de Polvo à Portuguesa",
    subtitle: "Pedaços tenros de polvo do mar cozido nos seus próprios sucos com cebola roxa, pimentos e azeite",
    category: "petiscos",
    prepTimeMinutes: 20,
    cookTimeMinutes: 40,
    servings: 4,
    difficulty: "Fácil",
    difficultyLevel: "Fácil",
    dropCapLetter: "S",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Petisco", "Polvo", "Taberna", "Verão", "Algarve"],
    nutrition: {
      calories: 240,
      protein: 29.0,
      carbs: 6.5,
      fat: 11.0,
      fiber: 1.8,
      servingSize: "1 taça individual (180g)"
    },
    ingredients: [
      { item: "Polvo cozido tenro cortado em rodelas", amount: "600g", estimatedGrams: 600, category: "peixes" },
      { item: "Cebola roxa picada finamente", amount: "1 un (120g)", estimatedGrams: 120, category: "legumes" },
      { item: "Pimento verde picadinho", amount: "1/2 un (80g)", estimatedGrams: 80, category: "legumes" },
      { item: "Pimento vermelho picadinho", amount: "1/2 un (80g)", estimatedGrams: 80, category: "legumes" },
      { item: "Dentes de alho picados fino", amount: "2 dentes", estimatedGrams: 10, category: "legumes" },
      { item: "Salsa fresca picada generosa", amount: "1 molho pequeno", estimatedGrams: 20, category: "legumes" },
      { item: "Azeite virgem extra de alta qualidade", amount: "60ml", estimatedGrams: 55, category: "despensa" },
      { item: "Vinagre de vinho branco ou cidra", amount: "25ml", estimatedGrams: 25, category: "despensa" },
      { item: "Flor de sal e pimenta moída", amount: "A gosto", estimatedGrams: 4, category: "especiarias" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Coza o polvo na panela sem água e apenas com uma cebola inteira durante 40 minutos [⏳ 40 minutos]. Deixe arrefecer na própria panela e corte os tentáculos em rodelas de 1 cm.",
        notes: "Cozer sem água concentra o sabor marinho do polvo."
      },
      {
        stepNumber: 2,
        portugueseText: "Numa saladeira, junte a cebola roxa picada, os cubinhos de pimento verde e vermelho, os alhos picados e o polvo em rodelas.",
        notes: "Picar os legumes em cubos do mesmo tamanho confere harmonia estética e textura equilibrada."
      },
      {
        stepNumber: 3,
        portugueseText: "Num frasco com tampa, emulsione o azeite virgem extra, o vinagre de vinho, a flor de sal e a pimenta-preta, agitando vigorosamente durante 15 segundos.",
        notes: "O vinagrete emulsionado envolve os ingredientes sem escorrer todo para o fundo."
      },
      {
        stepNumber: 4,
        portugueseText: "Regue o polvo com a vinagrete, envolva a salsa fresca picada e leve ao frigorífico durante pelo menos 30 minutos antes de servir bem fresca.",
        notes: "O repouso no frio faz o polvo absorver os ácidos e aromas do azeite."
      }
    ],
    pantrySecret: "Deixar a salada temperada repousar no frigorífico durante 30 a 60 minutos antes de servir para apurar e amaciar o polvo com a acidez do vinagre.",
    originalSourceTitle: "Tascas e Tabernas Tradicionais da Costa",
    originalSourceUrl: "https://www.youtube.com/results?search_query=salada+de+polvo+tradicional"
  },
  {
    id: "pt-pica-pau-novilho",
    slug: "pica-pau-novilho",
    title: "Pica-Pau de Novilho com Picles e Azeitonas",
    originalTitle: "Pica-Pau à Cervejaria",
    subtitle: "Tiras suculentas de lombo de vaca salteadas em azeite, alho e cerveja branca com mostarda e picles",
    category: "petiscos",
    prepTimeMinutes: 10,
    cookTimeMinutes: 10,
    servings: 4,
    difficulty: "Fácil",
    difficultyLevel: "Fácil",
    dropCapLetter: "P",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Petisco", "Cervejaria", "Carne", "Lisboa", "Porto"],
    nutrition: {
      calories: 360,
      protein: 34.0,
      carbs: 6.0,
      fat: 21.0,
      fiber: 1.2,
      servingSize: "1 travessa partilhada (180g)"
    },
    ingredients: [
      { item: "Lombo ou vazia de novilho em cubos de 2cm", amount: "500g", estimatedGrams: 500, category: "carnes" },
      { item: "Dentes de alho laminados", amount: "4 dentes", estimatedGrams: 20, category: "legumes" },
      { item: "Folhas de louro", amount: "2 folhas", estimatedGrams: 2, category: "especiarias" },
      { item: "Azeite virgem extra", amount: "40ml", estimatedGrams: 36, category: "despensa" },
      { item: "Manteiga com sal", amount: "25g", estimatedGrams: 25, category: "laticinios" },
      { item: "Cerveja branca", amount: "120ml", estimatedGrams: 120, category: "despensa" },
      { item: "Mostarda tradicional tipo Dijon", amount: "1 colher de sopa", estimatedGrams: 15, category: "despensa" },
      { item: "Molho inglês e piri-piri", amount: "1 colher de chá", estimatedGrams: 5, category: "especiarias" },
      { item: "Picles picados e azeitonas pretas", amount: "100g", estimatedGrams: 100, category: "legumes" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Tempere a carne com sal marinho e pimenta moída na hora momentos antes de ir para a frigideira.",
        notes: "Não salgue muito tempo antes para a carne não perder sucos."
      },
      {
        stepNumber: 2,
        portugueseText: "Numa frigideira de ferro bem quente, aqueça o azeite e a manteiga. Junte os alhos laminados e o louro. Quando perfumar, deite a carne em lume muito forte e sele rapidamente durante 2 a 3 minutos [⏳ 3 minutos] até dourar por fora e manter o centro rosado.",
        notes: "Trabalhar em lume alto evita que a carne ferva nos próprios sucos."
      },
      {
        stepNumber: 3,
        portugueseText: "Refresque com a cerveja, junte a mostarda, o molho inglês e o piri-piri. Mexa a frigideira para ligar o molho durante 2 minutos até engrossar e ficar aveludado.",
        notes: "A mostarda emulsiona a gordura com a cerveja, criando um molho viciante."
      },
      {
        stepNumber: 4,
        portugueseText: "Retire do lume, cubra com os picles picados e as azeitonas e sirva imediatamente com palitos e fatias de pão rústico para molhar no molho.",
        notes: "Comer com palito é o ritual que dá o nome de 'Pica-Pau'."
      }
    ],
    pantrySecret: "Selar a carne em lume altíssimo em 3 minutos e emulsione a mostarda na cerveja para criar aquele molho brilhante e apurado característico das melhores cervejarias.",
    originalSourceTitle: "Cervejarias de Lisboa e Ribatejo",
    originalSourceUrl: "https://www.youtube.com/results?search_query=pica+pau+de+novilho+receita"
  },
  {
    id: "pt-ameijoas-bulhao-pato",
    slug: "ameijoas-a-bulhao-pato",
    title: "Amêijoas à Bulhão Pato com Coentros",
    originalTitle: "Amêijoas à Bulhão Pato Tradicionais",
    subtitle: "Amêijoas abertas no vapor de azeite aromático, muito alho fresco, vinho branco e coentros picados",
    category: "petiscos",
    prepTimeMinutes: 15,
    cookTimeMinutes: 8,
    servings: 4,
    difficulty: "Fácil",
    difficultyLevel: "Fácil",
    dropCapLetter: "A",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Petisco", "Marisco", "Estremadura", "Lisboa", "Verão"],
    nutrition: {
      calories: 195,
      protein: 18.0,
      carbs: 4.2,
      fat: 11.5,
      fiber: 0.8,
      servingSize: "1 travessa individual (200g com concha)"
    },
    ingredients: [
      { item: "Amêijoas frescas da costa bem lavadas e desparasitadas de areia", amount: "800g", estimatedGrams: 800, category: "peixes" },
      { item: "Dentes de alho fatiados finamente", amount: "6 dentes", estimatedGrams: 30, category: "legumes" },
      { item: "Azeite virgem extra de lagar", amount: "60ml", estimatedGrams: 55, category: "despensa" },
      { item: "Vinho branco seco de qualidade", amount: "70ml", estimatedGrams: 70, category: "despensa" },
      { item: "Coentros frescos picados finos", amount: "1 molho generoso (30g)", estimatedGrams: 30, category: "legumes" },
      { item: "Limão fresco cortado em quartos", amount: "1 un", estimatedGrams: 80, category: "frutas" },
      { item: "Pimenta-preta de moinho", amount: "A gosto", estimatedGrams: 2, category: "especiarias" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Deixe as amêijoas de molho em água salgada durante 2 horas para soltarem qualquer areia residual. Lave sob água corrente fria e escorra.",
        notes: "Elimine de imediato qualquer concha partida ou que permaneça escancarada."
      },
      {
        stepNumber: 2,
        portugueseText: "Num tacho largo ou sertã funda, coloque o azeite virgem e os alhos laminados. Deixe aquecer em lume brando até o alho largar aroma sem deixar alourar.",
        notes: "Alho queimado amarga o caldo suave das amêijoas."
      },
      {
        stepNumber: 3,
        portugueseText: "Adicione as amêijoas escorridas, verta o vinho branco e tape a panela de imediato. Deixe cozinhar em lume forte durante 3 a 5 minutos [⏳ 4 minutos], abanando o tacho de vez em quando até abrirem todas.",
        notes: "O vapor do vinho branco abre as conchas preservando o néctar salgado interior."
      },
      {
        stepNumber: 4,
        portugueseText: "Destape, polvilhe abundantemente com os coentros frescos picados e uma pitada de pimenta preta. Sirva de imediato acompanhado de quartos de limão para quem desejar espremer no prato.",
        notes: "Rejeite qualquer amêijoa que não tenha aberto."
      }
    ],
    pantrySecret: "Não deixar o alho queimar e tapar bem o tacho para que as amêijoas abram unicamente no vapor aromatizado do azeite com vinho branco.",
    originalSourceTitle: "Receituário Clássico de Lisboa (Homenagem ao poeta Bulhão Pato)",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Am%C3%AAijoas_%C3%A0_Bulh%C3%A3o_Pato"
  },
  {
    id: "pt-chourico-assado",
    slug: "chourico-assado-em-aguardente",
    title: "Chouriço Assado em Canoa de Barro com Aguardente",
    originalTitle: "Chouriço de Fumeiro Assado à Tasca",
    subtitle: "Chouriço de carne curado no fumo de lenha, retalhado e flambado na tradicional assadeira de barro com bagaço",
    category: "petiscos",
    prepTimeMinutes: 5,
    cookTimeMinutes: 8,
    servings: 4,
    difficulty: "Fácil",
    difficultyLevel: "Fácil",
    dropCapLetter: "C",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Petisco", "Fumeiro", "Taberna", "Fogo", "Minho", "Trás-os-Montes"],
    nutrition: {
      calories: 310,
      protein: 21.0,
      carbs: 1.5,
      fat: 24.5,
      fiber: 0.2,
      servingSize: "1 porção de fumeiro (80g)"
    },
    ingredients: [
      { item: "Chouriço de carne tradicional de cura a lenha", amount: "1 un (250g)", estimatedGrams: 250, category: "carnes" },
      { item: "Aguardente vínica ou bagaço tradicional (mínimo 45% vol.)", amount: "60ml", estimatedGrams: 60, category: "despensa" },
      { item: "Broa de milho ou pão rústico alentejano fatiado", amount: "4 fatias", estimatedGrams: 160, category: "despensa" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Com uma faca afiada, faça cortes transversais paralelos ao longo de todo o chouriço com 1 cm de distância entre si, sem cortar a base por completo.",
        notes: "Os cortes permitem que a gordura extra escorra e a pele toste por igual."
      },
      {
        stepNumber: 2,
        portugueseText: "Coloque o chouriço na grelha da assadeira de barro típica. Verta a aguardente vínica de qualidade no fundo da canoa de barro.",
        notes: "Certifique-se de que a assadeira está numa superfície refratária e longe de materiais inflamáveis."
      },
      {
        stepNumber: 3,
        portugueseText: "Com um fósforo longo, acenda cuidadosamente a aguardente no fundo. Deixe a chama queimar [⏳ 5 minutos], virando o chouriço a meio com um garfo metálico até a pele ficar crestada e estaladiça.",
        notes: "O álcool evapora na íntegra, restando apenas o perfume da tosta e do vinho."
      },
      {
        stepNumber: 4,
        portugueseText: "Apague a chama soprando suavemente se ainda arder, corte em fatias e sirva imediatamente sobre fatias grossas de broa de milho.",
        notes: "A broa absorve a gordura aromática do fundo da assadeira."
      }
    ],
    pantrySecret: "Usar aguardente com pelo menos 45% de volume de álcool para garantir chama constante e virar o chouriço para tostar a pele sem queimar o interior.",
    originalSourceTitle: "Tabernas e Adegas Típicas de Portugal",
    originalSourceUrl: "https://www.youtube.com/results?search_query=chourico+assado+na+canoa"
  },
  {
    id: "pt-pasteis-de-bacalhau",
    slug: "pasteis-de-bacalhau",
    title: "Pastéis de Bacalhau Tradicionais com Salsa",
    originalTitle: "Pastéis de Bacalhau Tradicionais",
    subtitle: "A perfeita combinação de bacalhau lascado, batata cozida em puré, ovos do campo e salsa fresca moldados com duas colheres",
    category: "petiscos",
    prepTimeMinutes: 30,
    cookTimeMinutes: 15,
    servings: 6,
    difficulty: "Médio",
    difficultyLevel: "Médio",
    dropCapLetter: "P",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Petisco", "Bacalhau", "Tradicional", "Fritura", "Norte", "Lisboa"],
    nutrition: {
      calories: 275,
      protein: 19.5,
      carbs: 22.0,
      fat: 12.0,
      fiber: 2.1,
      servingSize: "2 pastéis médios (120g)"
    },
    ingredients: [
      { item: "Bacalhau demolhado cozido e desfiado finíssimo num pano", amount: "400g", estimatedGrams: 400, category: "peixes" },
      { item: "Batatas para puré cozidas com pele e descascadas quentes", amount: "500g", estimatedGrams: 500, category: "legumes" },
      { item: "Ovos médios inteiros", amount: "3 un", estimatedGrams: 150, category: "laticinios" },
      { item: "Cebola picada tão fina que quase derrete", amount: "1 un pequena", estimatedGrams: 80, category: "legumes" },
      { item: "Salsa fresca picada generosa", amount: "1 molho pequeno (20g)", estimatedGrams: 20, category: "legumes" },
      { item: "Noz-moscada ralada na hora e pimenta-branca", amount: "1 pitada", estimatedGrams: 2, category: "especiarias" },
      { item: "Azeite e óleo para fritura abundante", amount: "400ml", estimatedGrams: 360, category: "despensa" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Coza o bacalhau demolhado durante 5 minutos. Escorra, retire peles e espinhas. Coloque o bacalhau num pano de cozinha limpo e esfregue vigorosamente até ficar em fios finíssimos como algodão.",
        notes: "O segredo da textura aveludada é desfiar o bacalhau em fibras no pano e nunca triturar com máquina."
      },
      {
        stepNumber: 2,
        portugueseText: "Passe as batatas ainda quentes pelo passe-vite para ficarem em puré seco e aveludado. Junte o bacalhau desfiado, a cebola picadinha e a salsa fresca picada.",
        notes: "Trabalhar com a batata quente ajuda a absorver o bacalhau."
      },
      {
        stepNumber: 3,
        portugueseText: "Adicione os ovos um a um, batendo a massa com uma colher de pau até obter uma pasta moldável e homogénea. Tempere com pimenta branca e noz-moscada.",
        notes: "A consistência não deve ser líquida nem pesada."
      },
      {
        stepNumber: 4,
        portugueseText: "Molde os pastéis passando porções de massa entre duas colheres de sopa até formar o clássico formato oval de três faces. Frite em azeite/óleo bem quente a 180°C até dourarem por igual.",
        notes: "Escorra sobre papel absorvente e sirva quentes ou frios com arroz de feijão ou tomate."
      }
    ],
    pantrySecret: "Esfregar o bacalhau cozido dentro de um pano de linho grosso para que se desfie em fios de algodão antes de juntar à batata passada no passe-vite.",
    originalSourceTitle: "Tratado Completo de Cozinha Portuguesa",
    originalSourceUrl: "https://www.youtube.com/results?search_query=pasteis+de+bacalhau+perfeitos"
  },
  {
    id: "pt-pataniscas-de-bacalhau",
    slug: "pataniscas-de-bacalhau",
    title: "Pataniscas de Bacalhau Douradas",
    originalTitle: "Pataniscas de Bacalhau à Lisboeta",
    subtitle: "Polme leve e arejado com lascas generosas de bacalhau, cebola picada e salsa fresca frito em azeite",
    category: "petiscos",
    prepTimeMinutes: 20,
    cookTimeMinutes: 15,
    servings: 4,
    difficulty: "Fácil",
    difficultyLevel: "Fácil",
    dropCapLetter: "P",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Petisco", "Bacalhau", "Lisboa", "Estremadura", "Fritura"],
    nutrition: {
      calories: 320,
      protein: 24.0,
      carbs: 23.0,
      fat: 14.5,
      fiber: 1.5,
      servingSize: "2 pataniscas grandes (160g)"
    },
    ingredients: [
      { item: "Bacalhau demolhado cru desfiado em lascas", amount: "350g", estimatedGrams: 350, category: "peixes" },
      { item: "Farinha de trigo sem fermento", amount: "180g", estimatedGrams: 180, category: "despensa" },
      { item: "Ovos frescos", amount: "3 un", estimatedGrams: 150, category: "laticinios" },
      { item: "Água da cozedura do bacalhau ou cerveja", amount: "120ml", estimatedGrams: 120, category: "despensa" },
      { item: "Cebola média picadinha", amount: "1 un (100g)", estimatedGrams: 100, category: "legumes" },
      { item: "Salsa fresca abundante picada", amount: "1 molho", estimatedGrams: 25, category: "legumes" },
      { item: "Pimenta preta e sal marinho", amount: "A gosto", estimatedGrams: 3, category: "especiarias" },
      { item: "Azeite para fritar", amount: "200ml", estimatedGrams: 180, category: "despensa" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Numa taça, bata os ovos com a farinha e adicione aos poucos a água ou cerveja fria até obter um polme liso e fluido como massa de panqueca grossa.",
        notes: "A massa deve escorrer da colher formando uma fita suave."
      },
      {
        stepNumber: 2,
        portugueseText: "Junte o bacalhau desfiado cru em lascas pequenas, a cebola picada finamente e a salsa abundante. Tempere com sal e pimenta moída.",
        notes: "Usar bacalhau cru deixa a patanisca incrivelmente mais suculenta do que se usar bacalhau pré-cozido."
      },
      {
        stepNumber: 3,
        portugueseText: "Aqueça o azeite numa frigideira larga. Deite colheradas de massa espaçadas e achate suavemente com as costas da colher para ficarem achatadas e estaladiças.",
        notes: "Frite durante 2 a 3 minutos de cada lado até alourarem."
      },
      {
        stepNumber: 4,
        portugueseText: "Escorra sobre papel absorvente e sirva bem estaladiças acompanhadas do clássico Arroz Malandrinho de Feijão ou Tomate.",
        notes: "Um dos pilares das tascas tradicionais de Lisboa."
      }
    ],
    pantrySecret: "Usar o bacalhau demolhado em cru desfiado em lasquinhas finas; o peixe coze na própria fritura do polme e mantém todo o colagénio e suculência.",
    originalSourceTitle: "Tascas e Tabernas de Lisboa e Ribatejo",
    originalSourceUrl: "https://www.youtube.com/results?search_query=pataniscas+de+bacalhau+tradicionais"
  },
  {
    id: "pt-moelas-estufadas",
    slug: "moelas-estufadas-a-portuguesa",
    title: "Moelas Estufadas à Portuguesa em Molho Picante",
    originalTitle: "Moelas Estufadas de Taberna",
    subtitle: "Moelas de aves estufadas lentamente até ficarem ultra tenras num rico refogado de tomate, vinho branco e piri-piri",
    category: "petiscos",
    prepTimeMinutes: 20,
    cookTimeMinutes: 60,
    servings: 4,
    difficulty: "Médio",
    difficultyLevel: "Médio",
    dropCapLetter: "M",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Petisco", "Taberna", "Carne", "Picante", "Vinho Branco"],
    nutrition: {
      calories: 310,
      protein: 36.0,
      carbs: 7.5,
      fat: 14.0,
      fiber: 1.6,
      servingSize: "1 taça de petisco (190g)"
    },
    ingredients: [
      { item: "Moelas de frango ou peru limpas e cortadas em pedaços", amount: "800g", estimatedGrams: 800, category: "carnes" },
      { item: "Cebolas médias picadas", amount: "2 un (200g)", estimatedGrams: 200, category: "legumes" },
      { item: "Dentes de alho picados", amount: "4 dentes", estimatedGrams: 20, category: "legumes" },
      { item: "Tomate maduro triturado ou polpa", amount: "300g", estimatedGrams: 300, category: "legumes" },
      { item: "Vinho branco seco", amount: "200ml", estimatedGrams: 200, category: "despensa" },
      { item: "Azeite virgem extra", amount: "50ml", estimatedGrams: 45, category: "despensa" },
      { item: "Folhas de louro", amount: "2 folhas", estimatedGrams: 2, category: "especiarias" },
      { item: "Massa de pimentão doce", amount: "1 colher de sopa", estimatedGrams: 20, category: "especiarias" },
      { item: "Piri-piri da horta", amount: "1 colher de chá", estimatedGrams: 5, category: "especiarias" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Lave e limpe muito bem as moelas, retirando quaisquer peles amarelas e excessos de gordura. Ferva-as previamente durante 10 minutos em água com sal e escorra.",
        notes: "A fervura inicial retira impurezas e prepara as fibras para o estufado longo."
      },
      {
        stepNumber: 2,
        portugueseText: "Num tacho pesado, aqueça o azeite e refogue a cebola picada, o alho e as folhas de louro até ficarem translúcidos e doces.",
        notes: "Junte a massa de pimentão e envolva durante 1 minuto."
      },
      {
        stepNumber: 3,
        portugueseText: "Adicione as moelas escorridas, o tomate triturado, o vinho branco e o piri-piri. Tape hermeticamente e deixe estufar em lume brando durante 50 a 60 minutos [⏳ 50 minutos], adicionando um pouco de caldo quente se necessário.",
        notes: "As moelas estão prontas quando a ponta de uma faca entrar sem qualquer resistência."
      },
      {
        stepNumber: 4,
        portugueseText: "Deixe o molho apurar destapado nos últimos 5 minutos para ficar espesso e aveludado. Sirva polvilhado com salsa picada e muito pão de crosta grossa para o molho.",
        notes: "Petisco lendário das cervejarias e tascas do país."
      }
    ],
    pantrySecret: "Cozinhar em lume baixíssimo durante 1 hora com a tampa bem fechada; a cocção lenta desfaz o colagénio das moelas transformando-as em bocados macios e suculentos.",
    originalSourceTitle: "Tradição das Cervejarias Portuguesas",
    originalSourceUrl: "https://www.youtube.com/results?search_query=moelas+estufadas+petisco"
  },
  {
    id: "pt-ovos-com-espargos",
    slug: "ovos-com-espargos-selvagens",
    title: "Ovos com Espargos Verdes Selvagens Alentejanos",
    originalTitle: "Espargos Bravos com Ovos à Alentejana",
    subtitle: "Ponta de espargos bravos colhidos nos montados salteados em azeite, alho e envolvidos em ovos moles",
    category: "petiscos",
    prepTimeMinutes: 10,
    cookTimeMinutes: 10,
    servings: 4,
    difficulty: "Fácil",
    difficultyLevel: "Fácil",
    dropCapLetter: "O",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Petisco", "Alentejo", "Ovos", "Primavera", "Montado"],
    nutrition: {
      calories: 230,
      protein: 14.5,
      carbs: 4.0,
      fat: 17.5,
      fiber: 2.2,
      servingSize: "1 dose de petisco (150g)"
    },
    ingredients: [
      { item: "Espargos verdes selvagens ou de cultivo cortados à mão nas pontas tenras", amount: "300g", estimatedGrams: 300, category: "legumes" },
      { item: "Ovos frescos do campo", amount: "6 un", estimatedGrams: 300, category: "laticinios" },
      { item: "Dentes de alho picados", amount: "3 dentes", estimatedGrams: 15, category: "legumes" },
      { item: "Azeite virgem extra alentejano", amount: "40ml", estimatedGrams: 36, category: "despensa" },
      { item: "Sal marinho e pimenta moída", amount: "A gosto", estimatedGrams: 3, category: "especiarias" },
      { item: "Fatias finas de pão alentejano frito em azeite", amount: "4 fatias", estimatedGrams: 120, category: "despensa" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Parta os espargos à mão com os dedos a partir da ponta; o talo parte naturalmente no ponto exato onde deixa de ser fibroso e passa a ser tenro. Descarte a parte dura da base.",
        notes: "Nunca use faca: partir com os dedos garante apenas espargos incrivelmente macios."
      },
      {
        stepNumber: 2,
        portugueseText: "Escalde os espargos em água a ferver com sal durante 2 minutos [⏳ 2 minutos] e escorra de imediato.",
        notes: "Aquebrantar os espargos retira o excesso de amargor selvagem."
      },
      {
        stepNumber: 3,
        portugueseText: "Numa frigideira de ferro com o azeite, aloure levemente o alho picado. Junte os espargos e salteie em lume médio durante 3 minutos.",
        notes: "Mantenha os espargos com um toque estaladiço."
      },
      {
        stepNumber: 4,
        portugueseText: "Bata ligeiramente os ovos numa tigela com uma pitada de sal. Retire a frigideira do lume e verta os ovos, mexendo delicadamente com espátula até ficarem cremosos e húmidos.",
        notes: "O calor da frigideira fora do fogão é o segredo para os ovos não secarem."
      }
    ],
    pantrySecret: "Quebrar os espargos à mão (onde o caule estalar voluntariamente é onde termina a fibra dura) e retirar a frigideira do fogo antes de misturar os ovos batidos.",
    originalSourceTitle: "Cozinha dos Montados do Alentejo",
    originalSourceUrl: "https://www.youtube.com/results?search_query=espargos+com+ovos+alentejana"
  },
  {
    id: "pt-gambas-ao-alho",
    slug: "gambas-ao-alho",
    title: "Gambas ao Alho com Coentros e Malagueta",
    originalTitle: "Gambas à Guilho / Gambas ao Alho",
    subtitle: "Camarões carnudos salteados em azeite fervilhante aromatizado com abundância de alho, malagueta e coentros frescos",
    category: "petiscos",
    prepTimeMinutes: 10,
    cookTimeMinutes: 5,
    servings: 4,
    difficulty: "Fácil",
    difficultyLevel: "Fácil",
    dropCapLetter: "G",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Petisco", "Marisco", "Algarve", "Cervejaria", "Rápido"],
    nutrition: {
      calories: 220,
      protein: 26.0,
      carbs: 2.5,
      fat: 11.5,
      fiber: 0.5,
      servingSize: "1 caçarola de barro (160g)"
    },
    ingredients: [
      { item: "Gambas ou camarão cru descascado mantendo a cauda", amount: "500g", estimatedGrams: 500, category: "peixes" },
      { item: "Dentes de alho laminados", amount: "6 dentes", estimatedGrams: 30, category: "legumes" },
      { item: "Malagueta vermelha em rodelas sem sementes", amount: "1 un", estimatedGrams: 5, category: "especiarias" },
      { item: "Azeite virgem extra", amount: "70ml", estimatedGrams: 65, category: "despensa" },
      { item: "Vinho branco seco ou whisky", amount: "30ml", estimatedGrams: 30, category: "despensa" },
      { item: "Coentros frescos picados finos", amount: "1/2 molho", estimatedGrams: 15, category: "legumes" },
      { item: "Sal marinho e sumo de meio limão", amount: "A gosto", estimatedGrams: 15, category: "frutas" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Seque bem as gambas com papel de cozinha e tempere-as com sal marinho grosso.",
        notes: "Camarão seco frita em vez de cozer no próprio líquido."
      },
      {
        stepNumber: 2,
        portugueseText: "Numa caçarola de barro vidrado ou frigideira de ferro, aqueça o azeite generoso com o alho laminado e a malagueta em lume médio.",
        notes: "Deixe o alho borbulhar suavemente sem queimar."
      },
      {
        stepNumber: 3,
        portugueseText: "Quando o alho estiver a dourar levemente, adicione as gambas numa só camada. Cozinhe durante 1 minuto e meio [⏳ 2 minutos], vire as gambas e salpique com o vinho branco.",
        notes: "As gambas cozinham em escassos 3 minutos até mudarem para o tom coral."
      },
      {
        stepNumber: 4,
        portugueseText: "Retire de imediato do lume, polvilhe com os coentros frescos picados e umas gotas de limão e sirva a fervilhar à mesa acompanhado de pão estaladiço.",
        notes: "O azeite aromatizado com alho e marisco no fundo é a alma do petisco."
      }
    ],
    pantrySecret: "Secar as gambas com papel absorvente antes de saltear no azeite quente e cozinhar apenas 3 minutos no total para ficarem carnudas e sumarentas.",
    originalSourceTitle: "Tradição das Marisqueiras da Costa Algarvia e Lisboa",
    originalSourceUrl: "https://www.youtube.com/results?search_query=gambas+ao+alho+portuguesa"
  },
  {
    id: "pt-alheira-com-ovo",
    slug: "alheira-de-mirandela-com-ovo",
    title: "Alheira de Mirandela Frita com Grelos e Ovo",
    originalTitle: "Alheira Transmontana com Ovo a Cavalo",
    subtitle: "A emblemática alheira de caça transmontana frita até a pele estalar, coroada com ovo estrelado e grelos salteados",
    category: "petiscos",
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    servings: 2,
    difficulty: "Fácil",
    difficultyLevel: "Fácil",
    dropCapLetter: "A",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Petisco", "Trás-os-Montes", "Fumeiro", "Mirandela", "Ovo"],
    nutrition: {
      calories: 520,
      protein: 26.0,
      carbs: 28.0,
      fat: 34.0,
      fiber: 4.5,
      servingSize: "1 prato com grelos e ovo (300g)"
    },
    ingredients: [
      { item: "Alheiras tradicionais de Mirandela IGP", amount: "2 un (360g)", estimatedGrams: 360, category: "carnes" },
      { item: "Ovos frescos do campo", amount: "2 un", estimatedGrams: 100, category: "laticinios" },
      { item: "Grelos de couve ou nabo cozidos al dente", amount: "300g", estimatedGrams: 300, category: "legumes" },
      { item: "Dentes de alho esmagados", amount: "3 dentes", estimatedGrams: 15, category: "legumes" },
      { item: "Azeite virgem extra transmontano", amount: "40ml", estimatedGrams: 36, category: "despensa" },
      { item: "Sal marinho", amount: "A gosto", estimatedGrams: 3, category: "especiarias" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Pique a pele da alheira em vários pontos com um palito e faça um corte superficial longitudinal nas pontas para libertar o vapor.",
        notes: "Picar evita que a tripa rebente durante a fritura."
      },
      {
        stepNumber: 2,
        portugueseText: "Aqueça uma frigideira antiaderente com apenas algumas gotas de azeite. Coloque as alheiras e deixe fritar em lume brando durante 5 a 6 minutos de cada lado [⏳ 12 minutos] na sua própria gordura até a pele ficar dourada e estaladiça.",
        notes: "A alheira liberta a sua própria gordura aromática e frita sem necessidade de óleo abundante."
      },
      {
        stepNumber: 3,
        portugueseText: "Numa outra frigideira, salteie os grelos cozidos no azeite com os dentes de alho esmagados durante 4 minutos.",
        notes: "O travo amargo e fresco dos grelos equilibra a untuosidade da alheira."
      },
      {
        stepNumber: 4,
        portugueseText: "Estrele os ovos em azeite quente deixando a gema líquida. Disponha a alheira no prato, cubra com o ovo a cavalo e guarneça com os grelos salteados.",
        notes: "A gema cremosa a envolver a alheira tostada é um clássico transmontano."
      }
    ],
    pantrySecret: "Picar a tripa da alheira com palitos e cozinhá-la em lume brando na própria gordura sem adicionar óleo para a pele ficar fina e estaladiça como um folhado.",
    originalSourceTitle: "Gastronomia Tradicional de Trás-os-Montes",
    originalSourceUrl: "https://www.youtube.com/results?search_query=alheira+de+mirandela+tradicional"
  }
];

fs.writeFileSync(path.join(__dirname, 'petiscos.json'), JSON.stringify(recipes, null, 2), 'utf-8');
console.log('Petiscos generated successfully: ' + recipes.length);
