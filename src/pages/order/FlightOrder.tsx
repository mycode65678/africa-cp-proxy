import { PlusOutlined } from '@ant-design/icons';
import {Button, message, Input, Modal, Form, Image, Radio, Popconfirm} from 'antd';
import React, {useState, useRef, useEffect} from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {UsMoney} from '@/utils/common'
import {ModalForm, ProFormDigit, ProFormRadio, ProFormTextArea} from '@ant-design/pro-form';
import ProForm, {
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-form';
import { history, useIntl, useModel } from '@umijs/max';

import {
  OrderDel, ReleaseFunds, userUpdate, LeaveList, StatusChange, FlightOrderLists,
} from '@/services/api';
const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const intl = useIntl();

  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [typeObj, setTypeObj] = useState({})

  const [showEditUserVisible, setShowEditUserVisible] = useState<boolean>(false);

  const [showUpAndDownVisible, setShowUpAndDownVisible] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [StatusChangeVisible, setStatusChangeVisible] = useState<boolean>(false);
  const [DetailOfAssetsData, setDetailOfAssetsData] = useState<object>({});
  const [UId, setUId] = useState<number>(0);
  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 8,
    },
  };
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns = [
    {
      title: intl.formatMessage({id: 'ID',}),
      dataIndex: 'ID',
      // hideInTable: true,
      search: false,
    },
    {
      title: intl.formatMessage({id: 'Phone',}),
      dataIndex: 'Phone',
      render: (_, record) => {
        return [
          record.User?.Phone,
        ]
      }
    },
    {
      title: intl.formatMessage({id: 'Remark',}),
      dataIndex: 'Remark',
      search: false,
      render: (_, record) => {
        return <span>{record.User?.Remark}</span>
      }
    },
    {
      title: intl.formatMessage({id: 'Period',}),
      dataIndex: 'Period',
      search: false,
    },
    {
      title: intl.formatMessage({id: 'PurchaseAmount',}),
      dataIndex: 'Amount',
      search: false,
    },
    {
      title: intl.formatMessage({id: 'Odds',}),
      dataIndex: 'Odds',
      search: false,
    },
    {
      title: intl.formatMessage({id: 'WinningAmount',}),
      dataIndex: 'WinAmount',
      search: false,
    },
    {
      title: intl.formatMessage({id: 'ProfitAndLoss',}),
      dataIndex: 'ProfitLoss',
      search: false,
    },
    {
      title: intl.formatMessage({id: 'Status',}),
      dataIndex: 'Status',
      valueEnum: {
        1: {
          text: intl.formatMessage({id: 'Settled'}),
          status: 'Success',
        },
        2: {
          text: intl.formatMessage({id: 'Withdrawal'}),
          status: 'Error',
        },
        0: {
          text: intl.formatMessage({id: 'InProgress'}),
          status: 'Processing',
        },
      }
    },

    {
      title: intl.formatMessage({id: 'CreatedAt',}),
      dataIndex: 'CreatedAt',
      search: false
    },
    {
      title: intl.formatMessage({id: 'UpdatedAt',}),
      dataIndex: 'UpdatedAt',
      search: false
    },
  ];

  const actionStatusChange = async (record: any) => {
    setStatusChangeVisible(true)
    setTimeout(() => {
      formRef.current.setFieldsValue(record);
    })
  }
  const ActionReleaseFunds = async (record: any) => {
    const res = await ReleaseFunds({ID:record.ID})
    if (Number(res.code) === 0) {
      message.success(res.msg);
      actionRef.current?.reload();
    } else {
      message.error(res.msg);
    }
  }
  const deleteOrder = async (record: any) => {
    const res = await OrderDel({ID:record.ID})
    if (Number(res.code) == 0) {
      message.success(res.msg);
      actionRef.current?.reload();
    } else {
      message.error(res.msg);
    }
  }

  const formRef = useRef();
  const getList = async (params: any) => {
    const res = await FlightOrderLists(params)
    return res
  }

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        actionRef={actionRef}
        rowKey="ID"
        search={{
          labelWidth: 120,
        }} // toolBarRender={}
        // scroll={{x: "max-content"}}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            <PlusOutlined /> 新增
          </Button>,
        ]}
        request={getList}
        columns={columns}
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
          const res = await  userUpdate(value)
          if (Number(res.code) == 0) {
            message.success(res.msg);
            setShowEditUserVisible(false);
            actionRef.current?.reload();
          } else {
            message.error(res.msg);
          }
        }}
      >
        <ProFormText
          readonly={true}
          name={'ID'}
          hidden={true}
        />
        <ProFormText
          label={'登陆邮箱'}
          readonly={true}
          width="md"
          name="Email"
        />
        {/*  登陆密码*/}
        <ProFormText.Password
          label={'登陆密码'}
          width="md"
          name="Password"
        />
        {/*  安全密码*/}
        <ProFormText.Password
          label={'安全密码'}
          width="md"
          name="SafePassword"
        />

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
        <ProFormTextArea
          label={'会员备注'}
          width="md"
          name="Remark"
        />

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
            const res = await  StatusChange(value)
            if (Number(res.code) == 0) {
              message.success(res.msg);
              setStatusChangeVisible(false);
              actionRef.current?.reload();
            } else {
              message.error(res.msg);
            }
          }}
      >
        <ProFormText
            readonly={true}
            name={'ID'}
            hidden={true}
        />
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
        title={'资金加减'}
        layout={'horizontal'}
        width={500}
        labelCol={{ span: 4 }}
        formRef={formRef}
        visible={showUpAndDownVisible}
        onVisibleChange={setShowUpAndDownVisible}
        onFinish={async (value) => {
          const res = await  UserAdjustment(value)
          if (Number(res.code) == 0) {
            message.success(res.msg);
            setShowUpAndDownVisible(false);
            actionRef.current?.reload();
          } else {
            message.error(res.msg);
          }
        }}
      >
        <ProFormText
          readonly={true}
          name={'ID'}
          hidden={true}
        />
        <ProFormText
          label={'登陆邮箱'}
          readonly={true}
          width="md"
          name="Email"
        />
        <ProFormDigit
          label={'调整金额'}
          width="md"
          required={true}
          name="Amount"
        />
        <ProFormRadio.Group
          label={'调整类型'}
          width="md"
          name="Type"
          initialValue={24}
          options={[
            {
              label: '余额',
              value: 24,
            },
            {
              label: '可提现余额',
              value: 1,
            },
          ]}
        />
        <ProFormDigit
          label={'备注'}
          width="md"
          required={true}
          name="Remark"
        />

      </ModalForm>

    </PageContainer>
  );
};

export default TableList;
