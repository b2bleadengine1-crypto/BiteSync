/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Recipe, ActiveNavTab } from '../types/cookbook';
import { CANONICAL_RECIPES } from '../data/canonicalRecipes';
import { useCalorieTracker } from '../context/CalorieContext';
import { 
  ScanLine, 
  Heart, 
  Check, 
  Grid,
  ArrowRight
} from 'lucide-react';

interface HomeDashboardViewProps {
  onSelectRecipe: (recipe: Recipe) => void;
  onNavigateTab: (tab: ActiveNavTab, preselectedCategory?: string) => void;
}

export const HomeDashboardView: React.FC<HomeDashboardViewProps> = ({
  onSelectRecipe,
  onNavigateTab,
}) => {
  const { goal, totalCalories } = useCalorieTracker();

  // Receita em destaque: Bacalhau à Brás (ou Chicken Hotpot)
  const featuredRecipe = 
    CANONICAL_RECIPES.find((r) => r.slug.includes('bacalhau-a-bras')) ||
    CANONICAL_RECIPES.find((r) => r.id === 'chicken-mushroom-hotpot') ||
    CANONICAL_RECIPES[0];

  const targetKcal = goal.targetCalories || 2100;
  const currentKcal = totalCalories > 0 ? totalCalories : 582;
  const caloriePercentage = Math.min(100, Math.round((currentKcal / targetKcal) * 100));

  return (
    <div className="font-sans animate-in fade-in duration-300">
      <div className="grid grid-cols-2 gap-4">
        
        {/* ========================================================================= */}
        {/* COLUNA ESQUERDA */}
        {/* ========================================================================= */}
        <div className="flex flex-col gap-4">
          
          {/* Destaque: Gastronomia Portuguesa (Featured Recipe) */}
          <div 
            onClick={() => onSelectRecipe(featuredRecipe)}
            className="bento-card border border-lime shadow-[0_0_15px_rgba(212,255,0,0.06)] flex flex-col cursor-pointer group hover:border-lime/80 transition touch-btn"
          >
            <span className="text-[10px] text-lime font-bold uppercase tracking-widest mb-2 font-mono">
              Gastronomia PT
            </span>
            <h2 className="text-xl font-extrabold text-white leading-tight mb-4 uppercase group-hover:text-lime transition-colors">
              {featuredRecipe.title.includes('Bacalhau') ? (
                <>Bacalhau<br />à Brás</>
              ) : (
                featuredRecipe.title
              )}
            </h2>
            
            {/* Imagem Circular com Ponto Lime */}
            <div className="w-28 h-28 rounded-full bg-zinc-800 mx-auto mb-4 relative overflow-hidden border-2 border-zinc-900 shadow-xl group-hover:scale-105 transition-transform duration-300 shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1621841315603-9118541fb377?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Prato Destaque" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 w-3.5 h-3.5 bg-lime rounded-full border-2 border-black shadow-[0_0_6px_#d4ff00]" />
            </div>

            <p className="text-sm text-white font-medium mb-5 leading-snug">
              Clássico intemporal em {featuredRecipe.cookTimeMinutes || 25}m.
            </p>
            
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectRecipe(featuredRecipe);
              }}
              className="w-full bg-lime text-black font-extrabold py-3.5 rounded-full text-[11px] uppercase tracking-wide mt-auto hover:brightness-110 active:scale-95 transition shadow cursor-pointer touch-btn text-center"
            >
              Ver Receita
            </button>
          </div>

          {/* Explorar Categorias */}
          <div className="bento-card flex flex-col justify-between p-5 border border-zinc-800/80">
            <div className="flex items-center justify-between mb-3">
              <Grid className="w-5 h-5 text-zinc-400" />
              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">64 Pratos</span>
            </div>
            
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 leading-tight">
              Explorar<br />Categorias
            </h3>
            
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onNavigateTab('explorar', 'peixes')}
                className="flex flex-col items-center gap-1 group cursor-pointer touch-btn"
              >
                <div className="w-8 h-8 rounded-full bg-zinc-800 group-hover:bg-zinc-700 flex items-center justify-center text-sm transition">
                  🐟
                </div>
                <span className="text-[8px] text-zinc-400 group-hover:text-lime uppercase font-semibold transition">
                  Peixe
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('explorar', 'sopas')}
                className="flex flex-col items-center gap-1 group cursor-pointer touch-btn"
              >
                <div className="w-8 h-8 rounded-full bg-zinc-800 group-hover:bg-zinc-700 flex items-center justify-center text-sm transition">
                  🍲
                </div>
                <span className="text-[8px] text-zinc-400 group-hover:text-lime uppercase font-semibold transition">
                  Sopas
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('explorar', 'doces')}
                className="flex flex-col items-center gap-1 group cursor-pointer touch-btn"
              >
                <div className="w-8 h-8 rounded-full bg-zinc-800 group-hover:bg-zinc-700 flex items-center justify-center text-sm transition">
                  🍮
                </div>
                <span className="text-[8px] text-zinc-400 group-hover:text-lime uppercase font-semibold transition">
                  Doces
                </span>
              </button>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* COLUNA DIREITA */}
        {/* ========================================================================= */}
        <div className="flex flex-col gap-4">
          
          {/* Card: Bitesync Scan */}
          <div 
            onClick={() => onNavigateTab('scan')} 
            className="bento-card p-5 cursor-pointer hover:bg-zinc-900 border border-zinc-800/80 transition touch-btn group"
          >
            <ScanLine className="w-5 h-5 text-lime mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-1 group-hover:text-lime transition-colors">
              Bitesync<br />Scan
            </h3>
            <p className="text-[10px] text-zinc-500 font-mono">
              Cód. Barras & Rótulos
            </p>
          </div>

          {/* Card: Meta Diária / Calorias Diárias */}
          <div 
            onClick={() => onNavigateTab('macros')}
            className="bento-card p-5 flex flex-col justify-between border border-zinc-800/80 cursor-pointer hover:border-zinc-700 transition touch-btn"
          >
            <div className="flex justify-between items-start mb-2">
              <Heart className="w-5 h-5 text-zinc-400" />
              <span className="text-[10px] text-lime font-bold tracking-widest font-mono">
                {caloriePercentage}% META
              </span>
            </div>
            
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 leading-tight">
              Calorias<br />Diárias
            </h3>
            
            <div className="w-full bg-black rounded-full h-1.5 mb-2 overflow-hidden border border-zinc-800">
              <div 
                className="bg-lime h-1.5 rounded-full transition-all duration-500" 
                style={{ width: `${caloriePercentage}%` }}
              />
            </div>
            <span className="text-[10px] text-zinc-400 font-mono">
              {currentKcal} / {targetKcal} kcal
            </span>
          </div>

          {/* Card: Ementa Semanal */}
          <div className="bento-card p-5 border border-zinc-800/80 flex flex-col justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 leading-tight">
              Plano Semanal<br />Ementa
            </h3>
            
            {/* Lista com Vistos e Barras */}
            <div className="flex flex-col gap-3 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-lime flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-black stroke-[3]" />
                </div>
                <div className="h-2 w-16 bg-zinc-600 rounded-full" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded border border-zinc-700 shrink-0" />
                <div className="h-2 w-20 bg-zinc-800 rounded-full" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded border border-zinc-700 shrink-0" />
                <div className="h-2 w-12 bg-zinc-800 rounded-full" />
              </div>
            </div>

            <button 
              type="button"
              onClick={() => onNavigateTab('ementa')}
              className="text-[11px] font-bold text-lime flex items-center gap-1 uppercase tracking-wider hover:opacity-80 transition cursor-pointer touch-btn"
            >
              <span>Gerar Ementa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
