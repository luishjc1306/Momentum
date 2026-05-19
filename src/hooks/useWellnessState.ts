import { useEffect, useMemo, useState } from 'react';
import { loadState, saveState } from '../data/storage';
import { buildQuests } from '../data/seedData';
import type { WellnessState } from '../types';

export const useWellnessState = () => {
  const [state, setState] = useState<WellnessState>(() => loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  const quests = useMemo(() => buildQuests(state), [state]);

  return { state, setState, quests };
};
