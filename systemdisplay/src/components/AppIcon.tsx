import React from 'react';

// 定义应用类型
export type AppItem = {
  id: string;
  name: string;
  nameEn?: string;
  icon: string;
  color: string;
  isHighlighted?: boolean;
};

// 定义组件props类型
interface AppIconProps {
  app: AppItem;
  onClick: () => void;
  isHighContrast: boolean;
}

// AppIcon组件
export const AppIcon: React.FC<AppIconProps> = ({ app, onClick, isHighContrast }) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 taptic-feedback ${
        isHighContrast 
          ? 'bg-gray-800 text-white border-2 border-white' 
          : 'bg-white text-gray-800 hover:shadow-xl'
      } ${app.isHighlighted ? 'ring-4 ring-blue-400' : ''}`}
    >
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${app.color} text-white`}>
        <i className={`fa-solid ${app.icon} text-2xl`}></i>
      </div>
      <span className="text-xl font-medium">{app.name}</span>
    </button>
  );
};