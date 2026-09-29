/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveNavTab } from '../types/cookbook';
import { 
  X, 
  Volume2, 
  ChevronDown, 
  Check, 
  Sliders, 
  Heart, 
  ShoppingCart, 
  ScanLine, 
  ScrollText,
  ChevronRight
} from 'lucide-react';
import { speechService, VoiceOption } from '../services/speechService';
import { useCalorieTracker } from '../context/CalorieContext';

interface SideMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: ActiveNavTab) => void;
  onOpenDossier: () => void;
}

export const SideMenuDrawer: React.FC<SideMenuDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onOpenDossier,
}) => {
  const { goal, setGoalType } = useCalorieTracker();
  const [activeSection, setActiveSection] = useState<'main' | 'diet'>('main');
  const [dietaryPrefs, setDietaryPrefs] = useState<{
    vegan: boolean;
    vegetarian: boolean;
    glutenFree: boolean;
    highProtein: boolean;
  }>({
    vegan: false,
    vegetarian: false,
    glutenFree: false,
    highProtein: true,
  });

  const [voices, setVoices] = useState<VoiceOption[]>(speechService.getPortugueseVoices());
  const [selectedURI, setSelectedURI] = useState<string>(speechService.getSelectedVoiceURI());
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  React.useEffect(() => {
    const update = () => {
      setVoices(speechService.getPortugueseVoices());
      setSelectedURI(speechService.getSelectedVoiceURI());
      setIsSpeaking(speechService.getStatus().isSpeaking);
    };
    update();
    const unsub = speechService.subscribe(update);
    return () => unsub();
  }, []);

  const togglePref = (key: keyof typeof dietaryPrefs) => {
    setDietaryPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTestVoice = () => {
    if (isSpeaking) {
      speechService.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speechService.speakStep(
        1,
        'Olá! Eu sou a tua voz do BiteSync. Ajustei o idioma para a leitura mãos-livres.',
        () => setIsSpeaking(false)
      );
    }
  };

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    speechService.setSelectedVoiceURI(e.target.value);
    setSelectedURI(e.target.value);
  };

  return (
    <>
      {/* OVERLAY ESCURO */}
      <div 
        id="menu-overlay"
        onClick={onClose}
        className={`fixed inset-0 bg-black/80 z-40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* MENU LATERAL (Sub-menus e Definições) */}
      <div 
        id="side-menu"
        className={`fixed inset-y-0 right-0 w-[85%] max-w-sm bg-[#0a0a0a] border-l border-zinc-900 z-50 flex flex-col shadow-2xl transform transition-transform duration-400 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 flex justify-between items-center border-b border-zinc-900/60">
          <h2 className="text-sm font-extrabold text-white tracking-widest uppercase font-mono">
            Definições
          </h2>
          <button 
            type="button"
            onClick={onClose} 
            className="text-zinc-500 hover:text-white p-2 bg-zinc-900 rounded-full transition cursor-pointer touch-btn"
            title="Fechar Definições"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-4 flex flex-col gap-5">
          {activeSection === 'main' ? (
            <>
              {/* Sub-menu: Voz do Leitor */}
              <div className="bento-card bg-[#111111] border border-zinc-900">
                <div className="flex items-center gap-2 mb-2">
                  <Volume2 className="w-4 h-4 text-lime stroke-[2.5]" />
                  <span className="font-bold text-xs uppercase tracking-wider text-white">
                    Voz do Leitor
                  </span>
                </div>
                
                <p className="text-[11px] text-zinc-400 mb-4 leading-relaxed">
                  Ajuste o idioma para a leitura mãos-livres de receitas.
                </p>
                
                <div className="bg-black rounded-2xl p-3 text-xs flex justify-between items-center mb-4 border border-zinc-800">
                  <select
                    value={selectedURI}
                    onChange={handleVoiceChange}
                    className="bg-transparent text-xs text-white outline-none cursor-pointer w-full font-medium"
                  >
                    {voices.map((v) => (
                      <option key={v.voice.voiceURI} value={v.voice.voiceURI} className="bg-black text-white">
                        {v.accentLabel} — {v.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button 
                  type="button"
                  onClick={handleTestVoice}
                  className="w-full bg-lime text-black font-bold text-xs py-3 rounded-full uppercase tracking-wide hover:brightness-110 active:scale-95 transition cursor-pointer touch-btn"
                >
                  {isSpeaking ? 'A Falar (Parar)' : 'Testar Áudio'}
                </button>
              </div>

              {/* Sub-menu: Macros */}
              <div className="bento-card bg-[#111111] border border-zinc-900">
                <label className="text-[10px] text-lime uppercase tracking-widest block mb-3 font-bold font-mono">
                  Objetivo de Macros
                </label>
                <div className="flex flex-col gap-2 text-center">
                  <button 
                    type="button"
                    onClick={() => setGoalType('defice')}
                    className={`py-3 rounded-2xl text-xs uppercase tracking-wide transition cursor-pointer touch-btn ${
                      goal.goalType === 'defice'
                        ? 'font-extrabold bg-lime text-black shadow'
                        : 'font-bold bg-zinc-900 text-zinc-400 hover:text-white'
                    }`}
                  >
                    DÉFICE CALÓRICO
                  </button>
                  <button 
                    type="button"
                    onClick={() => setGoalType('manutencao')}
                    className={`py-3 rounded-2xl text-xs uppercase tracking-wide transition cursor-pointer touch-btn ${
                      goal.goalType === 'manutencao'
                        ? 'font-extrabold bg-lime text-black shadow'
                        : 'font-bold bg-zinc-900 text-zinc-400 hover:text-white'
                    }`}
                  >
                    MANUTENÇÃO
                  </button>
                  <button 
                    type="button"
                    onClick={() => setGoalType('ganho')}
                    className={`py-3 rounded-2xl text-xs uppercase tracking-wide transition cursor-pointer touch-btn ${
                      goal.goalType === 'ganho'
                        ? 'font-extrabold bg-lime text-black shadow'
                        : 'font-bold bg-zinc-900 text-zinc-400 hover:text-white'
                    }`}
                  >
                    GANHO DE MASSA
                  </button>
                </div>
              </div>

              {/* Navegação Rápida Adicional */}
              <div className="bento-card bg-[#111111] border border-zinc-900 py-3 px-4">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-2 font-mono font-bold">
                  Mais Módulos
                </span>
                <nav className="flex flex-col gap-1 text-xs font-semibold text-zinc-300">
                  <button 
                    type="button"
                    onClick={() => setActiveSection('diet')}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-black hover:text-lime transition cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Sliders className="w-4 h-4 text-zinc-500 group-hover:text-lime" />
                      <span>Preferências de Dieta</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-lime" />
                  </button>

                  <button 
                    type="button"
                    onClick={() => {
                      onNavigateTab('explorar');
                      onClose();
                    }}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-black hover:text-lime transition cursor-pointer group"
                  >
                    <Heart className="w-4 h-4 text-zinc-500 group-hover:text-lime" />
                    <span>Receitas Favoritas</span>
                  </button>

                  <button 
                    type="button"
                    onClick={() => {
                      onNavigateTab('ementa');
                      onClose();
                    }}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-black hover:text-lime transition cursor-pointer group"
                  >
                    <ShoppingCart className="w-4 h-4 text-zinc-500 group-hover:text-lime" />
                    <span>Lista de Compras</span>
                  </button>

                  <button 
                    type="button"
                    onClick={() => {
                      onOpenDossier();
                      onClose();
                    }}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-black hover:text-lime transition cursor-pointer group"
                  >
                    <ScrollText className="w-4 h-4 text-zinc-500 group-hover:text-lime" />
                    <span>Dossier Técnico</span>
                  </button>
                </nav>
              </div>
            </>
          ) : (
            /* Sub-ecrã: Preferências de Dieta */
            <div className="space-y-4">
              <button 
                type="button"
                onClick={() => setActiveSection('main')}
                className="text-xs font-mono text-lime flex items-center gap-1.5 hover:underline cursor-pointer mb-2"
              >
                &larr; Voltar às Definições
              </button>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Filtros Nutricionais
              </h3>
              <div className="space-y-2">
                {[
                  { key: 'highProtein', label: 'Alto Teor de Proteína' },
                  { key: 'vegetarian', label: 'Vegetariano' },
                  { key: 'vegan', label: 'Vegano' },
                  { key: 'glutenFree', label: 'Sem Glúten' },
                ].map((item) => {
                  const isChecked = dietaryPrefs[item.key as keyof typeof dietaryPrefs];
                  return (
                    <div 
                      key={item.key}
                      onClick={() => togglePref(item.key as keyof typeof dietaryPrefs)}
                      className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                        isChecked 
                          ? 'bg-[#111111] border-lime text-white' 
                          : 'bg-black border-zinc-900 text-zinc-400 hover:border-zinc-800'
                      }`}
                    >
                      <span className="text-xs font-semibold">{item.label}</span>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        isChecked ? 'bg-lime border-lime text-black' : 'border-zinc-700'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Info Studio */}
          <div className="mt-auto pt-4 border-t border-zinc-900 text-center">
            <p className="text-[10px] font-mono text-lime font-bold">BITESYNC STUDIO</p>
            <p className="text-[9px] text-zinc-600 mt-0.5">Bento Box Pitch Black · v2.1</p>
          </div>
        </div>
      </div>
    </>
  );
};
