/**
 * Utilitário de Extração de Tempo e Sintetizador de Campainha Mecânica Antiga
 * - Deteta menções de minutos e horas em português e inglês nos passos da receita
 * - Gera campainha analógica límpida via Web Audio API sem depender de ficheiros externos
 */

export interface TimeToken {
  text: string;
  minutes: number;
}

export interface StepTextSegment {
  type: 'text' | 'timer';
  content: string;
  minutes?: number;
}

/**
 * Regex refinada que captura menções temporais comuns sem quebrar o texto:
 * ex.: "10 minutos", "5 mins", "40 a 50 minutos", "1 hora", "3 to 4 minutes", "15 minutes"
 */
const TIME_REGEX = /\b(\d+(?:\s*(?:a|to|-)\s*\d+)?)\s*(minutos?|mins?|minutes?|horas?|hours?|hrs?|m\b|h\b)/gi;

/**
 * Converte a captura de tempo em número de minutos
 */
export function parseMinutesFromMatch(matchStr: string): number {
  const parts = matchStr.toLowerCase();
  
  // Deteta se tem horas
  if (parts.includes('hora') || parts.includes('hour') || parts.includes('hr')) {
    const numMatch = parts.match(/\d+/);
    const hours = numMatch ? parseInt(numMatch[0], 10) : 1;
    return hours * 60;
  }

  // Se for intervalo "40 a 50 minutos", pega no valor maior para garantir cozedura segura
  const numbers = parts.match(/\d+/g);
  if (!numbers || numbers.length === 0) return 5;

  if (numbers.length > 1) {
    const parsed = numbers.map(n => parseInt(n, 10));
    return Math.max(...parsed);
  }

  return parseInt(numbers[0], 10);
}

/**
 * Divide o texto do passo em segmentos de texto e botões de temporizador interativo
 */
export function segmentStepTextWithTimers(text: string): StepTextSegment[] {
  if (!text) return [];

  const segments: StepTextSegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  // Reset regex index
  TIME_REGEX.lastIndex = 0;

  while ((match = TIME_REGEX.exec(text)) !== null) {
    const matchStart = match.index;
    const matchEnd = TIME_REGEX.lastIndex;
    const matchedText = match[0];
    const minutes = parseMinutesFromMatch(matchedText);

    // Ignora se for 0 ou excessivo (> 300 min)
    if (minutes > 0 && minutes <= 300) {
      if (matchStart > lastIndex) {
        segments.push({
          type: 'text',
          content: text.slice(lastIndex, matchStart),
        });
      }

      segments.push({
        type: 'timer',
        content: matchedText,
        minutes,
      });

      lastIndex = matchEnd;
    }
  }

  if (lastIndex < text.length) {
    segments.push({
      type: 'text',
      content: text.slice(lastIndex),
    });
  }

  return segments;
}

/**
 * Toca campainha clássica de bronze de cozinha antiga usando Web Audio API
 */
export function playAntiqueKitchenChime(): void {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // Frequências ricas de campainha de bronze antiga (fundamental + harmónicos metálicos)
    const tones = [880, 1760, 2640, 3520];
    const gains = [0.35, 0.2, 0.1, 0.05];

    tones.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(gains[idx], now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.3);
    });

    // Toque secundário de ressonância 150ms depois
    setTimeout(() => {
      if (ctx.state === 'closed') return;
      const t = ctx.currentTime;
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1320, t);

      gain2.gain.setValueAtTime(0.001, t);
      gain2.gain.exponentialRampToValueAtTime(0.18, t + 0.01);
      gain2.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc2.start(t);
      osc2.stop(t + 1.9);
    }, 150);

  } catch (err) {
    console.warn('Não foi possível inicializar a campainha Web Audio:', err);
  }
}
