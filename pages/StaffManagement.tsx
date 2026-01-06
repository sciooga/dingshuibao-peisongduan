
import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Shield, 
  ChevronRight, 
  ToggleLeft as Toggle, 
  Save,
  Trash2,
  CheckCircle2,
  Phone,
  Lock,
  LayoutGrid
} from 'lucide-react';

interface Staff {
  id: string;
  name: string;
  phone: string;
  password?: string;
  permissions: string[];
  enabled: boolean;
}

const StaffManagement: React.FC = () => {
  const [view, setView] = useState<'list' | 'form'>('list');
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  
  // 模拟初始数据
  const [staffList, setStaffList] = useState<Staff[]>([
    { id: '1', name: '王师傅', phone: '13812345678', permissions: ['派单调度', '订单核销'], enabled: true },
    { id: '2', name: '李经理', phone: '13599998888', permissions: ['店铺信息', '员工管理', '系统设置'], enabled: true },
    { id: '3', name: '小张', phone: '18822223333', permissions: ['订单核销', '桶押金中心'], enabled: true },
  ]);

  const [formData, setFormData] = useState<Staff>({
    id: '',
    name: '',
    phone: '',
    password: '',
    permissions: ['订单核销'],
    enabled: true
  });

  const handleAdd = () => {
    setEditingStaff(null);
    setFormData({
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      phone: '',
      password: '',
      permissions: ['订单核销'],
      enabled: true
    });
    setView('form');
  };

  const handleEdit = (staff: Staff) => {
    setEditingStaff(staff);
    setFormData({ ...staff, password: '' }); 
    setView('form');
  };

  const handleSave = () => {
    if (!formData.name || !formData.phone) {
      alert('请填写姓名和手机号');
      return;
    }
    if (!editingStaff && !formData.password) {
      alert('请设置登录密码');
      return;
    }
    
    if (editingStaff) {
      setStaffList(staffList.map(s => s.id === formData.id ? { ...formData, password: formData.password || s.password } : s));
    } else {
      setStaffList([...staffList, formData]);
    }
    setView('list');
  };

  const handleDelete = () => {
    if (window.confirm('确定要删除该员工吗？')) {
      setStaffList(staffList.filter(s => s.id !== formData.id));
      setView('list');
    }
  };

  const togglePermission = (perm: string) => {
    const current = formData.permissions;
    if (current.includes(perm)) {
      setFormData({ ...formData, permissions: current.filter(p => p !== perm) });
    } else {
      setFormData({ ...formData, permissions: [...current, perm] });
    }
  };

  const availablePermissions = [
    '店铺信息', '员工管理', '派单调度', '桶押金中心', '操作日志', '系统设置', '订单核销', '财务明细'
  ];

  if (view === 'form') {
    return (
      <div className="flex flex-col min-h-full bg-gray-50 pb-20">
        <div className="p-4 space-y-4 pt-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">员工姓名</label>
                <div className="relative">
                   <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                   <input 
                    className="w-full bg-gray-50 rounded-2xl pl-10 pr-4 py-3.5 text-sm font-bold outline-none border border-transparent focus:border-blue-500 focus:bg-white transition-all"
                    placeholder="请输入真实姓名"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">手机号码 (登录账号)</label>
                <div className="relative">
                   <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                   <input 
                    type="tel"
                    className="w-full bg-gray-50 rounded-2xl pl-10 pr-4 py-3.5 text-sm font-bold outline-none border border-transparent focus:border-blue-500 focus:bg-white transition-all"
                    placeholder="请输入11位手机号"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                  {editingStaff ? '重置登录密码' : '设置登录密码'}
                </label>
                <div className="relative">
                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                   <input 
                    type="password"
                    className="w-full bg-gray-50 rounded-2xl pl-10 pr-4 py-3.5 text-sm font-bold outline-none border border-transparent focus:border-blue-500 focus:bg-white transition-all"
                    placeholder={editingStaff ? "不修改请留空" : "请设置至少8位登录密码"}
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                 <LayoutGrid size={14} className="text-blue-600" />
                 <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">操作权限分配</label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {availablePermissions.map(perm => {
                  const isActive = formData.permissions.includes(perm);
                  return (
                    <button 
                      key={perm}
                      onClick={() => togglePermission(perm)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${isActive ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-gray-50 border-transparent text-gray-500'}`}
                    >
                      <span className="text-xs font-bold">{perm}</span>
                      {isActive && <CheckCircle2 size={14} className="text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-gray-50">
               <div className="space-y-0.5">
                  <p className="text-sm font-black text-gray-900">账号启用状态</p>
                  <p className="text-[10px] text-gray-400">停用后该员工将无法进行任何操作</p>
               </div>
               <button 
                onClick={() => setFormData({ ...formData, enabled: !formData.enabled })}
                className={`transition-colors p-1 ${formData.enabled ? 'text-blue-600' : 'text-gray-300'}`}
               >
                 <Toggle size={36} className={formData.enabled ? '' : 'rotate-180'} />
               </button>
            </div>
          </div>

          {/* 按钮区域：删除按钮在保存按钮下方，移除了取消返回链接 */}
          <div className="space-y-3 mt-6">
            <button 
              onClick={handleSave}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-blue-100 flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <Save size={20} /> 保存员工详情
            </button>
            
            {editingStaff && (
              <button 
                onClick={handleDelete}
                className="w-full bg-white text-red-500 py-4 rounded-2xl font-black border border-red-50 flex items-center justify-center gap-2 active:bg-red-50 transition-colors"
              >
                <Trash2 size={20} /> 删除该员工账号
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex justify-between items-center">
        <div>
          <h3 className="font-black text-xl text-gray-900 tracking-tight">员工管理</h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">当前共有 {staffList.length} 名成员</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-blue-600 text-white w-12 h-12 rounded-2xl shadow-xl shadow-blue-100 flex items-center justify-center active:scale-90 transition-transform"
        >
          <UserPlus size={24} />
        </button>
      </div>

      <div className="space-y-3 pb-10">
        {staffList.map((s) => (
          <div 
            key={s.id} 
            onClick={() => handleEdit(s)}
            className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-4 active:bg-gray-50 transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${s.enabled ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                  <Shield size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-black text-gray-900 tracking-tight">{s.name}</p>
                    {!s.enabled && <span className="text-[8px] bg-red-50 text-red-500 px-1.5 py-0.5 rounded-md font-black uppercase">已停用</span>}
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                    拥有 {s.permissions.length} 项权限
                  </p>
                </div>
              </div>
              <ChevronRight className="text-gray-300 group-active:text-blue-600 transition-colors" size={20} />
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {s.permissions.map((p, j) => (
                <span key={j} className="text-[9px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded-lg font-bold border border-gray-100">
                  {p}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
               <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold">
                 <Phone size={12} className="text-gray-300" /> {s.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}
               </div>
               <span className={`text-[10px] font-black ${s.enabled ? 'text-blue-600' : 'text-gray-400'}`}>
                 {s.enabled ? '账号正常' : '账号冻结'}
               </span>
            </div>
          </div>
        ))}

        {staffList.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-gray-200">
            <Users size={64} strokeWidth={1} />
            <p className="text-xs mt-4 font-bold">还没有添加任何员工</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffManagement;
