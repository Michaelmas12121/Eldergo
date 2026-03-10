import { useState } from 'react';
import { toast } from 'sonner';
import { useHighContrast, useLanguage } from '@/hooks/useTheme';
import { HighContrastContext, LanguageContext } from '@/contexts/authContext';
import { AppIcon } from '@/components/AppIcon';

// 定义应用类型
type AppItem = {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  color: string;
  isHighlighted?: boolean;
};

import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const { isHighContrast, toggleHighContrast } = useHighContrast();
  const { language, toggleLanguage } = useLanguage();
  const [showVoiceAssist, setShowVoiceAssist] = useState(false);

  // 应用列表
  const apps: AppItem[] = [
    {
      id: 'exercise',
      name: '运动',
      nameEn: 'Exercise',
      icon: 'fa-heartbeat',
      color: 'bg-red-500',
      isHighlighted: true
    },
    {
      id: 'weather',
      name: '天气',
      nameEn: 'Weather',
      icon: 'fa-cloud-sun',
      color: 'bg-blue-500'
    },
    {
      id: 'call',
      name: '通话',
      nameEn: 'Calls',
      icon: 'fa-phone-alt',
      color: 'bg-green-500'
    },
    {
      id: 'health',
      name: '健康',
      nameEn: 'Health',
      icon: 'fa-stethoscope',
      color: 'bg-purple-500'
    },
    {
      id: 'map',
      name: '地图',
      nameEn: 'Map',
      icon: 'fa-map-marker-alt',
      color: 'bg-yellow-500'
    },
    {
      id: 'media',
      name: '媒体',
      nameEn: 'Media',
      icon: 'fa-music',
      color: 'bg-pink-500'
    }
  ];

  // 处理应用点击
  const handleAppClick = (app: AppItem) => {
    toast(language === 'zh' ? `进入${app.name}应用` : `Enter ${app.nameEn} App`);
    // 导航到对应应用
    switch (app.id) {
      case 'exercise':
        navigate('/exercise');
        break;
      case 'weather':
        navigate('/weather');
        break;
      case 'call':
        navigate('/call');
        break;
      case 'health':
        navigate('/health');
        break;
      case 'map':
        navigate('/map');
        break;
      case 'media':
        navigate('/media');
        break;
      default:
        toast(language === 'zh' ? `${app.name}应用即将上线` : `${app.nameEn} App Coming Soon`);
    }
  };

  // 语音辅助功能
  const handleVoiceAssist = () => {
    setShowVoiceAssist(true);
    toast(language === 'zh' ? '语音助手已启动' : 'Voice Assistant Started');
    
    // 模拟语音助手倒计时关闭
    setTimeout(() => {
      setShowVoiceAssist(false);
    }, 3000);
  };

  // 获取当前时间
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // 获取当前日期
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}年${month}月${day}日`;
  };

  return (
    <HighContrastContext.Provider value={{ isHighContrast, toggleHighContrast }}>
      <LanguageContext.Provider value={{ language, toggleLanguage }}>
        <div className={`min-h-screen flex flex-col ${isHighContrast ? 'high-contrast' : 'bg-gray-100'}`}>
          {/* 顶部状态栏 */}
          <header className={`p-4 flex justify-between items-center ${isHighContrast ? 'bg-black text-white' : 'bg-white shadow-sm'}`}>
            <div className="text-center">
              <h1 className="text-3xl font-bold">Eldergo</h1>
              <p className="text-lg opacity-70">{language === 'zh' ? '智能运动助手' : 'Smart Exercise Assistant'}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{getCurrentTime()}</div>
              <div className="text-lg">{getCurrentDate()}</div>
            </div>
          </header>

          {/* 控制面板 */}
          <div className={`p-4 flex justify-end gap-4 ${isHighContrast ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <button
              onClick={toggleLanguage}
              className={`px-4 py-2 rounded-full flex items-center gap-2 taptic-feedback ${
                isHighContrast 
                  ? 'bg-white text-black' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              <i className="fa-solid fa-language text-xl"></i>
              <span className="text-lg">{language === 'zh' ? 'English' : '中文'}</span>
            </button>
            <button
              onClick={toggleHighContrast}
              className={`px-4 py-2 rounded-full flex items-center gap-2 taptic-feedback ${
                isHighContrast 
                  ? 'bg-white text-black' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              <i className="fa-solid fa-adjust text-xl"></i>
              <span className="text-lg">{language === 'zh' ? (isHighContrast ? '标准模式' : '高对比模式') : (isHighContrast ? 'Standard Mode' : 'High Contrast')}</span>
            </button>
          </div>

          {/* 应用网格 */}
          <main className="flex-1 p-8">
            <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto">
              {apps.map((app) => (
                <AppIcon 
                  key={app.id}
                  app={{
                    ...app,
                    name: language === 'zh' ? app.name : app.nameEn
                  }}
                  onClick={() => handleAppClick(app)}
                  isHighContrast={isHighContrast}
                />
              ))}
            </div>
          </main>

          {/* 语音助手按钮 */}
          <div className="p-8 flex justify-center">
            <button
              onClick={handleVoiceAssist}
              className={`w-20 h-20 rounded-full flex items-center justify-center taptic-feedback ${
                isHighContrast 
                  ? 'bg-yellow-400 text-black' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } shadow-lg transition-all duration-300 ${showVoiceAssist ? 'scale-110' : ''}`}
            >
              <i className="fa-solid fa-microphone text-4xl"></i>
            </button>
          </div>

          {/* 返回主页提示 */}
          <footer className={`p-4 text-center ${isHighContrast ? 'bg-black text-white' : 'bg-white'}`}>
            <p className="text-xl">{language === 'zh' ? '双击任意位置返回主页' : 'Double tap anywhere to return home'}</p>
          </footer>
        </div>
      </LanguageContext.Provider>
    </HighContrastContext.Provider>
  );
}