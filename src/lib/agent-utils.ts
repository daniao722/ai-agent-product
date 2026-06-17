import type { AgentStatus } from '@/types/agent';

export function getStatusColor(status: AgentStatus): string {
  const colorMap: Record<AgentStatus, string> = {
    active: 'bg-green-500',
    working: 'bg-blue-500 animate-pulse',
    idle: 'bg-gray-400',
  };
  return colorMap[status] || 'bg-gray-400';
}

export function getStatusText(status: AgentStatus): string {
  const textMap: Record<AgentStatus, string> = {
    active: '在线',
    working: '工作中',
    idle: '空闲',
  };
  return textMap[status] || '空闲';
}

export function getSkillStatusColor(status?: string): string {
  if (!status) return 'bg-gray-300';

  const colorMap: Record<string, string> = {
    active: 'bg-green-500',
    working: 'bg-blue-500 animate-pulse',
    idle: 'bg-gray-300',
  };
  return colorMap[status] || 'bg-gray-300';
}

export function getTaskStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    pending: 'text-gray-500 bg-gray-100',
    'in-progress': 'text-blue-600 bg-blue-100',
    completed: 'text-green-600 bg-green-100',
    failed: 'text-red-600 bg-red-100',
  };
  return colorMap[status] || 'text-gray-500 bg-gray-100';
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';

export function getLeadStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    qualified: 'bg-purple-100 text-purple-700',
    converted: 'bg-green-100 text-green-700',
    lost: 'bg-red-100 text-red-700',
  };
  return colorMap[status] || 'bg-gray-100 text-gray-700';
}

export function getLeadStatusLabel(status: string): string {
  const labelMap: Record<string, string> = {
    new: '新线索',
    contacted: '已联系',
    qualified: '已认证',
    converted: '已转化',
    lost: '已流失',
  };
  return labelMap[status] || '未知';
}

export type TicketStatus = 'open' | 'pending' | 'resolved' | 'closed';

export function getTicketStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    open: 'bg-blue-100 text-blue-700',
    pending: 'bg-yellow-100 text-yellow-700',
    resolved: 'bg-green-100 text-green-700',
    closed: 'bg-gray-100 text-gray-700',
  };
  return colorMap[status] || 'bg-gray-100 text-gray-700';
}

export function getTicketStatusLabel(status: string): string {
  const labelMap: Record<string, string> = {
    open: '待处理',
    pending: '处理中',
    resolved: '已解决',
    closed: '已关闭',
  };
  return labelMap[status] || '未知';
}

export type Priority = 'high' | 'medium' | 'low';

export function getPriorityColor(priority: string): string {
  const colorMap: Record<string, string> = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700',
  };
  return colorMap[priority] || 'bg-gray-100 text-gray-700';
}

// ===== 订单状态 =====

export type OrderStatus = 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export function getOrderStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    processing: 'bg-gray-100 text-gray-700',
    confirmed: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };
  return colorMap[status] || 'bg-gray-100 text-gray-700';
}

export function getOrderStatusLabel(status: string): string {
  const labelMap: Record<string, string> = {
    processing: '处理中',
    confirmed: '已确认',
    shipped: '已发货',
    delivered: '已送达',
    cancelled: '已取消',
  };
  return labelMap[status] || '未知';
}

// ===== 支付状态 =====

export type PaymentStatus = 'pending' | 'paid' | 'received' | 'refunded';

export function getPaymentStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    paid: 'bg-green-100 text-green-700',
    received: 'bg-green-100 text-green-700',
    refunded: 'bg-red-100 text-red-700',
  };
  return colorMap[status] || 'bg-gray-100 text-gray-700';
}

export function getPaymentStatusLabel(status: string): string {
  const labelMap: Record<string, string> = {
    pending: '待支付',
    paid: '已支付',
    received: '已收款',
    refunded: '已退款',
  };
  return labelMap[status] || '未知';
}

// ===== 发货状态 =====

export type DeliveryStatus = 'pending' | 'preparing' | 'in_transit' | 'delivered';

export function getDeliveryStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    pending: 'bg-gray-100 text-gray-700',
    preparing: 'bg-purple-100 text-purple-700',
    in_transit: 'bg-blue-100 text-blue-700',
    delivered: 'bg-green-100 text-green-700',
  };
  return colorMap[status] || 'bg-gray-100 text-gray-700';
}

export function getDeliveryStatusLabel(status: string): string {
  const labelMap: Record<string, string> = {
    pending: '待发货',
    preparing: '备货中',
    in_transit: '运输中',
    delivered: '已送达',
  };
  return labelMap[status] || '未知';
}

// ===== 报价状态 =====

export type QuotationStatus = 'draft' | 'sent' | 'accepted' | 'rejected';

export function getQuotationStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    sent: 'bg-blue-100 text-blue-700',
    accepted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };
  return colorMap[status] || 'bg-gray-100 text-gray-700';
}

export function getQuotationStatusLabel(status: string): string {
  const labelMap: Record<string, string> = {
    draft: '草稿',
    sent: '已发送',
    accepted: '已接受',
    rejected: '已拒绝',
  };
  return labelMap[status] || '未知';
}

// ===== 合同状态 =====

export type ContractStatus = 'pending' | 'signed' | 'performing' | 'completed' | 'cancelled';

export function getContractStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    signed: 'bg-blue-100 text-blue-700',
    performing: 'bg-purple-100 text-purple-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };
  return colorMap[status] || 'bg-gray-100 text-gray-700';
}

export function getContractStatusLabel(status: string): string {
  const labelMap: Record<string, string> = {
    pending: '待签署',
    signed: '已签署',
    performing: '执行中',
    completed: '已完成',
    cancelled: '已取消',
  };
  return labelMap[status] || '未知';
}
