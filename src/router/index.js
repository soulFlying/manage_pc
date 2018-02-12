import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/readme',
      component: resolve => require(['../components/common/Home.vue'], resolve), // 父组件
      children: [
        {
          path: '/',
          component: resolve => require(['../components/page/Readme.vue'], resolve), // 进入页
        },
        {
          path: '/Product',
          component: resolve => require(['../components/page/Product.vue'], resolve), // 产品管理
        },
        {
          path: '/Inventory',
          component: resolve => require(['../components/page/Inventory.vue'], resolve) // 商品明细
        },
        {
          path: '/Library',
          component: resolve => require(['../components/page2/Library.vue'], resolve) // 出库
        },
        {
          path: '/Stock',
          component: resolve => require(['../components/page2/Stock.vue'], resolve) // 库存管理
        },
        {
          path: '/Storage',
          component: resolve => require(['../components/page2/Storage.vue'], resolve), // 入库
            meta:{
                keepAlive:true
            }
        },
        {
          path: '/StorageM',
          component: resolve => require(['../components/page2/StorageM.vue'], resolve) // 出库明细
        },
        {
          path: '/Shipments',
          component: resolve => require(['../components/page3/Shipments.vue'], resolve) // 全部发货
        },
        {
          path: '/Pending',
          component: resolve => require(['../components/page3/Pending.vue'], resolve) // 待发货
        },
        {
          path: '/Already',
          component: resolve => require(['../components/page3/Already.vue'], resolve) // 已发货
        },
        {
          path: '/vueeditor',
          component: resolve => require(['../components/order/VueEditor.vue'], resolve) // Vue-Quill-Editor组件
        },
        {
          path: '/vuetable',
          component: resolve => require(['../components/order/VueTable.vue'], resolve) // Vue表格组件
        },
        {
          path: '/markdown',
          component: resolve => require(['../components/order/Markdown.vue'], resolve) // markdown
        },
        {
          path: '/upload',
          component: resolve => require(['../components/order/Upload.vue'], resolve) // Vue-Core-Image-Upload组件
        },
        {
          path: '/basecharts',
          component: resolve => require(['../components/order/BaseCharts.vue'], resolve) // vue-schart组件
        },
        {
          path: '/drag',
          component: resolve => require(['../components/order/DragList.vue'], resolve) // 拖拽列表组件
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    }
  ]
})
