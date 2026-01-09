
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Clock, MapPin, Copy, Phone, Package, Printer, CreditCard } from 'lucide-react';

const OrderDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock Detail Data
  const order = {
    id: id || '2410210001',
    status: '待发货',
    createTime: '2024-10-22 10:20:05',
    payTime: '2024-10-22 10:21:15',
    customer: {
      name: '陈先生',
      phone: '13812345678',
      address: '云南省 昆明市 盘龙区 联盟街道 北京路 888 号财富中心 A 座 1201',
      avatar: 'https://i.pravatar.cc/150?u=1'
    },
    items: [
      { 
        id: '1', 
        name: '农夫山泉 19L (20桶赠3桶套餐)', 
        spec: '套餐含23桶', 
        price: 500.00, 
        qty: 1, 
        image: 'https://picsum.photos/200/200?random=12' 
      },
      { 
        id: '2', 
        name: '手压式饮水泵 (大号)', 
        spec: '白色', 
        price: 15.00, 
        qty: 1, 
        image: 'https://picsum.photos/200/200?random=6' 
      }
    ],
    billing: {
      subtotal: 515.00,
      deliveryFee: 0.00,
      discount: -15.00,
      total: 500.00
    },
    remark: '麻烦送货前打个电话，家里有老人。'
  };

  const copyToClipboard = (text: string) => {
    // navigator.clipboard.writeText(text); // Simulating copy
    alert(`已复制: ${text}`);
  };

  const getStatusBanner = (status: string) => {
    switch(status) {
      case '待付款':
        return {
          bg: 'bg-gradient-to-r from-red-500 to-orange-500',
          title: '等待买家付款',
          sub: '剩余 14:59 自动关闭'
        };
      case '待发货':
        return {
          bg: 'bg-gradient-to-r from-blue-600 to-indigo-600',
          title: '买家已付款',
          sub: '请尽快安排发货或生成配送单'
        };
      case '已完成':
        return {
          bg: 'bg-gradient-to-r from-gray-700 to-gray-800',
          title: '订单已完成',
          sub: '交易成功，期待下次光临'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-gray-400 to-gray-500',
          title: status,
          sub: ''
        };
    }
  };

  const banner = getStatusBanner(order.status);

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-24">
      {/* Custom Header (Transparent) - Removed Nav Row */}
      <div className={`sticky top-0 z-30 transition-all ${banner.bg} text-white`}>
         <div className="px-6 pb-8 pt-6">
            <h2 className="text-2xl font-black">{banner.title}</h2>
            <p className="text-xs opacity-80 mt-1">{banner.sub}</p>
         </div>
      </div>

      <div className="-mt-4 px-4 space-y-3 z-20">
        
        {/* Address Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
           <div className="flex items-start gap-3">
              <div className="mt-1 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                 <MapPin size={16} />
              </div>
              <div>
                 <div className="flex items-center gap-2">
                    <span className="font-black text-gray-900 text-sm">{order.customer.name}</span>
                    <span className="font-bold text-gray-500 text-xs">{order.customer.phone}</span>
                    <button onClick={() => copyToClipboard(order.customer.phone)} className="text-gray-300 active:text-blue-500">
                       <Copy size={12} />
                    </button>
                 </div>
                 <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {order.customer.address}
                 </p>
              </div>
           </div>
           {/* Contact Actions - Removed Online Contact */}
           <div className="mt-4 pt-3 border-t border-gray-50">
              <button className="w-full py-2 flex items-center justify-center gap-1 text-xs font-bold text-blue-600 active:bg-blue-50 rounded-lg">
                 <Phone size={14} /> 联系买家
              </button>
           </div>
        </div>

        {/* Goods List */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
           {order.items.map((item) => (
              <div key={item.id} className="flex gap-3">
                 <img src={item.image} className="w-16 h-16 rounded-lg bg-gray-100 object-cover border border-gray-100" />
                 <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div>
                       <p className="text-xs font-black text-gray-900 line-clamp-2">{item.name}</p>
                       <p className="text-[10px] text-gray-400 mt-1 bg-gray-50 inline-block px-1.5 rounded">{item.spec}</p>
                    </div>
                    <div className="flex justify-between items-end">
                       <p className="text-[10px] text-gray-500">x {item.qty}</p>
                       <p className="text-sm font-black text-gray-900">¥{item.price.toFixed(2)}</p>
                    </div>
                 </div>
              </div>
           ))}
           
           <div className="pt-3 border-t border-gray-50 space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                 <span>商品总价</span>
                 <span>¥{order.billing.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                 <span>运费</span>
                 <span>¥{order.billing.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                 <span>优惠立减</span>
                 <span className="text-red-500">-¥{Math.abs(order.billing.discount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                 <span className="font-black text-sm text-gray-900">实付款</span>
                 <span className="font-black text-lg text-red-600">¥{order.billing.total.toFixed(2)}</span>
              </div>
           </div>
        </div>

        {/* Order Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
           <div className="flex justify-between items-center">
              <span className="text-xs font-black text-gray-900 border-l-4 border-blue-600 pl-2">订单信息</span>
           </div>
           <div className="space-y-2">
              <div className="flex justify-between items-center">
                 <span className="text-xs text-gray-500">订单编号</span>
                 <div className="flex items-center gap-1">
                    <span className="text-xs font-mono text-gray-800">{order.id}</span>
                    <button onClick={() => copyToClipboard(order.id)} className="text-xs text-blue-600 font-bold">复制</button>
                 </div>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-xs text-gray-500">创建时间</span>
                 <span className="text-xs text-gray-800">{order.createTime}</span>
              </div>
              {order.payTime && (
                 <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">付款时间</span>
                    <span className="text-xs text-gray-800">{order.payTime}</span>
                 </div>
              )}
               <div className="flex justify-between items-center">
                 <span className="text-xs text-gray-500">支付方式</span>
                 <div className="flex items-center gap-1 text-xs text-gray-800">
                    <CreditCard size={12} className="text-green-600" /> 微信支付
                 </div>
              </div>
           </div>
           
           {order.remark && (
              <div className="bg-orange-50 p-3 rounded-xl mt-2">
                 <p className="text-xs font-bold text-orange-800 mb-1">买家备注</p>
                 <p className="text-xs text-orange-700 leading-relaxed">{order.remark}</p>
              </div>
           )}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 safe-bottom z-40 flex justify-end items-center gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
         {order.status === '待发货' && (
             <>
                <button className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 active:bg-gray-50 flex items-center gap-1">
                   <Printer size={14} /> 打印订单
                </button>
                <button 
                  onClick={() => alert('已生成配送单，请到派单中心查看')} 
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-black shadow-lg shadow-blue-200 active:scale-95 transition-transform flex items-center gap-1"
                >
                   <Package size={16} /> 立即发货
                </button>
             </>
         )}
         
         {order.status === '待付款' && (
             <>
               <button className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600">
                  取消订单
               </button>
               <button className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-black">
                  修改价格
               </button>
             </>
         )}

         {order.status === '已完成' && (
            <button className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600">
               申请售后
            </button>
         )}
      </div>
    </div>
  );
};

export default OrderDetail;
