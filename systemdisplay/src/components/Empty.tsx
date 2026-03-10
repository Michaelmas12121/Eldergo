import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Empty component
export function Empty() {
  return (
    <div className={cn("flex h-full items-center justify-center")} onClick={() => toast('Coming soon')}>Empty</div>
  );
}

// App Icon component
export interface AppIconProps {
  app: {
    id: string;
    name: string;
    nameEn?: string;
    icon: string;
    color: string;
    isHighlighted?: boolean;
  };
  onClick: () => void;
  isHighContrast: boolean;
}

export function AppIcon({ app, onClick, isHighContrast }: AppIconProps) {
  return (
    <button
      onClick={onClick}
      className={`taptic-feedback flex flex-col items-center transition-all duration-300 ${
        app.isHighlighted 
          ? 'transform hover:scale-105' 
          : 'transform hover:scale-105'
      }`}
    >
      <div 
        className={`w-32 h-32 rounded-2xl flex items-center justify-center mb-4 shadow-lg ${
          app.isHighlighted 
            ? `${app.color} ring-4 ring-opacity-50 ${isHighContrast ? 'ring-white' : 'ring-gray-200'}` 
            : `${app.color}`
        }`}
      >
        <i className={`fa-solid ${app.icon} text-white text-5xl`}></i>
      </div>
      <span className={`text-2xl font-semibold ${isHighContrast ? 'text-white' : 'text-gray-800'}`}>
        {app.name}
      </span>
    </button>
  );
}