
import React, { useState } from 'react';
import { ShieldCheck, History, ClipboardCheck, Info, ChevronRight, ArrowRightLeft, Wallet } from 'lucide-react';

const DepositCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('rules');

  const rules = [
    { product: '农夫山泉 19L', deposit: 50, required: true },
    { product: '怡宝 18.9L', deposit: 40, required: true },
    { product: '促销款瓶装水', deposit: 0, required: false },
  ];

  const pendingRefunds = [
    { id: 'REF001', user: '张大妈', count: 3, amount: 150, date: '10-22 09:15' },
    { id: 'REF002', user: '李先生', count: 1, amount: 50, date: '10-21 17:40' },
  ];

  return (
    <div className="min-h-full bg-gray-50 flex flex-col">
      <div className="bg-white sticky top-12 z-20 border-b border-gray-100 flex px-2">
        {[
          { id: 'rules', label: '押金规则', icon: <ShieldCheck size={14} /> },
          { id: 'records', label: '支付记录', icon: <History size={14} /> },
          { id: 'refund', label: '退款审核', icon: <ClipboardCheck size={14} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 flex flex-col items-center gap-1.5 text-[11px] font-black transition-all relative ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && <div className="absolute bottom-0 h-1 bg-blue-600 rounded-full w-8" />}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-4">
        {activeTab === 'rules' && (
          <>
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex gap-3">
              <Info className="text-blue-500 shrink-0 mt-0.5" size={18} />
              <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
                新用户下单时，系统将根据此处规则自动计算需支付的桶押金。老用户或“免押金”标签商品将自动跳过押金环节。
              </p>
            </div>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
              {rules.map((rule, i) => (
                <div key={i} className="p-5 flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-black text-gray-800">{rule.product}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      {rule.required ? `标准押金: ¥${rule.deposit}` : '无需押金'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                     <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${rule.required ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
                        {rule.required ? '必付押金' : '免押金'}
                     </span>
                     <ChevronRight size={16} className="text-gray-300" />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-transform">
               新增押金规则
            </button>
          </>
        )}

        {activeTab === 'refund' && (
          <div className="space-y-3">
            {pendingRefunds.map(ref => (
              <div key={ref.id} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                      <Wallet size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-800">{ref.user}</p>
                      <p className="text-[10px] text-gray-400">申请时间: {ref.date}</p>
                    </div>
                  </div>
                  <span className="text-lg font-black text-orange-600">¥{ref.amount}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-2xl text-[11px] font-bold text-gray-600 flex items-center gap-2">
                  <ShieldCheck size={14} className="text-green-500" />
                  申请退回空桶数量: {ref.count} 只
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <button className="py-2.5 bg-gray-100 text-gray-500 rounded-xl text-xs font-black">驳回申请</button>
                   <button 
                    onClick={() => alert('请确认已完成线下取桶并核实数量。点击确定后系统将标记为已退款。')}
                    className="py-2.5 bg-green-600 text-white rounded-xl text-xs font-black shadow-lg shadow-green-100"
                   >
                     审核通过 (线下退款)
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'records' && (
          <div className="bg-white rounded-3xl p-10 flex flex-col items-center justify-center text-gray-300 border border-gray-100 border-dashed">
             <ArrowRightLeft size={48} strokeWidth={1} />
             <p className="text-xs mt-2 font-bold">暂无押金支付流水</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositCenter;
