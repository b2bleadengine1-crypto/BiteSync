/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ActiveNavTab } from '../types/cookbook';
import { 
  Home, 
  Search, 
  Plus, 
  CalendarDays, 
  Menu 
} from 'lucide-react';

interface BottomNavBarProps {
  activeTab: ActiveNavTab;
  onTabChange: (tab: ActiveNavTab) => void;
  onToggleMenu: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ 
  activeTab, 
  onTabChange,
  onToggleMenu,
}) => {
  return (
    <nav 
      aria-label="Navegação Principal BiteSync"
      className="fixed bottom-0 left-0 right-0 w-full bg-[#050505]/95 backdrop-blur-md border-t border-zinc-900 px-6 py-4 flex justify-between items-end z-40 pb-6 safe-area-bottom-nav no-print"
    >
      <div className="max-w-md mx-auto w-full flex items-end justify-between">
        
        {/* 1. Home */}
        <button
          type="button"
          onClick={() => onTabChange('inicio')}
          className={`nav-item flex flex-col items-center cursor-pointer transition touch-btn group ${
            activeTab === 'inicio' || activeTab === 'home' ? 'text-lime' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Home className="w-6 h-6 mb-1 transition-colors" />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        {/* 2. Search */}
        <button
          type="button"
          onClick={() => onTabChange('explorar')}
          className={`nav-item flex flex-col items-center cursor-pointer transition touch-btn group ${
            activeTab === 'explorar' || activeTab === 'receitas' || activeTab === 'search' ? 'text-lime' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Search className="w-6 h-6 mb-1 transition-colors" />
          <span className="text-[10px] font-bold">Search</span>
        </button>

        {/* 3. Add (Botão Central Circular) */}
        <div className="flex flex-col items-center cursor-pointer relative" onClick={() => onTabChange('add')}>
          <div className="w-12 h-12 bg-[#111111] rounded-full border border-zinc-800 flex items-center justify-center mb-1 hover:border-lime transition-colors group touch-btn">
            <Plus className="w-6 h-6 text-white group-hover:text-lime transition-colors" />
          </div>
          <span className="text-[10px] font-bold text-zinc-500 absolute -bottom-4">
            Add
          </span>
        </div>

        {/* 4. Planner */}
        <button
          type="button"
          onClick={() => onTabChange('ementa')}
          className={`nav-item flex flex-col items-center cursor-pointer transition touch-btn group ${
            activeTab === 'ementa' || activeTab === 'planner' ? 'text-lime' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <CalendarDays className="w-6 h-6 mb-1 transition-colors" />
          <span className="text-[10px] font-bold">Planner</span>
        </button>

        {/* 5. Menu */}
        <button
          type="button"
          onClick={onToggleMenu}
          className="nav-item flex flex-col items-center cursor-pointer transition touch-btn text-zinc-500 hover:text-zinc-300 group"
        >
          <Menu className="w-6 h-6 mb-1 transition-colors" />
          <span className="text-[10px] font-bold">Menu</span>
        </button>
      </div>
    </nav>
  );
};
