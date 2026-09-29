const fs = require('fs');
const path = require('path');

const recipes = [
  // ==========================================
  // 4. CARNE (13 Receitas)
  // ==========================================
  {
    id: "pt-carne-porco-alentejana",
    slug: "carne-de-porco-a-alentejana",
    title: "Carne de Porco à Alentejana com Amêijoas",
    originalTitle: "Carne de Alguidar com Amêijoas da Costa",
    subtitle: "Cubos dourados de lombo em marinada de massa de pimentão doce, amêijoas frescas e coentros",
    category: "carnes",
    prepTimeMinutes: 25,
    cookTimeMinutes: 30,
    servings: 4,
    difficulty: "Médio",
    difficultyLevel: "Médio",
    dropCapLetter: "C",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Alentejo", "Tradicional", "Porco", "Amêijoas", "Coentros"],
    nutrition: {
      calories: 590,
      protein: 46.0,
      carbs: 31.0,
      fat: 28.5,
      fiber: 3.2,
      servingSize: "1 prato fundo (380g)"
    },
    ingredients: [
      { item: "Lombo de porco cortado em cubos de 3cm", amount: "600g", estimatedGrams: 600, category: "carnes" },
      { item: "Amêijoas frescas com concha limpas de areia", amount: "500g", estimatedGrams: 500, category: "peixes" },
      { item: "Batatas cortadas em cubos pequenos", amount: "600g", estimatedGrams: 600, category: "legumes" },
      { item: "Massa de pimentão doce tradicional", amount: "3 colheres de sopa (45g)", estimatedGrams: 45, category: "especiarias" },
      { item: "Vinho branco alentejano seco", amount: "120ml", estimatedGrams: 120, category: "despensa" },
      { item: "Dentes de alho laminados", amount: "4 dentes", estimatedGrams: 20, category: "legumes" },
      { item: "Banha de porco ou azeite virgem", amount: "40g", estimatedGrams: 40, category: "despensa" },
      { item: "Folhas de louro", amount: "2 folhas", estimatedGrams: 2, category: "especiarias" },
      { item: "Coentros frescos picados", amount: "25g", estimatedGrams: 25, category: "legumes" },
      { item: "Limão cortado em gomos", amount: "1 un", estimatedGrams: 80, category: "frutas" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Numa tigela funda, coloque a carne de porco em cubos e tempere com a massa de pimentão, o alho picado, as folhas de louro, uma pitada de sal e o vinho branco. Envolva e deixe marinar no frigorífico durante pelo menos 4 horas (idealmente durante a noite).",
        notes: "A marinada perfuma a carne e confere a cor avermelhada característica."
      },
      {
        stepNumber: 2,
        portugueseText: "Coloque as amêijoas numa taça com água fria e sal grosso durante 1 hora para largarem qualquer areia residual. Lave-as em água corrente e escorra bem.",
        notes: "Descarte qualquer amêijoa partida ou que permaneça aberta antes de cozinhar."
      },
      {
        stepNumber: 3,
        portugueseText: "Frite os cubos de batata em azeite quente até ficarem dourados e estaladiços por fora e macios por dentro. Escorra sobre papel absorvente.",
        notes: "Mantenha as batatas quentes."
      },
      {
        stepNumber: 4,
        portugueseText: "Num tacho largo ou frigideira de ferro, derreta a banha de porco (ou azeite). Retire a carne da marinada escorrendo o líquido (reserve a marinada) e doure a carne em lume forte durante 8 a 10 minutos até tostar ligeiramente.",
        notes: "A tosta inicial carameliza os açúcares do pimentão e retém a suculência."
      },
      {
        stepNumber: 5,
        portugueseText: "Verta o líquido da marinada sobre a carne e deixe apurar em lume brando durante 5 minutos [⏳ 5 minutos].",
        notes: "O molho deve reduzir e engrossar levemente."
      },
      {
        stepNumber: 6,
        portugueseText: "Junte as amêijoas ao tacho, tape com a tampa e cozinhe durante 3 a 4 minutos [⏳ 3 minutos] até abrirem todas. Adicione as batatas fritas em cubos, envolva no molho e polvilhe com coentros frescos abundantes e gomos de limão.",
        notes: "Descarte as amêijoas que não abrirem após 4 minutos."
      }
    ],
    pantrySecret: "As amêijoas devem abrir apenas no vapor da carne nos últimos 3 minutos com a panela tapada; deite fora qualquer amêijoa que não tenha aberto.",
    originalSourceTitle: "Cadernos de Receitas do Alentejo",
    originalSourceUrl: "https://www.youtube.com/results?search_query=carne+de+porco+a+alentejana+tradicional"
  },
  {
    id: "pt-arroz-de-pato",
    slug: "arroz-de-pato-a-antiga",
    title: "Arroz de Pato à Antiga no Forno",
    originalTitle: "Arroz de Pato Confeitado de Braga",
    subtitle: "Pato caseiro desfiado, arroz carolino cozido no caldo aromatizado e gratinado com chouriço",
    category: "carnes",
    prepTimeMinutes: 30,
    cookTimeMinutes: 55,
    servings: 6,
    difficulty: "Especialista",
    difficultyLevel: "Especialista",
    dropCapLetter: "A",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Pato", "Tradicional", "Forno", "Braga", "Arroz Carolino"],
    nutrition: {
      calories: 540,
      protein: 38.5,
      carbs: 49.0,
      fat: 19.5,
      fiber: 2.1,
      servingSize: "1 dose generosa (350g)"
    },
    ingredients: [
      { item: "Pato caseiro limpo cortado em pedaços", amount: "1 kg", estimatedGrams: 1000, category: "carnes" },
      { item: "Arroz carolino português", amount: "400g", estimatedGrams: 400, category: "despensa" },
      { item: "Chouriço de carne tradicional em rodelas", amount: "100g", estimatedGrams: 100, category: "carnes" },
      { item: "Toucinho ou presunto fumado em cubinhos", amount: "50g", estimatedGrams: 50, category: "carnes" },
      { item: "Cebola média inteira espetada com cravinhos", amount: "1 un", estimatedGrams: 120, category: "legumes" },
      { item: "Cenoura média cortada ao meio", amount: "1 un", estimatedGrams: 100, category: "legumes" },
      { item: "Dentes de alho picados", amount: "3 dentes", estimatedGrams: 15, category: "legumes" },
      { item: "Vinho tinto seco português", amount: "60ml", estimatedGrams: 60, category: "despensa" },
      { item: "Caldo coado e desengordurado do pato", amount: "850ml", estimatedGrams: 850, category: "despensa" },
      { item: "Azeite virgem extra", amount: "30ml", estimatedGrams: 28, category: "despensa" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Numa panela funda, coloque o pato em pedaços, a cebola com cravinhos, a cenoura, metade do chouriço, o toucinho, o vinho tinto e água suficiente para cobrir (cerca de 1.5L). Cozinhe em lume brando durante 45 minutos [⏳ 45 minutos] até a carne descolar do osso.",
        notes: "Retire a espuma à superfície durante a cozedura para um caldo limpo."
      },
      {
        stepNumber: 2,
        portugueseText: "Retire o pato e deixe arrefecer. Desfie toda a carne eliminando ossos e gorduras excessivas. Coe o caldo por um passador fino e retire a camada de gordura sobrenadante com uma concha.",
        notes: "Desengordurar o caldo garante um arroz solto e leve."
      },
      {
        stepNumber: 3,
        portugueseText: "Num tacho largo com o azeite e o alho picado, refogue ligeiramente o arroz carolino em lume brando durante 1 minuto até ficar translúcido. Adicione 850ml do caldo quente do pato (proporção de 2 partes de caldo para 1 de arroz).",
        notes: "Cozinhe tapado em lume brando durante 10 a 12 minutos até o líquido ser quase todo absorvido."
      },
      {
        stepNumber: 4,
        portugueseText: "Num tabuleiro de barro vidrado ou pirex, coloque metade do arroz cozido no fundo. Distribua todo o pato desfiado de forma homogénea e cubra com a outra metade do arroz.",
        notes: "Alise a superfície suavemente sem calcar em demasia."
      },
      {
        stepNumber: 5,
        portugueseText: "Decore a superfície com as restantes rodelas de chouriço. Leve ao forno pré-aquecido a 200°C durante 15 a 20 minutos [⏳ 18 minutos] até tostar e formar uma crosta crocante e dourada.",
        notes: "Sirva fumegante acompanhado de gomos de laranja fresca."
      }
    ],
    pantrySecret: "Desengordurar o caldo do pato antes de regar o arroz; assim o bago fica solto, aromático e dourado sem ficar empapado nem pesado.",
    originalSourceTitle: "Solar Culinário do Norte de Portugal",
    originalSourceUrl: "https://www.youtube.com/results?search_query=arroz+de+pato+tradicional+portugues"
  },
  {
    id: "pt-francesinha",
    slug: "francesinha-portuense",
    title: "Francesinha Portuense com Molho Especial",
    originalTitle: "Francesinha do Porto",
    subtitle: "Sanduíche rica de carnes nobres coberta de queijo derretido e banhada em molho picante de cerveja e Vinho do Porto",
    category: "carnes",
    prepTimeMinutes: 25,
    cookTimeMinutes: 35,
    servings: 2,
    difficulty: "Especialista",
    difficultyLevel: "Especialista",
    dropCapLetter: "F",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Porto", "Tradicional", "Francesinha", "Carne", "Molho Secreto"],
    nutrition: {
      calories: 890,
      protein: 54.0,
      carbs: 62.0,
      fat: 46.0,
      fiber: 3.8,
      servingSize: "1 Francesinha completa (450g)"
    },
    ingredients: [
      { item: "Fatias de pão de forma rústico", amount: "4 fatias", estimatedGrams: 160, category: "despensa" },
      { item: "Bifes finos de vitela tenra", amount: "2 bifes (250g)", estimatedGrams: 250, category: "carnes" },
      { item: "Salsichas frescas de porco", amount: "2 un", estimatedGrams: 120, category: "carnes" },
      { item: "Linguiça de fumeiro cortada ao meio longitudinalmente", amount: "2 un", estimatedGrams: 100, category: "carnes" },
      { item: "Fatias de fiambre da perna", amount: "4 fatias", estimatedGrams: 80, category: "carnes" },
      { item: "Fatias de queijo flamengo ou cheddar suave", amount: "12 fatias", estimatedGrams: 240, category: "laticinios" },
      { item: "Cerveja branca", amount: "330ml", estimatedGrams: 330, category: "despensa" },
      { item: "Caldo de carne concentrado", amount: "200ml", estimatedGrams: 200, category: "despensa" },
      { item: "Polpa de tomate concentrada", amount: "50g", estimatedGrams: 50, category: "despensa" },
      { item: "Vinho do Porto Tawny", amount: "40ml", estimatedGrams: 40, category: "despensa" },
      { item: "Farinha maisena diluída em água", amount: "15g", estimatedGrams: 15, category: "despensa" },
      { item: "Molho piri-piri e folha de louro", amount: "1 colher", estimatedGrams: 5, category: "especiarias" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Num tacho, prepare o molho especial: junte a cerveja, o caldo de carne, a polpa de tomate, o louro e o piri-piri. Deixe levantar fervura e cozinhar durante 15 minutos [⏳ 15 minutos].",
        notes: "O álcool da cerveja deve evaporar completamente."
      },
      {
        stepNumber: 2,
        portugueseText: "Retire o louro, adicione o Vinho do Porto e a farinha maisena diluída num gole de água fria. Triture com a varinha mágica e deixe engrossar em lume brando durante 3 a 5 minutos até ficar sedoso e brilhante.",
        notes: "Mantenha o molho bem quente em lume muito brando."
      },
      {
        stepNumber: 3,
        portugueseText: "Numa frigideira de ferro com um fio de azeite, grelhe os bifes temperados com sal e pimenta, as salsichas abertas ao meio e a linguiça até dourarem.",
        notes: "Toste também ligeiramente as fatias de pão."
      },
      {
        stepNumber: 4,
        portugueseText: "Monte cada francesinha num prato fundo: fatia de pão torrado, fiambre, bife de vitela grelhado, linguiça aberta, salsicha fresca e a segunda fatia de pão.",
        notes: "Pressione ligeiramente para assentar."
      },
      {
        stepNumber: 5,
        portugueseText: "Cubra completamente o topo e todas as laterais da sanduíche com fatias de queijo sobrepostas, não deixando ver o pão. Leve ao forno a 200°C na função grill durante 5 minutos [⏳ 5 minutos] até o queijo fundir por completo.",
        notes: "O queijo deve abraçar a sanduíche sem queimar."
      },
      {
        stepNumber: 6,
        portugueseText: "Retire do forno e regue generosamente com o molho fervente em redor e sobre a francesinha. Sirva imediatamente acompanhada de batatas fritas estaladiças.",
        notes: "Pode encimar com um ovo estrelado de gema líquida."
      }
    ],
    pantrySecret: "O equilíbrio mágico do molho portuense reside na combinação da acidez da cerveja, a picância do piri-piri e o aveludado do Vinho do Porto final.",
    originalSourceTitle: "Cervejarias Tradicionais da Baixa do Porto",
    originalSourceUrl: "https://www.youtube.com/results?search_query=francesinha+do+porto+molho+tradicional"
  },
  {
    id: "pt-cozido-a-portuguesa",
    slug: "cozido-a-portuguesa-tradicional",
    title: "Cozido à Portuguesa com Enchidos e Couves",
    originalTitle: "Cozido à Portuguesa Canónico",
    subtitle: "O monumento da gastronomia nacional: carnes fumadas e frescas, chouriços de sangue e carne, morcela, farinheira, couves e batatas",
    category: "carnes",
    prepTimeMinutes: 40,
    cookTimeMinutes: 90,
    servings: 8,
    difficulty: "Especialista",
    difficultyLevel: "Especialista",
    dropCapLetter: "C",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Cozido", "Fumeiro", "Domingo", "Família", "Inverno"],
    nutrition: {
      calories: 680,
      protein: 48.0,
      carbs: 38.0,
      fat: 36.0,
      fiber: 5.5,
      servingSize: "1 travessa farta de carnes e legumes (500g)"
    },
    ingredients: [
      { item: "Carne de vaca para cozer (aba ou chambão)", amount: "600g", estimatedGrams: 600, category: "carnes" },
      { item: "Entremeada de porco fresca ou salgada", amount: "400g", estimatedGrams: 400, category: "carnes" },
      { item: "Orelha e chispe de porco escaldados", amount: "400g", estimatedGrams: 400, category: "carnes" },
      { item: "Galinha do campo", amount: "1/2 un (600g)", estimatedGrams: 600, category: "carnes" },
      { item: "Chouriço de carne de fumeiro", amount: "1 un (150g)", estimatedGrams: 150, category: "carnes" },
      { item: "Morcela de sangue tradicional", amount: "1 un (140g)", estimatedGrams: 140, category: "carnes" },
      { item: "Farinheira tradicional da Beira", amount: "1 un (150g)", estimatedGrams: 150, category: "carnes" },
      { item: "Couves portuguesas (lombarda e troncha)", amount: "800g", estimatedGrams: 800, category: "legumes" },
      { item: "Batatas médias inteiras descascadas", amount: "8 un (800g)", estimatedGrams: 800, category: "legumes" },
      { item: "Cenouras inteiras descascadas", amount: "4 un (300g)", estimatedGrams: 300, category: "legumes" },
      { item: "Nabos pequenos inteiros", amount: "3 un (250g)", estimatedGrams: 250, category: "legumes" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Numa panela grande com água fria e sal grosso, coloque as carnes que demoram mais a cozer: a vaca, o chispe e a orelha. Cozinhe em lume brando durante 40 minutos [⏳ 40 minutos], escumando a superfície.",
        notes: "Escumar a espuma inicial retira as impurezas e deixa o caldo puro e translúcido."
      },
      {
        stepNumber: 2,
        portugueseText: "Adicione a entremeada de porco, a galinha e o chouriço de carne. Coza durante mais 30 minutos.",
        notes: "As carnes vão largando os seus perfumes no mesmo caldo."
      },
      {
        stepNumber: 3,
        portugueseText: "Pique a pele da farinheira e da morcela com um palito e adicione à panela nos últimos 15 minutos [⏳ 15 minutos] para não rebentarem.",
        notes: "Retire as carnes e enchidos à medida que estiverem no ponto e reserve quentes numa travessa."
      },
      {
        stepNumber: 4,
        portugueseText: "No mesmo caldo fervente onde cozeram todas as carnes, deite as batatas, cenouras, nabos e as couves cortadas. Cozinhe durante 15 a 20 minutos até ficarem macios e aveludados.",
        notes: "Os legumes absorvem a gordura rica dos enchidos de fumeiro."
      },
      {
        stepNumber: 5,
        portugueseText: "Fatie as carnes e os enchidos. Disponha os legumes numa grande travessa de servir e coroe com as carnes fatiadas. Acompanhe com arroz feito no caldo das carnes.",
        notes: "O rei dos banquetes dominicais portugueses."
      }
    ],
    pantrySecret: "Picar a pele da farinheira com palitos e cozê-la apenas nos últimos 15 minutos para que não abra, e cozer as couves e legumes no próprio caldo aromático das carnes.",
    originalSourceTitle: "Compêndio Secular da Cozinha Portuguesa",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Cozido_%C3%A0_portuguesa"
  },
  {
    id: "pt-ensopado-de-borrego",
    slug: "ensopado-de-borrego-alentejano",
    title: "Ensopado de Borrego à Alentejana com Hortelã",
    originalTitle: "Ensopado de Borrego Campaniço",
    subtitle: "Carne tenra de borrego estufada com vinho branco, massa de pimentão doce e servida sobre pão frito e hortelã fresca",
    category: "carnes",
    prepTimeMinutes: 25,
    cookTimeMinutes: 60,
    servings: 4,
    difficulty: "Médio",
    difficultyLevel: "Médio",
    dropCapLetter: "E",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Alentejo", "Borrego", "Pão", "Hortelã", "Páscoa"],
    nutrition: {
      calories: 540,
      protein: 42.0,
      carbs: 28.0,
      fat: 27.0,
      fiber: 3.0,
      servingSize: "1 prato de ensopado com pão (400g)"
    },
    ingredients: [
      { item: "Carne de borrego da pá e costeletas cortada em pedaços", amount: "1 kg", estimatedGrams: 1000, category: "carnes" },
      { item: "Vinho branco maduro e seco", amount: "250ml", estimatedGrams: 250, category: "despensa" },
      { item: "Cebolas médias picadas", amount: "2 un (200g)", estimatedGrams: 200, category: "legumes" },
      { item: "Dentes de alho esmagados", amount: "5 dentes", estimatedGrams: 25, category: "legumes" },
      { item: "Massa de pimentão doce tradicional", amount: "1 colher de sopa cheia", estimatedGrams: 25, category: "especiarias" },
      { item: "Azeite virgem extra de lagar", amount: "80ml", estimatedGrams: 75, category: "despensa" },
      { item: "Ramos fartos de hortelã da ribeira", amount: "1 molho generoso (30g)", estimatedGrams: 30, category: "legumes" },
      { item: "Pão de trigo alentejano do dia anterior em fatias", amount: "8 fatias", estimatedGrams: 240, category: "despensa" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Num alguidar de barro, tempere a carne com o vinho branco, alho, louro, massa de pimentão, sal e pimenta. Deixe marinar durante pelo menos 4 horas (ideal de véspera).",
        notes: "A marinada amacia as fibras da carne e perfuma o fundo do guisado."
      },
      {
        stepNumber: 2,
        portugueseText: "Num tacho de ferro fundido, aqueça o azeite e aloure os pedaços de carne bem escorridos. Junte a cebola picada e deixe refogar suavemente até ficar transparente.",
        notes: "Selar bem a carne cria os açúcares caramelizados que dão cor e profundidade ao caldo."
      },
      {
        stepNumber: 3,
        portugueseText: "Verta a marinada sobre a carne e acrescente água quente suficiente até cobrir metade. Tape hermeticamente e deixe estufar em lume brando durante 60 minutos [⏳ 60 minutos] até a carne se soltar do osso.",
        notes: "Mantenha o lume baixíssimo, apenas um borbulhar tímido no centro do tacho."
      },
      {
        stepNumber: 4,
        portugueseText: "Frite as fatias de pão numa frigideira com um fio de azeite até dourarem. Disponha o pão no fundo de uma travessa funda, verta o borrego e o caldo fervente por cima e cubra com a hortelã fresca abundante.",
        notes: "O pão absorve o molho rico e aveludado com o perfume refrescante da hortelã."
      }
    ],
    pantrySecret: "Fritar ligeiramente as fatias de pão em azeite antes de colocar na travessa para absorverem o molho aveludado com as folhas frescas de hortelã.",
    originalSourceTitle: "Receitas Tradicionais do Campo Alentejano",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Ensopado_de_borrego"
  },
  {
    id: "pt-leitao-bairrada",
    slug: "leitao-assado-a-bairrada",
    title: "Leitão Assado à Bairrada com Molho de Pimenta",
    originalTitle: "Leitão da Bairrada Crocante",
    subtitle: "Pele vidrada e estaladiça com carne tenra e sumarenta temperada com pasta de banha, alho e pimenta-preta",
    category: "carnes",
    prepTimeMinutes: 40,
    cookTimeMinutes: 90,
    servings: 6,
    difficulty: "Especialista",
    difficultyLevel: "Especialista",
    dropCapLetter: "L",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Leitão", "Bairrada", "Forno a Lenha", "Pele Vidrada", "Festas"],
    nutrition: {
      calories: 610,
      protein: 46.0,
      carbs: 2.0,
      fat: 45.0,
      fiber: 0.5,
      servingSize: "1 porção com pele estaladiça (300g)"
    },
    ingredients: [
      { item: "Leitão de leite limpo (metade ou peças nobres para forno)", amount: "2 kg", estimatedGrams: 2000, category: "carnes" },
      { item: "Banha de porco artesanal", amount: "100g", estimatedGrams: 100, category: "despensa" },
      { item: "Dentes de alho pisados", amount: "10 dentes", estimatedGrams: 50, category: "legumes" },
      { item: "Pimenta-preta e branca moídas na hora em abundância", amount: "2 colheres de sopa", estimatedGrams: 20, category: "especiarias" },
      { item: "Sal marinho grosso", amount: "2 colheres de sopa", estimatedGrams: 25, category: "especiarias" },
      { item: "Folhas de louro pisadas", amount: "4 folhas", estimatedGrams: 4, category: "especiarias" },
      { item: "Laranjas frescas para gomos", amount: "2 un", estimatedGrams: 200, category: "frutas" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "No almofariz, faça o célebre 'molho da Bairrada': pise os alhos, o sal grosso, a pimenta preta e branca abundante, o louro e a banha até formar uma pasta homogénea e picante.",
        notes: "Esta pasta tempera a carne pelo interior."
      },
      {
        stepNumber: 2,
        portugueseText: "Barre todo o interior da carne com a pasta de banha e pimenta. Seque perfeitamente a pele exterior com um pano seco.",
        notes: "A pele deve estar absolutamente seca para purgar a gordura e vidrar."
      },
      {
        stepNumber: 3,
        portugueseText: "Coloque o leitão numa assadeira sobre uma grelha no forno a 200°C (ou forno a lenha) durante 75 a 90 minutos [⏳ 80 minutos].",
        notes: "Vá borrifando a pele com vinho branco e secando para a pele estalar como vidro."
      },
      {
        stepNumber: 4,
        portugueseText: "Quando a pele estiver avermelhada e estalar ao bater com a faca, retire e corte com tesoura de cozinha em pedaços estaladiços. Sirva com batata frita e rodelas de laranja.",
        notes: "A frescura da laranja equilibra o picante do molho de pimenta."
      }
    ],
    pantrySecret: "Secar meticulosamente a pele do leitão antes de assar e usar pimenta-preta fresca e banha no interior para manter a carne tenra enquanto a pele vidra.",
    originalSourceTitle: "Confraria do Leitão da Bairrada",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Leit%C3%A3o_%C3%A0_Bairrada"
  },
  {
    id: "pt-rojoes-minho",
    slug: "rojoes-a-moda-do-minho",
    title: "Rojões à Moda do Minho com Castanhas",
    originalTitle: "Rojões à Minhota Tradicionais",
    subtitle: "Pedaços macios de carne de porco da perna alourados na própria banha com cominhos, castanhas e tripa enfarinhada",
    category: "carnes",
    prepTimeMinutes: 25,
    cookTimeMinutes: 45,
    servings: 4,
    difficulty: "Médio",
    difficultyLevel: "Médio",
    dropCapLetter: "R",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Minho", "Rojões", "Castanhas", "Cominhos", "Vinho Verde"],
    nutrition: {
      calories: 580,
      protein: 44.0,
      carbs: 26.0,
      fat: 32.0,
      fiber: 3.5,
      servingSize: "1 travessa com castanhas (360g)"
    },
    ingredients: [
      { item: "Carne de porco da perna ou cachaço em cubos de 4cm", amount: "800g", estimatedGrams: 800, category: "carnes" },
      { item: "Castanhas descascadas cozidas al dente", amount: "250g", estimatedGrams: 250, category: "frutas" },
      { item: "Vinho verde branco ou tinto do Minho", amount: "200ml", estimatedGrams: 200, category: "despensa" },
      { item: "Banha de porco tradicional", amount: "50g", estimatedGrams: 50, category: "despensa" },
      { item: "Dentes de alho picados", amount: "5 dentes", estimatedGrams: 25, category: "legumes" },
      { item: "Cominhos em pó e louro", amount: "1 colher de chá", estimatedGrams: 5, category: "especiarias" },
      { item: "Massa de pimentão doce", amount: "1 colher de sopa", estimatedGrams: 20, category: "especiarias" },
      { item: "Sangue cozido esfarelado e tripa enfarinhada (opcional)", amount: "100g", estimatedGrams: 100, category: "carnes" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Tempere os cubos de carne com o vinho verde, alho picado, louro, cominhos em pó, massa de pimentão e sal durante pelo menos 2 horas.",
        notes: "Os cominhos são a assinatura aromática inconfundível dos rojões minhotos."
      },
      {
        stepNumber: 2,
        portugueseText: "Numa caçarola de ferro, derreta a banha de porco. Escorra a carne da marinada (guarde o líquido) e cozinhe em lume forte durante 15 minutos [⏳ 15 minutos] mexendo até a carne ficar dourada e frita na banha.",
        notes: "Os rojões devem fritar na sua própria gordura até ganharem crosta dourada."
      },
      {
        stepNumber: 3,
        portugueseText: "Verta o líquido da marinada sobre a carne dourada e junte as castanhas cozidas. Deixe estufar em lume brando durante 20 minutos [⏳ 20 minutos] até o molho reduzir e envolver a carne.",
        notes: "As castanhas absorvem o molho caramelizado da carne."
      },
      {
        stepNumber: 4,
        portugueseText: "Sirva numa travessa de barro polvilhado com salsa picada, acompanhado de batatas douradas e rodelas de limão.",
        notes: "Prato emblemático das romarias do Alto Minho."
      }
    ],
    pantrySecret: "Temperar os rojões com cominhos em pó e fritá-los lentamente em banha antes de juntar as castanhas e o vinho verde.",
    originalSourceTitle: "Gastronomia Tradicional do Minho",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Roj%C3%B5es_%C3%A0_moda_do_Minho"
  },
  {
    id: "pt-chanfana",
    slug: "chanfana-em-panela-de-barro",
    title: "Chanfana de Cabra Velha de Coimbra",
    originalTitle: "Chanfana Tradicional de Miranda do Corvo",
    subtitle: "Carne de cabra assada longamente no forno de lenha em caçoila de barro preto afogada em vinho tinto e louro",
    category: "carnes",
    prepTimeMinutes: 30,
    cookTimeMinutes: 120,
    servings: 6,
    difficulty: "Especialista",
    difficultyLevel: "Especialista",
    dropCapLetter: "C",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Chanfana", "Coimbra", "Cabra", "Vinho Tinto", "Forno a Lenha"],
    nutrition: {
      calories: 560,
      protein: 52.0,
      carbs: 6.0,
      fat: 32.0,
      fiber: 1.8,
      servingSize: "1 dose em caçoila de barro (350g)"
    },
    ingredients: [
      { item: "Carne de cabra velha cortada em pedaços com osso", amount: "1.5 kg", estimatedGrams: 1500, category: "carnes" },
      { item: "Vinho tinto encorpado de boa qualidade (Bairrada ou Dão)", amount: "1 litro", estimatedGrams: 1000, category: "despensa" },
      { item: "Banha de porco ou azeite virgem", amount: "60g", estimatedGrams: 60, category: "despensa" },
      { item: "Dentes de alho inteiros esmagados", amount: "8 dentes", estimatedGrams: 40, category: "legumes" },
      { item: "Folhas de louro secas", amount: "4 folhas", estimatedGrams: 4, category: "especiarias" },
      { item: "Ramos de salsa fresca", amount: "1 molho", estimatedGrams: 20, category: "legumes" },
      { item: "Colorau doce e piri-piri", amount: "1 colher de sopa", estimatedGrams: 15, category: "especiarias" },
      { item: "Sal marinho grosso", amount: "1 colher de sopa cheia", estimatedGrams: 15, category: "especiarias" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Numa caçoila de barro preto tradicional (ou assadeira de barro vidrado), coloque os pedaços de cabra bem aconchegados. Junte os alhos esmagados, o louro, a banha, o colorau e o sal grosso.",
        notes: "O barro preto retém o calor e transmite um aroma terroso autêntico."
      },
      {
        stepNumber: 2,
        portugueseText: "Verta o vinho tinto encorpado até cobrir completamente a carne. NÃO ADICIONE NENHUMA GOTA DE ÁGUA.",
        notes: "A chanfana autêntica cozinha unicamente no vinho tinto."
      },
      {
        stepNumber: 3,
        portugueseText: "Tape a caçoila com papel vegetal ou folha de alumínio bem ajustada. Leve ao forno a 160°C durante cerca de 2 a 3 horas [⏳ 120 minutos] até a carne ficar amanteigada e o molho reduzir para um tom bordô profundo.",
        notes: "A cocção muito lenta desfaz o colagénio da cabra."
      },
      {
        stepNumber: 4,
        portugueseText: "Destape nos últimos 20 minutos para a carne tostar à superfície. Sirva fumegante na própria caçoila acompanhada de batatas cozidas e grelos.",
        notes: "Diz o povo que a chanfana 'sabe melhor no dia seguinte requentada'."
      }
    ],
    pantrySecret: "Não usar uma gota de água; cozer a cabra exclusivamente em vinho tinto encorpado tapada no barro durante 2 a 3 horas a baixa temperatura.",
    originalSourceTitle: "Tradição Secular de Miranda do Corvo e Coimbra",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Chanfana"
  },
  {
    id: "pt-tripas-porto",
    slug: "tripas-a-moda-do-porto",
    title: "Tripas à Moda do Porto com Feijão Branco",
    originalTitle: "Tripas Tradicionais à Moda do Porto",
    subtitle: "O lendário prato dos Tripeiros: dobrada com enchidos nobres, orelheira, mão de vitela, feijão branco e cenoura",
    category: "carnes",
    prepTimeMinutes: 45,
    cookTimeMinutes: 90,
    servings: 6,
    difficulty: "Especialista",
    difficultyLevel: "Especialista",
    dropCapLetter: "T",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Porto", "Tripas", "Tripeiros", "Feijão Branco", "Histórico"],
    nutrition: {
      calories: 520,
      protein: 48.0,
      carbs: 34.0,
      fat: 22.0,
      fiber: 6.5,
      servingSize: "1 prato cheio de tripas (420g)"
    },
    ingredients: [
      { item: "Dobrada e folhoso de vitela bem limpos", amount: "1 kg", estimatedGrams: 1000, category: "carnes" },
      { item: "Mão de vitela escaldada (gelatina natural)", amount: "1/2 un (400g)", estimatedGrams: 400, category: "carnes" },
      { item: "Frango do campo ou perna de porco", amount: "300g", estimatedGrams: 300, category: "carnes" },
      { item: "Chouriço de carne e morcela de sangue", amount: "2 un (250g)", estimatedGrams: 250, category: "carnes" },
      { item: "Presunto curado em cubos", amount: "100g", estimatedGrams: 100, category: "carnes" },
      { item: "Feijão branco cozido", amount: "500g", estimatedGrams: 500, category: "legumes" },
      { item: "Cenouras em rodelas", amount: "2 un (200g)", estimatedGrams: 200, category: "legumes" },
      { item: "Cebola, alho, banha de porco, louro e cominhos", amount: "Q.b.", estimatedGrams: 80, category: "despensa" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Lave a dobrada com água morna, limão e sal. Coza a dobrada e a mão de vitela numa panela grande durante 60 minutos [⏳ 60 minutos] até ficarem macias. Escorra e corte em tiras.",
        notes: "A mão de vitela solta a gelatina natural que aveluda o molho das tripas."
      },
      {
        stepNumber: 2,
        portugueseText: "Num tacho com banha de porco, faça um refogado com cebola picada, alho e louro. Junte o presunto em cubos e as rodelas de chouriço.",
        notes: "Refogue até os enchidos libertarem a gordura aromática."
      },
      {
        stepNumber: 3,
        portugueseText: "Adicione as tiras de dobrada, a mão de vitela desossada em pedaços e a cenoura. Verta um pouco do caldo da cozedura e estufe durante 20 minutos.",
        notes: "Tempere com uma pitada sutil de cominhos moídos e pimenta branca."
      },
      {
        stepNumber: 4,
        portugueseText: "Junte o feijão branco cozido e deixe apurar em lume brando durante 10 a 15 minutos até o molho engrossar. Polvilhe com salsa picada e sirva acompanhado de arroz branco de forno.",
        notes: "A homenagem perpétua ao sacrifício dos cidadãos do Porto na época dos Descobrimentos."
      }
    ],
    pantrySecret: "Cozer meia mão de vitela juntamente com a dobrada; a gelatina natural derrete-se no caldo e confere a consistência densa e aveludada autêntica das tripas do Porto.",
    originalSourceTitle: "História e Tradição da Cidade do Porto",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Tripas_%C3%A0_moda_do_Porto"
  },
  {
    id: "pt-espetada-madeira",
    slug: "espetada-madeirense-em-pau-de-louro",
    title: "Espetada Madeirense em Pau de Louro",
    originalTitle: "Espetada Tradicional da Madeira",
    subtitle: "Cubos nobres de lombo de vaca enfiados em espeto de pau de louro verde fresco, assados nas brasas com manteiga de alho",
    category: "carnes",
    prepTimeMinutes: 20,
    cookTimeMinutes: 10,
    servings: 4,
    difficulty: "Fácil",
    difficultyLevel: "Fácil",
    dropCapLetter: "E",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Madeira", "Espetada", "Brasa", "Pau de Louro", "Milho Frito"],
    nutrition: {
      calories: 460,
      protein: 48.0,
      carbs: 2.0,
      fat: 28.0,
      fiber: 0.2,
      servingSize: "1 espetada generosa (300g)"
    },
    ingredients: [
      { item: "Lombo ou alcatra de novilho em cubos de 4cm", amount: "900g", estimatedGrams: 900, category: "carnes" },
      { item: "Ramos frescos de loureiro verde (pau de espeto)", amount: "4 paus", estimatedGrams: 50, category: "especiarias" },
      { item: "Dentes de alho esmagados com casca", amount: "6 dentes", estimatedGrams: 30, category: "legumes" },
      { item: "Folhas de louro partidas", amount: "4 folhas", estimatedGrams: 4, category: "especiarias" },
      { item: "Sal marinho grosso", amount: "2 colheres de sopa", estimatedGrams: 25, category: "especiarias" },
      { item: "Manteiga de alho e salsa para pincelar", amount: "40g", estimatedGrams: 40, category: "laticinios" },
      { item: "Bolo do caco e milho frito para servir", amount: "Para acompanhar", estimatedGrams: 150, category: "despensa" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Afie a ponta dos paus de louro verde fresco com uma navalha para fazer a haste do espeto.",
        notes: "O pau de louro verde liberta os óleos essenciais da seiva diretamente para a carne durante o assado."
      },
      {
        stepNumber: 2,
        portugueseText: "Enfie os cubos de carne no pau de louro, intercalando com os dentes de alho esmagados e folhas de louro. Polvilhe a carne com sal grosso momentos antes de grelhar.",
        notes: "Não salgue muito tempo antes para manter a carne suculenta."
      },
      {
        stepNumber: 3,
        portugueseText: "Asse nas brasas bem quentes durante 3 a 4 minutos de cada lado [⏳ 8 minutos], sacudindo o excesso de sal ao virar.",
        notes: "A carne deve ficar caramelizada por fora e suculenta e rosada por dentro."
      },
      {
        stepNumber: 4,
        portugueseText: "Retire da grelha e pincele a carne ainda fumegante com manteiga de alho e salsa. Sirva pendurada no suporte tradicional com bolo do caco e milho frito.",
        notes: "O ícone absoluto dos arraiais da Ilha da Madeira."
      }
    ],
    pantrySecret: "Usar paus de loureiro verde acabado de cortar para o espeto; o calor das brasas faz a seiva do louro evaporar por dentro de cada cubo de carne.",
    originalSourceTitle: "Gastronomia dos Arraiais da Ilha da Madeira",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Espetada"
  },
  {
    id: "pt-alcatra-terceira",
    slug: "alcatra-da-ilha-terceira",
    title: "Alcatra da Ilha Terceira em Barro",
    originalTitle: "Alcatra Tradicional dos Açores",
    subtitle: "Carne de vaca estufada longamente no forno em alguidar de barro não vidrado com vinho de cheiro, toucinho e pimenta da terra",
    category: "carnes",
    prepTimeMinutes: 30,
    cookTimeMinutes: 150,
    servings: 6,
    difficulty: "Especialista",
    difficultyLevel: "Especialista",
    dropCapLetter: "A",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Açores", "Terceira", "Alcatra", "Alguidar de Barro", "Vinho de Cheiro"],
    nutrition: {
      calories: 590,
      protein: 50.0,
      carbs: 8.0,
      fat: 36.0,
      fiber: 1.5,
      servingSize: "1 dose em alguidar (380g)"
    },
    ingredients: [
      { item: "Carne de vaca de chambão e cachaço em pedaços grandes", amount: "1.5 kg", estimatedGrams: 1500, category: "carnes" },
      { item: "Toucinho fumado ou banha", amount: "100g", estimatedGrams: 100, category: "carnes" },
      { item: "Vinho de cheiro açoriano ou tinto encorpado", amount: "350ml", estimatedGrams: 350, category: "despensa" },
      { item: "Vinho branco seco", amount: "150ml", estimatedGrams: 150, category: "despensa" },
      { item: "Cebolas grandes picadas em meias-luas", amount: "3 un (400g)", estimatedGrams: 400, category: "legumes" },
      { item: "Dentes de alho esmagados", amount: "6 dentes", estimatedGrams: 30, category: "legumes" },
      { item: "Pimenta-da-jamaica em grão e cravinho", amount: "1 colher", estimatedGrams: 5, category: "especiarias" },
      { item: "Manteiga açoriana e pimenta da terra", amount: "50g + 1 colher", estimatedGrams: 70, category: "laticinios" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "No fundo do alguidar típico de barro não vidrado da Terceira, barre generosamente com manteiga e coloque camadas de toucinho fatiado, cebola e alho.",
        notes: "O alguidar açoriano confere sabor mineral único."
      },
      {
        stepNumber: 2,
        portugueseText: "Disponha os pedaços de carne no alguidar. Junte os grãos de pimenta-da-jamaica, o cravinho, a pimenta da terra, sal e louro. Cubra com mais cebola e nozes de manteiga.",
        notes: "As especiarias aromáticas refletem a rota marítima das Índias que passava por Angra."
      },
      {
        stepNumber: 3,
        portugueseText: "Regue com o vinho de cheiro e o vinho branco. Tape o alguidar com folha de alumínio bem fechada.",
        notes: "O vinho de cheiro confere o aroma frutado inconfundível dos Açores."
      },
      {
        stepNumber: 4,
        portugueseText: "Leve ao forno a 150°C durante 2 horas e meia a 3 horas [⏳ 150 minutos] até a carne se desfazer ao simples toque de um garfo. Sirva acompanhada do clássico pão de água ou massa sovada açoriana.",
        notes: "O prato sagrado das Festas do Espírito Santo."
      }
    ],
    pantrySecret: "Usar o alguidar de barro não vidrado da Ilha Terceira e assar lentamente durante quase 3 horas com vinho de cheiro e grãos de pimenta-da-jamaica.",
    originalSourceTitle: "Tradição das Festas do Espírito Santo dos Açores",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Alcatra_(prato_t%C3%ADpico)"
  },
  {
    id: "pt-bife-a-portuguesa",
    slug: "bife-a-portuguesa-tradicional",
    title: "Bife à Portuguesa com Presunto e Batata Frita",
    originalTitle: "Bife com Molho de Café e Vinho do Porto",
    subtitle: "Bife de alcatra tenro frito em azeite e alho, coroado com presunto tostado e molho aveludado de louro, vinho branco e pickles",
    category: "carnes",
    prepTimeMinutes: 15,
    cookTimeMinutes: 10,
    servings: 2,
    difficulty: "Fácil",
    difficultyLevel: "Fácil",
    dropCapLetter: "B",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Bife", "Café Central", "Carne", "Presunto", "Batata"],
    nutrition: {
      calories: 510,
      protein: 42.0,
      carbs: 22.0,
      fat: 26.0,
      fiber: 1.8,
      servingSize: "1 bife com guarnição (320g)"
    },
    ingredients: [
      { item: "Bifes de alcatra ou vazia tenros", amount: "2 un (350g)", estimatedGrams: 350, category: "carnes" },
      { item: "Fatias de presunto curado tradicional", amount: "2 fatias", estimatedGrams: 40, category: "carnes" },
      { item: "Batatas em rodelas fritas às rodelas finas", amount: "300g", estimatedGrams: 300, category: "legumes" },
      { item: "Dentes de alho laminados", amount: "4 dentes", estimatedGrams: 20, category: "legumes" },
      { item: "Azeite virgem e manteiga", amount: "30ml + 20g", estimatedGrams: 50, category: "despensa" },
      { item: "Vinho branco e mostarda", amount: "60ml + 1 colher", estimatedGrams: 75, category: "despensa" },
      { item: "Folhas de louro e sal marinho", amount: "A gosto", estimatedGrams: 3, category: "especiarias" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Tempere os bifes com sal e pimenta moída apenas antes de fritar.",
        notes: "A carne deve estar à temperatura ambiente."
      },
      {
        stepNumber: 2,
        portugueseText: "Numa frigideira de ferro com azeite e alho laminado, sele os bifes em lume forte durante 1 minuto e meio de cada lado [⏳ 3 minutos]. Retire para o prato de servir.",
        notes: "Mantenha o centro rosado e macio."
      },
      {
        stepNumber: 3,
        portugueseText: "Na mesma frigideira, toste as fatias de presunto durante 30 segundos e coloque-as por cima de cada bife.",
        notes: "O presunto ganha textura crocante."
      },
      {
        stepNumber: 4,
        portugueseText: "Deite a manteiga, o louro, o vinho branco e a mostarda na frigideira, mexendo para descolar os sucos caramelizados do fundo até formar um molho aveludado e espesso.",
        notes: "Verta o molho sobre os bifes e sirva com as batatas fritas em rodelas."
      }
    ],
    pantrySecret: "Deglaçar a frigideira com manteiga e vinho branco para emulsionar todos os açúcares caramelizados da carne no molho final.",
    originalSourceTitle: "Tradição dos Cafés Históricos de Lisboa e Porto",
    originalSourceUrl: "https://www.youtube.com/results?search_query=bife+a+portuguesa+tradicional"
  },
  {
    id: "pt-cabrito-assado",
    slug: "cabrito-assado-no-forno-beiras",
    title: "Cabrito Assado no Forno com Batatas Douradas",
    originalTitle: "Cabrito das Beiras Assado à Antiga",
    subtitle: "Pedaços tenros de cabrito de leite marinados em vinho branco, alho e massa de pimentão, assados lentamente no forno com batatinhas",
    category: "carnes",
    prepTimeMinutes: 30,
    cookTimeMinutes: 90,
    servings: 6,
    difficulty: "Especialista",
    difficultyLevel: "Especialista",
    dropCapLetter: "C",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Cabrito", "Beiras", "Páscoa", "Assado", "Forno"],
    nutrition: {
      calories: 520,
      protein: 46.0,
      carbs: 26.0,
      fat: 24.0,
      fiber: 2.8,
      servingSize: "1 dose farta com batatas (380g)"
    },
    ingredients: [
      { item: "Cabrito da perna e pá em pedaços", amount: "1.5 kg", estimatedGrams: 1500, category: "carnes" },
      { item: "Batatas médias cortadas ao meio", amount: "1 kg", estimatedGrams: 1000, category: "legumes" },
      { item: "Vinho branco seco das Beiras", amount: "250ml", estimatedGrams: 250, category: "despensa" },
      { item: "Banha de porco ou azeite virgem", amount: "60g", estimatedGrams: 60, category: "despensa" },
      { item: "Dentes de alho picados", amount: "6 dentes", estimatedGrams: 30, category: "legumes" },
      { item: "Massa de pimentão doce e alecrim fresco", amount: "2 colheres de sopa", estimatedGrams: 35, category: "especiarias" },
      { item: "Folhas de louro e sal marinho", amount: "A gosto", estimatedGrams: 15, category: "especiarias" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Num alguidar, tempere os pedaços de cabrito com o alho, a massa de pimentão, louro, raminhos de alecrim, sal e vinho branco. Deixe marinar durante a noite no frigorífico.",
        notes: "A marinada prolongada retira qualquer excesso de intensidade da carne de cabrito."
      },
      {
        stepNumber: 2,
        portugueseText: "Disponha o cabrito escorrido numa assadeira de barro. Disponha as batatas em redor temperadas com a marinada. Barre a carne com nozes de banha ou azeite virgem.",
        notes: "O barro transmite calor uniforme e assa sem secar."
      },
      {
        stepNumber: 3,
        portugueseText: "Leve ao forno pré-aquecido a 180°C durante 60 minutos [⏳ 60 minutos], regando de 20 em 20 minutos com os sucos do fundo e o vinho da marinada.",
        notes: "A rega contínua é o segredo para manter o cabrito tenro como manteiga."
      },
      {
        stepNumber: 4,
        portugueseText: "Aumente para 200°C nos últimos 15 a 20 minutos para a carne tostar e as batatas ficarem douradas e estaladiças. Sirva fumegante com arroz de forno ou grelos salteados.",
        notes: "O rei das mesas pascais e de festa das Beiras e Trás-os-Montes."
      }
    ],
    pantrySecret: "Regar a carne com os sucos da assadeira de 20 em 20 minutos e usar um raminho de alecrim fresco colhido no monte.",
    originalSourceTitle: "Tradição Culinária das Serras da Beira",
    originalSourceUrl: "https://www.youtube.com/results?search_query=cabrito+assado+no+forno+tradicional"
  }
];

fs.writeFileSync(path.join(__dirname, 'carnes.json'), JSON.stringify(recipes, null, 2), 'utf-8');
console.log('Carnes generated successfully: ' + recipes.length);
