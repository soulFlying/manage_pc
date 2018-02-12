<template>
    <div class="shipments">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 产品管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品明细</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-form :inline="true">
                <div class='box-top'>
                    <label>产品：</label><input v-model='productName' readonly/>
                    <label>产品编号：</label><input v-model='productCode' readonly/>
                    <label>所属分类：</label><input v-model='productCate' readonly/>
                </div>
                <el-form-item label="商品SN：">
                    <el-input v-model="searchData.sn" placeholder="输入查询商品SN"></el-input>
                </el-form-item>
                <el-form-item label="商品sku：">
                    <el-input v-model="searchData.sku" placeholder="输入查询商品sku"></el-input>
                </el-form-item>
                <el-form-item label="存放仓库：">
                    <!--<el-select @change="searchData.warehouseId=''" v-model="wareAreaId" placeholder="请选择" class="handle-select">
                        <el-option v-for="(item,index) in warehouse" :key="item.value" :label="item.name" :value="index"></el-option>
                    </el-select>-->
                    <el-select v-model="searchData.warehouseId" placeholder="请选择" class="handle-select2">
                        <el-option label="请选择" value=""></el-option>
                        <el-option v-for="(item,index) in warehouse[wareAreaId].childNode" :key="item.value" :label="item.name" :value="item.warehouseId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="入库时间：">
                    <el-date-picker
                        v-model="pickTime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        placeholder="选择入库时间">
                    </el-date-picker>
                </el-form-item>
                <el-button type="primary" icon="search" @click="search()">搜索</el-button>
                <el-form-item label='筛选列表商品数量:' style='display: block'>
                    <p style='color: #f56c6c;font-weight: bold;font-size: 16px'>{{total}}</p>
                </el-form-item>
            </el-form>
        </div>
        <!-- 列表 -->
        <div class="list">
            <table width="100%" class="ship_table">
                <tr style="background-color: #F5F6FA">
                    <th style="width:40px">序号</th>
                    <th>商品SN码</th>
                    <th>商品规格</th>
                    <th>商品sku</th>
                    <th>存放仓库</th>
                    <th>入库时间</th>
                    <th>操作</th>
                </tr>
                <tr style="height:45px"  v-for="(item,index) in listData">
                    <td>{{index+1+num}}</td>
                    <td>{{item.sn}}</td>
                    <td>{{item.normName}}</td>
                    <td>{{item.sku}}</td>
                    <td>{{item.warehouse}}</td>
                    <td>{{item.createTime}}</td>
                    <td @click="changeSN(item.goodsStockId,item.name,item.code,item.normName,item.sku,item.warehouseName,item.sn)"><a style="color:blue;text-decoration:underline;cursor:pointer">修改</a></td>
                </tr>
            </table>
        </div>
        <!-- 修改弹框 -->
        <div class="box" v-show="productListBoxShow">
            <div class="list_bombBox">
                <div class="shipBomb_title">
                    <span>修改</span>
                    <span style="float:right;cursor:pointer" @click="productListBoxShow=false">X</span>
                </div>
            <div class='boxFrame'>
                <label>产品：</label><input v-model='goodsList.box_name' readonly/>
                <label>产品编号：</label><input v-model='goodsList.box_code' readonly/>
                <label>规格：</label><input v-model='goodsList.box_color' readonly/>
                <label>商品sku：</label><input v-model='goodsList.box_sku' readonly/>
                <label>存放仓库：</label><input v-model='goodsList.box_warehouse' readonly/>
                <div><label>SN码：</label><input v-model='goodsList.box_sn' /></div>
                <div class='buttons'>
                    <el-button type="primary" @click='updateProducts()'>确认修改</el-button>
                    <el-button @click="productListBoxShow=false">取消</el-button>
                </div>
            </div>
            </div>
            <!--提示框-->
            <div class='remainder' ref='remainder' v-show='isSuccess'>{{remain}}</div>
        </div>
        <!--分页器-->
        <div class="pagination">
            <el-pagination
                @current-change ="handleCurrentChange"
                layout="prev, pager, next"
                :total="total"
                v-show="total != 0">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import ElOption from "../../../node_modules/element-ui/packages/select/src/option";
    export default {
        components: {ElOption},
        data() {
            return {
                productName:'',     //商品名称
                productCode:'',     //商品编码
                productCate:'',     //商品分类
                                    //获取的下拉菜单数据
                warehouse: [
                    {
                        warehouseId: "",
                        name: "",
                        childNode: []
                    }
                ],   //仓
                wareAreaId: 0,      //区
                                     // sendTime:'',//发货时间
                pickTime: "",        //拣货时间
                                     // 搜索数据
                searchData: {
                    orderId: "",          //关联单号
                    productName: "",      //商品
                    productNormName: "",  //规格
                    sku: "",              //商品sku
                    sn:'',                //商品sn
                    warehouseId: "",      //仓库分区ID
                    productGoodsId: '',   //货品id
                    productId:'',         //商品id
                    sendStartDate: "",    //入库时间(开始)
                    sendEndDate: "",      //入库时间(结束)
                    pageStart: 1,         //页码
                    pageSize: 10          //每页数量
                },
                // 列表数据
                listData: [],
                total: 0,                 //列表数据总数
                productListBoxShow: false, //修改弹框
                goodsList:{
                    box_name:'',          //修改name
                    box_code:'',          //修改产品编号
                    box_color:'',         //修改产品规格
                    box_sku:'',           //修改产品sku
                    box_warehouse:'',     //修改仓库
                    box_sn:'',            //修改商品sn
                    box_id:''             //库存id
                },
                isSuccess:false,           //修改完成的提示框
                remain:'',                 //修改完成的提示内容
                num:0
            };
        },
        /*beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.getData(); //获取列表数据
                vm.getWarehouse(); //获取仓库
            });
        },*/
        watch: {
            //   入库时间格式化
            pickTime(curVal, oldVal) {
                console.log(curVal)
                if(curVal == "" || curVal == null){
                    this.searchData.sendStartDate = ''
                    this.searchData.sendEndDate = ''
                }else if(curVal.length != 0){
                    this.searchData.sendStartDate = this.time(curVal[0])
                    this.searchData.sendEndDate = this.time(curVal[1])
                }
                //   console.log(this.sendStartDate+'=='+this.sendendDate)
            }

        },
        created(){
            this.productName = this.$route.query.name
            this.productCode = this.$route.query.code
            this.productCate = this.$route.query.cate
            this.getData(); //获取列表数据
            this.getWarehouse(); //获取仓库
        },
        methods: {
            handleCurrentChange(val) {
                this.searchData.pageStart = val;
                this.num = (val-1)*10;
                this.getData();
            },
            // 時間戳改為yyyy-MM-dd HH:mm:ss
            time(input) {
                var d = new Date(input);
                var year = d.getFullYear();
                var month = d.getMonth() + 1;
                month = month < 10 ? "0" + month : "" + month;
                var day = d.getDate() < 10 ? "0" + d.getDate() : "" + d.getDate();
                var hour = d.getHours() < 10 ? "0" + d.getHours() : "" + d.getHours();
                var minutes =
                    d.getMinutes() < 10 ? "0" + d.getMinutes() : "" + d.getMinutes();
                var seconds =
                    d.getSeconds() < 10 ? "0" + d.getSeconds() : "" + d.getSeconds();
                return (
                    year +
                    "-" +
                    month +
                    "-" +
                    day +
                    " " +
                    hour +
                    ":" +
                    minutes +
                    ":" +
                    seconds
                );
            },
            // 获取仓库
            getWarehouse() {
                this.$indexServer.getWarehouse().then(res => {
                    if (res.data.code == 200) {
                        this.warehouse = res.data.data
                    }
                    if (res.status == 302) {
                        this.errorFrame()
                        return false
                    }
                });
            },
            // 获取列表数据
            getData() {
                if (this.$route.query.productId) {
                    this.searchData.productId = this.$route.query.productId
                    this.searchData.productGoodsId = ''
                }
                if (this.$route.query.productGoodsId) {
                    this.searchData.productGoodsId = this.$route.query.productGoodsId
                    this.searchData.productId = ''
                }
                this.$indexServer.productDetails (this.searchData.sn, this.searchData.sku, this.searchData.sendStartDate, this.searchData.sendEndDate, this.searchData.pageStart,
                    this.searchData.pageSize, this.searchData.warehouseId, this.searchData.productId,this.searchData.productGoodsId)
                    .then(res => {
                    if (res.data.code == 200) {
                        this.listData = res.data.data
                        if(res.data.total == null || res.data.total == '' || res.data.total == 'null'){
                            this.total = 0
                        } else{
                            this.total = res.data.total
                        }
                    }
                        if (res.status == 302) {
                            this.errorFrame()
                            return false
                        }
                });
            },
            //搜索按钮
            search(){
                this.getData()
                /*let _this = this
                if (_this.searchData.sn || _this.searchData.sku || _this.searchData.warehouseId || _this.searchData.sendStartDate || _this.searchData.sendendDate) {
                    _this.getData()
            }
            else {
                    _this.open('请输入相关搜索信息！')
                }*/
            },
            //无搜索信息提示框
            open(str) {
                this.$alert(str, '提示', {
                    confirmButtonText: '确定',
                });
            },
            //修改按钮
            changeSN(id,name,code,normName,sku,warehouseName,sn){
                this.goodsList.box_id = id
                this.goodsList.box_name = name
                this.goodsList.box_code = code
                this.goodsList.box_color = normName
                this.goodsList.box_sku = sku
                this.goodsList.box_warehouse = warehouseName
                this.goodsList.box_sn = sn
                this.productListBoxShow = true
            },
            //确认修改按钮
            updateProducts(){
                if (!this.goodsList.box_sn) {
                    this.error('请输入SN码！')
                    return false
                } else {
                    this.$indexServer.updateProduct (this.goodsList.box_sn,this.goodsList.box_id).then(res => {
                        if (res.status == 302) {
                            this.errorFrame()
                            return false
                        }
                        if (res.data.code == 200) {
                            this.success()
                        } else if(res.data.code == 402){
                            this.error('库存中已存在该SN码！')
                        }else {
                            this.error(res.data.msg)
                        }
                    });
                }

            },
            //成功提示框
            success() {
                let _this = this
                _this.remain = '修改成功！'
                _this.isSuccess = true
                setTimeout(() => {
                    _this.isSuccess = false
                    _this.productListBoxShow=false
                    _this.getData()
                },2000)
            },
            //失败提示框
            error(str) {
                let _this = this
                _this.remain = str
                _this.isSuccess = true
                setTimeout(() => {
                    _this.isSuccess = false
                },2000)
            }
        }
    };
</script>

<style scoped>
    .box-top{
        font-size: 14px;
        color: #48576a;
        margin-bottom: 22px;
    }
    .box-top label{
        padding: 11px 12px 11px 0;
    }
    .box-top input{
        padding: 3px 10px;
        height: 30px;
        line-height: 30px;
        min-width: 200px;
        margin-right: 20px;
        border: none;
        color: #1f2d3d;
        font-size: 14px;
    }
    .shipments {
        min-width: 1024px;
    }
    .handle-box {
        margin-bottom: 20px;
    }
    .handle-select {
        width: 120px;
    }
    .handle-select1 {
        width: 350px;
    }
    .handle-select2 {
        width: 160px;
    }
    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .ship_table {
        table-layout: fixed;
        empty-cells: show;
        border-collapse: collapse;
        margin: 0 auto;
    }

    .ship_table td,
    .ship_table th {
        border: 1px solid rgb(210, 210, 210);
        padding: 0 5px 0;
        text-align: center;
        vertical-align: middle;
        font-size: 15px;
        color: rgb(0, 1, 32);
    }

    .ship_table th {
        background-repeat: repeat-x;
        height: 50px;
        font-size: 15px;
    }

    a {
        color: rgb(0, 1, 32);
    }
    .box {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        z-index: 9999;
        border: 1px solid #D2D2D2;
    }
    .list_bombBox,
    .pend_bombBox {
        border: 1px solid #e9eaea;
        width: 600px;
        background-color: #fff;
        position: absolute;
        top: 20%;
        left: 50%;
        margin-left: -300px;
    }
    .shipBomb_title{
        border-bottom: 1px solid #D2D2D2;
        height:50px;
        line-height:50px;
        padding:0 20px;
        background-color: #F5F6FA;
    }
    .boxFrame{
        font-size: 14px;
        color: #606266;
        line-height: 30px;
        padding: 20px;
    }
    .boxFrame label,.boxFrame input{
        height: 30px;
        display: inline-block;
    }
    .boxFrame input{
        padding: 0 10px;
        margin-right: 10px;
        border: none;
        width: 210px;
    }
    .boxFrame div{
        margin-top: 5px;
    }
    .boxFrame div > input{
        border: 1px solid #D2D2D2;
        width: 250px;
        border-radius: 4px;
        outline: none;
    }
    .buttons {
        overflow: hidden;
        margin: 20px 0 10px 0;
    }
    .buttons button{
        padding: 0;
        height: 35px;
        width: 85px;
        text-align: center;
        line-height: 35px;
        float: right;
        margin-right: 15px;
    }
    .remainder{
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        background: rgba(0,0,0,0.6);
        color: #fff;
        position: absolute;
        top: 40%;
        margin-top: -25px;
        font-size: 15px;
        left: 50%;
        margin-left: -150px;
        min-width: 300px;
        border-radius: 4px;
        text-align: center;
    }
</style>
