
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, AlertCircle, History } from 'lucide-react';

const Withdraw: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const balance = 1280.50;

  const handleAll = () => {
    setAmount(String(balance));
  };

  const handleSubmit = () => {
    const val = parseFloat(amount);
    if (!val || val <= 0) {
      alert('请输入有效的提现金额');
      return;
    }
    if (val > balance) {
      alert('余额不足');
      return;
    }
    if (val < 10) {
      alert('最低提现金额为 10 元');
      return;
    }
    
    // API simulation
    alert(`申请提现 ¥${val} 成功！\n预计 2 小时内到账至微信零钱。`);
    navigate(-1);
  };

  return (
    <div className="min-h-full bg-gray-50 flex flex-col">
       {/* Header with History Link */}
       <div className="bg-white p-4 flex justify-end border-b border-gray-50 sticky top-12 z-20">
          <button onClick={() => navigate('/transactions')} className="text-xs font-bold text-gray-600 flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-lg active:bg-gray-200">
             <History size={14} /> 提现记录
          </button>
       </div>

       <div className="p-4 space-y-4">
          {/* Amount Card */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
             <div className="flex justify-between items-center">
                <span className="text-sm font-black text-gray-900">提现金额</span>
             </div>
             <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                <span className="text-3xl font-black text-gray-900">¥</span>
                <input 
                  type="number" 
                  className="flex-1 text-4xl font-black outline-none bg-transparent placeholder:text-gray-200"
                  placeholder="0.00"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  autoFocus
                />
             </div>
             <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 font-medium">可提现余额 ¥{balance.toFixed(2)}</span>
                <button onClick={handleAll} className="text-blue-600 font-black px-2 py-1 active:bg-blue-50 rounded-lg transition-colors">全部提现</button>
             </div>
          </div>

          {/* Method Card */}
          <div className="bg-white p-2 rounded-3xl shadow-sm border border-gray-100">
             <div className="p-4 flex items-center justify-between border-b border-gray-50 last:border-0 active:bg-gray-50 rounded-2xl transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-[#09BB07]/10 text-[#09BB07] rounded-xl flex items-center justify-center">
                      <Wallet size={20} />
                   </div>
                   <div>
                      <p className="text-sm font-black text-gray-900">提现到微信零钱</p>
                      <p className="text-[10px] text-gray-400 font-bold mt-0.5">推荐 · 实时到账 · 免手续费</p>
                   </div>
                </div>
                <div className="w-5 h-5 rounded-full border-[5px] border-blue-600" />
             </div>
             
             <div className="p-4 flex items-center justify-between active:bg-gray-50 rounded-2xl transition-colors cursor-pointer opacity-50 grayscale">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                      <CreditCard size={20} />
                   </div>
                   <div>
                      <p className="text-sm font-black text-gray-900">提现到银行卡</p>
                      <p className="text-[10px] text-gray-400 font-bold mt-0.5">T+1 到账 · 暂不支持</p>
                   </div>
                </div>
                <div className="w-5 h-5 rounded-full border-2 border-gray-200" />
             </div>
          </div>

          <button 
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 active:scale-[0.98] transition-all mt-4"
          >
             确认提现
          </button>

          <div className="bg-gray-100/50 p-4 rounded-2xl flex gap-3">
             <AlertCircle size={16} className="text-gray-400 shrink-0 mt-0.5" />
             <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                1. 每日可提现 3 次，单笔最低 10 元，最高 5000 元。<br/>
                2. 微信提现一般实时到账，如遇高峰期可能延迟至 2 小时内。<br/>
                3. 提现过程中如遇问题，请联系平台客服 400-888-9999。
             </p>
          </div>
       </div>
    </div>
  );
};

export default Withdraw;
