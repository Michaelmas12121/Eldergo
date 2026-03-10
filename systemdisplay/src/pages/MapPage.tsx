import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useHighContrast, useLanguage } from '@/hooks/useTheme';

export default function MapPage() {
  const navigate = useNavigate();
  const { isHighContrast } = useHighContrast();
  const { language } = useLanguage();

  // 返回主页
  const handleBack = () => {
    navigate('/');
  };

  // 模拟位置数据
  const locationData = {
    latitude: 39.9042,
    longitude: 116.4074,
    address: language === 'zh' ? '北京市朝阳区建国路88号' : 'No. 88 Jianguo Road, Chaoyang District, Beijing'
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
        <h1 className="text-3xl font-bold">{language === 'zh' ? '地图导航' : 'Map Navigation'}</h1>
      </header>

      {/* 地图内容 */}
      <main className="flex-1 p-4">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full h-full max-w-4xl mx-auto flex flex-col"
        >
          {/* 地图显示区域 */}
          <div className={`relative w-full h-[70vh] rounded-2xl overflow-hidden shadow-lg ${
            isHighContrast ? 'border-2 border-white' : ''
          }`}>
            {/* 模拟地图图片 - 在实际应用中这里会是真实的地图组件 */}
            <img 
              src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Map%20with%20location%20pin%2C%20city%20view%2C%20clear%20markers&sign=c021cae33b4df5b2b061e67827c9473c" 
              alt="地图" 
              className="w-full h-full object-cover"
            />
            
            {/* 当前位置标记 */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <i className="fa-solid fa-location-dot text-white text-2xl"></i>
              </div>
            </div>
          </div>

          {/* 位置信息 */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className={`mt-4 p-4 rounded-2xl shadow-md ${
              isHighContrast ? 'bg-gray-800 text-white border-2 border-white' : 'bg-white text-gray-800'
            }`}
          >
            <h2 className="text-2xl font-bold mb-2 flex items-center">
              <i className="fa-solid fa-map-marker-alt mr-2 text-red-500"></i>
            {language === 'zh' ? '当前位置' : 'Current Location'}
            </h2>
            <p className="text-xl">{locationData.address}</p>
            <p className="text-lg mt-2 opacity-70">
              {language === 'zh' ? '纬度' : 'Latitude'}: {locationData.latitude} | {language === 'zh' ? '经度' : 'Longitude'}: {locationData.longitude}
            </p>
          </motion.div>

          {/* 快捷按钮 */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-4 flex justify-center gap-4"
          >
            <button 
              className={`px-6 py-3 rounded-full text-xl font-semibold taptic-feedback ${
                isHighContrast ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800'
              }`}
              onClick={() => alert('正在搜索附近医院...')}
            >
              <i className="fa-solid fa-hospital mr-2"></i>{language === 'zh' ? '附近医院' : 'Nearby Hospitals'}
            </button>
            <button 
              className={`px-6 py-3 rounded-full text-xl font-semibold taptic-feedback ${
                isHighContrast ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-800'
              }`}
              onClick={() => alert(language === 'zh' ? '正在搜索附近公园...' : 'Searching for nearby parks...')}
            >
              <i className="fa-solid fa-tree mr-2"></i>{language === 'zh' ? '附近公园' : 'Nearby Parks'}
            </button>
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  );
}