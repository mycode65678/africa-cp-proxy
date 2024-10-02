import { PlusOutlined } from '@ant-design/icons';
import {Button, message, Input, Modal, Form, Image, Radio, Popconfirm} from 'antd';
import React, { useState, useRef } from 'react';
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
  UserLists,
  userUpdate,
  UserAdjustment,
  ShopList,
  ShopUpdate,
  ProductList,
  ShippingAddressList,
  UserAdd,
  OrderAdd,
  BurstOrderAdd,
  LeaveList,
  GenToken, AddTaskCount, UserDelete, LoginKeyAdd, CreateVirtualUser
} from '@/services/api';
import {getToken} from "@/utils/auth";
import {ProFormUploadButton,ProCard,StepsForm} from "@ant-design/pro-components";
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
  const formMapRef = useRef([]);
  const [form] = Form.useForm();
  const [copied, setCopied] = useState(false);
  const [showEditUserVisible, setShowEditUserVisible] = useState<boolean>(false);

  const [showUpAndDownVisible, setShowUpAndDownVisible] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [DetailOfAssetsData, setDetailOfAssetsData] = useState<object>({});
  const [UId, setUId] = useState<number>(0);
  const [ShopVisible, setShopVisible] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editId, setEditId] = useState('');
  const [burstVisible, setBurstVisible] = useState(false);
  const [taskVisible, setTaskVisible] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
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
      title: intl.formatMessage({id: 'SuperiorAccount',}),
      dataIndex: 'ParentUser',
      order: 99,
      renderText: (_, record) => {
        return record.ParentUser?.Phone
      }
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
    // {
    //   title: intl.formatMessage({id: 'Rebate',}),
    //   search: false,
    //   dataIndex: 'Rebate',
    // },
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

    // {
    //   title: '登陆IP',
    //   // search: false,
    //   dataIndex: 'LoginIp',
    // },

    // {
    //   title: intl.formatMessage({id: 'Operation',}),
    //   dataIndex: '',
    //   search: false,
    //   key: 'x',
    //   render: (_, record) => {
    //     return [
    //       <Button type="primary" style={{marginRight:"5px"}} onClick={() => edit(record)}>
    //         {intl.formatMessage({id: 'Edit',})}
    //       </Button>,
    //     ]
    //   },
    // },
  ];










  const edit = (record: any) => {
    setShowEditUserVisible(true);
    setTimeout(() => {
      formRef.current.setFieldsValue(record);
    },100)
  }
  const showWallet = (record: any) => {
    setShowUpAndDownVisible(true);
    setTimeout(() => {
      formRef.current?.setFieldsValue(record);
    },200)
  }



  const formRef = useRef();
  const getList = async (params: any) => {
    params.IsProxy = 0
    // params.IsBusiness = 2
    const res = await UserLists(params)
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
        // toolBarRender={() => [
        //   <Button
        //     type="primary"
        //     key="primary"
        //     onClick={() => {
        //       setVisible(true);
        //     }}
        //   >
        //     <PlusOutlined /> 新增
        //   </Button>,
        // ]}
        request={getList}
        columns={columns}
      />


      <ModalForm
        title={intl.formatMessage({id: 'Edit',})}
        layout={'horizontal'}
        width={500}
        labelCol={{ span: 4 }}
        formRef={formRef}
        modalProps={{
            destroyOnClose: true,
        }}
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
        {/* 返点 */}
        <ProFormDigit
          fieldProps={{ precision: 2 }}
          min={0}
          label={intl.formatMessage({id: 'Rebate',})}
          width="md"
          name="Rebate"
        />

        {/*  登陆密码*/}


        {/*  会员备注*/}
        <ProFormTextArea
          label={'会员备注'}
          width="md"
          name="Remark"
        />

      </ModalForm>

      <ModalForm
        title={'资金加减'}
        layout={'horizontal'}
        width={500}
        labelCol={{ span: 4 }}
        formRef={formRef}
        visible={showUpAndDownVisible}
        modalProps={{
          destroyOnClose: true,
        }}

        onVisibleChange={setShowUpAndDownVisible}
        onFinish={async (value) => {
          const res = await  UserAdjustment(value)
          console.log(res)
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
          label={'邮箱'}
          readonly={true}
          width="md"
          name="Email"
        />
        <ProFormText
          label={'手机号'}
          readonly={true}
          width="md"
          name="Phone"
        />
        <ProFormText
          label={'调整金额'}
          width="md"
          fieldProps={{
              type: 'number',
          }}
          required={true}
          name="Amount"
        />
        <ProFormRadio.Group
          label={'调整类型'}
          width="md"
          name="Type"
          initialValue={24}
          hidden={true}
          options={[
            {
              label: '余额',
              value: 24,
            },
            {
              label: '可提现余额',
              value: 1,
            },
            {
              label: '保证金',
              value: 2,
            },
          ]}
        />
        <ProFormTextArea
          label={'备注'}
          width="md"
          required={true}
          name="Remark"
        />

      </ModalForm>



      <ModalForm
        title={'增加卡单'}
        layout={'horizontal'}
        width={500}
        labelCol={{ span: 4 }}
        formRef={formRef}
        visible={burstVisible}

        onVisibleChange={setBurstVisible}
        onFinish={async (value) => {
          const res = await  BurstOrderAdd(value)
          console.log(res)
          if (Number(res.code) == 0) {
            message.success(res.msg);
            setBurstVisible(false);
            actionRef.current?.reload();
          } else {
            message.error(res.msg);
          }
        }}
      >
        <ProFormText
          readonly={true}
          name={'UId'}
          hidden={true}
        />

        <ProFormDigit
          label={'单数'}
          width="md"
          required={true}
          name="Num"
        />
        <ProFormDigit
          label={'佣金倍数'}
          width="md"
          required={true}
          name="Multiple"
        />
        <ProFormDigit
          label={'充值金额'}
          width="md"
          required={true}
          name="Amount"
        />

      </ModalForm>

      <ModalForm
        title={'增加任务数量'}
        layout={'horizontal'}
        width={500}
        labelCol={{ span: 4 }}
        formRef={formRef}
        visible={taskVisible}
        onVisibleChange={setTaskVisible}
        onFinish={async (value) => {
          const res = await  AddTaskCount(value)
          console.log(res)
          if (Number(res.code) == 0) {
            message.success(res.msg);
            setTaskVisible(false);
          } else {
            message.error(res.msg);
          }
        }}
      >
        <ProFormText
          readonly={true}
          name={'UId'}
          hidden={true}
        />

        <ProFormDigit
          label={'任务数量'}
          width="md"
          required={true}
          name="Count"
        />

      </ModalForm>
      <ModalForm
        title={'增加卡单'}
        layout={'horizontal'}
        width={500}
        labelCol={{ span: 5 }}
        formRef={formRef}
        visible={burstVisible}

        onVisibleChange={setBurstVisible}
        onFinish={async (value) => {
          const res = await  BurstOrderAdd(value)
          console.log(res)
          if (Number(res.code) == 0) {
            message.success(res.msg);
            setBurstVisible(false);
            actionRef.current?.reload();
          } else {
            message.error(res.msg);
          }
        }}
      >
        <ProFormText
          readonly={true}
          name={'UId'}
          hidden={true}
        />

        <ProFormDigit
          label={'单数'}
          width="md"
          required={true}
          name="Num"
        />
        <ProFormRadio.Group
          label={'佣金方式'}
          width="md"
          name="Type"
          initialValue={1}
          options={[
            {
              label: '佣金倍数',
              value: 1,
            },
            {
              label: '固定金额',
              value: 2,
            },
          ]}
        />
        <ProFormDigit
          label={'倍数/金额'}
          width="md"
          required={true}
          name="Multiple"
        />
        <ProFormDigit
          label={'充值金额'}
          width="md"
          required={true}
          name="Amount"
        />

      </ModalForm>


      <ModalForm
        title={'店铺信息'}
        layout={'horizontal'}
        width={500}
        labelCol={{ span: 6 }}
        formRef={formRef}
        visible={ShopVisible}
        request={async (parms) => {
          const res = await ShopList({UId:UId})
            let data = res.data[0]
            if (data.CardFront.length > 0) {
                data.TmpCardFront = [{
                    uid: '-1',
                    name: 'defaultFile.jpg',
                    status: 'done',
                    url: data.CardFront,
                }]
            } else {
                data.TmpCardFront = []
            }
            if (data.CardBack.length > 0) {
                data.TmpCardBack = [{
                    uid: '-1',
                    name: 'defaultFile.jpg',
                    status: 'done',
                    url: data.CardBack,
                }]
            } else {
                data.TmpCardBack = []
            }
            // TmpBanner
            if (data.Banner.length > 0) {
                data.TmpBanner = [{
                    uid: '-1',
                    name: 'defaultFile.jpg',
                    status: 'done',
                    url: data.Banner,
                }]
            } else {
                data.TmpBanner = []
            }
          return res.data[0]
        }}
        onVisibleChange={setShopVisible}
        onFinish={async (value) => {
          if(value.TmpCardBack.length > 0 && value.TmpCardBack[0].response?.data !== undefined) {
              value.CardBack = value.TmpCardBack[0].response.data
          }
          if(value.TmpCardFront.length > 0 &&  value.TmpCardFront[0].response?.data !== undefined) {
              value.CardFront = value.TmpCardFront[0].response.data
          }
          if(value.TmpBanner.length > 0 &&  value.TmpBanner[0].response?.data !== undefined) {
              value.Banner = value.TmpBanner[0].response.data
          }
          const res = await  ShopUpdate(value)
          if (Number(res.code) === 0) {
            message.success(res.msg);
            setShopVisible(false);
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
          label={'店铺名称'}
          width="md"
          name="Name"
        />
        <ProFormText
          label={'店铺电话'}
          width="md"
          name="Phone"
        />

        <ProFormText
          label={'店铺地址'}
          width="md"
          name="Address"
        />

        <ProFormRadio.Group
          label={'店铺状态'}
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
        <ProFormText
          label={'基础访问量'}
          width="md"
          name="BaseVisit"
        />
        <ProFormText
          label={'日增长访问量'}
          width="md"
          name="DayVisit"
        />
        <ProFormText
          label={'facebook链接'}
          width="md"
          name="Facebook"
        />
        <ProFormText
          label={'instagram链接'}
          width="md"
          name="Instagram"
        />
        <ProFormText
          label={'youtube链接'}
          width="md"
          name="Youtube"
        />
          <ProFormRadio.Group
              label={'证件类型'}
              width="md"
              name="CardType"
              options={[
                  {
                      label: '身份证',
                      value: 1,
                  },
                  {
                      label: '护照',
                      value: 2,
                  },
              ]}
          />
          <ProFormUploadButton
              name="TmpBanner"
              label="店铺banner"
              max={1}
              fieldProps={{
                  headers: {
                      "admin-token":getToken(),
                  }
              }}
              action="/api/proxy/upload"
              listType="picture-card"
          />

          <ProFormUploadButton
              name="TmpCardFront"
              label="证件正面照"
              max={1}
              fieldProps={{
                  headers: {
                      "admin-token":getToken(),
                  }
              }}
              action="/api/proxy/upload"
              listType="picture-card"
          />
          <ProFormUploadButton
              name="TmpCardBack"
              label="证件反面照"
              max={1}
              fieldProps={{
                  headers: {
                      "admin-token":getToken(),
                  }
              }}
              action="/api/proxy/upload"
              listType="picture-card"
          />
      </ModalForm>

    </PageContainer>
  );
};

export default TableList;
