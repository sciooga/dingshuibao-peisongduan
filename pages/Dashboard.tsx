
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Star, 
  Wallet, 
  Package, 
  ChevronRight, 
  Truck, 
  Volume2,
  VolumeX,
  AlertCircle,
  Megaphone,
  LogOut,
  Store,
  Users,
  Scan,
  ClipboardList,
  Settings,
  ArrowRightLeft,
  ShieldCheck,
  User,
  Image as ImageIcon,
  Printer,
  ShoppingBag,
  FileText
} from 'lucide-react';

const StoreDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('张三');

  useEffect(() => {
    const storedName = localStorage.getItem('user_name');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const stats = {
    todayOrders: 24,
    todaySales: "2,450.00",
    staffCount: 5,
    pendingDispatch: 3
  };

  const handleLogout = () => {
    localStorage.removeItem('delivery_session');
    localStorage.removeItem('user_name');
    navigate('/login');
  };

  const quickActions = [
    { label: '扫码核销', icon: <Scan size={24} />, path: '/verify', color: 'bg-blue-500' },
    { label: '订单管理', icon: <FileText size={24} />, path: '/order-management', color: 'bg-indigo-500' },
    { label: '派单管理', icon: <ArrowRightLeft size={24} />, path: '/dispatch', color: 'bg-purple-500' },
    { label: '商品管理', icon: <ShoppingBag size={24} />, path: '/products', color: 'bg-pink-500' },
    
    { label: '采购申请', icon: <Package size={24} />, path: '/replenish', color: 'bg-orange-500' },
    { label: '账目提现', icon: <Wallet size={24} />, path: '/finance', color: 'bg-green-500' },
    { label: '打印机', icon: <Printer size={24} />, path: '/settings', color: 'bg-cyan-500', state: { initialTab: 'printer' } },
    { label: '广告设置', icon: <ImageIcon size={24} />, path: '/settings', color: 'bg-teal-500', state: { initialTab: 'ads' } },
  ];

  const managementGroups = [
    {
      title: '管理功能',
      items: [
        { label: '店铺信息', sub: '名称/位置/时间', icon: <Store className="text-blue-500" />, path: '/store-profile' },
        { label: '员工管理', sub: '账号/权限/管理', icon: <Users className="text-purple-500" />, path: '/staff' },
        { label: '派单调度', sub: '手动派单/转派大厅', icon: <ArrowRightLeft className="text-indigo-500" />, path: '/dispatch' },
      ]
    },
    {
      title: '通用设置',
      items: [
        { label: '桶押金中心', sub: '规则/记录/退押金', icon: <ShieldCheck className="text-green-600" />, path: '/deposit' },
        { label: '操作日志', sub: '行为审计/记录查询', icon: <ClipboardList className="text-gray-500" />, path: '/logs' },
        { label: '系统设置', sub: '打印/广告/参数', icon: <Settings className="text-orange-500" />, path: '/settings' },
      ]
    }
  ];

  return (
    <div className="space-y-4 pb-10 px-4 pt-4">
      {/* Store Header */}
      <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 opacity-10">
          <Store size={150} />
        </div>
        <div className="flex justify-between items-start relative z-10">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                <span>昆明旗舰店</span>
                <span className="w-[1px] h-4 bg-white/20 self-center" />
                <span className="text-blue-100 flex items-center gap-1.5">
                  <User size={20} className="text-blue-200" />
                  {userName}
                </span>
              </h3>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-lg font-bold uppercase text-white/70 border border-white/5 backdrop-blur-sm">ID: 8892</span>
              <span className="text-[10px] bg-green-400/30 text-green-100 px-2 py-0.5 rounded-lg font-bold">营业中</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 bg-white/10 rounded-full active:bg-white/20 transition-colors border border-white/5 backdrop-blur-sm"
          >
            <LogOut size={18} />
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-8 relative z-10">
          <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm border border-white/5">
            <p className="text-[9px] text-white/50 font-bold uppercase">今日单量</p>
            <p className="text-lg font-black mt-0.5">{stats.todayOrders}</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm border border-white/5">
            <p className="text-[9px] text-white/50 font-bold uppercase">今日营收</p>
            <p className="text-lg font-black mt-0.5">¥{stats.todaySales}</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm border border-white/5">
            <p className="text-[9px] text-white/50 font-bold uppercase">待派单</p>
            <p className="text-lg font-black mt-0.5 text-orange-300">{stats.pendingDispatch}</p>
          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-4 gap-3">
        {quickActions.map((action, i) => (
          <button 
            key={i}
            onClick={() => navigate(action.path, { state: action.state })}
            className="flex flex-col items-center gap-2 group active:scale-90 transition-transform"
          >
            <div className={`${action.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100 group-active:shadow-none`}>
              {action.icon}
            </div>
            <span className="text-[11px] font-black text-gray-700 whitespace-nowrap">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Management Sections */}
      {managementGroups.map((group, idx) => (
        <div key={idx} className="space-y-2 pt-2">
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">{group.title}</h4>
          <div className="bg-white rounded-3xl shadow-sm divide-y divide-gray-50 overflow-hidden border border-gray-100">
            {group.items.map((item, i) => (
              <div 
                key={i} 
                onClick={() => navigate(item.path)}
                className="flex items-center justify-between p-4 active:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gray-50 p-3 rounded-2xl">{item.icon}</div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-black text-gray-800">{item.label}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{item.sub}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoreDashboard;
    