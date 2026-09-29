/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Recipe } from '../types/cookbook';
import { CANONICAL_RECIPES } from '../data/canonicalRecipes';
import { 
  searchTheMealDBRecipes, 
  fetchTheMealDBRecipesByArea, 
  fetchDummyJsonRecipesPaginated 
} from '../services/apiService';
import { useCalorieTracker } from '../context/CalorieContext';
import { getYouTubeWatchUrl } from '../utils/videoUtils';
import { 
  Clock, 
  Users, 
  Search, 
  ShieldCheck, 
  Scale, 
  Play, 
  ChefHat, 
  Plus, 
  CookingPot, 
  Compass, 
  ChevronRight,
  ChevronDown,
  Loader2,
  Sparkles,
  Globe2
} from 'lucide-react';
import { AntiqueAtlasModal } from './AntiqueAtlasModal';

interface RecipeCatalogProps {
  onSelectRecipe: (recipe: Recipe) => void;
  onOpenVideo?: (recipe: Recipe) => void;
  initialCategory?: string;
}

type RecipeSourceTab = 'nativas' | 'mealdb' | 'dummyjson';

export interface CountryFilterItem {
  id: string;
  name: string;
  flag: string;
  theMealDbArea?: string;
  dummyJsonCuisine?: string;
}

export const COUNTRIES_CAROUSEL: CountryFilterItem[] = [
  { id: 'all', name: 'Todas', flag: '🌍' },
  { id: 'portugal', name: 'Portugal', flag: '🇵🇹', theMealDbArea: 'Portuguese' },
  { id: 'italia', name: 'Itália', flag: '🇮🇹', theMealDbArea: 'Italian', dummyJsonCuisine: 'Italian' },
  { id: 'franca', name: 'França', flag: '🇫🇷', theMealDbArea: 'French' },
  { id: 'japao', name: 'Japão', flag: '🇯🇵', theMealDbArea: 'Japanese', dummyJsonCuisine: 'Japanese' },
  { id: 'mexico', name: 'México', flag: '🇲🇽', theMealDbArea: 'Mexican', dummyJsonCuisine: 'Mexican' },
  { id: 'grecia', name: 'Grécia', flag: '🇬🇷', theMealDbArea: 'Greek', dummyJsonCuisine: 'Greek' },
  { id: 'espanha', name: 'Espanha', flag: '🇪🇸', theMealDbArea: 'Spanish' },
  { id: 'india', name: 'Índia', flag: '🇮🇳', theMealDbArea: 'Indian', dummyJsonCuisine: 'Indian' },
  { id: 'reino-unido', name: 'Reino Unido', flag: '🇬🇧', theMealDbArea: 'British' },
];

export const RecipeCatalog: React.FC<RecipeCatalogProps> = ({ 
  onSelectRecipe,
  onOpenVideo,
  initialCategory,
}) => {
  const { addCalorieEntry } = useCalorieTracker();
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [sourceTab, setSourceTab] = useState<RecipeSourceTab>('nativas');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pantryIngredients, setPantryIngredients] = useState<string[]>([]);
  const [customPantryInput, setCustomPantryInput] = useState<string>('');
  const [selectedAtlasRegion, setSelectedAtlasRegion] = useState<string | null>(null);
  const [isAtlasOpen, setIsAtlasOpen] = useState<boolean>(false);
  
  // External API & Pagination states
  const [apiRecipes, setApiRecipes] = useState<Recipe[]>([]);
  const [isLoadingApi, setIsLoadingApi] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [pageOffset, setPageOffset] = useState<number>(0);
  const [totalAvailable, setTotalAvailable] = useState<number>(0);

  const categories = [
    { id: 'todos', label: 'Todos os Pratos' },
    { id: 'petiscos', label: 'Petiscos & Entradas' },
    { id: 'sopas', label: 'Sopas & Caldos' },
    { id: 'peixes', label: 'Peixe & Marisco' },
    { id: 'carnes', label: 'Carnes & Caça' },
    { id: 'aves', label: 'Aves' },
    { id: 'doces', label: 'Doces Conventuais' },
  ];

  // 1. Alternância de País (Carrossel Horizontal)
  const handleSelectCountry = (country: CountryFilterItem) => {
    setSelectedCountry(country.id);
    setSelectedAtlasRegion(null);
    setPageOffset(0);

    // Se for Portugal, ativa receitas canónicas nativas; se internacional, ativa busca dinâmica
    if (country.id === 'portugal') {
      setSourceTab('nativas');
    } else if (country.id !== 'all') {
      setSourceTab('mealdb');
    }
  };

  // 2. Carrega receitas conforme País, Aba e Pesquisa
  useEffect(() => {
    let isMounted = true;

    async function loadRecipes() {
      // Se estiver em Portugal ou em canónicas
      if (selectedCountry === 'portugal' || sourceTab === 'nativas') {
        setApiRecipes(CANONICAL_RECIPES);
        setTotalAvailable(CANONICAL_RECIPES.length);
        return;
      }

      setIsLoadingApi(true);
      try {
        const countryConfig = COUNTRIES_CAROUSEL.find((c) => c.id === selectedCountry);

        if (countryConfig && countryConfig.theMealDbArea && sourceTab === 'mealdb') {
          // Busca por área na TheMealDB (ex: filter.php?a=Italian, etc.)
          const { recipes, total } = await fetchTheMealDBRecipesByArea(countryConfig.theMealDbArea, 0, 8);
          if (isMounted) {
            setApiRecipes(recipes);
            setTotalAvailable(total);
          }
        } else if (sourceTab === 'mealdb') {
          // Busca geral TheMealDB
          const meals = await searchTheMealDBRecipes(searchQuery);
          if (isMounted) {
            setApiRecipes(meals);
            setTotalAvailable(meals.length);
          }
        } else if (sourceTab === 'dummyjson') {
          // Busca DummyJSON
          const cuisine = countryConfig?.dummyJsonCuisine;
          const { recipes, total } = await fetchDummyJsonRecipesPaginated(0, 8, cuisine);
          if (isMounted) {
            setApiRecipes(recipes);
            setTotalAvailable(total);
          }
        }
      } catch (err) {
        console.warn('Erro ao carregar receitas externas:', err);
        if (isMounted) {
          setApiRecipes(CANONICAL_RECIPES);
          setTotalAvailable(CANONICAL_RECIPES.length);
        }
      } finally {
        if (isMounted) setIsLoadingApi(false);
      }
    }

    loadRecipes();

    return () => {
      isMounted = false;
    };
  }, [selectedCountry, sourceTab, searchQuery]);

  // 3. Paginação: Carregar Mais Receitas
  const handleLoadMore = async () => {
    const nextOffset = pageOffset + 8;
    setIsLoadingMore(true);

    try {
      const countryConfig = COUNTRIES_CAROUSEL.find((c) => c.id === selectedCountry);

      if (countryConfig && countryConfig.theMealDbArea && sourceTab === 'mealdb') {
        const { recipes } = await fetchTheMealDBRecipesByArea(countryConfig.theMealDbArea, nextOffset, 8);
        setApiRecipes((prev) => {
          const existingIds = new Set(prev.map((r) => r.id));
          const newOnes = recipes.filter((r) => !existingIds.has(r.id));
          return [...prev, ...newOnes];
        });
        setPageOffset(nextOffset);
      } else if (sourceTab === 'dummyjson') {
        const cuisine = countryConfig?.dummyJsonCuisine;
        const { recipes } = await fetchDummyJsonRecipesPaginated(nextOffset, 8, cuisine);
        setApiRecipes((prev) => {
          const existingIds = new Set(prev.map((r) => r.id));
          const newOnes = recipes.filter((r) => !existingIds.has(r.id));
          return [...prev, ...newOnes];
        });
        setPageOffset(nextOffset);
      }
    } catch (err) {
      console.warn('Erro ao paginar receitas:', err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const baseList = React.useMemo(() => {
    if (selectedCountry === 'portugal' || sourceTab === 'nativas') {
      return CANONICAL_RECIPES;
    }
    // Ao pesquisar por pratos tradicionais portugueses (ex: Caldo Verde, Bacalhau, etc.), garante que surgem destacados
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      const matchingPt = CANONICAL_RECIPES.filter((r) =>
        (r.isPortugueseTraditional || r.area === 'Portuguese') &&
        (
          r.title.toLowerCase().includes(q) ||
          r.subtitle.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q)) ||
          r.ingredients.some((i) => i.item.toLowerCase().includes(q))
        )
      );
      if (matchingPt.length > 0) {
        const existingIds = new Set(apiRecipes.map((r) => r.id));
        const uniquePt = matchingPt.filter((r) => !existingIds.has(r.id));
        return [...uniquePt, ...apiRecipes];
      }
    }
    return apiRecipes;
  }, [selectedCountry, sourceTab, apiRecipes, searchQuery]);

  // Filtragem local fina (Pesquisa, Categoria, Despensa e País)
  const displayRecipes = baseList.filter((r) => {
    // Filtro de País
    if (selectedCountry === 'portugal') {
      const isPT = r.isPortugueseTraditional || 
                   r.area === 'Portuguese' || 
                   r.tags.some((t) => t.toLowerCase().includes('portug') || t.toLowerCase().includes('alentej') || t.toLowerCase().includes('minho') || t.toLowerCase().includes('porto'));
      if (!isPT) return false;
    } else if (selectedCountry !== 'all') {
      const targetCountry = COUNTRIES_CAROUSEL.find((c) => c.id === selectedCountry);
      if (targetCountry && targetCountry.theMealDbArea) {
        const matchesArea = r.area?.toLowerCase() === targetCountry.theMealDbArea.toLowerCase() ||
                            r.tags.some((t) => t.toLowerCase().includes(targetCountry.theMealDbArea!.toLowerCase()) || t.toLowerCase().includes(targetCountry.name.toLowerCase()));
        if (!matchesArea && sourceTab === 'nativas') return false;
      }
    }

    // Filtro de Categoria
    const matchesCategory = selectedCategory === 'todos' || r.category === selectedCategory;

    // Filtro de Texto
    const matchesQuery =
      searchQuery.trim() === '' ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      r.ingredients.some((i) => i.item.toLowerCase().includes(searchQuery.toLowerCase()));

    // Filtro por Região do Atlas Antigo (se selecionado via modal)
    const matchesAtlas =
      !selectedAtlasRegion ||
      (selectedAtlasRegion === 'Portugal' && (r.area === 'Portuguese' || r.isPortugueseTraditional)) ||
      (selectedAtlasRegion === 'Itália' && r.area === 'Italian') ||
      (selectedAtlasRegion === 'França' && r.area === 'French') ||
      (selectedAtlasRegion === 'Reino Unido' && (r.area === 'British' || r.area === 'Irish')) ||
      (selectedAtlasRegion === 'Espanha & México' && (r.area === 'Spanish' || r.area === 'Mexican')) ||
      (selectedAtlasRegion === 'Universal' && r.area !== 'Portuguese');

    // Filtro de Ingredientes da Despensa
    const matchesPantry =
      pantryIngredients.length === 0 ||
      pantryIngredients.some((pIng) =>
        r.ingredients.some((rIng) => rIng.item.toLowerCase().includes(pIng.toLowerCase())) ||
        r.title.toLowerCase().includes(pIng.toLowerCase())
      );

    return matchesCategory && matchesQuery && matchesAtlas && matchesPantry;
  });

  const handleAddPantryIngredient = (ing: string) => {
    const clean = ing.trim().toLowerCase();
    if (!clean) return;
    if (!pantryIngredients.includes(clean)) {
      setPantryIngredients([...pantryIngredients, clean]);
    }
    setCustomPantryInput('');
  };

  const handleRemovePantryIngredient = (ing: string) => {
    setPantryIngredients(pantryIngredients.filter((i) => i !== ing));
  };

  const handleQuickSendCalorie = (e: React.MouseEvent, recipe: Recipe) => {
    e.stopPropagation();
    addCalorieEntry({
      title: recipe.title,
      category: 'receita',
      portionDescription: `1 dose (${recipe.title})`,
      portions: 1,
      calories: recipe.nutrition?.calories || 480,
      protein: recipe.nutrition?.protein || 30,
      carbs: recipe.nutrition?.carbs || 40,
      fat: recipe.nutrition?.fat || 15,
    });
  };

  const pantrySuggestions = ['Frango', 'Batata', 'Cogumelos', 'Ovos', 'Tomate', 'Bacalhau', 'Arroz', 'Cenoura'];

  const hasMore = (sourceTab === 'mealdb' || sourceTab === 'dummyjson') && 
                  selectedCountry !== 'all' && 
                  selectedCountry !== 'portugal' && 
                  totalAvailable > apiRecipes.length;

  return (
    <div className="space-y-6 font-sans">
      
      {/* VISTA SEARCH: HERO DISCOVER NEW RECIPES (MOCKUP STYLE) */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            Discover<br />
            <span className="text-neon">New Recipes</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Pesquisa rápida por ingredientes, pratos tradicionais portugueses ou cozinhas do mundo
          </p>
        </div>

        {/* Input de Pesquisa Largo exatamente com o estilo do mockup */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ingredients or dishes..."
            className="w-full bg-card border border-zinc-800 rounded-2xl py-4 pl-12 pr-12 text-sm text-white focus:outline-none focus:border-neon transition placeholder-zinc-500 shadow-lg"
          />
          <Search className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs cursor-pointer p-1"
            >
              ✕
            </button>
          )}
        </div>

        {/* Chips Rápidos de Filtro */}
        <div className="flex flex-wrap gap-2">
          {[
            { label: '🇵🇹 Tradicional', query: 'portugal' },
            { label: 'High Protein', query: 'protein' },
            { label: 'Under 30m', query: '30' },
            { label: 'Vegan', query: 'vegan' },
            { label: 'Desserts', query: 'doce' },
          ].map((tag) => {
            const isActive = searchQuery.toLowerCase().includes(tag.query);
            return (
              <button
                key={tag.label}
                type="button"
                onClick={() => {
                  if (isActive) setSearchQuery('');
                  else setSearchQuery(tag.query);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer touch-btn ${
                  isActive
                    ? 'bg-neon text-black shadow-neon'
                    : 'bg-card border border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. SELETOR DE PAÍSES / COZINHAS DO MUNDO (CARROSSEL MODERNO DESLIZANTE) */}
      <div className="bento-card p-4 sm:p-5 bg-card border-zinc-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-neon" />
            <span className="text-xs uppercase font-mono tracking-wider text-zinc-300 font-bold">
              Cozinhas do Mundo
            </span>
          </div>
          <span className="text-[11px] text-zinc-400 font-mono hidden sm:inline">
            Clique para filtrar receitas por país
          </span>
        </div>

        {/* Barra Horizontal Deslizante com Efeito Glass e Botões Touch */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
          {COUNTRIES_CAROUSEL.map((c) => {
            const isSelected = selectedCountry === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => handleSelectCountry(c)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all touch-btn shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-neon text-black shadow-neon scale-105 font-black'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <span className="text-base leading-none">{c.flag}</span>
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. BENTO CARD HERO DE PESQUISA & FONTES */}
      <div className="bento-card p-5 sm:p-7 bg-[#131C2E] border-slate-800 space-y-4">
        
        {/* Barra Superior: Título & Seletor de Base de Dados */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <CookingPot className="w-6 h-6 text-emerald-400" />
              <span>
                {selectedCountry === 'portugal' ? 'Receitas Tradicionais Portuguesas' : 'Catálogo Culinário Global'}
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              {selectedCountry === 'portugal' 
                ? 'Acervo canónico com Caldo Verde, Bacalhau à Brás, Polvo à Lagareiro, Francesinha e mais.'
                : 'Receitas completas sem cortes, passo a passo verificado e balança de calorias.'}
            </p>
          </div>

          {/* Segmented Control de Fontes de Dados */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-2xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => {
                setSourceTab('nativas');
                setSelectedCountry('all');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all touch-btn cursor-pointer ${
                sourceTab === 'nativas'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Canónicas ({CANONICAL_RECIPES.length})
            </button>
            <button
              onClick={() => setSourceTab('mealdb')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all touch-btn cursor-pointer ${
                sourceTab === 'mealdb'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              TheMealDB API
            </button>
            <button
              onClick={() => setSourceTab('dummyjson')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all touch-btn cursor-pointer ${
                sourceTab === 'dummyjson'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              DummyJSON
            </button>
          </div>
        </div>

        {/* Input de Pesquisa Largo & Botão do Atlas */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar por prato ou ingrediente (ex: Caldo Verde, Bacalhau, Polvo, Pato)..."
              className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                Limpar
              </button>
            )}
          </div>

          <button
            onClick={() => setIsAtlasOpen(true)}
            className={`w-full sm:w-auto px-4 py-3 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all touch-btn cursor-pointer ${
              selectedAtlasRegion
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-md'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
            }`}
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>{selectedAtlasRegion ? `Região: ${selectedAtlasRegion}` : 'Atlas Cultural'}</span>
          </button>
        </div>

        {/* Categorias (Segmented Control) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all touch-btn cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30 font-bold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Despensa Inteligente (Filtro por Ingredientes que tem em casa) */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Tem em casa:</span>
          {pantrySuggestions.map((item) => {
            const isSelected = pantryIngredients.includes(item.toLowerCase());
            return (
              <button
                key={item}
                onClick={() => {
                  if (isSelected) {
                    handleRemovePantryIngredient(item.toLowerCase());
                  } else {
                    handleAddPantryIngredient(item);
                  }
                }}
                className={`text-xs px-2.5 py-1 rounded-xl transition-all touch-btn cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {isSelected ? `✓ ${item}` : `+ ${item}`}
              </button>
            );
          })}

          {/* Input para adicionar ingrediente livre */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddPantryIngredient(customPantryInput);
            }}
            className="flex items-center gap-1.5"
          >
            <input
              type="text"
              value={customPantryInput}
              onChange={(e) => setCustomPantryInput(e.target.value)}
              placeholder="Outro ingrediente..."
              className="bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none w-36 focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={!customPantryInput.trim()}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 disabled:opacity-40 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {pantryIngredients.length > 0 && (
          <div className="text-xs text-emerald-400 font-medium pt-1">
            ✓ <strong>{displayRecipes.length}</strong> {displayRecipes.length === 1 ? 'receita encontrada' : 'receitas encontradas'} com {pantryIngredients.join(' + ')}
          </div>
        )}
      </div>

      {/* 3. GRELHA BENTO DE RECEITAS */}
      {isLoadingApi ? (
        <div className="text-center py-20 text-sm text-emerald-400 flex flex-col items-center justify-center gap-3 font-medium">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
          <span>A carregar receitas e a formatar instruções passo-a-passo...</span>
        </div>
      ) : displayRecipes.length === 0 ? (
        <div className="text-center py-20 text-sm text-slate-400 bento-card p-10 bg-[#131C2E]">
          <p className="text-base text-slate-300 font-semibold mb-1">
            Nenhuma receita encontrada para os filtros selecionados.
          </p>
          <p className="text-xs text-slate-500">
            Tente selecionar "Todas", limpar o termo de pesquisa ou escolher outro país no carrossel superior.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {displayRecipes.map((recipe) => {
              const isPT = recipe.isPortugueseTraditional || 
                           recipe.area === 'Portuguese' || 
                           recipe.tags.some((t) => t.toLowerCase().includes('portug') || t.toLowerCase().includes('alentej') || t.toLowerCase().includes('porto') || t.toLowerCase().includes('minho'));

              return (
                <div
                  key={recipe.id}
                  onClick={() => onSelectRecipe(recipe)}
                  className={`bento-card bento-card-interactive p-5 sm:p-6 bg-[#131C2E] flex flex-col justify-between group shadow-lg transition-all ${
                    isPT 
                      ? 'border-emerald-500/40 hover:border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.08)]' 
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    {/* Metadados Superiores com Badge 🇵🇹 Tradicional se aplicável */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        {isPT ? (
                          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-lg flex items-center gap-1 shadow-sm">
                            <span>🇵🇹 Tradicional</span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded-lg border border-slate-700/60 uppercase tracking-wider">
                            {recipe.area || recipe.category}
                          </span>
                        )}

                        <span className="text-[11px] font-semibold text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded-lg border border-slate-700/60 flex items-center gap-1">
                          <ChefHat className="w-3 h-3 text-emerald-400" />
                          <span>{recipe.difficultyLevel || recipe.difficulty}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {recipe.nutrition && (
                          <span className="text-xs font-mono font-bold text-emerald-400 bg-slate-900/80 px-2.5 py-0.5 rounded-lg border border-emerald-500/20">
                            {recipe.nutrition.calories} kcal
                          </span>
                        )}

                        {recipe.restorationNote ? (
                          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/30 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                            <span>Verificado</span>
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-500 font-mono">
                            {recipe.steps.length} passos
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Título e Subtítulo */}
                    <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-emerald-400 transition-colors mb-1.5 leading-snug">
                      {recipe.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {recipe.subtitle}
                    </p>

                    {/* Pré-visualização do Passo 1 */}
                    <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 text-xs text-slate-300 mb-4">
                      <p className="line-clamp-2">
                        <strong className="text-emerald-400 mr-1">Passo 1:</strong>
                        {recipe.steps[0]?.portugueseText || recipe.steps[0]?.originalText}
                      </p>
                    </div>
                  </div>

                  {/* Rodapé com Estatísticas & Botões Largos Touch-Friendly */}
                  <div className="pt-3 border-t border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-emerald-400" />
                          {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-cyan-400" />
                          {recipe.servings} doses
                        </span>
                      </div>

                      <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>Ver Receita</span>
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>

                    {/* Botões Touch Rápidos */}
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={getYouTubeWatchUrl(recipe.videoTutorialUrl, recipe.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 touch-btn cursor-pointer"
                        title="Assistir vídeo explicativo"
                      >
                        <Play className="w-3.5 h-3.5 fill-current text-rose-400" />
                        <span>Vídeo</span>
                      </a>

                      <button
                        type="button"
                        onClick={(e) => handleQuickSendCalorie(e, recipe)}
                        className="py-2.5 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-1.5 touch-btn cursor-pointer"
                        title="Adicionar dose à Balança de Calorias"
                      >
                        <Scale className="w-3.5 h-3.5" />
                        <span>+{recipe.nutrition?.calories || 480} kcal</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4. BOTÃO CARREGAR MAIS RECEITAS (PAGINAÇÃO DINÂMICA) */}
          {hasMore && (
            <div className="flex flex-col items-center justify-center pt-4 pb-2">
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="w-full sm:w-auto min-w-[260px] py-3.5 px-8 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 shadow-lg flex items-center justify-center gap-2.5 touch-btn cursor-pointer transition-all"
              >
                {isLoadingMore ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                    <span>A carregar receitas da região...</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 text-emerald-400" />
                    <span>Carregar Mais Receitas ({displayRecipes.length} exibidas)</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal do Atlas Cartográfico */}
      <AntiqueAtlasModal
        isOpen={isAtlasOpen}
        onClose={() => setIsAtlasOpen(false)}
        selectedRegion={selectedAtlasRegion}
        onSelectRegion={(reg) => {
          setSelectedAtlasRegion(reg);
          setIsAtlasOpen(false);
        }}
      />
    </div>
  );
};
