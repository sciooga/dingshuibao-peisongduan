
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ChevronRight, Megaphone, Info, AlertTriangle, Trophy, Store, ShieldAlert } from 'lucide-react';

interface Notice {
  id: string;
  title: string;
  date: string;
  category: 'system' | 'alert' | 'reward' | 'transfer' | 'violation';
  summary: string;
  isRead: boolean;
}

const DeliveryNotices: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('全部');

  const categories = ['全部', '系统公告', '预警信息', '奖励政策', '水站转让', '违规公告'];

  const mockNotices: Notice[] = [
    {
      id: '1',
      title: '本月配送星级考核标准更新',
      date: '2024-10-22 10:00',
      category: 'system',
      summary: '为进一步提升服务质量，本月将针对准时达率及用户评价权重进行优化，详情请查阅...',
      isRead: false
    },
    {
      id: '2',
      title: '今日午后短时强降雨预警',
      date: '2024-10-22 08:30',
      category: 'alert',
      summary: '预计今日 14:00 - 17:00 昆明主城区有短时强降雨，请各位配送员注意行车安全...',
      isRead: true
    },
    {
      id: '3',
      title: '“双十一”配送加价及奖励方案',
      date: '2024-10-20 15:00',
      category: 'reward',
      summary: '11月11日当天，每单配送费将额外增加 2 元，并设当日单量王奖励金 500 元...',
      isRead: false
    },
    {
      id: '4',
      title: '新版水票扫码核销功能上线说明',
      date: '2024-10-18 11:20',
      category: 'system',
      summary: '全新扫码核销组件已集成至配送端，解决部分用户纸质水票无法验证的问题...',
      isRead: true
    },
    {
      id: '5',
      title: '【转让】盘龙区核心地段精品水站急转',
      date: '2024-10-23 09:00',
      category: 'transfer',
      summary: '因个人原因回老家发展，现有稳定客源500+，接手即盈利，有意向请联系...',
      isRead: false
    },
    {
      id: '6',
      title: '关于某配送站“虚假配送”行为的处罚通报',
      date: '2024-10-23 14:00',
      category: 'violation',
      summary: '经核实，XX水站存在多次未送达即点击已完成的违规行为，现处以罚款并降级处理...',
      isRead: false
    }
  ];

  const filteredNotices = mockNotices.filter(notice => {
    if (activeTab === '全部') return true;
    if (activeTab === '系统公告') return notice.category === 'system';
    if (activeTab === '预警信息') return notice.category === 'alert';
    if (activeTab === '奖励政策') return notice.category === 'reward';
    if (activeTab === '水站转让') return notice.category === 'transfer';
    if (activeTab === '违规公告') return notice.category === 'violation';
    return true;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'system': return <Info size={16} className="text-blue-500" />;
      case 'alert': return <AlertTriangle size={16} className="text-orange-500" />;
      case 'reward': return <Trophy size={16} className="text-yellow-500" />;
      case 'transfer': return <Store size={16} className="text-purple-500" />;
      case 'violation': return <ShieldAlert size={16} className="text-red-500" />;
      default: return <Bell size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="min-h-full bg-gray-50">
      <div className="bg-white sticky top-12 z-20 border-b border-gray-100 overflow-x-auto hide-scrollbar flex px-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`flex-none py-4 px-4 text-sm font-bold transition-all relative ${activeTab === cat ? 'text-blue-600' : 'text-gray-400'}`}
          >
            {cat}
            {activeTab === cat && (
              <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-3">
        {filteredNotices.map(notice => (
          <div 
            key={notice.id}
            onClick={() => navigate(`/notices/${notice.id}`)}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 active:bg-gray-50 transition-colors relative overflow-hidden"
          >
            {!notice.isRead && (
              <div className="absolute top-0 right-0 w-8 h-8">
                 <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full shadow-sm" />
              </div>
            )}
            
            <div className="shrink-0 bg-gray-50 w-12 h-12 rounded-xl flex items-center justify-center">
              {getCategoryIcon(notice.category)}
            </div>

            <div className="flex-1 space-y-1 min-w-0">
              <div className="flex justify-between items-start pr-2">
                <h3 className={`text-sm font-black truncate ${notice.isRead ? 'text-gray-600' : 'text-gray-900'}`}>
                  {notice.title}
                </h3>
              </div>
              <p className="text-[10px] text-gray-400 font-medium">{notice.date}</p>
              <p className="text-xs text-gray-400 mt-1 line-clamp-1 leading-relaxed">
                {notice.summary}
              </p>
            </div>
            
            <div className="shrink-0 self-center">
              <ChevronRight size={16} className="text-gray-300" />
            </div>
          </div>
        ))}

        {filteredNotices.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-gray-300">
            <Megaphone size={48} strokeWidth={1} />
            <p className="text-xs mt-2">暂无相关公告</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryNotices;
