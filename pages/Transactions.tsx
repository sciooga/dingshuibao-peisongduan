
import React, { useState, useMemo } from 'react';
import { Search, ArrowUpRight, ArrowDownLeft, Calendar, Filter, X } from 'lucide-react';

interface Transaction {
  id: string;
  type: string;
  category: 'income' | 'outcome';
  date: Date;
  amount: number;
  status: string;
  orderId: string;
}

const DeliveryTransactions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('全部');

  const timeFilters = ['全部', '今日', '本周', '本月', '近三月'];

  // Helper to generate mock dates relative to now
  const now = new Date();
  const getRelativeDate = (daysAgo: number, hoursAgo: number = 0) => {
    const d = new Date(now);
    d.setDate(d.getDate() - daysAgo);
    d.setHours(d.getHours() - hoursAgo);
    return d;
  };

  const allTransactions: Transaction[] = [
    { id: '1', type: '订单配送提成', category: 'income', date: getRelativeDate(0, 2), amount: 7.50, status: '已入账', orderId: '2410220001' },
    { id: '2', type: '楼层服务加价', category: 'income', date: getRelativeDate(0, 5), amount: 2.00, status: '已入账', orderId: '2410220002' },
    { id: '3', type: '采购申请扣款', category: 'outcome', date: getRelativeDate(2), amount: 150.00, status: '已结算', orderId: '9924102101' },
    { id: '4', type: '准时配送奖励', category: 'income', date: getRelativeDate(4), amount: 5.00, status: '已入账', orderId: '2410220003' },
    { id: '5', type: '订单配送提成', category: 'income', date: getRelativeDate(10), amount: 7.50, status: '已入账', orderId: '2410220004' },
    { id: '6', type: '差评投诉扣款', category: 'outcome', date: getRelativeDate(25), amount: 10.00, status: '已扣除', orderId: '2410220000' },
    { id: '7', type: '订单配送提成', category: 'income', date: getRelativeDate(45), amount: 7.50, status: '已入账', orderId: '2410220005' },
  ];

  const filteredTransactions = useMemo(() => {
    return allTransactions.filter(item => {
      // Search logic
      const matchesSearch = item.type.includes(searchQuery) || item.orderId.includes(searchQuery);
      
      // Time filter logic
      let matchesTime = true;
      const itemTime = item.date.getTime();
      const oneDay = 24 * 60 * 60 * 1000;
      
      if (activeFilter === '今日') {
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        matchesTime = itemTime >= startOfDay;
      } else if (activeFilter === '本周') {
        const startOfWeek = now.getTime() - (now.getDay() * oneDay);
        matchesTime = itemTime >= startOfWeek;
      } else if (activeFilter === '本月') {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
        matchesTime = itemTime >= startOfMonth;
      } else if (activeFilter === '近三月') {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(now.getMonth() - 3);
        matchesTime = itemTime >= threeMonthsAgo.getTime();
      }

      return matchesSearch && matchesTime;
    });
  }, [searchQuery, activeFilter, allTransactions, now]);

  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    return `${y}-${m}-${d} ${hh}:${mm}`;
  };

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      {/* Search and Filters Header */}
      <div className="bg-white sticky top-12 z-20 border-b border-gray-100 shadow-sm">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索订单号或账目类型"
              className="w-full bg-gray-50 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto hide-scrollbar px-4 pb-4">
          {timeFilters.map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs whitespace-nowrap font-bold transition-all ${activeFilter === filter ? 'bg-blue-600 text-white shadow-md shadow-blue-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Date Divider (Simulated) */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1 text-[11px] font-bold text-gray-400">
          <Calendar size={12} />
          <span>{activeFilter === '全部' ? '所有历史' : `筛选范围: ${activeFilter}`}</span>
        </div>
        <Filter size={14} className="text-gray-300" />
      </div>

      {/* List */}
      <div className="px-4 pb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden divide-y divide-gray-50">
          {filteredTransactions.length > 0 ? filteredTransactions.map((item) => (
            <div key={item.id} className="p-4 flex justify-between items-center active:bg-gray-50 transition-colors">
              <div className="flex gap-3">
                <div className={`p-2.5 rounded-xl ${item.category === 'income' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                  {item.category === 'income' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-gray-800">{item.type}</p>
                  <p className="text-[10px] text-gray-400">{formatDate(item.date)} | 单号: {item.orderId}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-base font-black ${item.category === 'income' ? 'text-green-600' : 'text-gray-900'}`}>
                  {item.category === 'income' ? '+' : '-'}{item.amount.toFixed(2)}
                </p>
                <p className="text-[10px] font-medium text-gray-400">{item.status}</p>
              </div>
            </div>
          )) : (
            <div className="py-20 flex flex-col items-center justify-center text-gray-300 space-y-2">
              <div className="bg-gray-50 p-4 rounded-full">
                <Calendar size={32} strokeWidth={1.5} />
              </div>
              <p className="text-xs">该时间段内暂无记录</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryTransactions;
