// @ts-ignore
/* eslint-disable */

declare namespace USER {
  type LoginParams = {
    username: string;
    password: string;
    autoLogin?: boolean;
    type?: string;
  };
  type LoginResult = {
    code?: number;
    data?: any;
    message?: string;
  };
  type CurrentUser = {
    id?:string,
    username?: string;
    nickname?: string;
    age?: number;
    sex?: string;
    avatar?: string;
    sign?: string;
    role?: string;
    province?: string;
    city?: string;
    visitorCount?: number;
    lastLoginTime?: Date;
    lastLoginIp?: string;
  };
}
