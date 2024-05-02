export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' }
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/system',
    name: '系统管理',
    icon: 'setting',
    access: 'canAdmin',
    routes: [
      { path: '/system', redirect: '/system/admin' },
      { path: '/system/admin', name: '管理员管理', component: './Admin' },
      { path: '/system/role', name: '角色管理', component: './Admin' },
      { path: '/system/notice', name: '通知公告', component: './Admin' },
      { path: '/system/log', name: '日志管理', component: './Admin' }
    ],
  },
  {
    path: '/user/list',
    name: '用户管理',
    icon: 'team',
    component: '@/pages/User/List'
  },
  {
    path: '/info',
    name: '信息管理',
    icon: 'switcher',
    routes: [
      { path: '/info', redirect: '/info/note' },
      { path: '/info/category', name: '分类管理', component: '@/pages/Category' },
      { path: '/info/note', name: '笔记管理', component: './Admin' },
      { path: '/info/video', name: '视频管理', component: './Admin' },
      { path: '/info/resources', name: '资源管理', component: './Admin' },
    ],
  },
  {
    path: '/question-bank',
    name: '题库管理',
    icon: 'rocket',
    routes: [
      { path: '/question-bank', redirect: '/question-bank/list' },
      { path: '/question-bank/list', name: '题库列表', component: './Admin' },
      { path: '/question-bank/question', name: '题目管理', component: './Admin' }
    ],
  },
  { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },

  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
