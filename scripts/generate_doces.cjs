const fs = require('fs');
const path = require('path');

const recipes = [
  // ==========================================
  // 5. SOBREMESAS E DOCES CONVENTUAIS (15 Receitas)
  // ==========================================
  {
    id: "pt-pasteis-de-nata",
    slug: "pasteis-de-nata",
    title: "Pastéis de Nata Tradicionais de Belém",
    originalTitle: "Pastéis de Nata Conventuais",
    subtitle: "Massa folhada estaladiça em espiral com creme aveludado de natas tostado em forno de alta temperatura",
    category: "doces",
    prepTimeMinutes: 30,
    cookTimeMinutes: 15,
    servings: 12,
    difficulty: "Médio",
    difficultyLevel: "Médio",
    dropCapLetter: "P",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Doces Conventuais", "Lisboa", "Tradicional", "Sobremesa"],
    nutrition: {
      calories: 285,
      protein: 4.8,
      carbs: 34.0,
      fat: 14.5,
      fiber: 0.8,
      servingSize: "1 pastel de nata (80g)"
    },
    ingredients: [
      { item: "Massa folhada de qualidade", amount: "500g", estimatedGrams: 500, category: "despensa" },
      { item: "Natas frescas com 35% de matéria gorda", amount: "500ml", estimatedGrams: 500, category: "laticinios" },
      { item: "Gemas de ovo pasteurizadas ou frescas", amount: "8 un", estimatedGrams: 160, category: "laticinios" },
      { item: "Açúcar branco fino", amount: "250g", estimatedGrams: 250, category: "despensa" },
      { item: "Farinha de trigo", amount: "40g", estimatedGrams: 40, category: "despensa" },
      { item: "Água mineral", amount: "150ml", estimatedGrams: 150, category: "despensa" },
      { item: "Pau de canela de Ceilão", amount: "1 un", estimatedGrams: 5, category: "especiarias" },
      { item: "Casca de limão cortada fina (sem parte branca)", amount: "2 tiras", estimatedGrams: 10, category: "frutas" },
      { item: "Canela em pó e açúcar em pó para servir", amount: "1 colher de sopa", estimatedGrams: 15, category: "especiarias" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Enrole a massa folhada bem apertada num cilindro com 3 a 4 cm de diâmetro. Corte em rodelas de cerca de 1,5 cm de espessura.",
        notes: "O enrolamento cria as camadas concêntricas estaladiças na base da forma."
      },
      {
        stepNumber: 2,
        portugueseText: "Coloque cada rodela no fundo de formas metálicas de queque ou pastéis de nata untadas. Com os polegares molhados em água fria, molde a massa do centro para o rebordo, deixando o rebordo ligeiramente mais espesso.",
        notes: "Mantenha as formas no frigorífico até o creme estar pronto para a massa não amolecer."
      },
      {
        stepNumber: 3,
        portugueseText: "Num tacho, ferva a água com o açúcar, a casca de limão e o pau de canela durante 3 minutos até obter uma calda fina em ponto de fio fraco [⏳ 3 minutos]. Deixe amornar.",
        notes: "A calda dá brilho acetinado e textura ao recheio."
      },
      {
        stepNumber: 4,
        portugueseText: "Noutra taça, dissolva a farinha num pouco de natas frias até não ter grumos. Junte as restantes natas e leve a lume brando, mexendo sempre com uma vara de arames até engrossar suavemente. Retire do lume e adicione a calda em fio, mexendo com vigor.",
        notes: "Deixe arrefecer durante 10 minutos antes de envolver as gemas para estas não cozerem antes do tempo."
      },
      {
        stepNumber: 5,
        portugueseText: "Misture as gemas batidas no creme morno, passe por um passador fino de rede e deite nas formas forradas de massa, sem encher até ao topo.",
        notes: "O passador garante uma textura de seda sem qualquer resíduo de clara ou gema coagulada."
      },
      {
        stepNumber: 6,
        portugueseText: "Leve ao forno previamente aquecido na temperatura máxima (250°C a 275°C) durante 10 a 14 minutos [⏳ 12 minutos] até a massa folhar e o creme apresentar manchas queimadas escuras características.",
        notes: "Sirva mornos polvilhados a gosto com canela e açúcar em pó."
      }
    ],
    pantrySecret: "O segredo do pastel de nata perfeito é a temperatura extrema do forno (mínimo 250°C, idealmente com grill superior ativo nos últimos 3 minutos) para queimar rapidamente a superfície antes do creme talhar.",
    originalSourceTitle: "Mosteiro dos Jerónimos de Belém, Lisboa",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Pastel_de_nata"
  },
  {
    id: "pt-pudim-abade-de-priscos",
    slug: "pudim-abade-de-priscos",
    title: "Pudim Abade de Priscos Canónico de Braga",
    originalTitle: "Pudim do Abade de Priscos",
    subtitle: "O lendário pudim conventual de Braga confecionado com toucinho de porco fresco, calda de açúcar em ponto e 15 gemas",
    category: "doces",
    prepTimeMinutes: 30,
    cookTimeMinutes: 50,
    servings: 10,
    difficulty: "Especialista",
    difficultyLevel: "Especialista",
    dropCapLetter: "P",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Doces Conventuais", "Minho", "Braga", "Tradicional"],
    nutrition: {
      calories: 420,
      protein: 6.2,
      carbs: 48.0,
      fat: 23.5,
      fiber: 0.2,
      servingSize: "1 fatia fina generosa (110g)"
    },
    ingredients: [
      { item: "Açúcar branco", amount: "500g", estimatedGrams: 500, category: "despensa" },
      { item: "Água mineral", amount: "500ml", estimatedGrams: 500, category: "despensa" },
      { item: "Toucinho de porco fresco bem gordo (sem sal ou carne)", amount: "50g", estimatedGrams: 50, category: "carnes" },
      { item: "Gemas de ovo frescas à temperatura ambiente", amount: "15 un", estimatedGrams: 300, category: "laticinios" },
      { item: "Vinho do Porto branco ou tawny", amount: "60ml", estimatedGrams: 60, category: "despensa" },
      { item: "Casca de limão larga", amount: "1 un", estimatedGrams: 15, category: "frutas" },
      { item: "Pau de canela", amount: "1 un", estimatedGrams: 5, category: "especiarias" },
      { item: "Caramelo líquido para untar a forma", amount: "120g", estimatedGrams: 120, category: "despensa" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Corte o toucinho em lâminas finíssimas transparentes. Num tacho, junte a água, o açúcar, as fatias de toucinho, o pau de canela e a casca de limão.",
        notes: "O toucinho liberta a gordura essencial que confere a consistência untuosa sedosa e sem paralelo."
      },
      {
        stepNumber: 2,
        portugueseText: "Leve ao lume e deixe ferver até atingir o ponto de espadana fraca (cerca de 103°C a 105°C) durante 15 minutos [⏳ 15 minutos]. Retire do lume, passe por um passador de rede fino para remover o toucinho, a canela e o limão, e deixe arrefecer até ficar morno.",
        notes: "Nunca misture as gemas com a calda a ferver para evitar talho."
      },
      {
        stepNumber: 3,
        portugueseText: "Numa tigela, coloque as 15 gemas e adicione o Vinho do Porto. Misture com um batedor manual suavemente, sem bater nem criar espuma de ar.",
        notes: "A espuma no pudim cria bolhas indesejadas na textura final, que deve ser espelhada e uniforme."
      },
      {
        stepNumber: 4,
        portugueseText: "Verta a calda morna em fio contínuo sobre as gemas, mexendo sempre devagar. Passe a mistura duas vezes por um passador fino de pano ou rede de arame.",
        notes: "O duplo coador elimina qualquer vestígio de filamentos das gemas."
      },
      {
        stepNumber: 5,
        portugueseText: "Barre generosamente uma forma de pudim com tampa com caramelo líquido caseiro escuro. Verta o preparado na forma e feche bem com a tampa hermética.",
        notes: "Se a tampa não vedar perfeitamente, vede com folha de alumínio reforçada."
      },
      {
        stepNumber: 6,
        portugueseText: "Coza em banho-maria no forno a 180°C durante 45 a 55 minutos [⏳ 50 minutos], até o centro estar firme ao toque. Deixe arrefecer totalmente à temperatura ambiente e leve ao frigorífico durante pelo menos 8 horas antes de desenformar.",
        notes: "Desenforme sempre bem gelado para um corte limpo e espelhado digno de banquete conventual."
      }
    ],
    pantrySecret: "O toucinho deve ser fresco de boa proveniência (não fumado e sem sal) cortado fino como papel para derreter na fervura da calda e conferir textura aveludada sem sabor residual a carne.",
    originalSourceTitle: "Manuel Joaquim Machado Rebelo (Abade de Priscos), Braga",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Pudim_Abade_de_Priscos"
  },
  {
    id: "pt-sericaia-alentejana",
    slug: "sericaia-alentejana",
    title: "Sericaia Alentejana Tradicional com Ameixas d'Elvas",
    originalTitle: "Sericaia ou Sericá Alentejano",
    subtitle: "Doce de colher conventual de textura fofa e rachada polvilhado com canela e coroado com ameixas em calda",
    category: "doces",
    prepTimeMinutes: 25,
    cookTimeMinutes: 45,
    servings: 8,
    difficulty: "Médio",
    difficultyLevel: "Médio",
    dropCapLetter: "S",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Doces Conventuais", "Alentejo", "Elvas", "Tradicional"],
    nutrition: {
      calories: 310,
      protein: 7.2,
      carbs: 45.0,
      fat: 11.5,
      fiber: 1.2,
      servingSize: "1 porção de colherada com 2 ameixas (130g)"
    },
    ingredients: [
      { item: "Leite gordo fresco", amount: "500ml", estimatedGrams: 500, category: "laticinios" },
      { item: "Açúcar fino", amount: "250g", estimatedGrams: 250, category: "despensa" },
      { item: "Farinha de trigo sem fermento", amount: "75g", estimatedGrams: 75, category: "despensa" },
      { item: "Ovos biológicos (gemas e claras separadas)", amount: "6 un", estimatedGrams: 300, category: "laticinios" },
      { item: "Casca de limão fresca", amount: "1 tira", estimatedGrams: 5, category: "frutas" },
      { item: "Pau de canela", amount: "1 un", estimatedGrams: 5, category: "especiarias" },
      { item: "Canela em pó de boa qualidade", amount: "2 colheres de sopa", estimatedGrams: 20, category: "especiarias" },
      { item: "Ameixas d'Elvas em calda de açúcar DOP", amount: "16 un", estimatedGrams: 240, category: "frutas" },
      { item: "Pitada de sal", amount: "1 pitada", estimatedGrams: 2, category: "especiarias" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Ferva o leite com a casca de limão e o pau de canela durante 5 minutos. Deixe amornar e retire os aromatizantes.",
        notes: "A aromatização lenta do leite liberta os óleos essenciais da canela e dos citrinos."
      },
      {
        stepNumber: 2,
        portugueseText: "Numa tigela, dissolva a farinha e uma pitada de sal com umas colheres do leite morno. Junte o restante leite e leve de novo ao lume, mexendo sempre até engrossar como um papa leve. Deixe arrefecer.",
        notes: "A base de farinha cozida confere estabilidade às claras em castelo."
      },
      {
        stepNumber: 3,
        portugueseText: "Bata as gemas com o açúcar até obter um creme fofo e esbranquiçado. Incorpore na massa de leite já arrefecida.",
        notes: "Misture com suavidade para manter a leveza do preparado."
      },
      {
        stepNumber: 4,
        portugueseText: "Bata as claras em castelo bem firme. Envolva delicadamente na mistura anterior com movimentos de baixo para cima.",
        notes: "As claras em castelo são o fermento natural da Sericaia."
      },
      {
        stepNumber: 5,
        portugueseText: "Num prato de barro fundo vidrado típico alentejano, verta a massa às colheradas desencontradas (às fatias/camadas cruzadas), polvilhando generosamente entre elas e na superfície com canela em pó abundante.",
        notes: "A técnica das colheradas cruzadas é o que faz a sericaia rachar ao crescer no forno."
      },
      {
        stepNumber: 6,
        portugueseText: "Leve ao forno quente a 200°C durante cerca de 40 a 45 minutos [⏳ 40 minutos] até abrir as fendas profundas características e dourar. Sirva morna ou fria com as Ameixas d'Elvas e a sua calda.",
        notes: "A acidez e doçura da ameixa verde em calda equilibra o aveludado do creme."
      }
    ],
    pantrySecret: "Dispor a massa no prato de barro em colheradas cruzadas e em montinhos desencontrados sob uma chuva espessa de canela garante que o doce rebenta em fendas estaladiças desiguais ao cozer.",
    originalSourceTitle: "Convento de Nossa Senhora da Conceição de Elvas",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Sericaia"
  },
  {
    id: "pt-toucinho-do-ceu",
    slug: "toucinho-do-ceu",
    title: "Toucinho do Céu Conventual de Guimarães",
    originalTitle: "Toucinho do Céu Minhoto",
    subtitle: "Doce conventual denso e sumptuoso confecionado com calda de açúcar em ponto, miolo de amêndoa fina e doce de gila",
    category: "doces",
    prepTimeMinutes: 20,
    cookTimeMinutes: 35,
    servings: 10,
    difficulty: "Médio",
    difficultyLevel: "Médio",
    dropCapLetter: "T",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Doces Conventuais", "Minho", "Guimarães", "Amêndoa"],
    nutrition: {
      calories: 395,
      protein: 8.5,
      carbs: 49.0,
      fat: 19.5,
      fiber: 3.2,
      servingSize: "1 quadrado conventual (100g)"
    },
    ingredients: [
      { item: "Açúcar branco fino", amount: "400g", estimatedGrams: 400, category: "despensa" },
      { item: "Água mineral", amount: "200ml", estimatedGrams: 200, category: "despensa" },
      { item: "Amêndoa pelada moída bem fina", amount: "250g", estimatedGrams: 250, category: "despensa" },
      { item: "Doce de chila/gila desfiado", amount: "120g", estimatedGrams: 120, category: "despensa" },
      { item: "Gemas de ovo frescas", amount: "10 un", estimatedGrams: 200, category: "laticinios" },
      { item: "Claras de ovo", amount: "2 un", estimatedGrams: 60, category: "laticinios" },
      { item: "Farinha de trigo", amount: "50g", estimatedGrams: 50, category: "despensa" },
      { item: "Manteiga para untar a forma", amount: "20g", estimatedGrams: 20, category: "laticinios" },
      { item: "Açúcar em pó para polvilhar", amount: "30g", estimatedGrams: 30, category: "despensa" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Ferva a água com o açúcar até obter ponto de pérola forte (cerca de 108°C) durante 8 a 10 minutos [⏳ 8 minutos].",
        notes: "O ponto de pérola é quando a calda cai da colher formando um fio com uma gota arredondada na ponta."
      },
      {
        stepNumber: 2,
        portugueseText: "Adicione a amêndoa moída e o doce de chila bem escorrido. Mexa em lume brando durante 3 a 4 minutos até a mistura se descolar ligeiramente do fundo do tacho.",
        notes: "A chila confere humidade e textura filamentar inimitável."
      },
      {
        stepNumber: 3,
        portugueseText: "Retire o tacho do lume e deixe arrefecer até ficar morno.",
        notes: "Garante que os ovos não coagulam antes de irem ao forno."
      },
      {
        stepNumber: 4,
        portugueseText: "Bata as gemas com as claras e a farinha peneirada. Envolva na pasta de amêndoa e chila morna até homogeneizar perfeitamente.",
        notes: "A farinha confere estrutura para que a fatia se mantenha intacta após o corte."
      },
      {
        stepNumber: 5,
        portugueseText: "Verta o preparado para uma forma redonda forrada com papel vegetal untado com manteiga e enfarinhado. Leve ao forno a 180°C durante 30 a 35 minutos [⏳ 30 minutos] até dourar mas manter o coração húmido.",
        notes: "Não deixe cozer em demasia para não secar a amêndoa."
      },
      {
        stepNumber: 6,
        portugueseText: "Deixe arrefecer completamente, desenforme, retire o papel e polvilhe generosamente a superfície com uma camada espessa de açúcar em pó.",
        notes: "Corte em fatias ou quadrados triangulares típicos."
      }
    ],
    pantrySecret: "Originalmente confecionado com banha ou toucinho de porco pelas freiras de Guimarães, a versão secular refinou-se com a nobreza da amêndoa e a doçura transparente da chila artesanal.",
    originalSourceTitle: "Convento de Santa Clara de Guimarães",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Toucinho_do_c%C3%A9u"
  },
  {
    id: "pt-ovos-moles-de-aveiro",
    slug: "ovos-moles-de-aveiro",
    title: "Ovos Moles Canónicos de Aveiro IGP",
    originalTitle: "Ovos Moles de Aveiro em Óstia",
    subtitle: "O creme dourado conventual mais célebre de Portugal moldado em hóstia de formas marinhas ou em barricas de madeira pintadas",
    category: "doces",
    prepTimeMinutes: 20,
    cookTimeMinutes: 20,
    servings: 12,
    difficulty: "Médio",
    difficultyLevel: "Médio",
    dropCapLetter: "O",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Doces Conventuais", "Beira Litoral", "Aveiro", "IGP"],
    nutrition: {
      calories: 195,
      protein: 4.2,
      carbs: 28.0,
      fat: 7.8,
      fiber: 0.1,
      servingSize: "2 conchas de hóstia com ovos moles (50g)"
    },
    ingredients: [
      { item: "Gemas de ovos frescos de galinha", amount: "12 un", estimatedGrams: 240, category: "laticinios" },
      { item: "Açúcar branco refinado", amount: "250g", estimatedGrams: 250, category: "despensa" },
      { item: "Água mineral", amount: "125ml", estimatedGrams: 125, category: "despensa" },
      { item: "Folhas de hóstia moldadas (conchas, búzios, peixes e barricas)", amount: "24 un", estimatedGrams: 40, category: "despensa" },
      { item: "Água com umas gotas de gema para selar", amount: "1 colher de sopa", estimatedGrams: 15, category: "despensa" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Passe as gemas por um passador fino de rede para retirar a película exterior (chalazas). Não pressione nem bata; deixe escorrer naturalmente.",
        notes: "Eliminar a película impede qualquer odor ou sabor a ovo cozido."
      },
      {
        stepNumber: 2,
        portugueseText: "Num tacho de cobre ou fundo espesso, misture a água com o açúcar. Leve ao lume e deixe ferver até ao ponto de espadana ou fio fraco (cerca de 105°C) durante 6 a 8 minutos [⏳ 7 minutos].",
        notes: "A calda deve escorrer da colher em fita contínua sem quebrar."
      },
      {
        stepNumber: 3,
        portugueseText: "Retire o tacho do lume e deixe arrefecer até à temperatura de 60°C (morno ao toque da mão no tacho).",
        notes: "O controlo rigoroso da temperatura é o segredo para o brilho acetinado."
      },
      {
        stepNumber: 4,
        portugueseText: "Adicione as gemas passadas à calda morna, mexendo sempre com uma colher de pau em movimentos lentos circulares. Leve novamente a lume brando, mexendo sem parar até engrossar e atingir o ponto de estrada no fundo do tacho [⏳ 5 minutos].",
        notes: "Não deixe levantar fervura para o creme não talhar."
      },
      {
        stepNumber: 5,
        portugueseText: "Retire de imediato para uma taça de loiça e deixe arrefecer completamente. O creme vai ganhar a consistência aveludada final.",
        notes: "Pode ser consumido de colher ou guardado em barquinhas."
      },
      {
        stepNumber: 6,
        portugueseText: "Preencha as metades das hóstias recortadas com o creme frio, humedeça ligeiramente os bordos com água e una as metades pressionando suavemente. Apare as rebarbas com uma tesoura fina.",
        notes: "A doçura intensa do recheio casa com a neutralidade quebradiça da hóstia."
      }
    ],
    pantrySecret: "Peneirar as gemas apenas pela ação da gravidade (sem as forçar com a colher) remove a película que causa cheiro a ovo e assegura um amarelo solar translúcido e brilhante.",
    originalSourceTitle: "Mosteiro de Jesus de Aveiro (Ordem Dominicana)",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Ovos_moles_de_Aveiro"
  },
  {
    id: "pt-pao-de-lo-de-ovar",
    slug: "pao-de-lo-de-ovar",
    title: "Pão de Ló Húmido Tradicional de Ovar IGP",
    originalTitle: "Pão de Ló de Ovar",
    subtitle: "O célebre bolo fofo cozido em forma forrada com papel almaço com coração cremoso em ponto de 'pito' que escorre",
    category: "doces",
    prepTimeMinutes: 30,
    cookTimeMinutes: 25,
    servings: 8,
    difficulty: "Médio",
    difficultyLevel: "Médio",
    dropCapLetter: "P",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Doces Tradicionais", "Beira Litoral", "Ovar", "IGP"],
    nutrition: {
      calories: 340,
      protein: 9.0,
      carbs: 44.0,
      fat: 14.5,
      fiber: 0.4,
      servingSize: "1 fatia com recheio cremoso escorrente (110g)"
    },
    ingredients: [
      { item: "Ovos inteiros frescos", amount: "4 un", estimatedGrams: 200, category: "laticinios" },
      { item: "Gemas de ovo frescas de alta qualidade", amount: "12 un", estimatedGrams: 240, category: "laticinios" },
      { item: "Açúcar branco fino", amount: "250g", estimatedGrams: 250, category: "despensa" },
      { item: "Farinha de trigo sem fermento tipo 55", amount: "100g", estimatedGrams: 100, category: "despensa" },
      { item: "Pitada de sal fino", amount: "1 pitada", estimatedGrams: 2, category: "especiarias" },
      { item: "Papel linho ou papel almaço grosso para forrar", amount: "4 folhas", estimatedGrams: 20, category: "despensa" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Forre uma forma redonda de barro ou alumínio de pão de ló com várias camadas de papel almaço ou manteiga sobrepostas, deixando as pontas saírem para fora em dobras elegantes.",
        notes: "As dobras de papel protegem a massa da queima excessiva e retêm o calor uniforme."
      },
      {
        stepNumber: 2,
        portugueseText: "Numa batedeira potente ou tigela ampla, coloque os ovos inteiros, as 12 gemas, o açúcar e a pitada de sal. Bata vigorosamente durante 25 a 30 minutos contínuos [⏳ 25 minutos] até triplicar de volume e obter um creme fofo, espesso e esbranquiçado.",
        notes: "O tempo prolongado de batimento incorpora as microbolhas de ar que dispensam qualquer fermento químico."
      },
      {
        stepNumber: 3,
        portugueseText: "Peneire a farinha sobre o preparado e envolva muito delicadamente com uma espátula de borracha ou com as mãos, em movimentos circulares do fundo para o topo, para não perder o ar.",
        notes: "A farinha deve ser misturada até deixar de se ver, sem bater."
      },
      {
        stepNumber: 4,
        portugueseText: "Deite a massa na forma forrada e alise a superfície. Tape levemente o topo com uma folha de papel solto.",
        notes: "O papel superior evita que a crosta escureça antes do tempo."
      },
      {
        stepNumber: 5,
        portugueseText: "Coza em forno pré-aquecido a 180°C durante cerca de 20 a 25 minutos [⏳ 22 minutos]. O bolo deve criar uma crosta dourada e estaladiça nas extremidades, mas o centro deve abanar como gelatina.",
        notes: "O tempo exato depende do forno; nunca deixe assar até ao centro secar."
      },
      {
        stepNumber: 6,
        portugueseText: "Retire do forno e deixe arrefecer na forma. Ao cortar, o coração dourado de gemas deve escorrer suavemente sobre o prato.",
        notes: "Conhecido popularmente como o pão de ló com 'pito' ou creme escorrente."
      }
    ],
    pantrySecret: "Bater a massa durante 25 a 30 minutos ininterruptos é o que permite à farinha incorporar o ar necessário sem fermento químico, garantindo um rebordo fofo e um centro fluido de gemas.",
    originalSourceTitle: "Tradição Vareira de Ovar, Século XVIII",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/P%C3%A3o_de_l%C3%B3_de_Ovar"
  },
  {
    id: "pt-pastel-de-tentugal",
    slug: "pastel-de-tentugal",
    title: "Pastel Estaladiço de Tentúgal IGP",
    originalTitle: "Pastel de Tentúgal em Palito",
    subtitle: "Folhas translúcidas de massa esticada até à finura da seda recheadas com doce conventual de ovos",
    category: "doces",
    prepTimeMinutes: 40,
    cookTimeMinutes: 15,
    servings: 10,
    difficulty: "Especialista",
    difficultyLevel: "Especialista",
    dropCapLetter: "P",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Doces Conventuais", "Coimbra", "Tentúgal", "IGP"],
    nutrition: {
      calories: 245,
      protein: 4.5,
      carbs: 32.0,
      fat: 11.0,
      fiber: 0.3,
      servingSize: "1 pastel em palito (75g)"
    },
    ingredients: [
      { item: "Farinha de trigo de grande força (T65)", amount: "250g", estimatedGrams: 250, category: "despensa" },
      { item: "Água morna ligeiramente salgada", amount: "120ml", estimatedGrams: 120, category: "despensa" },
      { item: "Manteiga derretida para pincelar as folhas", amount: "80g", estimatedGrams: 80, category: "laticinios" },
      { item: "Gemas de ovo frescas", amount: "10 un", estimatedGrams: 200, category: "laticinios" },
      { item: "Açúcar fino", amount: "250g", estimatedGrams: 250, category: "despensa" },
      { item: "Água para a calda de açúcar", amount: "125ml", estimatedGrams: 125, category: "despensa" },
      { item: "Açúcar em pó e canela para polvilhar", amount: "30g", estimatedGrams: 30, category: "despensa" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Amasse a farinha com a água morna até formar uma bola macia e elástica. Deixe descansar coberta durante 30 minutos.",
        notes: "O descanso relaxa o glúten da farinha permitindo esticar sem romper."
      },
      {
        stepNumber: 2,
        portugueseText: "Prepare o recheio de ovos: ferva a água com o açúcar até ponto de fio forte. Deixe arrefecer um pouco, junte as gemas batidas e leve ao lume a engrossar mexendo sempre. Reserve frio.",
        notes: "O creme de ovos deve estar firme antes de enrolar."
      },
      {
        stepNumber: 3,
        portugueseText: "Sobre uma toalha de linho enfarinhada, estique a massa com as mãos do centro para fora até ficar transparente como folha de papel bíblia.",
        notes: "No Carmelo de Tentúgal a massa era soprada e esticada com mestria secular."
      },
      {
        stepNumber: 4,
        portugueseText: "Corte retângulos de massa, sobreponha 5 a 6 camadas pinceladas finamente com manteiga derretida.",
        notes: "As camadas finas garantem a textura crocante e quebradiça."
      },
      {
        stepNumber: 5,
        portugueseText: "Coloque uma porção de creme de ovos no centro e dobre em forma de palito enrolado ou meia-lua, frisando as pontas.",
        notes: "Feche bem as extremidades para o recheio não vazar."
      },
      {
        stepNumber: 6,
        portugueseText: "Leve ao forno quente a 200°C durante 10 a 12 minutos [⏳ 10 minutos] até folhar e dourar levemente. Polvilhe com açúcar em pó e canela.",
        notes: "Sirva no próprio dia enquanto a massa mantém o estaladiço cristalino."
      }
    ],
    pantrySecret: "A massa tradicional do pastel de Tentúgal só leva farinha e água e é puxada e esticada no ar com as costas das mãos até permitir ler um jornal através dela.",
    originalSourceTitle: "Convento de Nossa Senhora do Carmo de Tentúgal",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Pastel_de_Tent%C3%BAgal"
  },
  {
    id: "pt-travesseiros-de-sintra",
    slug: "travesseiros-de-sintra",
    title: "Travesseiros Tradicionais de Sintra",
    originalTitle: "Travesseiros da Vila de Sintra",
    subtitle: "Rolinhos folhados crocantes recheados com creme aromático de gemas, amêndoa e doce de chila",
    category: "doces",
    prepTimeMinutes: 25,
    cookTimeMinutes: 20,
    servings: 8,
    difficulty: "Médio",
    difficultyLevel: "Médio",
    dropCapLetter: "T",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Doces Tradicionais", "Sintra", "Estremadura", "Folhado"],
    nutrition: {
      calories: 325,
      protein: 5.8,
      carbs: 38.0,
      fat: 17.5,
      fiber: 1.5,
      servingSize: "1 travesseiro quente (90g)"
    },
    ingredients: [
      { item: "Massa folhada de manteiga de boa qualidade", amount: "500g", estimatedGrams: 500, category: "despensa" },
      { item: "Amêndoa pelada e ralada fina", amount: "150g", estimatedGrams: 150, category: "despensa" },
      { item: "Açúcar fino", amount: "200g", estimatedGrams: 200, category: "despensa" },
      { item: "Água mineral", amount: "100ml", estimatedGrams: 100, category: "despensa" },
      { item: "Gemas de ovo frescas", amount: "6 un", estimatedGrams: 120, category: "laticinios" },
      { item: "Doce de gila desfiado (opcional mas tradicional)", amount: "50g", estimatedGrams: 50, category: "despensa" },
      { item: "Açúcar granulado fino para envolver", amount: "50g", estimatedGrams: 50, category: "despensa" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Ferva a água com o açúcar até ponto de fio brando durante 5 minutos. Adicione a amêndoa ralada e a gila desfiada, deixando ferver mais 2 minutos.",
        notes: "A amêndoa absorve a calda e adquire textura macia."
      },
      {
        stepNumber: 2,
        portugueseText: "Retire do lume, deixe amornar e envolva as gemas batidas. Leve ao lume brando mexendo até engrossar e deixe arrefecer por completo.",
        notes: "O creme deve estar frio ao ser colocado sobre a massa folhada."
      },
      {
        stepNumber: 3,
        portugueseText: "Estenda a massa folhada numa bancada enfarinhada com espessura fina (cerca de 2 a 3 mm). Corte retângulos de cerca de 10x12 cm.",
        notes: "Mantenha a massa bem fria para folhar alto no forno."
      },
      {
        stepNumber: 4,
        portugueseText: "Coloque uma colherada generosa de recheio no centro de cada retângulo e dobre as abas sobre o recheio em forma de almofadinha/travesseiro.",
        notes: "Pressione ligeiramente as extremidades para selar sem esmagar o folhado."
      },
      {
        stepNumber: 5,
        portugueseText: "Coloque num tabuleiro forrado com papel vegetal com a dobra virada para baixo. Coza a 210°C durante 18 a 20 minutos [⏳ 18 minutos] até estarem bem dourados e tufados.",
        notes: "O calor alto faz evaporar a água da manteiga folhando a massa."
      },
      {
        stepNumber: 6,
        portugueseText: "Retire do forno e passe de imediato por açúcar fino enquanto estão bem quentes.",
        notes: "O açúcar agarra na superfície quente conferindo um crocante doce espetacular."
      }
    ],
    pantrySecret: "Envolver os travesseiros em açúcar granulado mal saem do forno, ainda a crepitar de calor, cria a crosta cristalizada caraterística da famosa doçaria da serra de Sintra.",
    originalSourceTitle: "Casa Piriquita, Vila Velha de Sintra (Século XIX)",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Travesseiro_(doce)"
  },
  {
    id: "pt-arroz-doce-tradicional",
    slug: "arroz-doce-tradicional",
    title: "Arroz Doce Cremoso Tradicional com Canela",
    originalTitle: "Arroz Doce à Portuguesa com Gemas",
    subtitle: "O arroz carolino cozido lentamente em leite aromatizado com limão e canela e enriquecido com gemas douradas",
    category: "doces",
    prepTimeMinutes: 10,
    cookTimeMinutes: 40,
    servings: 8,
    difficulty: "Fácil",
    difficultyLevel: "Fácil",
    dropCapLetter: "A",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Doces Tradicionais", "Festas", "Tradicional", "Conforto"],
    nutrition: {
      calories: 260,
      protein: 6.5,
      carbs: 42.0,
      fat: 7.2,
      fiber: 0.8,
      servingSize: "1 taça decorada com canela (160g)"
    },
    ingredients: [
      { item: "Arroz carolino português (grão curto)", amount: "200g", estimatedGrams: 200, category: "despensa" },
      { item: "Água mineral", amount: "250ml", estimatedGrams: 250, category: "despensa" },
      { item: "Leite gordo de preferência do dia", amount: "1000ml", estimatedGrams: 1000, category: "laticinios" },
      { item: "Açúcar branco", amount: "180g", estimatedGrams: 180, category: "despensa" },
      { item: "Gemas de ovo frescas", amount: "4 un", estimatedGrams: 80, category: "laticinios" },
      { item: "Casca de limão larga", amount: "2 tiras", estimatedGrams: 10, category: "frutas" },
      { item: "Pau de canela", amount: "1 un", estimatedGrams: 5, category: "especiarias" },
      { item: "Manteiga com sal", amount: "20g", estimatedGrams: 20, category: "laticinios" },
      { item: "Canela em pó para decorar em ziguezague", amount: "1 colher de sopa", estimatedGrams: 10, category: "especiarias" },
      { item: "Pitada de sal marinho", amount: "1 pitada", estimatedGrams: 2, category: "especiarias" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Num tacho, coza o arroz na água com uma pitada de sal e a manteiga até a água ser totalmente absorvida pelo bago (cerca de 7 minutos).",
        notes: "Abrir o arroz na água primeiro liberta o amido para o creme ficar aveludado."
      },
      {
        stepNumber: 2,
        portugueseText: "Aqueça o leite com a casca de limão e o pau de canela até quase ferver. Adicione conchas de leite quente ao arroz aos poucos, mexendo em lume brando durante 25 a 30 minutos [⏳ 25 minutos] à medida que o grão vai cozendo e absorvendo o líquido.",
        notes: "Adicionar o leite quente gradualmente imita a técnica de risotto, garantindo cremosidade ímpar."
      },
      {
        stepNumber: 3,
        portugueseText: "Quando o arroz estiver cozido e tenro, junte o açúcar e mexa suavemente durante mais 5 minutos.",
        notes: "Nunca junte o açúcar no início, pois ele endurece o bago do arroz antes de cozer."
      },
      {
        stepNumber: 4,
        portugueseText: "Retire do lume. Numa tigela, desfaça as gemas com algumas colheradas do arroz quente para temperar. Verta no tacho mexendo sempre sem parar.",
        notes: "A temperagem das gemas impede que talhem ao entrar no tacho."
      },
      {
        stepNumber: 5,
        portugueseText: "Leve ao lume mais fraco durante 2 minutos apenas para engrossar, sem ferver.",
        notes: "O creme fica espesso e aveludado com uma tonalidade dourada irresistível."
      },
      {
        stepNumber: 6,
        portugueseText: "Distribua de imediato por travessas ou pratos fundos. Deixe arrefecer e decore com canela em pó fazendo motivos em losango, flor ou renda tradicional.",
        notes: "Decore a gosto com papel recortado ou com a ponta dos dedos."
      }
    ],
    pantrySecret: "O açúcar só deve ser adicionado após o bago de arroz estar completamente cozido e aberto no leite; se colocado antes, impede a hidratação correta do amido e o arroz fica duro.",
    originalSourceTitle: "Tradição das Festas Populares de Portugal",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Arroz-doce"
  },
  {
    id: "pt-aletria-de-natal",
    slug: "aletria-de-natal",
    title: "Aletria Tradicional com Gemas e Canela",
    originalTitle: "Aletria Minhota de Cortar à Faca",
    subtitle: "Massa finíssima de aletria cozida em leite perfumado com citrinos e enriquecida com gemas para saborear cremosa ou em fatias",
    category: "doces",
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    servings: 8,
    difficulty: "Fácil",
    difficultyLevel: "Fácil",
    dropCapLetter: "A",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Doces Tradicionais", "Natal", "Minho", "Tradição"],
    nutrition: {
      calories: 240,
      protein: 5.5,
      carbs: 40.0,
      fat: 6.8,
      fiber: 0.9,
      servingSize: "1 porção com canela desenhada (140g)"
    },
    ingredients: [
      { item: "Massa aletria fina", amount: "150g", estimatedGrams: 150, category: "despensa" },
      { item: "Leite meio-gordo ou gordo", amount: "600ml", estimatedGrams: 600, category: "laticinios" },
      { item: "Água", amount: "150ml", estimatedGrams: 150, category: "despensa" },
      { item: "Açúcar", amount: "150g", estimatedGrams: 150, category: "despensa" },
      { item: "Gemas de ovo frescas", amount: "4 un", estimatedGrams: 80, category: "laticinios" },
      { item: "Manteiga sem sal", amount: "25g", estimatedGrams: 25, category: "laticinios" },
      { item: "Casca de limão", amount: "1 tira", estimatedGrams: 5, category: "frutas" },
      { item: "Pau de canela", amount: "1 un", estimatedGrams: 5, category: "especiarias" },
      { item: "Canela em pó para desenhar", amount: "1 colher de sobremesa", estimatedGrams: 8, category: "especiarias" },
      { item: "Pitada de sal", amount: "1 pitada", estimatedGrams: 2, category: "especiarias" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Num tacho, leve ao lume a água com a casca de limão, o pau de canela, a manteiga e uma pitada de sal. Quando ferver, junte a aletria partida com as mãos.",
        notes: "Partir a massa ajuda a distribuir de forma uniforme no prato."
      },
      {
        stepNumber: 2,
        portugueseText: "Deixe cozer até a água secar quase por completo (cerca de 4 a 5 minutos).",
        notes: "Abre os fios de massa para absorverem o leite."
      },
      {
        stepNumber: 3,
        portugueseText: "Adicione o leite quente aos poucos, mexendo sempre em lume médio até a aletria estar cozida e tenra (cerca de 8 minutos) [⏳ 8 minutos].",
        notes: "O amido da massa engrossa naturalmente o caldo de leite."
      },
      {
        stepNumber: 4,
        portugueseText: "Junte o açúcar e mexa durante 2 minutos. Retire o pau de canela e a casca de limão.",
        notes: "O açúcar adoça e dá brilho sem escurecer."
      },
      {
        stepNumber: 5,
        portugueseText: "Retire o tacho do lume, misture uma concha da calda com as gemas previamente batidas para temperar e verta tudo no tacho mexendo energicamente.",
        notes: "Se preferir aletria de cortar à faca (estilo Minho), use mais uma gema e deixe cozer mais 2 minutos."
      },
      {
        stepNumber: 6,
        portugueseText: "Verta numa travessa rasa, alise e decore com canela em pó desenhando traços cruzados ou motivos natalícios.",
        notes: "Pode ser consumida quente e cremosa ou fria e firme."
      }
    ],
    pantrySecret: "No Minho a aletria é rica e cortada à faca, enquanto na Beira é servida solta e cremosa; o segredo está no ponto de cozedura do leite e na quantidade de gemas adicionadas no final.",
    originalSourceTitle: "Tradição de Consoada do Norte de Portugal",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Aletria"
  },
  {
    id: "pt-tigelada-de-abrantes",
    slug: "tigelada-de-abrantes",
    title: "Tigelada Tradicional de Abrantes",
    originalTitle: "Tigelada de Abrantes em Caçoila de Barro",
    subtitle: "O doce rústico cozido em caçoilas de barro não vidrado bem incandescentes no forno a lenha até criar favos e crosta caramelizada",
    category: "doces",
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    servings: 8,
    difficulty: "Fácil",
    difficultyLevel: "Fácil",
    dropCapLetter: "T",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Doces Tradicionais", "Ribatejo", "Abrantes", "Rústico"],
    nutrition: {
      calories: 225,
      protein: 7.0,
      carbs: 32.0,
      fat: 7.5,
      fiber: 0.3,
      servingSize: "1 fatia rústica de tigelada (120g)"
    },
    ingredients: [
      { item: "Leite gordo (preferencialmente de cabra ou vaca gordo)", amount: "500ml", estimatedGrams: 500, category: "laticinios" },
      { item: "Ovos inteiros frescos", amount: "6 un", estimatedGrams: 300, category: "laticinios" },
      { item: "Açúcar fino", amount: "200g", estimatedGrams: 200, category: "despensa" },
      { item: "Farinha de trigo sem fermento", amount: "40g", estimatedGrams: 40, category: "despensa" },
      { item: "Casca de limão finamente ralada", amount: "1 colher de chá", estimatedGrams: 5, category: "frutas" },
      { item: "Canela em pó", amount: "1 colher de chá", estimatedGrams: 5, category: "especiarias" },
      { item: "Pitada de sal", amount: "1 pitada", estimatedGrams: 2, category: "especiarias" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Coloque uma caçoila de barro não vidrado de boca larga no forno e aqueça-a a 220°C durante pelo menos 25 minutos até ficar incandescente.",
        notes: "A caçoila escaldante sela a massa de imediato criando os alvéolos tradicionais."
      },
      {
        stepNumber: 2,
        portugueseText: "Numa tigela, bata bem os ovos com o açúcar até formar um creme espumoso.",
        notes: "Os ovos criam a textura leve que cresce no calor do barro."
      },
      {
        stepNumber: 3,
        portugueseText: "Junte a farinha, a raspa de limão, a canela e uma pitada de sal, misturando com suavidade.",
        notes: "A pequena quantidade de farinha apenas dá consistência sem pesar."
      },
      {
        stepNumber: 4,
        portugueseText: "Adicione o leite morno em fio contínuo, mexendo bem com uma vara de arames até a mistura ficar homogénea e líquida.",
        notes: "A massa é muito fluida, semelhante a um crepe ou clafoutis."
      },
      {
        stepNumber: 5,
        portugueseText: "Com uma luva térmica, abra o forno, puxe a caçoila a ferver e verta a mistura de imediato diretamente no barro muito quente (vai chiar e chiar).",
        notes: "O chiar característico carameliza o fundo instantaneamente."
      },
      {
        stepNumber: 6,
        portugueseText: "Feche o forno e coza a 200°C durante 25 a 30 minutos [⏳ 25 minutos] até queimar nas bordas e dourar por cima com textura de favos de mel.",
        notes: "Ao arrefecer, o doce abaterá no meio formando uma cavidade típica com crosta crocante."
      }
    ],
    pantrySecret: "Aquecer a caçoila de barro no forno até chiar antes de deitar a massa é o verdadeiro segredo para a tigelada adquirir a crosta escura alveolar e o sabor tostado único.",
    originalSourceTitle: "Tradição das Festas de São João de Abrantes",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Tigelada"
  },
  {
    id: "pt-queijadas-de-sintra",
    slug: "queijadas-de-sintra",
    title: "Queijadas Tradicionais de Sintra",
    originalTitle: "Queijadas de Sintra Canónicas",
    subtitle: "Massa crocante e fina recheada com queijo fresco da serra desfeito com gemas, açúcar e canela",
    category: "doces",
    prepTimeMinutes: 30,
    cookTimeMinutes: 20,
    servings: 12,
    difficulty: "Médio",
    difficultyLevel: "Médio",
    dropCapLetter: "Q",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Doces Tradicionais", "Sintra", "Queijo", "Tradição"],
    nutrition: {
      calories: 180,
      protein: 5.8,
      carbs: 26.0,
      fat: 6.2,
      fiber: 0.5,
      servingSize: "1 queijada de Sintra (60g)"
    },
    ingredients: [
      { item: "Farinha de trigo sem fermento", amount: "150g", estimatedGrams: 150, category: "despensa" },
      { item: "Manteiga amolecida", amount: "20g", estimatedGrams: 20, category: "laticinios" },
      { item: "Água morna ligeiramente salgada", amount: "60ml", estimatedGrams: 60, category: "despensa" },
      { item: "Queijo fresco de vaca bem seco e escorrido", amount: "300g", estimatedGrams: 300, category: "laticinios" },
      { item: "Açúcar fino", amount: "200g", estimatedGrams: 200, category: "despensa" },
      { item: "Gemas de ovo", amount: "4 un", estimatedGrams: 80, category: "laticinios" },
      { item: "Farinha para o recheio", amount: "30g", estimatedGrams: 30, category: "despensa" },
      { item: "Canela em pó", amount: "1 colher de chá", estimatedGrams: 5, category: "especiarias" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Prepare a massa: misture a farinha com a manteiga e vá juntando a água salgada morna até formar uma bola homogénea. Amasse 5 minutos e deixe repousar coberta 20 minutos.",
        notes: "A massa fina fica crocante após ir ao forno."
      },
      {
        stepNumber: 2,
        portugueseText: "Passe o queijo fresco muito bem escorrido por um passador de rede fino ou processe até ficar em pasta lisa sem grumos.",
        notes: "Queijo fresco bem escorrido evita excesso de água no recheio."
      },
      {
        stepNumber: 3,
        portugueseText: "Junte ao queijo o açúcar, as gemas, a canela e a farinha peneirada. Mexa bem com uma colher de pau até obter um creme espesso e brilhante.",
        notes: "O queijo fresco funde-se com o açúcar num paladar suave."
      },
      {
        stepNumber: 4,
        portugueseText: "Estenda a massa finíssima com o rolo numa bancada enfarinhada. Corte círculos e forre forminhas pequenas de queijada frisadas.",
        notes: "A massa deve ficar com menos de 1 mm de espessura."
      },
      {
        stepNumber: 5,
        portugueseText: "Preencha as forminhas com o creme de queijo quase até ao bordo.",
        notes: "O recheio sobe ligeiramente durante a cozedura."
      },
      {
        stepNumber: 6,
        portugueseText: "Coza no forno pré-aquecido a 200°C durante 18 a 20 minutos [⏳ 18 minutos] até o topo ficar salpicado de manchas douradas tostadas e a massa crocante. Deixe arrefecer antes de desenformar.",
        notes: "Desenforme frias e guarde embrulhadas em rolos de papel vegetal como manda a tradição."
      }
    ],
    pantrySecret: "O queijo fresco deve ser prensado em pano branco durante algumas horas antes do fabrico para retirar todo o soro e obter a textura densa e sedosa inconfundível.",
    originalSourceTitle: "Fábricas de Queijadas de Sintra (Século XIII)",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Queijada_de_Sintra"
  },
  {
    id: "pt-rabanadas-tradicionais",
    slug: "rabanadas-tradicionais",
    title: "Rabanadas Douradas com Vinho do Porto e Calda de Canela",
    originalTitle: "Fatias Douradas de Natal à Portuguesa",
    subtitle: "Fatias grossas de pão cacete embebidas em leite aromatizado com limão e canela, passadas por ovo e douradas em calda aromática",
    category: "doces",
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    servings: 6,
    difficulty: "Fácil",
    difficultyLevel: "Fácil",
    dropCapLetter: "R",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Doces Tradicionais", "Natal", "Porto", "Tradição"],
    nutrition: {
      calories: 270,
      protein: 6.0,
      carbs: 39.0,
      fat: 10.5,
      fiber: 1.8,
      servingSize: "2 rabanadas com calda (130g)"
    },
    ingredients: [
      { item: "Pão de véspera de côdea macia (cacete ou pão de rabanadas)", amount: "400g", estimatedGrams: 400, category: "despensa" },
      { item: "Leite gordo", amount: "500ml", estimatedGrams: 500, category: "laticinios" },
      { item: "Casca de limão", amount: "1 tira", estimatedGrams: 5, category: "frutas" },
      { item: "Pau de canela", amount: "1 un", estimatedGrams: 5, category: "especiarias" },
      { item: "Ovos frescos batidos", amount: "4 un", estimatedGrams: 200, category: "laticinios" },
      { item: "Óleo ou azeite suave para fritar", amount: "250ml", estimatedGrams: 230, category: "despensa" },
      { item: "Açúcar e canela em pó para passar", amount: "100g", estimatedGrams: 100, category: "despensa" },
      { item: "Vinho do Porto Tawny para a calda", amount: "60ml", estimatedGrams: 60, category: "despensa" },
      { item: "Mel ou açúcar para a calda tradicional", amount: "100g", estimatedGrams: 100, category: "despensa" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Corte o pão em fatias com cerca de 1,5 a 2 cm de espessura.",
        notes: "Pão com miolo firme de véspera não se desfaz ao embeber."
      },
      {
        stepNumber: 2,
        portugueseText: "Ferva o leite com a casca de limão, o pau de canela e 2 colheres de açúcar durante 3 minutos. Deixe amornar e verta para um prato fundo.",
        notes: "O leite morno penetra no coração do pão deixando-o cremoso como pudim."
      },
      {
        stepNumber: 3,
        portugueseText: "Mergulhe as fatias de pão no leite morno durante alguns segundos de cada lado até ficarem bem empapadas mas inteiras. Escorra ligeiramente num prato.",
        notes: "Não deixe tempo demais para não se quebrarem ao fritar."
      },
      {
        stepNumber: 4,
        portugueseText: "Passe cada fatia pelos ovos batidos garantindo cobertura total.",
        notes: "O ovo sela a humidade do leite no interior."
      },
      {
        stepNumber: 5,
        portugueseText: "Frite em óleo ou azeite bem quente a 180°C durante 1 a 2 minutos de cada lado até estarem douradas e inchadas. Retire e escorra em papel absorvente.",
        notes: "Garante exterior crocante e coração húmido."
      },
      {
        stepNumber: 6,
        portugueseText: "Passe de imediato pela mistura de açúcar e canela ou regue com calda de açúcar fervida com Vinho do Porto e canela.",
        notes: "A calda com Vinho do Porto é a versão nobre do Norte de Portugal."
      }
    ],
    pantrySecret: "Utilizar pão cacete de véspera com miolo denso embebido em leite aromatizado morno faz com que o interior pareça creme pasteleiro após a fritura rápida.",
    originalSourceTitle: "Tradição das Festas Natalícias de Portugal",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Rabanada"
  },
  {
    id: "pt-bolo-de-mel-da-madeira",
    slug: "bolo-de-mel-da-madeira",
    title: "Bolo de Mel Tradicional da Madeira",
    originalTitle: "Bolo de Mel de Cana da Madeira",
    subtitle: "O bolo mais antigo e nobre do arquipélago madeirense repleto de especiarias das rotas marítimas, nozes e mel de cana",
    category: "doces",
    prepTimeMinutes: 30,
    cookTimeMinutes: 45,
    servings: 12,
    difficulty: "Médio",
    difficultyLevel: "Médio",
    dropCapLetter: "B",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Doces Tradicionais", "Madeira", "Ilhas", "Especiarias"],
    nutrition: {
      calories: 380,
      protein: 5.2,
      carbs: 56.0,
      fat: 16.5,
      fiber: 2.8,
      servingSize: "1 fatia partida à mão (100g)"
    },
    ingredients: [
      { item: "Farinha de trigo sem fermento", amount: "500g", estimatedGrams: 500, category: "despensa" },
      { item: "Mel de cana de açúcar genuíno da Madeira", amount: "350g", estimatedGrams: 350, category: "despensa" },
      { item: "Manteiga de qualidade", amount: "100g", estimatedGrams: 100, category: "laticinios" },
      { item: "Banha de porco", amount: "75g", estimatedGrams: 75, category: "carnes" },
      { item: "Açúcar amarelo", amount: "150g", estimatedGrams: 150, category: "despensa" },
      { item: "Nozes e amêndoas picadas", amount: "150g", estimatedGrams: 150, category: "despensa" },
      { item: "Noz-moscada, canela e cravinho em pó", amount: "2 colheres de chá", estimatedGrams: 10, category: "especiarias" },
      { item: "Bicarbonato de sódio dissolvido em 50ml de Vinho Madeira", amount: "1 colher de chá", estimatedGrams: 50, category: "despensa" },
      { item: "Erva-doce moída fina", amount: "1 colher de sopa", estimatedGrams: 10, category: "especiarias" },
      { item: "Metades de noz e amêndoa para decorar o topo", amount: "50g", estimatedGrams: 50, category: "despensa" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Num tacho, derreta as gorduras (manteiga e banha) com o açúcar e o mel de cana. Deixe arrefecer até ficar morno.",
        notes: "O mel de cana dá a cor escura característica e o aroma terroso."
      },
      {
        stepNumber: 2,
        portugueseText: "Num alguidar amplo, disponha a farinha com as especiarias (erva-doce, canela, cravinho e noz-moscada). Abra uma cova no meio e verta a mistura de mel e gorduras.",
        notes: "As especiarias representam as navegações históricas pela Madeira."
      },
      {
        stepNumber: 3,
        portugueseText: "Adicione o bicarbonato dissolvido no Vinho Madeira e comece a amassar bem com as mãos até a massa se despegar do recipiente.",
        notes: "A massa é consistente e rica."
      },
      {
        stepNumber: 4,
        portugueseText: "Incorpore as nozes e amêndoas picadas distribuindo-as por toda a massa.",
        notes: "A tradição manda deixar a massa levedar envolvida em mantas durante a noite."
      },
      {
        stepNumber: 5,
        portugueseText: "Divida a massa por formas baixas redondas untadas com banha e farinha. Decore a superfície com meias nozes e amêndoas inteiras dispostas em círculo radial.",
        notes: "Pressione os frutos secos na superfície para não queimarem."
      },
      {
        stepNumber: 6,
        portugueseText: "Coza em forno pré-aquecido a 180°C durante 40 a 45 minutos [⏳ 40 minutos]. Deixe arrefecer na forma. Guarde embrulhado em papel vegetal.",
        notes: "O bolo dura meses e a tradição manda nunca cortá-lo com faca, partindo-o sempre com as mãos."
      }
    ],
    pantrySecret: "Por tradição centenária na Madeira, o bolo de mel nunca é cortado com faca de metal para não oxidar as especiarias, sendo sempre partido à mão em pedaços e consumido até meses após o fabrico.",
    originalSourceTitle: "Tradição das Festas Madeirenses de Dezembro",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Bolo_de_mel"
  },
  {
    id: "pt-queijadas-vila-franca-do-campo",
    slug: "queijadas-vila-franca-do-campo",
    title: "Queijadas da Vila Franca do Campo",
    originalTitle: "Queijadas Tradicionais da Ilha de São Miguel",
    subtitle: "Doce açoriano conventual confecionado com queijo coalhado fresco das pastagens verdes de São Miguel e polvilhado de açúcar",
    category: "doces",
    prepTimeMinutes: 25,
    cookTimeMinutes: 25,
    servings: 10,
    difficulty: "Médio",
    difficultyLevel: "Médio",
    dropCapLetter: "Q",
    isPortugueseTraditional: true,
    area: "Portuguese",
    tags: ["Portugal", "Doces Tradicionais", "Açores", "São Miguel", "Ilhas"],
    nutrition: {
      calories: 215,
      protein: 5.5,
      carbs: 30.0,
      fat: 8.5,
      fiber: 0.4,
      servingSize: "1 queijada açoriana (70g)"
    },
    ingredients: [
      { item: "Farinha de trigo sem fermento", amount: "120g", estimatedGrams: 120, category: "despensa" },
      { item: "Manteiga açoriana com sal derretida", amount: "25g", estimatedGrams: 25, category: "laticinios" },
      { item: "Água morna", amount: "50ml", estimatedGrams: 50, category: "despensa" },
      { item: "Leite gordo coalhado escorrido (coalhada fresca)", amount: "300g", estimatedGrams: 300, category: "laticinios" },
      { item: "Açúcar fino", amount: "200g", estimatedGrams: 200, category: "despensa" },
      { item: "Gemas de ovo frescas", amount: "4 un", estimatedGrams: 80, category: "laticinios" },
      { item: "Manteiga açoriana amolecida para o recheio", amount: "30g", estimatedGrams: 30, category: "laticinios" },
      { item: "Farinha fina para o recheio", amount: "25g", estimatedGrams: 25, category: "despensa" },
      { item: "Açúcar em pó para polvilhar abundantemente", amount: "40g", estimatedGrams: 40, category: "despensa" }
    ],
    steps: [
      {
        stepNumber: 1,
        portugueseText: "Prepare a massa exterior: amasse a farinha com a manteiga derretida e a água morna até obter uma massa maleável e lisa. Deixe descansar 15 minutos.",
        notes: "A massa fina fica quebradiça como concha protectora."
      },
      {
        stepNumber: 2,
        portugueseText: "Passe a coalhada fresca de leite muito bem espremida por um passador de rede fina, eliminando qualquer excesso de soro.",
        notes: "A pureza e frescura do leite açoriano é o pilar deste doce secular."
      },
      {
        stepNumber: 3,
        portugueseText: "Numa tigela, bata a coalhada com o açúcar e a manteiga amolecida até formar um creme fino. Junte as gemas e a farinha, envolvendo com suavidade.",
        notes: "O recheio adquire uma cor de marfim aveludada."
      },
      {
        stepNumber: 4,
        portugueseText: "Estenda a massa finíssima com o rolo e forre formas pequenas de queijada frisadas previamente untadas.",
        notes: "A massa deve ficar com menos de 1 mm de espessura."
      },
      {
        stepNumber: 5,
        portugueseText: "Encha as formas com o creme de coalhada até ao bordo e leve ao forno pré-aquecido a 190°C durante 20 a 25 minutos [⏳ 20 minutos] até dourar levemente.",
        notes: "Não deixe tostar excessivamente para manter o interior suave."
      },
      {
        stepNumber: 6,
        portugueseText: "Desenforme mornas e polvilhe generosamente com açúcar em pó antes de servir.",
        notes: "O doce histórico das freiras do Convento de Santo André de Vila Franca."
      }
    ],
    pantrySecret: "Utilizar leite gordo coalhado de São Miguel e espremido em pano de linho cria a consistência granular fina que se desfaz na boca ao trincar a concha crocante.",
    originalSourceTitle: "Convento de Santo André, Vila Franca do Campo (São Miguel)",
    originalSourceUrl: "https://pt.wikipedia.org/wiki/Queijada_da_Vila"
  }
];

// Salva em formato JSON ou exporta
module.exports = recipes;
if (require.main === module) {
  console.log('Doces generated successfully:', recipes.length);
}
