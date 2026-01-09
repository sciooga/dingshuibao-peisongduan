
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Phone, Calendar, MoreHorizontal, CreditCard, ChevronRight } from 'lucide-react';

const OrderManagement: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('全部');
  // Updated tabs to reflect Sales Orders (not delivery tasks)
  const tabs = ['全部', '待付款', '待发货', '已完成', '售后'];

  // Mock Sales Data (Purchases of goods, tickets, etc.)
  const orders = [
    {
      id: '2410210001',
      customer: '陈先生',
      avatar: 'https://i.pravatar.cc/150?u=1',
      phone: '138****6789',
      items: [
        { name: '农夫山泉 19L (20桶赠3桶套餐)', qty: 1, image: 'https://picsum.photos/200/200?random=12' }
      ],
      total: 500.00,
      status: '待发货',
      time: '2024-10-22 10:20',
      type: '水票购买'
    },
    {
      id: '2410210002',
      customer: '李女士',
      avatar: 'https://i.pravatar.cc/150?u=2',
      phone: '135****8888',
      items: [
        { name: '景田百岁山 348ml*24箱', qty: 2, image: 'https://picsum.photos/200/200?random=4' },
        { name: '简易压水器', qty: 1, image: 'https://picsum.photos/200/200?random=6' }
      ],
      total: 111.00,
      status: '待付款',
      time: '2024-10-22 10:35',
      type: '商品购买'
    },
    {
      id: '2410210003',
      customer: '张伟',
      avatar: 'https://i.pravatar.cc/150?u=3',
      phone: '189****9999',
      items: [
        { name: '怡宝 18.9L', qty: 1, image: 'https://picsum.photos/200/200?random=3' }
      ],
      total: 22.00,
      status: '已完成',
      time: '2024-10-21 18:00',
      type: '商品购买'
    },
     {
      id: '2410210004',
      customer: '赵敏',
      avatar: 'https://i.pravatar.cc/150?u=4',
      phone: '133****1234',
      items: [
        { name: '茶吧机 (温热型)', qty: 1, image: 'https://picsum.photos/200/200?random=20' }
      ],
      total: 399.00,
      status: '售后',
      time: '2024-10-20 14:20',
      type: '商品购买'
    }
  ];

  const filteredOrders = activeTab === '全部' ? orders : orders.filter(o => o.status === activeTab);

  const getStatusStyle = (status: string) => {
    switch(status) {
      case '待付款': return { color: 'text-red-500', bg: 'bg-red-50' };
      case '待发货': return { color: 'text-blue-500', bg: 'bg-blue-50' };
      case '已完成': return { color: 'text-gray-500', bg: 'bg-gray-100' };
      case '售后': return { color: 'text-orange-500', bg: 'bg-orange-50' };
      default: return { color: 'text-gray-900', bg: 'bg-gray-100' };
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-20">
      {/* Search Header */}
      <div className="bg-white sticky top-12 z-20 border-b border-gray-100">
        <div className="p-4 pb-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="搜索订单号/买家姓名/手机号" 
                className="w-full bg-gray-50 rounded-xl pl-9 pr-4 py-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
            <button className="bg-gray-50 p-2.5 rounded-xl text-gray-500 active:bg-gray-100">
              <Filter size={18} />
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar px-2 pb-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-none px-4 py-3 text-xs font-bold whitespace-nowrap relative transition-colors ${activeTab === tab ? 'text-blue-600' : 'text-gray-400'}`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 rounded-full" />}
            </button>
          ))}
        </div>
      </div>

      {/* Order List */}
      <div className="p-4 space-y-3">
        {filteredOrders.map(order => {
          const statusStyle = getStatusStyle(order.status);
          return (
            <div 
              key={order.id} 
              onClick={() => navigate(`/order-management/${order.id}`)}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3 active:scale-[0.99] transition-transform"
            >
              {/* Header: Type + ID + Status */}
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded font-black">{order.type}</span>
                  <span className="text-[10px] font-bold text-gray-400">#{order.id.slice(-6)}</span>
                  <span className="text-[10px] text-gray-300 flex items-center gap-0.5">
                    <Calendar size={10} /> {order.time.split(' ')[1]}
                  </span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${statusStyle.bg} ${statusStyle.color}`}>
                  {order.status}
                </span>
              </div>

              {/* Product Info */}
              {order.items.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <img src={item.image} className="w-14 h-14 rounded-lg bg-gray-100 object-cover shrink-0" />
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <p className="text-xs font-bold text-gray-900 line-clamp-2">{item.name}</p>
                    <p className="text-[10px] text-gray-400 mt-1">x {item.qty}</p>
                  </div>
                </div>
              ))}

              {/* Footer: User + Total + Actions */}
              <div className="flex justify-between items-end pt-1">
                 <div className="flex items-center gap-2">
                    <img src={order.avatar} className="w-5 h-5 rounded-full" />
                    <span className="text-xs font-bold text-gray-600">{order.customer}</span>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] text-gray-400">实付金额</p>
                    <p className="text-base font-black text-gray-900">¥{order.total.toFixed(2)}</p>
                 </div>
              </div>

              {/* Action Buttons (Stop Propagation to prevent triggering card click) */}
              <div className="flex justify-end gap-2 pt-2 border-t border-gray-50">
                 {order.status === '待付款' && (
                   <button 
                    onClick={(e) => { e.stopPropagation(); alert('改价'); }} 
                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-[10px] font-bold text-gray-600 active:bg-gray-50"
                   >
                     修改价格
                   </button>
                 )}
                 {order.status === '待发货' && (
                   <button 
                    onClick={(e) => { e.stopPropagation(); alert('去发货'); }} 
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-bold shadow-sm active:bg-blue-700"
                   >
                     立即发货
                   </button>
                 )}
                 <button 
                  onClick={(e) => { e.stopPropagation(); }} 
                  className="px-2 py-1.5 text-gray-300 active:text-gray-500"
                 >
                   <MoreHorizontal size={16} />
                 </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderManagement;
