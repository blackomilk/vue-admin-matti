import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    perms: ['admin','editor']    control the page perms (you can set multiple perms)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all perms can be accessed
 */
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" }
      }
    ]
  }
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user perms
 */
export const asyncRoutes = [
  {
    path: "/file",
    component: Layout,
    redirect: "file/index",
    name: "file",
    meta: { title: "file", icon: "example", perms: ["file"] },
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("@/views/file/index.vue"),
        meta: { title: "file", icon: "excel", perms: ["file"] }
      }
    ]
  },
  {
    path: "/ops_agent",
    component: Layout,
    redirect: "ops_agent/index",
    name: "ops_agent",
    alwaysShow: true,
    meta: { title: "SmartForm任务管理", icon: "tree", perms: ["ops_agent"] },
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("@/views/ops_agent/index.vue"),
        meta: { title: "任务历史", icon: "nested", perms: ["ops_agent"] }
      }
    ]
  },
  {
    path: "/ops_cmdb",
    component: Layout,
    redirect: "/ops_cmdb/ops_cmdb_cabinet/computer_room",
    name: "ops_cmdb",
    meta: { title: "资产管理", icon: "bug", perms: ["ops_cmdb"] },
    children: [
      {
        path: "ops_cmdb_product",
        component: () => import("@/views/ops_cmdb/ops_cmdb_product/index"),
        redirect: "/ops_cmdb/ops_cmdb_product/product",
        name: "ops_cmdb_product",
        meta: {
          title: "产品管理",
          icon: "example",
          perms: ["ops_cmdb_product"]
        },
        children: [
          {
            path: "project_instance",
            name: "project_instance",
            component: () =>
              import("@/views/ops_cmdb/ops_cmdb_product/project_instance.vue"),
            meta: { title: "项目实例", icon: "user", perms: ["ops_cmdb"] }
          }
        ]
      }
    ]
  },
  {
    path: "/ops_job",
    component: Layout,
    redirect: "ops_job/index",
    name: "ops_job",
    meta: { title: "任务管理", icon: "tree", perms: ["ops_job"] },
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("@/views/ops_job/index.vue"),
        meta: { title: "创建任务日志", icon: "edit", perms: ["ops_job"] }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];
const createRouter = () =>
  new Router({
    mode: "history", // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
