/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VintageLabelConfig } from '../types/cookbook';
import { PRESET_LABELS } from '../data/vintageLabels';
import { lookupOpenFoodFacts } from '../services/apiService';
import { useCalorieTracker } from '../context/CalorieContext';
import { 
  Tag, 
  Printer, 
  Sparkles, 
  RotateCcw, 
  Barcode, 
  Search, 
  Scale, 
  QrCode,
  Sliders,
  CheckCircle2
} from 'lucide-react';

interface LabelStudioProps {
  initialProductName?: string;
}

export const LabelStudio: React.FC<LabelStudioProps> = ({ initialProductName }) => {
  const { addCalorieEntry } = useCalorieTracker();
  const [labelConfig, setLabelConfig] = useState<VintageLabelConfig>(() => {
    if (initialProductName) {
      return {
        ...PRESET_LABELS[0],
        productName: `Compota Fina de ${initialProductName}`,
      };
    }
    return PRESET_LABELS[0];
  });

  const [printCopies, setPrintCopies] = useState<number>(4);
  const [activeStudioTab, setActiveStudioTab] = useState<'creator' | 'lookup'>('creator');
  const [barcodeSearch, setBarcodeSearch] = useState<string>('');
  const [isSearchingBarcode, setIsSearchingBarcode] = useState<boolean>(false);
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);

  const estimatedLabelKcal = labelConfig.nutrition?.calories || 160;

  const handleOpenFoodFactsLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcodeSearch.trim()) return;

    setIsSearchingBarcode(true);
    setSearchFeedback(null);
    try {
      const prod = await lookupOpenFoodFacts(barcodeSearch.trim());
      if (prod) {
        setLabelConfig({
          ...labelConfig,
          productName: prod.product_name || labelConfig.productName,
          subtitle: `${prod.brands || 'Colheita Própria'} · Nutri-Score ${prod.nutriscore_grade || 'C'}`,
          ingredients: prod.ingredients_text ? prod.ingredients_text.slice(0, 140) : labelConfig.ingredients,
          barcode: prod.code,
          nutriscore: prod.nutriscore_grade,
          nutrition: {
            calories: prod.nutriments?.['energy-kcal_100g'] || 180,
            protein: prod.nutriments?.proteins_100g || 2.5,
            carbs: prod.nutriments?.carbohydrates_100g || 35,
            fat: prod.nutriments?.fat_100g || 1.5,
            servingSize: '100g',
          },
        });
        setSearchFeedback(`✓ Produto localizado: ${prod.product_name}`);
      } else {
        setSearchFeedback('Produto não encontrado online. Aplicada predefinição local.');
      }
    } catch {
      setSearchFeedback('Aviso: modo offline ativado.');
    } finally {
      setIsSearchingBarcode(false);
    }
  };

  const handleSendToCalories = () => {
    addCalorieEntry({
      title: labelConfig.productName,
      category: 'rotulo',
      portionDescription: '1 dose de conserva (40g)',
      portions: 1,
      calories: Math.round(estimatedLabelKcal * 0.4),
      protein: Math.round((labelConfig.nutrition?.protein || 1) * 0.4 * 10) / 10,
      carbs: Math.round((labelConfig.nutrition?.carbs || 30) * 0.4 * 10) / 10,
      fat: Math.round((labelConfig.nutrition?.fat || 0.2) * 0.4 * 10) / 10,
    });
  };

  const inkColorStyles: Record<string, { border: string; text: string; bg: string; accent: string }> = {
    emerald: {
      border: 'border-emerald-500/60',
      text: 'text-emerald-300',
      bg: 'bg-emerald-950/40',
      accent: '#10B981',
    },
    cyan: {
      border: 'border-cyan-500/60',
      text: 'text-cyan-300',
      bg: 'bg-cyan-950/40',
      accent: '#06B6D4',
    },
    orange: {
      border: 'border-orange-500/60',
      text: 'text-orange-300',
      bg: 'bg-orange-950/40',
      accent: '#F97316',
    },
    charcoal: {
      border: 'border-slate-700',
      text: 'text-slate-200',
      bg: 'bg-slate-900/90',
      accent: '#E2E8F0',
    },
    burgundy: {
      border: 'border-rose-500/60',
      text: 'text-rose-300',
      bg: 'bg-rose-950/40',
      accent: '#F43F5E',
    },
    sepia: {
      border: 'border-amber-500/60',
      text: 'text-amber-300',
      bg: 'bg-amber-950/40',
      accent: '#F59E0B',
    },
  };

  const currentTheme = inkColorStyles[labelConfig.inkColor] || inkColorStyles.emerald;

  const handleApplyPreset = (preset: typeof PRESET_LABELS[0]) => {
    setLabelConfig({
      ...preset,
      preparedDate: 'Outubro 2026',
      expirationDate: 'Outubro 2027',
      showQrCode: true,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const renderLabelCard = (config: VintageLabelConfig, theme: typeof currentTheme) => {
    return (
      <div 
        className={`w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl border-2 ${theme.border} ${theme.bg} shadow-md flex flex-col justify-between relative overflow-hidden`}
        style={{ minHeight: '260px' }}
      >
        <div className="text-center pb-2 border-b border-current/20">
          <span className="text-[10px] uppercase font-mono tracking-widest block font-bold" style={{ color: theme.accent }}>
            {(config.category || 'CONSERVA').toUpperCase()} · LOTE {config.batchCode || '01'}
          </span>
          <h2 className="text-lg sm:text-xl font-black mt-1 leading-snug" style={{ color: theme.accent }}>
            {config.productName}
          </h2>
          <p className="text-xs font-medium opacity-85 mt-0.5" style={{ color: theme.accent }}>
            {config.subtitle}
          </p>
        </div>

        <div className="py-2.5 text-center space-y-1">
          <p className="text-xs font-semibold" style={{ color: theme.accent }}>
            {config.makerNote} · Ano: {config.vintageYear}
          </p>
          <div className="flex items-center justify-center gap-2 text-[10px] font-mono opacity-80" style={{ color: theme.accent }}>
            {config.preparedDate && <span>Fab: {config.preparedDate}</span>}
            {config.expirationDate && <span>· Val: {config.expirationDate}</span>}
            <span>·</span>
            <span className="font-bold border border-current px-1 rounded">
              {config.nutrition?.calories || 120} kcal / dose
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-current/20 flex items-center justify-between gap-2">
          <div className="flex-1 text-left">
            <p className="text-[10px] leading-tight line-clamp-1" style={{ color: theme.accent }}>
              <strong>Ingr:</strong> {config.ingredients}
            </p>
            <p className="text-[9px] italic opacity-80" style={{ color: theme.accent }}>
              "{config.grandmotherAdvice}"
            </p>
          </div>

          {config.showQrCode && (
            <div className="shrink-0 p-1 rounded bg-white/80 border border-current shadow-xs flex flex-col items-center">
              <QrCode className="w-6 h-6" style={{ color: theme.accent }} />
              <span className="text-[6px] font-mono font-bold" style={{ color: theme.accent }}>
                CULINARY
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-20 font-sans">
      
      {/* 1. CABEÇALHO DO MÓDULO */}
      <div className="border-b border-slate-800 pb-4 no-print">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2">
          <Tag className="w-3.5 h-3.5" />
          <span>Módulo III · Gerador & Atelier de Rótulos</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Atelier de Rótulos para Conservas & Frascos
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Personalize e imprima etiquetas modernas para compotas, azeites aromatizados, conservas e especiarias.
        </p>
      </div>

      {/* 2. SUB-ABAS: CRIADOR VS PESQUISA OPEN FOOD FACTS */}
      <div className="flex items-center gap-2 no-print">
        <button
          type="button"
          onClick={() => setActiveStudioTab('creator')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all touch-btn cursor-pointer ${
            activeStudioTab === 'creator'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 inline mr-1.5" />
          <span>Personalizar Rótulo</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveStudioTab('lookup')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all touch-btn cursor-pointer ${
            activeStudioTab === 'lookup'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Barcode className="w-3.5 h-3.5 inline mr-1.5" />
          <span>Consultar Open Food Facts PT</span>
        </button>
      </div>

      {/* Pesquisa Open Food Facts */}
      {activeStudioTab === 'lookup' && (
        <div className="bento-card p-4 sm:p-5 bg-[#131C2E] border-slate-800 space-y-3 no-print">
          <form onSubmit={handleOpenFoodFactsLookup} className="flex gap-2">
            <div className="relative flex-1">
              <Barcode className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={barcodeSearch}
                onChange={(e) => setBarcodeSearch(e.target.value)}
                placeholder="Código de barras ou nome do produto (ex: 560... ou 'Marmelada')..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>
            <button
              type="submit"
              disabled={isSearchingBarcode}
              className="px-4 py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs touch-btn"
            >
              {isSearchingBarcode ? 'A Pesquisar...' : 'Pesquisar'}
            </button>
          </form>

          {searchFeedback && (
            <p className="text-xs text-emerald-400 font-medium">
              {searchFeedback}
            </p>
          )}
        </div>
      )}

      {/* 3. PREDEFINIÇÕES RÁPIDAS (BENTO CARD) */}
      <div className="bento-card p-4 sm:p-5 bg-slate-900/40 border-slate-800 space-y-2.5 no-print">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
          Predefinições Rápidas:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {PRESET_LABELS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleApplyPreset(preset)}
              className="text-left p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors touch-btn"
            >
              <strong className="text-xs font-bold text-white block truncate">
                {preset.productName}
              </strong>
              <span className="text-[11px] text-slate-400 block truncate">
                {preset.subtitle}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. WORKSPACE: EDITOR & PREVIEW BENTO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 no-print">
        
        {/* Painel do Editor */}
        <div className="lg:col-span-7 bento-card p-5 sm:p-6 bg-[#131C2E] border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>Personalizar Campos do Rótulo</span>
            </h2>
            <span className="text-xs text-slate-500 font-mono">Emissão Direta</span>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Nome do Produto:</label>
            <input
              type="text"
              value={labelConfig.productName}
              onChange={(e) => setLabelConfig({ ...labelConfig, productName: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white outline-none focus:border-emerald-500 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Subtítulo / Proveniência:</label>
            <input
              type="text"
              value={labelConfig.subtitle}
              onChange={(e) => setLabelConfig({ ...labelConfig, subtitle: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Ano / Safra:</label>
              <input
                type="text"
                value={labelConfig.vintageYear}
                onChange={(e) => setLabelConfig({ ...labelConfig, vintageYear: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Produtor / Casa:</label>
              <input
                type="text"
                value={labelConfig.makerNote}
                onChange={(e) => setLabelConfig({ ...labelConfig, makerNote: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Data Preparação:</label>
              <input
                type="text"
                value={labelConfig.preparedDate || ''}
                onChange={(e) => setLabelConfig({ ...labelConfig, preparedDate: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Validade Recomendada:</label>
              <input
                type="text"
                value={labelConfig.expirationDate || ''}
                onChange={(e) => setLabelConfig({ ...labelConfig, expirationDate: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Calorias (kcal/dose):</label>
              <input
                type="number"
                value={labelConfig.nutrition?.calories || 120}
                onChange={(e) =>
                  setLabelConfig({
                    ...labelConfig,
                    nutrition: {
                      ...(labelConfig.nutrition || { protein: 1, carbs: 30, fat: 0.2 }),
                      calories: parseInt(e.target.value) || 0,
                    },
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Cor do Rótulo:</label>
              <select
                value={labelConfig.inkColor}
                onChange={(e) => setLabelConfig({ ...labelConfig, inkColor: e.target.value as any })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
              >
                <option value="emerald">Verde Esmeralda (Neon)</option>
                <option value="cyan">Ciano Tecnológico</option>
                <option value="orange">Laranja Vibrante</option>
                <option value="charcoal">Preto Grafite / Carvão</option>
                <option value="burgundy">Bordô Moderno</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Lista de Ingredientes:</label>
            <textarea
              rows={2}
              value={labelConfig.ingredients}
              onChange={(e) => setLabelConfig({ ...labelConfig, ingredients: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Pré-visualização do Rótulo & Ações */}
        <div className="lg:col-span-5 bento-card p-5 sm:p-6 bg-[#131C2E] border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h2 className="text-base font-bold text-white">Pré-visualização do Rótulo</h2>
              <span className="text-xs text-emerald-400 font-mono font-semibold">Tamanho Real</span>
            </div>

            {renderLabelCard(labelConfig, currentTheme)}
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Cópias por folha de impressão:</span>
              <div className="flex items-center gap-1.5 font-mono">
                {[2, 4, 6].map((c) => (
                  <button
                    key={c}
                    onClick={() => setPrintCopies(c)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all touch-btn ${
                      printCopies === c
                        ? 'bg-emerald-500 text-slate-950 font-black'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 touch-btn cursor-pointer shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir ({printCopies}x)</span>
              </button>

              <button
                type="button"
                onClick={handleSendToCalories}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 text-xs font-bold flex items-center justify-center gap-2 touch-btn cursor-pointer"
              >
                <Scale className="w-4 h-4" />
                <span>+ Calorias</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grelha de Impressão (Apenas visível ao imprimir em papel) */}
      <div className="print-only">
        <div className="grid grid-cols-2 gap-6 p-4">
          {Array.from({ length: printCopies }).map((_, index) => (
            <div key={index} className="printable-label-card">
              {renderLabelCard(labelConfig, currentTheme)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
