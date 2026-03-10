import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useHighContrast, useLanguage } from '@/hooks/useTheme';

export default function WeatherPage() {
  const navigate = useNavigate();
  const { isHighContrast } = useHighContrast();
  const { language } = useLanguage();

  // 返回主页
  const handleBack = () => {
    navigate('/');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen flex flex-col ${isHighContrast ? 'high-contrast' : 'bg-gray-100'}`}
    >
      {/* 顶部导航栏 */}
      <header className={`p-4 flex items-center ${isHighContrast ? 'bg-black text-white' : 'bg-white shadow-sm'}`}>
        <button 
          onClick={handleBack}
          className={`mr-4 p-3 rounded-full taptic-feedback ${
            isHighContrast ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
          }`}
        >
          <i className="fa-solid fa-arrow-left text-2xl"></i>
        </button>
        <h1 className="text-3xl font-bold">{language === 'zh' ? '天气信息' : 'Weather Info'}</h1>
      </header>

      {/* 天气内容 */}
      <main className="flex-1 p-8 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={`w-full max-w-md p-8 rounded-3xl shadow-xl text-center ${
            isHighContrast ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          }`}
        >
          <div className="mb-6">
            <i className="fa-solid fa-cloud-sun text-8xl text-blue-400"></i>
          </div>
          
          <div className="mb-6">
            <h2 className="text-4xl font-bold mb-2">{language === 'zh' ? '多云' : 'Cloudy'}</h2>
            <p className="text-3xl">18° ~ 22°</p>
          </div>

          <div className={`p-4 rounded-2xl mb-6 ${
            isHighContrast ? 'bg-yellow-800 text-yellow-200' : 'bg-yellow-100 text-yellow-800'
          }`}>
            <p className="text-xl">{language === 'zh' ? '预计18:33大幅降温' : 'Expected significant cooling at 18:33'}</p>
            <p className="text-xl">{language === 'zh' ? '请注意保暖' : 'Please keep warm'}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className={`p-3 rounded-xl ${
              isHighContrast ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <p className="text-lg opacity-70">{language === 'zh' ? '早晨' : 'Morning'}</p>
              <p className="text-2xl font-semibold">18°</p>
            </div>
            <div className={`p-3 rounded-xl ${
              isHighContrast ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <p className="text-lg opacity-70">{language === 'zh' ? '中午' : 'Noon'}</p>
              <p className="text-2xl font-semibold">22°</p>
            </div>
            <div className={`p-3 rounded-xl ${
              isHighContrast ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <p className="text-lg opacity-70">{language === 'zh' ? '晚上' : 'Evening'}</p>
              <p className="text-2xl font-semibold">16°</p>
            </div>
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
}