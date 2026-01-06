
import React from 'react';
import { ClipboardList, Filter, Search, Clock, User } from 'lucide-react';

const OperationLogs: React.FC = () => {
  const logs = [
    { user: '李经理', action: '修改门店营业时间', date: '2024-10-22 14:20', id: 'L10023' },
    { user: '王师傅', action: '核销订单 [ORD22910]', date: '2024-10-22 13:05', id: 'L10022' },
    { user: '系统', action: '自动同步美团订单', date: '2024-10-22 12:00', id: 'L10021' },
    { user: '小张', action: '新增员工 [刘师傅]', date: '2024-10-21 16:45', id: 'L10020' },
    { user: '李经理', action: '导出上月营收报表', date: '2024-10-21 10:10', id: 'L10019' },
  ];

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-10">
      <div className="bg-white p-4 space-y-4 border-b border-gray-100 sticky top-12 z-20">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
          <input 
            placeholder="搜索操作内容/操作人"
            className="w-full bg-gray-50 rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium outline-none border border-transparent focus:border-blue-500 transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
           <button className="flex-none bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black flex items-center gap-1 shadow-md shadow-blue-100">
             <Filter size={12} /> 全部行为
           </button>
           <button className="flex-none bg-white text-gray-500 px-4 py-1.5 rounded-full text-[10px] font-black border border-gray-100">订单操作</button>
           <button className="flex-none bg-white text-gray-500 px-4 py-1.5 rounded-full text-[10px] font-black border border-gray-100">人员变动</button>
           <button className="flex-none bg-white text-gray-500 px-4 py-1.5 rounded-full text-[10px] font-black border border-gray-100">财务相关</button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {logs.map((log) => (
          <div key={log.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex gap-4 active:bg-gray-50 transition-colors">
            <div className="shrink-0 w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
              <ClipboardList size={20} />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-black text-gray-800 leading-tight">{log.action}</p>
              <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400">
                <span className="flex items-center gap-1"><User size={10} /> {log.user}</span>
                <span className="flex items-center gap-1"><Clock size={10} /> {log.date}</span>
              </div>
            </div>
            <span className="text-[9px] text-gray-300 font-mono self-start mt-1">#{log.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OperationLogs;
