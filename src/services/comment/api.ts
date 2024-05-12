import { request } from '@umijs/max';


/** 根据id获取评论 GET /api/comment */
export async function getById(id:string) {
  return request<{
    param: COMMENT.CommentItem;
  }>('/api/comment/get', {
    method: 'GET',
    params: {id}
  });
}

/** 评论列表 POST /api/comment/list */
export async function list(data:COMMENT.CommentItem) {
  return request<Record<string, any>>('/api/comment/list', {
    method: 'POST',
    data
  });
}

/** 评论列表 POST /api/comment/page */
export async function page(data:COMMENT.CommentItem) {
  return request<Record<string, any>>('/api/comment/page', {
    method: 'POST',
    data
  });
}

/** 删除评论 POST /api/comment/delete */
export async function deleteByIds(data:(number[] | string[])) {
  return request<Record<string, any>>('/api/comment/delete', {
    method: 'POST',
    data
  });
}
