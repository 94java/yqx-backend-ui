import { request } from '@umijs/max';


/** 根据id获取动态 GET /api/popular */
export async function getById(id:string) {
  return request<{
    param: POPULAR.PopularItem;
  }>('/api/popular/get', {
    method: 'GET',
    params: {id}
  });
}

/** 动态列表 POST /api/popular/list */
export async function list(data:POPULAR.PopularItem) {
  return request<Record<string, any>>('/api/popular/list', {
    method: 'POST',
    data
  });
}

/** 动态列表 POST /api/popular/page */
export async function page(data:POPULAR.PopularItem) {
  return request<Record<string, any>>('/api/popular/page', {
    method: 'POST',
    data
  });
}

/** 删除动态 POST /api/popular/delete */
export async function deleteByIds(data:(number[] | string[])) {
  return request<Record<string, any>>('/api/popular/delete', {
    method: 'POST',
    data
  });
}
