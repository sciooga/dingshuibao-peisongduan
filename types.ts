
export enum OrderStatus {
  PENDING_PAYMENT = '待付款',
  PENDING_DELIVERY = '待配送',
  ACCEPTED = '已接单',
  DELIVERING = '配送中',
  COMPLETED = '已完成',
  CANCELLED = '已取消',
  REFUNDING = '退款中'
}

export interface Store {
  id: string;
  name: string;
  address: string;
  distance: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  unit: string;
  isPackage?: boolean;
  savings?: number;
  packageDetail?: string; // e.g. "共23桶", "共144瓶"
}

export interface User {
  id: string;
  nickname: string;
  avatar: string;
  phone: string;
  isMember: boolean;
  memberLevel: string;
  balance: {
    principal: number;
    bonus: number;
  };
  waterTickets: number;
  points: number;
  isActivated: boolean;
}

export interface RechargePackage {
  id: string;
  amount: number;
  bonus: number;
  isRecommended?: boolean;
}

export interface DeliveryOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  address: string;
  floor: string; // e.g. "5楼无电梯"
  items: { name: string; qty: number }[];
  deliveryTime: string;
  status: OrderStatus;
  commission: number;
  source?: '平台订单' | '美团订单' | '饿了么订单';
}
