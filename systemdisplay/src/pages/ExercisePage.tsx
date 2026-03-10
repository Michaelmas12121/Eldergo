import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useHighContrast, useLanguage } from '@/hooks/useTheme';

// 定义运动类型
type ExerciseType = {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  color: string;
};

export default function ExercisePage() {
  const navigate = useNavigate();
  const { isHighContrast } = useHighContrast();
  const { language } = useLanguage();
  
  // 运动选项列表
  const exercises: ExerciseType[] = [
    {
      id: 'jogging',
      name: '慢跑',
      nameEn: 'Jogging',
      icon: 'fa-running',
      color: 'bg-blue-500'
    },
    {
      id: 'walking',
      name: '散步',
      nameEn: 'Walking',
      icon: 'fa-walking',
      color: 'bg-green-500'
    },
    {
      id: 'skipping',
      name: '跳绳',
      nameEn: 'Skipping',
      icon: 'fa-rope-pull',
      color: 'bg-yellow-500'
    },
    {
      id: 'taiji',
      name: '太极',
      nameEn: 'Tai Chi',
      icon: 'fa-hand-sparkles',
      color: 'bg-purple-500'
    },
    {
      id: 'badminton',
      name: '羽毛球',
      nameEn: 'Badminton',
      icon: 'fa-shuttlecock',
      color: 'bg-red-500'
    },
    {
      id: 'pingpong',
      name: '乒乓球',
      nameEn: 'Table Tennis',
      icon: 'fa-table-tennis-paddle-ball',
      color: 'bg-cyan-500'
    }
  ];

  // 返回主页
  const handleBack = () => {
    navigate('/');
  };

  // 选择运动类型
  const handleExerciseSelect = (exercise: ExerciseType) => {
    // 这里可以添加进入具体运动模式的逻辑
    alert(language === 'zh' ? `您选择了${exercise.name}运动` : `You selected ${exercise.nameEn}`);
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
        <h1 className="text-3xl font-bold">{language === 'zh' ? '运动选择' : 'Exercise Selection'}</h1>
      </header>

      {/* 运动选项网格 */}
      <main className="flex-1 p-8">
        <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
          {exercises.map((exercise) => (
            <motion.button
              key={exercise.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleExerciseSelect(exercise)}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg transition-all duration-300 ${
                isHighContrast 
                  ? 'bg-gray-800 text-white border-2 border-white' 
                  : 'bg-white text-gray-800'
              }`}
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${exercise.color} text-white`}>
                <i className={`fa-solid ${exercise.icon} text-3xl`}></i>
              </div>
              <span className="text-2xl font-medium">{language === 'zh' ? exercise.name : exercise.nameEn}</span>
            </motion.button>
          ))}
        </div>
      </main>
    </motion.div>
  );
}