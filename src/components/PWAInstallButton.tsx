/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { 
  Download, 
  Smartphone, 
  Share2, 
  PlusSquare, 
  X, 
  Check, 
  ShieldCheck, 
  Sparkles,
  MoreVertical
} from 'lucide-react';

interface PWAInstallButtonProps {
  variant?: 'header' | 'footer' | 'card';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'header' }) => {
  const { isInstalled, isInstallable, isIOS, isAndroid, install } = usePWAInstall();
  const [showModal, setShowModal] = useState<boolean>(false);

  // Se a aplicação já estiver instalada em modo standalone, exibe o emblema real
  if (isInstalled) {
    if (variant === 'header') {
      return (
        <span 
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neon/10 border border-neon/30 text-neon text-xs font-semibold"
          title="Aplicação instalada no dispositivo"
        >
          <Check className="w-3.5 h-3.5 text-neon" />
          <span className="hidden sm:inline">App Instalada</span>
          <span className="sm:hidden">Instalada</span>
        </span>
      );
    }
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-neon/10 border border-neon/30 text-neon text-xs font-semibold shadow-sm">
        <ShieldCheck className="w-4 h-4 text-neon" />
        <span>Aplicação Instalada com Sucesso no Ecrã Principal</span>
      </div>
    );
  }

  const handleClick = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (!accepted) {
        setShowModal(true);
      }
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      {variant === 'card' ? (
        <div className="bg-card rounded-[28px] p-5 border border-gray-800 flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 border border-neon rounded-2xl flex items-center justify-center text-neon bg-neon/10 shrink-0">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">Instalar no seu Telemóvel ✨</h4>
              <p className="text-xs text-gray-400 leading-snug">Acesso instantâneo sem barras de navegador e modo offline.</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={handleClick}
            className="w-full bg-neon text-black font-bold py-3.5 rounded-2xl text-xs uppercase tracking-wider flex justify-center items-center gap-2 shadow cursor-pointer touch-btn"
          >
            <Download className="w-4 h-4" />
            Instalar Aplicação
          </button>
        </div>
      ) : variant === 'header' ? (
        <button
          type="button"
          onClick={handleClick}
          className="bg-zinc-900 text-white rounded-full px-4 py-2 text-[11px] font-bold tracking-wide uppercase border border-zinc-800 hover:border-lime transition flex items-center gap-1.5 touch-btn cursor-pointer whitespace-nowrap"
          title="Instalar App no dispositivo"
        >
          <Download className="w-3.5 h-3.5 text-lime" />
          <span>Instalar App</span>
        </button>
      ) : (
        <div className="my-4 p-5 rounded-3xl bg-card border border-gray-800 shadow-xl max-w-xl mx-auto text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-neon/15 border border-neon/30 flex items-center justify-center text-neon shrink-0 shadow-[0_0_15px_rgba(0,229,127,0.2)]">
                <Smartphone className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  <span>Instalar no seu Telemóvel</span>
                  <Sparkles className="w-3.5 h-3.5 text-neon" />
                </h4>
                <p className="text-xs text-gray-400">
                  Acesso instantâneo sem barras de navegador e modo offline
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClick}
              className="w-full sm:w-auto px-5 py-3 bg-neon text-black text-xs font-black rounded-2xl shadow-[0_0_20px_rgba(0,229,127,0.3)] transition-all touch-btn whitespace-nowrap cursor-pointer"
            >
              📲 Instalar Aplicação
            </button>
          </div>
        </div>
      )}

      {/* Modal Guia de Instalação PWA Moderno */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md no-print font-sans animate-in fade-in duration-200"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="w-full max-w-md bg-[#131C2E] border border-slate-700 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-6 text-slate-100 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Topo do Modal */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white tracking-tight">
                    Instalação no Ecrã Principal
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Progressive Web App (PWA)
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors touch-btn cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conteúdo Conforme Dispositivo */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 py-1">
              
              {/* Instruções para Apple iOS (Safari) */}
              {isIOS ? (
                <div className="space-y-3">
                  <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex items-center gap-2.5 text-xs text-emerald-400">
                    <span className="text-xl">🍏</span>
                    <span>Dispositivo Apple (iPhone / iPad) detetado no Safari</span>
                  </div>

                  <p className="leading-relaxed text-xs text-slate-300">
                    Para instalar como aplicação nativa no seu iPhone ou iPad, siga estes 2 passos:
                  </p>

                  <div className="space-y-2.5">
                    <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <strong className="text-white block mb-0.5">
                          Toque no ícone Partilhar do Safari
                        </strong>
                        <span className="text-slate-400 text-xs flex items-center gap-1">
                          Na barra inferior do Safari, toque no botão <Share2 className="w-3.5 h-3.5 text-emerald-400 inline" /> <strong>Partilhar</strong>.
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <strong className="text-white block mb-0.5">
                          Escolha "Adicionar ao Ecrã Principal"
                        </strong>
                        <span className="text-slate-400 text-xs flex items-center gap-1">
                          Deslize para baixo e selecione <PlusSquare className="w-3.5 h-3.5 text-emerald-400 inline" /> <strong>Adicionar ao Ecrã Principal</strong>.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Instruções para Android / Chrome / Desktop */
                <div className="space-y-3">
                  <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex items-center gap-2.5 text-xs text-emerald-400">
                    <span className="text-xl">🤖</span>
                    <span>Android & Navegadores Chromium</span>
                  </div>

                  {isInstallable && (
                    <button
                      type="button"
                      onClick={async () => {
                        await install();
                        setShowModal(false);
                      }}
                      className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 transition-all touch-btn cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Instalar Agora Diretamente</span>
                    </button>
                  )}

                  <p className="leading-relaxed text-xs text-slate-300">
                    Para instalar manualmente no navegador:
                  </p>

                  <div className="space-y-2.5">
                    <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <strong className="text-white block mb-0.5">
                          Abra o menu do navegador
                        </strong>
                        <span className="text-slate-400 text-xs flex items-center gap-1">
                          Toque no ícone de menu <MoreVertical className="w-3.5 h-3.5 text-emerald-400 inline" /> no canto superior.
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <strong className="text-white block mb-0.5">
                          Selecione "Instalar Aplicação"
                        </strong>
                        <span className="text-slate-400 text-xs">
                          Escolha <strong>"Instalar aplicação"</strong> ou <strong>"Adicionar ao ecrã inicial"</strong>.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>O ícone ficará acessível no seu ecrã inicial com modo offline e sincronização local.</span>
              </div>
            </div>

            {/* Rodapé do Modal */}
            <div className="pt-4 mt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors touch-btn cursor-pointer"
              >
                Compreendi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
