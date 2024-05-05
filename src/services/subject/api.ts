import { request } from '@umijs/max';


/** 根据id获取题目 GET /api/subject/get */
export async function getById(id:string) {
  return request<{
    param: SUBJECT.SubjectQuery;
  }>('/api/subject/get', {
    method: 'GET',
    params: {id}
  });
}

/** 题目列表 POST /api/subject/list */
export async function list(data:SUBJECT.SubjectQuery) {
  return request<Record<string, any>>('/api/subject/list', {
    method: 'POST',
    data
  });
}

/** 题目列表 POST /api/subject/page */
export async function page(data:SUBJECT.SubjectQuery) {
  return request<Record<string, any>>('/api/subject/page', {
    method: 'POST',
    data
  });
}

/** 新增题目 POST /api/subject/add */
export async function add(data:SUBJECT.SubjectAdd) {
  return request<Record<string, any>>('/api/subject/add', {
    method: 'POST',
    data
  });
}

/** 编辑题目 POST /api/subject/update */
export async function update(data:SUBJECT.SubjectUpdate) {
  return request<Record<string, any>>('/api/subject/update', {
    method: 'POST',
    data
  });
}

/** 批量修改题目状态 POST /api/subject/changeStatus */
export async function changeStatus(data:SUBJECT.SubjectStatusChange) {
  return request<Record<string, any>>('/api/subject/changeStatus', {
    method: 'POST',
    data
  });
}

/** 删除题目 POST /api/subject/delete */
export async function deleteByIds(data:(number[] | string[])) {
  return request<Record<string, any>>('/api/subject/delete', {
    method: 'POST',
    data
  });
}
