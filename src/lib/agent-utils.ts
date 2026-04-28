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
