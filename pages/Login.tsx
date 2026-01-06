
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const StoreLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!phone) {
      alert('请输入手机号');
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      alert('请输入正确的手机号格式');
      return;
    }
    if (!password) {
      alert('请输入登录密码');
      return;
    }
    if (password.length < 8) {
      alert('密码长度至少为8位');
      return;
    }

    // 模拟登录逻辑
    localStorage.setItem('delivery_session', 'true');
    localStorage.setItem('user_role', 'store_admin');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col">
      <div className="mt-12 mb-12 text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-blue-100 mb-4">
          <Smartphone className="text-white" size={32} />
        </div>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">订水驿站 · 门店管理</h2>
        <p className="text-gray-400 mt-1 text-xs font-medium">智慧水站，高效管理</p>
      </div>

      <div className="space-y-8 flex-1">
        <div className="space-y-6">
          {/* 手机号输入 */}
          <div className="relative border-b border-gray-100 group focus-within:border-blue-500 transition-colors">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500">
              <Smartphone size={20} />
            </div>
            <input 
              type="tel" 
              placeholder="请输入手机号" 
              className="w-full pl-8 py-4 bg-transparent outline-none text-lg font-medium"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          
          {/* 密码输入 */}
          <div className="relative border-b border-gray-100 group focus-within:border-blue-500 transition-colors">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500">
              <Lock size={20} />
            </div>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="请输入登录密码" 
              className="w-full pl-8 py-4 bg-transparent outline-none text-lg font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 active:text-blue-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <button 
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            立即登录
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className="mt-auto text-center space-y-4">
        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
            门店账号需由管理员或系统录入。<br/>
            如无法登录，请咨询客服：<span className="text-blue-600 font-bold">400-888-9999</span>
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 text-[10px] text-gray-300 font-medium pb-4">
          <span>《门店服务协议》</span>
          <div className="w-1 h-1 bg-gray-200 rounded-full" />
          <span>《隐私政策》</span>
        </div>
      </div>
    </div>
  );
};

export default StoreLoginPage;
