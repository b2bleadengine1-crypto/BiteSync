import { FruitGuideItem } from '../types/cookbook';

export const FRUIT_COMPENDIUM: FruitGuideItem[] = [
  {
    id: 'marmelo',
    name: 'Marmelo Dourado da Beira',
    latinName: 'Cydonia oblonga',
    season: 'Outono',
    pectinLevel: 'Muito Alta',
    sugarRatioPerKg: '750g a 800g de açúcar por 1kg de polpa limpa',
    description: 'O rei incontestado dos doces de conserva em Portugal. A sua polpa densa, dura e adstringente quando crua transforma-se num rubi translúcido de consistência nobre após cozedura lenta.',
    historicalNote: 'Foi a partir da palavra portuguesa "marmelo" que nasceu o termo universal "marmelada" (marmalade), registado em tratados culinários desde o século XIV.',
    harvestAdvice: 'Colha após os primeiros nevoeiros de Outono, quando a penugem exterior (cotão) se desprende facilmente com um esfregar suave e a casca adquire um amarelo cera luminoso.',
    preservationTechniques: [
      'Marmelada branca ou rubi de corte em tigelas de barro vidrado',
      'Geleia translúcida obtida pela fervura exclusiva das cascas e caroços',
      'Marmelos assados inteiros em vinho tinto e canela para conserva em calda'
    ],
    recommendedUses: [
      'Acompanhamento de queijo de ovelha curado da Serra da Estrela',
      'Base para tartes e empadas de caça',
      'Geleia de acabamento para conferir brilho espelhado a bolos'
    ],
    grandmotherSecret: 'Para que a marmelada ganhe aquele corte firme sem precisar de gelatinas artificiais, ferva as sementes dentro de um nó de pano de linho junto com a fruta e seque as tigelas ao sol durante 3 dias cobertas com papel embebido em aguardente.',
    nutrition: {
      calories: 57,
      protein: 0.4,
      carbs: 15.3,
      fat: 0.1,
      fiber: 1.9,
      sugar: 12.5,
      servingSize: '100g de fruta fresca',
    }
  },
  {
    id: 'figo-pingo-mel',
    name: 'Figo Pingo de Mel e Lampos',
    latinName: 'Ficus carica',
    season: 'Verão',
    pectinLevel: 'Baixa',
    sugarRatioPerKg: '500g de açúcar por 1kg de figos (com sumo de 1 limão)',
    description: 'Fruta sagrada dos pomares de calcário. Os figos lampos abrem o Verão em Junho e os vindimos encerram a época em Setembro com uma polpa rosada e uma gota de néctar na base.',
    historicalNote: 'Nos celeiros do Algarve e Alentejo, os figos eram secos sobre esteiras de cana (canisse) sob o sol escaldante de Agosto, sendo depois recheados com amêndoas torradas e funcho.',
    harvestAdvice: 'Apanhe ao romper do dia com o orvalho fresco, usando uma vara com cesto ou tesoura curta para não rasgar a pele. Se o pedúnculo verter leite branco espesso, o figo ainda não atingiu a maturidade ideal.',
    preservationTechniques: [
      'Doce de figo inteiro com vinho da Madeira e nozes',
      'Secagem ao sol em esteiras e espalmados em "estrelas" com amêndoa',
      'Chutney rústico com cebola roxa, vinagre de maçã e cravinho'
    ],
    recommendedUses: [
      'Tábua de enchidos e queijos de cabra frescos',
      'Recheio de tartes e empadas com redução de balsâmico',
      'Pequeno-almoço com pão de centeio quente e requeijão'
    ],
    grandmotherSecret: 'Sendo o figo pobre em pectina natural, adicione sempre o sumo e as sementes de um limão espremido na hora para equilibrar o açúcar e permitir que a calda engrosse sem caramelizar demasiado.',
    nutrition: {
      calories: 74,
      protein: 0.8,
      carbs: 19.2,
      fat: 0.3,
      fiber: 2.9,
      sugar: 16.3,
      servingSize: '100g (aprox. 2 figos médios)',
    }
  },
  {
    id: 'laranja-convento',
    name: 'Laranja de Setúbal e Cascas do Convento',
    latinName: 'Citrus sinensis',
    season: 'Inverno',
    pectinLevel: 'Alta',
    sugarRatioPerKg: '600g de açúcar e 1 parte de água por 1 parte de fruta',
    description: 'Os laranjais de Portugal revolucionaram a confeitaria europeia no Renascimento. As freiras dos conventos criaram verdadeiras jóias ao cristalizar as cascas e fazer compotas aveludadas.',
    historicalNote: 'Tão doce e suave era a laranja doce introduzida pelos navegadores portugueses que em muitas línguas mediterrânicas a palavra para laranja ainda hoje é "portokal" ou "portogallo".',
    harvestAdvice: 'Prefira laranjas com casca rugosa, firme e pesada na mão, sinal de abundância de sumo e óleos essenciais na epiderme (flavedo).',
    preservationTechniques: [
      'Compota de laranja amarga com fatias finas translúcidas de casca',
      'Cascas cristalizadas em três caldas de ponto sucessivo',
      'Licor de laranja com infusão de aguardente vínica e canela'
    ],
    recommendedUses: [
      'Glaçagem de aves assadas (como o pato à antiga)',
      'Aromatização de bolos de noz e pão-de-ló',
      'Tosta rústica com manteiga salgada'
    ],
    grandmotherSecret: 'Para retirar o amargor indesejado das cascas sem perder o aroma precioso dos óleos, deixe as cascas de molho em água fria durante 48 horas, mudando a água três vezes ao dia antes de levar ao fogo.',
    nutrition: {
      calories: 47,
      protein: 0.9,
      carbs: 11.8,
      fat: 0.1,
      fiber: 2.4,
      sugar: 9.4,
      servingSize: '100g de gomos frescos',
    }
  },
  {
    id: 'maca-bravo-esmolfe',
    name: 'Maçã Bravo de Esmolfe e Reinetas',
    latinName: 'Malus domestica',
    season: 'Outono',
    pectinLevel: 'Alta',
    sugarRatioPerKg: '650g de açúcar por 1kg de maçãs limpas',
    description: 'Com uma cor esbranquiçada e pontilhada de vermelho, a maçã Bravo de Esmolfe possui um perfume floral inconfundível e um equilíbrio doce-ácido insuperável para a doçaria de forno.',
    historicalNote: 'Originária da aldeia de Esmolfe em Penalva do Castelo por volta de 1750, provém de uma árvore de sementeira espontânea cujos ramos foram enxertados sucessivamente pela sua incomparável qualidade.',
    harvestAdvice: 'Apanhe à mão quando a fruta se solta com uma ligeira torção do ramo. Deve ser conservada em caixas de madeira forradas a palha em local escuro e ventilado.',
    preservationTechniques: [
      'Compota de maçã com noz-moscada e canela de Ceilão',
      'Puré denso (apple butter) cozinhado durante 4 horas até escurecer',
      'Fatias desidratadas ao calor brando do forno a lenha'
    ],
    recommendedUses: [
      'Tartes folhadas tradicionais e strudels',
      'Acompanhamento de carne de porco e assados de caça',
      'Recheio de sonhos e filhós de Natal'
    ],
    grandmotherSecret: 'Ao cozinhar compota de maçã, guarde os corações e cascas: ferva-os com uma chávena de água durante 15 minutos e verta esse caldo coado no doce. Terá a pectina mais límpida do mundo.',
    nutrition: {
      calories: 52,
      protein: 0.3,
      carbs: 13.8,
      fat: 0.2,
      fiber: 2.4,
      sugar: 10.4,
      servingSize: '100g (1 maçã pequena)',
    }
  },
  {
    id: 'amora-silvestre',
    name: 'Amoras Silvestres e Frutos da Charneca',
    latinName: 'Rubus fruticosus',
    season: 'Verão',
    pectinLevel: 'Média',
    sugarRatioPerKg: '700g de açúcar por 1kg de amoras (com adição de maçã)',
    description: 'Colhidas nos silvados das ribeiras e caminhos rurais no final de Agosto. São pequenas cápsulas de acidez refrescante e pigmento violeta profundo que tingem as mãos e a memória de infância.',
    historicalNote: 'Desde tempos medievais que o xarope de amoras pretas era utilizado pelos boticários como remédio para a garganta e base para caldas reconfortantes de Inverno.',
    harvestAdvice: 'Colha apenas as amoras pretas como azeviche que se desprendem sem qualquer esforço. As que resistirem ainda mantêm acidez excessiva.',
    preservationTechniques: [
      'Geleia aveludada sem pevides passada por passador de crina',
      'Doce rústico com amoras inteiras e pau de baunilha',
      'Vinagre aromático de amoras maceradas em vinagre de vinho branco'
    ],
    recommendedUses: [
      'Cobertura de cheesecakes clássicos e requeijão com mel',
      'Molhos para carnes de caça e pato',
      'Iogurte natural da herdade'
    ],
    grandmotherSecret: 'Para que o doce de amora não fique líquido nem com excesso de grainhas duras, passe metade da fruta pela peneira e adicione meia maçã reineta ralada finamente para fornecer pectina natural sem alterar o sabor.',
    nutrition: {
      calories: 43,
      protein: 1.4,
      carbs: 9.6,
      fat: 0.5,
      fiber: 5.3,
      sugar: 4.9,
      servingSize: '100g de bagas silvestres',
    }
  },
  {
    id: 'ameixa-rainha-claudia',
    name: 'Ameixa Rainha Cláudia de Elvas',
    latinName: 'Prunus domestica',
    season: 'Verão',
    pectinLevel: 'Alta',
    sugarRatioPerKg: '650g de açúcar por 1kg de ameixas descaroçadas',
    description: 'Famosa mundialmente pelas Ameixas de Elvas confeitadas, esta variedade de cor verde-dourada translúcida e sumo melífero é uma das mais sublimes frutas da bacia do Guadiana.',
    historicalNote: 'Batizada em honra de Claude de France, rainha consorte do rei Francisco I, foi aclimatada com perfeição às terras alentejanas onde o sol intenso concentra a doçura da polpa.',
    harvestAdvice: 'Colha com extremo cuidado pelo pedúnculo para preservar a "névoa" esbranquiçada que recobre a casca (o pruíno), que protege a fruta contra a desidratação.',
    preservationTechniques: [
      'Ameixas confeitadas inteiras em xarope denso (Ameixas de Elvas DOP)',
      'Compota aveludada com um toque de aguardente bagaceira velha',
      'Picles agridoces com grãos de mostarda e zimbro'
    ],
    recommendedUses: [
      'Sobremesa de Natal com Sericaia Alentejana',
      'Guarnição de carnes assadas no pote de ferro',
      'Recheio de crepes de trigo sarraceno'
    ],
    grandmotherSecret: 'Ao fazer o doce, parta três caroços de ameixa com o quebra-nozes e retire a amêndoa interior: coloque essas amêndoas na cozedura da calda para conferir um toque subtil de amargor nobre idêntico ao licor de amaretto.',
    nutrition: {
      calories: 46,
      protein: 0.7,
      carbs: 11.4,
      fat: 0.3,
      fiber: 1.4,
      sugar: 9.9,
      servingSize: '100g de ameixas frescas',
    }
  }
];
