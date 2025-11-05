import { request } from '@umijs/max';

/**
 * 代理佣金统计接口（实时计算）
 * @param params { month?: string } - 月份，格式 YYYY-MM，可选，默认当前月份
 * @returns 佣金统计数据
 */
export async function getCommissionStats(params: { month?: string }) {
  return request('/api/proxy/commission-stats', {
    method: 'POST',
    data: params,
  });
}

/**
 * 代理佣金历史记录接口（查询数据库）
 * @param params { month?: string; current?: number; pageSize?: number }
 * @returns 分页的佣金历史记录
 */
export async function getCommissionHistory(params: {
  month?: string;
  current?: number;
  pageSize?: number;
}) {
  return request('/api/proxy/commission-history', {
    method: 'POST',
    data: params,
  });
}

/**
 * 活动列表接口（代理端专用）
 * @param params { Type?: number; Status?: number }
 * @returns 活动规则列表
 */
export async function getActivityList(params: { Type?: number; Status?: number }) {
  return request('/api/proxy/activity-lists', {
    method: 'POST',
    data: params,
  });
}
