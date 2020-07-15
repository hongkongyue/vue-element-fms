<template>
<div>
    <header class="headerstyle">
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
                    <el-button v-if="judgeMenu.indexOf('同步') !== -1" size="small" type="primary" @click="synchronous">同步</el-button>
                </el-form-item>
            </div>
            <el-form-item label="品类名称：" size="small">
                <el-input v-model="formSearch.name" clearable style="width:150px"></el-input>
                <!-- <el-select v-model="formSearch.name" @change="searchCode(formSearch.level1)" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in goodsList" :key="item.name" :label="tem.name" :value="item.name"></el-option>
                </el-select> -->
            </el-form-item>
            <el-form-item label="款式代号：" size="small">
                <el-select v-model="formSearch.code" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in designCodeList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上下装：" size="small">
                <el-select v-model="formSearch.suitType" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in suitTypeList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="面料类型：" size="small">
                <el-select v-model="formSearch.fabricType" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in fabricTypeList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        
    </header>
    <section class="middle" :style="maxHeight">
        <el-row>
            <el-col :span="4">
                <div :style="heightTree">
                    <el-tree :data="data" :props="defaultProps" :default-expand-all='true' :expand-on-click-node='false' @node-click="handleNodeClick"></el-tree>
                </div>
              
            </el-col>
            <el-col :span="20"><el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
          <el-table ref="multipleTable" @row-click="showLog" :data="tableData" style="width: 100%" border tooltip-effect="dark" :max-height="oneTableHeight"  @selection-change="handleSelectionChange">
            <!-- <el-table-column
                type="selection"
                width="55">
            </el-table-column> -->
            <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
            <el-table-column prop="name" label="品类名称" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="code" label="品类代号" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="suitType" label="上下装" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="fabricType" label="面料类型" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="remark" label="备注" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <p style="font-size:16px;margin-top:10px">操作日志</p>
        <!-- <section class="middle"> -->
        <el-table :data="logList" style="width: 100%" border :max-height="twoTableHeight" tooltip-effect="dark">
            <el-table-column prop="operator" label="操作员" min-width="120" align="center">
            </el-table-column>
            <el-table-column prop="operateTime" label="操作时间" align="center" min-width="120">
                <template slot-scope="scope">{{scope.row.operateTime}}</template>
            </el-table-column>
            <el-table-column prop="logContent" label="操作记录" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <div class="getmore" v-if="logList.length>0&&dataFlag" @click="getMore">点击加载更多</div>
        <div class="getmore" v-if="logList.length>0&&!dataFlag">没有更多了…</div>
        </el-col>
        </el-row>
        
    </section>

</div>
</template>

<script>
import {burypoint} from 'mixins/burypoint'
export default {
    mixins:[burypoint],
    data() {
        return {
            goodsList:[],
            designCodeList:[],
            suitTypeList:[],
            fabricTypeList:[],
            heightTree:'',
          oneTableHeight:'',
          twoTableHeight:'',
           data: [],
        defaultProps: {
          children: 'children',
          label: 'nameWithCount'
        },
            showhidden: false,
            formSearch: {},
            maxHeight: '',
            logList: [], //日志
            billNo: '',
            total: 0,
            pagesize: 10,
            currentPage: 1,
            tableData: [], //主table数据
            tableJournal: [], //操作日志数据
            buttonList: [], //按钮权限
            judgeMenu: [],
            pageSecond:false,
            clickTree:'',
            logPage:1,
        }
    },
    mounted() {
        console.log(window.screen.height,(window.screen.height - 300)*0.6,document.body.offsetHeight)
        
        if(document.body.offsetHeight > 800){
            this.heightTree ='height:'+ (document.body.offsetHeight - 290) + 'px;overflow-x:hidden;overflow-y:scroll'
               this.oneTableHeight = (document.body.offsetHeight - 300)*0.6
        this.twoTableHeight = (document.body.offsetHeight - 300)*0.3
        this.maxHeight = 'height:'+ (document.body.offsetHeight - 270) + 'px'
              }else{
                this.oneTableHeight = (document.body.offsetHeight - 300)*0.5
        this.twoTableHeight = (document.body.offsetHeight - 300)*0.25
        this.maxHeight = 'height:'+ (document.body.offsetHeight - 270) + 'px'
        this.heightTree ='height:'+ (document.body.offsetHeight - 290) + 'px;overflow-x:hidden;overflow-y:scroll'
              }
        // if (window.screen.height > 1000) {
          
        //     this.maxHeight = "height:690px"
        // } else {
        //     this.maxHeight = "height:530px"
        // }
        // this.getData()
        this.getSelector()
        this.getplatformOptions()
        this.getButtonJurisdiction() //按钮权限
    },
    methods: {
        getSelector(){
            let data = {}
            this.request('basicStyleType_getAllSelector', data, true).then(res => {
                if (res.code == 1) {
                    this.goodsList = res.data.name
                    this.designCodeList = res.data.code
                    this.suitTypeList = res.data.suitType
                    this.fabricTypeList = res.data.fabricType
                }
            })
        },
         //同步
        synchronous() {
             this.setBuryPoint('同步')
            let data = {}
            this.request('basicStyleType_sync', data, true).then(res => {
                if (res.code == 1) {
                    this.getData()
                    this.$message.success('同步成功')
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        handleShowHidden(name) {
            console.log(name, '000')
            if (name == 'show') {
              this.showhidden = true
              if(document.body.offsetHeight > 800){
                this.maxHeight = 'height:'+ (document.body.offsetHeight - 170) + 'px'
                this.oneTableHeight = (document.body.offsetHeight - 170)*0.6
        this.twoTableHeight = (document.body.offsetHeight - 170)*0.25
              }else{
                this.maxHeight = 'height:'+ (document.body.offsetHeight - 170) + 'px'
                this.oneTableHeight = (document.body.offsetHeight - 220)*0.6
        this.twoTableHeight = (document.body.offsetHeight - 220)*0.25
              }
                
            } else {
                this.showhidden = false
                if(document.body.offsetHeight > 800){
                this.oneTableHeight = (document.body.offsetHeight - 300)*0.6
        this.twoTableHeight = (document.body.offsetHeight - 300)*0.25
        this.maxHeight = 'height:'+ (document.body.offsetHeight - 270) + 'px'
              }else{
                this.maxHeight = 'height:'+ (document.body.offsetHeight - 270) + 'px'
                this.oneTableHeight = (document.body.offsetHeight - 300)*0.5
                this.twoTableHeight = (document.body.offsetHeight - 300)*0.25
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
            this.rowLenght = row.length
            this.rowObj = row[0]
            console.log(this.rowObj)
        },
        getData() {
            this.logList = []
            this.pageSecond = false
            this.getTreeData()
        },
        getTreeData(){
            this.logList = []
            this.pagesize = 10
            this.currentPage = 1
            let data = {}
            data.name = this.formSearch.name
            data.code = this.formSearch.code
            data.suitType = this.formSearch.suitType
            data.fabricType = this.formSearch.fabricType
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            this.request('basicStyleType_getStyleTree', data, true).then(res => {
                if (res.code == 1) {
                        this.data = res.data.children
                    this.getTableData()
                }else{
                    this.$message.error(res.msg)
                    this.data = []
                }
            })
        },
        getTableData(){
            this.logList = []
            this.pagesize = 10
            this.currentPage = 1
            let data = {}
            data.name = this.formSearch.name
            data.code = this.formSearch.code
            data.suitType = this.formSearch.suitType
            data.fabricType = this.formSearch.fabricType
            // data.name = this.formSearch.region
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            this.request('basicStyleType_pageQuery', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;
                    this.tableData = res.data.records;
                }else{
                    this.$message.error(res.msg)
                    this.total = 0
                    this.tableData = []
                }
            })
        },
        handleNodeClick(obj){
            this.logList = []
            this.pagesize = 10
            this.currentPage = 1
            this.pageSecond = true
            this.clickTree = obj
            let data = {}
            data.tree = obj
            data.name = this.formSearch.name
            data.code = this.formSearch.code
            data.suitType = this.formSearch.suitType
            data.fabricType = this.formSearch.fabricType
            data.puniqueKey = obj.code
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            this.request('basicStyleType_pageQuery', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;
                    this.tableData = res.data.records;
                }else{
                    this.$message.error(res.msg)
                    this.total = 0;
                    this.tableData = []
                }
            })
        },
        getLoglist(billNo) {
            this.billNo = billNo
            this.logPage = 1
            let data = {}
            data.billNo = "master_data_style_type_" + this.billNo
            data.pageSize = 3
            data.currentPage = this.logPage
            this.request('billLog_getPagingByBillNo', data, true).then((res) => {
                if (res.code == 1) {
                    if (res.data.length < data.pageSize) {
                        this.dataFlag = false
                    } else {
                        this.dataFlag = true
                    }
                    if (this.logPage == 1) {
                        this.logList = res.data
                    } else {
                        this.logList = this.logList.concat(res.data)
                    }
                }
            })
        },
        getMore() {
            this.logPage++
            let data = {}
            data.billNo = "master_data_style_type_" + this.billNo
            data.pageSize = 3
            data.currentPage = this.logPage
            this.request('billLog_getPagingByBillNo', data, true).then((res) => {
                if (res.code == 1) {
                    if (res.data.length < data.pageSize) {
                        this.dataFlag = false
                    } else {
                        this.dataFlag = true
                    }
                    if (this.logPage == 1) {
                        this.logList = res.data
                    } else {
                        this.logList = this.logList.concat(res.data)
                    }
                }
            })
        },
        showLog(row) {
            this.getLoglist(row.id)
        },
        getplatformOptions() {
            this.request('getPlatformSelector', {}, true).then(res => {
                if (res.code == 1) {
                    this.platformOptions = res.data;
                }
            })
        },

        handleSizeChange(val) {
            this.logList = []
            console.log(`每页 ${val} 条`);
            this.pagesize = val
            if(this.pageSecond == false){
                this.pageSecond = false
                // this.getTableData()
                let data = {}
            data.name = this.formSearch.name
            data.code = this.formSearch.code
            data.suitType = this.formSearch.suitType
            data.fabricType = this.formSearch.fabricType
            // data.name = this.formSearch.region
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            this.request('basicStyleType_pageQuery', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;
                    this.tableData = res.data.records;
                }else{
                    this.$message.error(res.msg)
                    this.total = 0;
                    this.tableData = [];
                }
            })
            }else{
            let data = {}
            data.tree = this.clickTree
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            this.request('basicStyleType_pageQuery', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;
                    this.tableData = res.data.records;
                }else{
                    this.$message.error(res.msg)
                    this.total = 0;
                    this.tableData = [];
                }
            })
            }
        },
        handleCurrentChange(val) {
            this.logList = []
            console.log(`当前页: ${val}`);
            this.currentPage = val
            // this.pagesize = val
            if(this.pageSecond == false){
                this.pageSecond = false
                let data = {}
            data.name = this.formSearch.name
            data.code = this.formSearch.code
            data.suitType = this.formSearch.suitType
            data.fabricType = this.formSearch.fabricType
            // data.name = this.formSearch.region
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            this.request('basicStyleType_pageQuery', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;
                    this.tableData = res.data.records;
                }
                else{
                    this.$message.error(res.msg)
                    this.total = 0;
                    this.tableData = [];
                }
            })
            }else{
            let data = {}
            data.tree = this.clickTree
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            this.request('basicStyleType_pageQuery', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;
                    this.tableData = res.data.records;
                }else{
                    this.$message.error(res.msg)
                    this.total = 0;
                    this.tableData = [];
                }
            })
            }
        },
        onAdd() {
            this.dialogVisible = true
        },
        //查询
        onSearch() {
            this.setBuryPoint('查询')
            this.currentPage = 1
            this.getData()

        },
        //重置
        onReset() {
            this.formSearch = {}
        },

    }
}
</script>

<style lang="less" scoped>
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
