
import React, { useState } from 'react';
import { Search, Plus, Edit3, Eye, EyeOff, Package, MoreHorizontal, Filter, ChevronLeft, Camera, Save, Trash2, ArrowUp, Check, Bold, Italic, List, Image, AlignLeft, Tags, X } from 'lucide-react';
import { Product } from '../types';

const ProductManagement: React.FC = () => {
  const [view, setView] = useState<'list' | 'form' | 'categories'>('list');
  const [activeTab, setActiveTab] = useState<'onsale' | 'warehouse'>('onsale');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Categories State
  const [categories, setCategories] = useState(['桶装水', '瓶装水', '饮料', '免押金', '水票套餐', '饮水机', '压水器']);
  const [newCategory, setNewCategory] = useState('');

  // Mock Data
  const [products, setProducts] = useState<Product[]>([
    { id: 'p1', name: '轿子山泉 18.9L', category: '桶装水', price: 18, originalPrice: 22, unit: '桶', image: 'https://picsum.photos/200/200?random=1' },
    { id: 'p2', name: '农夫山泉 19L (免押金专享)', category: '免押金', price: 25, unit: '桶', image: 'https://picsum.photos/200/200?random=2' },
    { id: 'p3', name: '怡宝纯净水 18.9L', category: '桶装水', price: 22, unit: '桶', image: 'https://picsum.photos/200/200?random=3' },
    { id: 'p4', name: '景田百岁山 348ml*24', category: '瓶装水', price: 48, unit: '箱', image: 'https://picsum.photos/200/200?random=4' },
    { id: 'p5', name: '可口可乐 500ml*12', category: '饮料', price: 36, unit: '箱', image: 'https://picsum.photos/200/200?random=8' },
  ]);

  const emptyForm: Product = {
    id: '',
    name: '',
    category: '桶装水',
    price: 0,
    unit: '桶',
    image: '',
    originalPrice: 0,
    details: '',
  };

  const [formData, setFormData] = useState<Product>(emptyForm);

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({ ...product });
    setView('form');
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ 
      ...emptyForm, 
      id: Date.now().toString(), 
      image: `https://picsum.photos/200/200?random=${Date.now()}` 
    });
    setView('form');
  };

  const handleSave = () => {
    if (!formData.name) {
      alert('请输入商品名称');
      return;
    }
    if (editingId) {
      setProducts(products.map(p => p.id === editingId ? formData : p));
    } else {
      setProducts([formData, ...products]);
    }
    setView('list');
  };

  const handleDelete = () => {
    if (window.confirm('确定删除该商品吗？')) {
      setProducts(products.filter(p => p.id !== editingId));
      setView('list');
    }
  };

  // Category Management Handlers
  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (!trimmed) return;
    if (categories.includes(trimmed)) {
      alert('该分类已存在');
      return;
    }
    setCategories([...categories, trimmed]);
    setNewCategory('');
  };

  const handleDeleteCategory = (cat: string) => {
    if (window.confirm(`确定要删除分类“${cat}”吗？`)) {
      setCategories(categories.filter(c => c !== cat));
    }
  };

  // Render Category Management View
  if (view === 'categories') {
    return (
      <div className="flex flex-col min-h-full bg-gray-50">
        <div className="bg-white p-4 sticky top-0 z-30 border-b border-gray-100 flex items-center gap-3">
           <button onClick={() => setView('list')} className="p-1 -ml-1 text-gray-600">
             <ChevronLeft size={24} />
           </button>
           <h2 className="text-base font-black text-gray-900">分类管理</h2>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex gap-2">
            <input 
              className="flex-1 bg-gray-50 rounded-xl px-4 text-sm font-bold outline-none"
              placeholder="输入新分类名称"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
            />
            <button 
              onClick={handleAddCategory}
              disabled={!newCategory.trim()}
              className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-black disabled:opacity-50 disabled:bg-gray-300 transition-all"
            >
              添加
            </button>
          </div>

          <div className="space-y-2">
             <p className="text-[10px] text-gray-400 font-bold px-2">现有分类 ({categories.length})</p>
             {categories.map(cat => (
               <div key={cat} className="bg-white px-4 py-3.5 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center animate-in fade-in slide-in-from-bottom-2">
                 <span className="text-sm font-bold text-gray-800">{cat}</span>
                 <button 
                   onClick={() => handleDeleteCategory(cat)}
                   className="p-2 bg-gray-50 text-gray-400 rounded-xl active:bg-red-50 active:text-red-500 transition-colors"
                 >
                   <Trash2 size={16} />
                 </button>
               </div>
             ))}
          </div>
        </div>
      </div>
    );
  }

  // Render Form View
  if (view === 'form') {
    return (
      <div className="flex flex-col min-h-full bg-white pb-32">
        <div className="p-4 space-y-6 pt-6">
          {/* Image Upload */}
          <div className="flex justify-center">
            <div className="relative w-32 h-32 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 group shadow-inner">
              <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                 <Camera size={24} />
                 <span className="text-[10px] font-bold mt-1">更换图片</span>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
             <h3 className="text-xs font-black text-gray-900 border-l-4 border-blue-600 pl-2">基本信息</h3>
             
             <div className="space-y-1.5">
               <label className="text-[11px] font-bold text-gray-400">商品名称</label>
               <input 
                 className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 transition-all border border-gray-100"
                 placeholder="请输入商品名称"
                 value={formData.name}
                 onChange={e => setFormData({...formData, name: e.target.value})}
               />
             </div>

             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1.5">
                 <label className="text-[11px] font-bold text-gray-400">商品分类</label>
                 <select 
                   className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm font-bold outline-none appearance-none border border-gray-100"
                   value={formData.category}
                   onChange={e => setFormData({...formData, category: e.target.value})}
                 >
                   {categories.map(c => <option key={c} value={c}>{c}</option>)}
                 </select>
               </div>
               <div className="space-y-1.5">
                 <label className="text-[11px] font-bold text-gray-400">售卖单位</label>
                 <input 
                   className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm font-bold outline-none border border-gray-100"
                   placeholder="如: 桶、箱"
                   value={formData.unit}
                   onChange={e => setFormData({...formData, unit: e.target.value})}
                 />
               </div>
             </div>
          </div>

          {/* Price Info */}
          <div className="space-y-4 pt-2">
             <h3 className="text-xs font-black text-gray-900 border-l-4 border-green-500 pl-2">价格设置</h3>
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1.5">
                 <label className="text-[11px] font-bold text-gray-400">销售价格 (¥)</label>
                 <input 
                   type="number"
                   className="w-full bg-gray-50 rounded-xl px-4 py-3 text-lg font-black text-red-500 outline-none border border-gray-100"
                   value={formData.price}
                   onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                 />
               </div>
               <div className="space-y-1.5">
                 <label className="text-[11px] font-bold text-gray-400">划线原价 (¥)</label>
                 <input 
                   type="number"
                   className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm font-bold text-gray-500 outline-none border border-gray-100"
                   value={formData.originalPrice}
                   onChange={e => setFormData({...formData, originalPrice: Number(e.target.value)})}
                 />
               </div>
             </div>
          </div>

          {/* Attributes */}
          <div className="space-y-4 pt-2">
             <h3 className="text-xs font-black text-gray-900 border-l-4 border-orange-500 pl-2">属性设置</h3>
             
             <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between border border-gray-100">
                <div>
                   <p className="text-sm font-black text-gray-900">设为套餐商品</p>
                   <p className="text-[10px] text-gray-400 mt-0.5">开启后可配置套餐包含的详细内容</p>
                </div>
                <button 
                  onClick={() => setFormData({...formData, isPackage: !formData.isPackage})}
                  className={`w-12 h-7 rounded-full transition-colors relative ${formData.isPackage ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${formData.isPackage ? 'left-6' : 'left-1'}`} />
                </button>
             </div>

             {formData.isPackage && (
               <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
                 <label className="text-[11px] font-bold text-gray-400">套餐详情描述</label>
                 <input 
                   className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm font-bold outline-none border border-gray-100"
                   placeholder="例如：共 23 桶"
                   value={formData.packageDetail || ''}
                   onChange={e => setFormData({...formData, packageDetail: e.target.value})}
                 />
               </div>
             )}
          </div>

          {/* Rich Text Editor (Details) */}
          <div className="space-y-4 pt-2">
             <h3 className="text-xs font-black text-gray-900 border-l-4 border-purple-500 pl-2">商品详情 (富文本)</h3>
             <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                {/* Toolbar */}
                <div className="bg-gray-50 border-b border-gray-200 p-2.5 flex gap-4 overflow-x-auto hide-scrollbar">
                   <button className="text-gray-500 hover:text-gray-900 active:bg-gray-200 rounded p-1"><Bold size={16} /></button>
                   <button className="text-gray-500 hover:text-gray-900 active:bg-gray-200 rounded p-1"><Italic size={16} /></button>
                   <button className="text-gray-500 hover:text-gray-900 active:bg-gray-200 rounded p-1"><AlignLeft size={16} /></button>
                   <div className="w-[1px] h-4 bg-gray-300 self-center" />
                   <button className="text-gray-500 hover:text-gray-900 active:bg-gray-200 rounded p-1"><List size={16} /></button>
                   <button className="text-gray-500 hover:text-gray-900 active:bg-gray-200 rounded p-1"><Image size={16} /></button>
                </div>
                {/* Text Area */}
                <textarea 
                  className="w-full h-48 p-4 text-sm outline-none resize-none placeholder:text-gray-300 leading-relaxed"
                  placeholder="请输入商品详细描述，支持图文混排..."
                  value={formData.details || ''}
                  onChange={e => setFormData({...formData, details: e.target.value})}
                />
             </div>
          </div>

          {/* Delete Button */}
          {editingId && (
            <div className="pt-4 pb-2">
                <button 
                  onClick={handleDelete}
                  className="w-full py-3.5 bg-red-50 text-red-500 rounded-2xl font-black flex items-center justify-center gap-2 active:bg-red-100 transition-colors"
                >
                  <Trash2 size={18} /> 删除此商品
                </button>
            </div>
          )}
        </div>

        {/* Fixed Bottom Actions - z-index increased to 60 to cover App's BottomNav (z-50) */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 safe-bottom z-[60] flex gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
           <button 
             onClick={() => setView('list')}
             className="flex-1 bg-gray-100 text-gray-600 py-3.5 rounded-2xl font-black text-sm active:bg-gray-200 transition-colors"
           >
             取消
           </button>
           <button 
             onClick={handleSave}
             className="flex-[2] bg-blue-600 text-white py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-blue-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
           >
             <Save size={18} /> 保存
           </button>
        </div>
      </div>
    );
  }

  // Render List View
  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-20">
      {/* Header Actions */}
      <div className="bg-white p-4 sticky top-12 z-20 border-b border-gray-100 space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="搜索商品名称/条码" 
              className="w-full bg-gray-50 rounded-xl pl-9 pr-4 py-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <button className="bg-gray-50 p-2.5 rounded-xl text-gray-500">
            <Filter size={18} />
          </button>
          <button 
            onClick={() => setView('categories')}
            className="bg-gray-50 p-2.5 rounded-xl text-blue-600 active:bg-blue-50"
          >
            <Tags size={18} />
          </button>
        </div>
        
        <div className="flex p-1 bg-gray-100 rounded-xl">
          <button 
            onClick={() => setActiveTab('onsale')}
            className={`flex-1 py-2 text-xs font-black rounded-lg transition-all ${activeTab === 'onsale' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}
          >
            出售中 ({products.length})
          </button>
          <button 
            onClick={() => setActiveTab('warehouse')}
            className={`flex-1 py-2 text-xs font-black rounded-lg transition-all ${activeTab === 'warehouse' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}
          >
            仓库中 (0)
          </button>
        </div>
      </div>

      {/* Product List */}
      <div className="p-4 space-y-3">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-2xl p-3 flex gap-3 shadow-sm border border-gray-100">
            <div className="w-20 h-20 rounded-xl bg-gray-100 shrink-0 overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 flex flex-col justify-between py-0.5">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-black text-gray-900 line-clamp-1">{product.name}</h3>
                  <button className="text-gray-300">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
                <div className="flex gap-2 mt-1">
                   <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-bold">{product.category}</span>
                   <span className="text-[9px] text-gray-400 font-medium self-center">库存: 99+</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end">
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-black text-red-500">¥</span>
                  <span className="text-lg font-black text-red-500">{product.price}</span>
                  <span className="text-[10px] text-gray-300 line-through">¥{product.originalPrice || product.price + 5}</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(product)}
                    className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-[10px] font-bold flex items-center gap-1 active:bg-gray-100"
                  >
                    <Edit3 size={12} /> 编辑
                  </button>
                  <button className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold flex items-center gap-1 active:bg-blue-100">
                    <EyeOff size={12} /> 下架
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button 
        onClick={handleAdd}
        className="fixed bottom-24 right-4 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-200 flex items-center justify-center active:scale-90 transition-transform z-30"
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default ProductManagement;
