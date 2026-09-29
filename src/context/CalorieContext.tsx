import React, { createContext, useContext, useState, useEffect } from 'react';
import { CalorieGoalConfig, CalorieGoalType, CalorieLogEntry } from '../types/cookbook';

interface CalorieContextType {
  goal: CalorieGoalConfig;
  setGoalType: (type: CalorieGoalType) => void;
  setCustomTargetCalories: (target: number) => void;
  entries: CalorieLogEntry[];
  addCalorieEntry: (entry: Omit<CalorieLogEntry, 'id' | 'timestamp'>) => void;
  removeCalorieEntry: (id: string) => void;
  clearEntries: () => void;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  remainingCalories: number;
  toastMessage: string | null;
}

const DEFAULT_GOALS: Record<CalorieGoalType, CalorieGoalConfig> = {
  defice: {
    goalType: 'defice',
    targetCalories: 1650,
    targetProtein: 120,
    targetCarbs: 160,
    targetFat: 50,
  },
  manutencao: {
    goalType: 'manutencao',
    targetCalories: 2100,
    targetProtein: 130,
    targetCarbs: 235,
    targetFat: 65,
  },
  ganho: {
    goalType: 'ganho',
    targetCalories: 2600,
    targetProtein: 160,
    targetCarbs: 320,
    targetFat: 80,
  },
};

const INITIAL_ENTRIES: CalorieLogEntry[] = [
  {
    id: 'init-1',
    title: 'Sopa da Pedra do Alentejo',
    category: 'receita',
    portionDescription: '1 tigela grande (450ml)',
    portions: 1,
    calories: 510,
    protein: 34.0,
    carbs: 42.0,
    fat: 22.0,
    timestamp: new Date().toISOString(),
    timeLabel: 'Almoço',
  },
  {
    id: 'init-2',
    title: 'Maçã Bravo de Esmolfe',
    category: 'fruta',
    portionDescription: '1 maçã fresca da Beira (140g)',
    portions: 1,
    calories: 72,
    protein: 0.4,
    carbs: 19.3,
    fat: 0.3,
    timestamp: new Date().toISOString(),
    timeLabel: 'Lanche',
  },
];

const CalorieContext = createContext<CalorieContextType | undefined>(undefined);

export const CalorieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [goal, setGoal] = useState<CalorieGoalConfig>(DEFAULT_GOALS.manutencao);
  const [entries, setEntries] = useState<CalorieLogEntry[]>(INITIAL_ENTRIES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const setGoalType = (type: CalorieGoalType) => {
    setGoal(DEFAULT_GOALS[type]);
  };

  const setCustomTargetCalories = (target: number) => {
    setGoal((prev) => ({
      ...prev,
      targetCalories: target,
      targetProtein: Math.round((target * 0.25) / 4),
      targetCarbs: Math.round((target * 0.50) / 4),
      targetFat: Math.round((target * 0.25) / 9),
    }));
  };

  const addCalorieEntry = (newEntry: Omit<CalorieLogEntry, 'id' | 'timestamp'>) => {
    const hours = new Date().getHours();
    let defaultTimeLabel = 'Refeição';
    if (hours < 11) defaultTimeLabel = 'Pequeno-Almoço';
    else if (hours < 15) defaultTimeLabel = 'Almoço';
    else if (hours < 18) defaultTimeLabel = 'Merenda da Tarde';
    else defaultTimeLabel = 'Jantar & Ceia';

    const entry: CalorieLogEntry = {
      ...newEntry,
      id: `cal-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      timeLabel: newEntry.timeLabel || defaultTimeLabel,
    };

    setEntries((prev) => [entry, ...prev]);

    // Toast Feedback
    setToastMessage(`⚖ Adicionado à Balança: ${entry.title} (+${entry.calories} kcal)`);
    setTimeout(() => {
      setToastMessage((current) => (current?.includes(entry.title) ? null : current));
    }, 3500);
  };

  const removeCalorieEntry = (id: string) => {
    setEntries((prev) => prev.filter((item) => item.id !== id));
  };

  const clearEntries = () => {
    setEntries([]);
  };

  const totalCalories = entries.reduce((acc, curr) => acc + curr.calories, 0);
  const totalProtein = Math.round(entries.reduce((acc, curr) => acc + curr.protein, 0) * 10) / 10;
  const totalCarbs = Math.round(entries.reduce((acc, curr) => acc + curr.carbs, 0) * 10) / 10;
  const totalFat = Math.round(entries.reduce((acc, curr) => acc + curr.fat, 0) * 10) / 10;
  const remainingCalories = goal.targetCalories - totalCalories;

  return (
    <CalorieContext.Provider
      value={{
        goal,
        setGoalType,
        setCustomTargetCalories,
        entries,
        addCalorieEntry,
        removeCalorieEntry,
        clearEntries,
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFat,
        remainingCalories,
        toastMessage,
      }}
    >
      {children}
    </CalorieContext.Provider>
  );
};

export function useCalorieTracker() {
  const context = useContext(CalorieContext);
  if (!context) {
    throw new Error('useCalorieTracker deve ser utilizado dentro de CalorieProvider');
  }
  return context;
}
