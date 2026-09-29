/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Recipe } from '../types/cookbook';
import { CANONICAL_RECIPES } from '../data/canonicalRecipes';
import { useCalorieTracker } from '../context/CalorieContext';
import { 
  POPULAR_CHIP_INGREDIENTS,
  generateWeeklyMealPlan,
  swapMealInPlan,
  generateSmartGroceryLists,
  DayPlan,
  PlannedDish
} from '../utils/mealPlanGenerator';
import { GroceryListView } from './GroceryListView';
import { WEEKLY_MEAL_PLAN } from '../data/mealPlanData';
import { 
  CalendarDays, 
  Utensils, 
  Coffee, 
  Moon, 
  Sparkles, 
  Scale, 
  RefreshCw, 
  ShoppingBag, 
  Check, 
  Plus, 
  X, 
  Printer, 
  Copy, 
  BookOpen, 
  CheckSquare, 
  Square,
  Flame,
  ChefHat,
  ChevronRight,
  TrendingDown,
  Activity,
  TrendingUp
} from 'lucide-react';

interface MealPlannerViewProps {
  onSelectRecipe: (recipe: Recipe) => void;
}

export const MealPlannerView: React.FC<MealPlannerViewProps> = ({ onSelectRecipe }) => {
  const { goal, setGoalType, addCalorieEntry } = useCalorieTracker();

  // 1. Ingredientes escolhidos pelo utilizador
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([
    'Frango',
    'Batata',
    'Cogumelos',
    'Ovos',
    'Tomate'
  ]);
  const [customInput, setCustomInput] = useState<string>('');
  const [servings, setServings] = useState<number>(4);
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('single');
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);
  const [showFullGroceryModal, setShowFullGroceryModal] = useState<boolean>(false);

  // 2. Estado do plano semanal gerado
  const [weeklyPlan, setWeeklyPlan] = useState<DayPlan[]>(() => {
    return generateWeeklyMealPlan(
      ['Frango', 'Batata', 'Cogumelos', 'Ovos', 'Tomate'],
      goal.goalType,
      4
    );
  });

  // 3. Estado dos vistos na lista de compras (falta comprar)
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

  const handleGeneratePlan = () => {
    const newPlan = generateWeeklyMealPlan(selectedIngredients, goal.goalType, servings);
    setWeeklyPlan(newPlan);
  };

  const toggleIngredientChip = (ing: string) => {
    setSelectedIngredients((prev) => {
      const exists = prev.some((i) => i.toLowerCase() === ing.toLowerCase());
      if (exists) {
        return prev.filter((i) => i.toLowerCase() !== ing.toLowerCase());
      } else {
        return [...prev, ing];
      }
    });
  };

  const handleAddCustomIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = customInput.trim();
    if (!clean) return;
    if (!selectedIngredients.some((i) => i.toLowerCase() === clean.toLowerCase())) {
      setSelectedIngredients((prev) => [...prev, clean]);
    }
    setCustomInput('');
  };

  const handleRemoveIngredient = (ing: string) => {
    setSelectedIngredients((prev) => prev.filter((i) => i !== ing));
  };

  const handleViewRecipe = (dish: PlannedDish) => {
    if (dish.recipePayload) {
      onSelectRecipe(dish.recipePayload);
      return;
    }
    if (dish.recipeId) {
      const found = CANONICAL_RECIPES.find((r) => r.id === dish.recipeId);
      if (found) {
        onSelectRecipe(found);
        return;
      }
    }
    const generatedRecipe: Recipe = {
      id: `gen-${dish.id}`,
      slug: `gen-${dish.id}`,
      title: dish.dishName,
      originalTitle: dish.dishName,
      subtitle: dish.description,
      category: dish.category === 'pequeno-almoco' || dish.category === 'doces' ? 'doces' : (dish.category === 'aves' ? 'aves' : 'peixes'),
      prepTimeMinutes: 20,
      cookTimeMinutes: 35,
      servings,
      difficulty: 'Médio',
      difficultyLevel: 'Médio',
      dropCapLetter: dish.dishName.charAt(0).toUpperCase(),
      historicalNote: 'Receita tradicional da família passada de geração em geração.',
      pantrySecret: 'Refogue em azeite de lagar em lume brando para extrair o melhor sabor dos ingredientes.',
      tags: [...dish.mainIngredients, 'Ementa Semanal', 'Cozinha Tradicional'],
      area: 'Portuguese',
      nutrition: {
        calories: dish.calories,
        protein: dish.protein,
        carbs: dish.carbs,
        fat: dish.fat,
        servingSize: `1 dose (${servings} porções)`
      },
      originalSourceTitle: 'BiteSync Studio · Acervo Canónico',
      originalSourceUrl: 'https://pt.wikipedia.org/wiki/Culin%C3%A1ria_de_Portugal',
      ingredients: dish.mainIngredients.map((item) => ({
        item: `${item} fresco da despensa`,
        amount: 'Q.b.'
      })),
      steps: [
        {
          stepNumber: 1,
          portugueseText: `Prepare e higienize os ingredientes principais: ${dish.mainIngredients.join(', ')}. Pique finamente cebola e alho para a base aromática.`
        },
        {
          stepNumber: 2,
          portugueseText: `Num tacho com um fio de azeite virgem, sele os ingredientes principais até dourarem.`
        },
        {
          stepNumber: 3,
          portugueseText: `Junte o acompanhamento (${dish.sideDish || 'legumes da horta'}), reduza para lume brando e deixe apurar durante 25 a 30 minutos.`
        },
        {
          stepNumber: 4,
          portugueseText: `Retifique os temperos com sal marinho e ervas frescas. Sirva bem quente com o carinho de uma refeição em família.`
        }
      ]
    };
    onSelectRecipe(generatedRecipe);
  };

  const handleSwapDish = (dayIdx: number, mealType: 'breakfast' | 'lunch' | 'dinner') => {
    const updated = swapMealInPlan(weeklyPlan, dayIdx, mealType, selectedIngredients, goal.goalType);
    setWeeklyPlan(updated);
  };

  const handleRegisterDayInCalories = (day: DayPlan) => {
    addCalorieEntry({
      title: day.breakfast.dishName,
      category: 'refeicao',
      portionDescription: `Pequeno-Almoço de ${day.dayOfWeek}`,
      portions: 1,
      calories: day.breakfast.calories,
      protein: day.breakfast.protein,
      carbs: day.breakfast.carbs,
      fat: day.breakfast.fat,
      timeLabel: 'Pequeno-Almoço'
    });

    addCalorieEntry({
      title: day.lunch.dishName,
      category: 'refeicao',
      portionDescription: `Almoço de ${day.dayOfWeek} (${day.lunch.sideDish || 'Prato Principal'})`,
      portions: 1,
      calories: day.lunch.calories,
      protein: day.lunch.protein,
      carbs: day.lunch.carbs,
      fat: day.lunch.fat,
      timeLabel: 'Almoço'
    });

    addCalorieEntry({
      title: day.dinner.dishName,
      category: 'refeicao',
      portionDescription: `Jantar de ${day.dayOfWeek} (${day.dinner.comfortSoup || 'Ceia'})`,
      portions: 1,
      calories: day.dinner.calories,
      protein: day.dinner.protein,
      carbs: day.dinner.carbs,
      fat: day.dinner.fat,
      timeLabel: 'Jantar'
    });
  };

  const smartGrocery = useMemo(() => {
    return generateSmartGroceryLists(weeklyPlan, selectedIngredients, servings);
  }, [weeklyPlan, selectedIngredients, servings]);

  const toggleCheckItem = (id: string) => {
    setCheckedMap((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopyShoppingList = () => {
    let text = `🛒 LISTA DE COMPRAS SEMANAL · CULINARY STUDIO\n`;
    text += `Ementa de 7 Dias (${servings} pessoas · Objetivo: ${goal.goalType.toUpperCase()})\n`;
    text += `--------------------------------------------------------\n\n`;

    text += `✓ JÁ TENHO NA DESPENSA (${smartGrocery.alreadyInPantry.length} itens):\n`;
    smartGrocery.alreadyInPantry.forEach((p) => {
      text += `  [x] ${p.name}\n`;
    });

    text += `\n🛒 FALTA COMPRAR NO MERCADO (${smartGrocery.missingToBuy.length} itens):\n`;
    smartGrocery.missingToBuy.forEach((m) => {
      const isChecked = checkedMap[m.id] ? '[✓]' : '[ ]';
      text += `  ${isChecked} ${m.name} (${m.amount}) — p/ ${m.sourceDishes.slice(0, 2).join(', ')}\n`;
    });

    navigator.clipboard.writeText(text);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  const activeDay = weeklyPlan[activeDayIndex] || weeklyPlan[0];

  if (showFullGroceryModal) {
    return (
      <GroceryListView
        weeklyPlan={WEEKLY_MEAL_PLAN}
        onBackToMenu={() => setShowFullGroceryModal(false)}
      />
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-20 font-sans">
      
      {/* 1. CABEÇALHO DO MÓDULO IV */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Módulo IV · Planeamento Semanal Inteligente</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Ementa por Dia & Ingredientes à Escolha
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Gere uma rotação de 7 dias (Pequeno-Almoço, Almoço e Jantar) priorizando o que tem em casa.
          </p>
        </div>

        {/* Botão de Destaque no Topo para Ecrãs Maiores */}
        <button
          type="button"
          onClick={handleGeneratePlan}
          className="hidden sm:inline-flex items-center gap-2 py-3 px-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl font-black text-xs sm:text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all touch-btn cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Gerar Ementa Semanal</span>
        </button>
      </div>

      {/* 2. PAINEL BENTO DE SELEÇÃO DE INGREDIENTES & PARÂMETROS */}
      <div className="bg-card rounded-[28px] p-5 border border-gray-800 space-y-4">
        
        <div>
          <h3 className="text-base font-bold text-white mb-1">O que tem hoje em Casa?</h3>
          <p className="text-xs text-gray-400 mb-3">
            Selecione os ingredientes para dar prioridade máxima na ementa da semana.
          </p>
        </div>

        <div className="bg-input border border-gray-800 rounded-xl px-3 py-2 text-xs font-mono text-neon inline-block mb-1">
          {selectedIngredients.length} selecionados
        </div>

        {/* Chips de Ingredientes */}
        <div className="flex flex-wrap gap-2 mb-4">
          {POPULAR_CHIP_INGREDIENTS.map((ing) => {
            const isSelected = selectedIngredients.some((i) => i.toLowerCase() === ing.toLowerCase());
            return (
              <button
                key={ing}
                type="button"
                onClick={() => toggleIngredientChip(ing)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all touch-btn flex items-center gap-1 cursor-pointer ${
                  isSelected
                    ? 'bg-neon text-black font-bold shadow'
                    : 'bg-input border border-gray-800 text-gray-300 hover:border-gray-700'
                }`}
              >
                <span>{ing}</span>
                <span>{isSelected ? '✓' : '+'}</span>
              </button>
            );
          })}
        </div>

        {/* Input Livre para Adicionar Ingrediente */}
        <form onSubmit={handleAddCustomIngredient} className="flex gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Adicionar outro ingrediente (ex: Espargos, Amêijoas, Castanhas)..."
            className="flex-1 bg-input border border-gray-800 focus:border-neon rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 outline-none transition-colors"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-card hover:bg-gray-800 text-neon rounded-xl text-xs font-bold transition-all touch-btn shrink-0 cursor-pointer border border-gray-700"
          >
            Adicionar
          </button>
        </form>

        {/* Parâmetros: Objetivo Calórico e Doses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-gray-800">
          
          {/* Seletor de Objetivo Calórico */}
          <div>
            <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-2 font-bold">
              Objetivo Diário:
            </label>
            <div className="grid grid-cols-3 gap-2 bg-input p-1 rounded-2xl border border-gray-800 text-center">
              <button
                type="button"
                onClick={() => setGoalType('defice')}
                className={`py-2.5 rounded-xl text-xs transition-all touch-btn cursor-pointer ${
                  goal.goalType === 'defice' ? 'bg-neon text-black font-bold shadow' : 'text-gray-400 hover:text-white font-semibold'
                }`}
              >
                Défice
              </button>
              <button
                type="button"
                onClick={() => setGoalType('manutencao')}
                className={`py-2.5 rounded-xl text-xs transition-all touch-btn cursor-pointer ${
                  goal.goalType === 'manutencao' ? 'bg-neon text-black font-bold shadow' : 'text-gray-400 hover:text-white font-semibold'
                }`}
              >
                Manutenção
              </button>
              <button
                type="button"
                onClick={() => setGoalType('ganho')}
                className={`py-2.5 rounded-xl text-xs transition-all touch-btn cursor-pointer ${
                  goal.goalType === 'ganho' ? 'bg-neon text-black font-bold shadow' : 'text-gray-400 hover:text-white font-semibold'
                }`}
              >
                Ganho
              </button>
            </div>
          </div>

          {/* Seletor de Doses & Ação Gerar */}
          <div>
            <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-2 font-bold">
              Doses & Planeamento:
            </label>
            <div className="flex items-center gap-2">
              <div className="grid grid-cols-4 gap-1 bg-input p-1 rounded-2xl border border-gray-800 flex-1 text-center">
                {[2, 4, 6, 8].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setServings(s)}
                    className={`py-2 rounded-xl text-xs font-mono transition-all touch-btn cursor-pointer ${
                      servings === s ? 'bg-neon text-black font-bold' : 'text-gray-400 hover:text-white font-medium'
                    }`}
                  >
                    {s}p
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={handleGeneratePlan}
                className="py-2.5 px-4 bg-neon text-black rounded-2xl font-bold text-xs shadow hover:brightness-110 transition-all touch-btn cursor-pointer shrink-0"
              >
                Gerar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BARRA DE NAVEGAÇÃO DOS 7 DIAS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto no-scrollbar">
          {weeklyPlan.map((d, idx) => {
            const isSelected = idx === activeDayIndex && viewMode === 'single';
            return (
              <button
                key={d.dayNumber}
                type="button"
                onClick={() => {
                  setActiveDayIndex(idx);
                  setViewMode('single');
                }}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 touch-btn cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{d.dayOfWeek.split('-')[0]}</span>
                <span className="text-[10px] opacity-75 font-mono">({d.totalCalories}k)</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setViewMode(viewMode === 'single' ? 'grid' : 'single')}
          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-xs font-semibold transition-colors self-end sm:self-auto touch-btn"
        >
          {viewMode === 'single' ? 'Vista Completa 7 Dias' : 'Vista Diária Detalhada'}
        </button>
      </div>

      {/* 4. GRELHA SEMANAL BENTO (VISTA DIÁRIA OU COMPLETA) */}
      {viewMode === 'single' ? (
        <div className="bento-card p-6 sm:p-7 bg-[#131C2E] border-slate-800 space-y-6">
          
          {/* Cabeçalho do Dia */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-[11px] uppercase font-mono tracking-wider text-slate-400 font-bold">
                Dia {activeDay.dayNumber} · {servings} doses
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {activeDay.dayOfWeek}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3.5 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total</span>
                <span className="text-sm font-black font-mono text-emerald-400">{activeDay.totalCalories} kcal</span>
              </div>

              {/* Botão Largo de Registar Dia no Conta Calorias */}
              <button
                type="button"
                onClick={() => handleRegisterDayInCalories(activeDay)}
                className="py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1.5 touch-btn cursor-pointer shadow-md"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>⚖ Registar Dia (+{activeDay.totalCalories} kcal)</span>
              </button>
            </div>
          </div>

          {/* 3 Cartões de Refeição Bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ModernMealCard
              title="Pequeno-Almoço & Fruta"
              dish={activeDay.breakfast}
              icon={<Coffee className="w-4 h-4 text-amber-400" />}
              badge="Matinal"
              onViewRecipe={() => handleViewRecipe(activeDay.breakfast)}
              onSwapDish={() => handleSwapDish(activeDayIndex, 'breakfast')}
            />

            <ModernMealCard
              title="Almoço Principal"
              dish={activeDay.lunch}
              icon={<Utensils className="w-4 h-4 text-emerald-400" />}
              badge="Principal"
              onViewRecipe={() => handleViewRecipe(activeDay.lunch)}
              onSwapDish={() => handleSwapDish(activeDayIndex, 'lunch')}
            />

            <ModernMealCard
              title="Jantar & Ceia"
              dish={activeDay.dinner}
              icon={<Moon className="w-4 h-4 text-cyan-400" />}
              badge="Ceia"
              onViewRecipe={() => handleViewRecipe(activeDay.dinner)}
              onSwapDish={() => handleSwapDish(activeDayIndex, 'dinner')}
            />
          </div>

          {/* Dica da Despensa */}
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-start gap-3 text-xs text-slate-300">
            <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              ★
            </div>
            <div>
              <strong className="text-emerald-400 block mb-0.5">Dica da Despensa:</strong>
              <p className="leading-relaxed">{activeDay.pantryTip}</p>
            </div>
          </div>
        </div>
      ) : (
        /* Vista dos 7 Dias em Grelha */
        <div className="space-y-4">
          {weeklyPlan.map((day, idx) => (
            <div key={day.dayNumber} className="bento-card p-5 bg-[#131C2E] border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-extrabold text-base text-white">{day.dayOfWeek}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-slate-900 px-2.5 py-1 rounded-lg">
                    {day.totalCalories} kcal
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRegisterDayInCalories(day)}
                    className="p-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs touch-btn"
                    title="Registar no Conta Calorias"
                  >
                    <Scale className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <ModernMealCard
                  title="Pequeno-Almoço"
                  dish={day.breakfast}
                  icon={<Coffee className="w-4 h-4 text-amber-400" />}
                  badge="Matinal"
                  onViewRecipe={() => handleViewRecipe(day.breakfast)}
                  onSwapDish={() => handleSwapDish(idx, 'breakfast')}
                />
                <ModernMealCard
                  title="Almoço"
                  dish={day.lunch}
                  icon={<Utensils className="w-4 h-4 text-emerald-400" />}
                  badge="Principal"
                  onViewRecipe={() => handleViewRecipe(day.lunch)}
                  onSwapDish={() => handleSwapDish(idx, 'lunch')}
                />
                <ModernMealCard
                  title="Jantar"
                  dish={day.dinner}
                  icon={<Moon className="w-4 h-4 text-cyan-400" />}
                  badge="Ceia"
                  onViewRecipe={() => handleViewRecipe(day.dinner)}
                  onSwapDish={() => handleSwapDish(idx, 'dinner')}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 5. LISTA DE COMPRAS INTELIGENTE CONSOLIDADA (DUAS COLUNAS BENTO) */}
      <div className="bento-card p-5 sm:p-7 bg-[#131C2E] border-slate-800 space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Lista de Compras Consolidada da Semana</h2>
              <span className="text-xs text-slate-400">
                Divisão inteligente: o que já tem em casa vs. o que falta comprar no mercado
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyShoppingList}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 touch-btn border border-slate-700"
            >
              {copiedSuccess ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSuccess ? 'Copiada!' : 'Copiar'}</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 touch-btn border border-slate-700"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>
          </div>
        </div>

        {/* 2 Colunas Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Coluna 1: ✓ Já tenho na Despensa */}
          <div className="bg-slate-900/60 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>✓ Já tenho na Despensa</span>
                </span>
                <span className="text-[11px] font-mono text-emerald-400">
                  {smartGrocery.alreadyInPantry.length} itens
                </span>
              </div>

              <div className="space-y-2">
                {smartGrocery.alreadyInPantry.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-slate-800/40 rounded-xl text-xs text-slate-200">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 stroke-[3]" />
                    <span className="font-semibold capitalize">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-2 border-t border-slate-800 text-[11px] text-slate-500">
              Itens selecionados no início da semana.
            </div>
          </div>

          {/* Coluna 2: 🛒 Falta Comprar no Mercado */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4" />
                  <span>🛒 Falta Comprar no Mercado</span>
                </span>
                <span className="text-[11px] font-mono text-cyan-400">
                  {smartGrocery.missingToBuy.filter((m) => !checkedMap[m.id]).length} a comprar
                </span>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1 no-scrollbar">
                {smartGrocery.missingToBuy.map((m) => {
                  const isChecked = !!checkedMap[m.id];
                  return (
                    <div
                      key={m.id}
                      onClick={() => toggleCheckItem(m.id)}
                      className={`flex items-start gap-2.5 p-2 rounded-xl text-xs transition-colors cursor-pointer border ${
                        isChecked
                          ? 'bg-slate-950/40 text-slate-500 border-slate-900 line-through'
                          : 'bg-slate-800/40 text-slate-200 border-slate-700/60 hover:border-emerald-500/50'
                      }`}
                    >
                      <button type="button" className="mt-0.5 text-emerald-400 shrink-0">
                        {isChecked ? <CheckSquare className="w-3.5 h-3.5 text-emerald-400" /> : <Square className="w-3.5 h-3.5 text-slate-500" />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <strong className={isChecked ? 'text-slate-500' : 'text-white'}>{m.name}</strong>
                          <span className="text-[11px] font-mono text-emerald-400">{m.amount}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 block truncate">
                          Para: {m.sourceDishes.slice(0, 2).join(', ')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-2 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Toque para marcar como comprado</span>
              <button
                type="button"
                onClick={() => setShowFullGroceryModal(true)}
                className="text-emerald-400 hover:underline"
              >
                Ver por Secção ↗
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente Cartão de Refeição Moderno
interface ModernMealCardProps {
  title: string;
  dish: PlannedDish;
  icon: React.ReactNode;
  badge: string;
  onViewRecipe: () => void;
  onSwapDish: () => void;
}

const ModernMealCard: React.FC<ModernMealCardProps> = ({
  title,
  dish,
  icon,
  badge,
  onViewRecipe,
  onSwapDish
}) => {
  const hasMatched = dish.matchedIngredients && dish.matchedIngredients.length > 0;

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            {icon}
            <span>{title}</span>
          </span>
          <span className="text-[10px] uppercase font-mono font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-lg">
            {badge}
          </span>
        </div>

        <h3 className="font-bold text-sm text-white mt-2 mb-1 leading-snug">
          {dish.dishName}
        </h3>

        {hasMatched && (
          <div className="mb-2">
            <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-md font-bold">
              ★ Contém: {dish.matchedIngredients?.join(', ')}
            </span>
          </div>
        )}

        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
          {dish.description}
        </p>

        {dish.sideDish && (
          <div className="text-[11px] text-slate-300 mt-2 font-medium">
            <span className="text-slate-500">Acomp:</span> {dish.sideDish}
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-emerald-400">{dish.calories} kcal</span>
          <span className="text-[10px] text-slate-500">P:{dish.protein}g H:{dish.carbs}g L:{dish.fat}g</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onViewRecipe}
            className="flex-1 py-2 px-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold flex items-center justify-center gap-1 touch-btn cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Ver Receita</span>
          </button>

          <button
            type="button"
            onClick={onSwapDish}
            className="py-2 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 touch-btn border border-slate-700 cursor-pointer"
            title="Trocar refeição"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
            <span>Trocar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
