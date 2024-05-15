import { request } from '@umijs/max';


/** 根据id获取公告 GET /api/notice */
export async function getById(id:string) {
  return request<{
    param: NOTICE.NoticeItem;
  }>('/api/notice/get', {
    method: 'GET',
    params: {id}
  });
}

/** 公告列表 POST /api/notice/list */
export async function list(data:NOTICE.NoticeItem) {
  return request<Record<string, any>>('/api/notice/list', {
    method: 'POST',
    data
  });
}

/** 公告列表 POST /api/notice/page */
export async function page(data:NOTICE.NoticeItem) {
  return request<Record<string, any>>('/api/notice/page', {
    method: 'POST',
    data
  });
}

/** 新增公告 POST /api/notice/add */
export async function add(data:NOTICE.NoticeItem) {
  return request<Record<string, any>>('/api/notice/add', {
    method: 'POST',
    data
  });
}

/** 编辑公告 POST /api/notice/update */
export async function update(data:NOTICE.NoticeItem) {
  return request<Record<string, any>>('/api/notice/update', {
    method: 'POST',
    data
  });
}

/** 删除公告 POST /api/notice/delete */
export async function deleteByIds(data:(number[] | string[])) {
  return request<Record<string, any>>('/api/notice/delete', {
    method: 'POST',
    data
  });
}
