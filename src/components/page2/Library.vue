<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 库存管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品出库</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="formArr" :model="formArr" label-width="100px" :inline='true' :rules="rules">
                <el-form-item label="产品：" prop="cateTreeId">
                    <el-select @change='clearId()' v-model="formArr.cateTreeId" placeholder="请选择产品分类" style='width: 180px'>
                        <el-option v-for="(item,index) in cateTree" :key="item.value" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="productId">
                    <el-select @change='getProductColor()' v-model="formArr.productId" placeholder="请选择产品" style='width: 220px'>
                        <el-option v-for="(item,index) in cateTreeChild" :key="item.value" :label="item.name" :value="item.productId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="规格：" label-width="64px" prop="normAttrId">
                    <el-select @change='getProductSku()' v-model="formArr.normAttrId" placeholder="请选择商品规格" style='width: 231px'>
                        <el-option v-for="(item,index) in productColor" :key="item.value" :label="item.name" :value="item.productNormAttrId"></el-option>
                    </el-select>
                </el-form-item>
                    <div class='box-top'>
                        <label>商品SKU：</label><input v-model='productSku' readonly/>
                    </div>
                <el-form-item label="出库仓库：" prop="warehouseId">
                    <!--<el-select @change="formArr.warehouseId=''" v-model="wareAreaId" placeholder="请选择" class="handle-select" style='width: 150px'>
                        <el-option v-for="(item,index) in warehouse" :key="item.value" :label="item.name" :value="index"></el-option>
                    </el-select>-->
                    <el-select v-model="formArr.warehouseId" placeholder="请选择仓库分区" class="handle-select2" style='width: 305px'>
                        <el-option v-for="(item,index) in warehouse[wareAreaId].childNode" :key="item.value" :label="item.name" :value="item.warehouseId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出库原因：" label-width='93px' prop="reason">
                    <el-select v-model="formArr.reason" placeholder="请选择出库原因" style='width: 312px'>
                        <el-option v-for='(item,index) in outReason' :key='item.key' :label="item.value" :value='item.key'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关系人信息：" class='related' style='display: block'></el-form-item>
                <el-form-item label="姓名：" prop="name" >
                    <el-input v-model="formArr.name" placeholder="请输入关系人姓名" style='width: 305px'></el-input>
                </el-form-item>
                <el-form-item label="电话：" prop="phone" label-width='67px'>
                    <el-input v-model="formArr.phone" placeholder="请输入关系人电话或手机号码" style='width: 338px'></el-input>
                </el-form-item>
                <el-form-item label="关联单号：" prop="orderId">
                    <el-input v-model="formArr.orderId" placeholder="请输入关联单号" style='width:730px'></el-input>
                </el-form-item>
                <el-form-item label="地址：" prop="address">
                    <el-input v-model="formArr.address" placeholder="请输入关系人地址" style='width: 730px'></el-input>
                </el-form-item>
                <el-form-item label="备注：" style='height: 100px'>
                    <textarea v-on:focus="onFocus" v-on:blur="onBlur" v-model="formArr.remark" id='txt' placeholder="不能超过300字哦~"></textarea>
                    <p class='remark_remain' ref='remark_remain' v-show='showRestWords'>剩余{{remakChange(formArr.remark)}}字符</p>
                </el-form-item>
                <div class='box_scan'>
                    <el-form-item prop="sn" label="商品SN录入：" label-width='112px'>
                        <input value="默认扫码录入，请连接扫码枪，进行扫码录入。" readonly/>
                    </el-form-item>
                    <v-table
                    is-horizontal-resize
                    style="width:33%;margin-left:100px;margin-top:30px"
                    :columns="columns"
                    :table-data="tableData"
                    row-hover-color="skyblue"
                    :cell-edit-done="cellEditDone"
                    title-bg-color='#f4f4f4'
                    >
                    </v-table>
                    <i @click="up()">+</i>
                </div>
                <el-form-item style='margin-left: 283px'>
                    <el-button style='width: 120px' @click="resetForm('formArr')">取消</el-button>
                    <el-button type="primary" @click="onSubmit('formArr')" style='width: 120px'>完成出库</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
export default {
    components: { ElFormItem },
    data: function () {
        return {
            id: '1',
            tableData: [
                { "id": "1", "sn": "" },
                // { "id": "2", "sn": "" },
                // { "id": "3", "sn": "" },
                // { "id": "4", "sn": "" },
                // { "id": "5", "sn": "" },
                // { "id": "6", "sn": "" },
                // { "id": "7", "sn": "" },
                // { "id": "8", "sn": "" },
                // { "id": "9", "sn": "" },
                // { "id": "10", "sn": "" },
            ],
            columns: [
                {                    field: 'id', title: '序号', width: 80, titleAlign: 'center', columnAlign: 'center',
                    formatter: function (rowData, rowIndex, pagingIndex, field) {
                        this.rowIndex = rowIndex
                        return `<span class='cell-edit-color'>${rowData[field]}</span>`;
                    }, isResize: true                },
                { field: 'sn', title: '商品SN码', width: 150, titleAlign: 'center', columnAlign: 'center', isEdit: true, isResize: true }
            ],
            formArr: {
                productGoodId: '', //货品id
                warehouseId: '',   //仓库分区id
                reason: '',        //出库原因
                orderId: '',       //关联单号
                name: '',          //关系人
                phone: '',         //电话
                address: '',       //地址
                remark: '',        //备注
                sn: [],             //商品SN码(数组)
                cateTreeId: '',     //产品一级id
                productId: '',       //产品二级id
                normAttrId: '',      //属性id(颜色)
            },
            cateTree: '',               //产品种类
            cateTreeChild: '',          //产品
            productColor: '',       　　　//产品规格（颜色）
            productSku: '请先选择产品',            //sku
            warehouse: [
                {
                    warehouseId: "",
                    name: "",
                    childNode: []
                }
            ],                     //获取的仓库下拉菜单数据
            wareAreaId: 0,         //仓库分区ID
            rules: {
                cateTreeId: [
                    { required: true, message: '请选择产品分类', trigger: 'change' }],  //产品必选验证
                productId: [
                    { required: true, message: '请选择产品', trigger: 'change' }],   //产品必选验证
                normAttrId: [{ required: true, message: '请选择产品规格', trigger: 'change' }], //属性必选验证
                warehouseId: [{ required: true, message: '请选择仓库分区', trigger: 'change' }],  //仓库分类验证
                reason: [{ required: true, message: '请选择出库原因', trigger: 'change' }],  //出库原因必选验证
                name: [{ required: true, message: '请输入关系人姓名', trigger: 'blur' },
                { max: 10, message: '姓名不能超过10个字符', trigger: 'blur' }],  //关系人-姓名验证
                phone: [{ required: true, message: '请输入关系人电话', trigger: 'blur' },
                { max: 13, message: '电话不能超过13个字符', trigger: 'blur' }],  //关系人-电话验证
                orderId: [{ required: true, message: '请输入关联单号', trigger: 'blur' },
                { max: 30, message: '姓名不能超过30个字符', trigger: 'blur' }],  //关联单号验证
                address: [{ required: true, message: '请输入关系人地址', trigger: 'blur' },
                { max: 50, message: '姓名不能超过50个字符', trigger: 'blur' }],  //关系人-地址验证
                sn: [{ required: true, message: '请录入商品sn', trigger: 'blur' }]  //sn
            },
            restWord: 300,        //备注剩余的字数
            showRestWords: false,  //是否显示剩余字数提示
            outReason: '',           //出库原因
            errRaminder: ''           //402错误提示
        }
    },
    /*beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.getProductType() //获取产品分类
            vm.getWarehouse()　　//获取仓库下拉
        });
    },*/
    watch: {
        // 监听备注剩余字数的变化
        restWord: function () {
            let txt = document.getElementById('txt')
            if (this.restWord > 0) {
                txt.style.borderColor = '#409EFF'
                this.$refs.remark_remain.style.color = '#409EFF'
            } else {
                txt.style.borderColor = '#f56c6c'
                this.$refs.remark_remain.style.color = '#f56c6c'
                this.formArr.remark = this.formArr.remark.substr(0, 300)
            }
        }
    },
    created() {
        this.getProductType() //获取产品分类
        this.getWarehouse()　　//获取仓库下拉
        this.getOutReasons()  //获取出库原因
    },
    mounted() {
    },
    methods: {
        // 单元格编辑回调
        cellEditDone(newValue, oldValue, rowIndex, rowData, field) {
            console.log(oldValue.sn, rowData, rowIndex, field)
            this.tableData[rowIndex][field] = newValue;

            // if (oldValue.sn !== '') {
            //     this.SN.splice(oldValue.sn, 1)
            // }
            this.formArr.sn.map((user, index) => {
                if (user == newValue) {
                    this.$message({
                        showClose: true,
                        message: '您输入的SN码重复了,请重新输入！',
                        type: 'warning'
                    });
                    // this.formArr.sn.pop(user)
                    this.tableData[rowIndex][field] = ''
                }
            })
            if (this.tableData[rowIndex].sn !== '') {
                this.formArr.sn.push(this.tableData[rowIndex].sn)
                console.log(this.formArr.sn)

            }

            // 接下来处理你的业务逻辑，数据持久化等...
        },
        //获取产品分类
        getProductType() {
            let _this = this
            _this.$indexServer.getCateTree().then(res => {
                if (res.status == 302) {
                    _this.errorFrame()
                    return false
                }
                if (res.data.code == 200) {
                    _this.cateTree = res.data.data
                }
            });
        },
        //获取产品分类
        getCateTreeChild() {
            let _this = this
            _this.$indexServer.getProductsByCateId(_this.formArr.cateTreeId).then(res => {
                if (res.status == 302) {
                    _this.errorFrame()
                    return false
                }
                if (res.data.code == 200) {
                    _this.cateTreeChild = res.data.data
                }
            });
        },
        //获取产品规格
        getProductColor() {
            let _this = this
            _this.formArr.normAttrId = ''
            _this.productSku = '请先选择产品'
            _this.$indexServer.getAttrsByProductId(_this.formArr.productId).then(res => {
                if (res.status == 302) {
                    _this.errorFrame()
                    return false
                }
                if (res.data.code == 200) {
                    _this.productColor = res.data.data
                }
            });
        },
        //根据商品id和属性id获取sku
        getProductSku() {
            let _this = this
            _this.productSku = '请先选择产品'
            _this.$indexServer.getProductGood(_this.formArr.productId, _this.formArr.normAttrId).then(res => {
                if (res.status == 302) {
                    _this.errorFrame()
                    return false
                }
                if (res.data.code == 200) {
                    _this.productSku = res.data.data.sku
                    _this.formArr.productGoodId = res.data.data.productGoodId
                }
            });
        },
        // 清除二级和规格下拉的默认选项
        clearId() {
            this.formArr.productId = ''
            this.formArr.normAttrId = ''
            this.getCateTreeChild()
            this.productSku = '请先选择产品'
        },
        //获取仓库下拉
        getWarehouse() {
            this.$indexServer.getWarehouse().then(res => {
                if (res.status == 302) {
                    this.errorFrame()
                    return false
                }
                if (res.data.code == 200) {
                    this.warehouse = res.data.data
                }
            });
        },
        //获取出库原因
        getOutReasons() {
            let _this = this
            _this.$indexServer.getOutReason().then(res => {
                if (res.status == 302) {
                    _this.errorFrame()
                    return false
                }
                if (res.data.code == 200) {
                    _this.outReason = res.data.data
                }
            });
        },
        // 监控备注文本变化
        remakChange(n) {
            this.restWord = 300 - (n.length)
            return this.restWord
        },
        // 备注获取焦点
        onFocus() {
            let txt = document.getElementById('txt')
            if (this.restWord > 0) {
                txt.style.borderColor = '#409EFF'
            } else {
                txt.style.borderColor = '#f56c6c'
            }
            this.showRestWords = true
        },
        // 备注失去焦点
        onBlur() {
            let txt = document.getElementById('txt')
            txt.style.borderColor = '#67C23A'
            this.showRestWords = false
        },
        up() { //升级
            this.id++
            this.tableData.push({ "id": this.id, "sn": "" })

        },
        // 出库
        goodOut() {
            let _this = this
            let sn = this.tableData.map((user) => {
                return user.sn
            })
            _this.formArr.sn = []
            sn.map((user) => {
                if (user !== '') {
                    _this.formArr.sn.push(user)
                }
            })
            _this.$indexServer.goodsOut(_this.formArr.productGoodId, _this.formArr.warehouseId, _this.formArr.reason,
                _this.formArr.orderId, _this.formArr.name, _this.formArr.phone, _this.formArr.address, _this.formArr.remark, _this.formArr.sn)
                .then(res => {
                    if (res.status == 302) {
                        _this.errorFrame()
                        return false
                    }
                    if (res.data.code == 200) {
                        _this.formArr.sn = []
                        _this.open6()

                    } else if (res.data.code == 402) {
                        let errorStatus = res.data.data
                        _this.errRaminder = ''
                        if (errorStatus.repeatSn.length > 0) {
                            _this.errRaminder += 'SN码：'+errorStatus.repeatSn + '重复<br/>'
                        }
                        if (errorStatus.noWarhouseSn.length > 0) {
                            _this.errRaminder += 'SN码：'+errorStatus.noWarhouseSn + '不在所选仓库区内<br/>'
                        }
                        if (errorStatus.notExistsSn.length > 0) {
                            _this.errRaminder += 'SN码：'+errorStatus.notExistsSn + '不存在库存中<br/>'
                        }
                        if (errorStatus.noProductGoodSn.length > 0) {
                            _this.errRaminder += 'SN码：'+errorStatus.noProductGoodSn + '不符合所选货品类型<br/>'
                        }
                        if (errorStatus.hasOutSn.length > 0) {
                            _this.errRaminder += 'SN码：'+errorStatus.hasOutSn + '已出库<br/>'
                        }
                        _this.open8(_this.errRaminder)

                    } else {
                        _this.open8(res.data.msg)

                    }
                });
        },
        //完成出库，提交
        onSubmit(formName) {
            let _this = this
            let txt = document.getElementById('txt')
            txt.style.borderColor = '#67C23A'
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.goodOut()
                } else {
                    return false;
                }
            });
        },
        // 取消按钮
        resetForm(formName) {
            this.$confirm('请确认是否取消出库？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                callback: (action, instance) => {
                    if (action === 'confirm') {
                        this.$refs[formName].resetFields();
                        this.$router.push({ path: '/Stock' })
                    }
                }
            }).then(() => {
                this.$message({
                    type: 'success'
                });
            }).catch(() => {
                this.$message({
                    type: 'info'
                });
            });
        },
        // 成功提示框
        open6() {
            let _this = this
            _this.$message({
                showClose: true,
                message: '提交成功！',
                type: 'success',
                onClose: function () {
                    _this.$router.push({ path: '/Stock' })
                }
            });
        },
        // 失败提示框
        open8(str) {
            this.$message({
                showClose: true,
                message: str,
                type: 'error',
                dangerouslyUseHTMLString: true,
            });
        },
        //错误提示框
        errorFrame() {
            let _this = this
            _this.$message({
                showClose: true,
                message: '登录超时，请重新登录！',
                type: 'warning',
                onClose: () => {
                    _this.$route.push({ path: '/login' })
                }
            });
        }
    }
}
</script>
<style scoped>
.box-top {
  font-size: 14px;
  color: #48576a;
  margin-bottom: 22px;
}
.box-top label {
  display: inline-block;
  width: 100px;
  padding: 11px 12px 11px 0;
  text-align: right;
}
.box-top input {
  padding: 3px 10px;
  height: 30px;
  line-height: 30px;
  min-width: 300px;
  margin-right: 20px;
  border: none;
  color: #1f2d3d;
  font-size: 14px;
}
.form-box {
  width: 850px;
}
.box_scan {
  font-size: 14px;
  width: 100%;
  overflow: hidden;
  margin-bottom: 22px;
}
.box_scan label {
  display: inline-block;
  margin-right: 12px;
}
.box_scan input {
  display: inline-block;
  border: none;
  width: 300px;
  color: #f56c6c;
}
.box_scan i {
  background: #409eff;
  color: #fff;
  font-size: 20px;
  padding: 0 10px;
  text-align: center;
  display: inline-block;
  display: block;
  position: absolute;
  left: 450px;
  margin-top: -30px;
  border-radius: 4px;
  cursor: pointer;
}
.remark_remain {
  color: #409eff;
  font-size: 12px;
  line-height: 12px;
  margin-top: -10px;
}
textarea {
  line-height: 18px;
  height: 100px;
  width: 730px;
  border-radius: 4px;
  border: 1px solid #cacdd5;
  font-size: 14px;
  color: #606266;
  outline: none;
  padding: 5px 10px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  outline: none;
}
.v-table-class {
  margin-top: 0 !important;
}
</style>
