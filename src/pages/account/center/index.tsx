import { ClusterOutlined, ContactsOutlined, HomeOutlined, PlusOutlined } from '@ant-design/icons';
import {GridContent, ProFormDependency, ProFormRadio} from '@ant-design/pro-components';
import { useRequest,useIntl } from '@umijs/max';
import {Avatar, Button, Card, Col, Divider, Input, InputRef, message, Row, Tag} from 'antd';
import React, { useRef, useState,useEffect } from 'react';
import useStyles from './Center.style';
import ProForm, {ProFormDigit} from "@ant-design/pro-form";
import { useModel } from 'umi';
import {queryCurrentUser, ReportLists, WithdrawAdd} from "@/services/api";
const Center: React.FC = () => {
  const { styles } = useStyles();
  const intl = useIntl();

  const [data, setData] = useState(null); // 初始化为 null 或空对象
  const [TodayIncome, setTodayIncome] = useState(0); // 初始化为 null 或空对象

  useEffect(() => {
    // 模拟异步请求
    const fetchData = async () => {
      const response = await queryCurrentUser(); // 假设这是你的异步请求函数
      setData(response.data.info); // 请求成功后更新状态
    };

    const fetchReportLists = async () => {
      const response = await ReportLists({
        Self: 1,
        limit: 1,
      }); // 假设这是你的异步请求函数
      if(response.data?.length > 0) {
        let res = response.data[0].LotteryRebateAmount + response.data[0].PlaneRebateAmount
        setTodayIncome(res); // 请求成功后更新状态
      }
    }

    fetchData(); // 在组件挂载时触发请求
    fetchReportLists();
  }, []); // 空依赖数组表示只在组件首次挂载时执行
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(data?.InvitationCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2秒后重置复制状态
      message.success(intl.formatMessage({ id: 'pages.account.center.copy.success' }));
    }).catch(err => {
      console.error('复制失败', err);
    });
  };

  // 渲染tab切换
  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card
            bordered={false}
            style={{
              marginBottom: 24,
            }}
          >
            <div>
              <div className={styles.avatarHolder}>
                <div className={styles.name}>{data?.Phone}</div>
                <div>{intl.formatMessage({id:"MyRebate"})}：<Tag>{data?.Rebate}</Tag></div>

              </div>
              {intl.formatMessage({id:"InvitationCode"})}：{data?.InvitationCode} <Button type="primary" onClick={handleCopy}>{intl.formatMessage({id:"copyInvitationCode"})}</Button>
              <Divider dashed />
              {intl.formatMessage({id:"TodayIncome"})}：<Tag color={"green"}>{ parseFloat(TodayIncome).toFixed(2) }</Tag>
              {intl.formatMessage({id:"CurrentBalance"})}：<Tag color={"blue"}>{data?.UserAccount?.Balance}</Tag>
              <Divider dashed />
            {/*  表单提现*/}
              <ProForm
                onFinish={async (values) => {
                  const res = await  WithdrawAdd(values)
                  if (Number(res.code) == 0) {
                    message.success(res.msg);
                  } else {
                    message.error(res.msg);
                  }
                }}
              >

              {/*  手机运营商 */}
                <ProFormRadio.Group
                  name="WithdrawType"
                  label={intl.formatMessage({id:"WithdrawalMethod"})}
                  options={[
                    {
                      label: 'airtel malawi',
                      value: 'airtel malawi',
                    },
                    {
                      label: 'bank transfer',
                      value: 'bank transfer',
                    }
                  ]}
                />
                <ProFormDependency name={['WithdrawType']}>
                  {({ WithdrawType }) => {
                    if (WithdrawType === 'airtel malawi') {
                      return (
                        <ProFormDigit
                          label={intl.formatMessage({id:"Phone"})}
                          name="Phone"
                          width="md"
                          min={1}
                          max={100}
                        />
                      );
                    }
                    if (WithdrawType === 'bank transfer') {
                      return (
                        <>
                        {/*  银行户名 */}
                        <ProFormDigit
                          label={intl.formatMessage({id:"BankName"})}
                          name="BankName"
                          width="md"
                          min={1}
                          max={100}
                        />
                        {/*  银行户名 */}
                        <ProFormDigit
                          label={intl.formatMessage({id:"BankAccount"})}
                          name="BankAccount"
                          width="md"
                          min={1}
                          max={100}
                        />
                        {/*  卡号 */}
                        <ProFormDigit
                          label={intl.formatMessage({id:"CardNumber"})}
                          name="CardNumber"
                          width="md"
                          min={1}
                          max={100}
                        />
                        </>
                      );
                    }
                    return null;
                  }}
                </ProFormDependency>


                <ProFormDigit
                  label={intl.formatMessage({id:"WithdrawalAmount"})}
                  name="Price"
                  width="md"
                  min={1}
                  max={100}
                />
              </ProForm>
            </div>
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};
export default Center;
