/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Recipe } from '../types/cookbook';
import { segmentStepTextWithTimers } from '../utils/timeParser';
import { useCalorieTracker } from '../context/CalorieContext';
import { detectCountryInfo } from '../data/countryConfigs';
import { speechService } from '../services/speechService';
import { VoiceSelector } from './VoiceSelector';
import { getYouTubeWatchUrl } from '../utils/videoUtils';
import { HourglassTimerModal } from './HourglassTimerModal';
import { MeasuresAndSubstitutionsModal } from './MeasuresAndSubstitutionsModal';
import { 
  Clock, 
  Users, 
  Flame, 
  ArrowLeft, 
  Play, 
  ExternalLink, 
  Check, 
  Printer, 
  ShieldCheck, 
  Scale, 
  ChefHat, 
  Globe2, 
  Hourglass, 
  Volume2,
  CheckCircle2,
  Lightbulb,
  Sparkles,
  Info
} from 'lucide-react';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  onOpenVideo?: (recipe: Recipe) => void;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({
  recipe,
  onBack,
}) => {
  const { addCalorieEntry } = useCalorieTracker();
  const [servingsMultiplier, setServingsMultiplier] = useState<number>(recipe.servings);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [viewMode, setViewMode] = useState<'bilingual' | 'pt-only' | 'en-only'>('bilingual');
  const [isMeasuresModalOpen, setIsMeasuresModalOpen] = useState<boolean>(false);
  const [timerModalMinutes, setTimerModalMinutes] = useState<number | null>(null);
  const [timerModalContext, setTimerModalContext] = useState<string>('');
  const [hasAddedToCalories, setHasAddedToCalories] = useState<boolean>(false);
  const [speakingStepNumber, setSpeakingStepNumber] = useState<number | null>(null);

  // Mantém ecrã ativo (WakeLock) se disponível
  useEffect(() => {
    let wakeLock: any = null;
    if ('wakeLock' in navigator && (navigator as any).wakeLock) {
      (navigator as any).wakeLock.request('screen')
        .then((lock: any) => { wakeLock = lock; })
        .catch(() => {});
    }
    return () => {
      if (wakeLock) wakeLock.release().catch(() => {});
    };
  }, []);

  // Sincroniza estado de fala do leitor
  useEffect(() => {
    const unsub = speechService.subscribe(() => {
      const status = speechService.getStatus();
      setSpeakingStepNumber(status.isSpeaking ? status.currentStepNumber : null);
    });
    return () => {
      unsub();
      speechService.stop();
    };
  }, []);

  const handleSpeakStep = (stepNumber: number, textToSpeak: string) => {
    speechService.speakStep(stepNumber, textToSpeak);
  };

  const handleOpenTimer = (minutes: number, contextText: string) => {
    setTimerModalMinutes(minutes);
    setTimerModalContext(contextText);
  };

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const scaleAmount = (amountStr: string, baseServings: number, targetServings: number) => {
    const factor = targetServings / baseServings;
    return amountStr.replace(/(\d+([\.,]\d+)?)/g, (match) => {
      const num = parseFloat(match.replace(',', '.'));
      if (isNaN(num)) return match;
      const scaled = Math.round(num * factor * 10) / 10;
      return String(scaled).replace('.', ',');
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const recipeCalories = recipe.nutrition?.calories || 480;
  const recipeProtein = recipe.nutrition?.protein || 32;
  const recipeCarbs = recipe.nutrition?.carbs || 38;
  const recipeFat = recipe.nutrition?.fat || 16;
  const difficultyLevel =
    recipe.difficultyLevel ||
    (recipe.difficulty === 'Tradição Demorada' ? 'Especialista' : (recipe.difficulty as 'Fácil' | 'Médio' | 'Especialista')) ||
    'Médio';

  const matchedCountry = detectCountryInfo(recipe.area, recipe.tags, recipe.title);

  // Proporção de rendimento calculada
  const currentPortionRatio = servingsMultiplier / recipe.servings;
  const scaledCalories = Math.round(recipeCalories * currentPortionRatio);
  const scaledProtein = Math.round(recipeProtein * currentPortionRatio * 10) / 10;
  const scaledCarbs = Math.round(recipeCarbs * currentPortionRatio * 10) / 10;
  const scaledFat = Math.round(recipeFat * currentPortionRatio * 10) / 10;

  const handleSendToCalories = () => {
    addCalorieEntry({
      title: recipe.title,
      category: 'receita',
      portionDescription: `${servingsMultiplier} doses (${recipe.title})`,
      portions: servingsMultiplier,
      calories: scaledCalories,
      protein: scaledProtein,
      carbs: scaledCarbs,
      fat: scaledFat,
    });
    setHasAddedToCalories(true);
    setTimeout(() => setHasAddedToCalories(false), 2500);
  };

  const handleBackToCatalog = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    onBack();
  };

  const renderStepSegments = (text: string, fullContext: string) => {
    const segments = segmentStepTextWithTimers(text);
    return segments.map((seg, sIdx) => {
      if (seg.type === 'timer') {
        return (
          <button
            key={sIdx}
            type="button"
            onClick={() => handleOpenTimer(seg.minutes || 5, fullContext)}
            className="inline-flex items-center gap-1.5 mx-1 px-3 py-1 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/40 text-xs font-bold transition-all shadow-xs cursor-pointer touch-btn align-baseline"
            title={`Iniciar temporizador de ${seg.minutes} minutos`}
          >
            <Hourglass className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>⏳ Iniciar {seg.content}</span>
          </button>
        );
      }
      return <span key={sIdx}>{seg.content}</span>;
    });
  };

  const completedIngredientsCount = Object.values(checkedIngredients).filter(Boolean).length;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-20 font-sans">
      
      {/* 1. Barra Superior de Navegação & Ações Rápidas */}
      <div className="flex flex-wrap items-center justify-between gap-3 no-print">
        <button
          onClick={handleBackToCatalog}
          className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 px-4 py-2 rounded-2xl border border-slate-800 transition-all touch-btn cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>Voltar ao Índice</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Seletor de Idioma das Instruções */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setViewMode('bilingual')}
              className={`px-3 py-1 rounded-lg transition-all touch-btn ${
                viewMode === 'bilingual' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Bilingue
            </button>
            <button
              onClick={() => setViewMode('pt-only')}
              className={`px-3 py-1 rounded-lg transition-all touch-btn ${
                viewMode === 'pt-only' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Português
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 px-3 py-2 rounded-xl border border-slate-800 transition-all touch-btn cursor-pointer"
            title="Imprimir Receita"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Imprimir</span>
          </button>
        </div>
      </div>

      {/* Nota de Restauro Canónico se existir */}
      {recipe.restorationNote && (
        <div className="bento-card p-4 sm:p-5 border-l-4 border-l-emerald-400 bg-slate-900/60">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-sm text-emerald-400 mb-0.5">
                Restauro Técnico Culinário
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {recipe.restorationNote}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. HERO BENTO CARD: TÍTULO, SUBTÍTULO & METADADOS */}
      <div className="bento-card p-6 sm:p-8 bg-gradient-to-b from-[#131C2E] to-[#0F172A] border-slate-800">
        
        {/* Metadados Superiores */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
            {matchedCountry.flag} {matchedCountry.countryName}
          </span>
          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
            difficultyLevel === 'Fácil'
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : difficultyLevel === 'Especialista'
              ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
          }`}>
            <ChefHat className="w-3 h-3 inline mr-1" />
            {difficultyLevel}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium">
            {recipe.category.toUpperCase()}
          </span>
        </div>

        {/* Título e Subtítulo */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2">
          {recipe.title}
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
          {recipe.subtitle}
        </p>

        {/* Estatísticas Rápidas em Grelha Bento */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
          <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80 text-center">
            <Clock className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            <span className="text-[11px] text-slate-400 block">Preparação</span>
            <strong className="text-sm font-bold text-white">{recipe.prepTimeMinutes} min</strong>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80 text-center">
            <Flame className="w-4 h-4 text-orange-400 mx-auto mb-1" />
            <span className="text-[11px] text-slate-400 block">Cozedura</span>
            <strong className="text-sm font-bold text-white">{recipe.cookTimeMinutes} min</strong>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80 text-center">
            <Users className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
            <span className="text-[11px] text-slate-400 block">Rendimento</span>
            <strong className="text-sm font-bold text-white">{servingsMultiplier} doses</strong>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80 text-center">
            <Globe2 className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            <span className="text-[10px] text-slate-400 block">Origem</span>
            <strong className="text-sm font-bold text-white truncate block">{matchedCountry.countryName}</strong>
          </div>
        </div>
      </div>

      {/* 3. BENTO CARD DUPLO: NUTRIÇÃO & ESCALADOR DE DOSES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Cartão de Nutrição dos Macronutrientes */}
        <div className="bento-card p-5 sm:p-6 bg-slate-900/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-emerald-400" />
                <span>Balança Nutricional ({servingsMultiplier}x)</span>
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {recipeCalories} kcal / dose padrão
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                {scaledCalories}
              </span>
              <span className="text-sm text-emerald-400 font-bold">kcal total</span>
            </div>

            {/* 3 Macronutrientes com Cores Vibrantes */}
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[11px] font-semibold text-rose-400 block">Proteína</span>
                <span className="text-base font-bold text-white font-mono">{scaledProtein}g</span>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[11px] font-semibold text-cyan-400 block">Hidratos</span>
                <span className="text-base font-bold text-white font-mono">{scaledCarbs}g</span>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[11px] font-semibold text-amber-400 block">Lípidos</span>
                <span className="text-base font-bold text-white font-mono">{scaledFat}g</span>
              </div>
            </div>
          </div>

          {/* Botão Largo de Adicionar ao Conta Calorias */}
          <button
            type="button"
            onClick={handleSendToCalories}
            className={`w-full mt-5 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all touch-btn cursor-pointer shadow-lg ${
              hasAddedToCalories
                ? 'bg-emerald-500 text-slate-950 font-black shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{hasAddedToCalories ? '✓ Adicionado ao Conta Calorias!' : `⚖ Enviar (+${scaledCalories} kcal) para a Balança`}</span>
          </button>
        </div>

        {/* Cartão de Escalador de Porções & Medidas */}
        <div className="bento-card p-5 sm:p-6 bg-slate-900/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold">
                Ajustar Porções
              </span>
              <span className="text-xs text-emerald-400 font-medium font-mono">
                {servingsMultiplier} {servingsMultiplier === 1 ? 'pessoa' : 'pessoas'}
              </span>
            </div>

            {/* Seletor Largo [-] [N] [+] com Touch Targets Grandes */}
            <div className="flex items-center gap-3 bg-slate-800/60 p-2 rounded-2xl border border-slate-700/60 mb-4">
              <button
                type="button"
                onClick={() => setServingsMultiplier((prev) => Math.max(1, prev - 1))}
                className="w-12 h-12 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-black text-lg flex items-center justify-center touch-btn cursor-pointer"
                title="Menos 1 dose"
              >
                -
              </button>
              
              <div className="flex-1 text-center font-mono">
                <span className="text-2xl font-black text-white block">
                  {servingsMultiplier}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">
                  {servingsMultiplier === 1 ? 'Dose' : 'Doses'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setServingsMultiplier((prev) => prev + 1)}
                className="w-12 h-12 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-lg flex items-center justify-center touch-btn cursor-pointer"
                title="Mais 1 dose"
              >
                +
              </button>
            </div>

            {/* Pílulas Rápidas de Doses */}
            <div className="grid grid-cols-5 gap-1.5 mb-4">
              {[2, 4, 6, 8, 12].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setServingsMultiplier(s)}
                  className={`py-2 rounded-xl text-xs font-mono font-bold transition-all touch-btn cursor-pointer ${
                    servingsMultiplier === s
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {s}p
                </button>
              ))}
            </div>
          </div>

          {/* Botão de Medidas da Avó & Substituições */}
          <button
            type="button"
            onClick={() => setIsMeasuresModalOpen(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-all touch-btn cursor-pointer"
          >
            <ChefHat className="w-4 h-4 text-emerald-400" />
            <span>Guia de Medidas & Substituições SOS</span>
          </button>
        </div>
      </div>

      {/* 4. INGREDIENTES BENTO CARD (INTERATIVO) */}
      <div className="bento-card p-6 sm:p-7 bg-slate-900/60">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Ingredientes Necessários</span>
            </h2>
            <span className="text-xs text-slate-400">
              Quantidades recalculadas para {servingsMultiplier} doses
            </span>
          </div>

          <span className="text-xs font-mono px-3 py-1 bg-slate-800 text-emerald-400 rounded-full border border-slate-700">
            {completedIngredientsCount} de {recipe.ingredients.length} preparados
          </span>
        </div>

        {/* Lista de Ingredientes com Touch Checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {recipe.ingredients.map((ing, idx) => {
            const isChecked = !!checkedIngredients[idx];
            const scaled = scaleAmount(ing.amount, recipe.servings, servingsMultiplier);

            return (
              <div
                key={idx}
                onClick={() => toggleIngredient(idx)}
                className={`flex items-start gap-3 p-3 rounded-2xl border transition-all cursor-pointer touch-btn ${
                  isChecked
                    ? 'bg-slate-900/40 border-slate-800/60 text-slate-500 line-through'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-200 hover:border-emerald-500/50'
                }`}
              >
                <div className={`w-5 h-5 rounded-lg border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                  isChecked
                    ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                    : 'border-slate-600 bg-slate-900'
                }`}>
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-semibold truncate">
                      {ing.item}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 shrink-0">
                      {scaled}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Seletor Bento de Voz do Leitor (Web Speech API) */}
      <VoiceSelector />

      {/* 5. PASSOS DE CONFEÇÃO BENTO GRID (INDEPENDENTES, SEM DROP CAPS) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Passos de Confeção ({recipe.steps.length})</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            Instruções completas verificadas
          </span>
        </div>

        {recipe.steps.map((step) => {
          return (
            <div
              key={step.stepNumber}
              className="bento-card p-5 sm:p-6 bg-slate-900/70 border border-slate-800 modern-step-card relative space-y-4"
            >
              {/* Badge de Restauro se aplicável */}
              {step.isRestored && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Passo Restaurado Integralmente (Sem Cortes)</span>
                </div>
              )}

              {/* Cabeçalho do Passo com Número Circular e Indicador */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Círculo Numerado Moderno em Verde Neon */}
                  <div className="w-9 h-9 rounded-2xl bg-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.4)]">
                    {step.stepNumber}
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Passo {step.stepNumber}
                  </span>
                </div>

                {speakingStepNumber === step.stepNumber && (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold font-mono animate-pulse">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Em reprodução...</span>
                  </span>
                )}
              </div>

              {/* Texto em Inglês Original (se modo bilingue ou en) */}
              {(viewMode === 'bilingual' || viewMode === 'en-only') && step.originalText && (
                <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800/80 text-xs sm:text-sm text-slate-400 italic">
                  {step.originalText}
                </div>
              )}

              {/* Texto em Português sem Drop Caps antigas */}
              {(viewMode === 'bilingual' || viewMode === 'pt-only') && (
                <div className="text-slate-100 text-sm sm:text-base leading-relaxed font-normal">
                  {renderStepSegments(step.portugueseText, step.portugueseText)}
                </div>
              )}

              {/* Nota de Cozinha do Mestre */}
              {step.notes && (
                <div className="flex items-start gap-2 p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-xl text-xs text-emerald-300">
                  <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-emerald-400 font-bold">Dica do Mestre:</strong> {step.notes}
                  </p>
                </div>
              )}

              {/* Botão Largo e Touch-Friendly [🔊 Ler Passo em Voz Alta] */}
              <button
                type="button"
                onClick={() => handleSpeakStep(step.stepNumber, step.portugueseText)}
                className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border transition-all touch-btn cursor-pointer ${
                  speakingStepNumber === step.stepNumber
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-emerald-400 border-slate-700 hover:border-emerald-500/40'
                }`}
                title="Ler este passo em voz alta com a voz configurada"
              >
                <Volume2 className="w-4 h-4 shrink-0" />
                <span>
                  {speakingStepNumber === step.stepNumber ? '⏹ A Falar... (Toque para Parar)' : '🔊 Ler Passo em Voz Alta'}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Segredo da Despensa (Bento Card) */}
      {recipe.pantrySecret && (
        <div className="bento-card p-5 sm:p-6 bg-slate-900/60 border-emerald-500/30">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-400 mb-1">
                Segredo da Despensa da Avó
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {recipe.pantrySecret}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 6. BOTÕES LARGOS E MICRO-INTERAÇÕES TOUCH-FRIENDLY NO FUNDO */}
      <div className="bento-card p-5 sm:p-6 bg-slate-900/90 border-slate-800 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          {/* Botão Largo 1: Assistir ao Vídeo no YouTube (Sem TV CRT) */}
          <a
            href={getYouTubeWatchUrl(recipe.videoTutorialUrl, recipe.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 touch-btn cursor-pointer"
            title="Abrir vídeo oficial ou pesquisa no YouTube"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>▶ Assistir ao Vídeo Explicativo</span>
          </a>

          {/* Botão Largo 2: Enviar para o Conta Calorias */}
          <button
            type="button"
            onClick={handleSendToCalories}
            className="w-full py-3.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 touch-btn cursor-pointer"
          >
            <Scale className="w-4 h-4" />
            <span>⚖ Adicionar Dose (+{scaledCalories} kcal)</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <a
            href={recipe.originalSourceUrl || getYouTubeWatchUrl(recipe.videoTutorialUrl, recipe.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 touch-btn"
          >
            <span>Fonte Original da Receita</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
          </a>

          <button
            onClick={handleBackToCatalog}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            ← Voltar ao Índice de Receitas
          </button>
        </div>
      </div>

      {/* Modal de Temporizador Automático (Ampulheta) */}
      <HourglassTimerModal
        isOpen={timerModalMinutes !== null}
        onClose={() => setTimerModalMinutes(null)}
        initialMinutes={timerModalMinutes || 5}
        contextTitle={recipe.title}
        contextSnippet={timerModalContext}
      />

      {/* Modal de Medidas da Avó e Substituições */}
      <MeasuresAndSubstitutionsModal
        isOpen={isMeasuresModalOpen}
        onClose={() => setIsMeasuresModalOpen(false)}
      />
    </div>
  );
};
