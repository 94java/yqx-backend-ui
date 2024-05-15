export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' }
    ],
  },
  {
    path: '/note',
    layout: false,
    routes: [
      { path: '/note', redirect: '/note/Content' },
      { name: '笔记内容', path: 'content', component: '@/pages/Note/Content' }
    ],
  },

  { path: '/dashboard', name: '数据统计', icon: 'PieChartOutlined', component: '@/pages/Dashboard' },
  {
    path: '/system',
    name: '系统管理',
    icon: 'setting',
    access: 'canAdmin',
    routes: [
      { path: '/system', redirect: '/system/admin' },
      { path: '/system/role', name: '角色管理', component: '@/pages/System/Role' },
      { path: '/system/notice', name: '通知公告', component: '@/pages/System/Notice' },
    ],
  },
  {
    path: '/user/list',
    name: '用户管理',
    icon: 'team',
    component: '@/pages/User',
    access: 'canAdmin',
  },
  {
    path: '/info',
    name: '信息管理',
    icon: 'switcher',
    routes: [
      { path: '/info', redirect: '/info/note' },
      { path: '/info/category', name: '分类管理', component: '@/pages/Category',access: 'canAdmin' },
      { path: '/info/note', name: '笔记管理', component: '@/pages/Note' },
      { path: '/info/video', name: '视频管理', component: '@/pages/Video' },
      { path: '/info/popular', name: '动态管理', component: '@/pages/Popular' },
    ],
  },
  {
    path: '/question-bank',
    name: '题库管理',
    icon: 'rocket',
    access: 'canAdmin',
    routes: [
      { path: '/question-bank', redirect: '/question-bank/list' },
      { path: '/question-bank/list', name: '题库列表', component: '@/pages/QuestionBank' },
      {
        path: '/question-bank/question',
        name: '题目管理',
        hideChildrenInMenu: true,
        routes: [
          { path: '/question-bank/question', redirect: '/question-bank/question/list' },
          { path: '/question-bank/question/list', name: '题目列表', component: '@/pages/Subject' },
          { path: '/question-bank/question/answer', name: '选项配置', component: '@/pages/Answer' },
        ]
      },
    ],
  },
  {
    path: '/comment/list',
    name: '评论管理',
    icon: 'message',
    component: '@/pages/Comment'
  },
  {
    path: '/question', name: '选项配置',hideInMenu: true,
    routes: [
      { path: '/question', redirect: '/question/answer' },
      { path: '/question/answer', name: '选项配置', component: './Admin' },
    ]
  },
  { path: '/', redirect: '/dashboard' },
  { path: '*', layout: false, component: './404' },
];
