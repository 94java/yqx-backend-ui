# 易启学-学习社区系统（笔记、视频、题目训练）

> 视频介绍：https://www.bilibili.com/video/BV1Yzy5YUENs
>
> 文档后面有时间了再继续补充
>
> 有配套的毕设文档，需要的朋友可以联系，**q：10837907**
>
> 这个项目大家喜欢的话后面我可以再重构重构

| 项目                        | GitHub                                   | Gitee                                    |
| --------------------------- | ---------------------------------------- | ---------------------------------------- |
| yqx_backend（后端）         | https://github.com/94java/yqx-backend-ui | https://gitee.com/java_94/yqx_backend    |
| yqx_react（前端-前台）      | https://github.com/94java/yqx-react      | https://gitee.com/java_94/yqx-react      |
| yqx_backend_ui（前端-后台） | https://github.com/94java/yqx-backend-ui | https://gitee.com/java_94/yqx-backend-ui |

### 技术栈

前端：react + ant-design-pro + axios + antd-mobile

后端：SpringBoot + MyBatis + Redis + MySQL

### 特色

- 用户登录支持邮箱/账号密码两种方式
- 支持发布视频、笔记（Markdown格式）、题目训练（有错题本）、动态发布
- 用户统计、数据隔离、权限认证等等
- 所用技术比较主流，代码写的相对规范（当时毕设的时候写的，现在回头看肯定还有很多改进的地方）
- 内嵌协同过滤推荐算法、敏感词过滤算法，根据用户的操作为用户推荐内容
- 还有很多东西有点久远了，已经忘了（毕竟已经很久没看了）

后续文档继续补充，代码可以继续优化，也欢迎大家pr

项目真的挺不错的，适合学习，有不懂的或者需要改进的都可以指出，共同进步~

### 启动

**后端**

`clone` 代码 -> 根据sql脚本创建数据库 -> 配置 `application.yaml` ->启动 `SpringBoot` 项目

**前端**

1. 安装依赖：yqx_react（`yarn install`）/ yqx_backend（`pnpm i`）
2. 启动：yqx_react（`yarn start`）/ yqx_backend_ui（`pnpm dev`）

后台测试账号密码：123/123、123456/123456

### 项目截图

> 整体功能还是比较多的，基本功能也都完善了，截图下面只是部分

**后台：**

![image-20241021205943924](http://imgs.jiusi.cc/202410212059335.png)

![image-20241021210013800](http://imgs.jiusi.cc/202410212100958.png)

![image-20241021210032327](http://imgs.jiusi.cc/202410212100448.png)

![image-20241021210047054](http://imgs.jiusi.cc/202410212100196.png)

![image-20241021210058827](http://imgs.jiusi.cc/202410212100956.png)

![image-20241021210111354](http://imgs.jiusi.cc/202410212101504.png)

![image-20241021210228733](http://imgs.jiusi.cc/202410212102905.png)

![image-20241021210245806](http://imgs.jiusi.cc/202410212102973.png)

**前台：**

![image-20241021210325382](http://imgs.jiusi.cc/202410212103441.png)

![image-20241021210345733](http://imgs.jiusi.cc/202410212103805.png)

![image-20241021210405051](http://imgs.jiusi.cc/202410212104095.png)

![](http://imgs.jiusi.cc/202410212104620.png)



![image-20241021210503116](http://imgs.jiusi.cc/202410212105162.png)

![image-20241021210517716](http://imgs.jiusi.cc/202410212105759.png)

![image-20241021210531356](http://imgs.jiusi.cc/202410212105406.png)
