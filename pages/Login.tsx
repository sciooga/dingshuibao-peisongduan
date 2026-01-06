
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Lock, Eye, EyeOff, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';

const StoreLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false); // Toggle between Login and Register

  // Form State
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  
  // UI State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Countdown timer for verification code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendCode = () => {
    if (!phone) {
      alert('请输入手机号');
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      alert('请输入正确的手机号格式');
      return;
    }
    // Simulate API call
    setCountdown(60);
    alert(`验证码已发送至 ${phone} (测试码: 123456)`);
  };

  const handleSubmit = () => {
    // Common Validation
    if (!phone) {
      alert('请输入手机号');
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      alert('请输入正确的手机号格式');
      return;
    }

    if (isRegister) {
      // Registration Logic
      if (!code) {
        alert('请输入验证码');
        return;
      }
      if (code !== '123456') {
         alert('验证码错误 (测试码: 123456)');
         return;
      }
      if (!password) {
        alert('请设置登录密码');
        return;
      }
      if (password.length < 8) {
        alert('密码长度至少为8位');
        return;
      }
      if (password !== confirmPassword) {
        alert('两次输入的密码不一致');
        return;
      }

      // Simulate Registration API
      alert('注册成功！欢迎加入订水驿站');
      localStorage.setItem('delivery_session', 'true');
      localStorage.setItem('user_role', 'store_admin');
      navigate('/');
      
    } else {
      // Login Logic
      if (!password) {
        alert('请输入登录密码');
        return;
      }
      if (password.length < 8) {
        alert('密码长度至少为8位');
        return;
      }

      // Simulate Login API
      localStorage.setItem('delivery_session', 'true');
      localStorage.setItem('user_role', 'store_admin');
      navigate('/');
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    // Reset fields
    setPassword('');
    setConfirmPassword('');
    setCode('');
    setCountdown(0);
  };

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col">
      <div className="mt-8 mb-8 text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-blue-100 mb-4">
          <Smartphone className="text-white" size={32} />
        </div>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">
          {isRegister ? '门店入驻注册' : '订水驿站 · 门店管理'}
        </h2>
        <p className="text-gray-400 mt-1 text-xs font-medium">
          {isRegister ? '创建您的数字化水站账号' : '智慧水站，高效管理'}
        </p>
      </div>

      <div className="space-y-6 flex-1">
        <div className="space-y-5">
          {/* 手机号输入 */}
          <div className="relative border-b border-gray-100 group focus-within:border-blue-500 transition-colors">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500">
              <Smartphone size={20} />
            </div>
            <input 
              type="tel" 
              placeholder="请输入手机号" 
              className="w-full pl-8 py-3.5 bg-transparent outline-none text-lg font-medium"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* 验证码输入 (Register Mode Only) */}
          {isRegister && (
            <div className="relative border-b border-gray-100 group focus-within:border-blue-500 transition-colors flex items-center">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500">
                <MessageSquare size={20} />
              </div>
              <input 
                type="number" 
                placeholder="短信验证码" 
                className="w-full pl-8 py-3.5 bg-transparent outline-none text-lg font-medium"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button 
                onClick={handleSendCode}
                disabled={countdown > 0}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                  countdown > 0 
                    ? 'bg-gray-100 text-gray-400' 
                    : 'bg-blue-50 text-blue-600 active:bg-blue-100'
                }`}
              >
                {countdown > 0 ? `${countdown}s后重发` : '获取验证码'}
              </button>
            </div>
          )}
          
          {/* 密码输入 */}
          <div className="relative border-b border-gray-100 group focus-within:border-blue-500 transition-colors">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500">
              <Lock size={20} />
            </div>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder={isRegister ? "设置登录密码 (至少8位)" : "请输入登录密码"} 
              className="w-full pl-8 py-3.5 bg-transparent outline-none text-lg font-medium"
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

          {/* 确认密码 (Register Mode Only) */}
          {isRegister && (
            <div className="relative border-b border-gray-100 group focus-within:border-blue-500 transition-colors">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500">
                <ShieldCheck size={20} />
              </div>
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="请再次确认密码" 
                className="w-full pl-8 py-3.5 bg-transparent outline-none text-lg font-medium"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 active:text-blue-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4 pt-8">
          <button 
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {isRegister ? '立即注册并登录' : '立即登录'}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className="mt-auto text-center space-y-4">
        {/* Toggle Mode Link */}
        <div className="flex justify-center">
          <button 
            onClick={toggleMode}
            className="text-sm text-gray-500 font-bold active:text-blue-600 transition-colors"
          >
            {isRegister 
              ? <span>已有账号？<span className="text-blue-600">去登录</span></span> 
              : <span>还没有账号？<span className="text-blue-600">立即注册</span></span>
            }
          </button>
        </div>

        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
            如遇到系统问题，请联系平台客服：<br/>
            <span className="text-blue-600 font-bold">400-888-9999</span>
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
