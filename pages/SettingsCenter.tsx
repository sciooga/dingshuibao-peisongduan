
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Settings, Printer, ImageIcon, Zap, ChevronRight, PlusCircle, AlertTriangle, Save } from 'lucide-react';

const SettingsCenter: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState((location.state as any)?.initialTab || 'params');

  return (
    <div className="min-h-full bg-gray-50 flex flex-col pb-20">
      <div className="bg-white sticky top-12 z-20 border-b border-gray-100 flex p-4 gap-4 overflow-x-auto hide-scrollbar">
        {[
          { id: 'params', label: '运行参数', icon: <Zap size={16} /> },
          { id: 'printer', label: '打印机', icon: <Printer size={16} /> },
          { id: 'ads', label: '广告设置', icon: <ImageIcon size={16} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-none px-6 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white text-gray-400 border border-gray-100'}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-4">
        {activeTab === 'params' && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
              <h4 className="text-sm font-black text-gray-900 border-b border-gray-50 pb-4">配送时效与预警</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <p className="text-xs font-black text-gray-800">库存报警阈值</p>
                    <p className="text-[10px] text-gray-400">当单一商品低于此数量时提醒</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="number" defaultValue="20" className="w-16 bg-gray-50 rounded-lg px-2 py-1.5 text-center text-sm font-black outline-none border border-transparent focus:border-blue-500" />
                    <span className="text-[10px] text-gray-400 font-bold">桶/箱</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <p className="text-xs font-black text-gray-800">超时接单预警</p>
                    <p className="text-[10px] text-gray-400">新订单未接超过此时长</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="number" defaultValue="15" className="w-16 bg-gray-50 rounded-lg px-2 py-1.5 text-center text-sm font-black outline-none border border-transparent focus:border-blue-500" />
                    <span className="text-[10px] text-gray-400 font-bold">分钟</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2">
               <Save size={18} /> 保存配置
            </button>
          </div>
        )}

        {activeTab === 'printer' && (
          <div className="space-y-4">
            <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
               <div className="absolute -right-4 -bottom-4 opacity-10"><Printer size={100} /></div>
               <h4 className="text-lg font-black relative z-10">云小票打印机</h4>
               <p className="text-[11px] opacity-70 mt-1 relative z-10">已绑定 1 台在线设备</p>
               <div className="mt-6 flex gap-2 relative z-10">
                 <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-[10px] font-black backdrop-blur-md">设备管理</button>
                 <button className="bg-white text-blue-600 px-4 py-2 rounded-xl text-[10px] font-black">测试打印</button>
               </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
              <h5 className="text-xs font-black text-gray-900">自动打印规则</h5>
              <div className="space-y-3">
                 {[
                   { label: '支付成功后自动打印', enabled: true },
                   { label: '门店接单后自动打印', enabled: true },
                   { label: '核销成功后打印凭证', enabled: false },
                 ].map((rule, i) => (
                   <div key={i} className="flex justify-between items-center py-2">
                      <span className="text-xs font-bold text-gray-600">{rule.label}</span>
                      <div className={`w-10 h-6 rounded-full relative transition-all ${rule.enabled ? 'bg-blue-600' : 'bg-gray-200'}`}>
                         <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${rule.enabled ? 'right-1' : 'left-1'}`} />
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ads' && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div className="flex justify-between items-center">
                <h5 className="text-xs font-black text-gray-900">首页轮播广告图</h5>
                <button className="text-blue-600 font-black text-[11px] flex items-center gap-1">
                  <PlusCircle size={14} /> 添加
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="aspect-[16/9] bg-gray-100 rounded-2xl relative group overflow-hidden border border-gray-200">
                   <img src="https://picsum.photos/400/225?random=101" className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-active:opacity-100 transition-opacity flex items-center justify-center">
                     <span className="text-[10px] text-white font-black">管理</span>
                   </div>
                   <div className="absolute bottom-1 right-1 bg-green-500 text-white text-[8px] px-1.5 py-0.5 rounded-md font-black">展示中</div>
                </div>
                <div className="aspect-[16/9] border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-1 text-gray-400 active:bg-gray-50 transition-colors cursor-pointer">
                   <ImageIcon size={24} strokeWidth={1.5} />
                   <span className="text-[9px] font-bold">上传新图</span>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex gap-3">
               <AlertTriangle className="text-orange-500 shrink-0" size={16} />
               <p className="text-[10px] text-orange-700 leading-relaxed">
                 广告图仅在本店范围内展示，支持设置特定时段自动上下架。建议尺寸：750x360 像素。
               </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsCenter;
