
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Phone, 
  MapPin, 
  Package, 
  Clock, 
  MessageSquare, 
  Plus, 
  Minus, 
  CheckCircle2, 
  Truck,
  ChevronRight,
  Send
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';

const ManualOrder: React.FC = () => {
  const navigate = useNavigate();

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [remark, setRemark] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('立即配送');
  
  // Cart State (Items selected)
  const [cart, setCart] = useState<{id: string, name: string, qty: number, price: number}[]>([]);
  
  // Assignment State
  const [assignedStaff, setAssignedStaff] = useState<string | null>(null);

  const deliveryStaff = [
    { name: '王师傅', status: '在线', id: 'S01', activeOrders: 2 },
    { name: '陈师傅', status: '在线', id: 'S02', activeOrders: 5 },
    { name: '刘师傅', status: '休息中', id: 'S03', activeOrders: 0 },
  ];

  const updateCart = (product: any, delta: number) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      const nextQty = existing.qty + delta;
      if (nextQty <= 0) {
        setCart(cart.filter(item => item.id !== product.id));
      } else {
        setCart(cart.map(item => item.id === product.id ? { ...item, qty: nextQty } : item));
      }
    } else if (delta > 0) {
      setCart([...cart, { id: product.id, name: product.name, qty: 1, price: product.price }]);
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleSubmit = () => {
    if (!customerName || !customerPhone || !address) {
      alert('请完善客户基本信息');
      return;
    }
    if (cart.length === 0) {
      alert('请选择至少一件商品');
      return;
    }
    if (!assignedStaff) {
      alert('请指派一名配送员');
      return;
    }

    const staff = deliveryStaff.find(s => s.id === assignedStaff);
    alert(`代客录单成功！\n订单已同步至配送大厅，并指派给：${staff?.name}`);
    navigate('/');
  };

  return (
    <div className="min-h-full bg-gray-50 flex flex-col pb-32">
      <div className="p-4 space-y-4">
        {/* Section 1: Customer Info */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
           <div className="flex items-center gap-2 mb-2">
              <User size={16} className="text-blue-600" />
              <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">客户基本信息</h3>
           </div>
           
           <div className="space-y-4">
              <div className="relative">
                 <input 
                  className="w-full bg-gray-50 rounded-2xl px-4 py-3.5 text-sm font-bold outline-none border border-transparent focus:border-blue-500 transition-all"
                  placeholder="客户姓名"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                />
              </div>
              <div className="relative">
                 <input 
                  type="tel"
                  className="w-full bg-gray-50 rounded-2xl px-4 py-3.5 text-sm font-bold outline-none border border-transparent focus:border-blue-500 transition-all"
                  placeholder="联系电话"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                />
              </div>
              <div className="relative">
                 <textarea 
                  className="w-full bg-gray-50 rounded-2xl px-4 py-3.5 text-sm font-bold outline-none border border-transparent focus:border-blue-500 transition-all min-h-[80px]"
                  placeholder="配送详细地址 (含楼层、房号)"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
              </div>
           </div>
        </div>

        {/* Section 2: Product Picker */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
           <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Package size={16} className="text-orange-500" />
                <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">商品选择</h3>
              </div>
              <span className="text-[10px] font-black text-blue-600">已选 {cart.length} 项</span>
           </div>

           <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 hide-scrollbar">
              {MOCK_PRODUCTS.map(p => {
                const cartItem = cart.find(item => item.id === p.id);
                return (
                  <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-50">
                    <div className="flex items-center gap-3">
                       <img src={p.image} className="w-10 h-10 rounded-lg object-cover" />
                       <div>
                          <p className="text-xs font-black text-gray-800 line-clamp-1">{p.name}</p>
                          <p className="text-[10px] text-red-500 font-black">¥{p.price}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       {cartItem ? (
                         <>
                           <button onClick={() => updateCart(p, -1)} className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-gray-400 border border-gray-100 shadow-sm active:scale-90 transition-transform"><Minus size={14} /></button>
                           <span className="text-xs font-black text-gray-900 w-4 text-center">{cartItem.qty}</span>
                           <button onClick={() => updateCart(p, 1)} className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md shadow-blue-100 active:scale-90 transition-transform"><Plus size={14} /></button>
                         </>
                       ) : (
                         <button onClick={() => updateCart(p, 1)} className="p-2 bg-blue-50 text-blue-600 rounded-xl active:scale-90 transition-transform">
                            <Plus size={18} />
                         </button>
                       )}
                    </div>
                  </div>
                );
              })}
           </div>
        </div>

        {/* Section 3: Extra Config */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <Clock size={12} /> 配送时间
                 </label>
                 <select 
                   className="w-full bg-gray-50 rounded-xl px-3 py-2.5 text-xs font-bold outline-none border border-transparent focus:border-blue-500"
                   value={deliveryTime}
                   onChange={e => setDeliveryTime(e.target.value)}
                 >
                    <option value="立即配送">立即配送</option>
                    <option value="1小时内">1小时内</option>
                    <option value="下午送达">下午送达</option>
                    <option value="预约明天">预约明天</option>
                 </select>
              </div>
              <div className="space-y-1.5">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <MessageSquare size={12} /> 订单备注
                 </label>
                 <input 
                   className="w-full bg-gray-50 rounded-xl px-3 py-2.5 text-xs font-bold outline-none border border-transparent focus:border-blue-500"
                   placeholder="选填"
                   value={remark}
                   onChange={e => setRemark(e.target.value)}
                 />
              </div>
           </div>
        </div>

        {/* Section 4: Staff Assignment */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
           <div className="flex items-center gap-2 mb-2">
              <Truck size={16} className="text-purple-600" />
              <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">指派配送员</h3>
           </div>
           
           <div className="grid grid-cols-2 gap-3">
              {deliveryStaff.map(staff => {
                const isActive = assignedStaff === staff.id;
                const isOff = staff.status === '休息中';
                return (
                  <button 
                    key={staff.id}
                    disabled={isOff}
                    onClick={() => setAssignedStaff(staff.id)}
                    className={`p-3 rounded-2xl border text-left transition-all relative ${
                      isOff ? 'bg-gray-50 border-transparent opacity-50 grayscale' : 
                      (isActive ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-100 scale-[1.02]' : 'bg-gray-50 border-transparent text-gray-700 active:bg-blue-50')
                    }`}
                  >
                     <p className="text-xs font-black">{staff.name}</p>
                     <p className={`text-[9px] font-bold mt-0.5 ${isActive ? 'text-blue-100' : 'text-gray-400'}`}>
                        {staff.status} {staff.activeOrders > 0 && `· 待配送 ${staff.activeOrders}`}
                     </p>
                     {isActive && <CheckCircle2 size={16} className="absolute top-2 right-2 text-white" />}
                  </button>
                );
              })}
           </div>
        </div>
      </div>

      {/* Floating Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 safe-bottom z-[60] flex items-center gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
         <div className="flex-1">
            <p className="text-[10px] text-gray-400 font-bold uppercase">合计预估</p>
            <p className="text-xl font-black text-red-500">¥{totalPrice.toFixed(2)}</p>
         </div>
         <button 
           onClick={handleSubmit}
           className="flex-[2] bg-blue-600 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
         >
           <Send size={18} /> 确认录单并指派
         </button>
      </div>
    </div>
  );
};

export default ManualOrder;
