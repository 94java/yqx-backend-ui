import { request } from '@umijs/max';


/** 根据id获取题库 GET /api/currentUser */
export async function getById(id:string) {
  return request<{
    param: QUESTIONBANK.QuestionBankItem;
  }>('/api/questionBank/get', {
    method: 'GET',
    params: {id}
  });
}

/** 题库列表 POST /api/questionBank/list */
export async function list(data:QUESTIONBANK.QuestionBankQuery) {
  return request<Record<string, any>>('/api/questionBank/list', {
    method: 'POST',
    data
  });
}

/** 题库列表 POST /api/questionBank/page */
export async function page(data:QUESTIONBANK.QuestionBankQuery) {
  return request<Record<string, any>>('/api/questionBank/page', {
    method: 'POST',
    data
  });
}

/** 新增题库 POST /api/questionBank/add */
export async function add(data:QUESTIONBANK.QuestionBankAdd) {
  return request<Record<string, any>>('/api/questionBank/add', {
    method: 'POST',
    data
  });
}

/** 编辑题库 POST /api/questionBank/update */
export async function update(data:QUESTIONBANK.QuestionBankUpdate) {
  return request<Record<string, any>>('/api/questionBank/update', {
    method: 'POST',
    data
  });
}

/** 批量修改题库状态 POST /api/questionBank/changeStatus */
export async function changeStatus(data:QUESTIONBANK.QuestionBankStatusChange) {
  return request<Record<string, any>>('/api/questionBank/changeStatus', {
    method: 'POST',
    data
  });
}

/** 删除题库 POST /api/questionBank/delete */
export async function deleteByIds(data:(number[] | string[])) {
  return request<Record<string, any>>('/api/questionBank/delete', {
    method: 'POST',
    data
  });
}
