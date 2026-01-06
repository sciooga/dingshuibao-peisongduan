
import React from 'react';
import { useParams } from 'react-router-dom';
import { Clock, User, Share2, Printer } from 'lucide-react';

const DeliveryNoticeDetail: React.FC = () => {
  const { id } = useParams();

  // Mock notice data based on ID
  const notice = {
    id,
    title: '本月配送星级考核标准更新说明',
    author: '调度管理中心',
    date: '2024-10-22 10:00',
    content: `
      <p>各位配送员师傅：</p>
      <p>为进一步优化服务体系，提升用户订水体验，平台决定自 2024 年 11 月 1 日起，正式施行全新的配送服务星级考核标准。本次标准调整重点关注以下三个维度：</p>
      
      <h3>1. 准时达率考核权重提升</h3>
      <p>准时达率在综合评分中的占比由原来的 30% 提升至 <strong>45%</strong>。请务必在规定时间内送达，避免因延迟导致的服务降权。</p>
      
      <h3>2. 异常主动上报奖励</h3>
      <p>对于遇到“号码错误”、“无人接听”等异常情况并能通过系统主动、准确报备的师傅，系统将给予每单 0.5 元的信誉分补偿。恶意错报将加重处罚。</p>
      
      <h3>3. 用户好评奖励方案</h3>
      <ul>
        <li>五星好评且带文字/图片：奖励 2 积分/单</li>
        <li>月度好评率 100% 且单量前三：授予“金牌配送员”称号，额外奖 200 元。</li>
      </ul>

      <img src="https://picsum.photos/800/400?random=202" alt="Notice Banner" />

      <p>请各位师傅严格遵守服务规范，保持良好的职业礼仪。祝大家配送顺利，月月爆单！</p>
      
      <p style="text-align: right; color: #999; font-size: 12px; margin-top: 40px;">
        订水驿站·配送管理部<br/>
        2024年10月22日
      </p>
    `
  };

  return (
    <div className="min-h-full bg-white flex flex-col pb-20">
      {/* Title Section */}
      <div className="p-6 border-b border-gray-50 space-y-4">
        <h1 className="text-xl font-black text-gray-900 leading-tight">
          {notice.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-[11px] text-gray-400 font-bold">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{notice.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={12} />
            <span>来源：{notice.author}</span>
          </div>
        </div>
      </div>

      {/* Rich Text Content Simulator */}
      <div className="p-6">
        <div className="prose-container">
          <style>
            {`
              .prose-container {
                font-size: 14px;
                color: #444;
                line-height: 1.8;
              }
              .prose-container p {
                margin-bottom: 16px;
              }
              .prose-container h3 {
                font-size: 16px;
                font-weight: 800;
                color: #1a1a1a;
                margin-top: 24px;
                margin-bottom: 12px;
                border-left: 4px solid #2563eb;
                padding-left: 10px;
              }
              .prose-container strong {
                color: #2563eb;
                font-weight: 800;
              }
              .prose-container ul {
                list-style: disc;
                padding-left: 20px;
                margin-bottom: 16px;
              }
              .prose-container li {
                margin-bottom: 8px;
              }
              .prose-container img {
                width: 100%;
                border-radius: 12px;
                margin: 24px 0;
                box-shadow: 0 4px 12px rgba(0,0,0,0.05);
              }
            `}
          </style>
          <div dangerouslySetInnerHTML={{ __html: notice.content }} />
        </div>
      </div>

      {/* Utility Footer */}
      <div className="mt-auto p-6 flex justify-center gap-8 border-t border-gray-50 bg-gray-50/50">
        <button className="flex flex-col items-center gap-2 text-gray-400 active:text-blue-500 transition-colors">
          <div className="p-3 bg-white rounded-full shadow-sm">
            <Share2 size={20} />
          </div>
          <span className="text-[10px] font-bold">转发</span>
        </button>
        <button className="flex flex-col items-center gap-2 text-gray-400 active:text-blue-500 transition-colors">
          <div className="p-3 bg-white rounded-full shadow-sm">
            <Printer size={20} />
          </div>
          <span className="text-[10px] font-bold">打印</span>
        </button>
      </div>
    </div>
  );
};

export default DeliveryNoticeDetail;
