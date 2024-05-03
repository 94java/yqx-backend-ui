// @ts-ignore
/* eslint-disable */

declare namespace CATEGORY {
  type CategoryItem = {
    id?: string,
    name?: string,
    type?: string,
    status?: string,
    order?: number,
    createBy?: string,
    createTime?: Date,
    updateBy?: string,
    updateTime?:Date
  }
  type CategoryAdd = {
    name: string,
    type?: string,
    status?: string,
    order?:number
  }
  type CategoryUpdate = {
    id:string,
    name?: string,
    type?: string,
    status?: string,
    order?:number
  }
  type CategoryStatusChange = {
    ids: string[] | number[],
    status: string
  }
}
