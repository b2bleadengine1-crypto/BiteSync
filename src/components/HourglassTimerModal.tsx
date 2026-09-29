/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { playAntiqueKitchenChime } from '../utils/timeParser';
import { 
  Hourglass, 
  Play, 
  Pause, 
  RotateCcw, 
  X, 
  Bell, 
  Plus, 
  Flame, 
  Minimize2, 
  Maximize2,
  Timer
} from 'lucide-react';

interface HourglassTimerModalProps {
  initialMinutes: number;
  isOpen: boolean;
  onClose: () => void;
  stepContext?: string;
  contextSnippet?: string;
  contextTitle?: string;
}

export const HourglassTimerModal: React.FC<HourglassTimerModalProps> = ({
  initialMinutes,
  isOpen,
  onClose,
  stepContext,
  contextSnippet,
  contextTitle,
}) => {
  const displayContext = stepContext || contextSnippet;
  const [totalSeconds, setTotalSeconds] = useState<number>(initialMinutes * 60);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isHandsOnMode, setIsHandsOnMode] = useState<boolean>(true);
  const [wakeLockActive, setWakeLockActive] = useState<boolean>(false);

  const wakeLockSentinelRef = useRef<any>(null);

  // Reinicia contagem se initialMinutes mudar
  useEffect(() => {
    const sec = Math.max(1, initialMinutes * 60);
    setTotalSeconds(sec);
    setSecondsRemaining(sec);
    setIsRunning(true);
  }, [initialMinutes, isOpen]);

  // Contagem decrescente
  useEffect(() => {
    let timer: number | null = null;
    if (isOpen && isRunning && secondsRemaining > 0) {
      timer = window.setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            playAntiqueKitchenChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isOpen, isRunning, secondsRemaining]);

  // Modo Mãos na Massa (WakeLock)
  useEffect(() => {
    const requestWakeLock = async () => {
      if (isHandsOnMode && isOpen && 'wakeLock' in navigator) {
        try {
          wakeLockSentinelRef.current = await (navigator as any).wakeLock.request('screen');
          setWakeLockActive(true);
          wakeLockSentinelRef.current.addEventListener('release', () => {
            setWakeLockActive(false);
          });
        } catch (err) {
          console.warn('WakeLock não suportado ou negado:', err);
          setWakeLockActive(false);
        }
      } else if (wakeLockSentinelRef.current) {
        wakeLockSentinelRef.current.release().catch(() => {});
        wakeLockSentinelRef.current = null;
        setWakeLockActive(false);
      }
    };

    requestWakeLock();

    return () => {
      if (wakeLockSentinelRef.current) {
        wakeLockSentinelRef.current.release().catch(() => {});
      }
    };
  }, [isHandsOnMode, isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const progressRatio = totalSeconds > 0 ? (totalSeconds - secondsRemaining) / totalSeconds : 0;
  const isFinished = secondsRemaining === 0;

  const handleAddMinutes = (min: number) => {
    const extraSec = min * 60;
    setTotalSeconds((prev) => prev + extraSec);
    setSecondsRemaining((prev) => prev + extraSec);
  };

  const handleReset = () => {
    setSecondsRemaining(totalSeconds);
    setIsRunning(false);
  };

  return (
    <>
      {/* Modo Minimizado: Barra Flutuante Translúcida */}
      {isMinimized ? (
        <div className="fixed bottom-20 left-4 z-50 no-print flex items-center gap-3 bg-slate-900/95 border border-emerald-500/50 px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-xl text-white">
          <Timer
            className={`w-4 h-4 text-emerald-400 ${isRunning ? 'animate-pulse' : ''}`}
          />
          <span className="font-mono font-bold text-sm text-emerald-400 tracking-wider">
            {formattedTime}
          </span>
          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-emerald-400 touch-btn cursor-pointer"
            title={isRunning ? 'Pausar' : 'Continuar'}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={() => setIsMinimized(false)}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white touch-btn cursor-pointer"
            title="Expandir Temporizador"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        /* Modo Expandido: Bento Modal Moderno */
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md no-print animate-in fade-in duration-200">
          <div className="w-full max-w-sm sm:max-w-md bg-[#131C2E] border border-slate-700 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-6 text-slate-100 relative overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Glow Neon Superior */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

            {/* Cabeçalho */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <Hourglass className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white tracking-tight">
                    Temporizador de Cozinha
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {contextTitle ? contextTitle : 'Alarme sonoro ao terminar'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsMinimized(true)}
                  className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors touch-btn cursor-pointer"
                  title="Minimizar para o canto"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors touch-btn cursor-pointer"
                  title="Fechar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Contexto do Passo Culinário */}
            {displayContext && (
              <div className="mb-4 p-3 bg-slate-900/80 border border-slate-800 rounded-2xl text-xs text-slate-300 leading-relaxed line-clamp-2">
                "{displayContext}"
              </div>
            )}

            {/* Mostrador Central Moderno */}
            <div className="py-4 flex flex-col items-center justify-center">
              
              {/* Barra Circular de Progresso Neon */}
              <div className="w-48 h-48 rounded-full border border-slate-800 flex flex-col items-center justify-center relative bg-slate-950/60 shadow-2xl">
                
                {/* Dígitos Grandes em Fonte Mono */}
                <div className="font-mono font-black text-4xl text-white tracking-wider">
                  {formattedTime}
                </div>

                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mt-1">
                  {isFinished ? 'Tempo Esgotado!' : isRunning ? 'A cozinhar...' : 'Em pausa'}
                </div>

                {/* Anel de Progresso Exterior SVG em Verde Neon */}
                <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                  <circle
                    cx="96"
                    cy="96"
                    r="90"
                    stroke="#1e293b"
                    strokeWidth="5"
                    fill="transparent"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="90"
                    stroke={isFinished ? '#10B981' : '#10B981'}
                    strokeWidth="5"
                    fill="transparent"
                    strokeDasharray="565"
                    strokeDashoffset={565 * (1 - progressRatio)}
                    strokeLinecap="round"
                    className="transition-all duration-1000 shadow-[0_0_15px_#10B981]"
                  />
                </svg>
              </div>

              {/* Botão de Campainha Manual */}
              <button
                type="button"
                onClick={playAntiqueKitchenChime}
                className="mt-3.5 flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors touch-btn cursor-pointer"
                title="Testar campainha sonora de alerta"
              >
                <Bell className="w-3.5 h-3.5 text-emerald-400" />
                <span>Testar Sinal Sonoro</span>
              </button>
            </div>

            {/* Ações Rápidas de Ajuste de Minutos */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                type="button"
                onClick={() => handleAddMinutes(1)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono font-bold flex items-center justify-center gap-1.5 touch-btn cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-400" />
                <span>+1 minuto</span>
              </button>
              <button
                type="button"
                onClick={() => handleAddMinutes(5)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono font-bold flex items-center justify-center gap-1.5 touch-btn cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-400" />
                <span>+5 minutos</span>
              </button>
            </div>

            {/* Botões Principais Largos (Touch-Friendly) */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleReset}
                className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all touch-btn cursor-pointer shrink-0"
                title="Reiniciar tempo"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setIsRunning(!isRunning)}
                className={`flex-1 py-3.5 px-5 rounded-2xl text-sm font-black flex items-center justify-center gap-2 transition-all touch-btn cursor-pointer shadow-lg ${
                  isRunning
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Pausar Contagem</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>{isFinished ? 'Repetir Contagem' : 'Iniciar Contagem'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Alternador: Modo Mãos na Massa (WakeLock) */}
            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <Flame className={`w-4 h-4 ${isHandsOnMode ? 'text-emerald-400' : 'text-slate-500'}`} />
                <div>
                  <span className="font-bold text-white block text-xs">
                    Manter Ecrã Ligado
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {wakeLockActive ? 'Ecrã ativo enquanto cozinha' : 'Evita que o telemóvel bloqueie'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsHandsOnMode(!isHandsOnMode)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none touch-btn ${
                  isHandsOnMode ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-slate-950 shadow-md ring-0 transition duration-200 ease-in-out ${
                    isHandsOnMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
