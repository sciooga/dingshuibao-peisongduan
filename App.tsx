
import React from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { LayoutGrid, Smartphone, ChevronLeft, Phone, Bell } from 'lucide-react';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Finance from './pages/Finance';
import Replenish from './pages/Replenish';
import Transactions from './pages/Transactions';
import Notices from './pages/Notices';
import NoticeDetail from './pages/NoticeDetail';

// New Store Management Pages
import StoreProfile from './pages/StoreProfile';
import StaffManagement from './pages/StaffManagement';
import OrderVerify from './pages/OrderVerify';
import OperationLogs from './pages/OperationLogs';
import SettingsCenter from './pages/SettingsCenter';
import DispatchCenter from './pages/DispatchCenter';
import DepositCenter from './pages/DepositCenter';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { path: '/orders', label: '配送', icon: <Phone size={22} /> },
    { path: '/notices', label: '公告', icon: <Bell size={22} /> },
    { path: '/', label: '工作台', icon: <LayoutGrid size={22} /> },
    { path: '/finance', label: '账目', icon: <Smartphone size={22} /> },
  ];

  const hideOn = ['/login'];
  const isDetailPage = location.pathname.startsWith('/notices/') && location.pathname !== '/notices';
  
  if (hideOn.includes(location.pathname) || isDetailPage) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center py-2 safe-bottom z-50">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400'}`}
          >
            {tab.icon}
            <span className="text-[10px] sm:text-xs font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mainTabs = ['/', '/orders', '/finance', '/notices'];
  const showBack = !mainTabs.includes(location.pathname);

  const getTitle = () => {
    if (location.pathname.startsWith('/notices/') && location.pathname !== '/notices') return '公告详情';
    switch (location.pathname) {
      case '/': return '工作台';
      case '/orders': return '配送订单';
      case '/finance': return '我的账目';
      case '/replenish': return '采购补货';
      case '/transactions': return '账目明细';
      case '/notices': return '配送公告';
      case '/login': return '门店登录';
      case '/store-profile': return '店铺信息';
      case '/staff': return '员工管理';
      case '/verify': return '订单核销';
      case '/logs': return '操作日志';
      case '/settings': return '系统设置';
      case '/dispatch': return '派单管理';
      case '/deposit': return '桶押金中心';
      default: return '订水驿站';
    }
  };

  return (
    <div className="sticky top-0 bg-white z-40 px-4 h-12 flex items-center justify-between border-b border-gray-50 shadow-sm">
      {showBack ? (
        <button onClick={() => navigate(-1)} className="p-1 active:bg-gray-100 rounded-full transition-colors"><ChevronLeft size={24} /></button>
      ) : <div className="w-8" />}
      <h1 className="text-base font-black text-gray-900 tracking-tight">{getTitle()}</h1>
      <div className="w-8" />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto shadow-2xl relative overflow-x-hidden">
        <Header />
        <main className="flex-1 pb-20">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/replenish" element={<Replenish />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/notices/:id" element={<NoticeDetail />} />
            
            {/* New Routes */}
            <Route path="/store-profile" element={<StoreProfile />} />
            <Route path="/staff" element={<StaffManagement />} />
            <Route path="/verify" element={<OrderVerify />} />
            <Route path="/logs" element={<OperationLogs />} />
            <Route path="/settings" element={<SettingsCenter />} />
            <Route path="/dispatch" element={<DispatchCenter />} />
            <Route path="/deposit" element={<DepositCenter />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
};

export default App;
