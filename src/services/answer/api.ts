import { request } from '@umijs/max';


/** 根据id获取题目选项 GET /api/currentUser */
export async function getById(id:string) {
  return request<{
    param: ANSWER.AnswerItem;
  }>('/api/answer/get', {
    method: 'GET',
    params: {id}
  });
}

/** 题目选项列表 POST /api/answer/list */
export async function list(data:ANSWER.AnswerItem) {
  return request<Record<string, any>>('/api/answer/list', {
    method: 'POST',
    data
  });
}

/** 题目选项列表 POST /api/answer/page */
export async function page(data:ANSWER.AnswerItem) {
  return request<Record<string, any>>('/api/answer/page', {
    method: 'POST',
    data
  });
}

/** 新增题目选项 POST /api/answer/add */
export async function add(data:ANSWER.AnswerItem) {
  return request<Record<string, any>>('/api/answer/add', {
    method: 'POST',
    data
  });
}

/** 编辑题目选项 POST /api/answer/update */
export async function update(data:ANSWER.AnswerItem) {
  return request<Record<string, any>>('/api/answer/update', {
    method: 'POST',
    data
  });
}

/** 批量修改题目选项状态 POST /api/answer/changeStatus */
export async function changeStatus(data:ANSWER.AnswerItem) {
  return request<Record<string, any>>('/api/answer/changeStatus', {
    method: 'POST',
    data
  });
}

/** 删除题目选项 POST /api/answer/delete */
export async function deleteByIds(data:(number[] | string[])) {
  return request<Record<string, any>>('/api/answer/delete', {
    method: 'POST',
    data
  });
}
