import { outLogin } from '@/services/ant-design-pro/api';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { history, useModel,useIntl } from '@umijs/max';
import { Spin,message } from 'antd';
import type { MenuProps } from 'antd';
import { createStyles } from 'antd-style';
import { stringify } from 'querystring';
import React, { useCallback,useState } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';
import {removeToken} from "@/utils/auth";
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import {ChangePass} from "@/services/api";

export type GlobalHeaderRightProps = {
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return <span className="anticon">{currentUser?.name}</span>;
};

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
  };
});

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu, children }) => {
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const intl = useIntl();
  const loginOut = async () => {
    await outLogin();
    const { search, pathname } = window.location;


    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };
  const { styles } = useStyles();

  const { initialState, setInitialState } = useModel('@@initialState');
  const submitEdit = (values) => {
    // let form = new FormData()
    // form.append('old_password', values.oldPassword)
    // form.append('new_password', values.newPassword)
    // form.append('new_password2', values.newPassword2)

    ChangePass(values).then(res => {
      if (res.code === 0) {
        message.success(intl.formatMessage({ id: 'ChangePasswordSuccess' }))
        setUpdateModalVisible(false)
      } else {
        message.error(res.msg)
      }
    })
  }
  const onMenuClick: MenuProps['onClick'] = (event) => {
    const { key } = event;
    if (key === 'logout') {
      removeToken();
      history.push('/user/login');
      // flushSync(() => {
      //   setInitialState((s) => ({ ...s, currentUser: undefined }));
      // });
      return;
    }  else if(key === 'password') {
      setUpdateModalVisible(true)
    }
    // history.push(`/account/${key}`);
  };

  const loading = (
    <span className={styles.action}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return loading;
  }

  const menuItems = [
    ...([
      // {
      //   key: 'center',
      //   icon: <UserOutlined />,
      //   label: '个人中心',
      // },
      // {
      //   key: 'settings',
      //   icon: <SettingOutlined />,
      //   label: '个人设置',
      // },
      {
        key: 'password',
        icon: <SettingOutlined />,
        label: intl.formatMessage({ id: 'ChangePassword' }),
      },
      {
        type: 'divider' as const,
      },
    ]),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: intl.formatMessage({ id: 'menu.account.logout' }),
    },
  ];


  return (
    <>
      <HeaderDropdown
        menu={{
          selectedKeys: [],
          onClick: onMenuClick,
          items: menuItems,
        }}
      >
        {children}
      </HeaderDropdown>


      <ModalForm
        title={intl.formatMessage({ id: 'ChangePassword' })}
        width="400px"
        visible={updateModalVisible}
        modalProps={{
          destroyOnClose: true,
        }}
        onVisibleChange={setUpdateModalVisible}
        onFinish={submitEdit}
      >
        <ProFormText.Password
          label={intl.formatMessage({ id: 'OldPassword' })}
          rules={[
            {
              required: true,
            },
          ]}
          width="md"
          name="OldPassword"
        />
        <ProFormText.Password
          label={intl.formatMessage({ id: 'NewPassword' })}
          rules={[
            {
              required: true,
            },
          ]}
          width="md"
          name="Password"
        />
        <ProFormText.Password
          label={intl.formatMessage({ id: 'ConfirmPassword' })}
          rules={[
            {
              required: true,
            },
          ]}
          width="md"
          name="PasswordConfirm"
        />
      </ModalForm>
    </>

  );
};
