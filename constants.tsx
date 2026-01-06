
import React from 'react';
import { 
  Droplets, 
  Ticket, 
  Wallet, 
  Refrigerator, 
  Briefcase, 
  Cpu, 
  Gift, 
  Zap,
  Coffee
} from 'lucide-react';
import { Product, RechargePackage, Store } from './types';

export const NAV_ITEMS = [
  { id: '1', label: '桶装水', icon: <Droplets className="w-6 h-6 text-blue-500" />, category: '桶装水' },
  { id: '2', label: '免押金', icon: <Gift className="w-6 h-6 text-orange-500" />, category: '免押金' },
  { id: '3', label: '瓶装水', icon: <Droplets className="w-6 h-6 text-cyan-500" />, category: '瓶装水' },
  { id: '4', label: '水票套餐', icon: <Ticket className="w-6 h-6 text-red-500" />, category: '水票套餐' },
  { id: '5', label: '余额充值', icon: <Wallet className="w-6 h-6 text-green-500" />, category: '余额充值' },
  { id: '6', label: '饮水机', icon: <Refrigerator className="w-6 h-6 text-indigo-500" />, category: '饮水机' },
  { id: '7', label: '压水器', icon: <Cpu className="w-6 h-6 text-purple-500" />, category: '压水器' },
  { id: '8', label: '饮料', icon: <Coffee className="w-6 h-6 text-pink-500" />, category: '饮料' },
];

export const MOCK_STORES: Store[] = [
  { id: '1', name: '昆明旗舰店', address: '昆明市盘龙区北京路100号', distance: '1.2km' },
  { id: '2', name: '翠湖分店', address: '昆明市五华区翠湖南路', distance: '3.5km' },
  { id: '3', name: '官渡服务站', address: '昆明市官渡区春城路', distance: '5.8km' },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: '轿子山泉 18.9L', category: '桶装水', price: 18, originalPrice: 22, unit: '桶', image: 'https://picsum.photos/200/200?random=1' },
  { id: 'p2', name: '农夫山泉 19L (免押金专享)', category: '免押金', price: 25, unit: '桶', image: 'https://picsum.photos/200/200?random=2' },
  { id: 'p3', name: '怡宝纯净水 18.9L', category: '桶装水', price: 22, unit: '桶', image: 'https://picsum.photos/200/200?random=3' },
  { id: 'p4', name: '景田百岁山 348ml*24', category: '瓶装水', price: 48, unit: '箱', image: 'https://picsum.photos/200/200?random=4' },
  { id: 'p5', name: '可口可乐 500ml*12', category: '饮料', price: 36, unit: '箱', image: 'https://picsum.photos/200/200?random=8' },
  { id: 'p6', name: '简易压水器', category: '压水器', price: 15, unit: '个', image: 'https://picsum.photos/200/200?random=6' },
];

export const MOCK_TICKETS: Product[] = [
  { 
    id: 't1', 
    name: '农夫山泉 19L (20桶赠3桶)', 
    category: '农夫山泉', 
    price: 500, 
    originalPrice: 575, 
    unit: '套', 
    savings: 75, 
    image: 'https://picsum.photos/200/200?random=12',
    packageDetail: '23桶'
  },
  { 
    id: 't2', 
    name: '怡宝 18.9L (10桶赠1桶)', 
    category: '怡宝', 
    price: 220, 
    originalPrice: 242, 
    unit: '套', 
    savings: 22, 
    image: 'https://picsum.photos/200/200?random=3',
    packageDetail: '11桶'
  },
  { 
    id: 't3', 
    name: '娃哈哈 18.9L (30桶超值装)', 
    category: '娃哈哈', 
    price: 450, 
    originalPrice: 540, 
    unit: '套', 
    savings: 90, 
    image: 'https://picsum.photos/200/200?random=15',
    packageDetail: '30桶'
  },
  { 
    id: 't4', 
    name: '景田百岁山 18.9L (20桶装)', 
    category: '景田', 
    price: 480, 
    originalPrice: 560, 
    unit: '套', 
    savings: 80, 
    image: 'https://picsum.photos/200/200?random=16',
    packageDetail: '20桶'
  },
  { 
    id: 't5', 
    name: '怡宝 555ml*24瓶 (买5箱送1箱)', 
    category: '怡宝', 
    price: 240, 
    originalPrice: 288, 
    unit: '套', 
    savings: 48, 
    image: 'https://picsum.photos/200/200?random=13',
    packageDetail: '144瓶'
  },
  { 
    id: 't6', 
    name: '景田百岁山 348ml*24瓶 (10箱囤货装)', 
    category: '景田', 
    price: 450, 
    originalPrice: 480, 
    unit: '套', 
    savings: 30, 
    image: 'https://picsum.photos/200/200?random=14',
    packageDetail: '240瓶'
  },
  { 
    id: 't7', 
    name: '农夫山泉 550ml*24瓶 (20箱团购价)', 
    category: '农夫山泉', 
    price: 720, 
    originalPrice: 800, 
    unit: '套', 
    savings: 80, 
    image: 'https://picsum.photos/200/200?random=17',
    packageDetail: '480瓶'
  },
];

export const RECHARGE_PACKAGES: RechargePackage[] = [
  { id: 'r1', amount: 59, bonus: 5 },
  { id: 'r2', amount: 188, bonus: 20, isRecommended: true },
  { id: 'r3', amount: 360, bonus: 50 },
  { id: 'r4', amount: 1000, bonus: 200 },
];
