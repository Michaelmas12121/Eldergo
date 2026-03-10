import { createContext } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
  logout: () => {},
});

// 高对比度模式上下文
export const HighContrastContext = createContext({
  isHighContrast: false,
  toggleHighContrast: () => {},
});

// 语言切换上下文
export const LanguageContext = createContext({
  language: 'zh',
  toggleLanguage: () => {},
});