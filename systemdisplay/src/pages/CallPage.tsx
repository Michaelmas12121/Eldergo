import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useHighContrast, useLanguage } from '@/hooks/useTheme';

// 定义联系人类型
type Contact = {
  id: string;
  name: string;
  nameEn: string;
  avatar: string;
};

export default function CallPage() {
  const navigate = useNavigate();
  const { isHighContrast } = useHighContrast();
  const { language } = useLanguage();

  // 联系人列表
  const contacts: Contact[] = [
    {
      id: '1',
      name: '女儿',
      nameEn: 'Daughter',
      avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Middle-aged%20Chinese%20woman%2C%20smiling%2C%20portrait&sign=d3df177a0c5042bff943535060f3fd61'
    },
    {
      id: '2',
      name: '儿子',
      nameEn: 'Son',
      avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Middle-aged%20Chinese%20man%2C%20smiling%2C%20portrait&sign=30e2ce4bcfd2403edb58e1404e87f46c'
    },
    {
      id: '3',
      name: '李明',
      nameEn: 'Li Ming',
      avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Elderly%20Chinese%20man%2C%20smiling%2C%20portrait&sign=146e1bec99972a499db23e7e17b416be'
    },
    {
      id: '4',
      name: '张华',
      nameEn: 'Zhang Hua',
      avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Elderly%20Chinese%20woman%2C%20smiling%2C%20portrait&sign=9a7d535fc1d59090e77a0c4665d26ed2'
    },
    {
      id: '5',
      name: '赵静',
      nameEn: 'Zhao Jing',
      avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Elderly%20Chinese%20woman%2C%20smiling%2C%20portrait&sign=9a7d535fc1d59090e77a0c4665d26ed2'
    }
  ];

  // 返回主页
  const handleBack = () => {
    navigate('/');
  };

  // 处理语音通话
  const handleVoiceCall = (contact: Contact) => {
    alert(language === 'zh' ? `正在语音通话给${contact.name}` : `Voice calling ${contact.nameEn}`);
  };

  // 处理视频通话
  const handleVideoCall = (contact: Contact) => {
    alert(language === 'zh' ? `正在视频通话给${contact.name}` : `Video calling ${contact.nameEn}`);
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
        <h1 className="text-3xl font-bold">{language === 'zh' ? '联系人' : 'Contacts'}</h1>
      </header>

      {/* 联系人列表 */}
      <main className="flex-1 p-4">
        <div className="max-w-2xl mx-auto">
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`mb-4 p-4 rounded-2xl shadow-md flex items-center justify-between ${
                isHighContrast 
                  ? 'bg-gray-800 text-white border-2 border-white' 
                  : 'bg-white text-gray-800'
              }`}
            >
              <div className="flex items-center">
                <img 
                  src={contact.avatar} 
                  alt={contact.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                  <span className="text-2xl font-semibold">{language === 'zh' ? contact.name : contact.nameEn}</span>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => handleVoiceCall(contact)}
                  className={`p-3 rounded-full taptic-feedback ${
                    isHighContrast ? 'bg-green-700 text-white' : 'bg-green-100 text-green-600'
                  }`}
                >
                  <i className="fa-solid fa-phone-alt text-2xl"></i>
                </button>
                <button 
                  onClick={() => handleVideoCall(contact)}
                  className={`p-3 rounded-full taptic-feedback ${
                    isHighContrast ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  <i className="fa-solid fa-video text-2xl"></i>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </motion.div>
  );
}