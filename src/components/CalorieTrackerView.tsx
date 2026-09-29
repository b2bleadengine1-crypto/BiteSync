/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCalorieTracker } from '../context/CalorieContext';
import { CalorieGoalType } from '../types/cookbook';
import { 
  PORTUGUESE_NUTRITIONAL_TABLE, 
  HOUSEHOLD_MEASUREMENTS_CONVERTER, 
  calculateNutrientsForGrams 
} from '../data/nutritionalTable';
import { searchUsdaFoodData, UsdaFoodNutrients } from '../services/apiService';
import { 
  Scale, 
  Flame, 
  TrendingDown, 
  TrendingUp, 
  Activity, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Calculator, 
  PieChart, 
  Clock, 
  Sparkles, 
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const CalorieTrackerView: React.FC = () => {
  const {
    goal,
    setGoalType,
    setCustomTargetCalories,
    entries,
    addCalorieEntry,
    removeCalorieEntry,
    clearEntries,
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
    remainingCalories,
  } = useCalorieTracker();

  // Estados da Calculadora / Balança de Ingredientes
  const [calcSource, setCalcSource] = useState<'portfir' | 'usda'>('portfir');
  const [selectedIngredientId, setSelectedIngredientId] = useState<string>('frango-peito');
  const [inputGrams, setInputGrams] = useState<number>(150);
  const [selectedMeasure, setSelectedMeasure] = useState<string>('gramas');
  const [measureMultiplier, setMeasureMultiplier] = useState<number>(1);

  // Estados da Pesquisa USDA FoodData Central
  const [usdaQuery, setUsdaQuery] = useState<string>('');
  const [usdaResult, setUsdaResult] = useState<UsdaFoodNutrients | null>(null);
  const [isSearchingUsda, setIsSearchingUsda] = useState<boolean>(false);
  const [usdaGrams, setUsdaGrams] = useState<number>(100);

  // Estados do Registo Manual Rápido
  const [manualTitle, setManualTitle] = useState<string>('');
  const [manualKcal, setManualKcal] = useState<number>(250);
  const [manualProtein, setManualProtein] = useState<number>(15);
  const [manualCarbs, setManualCarbs] = useState<number>(30);
  const [manualFat, setManualFat] = useState<number>(8);
  const [showManualModal, setShowManualModal] = useState<boolean>(false);

  // Ingrediente selecionado na balança
  const currentIngredient =
    PORTUGUESE_NUTRITIONAL_TABLE.find((i) => i.id === selectedIngredientId) ||
    PORTUGUESE_NUTRITIONAL_TABLE[0];

  // Cálculo atual da balança
  const effectiveGrams = selectedMeasure === 'gramas' 
    ? inputGrams 
    : (HOUSEHOLD_MEASUREMENTS_CONVERTER[selectedMeasure] || 100) * measureMultiplier;

  const currentCalc = calculateNutrientsForGrams(currentIngredient, effectiveGrams);

  // Percentagens calóricas de macronutrientes
  const proteinKcal = totalProtein * 4;
  const carbsKcal = totalCarbs * 4;
  const fatKcal = totalFat * 9;
  const totalMacroKcal = proteinKcal + carbsKcal + fatKcal || 1;

  const proteinPct = Math.round((proteinKcal / totalMacroKcal) * 100);
  const carbsPct = Math.round((carbsKcal / totalMacroKcal) * 100);
  const fatPct = Math.max(0, 100 - proteinPct - carbsPct);

  const progressPercent = Math.min(100, Math.round((totalCalories / goal.targetCalories) * 100));

  const handleAddCalculatedIngredient = () => {
    addCalorieEntry({
      title: currentIngredient.name,
      category: 'ingrediente',
      portionDescription: `${effectiveGrams}g (${selectedMeasure === 'gramas' ? 'pesado' : `${measureMultiplier}x ${selectedMeasure}`})`,
      portions: 1,
      grams: effectiveGrams,
      calories: currentCalc.calories,
      protein: currentCalc.protein,
      carbs: currentCalc.carbs,
      fat: currentCalc.fat,
    });
  };

  const handleUsdaSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usdaQuery.trim()) return;
    setIsSearchingUsda(true);
    try {
      const res = await searchUsdaFoodData(usdaQuery);
      setUsdaResult(res);
    } catch {
      // handled inside searchUsdaFoodData
    } finally {
      setIsSearchingUsda(false);
    }
  };

  const handleAddUsdaResult = () => {
    if (!usdaResult) return;
    const factor = usdaGrams / 100;
    addCalorieEntry({
      title: usdaResult.name || usdaResult.description || 'Alimento USDA',
      category: 'ingrediente',
      portionDescription: `${usdaGrams}g (USDA FoodData)`,
      portions: 1,
      grams: usdaGrams,
      calories: Math.round(usdaResult.calories * factor),
      protein: Math.round(usdaResult.protein * factor * 10) / 10,
      carbs: Math.round(usdaResult.carbs * factor * 10) / 10,
      fat: Math.round(usdaResult.fat * factor * 10) / 10,
    });
    setUsdaResult(null);
    setUsdaQuery('');
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualTitle.trim()) return;
    addCalorieEntry({
      title: manualTitle.trim(),
      category: 'manual',
      portionDescription: 'Registo manual rápido',
      portions: 1,
      calories: manualKcal,
      protein: manualProtein,
      carbs: manualCarbs,
      fat: manualFat,
    });
    setManualTitle('');
    setShowManualModal(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-20 font-sans">
      
      {/* 1. CABEÇALHO BENTO DO MÓDULO V */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2">
            <Flame className="w-3.5 h-3.5" />
            <span>Módulo V · Painel Nutricional Inteligente</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Conta Calorias & Macronutrientes
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Registo em tempo real com metas ajustáveis, balança de gramas e conversor de medidas caseiras.
          </p>
        </div>

        {/* Seletor de Metas em Segmented Control Moderno */}
        <div className="flex items-center bg-slate-900 p-1.5 rounded-2xl border border-slate-800 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setGoalType('defice')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all touch-btn cursor-pointer ${
              goal.goalType === 'defice'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Défice (1650k)</span>
          </button>

          <button
            type="button"
            onClick={() => setGoalType('manutencao')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all touch-btn cursor-pointer ${
              goal.goalType === 'manutencao'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Manutenção (2100k)</span>
          </button>

          <button
            type="button"
            onClick={() => setGoalType('ganho')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all touch-btn cursor-pointer ${
              goal.goalType === 'ganho'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Ganho (2600k)</span>
          </button>
        </div>
      </div>

      {/* 2. HERO BENTO CARDS: RESUMO DE CALORIAS */}
      <div className="bento-card p-6 sm:p-7 bg-[#131C2E] border-slate-800 space-y-6">
        
        {/* 3 Cartões Centrais */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Card: Calorias Consumidas */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 text-center">
            <span className="text-[11px] uppercase font-mono tracking-wider text-slate-400 block mb-1">
              Consumidas Hoje
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
              {totalCalories}
              <span className="text-xs text-slate-400 font-sans font-normal ml-1">kcal</span>
            </div>
            <span className="text-xs text-emerald-400 mt-1 block font-semibold">
              {entries.length} {entries.length === 1 ? 'registo adicionado' : 'registos adicionados'}
            </span>
          </div>

          {/* Card: Meta Diária com Ajuste Rápido */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 text-center">
            <span className="text-[11px] uppercase font-mono tracking-wider text-slate-400 block mb-1">
              Meta Diária
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
              {goal.targetCalories}
              <span className="text-xs text-slate-400 font-sans font-normal ml-1">kcal</span>
            </div>
            <div className="mt-2 flex items-center justify-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => setCustomTargetCalories(goal.targetCalories - 100)}
                className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono font-bold flex items-center justify-center touch-btn"
              >
                -
              </button>
              <span className="text-slate-400 text-[11px]">Ajustar meta</span>
              <button
                type="button"
                onClick={() => setCustomTargetCalories(goal.targetCalories + 100)}
                className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono font-bold flex items-center justify-center touch-btn"
              >
                +
              </button>
            </div>
          </div>

          {/* Card: Saldo Restante */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 text-center">
            <span className="text-[11px] uppercase font-mono tracking-wider text-slate-400 block mb-1">
              Saldo Restante
            </span>
            <div className={`text-3xl sm:text-4xl font-black font-mono tracking-tight ${
              remainingCalories >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {remainingCalories >= 0 ? remainingCalories : `+${Math.abs(remainingCalories)}`}
              <span className="text-xs text-slate-400 font-sans font-normal ml-1">
                {remainingCalories >= 0 ? 'kcal livres' : 'kcal excesso'}
              </span>
            </div>
            <span className={`text-xs mt-1 block font-medium ${
              remainingCalories >= 0 ? 'text-emerald-400/80' : 'text-rose-400/80'
            }`}>
              {remainingCalories >= 0 ? 'Dentro do plano do dia' : 'Meta diária ultrapassada'}
            </span>
          </div>
        </div>

        {/* Barra Visual de Progresso Calórico (Neon Emerald) */}
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-300 font-medium">
              Progresso Calórico: <strong className="text-emerald-400">{progressPercent}%</strong>
            </span>
            <span className="text-slate-400 font-mono">
              {totalCalories} / {goal.targetCalories} kcal
            </span>
          </div>
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className={`h-full rounded-full transition-all duration-500 shadow-sm ${
                remainingCalories < 0
                  ? 'bg-rose-500'
                  : progressPercent > 85
                  ? 'bg-amber-400'
                  : 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
              }`}
              style={{ width: `${Math.min(100, progressPercent)}%` }}
            />
          </div>
        </div>

        {/* 3. OS MACRONUTRIENTES EM CARTÕES BENTO */}
        <div className="pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              <PieChart className="w-4 h-4 text-emerald-400" />
              <span>Distribuição dos 3 Macronutrientes</span>
            </h2>
            <span className="text-xs text-slate-400">
              Gramas totais & percentagem calórica
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Proteínas */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-rose-400">Proteínas</span>
                <span className="font-mono text-slate-400">{proteinPct}%</span>
              </div>
              <div className="text-2xl font-black font-mono text-white">
                {totalProtein} <span className="text-xs text-slate-400 font-normal">g</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Meta estimada: ~{goal.targetProtein}g
              </div>
            </div>

            {/* Hidratos de Carbono */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-cyan-400">Hidratos de Carbono</span>
                <span className="font-mono text-slate-400">{carbsPct}%</span>
              </div>
              <div className="text-2xl font-black font-mono text-white">
                {totalCarbs} <span className="text-xs text-slate-400 font-normal">g</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Meta estimada: ~{goal.targetCarbs}g
              </div>
            </div>

            {/* Lípidos */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-amber-400">Lípidos (Gordura)</span>
                <span className="font-mono text-slate-400">{fatPct}%</span>
              </div>
              <div className="text-2xl font-black font-mono text-white">
                {totalFat} <span className="text-xs text-slate-400 font-normal">g</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Meta estimada: ~{goal.targetFat}g
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BALANÇA DE INGREDIENTES & CALCULADORA (BENTO CARD) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Coluna Calculadora: PortFIR vs USDA */}
        <div className="lg:col-span-7 bento-card p-5 sm:p-6 bg-[#131C2E] border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 mb-4 gap-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-emerald-400" />
                <span>Balança Culinária & Conversor</span>
              </h2>
              
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setCalcSource('portfir')}
                  className={`px-3 py-1 text-xs rounded-lg transition-all touch-btn cursor-pointer ${
                    calcSource === 'portfir'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  PortFIR / TACO
                </button>
                <button
                  type="button"
                  onClick={() => setCalcSource('usda')}
                  className={`px-3 py-1 text-xs rounded-lg transition-all touch-btn cursor-pointer ${
                    calcSource === 'usda'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  USDA FoodData
                </button>
              </div>
            </div>

            {calcSource === 'portfir' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium">
                    Alimento da Tabela Portuguesa:
                  </label>
                  <select
                    value={selectedIngredientId}
                    onChange={(e) => setSelectedIngredientId(e.target.value)}
                    className="w-full bg-slate-900 text-white border border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm outline-none focus:border-emerald-500"
                  >
                    {PORTUGUESE_NUTRITIONAL_TABLE.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} ({item.calories} kcal/100g)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">
                      Tipo de Medida:
                    </label>
                    <select
                      value={selectedMeasure}
                      onChange={(e) => setSelectedMeasure(e.target.value)}
                      className="w-full bg-slate-900 text-white border border-slate-700 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-emerald-500"
                    >
                      <option value="gramas">Pesagem em Gramas (g)</option>
                      <option value="colher de sopa">Colher de sopa (~15g)</option>
                      <option value="colher de sopa cheia">Colher de sopa cheia (~20g)</option>
                      <option value="colher de chá">Colher de chá (~5g)</option>
                      <option value="noz de manteiga">Noz de manteiga (~15g)</option>
                      <option value="chávena de chá">Chávena de chá (~150g)</option>
                      <option value="chávena almoçadeira">Chávena almoçadeira (~240g)</option>
                      <option value="cálice de licor / porto">Cálice de Porto (~60ml)</option>
                      <option value="fatia média">Fatia média (~50g)</option>
                      <option value="posta média">Posta média (~160g)</option>
                      <option value="unidade média">Unidade média (~120g)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">
                      {selectedMeasure === 'gramas' ? 'Gramas (g):' : 'Multiplicador:'}
                    </label>
                    {selectedMeasure === 'gramas' ? (
                      <input
                        type="number"
                        min="5"
                        max="2000"
                        step="5"
                        value={inputGrams}
                        onChange={(e) => setInputGrams(parseInt(e.target.value) || 0)}
                        className="w-full bg-slate-900 text-white border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-mono font-bold outline-none focus:border-emerald-500"
                      />
                    ) : (
                      <input
                        type="number"
                        min="0.5"
                        max="20"
                        step="0.5"
                        value={measureMultiplier}
                        onChange={(e) => setMeasureMultiplier(parseFloat(e.target.value) || 1)}
                        className="w-full bg-slate-900 text-white border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-mono font-bold outline-none focus:border-emerald-500"
                      />
                    )}
                  </div>
                </div>

                {/* Resultado da Balança */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400">
                      Peso Calculado: <strong className="text-white">{effectiveGrams}g</strong>
                    </span>
                    <span className="text-xl font-black font-mono text-emerald-400">
                      {currentCalc.calories} kcal
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs font-mono pt-2 border-t border-slate-800">
                    <div className="text-rose-400">Prot: {currentCalc.protein}g</div>
                    <div className="text-cyan-400">Hidr: {currentCalc.carbs}g</div>
                    <div className="text-amber-400">Gord: {currentCalc.fat}g</div>
                  </div>
                </div>
              </div>
            ) : (
              /* Pesquisa USDA FoodData */
              <div className="space-y-4">
                <form onSubmit={handleUsdaSearch} className="flex gap-2">
                  <input
                    type="text"
                    value={usdaQuery}
                    onChange={(e) => setUsdaQuery(e.target.value)}
                    placeholder="Search food item (e.g. olive oil, salmon, oats)..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    disabled={isSearchingUsda}
                    className="px-4 py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs touch-btn"
                  >
                    {isSearchingUsda ? 'A Pesquisar...' : 'Pesquisar'}
                  </button>
                </form>

                {usdaResult && (
                  <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
                    <div>
                      <h3 className="text-xs font-bold text-white truncate">{usdaResult.description}</h3>
                      <span className="text-[10px] text-slate-400 font-mono">Fonte: USDA FoodData Central</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="text-xs text-slate-400">Gramas:</label>
                      <input
                        type="number"
                        min="10"
                        max="1000"
                        step="10"
                        value={usdaGrams}
                        onChange={(e) => setUsdaGrams(parseInt(e.target.value) || 100)}
                        className="w-24 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs font-mono font-bold text-white"
                      />
                      <span className="text-base font-bold font-mono text-emerald-400 ml-auto">
                        {Math.round(usdaResult.calories * (usdaGrams / 100))} kcal
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddUsdaResult}
                      className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl touch-btn"
                    >
                      Adicionar à Balança
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Botão Largo de Adicionar Alimento */}
          {calcSource === 'portfir' && (
            <button
              type="button"
              onClick={handleAddCalculatedIngredient}
              className="w-full mt-5 py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 touch-btn cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Registar Alimento na Balança (+{currentCalc.calories} kcal)</span>
            </button>
          )}
        </div>

        {/* Coluna Lista de Registos do Dia */}
        <div className="lg:col-span-5 bento-card p-5 sm:p-6 bg-[#131C2E] border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Registos do Dia ({entries.length})</span>
              </h2>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowManualModal(true)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg text-xs font-semibold border border-slate-700 touch-btn"
                >
                  + Manual
                </button>

                {entries.length > 0 && (
                  <button
                    type="button"
                    onClick={clearEntries}
                    className="p-1 text-slate-500 hover:text-rose-400 rounded"
                    title="Limpar todos os registos"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Lista com Scroll */}
            <div className="max-h-80 overflow-y-auto space-y-2 pr-1 no-scrollbar">
              {entries.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  Nenhum alimento registado hoje.<br />Use a balança ou envie pratos do compêndio!
                </div>
              ) : (
                entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-3 bg-slate-900/60 border border-slate-800 rounded-xl text-xs hover:border-slate-700 transition-colors"
                  >
                    <div className="min-w-0 flex-1 mr-2">
                      <h3 className="font-bold text-white truncate">{entry.title}</h3>
                      <span className="text-[10px] text-slate-400 truncate block">
                        {entry.portionDescription} · P:{entry.protein}g H:{entry.carbs}g L:{entry.fat}g
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono font-bold text-emerald-400">
                        +{entry.calories} kcal
                      </span>
                      <button
                        type="button"
                        onClick={() => removeCalorieEntry(entry.id)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                        title="Remover registo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 mt-4 flex items-center justify-between text-xs text-slate-400">
            <span>Total: {totalCalories} kcal</span>
            <span className="text-emerald-400 font-bold">{remainingCalories >= 0 ? `${remainingCalories} kcal livres` : 'Excesso'}</span>
          </div>
        </div>
      </div>

      {/* Modal de Registo Manual Rápido */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bento-card p-6 bg-slate-900 border-slate-700 max-w-sm w-full space-y-4">
            <h3 className="text-base font-bold text-white">Registo Manual Rápido</h3>
            
            <form onSubmit={handleManualSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Nome / Descrição:</label>
                <input
                  type="text"
                  required
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  placeholder="Ex: Café com leite e torrada..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Calorias (kcal):</label>
                  <input
                    type="number"
                    required
                    value={manualKcal}
                    onChange={(e) => setManualKcal(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Proteína (g):</label>
                  <input
                    type="number"
                    value={manualProtein}
                    onChange={(e) => setManualProtein(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowManualModal(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold touch-btn"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold touch-btn"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
