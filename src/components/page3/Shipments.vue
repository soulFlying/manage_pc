<template>
    <div class="shipments">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 全部发货</el-breadcrumb-item>
                <el-breadcrumb-item></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-form :inline="true">
                <el-form-item label="关联单号：">
                    <el-input v-model="searchData.orderId" class="handle-select mr10" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="商品：">
                    <el-input v-model="searchData.productName" class="handle-select mr10" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="规格：">
                    <el-input v-model="searchData.productNormName" class="handle-select mr10" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="商品sku：">
                    <el-input v-model="searchData.sku" class="handle-select mr10" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-select v-model="searchData.state" placeholder="请选择" class="handle-select mr10">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="待发货" value="0"></el-option>
                        <el-option label="已发货" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发货仓库：">
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
                    <el-option v-for="(item,index) in outReason" :label="item.value" :value="item.key"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="收货人：">
                    <el-input v-model="searchData.name" class="handle-select mr10" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="运单号：">
                    <el-input v-model="searchData.expressCode" class="handle-select mr10" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="发货时间：">
                    <el-date-picker
                        v-model="sendTime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker> 
                </el-form-item>
                <el-form-item label="拣货人：">
                    <el-input v-model="searchData.operatorName" class="handle-select mr10" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="拣货时间：">
                    <el-date-picker
                        v-model="pickTime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间">
                    </el-date-picker>                
                </el-form-item>        
                <el-button type="primary" icon="search" @click="getData">搜索</el-button>
            </el-form>
        </div>
        <!-- 列表 -->
        <div class="list">
          <table width="100%" class="ship_table">
              <tr style="background-color: #F5F6FA">
                  <th style="width:40px;">序号</th>
                  <th>关联单号</th>
                  <th>商品</th>
                  <th>商品sku</th>
                  <th>商品数量</th>
                  <th>状态</th>
                  <th>发货仓库</th>
                  <th>变动原因</th>
                  <th style="width:160px">收货人信息</th>
                  <th>邮递信息</th>
                  <th style="width:90px">发货时间</th>
                  <th>拣货人</th>
                  <th style="width:90px">拣货时间</th>
              </tr>
              <tr style="height:69px" v-for="(item,index) in listData">
                  <td>{{(index+1)+(searchData.pageStart-1)*10}}</td>
                  <td>{{item.orderId}}</td>
                  <td style="text-align:left">产品名：{{item.productName}}<br />规格：{{item.productNormName}}</td>
                  <td>{{item.sku}}</td>
                  <td style="color:#5200FF;text-decoration:underline;cursor:pointer" @click="getProductGoods(item.id)">{{item.num}}</td>
                  <td>{{item.stateDesc}}</td>
                  <td style="text-align:left">仓位：{{item.warehouse }}<br />地址：{{item.warehouseAddress}}</td>
                  <td>{{item.reason}}</td>
                  <td style="text-align:left">{{item.name}}，{{item.phone}}，{{item.address}}</td>
                  <td style="text-align:left" v-if="item.stateDesc==='已发货'">快递：{{item.expressTypeDesc}}<br />运单号：<a style="color:#5200FF">{{item.expressCode}}</a></td>                    
                  <td v-else>——</td>
                  <td v-if="item.stateDesc==='已发货'">{{item.updateTime}}</td>
                  <td v-else>——</td>
                  <td style="text-align:left">姓名：{{item.operator.name}}<br />电话：{{item.operator.phone}}</td>
                  <td>{{item.createTime }}</td>
              </tr>
          </table>
        </div>
        <!-- 弹框 -->
        <div class="box" v-show="shipBombBoxShow">
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
      ], //仓
      wareAreaId: 0, //区
      sendTime: "", //发货时间
      pickTime: "", //拣货时间
      outReason:[],//出库原因
      // 搜索数据
      searchData: {
        orderId: "", //关联单号
        productName: "", //商品
        productNormName: "", //规格
        sku: "", //商品sku
        state: "", //状态
        warehouseId: "", //仓库分区ID
        reason: "", //变动原因
        name: "", //收货人
        expressCode: "", //运单号
        startDate: "", //发货时间（开始）
        endDate: "", //发货时间（结束）
        operatorName: "", //拣货人
        sendStartDate: "", //拣货时间(开始)
        sendendDate: "", //拣货时间(结束)
        pageStart: 1, //页码
        pageSize: 10 //每页数量
      },
      // 列表数据
      listData: [],
      total:0,//所有数据总数
      shipBombBoxShow: false,//弹框显示与否
      goodsList:[],//弹框明细
    };
  },
//   created() {
//     this.getData();
//   },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getData(); //获取列表数据
      vm.getWarehouse(); //获取仓库
      vm.getReason();//获取变动原因
    });
  },
  watch: {
    sendTime(curVal, oldVal) {
        // console.log(curVal)
      if (curVal == "" || curVal == null) {
        this.searchData.startDate = "";
        this.searchData.endDate = "";
      } else if(curVal.length != 0){
        this.searchData.startDate = this.time(curVal[0]);
        this.searchData.endDate = this.time(curVal[1]);
      }
      console.log(this.searchData.startDate+'=='+this.searchData.endDate)
    },
    pickTime(curVal, oldVal) {
      if (curVal == "" || curVal == null) {
        this.searchData.sendStartDate = "";
        this.searchData.sendendDate = "";        
      } else  if(curVal.length != 0){
        this.searchData.sendStartDate = this.time(curVal[0]);
        this.searchData.sendendDate = this.time(curVal[1]);
      }
      console.log(this.searchData.sendStartDate+'=='+this.searchData.sendendDate)
    }
  },

  methods: {
     // 点击页码获取相应列表数据
    handleCurrentChange(val) {
      this.searchData.pageStart = val;
      console.log(val)
      this.getData(this.stockId);
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
    getReason(){
      this.$indexServer.getOutReason().then(res=>{
        if(res.data.code == 200){
          this.outReason = res.data.data
        } else if(res.status == 302){
          this.goLogin()          
        }
      })
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
    // 获取列表数据
    getData() {
      this.$indexServer.deliverGoodsList(this.searchData).then(res => {
        if (res.data.code == 200) {
          // this.listData = res.data.data.sendGoodsRecord;
          this.listData = res.data.data;
          this.total = res.data.total
        } else if(res.status == 302){
          this.goLogin()          
        }
      });
    },
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
  }
};
</script>

<style scoped>
.shipments {
  min-width: 1024px;
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
/* .list{
  min-width: 1500px;   
} */
.ship_table{
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
  color:#fff
}
.ship_bombBox {
  border: 1px solid #e9eaea;
  width: 30%;
  background-color: #fff;
  position: absolute;
  top: 25%;
  left: 40%;
}
.ship_bombBox .ship_con {
  max-height: 350px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
