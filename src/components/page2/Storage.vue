<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 库存管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品入库</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='storage_step'>
            <div :class="step==1 ? 'step_1 now':'step_1'" @mouseenter='step = 1' >第一步：基本信息</div>
            <div :class="step==2 ? 'step_2 now':'step_2'" @click = "onSubmit('formArr')" @mouseenter='step = 2' @mouseleave='step = 1'>第二步：商品录入</div>
        </div>
        <div class="form-box">
            <el-form ref="formArr" :model="formArr" label-width="100px" :inline='true' :rules="rules">
                <el-form-item label="产品：" prop="cateTreeId">
                    <el-select @change='clearId()' v-model="cateTreeValue" placeholder="请选择产品分类" style='width: 180px'>
                        <el-option v-for="(item,index) in cateTree" :key="item.value" :label="item.name" :value="item.id+'/'+item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="productId">
                    <el-select @change='getProductColor()' v-model="productValue" placeholder="请选择产品" style='width: 220px'>
                        <el-option v-for="(item,index) in cateTreeChild" :key="item.value" :label="item.name" :value="item.productId+'/'+item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="规格：" label-width="64px" prop="normAttrId">
                    <el-select @change='getProductSku()' v-model="normAttrValue" placeholder="请选择商品规格" style='width: 231px'>
                        <el-option v-for="(item,index) in productColor" :key="item.value" :label="item.name" :value="item.productNormAttrId+'/'+item.name"></el-option>
                    </el-select>
                </el-form-item>
                <div class='box-top'>
                    <label>商品SKU：</label><input v-model='productSku' readonly/>
                </div>
                <el-form-item label="入库仓库：" prop="warehouseId">
                    <!--<el-select @change="getWareArea" v-model="wareAreaValue" placeholder="请选择" class="handle-select" style='width: 150px'>
                        <el-option v-for="(item,index) in warehouse" :key="item.value" :label="item.name" :value="index+'/'+item.name"></el-option>
                    </el-select>-->
                    <el-select @change="getWarehouseId" v-model="warehouseValue" placeholder="请选择仓库分区" class="handle-select2" style='width: 305px'>
                        <el-option v-for="(item,index) in warehouse[wareAreaId].childNode" :key="item.value" :label="item.name" :value="item.warehouseId+'/'+item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="入库原因：" label-width='93px' prop="reason">
                    <el-select v-model="formArr.reason" placeholder="请选择入库原因" style='width: 312px'>
                        <el-option v-for='(item,index) in inReason' :key="item.key" :label="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关系人信息：" class='related' style='display: block'>
                    <p style='color: #f56c6c'>注，录入采购方信息</p>
                </el-form-item>
                <el-form-item label="姓名：" prop="name" >
                    <el-input v-model="formArr.name" placeholder="请输入关系人姓名" style='width: 305px'></el-input>
                </el-form-item>
                <el-form-item label="电话：" prop="phone" label-width='67px'>
                    <el-input v-model="formArr.phone" placeholder="请输入关系人电话" style='width: 338px'></el-input>
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
                <el-form-item style='margin-left: 283px'>
                    <el-button style='width: 120px' @click="resetForm('formArr')">取消</el-button>
                    <el-button type="primary" @click="onSubmit('formArr')" style='width: 120px'>完成，下一步</el-button>
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
                formArr: {
                    productGoodId: '', //货品id
                    warehouseId: '',   //仓库分区id
                    reason: '',        //出库原因
                    orderId: '',       //关联单号
                    name: '',          //关系人
                    phone: '',         //电话
                    address: '',       //地址
                    remark: '',        //备注
                    cateTreeId: '',     //产品一级id
                    productId: '',       //产品二级id
                    normAttrId: '',      //属性id(颜色)
                },
                cateTree: '',               //产品种类
                cateTreeChild: '',          //产品
                productColor: '',       　　　//产品规格（颜色）
                productSku: '请先选择产品',            //sku
                inReason:'',                 //入库原因
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
                    reason: [{ required: true, message: '请选择入库原因', trigger: 'change' }],  //出库原因必选验证
                    name: [{ max: 10, message: '姓名不能超过10个字符', trigger: 'blur' }],  //关系人-姓名验证
                    phone: [{ max: 13, message: '电话不能超过13个字符', trigger: 'blur' }],  //关系人-电话验证
                    orderId: [{ max: 30, message: '姓名不能超过30个字符', trigger: 'blur' }],  //关联单号验证
                    address: [{ max: 50, message: '姓名不能超过50个字符', trigger: 'blur' }]  //关系人-地址验证
                },
                restWord: 300,        //备注剩余的字数
                showRestWords: false,  //是否显示剩余字数提示
                cateTreeValue: '',      //产品一级id/name
                productValue: '',       //产品二级id/name
                normAttrValue: '',      //产品规格id/name
                wareAreaValue: '',      //仓库分类id/name
                warehouseValue: '',     //仓库分区id/name
                sendForm: {
                    s_product1: '',  //产品一级
                    s_product2: '',  //产品二级
                    s_color: '',     //产品规格
                    s_sku: '',        //产品sku
                    s_warehouse1: '',  //产品仓库一级
                    s_warehouse2: '',  //产品仓库二级
                    s_reson: '',         //入库原因
                    s_productGoodId: '',   //货品id
                    s_warehouseId: '',     //仓库分区id
                    s_name: '',            //姓名
                    s_phone: '',           //电话
                    s_address: '',         //地址
                    s_orderId:'',          //订单关联号
                    s_remark: ''           //备注
                },           //传值
                step:1
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.step = 1
                if (from.path != '/StorageM') {
                    vm.$refs['formArr'].resetFields()
                    vm.cateTreeValue = ''
                    vm.productValue = ''
                    vm.normAttrValue = ''
                    vm.productSku = '请先选择产品'
                    vm.warehouseValue = ''
                    vm.formArr.reason = ''
                    vm.formArr.name = ''
                    vm.formArr.phone = ''
                    vm.formArr.orderId = ''
                    vm.formArr.address = ''
                    vm.formArr.remark = ''
                    document.getElementById('txt').style.borderColor = '#cacdd5'
                }
            })
            /*next(vm => {
                vm.getProductType() //获取产品分类
                vm.getWarehouse()　　//获取仓库下拉
            });*/
        },
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
        created(){
            this.getProductType() //获取产品分类
            this.getWarehouse()　　//获取仓库下拉
            this.getInReasons()  //获取入库原因

        },
        mounted() {
        },
        methods: {
            //获取产品分类
            getProductType() {
                let _this = this
                _this.$indexServer.getCateTree().then(res => {
                    if (res.data.code == 200) {
                        _this.cateTree = res.data.data
                    }
                    if (res.status == 302) {
                        _this.errorFrame()
                        return false
                    }
                });
            },
            //获取产品分类
            getCateTreeChild() {
                let _this = this
                _this.$indexServer.getProductsByCateId(_this.formArr.cateTreeId).then(res => {
                    if (res.data.code == 200) {
                        _this.cateTreeChild = res.data.data
                    }
                    if (res.status == 302) {
                        _this.errorFrame()
                        return false
                    }
                });
            },
            //获取产品规格
            getProductColor() {
                let _this = this
                _this.formArr.normAttrId = ''
                this.formArr.productId = this.productValue.split('/')[0]
                _this.$indexServer.getAttrsByProductId(_this.formArr.productId).then(res => {
                    if (res.data.code == 200) {
                        _this.productColor = res.data.data
                    }
                    if (res.status == 302) {
                        _this.errorFrame()
                        return false
                    }
                });
            },
            //根据商品id和属性id获取sku
            getProductSku() {
                let _this = this
                _this.formArr.normAttrId = _this.normAttrValue.split('/')[0]
                _this.$indexServer.getProductGood(_this.formArr.productId, _this.formArr.normAttrId).then(res => {
                    if (res.data.code == 200) {
                        _this.productSku = res.data.data.sku
                        _this.formArr.productGoodId = res.data.data.productGoodId
                    }
                    if (res.status == 302) {
                        _this.errorFrame()
                        return false
                    }
                });
            },
            // 清除二级和规格下拉的默认选项
            clearId() {
                this.formArr.cateTreeId = this.cateTreeValue.split('/')[0]
                this.formArr.productId = ''
                this.formArr.normAttrId = ''
                this.getCateTreeChild()
            },
            //获取仓库下拉
            getWarehouse() {
                this.$indexServer.getWarehouse().then(res => {
                    if (res.data.code == 200) {
                        this.warehouse = res.data.data
                        this.sendForm.s_warehouse1 = this.warehouse[0].name
                    }
                    if (res.status == 302) {
                        this.errorFrame()
                        return false
                    }
                });
            },
            //获取仓库对应种类的分区
            getWareArea() {
                this.formArr.warehouseId = ''
                this.wareAreaId = this.wareAreaValue.split('/')[0]
            },
            //获取仓库分区id
            getWarehouseId() {
                this.formArr.warehouseId = this.warehouseValue.split('/')[0]
            },
            //获取出库原因
            getInReasons(){
                let _this = this
                _this.$indexServer.getInReason().then(res => {
                    if (res.data.code == 200) {
                        _this.inReason = res.data.data
                    }
                    if (res.status == 302) {
                        _this.errorFrame()
                        return false
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
            //完成入库，下一步
            onSubmit(formName) {
                let _this = this
                let txt = document.getElementById('txt')
                txt.style.borderColor = '#67C23A'
                _this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.sendForm.s_product1 = _this.cateTreeValue.split('/')[1]
                        _this.sendForm.s_product2 = _this.productValue.split('/')[1]
                        _this.sendForm.s_color = _this.normAttrValue.split('/')[1]
                        _this.sendForm.s_warehouse1 = _this.wareAreaValue.split('/')[1]
                        _this.sendForm.s_warehouse2 = _this.warehouseValue.split('/')[1]
                        _this.sendForm.s_sku = _this.productSku
                        _this.sendForm.s_reson = _this.formArr.reason
                        _this.sendForm.s_name = _this.formArr.name
                        _this.sendForm.s_remark = _this.formArr.remark
                        _this.sendForm.s_address = _this.formArr.address
                        _this.sendForm.s_phone = _this.formArr.phone
                        _this.sendForm.s_productGoodId = _this.formArr.productGoodId
                        _this.sendForm.s_warehouseId = _this.formArr.warehouseId
                        _this.sendForm.s_orderId = _this.formArr.orderId
                        /*console.log(JSON.stringify(_this.sendForm))*/
                        _this.$router.push({ path: '/StorageM', query: _this.sendForm })
                    } else {
                        return false;
                    }
                });
            },
            // 取消按钮
            resetForm(formName) {
                this.$confirm('请确认是否取消入库？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: (action, instance) => {
                        if (action === 'confirm') {
                            this.$refs[formName].resetFields()
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
        },
    }
</script>
<style scoped>
    .storage_step {
        overflow: hidden;
        margin-bottom: 22px;
    }
    .storage_step > div {
        font-size: 14px;
        float: left;
        color: #606266;
        border: 1px solid #DDDDDD;
        background: #F4F4F4;
        height: 40px;
        line-height: 40px;
        width: 200px;
        text-align: center;
        cursor: pointer;
    }
    .storage_step .step_1 {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border-right: none;
    }
    .storage_step .now{
        background: #409eff;
        border-color: #409eff;
        color: #fff;
    }
    .storage_step .step_2 {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }
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
        outline: none;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
    }
</style>
