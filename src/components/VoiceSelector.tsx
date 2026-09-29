/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { speechService, VoiceOption } from '../services/speechService';
import { Volume2, Check, Play, Square, Sparkles } from 'lucide-react';

interface VoiceSelectorProps {
  compact?: boolean;
}

export const VoiceSelector: React.FC<VoiceSelectorProps> = ({ compact = false }) => {
  const [voices, setVoices] = useState<VoiceOption[]>(speechService.getPortugueseVoices());
  const [selectedURI, setSelectedURI] = useState<string>(speechService.getSelectedVoiceURI());
  const [isTesting, setIsTesting] = useState<boolean>(false);

  useEffect(() => {
    const update = () => {
      setVoices(speechService.getPortugueseVoices());
      setSelectedURI(speechService.getSelectedVoiceURI());
      setIsTesting(speechService.getStatus().isSpeaking);
    };

    update();
    const unsub = speechService.subscribe(update);
    return () => unsub();
  }, []);

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newURI = e.target.value;
    speechService.setSelectedVoiceURI(newURI);
    setSelectedURI(newURI);
  };

  const handleTestVoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTesting) {
      speechService.stop();
      setIsTesting(false);
    } else {
      setIsTesting(true);
      speechService.speakStep(
        999,
        'Olá! Eu sou a tua voz do BiteSync. Vou ler cada passo da receita para cozinhares de mãos livres.',
        () => setIsTesting(false)
      );
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 bg-input border border-gray-800 rounded-xl px-2.5 py-1">
        <Volume2 className="w-3.5 h-3.5 text-neon shrink-0" />
        <select
          value={selectedURI}
          onChange={handleVoiceChange}
          className="bg-transparent text-xs text-gray-200 outline-none cursor-pointer max-w-[130px] truncate"
          title="Escolher Voz do Leitor"
        >
          {voices.map((v) => (
            <option key={v.voice.voiceURI} value={v.voice.voiceURI} className="bg-[#0b111e] text-white">
              {v.accentLabel} · {v.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleTestVoice}
          className="p-1 text-neon hover:text-white rounded hover:bg-gray-800 transition-colors"
          title={isTesting ? 'Parar' : 'Testar voz'}
        >
          {isTesting ? <Square className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-[28px] p-5 border border-gray-800 space-y-3">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2 text-neon">
          <Volume2 className="w-5 h-5" />
          <h3 className="font-bold text-sm tracking-wider uppercase font-mono">
            Voz do Leitor
          </h3>
        </div>

        {/* Botão Testar */}
        <button
          type="button"
          onClick={handleTestVoice}
          className={`font-bold text-xs px-3.5 py-1.5 rounded-xl shadow transition-all touch-btn cursor-pointer ${
            isTesting
              ? 'bg-rose-500 text-white animate-pulse'
              : 'bg-neon text-black hover:brightness-110 active:scale-95'
          }`}
          title="Ouvir amostra da voz selecionada"
        >
          {isTesting ? 'A Falar...' : 'Testar Voz'}
        </button>
      </div>

      <p className="text-xs text-gray-400 mb-2">
        Leitura mãos-livres passo a passo
      </p>

      {/* Menu Suspenso com Estilo bg-input */}
      <div className="relative">
        <select
          value={selectedURI}
          onChange={handleVoiceChange}
          className="w-full bg-input border border-gray-800 focus:border-neon rounded-2xl p-3.5 text-xs text-gray-200 outline-none cursor-pointer transition-colors shadow-inner"
        >
          {voices.length === 0 ? (
            <option value="" className="bg-[#0b111e] text-gray-400">
              A carregar vozes do sistema...
            </option>
          ) : (
            voices.map((v) => (
              <option key={v.voice.voiceURI} value={v.voice.voiceURI} className="bg-[#0b111e] text-white py-1">
                {v.accentLabel} — {v.name}
              </option>
            ))
          )}
        </select>
      </div>

      <p className="text-[10px] text-neon/90 font-mono flex items-center gap-1.5 pt-1">
        <Sparkles className="w-3.5 h-3.5 text-neon shrink-0" />
        <span>Filtro automático de sotaques pt-PT e {voices.length} {voices.length === 1 ? 'voz disponível' : 'vozes disponíveis'}</span>
      </p>
    </div>
  );
};
