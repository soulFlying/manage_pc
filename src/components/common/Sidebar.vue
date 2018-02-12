<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title" ><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    icon: 'el-icon-setting',
                    index: 'readme',
                    title: '自述'
                },
                {
                    icon: 'el-icon-menu',
                    index: '2',
                    title: '产品管理',
                    subs: [
                        {
                            index: 'Product',
                            title: '产品管理'
                        },
                        // {
                        //     index: 'Inventory',
                        //     title: '商品明细'
                        // }
                    ]
                },
                {
                    icon: 'el-icon-date',
                    index: '3',
                    title: '库存管理',
                    subs: [
                        {
                            index: 'Stock',
                            title: '库存管理'
                        },
                        {
                            index: 'Library',
                            title: '商品出库'
                        },
                        {
                            index: 'Storage',
                            title: '商品入库'
                        },
                        // {
                        //     index: 'StorageM',
                        //     title: '入库明细'
                        // },
                        // {
                        //     index: 'upload',
                        //     title: '文件上传'
                        // }
                    ]
                },
                {
                    icon: 'el-icon-star-on',
                    index: '4',
                    title: '全部订单',
                    subs: [
                        {
                            index: 'Shipments',
                            title: '全部订单'
                        },
                        {
                            index: 'Pending',
                            title: '待发货'
                        },
                        {
                            index: 'Already',
                            title: '已发货'
                        },

                    ]

                }
            ]
        }
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    }
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 250px;
  left: 0;
  top: 70px;
  bottom: 0;
  background: #2e363f;
}
.sidebar > ul {
  height: 100%;
}
</style>
