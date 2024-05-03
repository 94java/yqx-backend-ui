import { request } from '@umijs/max';


/** 根据id获取视频 GET /api/get */
export async function getById(id:string) {
  return request<{
    param: VIDEO.VideoQuery;
  }>('/api/video/get', {
    method: 'GET',
    params: {id}
  });
}

/** 视频列表 POST /api/video/list */
export async function list(data:VIDEO.VideoQuery) {
  return request<Record<string, any>>('/api/video/list', {
    method: 'POST',
    data
  });
}

/** 视频列表 POST /api/video/page */
export async function page(data:VIDEO.VideoQuery) {
  return request<Record<string, any>>('/api/video/page', {
    method: 'POST',
    data
  });
}

/** 新增视频 POST /api/video/add */
export async function add(data:VIDEO.VideoAdd) {
  return request<Record<string, any>>('/api/video/add', {
    method: 'POST',
    data
  });
}

/** 编辑视频 POST /api/video/update */
export async function update(data:VIDEO.VideoUpdate) {
  return request<Record<string, any>>('/api/video/update', {
    method: 'POST',
    data
  });
}

/** 批量修改视频状态 POST /api/video/changeStatus */
export async function changeStatus(data:VIDEO.VideoStatusChange) {
  return request<Record<string, any>>('/api/video/changeStatus', {
    method: 'POST',
    data
  });
}

/** 删除视频 POST /api/video/delete */
export async function deleteByIds(data:(number[] | string[])) {
  return request<Record<string, any>>('/api/video/delete', {
    method: 'POST',
    data
  });
}
