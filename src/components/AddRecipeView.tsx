/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Recipe } from '../types/cookbook';
import { useCalorieTracker } from '../context/CalorieContext';
import { 
  Camera, 
  Upload, 
  Plus, 
  Check, 
  Clock, 
  Users, 
  Flame, 
  ChefHat, 
  ScanLine,
  Sparkles
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface AddRecipeViewProps {
  onRecipeSaved: (recipe: Recipe) => void;
  onOpenScanner?: () => void;
}

export const AddRecipeView: React.FC<AddRecipeViewProps> = ({
  onRecipeSaved,
  onOpenScanner,
}) => {
  const { addCalorieEntry } = useCalorieTracker();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<'petiscos' | 'sopas' | 'peixes' | 'carnes' | 'doces' | 'aves'>('carnes');
  const [prepTime, setPrepTime] = useState<number>(20);
  const [cookTime, setCookTime] = useState<number>(30);
  const [servings, setServings] = useState<number>(4);
  const [calories, setCalories] = useState<number>(420);
  const [protein, setProtein] = useState<number>(28);
  const [ingredientsText, setIngredientsText] = useState('');
  const [stepsText, setStepsText] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string>('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const PRESET_PHOTOS = [
    { label: 'Guisado / Carne', url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80' },
    { label: 'Salada / Bowl', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80' },
    { label: 'Massa / Prato', url: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=400&q=80' },
    { label: 'Sobremesa', url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Converte linhas de texto em ingredientes
    const rawIngs = ingredientsText.split('\n').filter((l) => l.trim().length > 0);
    const ingredients = rawIngs.length > 0 
      ? rawIngs.map((l) => ({ item: l.trim(), amount: '1 dose', estimatedGrams: 100 }))
      : [
          { item: 'Ingrediente principal a gosto', amount: '250g', estimatedGrams: 250 },
          { item: 'Azeite e temperos', amount: '2 colheres', estimatedGrams: 30 },
        ];

    // Converte linhas de passos
    const rawSteps = stepsText.split('\n').filter((l) => l.trim().length > 0);
    const steps = rawSteps.length > 0
      ? rawSteps.map((s, idx) => ({
          stepNumber: idx + 1,
          portugueseText: s.trim(),
        }))
      : [
          { stepNumber: 1, portugueseText: 'Prepare os ingredientes com carinho e reserve numa bancada limpa.' },
          { stepNumber: 2, portugueseText: 'Cozinhe em lume brando até apurar todos os aromas característicos.' },
          { stepNumber: 3, portugueseText: 'Retire do lume e sirva fumegante decorado a gosto.' }
        ];

    const newRecipe: Recipe = {
      id: `custom-${Date.now()}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: title.trim(),
      originalTitle: title.trim(),
      subtitle: subtitle.trim() || 'Receita personalizada criada no BiteSync Studio',
      category,
      prepTimeMinutes: prepTime,
      cookTimeMinutes: cookTime,
      servings,
      difficulty: 'Fácil',
      difficultyLevel: 'Fácil',
      dropCapLetter: title.trim()[0]?.toUpperCase() || 'R',
      tags: ['Personalizada', 'BiteSync', 'Minhas Receitas'],
      nutrition: {
        calories,
        protein,
        carbs: Math.round(calories * 0.45 / 4),
        fat: Math.round(calories * 0.3 / 9),
        fiber: 3.5,
        servingSize: `1 dose (${servings} no total)`,
      },
      ingredients,
      steps,
      pantrySecret: 'A paixão de quem cozinha é sempre o melhor tempero!',
      originalSourceTitle: 'Criação Própria BiteSync',
      originalSourceUrl: 'https://bitesync.app',
    };

    // Guarda na storage local
    try {
      const existing = JSON.parse(localStorage.getItem('bitesync_custom_recipes') || '[]');
      existing.unshift(newRecipe);
      localStorage.setItem('bitesync_custom_recipes', JSON.stringify(existing));
    } catch (_) {}

    setIsSaved(true);
    setTimeout(() => {
      onRecipeSaved(newRecipe);
    }, 600);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* VISTA 3: ADD / INSTALAR NO SEU TELEMÓVEL */}
      <PWAInstallButton variant="card" />

      {/* Título com Destaque Néon */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            Create<br />
            <span className="text-neon">Custom Recipe</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Adiciona as tuas próprias receitas ao acervo pessoal do BiteSync
          </p>
        </div>

        {onOpenScanner && (
          <button
            type="button"
            onClick={onOpenScanner}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-zinc-800 text-neon border border-zinc-700 text-xs font-bold hover:border-neon transition cursor-pointer touch-btn"
          >
            <ScanLine className="w-4 h-4" />
            <span className="hidden sm:inline">Scan Rótulo</span>
          </button>
        )}
      </div>

      {/* Formulário Principal em Cartão Bento */}
      <form onSubmit={handleSave} className="bg-card border border-zinc-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
        
        {/* Área de Fotografia / Upload */}
        <div className="relative">
          <label className="w-full h-36 border-2 border-dashed border-zinc-700 hover:border-neon rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:text-white transition cursor-pointer overflow-hidden relative group">
            {photoUrl ? (
              <img 
                src={photoUrl} 
                alt="Pré-visualização" 
                className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
              />
            ) : null}
            
            <div className={`absolute inset-0 bg-black/40 flex flex-col items-center justify-center ${photoUrl ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'} transition-opacity`}>
              <Upload className="w-7 h-7 mb-1.5 text-neon" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                {photoUrl ? 'Alterar Fotografia' : 'Upload Photo'}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono mt-0.5">
                Clica para escolher imagem
              </span>
            </div>
            
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload} 
              className="hidden" 
            />
          </label>

          {/* Atalhos Rápidos de Fotos de Exemplo */}
          <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1">
            <span className="text-[10px] text-zinc-500 font-mono shrink-0 mr-1">Presets:</span>
            {PRESET_PHOTOS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPhotoUrl(p.url)}
                className="text-[10px] bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 px-2.5 py-1 rounded-full shrink-0 border border-zinc-700/60 hover:text-neon"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Título da Receita */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
            Nome do Prato *
          </label>
          <input 
            type="text" 
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="ex: Bacalhau Gratinado da Família" 
            className="w-full bg-[#09090b] border border-zinc-800 rounded-xl py-3 px-4 text-sm text-white placeholder-zinc-500 focus:border-neon outline-none transition"
          />
        </div>

        {/* Subtítulo / Descrição Curta */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
            Descrição Curta / Subtítulo
          </label>
          <input 
            type="text" 
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="ex: Um clássico de domingo com natas frescas e batata aos cubos" 
            className="w-full bg-[#09090b] border border-zinc-800 rounded-xl py-3 px-4 text-sm text-white placeholder-zinc-500 focus:border-neon outline-none transition"
          />
        </div>

        {/* Categoria & Doses */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
              Categoria
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full bg-[#09090b] border border-zinc-800 rounded-xl py-3 px-3 text-xs sm:text-sm text-white focus:border-neon outline-none cursor-pointer"
            >
              <option value="carnes">Carnes & Caça</option>
              <option value="peixes">Peixe & Marisco</option>
              <option value="petiscos">Petiscos & Entradas</option>
              <option value="sopas">Sopas & Caldos</option>
              <option value="doces">Doces & Sobremesas</option>
              <option value="aves">Aves</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
              Rendimento (Doses)
            </label>
            <input 
              type="number" 
              min={1} 
              max={20}
              value={servings}
              onChange={(e) => setServings(Number(e.target.value))}
              className="w-full bg-[#09090b] border border-zinc-800 rounded-xl py-3 px-4 text-sm text-white focus:border-neon outline-none"
            />
          </div>
        </div>

        {/* Tempos & Calorias Estimadas */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-[#09090b] p-2.5 rounded-xl border border-zinc-800">
            <span className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">Prep</span>
            <input 
              type="number"
              min={5}
              max={240}
              value={prepTime}
              onChange={(e) => setPrepTime(Number(e.target.value))}
              className="w-full bg-transparent text-center font-mono font-bold text-white text-sm outline-none"
            />
            <span className="text-[10px] text-zinc-500">minutos</span>
          </div>

          <div className="bg-[#09090b] p-2.5 rounded-xl border border-zinc-800">
            <span className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">Cozedura</span>
            <input 
              type="number"
              min={0}
              max={360}
              value={cookTime}
              onChange={(e) => setCookTime(Number(e.target.value))}
              className="w-full bg-transparent text-center font-mono font-bold text-white text-sm outline-none"
            />
            <span className="text-[10px] text-zinc-500">minutos</span>
          </div>

          <div className="bg-[#09090b] p-2.5 rounded-xl border border-zinc-800">
            <span className="text-[10px] text-neon uppercase font-bold block mb-1">Calorias</span>
            <input 
              type="number"
              min={50}
              max={2500}
              value={calories}
              onChange={(e) => setCalories(Number(e.target.value))}
              className="w-full bg-transparent text-center font-mono font-bold text-neon text-sm outline-none"
            />
            <span className="text-[10px] text-zinc-500">kcal/dose</span>
          </div>
        </div>

        {/* Lista de Ingredientes (Textarea simples) */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
            Lista de Ingredientes (um por linha)
          </label>
          <textarea 
            rows={4}
            value={ingredientsText}
            onChange={(e) => setIngredientsText(e.target.value)}
            placeholder="500g de carne picada ou lombo&#10;2 dentes de alho picados&#10;1 cebola média laminada&#10;4 colheres de azeite virgem extra&#10;Sal e pimenta a gosto" 
            className="w-full bg-[#09090b] border border-zinc-800 rounded-xl py-3 px-4 text-xs sm:text-sm text-white placeholder-zinc-600 focus:border-neon outline-none leading-relaxed"
          />
        </div>

        {/* Passos de Confeção */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
            Instruções de Confeção (um passo por linha)
          </label>
          <textarea 
            rows={4}
            value={stepsText}
            onChange={(e) => setStepsText(e.target.value)}
            placeholder="Passo 1: Comece por dourar o alho no azeite quente [⏳ 5 minutos].&#10;Passo 2: Junte a cebola e deixe amaciar em lume brando.&#10;Passo 3: Finalize com ervas frescas e sirva morno." 
            className="w-full bg-[#09090b] border border-zinc-800 rounded-xl py-3 px-4 text-xs sm:text-sm text-white placeholder-zinc-600 focus:border-neon outline-none leading-relaxed"
          />
        </div>

        {/* Botão Principal Salvar */}
        <button 
          type="submit"
          disabled={isSaved}
          className="w-full bg-neon text-black font-extrabold py-4 rounded-2xl mt-4 uppercase text-xs sm:text-sm tracking-wider shadow-neon hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer touch-btn"
        >
          {isSaved ? (
            <>
              <Check className="w-5 h-5 stroke-[3]" />
              <span>Receita Gravada com Sucesso!</span>
            </>
          ) : (
            <>
              <Plus className="w-5 h-5 stroke-[3]" />
              <span>Save Recipe</span>
            </>
          )}
        </button>

      </form>
    </div>
  );
};
