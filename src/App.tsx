/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveNavTab, Recipe } from './types/cookbook';
import { CalorieProvider, useCalorieTracker } from './context/CalorieContext';
import { Header } from './components/Header';
import { BottomNavBar } from './components/BottomNavBar';
import { HomeDashboardView } from './components/HomeDashboardView';
import { RecipeCatalog } from './components/RecipeCatalog';
import { RecipeDetail } from './components/RecipeDetail';
import { ScanHubView } from './components/ScanHubView';
import { MealPlannerView } from './components/MealPlannerView';
import { CalorieTrackerView } from './components/CalorieTrackerView';
import { AddRecipeView } from './components/AddRecipeView';
import { SideMenuDrawer } from './components/SideMenuDrawer';
import { TechnicalDossierModal } from './components/TechnicalDossierModal';
import { PWAInstallButton } from './components/PWAInstallButton';
import { CheckCircle2 } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('inicio');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
  
  const { toastMessage } = useCalorieTracker();

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setSelectedRecipe(null);
  };

  const handleTabChange = (tab: ActiveNavTab, preselectedCategory?: string) => {
    if (preselectedCategory) {
      setSelectedCategory(preselectedCategory);
    }
    setActiveTab(tab);
    setSelectedRecipe(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-dvh flex flex-col bg-[#050505] text-white">
      
      {/* 1. Header Minimalista Superior BiteSync com Menu Hambúrguer */}
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenDossier={() => setIsDossierOpen(true)}
        onToggleMenu={() => setIsSideMenuOpen(!isSideMenuOpen)}
      />

      {/* Toast Notificação Moderna com Glow Neon */}
      {toastMessage && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#131c2a]/95 text-neon border border-neon/40 px-4 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl flex items-center gap-3 text-xs sm:text-sm font-semibold">
            <div className="w-6 h-6 rounded-full bg-neon/20 flex items-center justify-center text-neon shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* 2. Área de Conteúdo Principal (Bento Layout) */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-28 safe-area-container">
        
        {/* Visualização de Receita Selecionada */}
        {selectedRecipe ? (
          <RecipeDetail
            recipe={selectedRecipe}
            onBack={handleBackToCatalog}
          />
        ) : (
          <>
            {/* 1. 🏠 Início: Layout Bento Box com receita em destaque e categorias */}
            {(activeTab === 'inicio' || activeTab === 'home') && (
              <HomeDashboardView
                onSelectRecipe={handleSelectRecipe}
                onNavigateTab={(tab, cat) => handleTabChange(tab, cat)}
              />
            )}

            {/* 2. 🔍 Explorar: Catálogo de receitas do mundo e filtro inteligente Despensa */}
            {(activeTab === 'explorar' || activeTab === 'receitas' || activeTab === 'search') && (
              <RecipeCatalog 
                onSelectRecipe={handleSelectRecipe}
                initialCategory={selectedCategory}
              />
            )}

            {/* 3. ➕ Add: Criar Receita Personalizada / Instalar */}
            {activeTab === 'add' && (
              <AddRecipeView 
                onRecipeSaved={handleSelectRecipe}
                onOpenScanner={() => handleTabChange('scan')}
              />
            )}

            {/* 3b. 📷 Scan: Botão central com Scanner Open Food Facts, Rótulos e Frutas */}
            {(activeTab === 'scan' || activeTab === 'rotulos' || activeTab === 'frutas') && (
              <ScanHubView />
            )}

            {/* 4. 📅 Ementa: Gerador de Ementa Semanal e Lista de Compras */}
            {(activeTab === 'ementa' || activeTab === 'planner') && (
              <MealPlannerView onSelectRecipe={handleSelectRecipe} />
            )}

            {/* 5. 📊 Macros: Conta Calorias, gráfico de meta e resumo */}
            {(activeTab === 'macros' || activeTab === 'calorias') && (
              <CalorieTrackerView />
            )}
          </>
        )}

        {/* Banner de Instalação PWA Moderno */}
        <div className="mt-8 no-print">
          <PWAInstallButton variant="footer" />
        </div>
      </main>

      {/* 3. Rodapé Minimalista BiteSync */}
      <footer className="no-print border-t border-gray-800 py-6 px-4 text-center text-xs text-gray-400 pb-28 safe-area-footer">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-bold text-gray-200">
            BiteSync — Smart Bento Kitchen, Macros & Nutrition Studio
          </p>
          <div className="flex items-center gap-3 text-gray-500 font-mono text-[11px]">
            <span>Fast Mobile UX</span>
            <span>·</span>
            <span>Zero Slop</span>
            <span>·</span>
            <span className="text-neon font-semibold">Dark Mode</span>
          </div>
        </div>
      </footer>

      {/* 4. Barra de Navegação Inferior Dinâmica */}
      <BottomNavBar 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        onToggleMenu={() => setIsSideMenuOpen(!isSideMenuOpen)}
      />

      {/* 5. Menu Lateral Deslizante (Drawer) */}
      <SideMenuDrawer
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        onNavigateTab={handleTabChange}
        onOpenDossier={() => setIsDossierOpen(true)}
      />

      {/* 6. Modal do Dossier Técnico */}
      <TechnicalDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />
    </div>
  );
}

export function App() {
  return (
    <CalorieProvider>
      <AppContent />
    </CalorieProvider>
  );
}

export default App;
