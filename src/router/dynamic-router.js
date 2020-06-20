import Layout from '@/views/layout/Layout'

/* 需要权限判断的路由 */
const dynamicRoutes = [
   {
     path: '/pms',
     component: Layout,
     // redirect: '/pms/product',
     name: 'pms',
     meta: {name: '商品', icon: 'product'},
     children: [       {
         path: 'productCate',
         name: 'productCate',
         component: () => import('@/views/pms/category/index'),
         meta: {name: '商品分类', icon: 'product-cate'}
       },
       {
       path: 'product',
       name: 'product',
       component: () => import('@/views/pms/product/index'),
       meta: {name: '商品列表', icon: 'product-list'}
     },
       {
         path: 'addProduct',
         name: 'addProduct',
         component: () => import('@/views/pms/product/add'),
         meta: {name: '添加商品', icon: 'product-add'},
         hidden:true
       },
       {
         path: 'updateProduct',
         name: 'updateProduct',
         component: () => import('@/views/pms/product/update'),
         meta: {name: '修改商品'},
         hidden: true
       },
       {
         path: 'viewProduct',
         name: 'viewProduct',
         component: () => import('@/views/pms/product/viewProduct'),
         meta: {name: '查看品种详情'},
         hidden:true
       },
       {
         path: 'item',
         name: 'item',
         component: () => import('@/views/pms/item/index'),
         meta: {name: '宠物列表'},
         hidden:true
       },
         {
           path: 'addItem',
           name: 'addItem',
           component: () => import('@/views/pms/item/add'),
           meta: {name: '添加宠物',icon: 'product-add'},
         },
         {
           path: 'updateItem',
           name: 'updateItem',
           component: () => import('@/views/pms/item/update'),
           meta: {name: '更新信息'},
           hidden:true
         },
       // {
       //   path: 'addProductCate',
       //   name: 'addProductCate',
       //   component: () => import('@/views/pms/category/add'),
       //   meta: {name: '添加商品分类'},
       //   hidden: true
       // },
       // {
       //   path: 'updateProductCate',
       //   name: 'updateProductCate',
       //   component: () => import('@/views/pms/category/update'),
       //   meta: {name: '修改商品分类'},
       //   hidden: true
       // }
     ]
   },
   {
     path: '/oms',
     component: Layout,
     redirect: '/oms/order',
     name: 'oms',
     meta: {name: '订单', icon: 'order'},
     children: [
       {
         path: 'order',
         name: 'order',
         component: () => import('@/views/oms/order/index'),
         meta: {name: '订单列表', icon: 'product-list'}
       },
       {
         path: 'orderDetail',
         name: 'orderDetail',
         component: () => import('@/views/oms/order/orderDetail'),
         meta: {name: '订单详情'},
         hidden:true
       },
       {
         path: 'deliverOrderList',
         name: 'deliverOrderList',
         component: () => import('@/views/oms/order/deliverOrderList'),
         meta: {name: '发货列表'},
         hidden:true
       },
       {
         path: 'orderSetting',
         name: 'orderSetting',
         component: () => import('@/views/oms/order/setting'),
         meta: {name: '订单设置', icon: 'order-setting'}
       },
       {
         path: 'returnApply',
         name: 'returnApply',
         component: () => import('@/views/oms/apply/index'),
         meta: {name: '退货申请处理', icon: 'order-return'}
       },
       {
         path: 'returnReason',
         name: 'returnReason',
         component: () => import('@/views/oms/apply/reason'),
         meta: {name: '退货原因设置', icon: 'order-return-reason'}
       },
       {
         path: 'returnApplyDetail',
         name: 'returnApplyDetail',
         component: () => import('@/views/oms/apply/applyDetail'),
         meta: {name: '退货原因详情'},
         hidden:true
       }
     ]
   },
]

export default dynamicRoutes
