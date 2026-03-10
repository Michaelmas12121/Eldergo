import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useHighContrast, useLanguage } from '@/hooks/useTheme';

export default function MediaPage() {
  const navigate = useNavigate();
  const { isHighContrast } = useHighContrast();
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  
  // 蓝牙音响状态
  const speakerStatus = [
    { id: '1', name: language === 'zh' ? '主音响' : 'Main Speaker', isConnected: true, isTakenOut: true },
    { id: '2', name: language === 'zh' ? '副音响' : 'Secondary Speaker', isConnected: true, isTakenOut: false }
  ];

  // 返回主页
  const handleBack = () => {
    navigate('/');
  };

  // 播放/暂停视频
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
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
        <h1 className="text-3xl font-bold">{language === 'zh' ? '媒体中心' : 'Media Center'}</h1>
      </header>

      {/* 媒体内容 */}
      <main className="flex-1 p-4">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {/* 广场舞视频播放区 */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={`rounded-2xl overflow-hidden shadow-lg ${
              isHighContrast ? 'border-2 border-white' : 'bg-white'
            }`}
          >
            <div className="relative w-full h-[50vh] bg-gray-900">
              {/* 广场舞视频截图 */}
              <img 
                src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Group%20of%20elderly%20people%20doing%20square%20dance%20in%20park%2C%20happy%2C%20sunny%20day&sign=828e0afde9b0087336eb95fe644f297b" 
                alt="广场舞视频" 
                className="w-full h-full object-cover"
              />
              
              {/* 播放按钮 */}
              <button 
                onClick={togglePlay}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-black bg-opacity-50 flex items-center justify-center taptic-feedback"
              >
                <i className={`fa-solid text-white text-3xl ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
              </button>
              
              {/* 视频标题 */}
              <div className={`absolute bottom-0 left-0 right-0 p-4 ${
                isHighContrast ? 'bg-black bg-opacity-80' : 'bg-gradient-to-t from-black to-transparent'
              }`}>
                <h2 className="text-2xl font-bold text-white">{language === 'zh' ? '广场舞教学 - 最炫民族风' : 'Square Dance Tutorial - Most Dazzling Folk Style'}</h2>
              </div>
            </div>
            
            {/* 视频控制栏 */}
            <div className={`p-4 flex justify-between items-center ${
              isHighContrast ? 'bg-gray-800' : 'bg-white'
            }`}>
              <button 
                className={`px-4 py-2 rounded-full taptic-feedback ${
                  isHighContrast ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-800'
                }`}
                onClick={() => alert(language === 'zh' ? '加载下一个视频...' : 'Loading next video...')}
              >
                <i className="fa-solid fa-step-forward mr-2"></i>{language === 'zh' ? '下一个' : 'Next'}
              </button>
              
              <div className="text-xl font-semibold">
                {isPlaying ? (language === 'zh' ? '播放中' : 'Playing') : (language === 'zh' ? '已暂停' : 'Paused')}
              </div>
              
              <button 
                className={`px-4 py-2 rounded-full taptic-feedback ${
                  isHighContrast ? 'bg-red-700 text-white' : 'bg-red-100 text-red-800'
                }`}
                onClick={() => alert('停止播放')}
              >
                <i className="fa-solid fa-stop mr-2"></i>{language === 'zh' ? '停止' : 'Stop'}
              </button>
            </div>
          </motion.div>

          {/* 蓝牙音响状态 */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className={`p-6 rounded-2xl shadow-md ${
              isHighContrast ? 'bg-gray-800 text-white border-2 border-white' : 'bg-white text-gray-800'
            }`}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <i className="fa-solid fa-bluetooth mr-2 text-blue-500"></i>
            {language === 'zh' ? '蓝牙音响状态' : 'Bluetooth Speaker Status'}
            </h2>
            
            <div className="space-y-4">
              {speakerStatus.map((speaker) => (
                <div key={speaker.id} className={`p-4 rounded-xl flex justify-between items-center ${
                  isHighContrast ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div>
                    <h3 className="text-xl font-semibold">{speaker.name}</h3>
                    <p className="text-lg">
                      <i className={`fa-solid ${speaker.isConnected ? 'fa-check-circle text-green-500' : 'fa-times-circle text-red-500'} mr-2`}></i>
                      {speaker.isConnected ? (language === 'zh' ? '已连接' : 'Connected') : (language === 'zh' ? '未连接' : 'Not Connected')}
                    </p>
                  </div>
                  
                  <div className={`flex items-center ${
                    speaker.isTakenOut 
                      ? (isHighContrast ? 'text-green-300' : 'text-green-600') 
                      : (isHighContrast ? 'text-yellow-300' : 'text-yellow-600')
                  }`}>
                    <i className={`fa-solid ${speaker.isTakenOut ? 'fa-box-open' : 'fa-box'} text-2xl mr-2`}></i>
                    <span className="text-xl font-semibold">
                      {speaker.isTakenOut ? (language === 'zh' ? '已取出' : 'Taken Out') : (language === 'zh' ? '在底座' : 'In Base')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* 媒体库快捷入口 */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            <button 
              className={`p-4 rounded-xl flex flex-col items-center justify-center shadow-md taptic-feedback ${
                isHighContrast ? 'bg-gray-800 text-white border-2 border-white' : 'bg-white text-gray-800'
              }`}
              onClick={() => alert(language === 'zh' ? '打开音乐库' : 'Open Music Library')}
            >
              <i className="fa-solid fa-music text-3xl mb-2 text-pink-500"></i>
              <span className="text-xl font-semibold">{language === 'zh' ? '音乐库' : 'Music Library'}</span>
            </button>
            
            <button 
              className={`p-4 rounded-xl flex flex-col items-center justify-center shadow-md taptic-feedback ${
                isHighContrast ? 'bg-gray-800 text-white border-2 border-white' : 'bg-white text-gray-800'
              }`}
              onClick={() => alert(language === 'zh' ? '打开视频库' : 'Open Video Library')}
            >
              <i className="fa-solid fa-film text-3xl mb-2 text-purple-500"></i>
              <span className="text-xl font-semibold">{language === 'zh' ? '视频库' : 'Video Library'}</span>
            </button>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}