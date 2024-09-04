import { PlusOutlined } from '@ant-design/icons';
import {Button, message, Input, Modal, Form, Image, Radio} from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {ModalForm, ProFormDigit, ProFormRadio, ProFormTextArea} from '@ant-design/pro-form';
import ProForm, {
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-form';
import { history, useIntl, useModel } from '@umijs/max';

import {
  PorxyAdd,
  UserLists,
  userUpdate,
  ProxyLock,
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

  const [showEditUserVisible, setShowEditUserVisible] = useState<boolean>(false);

  const [showUpAndDownVisible, setShowUpAndDownVisible] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
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
      search: false,
      dataIndex: 'ID'
    },
    {
      title: intl.formatMessage({id: 'Phone',}),
      dataIndex: 'Phone',
      order: 99,
    },
    {
      hideInTable: true,
      initialValue: 1,
      dataIndex: 'IsProxy',
    },
    {
      title: intl.formatMessage({id: 'Rebate',}),
      search: false,
      dataIndex: 'Rebate',
    },
    {
      title: intl.formatMessage({id: 'Remark',}),
      search: false,
      dataIndex: 'Remark',
    },
    {
      title: intl.formatMessage({id: 'Balance',}),
      search: false,
      // valueType: UsMoney,
      dataIndex: 'Balance',
      renderText: (_, record) => {
        return record.UserAccount.Balance
      }
    },

    {
      title: intl.formatMessage({id: 'Status',}),
      dataIndex: 'Status',
      valueEnum: {
        1: {
          text: intl.formatMessage({id: 'Normal',}),
          status: 'Success',
        },
        2: {
          text: intl.formatMessage({id: 'Lock',}),
          status: 'Error',
        },
      },
    },

    {
      title: '邀请码',
      search: false,
      dataIndex: 'InvitationCode',
    },


    // {
    //   title: '注册时间',
    //   search: false,
    //   dataIndex: 'CreatedAt',
    // },
    // {
    //   title: '最后登录',
    //   search: false,
    //   dataIndex: 'UpdatedAt',
    // },
    {
      title: intl.formatMessage({id: 'Operation',}),
      dataIndex: '',
      search: false,
      key: 'x',
      render: (_, record) => {
        return [
          <Button type="primary" style={{marginRight:"5px"}} onClick={() => edit(record)}>
            {intl.formatMessage({id: 'Edit',})}
          </Button>,
        ]
      },
    },
  ];

  const changeStatus = async (record: any) => {
    let status = 1;
    if(record.Status == 1) {
      status = 2;
    } else {
      status = 1;
    }
    // 弹出确定框
    Modal.confirm({
      title: '改变团队状态',
      content: '确定改变团队状态？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const res = await ProxyLock({UId: record.ID, Status: status})
        if (Number(res.code) == 0) {
          message.success(res.msg);
          actionRef.current?.reload();
        } else {
          message.error(res.msg);
        }
      }
    });
  }

  const edit = (record: any) => {
    setShowEditUserVisible(true);
    setTimeout(() => {
      formRef.current.setFieldsValue(record);
    },100)
  }

  const getList = async (params: any) => {
    params.IsProxy = 1;
    const res = await UserLists(params)
    return res
  }

  const formRef = useRef();


  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        actionRef={actionRef}
        rowKey="ID"

        search={false} // toolBarRender={}
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
        title={intl.formatMessage({id: 'Edit',})}
        layout={'horizontal'}
        width={500}
        labelCol={{span: 4}}
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
          label={intl.formatMessage({id: 'Phone',})}
          readonly={true}
          width="md"
          name="Phone"
        />
        <ProFormDigit
          fieldProps={{ precision: 2 }}
          min={0}
          label={intl.formatMessage({id: 'Rebate',})}
          width="md"
          name="Rebate"
        />

        {/*  会员备注*/}
        <ProFormTextArea
          label={intl.formatMessage({id: 'Remark',})}
          width="md"
          name="Remark"
        />

      </ModalForm>

      <ModalForm
        title={'新增代理'}
        width={400}
        // layout={'horizontal'}
        modalProps={{
          destroyOnClose: true,
        }}
        formRef={formRef}
        visible={visible}
        onVisibleChange={setVisible}
        onFinish={async (value) => {
          const res = await  PorxyAdd(value)
          if (Number(res.code) == 0) {
            message.success(res.msg);
            setVisible(false);
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
          readonly={true}
          name={'Virtual'}
          initialValue={1}
          hidden={true}
        />
        <ProFormText
          name={'IsProxy'}
          hidden={true}
          initialValue={1}
        />
        <ProFormText
          label={'登录手机号'}
          width="md"
          name="Phone"
        />
        {/*  登陆密码*/}
        <ProFormText.Password
          label={'登陆密码'}
          width="md"
          name="Password"
        />
        <ProFormText.Password
          label={'确认密码'}
          width="md"
          name="PasswordConfirm"
        />
        {/* 返点 */}
        <ProFormDigit
          label={'返点'}
          width="md"
          initialValue={2}
          min={0}
          fieldProps={{ precision: 2 }}
          name="Rebate"
        />

        {/*  会员备注*/}
        <ProFormTextArea
          label={'会员备注'}
          width="md"
          name="Remark"
        />

      </ModalForm>

    </PageContainer>
  );
};

export default TableList;
