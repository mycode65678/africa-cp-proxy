import { getActivityList, getCommissionStats } from '@/services/commission';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { history, request, useIntl, useRequest } from '@umijs/max';
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  message,
  Progress,
  Row,
  Spin,
  Statistic,
} from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';

/**
 * 代理佣金统计页面
 */
const CommissionStats: React.FC = () => {
  const intl = useIntl();

  // 当前月份
  const [currentMonth] = useState<string>(dayjs().format('YYYY-MM'));
  // 设置默认查询条件为上个月
  const [historyMonth, setHistoryMonth] = useState<string>(
    dayjs().subtract(1, 'month').format('YYYY-MM'),
  );

  // 加载活动规则列表（Type=6, Status=1）
  const { data: activityData } = useRequest(() => getActivityList({ Type: 6, Status: 1 }), {
    onError: (err: any) => {
      console.error('活动规则加载失败:', err);
    },
  });

  // 活动规则（从 activity API 获取）
  const activityRules = activityData?.data?.data || [];

  // 加载本月业绩统计数据
  const {
    data: statsData,
    loading: statsLoading,
    error: statsError,
  } = useRequest(() => getCommissionStats({ month: currentMonth }), {
    refreshDeps: [currentMonth],
    timeout: 5000,
    onError: (err: any) => {
      if (err.name === 'timeout') {
        message.error(intl.formatMessage({ id: 'commission.error.timeout' }));
      } else {
        message.error(intl.formatMessage({ id: 'commission.error.loadFailed' }));
      }
    },
  });

  // 格式化数字为千分位
  const formatNumber = (num: number | undefined) => {
    if (!num && num !== 0) return '0';
    return num.toLocaleString('zh-CN');
  };

  // 格式化金额（保留2位小数）
  const formatCurrency = (num: number | undefined) => {
    if (!num && num !== 0) return '0.00';
    return num.toLocaleString('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // 格式化万元
  const formatWan = (num: number | undefined) => {
    if (!num && num !== 0) return '0';
    return (num / 10000).toFixed(2);
  };

  // 格式化当前档次（使用结构化数据）
  const formatCurrentLevel = (activityInfo: any) => {
    if (!activityInfo) return '-';

    // 使用新的结构化数据格式
    if (activityInfo.commissionRate && activityInfo.levelRange) {
      const { commissionRate, levelRange } = activityInfo;

      // 格式化范围显示 - 根据数值大小智能选择单位
      const wanUnit = intl.formatMessage({ id: 'commission.unit.wan' });
      const kUnit = intl.formatMessage({ id: 'commission.unit.k' });
      const formatAmount = (value: number) => {
        if (value === 0) return '0';
        if (value >= 10000) {
          // 大于等于1万，用万单位，保留1位小数
          return `${(value / 10000).toFixed(1)}${wanUnit}`;
        } else if (value >= 1000) {
          // 大于等于1千，用k单位，保留1位小数
          return `${(value / 1000).toFixed(1)}${kUnit}`;
        } else {
          // 小于1000，直接显示元数
          return value.toString();
        }
      };

      const startDisplay = formatAmount(levelRange.start);
      const endDisplay =
        levelRange.end === 0
          ? intl.formatMessage({ id: 'commission.currentLevel.unlimited' })
          : formatAmount(levelRange.end);

      return intl.formatMessage(
        {
          id: 'commission.currentLevel.format',
        },
        {
          commissionRate,
          startRange: startDisplay,
          endRange: endDisplay,
        },
      );
    }

    // 降级方案：尝试从description中提取佣金比例（支持中英文）
    const commissionMatch =
      activityInfo.description?.match(/佣金比例:\s*([\d.]+)%/) ||
      activityInfo.description?.match(/Commission Rate:\s*([\d.]+)%/);
    const commissionRate = commissionMatch ? parseFloat(commissionMatch[1]) : null;

    if (commissionRate) {
      return `${commissionRate}% ${intl.formatMessage({ id: 'commission.currentLevel.level' })}`;
    }

    // 最后降级：返回name字段
    return activityInfo.name || '-';
  };

  // 计算升档进度
  const calculateUpgradeProgress = () => {
    if (!statsData || !activityRules || activityRules.length === 0) {
      return null;
    }

    const currentDiff = statsData.depositWithdrawDiff || 0;
    const currentActivityId = statsData.activityId;

    // 按流水范围排序活动规则
    const sortedRules = [...activityRules].sort(
      (a: any, b: any) => a.RechargeStart - b.RechargeStart,
    );

    // 查找当前规则索引
    const currentIndex = sortedRules.findIndex((r: any) => (r.ID || r.id) === currentActivityId);

    // 如果是最高档或未找到
    if (currentIndex === -1 || currentIndex === sortedRules.length - 1) {
      return { isMax: true };
    }

    // 计算下一档
    const nextRule = sortedRules[currentIndex + 1];
    const progress = Math.min((currentDiff / nextRule.RechargeStart) * 100, 100);
    const gap = Math.max(nextRule.RechargeStart - currentDiff, 0);

    // 计算升档后佣金
    const nextCommission =
      currentDiff * (nextRule.RewardRatio / 100) +
      (nextRule.BackType === 2 ? nextRule.BackValue : 0);

    return {
      isMax: false,
      progress,
      gap,
      nextCommission,
      nextRule,
    };
  };

  // 查看下级明细跳转
  const handleViewDetail = (proxyId: number, month: string) => {
    history.push(`/report/user_report?proxyId=${proxyId}&month=${month}`);
  };

  // 历史记录表格列定义
  const columns: ProColumns<any>[] = [
    {
      title: intl.formatMessage({ id: 'commission.month' }),
      dataIndex: 'Month',
      width: 100,
      fixed: 'left',
    },
    {
      title: intl.formatMessage({ id: 'commission.lowerCount' }),
      dataIndex: 'LowerCount',
      width: 100,
      align: 'right',
      render: (val) => formatNumber(val as number),
    },
    {
      title: intl.formatMessage({ id: 'commission.rechargeAmount' }),
      dataIndex: 'TotalRecharge',
      width: 150,
      align: 'right',
      render: (val) => formatCurrency(val as number),
    },
    {
      title: intl.formatMessage({ id: 'commission.withdrawAmount' }),
      dataIndex: 'TotalWithdraw',
      width: 150,
      align: 'right',
      render: (val) => formatCurrency(val as number),
    },
    {
      title: intl.formatMessage({ id: 'commission.depositWithdrawDiff' }),
      dataIndex: 'DepositWithdrawDiff',
      width: 150,
      align: 'right',
      render: (val) => formatCurrency(val as number),
    },
    {
      title: intl.formatMessage({ id: 'commission.matchLevel' }),
      dataIndex: ['Activity', 'RewardRatio'],
      width: 150,
      render: (_, record) => {
        const ratio = record.Activity?.RewardRatio;
        return ratio ? `${ratio}%` : '-';
      },
    },
    {
      title: intl.formatMessage({ id: 'commission.commissionAmount' }),
      dataIndex: 'TotalCommission',
      width: 150,
      align: 'right',
      render: (val) => (
        <span style={{ color: '#52c41a', fontWeight: 'bold' }}>
          {formatCurrency(val as number)}
        </span>
      ),
    },
    {
      title: intl.formatMessage({ id: 'Status' }),
      dataIndex: 'Status',
      width: 100,
      render: (status) => {
        const statusMap: Record<number, { text: string; color: string }> = {
          1: { text: intl.formatMessage({ id: 'commission.status.pending' }), color: 'orange' },
          2: { text: intl.formatMessage({ id: 'commission.status.waiting' }), color: 'blue' },
          3: { text: intl.formatMessage({ id: 'commission.status.paid' }), color: 'green' },
          4: { text: intl.formatMessage({ id: 'commission.status.rejected' }), color: 'red' },
        };
        const config = statusMap[status as number] || {
          text: intl.formatMessage({ id: 'commission.status.unknown' }),
          color: 'default',
        };
        return <Badge color={config.color} text={config.text} />;
      },
    },
    {
      title: intl.formatMessage({ id: 'Operation' }),
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <a onClick={() => handleViewDetail(record.ProxyId, record.Month)}>
          {intl.formatMessage({ id: 'commission.viewDetail' })}
        </a>
      ),
    },
  ];

  // 升档进度信息
  const upgradeInfo = calculateUpgradeProgress();

  return (
    <PageContainer>
      {/* 活动介绍卡片 */}
      {activityRules && activityRules.length > 0 && (
        <Card
          title={intl.formatMessage({ id: 'commission.activity.title' })}
          style={{ marginBottom: 24 }}
        >
          {activityRules
            .sort((a: any, b: any) => a.RechargeStart - b.RechargeStart)
            .map((rule: any, index: number) => (
              <div key={rule.ID || rule.id} style={{ marginBottom: 8 }}>
                {intl.formatMessage({ id: 'commission.activity.level' }, { level: index + 1 })}:{' '}
                {intl.formatMessage({ id: 'commission.activity.turnoverRange' })}{' '}
                {formatNumber(rule.RechargeStart)} -{' '}
                {rule.RechargeEnd === 999999999999 ? '∞' : formatNumber(rule.RechargeEnd)}，
                {intl.formatMessage({ id: 'commission.activity.commissionRate' })}{' '}
                {rule.RewardRatio}%
                {rule.BackType === 2 &&
                  `，${intl.formatMessage({
                    id: 'commission.activity.fixedSalary',
                  })} ${formatCurrency(rule.BackValue)}`}
              </div>
            ))}
        </Card>
      )}

      {/* 本月业绩数据卡片 */}
      {statsLoading ? (
        <Spin size="large" style={{ display: 'block', textAlign: 'center', padding: 40 }} />
      ) : statsError ? (
        <Alert
          type="error"
          message={intl.formatMessage({ id: 'commission.error.loadDataFailed' })}
          style={{ marginBottom: 24 }}
        />
      ) : !statsData ? (
        <Empty
          description={intl.formatMessage({ id: 'commission.empty.noData' })}
          style={{ marginBottom: 24, padding: 40 }}
        />
      ) : (
        <>
          <Card
            title={intl.formatMessage({ id: 'commission.currentMonth.title' })}
            style={{ marginBottom: 24 }}
          >
            <Row gutter={16}>
              <Col xs={24} sm={12} md={8} lg={4} style={{ marginBottom: 16 }}>
                <Statistic
                  title={intl.formatMessage({ id: 'commission.lowerCount' })}
                  value={statsData.lowerCount || 0}
                  suffix={intl.formatMessage({ id: 'commission.unit.people' })}
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={5} style={{ marginBottom: 16 }}>
                <Statistic
                  title={intl.formatMessage({ id: 'commission.totalRecharge' })}
                  value={formatCurrency(statsData.totalRecharge)}
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={5} style={{ marginBottom: 16 }}>
                <Statistic
                  title={intl.formatMessage({ id: 'commission.totalWithdraw' })}
                  value={formatCurrency(statsData.totalWithdraw)}
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={5} style={{ marginBottom: 16 }}>
                <Statistic
                  title={intl.formatMessage({ id: 'commission.depositWithdrawDiff' })}
                  value={formatCurrency(statsData.depositWithdrawDiff)}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={3} style={{ marginBottom: 16 }}>
                <Statistic
                  title={intl.formatMessage({ id: 'commission.currentLevel' })}
                  value={formatCurrentLevel(statsData.activityInfo)}
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={2} style={{ marginBottom: 16 }}>
                <Statistic
                  title={intl.formatMessage({ id: 'commission.estimatedCommission' })}
                  value={formatCurrency(statsData.totalCommission)}
                  valueStyle={{ color: '#52c41a', fontWeight: 'bold' }}
                />
              </Col>
            </Row>
            <div style={{ marginTop: 16 }}>
              <Button
                type="link"
                onClick={() => handleViewDetail(statsData.proxyId, statsData.month)}
              >
                {intl.formatMessage({ id: 'commission.viewLowerLevelDetail' })} →
              </Button>
            </div>
          </Card>

          {/* 升档进度展示 */}
          {upgradeInfo && !upgradeInfo.isMax && (
            <Card
              title={intl.formatMessage({ id: 'commission.upgradeProgress.title' })}
              style={{ marginBottom: 24 }}
            >
              <Progress
                percent={Math.round(upgradeInfo.progress)}
                status={upgradeInfo.progress >= 80 ? 'active' : 'normal'}
                strokeColor={upgradeInfo.progress >= 80 ? '#faad14' : undefined}
              />
              <Alert
                type={upgradeInfo.progress >= 80 ? 'warning' : 'info'}
                message={intl.formatMessage(
                  { id: 'commission.upgradeProgress.message' },
                  {
                    gap: formatWan(upgradeInfo.gap),
                    nextCommission: formatCurrency(upgradeInfo.nextCommission),
                  },
                )}
                style={{ marginTop: 16 }}
              />
            </Card>
          )}

          {upgradeInfo && upgradeInfo.isMax && (
            <Alert
              type="success"
              message={intl.formatMessage({ id: 'commission.upgradeProgress.maxLevel' })}
              style={{ marginBottom: 24 }}
            />
          )}
        </>
      )}

      {/* 历史佣金记录表格 */}
      <ProTable
        headerTitle={intl.formatMessage({ id: 'commission.history.title' })}
        columns={columns}
        request={async (params) => {
          try {
            const requestData = {
              month: historyMonth || undefined,
              current: params.current || 1,
              pageSize: params.pageSize || 10,
            };

            const response = await request('/api/proxy/commission-history', {
              method: 'POST',
              data: requestData,
            });

            // 尝试多种数据访问方式
            let items = [];
            let total = 0;

            if (response && response.code === 0) {
              // 方式1: 直接访问 Items
              if (response.Items) {
                items = response.Items;
                total = response.Pagination?.totalRecords || items.length;
              }
              // 方式2: 通过 data 对象访问
              else if (response.data && response.data.Items) {
                items = response.data.Items;
                total = response.data.Pagination?.totalRecords || items.length;
              }
              // 方式3: 检查是否数据直接在根层级
              else if (Array.isArray(response)) {
                items = response;
                total = response.length;
              }
            }

            return {
              data: items,
              total: total,
              success: true,
            };
          } catch (error) {
            message.error(intl.formatMessage({ id: 'commission.error.loadHistoryFailed' }));
            return {
              data: [],
              total: 0,
              success: false,
            };
          }
        }}
        rowKey="ID"
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50'],
        }}
        search={false}
        scroll={{ x: 1200 }}
        toolBarRender={() => [
          <DatePicker
            key="month"
            picker="month"
            value={historyMonth ? dayjs(historyMonth) : null}
            onChange={(date) => {
              const newMonth = date ? date.format('YYYY-MM') : '';
              console.log('Date picker changed:', newMonth); // 调试日志
              setHistoryMonth(newMonth);
            }}
            placeholder={intl.formatMessage({ id: 'commission.history.selectMonth' })}
            allowClear
          />,
        ]}
      />
    </PageContainer>
  );
};

export default CommissionStats;
