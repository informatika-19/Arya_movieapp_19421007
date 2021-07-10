
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      authAdmin: true
    },
    children: [
      { path: '', name: 'dashboardAdmin', component: () => import('pages/Admin/Index.vue') },
      { path: 'datauser', name: 'Datauser', component: () => import('pages/Admin/DataUser.vue') },
      { path: 'inputbarang', name: 'inputBarang', component: () => import('pages/Admin/InputBarang.vue') },
      { path: 'datadvd', name: 'dataDVD', component: () => import('pages/Admin/DataDVD.vue') },
      { path: 'formedit/:id', name: 'formEditDVD', component: () => import('pages/Admin/FormEdit.vue') }
    ]
  },
  {
    path: '/user',
    meta: {
      authUser: true
    },
    component: () => import('layouts/UserLayout.vue'),
    children: [
      { path: '', name: 'homeUser', component: () => import('pages/User/Index.vue') },
      { path: 'myorder', name: 'myOrder', component: () => import('pages/User/MyOrder.vue') }
    ]
  },
  {
    path: '/login',
    name: 'loginPage',
    component: () => import('pages/guest/Login.vue')
  },
  {
    path: '/register',
    name: 'registerPage',
    component: () => import('pages/guest/Register.vue')
  }
  // Always leave this as last one,
  // but you can also remove it

]

export default routes
