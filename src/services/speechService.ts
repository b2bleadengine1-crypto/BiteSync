/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * SERVIÇO DE VOZES BITESYNC (WEB SPEECH API NATIVA)
 * - Carrega e filtra vozes em Português (pt-PT e pt-BR)
 * - Sincroniza preferência do utilizador via localStorage
 * - Lê passos de receitas com velocidade confortável (rate = 0.95)
 */

const STORAGE_KEY = 'bitesync_selected_voice_uri';

export interface VoiceOption {
  voice: SpeechSynthesisVoice;
  name: string;
  lang: string;
  isPortuguese: boolean;
  accentLabel: string;
}

class SpeechService {
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoiceURI: string = '';
  private isSpeaking: boolean = false;
  private currentStepNumber: number | null = null;
  private listeners: Set<() => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.selectedVoiceURI = localStorage.getItem(STORAGE_KEY) || '';
      this.loadVoices();

      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.loadVoices();
        };
      }
    }
  }

  public loadVoices(): SpeechSynthesisVoice[] {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
    
    const all = window.speechSynthesis.getVoices() || [];
    this.voices = all;

    // Se ainda não escolheu ou a escolhida já não existe, seleciona a primeira em português
    const ptVoices = this.getPortugueseVoices();
    if (!this.selectedVoiceURI && ptVoices.length > 0) {
      // Prioridade para pt-PT, senão pt-BR
      const ptPT = ptVoices.find((v) => v.lang.toLowerCase().replace('_', '-').includes('pt-pt'));
      const defaultVoice = ptPT || ptVoices[0];
      this.selectedVoiceURI = defaultVoice.voice.voiceURI;
      try {
        localStorage.setItem(STORAGE_KEY, this.selectedVoiceURI);
      } catch (_) {}
    }

    this.notify();
    return this.voices;
  }

  public getPortugueseVoices(): VoiceOption[] {
    const isPT = (lang: string) => lang.toLowerCase().includes('pt');

    const ptVoices = this.voices
      .filter((v) => isPT(v.lang))
      .map((v) => {
        const cleanLang = v.lang.toLowerCase().replace('_', '-');
        const isPortugal = cleanLang.includes('pt-pt');
        const isBrazil = cleanLang.includes('pt-br');
        
        let accentLabel = 'Português';
        if (isPortugal) accentLabel = '🇵🇹 Portugal (pt-PT)';
        else if (isBrazil) accentLabel = '🇧🇷 Brasil (pt-BR)';
        else accentLabel = `🇵🇹 ${v.lang}`;

        return {
          voice: v,
          name: v.name.replace(/(Google|Microsoft|Apple)\s*/i, '').trim() || v.name,
          lang: v.lang,
          isPortuguese: true,
          accentLabel,
        };
      });

    // Se o browser não tiver vozes em PT instaladas no momento, inclui as disponíveis do sistema
    if (ptVoices.length === 0 && this.voices.length > 0) {
      return this.voices.slice(0, 5).map((v) => ({
        voice: v,
        name: v.name,
        lang: v.lang,
        isPortuguese: false,
        accentLabel: `🌐 ${v.lang} (Voz do Sistema)`,
      }));
    }

    return ptVoices;
  }

  public getSelectedVoice(): SpeechSynthesisVoice | null {
    if (!this.selectedVoiceURI && this.voices.length > 0) {
      const pt = this.getPortugueseVoices();
      if (pt.length > 0) return pt[0].voice;
      return this.voices[0];
    }
    return this.voices.find((v) => v.voiceURI === this.selectedVoiceURI) || null;
  }

  public getSelectedVoiceURI(): string {
    return this.selectedVoiceURI;
  }

  public setSelectedVoiceURI(uri: string): void {
    this.selectedVoiceURI = uri;
    try {
      localStorage.setItem(STORAGE_KEY, uri);
    } catch (_) {}
    this.notify();
  }

  public speakStep(
    stepNumber: number,
    text: string,
    onEndCallback?: () => void
  ): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    // Se já estiver a falar este mesmo passo, pausa/para
    if (this.isSpeaking && this.currentStepNumber === stepNumber) {
      this.stop();
      return;
    }

    this.stop();

    // Remove temporizadores [⏳ 10 minutos] e caracteres estranhos
    const cleanText = text.replace(/\[⏳.*?\]/g, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95; // Velocidade confortável e natural
    utterance.pitch = 1.0;

    const voice = this.getSelectedVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = 'pt-PT';
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.currentStepNumber = stepNumber;
      this.notify();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentStepNumber = null;
      this.notify();
      if (onEndCallback) onEndCallback();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.currentStepNumber = null;
      this.notify();
      if (onEndCallback) onEndCallback();
    };

    window.speechSynthesis.speak(utterance);
  }

  public stop(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.currentStepNumber = null;
    this.notify();
  }

  public getStatus() {
    return {
      isSpeaking: this.isSpeaking,
      currentStepNumber: this.currentStepNumber,
      selectedVoiceURI: this.selectedVoiceURI,
    };
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((l) => l());
  }
}

export const speechService = new SpeechService();
