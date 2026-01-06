
import React, { useState } from 'react';
import { ArrowRightLeft, User, Truck, ChevronRight, MapPin, Phone, Globe } from 'lucide-react';

const DispatchCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const pendingOrders = [
    { id: 'ORD88102', customer: '张伟', address: '幸福小区 5-2-301', items: '轿子山泉 18.9L x2', time: '10:20' },
    { id: 'ORD88105', customer: '李芳', address: '阳光酒店 前台', items: '农夫山泉 19L x5', time: '10:35' },
  ];

  const deliveryStaff = [
    { name: '王师傅', status: '在线 (2单)', id: 'S01' },
    { name: '陈师傅', status: '配送中 (5单)', id: 'S02' },
    { name: '刘师傅', status: '休息中', id: 'S03' },
  ];

  const handleDispatch = (orderId: string, staffName: string) => {
    alert(`订单 ${orderId} 已指派给 ${staffName}`);
  };

  const handleTransferToHall = (orderId: string) => {
    const ok = window.confirm('确认转派到城市接单大厅？转派后本门店配送员将无法看到此单，由全市众包配送员抢单。');
    if (ok) alert(`订单 ${orderId} 已转派至城市大厅`);
  };

  return (
    <div className="min-h-full bg-gray-50 pb-10">
      <div className="bg-white sticky top-12 z-20 border-b border-gray-100 flex p-1 m-4 rounded-2xl shadow-sm border border-gray-100">
        <button 
          onClick={() => setActiveTab('pending')}
          className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${activeTab === 'pending' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-400'}`}
        >
          待派单 ({pendingOrders.length})
        </button>
        <button 
          onClick={() => setActiveTab('staff')}
          className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${activeTab === 'staff' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-400'}`}
        >
          配送员状态
        </button>
      </div>

      <div className="px-4 space-y-4">
        {activeTab === 'pending' ? (
          pendingOrders.map(order => (
            <div key={order.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-gray-900">{order.customer}</span>
                    <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold">{order.id}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                    <MapPin size={10} /> {order.address}
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-bold">{order.time}</span>
              </div>

              <div className="bg-gray-50 p-3 rounded-2xl flex items-center gap-3">
                 <Truck className="text-gray-400" size={16} />
                 <p className="text-xs font-bold text-gray-700">{order.items}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleTransferToHall(order.id)}
                  className="flex items-center justify-center gap-2 py-3 bg-indigo-50 text-indigo-600 rounded-2xl text-[11px] font-black active:scale-95 transition-transform"
                >
                  <Globe size={14} /> 转派众包大厅
                </button>
                <button className="flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-2xl text-[11px] font-black active:scale-95 transition-transform">
                  <User size={14} /> 指派本店员工
                </button>
              </div>

              {/* Simple staff picker (simulated) */}
              <div className="pt-2 flex gap-2 overflow-x-auto hide-scrollbar">
                {deliveryStaff.filter(s => s.status !== '休息中').map(s => (
                  <button 
                    key={s.id}
                    onClick={() => handleDispatch(order.id, s.name)}
                    className="flex-none bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl text-[10px] font-bold text-gray-600 active:bg-blue-50 active:text-blue-600 active:border-blue-100"
                  >
                    派给: {s.name}
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="space-y-3">
            {deliveryStaff.map(staff => (
              <div key={staff.id} className="bg-white rounded-2xl p-4 flex items-center justify-between border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${staff.status === '休息中' ? 'bg-gray-100 text-gray-400' : 'bg-green-50 text-green-600'}`}>
                    <User size={24} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-black text-gray-800">{staff.name}</p>
                    <p className={`text-[10px] font-bold ${staff.status === '休息中' ? 'text-gray-400' : 'text-green-500'}`}>{staff.status}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-gray-50 rounded-xl text-blue-500 active:bg-blue-50">
                    <Phone size={16} />
                  </button>
                  <ChevronRight size={18} className="text-gray-300" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DispatchCenter;
