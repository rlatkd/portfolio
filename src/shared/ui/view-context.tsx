'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

export type View = 'portfolio' | 'blog';

const ViewContext = createContext<{ view: View; setView: (v: View) => void }>({
  view: 'portfolio',
  setView: () => {},
});

export function ViewProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>('portfolio');
  return <ViewContext.Provider value={{ view, setView }}>{children}</ViewContext.Provider>;
}

export const useView = () => useContext(ViewContext);
