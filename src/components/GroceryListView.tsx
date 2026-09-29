/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { DailyMealPlan, MarketSectionKey, AggregatedGroceryItem } from '../types/cookbook';
import { MARKET_SECTIONS, aggregateWeeklyGroceryList } from '../utils/groceryAggregator';
import { 
  ShoppingBag, 
  Printer, 
  Copy, 
  Check, 
  Plus, 
  RotateCcw, 
  Search, 
  CheckSquare, 
  Square, 
  Users, 
  Calendar,
  Sparkles,
  Carrot,
  Beef,
  Fish,
  Egg,
  Wheat,
  Droplet,
  Wine,
  Trash2,
  ArrowLeft
} from 'lucide-react';

interface GroceryListViewProps {
  weeklyPlan: DailyMealPlan[];
  onBackToMenu: () => void;
}

export const GroceryListView: React.FC<GroceryListViewProps> = ({
  weeklyPlan,
  onBackToMenu,
}) => {
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 2, 3, 4, 5, 6, 7]);
  const [servingsMultiplier, setServingsMultiplier] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);
  
  // Custom items added by the user
  const [customItems, setCustomItems] = useState<AggregatedGroceryItem[]>([]);
  const [newCustomName, setNewCustomName] = useState<string>('');
  const [newCustomAmount, setNewCustomAmount] = useState<string>('Q.b.');
  const [newCustomSection, setNewCustomSection] = useState<MarketSectionKey>('hortifruti');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Checked state map: itemId -> boolean
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

  // 1. Gera a lista agregada dinâmica
  const aggregatedData = useMemo(() => {
    return aggregateWeeklyGroceryList(weeklyPlan, selectedDays, servingsMultiplier);
  }, [weeklyPlan, selectedDays, servingsMultiplier]);

  // 2. Funde itens agregados com itens customizados
  const fullSectionsData = useMemo(() => {
    const result: Record<MarketSectionKey, AggregatedGroceryItem[]> = {
      hortifruti: [...aggregatedData.hortifruti],
      talho: [...aggregatedData.talho],
      peixaria: [...aggregatedData.peixaria],
      lacticinios: [...aggregatedData.lacticinios],
      mercearia: [...aggregatedData.mercearia],
      condimentos: [...aggregatedData.condimentos],
      especiarias: [...aggregatedData.especiarias],
      adega: [...aggregatedData.adega],
    };

    for (const custom of customItems) {
      result[custom.section].push(custom);
    }

    return result;
  }, [aggregatedData, customItems]);

  // Contagem total e concluída
  const allItemsList = useMemo(() => {
    const list: AggregatedGroceryItem[] = [];
    for (const key of Object.keys(fullSectionsData) as MarketSectionKey[]) {
      list.push(...fullSectionsData[key]);
    }
    return list;
  }, [fullSectionsData]);

  const totalItemsCount = allItemsList.length;
  const checkedCount = allItemsList.filter((item) => !!checkedMap[item.id]).length;
  const progressPercent = totalItemsCount > 0 ? Math.round((checkedCount / totalItemsCount) * 100) : 0;

  const toggleItemChecked = (id: string) => {
    setCheckedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomName.trim()) return;

    const newItem: AggregatedGroceryItem = {
      id: `custom-${Date.now()}`,
      item: newCustomName.trim(),
      amount: newCustomAmount.trim() || 'Q.b.',
      section: newCustomSection,
      sourceRecipes: ['Adicionado Manualmente'],
      checked: false,
      isCustom: true,
    };

    setCustomItems((prev) => [...prev, newItem]);
    setNewCustomName('');
    setNewCustomAmount('Q.b.');
    setShowAddModal(false);
  };

  const handleDeleteCustomItem = (id: string) => {
    setCustomItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleDay = (dayNum: number) => {
    setSelectedDays((prev) => {
      if (prev.includes(dayNum)) {
        if (prev.length === 1) return prev;
        return prev.filter((d) => d !== dayNum);
      } else {
        return [...prev, dayNum].sort((a, b) => a - b);
      }
    });
  };

  const setPresetDays = (preset: 'all' | 'workdays' | 'weekend') => {
    if (preset === 'all') setSelectedDays([1, 2, 3, 4, 5, 6, 7]);
    if (preset === 'workdays') setSelectedDays([1, 2, 3, 4, 5]);
    if (preset === 'weekend') setSelectedDays([6, 7]);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    let text = `🛒 LISTA DE COMPRAS · CULINARY STUDIO\n`;
    text += `Ementa Semanal (${selectedDays.length} dias selecionados)\n`;
    text += `------------------------------------\n\n`;

    for (const sec of MARKET_SECTIONS) {
      const items = fullSectionsData[sec.key];
      if (items.length === 0) continue;

      text += `📍 ${sec.title.toUpperCase()}\n`;
      for (const it of items) {
        const checkMark = checkedMap[it.id] ? '✅' : '⬜';
        text += `${checkMark} ${it.item} (${it.amount})\n`;
      }
      text += `\n`;
    }

    navigator.clipboard.writeText(text);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  const getSectionIcon = (key: MarketSectionKey) => {
    switch (key) {
      case 'hortifruti': return <Carrot className="w-4 h-4 text-emerald-400" />;
      case 'talho': return <Beef className="w-4 h-4 text-rose-400" />;
      case 'peixaria': return <Fish className="w-4 h-4 text-cyan-400" />;
      case 'lacticinios': return <Egg className="w-4 h-4 text-amber-400" />;
      case 'mercearia': return <Wheat className="w-4 h-4 text-orange-400" />;
      case 'condimentos': return <Droplet className="w-4 h-4 text-indigo-400" />;
      case 'especiarias': return <Sparkles className="w-4 h-4 text-yellow-400" />;
      case 'adega': return <Wine className="w-4 h-4 text-purple-400" />;
    }
  };

  const dayNamesShort = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  return (
    <div className="w-full max-w-6xl mx-auto pb-20 font-sans">
      
      {/* Cabeçalho da Lista de Compras */}
      <div className="no-print mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Lista Agregada de Compras</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Lista de Compras da Feira & Supermercado
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Todos os ingredientes da Ementa Semanal organizados por secção de mercado com cálculo de porções.
            </p>
          </div>

          {/* Botões de Ação Principais */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all touch-btn cursor-pointer"
              title="Copiar lista para o WhatsApp ou notas"
            >
              {copiedSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedSuccess ? 'Copiado!' : 'Copiar'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md touch-btn cursor-pointer"
              title="Imprimir Lista"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir</span>
            </button>

            <button
              onClick={onBackToMenu}
              className="flex items-center gap-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-xl text-xs font-semibold transition-all touch-btn cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar</span>
            </button>
          </div>
        </div>

        {/* Barra de Filtros e Personalização (Bento Card) */}
        <div className="mt-4 bento-card p-5 sm:p-6 bg-[#131C2E] border-slate-800 space-y-4">
          
          {/* Linha 1: Seletor de Dias da Ementa */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs text-slate-300 font-semibold">
                Dias a Incluir:
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5, 6, 7].map((num, i) => {
                  const isSelected = selectedDays.includes(num);
                  return (
                    <button
                      key={num}
                      onClick={() => toggleDay(num)}
                      className={`px-2.5 py-1 text-xs font-mono font-bold rounded-xl transition-all touch-btn cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500 text-slate-950 shadow-sm'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {dayNamesShort[i]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Presets Rápidos de Dias */}
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <span>Atalhos:</span>
              <button
                onClick={() => setPresetDays('all')}
                className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium cursor-pointer"
              >
                7 Dias
              </button>
              <button
                onClick={() => setPresetDays('workdays')}
                className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium cursor-pointer"
              >
                Seg–Sex
              </button>
              <button
                onClick={() => setPresetDays('weekend')}
                className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium cursor-pointer"
              >
                Fim-de-Semana
              </button>
            </div>
          </div>

          {/* Linha 2: Multiplicador de Porções & Barra de Progresso */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-800">
            
            {/* Multiplicador de Comensais */}
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-300 font-semibold">Doses / Comensais:</span>
              <div className="flex items-center gap-1">
                {[
                  { factor: 0.5, label: '2 Doses' },
                  { factor: 1, label: '4 Doses (Padrão)' },
                  { factor: 1.5, label: '6 Doses' },
                  { factor: 2, label: '8 Doses' },
                ].map((item) => (
                  <button
                    key={item.factor}
                    onClick={() => setServingsMultiplier(item.factor)}
                    className={`px-2.5 py-1 text-xs font-mono font-bold rounded-xl transition-all touch-btn cursor-pointer ${
                      servingsMultiplier === item.factor
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Progresso de Compras */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs text-emerald-400 font-bold">
                  {checkedCount} de {totalItemsCount} comprados
                </span>
                <span className="text-[11px] font-mono text-slate-400 ml-1.5">
                  ({progressPercent}%)
                </span>
              </div>
              <div className="w-24 sm:w-32 bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300 shadow-[0_0_10px_#10B981]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Linha 3: Pesquisa & Botão Adicionar Item */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filtrar ingrediente (ex: batata, frango)..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCheckedMap({})}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-xs font-semibold transition-all touch-btn cursor-pointer"
                title="Desmarcar todos os itens"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpar Vistos</span>
              </button>

              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 rounded-xl text-xs font-bold transition-all touch-btn cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar Artigo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para Adicionar Item Avulso */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <form 
            onSubmit={handleAddCustomItem}
            className="w-full max-w-md bg-[#131C2E] border border-slate-700 rounded-3xl p-6 shadow-2xl text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-extrabold text-lg text-white mb-3 border-b border-slate-800 pb-3">
              Adicionar Item à Lista de Compras
            </h3>
            
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs text-slate-300 mb-1.5 font-medium">
                  Nome do Artigo:
                </label>
                <input
                  type="text"
                  required
                  value={newCustomName}
                  onChange={(e) => setNewCustomName(e.target.value)}
                  placeholder="Ex: Papel vegetal, Pão de centeio, Azeite virgem..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-300 mb-1.5 font-medium">
                    Quantidade:
                  </label>
                  <input
                    type="text"
                    value={newCustomAmount}
                    onChange={(e) => setNewCustomAmount(e.target.value)}
                    placeholder="Ex: 500g, 1 un, Q.b..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1.5 font-medium">
                    Secção de Mercado:
                  </label>
                  <select
                    value={newCustomSection}
                    onChange={(e) => setNewCustomSection(e.target.value as MarketSectionKey)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    {MARKET_SECTIONS.map((sec) => (
                      <option key={sec.key} value={sec.key}>
                        {sec.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-5 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold touch-btn cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl transition-colors touch-btn cursor-pointer"
              >
                Adicionar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grelha de Secções de Mercado na Interface Web (Bento Box Cards) */}
      <div className="no-print space-y-4">
        {MARKET_SECTIONS.map((sec) => {
          const allSectionItems = fullSectionsData[sec.key];
          const filteredItems = allSectionItems.filter((item) =>
            item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.sourceRecipes.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase()))
          );

          if (filteredItems.length === 0 && searchQuery) return null;

          const sectionCheckedCount = filteredItems.filter((i) => !!checkedMap[i.id]).length;
          const isSectionComplete = filteredItems.length > 0 && sectionCheckedCount === filteredItems.length;

          return (
            <div
              key={sec.key}
              className={`bento-card p-5 sm:p-6 bg-[#131C2E] border-slate-800 transition-all ${
                isSectionComplete ? 'opacity-60 bg-slate-900/50' : ''
              }`}
            >
              {/* Cabeçalho da Secção */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                    {getSectionIcon(sec.key)}
                  </div>
                  <div>
                    <h2 className="font-extrabold text-base sm:text-lg text-white flex items-center gap-2">
                      <span>{sec.title}</span>
                      <span className="text-xs font-mono font-normal text-slate-400">
                        ({filteredItems.length} {filteredItems.length === 1 ? 'artigo' : 'artigos'})
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400">
                      {sec.subtitle}
                    </p>
                  </div>
                </div>

                <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20 self-start sm:self-auto">
                  {sectionCheckedCount} de {filteredItems.length} comprados
                </div>
              </div>

              {/* Lista de Itens da Secção */}
              {filteredItems.length === 0 ? (
                <div className="text-center py-4 text-xs text-slate-500 italic">
                  Nenhum ingrediente requerido nesta secção para os dias selecionados.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {filteredItems.map((item) => {
                    const isChecked = !!checkedMap[item.id];

                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItemChecked(item.id)}
                        className={`flex items-start justify-between gap-3 p-3 rounded-2xl border transition-all cursor-pointer select-none touch-btn ${
                          isChecked
                            ? 'bg-slate-950/40 border-slate-800/60 text-slate-500'
                            : 'bg-slate-900/70 border-slate-800/80 hover:border-emerald-500/40 text-slate-200'
                        }`}
                      >
                        <div className="flex items-start gap-2.5 flex-1 min-w-0">
                          {/* Caixa de Verificação */}
                          <div className="mt-0.5 shrink-0">
                            {isChecked ? (
                              <CheckSquare className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-500" />
                            )}
                          </div>

                          {/* Nome e Quantidade */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-2">
                              <span className={`font-semibold text-xs sm:text-sm leading-snug truncate ${
                                isChecked ? 'line-through text-slate-500' : 'text-white'
                              }`}>
                                {item.item}
                              </span>
                              <span className="shrink-0 text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400">
                                {item.amount}
                              </span>
                            </div>

                            {/* Pratos de Origem */}
                            <div className="text-[11px] text-slate-400 mt-1 truncate">
                              <span>Pratos: </span>
                              <span className="text-slate-500">{item.sourceRecipes.join(', ')}</span>
                            </div>
                          </div>
                        </div>

                        {/* Botão Apagar para Itens Customizados */}
                        {item.isCustom && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCustomItem(item.id);
                            }}
                            className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                            title="Remover item avulso"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* FOLHA DE IMPRESSÃO FORMATADA PARA A FEIRA (@media print) */}
      <div className="hidden print:block print-only">
        <div className="text-center border-b-2 border-black pb-4 mb-6">
          <p className="text-xs uppercase tracking-widest text-gray-700">
            BiteSync · Smart Kitchen Studio
          </p>
          <h1 className="font-bold text-2xl uppercase tracking-wider text-black">
            Lista de Compras da Feira & Mercado
          </h1>
          <p className="text-xs text-gray-600 mt-1">
            Planeamento Semanal ({selectedDays.length} dias) · {servingsMultiplier === 1 ? '4 doses padrão' : `${servingsMultiplier * 4} doses`}
          </p>
        </div>

        <div className="space-y-6">
          {MARKET_SECTIONS.map((sec) => {
            const items = fullSectionsData[sec.key];
            if (items.length === 0) return null;

            return (
              <div key={sec.key} className="border border-gray-400 p-4 rounded-xl mb-4">
                <div className="flex items-center justify-between border-b border-gray-400 pb-1 mb-2">
                  <h2 className="font-bold text-sm uppercase tracking-wider text-black">
                    {sec.title}
                  </h2>
                  <span className="text-xs text-gray-600">
                    {items.length} artigos
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-2 py-0.5">
                      <span className="w-3.5 h-3.5 border border-black inline-block mt-0.5 shrink-0" />
                      <div>
                        <strong>{item.item}</strong> — <span className="font-mono">{item.amount}</span>
                        <div className="text-[10px] text-gray-600">({item.sourceRecipes.join(', ')})</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-4 border-t border-gray-400 text-center text-xs text-gray-600">
          Culinary Studio · Organizado por secções de mercado.
        </div>
      </div>

    </div>
  );
};
