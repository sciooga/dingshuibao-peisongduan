
import React, { useState } from 'react';
import { Scan, Keyboard, Search, CheckCircle2, AlertCircle } from 'lucide-react';

const OrderVerify: React.FC = () => {
  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);

  const handleVerify = () => {
    if (code.length < 6) return;
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      alert('核销成功！\n订单号：' + code + '\n商品：景田百岁山18.9L x2\n状态：已核销并同步水票。');
      setCode('');
    }, 1000);
  };

  return (
    <div className="min-h-full bg-white flex flex-col p-6 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-gray-900">自助核销</h2>
        <p className="text-xs text-gray-400 font-medium">支持用户自提订单、电子水票核销</p>
      </div>

      <div className="relative group">
        <div className="absolute inset-0 bg-blue-100 blur-2xl opacity-20 rounded-full group-focus-within:opacity-40 transition-opacity" />
        <button className="relative w-full aspect-square bg-gray-50 rounded-3xl border-4 border-dashed border-gray-200 flex flex-col items-center justify-center gap-4 active:bg-blue-50 active:border-blue-200 transition-all">
          <Scan size={64} strokeWidth={1.5} className="text-blue-500" />
          <span className="text-sm font-black text-gray-600">点击开启摄像头扫码</span>
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Keyboard size={16} className="text-gray-400" />
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">手动输入核销码</span>
        </div>
        <div className="relative">
          <input 
            type="number"
            placeholder="请输入8-12位核销码"
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-5 text-2xl font-black tracking-[0.2em] text-center outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-gray-200 placeholder:tracking-normal placeholder:text-lg"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <button 
          onClick={handleVerify}
          disabled={code.length < 6 || verifying}
          className={`w-full py-5 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all ${
            code.length < 6 
            ? 'bg-gray-100 text-gray-300 shadow-none' 
            : 'bg-blue-600 text-white shadow-blue-100 active:scale-95'
          }`}
        >
          {verifying ? (
            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <><CheckCircle2 size={24} /> 立即核销</>
          )}
        </button>
      </div>

      <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex gap-3">
        <AlertCircle className="text-orange-500 shrink-0 mt-0.5" size={18} />
        <div className="space-y-1">
          <p className="text-xs font-black text-orange-800">核销提示</p>
          <p className="text-[10px] text-orange-700 leading-relaxed">
            核销后电子水票将自动扣除，用户端同步更新为“已完成”。如遇扫码失败，请检查用户网络或尝试手动输入。
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderVerify;
