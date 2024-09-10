// @ts-ignore
/* eslint-disable */

import { request } from '@umijs/max';
export async function queryCurrentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/proxy/currentUser', {
    method: 'POST',
    ...(options || {}),
  });
}
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
// DebtType
export async function TransactionDetailsType(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/transaction-details-type', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
// ChangePass
export async function ChangePass(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/change-pass', {
    method: 'POST',
    data: body,
    ...(options || {}),
  })
}

// CreateVirtualUser
export async function CreateVirtualUser(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/proxy/create-virtual-user', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

// UserAdjustment
export async function UserAdjustment(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/user-adjustment', {
    method: 'POST',
    data: body,
    ...(options || {}),
  })
}

// UserDelete 删除用户
export async function UserDelete(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/user-delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// DebtList
export async function TransactionDetailsLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/transaction-details-lists', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// BannerAdd
export async function BannerAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/banner-add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
// BannerDel
export async function BannerDel(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/banner-del', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
// BannerList
export async function BannerList(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/banner-list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}
// PaymentManagementLists 收款管理列表
export async function PaymentManagementLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/payment-management-lists', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// ArticleAdd 文章添加
export async function ArticleAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/article-add', {
    method: 'POST',
    data: body,
    requestType: 'json',
    ...(options || {}),
  });
}

// ArticleDelete 文章删除
export async function ArticleDelete(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/article-delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// ArticleLists 文章列表
export async function ArticleLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/article-lists', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// PaymentManagementAdd 收款管理添加
export async function PaymentManagementAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/payment-management-add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// RechargeNumberAdd 充值号码添加
export async function RechargeNumberAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/recharge-number-add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// RechargeNumberDelete 充值号码删除
export async function RechargeNumberDelete(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/recharge-number-delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// RechargeNumberLists 充值号码列表
export async function RechargeNumberLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/recharge-number-lists', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// PaymentManagementDelete 收款管理删除
export async function PaymentManagementDelete(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/payment-management-delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// ProductDelete 商品删除
export async function ProductDelete(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/product-delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// ProductLists 商品列表
export async function ProductLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/product-list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
      return Promise.resolve({
          data: response.data.Items,
          total: response.data.Pagination?.totalRecords,
          pageSize: response.data.Pagination?.limit,
          current: response.data.Pagination?.page,
          success: true,
      })
  });
}

// GoodsAdd
export async function GoodsAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/goods-add', {
    method: 'POST',
    requestType: 'json',
    data: body,
    ...(options || {}),
  });
}

// ProductAdd 商品添加
export async function ProductAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/product-add', {
    method: 'POST',
    requestType: 'json',
    data: body,
    ...(options || {}),
  });
}

// PeriodsAdd 期数添加
export async function PeriodsAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/periods-add', {
    method: 'POST',
    requestType: 'json',
    data: body,
    ...(options || {}),
  });
}
// WithdrawConfirm
export async function WithdrawConfirm(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/withdraw-confirm', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// MessageLists
export async function MessageLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/message-lists', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// OTPConfig 二次验证配置
export async function OTPConfig(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/otp-config', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve(response)
  })
}

// GoogleBind 谷歌绑定
export async function GoogleBind(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/google-auth-bind', {
    method: 'POST',
    data: body,
    ...(options || {}),
  })
}

// MessageDelete 消息删除
export async function MessageDelete(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/message-delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// WithdrawList
export async function WithdrawList(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/withdraw-list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

//SettingUpdate
export async function SettingUpdate(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/setting-update', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

//SettingsLists
export async function SettingsLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/settings-lists', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve(response)
  });
}
// Upload
export async function UploadApi(body: API.LoginParams, options?: { [key: string]: any }) {
  if(options === undefined) {
    options = {}
  }
  options["headers"] = {
    'Content-Type': 'multipart/form-data'
  }
  console.log("body", body)
  return request<API.LoginResult>('/api/proxy/upload', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve(response.data)
  });
}
// AdminDelete
export async function AdminDelete(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/admin-delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
// AdminAdd
export async function AdminAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/admin-add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
//GoodsDel
export async function GoodsDel(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/goods-del', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
// MonetaryFunctionDel
export async function MonetaryFunctionDel(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/monetary-function-del', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
// MonetaryFunctionAdd
export async function MonetaryFunctionAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/monetary-function-add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// OrderDel
export async function OrderDel(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/proxy/order-delete', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

// OrderCancel 取消订单
export async function OrderCancel(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/order-cancel', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// NoticeDel
export async function NoticeDel(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/notice-del', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// GenToken
export async function GenToken(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/proxy/gen-token', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

// LoginKeyAdd 添加登录密钥
export async function LoginKeyAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/login-key-add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}


// StatusChange
export async function StatusChange(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/proxy/order-status-update', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

// ReleaseFunds
export async function ReleaseFunds(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/proxy/release-funds', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

// SendNotice
export async function SendNotice(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/send-notice', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// NoticeList
export async function NoticeList(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/notice-list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// ShopTrainList
export async function ShopTrainList(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/shop-train-list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}
// ShopTrainAdd
export async function ShopTrainAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/shop-train-add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
// ShopTrainDel
export async function ShopTrainDel(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/shop-train-del', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// CustomerAdd
export async function CustomerAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/customer-add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// CustomerDel
export async function CustomerDel(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/customer-del', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// CustomerList
export async function CustomerList(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/customer-list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// LeaveDel
export async function LeaveDel(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/leave-del', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}


// DelOrderRecord
export async function DelOrderRecord(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/del-order-record', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// BurstOrderAdd
export async function BurstOrderAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/burst-order-add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function AddTaskCount(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/add-task-count', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// ProxyLock
export async function ProxyLock(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/proxy-lock', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// BurstOrderDel
export async function BurstOrderDel(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/burst-order-del', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}


// TaskOrderList
export async function TaskOrderList(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/task-order-list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
      return Promise.resolve({
          data: response.data.Items,
          total: response.data.Pagination?.totalRecords,
          pageSize: response.data.Pagination?.limit,
          current: response.data.Pagination?.page,
          success: true,
      })
  });
}


// BurstOrderList
export async function BurstOrderList(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/burst-order-list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}



// LeaveAdd
export async function LeaveAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/leave-add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// LeaveList
export async function LeaveList(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/leave-list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve(response)
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// ShopLevelList
export async function ShopLevelList(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/shop-level-list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// LevelLists 会员等级列表
export async function LevelLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/level-lists', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// PrizeDrawRecordLists 中奖记录
export async function PrizeDrawRecordLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/prize-draw-record-lists', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}


// LevelAdd 会员等级添加
export async function LevelAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/level-add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// LevelDelete 会员等级删除
export async function LevelDelete(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/level-delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// ShopLevelAdd
export async function ShopLevelAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/shop-level-add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// ShopLevelDel
export async function ShopLevelDel(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/shop-level-del', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}


// MonetaryFunctionList
export async function MonetaryFunctionList(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/monetary-function-list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// WorkOrderStatus
export async function WorkOrderStatus(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/work-order-status', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// WorkOrderDel
export async function WorkOrderDel(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/work-order-del', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// DialogueReply
export async function DialogueReply(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/proxy/dialogue-reply', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

// DialogueDel
export async function DialogueDel(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/proxy/dialogue-del', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

// WorkOrderReply
export async function WorkOrderReply(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/work-order-reply', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// WorkOrderList
export async function WorkOrderList(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/work-order-list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// LogisticsDel
export async function LogisticsDel(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/proxy/logistics-del', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

// LogisticsAdd
export async function LogisticsAdd(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/proxy/logistics-add', {
        method: 'POST',
        requestType:"json",
        data: body,
        ...(options || {}),
    });
}

// ResetOrderRecord
export async function ResetOrderRecord(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/reset-order-record', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function OrderProgress(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/order-progress', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}
// LogisticsList
export async function LogisticsList(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/proxy/logistics-list', {
        method: 'POST',
        data: body,
        ...(options || {}),
    }).then(response => {
      return Promise.resolve({
        data: response.data.Items,
        total: response.data.Pagination?.totalRecords,
        pageSize: response.data.Pagination?.limit,
        current: response.data.Pagination?.page,
        success: true,
      })
    });
}

// CronList
export async function CronList(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/proxy/cron-list', {
        method: 'POST',
        data: body,
        ...(options || {}),
    }).then(response => {
      return Promise.resolve({
        data: response.data.Items,
        total: response.data.Pagination?.totalRecords,
        pageSize: response.data.Pagination?.limit,
        current: response.data.Pagination?.page,
        success: true,
      })
    });
}

// ShippingAddressList
export async function ShippingAddressList(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/proxy/shipping-address-list', {
        method: 'POST',
        data: body,
        ...(options || {}),
    }).then(response => {
      return Promise.resolve({
        data: response.data.Items,
        total: response.data.Pagination?.totalRecords,
        pageSize: response.data.Pagination?.limit,
        current: response.data.Pagination?.page,
        success: true,
      })
    });
}

// GoogleLog 二次验证日志
export async function GoogleLog(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/proxy/google-log', {
        method: 'POST',
        data: body,
        ...(options || {}),
    }).then(response => {
      return Promise.resolve(response)
    });
}

// ShippingAddressList
export async function VirtualShippingAddressList(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/virtual-shipping-address-list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
      return Promise.resolve({
          data: response.data.Items,
          total: response.data.Pagination?.totalRecords,
          pageSize: response.data.Pagination?.limit,
          current: response.data.Pagination?.page,
          success: true,
      })
  });
}

// ShippingAddressDelete 删除收货地址
export async function ShippingAddressDelete(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/shipping-address-del', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// ShippingAddressAdd 添加收货地址
export async function ShippingAddressAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/shipping-address-add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// DesignatedDrawAdd
export function DesignatedDrawAdd (data) {
  return request("/api/proxy/DesignatedDraw-add", {
    data: data,
    requestType: 'form',
    method: 'POST'
  });
}

// PrizeDrawLists
export function PrizeDrawLists (data) {
  return request("/api/proxy/PrizeDraw-lists", {
    data: data,
    requestType: 'form',
    method: 'POST'
  });
}
// PrizeDrawDel
export function PrizeDrawDel (data) {
  return request("/api/proxy/PrizeDraw-del", {
    data: data,
    requestType: 'form',
    method: 'POST'
  });
}

// PrizeDrawAdd
export function PrizeDrawAdd (data) {
  return request("/api/proxy/PrizeDraw-add", {
    data: data,
    requestType: 'form',
    method: 'POST'
  });
}

// ShippingAddressAdd
export async function VirtualShippingAddressAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/virtual-shipping-address-add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// ShippingAddressDel
export async function VirtualShippingAddressDel(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/virtual-shipping-address-del', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// DeliveryAddressList
export async function DeliveryAddressList(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/DeliveryAddress-list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}
// DeliveryAddressAdd
export async function DeliveryAddressAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/DeliveryAddress-add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
// DeliveryAddressDel
export async function DeliveryAddressDel(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/DeliveryAddress-del', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
// GoodsLists
export async function GoodsLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/goods-lists', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// ProductSpecificationsLists
export async function ProductSpecificationsLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/product-specifications-list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// IndustryLists 行业列表
export async function IndustryLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/industry-list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// MerchantApplicationAdd 商户申请添加
export async function MerchantApplicationAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/merchant-application-add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// MerchantApplicationLists 商户申请列表
export async function MerchantApplicationLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/merchant-application-lists', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// MerchantApplicationDelete 商户申请删除
export async function MerchantApplicationDelete(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/merchant-application-delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// IndustryAdd 行业添加
export async function IndustryAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/industry-add', {
    method: 'POST',
    data: body,
    requestType: 'json',
    ...(options || {}),
  });
}
// IndustryDelete 行业删除
export async function IndustryDelete(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/industry-delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// ProductParametersLists
export async function ProductParametersLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/product-parameters-list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// ProductParametersAdd
export async function ProductParametersAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/product-parameters-add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// ProductSpecificationsAdd
export async function ProductSpecificationsAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/product-specifications-add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// ProductParametersDelete
export async function ProductParametersDelete(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/product-parameters-delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// ProductSpecificationsDelete
export async function ProductSpecificationsDelete(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/product-specifications-delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
// ProductBrandLists
export async function ProductBrandLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/product-brand-list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}
// ProductBrandAdd
export async function ProductBrandAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/product-brand-add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
// ProductBrandDelete
export async function ProductBrandDelete(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/product-brand-delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

//CategoryList
export async function ProductCategoryLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/product-category-list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}
// CategoryAdd
export async function ProductCategoryAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/product-category-add', {
    method: 'POST',
    requestType: 'json',
    data: body,
    ...(options || {}),
  });
}
// CategoryDel
export async function ProductCategoryDelete(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/product-category-delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
// AdminList
export async function AdminList(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/admin-list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// PayRecordConfirm
export async function PayRecordConfirm(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/pay-record-confirm', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// PayRecordList
export async function PayRecordList(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/pay-record-list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// ShopUpdate
export async function ShopUpdate(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/shop-update', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
// ShopList
export async function ShopList(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/proxy/shop-list', {
        method: 'POST',
        data: body,
        ...(options || {}),
    }).then(response => {
        return Promise.resolve({
        data: response.data.Items,
        total: response.data.Pagination?.totalRecords,
        pageSize: response.data.Pagination?.limit,
        current: response.data.Pagination?.page,
        success: true,
        })
    });
}
// Timer
export async function Timer(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/proxy/timer', {
        method: 'POST',
        data: body,
        ...(options || {}),
    }).then(response => {
        return Promise.resolve(response)
    });
}
// UserAdd
export async function UserAdd(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/proxy/user-add', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}


// OrderAdd
export async function OrderAdd(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/proxy/order-add', {
        method: 'POST',
        requestType: 'json',
        data: body,
        ...(options || {}),
    })
}

// DialogueAdd
export async function DialogueAdd(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/proxy/dialogue-add', {
        method: 'POST',
        data: body,
        ...(options || {}),
    })
}

// DialogueList
export async function DialogueList(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/proxy/dialogue-list', {
        method: 'POST',
        data: body,
        ...(options || {}),
    }).then(response => {
        return Promise.resolve({
        data: response.data.Items,
        total: response.data.Pagination?.totalRecords,
        pageSize: response.data.Pagination?.limit,
        current: response.data.Pagination?.page,
        success: true,
        })
    });
}

// ProductList
export async function ProductList(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/proxy/product-list', {
        method: 'POST',
        data: body,
        ...(options || {}),
    }).then(response => {
      return Promise.resolve({
        data: response.data.Items,
        total: response.data.Pagination?.totalRecords,
        pageSize: response.data.Pagination?.limit,
        current: response.data.Pagination?.page,
        success: true,
      })
    });
}

// BusinessProductLists
export async function BusinessProductLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/business-product-list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// OrderList
export async function OrderLists(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/proxy/order-lists', {
        method: 'POST',
        data: body,
        ...(options || {}),
    }).then(response => {
      return Promise.resolve({
        data: response.data.Items,
        total: response.data.Pagination?.totalRecords,
        pageSize: response.data.Pagination?.limit,
        current: response.data.Pagination?.page,
        success: true,
      })
    });
}

// FlightOrderLists 航班订单列表
export async function FlightOrderLists(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/proxy/flight-order-lists', {
        method: 'POST',
        data: body,
        ...(options || {}),
    }).then(response => {
      return Promise.resolve({
        data: response.data.Items,
        total: response.data.Pagination?.totalRecords,
        pageSize: response.data.Pagination?.limit,
        current: response.data.Pagination?.page,
        success: true,
      })
    });
}

// ReportLists 报表列表
export async function ReportLists(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/proxy/report-lists', {
        method: 'POST',
        data: body,
        ...(options || {}),
    }).then(response => {
      return Promise.resolve({
        data: response.data.Items,
        total: response.data.Pagination?.totalRecords,
        pageSize: response.data.Pagination?.limit,
        current: response.data.Pagination?.page,
        success: true,
      })
    });
}

// ReportDay 报表列表
export async function ReportDay(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/report-day', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// RebateOperation 返利操作
export async function RebateOperation(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/proxy/rebate-operation', {
        method: 'POST',
        requestType:"json",
        data: body,
        ...(options || {}),
    });
}


// PlanOrderLists 计划订单列表
export async function PlanOrderLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/plan-order-lists', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// SiteOverview 站点概况
export async function SiteOverview(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/site-overview', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve(response)
  });
}

// PlanOrderDelete 计划订单删除
export async function PlanOrderDelete(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/plan-order-delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function UserLists(body: API.RoomList, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/user-lists', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// LotteryLists 抽奖列表
export async function LotteryLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/lottery-lists', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// OddsSettingAdd 赔率设置添加
export async function OddsSettingAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/odds-setting-add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// DrawHistoryLists 抽奖历史列表
export async function DrawHistoryLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/draw-history-lists', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// AutoBetDelete 自动投注删除
export async function AutoBetDelete(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/auto-bet-delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// AutoBetAdd 自动投注添加
export async function AutoBetAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/auto-bet-add', {
    method: 'POST',
    data: body,
    requestType: 'json',
    ...(options || {}),
  });
}

// AutoBetLists 自动投注列表
export async function AutoBetLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/auto-bet-lists', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// DrawHistoryAdd 抽奖历史添加
export async function DrawHistoryAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/draw-history-add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// DrawHistoryDelete 抽奖历史删除
export async function DrawHistoryDelete(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/draw-history-delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// MessageSettingLists 消息设置列表
export async function MessageSettingLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/message-setting-lists', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// MessageSettingAdd 消息设置添加
export async function MessageSettingAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/message-setting-add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// OddsSettingLists 赔率设置列表
export async function OddsSettingLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/odds-setting-lists', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// LotteryAdd 抽奖添加
export async function LotteryAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/lottery-add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}


// BankLists 银行列表
export async function BankLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/bank-list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}


// PeriodsLists 期数列表
export async function PeriodsLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/periods-lists', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// ParticipationLists 参与列表
export async function ParticipationLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/participation-lists', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// PeriodsDelete 期数删除
export async function PeriodsDelete(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/periods-delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
// ParticipationWin 参与中奖
export async function ParticipationWin(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/participation-win', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// BankDelete 银行删除
export async function BankDelete(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/bank-delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// BankAdd 银行添加
export async function BankAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/bank-add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// CronList 定时任务列表
export async function CronLists(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/cron-list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  }).then(response => {
    return Promise.resolve({
      data: response.data.Items,
      total: response.data.Pagination?.totalRecords,
      pageSize: response.data.Pagination?.limit,
      current: response.data.Pagination?.page,
      success: true,
    })
  });
}

// userUpdate
export async function userUpdate(params) {
  return request<API.LoginResult>('/api/proxy/user-update', {
    method: 'POST',
    data: params,
  });
}

// WithdrawAdd 提现添加
export async function WithdrawAdd(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/proxy/withdraw-add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// PorxyAdd
export async function PorxyAdd(params) {
  return request<API.LoginResult>('/api/proxy/user-add', {
    method: 'POST',
    data: params,
  });
}
