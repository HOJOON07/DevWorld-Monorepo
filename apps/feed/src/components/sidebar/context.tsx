import { createContext, ReactNode, useContext, useState } from 'react';

interface SidebarContextType {
  hoveredItem: string | null;
  setHoveredItem: (item: string | null) => void;
  activeItem: string | null;
  setActiveItem: (item: string | null) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

interface SidebarProviderProps {
  children: ReactNode;
  defaultActive?: string;
}

export const SidebarProvider = ({ children, defaultActive = 'feed' }: SidebarProviderProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(defaultActive);

  const value = {
    hoveredItem,
    setHoveredItem,
    activeItem,
    setActiveItem,
  };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};
