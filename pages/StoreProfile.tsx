
import React, { useState } from 'react';
import { Store, MapPin, Clock, Phone, ChevronRight, Save, Info } from 'lucide-react';

const StoreProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '订水驿站 · 昆明旗舰店',
    address: '昆明市盘龙区北京路100号',
    phone: '0871-66668888',
    openTime: '08:00',
    closeTime: '21:00',
    lat: '25.045',
    lng: '102.710'
  });

  const [pendingLocation, setPendingLocation] = useState(false);

  const handleSave = () => {
    alert('店铺信息更新成功！');
  };

  const requestLocationChange = () => {
    setPendingLocation(true);
    alert('位置修改申请已提交，平台审核中。修改通过前将沿用旧位置。');
  };

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
        <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <Store size={32} />
          </div>
          <div>
            <h3 className="font-black text-gray-900">门店基础信息</h3>
            <p className="text-[10px] text-gray-400">实时同步至用户前端展示</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-gray-400 uppercase">门店名称</label>
            <input 
              className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500/20 outline-none"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-gray-400 uppercase">营业开始</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                <input type="time" className="w-full bg-gray-50 rounded-xl pl-9 pr-4 py-3 text-sm font-bold outline-none" value={formData.openTime} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-gray-400 uppercase">营业结束</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                <input type="time" className="w-full bg-gray-50 rounded-xl pl-9 pr-4 py-3 text-sm font-bold outline-none" value={formData.closeTime} />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-gray-400 uppercase">联系电话</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
              <input type="tel" className="w-full bg-gray-50 rounded-xl pl-9 pr-4 py-3 text-sm font-bold outline-none" value={formData.phone} />
            </div>
          </div>
        </div>

        <button 
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
        >
          <Save size={18} /> 保存基础修改
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MapPin className="text-red-500" size={20} />
            <h3 className="font-black text-gray-900">门店地理位置</h3>
          </div>
          {pendingLocation && <span className="text-[9px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold">审核中</span>}
        </div>
        
        <p className="text-xs text-gray-500 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100 italic">
          {formData.address}
        </p>

        <div className="flex items-center gap-3">
          <button 
            onClick={requestLocationChange}
            className="flex-1 bg-gray-900 text-white py-3 rounded-xl text-xs font-black active:scale-95 transition-transform"
          >
            修改坐标/地址
          </button>
          <div className="flex-none bg-blue-50 p-3 rounded-xl text-blue-600">
             <ChevronRight size={20} />
          </div>
        </div>

        <div className="flex items-start gap-2 text-[10px] text-gray-400 px-1 pt-2">
          <Info size={12} className="shrink-0 mt-0.5" />
          <p>位置修改会影响用户端展示及配送范围计算，修改后需平台在24小时内审核生效。</p>
        </div>
      </div>
    </div>
  );
};

export default StoreProfile;
