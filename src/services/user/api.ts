import { request } from '@umijs/max';

/** 登录接口 POST /api/login/account */
export async function login(body: USER.LoginParams, options?: { [key: string]: any }) {
  return request<USER.LoginResult>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 邮箱快捷登录 POST /api/login/account */
export async function loginByEmail(body: USER.LoginParams, options?: { [key: string]: any }) {
  return request<USER.LoginResult>('/api/user/loginByEmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: USER.CurrentUser;
  }>('/api/user/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取当前用户的统计数据 GET /api/getStatistics */
export async function getStatistics(options?: { [key: string]: any }) {
  return request<{
    data: USER.CurrentUser;
  }>('/api/user/getStatistics', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 发送邮箱验证码 POST /api/getStatistics */
export async function sendEmailCode(data?: { [key: string]: any }) {
  return request<{
    data: USER.CurrentUser;
  }>('/api/user/sendEmailCode', {
    method: 'POST',
    params:data
  });
}

/** 根据id获取用户 GET /api/currentUser */
export async function getById(id) {
  return request<{
    param: USER.CurrentUser;
  }>('/api/user/get', {
    method: 'GET',
    params: id
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function logout(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}


/** 用户列表 POST /api/user/list */
export async function page(data:any) {
  return request<Record<string, any>>('/api/user/page', {
    method: 'POST',
    data
  });
}

/** 新增用户 POST /api/user/add */
export async function add(data:any) {
  return request<Record<string, any>>('/api/user/add', {
    method: 'POST',
    data
  });
}

/** 编辑用户 POST /api/user/update */
export async function update(data:any) {
  return request<Record<string, any>>('/api/user/update', {
    method: 'POST',
    data
  });
}

/** 批量修改用户状态 POST /api/user/changeStatus */
export async function changeStatus(data:any) {
  return request<Record<string, any>>('/api/user/changeStatus', {
    method: 'POST',
    data
  });
}

/** 删除用户 POST /api/user/delete */
export async function deleteByIds(data:any) {
  return request<Record<string, any>>('/api/user/delete', {
    method: 'POST',
    data
  });
}
