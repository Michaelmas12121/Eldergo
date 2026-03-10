import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useHighContrast, useLanguage } from '@/hooks/useTheme';

export default function HealthPage() {
  const navigate = useNavigate();
  const { isHighContrast } = useHighContrast();
  const { language } = useLanguage();

  // 返回主页
  const handleBack = () => {
    navigate('/');
  };

  // 体检数据
  const healthCheckData = {
    lastCheckupDate: language === 'zh' ? '2026年2月15日' : 'Feb 15, 2026',
    nextCheckupDate: language === 'zh' ? '2026年5月15日' : 'May 15, 2026',
    cholesterol: '5.2 mmol/L',
    bloodPressure: '130/85 mmHg',
    bloodSugar: '5.6 mmol/L',
    weight: '68 kg',
    height: '170 cm'
  };

  // 健康建议
  const healthTips = [
    {
      id: '1',
      title: language === 'zh' ? '饮食建议' : 'Dietary Advice',
      content: language === 'zh' ? '建议减少盐分和油脂的摄入，多吃新鲜蔬菜和水果' : 'Reduce salt and oil intake, eat more fresh vegetables and fruits'
    },
    {
      id: '2',
      title: language === 'zh' ? '运动建议' : 'Exercise Advice',
      content: language === 'zh' ? '每天保持30分钟以上的有氧运动，如散步、太极等' : 'Maintain at least 30 minutes of aerobic exercise daily, such as walking or Tai Chi'
    },
    {
      id: '3',
      title: language === 'zh' ? '作息建议' : 'Sleep Advice',
      content: language === 'zh' ? '保持规律的作息时间，保证每天7-8小时的睡眠' : 'Maintain regular schedule and ensure 7-8 hours of sleep daily'
    }
  ];

  // 今日推荐菜单
  const recommendedMenu = [
    {
      id: '1',
      meal: language === 'zh' ? '早餐' : 'Breakfast',
      items: language === 'zh' ? ['小米粥', '蒸蛋', '凉拌黄瓜'] : ['Millet Congee', 'Steamed Egg', 'Cold Cucumber Salad']
    },
    {
      id: '2',
      meal: language === 'zh' ? '午餐' : 'Lunch',
      items: language === 'zh' ? ['清蒸鱼', '清炒时蔬', '糙米饭'] : ['Steamed Fish', 'Stir-fried Vegetables', 'Brown Rice']
    },
    {
      id: '3',
      meal: language === 'zh' ? '晚餐' : 'Dinner',
      items: language === 'zh' ? ['蔬菜汤', '瘦肉炒菜', '红薯'] : ['Vegetable Soup', 'Lean Meat Stir-fry', 'Sweet Potato']
    }
  ];

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
        <h1 className="text-3xl font-bold">{language === 'zh' ? '健康管理' : 'Health Management'}</h1>
      </header>

      {/* 健康内容 */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* 体检数据 */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={`mb-8 p-6 rounded-2xl shadow-md ${
            isHighContrast ? 'bg-gray-800 text-white border-2 border-white' : 'bg-white text-gray-800'
          }`}
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <i className="fa-solid fa-stethoscope mr-2 text-purple-500"></i>
            {language === 'zh' ? '体检数据' : 'Health Check Data'}
          </h2>
          
          <div className={`p-4 rounded-xl mb-4 ${
            isHighContrast ? 'bg-green-900 text-green-200' : 'bg-green-50 text-green-800'
          }`}>
      <p className="text-xl">{language === 'zh' ? '已将最新体检数据上传给子女' : 'Latest health check data uploaded to children'}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className={`p-3 rounded-xl ${isHighContrast ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className="text-lg opacity-70">{language === 'zh' ? '上一次体检' : 'Last Checkup'}</p>
              <p className="text-2xl font-semibold">{healthCheckData.lastCheckupDate}</p>
            </div>
            <div className={`p-3 rounded-xl ${isHighContrast ? 'bg-yellow-900' : 'bg-yellow-50'}`}>
              <p className="text-lg opacity-70">{language === 'zh' ? '下一次体检' : 'Next Checkup'}</p>
              <p className="text-2xl font-semibold">{healthCheckData.nextCheckupDate}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-lg mb-1">{language === 'zh' ? '胆固醇' : 'Cholesterol'}</p>
              <p className="text-2xl font-semibold">{healthCheckData.cholesterol}</p>
            </div>
            <div>
              <p className="text-lg mb-1">{language === 'zh' ? '血压' : 'Blood Pressure'}</p>
              <p className="text-2xl font-semibold">{healthCheckData.bloodPressure}</p>
            </div>
            <div>
              <p className="text-lg mb-1">{language === 'zh' ? '血糖' : 'Blood Sugar'}</p>
              <p className="text-2xl font-semibold">{healthCheckData.bloodSugar}</p>
            </div>
            <div>
              <p className="text-lg mb-1">{language === 'zh' ? '体重/身高' : 'Weight/Height'}</p>
              <p className="text-2xl font-semibold">{healthCheckData.weight}/{healthCheckData.height}</p>
            </div>
          </div>
        </motion.div>

        {/* 健康建议 */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className={`mb-8 p-6 rounded-2xl shadow-md ${
            isHighContrast ? 'bg-gray-800 text-white border-2 border-white' : 'bg-white text-gray-800'
          }`}
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <i className="fa-solid fa-lightbulb mr-2 text-yellow-500"></i>
            {language === 'zh' ? '健康建议' : 'Health Advice'}
          </h2>
          
          <div className="space-y-4">
            {healthTips.map((tip) => (
              <div key={tip.id} className={`p-4 rounded-xl ${
                isHighContrast ? 'bg-blue-900' : 'bg-blue-50'
              }`}>
                <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                <p className="text-xl">{tip.content}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 推荐菜单 */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className={`p-6 rounded-2xl shadow-md ${
            isHighContrast ? 'bg-gray-800 text-white border-2 border-white' : 'bg-white text-gray-800'
          }`}
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <i className="fa-solid fa-utensils mr-2 text-red-500"></i>
            {language === 'zh' ? '今日推荐菜单' : 'Today\'s Recommended Menu'}
          </h2>
          
          <div className="space-y-4">
            {recommendedMenu.map((menu) => (
              <div key={menu.id} className={`p-4 rounded-xl ${
                isHighContrast ? 'bg-orange-900' : 'bg-orange-50'
              }`}>
                <h3 className="text-xl font-semibold mb-2">{menu.meal}</h3>
                <div className="flex flex-wrap gap-2">
                  {menu.items.map((item, index) => (
                    <span key={index} className={`px-3 py-1 rounded-full text-lg ${
                      isHighContrast ? 'bg-white text-orange-900' : 'bg-white text-orange-800 shadow-sm'
                    }`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
}