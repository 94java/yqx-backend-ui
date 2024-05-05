// @ts-ignore
/* eslint-disable */

declare namespace SUBJECT {
  type SubjectItem = {
    id?: string,
    content?: string,
    contentImg?: string,
    type?: string,
    difficulty?: string,
    analysis?: string,
    bankId?:string,
    status?: string,
    createBy?: string,
    createTime?: Date,
    updateBy?: string,
    updateTime?:Date
  }
  type SubjectQuery = {
    id?: string,
    content?: string,
    type?: string,
    difficulty?: string,
    bankId?:string,
    status?: string,
    createBy?: string,
    createTime?: Date,
  }
  type SubjectAdd = {
    content?: string,
    contentImg?: string,
    type?: string,
    difficulty?: string,
    analysis?: string,
    bankId?:string,
    status?: string,
  }
  type SubjectUpdate = {
    id?: string,
    content?: string,
    contentImg?: string,
    type?: string,
    difficulty?: string,
    analysis?: string,
    bankId?:string,
    status?: string,
  }
  type SubjectStatusChange = {
    ids: string[] | number[],
    status: string
  }
}
