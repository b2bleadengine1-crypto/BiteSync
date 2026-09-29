/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  ScrollText, 
  ShieldCheck, 
  AlertTriangle, 
  Code2, 
  Copy, 
  Check, 
  Play, 
  FileText,
  Sparkles
} from 'lucide-react';
import { parseRecipeSteps, SAMPLE_BUGGY_RAW_RECIPE } from '../utils/recipeParser';

interface TechnicalDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechnicalDossierModal: React.FC<TechnicalDossierModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'visao' | 'diagnostico' | 'codigo' | 'tester'>('diagnostico');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Estado para o Testador Interativo de Parsing
  const [rawInput, setRawInput] = useState<string>(SAMPLE_BUGGY_RAW_RECIPE);
  const [parsedOutput, setParsedOutput] = useState<string[]>(() => parseRecipeSteps(SAMPLE_BUGGY_RAW_RECIPE));

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const runLiveTest = () => {
    const result = parseRecipeSteps(rawInput);
    setParsedOutput(result);
  };

  const jsCodeSnippet = `// 1. Limpa rótulos isolados ("STEP 1", "PASSO 2") e divide os passos corretamente
function parseRecipeSteps(rawInstructions) {
  if (!rawInstructions) return [];
  return rawInstructions
    .replace(/\\r\\n/g, '\\n')
    // Remove linhas que contêm apenas "STEP X" ou "PASSO X"
    .replace(/^\\s*(STEP|PASSO)\\s*\\d+\\s*:?\\s*$/gim, '')
    .split(/\\n+/)
    .map(step => step.replace(/^\\s*(STEP|PASSO)\\s*\\d+\\s*[:.-]?\\s*/i, '').trim())
    .filter(step => step.length > 3);
}

// 2. Traduz passo a passo individualmente para nunca exceder o limite de caracteres da API
async function translateStepsSafely(stepsArray, translateFn) {
  const translated = [];
  for (const step of stepsArray) {
    const result = await translateFn(step);
    translated.push(result);
  }
  return translated;
}`;

  const cssCodeSnippet = `/* 1. Contentor moderno com Dynamic Viewport Height e Safe Areas do iPhone */
.modern-scroll-container {
  overflow-y: auto !important;
  max-height: calc(100dvh - 90px);
  padding-bottom: calc(120px + env(safe-area-inset-bottom)) !important;
  box-sizing: border-box !important;
  -webkit-overflow-scrolling: touch;
}

/* 2. Cartão de passo bento flexível sem limite de altura */
.modern-step-card {
  height: auto !important;
  max-height: none !important;
  overflow: visible !important;
  word-break: break-word !important;
}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92dvh] bg-[#131C2E] text-slate-100 border border-slate-700 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Superior */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-12 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Cabeçalho do Dossier */}
        <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <ScrollText className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-emerald-400 font-mono font-semibold">
                Dossier Técnico de Engenharia & UX
              </p>
              <h2 className="font-extrabold text-base sm:text-lg text-white tracking-tight">
                BiteSync · Arquitetura & Soluções Modernas
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors touch-btn cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Separadores Internos do Dossier */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 bg-slate-950/60 overflow-x-auto">
          <button
            onClick={() => setActiveTab('diagnostico')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-colors whitespace-nowrap touch-btn cursor-pointer ${
              activeTab === 'diagnostico'
                ? 'bg-[#131C2E] text-emerald-400 border-t-2 border-x border-emerald-500/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Diagnóstico de Truncagem
          </button>
          <button
            onClick={() => setActiveTab('visao')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-colors whitespace-nowrap touch-btn cursor-pointer ${
              activeTab === 'visao'
                ? 'bg-[#131C2E] text-emerald-400 border-t-2 border-x border-emerald-500/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Estrutura Modular
          </button>
          <button
            onClick={() => setActiveTab('codigo')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-colors whitespace-nowrap touch-btn cursor-pointer ${
              activeTab === 'codigo'
                ? 'bg-[#131C2E] text-emerald-400 border-t-2 border-x border-emerald-500/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Código & Estilos
          </button>
          <button
            onClick={() => setActiveTab('tester')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-colors whitespace-nowrap touch-btn cursor-pointer ${
              activeTab === 'tester'
                ? 'bg-[#131C2E] text-emerald-400 border-t-2 border-x border-emerald-500/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            4. Laboratório de Parsing
          </button>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed modern-scroll-container">
          
          {/* TAB 1: DIAGNÓSTICO TÉCNICO */}
          {activeTab === 'diagnostico' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="font-extrabold text-lg text-white mb-1">
                  Diagnóstico Técnico: Porque é que os Passos Cortavam?
                </h3>
                <p className="text-xs text-slate-400">
                  A investigação técnica identificou duas causas combinadas na versão legada:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Causa A */}
                <div className="bento-card p-5 bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>CAUSA A: TRUNCAGEM NO PARSING DA API</span>
                  </div>
                  <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                    Na receita de peixe, o cartão 3 exibia o rótulo isolado <strong>PASSO 2</strong> e o cartão 4 terminava abruptamente a meio da frase.
                  </p>
                  <p className="text-xs text-slate-400 bg-slate-950/70 p-3 rounded-xl border border-slate-800 font-mono">
                    Isto ocorria quando instruções cruas de APIs eram separadas por newline simples e submetidas a blocos de tradução com limite de tokens.
                  </p>
                </div>

                {/* Causa B */}
                <div className="bento-card p-5 bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>CAUSA B: OVERFLOW CSS E MARGENS MOBILE</span>
                  </div>
                  <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                    Em ecrãs mobile com barra de navegação inferior fixa, cartões com altura restrita ficavam sobrepostos.
                  </p>
                  <p className="text-xs text-slate-400 bg-slate-950/70 p-3 rounded-xl border border-slate-800 font-mono">
                    A solução canónica aplica <code>padding-bottom: calc(120px + env(safe-area-inset-bottom))</code> e <code>overflow: visible !important</code>.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-2xl">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-emerald-300 font-bold text-sm mb-0.5">
                      Solução Canónica Definitiva:
                    </strong>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      1. Higienização por regex que elimina rótulos órfãos e divide apenas passos com substância.<br />
                      2. Tradução iterativa passo-a-passo individual para garantir integridade lexical.<br />
                      3. Design Bento Box com margens seguras e cartões auto-expansíveis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VISÃO GERAL */}
          {activeTab === 'visao' && (
            <div className="space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="font-extrabold text-lg text-white mb-1">
                  Estrutura e Módulos do Culinary Studio
                </h3>
                <p className="text-xs text-slate-400">
                  Organização modular focada na velocidade de utilização móvel (Bento Box Dashboard):
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/90 text-emerald-400 font-mono uppercase tracking-wider">
                    <tr>
                      <th className="p-3 border-b border-r border-slate-800">Módulo</th>
                      <th className="p-3 border-b border-r border-slate-800">Função</th>
                      <th className="p-3 border-b border-slate-800">Interface & Interação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-950/40">
                    <tr>
                      <td className="p-3 font-bold text-white border-r border-slate-800">I. Receitas</td>
                      <td className="p-3 text-slate-300 border-r border-slate-800">Catálogo e ecrã de detalhe com passos verificados na íntegra.</td>
                      <td className="p-3 text-slate-400">Círculos neon numerados, botões 100% largura para YouTube e Conta Calorias, síntese de voz.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white border-r border-slate-800">II. Frutas</td>
                      <td className="p-3 text-slate-300 border-r border-slate-800">Guia botânico de pectina, épocas de colheita e calculadora de calda.</td>
                      <td className="p-3 text-slate-400">Filtro por estação, estimativa de frascos e proporções ideais de açúcar.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white border-r border-slate-800">III. Rótulos</td>
                      <td className="p-3 text-slate-300 border-r border-slate-800">Atelier de personalização de etiquetas com consulta Open Food Facts PT.</td>
                      <td className="p-3 text-slate-400">Impressão A4 em grelha, códigos de barras e sincronização calórica.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white border-r border-slate-800">IV. Ementa</td>
                      <td className="p-3 text-slate-300 border-r border-slate-800">Gerador semanal a partir dos ingredientes que o utilizador já tem na despensa.</td>
                      <td className="p-3 text-slate-400">Chips de seleção rápida, separação Despensa vs Comprar, troca de pratos.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white border-r border-slate-800">V. Calorias</td>
                      <td className="p-3 text-slate-300 border-r border-slate-800">Balança de macronutrientes com metas de Défice, Manutenção ou Ganho.</td>
                      <td className="p-3 text-slate-400">Barras de progresso neon, histórico de refeições, conversor de porções.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white border-r border-slate-800">Música Real</td>
                      <td className="p-3 text-slate-300 border-r border-slate-800">Reprodutor de áudio real via iTunes API & Rádio Browser.</td>
                      <td className="p-3 text-slate-400">100% sem sintetizadores, capas reais, playlist contínua e pausa por omissão.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CÓDIGO CANÓNICO */}
          {activeTab === 'codigo' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm text-emerald-400 flex items-center gap-1.5">
                    <Code2 className="w-4 h-4" />
                    <span>Função JavaScript de Sanitização dos Passos</span>
                  </h4>
                  <button
                    onClick={() => copyToClipboard(jsCodeSnippet, 'js')}
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 touch-btn cursor-pointer"
                  >
                    {copiedCode === 'js' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'js' ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
                <pre className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs font-mono text-emerald-400 overflow-x-auto">
                  {jsCodeSnippet}
                </pre>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm text-emerald-400 flex items-center gap-1.5">
                    <Code2 className="w-4 h-4" />
                    <span>Estilos CSS Mobile Anti-Corte</span>
                  </h4>
                  <button
                    onClick={() => copyToClipboard(cssCodeSnippet, 'css')}
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 touch-btn cursor-pointer"
                  >
                    {copiedCode === 'css' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'css' ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
                <pre className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs font-mono text-cyan-400 overflow-x-auto">
                  {cssCodeSnippet}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: LABORATÓRIO DE TESTE DE PARSING */}
          {activeTab === 'tester' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-extrabold text-base text-white mb-1">
                  Laboratório Interativo de Higienização de Passos
                </h4>
                <p className="text-xs text-slate-400">
                  Teste o algoritmo em tempo real colando qualquer texto cru de receita:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Entrada Crua */}
                <div>
                  <div className="flex items-center justify-between mb-1.5 text-xs text-slate-400">
                    <span>Texto de Entrada da API:</span>
                    <button
                      onClick={() => setRawInput(SAMPLE_BUGGY_RAW_RECIPE)}
                      className="text-emerald-400 hover:underline cursor-pointer"
                    >
                      Restaurar Exemplo Problemático
                    </button>
                  </div>
                  <textarea
                    rows={8}
                    value={rawInput}
                    onChange={(e) => setRawInput(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={runLiveTest}
                    className="mt-2.5 flex items-center justify-center gap-2 w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-2xl shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all touch-btn cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Executar Higienização Canónica</span>
                  </button>
                </div>

                {/* Saída Processada */}
                <div>
                  <div className="flex items-center justify-between mb-1.5 text-xs text-slate-400">
                    <span>Cartões Resultantes ({parsedOutput.length} passos):</span>
                    <span className="text-emerald-400 font-mono text-[11px]">✓ Sem passos vazios</span>
                  </div>
                  <div className="h-[235px] overflow-y-auto bg-slate-950/80 border border-slate-800 rounded-2xl p-3 space-y-2">
                    {parsedOutput.map((step, idx) => (
                      <div key={idx} className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl text-xs">
                        <strong className="text-emerald-400 font-bold block mb-1">
                          Passo {idx + 1}:
                        </strong>
                        <p className="text-slate-300 line-clamp-3 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Rodapé do Modal */}
        <div className="px-6 py-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono text-[11px]">Dossier Técnico · Build 2026</span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors touch-btn cursor-pointer"
          >
            Fechar Janela
          </button>
        </div>
      </div>
    </div>
  );
};
