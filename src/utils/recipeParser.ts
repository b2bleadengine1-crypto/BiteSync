/**
 * Funções Canónicas de Processamento e Higienização de Receitas
 * Conforme estabelecido no Dossier Técnico (Secção 4.1)
 */

/**
 * 1. Limpa rótulos isolados ("STEP 1", "PASSO 2") e divide os passos corretamente
 * sem truncar no meio de frases nem criar cartões vazios.
 */
export function parseRecipeSteps(rawInstructions: string): string[] {
  if (!rawInstructions) return [];

  return rawInstructions
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    // Remove linhas que contêm apenas "STEP X", "PASSO X", "ETAPA X" isoladas
    .replace(/^\s*(STEP|PASSO|ETAPA|FASE|STAGE)\s*\d+\s*[:.-]?\s*$/gim, '')
    // Divide por uma ou mais quebras de linha
    .split(/\n+/)
    // Remove prefixos como "STEP 1:", "PASSO 2 -", "1.", "* ", "- "
    .map(step => 
      step
        .replace(/^\s*(STEP|PASSO|ETAPA|FASE|STAGE)\s*\d+\s*[:.-]?\s*/i, '')
        .replace(/^\s*\d+\s*[:.-]\s*/, '')
        .replace(/^\s*[\*\-\•]\s*/, '')
        .trim()
    )
    // Filtra passos com tamanho ínfimo ou resíduos
    .filter(step => step.length > 5 && !/^(step|passo|etapa|fase|stage)\s*\d+[:.-]?$/i.test(step));
}

/**
 * 2. Processa e traduz passo a passo individualmente para nunca exceder
 * limites de caracteres de APIs ou buffers de corte.
 */
export async function translateStepsSafely<T = string>(
  stepsArray: string[],
  translateFn: (step: string, index: number) => Promise<T>
): Promise<T[]> {
  const translated: T[] = [];
  for (let i = 0; i < stepsArray.length; i++) {
    const step = stepsArray[i];
    // Ao processar cada passo separadamente em vez de juntar tudo num só bloco,
    // evita-se que o último parágrafo seja cortado aos 500 caracteres.
    const result = await translateFn(step, i);
    translated.push(result);
  }
  return translated;
}

/**
 * Extrai a primeira letra de uma frase ou texto para estilização em Capitular (Drop Cap)
 */
export function extractDropCap(text: string): { firstLetter: string; restOfText: string } {
  if (!text) return { firstLetter: '', restOfText: '' };
  
  // Limpa espaços no início
  const trimmed = text.trim();
  const firstLetter = trimmed.charAt(0);
  const restOfText = trimmed.slice(1);

  return { firstLetter, restOfText };
}

/**
 * Exemplo de texto problemático da API antiga (com "PASSO 2" isolado e corte a meio)
 * para demonstração e teste interativo no Dossier.
 */
export const SAMPLE_BUGGY_RAW_RECIPE = `PASSO 1: Coloque o peixe numa panela com água suficiente para cobrir. Leve ao lume brando e cozinhe suavemente durante 10 minutos em fogo baixo com a tampa colocada. Escorra e lave o peixe (desfie-o retirando eventuais espinhas).

PASSO 2

Coloque o peixe, a batata cozida esmagada, a pimenta verde (malagueta), o coentro, o cominho, a pimenta preta, o alho e o gengibre numa tigela grande. Tempere com sal, adicione a farinha de arroz, misture bem e parta 1 ovo para ligar. Mexa a mistura e divida em 15 porções iguais, moldando pequenas toras.

Parta os ovos restantes numa tigela e bata levemente. Coloque as migalhas de pão... [TRUNCADO PELO BUFFER AOS 500 CARACTERES]`;
