import { extend } from 'umi-request';
import { notification } from 'antd';
import { getToken, removeToken } from './auth'
import { history } from 'umi';
// import { history } from 'umi';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**0
 * 异常处理程序
 */

const errorHandler = (error) => {
  console.log('errorHandler')
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
    if (response.status == 401 || response.status == 403) {
      removeToken()
      history.replace({
        pathname: '/user/login',
      });
    }
  } else if (!response) {
    // notification.error({
    //   description: '您的网络发生异常，无法连接服务器',
    //   message: '网络异常',
    // });
  }

  console.log('response', response)
  return response;
};
/**
 * 配置request请求时的默认参数
 */
const request = extend({

  errorHandler,
  // 默认错误处理
  crossOrigin: true, // 开启CORS跨域
  // requestType:"form",
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});
// 中间件，对请求前添加 userId token 的基础参数
request.interceptors.request.use((url, options) => {
  let token = getToken();
  if (token) {
    options.headers['admin-token'] = token
  }
  const newOptions = { ...options };
  return {
    url: url,
    options: { ...newOptions },
  };
});

export default request;

// import { extend } from 'umi-request';
// import {notification} from "antd"
// const request = extend({
//   errorHandler,
//   // prefix:process.env.NODE_ENV == 'development' ? '/api' : 'http://www.aiyu97.online', // 分环境api  prefix地址记得加上http://
//   // 默认错误处理
//   // requestType:"form",
//   credentials: 'include', // 默认请求是否带上cookie

// });
// /**
//  * 异常处理程序
//  */
// const errorHandler = (error:any) => {
//   const { response } = error;
//   // console.log("errorHandler")
//   // console.log(error)
//   if (response && response.status) {
//     let statusa = response.status
//     const errorText =  response.statusText;
//     const { status, url } = response;
//     notification.error({
//       message: `请求错误 ${status}: ${url}`,
//       description: errorText,
//     });
//   }

//   return response;
// };

// // request拦截器, 改变url 或 options.
// request.interceptors.request.use((url,options) =>  {
//       const headers = {
//       // 'Content-Type': 'multipart/form-data',
//       // 'Accept': 'application/json',
//     };
//       // console.log("options")
//       // console.log(options)
//       options.requestType = "form"
//       // console.log(url)
//     return (
//       {
//         url: url,
//         options: { ...options, headers: headers },
//       }
//     );
// })

// // response拦截器, 处理response
// request.interceptors.response.use((response, options) => {
//   // console.log("options")
//   // console.log(response.status)
//   if(response.status == 403) {
//     notification.error({
//       message: "登录过期,请重新登录",
//       // description: r.data,
//     });
//     return
//   }
//   if(response.status == 402) {
//     notification.error({
//       message: "链接过期,请返回重新获取",
//       // description: r.data,
//     });
//     return
//   }
//   //basic
//   // console.log(response.clone())
//   const data = response.clone().text()
//   // console.log(data)
//   data.then(text =>{
//     if(text.length == 0) {
//       return
//     }
//     // console.log(text)
//     try {
//       var r = JSON.parse(text)
//     }catch (e) {
//       // console.log(e)
//       return;
//     }
//     switch (r.code) {
//       case 99:
//         notification.error({
//           message: r.msg,
//           // description: r.data.toString(),
//           // description: r.data,
//         });
//         break
//     }
//   })



//   // response.text().then(d => {
//   //   console.log(d)
//   //   return d
//   // })

//   // let token = response.headers.get("x-auth-token");
//   // if (token) {
//   //   localStorage.setItem("x-auth-token", token);
//   // }
//   return response;
// });
