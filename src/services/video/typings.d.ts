// @ts-ignore
/* eslint-disable */

declare namespace VIDEO {
  type VideoItem = {
    id?: string,
    coverImg?: string,
    title?: string,
    summary?: string,
    url?: string,
    views?: number,
    likes?: number,
    status?: string,
    type?: string,
    categoryId?: string,
    userId?: string,
    category?: {},
    user?: {},
    createBy?: string,
    createTime?: Date,
    updateBy?: string,
    updateTime?:Date
  }
  type VideoQuery = {
    id?: string,
    title?: string,
    status?: string,
    type?: string,
    categoryId?: string,
    userId?: string,
    createTime?: Date,
    updateTime?: Date,
    pageNum?: number,
    pageSize?:number
  }
  type VideoAdd = {
    coverImg?: string,
    title?: string,
    summary?: string,
    url?: string,
    type?: string,
    categoryId?: string,
  }
  type VideoUpdate = {
    id?: string,
    coverImg?: string,
    title?: string,
    summary?: string,
    url?: string,
    status?: string,
    type?: string,
    categoryId?: string,
  }
  type VideoStatusChange = {
    ids: string[] | number[],
    status: string
  }
}
