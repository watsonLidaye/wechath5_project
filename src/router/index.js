const routes = [{
  path: '/',
  name: 'index',
  component: (resolve) => require(['@/components/pages/index/index'], resolve),
  meta: {
    pageTitle: '翔通集团'
  }
}, {
  path: '/share',
  name: 'share',
  component: (resolve) => require(['@/components/pages/index/share/share'], resolve),
  meta: {
    pageTitle: '我的专属二维码'
  }
}, {
  path: '/inputfile',
  name: 'inputfile',
  component: (resolve) => require(['@/components/pages/index/inputfile/inputfile'], resolve),
  meta: {
    pageTitle: '在线报名'
  }
}, {
  path: '/getGoods',
  name: 'getGoods',
  component: (resolve) => require(['@/components/pages/index/getGoods/getGoods'], resolve),
  meta: {
    pageTitle: '有奖专区'
  }
}, {
  path: '/recruit',
  name: 'recruit',
  component: (resolve) => require(['@/components/pages/index/recruit/recruit'], resolve),
  meta: {
    pageTitle: '名企招聘'
  }
}, {
  path: '/ranking',
  name: 'ranking',
  component: (resolve) => require(['@/components/pages/index/ranking/ranking'], resolve),
  meta: {
    pageTitle: '推荐排行'
  }
}, {
  path: '/companyDetail',
  name: 'companyDetail',
  component: (resolve) => require(['@/components/pages/index/companyDetail/companyDetail'], resolve),
  meta: {
    pageTitle: '公司详情'
  }
}, {
  path: '/jobdetail',
  name: 'jobdetail',
  component: (resolve) => require(['@/components/pages/index/jobdetail/jobdetail'], resolve),
  meta: {
    pageTitle: '职位详情'
  }
}, {
  path: '/my',
  name: 'my',
  component: (resolve) => require(['@/components/pages/my/index'], resolve),
  meta: {
    pageTitle: '我的'
  }
}, {
  path: '/myInfo',
  name: 'myInfo',
  component: (resolve) => require(['@/components/pages/my/myInfo/index'], resolve),
  meta: {
    pageTitle: '我的信息'
  }
}, {
  path: '/myWork',
  name: 'myWork',
  component: (resolve) => require(['@/components/pages/my/myWork/index'], resolve),
  meta: {
    pageTitle: '我的工作'
  }
}, {
  path: '/myIntro',
  name: 'myIntro',
  component: (resolve) => require(['@/components/pages/my/myIntro/index'], resolve),
  meta: {
    pageTitle: '我的推荐'
  }
}, {
  path: '/introDetail',
  name: 'introDetail',
  component: (resolve) => require(['@/components/pages/my/myIntro/introDetail/index'], resolve),
  meta: {
    pageTitle: '我的推荐'
  }
}, {
  path: '/myAccount',
  name: 'myAccount',
  component: (resolve) => require(['@/components/pages/my/myAccount/index'], resolve),
  meta: {
    pageTitle: '我的账户'
  }
}, {
  path: '/accountDetail',
  name: 'accountDetail',
  component: (resolve) => require(['@/components/pages/my/myAccount/accountDetail/index'], resolve),
  meta: {
    pageTitle: '我的账户'
  }
}, {
  path: '/accountSetting',
  name: 'accountSetting',
  component: (resolve) => require(['@/components/pages/my/myAccount/accountSetting/index'], resolve),
  meta: {
    pageTitle: '账户资料设置'
  },
}, {
  path: '/myBorrow',
  name: 'myBorrow',
  component: (resolve) => require(['@/components/pages/my/myBorrow/index'], resolve),
  meta: {
    pageTitle: '我要借钱'
  }
}, {
  path: '/borrowSubmit',
  name: 'borrowSubmit',
  component: (resolve) => require(['@/components/pages/my/borrowSubmit/index'], resolve),
  meta: {
    pageTitle: '提现'
  }
},{
  path: '/accountSuccess',
  name: 'accountSuccess',
  component: (resolve) => require(['@/components/pages/my/myAccount/accountSuccess/index'], resolve),
  meta: {
    pageTitle: '账户资料修改成功'
  }
}]

export default routes