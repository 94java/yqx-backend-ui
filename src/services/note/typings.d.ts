// @ts-ignore
/* eslint-disable */

declare namespace NOTE {
  type NoteItem = {
    id: string,
    coverImg?: string,
    title?: string,
    type?: string,
    content?: string,
    summary?: string,
    views?: number,
    likes?: number,
    status?: string,
    categoryId?: string,
    userId?: string,
    createBy?:string,
    createTime?: Date,
    updateBy?: string,
    updateTime?:Date
  }
  type NoteQuery = {
    id: string,
    title?: string,
    type?: string,
    content?: string,
    status?: string,
    categoryId?: string,
    userId?: string,
    createTime?: Date,
    updateTime?:Date
  }
  type NoteAdd = {
    coverImg?: string,
    title?: string,
    type?: string,
    content?: string,
    summary?: string,
    status?: string,
    categoryId?: string,
    userId?: string,
  }
  type NoteUpdate = {
    id: string,
    coverImg?: string,
    title?: string,
    type?: string,
    content?: string,
    summary?: string,
    status?: string,
    categoryId?: string,
  }
  type NoteStatusChange = {
    ids: string[] | number[],
    status: string
  }
}
