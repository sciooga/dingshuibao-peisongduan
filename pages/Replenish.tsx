
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  X, 
  Info, 
  FileText, 
  ShieldCheck,
  History,
  PlusCircle,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight
} from 'lucide-react';

interface ReplenishRecord {
  id: string;
  date: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  remark?: string;
}

const DeliveryReplenish: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'apply' | 'history'>('apply');
  const [applyContent, setApplyContent] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);

  // Mock historical data
  const historyRecords: ReplenishRecord[] = [
    { id: 'R001', date: '2024-10-22 09:30', content: '申请补货：轿子山泉20桶，农夫山泉10桶。今日区域订单量激增，库存不足。', status: 'approved', remark: '已核准，请到仓库领取。' },
    { id: 'R002', date: '2024-10-21 14:20', content: '申请压水器5个，抽水泵2个。', status: 'pending' },
    { id: 'R003', date: '2024-10-20 10:00', content: '申请工作服一套（L码）。', status: 'rejected', remark: '每人每半年限领一套，您的额度已用完。' },
  ];

  const handleUpload = () => {
    setAttachments([...attachments, `file_${Date.now()}.jpg`]);
  };

  const handleSubmit = () => {
    if (!applyContent.trim()) {
      alert('请输入申请内容');
      return;
    }
    alert('采购申请已提交，请等待门店管理员审批');
    setApplyContent('');
    setAttachments([]);
    setActiveTab('history');
  };

  const getStatusStyle = (status: ReplenishRecord['status']) => {
    switch (status) {
      case 'approved': return { bg: 'bg-green-50', text: 'text-green-600', icon: <CheckCircle2 size={12} />, label: '已通过' };
      case 'rejected': return { bg: 'bg-red-50', text: 'text-red-600', icon: <XCircle size={12} />, label: '已驳回' };
      default: return { bg: 'bg-amber-50', text: 'text-amber-600', icon: <Clock size={12} />, label: '待审批' };
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      {/* Tabs */}
      <div className="bg-white px-4 pt-2 border-b border-gray-100 sticky top-12 z-20">
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('apply')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${activeTab === 'apply' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}
          >
            <PlusCircle size={14} /> 新增申请
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${activeTab === 'history' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}
          >
            <History size={14} /> 历史记录
          </button>
        </div>
        <div className="h-2" />
      </div>

      <div className="p-4 space-y-6 flex-1">
        {activeTab === 'apply' ? (
          <>
            {/* Info Banner */}
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3">
              <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700 leading-relaxed">
                请描述您需要的商品名称、规格及数量。
              </p>
            </div>

            {/* Application Content */}
            <div className="space-y-3">
              <h3 className="font-bold text-sm px-1">采购补货申请</h3>
              <textarea 
                className="w-full bg-white rounded-2xl p-4 text-sm min-h-[160px] border border-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-300"
                placeholder="例如：需要补货 轿子山泉18.9L * 20桶，农夫山泉19L * 10桶..."
                value={applyContent}
                onChange={(e) => setApplyContent(e.target.value)}
              />
            </div>

            {/* Upload Section */}
            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <h3 className="font-bold text-sm">凭证附件 (可选)</h3>
                <span className="text-[10px] text-gray-400">支持照片拍摄/相册选择</span>
              </div>
              <div className="flex gap-3 flex-wrap">
                {attachments.map((file, i) => (
                  <div key={i} className="w-20 h-20 bg-gray-200 rounded-xl relative flex items-center justify-center overflow-hidden border border-gray-100">
                     <FileText size={24} className="text-gray-400" />
                     <button 
                       onClick={() => setAttachments(attachments.filter((_, idx) => idx !== i))}
                       className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5"
                     >
                       <X size={12} />
                     </button>
                  </div>
                ))}
                <button 
                  onClick={handleUpload}
                  className="w-20 h-20 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 active:bg-gray-50"
                >
                  <Upload size={20} />
                  <span className="text-[10px] mt-1">上传</span>
                </button>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-6 space-y-4">
              <button 
                onClick={handleSubmit}
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold shadow-xl shadow-gray-200 active:scale-95 transition-transform"
              >
                提交采购申请
              </button>
              
              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
                <ShieldCheck size={14} /> 请合理申请采购
              </div>
            </div>
          </>
        ) : (
          /* History List */
          <div className="space-y-4">
            {historyRecords.map((record) => {
              const style = getStatusStyle(record.status);
              return (
                <div key={record.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden active:bg-gray-50 transition-colors">
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                        <Clock size={10} /> {record.date}
                      </span>
                      <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${style.bg} ${style.text}`}>
                        {style.icon} {style.label}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">
                      {record.content}
                    </p>
                    {record.remark && (
                      <div className="bg-gray-50 p-2 rounded-lg border-l-2 border-gray-200">
                        <p className="text-[11px] text-gray-500 italic">管理员回复：{record.remark}</p>
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-[10px] text-gray-300">单号: {record.id}</span>
                    <button className="text-[10px] text-blue-500 font-bold flex items-center gap-0.5">
                      查看详情 <ChevronRight size={10} />
                    </button>
                  </div>
                </div>
              );
            })}
            {historyRecords.length === 0 && (
              <div className="py-20 flex flex-col items-center justify-center text-gray-300 space-y-2">
                <History size={48} strokeWidth={1} />
                <p className="text-xs">暂无历史申请记录</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryReplenish;
