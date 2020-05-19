<template>
<div>
    <header id="header" class="headerstyle">
        <div style="width:100%;text-align:center;">
            <span @click="handleShowHidden('hidden')"><i v-if="showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-bottom"></i></span>
            <span @click="handleShowHidden('show')"><i v-if="!showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-top"></i></span>
        </div>
        <el-form v-if="!showhidden" :inline="true" :model="formSearch" class="demo-form-inline ">
            <div>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button size="small" @click="onReset">重置</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('发起调整指令') !== -1" size="small" type="primary" @click="startAdjust">发起调整指令</el-button>
                </el-form-item>
                <el-form-item size="small">
         <el-button v-if="judgeMenu.indexOf('导出') !== -1" size="small" @click="clickTest" type="primary"> 导出  </el-button>
                </el-form-item>
                
                
            </div>
            <span style="color:red;display:inline-block;margin-top:10px">*</span>
            <el-form-item label="品牌：" size="small">
                <el-select v-model="formSearch.brand" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in brandList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="季节：" size="small">
                <el-select v-model="formSearch.season" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in seasonList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="年份：" size="small">
                <el-date-picker v-model="formSearch.years" type="year" style="width:150px" placeholder="选择年">
                </el-date-picker>
            </el-form-item>
            <span style="color:red;display:inline-block;margin-top:10px">*</span>
            <el-form-item label="企划状态：" size="small">
                <el-select v-model="formSearch.projectStatus" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in planningStatusList" :key="item.name" :label="item.name" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
        </el-form>

    </header>
    <section class="middle" :style="maxHeight">
        <el-row>

            <el-col :span="24">
                <!-- <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination> -->
                <plx-table-grid :data="tableData" border style="width: 100%" size='mini' :height="oneTableHeight" :pagination-show="false">
                    <plx-table-column type="index" width="55" label="序号" fixed='left' resizable align="center" />
                    <plx-table-column prop="basicBrandName" min-width="80" resizable fixed='left' label="品牌" align="center" />
                    <plx-table-column prop="years" min-width="80" resizable fixed='left' label="年份" align="center" />
                    <plx-table-column prop="season" min-width="80" resizable fixed='left' label="季节" align="center" />
                    <plx-table-column prop="secondLevel" min-width="80" resizable fixed='left' label="二级品类" align="center" />
                    <plx-table-column prop="thirdLevel" min-width="80" resizable fixed='left' label="三级品类" align="center" />
                    <plx-table-column prop="" min-width="80" resizable label="原企划" align="center">
                        <plx-table-column prop="originDevelopQty" min-width="80" resizable label="款数" align="center" />
                        <plx-table-column prop="originStyleColor" min-width="80" resizable label="款色" align="center" />
                        <plx-table-column prop="originDevelopPercent" min-width="80" resizable label="占比" align="center" />
                    </plx-table-column>
                    <plx-table-column prop="" min-width="80" resizable label="调整后企划" align="center">
                        <plx-table-column prop="adjustDevelopQty" min-width="80" resizable label="款数" align="center">
                            <template slot-scope="scope">
                                {{scope.row | capitalize}}
                            </template>
                        </plx-table-column>
                        <plx-table-column prop="adjustStyleColor" min-width="80" resizable label="款色" align="center">
                            <template slot-scope="scope">
                                {{scope.row | color}}
                            </template>
                        </plx-table-column>
                        <plx-table-column prop="adjustDevelopPercent" min-width="80" resizable label="占比" align="center">
                            <template slot-scope="scope">
                                {{scope.row | account(tableData)}}
                            </template>
                        </plx-table-column>
                    </plx-table-column>
                    <plx-table-column prop="" min-width="95" resizable label="原企划已开发" align="center">
                        <plx-table-column prop="originDevelopedQty" min-width="95" resizable label="款数" align="center" />
                        <plx-table-column prop="originDevelopedStyleColor" min-width="95" resizable label="款色" align="center" />
                        <plx-table-column prop="originDevelopedPercent" min-width="95" resizable label="占比" align="center" />
                    </plx-table-column>
                    <plx-table-column prop="" min-width="95" resizable label="原企划实际开发" align="center">
                        <plx-table-column prop="actualDevelopedQty" min-width="95" resizable label="款数" align="center" />
                        <plx-table-column prop="actualDevelopedStyleColor" min-width="95" resizable label="款色" align="center" />
                        <plx-table-column prop="actualDevelopedPercent" min-width="95" resizable label="占比" align="center" />
                    </plx-table-column>

                    <plx-table-column v-for="v in columns" :key="v.label" :prop="v.prop" resizable width="180" :label="v.label" align="center">
                        <plx-table-column v-for="i in v.arr" :key="i.prop" :prop="i.prop" width="90" resizable :label="i.label" align="center">
                            <template slot-scope="scope">
                                <div v-if="i.label=='原开发款数'">{{scope.row[i.prop]}}</div>
                                <!-- <el-input size="small" v-if="i.label=='调整后开发款数'" v-model="scope.row[i.prop]"></el-input> -->
                                <el-input-number v-if="i.label=='调整后开发款数'&&scope.row[i.prop]!='--'" style="width:110px" v-model="scope.row[i.prop]" size="mini" controls-position="right" :precision="0" :min="0" :max="1000000"></el-input-number>
                                <span v-if="i.label=='调整后开发款数'&&scope.row[i.prop]=='--'">{{'--'}}</span>
                            </template>
                        </plx-table-column>
                    </plx-table-column>

                    <!-- <plx-table-column  v-for="v in columns" v-if="v.label == '占比'" :key="v.label"  :prop="v.prop"  resizable  width="180"   :label="v.label"  align="center">
                             <template slot-scope="scope">
                                 {{scope.row | capitalize}}
                             </template>
                         </plx-table-column> -->
                </plx-table-grid>
            </el-col>
        </el-row>

    </section>

    <!--发起调整指令-->
    <Modal v-model="startAdjustVisible" @on-cancel="cancelStartAdjust" title="发起调整指令" :width="840">
        <el-form :rules="startAdjustRules" ref="startAdjustForm" label-width="120px" :model="startAdjustForm" class="demo-ruleForm " :label-position="right">
            <Col span="12">
            <el-form-item label="品牌名称：" prop="brand" size="small">
                <el-select v-model="startAdjustForm.brand" clearable filterable placeholder="请选择" style="width:200px">
                    <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            </Col>
            <Col span="12">
            <el-form-item label="调整类型：" prop="changeType" size="small">
                <el-select v-model="startAdjustForm.changeType" clearable filterable placeholder="请选择" style="width:200px">
                    <el-option v-for="item in adjustTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            </Col>
            <Col span="24">
            <el-form-item label="年份：" prop="year" size="small">
                <el-select v-model="startAdjustForm.year" multiple clearable filterable placeholder="请选择" style="width:600px">
                    <el-option v-for="item in yearList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            </Col>
            <Col span="24">
            <el-form-item label="调整建议：" prop="remark" size="small">
                <el-input type="textarea" maxlength="300" clearable :autosize="{ minRows: 4, maxRows: 5}" show-word-limit v-model="startAdjustForm.remark" placeholder="请输入" style="width:600px"></el-input>
            </el-form-item>
            </Col>

        </el-form>
        <div slot="footer">
            <Button type="default" @click="cancelStartAdjust">取消</Button>
            <Button type="primary" @click="saveStartAdjust">确定</Button>
        </div>
    </Modal>
</div>
</template>

<script>
import Vue from 'vue'
import Util from 'libs/util'
import {commonMixins} from 'mixins/common';
import {
    debounce
} from 'mixins/debounce'
import { export_json_to_excel,format_json_list_by_filter,convert26 } from '@/libs/excel/Export2Excel'
export default {
    mixins: [commonMixins, debounce],
    data() {
        return {
            startAdjustVisible: false,
            startAdjustForm: {
                brand: '',
                changeType: '',
                year: [],
                remark: ''
            },
            startAdjustRules: {
                brand: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                changeType: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                year: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                remark: [{
                    required: true,
                    message: '请输入调整建议',
                    trigger: 'blur'
                }, ]
            },
            projectStatusList:[{id:3,name:'hjadg'}],
            columns: [],
            addpersonList: [],
            sendTypeList: [{
                name: '全部推送',
                id: 0
            }, {
                name: '按品牌推送',
                id: 1
            }],
            addtitle: '新增',
            dialogVisible: false,
            ruleForm: {
                department: '',
                person: '',
                brand: '',
                sendType: 0,
            },
            rules: {
                department: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                person: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }]
            },
            heightTree: '',
            oneTableHeight: '',
            twoTableHeight: '',
            data: [],
            showhidden: false,
            formSearch: {
                brand:'',
                season:'',
                years:'',
                projectStatus:'3',
            },
            maxHeight: '',
            tableData: [], //主table数据
            buttonList: [], //按钮权限
            judgeMenu: [],
            yearList:[],
        }
    },
    mounted() {
        this.getBrandList()
        this.getAdjustType()
        this.getPlanningStatus()
        this.formSearch.years = new Date().getFullYear().toString()
        let year = 2000
        let list = []
        for (let i = 0; i < 200; i++) {
            list.push(year + i)
        }
        this.yearList = list
        //计算款数总和
        Vue.filter('capitalize', function (row) {
            let obj = row
            let list = []
            for (let i in obj) {
                if (i.indexOf('adjust_develop_style_qty_') > -1) {
                    list.push(obj[i])
                }
            }
            console.log(list)
            let total = 0
            for (var i = 0; i < list.length; i++) {
                if (list[i] != '--') {
                    total = total + list[i];
                }
            }
            row.adjustDevelopQty = total
            return total
        })
        //计算款色
        Vue.filter('color', function (row) {
            let obj = row
            let list = []
            let colorList = []
            let total = 0
            for (let i in obj) {
                if (i.indexOf('adjust_develop_style_qty_') > -1) {
                    if(obj[i] != '--'){
                        list.push(obj[i])
                    }
                    
                }
                if (i.indexOf('color_rate_') > -1) {
                    colorList.push(obj[i])
                }
            }
            for (let i = 0; i < list.length; i++) {
                total = total + (list[i] * colorList[i])
            }
            let fixedTotal = total.toFixed(2)
            row.adjustStyleColor = fixedTotal
            return fixedTotal
        })
        //计算占比
        Vue.filter('account', function (row, dataList) {
            console.log(row, dataList, '00000000000000000')
            let totalList = []
            dataList.map((item) => {
                if (item.basicBrandName == row.basicBrandName && item.years == row.years && item.season == row.season) {//获取同品牌，年份，季节的数据
                    totalList.push(item)
                }
            })
            let totalAccount = 0
            let currenttotal = 0
            for (var item = 0; item < totalList.length; item++) {
                let obj = totalList[item]
                let list = []
                for (let i in obj) {   //每个对象里面的每个波段下的调整后开发款数
                    if (i.indexOf('adjust_develop_style_qty_') > -1) {
                        list.push(obj[i])
                    }
                }
                let total = 0
                for (var i = 0; i < list.length; i++) { 
                    if (list[i] != '--') {
                        total = total + list[i];
                    }
                }
                totalAccount += total //计算同品牌，年份，季节数据的调整后开发款数总合
            }
            let totalNum = row
            let list2 = []
            let total2 = 0
            for (let i in totalNum) {
                if (i.indexOf('adjust_develop_style_qty_') > -1) {
                    list2.push(totalNum[i])
                }
            }
            for (var i = 0; i < list2.length; i++) {//计算每个对象的调整后开发款数总合
                if (list2[i] != '--') {
                    total2 = total2 + list2[i]
                }
            }
            let proportion = (((total2 / totalAccount) * 100).toFixed(2))=="NaN" ? 0 + '%' : ((total2 / totalAccount) * 100).toFixed(2) + '%' //计算占比
            row.adjustDevelopPercent = proportion
            return proportion
        })
        if (document.body.offsetHeight > 800) {
            this.heightTree = 'height:' + (document.body.offsetHeight - 290) + 'px;overflow-x:hidden;overflow-y:scroll'
            this.oneTableHeight = (document.body.offsetHeight - 300) * 0.9
            this.maxHeight = 'height:' + (document.body.offsetHeight - 270) + 'px'
        } else {
            this.oneTableHeight = (document.body.offsetHeight - 300) * 0.9
            this.maxHeight = 'height:' + (document.body.offsetHeight - 270) + 'px'
            this.heightTree = 'height:' + (document.body.offsetHeight - 290) + 'px;overflow-x:hidden;overflow-y:scroll'
        }
        this.getButtonJurisdiction() //按钮权限
    },
    methods: {
clickTest(){
    if(this.tableData.length == 0){
        this.$message.warning('请先查询或暂无数据')
    }else{
        let dynamicFirstHead = new Array()
        let dynamicSecondHead = new Array()
        let dynamicProps = new Array()
        let dynamicFirstHeadMerges = new Array()
        let charCodeOfFix = 17
        this.columns.map(firstHead=>{
            dynamicFirstHead.push(firstHead.label)
            dynamicFirstHead.push('')  //首行列合并占位符
            dynamicFirstHeadMerges.push( convert26(++charCodeOfFix)+"1:"+ convert26(++charCodeOfFix)+"1")
            firstHead.arr.map(secondHead=>{
                dynamicSecondHead.push(secondHead.label)
                dynamicProps.push(secondHead.prop)
            })
        })
        let multiHeader = [['品牌', '年份','季节','二级品类','三级品类','原企划','','','调整后企划','','','原企划已开发','','','原企划实际开发','','', ...dynamicFirstHead]]
        let header = ['', '','','','','款数','款色','占比','款数','款色','占比','款数','款色','占比','款数','款色','占比',...dynamicSecondHead]
        let filterVal = ['basicBrandName', 'years','season','secondLevel','thirdLevel','originDevelopQty','originStyleColor','originDevelopPercent','adjustDevelopQty','adjustStyleColor',
        'adjustDevelopPercent','originDevelopedQty','originDevelopedStyleColor','originDevelopedPercent','actualDevelopedQty','actualDevelopedStyleColor','actualDevelopedPercent', ...dynamicProps]
        let data = format_json_list_by_filter(filterVal, this.tableData)
        let merges = ['A1:A2', 'B1:B2','C1:C2','D1:D2','E1:E2','F1:H1','I1:K1','L1:N1','O1:Q1', ...dynamicFirstHeadMerges]
        let myDate = new Date();
        myDate.toLocaleString();        //获取日期与时间
        let filename = '企划管理' + myDate.toLocaleString()
        export_json_to_excel({
            multiHeader,
            header,
            merges,
            data,
            filename
        })

    }
},

//发起调整指令
        startAdjust() {
            this.startAdjustVisible = true
        },
        //保存调整指令
        saveStartAdjust() {
            this.$refs['startAdjustForm'].validate((valid) => {
                if (valid) { //新增保存
                    let data = {}
                    let obj = {}
                    this.adjustTypeList.map((i) => {
                        if (i.id == this.startAdjustForm.changeType) {
                            obj = i
                        }
                    })
                    let brandObj = {}
                    this.brandList.map((v)=>{
                        if(v.id == this.startAdjustForm.brand){
                            brandObj = v
                        }
                    })
                    data.basicBrandName = brandObj.name
                    data.basicBrandCode = brandObj.code
                    data.basicBrandId = this.startAdjustForm.brand
                    data.yearsList = this.startAdjustForm.year
                    data.adjustTypeId = this.startAdjustForm.changeType
                    data.adjustTypeName = obj.name
                    data.adjustTypeCode = obj.code
                    data.asjustAdvise = this.startAdjustForm.remark
                    this.request('goods_planning_manage_createAdjust', data, true).then(res => {
                        if (res.code == 1) {
                            this.$message.success('保存调整指令成功')
                            // this.onSearch()
                            this.startAdjustForm = {
                                brand: '',
                                changeType: '',
                                year: [],
                                remark: ''
                            }
                            this.$refs['startAdjustForm'].resetFields();
                            this.startAdjustVisible = false
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                } else { //验证表单
                    return false;
                }
            });
        },
        //取消调整指令
        cancelStartAdjust() {
            this.startAdjustVisible = false
            this.startAdjustForm = {
                brand: '',
                changeType: '',
                year: [],
                remark: ''
            }
            this.$refs['startAdjustForm'].resetFields();
        },
        handleShowHidden(name) {
            console.log(name, '000')
            if (name == 'show') {
                this.showhidden = true
                if (document.body.offsetHeight > 800) {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 170) + 'px'
                    this.oneTableHeight = (document.body.offsetHeight - 170) * 0.9
                } else {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 170) + 'px'
                    this.oneTableHeight = (document.body.offsetHeight - 220) * 0.9
                }

            } else {
                this.showhidden = false
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight - 300) * 0.9
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 270) + 'px'
                } else {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 270) + 'px'
                    this.oneTableHeight = (document.body.offsetHeight - 300) * 0.9
                }
            }
        },
        getButtonJurisdiction() {
            let data = {}
            data.parentResourceCode = this.$route.query.code
            this.request('masterData_resource_buttonResource', data, true).then(res => {
                if (res.code == 1) {
                    this.buttonList = res.data
                    let newList = []
                    this.buttonList.map(function (item) {
                        newList.push(item.resourceName)
                    })
                    this.judgeMenu = newList
                }
            })
        },
        handleSelectionChange(row) {
            console.log(row)
            this.selection = row
            this.rowLenght = row.length
            this.rowObj = row[0]
            console.log(this.rowObj)
        },

        getData() {
            this.logList = []
            let data = {}
            data.brandId = this.formSearch.brand
            data.season = this.formSearch.season
            this.formSearch.years ? data.years = Util.dateFormat(this.formSearch.years, 'yyyy') : delete data.years
            data.planningStatus = this.formSearch.projectStatus
            this.request('queryForSimulation', data, true).then(res => {
                if (res.code == 1) {
                    if(res.data){
                        this.columns = res.data.columns
                    let list = res.data.rows
                    //判断调整后开发款数如果为-1 即不存在该波段 显示 --
                    for(let i=0;i<list.length;i++){
                        for(let v in list[i]){
                            if(list[i][v] == -1){
                                list[i][v] = '--'
                            }
                        }
                    }
                    this.tableData = list
                    console.log(this.tableData,'-----------------')
                    }else{
                        this.columns = []
                        this.tableData = []
                    }
                    
                }else{
                    this.$message.error(res.msg)
                    this.columns = []
                    this.tableData = []
                }
            })
        },
        handleSizeChange(val) {
            this.pagesize = val
            this.getData()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getData()
        },

        //查询
        onSearch() {
            if (!this.formSearch.brand || !this.formSearch.projectStatus) {
                this.$message.warning('请先选择品牌与企划状态')
            } else {
                this.currentPage = 1
                this.getData()
            }
        },
        //重置
        onReset() {
            this.formSearch = {
                brand:'',
                season:'',
                years:'',
                projectStatus:'',
            }
        },

    }
}
</script>

<style lang="less" scoped>
@import 'https://unpkg.com/pl-table/themes/index.css';

.headerstyle,
.main,
.middle,
.footer {
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
