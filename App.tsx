
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { LayoutGrid, Smartphone, ChevronLeft, Phone, Bell, Bug, X } from 'lucide-react';

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
import ProductManagement from './pages/ProductManagement';
import OrderManagement from './pages/OrderManagement';
import OrderDetail from './pages/OrderDetail';
import Withdraw from './pages/Withdraw';
import ManualOrder from './pages/ManualOrder';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { path: '/orders', label: '接单大厅', icon: <Phone size={22} /> },
    { path: '/notices', label: '公告', icon: <Bell size={22} /> },
    { path: '/', label: '工作台', icon: <LayoutGrid size={22} /> },
    { path: '/finance', label: '账目', icon: <Smartphone size={22} /> },
  ];

  const hideOn = ['/login'];
  const isDetailPage = (location.pathname.startsWith('/notices/') && location.pathname !== '/notices') || 
                       (location.pathname.startsWith('/order-management/') && location.pathname !== '/order-management');
  
  if (hideOn.includes(location.pathname) || isDetailPage) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center py-2 safe-bottom z-50">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex-col items-center gap-1 transition-colors flex ${isActive ? 'text-blue-600' : 'text-gray-400'}`}
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
  const [showDebug, setShowDebug] = useState(false);

  const mainTabs = ['/', '/orders', '/finance', '/notices'];
  const showBack = !mainTabs.includes(location.pathname);

  const getTitle = () => {
    if (location.pathname.startsWith('/notices/') && location.pathname !== '/notices') return '公告详情';
    if (location.pathname.startsWith('/order-management/') && location.pathname !== '/order-management') return '订单详情';
    
    switch (location.pathname) {
      case '/': return '工作台';
      case '/orders': return '接单大厅';
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
      case '/products': return '商品管理';
      case '/order-management': return '销售订单';
      case '/withdraw': return '余额提现';
      case '/manual-order': return '手动录单';
      default: return '订水驿站';
    }
  };

  const debugRoutes = [
    { path: '/login', name: '登录页 (Login)' },
    { path: '/', name: '工作台 (Dashboard)' },
    { path: '/orders', name: '接单大厅 (Orders)' },
    { path: '/finance', name: '我的账目 (Finance)' },
    { path: '/replenish', name: '采购补货 (Replenish)' },
    { path: '/transactions', name: '账目明细 (Transactions)' },
    { path: '/notices', name: '配送公告 (Notices)' },
    { path: '/store-profile', name: '店铺信息 (StoreProfile)' },
    { path: '/staff', name: '员工管理 (Staff)' },
    { path: '/verify', name: '订单核销 (OrderVerify)' },
    { path: '/logs', name: '操作日志 (OperationLogs)' },
    { path: '/settings', name: '系统设置 (SettingsCenter)' },
    { path: '/dispatch', name: '派单管理 (DispatchCenter)' },
    { path: '/deposit', name: '桶押金中心 (DepositCenter)' },
    { path: '/products', name: '商品管理 (ProductManagement)' },
    { path: '/order-management', name: '订单管理 (OrderManagement)' },
    { path: '/withdraw', name: '余额提现 (Withdraw)' },
    { path: '/manual-order', name: '手动录单 (ManualOrder)' },
  ];

  return (
    <>
      <div className="sticky top-0 bg-white z-40 px-4 h-12 flex items-center justify-between border-b border-gray-50 shadow-sm">
        {showBack ? (
          <button onClick={() => navigate(-1)} className="p-1 active:bg-gray-100 rounded-full transition-colors"><ChevronLeft size={24} /></button>
        ) : <div className="w-8" />}
        
        <h1 className="text-base font-black text-gray-900 tracking-tight">{getTitle()}</h1>
        
        <button 
          onClick={() => setShowDebug(true)}
          className="w-8 h-8 flex items-center justify-center text-gray-300 active:text-blue-600 active:bg-blue-50 rounded-full transition-colors"
        >
          <Bug size={18} />
        </button>
      </div>

      {showDebug && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-8 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm max-h-[70vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2 text-gray-800">
                <Bug size={18} className="text-blue-500" />
                <span className="font-black text-sm">开发调试 - 页面跳转</span>
              </div>
              <button 
                onClick={() => setShowDebug(false)}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full active:bg-gray-200 text-gray-500"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="overflow-y-auto p-4 space-y-2">
              {debugRoutes.map((route) => (
                <button
                  key={route.path}
                  onClick={() => {
                    navigate(route.path);
                    setShowDebug(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                    location.pathname === route.path 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                      : 'bg-gray-50 text-gray-600 active:bg-gray-100'
                  }`}
                >
                  <span>{route.name}</span>
                  {location.pathname === route.path && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
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
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/order-management" element={<OrderManagement />} />
            <Route path="/order-management/:id" element={<OrderDetail />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/manual-order" element={<ManualOrder />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
};

export default App;
