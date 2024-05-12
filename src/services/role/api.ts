import { request } from '@umijs/max';


/** 根据id获取角色 GET /api/role */
export async function getById(id:string) {
  return request<{
    param: ROLE.RoleItem;
  }>('/api/role/get', {
    method: 'GET',
    params: {id}
  });
}

/** 角色列表 POST /api/role/list */
export async function list(data:ROLE.RoleItem) {
  return request<Record<string, any>>('/api/role/list', {
    method: 'POST',
    data
  });
}

/** 角色列表 POST /api/role/page */
export async function page(data:ROLE.RoleItem) {
  return request<Record<string, any>>('/api/role/page', {
    method: 'POST',
    data
  });
}

/** 新增角色 POST /api/role/add */
export async function add(data:ROLE.RoleItem) {
  return request<Record<string, any>>('/api/role/add', {
    method: 'POST',
    data
  });
}

/** 编辑角色 POST /api/role/update */
export async function update(data:ROLE.RoleItem) {
  return request<Record<string, any>>('/api/role/update', {
    method: 'POST',
    data
  });
}

/** 删除角色 POST /api/role/delete */
export async function deleteByIds(data:(number[] | string[])) {
  return request<Record<string, any>>('/api/role/delete', {
    method: 'POST',
    data
  });
}
