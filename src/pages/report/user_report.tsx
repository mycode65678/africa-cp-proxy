import ProForm, {
  ModalForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { useIntl, useLocation, useModel } from '@umijs/max';
import { Form, message, Table } from 'antd';
import dayjs from 'dayjs';
import { parse } from 'query-string';
import React, { useEffect, useRef, useState } from 'react';

import { RebateOperation, ReportLists, StatusChange, userUpdate } from '@/services/api';
import { ProFormList } from '@ant-design/pro-components';

// 金额格式化函数（千分位 + 2位小数）
const formatCurrency = (amount: number | undefined | null): string => {
  if (amount === undefined || amount === null || isNaN(amount)) return '0.00';
  return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const actionRef = useRef<ActionType>();
  const [searchForm] = Form.useForm();
  const intl = useIntl();
  const location = useLocation();
  const { initialState } = useModel('@@initialState');

  // 解析 URL 参数
  const queryParams = parse(location.search);
  const urlProxyId = queryParams.proxyId ? Number(queryParams.proxyId) : undefined;
  const urlMonth = queryParams.month as string | undefined;

  // 获取当前登录代理的ID
  const currentProxyId = initialState?.currentUser?.id;

  const [showEditUserVisible, setShowEditUserVisible] = useState<boolean>(false);
  const [showUpAndDownVisible, setShowUpAndDownVisible] = useState<boolean>(false);
  const [StatusChangeVisible, setStatusChangeVisible] = useState<boolean>(false);
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  // 如果有URL参数或当前代理ID，设置初始表单值
  useEffect(() => {
    const proxyId = urlProxyId || currentProxyId;
    if (proxyId || urlMonth) {
      const initialValues: any = {};
      if (urlMonth) {
        // 将月份转换为日期范围
        const monthStart = dayjs(urlMonth).startOf('month').format('YYYY-MM-DD');
        const monthEnd = dayjs(urlMonth).endOf('month').format('YYYY-MM-DD');
        initialValues.StartDate = monthStart;
        initialValues.EndDate = monthEnd;
      }
      searchForm.setFieldsValue(initialValues);
      // 触发表格查询
      actionRef.current?.reloadAndRest?.();
    }
  }, [urlProxyId, urlMonth, currentProxyId]);

  const columns = [
    {
      title: intl.formatMessage({ id: 'ID' }),
      dataIndex: 'ID',
      search: false,
      width: 80,
    },
    {
      title: intl.formatMessage({ id: 'Phone' }),
      dataIndex: 'Phone',
      render: (_, record) => {
        return record.User?.Phone || '-';
      },
    },
    {
      title: intl.formatMessage({ id: 'Remark' }),
      dataIndex: 'Remark',
      search: false,
      render: (_, record) => {
        return <span>{record.User?.Remark || '-'}</span>;
      },
    },
    {
      title: intl.formatMessage({ id: 'StartDate' }),
      dataIndex: 'StartDate',
      hideInTable: true,
      valueType: 'date',
    },
    {
      title: intl.formatMessage({ id: 'EndDate' }),
      dataIndex: 'EndDate',
      hideInTable: true,
      valueType: 'date',
    },
    {
      title: intl.formatMessage({ id: 'Date' }),
      dataIndex: 'Date',
      search: false,
      render: (text) => (text ? dayjs(text).format('YYYY-MM-DD') : '-'),
    },
    {
      title: '充值金额',
      dataIndex: 'RechargeAmount',
      search: false,
      render: (text) => formatCurrency(text),
    },
    {
      title: '提现金额',
      dataIndex: 'WithdrawAmount',
      search: false,
      render: (text) => formatCurrency(text),
    },
    {
      title: '存提差',
      dataIndex: 'DepositWithdrawDiff',
      search: false,
      render: (_, record) => {
        const diff = (record.RechargeAmount || 0) - (record.WithdrawAmount || 0);
        let color = '#8c8c8c'; // 默认灰色
        if (diff > 0) color = '#52c41a'; // 正数绿色
        else if (diff < 0) color = '#f5222d'; // 负数红色
        return <span style={{ color, fontWeight: 'bold' }}>{formatCurrency(diff)}</span>;
      },
    },
  ];

  const formRef = useRef();

  const getList = async (params: any) => {
    // 自动添加当前代理筛选（代理端默认只查看自己下级）
    const proxyId = urlProxyId || currentProxyId;
    if (proxyId) {
      params.proxyId = proxyId;
    }
    const res = await ReportLists(params);
    return res;
  };

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        actionRef={actionRef}
        formRef={searchForm as any}
        rowKey="ID"
        search={{
          labelWidth: 120,
        }}
        scroll={{ x: 'max-content' }}
        request={getList}
        columns={columns}
        summary={(pageData) => {
          let totalRecharge = 0;
          let totalWithdraw = 0;
          let totalDiff = 0;

          pageData.forEach(({ RechargeAmount, WithdrawAmount }) => {
            totalRecharge += RechargeAmount || 0;
            totalWithdraw += WithdrawAmount || 0;
            totalDiff += (RechargeAmount || 0) - (WithdrawAmount || 0);
          });

          const diffColor = totalDiff > 0 ? '#52c41a' : totalDiff < 0 ? '#f5222d' : '#8c8c8c';

          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={6}>
                <strong>汇总</strong>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={6}>
                <strong>{formatCurrency(totalRecharge)}</strong>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={7}>
                <strong>{formatCurrency(totalWithdraw)}</strong>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={8}>
                <strong style={{ color: diffColor }}>{formatCurrency(totalDiff)}</strong>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
      <ModalForm
        title={'编辑用户'}
        layout={'horizontal'}
        width={500}
        labelCol={{ span: 4 }}
        formRef={formRef}
        visible={showEditUserVisible}
        onVisibleChange={setShowEditUserVisible}
        onFinish={async (value) => {
          const res = await userUpdate(value);
          if (Number(res.code) === 0) {
            message.success(res.msg);
            setShowEditUserVisible(false);
            actionRef.current?.reload();
          } else {
            message.error(res.msg);
          }
        }}
      >
        <ProFormText readonly={true} name={'ID'} hidden={true} />
        <ProFormText label={'登陆邮箱'} readonly={true} width="md" name="Email" />
        {/*  登陆密码*/}
        <ProFormText.Password label={'登陆密码'} width="md" name="Password" />
        {/*  安全密码*/}
        <ProFormText.Password label={'安全密码'} width="md" name="SafePassword" />

        {/*  账号类型*/}
        <ProFormRadio.Group
          label={'账号类型'}
          width="md"
          name="Virtual"
          options={[
            {
              label: '真实',
              value: 1,
            },
            {
              label: '内部',
              value: 2,
            },
          ]}
        />
        {/*  账号状态*/}
        <ProFormRadio.Group
          label={'账号状态'}
          width="md"
          name="Status"
          options={[
            {
              label: '正常',
              value: 1,
            },
            {
              label: '冻结',
              value: 2,
            },
          ]}
        />
        {/*  会员备注*/}
        <ProFormTextArea label={'会员备注'} width="md" name="Remark" />
      </ModalForm>
      <ModalForm
        title={'状态变更'}
        layout={'horizontal'}
        width={500}
        labelCol={{ span: 4 }}
        formRef={formRef}
        visible={StatusChangeVisible}
        onVisibleChange={setStatusChangeVisible}
        onFinish={async (value) => {
          const res = await StatusChange(value);
          if (Number(res.code) === 0) {
            message.success(res.msg);
            setStatusChangeVisible(false);
            actionRef.current?.reload();
          } else {
            message.error(res.msg);
          }
        }}
      >
        <ProFormText readonly={true} name={'ID'} hidden={true} />
        <ProFormRadio.Group
          label={'状态'}
          width="md"
          name="Status"
          initialValue={1}
          options={[
            {
              label: '处理中',
              value: 0,
            },
            {
              label: '已提货',
              value: 1,
            },
            {
              label: '在途中',
              value: 2,
            },
            {
              label: '确认收货',
              value: 3,
            },
            {
              label: '违规订单',
              value: 4,
            },
          ]}
        />
      </ModalForm>
      <ModalForm
        title={'操作回水'}
        layout={'horizontal'}
        width={800}
        // labelCol={{ span: 4 }}
        formRef={formRef}
        visible={showUpAndDownVisible}
        onVisibleChange={setShowUpAndDownVisible}
        onFinish={async (value) => {
          console.log(value);
          const res = await RebateOperation(value);
          if (Number(res.code) === 0) {
            message.success(res.msg);
            setShowUpAndDownVisible(false);
            actionRef.current?.reload();
          } else {
            message.error(res.msg);
          }
        }}
      >
        {/* 回水方式 */}
        <ProFormRadio.Group
          label={'回水方式'}
          width="md"
          name="Type"
          options={[
            {
              label: '按总下注回水',
              value: 1,
            },
            {
              label: '按总输钱回水(下方请填正数)',
              value: 2,
            },
          ]}
        />
        {/* 日期 */}
        <ProFormDatePicker label={'开始日期'} width="md" name={`Date`} />
        <ProFormList name={'Rebate'}>
          <ProForm.Group>
            <ProFormDigit label={'启始金额'} width="xs" name={`start`} />
            <ProFormDigit label={'结束金额'} width="xs" name={`End`} />
            <ProFormDigit label={'回水比例'} width="xs" name={`Rebate`} />
          </ProForm.Group>
        </ProFormList>
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
