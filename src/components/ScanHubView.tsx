/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ScanLine, 
  Tag, 
  Apple, 
  Search, 
  Loader2, 
  ShieldCheck, 
  Scale, 
  Sparkles, 
  Barcode, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { lookupOpenFoodFacts } from '../services/apiService';
import { OpenFoodFactsProduct } from '../types/cookbook';
import { useCalorieTracker } from '../context/CalorieContext';
import { LabelStudio } from './LabelStudio';
import { FruitGuideView } from './FruitGuideView';

type ScanSubTab = 'barcode' | 'rotulos' | 'frutas';

export const ScanHubView: React.FC = () => {
  const { addCalorieEntry } = useCalorieTracker();
  const [activeSubTab, setActiveSubTab] = useState<ScanSubTab>('barcode');
  const [searchQuery, setSearchQuery] = useState<string>('5601009123456');
  const [productData, setProductData] = useState<OpenFoodFactsProduct | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasAddedToLog, setHasAddedToLog] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string>('');

  const quickBarcodes = [
    { label: 'Marmelada Tradicional', code: '5601009123456' },
    { label: 'Queijo de Ovelha Curado', code: '5602345678901' },
    { label: 'Azeite Virgem Extra', code: '5601009941103' },
    { label: 'Compota de Figo', code: '5609998887771' },
  ];

  const handleScan = async (codeToSearch: string) => {
    if (!codeToSearch.trim()) return;
    setIsLoading(true);
    setHasAddedToLog(false);
    setFeedbackMsg('');

    try {
      const data = await lookupOpenFoodFacts(codeToSearch.trim());
      setProductData(data);
      if (!data) {
        setFeedbackMsg('Produto não encontrado na base de dados global.');
      }
    } catch (err) {
      console.warn('Erro ao ler Open Food Facts:', err);
      setFeedbackMsg('Falha de conexão com a base Open Food Facts.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProductToMacros = () => {
    if (!productData) return;
    const kcal = productData.nutriments?.['energy-kcal_100g'] || 180;
    const prot = productData.nutriments?.proteins_100g || 4;
    const carbs = productData.nutriments?.carbohydrates_100g || 25;
    const fat = productData.nutriments?.fat_100g || 5;

    addCalorieEntry({
      title: productData.product_name || 'Alimento Lido por Código de Barras',
      category: 'ingrediente',
      portionDescription: `1 dose de 100g (${productData.brands || 'Marca'})`,
      portions: 1,
      grams: 100,
      calories: kcal,
      protein: prot,
      carbs: carbs,
      fat: fat,
    });

    setHasAddedToLog(true);
  };

  const getNutriScoreColor = (grade?: string) => {
    switch (grade?.toUpperCase()) {
      case 'A': return 'bg-emerald-500 text-slate-950 font-black shadow-[0_0_12px_rgba(16,185,129,0.5)]';
      case 'B': return 'bg-lime-500 text-slate-950 font-black';
      case 'C': return 'bg-amber-400 text-slate-950 font-black';
      case 'D': return 'bg-orange-500 text-white font-black';
      case 'E': return 'bg-rose-500 text-white font-black';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. SELETOR MODULAR DE SUB-ABAS BENTO */}
      <div className="bg-card rounded-[28px] p-5 border border-gray-800 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 text-neon">
            <ScanLine className="w-6 h-6 stroke-[2.4]" />
            <h3 className="font-bold text-base tracking-wide text-white">BiteSync Scan Studio</h3>
          </div>
          <p className="text-xs text-gray-400 mb-4">
            Leitor de códigos de barras, gerador de rótulos e análise botânica
          </p>
        </div>

        {/* Segmented Control Touch */}
        <div className="flex gap-2 mb-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveSubTab('barcode')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all touch-btn cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 shadow ${
              activeSubTab === 'barcode'
                ? 'bg-neon text-black'
                : 'bg-input border border-gray-700 text-gray-300 hover:text-white'
            }`}
          >
            <Barcode className="w-4 h-4" />
            <span>Scanner Open Food Facts</span>
          </button>

          <button
            onClick={() => setActiveSubTab('rotulos')}
            className={`py-2.5 px-4 rounded-xl text-xs font-semibold transition-all touch-btn cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 ${
              activeSubTab === 'rotulos'
                ? 'bg-neon text-black font-bold shadow'
                : 'bg-input border border-gray-700 text-gray-300 hover:text-white'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Rótulos</span>
          </button>

          <button
            onClick={() => setActiveSubTab('frutas')}
            className={`py-2.5 px-4 rounded-xl text-xs font-semibold transition-all touch-btn cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 ${
              activeSubTab === 'frutas'
                ? 'bg-neon text-black font-bold shadow'
                : 'bg-input border border-gray-700 text-gray-300 hover:text-white'
            }`}
          >
            <Apple className="w-4 h-4" />
            <span>Frutas</span>
          </button>
        </div>

        {/* Input de Código de Barras no Scanner */}
        {activeSubTab === 'barcode' && (
          <div className="bg-input rounded-2xl p-4 border border-gray-800 space-y-3">
            <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">
              Leitura de Código de Barras / Pesquisa
            </label>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleScan(searchQuery);
              }}
              className="space-y-3"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="5601009123456"
                  className="w-full bg-card border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-xs font-mono text-white focus:outline-none focus:border-neon"
                />
                <Barcode className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              </div>

              <button
                type="submit"
                disabled={isLoading || !searchQuery.trim()}
                className="w-full bg-neon text-black font-bold py-3 rounded-xl text-xs flex justify-center items-center gap-2 shadow disabled:opacity-50 touch-btn cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    <span>A Analisar...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 stroke-[2.5]" />
                    <span>Analisar Alimento</span>
                  </>
                )}
              </button>
            </form>

            {/* Exemplos Rápidos */}
            <div className="pt-2">
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2">
                Exemplos rápidos:
              </p>
              <div className="flex flex-wrap gap-2">
                {quickBarcodes.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      setSearchQuery(item.code);
                      handleScan(item.code);
                    }}
                    className="bg-card border border-gray-800 hover:border-neon text-gray-300 hover:text-white text-xs px-3 py-1.5 rounded-xl font-sans transition-all touch-btn cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Resultado da Análise do Alimento */}
      {activeSubTab === 'barcode' && (
        <div className="space-y-4">
          {productData && (
            <div className="bento-card p-6 sm:p-7 bg-[#131C2E] border-emerald-500/40 space-y-5 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-mono font-bold text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-lg border border-slate-800">
                      EAN: {productData.code}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold">
                      {productData.brands}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    {productData.product_name}
                  </h3>
                </div>

                {/* Nutri-Score & Nova Group */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
                      Nutri-Score
                    </span>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black ${getNutriScoreColor(productData.nutriscore_grade)}`}>
                      {productData.nutriscore_grade || 'C'}
                    </div>
                  </div>

                  {productData.nova_group && (
                    <div className="text-center">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
                        Grupo Nova
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-sm font-bold text-slate-200">
                        Nível {productData.nova_group}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tabela de Macronutrientes por 100g */}
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold block mb-3">
                  Tabela Nutricional por 100g
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 text-center">
                    <span className="text-[11px] text-slate-400 block mb-0.5">Energia</span>
                    <span className="text-lg font-black text-emerald-400 font-mono">
                      {productData.nutriments?.['energy-kcal_100g'] || 180} kcal
                    </span>
                  </div>
                  <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 text-center">
                    <span className="text-[11px] text-rose-400 font-bold block mb-0.5">Proteínas</span>
                    <span className="text-lg font-black text-white font-mono">
                      {productData.nutriments?.proteins_100g || 4}g
                    </span>
                  </div>
                  <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 text-center">
                    <span className="text-[11px] text-cyan-400 font-bold block mb-0.5">Hidratos</span>
                    <span className="text-lg font-black text-white font-mono">
                      {productData.nutriments?.carbohydrates_100g || 25}g
                    </span>
                  </div>
                  <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 text-center">
                    <span className="text-[11px] text-amber-400 font-bold block mb-0.5">Lípidos</span>
                    <span className="text-lg font-black text-white font-mono">
                      {productData.nutriments?.fat_100g || 5}g
                    </span>
                  </div>
                </div>
              </div>

              {/* Lista de Ingredientes */}
              {productData.ingredients_text && (
                <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1">
                  <span className="font-bold text-slate-200 block uppercase font-mono text-[10px]">
                    Ingredientes Declarados:
                  </span>
                  <p className="leading-relaxed">{productData.ingredients_text}</p>
                </div>
              )}

              {/* Botão de Adição ao Módulo de Macros */}
              <button
                type="button"
                onClick={handleAddProductToMacros}
                className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg touch-btn cursor-pointer transition-all ${
                  hasAddedToLog
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                    : 'bg-emerald-400 hover:bg-emerald-300 text-slate-950'
                }`}
              >
                {hasAddedToLog ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                    <span>✓ Adicionado ao BiteSync Macros (+{productData.nutriments?.['energy-kcal_100g'] || 180} kcal)!</span>
                  </>
                ) : (
                  <>
                    <Scale className="w-4 h-4 stroke-[2.5]" />
                    <span>Adicionar 1 Dose (100g) ao BiteSync Macros</span>
                  </>
                )}
              </button>
            </div>
          )}

          {feedbackMsg && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{feedbackMsg}</span>
            </div>
          )}
        </div>
      )}

      {/* 3. SUB-ABA: ATELIER DE RÓTULOS DE FRASCOS & CONSERVAS */}
      {activeSubTab === 'rotulos' && (
        <LabelStudio />
      )}

      {/* 4. SUB-ABA: GUIA BOTÂNICO DE FRUTAS */}
      {activeSubTab === 'frutas' && (
        <FruitGuideView />
      )}
    </div>
  );
};
