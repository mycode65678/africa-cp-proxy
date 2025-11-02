import { GameBetRecordLists } from '@/services/api';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { useIntl } from '@umijs/max';
import React, { useRef } from 'react';

const GameRecord: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<any>[] = [
    {
      title: intl.formatMessage({ id: 'ID' }),
      dataIndex: 'ID',
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'Phone' }),
      dataIndex: 'Phone',
      render: (_, record) => {
        return record.User?.Phone;
      },
    },
    {
      title: intl.formatMessage({ id: 'Remark' }),
      dataIndex: 'Remark',
      search: false,
      render: (_, record) => {
        return <span>{record.User?.Remark}</span>;
      },
    },
    {
      title: intl.formatMessage({ id: 'GameName' }),
      dataIndex: 'GameName',
      search: false,
      render: (_, record) => {
        return <span>{record.Game?.Name}</span>;
      },
    },
    // {
    //   title: intl.formatMessage({ id: 'GameCompany' }),
    //   dataIndex: 'GameCompany',
    //   search: false,
    //   render: (_, record) => {
    //     return <span>{record.Game?.Company}</span>;
    //   },
    // },
    {
      title: intl.formatMessage({ id: 'SerialNumber' }),
      dataIndex: 'SerialNumber',
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'GameRound' }),
      dataIndex: 'GameRound',
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'BetAmount' }),
      dataIndex: 'BetAmount',
      search: false,
      render: (_, record) => {
        return <span>{Number(record.BetAmount).toFixed(2)}</span>;
      },
    },
    {
      title: intl.formatMessage({ id: 'WinAmount' }),
      dataIndex: 'WinAmount',
      search: false,
      render: (_, record) => {
        const winAmount = Number(record.WinAmount);
        return (
          <span style={{ color: winAmount > 0 ? 'blue' : winAmount < 0 ? 'red' : 'inherit' }}>
            {winAmount.toFixed(2)}
          </span>
        );
      },
    },
    // {
    //   title: intl.formatMessage({ id: 'MainBalanceBet' }),
    //   dataIndex: 'MainBalanceBet',
    //   search: false,
    //   render: (_, record) => {
    //     return <span>{Number(record.MainBalanceBet).toFixed(2)}</span>;
    //   },
    // },
    // {
    //   title: intl.formatMessage({ id: 'BonusBalanceBet' }),
    //   dataIndex: 'BonusBalanceBet',
    //   search: false,
    //   render: (_, record) => {
    //     return <span>{Number(record.BonusBalanceBet).toFixed(2)}</span>;
    //   },
    // },
    // {
    //   title: intl.formatMessage({ id: 'FirstDepositBonusBalanceBet' }),
    //   dataIndex: 'FirstDepositBonusBalanceBet',
    //   search: false,
    //   render: (_, record) => {
    //     return <span>{Number(record.FirstDepositBonusBalanceBet).toFixed(2)}</span>;
    //   },
    // },
    {
      title: intl.formatMessage({ id: 'CreatedAt' }),
      dataIndex: 'CreatedAt',
      search: false,
    },
  ];

  const getList = async (params: any) => {
    const res = await GameBetRecordLists(params);
    return res;
  };

  return (
    <PageContainer>
      <ProTable<any>
        actionRef={actionRef}
        rowKey="ID"
        search={{
          labelWidth: 120,
        }}
        options={false}
        request={getList}
        columns={columns}
      />
    </PageContainer>
  );
};

export default GameRecord;
