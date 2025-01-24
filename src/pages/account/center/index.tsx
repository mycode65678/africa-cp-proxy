import { ClusterOutlined, ContactsOutlined, HomeOutlined, PlusOutlined } from '@ant-design/icons';
import {GridContent, ProFormDependency, ProFormRadio, ProFormText} from '@ant-design/pro-components';
import { useRequest,useIntl } from '@umijs/max';
import {Avatar, Button, Card, Col, Divider, Input, InputRef, message, Row, Tag} from 'antd';
import React, { useRef, useState,useEffect } from 'react';
import useStyles from './Center.style';
import ProForm, {ProFormDigit} from "@ant-design/pro-form";
import { useModel } from 'umi';
import {queryCurrentUser, ReportLists, UpdateContact, WithdrawAdd, SettingsLists} from "@/services/api";
const Center: React.FC = () => {
  const { styles } = useStyles();
  const intl = useIntl();
  const formRef = useRef();

  const [data, setData] = useState(null); // 初始化为 null 或空对象
  const [TodayIncome, setTodayIncome] = useState(0); // 初始化为 null 或空对象
  const [inviteLink, setInviteLink] = useState(''); // 添加邀请链接状态

  useEffect(() => {
    // 模拟异步请求
    const fetchData = async () => {
      const response = await queryCurrentUser(); // 假设这是你的异步请求函数
      setData(response.data.info); // 请求成功后更新状态
      setTimeout(() => {
        formRef.current?.setFieldsValue({
          WhatsApp: response.data.info.Whatsapp,
          Telegram: response.data.info.Telegram,
        });
      }, 100);
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

    // 获取站点设置
    const fetchSettings = async () => {
      const response = await SettingsLists({});
      if(response.data?.app_promotion?.Value) {
        // 构建邀请链接
        const baseUrl = response.data.app_promotion.Value;
        setInviteLink(`${baseUrl}/#/pages/login/register?code=${data?.InvitationCode}`);
      }
    };

    fetchData(); // 在组件挂载时触发请求
    fetchReportLists();
    fetchSettings(); // 调用获取设置
  }, [data?.InvitationCode]); // 依赖邀请码变化
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

  // 复制邀请链接
  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
              {intl.formatMessage({id:"InvitationLink"})}：{inviteLink} <Button type="primary" onClick={handleCopyLink}>{intl.formatMessage({id:"copyInvitationLink"})}</Button>
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
                        <ProFormText
                          label={intl.formatMessage({id:"Phone"})}
                          name="Phone"
                          width="md"
                        />
                      );
                    }
                    if (WithdrawType === 'bank transfer') {
                      return (
                        <>
                        {/*  银行户名 */}
                        <ProFormText
                          label={intl.formatMessage({id:"BankName"})}
                          name="BankName"
                          width="md"
                        />
                        {/*  银行户名 */}
                        <ProFormText
                          label={intl.formatMessage({id:"BankAccount"})}
                          name="BankAccount"
                          width="md"
                        />
                        {/*  卡号 */}
                        <ProFormText
                          label={intl.formatMessage({id:"CardNumber"})}
                          name="CardNumber"
                          width="md"
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
                />
              </ProForm>
            </div>
          </Card>
        </Col>
        <Col lg={7} md={24}>
          <Card
            bordered={false}
            style={{
              marginBottom: 24,
            }}
          >
            <div>
              <div className={styles.avatarHolder}>
                <div className={styles.name}>{intl.formatMessage({id:"ContactInformation"})}</div>
                <div>{intl.formatMessage({id:"ContactInformationRemark"})}</div>
                <ProForm
                  formRef={formRef}
                  onFinish={async (values) => {
                    const res = await  UpdateContact(values)
                    if (Number(res.code) == 0) {
                      message.success(res.msg);
                    } else {
                      message.error(res.msg);
                    }
                  }}
                >
                  <ProFormText
                    label={intl.formatMessage({id:"WhastsApp"})}
                    name="WhatsApp"
                    width="md"
                  />
                  <ProFormText
                    label={intl.formatMessage({id:"Telegram"})}
                    name="Telegram"
                    width="md"
                  />
                </ProForm>

              </div>
            </div>

          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};
export default Center;
