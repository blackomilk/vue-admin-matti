import request from "@/utils/request";

export function login(data) {
  return request({
    url: '/vue-element-matti/user/login',
    // url: "/token/", 本地调试接口
    method: "post",
    data
  });
}
export function dingLogin(code) {
  return request({
    url: "/dingLogin/",
    method: "post",
    params: {
      code
    }
  });
}

export function logout() {
  return request({
    url: '/vue-element-matti/user/logout',
    // url: "/logout", 本地调试接口
    method: "post"
  });
}

export function getInfo(token) {
  return request({
    url: '/vue-element-matti/user/info',
    // url: "/system/user/info/", 本地调试接口
    method: "get",
    params: { token }
  });
}
