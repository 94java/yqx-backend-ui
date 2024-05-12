// @ts-ignore
/* eslint-disable */

declare namespace COMMENT {
  type CommentItem = {
    id?: string,
    uid?: string,
    content?: string,
    parentId?: string,
    type?: string,
    contentId?: string,
    createTime?: Date,
    pageNum?: number,
    pageSize?:number
  }
  type CommentStatusChange = {
    ids: string[] | number[],
    status: string
  }
}
