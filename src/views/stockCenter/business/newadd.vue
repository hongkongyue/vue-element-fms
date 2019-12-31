<template>
<span>
    <Modal v-model="dialogVisible" :styles="mystyle" :mask-closable="false" :rules="rules" title="新增" @on-cancel='onCancel' :width="1200" @on-ok="editSubmit" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="addObject" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col>
                <!-- <el-form-item label="盘点单号：" size="small" label-width="95px" prop="warehouseNumber">
                    <el-input v-model="addObject.warehouseNumber" maxlength="20" placeholder="请输入" style="width:120px"></el-input>
                </el-form-item> -->
                <el-form-item label="仓库" size="small" label-width="95px" prop="warehouseCategory">
                        <el-select v-model="addObject.warehouseCategory" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in wareHouseList" :key="item.id" :label="item.warehouseName" :value="item.id"></el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="公司" size="small" label-width="95px" prop="company">
                    <el-select v-model="addObject.company" placeholder="请选择" style="width:180px" filterable>
                        <el-option v-for="v in companyList" :key="v.id" :disabled="v.used==0" :label="v.name" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="库存账期" size="small" label-width="95px" >
                    <el-select disabled v-model="addObject.basicData" placeholder="请选择" style="width:120px" filterable>
                        <el-option v-for="v in stockList" :key="v.id" :disabled="v.used==0" :label="v.name" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="业务日期" size="small" label-width="95px" prop="time">
                    <el-date-picker v-model="addObject.time" type="date" placeholder="选择日期" style="width:150px">
                    </el-date-picker>
                </el-form-item>
                </Col>
                <Col>
                <el-form-item label="备注" size="small" label-width="95px">
                    <el-input type="textarea" v-model="addObject.remark" placeholder="请选择" style="width:780px"></el-input>
                </el-form-item>
                </Col>
                <Col style="padding-left:30px">
                <el-form-item size="small">
                    <el-button size="small" type="primary" @click="add">添加明细</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button size="small" type="default" @click="onDelete">删除</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button size="small" type="primary" @click="onImport">导入</el-button>
                </el-form-item>
                <div style="padding-left:30px;float:right">
                <el-form-item size="small">
                    <el-button size="small" type="primary" @click="onSave">提交</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button size="small" type="default" @click="onCancel">取消</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button size="small" type="primary" @click="onSaveEmit">提交并审核</el-button>
                </el-form-item>
                </div>
                </Col>
                
                <Col>
                <el-table :data="goodsList" style="width: 100%" @select="changeSelect" @selection-change="changeSelection" :row-class-name="tableRowClassName" border tooltip-effect="dark" max-height="250" size="mini">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                    <el-table-column prop="skuShortName" label="商家编码" min-width="130" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-input size='mini' v-model="scope.row.skuShortName" style="width:100px;height: 35px;margin-top:5px" v-on:blur="codeCheck(scope.row.skuShortName,scope.$index)" autocomplete="off"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="skuName" label="货品编码" align="center" min-width="120" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="basicPlatformName" label="品牌" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="basicBrandName" label="货品名称" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="orderNo" label="规格名称" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="subOrderNo" label="品类" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <!-- <el-table-column prop="purchaseNo" label="当前库存" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column> -->
                    <el-table-column prop="sourcePurchaseNo" label="成本价" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="sourcePurchaseNo" label="调整数" min-width="130" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-input size='mini' v-model="scope.row.sourcePurchaseNo" style="width:100px;height: 35px;margin-top:5px" v-on:blur="nameCheck()" autocomplete="off"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sectionNo" label="备注" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                </Col>
                <!-- <el-form-item style="padding-left:300px">
                    <Button type="primary" @click="dialogtitle=='新增'?submitForm('ruleForm'):submitForms('ruleForm')">确认</Button>
                    <Button type="default" @click="cancel">取消</Button>
                </el-form-item> -->
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
    <!-- 添加货品 -->
    <!-- <Modal v-model="goodsVisible" :styles="mystyle" :rules="rules" title="库存调整" @on-cancel='cancel' :width="380" @on-ok="editSubmit" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="addObject" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">

                <el-form-item label="品牌：" size="small" label-width="95px" prop="basicPlatformName">
                    <el-select v-model="formSearch.code" filterable placeholder="请选择" style="width:150px">
                        <el-input v-model="formSearch.themCode" style="width:150px"></el-input>
                    </el-select>
                </el-form-item>
                <el-form-item label="货品编码：" size="small" label-width="95px" prop="basicPlatformName">
                    <el-input v-model="formSearch.themCode" style="width:150px"></el-input>
                </el-form-item>
                <el-form-item label="商品编码：" size="small" label-width="95px" prop="basicPlatformName">
                    <el-select v-model="formSearch.code" filterable placeholder="请选择" style="width:150px">
                    </el-select>
                </el-form-item>
                <el-form-item label="货品名称：" size="small" label-width="95px" prop="basicPlatformName">
                    <el-input v-model="formSearch.themCode" disabled style="width:150px"></el-input>
                </el-form-item>
                <el-form-item label="规格名称：" size="small" label-width="95px" prop="basicPlatformName">
                    <el-input v-model="formSearch.themCode" disabled style="width:150px"></el-input>
                </el-form-item>
                <el-form-item label="品类：" size="small" label-width="95px" prop="basicPlatformName">
                    <el-input v-model="formSearch.themCode" disabled style="width:150px"></el-input>
                </el-form-item>
                <el-form-item label="当前库存：" size="small" label-width="95px" prop="basicPlatformName">
                    <el-input v-model="formSearch.themCode" disabled style="width:150px"></el-input>
                </el-form-item>
                <el-form-item label="当前成本价：" size="small" label-width="115px" prop="basicPlatformName">
                    <el-input v-model="formSearch.themCode" disabled style="width:130px"></el-input>
                </el-form-item>
                <el-form-item label="调整后库存：" size="small" label-width="115px" prop="basicPlatformName">
                    <el-input v-model="formSearch.themCode" style="width:130px"></el-input>
                </el-form-item>
                <el-form-item label="备注：" size="small" label-width="95px">
                    <el-input type="textarea" v-model="formSearch.themCode" style="width:150px"></el-input>
                </el-form-item>
                <Col>
                <el-form-item style="padding-left:120px">
                    <Button type="primary">确认</Button>
                    <Button type="default">取消</Button>
                </el-form-item>
                </Col>

            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal> -->
</span>
</template>

<script>
export default {
    name: 'timelyComponent',
    data() {
        return {
            wareHouseList:[],
            selectList: [],
            addList: [{
                basicPlatformName: '',
                skuName: '',
                orderNo: '',
            }],
            companyList: [],
            input3: '',
            select: '',
            list: [], //编辑存储列表
            activeName: 'first',
            loading: false,
            show: false,
            dialogVisible: false,
            // goodsVisible: false,
            shopList: [],
            themList: [],
            formSearch: {
                code: '',
                name: '',
                person: '',
            },
            addObject: {
                company:'',
                time: new Date(),
                warehouseCategory:''
            },
            logList: [],
            total: 0,
            pagesize: 1000,
            currentPage: 1,
            judgeMenu: [],
            buttonList: [], //按钮权限
            goodsList: [],
            rules: {
                basicPlatformName: [{
                    required: true,
                    message: '请输入品牌编码',
                    trigger: 'blur'
                }, ],
                warehouseCategory: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                time: [{
                    type: 'date',
                    required: true,
                    message: '请选择日期',
                    trigger: 'change'
                }],
                company: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }]
            }
        }
    },

    destroyed() {
        // this.$store.commit('clearreceipt')
    },
    created() {
        this.request('masterData_company_selector', {}, true).then((res) => {
            if (res.code == 1) {
                this.companyList = res.data
            }
        })
        this.request('masterData_warehouse_selector', {}, true).then(res => {
            if (res.code == 1) {
                this.wareHouseList = res.data
            }
        })
    },
    mounted() {},
    methods: {
        // 添加索引
        tableRowClassName(row, index) {
            // 给每条数据添加一个索引
            row.row.index = row.rowIndex
        },
        changeSelection(selection, row) {
            this.selectList = selection
        },
        codeCheck(code, index) {  //根据商家编码查询货品信息
            let data = {}
            this.request('adjustment_stock_selectGood', data, true).then(res => {
            if (res.code == '1') {
                console.log(res.data)
            }
        })
        },
        add() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) { //判断
                    if (this.goodsList.length == 0) {
                        this.goodsList.push(this.addList[0])
                    } else if (this.goodsList.length > 0) {
                        if (this.goodsList[this.goodsList.length - 1].orderNo == '') {
                            this.$message.error('请先完善上一条数据！')
                        } else {
                            this.goodsList.push({
                                basicPlatformName: '',
                                skuName: '',
                                orderNo: '',
                            })
                        }
                    }
                } else { //验证表单
                    return false;
                }
            });
        },
        onDelete() {
            //拿到选中的数据
            let val = this.selectList
            //如果选中数据存在
            if (val) {
                //将选中数据遍历
                val.forEach((val, index) => {
                    //遍历源数据
                    this.goodsList.forEach((v, i) => {
                        //如果选中数据和源数据的某一条唯一标识符相等，删除对应的源数据
                        if (val.index === v.index) {
                            this.goodsList.splice(i, 1)
                        }
                    })
                })
            }
        },
        onAdd() {
            this.dialogVisible = true;
        },
        onCancel(){
            this.dialogVisible = false;
            this.addObject = {
                company:'',
                time: new Date(),
                warehouseCategory:''
            }
            this.$refs['ruleForm'].resetFields();
        },
        onSearch() {
            this.currentPage = 1
            this.getData()

        },
        changeRadio(i) {},
        changeShow() {
            this.show = true
        },
        changeHidden() {
            this.show = false
        },
        handleSizeChange(val) {
            this.pagesize = val
            this.getData()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getData()
        },

    }
}
</script>

<style lang="less" scoped>
.headerstyle,
.main,
.middle,
.footer {
    transform: translateZ(0);
    width: 99%;
    margin: 0 auto;
    background: #fff;
    padding: 20px 20px 10px 20px;
    margin-bottom: 10px;
}

.getmore {
    padding-top: 6px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
}

.pointer {
    cursor: pointer;
}

.pl20 {
    padding-left: 20px
}
</style>
