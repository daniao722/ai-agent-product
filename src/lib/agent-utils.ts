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
