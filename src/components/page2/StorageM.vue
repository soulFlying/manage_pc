<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 库存管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品入库</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='storage_step'>
            <div :class="step==1 ? 'step_1 now':'step_1'" @mouseenter='step = 1' @mouseleave='step = 2' @click = "up">第一步：基本信息</div>
            <div :class="step==2 ? 'step_2 now':'step_2'" @mouseenter='step = 2'>第二步：商品录入</div>
        </div>
        <div class="table_title">
            <div class="title_top">
                <p>产品:&nbsp;3C产品>>{{dataList.s_product1}}>>{{dataList.s_product2}}</p>
                <p class="title_p2">入库仓位:&nbsp;{{dataList.s_warehouse1}}>>{{dataList.s_warehouse2}}</p>
            </div>
            <div class="title_bottom">
                <p>规格:&nbsp;{{dataList.s_color}}</p>
                <p class="title_p2">入库原因:&nbsp;{{dataList.s_reson}}</p>
            </div>
            <div class="title_center">
                  <p>商品SKU:&nbsp;{{dataList.s_sku}}</p>
            </div>
        </div>
        <div class="table_nav">
            <h2>商品SN录入<span>*</span>:</h2>
            <p>默认扫码录入,请连接扫码枪，进行扫码录入。</p>
        </div>
        <div class="table_container">
           <v-table
            is-horizontal-resize
            style="width:23%"
            :columns="columns"
            :table-data="tableData"
            row-hover-color="skyblue"
             :cell-edit-done="cellEditDone"
            title-bg-color='#f4f4f4'
            >
            </v-table>
           <v-table
            is-horizontal-resize
            style="width:23%"
            :columns="columns"
            :table-data="tableData2"
            row-hover-color="skyblue"
             :cell-edit-done="cellEditDone2"
            title-bg-color='#f4f4f4'
           ></v-table>
                <v-table
            is-horizontal-resize
            style="width:23%"
            :columns="columns"
            :table-data="tableData3"
            row-hover-color="skyblue"
             :cell-edit-done="cellEditDone3"
            title-bg-color='#f4f4f4'
           ></v-table>
                <v-table
            is-horizontal-resize
            style="width:23%"
            :columns="columns"
            :table-data="tableData4"
            row-hover-color="skyblue"
             :cell-edit-done="cellEditDone4"
            title-bg-color='#f4f4f4'
           ></v-table>
    </div>
    <div class="table_footer">
        <el-button type="info" plain @click="up">上一步</el-button>
       <el-button type="primary" plain @click="getData">完成入库</el-button>
       <!-- <input type="text" id="input" v-double.32="callback"> -->
    </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            SN: [],
            tableData3: [{ "id": "21", "sn": "" },
            { "id": "22", "sn": "" },
            { "id": "23", "sn": "" },
            { "id": "24", "sn": "" },
            { "id": "25", "sn": "" },
            { "id": "26", "sn": "" },
            { "id": "27", "sn": "" },
            { "id": "28", "sn": "" },
            { "id": "29", "sn": "" },
            { "id": "30", "sn": "" },],
            tableData4: [{ "id": "31", "sn": "" },
            { "id": "32", "sn": "" },
            { "id": "33", "sn": "" },
            { "id": "34", "sn": "" },
            { "id": "35", "sn": "" },
            { "id": "36", "sn": "" },
            { "id": "37", "sn": "" },
            { "id": "38", "sn": "" },
            { "id": "39", "sn": "" },
            { "id": "40", "sn": "" },],
            tableData2: [{ "id": "11", "sn": "" },
            { "id": "12", "sn": "" },
            { "id": "13", "sn": "" },
            { "id": "14", "sn": "" },
            { "id": "15", "sn": "" },
            { "id": "16", "sn": "" },
            { "id": "17", "sn": "" },
            { "id": "18", "sn": "" },
            { "id": "19", "sn": "" },
            { "id": "20", "sn": "" },],
            tableData: [
                { "id": "1", "sn": "" },
                { "id": "2", "sn": "" },
                { "id": "3", "sn": "" },
                { "id": "4", "sn": "" },
                { "id": "5", "sn": "" },
                { "id": "6", "sn": "" },
                { "id": "7", "sn": "" },
                { "id": "8", "sn": "" },
                { "id": "9", "sn": "" },
                { "id": "10", "sn": "" },
            ],
            columns: [
                {                    field: 'id', title: '序号', width: 80, titleAlign: 'center', columnAlign: 'center',
                    formatter: function (rowData, rowIndex, pagingIndex, field) {
                        this.rowIndex = rowIndex
                        return `<span class='cell-edit-color'>${rowData[field]}</span>`;
                    }, isResize: true                },
                { field: 'sn', title: '商品SN码', width: 150, titleAlign: 'center', columnAlign: 'center', isEdit: true, isResize: true }
            ],
            dataList: '',
            resValue: '',
            step: 2
        }
    },
    created() {
        this.fromData();

    },
    directives: {
        double: {
            bind(el, binding) {
                console.log(el, binding)
                let { value, modifiers } = binding
                let keys = Object.keys(modifiers).map(it => parseInt(it))
                document.addEventListener('keypress', (e) => {
                    if (keys.includes(e.keyCode)) {
                        console.log(e.keyCode + '111')
                        console.log(el.step)
                        if (el.step == 1) {
                            console.log('getIn')
                            el.step = 0
                            el.focus()
                            value && value()
                        }
                        el.step = 1
                        setTimeout(() => {
                            el.step = 0
                        }, 300)
                    }
                })
            }
        }

    },
    computed: {

        // data() {
        //     const self = this;
        //     return self.tableData.filter(function (d) {
        //         let is_del = false;
        //         for (let i = 0; i < self.del_list.length; i++) {
        //             if (d.name === self.del_list[i].name) {
        //                 is_del = true;
        //                 break;
        //             }
        //         }
        //         if (!is_del) {
        //             if (d.address.indexOf(self.select_cate) > -1 &&
        //                 (d.name.indexOf(self.select_word) > -1 ||
        //                     d.address.indexOf(self.select_word) > -1)
        //             ) {
        //                 return d;
        //             }
        //         }
        //     })
        // },

    },

    methods: {
        reson() { // 字符方法
            let reson = this.dataList.s_reson

            console.log(reson)
            switch (reson) {
                case '采购入库':
                    this.resValue = 0;
                    break;
                case '商品退货入库':
                    this.resValue = 1;
                    break;
                case '商品返修入库':
                    this.resValue = 2;
                    break;
                case '商品换货入库':
                    this.resValue = 3;
                    break;
                case '其他原因入库':
                    this.resValue = 4
                    break;

            }
            console.log(this.resValue)
        },
        // 单元格编辑回调
        cellEditDone(newValue, oldValue, rowIndex, rowData, field) {
            this.tableData[rowIndex][field] = newValue;
            console.log(oldValue.sn, rowData, rowIndex, field)
            if (this.SN) {
                this.SN.map((user, index) => {
                    if (user == newValue) {
                        this.$message({
                            showClose: true,
                            message: '您输入的SN码重复了,请重新输入！',
                            type: 'warning'
                        });
                        if (user !== oldValue) {
                            this.tableData[rowIndex][field] = ''

                        } else {
                            this.SN.pop(user)
                        }
                    }
                })
            }
            this.getSn()

            // if (this.tableData[rowIndex].sn !== '') {
            //     this.SN.push(this.tableData[rowIndex].sn)
            //     // if (oldValue.sn !== '') {
            //     //     this.SN.splice(oldValue.sn, 1)
            //     // }
            // }
            // 接下来处理你的业务逻辑，数据持久化等...
        },
        cellEditDone2(newValue, oldValue, rowIndex, rowData, field) {
            this.tableData2[rowIndex][field] = newValue;
            if (this.SN) {
                this.SN.map((user, index) => {
                    if (user == newValue) {
                        this.$message({
                            showClose: true,
                            message: '您输入的SN码重复了,请重新输入！',
                            type: 'warning'
                        });
                        if (user !== oldValue) {
                            this.tableData2[rowIndex][field] = ''

                        } else {
                            this.SN.pop(user)
                        }

                    }
                })
            }
            // if (this.tableData2[rowIndex].sn !== '') {
            //     this.SN.push(this.tableData2[rowIndex].sn)
            // }
            // 接下来处理你的业务逻辑，数据持久化等...
            this.getSn()
        },
        cellEditDone3(newValue, oldValue, rowIndex, rowData, field) {

            this.tableData3[rowIndex][field] = newValue;
            if (this.SN) {
                this.SN.map((user, index) => {
                    if (user == newValue) {
                        this.$message({
                            showClose: true,
                            message: '您输入的SN码重复了,请重新输入！',
                            type: 'warning'
                        });
                        if (user !== oldValue) {
                            this.tableData3[rowIndex][field] = ''

                        } else {
                            this.SN.pop(user)
                        }
                    }
                })
            }
            this.getSn()

        },
        cellEditDone4(newValue, oldValue, rowIndex, rowData, field) {

            this.tableData4[rowIndex][field] = newValue;
            if (this.SN) {
                this.SN.map((user, index) => {
                    if (user == newValue) {
                        this.$message({
                            showClose: true,
                            message: '您输入的SN码重复了,请重新输入！',
                            type: 'warning'
                        });
                        if (user !== oldValue) {
                            this.tableData4[rowIndex][field] = ''

                        } else {
                            this.SN.pop(user)
                        }
                    }
                })
            }
            this.getSn()
        },

        fromData() {
            let data = this.$route.query
            // let data2 = JSON.parse(data)
            this.dataList = this.$route.query
            this.reson()
        },
        getSn() {
            let self = this
            self.SN = []
            let sn = this.tableData.map((user) => {
                return user.sn
            })
            let sn2 = this.tableData2.map((user) => {
                return user.sn
            })
            let sn3 = this.tableData3.map((user) => {
                return user.sn
            })
            let sn4 = this.tableData4.map((user) => {
                return user.sn
            })
            let SN = [...sn, ...sn2, ...sn3, ...sn4]
            SN.map((user) => {
                if (user !== '') {
                    this.SN.push(user)
                }
            })

        },
        getData() {
            this.getSn()
            let dataList = this.dataList
            this.$indexServer.goodsIn(dataList.s_productGoodId, dataList.s_warehouseId, this.resValue, dataList.s_orderId, dataList.s_name, dataList.s_phone, dataList.s_address, dataList.s_remark, this.SN)
                .then(res => {
                    if (res.data.code === 200) {
                        this.SN = []
                        this.$message({
                            showClose: true,
                            message: '恭喜你，数据入库成功',
                            type: 'success',
                            onClose: function () {
                                location.reload();
                            }
                        });
                    } else if (res.data.code === 402) {
                        let existsSn = res.data.data.existsSn


                        this.$message({
                            showClose: true,
                            message: '您输入的SN码 ' + res.data.data.existsSn + ' 已在库，请重新输入SN码',
                            type: 'warning',
                            onClose: function () {

                            }
                        });
                        this.tableData.forEach((user) => {
                            console.log(user)
                            if (user.sn == existsSn) {
                                user.sn = ''
                            }
                        })
                        this.tableData2.forEach((user) => {
                            console.log(user)
                            if (user.sn == existsSn) {
                                user.sn = ''
                            }
                        })
                        this.tableData3.forEach((user) => {
                            console.log(user)
                            if (user.sn == existsSn) {
                                user.sn = ''
                            }
                        })
                        this.tableData4.forEach((user) => {
                            console.log(user)
                            if (user.sn == existsSn) {
                                user.sn = ''
                            }
                        })
                    } else if (res.data.code === 400) {
                        this.$message({
                            showClose: true,
                            message: 'SN不能为空！',
                            type: 'warning'
                        });
                    }
                })
            // if (process.env.NODE_ENV === 'development') {
            //     self.url = '/ms/table/list';
            // };
        },
        callback() {
            console.log('asdfasdfa', this)
        },
        up() {
            this.$router.push('/Storage');
        }

    },
    watch: {
        '$route'(to, from) {
            // 刷新参数放到这里里面去触发就可以刷新相同界面了
            this.fromData()
        }
    }
}
</script>

<style scoped>
.table_title {
  height: 100px;
  background-color: #f4f4f4;
  /* margin-bottom: 40px; */
  display: flex;
  justify-content: space-around;
}
.title_top,
.title_bottom,
.title_center {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 15px 50px;
  flex-wrap: wrap;
}
.title_p2 {
  margin-top: 20px;
}
/* .title_bottom {
  width: 53.5%;
} */
/* .title_bottom {
  margin-right: 550px;
} */
.table_container {
  display: flex;
  justify-content: space-around;
}
.table_nav {
  display: flex;
  text-align: center;
  align-items: center;
  margin-bottom: 40px;
}
.table_nav span {
  color: red;
  margin-right: 10px;
}
.table_nav p {
  color: red;
  margin-left: 30px;
}
.table_footer {
  margin-top: 40px;
  margin-left: 20px;
}
.storage_step {
  overflow: hidden;
  margin-bottom: 22px;
}
.storage_step > div {
  font-size: 14px;
  float: left;
  color: #606266;
  border: 1px solid #dddddd;
  background: #f4f4f4;
  height: 40px;
  line-height: 40px;
  width: 200px;
  text-align: center;
  cursor: pointer;
}
.storage_step .step_1 {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.storage_step .now {
  background: #409eff;
  border-color: #409eff;
  color: #fff;
}
.storage_step .step_2 {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>
