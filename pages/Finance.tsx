
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Calendar, 
  ClipboardCheck, 
  PieChart 
} from 'lucide-react';

const DeliveryFinance: React.FC = () => {
  const navigate = useNavigate();

  const handleReconcile = () => {
    alert('正在发起自动对账，请稍后查看结果...');
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-full">
      <div className="bg-gradient-to-br from-indigo-700 to-blue-800 p-6 rounded-2xl shadow-xl text-white">
        <div className="flex justify-between items-start">
          <p className="text-sm opacity-80">可提现佣金 (元)</p>
          <div className="bg-white/10 px-3 py-1 rounded-full text-[10px] flex items-center gap-1">
             <Calendar size={12} /> 本月对账中
          </div>
        </div>
        <h2 className="text-4xl font-black mt-2">1,280.50</h2>
        <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/10">
          <div>
            <p className="text-[10px] opacity-60">今日累计</p>
            <p className="font-bold">¥126.00</p>
          </div>
          <div>
            <p className="text-[10px] opacity-60">待结算</p>
            <p className="font-bold">¥45.00</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-50 flex flex-col items-center gap-2 active:scale-95 transition-transform">
          <PieChart className="text-blue-500" />
          <span className="text-sm font-bold text-gray-700">收入分析</span>
        </button>
        <button 
          onClick={handleReconcile}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-50 flex flex-col items-center gap-2 active:scale-95 transition-transform"
        >
          <ClipboardCheck className="text-green-500" />
          <span className="text-sm font-bold text-gray-700">对账确认</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-sm">最近明细</h3>
          <span className="text-xs text-gray-400">最近30天</span>
        </div>
        <div className="divide-y divide-gray-50">
          {[
            { type: '订单配送提成', date: '2024-10-22 14:05', amount: '+7.50', status: '已入账', order: '2410220001' },
            { type: '楼层服务加价', date: '2024-10-22 13:40', amount: '+2.00', status: '已入账', order: '2410220002' },
            { type: '采购申请扣款', date: '2024-10-21 18:00', amount: '-150.00', status: '结算中', order: '9924102101' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 flex justify-between items-center active:bg-gray-50 transition-colors">
              <div className="flex gap-3">
                <div className={`p-2 rounded-lg ${item.amount.startsWith('+') ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                  {item.amount.startsWith('+') ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-gray-800">{item.type}</p>
                  <p className="text-[10px] text-gray-400">{item.date} | 单号: {item.order}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-black ${item.amount.startsWith('+') ? 'text-green-600' : 'text-gray-900'}`}>{item.amount}</p>
                <p className="text-[10px] text-gray-400">{item.status}</p>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={() => navigate('/transactions')}
          className="w-full py-4 text-xs text-blue-600 font-bold border-t border-gray-50 active:bg-gray-50"
        >
          查看更多
        </button>
      </div>
    </div>
  );
};

export default DeliveryFinance;
