<template>
    <div class="shipments">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 库存管理</el-breadcrumb-item>
                <el-breadcrumb-item></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="select" style="margin-bottom:20px">
            <el-button :class="{active:stockId == 0}" @click="getStockData(0)">出库</el-button>
            <el-button :class="{active:stockId == 1}" @click="getStockData(1)">入库</el-button>
        </div>
        <div class="handle-box">
            <el-form :inline="true">
                <el-form-item label="商品：">
                    <el-input v-model="searchData.productName" class="handle-select mr10" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="规格：">
                    <el-input v-model="searchData.productNormName" class="handle-select mr10" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="商品sku：">
                    <el-input v-model="searchData.sku" class="handle-select mr10" placeholder=""></el-input>
                </el-form-item>
                <!-- <el-form-item label="变动类型：">
                    <el-select v-model="state" placeholder="请选择" class="handle-select mr10">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="入库" value="0"></el-option>
                        <el-option label="出库" value="1"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="变动仓库：">
                    <!-- <el-select @change="searchData.warehouseId=''" v-model="wareAreaId" placeholder="请选择" class="handle-select mr10">
                        <el-option v-for="(item,index) in warehouse" :key="item.value" :label="item.name" :value="index"></el-option>
                    </el-select> -->
                    <el-select v-model="searchData.warehouseId" placeholder="请选择" class="handle-select2 mr10">
                      <el-option label="请选择" value=""></el-option>
                      <el-option v-for="(item,index) in warehouse[wareAreaId].childNode" :key="item.value" :label="item.name" :value="item.warehouseId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="变动原因：">
                    <!-- <el-input v-model="searchData.reason" class="handle-select mr10" placeholder=""></el-input> -->
                    <el-select v-model="searchData.reason" placeholder="请选择" class="handle-select2 mr10">
                      <el-option label="请选择" value=""></el-option>
                      <el-option v-for="(item,index) in changeReason" :label="item.value" :value="item.key"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="关联单号：">
                    <el-input v-model="searchData.orderId" class="handle-select mr10" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="关系人：">
                    <el-input v-model="searchData.name" class="handle-select mr10" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="运单号：">
                    <el-input v-model="searchData.expressCode" class="handle-select mr10" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="变动时间：">
                    <el-date-picker
                        v-model="sendTime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择发货时间">
                    </el-date-picker>
                </el-form-item>
                <el-button type="primary" icon="search" @click="getSearchData(stockId)">搜索</el-button>
            </el-form>
        </div>
        <!-- 列表 -->
        <div class="list" v-if="listData.length != 0">
            <table width="100%" class="ship_table">
                <tr style="background-color: #F5F6FA">
                    <th style="width:40px">序号</th>
                    <th>商品</th>
                    <th>商品sku</th>
                    <th>变动类型</th>
                    <th>库存变动</th>
                    <th>商品清单</th>
                    <th>变动仓库</th>
                    <th>变动原因</th>
                    <th>关联单号</th>
                    <th style="width:200px">关系人信息</th>
                    <th style="width:90px">变动时间</th>
                    <th>备注</th>
                </tr>
                <tr style="height:69px" v-for="(item,index) in listData">
                    <td>{{(index+1)+(searchData.pageStart-1)*10}}</td>
                    <td style="text-align:left">产品名：{{item.productName}}<br />规格：{{item.productNormName}}</td>
                    <td>{{item.sku}}</td>
                    <td>{{item.typeDesc }}</td>
                    <td>{{item.num}}</td>
                    <td @click="getProductGoods(item.id)"><a style="color:#0000FF;text-decoration:underline;cursor:pointer">查看明细</a></td>
                    <td style="text-align:left">{{item.warehouse}}</td>
                    <td>{{item.reason}}</td>
                    <td>{{item.orderId}}</td>
                    <td style="text-align:left"><span v-show="item.name">关系人：{{item.name}}</span><span v-show="item.phone">，{{item.phone}}</span><span v-show="item.address">，{{item.address}}</span></td>
                    <td>{{item.createTime}}</td>
                    <td class="stockTabel_edit" @dblclick="dbclickEdit(item.remark,item.id)">{{item.remark}}</td>
                </tr>
            </table>
        </div>
        <div class="list" v-else>
            <table width="100%" class="ship_table">
                <tr style="background-color: #F5F6FA">
                    <th style="width:50px">序号</th>
                    <th>商品</th>
                    <th>商品sku</th>
                    <th>变动类型</th>
                    <th>库存变动</th>
                    <th>商品清单</th>
                    <th>变动仓库</th>
                    <th>变动原因</th>
                    <th>关联单号</th>
                    <th>关系人信息</th>
                    <th>变动时间</th>
                    <th>备注</th>
                </tr>
            </table>
        </div>
        <!-- 明细弹框 -->
        <div class="box" v-if="shipBombBoxShow">
            <div class="ship_bombBox">
                <div class="shipBomb_title" style="height:50px;line-height:50px;padding:0 5%;background-color: #E9EAEA">
                    <span>商品清单</span>
                    <span class="box_close" @click="shipBombBoxShow=false">X</span>
                </div>
                <div class="ship_con">
                    <table class="ship_table" style="margin:10px auto 30px;width:90%">
                        <tr style="background-color: #F5F6FA">
                            <th style="width:50px">序号</th>
                            <th>商品SN码</th>
                        </tr>
                        <tr style="height:40px" v-for='(item,index) in goodsList'>
                            <td>{{index+1}}</td>
                            <td>{{item}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

        <!-- 备注弹框 -->
        <div class="box" v-if="stockRemarkShow">
            <div class="stock_remark">
                <div class="shipBomb_title" style="height:50px;line-height:50px;padding:0 5%;background-color: #E9EAEA">
                    <span>备注</span>
                    <span class="box_close" @click="stockRemarkShow=false">X</span>
                </div>
                <textarea v-model="editInfo"></textarea>
                <div slot="footer" class="dialog-footer" style="margin-bottom:20px;text-align:center">
                    <el-button @click="stockRemarkShow = false">取 消</el-button>
                    <el-button type="primary" @click="updateRemark">确 定</el-button>
                </div>
            </div>
        </div>

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
export default {
  data() {
    return {
      //获取的下拉菜单数据
      warehouse: [
        {
          warehouseId: "",
          name: "全部",
          childNode: []
        }
      ],
      //仓-----
      stockId: 0, //出库或入库id 出库0 入库1
      wareAreaId: 0, //区
      sendTime: "", //变动时间
      changeReason:[],//变动原因
      // 搜索数据-----
      searchData: {
        productName: "", //商品
        productNormName: "", //规格
        sku: "", //商品sku
        // state: "", //变动类型
        warehouseId: "", //仓库分区ID
        reason: "", //变动原因
        orderId: "", //关联单号
        name: "", //关系人
        expressCode: "", //运单号
        startDate: "", //变动时间（开始）
        endDate: "", //变动时间（结束）
        pageStart: 1, //页码
        pageSize: 10 //每页数量
      },
      // 列表数据----
      listData: [],
      // 查看明细-----
      goodsList: [],
      total:0,
      // 明细弹框------
      shipBombBoxShow: false, //明细弹框显示与否
      // 备注弹框------
      stockRemarkShow: false, //备注弹框
      editInfo: "", //备注内容
      editStockId: "", //备注id
    };
  },
  watch: {
    //   变动时间格式修改
    sendTime(curVal, oldVal) {
      //   console.log(curVal[0],curVal[1],curVal)
      if (curVal == "" || curVal == null) {
        this.searchData.startDate = "";
        this.searchData.endDate = "";
      } else {
        this.searchData.startDate = this.time(curVal[0]);
        this.searchData.endDate = this.time(curVal[1]);
      }
      //   console.log(this.searchData.startDate+'=='+this.searchData.endDate)
    }
  },

  //   created() {
  //     this.getWarehouse(); //获取仓库
  //     this.getStockData(0);//获取出库列表数据
  //   },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getWarehouse(); //获取仓库
      vm.getStockData(0);//获取出库列表数据
    });
  },

  methods: {
    // 点击页码获取相应列表数据
    handleCurrentChange(val) {
      this.searchData.pageStart = val;
      this.getSearchData(this.stockId);
    },
    // 登录超时,去登陆页
    goLogin(){
      this.$message({
        message: "登录超时，请重新登录",
        type: "warning",
        onClose:()=>{
          this.$router.push({path:'/login'})
        }
      });
    },

    // 获取仓库
    getWarehouse() {
      this.$indexServer.getWarehouse().then(res => {
        if (res.data.code == 200) {
          // this.warehouse = res.data.data.warehouse;
          this.warehouse = res.data.data;
        } else if(res.status == 302){
          this.goLogin()          
        }
      });
    },
    // 获取变动原因
    getReason(id){
      if(id == 0){//出库原因
        this.$indexServer.getOutReason().then(res=>{
          if(res.data.code == 200){
            this.changeReason = res.data.data
          } else if(res.status == 302){
            this.goLogin()          
          }
        })
      }else if(id == 1){//入库原因
        this.$indexServer.getInReason().then(res=>{
          if(res.data.code == 200){
            this.changeReason = res.data.data
          } else if(res.status == 302){
            this.goLogin()          
          }
        })
      }
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
    // 出入库获取列表数据
    getStockData(n) {
      this.sendTime = '';
      this.searchData = {
        productName: "", //商品
        productNormName: "", //规格
        sku: "", //商品sku
        // state: "", //变动类型
        warehouseId: "", //仓库分区ID
        reason: "", //变动原因
        orderId: "", //关联单号
        name: "", //关系人
        expressCode: "", //运单号
        startDate: "", //变动时间（开始）
        endDate: "", //变动时间（结束）
        pageStart: 1, //页码
        pageSize: 10 //每页数量
      };
      if (n == 0) {
        //出库记录列表
        this.stockId = 0;
        this.getSearchData(0);
        this.getReason(0)
      } else if (n == 1) {
        //入库记录列表
        this.stockId = 1;
        this.getSearchData(1);
        this.getReason(1)        
      }
    },
    // 搜索获取列表数据
    getSearchData(id) {
      var _this = this;
      if (id == 0) {
        //出库记录列表搜索
        this.$indexServer.stockOutList(_this.searchData).then(res => {
          if (res.data.code == 200) {
            this.listData = res.data.data;
            this.total = res.data.total
          } else if(res.status == 302){
            this.goLogin()          
          }
        });
      } else if (id == 1) {
        //入库记录列表搜索
        this.$indexServer.stockInList(_this.searchData).then(res => {
          if (res.data.code == 200) {
            this.listData = res.data.data;
            this.total = res.data.total            
          } else if(res.status == 302){
            this.goLogin()          
          }
        });
    }},
    // 查看明细
    getProductGoods(id) {
      this.$indexServer.getproductGoodsByStockId(id).then(res => {
        if (res.data.code == 200) {
          // this.goodsList = res.data.data.productGoods;
          this.goodsList = res.data.data;
          this.shipBombBoxShow = true;
        } else if(res.status == 302){
          this.goLogin()          
        }
      });
    },
    // 双击备注操作
    dbclickEdit(remark, id) {
      this.editInfo = remark;
      this.editStockId = id;
      this.stockRemarkShow = true;
    },
    // 修改备注
    updateRemark() {
      // console.log(this.editInfo)
      var _this = this;
      this.$indexServer
        .updateRemark( _this.editStockId,_this.editInfo)
        .then(res => {
          if (res.data.code == 200) {
            // 提交成功
            this.stockRemarkShow = false;
            this.getSearchData(this.stockId);
          } else if(res.status == 302){
            this.goLogin()          
          }
        });
    }
}
}
</script>

<style scoped>
.shipments {
  min-width: 1024px;
}
.select .active {
  background: #20a0ff;
  color: #fff;
}
.handle-box {
  margin-bottom: 20px;
}
.handle-select {
  width: 120px;
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
  font-size: 12px;
  color: rgb(0, 1, 32);
  word-wrap : break-word
}

.ship_table th {
  background-repeat: repeat-x;
  height: 50px;
  font-size: 14px;
}
.ship_table .stockTabel_edit {
  background: url("./edit.png") no-repeat right;
  background-size: 30px;
  text-align: left;
  padding-right: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
}
.box_close{
  width:14%;
  text-align: center;
  cursor:pointer;
  float: right;
  margin-right: -5.5%;
  /* transition: all 0.5s */
}
.box_close:hover{
  background: #fb654e;
  color: #fff
}
.ship_bombBox,
.stock_remark {
  border: 1px solid #e9eaea;
  width: 30%;
  background-color: #fff;
  position: absolute;
  top: 25%;
  left: 40%;
}
.stock_remark textarea {
  width: 90%;
  height: 150px;
  margin: 10px auto 10px;
  display: block;
  outline: none;
  padding: 10px;
  box-sizing: border-box;
  resize: none;
}
.ship_bombBox .ship_con {
  max-height: 350px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
