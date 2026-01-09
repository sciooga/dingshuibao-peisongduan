
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Calendar, 
  ClipboardCheck, 
  PieChart,
  Wallet
} from 'lucide-react';

const DeliveryFinance: React.FC = () => {
  const navigate = useNavigate();

  const handleReconcile = () => {
    alert('正在发起自动对账，请稍后查看结果...');
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-full">
      <div className="bg-gradient-to-br from-indigo-700 to-blue-800 p-6 rounded-2xl shadow-xl text-white relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex justify-between items-start relative z-10">
          <p className="text-sm opacity-80 font-medium">可提现佣金 (元)</p>
          <div className="bg-white/10 px-3 py-1 rounded-full text-[10px] flex items-center gap-1 backdrop-blur-sm border border-white/10">
             <Calendar size={12} /> 本月对账中
          </div>
        </div>
        <h2 className="text-4xl font-black mt-2 tracking-tight">1,280.50</h2>
        <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/10 relative z-10">
          <div>
            <p className="text-[10px] opacity-60 font-bold mb-0.5">今日累计</p>
            <p className="font-black text-lg">¥126.00</p>
          </div>
          <div>
            <p className="text-[10px] opacity-60 font-bold mb-0.5">待结算</p>
            <p className="font-black text-lg">¥45.00</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button 
          onClick={() => navigate('/withdraw')}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-50 flex flex-col items-center gap-2 active:scale-95 transition-transform"
        >
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
             <Wallet size={20} />
          </div>
          <span className="text-xs font-black text-gray-700">申请提现</span>
        </button>
        <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-50 flex flex-col items-center gap-2 active:scale-95 transition-transform">
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
             <PieChart size={20} />
          </div>
          <span className="text-xs font-black text-gray-700">收入分析</span>
        </button>
        <button 
          onClick={handleReconcile}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-50 flex flex-col items-center gap-2 active:scale-95 transition-transform"
        >
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
             <ClipboardCheck size={20} />
          </div>
          <span className="text-xs font-black text-gray-700">对账确认</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-black text-sm text-gray-900">最近明细</h3>
          <span className="text-[10px] text-gray-400 font-bold">最近30天</span>
        </div>
        <div className="divide-y divide-gray-50">
          {[
            { type: '订单配送提成', date: '2024-10-22 14:05', amount: '+7.50', status: '已入账', order: '2410220001' },
            { type: '楼层服务加价', date: '2024-10-22 13:40', amount: '+2.00', status: '已入账', order: '2410220002' },
            { type: '采购申请扣款', date: '2024-10-21 18:00', amount: '-150.00', status: '结算中', order: '9924102101' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 flex justify-between items-center active:bg-gray-50 transition-colors">
              <div className="flex gap-3">
                <div className={`p-2 rounded-lg h-fit ${item.amount.startsWith('+') ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                  {item.amount.startsWith('+') ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-gray-800">{item.type}</p>
                  <p className="text-[10px] text-gray-400 font-medium">{item.date} | 单号: {item.order}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-black ${item.amount.startsWith('+') ? 'text-green-600' : 'text-gray-900'}`}>{item.amount}</p>
                <p className="text-[10px] text-gray-400 font-medium">{item.status}</p>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={() => navigate('/transactions')}
          className="w-full py-4 text-xs text-blue-600 font-black border-t border-gray-50 active:bg-gray-50 flex items-center justify-center"
        >
          查看更多明细
        </button>
      </div>
    </div>
  );
};

export default DeliveryFinance;
