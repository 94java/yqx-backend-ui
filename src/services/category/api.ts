import { request } from '@umijs/max';


/** 根据id获取分类 GET /api/currentUser */
export async function getById(id:string) {
  return request<{
    param: CATEGORY.CategoryItem;
  }>('/api/category/get', {
    method: 'GET',
    params: {id}
  });
}

/** 分类列表 POST /api/user/list */
export async function list(data:CATEGORY.CategoryItem) {
  return request<Record<string, any>>('/api/category/list', {
    method: 'POST',
    data
  });
}

/** 分类列表 POST /api/user/page */
export async function page(data:CATEGORY.CategoryItem) {
  return request<Record<string, any>>('/api/category/page', {
    method: 'POST',
    data
  });
}

/** 新增分类 POST /api/user/add */
export async function add(data:CATEGORY.CategoryAdd) {
  return request<Record<string, any>>('/api/category/add', {
    method: 'POST',
    data
  });
}

/** 编辑分类 POST /api/user/update */
export async function update(data:CATEGORY.CategoryUpdate) {
  return request<Record<string, any>>('/api/category/update', {
    method: 'POST',
    data
  });
}

/** 批量修改分类状态 POST /api/user/changeStatus */
export async function changeStatus(data:CATEGORY.CategoryStatusChange) {
  return request<Record<string, any>>('/api/category/changeStatus', {
    method: 'POST',
    data
  });
}

/** 删除分类 POST /api/user/delete */
export async function deleteByIds(data:(number[] | string[])) {
  return request<Record<string, any>>('/api/category/delete', {
    method: 'POST',
    data
  });
}
