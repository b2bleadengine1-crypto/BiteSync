/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FRUIT_COMPENDIUM } from '../data/fruitCompendium';
import { useCalorieTracker } from '../context/CalorieContext';
import { 
  Apple, 
  Leaf, 
  Calendar, 
  Scale, 
  Tag, 
  ArrowRight,
  BookOpen,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface FruitGuideViewProps {
  onNavigateToLabelsWithFruit?: (fruitName: string) => void;
}

export const FruitGuideView: React.FC<FruitGuideViewProps> = ({
  onNavigateToLabelsWithFruit,
}) => {
  const { addCalorieEntry } = useCalorieTracker();
  const [selectedSeason, setSelectedSeason] = useState<string>('Todas');
  const [activeFruitId, setActiveFruitId] = useState<string>('marmelo');

  // Calculadora de Calda e Ponto de Açúcar
  const [calcFruitKg, setCalcFruitKg] = useState<number>(2.0);
  const [calcSugarPercent, setCalcSugarPercent] = useState<number>(75);

  const seasons = ['Todas', 'Outono', 'Inverno', 'Verão'];

  const filteredFruits = FRUIT_COMPENDIUM.filter(
    (f) => selectedSeason === 'Todas' || f.season === selectedSeason
  );

  const activeFruit =
    FRUIT_COMPENDIUM.find((f) => f.id === activeFruitId) || FRUIT_COMPENDIUM[0];

  const calculatedSugarGrams = Math.round(calcFruitKg * 1000 * (calcSugarPercent / 100));
  const estimatedJars250ml = Math.max(1, Math.round((calcFruitKg * 0.75 + calculatedSugarGrams / 1000) * 3));

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-20 font-sans">
      
      {/* 1. CABEÇALHO DO MÓDULO */}
      <div className="border-b border-slate-800 pb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2">
          <Apple className="w-3.5 h-3.5" />
          <span>Módulo II · Guia Botânico & Conservas de Fruta</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Guia de Frutas & Compotas da Época
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Graus de pectina natural, ponto de colheita e calculadora de calda para compotas caseiras.
        </p>
      </div>

      {/* 2. CALCULADORA DE CALDA E RENDIMENTO (BENTO CARD) */}
      <div className="bento-card p-5 sm:p-6 bg-[#131C2E] border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-400" />
              <span>Calculadora de Proporção de Açúcar & Frascos</span>
            </h2>
            <p className="text-xs text-slate-400">
              Calcule a quantidade exata de açúcar e o número de frascos (250ml) estimados.
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 bg-slate-900 text-emerald-400 rounded-full border border-slate-700 self-start sm:self-auto">
            Regra Padrão: 65% a 75%
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">
              Peso da Fruta (kg):
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="20"
                value={calcFruitKg}
                onChange={(e) => setCalcFruitKg(parseFloat(e.target.value) || 1)}
                className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono font-bold outline-none focus:border-emerald-500"
              />
              <span className="text-xs text-slate-400 font-mono">kg</span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
              <span>Açúcar (%):</span>
              <strong className="font-mono text-emerald-400">{calcSugarPercent}%</strong>
            </div>
            <input
              type="range"
              min="50"
              max="85"
              step="5"
              value={calcSugarPercent}
              onChange={(e) => setCalcSugarPercent(parseInt(e.target.value))}
              className="w-full accent-emerald-500 mt-2"
            />
          </div>

          <div className="bg-slate-900/90 p-4 rounded-2xl border border-emerald-500/30 flex flex-col justify-center">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-400">Açúcar Necessário:</span>
              <strong className="text-emerald-400 font-mono font-bold text-sm">
                {calculatedSugarGrams}g
              </strong>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Rendimento Estimado:</span>
              <strong className="text-white font-mono font-bold text-sm">
                ~{estimatedJars250ml} frascos
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SELETOR DE ÉPOCAS */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {seasons.map((season) => (
          <button
            key={season}
            onClick={() => setSelectedSeason(season)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all touch-btn cursor-pointer ${
              selectedSeason === season
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {season === 'Todas' ? 'Todas as Frutas' : `Frutas de ${season}`}
          </button>
        ))}
      </div>

      {/* 4. LAYOUT BENTO DE 2 COLUNAS: LISTA & FICHA DETALHADA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Coluna Esquerda: Cartões de Fruta */}
        <div className="lg:col-span-4 space-y-2.5">
          {filteredFruits.map((fruit) => {
            const isSelected = fruit.id === activeFruit.id;
            return (
              <button
                key={fruit.id}
                onClick={() => setActiveFruitId(fruit.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all touch-btn cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800/90 border-emerald-500 shadow-lg'
                    : 'bg-[#131C2E] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                    {fruit.season}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    Pectina: {fruit.pectinLevel}
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-white mb-0.5">
                  {fruit.name}
                </h3>
                <p className="text-xs text-slate-400 italic mb-1.5">
                  {fruit.latinName}
                </p>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {fruit.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Coluna Direita: Ficha Bento Detalhada */}
        <div className="lg:col-span-8">
          <div className="bento-card p-6 sm:p-7 bg-[#131C2E] border-slate-800 space-y-5">
            
            <div className="border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                <span>FICHA BOTÂNICA</span>
                <span className="text-emerald-400">ÉPOCA: {activeFruit.season.toUpperCase()}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-1">
                {activeFruit.name}
              </h2>
              <p className="text-xs text-slate-400 italic">
                {activeFruit.latinName} · Pectina Natural: <strong className="text-white">{activeFruit.pectinLevel}</strong>
              </p>
            </div>

            {/* Descrição e História */}
            <div className="space-y-3">
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeFruit.description}
              </p>
              <div className="p-3.5 bg-slate-900/60 rounded-2xl border border-slate-800 text-xs text-slate-400 italic">
                <strong className="text-emerald-400 not-italic block mb-0.5">História & Origem:</strong>
                {activeFruit.historicalNote}
              </div>
            </div>

            {/* Ponto de Colheita */}
            <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Ponto Ideal de Colheita</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeFruit.harvestAdvice}
              </p>
            </div>

            {/* Técnicas de Conserva */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Técnicas de Conserva
                </h4>
                <ul className="text-xs space-y-1.5 text-slate-300">
                  {activeFruit.preservationTechniques.map((tech, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Harmonizações
                </h4>
                <ul className="text-xs space-y-1.5 text-slate-300">
                  {activeFruit.recommendedUses.map((use, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Nutrição */}
            <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-400 font-medium">Valor Nutricional (por 100g fresca):</span>
                <span className="text-emerald-400 font-bold font-mono">
                  {activeFruit.nutrition?.calories || 52} kcal
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono pt-2 border-t border-slate-800">
                <div>
                  <span className="text-rose-400 block text-[10px]">Prot</span>
                  <span className="text-white font-bold">{activeFruit.nutrition?.protein || 0.5}g</span>
                </div>
                <div>
                  <span className="text-cyan-400 block text-[10px]">Hidr</span>
                  <span className="text-white font-bold">{activeFruit.nutrition?.carbs || 14}g</span>
                </div>
                <div>
                  <span className="text-amber-400 block text-[10px]">Açúcar</span>
                  <span className="text-white font-bold">{activeFruit.nutrition?.sugar || 11}g</span>
                </div>
                <div>
                  <span className="text-emerald-400 block text-[10px]">Fibra</span>
                  <span className="text-white font-bold">{activeFruit.nutrition?.fiber || 2.2}g</span>
                </div>
              </div>
            </div>

            {/* Segredo da Avó */}
            <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl text-xs text-emerald-300">
              <strong className="text-emerald-400 block mb-1 font-bold">Dica da Avó:</strong>
              <p className="leading-relaxed">{activeFruit.grandmotherSecret}</p>
            </div>

            {/* Botões Largos de Ação */}
            <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  addCalorieEntry({
                    title: activeFruit.name,
                    category: 'fruta',
                    portionDescription: '1 dose de fruta fresca (100g)',
                    portions: 1,
                    calories: activeFruit.nutrition?.calories || 55,
                    protein: activeFruit.nutrition?.protein || 0.5,
                    carbs: activeFruit.nutrition?.carbs || 14,
                    fat: activeFruit.nutrition?.fat || 0.2,
                  });
                }}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 touch-btn cursor-pointer"
              >
                <Scale className="w-4 h-4" />
                <span>+ Enviar para a Balança ({activeFruit.nutrition?.calories || 55} kcal)</span>
              </button>

              {onNavigateToLabelsWithFruit && (
                <button
                  type="button"
                  onClick={() => onNavigateToLabelsWithFruit(activeFruit.name)}
                  className="py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black flex items-center justify-center gap-1.5 touch-btn cursor-pointer shadow-md"
                >
                  <Tag className="w-4 h-4" />
                  <span>Criar Rótulo para {activeFruit.name}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
