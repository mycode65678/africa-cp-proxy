import { PlusOutlined } from '@ant-design/icons';
import {Button, message, Input, Modal, Form, Image, Radio, Popconfirm, Card} from 'antd';
import React, {useState, useRef, useEffect} from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {UsMoney} from '@/utils/common'
import {ModalForm, ProFormDatePicker, ProFormDigit, ProFormRadio, ProFormTextArea} from '@ant-design/pro-form';
import { StatisticCard } from '@ant-design/pro-components';
import ProForm, {
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-form';
import { history, useIntl, useModel } from '@umijs/max';

import {
  OrderDel, ReleaseFunds, userUpdate, LeaveList, StatusChange, ReportLists, RebateOperation,
} from '@/services/api';
import {ProFormGroup, ProFormList} from "@ant-design/pro-components";
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
  const [form] = Form.useForm();
  const [typeObj, setTypeObj] = useState({})
  const intl = useIntl();

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
      title: intl.formatMessage({id: 'ID'}),
      dataIndex: 'ID',
      // hideInTable: true,
      search: false,
    },
    {
      title: intl.formatMessage({id: 'Phone'}),
      dataIndex: 'Phone',
      // fixed: 'left',
      // search: false,
      render: (_, record) => {
        return [
          record.User?.Phone,
        ]
      }
    },
    {
      title: intl.formatMessage({id: 'Remark'}),
      dataIndex: 'Remark',
      search: false,
      render: (_, record) => {
        return <span>{record.User.Remark}</span>
      }
    },
    {
      title: intl.formatMessage({id: 'StartDate'}),
      dataIndex: 'StartDate',
      hideInTable: true,
      valueType: 'date',
      // search: false,
    },
    {
      title: intl.formatMessage({id: 'EndDate'}),
      dataIndex: 'EndDate',
      hideInTable: true,
      valueType: 'date',
      // search: false,
    },
    {
      title: intl.formatMessage({id: 'Date'}),
      dataIndex: 'Date',
      search: false,
    },
    // {
    //   title: intl.formatMessage({id: 'AircraftBetAmount'}),
    //   dataIndex: 'PlaneBetAmount',
    //   search: false,
    // },
    // {
    //   title: intl.formatMessage({id: 'AircraftWinningAmount'}),
    //   dataIndex: 'PlaneWinAmount',
    //   search: false,
    // },
    {
      title: intl.formatMessage({id: 'AircraftWaterBackAmount'}),
      dataIndex: 'PlaneRebateAmount',
      search: false,
    },
    // {
    //   title: intl.formatMessage({id: 'AircraftProfitAndLossAmount'}),
    //   dataIndex: 'PlaneProfit',
    //   search: false,
    //   render: (_, record) => {
    //     let res = record.PlaneBetAmount - record.PlaneWinAmount - record.PlaneRebateAmount
    //     res = parseFloat(res).toFixed(2)
    //     return <span style={{color: res > 0 ? 'red' : 'green'}}>{res}</span>
    //   }
    // },
    // {
    //   title: intl.formatMessage({id: 'LotteryBetAmount'}),
    //   dataIndex: 'LotteryBetAmount',
    //   search: false,
    // },
    // {
    //   title: intl.formatMessage({id: 'LotteryWinningAmount'}),
    //   dataIndex: 'LotteryWinAmount',
    //   search: false,
    // },
    {
      title: intl.formatMessage({id: 'LotteryWaterBackAmount'}),
      dataIndex: 'LotteryRebateAmount',
      search: false,
    },
    // {
    //   title: intl.formatMessage({id: 'LotteryProfitAndLossAmount'}),
    //   dataIndex: 'Profit',
    //   search: false,
    //   render: (_, record) => {
    //     let res = record.LotteryBetAmount - record.LotteryWinAmount - record.LotteryRebateAmount
    //     res = parseFloat(res).toFixed(2)
    //     return <span style={{color: res > 0 ? 'red' : 'green'}}>{res}</span>
    //   }
    // },

    // {
    //   title: '操作',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   // width: 500,
    //   // fixed:"right",
    //   render: (_, record) => {
    //     return [
    //       // record.ReleaseStatus === 0 ? [<a style={{marginRight: '1px'}} onClick={()=>{actionStatusChange(record)}}>改变状态</a>,] : null,
    //       // record.ReleaseStatus === 0 ? [<Popconfirm title={`确定要删除吗?`} onConfirm={() => {deleteOrder(record)}}><a key="delete">删除订单</a></Popconfirm>] : null,
    //       // record.ReleaseStatus === 0 ? [<Popconfirm title={`确定要释放资金吗?`} onConfirm={() => {ActionReleaseFunds(record)}}><a key="Releasefunds">释放资金</a></Popconfirm>] : null,
    //     ]
    //   }
    // },
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
    const res = await ReportLists(params)
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
        // toolBarRender={() => [
        //   <Button
        //     type="primary"
        //     key="primary"
        //     onClick={() => {
        //       setShowUpAndDownVisible(true);
        //     }}
        //   >
        //     操作回水
        //   </Button>,
        // ]}
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
        title={'操作回水'}
        layout={'horizontal'}
        width={800}
        // labelCol={{ span: 4 }}
        formRef={formRef}
        visible={showUpAndDownVisible}
        onVisibleChange={setShowUpAndDownVisible}
        onFinish={async (value) => {
          console.log(value)
          const res = await  RebateOperation(value)
          if (Number(res.code) == 0) {
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
        <ProFormDatePicker
          label={'开始日期'}
          width="md"
          name={`Date`}
        />
        <ProFormList name={"Rebate"}>
          <ProForm.Group>
          <ProFormDigit
            label={'启始金额'}
            width="xs"
            name={`start`}
          />
          <ProFormDigit
            label={'结束金额'}
            width="xs"
            name={`End`}
          />
          <ProFormDigit
            label={'回水比例'}
            width="xs"
            name={`Rebate`}
          />
          </ProForm.Group>
        </ProFormList>



      </ModalForm>

    </PageContainer>
  );
};

export default TableList;
