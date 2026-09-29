const fs = require('fs');
const path = require('path');

const recipes = [
  // ==========================================
  // 3. PEIXE E MARISCO (14 Receitas)
  // ==========================================
  {
    id: "pt-bacalhau-bras",
    slug: "bacalhau-a-bras-classico",
    title: "Bacalhau à Brás Clássico com Batata Palha",
    originalTitle: "Bacalhau à Brás Tradicional de Lisboa",
    subtitle: "Lascado e aveludado com ovos cremosos, azeitonas pretas de cura natural e salsa fresca",
    category: "peixes",
    prepTimeMinutes: 20,
    cookTimeMinutes: 15,
    servings: 4,
    difficulty: "Médio",
    difficultyLevel: "Médio",
    dropCapLetter: "B",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Bacalhau", "Tradicional", "Lisboa", "Bairro Alto", "Ovos"],
    nutrition: {
      calories: 465,
      protein: 36.0,
      carbs: 32.5,
      fat: 21.0,
      fiber: 2.8,
      servingSize: "1 prato cheio (320g)"
    },
    ingredients: [
      { item: "Bacalhau demolhado de cura tradicional, sem pele nem espinhas", amount: "400g", estimatedGrams: 400, category: "peixes" },
      { item: "Batata palha fina frita em azeite", amount: "250g", estimatedGrams: 250, category: "legumes" },
      { item: "Ovos frescos de galinha do campo", amount: "6 ovos", estimatedGrams: 300, category: "laticinios" },
      { item: "Cebolas médias em meias-luas finíssimas", amount: "2 un (240g)", estimatedGrams: 240, category: "legumes" },
      { item: "Dentes de alho picados", amount: "2 dentes", estimatedGrams: 10, category: "legumes" },
      { item: "Azeite virgem extra", amount: "60ml", estimatedGrams: 55, category: "despensa" },
      { item: "Folha de louro sem veio central", amount: "1 folha", estimatedGrams: 1, category: "especiarias" },
      { item: "Azeitonas pretas portuguesas", amount: "60g", estimatedGrams: 60, category: "despensa" },
      { item: "Salsa fresca picada finamente", amount: "15g", estimatedGrams: 15, category: "legumes" },
      { item: "Pimenta-preta moída na hora", amount: "1 pitada", estimatedGrams: 1, category: "especiarias" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Escalde o bacalhau demolhado durante 5 minutos em água a ferver [⏳ 5 minutos]. Escorra, retire todas as espinhas e peles, e desfie o peixe em lascas soltas.",
        notes: "Não desfaça o bacalhau em demasia; as lascas visíveis conferem textura rústica."
      },
      {
        stepNumber: 2,
        portugueseText: "Num tacho largo ou frigideira funda, aqueça o azeite e junte a cebola cortada em meias-luas muito finas, o alho e a folha de louro. Refogue em lume brando até a cebola ficar completamente translúcida e doce, sem alourar.",
        notes: "A cebola deve cozinhar devagar durante 8 a 10 minutos para amaciar."
      },
      {
        stepNumber: 3,
        portugueseText: "Junte o bacalhau desfiado ao refogado e envolva delicadamente em lume médio durante 3 a 4 minutos para absorver todos os aromas do azeite e do alho.",
        notes: "Tempere nesta fase com uma pitada suave de pimenta moída."
      },
      {
        stepNumber: 4,
        portugueseText: "Adicione a batata palha ao tacho e envolva suavemente com o bacalhau durante 1 minuto.",
        notes: "A batata absorve o azeite perfumado mas deve manter uma leve crocância."
      },
      {
        stepNumber: 5,
        portugueseText: "Bata os 6 ovos com uma pitada de sal e pimenta numa tigela. RETIRE O TACHO DO LUME e verta os ovos batidos sobre a mistura, mexendo sem parar com uma espátula com o calor residual do tacho até o ovo ficar aveludado e cremoso.",
        notes: "Nunca deixe o tacho sobre o lume forte ao juntar os ovos para não virar omelete seca."
      },
      {
        stepNumber: 6,
        portugueseText: "Transfira imediatamente para uma travessa, polvilhe com salsa fresca abundante picada no momento e guarneça com as azeitonas pretas.",
        notes: "Sirva no minuto em que sai do lume para degustar na máxima cremosidade."
      }
    ],
    pantrySecret: "Desligar o lume antes de verter os ovos; o calor acumulado da frigideira é suficiente para cozê-los num creme aveludado sem virarem ovos mexidos secos.",
    originalSourceTitle: "Tabernas Históricas de Lisboa",
    originalSourceUrl: "https://www.youtube.com/results?search_query=bacalhau+a+bras+tradicional"
  },
  {
    id: "pt-bacalhau-com-natas",
    slug: "bacalhau-com-natas-tradicional",
    title: "Bacalhau com Natas Tradicional Gratinado",
    originalTitle: "Bacalhau com Natas no Forno",
    subtitle: "Camadas aveludadas de lascas de bacalhau, batatas aos cubos fritas, bechamel caseiro e natas douradas no forno",
    category: "peixes",
    prepTimeMinutes: 25,
    cookTimeMinutes: 30,
    servings: 6,
    difficulty: "Médio",
    difficultyLevel: "Médio",
    dropCapLetter: "B",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Bacalhau", "Forno", "Conforto", "Natas", "Gratinado"],
    nutrition: {
      calories: 540,
      protein: 34.0,
      carbs: 38.0,
      fat: 28.0,
      fiber: 2.5,
      servingSize: "1 dose farta (350g)"
    },
    ingredients: [
      { item: "Bacalhau demolhado cozido e desfiado em lascas", amount: "600g", estimatedGrams: 600, category: "peixes" },
      { item: "Batatas descascadas em cubos pequenos", amount: "600g", estimatedGrams: 600, category: "legumes" },
      { item: "Natas frescas espessas", amount: "300ml", estimatedGrams: 300, category: "laticinios" },
      { item: "Leite gordo quente", amount: "400ml", estimatedGrams: 400, category: "laticinios" },
      { item: "Farinha de trigo de moagem tradicional", amount: "40g", estimatedGrams: 40, category: "despensa" },
      { item: "Manteiga com sal", amount: "40g", estimatedGrams: 40, category: "laticinios" },
      { item: "Cebolas médias picadas em meias-luas finas", amount: "2 un (200g)", estimatedGrams: 200, category: "legumes" },
      { item: "Dentes de alho picados", amount: "2 dentes", estimatedGrams: 10, category: "legumes" },
      { item: "Azeite virgem extra", amount: "40ml", estimatedGrams: 36, category: "despensa" },
      { item: "Noz-moscada, pimenta-branca e queijo ralado", amount: "Q.b.", estimatedGrams: 50, category: "laticinios" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Frite os cubos de batata em azeite/óleo bem quente até alourarem levemente sem ficarem demasiado secas. Escorra sobre papel absorvente.",
        notes: "As batatas devem ficar macias por dentro."
      },
      {
        stepNumber: 2,
        portugueseText: "Num tacho, refogue a cebola e o alho no azeite até a cebola murchar e ficar translúcida. Junte o bacalhau desfiado e envolva durante 5 minutos em lume brando.",
        notes: "Junte as batatas fritas em cubos e envolva delicadamente."
      },
      {
        stepNumber: 3,
        portugueseText: "Prepare o molho bechamel: derreta a manteiga num tachinho, envolva a farinha com vara de arames e verta o leite quente aos poucos, mexendo sempre até engrossar. Tempere com noz-moscada, sal e pimenta branca. Fora do lume, incorpore as natas frescas.",
        notes: "As natas conferem a doçura e cremosidade imperial do prato."
      },
      {
        stepNumber: 4,
        portugueseText: "Verta 2/3 do molho sobre a mistura de bacalhau e batatas, envolvendo delicadamente. Transfira para uma assadeira de pirex ou barro e cubra com o restante molho e o queijo ralado.",
        notes: "Alise a superfície uniformemente."
      },
      {
        stepNumber: 5,
        portugueseText: "Leve ao forno pré-aquecido a 200°C durante 15 a 20 minutos [⏳ 18 minutos] até o topo borbulhar e criar uma crosta dourada e gratinada irresistível.",
        notes: "Deixe repousar 5 minutos antes de cortar em fatias cremosas."
      }
    ],
    pantrySecret: "Incorporar o bechamel caseiro aromatizado com noz-moscada fresca ralada às natas fora do fogo; o creme não talha e gratina num dourado sublime.",
    originalSourceTitle: "Gastronomia Urbana Portuguesa",
    originalSourceUrl: "https://www.youtube.com/results?search_query=bacalhau+com+natas+tradicional"
  },
  {
    id: "pt-bacalhau-gomes-de-sa",
    slug: "bacalhau-a-gomes-de-sa",
    title: "Bacalhau à Gomes de Sá Tradicional do Porto",
    originalTitle: "Bacalhau à Gomes de Sá Original",
    subtitle: "A histórica receita portuense de lascas de bacalhau amaciadas em leite, batata às rodelas, ovos cozidos e azeitonas pretas",
    category: "peixes",
    prepTimeMinutes: 30,
    cookTimeMinutes: 30,
    servings: 4,
    difficulty: "Fácil",
    difficultyLevel: "Fácil",
    dropCapLetter: "B",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Bacalhau", "Porto", "Tradicional", "Forno", "Ovos"],
    nutrition: {
      calories: 440,
      protein: 35.0,
      carbs: 34.0,
      fat: 18.0,
      fiber: 3.2,
      servingSize: "1 prato fundo (320g)"
    },
    ingredients: [
      { item: "Bacalhau demolhado em lascas grandes", amount: "500g", estimatedGrams: 500, category: "peixes" },
      { item: "Batatas médias cozidas com pele, descascadas e em rodelas", amount: "600g", estimatedGrams: 600, category: "legumes" },
      { item: "Leite gordo a ferver para amaciar", amount: "250ml", estimatedGrams: 250, category: "laticinios" },
      { item: "Cebolas médias cortadas em rodelas finas", amount: "2 un (240g)", estimatedGrams: 240, category: "legumes" },
      { item: "Dentes de alho picados", amount: "2 dentes", estimatedGrams: 10, category: "legumes" },
      { item: "Ovos cozidos cortados em rodelas", amount: "3 un", estimatedGrams: 150, category: "laticinios" },
      { item: "Azeite virgem extra de alta qualidade", amount: "80ml", estimatedGrams: 75, category: "despensa" },
      { item: "Azeitonas pretas portuguesas de conserva", amount: "60g", estimatedGrams: 60, category: "despensa" },
      { item: "Salsa fresca picada fina", amount: "1 molho pequeno", estimatedGrams: 20, category: "legumes" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Coloque o bacalhau escaldado e em lascas num recipiente, cubra com o leite a ferver e deixe repousar tapado durante 1 hora e meia a 2 horas [⏳ 90 minutos].",
        notes: "Este é o segredo original de José Luís Gomes de Sá: o leite confere extrema maciez e remove qualquer resquício amargo do sal."
      },
      {
        stepNumber: 2,
        portugueseText: "Numa frigideira larga, aloure as rodelas de cebola e o alho picado em metade do azeite virgem em lume brando até ficarem translúcidas e macias.",
        notes: "A cebola não deve tostar, apenas amolecer em doce confit."
      },
      {
        stepNumber: 3,
        portugueseText: "Numa assadeira de barro vidrado, alterne camadas de rodelas de batata cozida, o refogado de cebola e as lascas de bacalhau bem escorridas do leite. Regue com o restante azeite virgem.",
        notes: "Termine com uma camada de bacalhau e cebola."
      },
      {
        stepNumber: 4,
        portugueseText: "Leve ao forno a 180°C durante 15 a 20 minutos [⏳ 18 minutos] para apurar os sabores.",
        notes: "Retire do forno e decore imediatamente com as rodelas de ovos cozidos, azeitonas pretas e salsa picada abundante."
      }
    ],
    pantrySecret: "Cobrir as lascas de bacalhau com leite a ferver e deixar repousar tapado durante 90 minutos antes de montar a assadeira; a textura fica divinamente tenra.",
    originalSourceTitle: "Manuscrito de José Luís Gomes de Sá (Porto, séc. XIX)",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Bacalhau_%C3%A0_Gomes_de_S%C3%A1"
  },
  {
    id: "pt-bacalhau-ze-do-pipo",
    slug: "bacalhau-a-ze-do-pipo",
    title: "Bacalhau à Zé do Pipo com Puré e Maionese",
    originalTitle: "Bacalhau à Zé do Pipo do Porto",
    subtitle: "Posta nobre de bacalhau cozida em leite, rodeada de puré de batata dourado no saco de pasteleiro e coroada com maionese gratinada",
    category: "peixes",
    prepTimeMinutes: 30,
    cookTimeMinutes: 25,
    servings: 4,
    difficulty: "Médio",
    difficultyLevel: "Médio",
    dropCapLetter: "B",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Bacalhau", "Porto", "Puré", "Forno", "Histórico"],
    nutrition: {
      calories: 520,
      protein: 38.0,
      carbs: 32.0,
      fat: 26.0,
      fiber: 2.8,
      servingSize: "1 posta completa com puré (380g)"
    },
    ingredients: [
      { item: "Postas altas de bacalhau demolhado", amount: "4 postas (700g)", estimatedGrams: 700, category: "peixes" },
      { item: "Leite gordo para cozer o bacalhau", amount: "500ml", estimatedGrams: 500, category: "laticinios" },
      { item: "Batatas para puré passadas no passe-vite", amount: "800g", estimatedGrams: 800, category: "legumes" },
      { item: "Manteiga e leite para o puré", amount: "50g + 100ml", estimatedGrams: 150, category: "laticinios" },
      { item: "Cebolas médias em meias-luas finas", amount: "2 un (240g)", estimatedGrams: 240, category: "legumes" },
      { item: "Azeite virgem extra", amount: "50ml", estimatedGrams: 45, category: "despensa" },
      { item: "Maionese tradicional de qualidade", amount: "150g", estimatedGrams: 150, category: "despensa" },
      { item: "Gema de ovo para pincelar o puré", amount: "1 gema", estimatedGrams: 20, category: "laticinios" },
      { item: "Azeitonas pretas e pimentos morrones", amount: "Para guarnecer", estimatedGrams: 40, category: "legumes" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Coza as postas de bacalhau no leite durante 6 a 8 minutos [⏳ 7 minutos] em lume brando. Retire as postas e escorra sobre papel absorvente.",
        notes: "O leite amacia o bacalhau e retira excesso de salinidade."
      },
      {
        stepNumber: 2,
        portugueseText: "Prepare o puré de batata consistente com as batatas passadas, a manteiga e o leite, temperando com sal e noz-moscada. Coloque num saco de pasteleiro com boquilha frisada.",
        notes: "O puré deve estar bem firme para segurar os rosetões."
      },
      {
        stepNumber: 3,
        portugueseText: "Numa frigideira com azeite, refogue lentamente a cebola até caramelizar suavemente sem tostar.",
        notes: "Espalhe a cebola estufada no centro de uma travessa refratária de forno."
      },
      {
        stepNumber: 4,
        portugueseText: "Disponha as postas de bacalhau sobre a cama de cebola. Com o saco de pasteleiro, molde rosetões de puré em redor de toda a travessa a emoldurar o peixe.",
        notes: "Pincele o puré com gema de ovo batida para dourar."
      },
      {
        stepNumber: 5,
        portugueseText: "Cubra o topo de cada posta de bacalhau com uma camada generosa de maionese. Leve ao forno a 200°C durante 15 minutos até a maionese borbulhar douradinha e o puré tostar.",
        notes: "Enfeite com azeitonas pretas e tiras de pimento e sirva quente."
      }
    ],
    pantrySecret: "Cobrir o bacalhau com maionese cremosa antes de ir ao forno bem quente; o calor faz a maionese tostar numa crosta dourada e brilhante sem secar o peixe.",
    originalSourceTitle: "Receita Vencedora do Concurso Gastronómico do Porto (1947)",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Bacalhau_%C3%A0_Z%C3%A9_do_Pipo"
  },
  {
    id: "pt-bacalhau-assado-lagareiro",
    slug: "bacalhau-assado-com-batatas-a-murro",
    title: "Bacalhau Assado no Forno à Lagareiro",
    originalTitle: "Bacalhau à Lagareiro Tradicional",
    subtitle: "Postas altas de bacalhau assadas no forno afogadas em azeite novo quente, muito alho e batatinhas a murro",
    category: "peixes",
    prepTimeMinutes: 20,
    cookTimeMinutes: 35,
    servings: 4,
    difficulty: "Médio",
    difficultyLevel: "Médio",
    dropCapLetter: "B",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Bacalhau", "Lagareiro", "Beiras", "Azeite", "Forno"],
    nutrition: {
      calories: 510,
      protein: 42.0,
      carbs: 32.0,
      fat: 23.0,
      fiber: 3.5,
      servingSize: "1 posta com batatas a murro (360g)"
    },
    ingredients: [
      { item: "Postas altas do lombo de bacalhau demolhado", amount: "4 postas (800g)", estimatedGrams: 800, category: "peixes" },
      { item: "Batatas pequenas com casca para assar", amount: "800g", estimatedGrams: 800, category: "legumes" },
      { item: "Dentes de alho com casca esmagados", amount: "10 dentes", estimatedGrams: 50, category: "legumes" },
      { item: "Azeite virgem extra de lagar", amount: "160ml", estimatedGrams: 150, category: "despensa" },
      { item: "Folhas de louro", amount: "2 folhas", estimatedGrams: 2, category: "especiarias" },
      { item: "Sal grosso marinho para as batatas", amount: "2 colheres de sopa", estimatedGrams: 25, category: "especiarias" },
      { item: "Salsa fresca picada", amount: "1 molho pequeno", estimatedGrams: 15, category: "legumes" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Lave bem as batatinhas com casca. Coza em água com bastante sal grosso durante 15 minutos [⏳ 15 minutos]. Escorra e, com a mão protegida por um pano, dê um 'murro' suave em cada uma para abrir a polpa.",
        notes: "A abertura absorve o azeite quente do forno."
      },
      {
        stepNumber: 2,
        portugueseText: "Seque as postas de bacalhau com papel absorvente e passe-as levemente por farinha (opcional para selar a humidade interior).",
        notes: "Secar o bacalhau garante que assa sem soltar água em excesso."
      },
      {
        stepNumber: 3,
        portugueseText: "Numa assadeira de barro, disponha o bacalhau no centro e as batatas a murro em redor. Espalhe os dentes de alho esmagados e o louro. Regue abundantemente com o azeite de lagar.",
        notes: "O azeite deve cobrir generosamente todo o fundo da assadeira."
      },
      {
        stepNumber: 4,
        portugueseText: "Leve ao forno bem quente a 200°C durante 20 a 25 minutos [⏳ 22 minutos], regando o bacalhau a meio do tempo com o azeite fervente até lascar facilmente com o garfo.",
        notes: "Polvilhe com salsa picada e sirva a fervilhar na própria assadeira."
      }
    ],
    pantrySecret: "Regar as postas de bacalhau a meio da cozedura no forno com o próprio azeite fervente aromatizado com os 10 dentes de alho esmagados.",
    originalSourceTitle: "Tradição dos Lagares de Azeite das Beiras",
    originalSourceUrl: "https://www.youtube.com/results?search_query=bacalhau+a+lagareiro+tradicional"
  },
  {
    id: "pt-polvo-lagareiro",
    slug: "polvo-a-lagareiro",
    title: "Polvo à Lagareiro com Batatas a Murro",
    originalTitle: "Polvo Assado com Azeite Novo & Alho",
    subtitle: "Polvo tenro assado no forno em abundância de azeite virgem quente, alho e batatinhas a murro",
    category: "peixes",
    prepTimeMinutes: 20,
    cookTimeMinutes: 45,
    servings: 4,
    difficulty: "Médio",
    difficultyLevel: "Médio",
    dropCapLetter: "P",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Polvo", "Tradicional", "Lagareiro", "Azeite", "Forno"],
    nutrition: {
      calories: 520,
      protein: 42.0,
      carbs: 38.0,
      fat: 22.0,
      fiber: 4.1,
      servingSize: "1 dose (400g)"
    },
    ingredients: [
      { item: "Polvo limpo (fresco ou descongelado)", amount: "1.2 kg", estimatedGrams: 1200, category: "peixes" },
      { item: "Batatas pequenas com casca para assar", amount: "800g", estimatedGrams: 800, category: "legumes" },
      { item: "Dentes de alho com casca esmagados", amount: "8 dentes", estimatedGrams: 40, category: "legumes" },
      { item: "Azeite virgem extra de lagar", amount: "150ml", estimatedGrams: 140, category: "despensa" },
      { item: "Cebola média inteira com casca", amount: "1 un", estimatedGrams: 130, category: "legumes" },
      { item: "Folhas de louro", amount: "2 folhas", estimatedGrams: 2, category: "especiarias" },
      { item: "Sal grosso marinho", amount: "2 colheres de sopa", estimatedGrams: 25, category: "especiarias" },
      { item: "Coentros frescos picados", amount: "20g", estimatedGrams: 20, category: "legumes" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Numa panela grande, coloque o polvo e uma cebola inteira lavada com casca. Não adicione água nem sal: tape a panela e cozinhe em lume brando durante 40 a 45 minutos [⏳ 45 minutos].",
        notes: "O polvo liberta os seus próprios sucos ricos e cozinha na perfeição mantendo a pele intacta."
      },
      {
        stepNumber: 2,
        portugueseText: "Enquanto o polvo coze, lave bem as batatinhas com casca. Coloque-as num tacho com água e sal grosso e deixe cozer durante 20 minutos [⏳ 20 minutos] até ficarem tenras.",
        notes: "Escorra as batatas e reserve enquanto secam."
      },
      {
        stepNumber: 3,
        portugueseText: "Verifique a cozedura do polvo espetando a ponta de uma faca na parte mais grossa dos tentáculos; deve entrar sem resistência. Escorra o polvo e corte os tentáculos em pedaços generosos.",
        notes: "Guarde o caldo escuro da cozedura para enriquecer um futuro arroz de polvo."
      },
      {
        stepNumber: 4,
        portugueseText: "Com as costas de uma colher ou com um pano, dê um 'murro' suave em cada batata para abrir a polpa sem a esmagar completamente.",
        notes: "A racha permite que o azeite perfumado penetre no interior da batata."
      },
      {
        stepNumber: 5,
        portugueseText: "Disponha o polvo no centro de uma assadeira de barro e as batatas a murro ao redor. Espalhe os dentes de alho esmagados e as folhas de louro. Regue tudo generosamente com os 150ml de azeite virgem extra.",
        notes: "No Lagareiro autêntico o azeite deve cobrir o fundo da assadeira."
      },
      {
        stepNumber: 6,
        portugueseText: "Leve ao forno pré-aquecido a 200°C durante 15 a 20 minutos [⏳ 18 minutos], regando a meio com o azeite fervente até o polvo tostar levemente nas pontas e as batatas dourarem.",
        notes: "Polvilhe com coentros frescos picados antes de servir à mesa."
      }
    ],
    pantrySecret: "Cozer o polvo com uma cebola inteira com casca e sem adicionar água nem sal; o polvo solta o seu próprio licor escuro e fica incrivelmente amanteigado.",
    originalSourceTitle: "Tradição das Beiras e Litoral Português",
    originalSourceUrl: "https://www.youtube.com/results?search_query=polvo+a+lagareiro+tradicional"
  },
  {
    id: "pt-cataplana-algarvia",
    slug: "cataplana-algarvia-de-marisco",
    title: "Cataplana Algarvia de Marisco e Peixe",
    originalTitle: "Cataplana de Tamboril e Amêijoas",
    subtitle: "Cozinhada a vapor hermético na panela de cobre tradicional com tamboril, amêijoas da ria, camarão e pimentos",
    category: "peixes",
    prepTimeMinutes: 25,
    cookTimeMinutes: 20,
    servings: 4,
    difficulty: "Médio",
    difficultyLevel: "Médio",
    dropCapLetter: "C",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Marisco", "Cataplana", "Algarve", "Cobre", "Vapor"],
    nutrition: {
      calories: 420,
      protein: 44.0,
      carbs: 16.0,
      fat: 18.0,
      fiber: 2.8,
      servingSize: "1 dose individual na cataplana (380g)"
    },
    ingredients: [
      { item: "Lombos de tamboril cortados em pedaços", amount: "600g", estimatedGrams: 600, category: "peixes" },
      { item: "Amêijoas frescas da Ria Formosa", amount: "400g", estimatedGrams: 400, category: "peixes" },
      { item: "Gambas frescas médias com casca", amount: "300g", estimatedGrams: 300, category: "peixes" },
      { item: "Presunto curado cortado em tirinhas", amount: "60g", estimatedGrams: 60, category: "carnes" },
      { item: "Chouriço de carne em rodelas finas", amount: "50g", estimatedGrams: 50, category: "carnes" },
      { item: "Pimentos vermelho e verde em tiras", amount: "2 un (200g)", estimatedGrams: 200, category: "legumes" },
      { item: "Tomates maduros picados", amount: "2 un (200g)", estimatedGrams: 200, category: "legumes" },
      { item: "Cebola, alho, azeite virgem e vinho branco", amount: "Q.b.", estimatedGrams: 150, category: "despensa" },
      { item: "Coentros frescos picados finos", amount: "1 molho", estimatedGrams: 25, category: "legumes" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "No fundo da cataplana de cobre, faça uma camada com o azeite, a cebola em meias-luas, os alhos laminados, as tiras de pimentos e as rodelas de chouriço e presunto.",
        notes: "A combinação de presunto com marisco é a assinatura da cataplana algarvia."
      },
      {
        stepNumber: 2,
        portugueseText: "Disponha os cubos de tamboril temperados com sal e pimenta sobre os legumes. Cubra com os tomates picados, as amêijoas limpas e as gambas inteiras.",
        notes: "Regue com o vinho branco e metade dos coentros."
      },
      {
        stepNumber: 3,
        portugueseText: "Feche a tampa da cataplana e tranque os fechos metálicos laterais. Leve a lume brando durante 15 a 18 minutos [⏳ 16 minutos].",
        notes: "O formato esférico de cobre faz o vapor circular sob pressão suave sem secar os sucos."
      },
      {
        stepNumber: 4,
        portugueseText: "Leve a cataplana fechada para a mesa e abra os trincos à frente dos convivas para libertar o turbilhão perfumado de mar e coentros frescos.",
        notes: "Polvilhe com o resto dos coentros e sirva com batatas cozidas ou pão fresco."
      }
    ],
    pantrySecret: "Não abrir a cataplana durante os 16 minutos de cocção; o vapor hermético no cobre amacia o tamboril e abre as amêijoas concentrando todos os sumos marinhos.",
    originalSourceTitle: "Gastronomia Tradicional do Algarve",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Cataplana"
  },
  {
    id: "pt-arroz-de-marisco",
    slug: "arroz-de-marisco-tradicional",
    title: "Arroz de Marisco Tradicional da Costa",
    originalTitle: "Arroz de Marisco da Praia de Vieira",
    subtitle: "Arroz carolino malandrinho e suculento com sapateira, amêijoas, berbigão, gambas e muito perfume de coentros",
    category: "peixes",
    prepTimeMinutes: 30,
    cookTimeMinutes: 25,
    servings: 4,
    difficulty: "Médio",
    difficultyLevel: "Médio",
    dropCapLetter: "A",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Marisco", "Arroz Malandrinho", "Litoral", "Praia de Vieira", "Coentros"],
    nutrition: {
      calories: 490,
      protein: 36.0,
      carbs: 52.0,
      fat: 14.5,
      fiber: 2.5,
      servingSize: "1 prato fundo cheio com caldo (420g)"
    },
    ingredients: [
      { item: "Arroz carolino português", amount: "300g", estimatedGrams: 300, category: "despensa" },
      { item: "Sapateira cozida cortada em pedaços e recheio da carapaça", amount: "1 un (600g)", estimatedGrams: 600, category: "peixes" },
      { item: "Gambas frescas médias", amount: "350g", estimatedGrams: 350, category: "peixes" },
      { item: "Amêijoas e berbigão limpos", amount: "300g", estimatedGrams: 300, category: "peixes" },
      { item: "Caldo rico feito com as cascas e cabeças das gambas", amount: "1.2 litros", estimatedGrams: 1200, category: "despensa" },
      { item: "Tomate maduro triturado sem pele", amount: "250g", estimatedGrams: 250, category: "legumes" },
      { item: "Pimento vermelho em cubinhos", amount: "1/2 un (60g)", estimatedGrams: 60, category: "legumes" },
      { item: "Cebola, alho, louro, azeite e piri-piri", amount: "Q.b.", estimatedGrams: 100, category: "legumes" },
      { item: "Coentros frescos picados finos", amount: "1 molho generoso (35g)", estimatedGrams: 35, category: "legumes" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Descasque metade das gambas e ferva as cabeças e cascas em 1.5L de água com sal durante 15 minutos [⏳ 15 minutos]. Esmague com a colher e coe o caldo concentrado.",
        notes: "O caldo das cascas confere a cor alaranjada e sabor potente a marisco."
      },
      {
        stepNumber: 2,
        portugueseText: "Num tacho largo de barro ou ferro, refogue a cebola picada, o alho, o louro e os cubinhos de pimento no azeite. Junte o tomate triturado e deixe apurar até ficar um molho brilhante.",
        notes: "Junte o recheio cremoso da carapaça da sapateira ao refogado."
      },
      {
        stepNumber: 3,
        portugueseText: "Adicione o arroz carolino e mexa durante 1 minuto para fritar o bago. Verta 1.2L do caldo de marisco a ferver (proporção de 4 partes de caldo para 1 de arroz). Cozinhe em lume brando durante 10 minutos.",
        notes: "O carolino liberta o amido ideal para manter a sopa 'malandrinha'."
      },
      {
        stepNumber: 4,
        portugueseText: "Junte as gambas, as patas e bocas da sapateira, as amêijoas e o berbigão. Coza durante mais 4 a 5 minutos até as conchas abrirem.",
        notes: "Retire do lume de imediato com bastante caldo livre."
      },
      {
        stepNumber: 5,
        portugueseText: "Polvilhe com uma chuva de coentros frescos picados e sirva na hora na própria panela.",
        notes: "O arroz de marisco não pode esperar; deve ir à mesa com o caldo a dançar no prato."
      }
    ],
    pantrySecret: "Ferver as cascas e cabeças dos camarões para fazer o caldo de base e incorporar o conteúdo cremoso da carapaça da sapateira no refogado de tomate.",
    originalSourceTitle: "Marisqueiras da Praia de Vieira e Peniche",
    originalSourceUrl: "https://www.youtube.com/results?search_query=arroz+de+marisco+tradicional"
  },
  {
    id: "pt-arroz-de-tamboril",
    slug: "arroz-de-tamboril-malandrinho",
    title: "Arroz de Tamboril Malandrinho com Gambas",
    originalTitle: "Arroz de Tamboril da Costa",
    subtitle: "Cubos tenros de tamboril e camarões mergulhados em arroz carolino aromático com tomate e coentros",
    category: "peixes",
    prepTimeMinutes: 20,
    cookTimeMinutes: 25,
    servings: 4,
    difficulty: "Médio",
    difficultyLevel: "Médio",
    dropCapLetter: "A",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Peixe", "Arroz Malandrinho", "Tamboril", "Coentros", "Costa"],
    nutrition: {
      calories: 450,
      protein: 34.0,
      carbs: 48.0,
      fat: 13.0,
      fiber: 2.2,
      servingSize: "1 prato generoso (380g)"
    },
    ingredients: [
      { item: "Lombo e cabeça de tamboril limpos em cubos", amount: "700g", estimatedGrams: 700, category: "peixes" },
      { item: "Gambas descascadas com cauda", amount: "250g", estimatedGrams: 250, category: "peixes" },
      { item: "Arroz carolino", amount: "280g", estimatedGrams: 280, category: "despensa" },
      { item: "Caldo de peixe e cabeças do tamboril", amount: "1 litro", estimatedGrams: 1000, category: "despensa" },
      { item: "Tomates maduros picados", amount: "300g", estimatedGrams: 300, category: "legumes" },
      { item: "Pimento verde em cubinhos", amount: "1/2 un (60g)", estimatedGrams: 60, category: "legumes" },
      { item: "Cebola, alho, azeite e vinho branco", amount: "Q.b.", estimatedGrams: 120, category: "despensa" },
      { item: "Coentros frescos picados", amount: "1 molho (30g)", estimatedGrams: 30, category: "legumes" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Coza a cabeça e espinhas do tamboril com água, salsa e cebola durante 15 minutos [⏳ 15 minutos] para fazer um fumet rico. Coe o caldo.",
        notes: "O colagénio da cabeça do tamboril dá textura aveludada ao arroz."
      },
      {
        stepNumber: 2,
        portugueseText: "Num tacho largo com azeite, aloure a cebola picada, os alhos e o pimento. Junte o tomate e refresque com o vinho branco, deixando apurar.",
        notes: "O refogado deve formar uma pasta perfumada."
      },
      {
        stepNumber: 3,
        portugueseText: "Adicione o arroz carolino e envolva no refogado durante 1 minuto. Verta o caldo de peixe a ferver (3.5 vezes o volume de arroz) e cozinhe durante 8 minutos.",
        notes: "Mantenha o lume médio para libertar o amido sem evaporar todo o caldo."
      },
      {
        stepNumber: 4,
        portugueseText: "Junte os cubos de tamboril e as gambas. Cozinhe mais 5 a 6 minutos [⏳ 5 minutos] até o peixe lascar e o bago ficar al dente.",
        notes: "Apague o lume, deite os coentros frescos picados e sirva de imediato no tacho."
      }
    ],
    pantrySecret: "Cozinhar a cabeça e aparas do tamboril com cebola para o caldo base; a carne do lombo só entra nos últimos 5 minutos para ficar incrivelmente suculenta.",
    originalSourceTitle: "Tradição das Docas e Portos Portugueses",
    originalSourceUrl: "https://www.youtube.com/results?search_query=arroz+de+tamboril+com+gambas"
  },
  {
    id: "pt-choco-frito-setubal",
    slug: "choco-frito-a-setubalense",
    title: "Choco Frito à Setubalense com Limão",
    originalTitle: "Choco Frito Tradicional de Setúbal",
    subtitle: "Tiras grossas de choco tenro marinadas em alho e louro, envolvidas em polme dourado e fritas até ficarem estaladiças",
    category: "peixes",
    prepTimeMinutes: 20,
    cookTimeMinutes: 15,
    servings: 4,
    difficulty: "Médio",
    difficultyLevel: "Médio",
    dropCapLetter: "C",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Peixe", "Setúbal", "Fritura", "Petisco", "Limão"],
    nutrition: {
      calories: 390,
      protein: 34.0,
      carbs: 24.0,
      fat: 17.5,
      fiber: 1.5,
      servingSize: "1 travessa individual (240g)"
    },
    ingredients: [
      { item: "Choco limpo cortado em tiras grossas de 2cm", amount: "800g", estimatedGrams: 800, category: "peixes" },
      { item: "Farinha de milho fina e farinha de trigo (50/50)", amount: "150g", estimatedGrams: 150, category: "despensa" },
      { item: "Ovo batido", amount: "1 un", estimatedGrams: 50, category: "laticinios" },
      { item: "Dentes de alho esmagados", amount: "4 dentes", estimatedGrams: 20, category: "legumes" },
      { item: "Folhas de louro e sumo de limão", amount: "2 folhas + 1 limão", estimatedGrams: 40, category: "frutas" },
      { item: "Vinho branco e pimenta preta", amount: "50ml", estimatedGrams: 50, category: "despensa" },
      { item: "Óleo ou azeite para fritar", amount: "400ml", estimatedGrams: 360, category: "despensa" },
      { item: "Gomos de limão para servir", amount: "2 un", estimatedGrams: 150, category: "frutas" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Coza previamente as tiras de choco em água com sal e uma rodela de limão durante 15 minutos [⏳ 15 minutos] até ficarem macias ao toque. Escorra e deixe secar completamente.",
        notes: "A pré-cozedura suave garante um choco que derrete na boca e nunca fica borrachoso."
      },
      {
        stepNumber: 2,
        portugueseText: "Tempere as tiras escorridas com o alho esmagado, o louro partido, sal, pimenta e vinho branco durante 20 minutos.",
        notes: "Seque ligeiramente as tiras antes de panar."
      },
      {
        stepNumber: 3,
        portugueseText: "Passe as tiras de choco pelo ovo batido e depois pela mistura de farinha de milho com farinha de trigo, sacudindo o excesso.",
        notes: "A farinha de milho é o segredo de Setúbal para uma crosta super crocante e dourada."
      },
      {
        stepNumber: 4,
        portugueseText: "Frite em óleo/azeite bem quente a 180°C durante 3 a 4 minutos até dourar. Escorra sobre papel absorvente e sirva com batatas fritas e gomos de limão fresco.",
        notes: "O prato que consagrou a gastronomia da cidade do Sado."
      }
    ],
    pantrySecret: "Cozinhar o choco previamente em água durante 15 minutos antes de temperar e usar farinha de milho fina misturada com trigo para a crosta estaladiça.",
    originalSourceTitle: "Tabernas e Tascas Ribeirinhas de Setúbal",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Choco_frito"
  },
  {
    id: "pt-sardinhas-assadas",
    slug: "sardinhas-assadas-na-brasa",
    title: "Sardinhas Assadas na Brasa com Pimentos",
    originalTitle: "Sardinhas dos Santos Populares",
    subtitle: "Sardinhas gordas da costa assadas inteiras sobre brasas vivas, servidas sobre broa ou fatias de pão com salada de pimentos",
    category: "peixes",
    prepTimeMinutes: 15,
    cookTimeMinutes: 10,
    servings: 4,
    difficulty: "Fácil",
    difficultyLevel: "Fácil",
    dropCapLetter: "S",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Peixe", "Santos Populares", "Brasa", "Verão", "Lisboa"],
    nutrition: {
      calories: 380,
      protein: 32.0,
      carbs: 18.0,
      fat: 21.0,
      fiber: 2.5,
      servingSize: "3 sardinhas grandes com pão (250g)"
    },
    ingredients: [
      { item: "Sardinhas frescas gordas (não evisceradas)", amount: "12 un (800g)", estimatedGrams: 800, category: "peixes" },
      { item: "Sal marinho grosso", amount: "3 colheres de sopa", estimatedGrams: 40, category: "especiarias" },
      { item: "Pimentos verdes e vermelhos", amount: "4 un (400g)", estimatedGrams: 400, category: "legumes" },
      { item: "Broa de milho ou fatias grossas de pão rústico", amount: "4 fatias", estimatedGrams: 200, category: "despensa" },
      { item: "Azeite virgem e vinagre de vinho para temperar os pimentos", amount: "50ml", estimatedGrams: 50, category: "despensa" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Polvilhe as sardinhas inteiras com bastante sal marinho grosso cerca de 30 a 60 minutos antes de assar.",
        notes: "O sal grosso firma as carnes e preserva os óleos saudáveis da gordura do peixe."
      },
      {
        stepNumber: 2,
        portugueseText: "Asse primeiro os pimentos inteiros na grelha sobre as brasas até a pele ficar toda negra e queimada. Coloque-os num saco fechado durante 10 minutos para suar, retire a pele e sementes e desfie em tiras temperadas com azeite, vinagre e alho.",
        notes: "A salada de pimentos assados é o acompanhamento canónico."
      },
      {
        stepNumber: 3,
        portugueseText: "Coloque as sardinhas numa grelha dupla bem quente sobre brasas sem chama ativa. Asse durante 4 a 5 minutos de um lado e 3 minutos do outro [⏳ 8 minutos].",
        notes: "A pele deve ficar prateada e tostada sem ressecar o interior."
      },
      {
        stepNumber: 4,
        portugueseText: "Coma a sardinha tradicionalmente sobre a fatia de broa de milho, deixando que a gordura rica do peixe pingue e amacie o pão.",
        notes: "A experiência máxima dos Santos Populares de Lisboa e Porto."
      }
    ],
    pantrySecret: "Salgá-las com sal grosso 1 hora antes e assar sempre inteiras sem limpar a barriga nas brasas bem incandescentes e sem chamas.",
    originalSourceTitle: "Festividades Tradicionais de Santo António e São João",
    originalSourceUrl: "https://www.youtube.com/results?search_query=sardinhas+assadas+tradicionais"
  },
  {
    id: "pt-caldeirada-de-peixe",
    slug: "caldeirada-de-peixe-pescador",
    title: "Caldeirada de Peixe à Pescador de Peniche",
    originalTitle: "Caldeirada Tradicional à Moda de Peniche",
    subtitle: "Camadas sobrepostas de peixes nobres da costa, batata às rodelas, cebola, tomate maduro e pimentos cozinhadas sem adicionar água",
    category: "peixes",
    prepTimeMinutes: 30,
    cookTimeMinutes: 35,
    servings: 6,
    difficulty: "Médio",
    difficultyLevel: "Médio",
    dropCapLetter: "C",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Peixe", "Peniche", "Costa", "Caldeirada", "Vinho Branco"],
    nutrition: {
      calories: 410,
      protein: 38.0,
      carbs: 28.0,
      fat: 15.0,
      fiber: 3.8,
      servingSize: "1 prato fundo cheio de caldeirada (400g)"
    },
    ingredients: [
      { item: "Peixes variados de caldeirada em postas (safio, raia, robalo, corvina, tamboril)", amount: "1.2 kg", estimatedGrams: 1200, category: "peixes" },
      { item: "Batatas descascadas em rodelas de 1cm", amount: "800g", estimatedGrams: 800, category: "legumes" },
      { item: "Cebolas médias em rodelas", amount: "3 un (350g)", estimatedGrams: 350, category: "legumes" },
      { item: "Tomates maduros em rodelas", amount: "4 un (400g)", estimatedGrams: 400, category: "legumes" },
      { item: "Pimentos verde e vermelho em tiras", amount: "2 un (200g)", estimatedGrams: 200, category: "legumes" },
      { item: "Dentes de alho laminados", amount: "4 dentes", estimatedGrams: 20, category: "legumes" },
      { item: "Azeite virgem extra", amount: "80ml", estimatedGrams: 75, category: "despensa" },
      { item: "Vinho branco seco da Estremadura", amount: "150ml", estimatedGrams: 150, category: "despensa" },
      { item: "Salsa fresca e piri-piri", amount: "Q.b.", estimatedGrams: 15, category: "legumes" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Num tacho largo e fundo, faça camadas alternadas: primeiro azeite, cebola em rodelas, alho e pimentos; depois batata em rodelas; depois tomate e as postas de peixe temperadas com sal e pimenta.",
        notes: "Repita as camadas terminando com tomate, pimento e salsa."
      },
      {
        stepNumber: 2,
        portugueseText: "Regue tudo com o vinho branco e o restante azeite virgem. NÃO ADICIONE ÁGUA: o peixe e os vegetais libertarão água abundante de cozedura.",
        notes: "Tape hermeticamente o tacho."
      },
      {
        stepNumber: 3,
        portugueseText: "Leve a lume brando durante 30 a 35 minutos [⏳ 30 minutos], abanando o tacho de vez em quando para não pegar ao fundo sem nunca mexer com colher para não desmanchar os peixes.",
        notes: "Abanar o tacho emulsiona o azeite com os sucos dos peixes."
      },
      {
        stepNumber: 4,
        portugueseText: "Sirva sobre fatias de pão no fundo dos pratos fundos regando generosamente com o caldo sedoso de caldeirada.",
        notes: "Prato lendário dos pescadores de Peniche e Sesimbra."
      }
    ],
    pantrySecret: "Nunca juntar água e nunca mexer com colher; abanar o tacho fechado em movimentos circulares para emulsionar o azeite com os sucos naturais dos peixes.",
    originalSourceTitle: "Receituário dos Pescadores de Peniche e Nazaré",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Caldeirada"
  },
  {
    id: "pt-feijoada-de-marisco",
    slug: "feijoada-de-marisco-costa",
    title: "Feijoada de Choco e Marisco à Costa Alentejana",
    originalTitle: "Feijoada de Marisco Tradicional",
    subtitle: "Feijão branco tenro estufado com tiras de choco, gambas, amêijoas e perfume de coentros frescos",
    category: "peixes",
    prepTimeMinutes: 25,
    cookTimeMinutes: 35,
    servings: 4,
    difficulty: "Médio",
    difficultyLevel: "Médio",
    dropCapLetter: "F",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Marisco", "Feijoada", "Costa Alentejana", "Choco", "Feijão Branco"],
    nutrition: {
      calories: 470,
      protein: 38.0,
      carbs: 46.0,
      fat: 14.0,
      fiber: 7.5,
      servingSize: "1 prato substancial (380g)"
    },
    ingredients: [
      { item: "Feijão branco cozido", amount: "600g", estimatedGrams: 600, category: "legumes" },
      { item: "Choco limpo cortado em tiras pequenas", amount: "500g", estimatedGrams: 500, category: "peixes" },
      { item: "Gambas frescas médias", amount: "300g", estimatedGrams: 300, category: "peixes" },
      { item: "Amêijoas frescas limpas", amount: "300g", estimatedGrams: 300, category: "peixes" },
      { item: "Cenoura cortada em meias-luas", amount: "1 un (120g)", estimatedGrams: 120, category: "legumes" },
      { item: "Tomate maduro pelado picado", amount: "2 un (200g)", estimatedGrams: 200, category: "legumes" },
      { item: "Cebola, alho, azeite, louro e piri-piri", amount: "Q.b.", estimatedGrams: 100, category: "legumes" },
      { item: "Coentros frescos picados finos", amount: "1 molho", estimatedGrams: 25, category: "legumes" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Num tacho com o azeite, refogue a cebola picada, o alho e o louro. Junte as tiras de choco e a cenoura e deixe estufar durante 10 minutos até o choco amaciar.",
        notes: "O choco liberta líquido que amacia a cenoura."
      },
      {
        stepNumber: 2,
        portugueseText: "Adicione o tomate picado e um cálice de vinho branco. Deixe apurar em lume brando durante 8 minutos até o molho espessar.",
        notes: "Tempere com sal marinho e uma ponta de piri-piri."
      },
      {
        stepNumber: 3,
        portugueseText: "Junte o feijão branco cozido com uma concha do seu caldo. Deixe ferver suavemente durante 10 minutos [⏳ 10 minutos] para os sabores se fundirem.",
        notes: "Esmague alguns feijões para ligar o molho."
      },
      {
        stepNumber: 4,
        portugueseText: "Adicione as gambas e as amêijoas nos últimos 4 minutos até as conchas abrirem e as gambas mudarem de cor.",
        notes: "Retire do lume, polvilhe com coentros frescos picados e sirva com arroz branco solto."
      }
    ],
    pantrySecret: "Esmagar alguns grãos de feijão branco cozido contra o fundo do tacho para deixar o molho aveludado e rico em comunhão com o marisco.",
    originalSourceTitle: "Tradição Gastronómica do Litoral Alentejano",
    originalSourceUrl: "https://www.youtube.com/results?search_query=feijoada+de+marisco+tradicional"
  },
  {
    id: "pt-atum-madeirense",
    slug: "bife-de-atum-a-madeirense",
    title: "Bife de Atum de Cebolada à Madeirense",
    originalTitle: "Atum de Cebolada com Milho Frito",
    subtitle: "Bife de atum fresco marinado em vinha-d'alhos aromática com orégãos, selado no ponto e servido com milho frito tradicional",
    category: "peixes",
    prepTimeMinutes: 25,
    cookTimeMinutes: 15,
    servings: 4,
    difficulty: "Fácil",
    difficultyLevel: "Fácil",
    dropCapLetter: "B",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Peixe", "Madeira", "Atum", "Milho Frito", "Ilhas"],
    nutrition: {
      calories: 430,
      protein: 44.0,
      carbs: 18.0,
      fat: 19.0,
      fiber: 2.1,
      servingSize: "1 bife com cebolada e milho frito (340g)"
    },
    ingredients: [
      { item: "Bifes de atum fresco de posta alta", amount: "4 bifes (700g)", estimatedGrams: 700, category: "peixes" },
      { item: "Cebolas médias cortadas em rodelas finas", amount: "3 un (300g)", estimatedGrams: 300, category: "legumes" },
      { item: "Dentes de alho esmagados", amount: "5 dentes", estimatedGrams: 25, category: "legumes" },
      { item: "Vinagre de vinho branco", amount: "50ml", estimatedGrams: 50, category: "despensa" },
      { item: "Vinho branco seco", amount: "60ml", estimatedGrams: 60, category: "despensa" },
      { item: "Orégãos secos da serra da Madeira", amount: "1 colher de sopa", estimatedGrams: 5, category: "especiarias" },
      { item: "Azeite virgem extra", amount: "50ml", estimatedGrams: 45, category: "despensa" },
      { item: "Milho frito madeirense em cubos para guarnição", amount: "8 cubos (200g)", estimatedGrams: 200, category: "despensa" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Tempere os bifes de atum com o alho esmagado, o vinagre, o vinho branco, os orégãos, louro, sal e pimenta. Deixe marinar durante 1 a 2 horas no frigorífico.",
        notes: "A vinha-d'alhos amacia a fibra densa do atum fresco."
      },
      {
        stepNumber: 2,
        portugueseText: "Numa frigideira de ferro com azeite bem quente, sele os bifes de atum escorridos em lume forte durante apenas 1 minuto e meio de cada lado [⏳ 3 minutos]. Retire para um prato.",
        notes: "O atum deve ficar rosado e suculento no centro; cozer demais seca o peixe."
      },
      {
        stepNumber: 3,
        portugueseText: "Na mesma frigideira com os sucos do atum, deite as rodelas de cebola e verta o líquido da marinada. Deixe cozinhar em lume brando durante 8 minutos até a cebola caramelizar e o molho reduzir.",
        notes: "A cebolada deve ficar agridoce e translúcida."
      },
      {
        stepNumber: 4,
        portugueseText: "Coloque os bifes de atum de novo na frigideira durante 30 segundos para aquecerem com a cebolada por cima. Sirva com cubos de milho frito bem estaladiços.",
        notes: "O prato de peixe mais famoso da Ilha da Madeira."
      }
    ],
    pantrySecret: "Marinar o atum com orégãos secos da serra e vinagre e selar na frigideira apenas 90 segundos de cada lado mantendo o coração rosado.",
    originalSourceTitle: "Tradição Gastronómica do Arquipélago da Madeira",
    originalSourceUrl: "https://www.youtube.com/results?search_query=bife+de+atum+a+madeirense"
  }
];

fs.writeFileSync(path.join(__dirname, 'peixes.json'), JSON.stringify(recipes, null, 2), 'utf-8');
console.log('Peixes generated successfully: ' + recipes.length);
