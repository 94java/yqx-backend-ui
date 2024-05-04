// @ts-ignore
/* eslint-disable */

declare namespace QUESTIONBANK {
  type QuestionBankItem = {
    id?: string,
    name?: string,
    summary?: string,
    coverImg?: string,
    views?: number,
    difficulty?: string,
    categoryId?: string,
    category:{},
    status?: string,
    createBy?: string,
    createTime?: Date,
    updateBy?: string,
    updateTime?:Date
  }
  type QuestionBankQuery = {
    id?: string,
    name?: string,
    difficulty?: string,
    categoryId?: string,
    status?: string,
    createBy?: string,
    createTime?: Date,
    updateTime?:Date
  }
  type QuestionBankAdd = {
    name?: string,
    summary?: string,
    coverImg?: string,
    difficulty?: string,
    categoryId?: string,
    status?: string,
  }
  type QuestionBankUpdate = {
    id?: string,
    name?: string,
    summary?: string,
    coverImg?: string,
    difficulty?: string,
    categoryId?: string,
    status?: string,
  }
  type QuestionBankStatusChange = {
    ids: string[] | number[],
    status: string
  }
}
