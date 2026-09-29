/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  COUNTRY_INFO_MAP,
  CountryInfo
} from '../data/countryConfigs';
import { 
  Compass, 
  X, 
  Check, 
  Globe2,
  Sparkles
} from 'lucide-react';

interface AntiqueAtlasModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRegion: string | null;
  onSelectRegion: (regionKey: string | null) => void;
}

interface RegionCard {
  key: string;
  name: string;
  flag: string;
  specialties: string;
  notes: string;
}

const ATLAS_REGIONS: RegionCard[] = [
  {
    key: 'Portuguese',
    name: 'Portugal & Tradição Atlântica',
    flag: '🇵🇹',
    specialties: 'Sopa da Pedra, Pastéis de Peixe, Marmelada Real, Ensopado de Borrego, Tarte de Maçã Bravo de Esmolfe.',
    notes: 'Aromas autênticos de azeite virgem, alho, coentros e doçaria tradicional apurada.',
  },
  {
    key: 'Italian',
    name: 'Itália & Bacia Mediterrânica',
    flag: '🇮🇹',
    specialties: 'Massas artesanais, Risottos de açafrão, Molhos rústicos de tomate com manjericão fresco.',
    notes: 'Tradição camponesa das cantinas, onde o aroma a alho dourado e queijo curado une as famílias.',
  },
  {
    key: 'French',
    name: 'França & Terras da Provença',
    flag: '🇫🇷',
    specialties: 'Caçarolas de caça, Confit suave, Caldos aveludados com ervas da Provença e manteiga de quinta.',
    notes: 'A arte das reduções lentas e a precisão técnica dos roux clássicos de manteiga.',
  },
  {
    key: 'British',
    name: 'Reino Unido & Ilhas Celtas',
    flag: '🇬🇧',
    specialties: 'Chicken & Mushroom Hotpot, Empadas rústicas de carne e legumes, Pães de cevada.',
    notes: 'Receituário robusto de conforto, pensado para aquecer o corpo com batatas e mostardas.',
  },
  {
    key: 'Spanish',
    name: 'Espanha & México Tradicional',
    flag: '🇪🇸',
    specialties: 'Guisados em panela de barro, pimentos fumados, caçarolas de grão e especiarias.',
    notes: 'O calor da pimenta e do azeite combinados com pimentão doce e frutos secos.',
  },
  {
    key: 'Default',
    name: 'Rotas do Mundo & Tradições Globais',
    flag: '🌍',
    specialties: 'Caldos de especiarias, arrozes perfumados, compotas agridoces e marinadas.',
    notes: 'O encanto dos ingredientes que cruzaram continentes para enriquecer os receituários familiares.',
  },
];

export const AntiqueAtlasModal: React.FC<AntiqueAtlasModalProps> = ({
  isOpen,
  onClose,
  selectedRegion,
  onSelectRegion,
}) => {
  if (!isOpen) return null;

  const handleChooseRegion = (regionKey: string) => {
    onSelectRegion(regionKey);
  };

  const handleClearRegion = () => {
    onSelectRegion(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md no-print font-sans animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-[#131C2E] border border-slate-700 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-5 sm:p-7 text-slate-100 max-h-[92dvh] flex flex-col relative animate-in zoom-in-95 duration-200">
        
        {/* Glow Superior */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-12 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Cabeçalho do Atlas */}
        <div className="relative z-10 flex items-center justify-between pb-4 mb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Compass className="w-5 h-5 text-emerald-400 animate-spin" style={{ animationDuration: '12s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  Atlas de Tradições Culinárias & Música
                </h2>
                <span className="text-[10px] uppercase font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/30 font-semibold">
                  Global
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Filtre receitas por tradição e sintonize gravações de estúdio e rádios culturais no Gramofone.
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

        {/* Barra de Estado do Filtro Ativo */}
        <div className="relative z-10 mb-4 bg-slate-900/80 p-3 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-2 shrink-0 text-xs">
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-400">Filtro Geográfico:</span>
            {selectedRegion ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                <span>{ATLAS_REGIONS.find((r) => r.key === selectedRegion)?.flag}</span>
                <span>{ATLAS_REGIONS.find((r) => r.key === selectedRegion)?.name}</span>
              </span>
            ) : (
              <span className="text-slate-300 font-medium">Todas as Regiões (Catálogo Completo)</span>
            )}
          </div>

          {selectedRegion && (
            <button
              type="button"
              onClick={handleClearRegion}
              className="text-xs text-emerald-400 hover:underline font-semibold cursor-pointer"
            >
              Limpar Filtro
            </button>
          )}
        </div>

        {/* Grelha de Regiões do Atlas */}
        <div className="relative z-10 flex-1 overflow-y-auto pr-1 space-y-3 modern-scroll-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {ATLAS_REGIONS.map((region) => {
              const isSelected = selectedRegion === region.key;
              const config = COUNTRY_INFO_MAP[region.key] || COUNTRY_INFO_MAP.Portuguese;

              return (
                <div
                  key={region.key}
                  onClick={() => handleChooseRegion(region.key)}
                  className={`group relative rounded-2xl p-4 sm:p-5 transition-all cursor-pointer border bento-card ${
                    isSelected
                      ? 'bg-slate-800/90 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  {/* Topo do Cartão de Região */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{region.flag}</span>
                      <div>
                        <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                          {region.name}
                        </h3>
                        <span className="text-[10px] font-mono text-emerald-400">
                          {config.region}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                        <Check className="w-3 h-3 text-emerald-400" /> Selecionado
                      </span>
                    )}
                  </div>

                  {/* Notas Culturais e Pratos */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {region.notes}
                  </p>

                  <div className="text-[11px] text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 mb-3">
                    <strong className="text-emerald-400 block mb-0.5">Pratos Canónicos da Tradição:</strong>
                    <span>{region.specialties}</span>
                  </div>

                  {/* Tradição Gastronómica */}
                  <div className="flex items-center justify-between text-[11px] font-mono pt-2 border-t border-slate-800 text-slate-400">
                    <span className="flex items-center gap-1.5 truncate">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{config.culturalNote}</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 shrink-0 ml-2 font-bold">
                      {config.region}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rodapé do Modal */}
        <div className="relative z-10 pt-4 mt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 shrink-0">
          <span className="font-mono text-[11px]">Bento Kitchen Studio · Atlas Cultural</span>
          <div className="flex items-center gap-2">
            {selectedRegion && (
              <button
                type="button"
                onClick={handleClearRegion}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors border border-slate-700 font-semibold touch-btn cursor-pointer"
              >
                Limpar Filtro
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-colors touch-btn cursor-pointer shadow-md"
            >
              Aplicar & Ver Receitas
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
