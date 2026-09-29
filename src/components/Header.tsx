/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ActiveNavTab } from '../types/cookbook';
import { Sparkles, ScrollText, Volume2, Menu } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { VoiceSelector } from './VoiceSelector';

interface HeaderProps {
  activeTab: ActiveNavTab;
  onTabChange: (tab: ActiveNavTab) => void;
  onOpenDossier: () => void;
  onToggleMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onTabChange,
  onOpenDossier,
  onToggleMenu,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-zinc-900 text-white safe-area-header no-print">
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-4 flex justify-between items-center relative z-0">
        
        {/* Brand Wordmark BITESYNC. com ponto Lime */}
        <button
          onClick={() => onTabChange('inicio')}
          className="text-left group flex items-center gap-2 focus:outline-none shrink-0 touch-btn cursor-pointer"
        >
          <h1 className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1 group-hover:text-zinc-200 transition-colors">
            BITESYNC<span className="text-lime text-3xl leading-none -mt-2">.</span>
          </h1>
        </button>

        {/* Zona Direita: Instalar & Hamburger Menu */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Seletor Compacto da Voz do Leitor (Desktop) */}
          <div className="hidden lg:block">
            <VoiceSelector compact />
          </div>

          {/* Botão de Instalação PWA Redesenhado */}
          <PWAInstallButton variant="header" />

          {/* Botão do Menu Hambúrguer */}
          {onToggleMenu && (
            <button 
              type="button"
              onClick={onToggleMenu} 
              className="text-zinc-400 hover:text-white p-2 bg-zinc-900 hover:bg-zinc-800 rounded-full border border-zinc-800 transition touch-btn cursor-pointer"
              title="Abrir Definições"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
