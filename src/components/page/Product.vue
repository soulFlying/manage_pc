<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 产品管理</el-breadcrumb-item>
                <el-breadcrumb-item></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-form :inline="true" :model="searchInfo">
                <el-form-item label=产品名：>
                    <el-input v-model="searchInfo.searchName" placeholder="请输入查询的产品名称"></el-input>
                </el-form-item>
                <el-form-item label=产品编号：>
                    <el-input v-model="searchInfo.searchId" placeholder="请输入查询的产品编号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search(searchInfo.searchName,searchInfo.searchId)" icon="search">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-box">
            <table border="1" bordercolor='#D2D2D2' class='product_table' cellspacing="0" cellpadding="0" frame="void">
                <tr style='background-color: #F5F6FA;' class='product_table_header'>
                    <th width='5%'>序号</th>
                    <th width='20%'>产品名</th>
                    <th width='20%'>产品编号</th>
                    <th width='10%'>售卖价</th>
                    <th width='20%'>所属分类</th>
                    <th width='15%'>当前库存/件</th>
                    <th width='10%'>操作</th>
                </tr>
                <tr v-for='(item,index) in priductInfo' >
                    <td colspan='7'>
                        <table border='1' bordercolor='#D2D2D2' class='table_child' cellspacing="0" cellpadding="0" frame="void">
                            <tr class='table_child_header'>
                                <td width='5%'>{{index+1}}</td>
                                <td width='20%'>{{item.name}}</td>
                                <td width='20%'>{{item.code}}</td>
                                <td width='10%'>￥{{item.salePrice}}</td>
                                <td width='20%'>{{item.productCate}}</td>
                                <td @click = 'goProductDetail1(item.id,item.name,item.code,item.productCate)' width='15%' class='select_not'>{{item.stock}}</td>
                                <td @click='isHide(index,item.id)' width='10%' class='select_not'>商品明细</td>
                            </tr>
                            <tr class='tr_frame' v-show='frameHide & activeIndex == index'>
                                <td colspan='7'>
                                    <table class='table_frame' border="1" bordercolor='#D2D2D2' cellspacing="0" cellpadding="0">
                                        <tr style='background-color: #F5F6FA'>
                                            <th>规格值</th>
                                            <th>商品sku</th>
                                            <th>当前库存/件</th>
                                        </tr>
                                        <tr v-for='(val,x) in colorData'>
                                            <td>{{val.normName}}</td>
                                            <td>{{val.sku}}</td>
                                            <td class='select_not' @click = 'goProductDetail2(val.id,item.name,item.code,item.productCate)'>{{val.stock}}</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                priductInfo:'',        //商品信息
                colorData: '',         //获取颜色/库存
                isExpand: false,
                frameHide:false,
                activeIndex: '',
                searchInfo: {
                    searchId: '',     // 搜索产品编号
                    searchName: ''   // 搜索产品名字
                }
            }
        },
        /*beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.getProducts()    //获取商品信息
            });
        },*/
        created() {
            this.getProducts()    //获取商品信息
        },
        computed: {},
        methods: {
            //获取商品信息
            getProducts(name,id){
                let _this = this
                _this.$indexServer.getProduct (name, id).then(res => {
                    if (res.status == 302) {
                        _this.errorFrame()
                        return false
                    }
                    if (res.data.code == 200) {
                       _this.priductInfo = res.data.data
                    }
                });
            },
            //搜索按钮
            search(name,id) {
                let _this = this
                /*if (_this.searchInfo.searchName || _this.searchInfo.searchId) {*/
                    _this.$indexServer.getProduct (name, id).then(res => {
                        if (res.data.code == 200) {
                            _this.priductInfo = res.data.data
                        } else if (res.data.code == 402) {
                            _this.open('查询的产品名称和编号不匹配！')
                        }
                        if (res.status == 302) {
                            _this.errorFrame()
                            return false
                        }
                    });
               /* } else {
                    _this.open('请输入相关搜索信息！')
                }*/
            },
            //展开商品
            isHide(index,productId){
                let _this = this
                if (_this.activeIndex ==index) {
                    _this.frameHide = !_this.frameHide
                }
                else {
                    _this.activeIndex = index
                    _this.frameHide = true
                }
                if (_this.frameHide == true) {
                    _this.$indexServer.productGoods (productId).then(res => {
                        if (res.data.code == 200) {
                            _this.colorData = res.data.data
                        }
                        if (res.status == 302) {
                            _this.errorFrame()
                            return false
                        }
                    });
                }
            },
            //无搜索信息提示框
            open(str) {
                this.$alert(str, '提示', {
                    confirmButtonText: '确定',
                });
            },
            //调转明细页面-商品id
            goProductDetail1(productId,name,code,cate){
                this.$router.push({path: '/Inventory',query:{productId:productId,name:name,code:code,cate:cate}})
            },
            //调转明细页面-货品id
            goProductDetail2(productGoodsId,name,code,cate){
                this.$router.push({path: '/Inventory',query:{productGoodsId:productGoodsId,name:name,code:code,cate:cate}})
            },
            //错误提示框
            errorFrame(){
                let _this = this
                _this.$message({
                    showClose: true,
                    message: '登录超时，请重新登录！',
                    type: 'warning',
                    onClose:() => {
                        _this.$route.push({path:'/login'})
                    }
                });
            }
        }
    }
</script>

<style scoped>
    /*搜索模块*/
    .handle-box {
        margin-bottom: 20px;
    }
    .table-box{
        border: 1px solid #D2D2D2;
    }
    /*列表模块*/
    .table_child tr:hover,.table_frame tr:hover{
        background-color: #F5F6FA;
    }
    .product_table,.table_frame,.table_child {
        border-collapse: collapse;
        width: 100%;
        font-size: 15px;
        color: rgb(0, 1, 32);
    }
    .select_not{
        color: #20A0FF;
        cursor: pointer;
        text-decoration: underline;
        moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select:none;
        -khtml-user-select:none;
        -webkit-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    /*父表格*/
    .product_table th{
        /*border: 1px solid #D2D2D2;*/
        height: 50px;
    }
    .product_table .product_table_header{
        /*border: 1px solid #D2D2D2;*/
    }
    /*子表格*/
    /*.table_child{
        border-top: 1px solid #fff;
    }*/
    .table_child_header td{
        border: 1px solid #D2D2D2;
    }
    .table_child td {
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    /*表格弹框*/
    .table_frame{
        width: 500px;
        margin: 10px auto;
        text-align: center;
        font-size: 14px;
    }
    .table_frame td,.table_frame th{
        height: 30px;
    }
    .tr_frame{
        background: rgba(245,246,250,0.2)!important;
        z-index: 5;
    }
</style>
