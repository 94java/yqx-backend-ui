import { request } from '@umijs/max';


/** 根据id获取笔记 GET /api/note/get */
export async function getById(id:string) {
  return request<{
    param: NOTE.NoteItem;
  }>('/api/note/get', {
    method: 'GET',
    params: {id}
  });
}


/** 笔记列表 POST /api/note/page */
export async function page(data:NOTE.NoteQuery) {
  return request<Record<string, any>>('/api/note/page', {
    method: 'POST',
    data
  });
}

/** 新增笔记 POST /api/note/add */
export async function add(data:NOTE.NoteAdd) {
  return request<Record<string, any>>('/api/note/add', {
    method: 'POST',
    data
  });
}

/** 编辑笔记 POST /api/note/update */
export async function update(data:NOTE.NoteUpdate) {
  return request<Record<string, any>>('/api/note/update', {
    method: 'POST',
    data
  });
}

/** 批量修改笔记状态 POST /api/note/changeStatus */
export async function changeStatus(data:NOTE.NoteStatusChange) {
  return request<Record<string, any>>('/api/note/changeStatus', {
    method: 'POST',
    data
  });
}

/** 删除笔记 POST /api/note/delete */
export async function deleteByIds(data:(number[] | string[])) {
  return request<Record<string, any>>('/api/note/delete', {
    method: 'POST',
    data
  });
}
