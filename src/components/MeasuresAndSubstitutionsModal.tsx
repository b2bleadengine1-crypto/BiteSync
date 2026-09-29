/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  GRANDMOTHER_MEASURES, 
  INGREDIENT_SUBSTITUTIONS,
  SOS_KITCHEN_REMEDIES 
} from '../utils/measuresAndSubstitutions';
import { 
  Scale, 
  RefreshCw, 
  X, 
  Search, 
  Lightbulb, 
  Sparkles,
  ShieldAlert,
  Flame,
  Check
} from 'lucide-react';

interface MeasuresAndSubstitutionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MeasuresAndSubstitutionsModal: React.FC<MeasuresAndSubstitutionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'measures' | 'substitutions' | 'botica'>('measures');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const filteredSubstitutions = INGREDIENT_SUBSTITUTIONS.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.ingredient.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.substitutes.some(
        (s) => s.name.toLowerCase().includes(q) || s.culinaryImpact.toLowerCase().includes(q)
      )
    );
  });

  const filteredMeasures = GRANDMOTHER_MEASURES.filter((m) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.volumeOrWeight.toLowerCase().includes(q) ||
      m.details.toLowerCase().includes(q) ||
      m.grandmotherTip.toLowerCase().includes(q)
    );
  });

  const filteredRemedies = SOS_KITCHEN_REMEDIES.filter((r) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.problem.toLowerCase().includes(q) ||
      r.grandmotherRemedy.toLowerCase().includes(q) ||
      r.scientificReason.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md no-print font-sans animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-[#131C2E] border border-slate-700 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-5 sm:p-7 text-slate-100 max-h-[90dvh] flex flex-col relative animate-in zoom-in-95 duration-200">
        
        {/* Glow Superior */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-12 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Topo / Cabeçalho */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Scale className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                Medidas, Substituições & SOS Cozinha
              </h2>
              <p className="text-xs text-slate-400">
                Conversão tradicional de chávenas/colheres, alternativas de despensa e química caseira.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors touch-btn cursor-pointer"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Abas e Barra de Pesquisa */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 shrink-0">
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveTab('measures')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all touch-btn cursor-pointer ${
                activeTab === 'measures'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Scale className="w-3.5 h-3.5 inline mr-1.5" />
              <span>Medidas Tradicionais</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('substitutions')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all touch-btn cursor-pointer ${
                activeTab === 'substitutions'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5 inline mr-1.5" />
              <span>Substituições</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('botica')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all touch-btn cursor-pointer ${
                activeTab === 'botica'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 inline mr-1.5" />
              <span>SOS Cozinha</span>
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Pesquisar termo ou ingrediente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3 modern-scroll-container">
          
          {/* Aba 1: Medidas */}
          {activeTab === 'measures' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredMeasures.map((m, idx) => (
                <div
                  key={idx}
                  className="bento-card p-4 bg-slate-900/70 border border-slate-800 space-y-2 hover:border-emerald-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{m.name}</span>
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                      {m.volumeOrWeight}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {m.details}
                  </p>

                  <div className="flex items-start gap-1.5 text-[11px] text-emerald-300/90 bg-emerald-950/20 border border-emerald-500/20 p-2 rounded-xl">
                    <Lightbulb className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Dica:</strong> {m.grandmotherTip}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Aba 2: Substituições */}
          {activeTab === 'substitutions' && (
            <div className="space-y-3">
              {filteredSubstitutions.map((sub, idx) => (
                <div
                  key={idx}
                  className="bento-card p-4 sm:p-5 bg-slate-900/70 border border-slate-800 space-y-3 hover:border-emerald-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-white">
                        {sub.ingredient}
                      </span>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">
                        {sub.category}
                      </span>
                    </div>
                    <span className="text-xs text-emerald-400 font-mono">
                      {sub.substitutes.length} {sub.substitutes.length === 1 ? 'alternativa' : 'alternativas'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {sub.substitutes.map((item, sIdx) => (
                      <div
                        key={sIdx}
                        className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <strong className="text-emerald-400 font-bold">
                            ↳ {item.name}
                          </strong>
                          <span className="text-[11px] font-mono text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded-lg border border-slate-700">
                            Proporção: {item.ratio}
                          </span>
                        </div>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          {item.culinaryImpact}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Aba 3: SOS Cozinha */}
          {activeTab === 'botica' && (
            <div className="space-y-3">
              <div className="bg-emerald-950/20 border border-emerald-500/30 p-4 rounded-2xl text-xs text-slate-200 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <strong className="text-emerald-400 block font-bold text-sm mb-0.5">SOS Cozinha</strong>
                  <span className="text-slate-300">Truques práticos e reações químicas caseiras para salvar pratos com desequilíbrio de sal, gordura, queima ou acidez.</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredRemedies.map((rem, rIdx) => (
                  <div
                    key={rIdx}
                    className="bento-card p-4 bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 rounded-2xl space-y-2.5 transition-all shadow-md"
                  >
                    <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                      <span className="text-xl">{rem.icon}</span>
                      <strong className="text-xs sm:text-sm font-bold text-white">
                        {rem.problem}
                      </strong>
                    </div>

                    <div className="text-xs text-emerald-300 bg-emerald-950/30 p-3 rounded-xl border border-emerald-500/30 leading-relaxed">
                      <span className="font-bold text-white block mb-0.5">✦ Solução Rápida:</span>
                      {rem.grandmotherRemedy}
                    </div>

                    <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 leading-relaxed">
                      <strong className="text-slate-300">Porquê funciona:</strong> {rem.scientificReason}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Rodapé do Modal com Botão Largo Touch */}
        <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span className="font-mono text-[11px]">Bento Kitchen Studio · Guia Prático</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all touch-btn cursor-pointer"
          >
            Fechar Janela
          </button>
        </div>

      </div>
    </div>
  );
};
