
import React, { useState } from 'react';
import { Navigation, Clock, Package, ChevronRight, PhoneOff, AlertTriangle, BellRing, Phone } from 'lucide-react';
import { OrderStatus, DeliveryOrder } from '../../types';

const DeliveryOrders: React.FC = () => {
  const [activeTab, setActiveTab] = useState('待接单');
  
  const tabs = [
    { label: '待接单', count: 3 },
    { label: '已接单', count: 1 },
    { label: '配送中', count: 2 },
    { label: '已完成', count: 48 },
    { label: '催单', count: 1 },
    { label: '异常订单', count: 0 }
  ];

  const mockDeliveryOrders: DeliveryOrder[] = [
    {
      id: '2410210001',
      customerName: '陈先生',
      customerPhone: '13812345678',
      address: '北京路 888 号财富中心 A 座 1201 室',
      floor: '电梯直达',
      items: [{ name: '轿子山泉 18.9L', qty: 3 }],
      deliveryTime: '立即配送',
      status: OrderStatus.PENDING_DELIVERY,
      commission: 7.5,
      source: '美团订单'
    },
    {
      id: '2410210002',
      customerName: '李女士',
      customerPhone: '13599998888',
      address: '五华区建设路 22 号省建工集团老旧家属院 4 栋 2 单元 502 号房 (近翠湖公园侧门)',
      floor: '5 楼无电梯',
      items: [{ name: '农夫山泉 19L', qty: 2 }],
      deliveryTime: '18:00 前',
      status: OrderStatus.ACCEPTED,
      commission: 6.0,
      source: '平台订单'
    },
    {
      id: '2410210003',
      customerName: '昆明某某商贸有限公司',
      customerPhone: '18822223333',
      address: '金马街道大树营立交桥旁中航大厦 22 楼',
      floor: '有电梯',
      items: [
        { name: '轿子山泉 18.9L', qty: 10 }
      ],
      deliveryTime: '15:30 前',
      status: OrderStatus.PENDING_DELIVERY,
      commission: 25.0,
      source: '饿了么订单'
    }
  ];

  const updateStatus = (id: string, current: OrderStatus) => {
    let next: OrderStatus;
    if (current === OrderStatus.PENDING_DELIVERY) next = OrderStatus.ACCEPTED;
    else if (current === OrderStatus.ACCEPTED) next = OrderStatus.DELIVERING;
    else if (current === OrderStatus.DELIVERING) next = OrderStatus.COMPLETED;
    else return;
    
    alert(`订单 ${id} 状态已更新为：${next}`);
  };

  const reportPhoneError = (id: string) => {
    const ok = window.confirm('确认该用户电话号码错误或无法接通？上报后将同步通知到用户。');
    if (ok) {
      alert(`已成功上报订单 ${id} 的号码异常情况。`);
    }
  };

  const isElevator = (floor: string) => floor.includes('电梯');

  const getSourceColor = (source?: string) => {
    switch(source) {
      case '美团订单': return 'bg-[#FFD000] text-[#333]';
      case '饿了么订单': return 'bg-[#0085FF] text-white';
      case '平台订单': return 'bg-blue-600 text-white';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      {/* Tab Switcher with Badges */}
      <div className="bg-white border-b border-gray-100 flex overflow-x-auto hide-scrollbar sticky top-12 z-20 px-2 pt-1.5">
        {tabs.map(tab => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`flex-none py-3 px-4 text-[13px] font-bold whitespace-nowrap relative border-b-2 transition-all ${activeTab === tab.label ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400'}`}
          >
            <div className="flex flex-col items-center">
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className={`absolute top-1 right-0.5 min-w-[14px] h-[14px] px-1 rounded-full flex items-center justify-center text-[8px] font-black text-white shadow-sm transform translate-x-1/2 -translate-y-1/2 z-30 ${tab.label === '催单' || tab.label === '异常订单' ? 'bg-red-500' : 'bg-blue-500'}`}>
                  {tab.count > 99 ? '99+' : tab.count}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Urged Orders Warning */}
      {activeTab === '待接单' && tabs.find(t => t.label === '催单')?.count! > 0 && (
        <div className="m-2 bg-red-50 border border-red-100 p-2 rounded-lg flex items-center gap-2 animate-pulse">
          <BellRing size={14} className="text-red-500" />
          <p className="text-[10px] text-red-600 font-bold">您有待接订单已被用户催促，请优先处理！</p>
        </div>
      )}

      {/* Orders List */}
      <div className="p-2 space-y-3 pb-24">
        {mockDeliveryOrders.map(order => (
          <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 space-y-3">
              
              {/* Row 1: Header Info */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-gray-900">{order.customerName}</span>
                  <span className="text-[10px] text-blue-600 font-bold flex items-center gap-0.5">
                    <Clock size={10} /> {order.deliveryTime}
                  </span>
                  {order.id === '2410210001' && (
                    <span className="text-[9px] bg-red-50 text-red-500 px-1.5 py-0.5 rounded font-black border border-red-100">
                      用户已催
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-gray-400">预计收入:</span>
                  <span className="text-base font-black text-orange-600">¥{order.commission}</span>
                </div>
              </div>

              {/* Row 2: Address */}
              <div className="flex items-start justify-between gap-3 bg-gray-50 p-3 rounded-xl border border-gray-50">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-800 font-bold leading-relaxed break-words">
                    <span className={`inline-block mr-1.5 text-[9px] px-1.5 py-0.5 rounded font-black leading-none align-baseline ${isElevator(order.floor) ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {isElevator(order.floor) ? '有电梯' : '无电梯'}
                    </span>
                    {order.address}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">{order.floor}</p>
                </div>
                <button className="flex flex-col items-center gap-0.5 text-blue-500 active:opacity-60 shrink-0">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <Navigation size={16} fill="currentColor" />
                  </div>
                  <span className="text-[9px] font-bold mt-0.5">导航</span>
                </button>
              </div>

              {/* Row 3: Items */}
              <div className="py-1 flex items-center gap-2">
                <Package size={14} className="text-gray-400 shrink-0" />
                <p className="text-xs font-bold text-gray-700 truncate">
                  {order.items.map((i, idx) => (
                    <span key={idx}>
                      {i.name} x{i.qty}{idx < order.items.length - 1 ? '、' : ''}
                    </span>
                  ))}
                </p>
              </div>

              {/* Row 4: Source Tag + Utility Buttons */}
              <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                <div className="flex items-center gap-2">
                  {/* Source Tag */}
                  <span className={`text-[9px] px-2 py-1 rounded-md font-black shadow-sm ${getSourceColor(order.source)}`}>
                    {order.source || '平台订单'}
                  </span>
                  
                  {/* Phone Error Button */}
                  <button 
                    onClick={() => reportPhoneError(order.id)}
                    className="flex items-center gap-1 text-[9px] text-red-500 font-bold border border-red-50 px-2 py-1 rounded-md active:bg-red-50"
                  >
                    号码错误
                  </button>
                </div>

                {/* Call Button */}
                <a 
                  href={`tel:${order.customerPhone}`} 
                  className="flex items-center gap-1 px-3 py-1 rounded-md border border-gray-200 text-[10px] font-bold text-gray-600 active:bg-gray-50 transition-all"
                >
                  <Phone size={12} /> 拨打电话
                </a>
              </div>

              {/* Row 5: Primary Action Button (Full Width) */}
              <div className="pt-1">
                <button 
                  onClick={() => updateStatus(order.id, order.status)}
                  className={`w-full py-3.5 rounded-xl text-sm font-black shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
                    order.status === OrderStatus.PENDING_DELIVERY 
                    ? 'bg-blue-600 text-white shadow-blue-100' 
                    : (order.status === OrderStatus.ACCEPTED ? 'bg-orange-500 text-white shadow-orange-100' : 'bg-green-600 text-white shadow-green-100')
                  }`}
                >
                  {order.status === OrderStatus.PENDING_DELIVERY ? '立即接单' : (order.status === OrderStatus.ACCEPTED ? '开始配送' : '确认送达')}
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Simplified Tracking Indicator */}
      <div className="fixed bottom-20 left-4 right-4 bg-gray-900/95 backdrop-blur-md text-white py-2 px-4 rounded-xl shadow-lg flex items-center justify-between z-40 border border-white/5">
         <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-[10px] font-medium opacity-80">定位正常: 王师傅-007</span>
         </div>
         <ChevronRight size={12} className="opacity-30" />
      </div>
    </div>
  );
};

export default DeliveryOrders;
