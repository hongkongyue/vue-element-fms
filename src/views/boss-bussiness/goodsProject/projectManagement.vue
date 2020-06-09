<template>
<div>
    <header class="headerstyle" v-if="!showhidden">
        <el-form  :inline="true" :model="formSearch" class="demo-form-inline " style="width:99%;maxHeight:102px;overflow-y:auto;overflow-x:hidden;">
            <div>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button size="small" @click="onReset">重置</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('查看历史') !== -1" size="small" type="primary" @click="seeHistory">查看历史</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('新增') !== -1" size="small" type="primary" @click="onAdd('add')">新增</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('编辑') !== -1" size="small" type="primary" @click="onAdd('edit')">编辑</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('审核') !== -1" size="small" type="primary" @click="command('audit')">审核</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('反审核') !== -1" size="small" type="primary" @click="command('unAudit')">反审核</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('推送') !== -1" size="small" type="primary" @click="onSend">推送</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('关闭') !== -1" size="small" type="primary" @click="onClosed">关闭</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('删除') !== -1" size="small" type="primary" @click="onDelete">删除</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('重新启用') !== -1" size="small" type="primary" @click="userAgain">重新启用</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('下载模板') !== -1" size="small" type="primary" @click="downLoad">下载模板</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('导入') !== -1" size="small" type="primary" @click="onUpload">导入</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('导出') !== -1" size="small" type="primary" @click="onExport">导出</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('发起调整指令') !== -1" size="small" type="primary" @click="startAdjust">发起调整指令</el-button>
                </el-form-item>
            </div>
            <el-form-item label="企划单号：" size="small">
                <el-input v-model="formSearch.bizNo" clearable placeholder="请输入" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="品牌：" size="small">
                <el-select v-model="formSearch.brand" clearable multiple filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in brandList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="季节：" size="small">
                <el-select v-model="formSearch.season" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in seasonList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="年份：" size="small">
                <el-date-picker v-model="formSearch.years" format="yyyy" type="year" style="width:150px" placeholder="选择年">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="波段：" size="small">
                <el-select v-model="formSearch.waveBand" clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in waveList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="企划状态：" size="small">
                <el-select v-model="formSearch.planningStatus" multiple clearable filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in planningStatusList" :key="item.name" :label="item.name" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注：" size="small">
                <el-input v-model="formSearch.remark" clearable placeholder="请输入" style="width:150px"></el-input>
            </el-form-item>
        </el-form>
    </header>
    <section class="middle" :style="maxHeight">
        <div style="float:right;position:absolute;top:10px;right:20px">
            <span @click="handleShowHidden('hidden')"><i v-if="showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-bottom"></i></span>
            <span @click="handleShowHidden('show')"><i v-if="!showhidden" style="font-size: 20px;cursor:pointer" class="el-icon-caret-top"></i></span>
        </div>
        
        <el-row style="overflow: hidden;">
             
            <el-col v-show="leftOrRight" style="float:left;width:200px;">
                <div :style="heightTree">
                    <el-tree :data="data" :props="defaultProps" :default-expand-all='true' :expand-on-click-node='false' highlight-current @node-click="handleNodeClick"></el-tree>
                </div>
            </el-col>
            <el-col  :style="styleRight">
                <span v-show="leftOrRight" style="float: left;" @click="handleLeftOrRight()"><i  style="font-size: 20px;cursor:pointer" class="el-icon-caret-left"></i></span>
                <span v-show="!leftOrRight" style="float: left;" @click="handleLeftOrRight()"><i  style="font-size: 20px;cursor:pointer" class="el-icon-caret-right"></i></span>
                <el-pagination style="text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
                <el-table :data="tableData" style="width: 100%" border highlight-current-row tooltip-effect="dark" @row-click="handleClickRow" @selection-change="handleSelectionMainChange" :height="oneTableHeight" size="mini">
                    <el-table-column type="selection" width="50"></el-table-column>
                    <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
                    <el-table-column prop="bizNo" label="企划单号" sortable min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="versionNumber" label="版本号" align="center" min-width="70" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="planningStatus" label="企划状态" sortable min-width="100" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="basicBrandName" label="品牌" sortable min-width="80" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="years" label="年份" sortable min-width="80" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="season" label="季节" sortable min-width="80" align="center" show-overflow-tooltip>
                        <!-- <template slot-scope="scope">{{scope.row.planningType == "10" ? "规划型首单" : "非规划型首单" }}</template> -->
                    </el-table-column>
                    <el-table-column prop="waveBand" label="波段" sortable min-width="80" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="planningDevelopDate" sortable label="规划开发日期" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="planningDeliverDate" sortable label="规划交接日期" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="colorSimpleDate" sortable label="齐色样日期" min-width="110" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="planningArriveDate" sortable label="规划到货日期" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="photoDate" label="拍照日期" sortable min-width="110" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="planningLaunchDate" sortable label="可上新日期" min-width="110" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="launchDate" sortable label="上新日期" min-width="110" align="center" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <!-- <div style="text-align:right;margin-top:20px">
                    <el-button style="text-align:right" size="mini" type="primary" @click="onDelete">删除</el-button>
                </div> -->
                 
                <div style="padding-top:10px;text-align:right;float:right;position:relative;z-index:1000" v-if="showhidden">
                    <span @click="clickDetails('show')"><i v-if="detailsShow == true" style="font-size: 20px;cursor:pointer;float:right" class="el-icon-caret-bottom"></i></span>
                    <span @click="clickDetails('hidden')"><i v-if="detailsShow == false" style="font-size: 20px;cursor:pointer;float:right" class="el-icon-caret-top"></i></span>
                </div>
                
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="明细" name="first">
                        <el-table :data="detailsData" style="width: 100%" border highlight-current-row tooltip-effect="dark" :summary-method="getSummaries"  show-summary :height="twoTableHeight" size="mini">
                            <el-table-column type="index" width="55" label="序号" fixed="left" align="center"></el-table-column>
                            <el-table-column prop="firstLevel" label="一级品类" fixed="left" sortable min-width="100" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="secondLevel" label="二级品类" fixed="left" sortable align="center" min-width="100" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="thirdLevel" label="三级品类" fixed="left" sortable min-width="100" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="series" label="系列" fixed="left" sortable min-width="70" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="developStyleQty" sortable label="开发款数" min-width="100" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="adjustStyleQty" sortable label="调整后开发款数" min-width="130" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="costLowerLimit" sortable label="成本下限" min-width="100" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="costUpperLimit" sortable label="成本上限" min-width="100" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="developCostPrice" sortable label="开发成本" min-width="100" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="colorRate" sortable label="色比" min-width="80" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="mainColorQty" sortable label="主色" min-width="80" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="subColorQty" sortable label="辅色" min-width="80" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="orderStyleQty" sortable label="下单款数" min-width="100" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="orderTotalQty" sortable label="下单数量" min-width="100" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="orderTotalAmount" sortable label="下单金额" min-width="100" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="remark" sortable label="明细备注" min-width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="操作日志" name="second">
                        <el-table :data="logList" style="width: 100%" border :height="twoTableHeight" tooltip-effect="dark">
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
                    </el-tab-pane>
                </el-tabs>
                
                
            </el-col>
        </el-row>

    </section>

    <!-- 新增弹框 -->
    <Modal v-model="dialogVisible" @on-cancel="addCancel" :styles="mystyle" :title="addtitle" :width="1240" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :rules="rules" ref="ruleForm" label-width="120px" :model="ruleForm" class="demo-ruleForm " :label-position="right">
                <Col span="6">
                <el-form-item label="企划单号：" size="small">
                    <el-input v-model="ruleForm.purchaseOrderNo" disabled placeholder="自动生成" style="width:180px"></el-input>
                </el-form-item>
                </Col>
                <Col span="6">
                <el-form-item label="品牌：" prop="brand" size="small">
                    <el-select v-model="ruleForm.brand" clearable :disabled="addtitle=='编辑'" @change="changeBrand(ruleForm.brand)" filterable placeholder="请选择" style="width:140px">
                        <el-option v-for="item in brandList" :key="item.value" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="6">
                <el-form-item label="季节：" prop="season" size="small">
                    <el-select v-model="ruleForm.season" clearable :disabled="addtitle=='编辑'" filterable placeholder="请选择" style="width:140px">
                        <el-option v-for="item in seasonList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="6">
                <el-form-item label="年份：" prop="year" size="small">
                    <el-date-picker style="width:140px" :disabled="addtitle=='编辑'" v-model="ruleForm.year" type="year" placeholder="请选择"> </el-date-picker>
                </el-form-item>
                </Col>
                <Col span="6">
                <el-form-item label="波段：" prop="waveBand" size="small">
                    <el-select v-model="ruleForm.waveBand" clearable :disabled="addtitle=='编辑'" filterable placeholder="请选择" style="width:140px">
                        <el-option v-for="item in waveList" :key="item.value" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="6">
                <el-form-item label="规划开发日期：" prop="developDate" size="small">
                    <el-date-picker v-model="ruleForm.developDate" type="date" :picker-options="pickerOptions" style="width:140px" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                </Col>
                <Col span="6">
                <el-form-item label="规划交接日期：" prop="handoverDate" size="small">
                    <el-date-picker style="width:140px" v-model="ruleForm.handoverDate" type="date" :picker-options="pickerOptions" placeholder="请选择"> </el-date-picker>
                </el-form-item>
                </Col>
                <Col span="6">
                <el-form-item label="齐色样日期：" prop="colorDate" size="small">
                    <el-date-picker style="width:140px" v-model="ruleForm.colorDate" type="date" :picker-options="pickerOptions" placeholder="请选择"> </el-date-picker>
                </el-form-item>
                </Col>
                <Col span="6">
                <el-form-item label="规划到货日期：" prop="arriveDate" size="small">
                    <el-date-picker style="width:140px" v-model="ruleForm.arriveDate" type="date" :picker-options="pickerOptions" placeholder="请选择"> </el-date-picker>
                </el-form-item>
                </Col>
                <Col span="6">
                <el-form-item label="拍照日期：" prop="photoDate" size="small">
                    <el-date-picker style="width:140px" v-model="ruleForm.photoDate" type="date" :picker-options="pickerOptions" placeholder="请选择"> </el-date-picker>
                </el-form-item>
                </Col>
                <Col span="6">
                <el-form-item label="可上新日期：" prop="canUpnewDate" size="small">
                    <el-date-picker style="width:140px" v-model="ruleForm.canUpnewDate" type="date" :picker-options="pickerOptions" placeholder="请选择"> </el-date-picker>
                </el-form-item>
                </Col>
                <Col span="6">
                <el-form-item label="上新日期：" prop="upnewDate" size="small">
                    <el-date-picker style="width:140px" v-model="ruleForm.upnewDate" type="date" :picker-options="pickerOptions"  placeholder="请选择"> </el-date-picker>
                </el-form-item>
                </Col>
                <Col span="6">
                <el-form-item label="比率：" prop="bilv" size="small">
                    <el-input-number style="width:110px" v-model="ruleForm.bilv" size="mini" controls-position="right" :precision="2" :min="0.1" :max="1000000"></el-input-number>
                </el-form-item>
                </Col>
                <Col span="18">
                <el-form-item label="备注：" size="small">
                    <el-input v-model="ruleForm.remark" placeholder="请输入" style="width:730px"></el-input>
                </el-form-item>
                </Col>
            </el-form>
        </Row>
        <Button type="primary" @click="addTable">添加</Button>
        <Button type="default" @click="deleteTable">删除</Button>
        <el-table :data="addTableList" style="width: 100%" @selection-change="handleSelectionChange" border tooltip-effect="dark" :max-height="340" size="mini">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="55" fixed="left" label="序号" align="center"></el-table-column>
            <el-table-column prop="one" label="品类" fixed="left" min-width="280" align="center">
                <template slot-scope="scope">
                    <el-cascader v-model="scope.row.one" style="width:250px" size="mini" filterable placeholder="一级品类/二级品类/三级品类" :options="oneList" :props="optionProps"></el-cascader>
                    <span style="color:red" v-if="scope.row.one==undefined||scope.row.one==''">*</span>
                </template>
            </el-table-column>
            <el-table-column prop="xl" label="系列" min-width="140" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-input v-model="scope.row.xl" placeholder="请输入" size="mini" style="width:110px"></el-input>
                    <span style="color:red" v-if="scope.row.xl==undefined||scope.row.xl==''">*</span>
                </template>
            </el-table-column>
            <el-table-column prop="kfks" label="开发款数" min-width="140" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-input-number style="width:110px" v-model="scope.row.kfks" size="mini" controls-position="right" :precision="0" :min="1" :max="1000000"></el-input-number>
                    <span style="color:red" v-if="scope.row.kfks==undefined||scope.row.kfks==''">*</span>
                </template>
            </el-table-column>
            <el-table-column prop="cbxx" label="成本下限" min-width="140" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-input-number style="width:110px" v-model="scope.row.cbxx" size="mini" controls-position="right" :precision="2" :min="0" :max="1000000"></el-input-number>
                    <span style="color:red" v-if="scope.row.cbxx==undefined||scope.row.cbxx==''">*</span>
                </template>
            </el-table-column>
            <el-table-column prop="cbsx" label="成本上限" min-width="140" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-input-number style="width:110px" v-model="scope.row.cbsx" size="mini" controls-position="right" :precision="2" :min="0" :max="1000000"></el-input-number>
                    <span style="color:red" v-if="scope.row.cbsx==undefined||scope.row.cbsx==''">*</span>
                </template>
            </el-table-column>
            <el-table-column prop="kfcb" label="开发成本" min-width="140" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-input-number style="width:110px" v-model="scope.row.kfcb" size="mini" controls-position="right" :precision="2" :min="0" :max="1000000"></el-input-number>
                    <span style="color:red" v-if="scope.row.kfcb==undefined||scope.row.kfcb==''">*</span>
                </template>
            </el-table-column>
            <el-table-column prop="sb" label="色比" min-width="140" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-input-number style="width:110px" v-model="scope.row.sb" size="mini" controls-position="right" :precision="2" :min="1" :max="1000000"></el-input-number>
                    <span style="color:red" v-if="scope.row.sb==undefined||scope.row.sb==''">*</span>
                </template>
            </el-table-column>
            <el-table-column prop="zs" label="主色" min-width="140" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-input-number style="width:110px" v-model="scope.row.zs" size="mini" controls-position="right" :precision="0" :min="0" :max="1000000"></el-input-number>
                    <span style="color:red" v-if="scope.row.zs==undefined||scope.row.zs==''">*</span>
                </template>
            </el-table-column>
            <el-table-column prop="fs" label="辅色" min-width="140" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-input-number style="width:110px" v-model="scope.row.fs" size="mini" controls-position="right" :precision="0" :min="0" :max="1000000"></el-input-number>
                    <span style="color:red" v-if="scope.row.fs==undefined||scope.row.fs==''">*</span>
                </template>
            </el-table-column>
            <el-table-column prop="xdkl" label="下单款数"  fixed="right" min-width="110" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{(scope.row.kfks==undefined||ruleForm.bilv==undefined||ruleForm.bilv=='')?0: (scope.row.kfks*ruleForm.bilv).toFixed(2)}}
                    <!-- <el-input-number style="width:110px" v-model="scope.row.xdkl" size="mini" controls-position="right" :precision="2" :min="0" :max="1000000"></el-input-number>
                    <span style="color:red" v-if="scope.row.xdkl==undefined||scope.row.xdkl==''">*</span> -->
                </template>
            </el-table-column>
            <el-table-column prop="xdsl" label="下单数量" fixed="right" min-width="110" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{(scope.row.sb==undefined||scope.row.kfks==undefined||scope.row.zs==undefined||scope.row.fs==undefined||ruleForm.bilv==undefined||ruleForm.bilv=='')? 0 : Math.floor((scope.row.kfks*ruleForm.bilv*scope.row.zs)+(scope.row.kfks*ruleForm.bilv*scope.row.fs*(scope.row.sb - 1)))}}
                </template>
            </el-table-column>
            <el-table-column prop="xdje" label="下单金额" fixed="right" min-width="110" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{(scope.row.sb==undefined||scope.row.kfcb==undefined||scope.row.kfks==undefined||scope.row.zs==undefined||scope.row.fs==undefined||ruleForm.bilv==undefined||ruleForm.bilv=='')?0:(scope.row.kfcb * Math.floor((scope.row.kfks*ruleForm.bilv*scope.row.zs)+(scope.row.kfks*ruleForm.bilv*scope.row.fs*(scope.row.sb - 1)))).toFixed(2)}}
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" min-width="140" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-input style="width:110px" type="textarea" v-model="scope.row.remark" size="mini" placeholder="请输入内容"></el-input>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer">
            <Button type="primary" @click="addSave('ruleForm')">确认</Button>
            <Button type="default" @click="addCancel">取消</Button>
        </div>
    </Modal>

    <!--导入文件-->
    <Modal v-model="uploadVisible" @on-cancel="cancelUpload" title="导入文件">
        <div>
            <Upload ref="upload" name="file" :show-upload-list="false" :before-upload="handleUpload" :on-success="uploadSuccess" :on-error="uploadError" type="drag" action="/eop-boot/payable/deductionAdvice/uploadAsync" :data="{}">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或将文件拖拽到此处</p>
                </div>
            </Upload>
            <div v-if="file !== null">{{ file.name }}
                <Button type="text" :loading="loadingStatus">{{ loadingStatus ? '上传中...' : '' }}
                </Button>
            </div>
        </div>
        <div slot="footer">
            <Button type="default" @click="cancelUpload">取消</Button>
            <Button type="primary" @click="saveUpload">确定</Button>
        </div>
    </Modal>

     <!--发起调整指令-->
    <Modal v-model="startAdjustVisible" @on-cancel="cancelStartAdjust" title="发起调整指令" :width="940">
        <el-form :rules="startAdjustRules" ref="startAdjustForm" label-width="120px" :model="startAdjustForm" class="demo-ruleForm " :label-position="right">
            <el-row>
            <el-col :span="8">
            <el-form-item label="品牌名称：" prop="brand" size="small">
                <el-select v-model="startAdjustForm.brand" clearable filterable placeholder="请选择" style="width:140px">
                    <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            </el-col>
             <el-col :span="8">
            <el-form-item label="调整类型：" prop="changeType" size="small">
                <el-select v-model="startAdjustForm.changeType" multiple clearable filterable placeholder="请选择" style="width:140px">
                    <el-option v-for="item in adjustTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            </el-col>
            
            <el-col :span="8">
            <el-form-item label="年份：" prop="year" size="small">
                <el-select v-model="startAdjustForm.year" multiple clearable filterable placeholder="请选择" style="width:140px">
                    <el-option v-for="item in yearList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="24">
            <el-form-item label="调整建议：" prop="remark" size="small">
                <el-input type="textarea" maxlength="300" clearable  show-word-limit v-model="startAdjustForm.remark" placeholder="请输入" style="width:600px"></el-input>
            </el-form-item>
            </el-col>
            </el-row>

        </el-form>
        <div slot="footer">
            <Button type="default" @click="cancelStartAdjust">取消</Button>
            <Button type="primary" @click="saveStartAdjust">确定</Button>
        </div>
    </Modal>

    <!--查看历史-->
    <Modal v-model="historyVisible" @on-cancel="cancelHistory" title="查看历史" :width="1240">
        <el-row>
            <div style="margin-bottom:20px">
                <span style="margin-left:20px;font-size:14px">选择版本：</span>
                <el-select v-model="historyFormVersionNumber" size="small" filterable placeholder="请选择" style="width:80px">
                    <el-option v-for="item in historyVersionList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <Button style="margin-left:20px" type="primary" @click="searchbanben(historyFormVersionNumber)">查询</Button>
            </div>

            <el-form ref="historyForm" label-width="120px" :model="historyForm" class="demo-ruleForm " :label-position="right">
                <el-col :span="6">
                    <el-form-item label="企划单号：" prop="brand" size="small">
                        {{historyForm.bizNo}}
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="品牌：" prop="brand" size="small">
                        {{historyForm.basicBrandName}}
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="季节：" prop="brand" size="small">
                        {{historyForm.season}}
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="年份：" prop="brand" size="small">
                        {{historyForm.years}}
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="波段：" prop="brand" size="small">
                        {{historyForm.waveBand}}
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="规划开发日期：" prop="brand" size="small">
                        {{historyForm.planningDevelopDate}}
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="规划交接日期：" prop="brand" size="small">
                        {{historyForm.planningDeliverDate}}
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="齐色样日期：" prop="brand" size="small">
                        {{historyForm.colorSimpleDate}}
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="规划到货日期：" prop="brand" size="small">
                        {{historyForm.planningArriveDate}}
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="拍照日期：" prop="brand" size="small">
                        {{historyForm.photoDate}}
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="可上新日期：" prop="brand" size="small">
                        {{historyForm.planningLaunchDate}}
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="上新日期：" prop="brand" size="small">
                        {{historyForm.launchDate}}
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注：" prop="brand" size="small">
                        {{historyForm.remark}}
                    </el-form-item>
                </el-col>
            </el-form>

            <el-table :data="historyList" style="width: 100%" border tooltip-effect="dark" :max-height="500" size="mini">
                <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                <el-table-column prop="firstLevel" label="一级品类" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="secondLevel" label="二级品类" align="center" min-width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="thirdLevel" label="三级品类" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="series" label="系列" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="developStyleQty" label="开发款数" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="adjustStyleQty" label="调整后开发款数" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="costLowerLimit" label="成本下限" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="costUpperLimit" label="成本上限" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="developCostPrice" label="开发成本" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="colorRate" label="色比" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mainColorQty" label="主色" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="subColorQty" label="辅色" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="orderStyleQty" label="下单款数" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="orderTotalQty" label="下单数量" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="orderTotalAmount" label="下单金额" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="remark" label="备注" min-width="120" align="center" show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </el-row>
        <div slot="footer">
            <Button type="default" @click="cancelHistory">取消</Button>
            <Button type="primary" @click="saveHistory">确定</Button>
        </div>
    </Modal>

    <!--导出二次确认-->
    <Modal v-model="exportVisible" @on-cancel="cancelexportVisible" title="导出确认" :width="340">
        {{'目前要导出的数据超过10万条，确定继续导出吗?'}}
        <div slot="footer">
            <Button type="default" @click="cancelexportVisible">取消</Button>
            <Button type="primary" @click="saveexportVisible">确定</Button>
        </div>
    </Modal>
</div>
</template>

<script>
import {
    commonMixins
} from 'mixins/common';
// import {
//     debounce
// } from 'mixins/debounce'
import Util from 'libs/util'
export default {
    mixins: [commonMixins],
    data() {
        return {
            leftOrRight:true,
            detailsShow:false,
            pickerOptions: {
         disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          },
        }, 
            historyFormVersionNumber:'',
            historyVersionList: [], //版本下拉
            historyList: [],
            historyForm: {},
            historyVisible: false,
            startAdjustVisible: false,
            startAdjustForm: {
                brand: '',
                changeType: [],
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
            uploadVisible: false,
            file: null,
            selectionList: [],
            optionProps: {
                value: 'text',
                label: 'text',
                children: 'children'
            },
            adjustObj: {},
            oneList: [],
            addTableList: [],
            dialogVisible: false,
            ruleForm: {
                purchaseOrderNo: '',
                brand: '',
                season: '',
                year: '',
                waveBand: '',
                developDate: '',
                handoverDate: '',
                colorDate: '',
                arriveDate: '',
                photoDate: '',
                canUpnewDate: '',
                upnewDate: '',
                remark: '',
                bilv:0.8
            },
            rules: {
                 bilv: [{
                    required: true,
                    message: '请输入',
                    trigger: 'blur'
                }],
                purchaseOrderNo: [{
                    required: true,
                    message: '请输入企划单号',
                    trigger: 'blur'
                }],
                brand: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                season: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                year: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                waveBand: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                developDate: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                handoverDate: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                colorDate: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                arriveDate: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                photoDate: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                canUpnewDate: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                upnewDate: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
            },
            goodsList: [],
            designCodeList: [],
            suitTypeList: [],
            fabricTypeList: [],
            heightTree: '',
            oneTableHeight: '',
            twoTableHeight: '',
            data: [],
            defaultProps: {
                children: 'children',
                label: 'text'
            },
            showhidden: false,
            formSearch: {
                planningStatus:[],
                years:'',
                bizNo:'',
                brand:[],
                season:'',
                waveBand:'',
                remark:''
            },
            maxHeight: '',
            logList: [], //日志
            billNo: '',
            total: 0,
            pagesize: 10,
            logpage:1,
            currentPage: 1,
            tableData: [], //主table数据
            tableJournal: [], //操作日志数据
            buttonList: [], //按钮权限
            judgeMenu: [],
            pageSecond: false,
            clickTree: '',
            rowLenght: 0,
            selectObj: {},
            detailsData: [], //明细数组
            activeName: 'first',
            selectMain: [],
            exportVisible: false,
            visibleStatus:null,
            styleRight:'float:left;width:calc(100% - 200px);'
        }
    },
    created(){
        
        if (document.body.offsetHeight > 800) {
            this.heightTree = 'height:' + (document.body.offsetHeight - 250) + 'px;overflow-x:hidden;overflow-y:scroll'
            this.oneTableHeight = (document.body.offsetHeight - 260) * 0.5
            this.twoTableHeight = (document.body.offsetHeight - 260) * 0.37
            this.maxHeight = 'height:' + (document.body.offsetHeight - 235) + 'px'
        } else {
            this.twoTableHeight = (document.body.offsetHeight - 260) * 0.38
            this.oneTableHeight = (document.body.offsetHeight - 260) * 0.45
            this.maxHeight = 'height:' + (document.body.offsetHeight - 235) + 'px'
            this.heightTree = 'height:' + (document.body.offsetHeight - 250) + 'px;overflow-x:hidden;overflow-y:scroll'
        }
    },
    mounted() {
        this.getYearList()
        this.getBrandList()
        this.getwaveList()
        this.getAdjustType()
        // this.getPlanningStatus()
        this.request('goods_planning_manage_constant', { type: "planning_adjust_type" }, true).then(res => {
                if (res.code == 1) {
                    let list = []
                    res.data.map((item)=>{
                        if(item.code != '6'){
                            list.push(item)
                        }
                    })
                    this.adjustTypeList = list
                    console.log(this.adjustTypeList,'09')
                }
            })
        this.formSearch.years = new Date().getFullYear().toString()
        this.getTreeData()
        this.getButtonJurisdiction() //按钮权限
    },
    methods: {
        handleLeftOrRight(){
            if(this.leftOrRight){
                this.leftOrRight = false
                this.styleRight = 'float:left;;'
            }else{
                this.leftOrRight = true
                this.styleRight = 'float:left;width:calc(100% - 200px);'
            }
        },
        handleShowHidden(name) {
            this.detailsShow = false
            if (name == 'show') {
                this.showhidden = true
                if (document.body.offsetHeight > 800) {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 100) + 'px'
                    this.oneTableHeight = (document.body.offsetHeight - 100) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 100) * 0.37
                    this.heightTree = 'height:' + (document.body.offsetHeight - 100) + 'px;overflow-x:hidden;overflow-y:scroll'
                } else {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 100) + 'px'
                    this.oneTableHeight = (document.body.offsetHeight - 100) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 100) * 0.35
                    this.heightTree = 'height:' + (document.body.offsetHeight - 100) + 'px;overflow-x:hidden;overflow-y:scroll'
                }

            } else {
                this.showhidden = false
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight - 260) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 260) * 0.37
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 235) + 'px'
                    this.heightTree = 'height:' + (document.body.offsetHeight - 250) + 'px;overflow-x:hidden;overflow-y:scroll'
                } else {
                    this.maxHeight = 'height:' + (document.body.offsetHeight - 235) + 'px'
                    this.heightTree = 'height:' + (document.body.offsetHeight - 250) + 'px;overflow-x:hidden;overflow-y:scroll'
                    this.oneTableHeight = (document.body.offsetHeight - 260) * 0.45
                    this.twoTableHeight = (document.body.offsetHeight - 260) * 0.38
                }
            }
        },
        clickDetails(name){
            if(!this.showhidden){
                if (name == 'show') {
                this.detailsShow = false
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight - 260) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 260) * 0.35
                } else {
                    this.oneTableHeight = (document.body.offsetHeight - 260) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 260) * 0.35
                }

            } else {
                this.detailsShow = true
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight - 260) * 0.37
                    this.twoTableHeight = (document.body.offsetHeight - 260) * 0.5
                } else {
                    this.oneTableHeight = (document.body.offsetHeight - 260) * 0.35
                    this.twoTableHeight = (document.body.offsetHeight - 260) * 0.5
                }
            }
            }else{
                if (name == 'show') {
                this.detailsShow = false
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight - 100) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 100) * 0.35
                } else {
                    this.oneTableHeight = (document.body.offsetHeight - 100) * 0.5
                    this.twoTableHeight = (document.body.offsetHeight - 100) * 0.35
                }

            } else {
                this.detailsShow = true
                if (document.body.offsetHeight > 800) {
                    this.oneTableHeight = (document.body.offsetHeight - 100) * 0.35
                    this.twoTableHeight = (document.body.offsetHeight - 100) * 0.5
                } else {
                    this.oneTableHeight = (document.body.offsetHeight - 100) * 0.35
                    this.twoTableHeight = (document.body.offsetHeight - 100) * 0.5
                }
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
        //单机主数据
        handleClickRow(row) {
            let data = {}
            data.mainId = row.id
            this.request('goods_planning_manage_detail', data, true).then(res => {
                if (res.code == 1) {
                    this.detailsData = res.data
                }
            })
            this.getLoglist(row.id)
        },
        //选中数据
        handleSelectionMainChange(row) {
            let list = []
            row.map((item) => {
                list.push(item.id)
            })
            this.selectMain = list
            this.rowLenght = row.length
            this.selectObj = row[0]
        },
        //选择删除的数据
        handleSelectionChange(row) {
            this.selectionList = row
        },
        getData() {
            this.getTreeData()
            this.getTableData('')
        },
        getTreeData() {
            this.logList = []
            this.detailsData = []
            let data = {}
            data.bizNo = this.formSearch.bizNo
            data.brandIds = this.formSearch.brand
            data.season = this.formSearch.season
            data.planningStatuss = this.formSearch.planningStatus
            this.formSearch.years ? data.years = Util.dateFormat(this.formSearch.years, 'yyyy') : delete data.years
            data.waveBand = this.formSearch.waveBand
            data.remark = this.formSearch.remark
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            this.request('tree_statusCount', data, true).then(res => {
                if (res.code == 1) {
                    let count = 0
                    res.data.map((item) => {
                        count = count + item.count
                        this.$set(item, 'text', item.planningStatusName + '(' + item.count + ')')
                        return count
                    })
                    let list = [{
                        text: '全部' + '(' + count + ')',
                        children: res.data
                    }]
                    this.data = list
                } else {
                    this.$message.error(res.msg)
                    this.data = []
                }
            })
        },
        getTableData(planningStatus) {
            this.logList = []
            this.detailsData = []
            let data = {}
            data.bizNo = this.formSearch.bizNo
            data.brandIds = this.formSearch.brand
            data.season = this.formSearch.season
            this.formSearch.years ? data.years = Util.dateFormat(this.formSearch.years, 'yyyy') : delete data.years
            data.waveBand = this.formSearch.waveBand
            data.planningStatuss = this.formSearch.planningStatus
            data.treePlanningStatus = planningStatus
            data.remark = this.formSearch.remark
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            this.request('goods_planning_manage_query', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.total
                    this.tableData = res.data.records
                } else {
                    this.$message.error(res.msg)
                    this.total = 0
                    this.tableData = []
                }
            })
        },
        handleNodeClick(obj) {
            console.log(obj,'////////////////')
            this.currentPage = 1
            this.visibleStatus = obj.planningStatus
            this.getTableData(obj.planningStatus)
        },
        getLoglist(billNo) {
            this.billNo = billNo
            this.logpage = 1
            let data = {}
            data.billNo = "master_data_planning_manage_" + this.billNo
            data.pageSize = 3
            data.currentPage = this.logpage
            this.request('billLog_getPagingByBillNo', data, true).then((res) => {
                if (res.code == 1) {
                    if (res.data.length < data.pageSize) {
                        this.dataFlag = false
                    } else {
                        this.dataFlag = true
                    }
                    if (this.logpage == 1) {
                        this.logList = res.data
                    } else {
                        this.logList = this.logList.concat(res.data)
                    }
                }
            })
        },
        getMore() {
            this.logpage++
            let data = {}
            data.billNo = "master_data_planning_manage_" + this.billNo
            data.pageSize = 3
            data.currentPage = this.logpage
            this.request('billLog_getPagingByBillNo', data, true).then((res) => {
                if (res.code == 1) {
                    if (res.data.length < data.pageSize) {
                        this.dataFlag = false
                    } else {
                        this.dataFlag = true
                    }
                    if (this.logpage == 1) {
                        this.logList = res.data
                    } else {
                        this.logList = this.logList.concat(res.data)
                    }
                }
            })
        },
        getplatformOptions() {
            this.request('getPlatformSelector', {}, true).then(res => {
                if (res.code == 1) {
                    this.platformOptions = res.data;
                }
            })
        },
        //审核，反审核
        command(name) {
            let massage = ''
            if (name == 'audit') {
                massage = '审核'
            } else {
                massage = '反审核'
            }
            let arr = this.selectMain
            if (arr.length > 0) {
                this.$confirm(massage + '选中的数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = {}
                    data.ids = arr
                    data.command = name
                    this.request('goods_planning_manage_command', data, true).then(res => {
                        if (res.code == 1) {
                            this.$message.success(massage + '成功')
                            this.getData()
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消' + massage
                    });
                });
            } else {
                this.$message.error("请先选择" + massage + "的数据！");
            }
        },
        //推送
        onSend() {
            let arr = this.selectMain
            this.$confirm('推送选中的数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(!!this.visibleStatus,'////////')
                let data = {}
                data.ids = arr
                data.bizNo = this.formSearch.bizNo
                data.brandIds = this.formSearch.brand
                data.season = this.formSearch.season
                this.formSearch.years ? data.years = Util.dateFormat(this.formSearch.years, 'yyyy') : delete data.years
                !!this.visibleStatus ? data.planningStatuss = [this.visibleStatus] : data.planningStatuss = this.formSearch.planningStatus
                data.waveBand = this.formSearch.waveBand
                data.remark = this.formSearch.remark
                this.request('goods_planning_manage_send', data, true).then(res => {
                    if (res.code == 1) {
                        this.$message.success('推送成功')
                        this.getData()
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消推送'
                });
            });
        },
        //关闭
        onClosed() {
            let arr = this.selectMain
            if (arr.length == 1) {
                this.$confirm('关闭选中的数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = {}
                    data.id = arr[0]
                    this.request('goods_planning_manage_close', data, true).then(res => {
                        if (res.code == 1) {
                            this.$message.success('关闭成功')
                            this.getData()
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消关闭'
                    });
                });
            } else {
                this.$message.error("请先选择一条关闭的数据！");
            }
        },
        //删除
        onDelete() {
            let arr = this.selectMain
            if (arr.length > 0) {
                this.$confirm('删除选中的数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = {}
                    data.ids = arr
                    this.request('goods_planning_manage_delete', data, true).then(res => {
                        if (res.code == 1) {
                            this.$message.success('删除成功')
                            this.getData()
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            } else {
                this.$message.error("请先选择删除的数据！");
            }
        },
        //重新启用
        userAgain() {
            let arr = this.selectMain
            if (arr.length == 1) {
                this.$confirm('重新启用选中的数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = {}
                    data.id = arr[0]
                    this.request('goods_planning_manage_startAgain', data, true).then(res => {
                        if (res.code == 1) {
                            this.$message.success('重新启用成功')
                            this.getData()
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消重新启用'
                    });
                });
            } else {
                this.$message.error("请先选择一条重新启用的数据！");
            }
        },
        //下载模板
        downLoad() {
            window.location = ('https://eptison.oss-cn-hangzhou.aliyuncs.com/upload/prd/eop-fms/ BossGoodsPlanningManageController/uploadTemplate/企划管理导入模板.xlsx')
        },
        //导入
        onUpload() {
            this.uploadVisible = true
        },
        //上传之前
        handleUpload(file) {
            if (!/\.csv$|.xls$|.xlsm$|.xlsx$|.xlt$/.test(file.name)) {
                this.$message.warning('文件类型不符,请重新选择文件');
                return false
            } else {
                this.file = file
            }
            return false
        },

        //上传成功之后
        uploadSuccess(res, file) {
            Vue.prototype.$loading.close();
            if (res.code == '1') {
                this.loadingStatus = false;
                this.file = null;
                this.$message.success(res.msg);
            } else {
                this.loadingStatus = false;
                this.$message.error({
                    content: res.msg,
                    duration: 3
                });
            }
        },
        uploadError(res, file) {
            this.$message.error(res.msg);
        },
        //确定上传
        saveUpload() {
            if (this.file == null) {
                this.$message.warning('请先选择文件再导入')
            } else {
                let data = new FormData
                data.append('file', this.file)
                this.request('goods_planning_manage_uploadAsync', data, true).then((res) => {
                    if (res.code == 1) {
                        this.file = null
                        this.uploadVisible = false
                        this.getKeyD(res.data)
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            }
        },
        //取消上传
        cancelUpload() {
            this.uploadVisible = false
            this.file = null
        },
        //导出
        onExport() {
            let data = {}
            let arr = this.selectMain
            data.ids = arr
            data.bizNo = this.formSearch.bizNo
            data.brandIds = this.formSearch.brand
            data.season = this.formSearch.season
            this.formSearch.years ? data.years = Util.dateFormat(this.formSearch.years, 'yyyy') : delete data.years
            data.waveBand = this.formSearch.waveBand
            data.remark = this.formSearch.remark
            data.planningStatuss = this.formSearch.planningStatus
            this.request('goods_planning_manage_exportCount', data, true).then(res => {
                if (res.code == 1) {
                    if (res.data > 100000) {
                        this.exportVisible = true
                    } else {
                        this.saveexportVisible()
                    }
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        //确认导出
        saveexportVisible() {
            let data = {}
            let arr = this.selectMain
            data.ids = arr
            data.bizNo = this.formSearch.bizNo
            data.brandIds = this.formSearch.brand
            data.season = this.formSearch.season
            this.formSearch.years ? data.years = Util.dateFormat(this.formSearch.years, 'yyyy') : delete data.years
            data.waveBand = this.formSearch.waveBand
            data.remark = this.formSearch.remark
            data.planningStatuss = this.formSearch.planningStatus
            this.request('goods_planning_manage_export', data, true).then(res => {
                if (res.code == 1) {
                    this.exportVisible = false
                    this.getKey(res.data)
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        //取消导出
        cancelexportVisible() {
            this.exportVisible = false
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
                    // let obj = {}
                    // this.adjustTypeList.map((i) => {
                    //     if (i.id == this.startAdjustForm.changeType) {
                    //         obj = i
                    //     }
                    // })
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
                    // data.adjustTypeName = obj.name
                    // data.adjustTypeCode = obj.code
                    data.asjustAdvise = this.startAdjustForm.remark
                    this.request('goods_planning_manage_createAdjust', data, true).then(res => {
                        if (res.code == 1) {
                            this.$message.success('保存调整指令成功')
                            this.getData()
                            this.startAdjustForm = {
                                brand: '',
                                changeType: [],
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
                changeType: [],
                year: [],
                remark: ''
            }
            this.$refs['startAdjustForm'].resetFields();
        },
        //查看历史
        seeHistory() {
            if (this.rowLenght == 0) {
                this.$message.warning('请先选择查看的数据')
            } else if (this.rowLenght > 1) {
                this.$message.warning('一次只能查看一条数据')
            } else {
                this.historyForm = this.selectObj
                this.historyFormVersionNumber = this.selectObj.versionNumber
                this.historyVisible = true
                let data = {}
                data.bizNo = this.selectObj.bizNo
                this.request('goods_planning_manage_versionSelector', data, true).then(res => {
                    if (res.code == 1) {
                        this.historyVersionList = res.data.versionNumbers
                    }
                })
                this.searchbanben(this.selectObj.versionNumber)
            }
        },
        getmingxi(id){
            let data = {}
            data.mainId = id
            this.request('goods_planning_manage_detail', data, true).then(res => {
                if (res.code == 1) {
                    this.historyList = res.data
                }
            })
        },
        searchbanben(number){
            let data = {}
            data.bizNo = this.historyForm.bizNo
            data.versionNumber = number
            this.request('goods_planning_manage_queryHistory', data, true).then(res => {
                if (res.code == 1) {
                    this.historyForm = res.data
                    this.historyList = res.data.planningParameterDetailVOS
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        cancelHistory() {
            this.historyVisible = false
            this.historyForm = {}
            this.historyList = []
        },
        saveHistory() {
            this.historyVisible = false
            this.historyForm = {}
            this.historyList = []
        },
        handleSizeChange(val) {
            if(this.visibleStatus != null){
                this.pagesize = val
                this.logList = []
            this.detailsData = []
            let data = {}
            data.bizNo = this.formSearch.bizNo
            data.brandIds = this.formSearch.brand
            data.season = this.formSearch.season
            this.formSearch.years ? data.years = Util.dateFormat(this.formSearch.years, 'yyyy') : delete data.years
            data.waveBand = this.formSearch.waveBand
            data.planningStatuss = this.formSearch.planningStatus
            data.treePlanningStatus = this.visibleStatus
            data.remark = this.formSearch.remark
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            this.request('goods_planning_manage_query', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.total
                    this.tableData = res.data.records
                } else {
                    this.$message.error(res.msg)
                    this.total = 0
                    this.tableData = []
                }
            })
            }else{
                this.pagesize = val
                this.getData()
            }
        },
        handleCurrentChange(val) {
            if(this.visibleStatus != null){
                this.currentPage = val
                this.logList = []
            this.detailsData = []
            let data = {}
            data.bizNo = this.formSearch.bizNo
            data.brandIds = this.formSearch.brand
            data.season = this.formSearch.season
            this.formSearch.years ? data.years = Util.dateFormat(this.formSearch.years, 'yyyy') : delete data.years
            data.waveBand = this.formSearch.waveBand
            data.planningStatuss = this.formSearch.planningStatus
            data.treePlanningStatus = this.visibleStatus
            data.remark = this.formSearch.remark
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            this.request('goods_planning_manage_query', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.total
                    this.tableData = res.data.records
                } else {
                    this.$message.error(res.msg)
                    this.total = 0
                    this.tableData = []
                }
            })
            }else{
                this.currentPage = val
            this.getData()
            }
        },
        getByPuniqueKey() {
            let data = {}
            this.request('basicStyleType_getStyleTree', data, true).then(res => {
                if (res.code == 1) {
                    let arr = res.data.children
                    this.oneList = this.deleteChildren(arr)
                } else {
                    this.$message.error(res.msg)
                    this.data = []
                }
            })
        },
        //遍历树结构，当节点的children为空时，删除children
        deleteChildren(arr) {
            let childs = arr
            for (let i = childs.length; i--; i > 0) {
                if (childs[i].children) {
                    if (childs[i].children.length) {
                        this.deleteChildren(childs[i].children)
                    } else {
                        delete childs[i].children
                    }
                }
            }
            return arr
        },
        onAdd(name) {
            if (name == 'add') {
                this.dialogVisible = true
                this.addtitle = '新增'
                this.ruleForm.bilv = 0.8
                this.getByPuniqueKey(1)
            } else if (name == 'edit') {
                this.addtitle = '编辑'
                if (this.rowLenght == 0) {
                    this.$message.warning('请先选择编辑的数据')
                } else if (this.rowLenght > 1) {
                    this.$message.warning('一次只能编辑一条数据')
                } else {
                    if(this.selectObj.planningStatus != '待审核'){
                        this.$message.warning('所选数据企划状态不为待审核不能编辑！')
                    }else{
                        this.getByPuniqueKey(1)
                        this.dialogVisible = true
                    this.ruleForm.purchaseOrderNo = this.selectObj.bizNo //企划单号
                    this.ruleForm.brand = this.selectObj.basicBrandId // 品牌
                    this.ruleForm.season = this.selectObj.season //季节
                    this.ruleForm.year = this.selectObj.years.toString() //年份
                    this.ruleForm.waveBand = this.selectObj.waveBand //波段
                    this.ruleForm.developDate = this.selectObj.planningDevelopDate //开发日期s
                    this.ruleForm.handoverDate = this.selectObj.planningDeliverDate //规划交接日期
                    this.ruleForm.colorDate = this.selectObj.colorSimpleDate //齐色样日期
                    this.ruleForm.arriveDate = this.selectObj.planningArriveDate //到货日期
                    this.ruleForm.photoDate = this.selectObj.photoDate //拍照日期
                    this.ruleForm.canUpnewDate = this.selectObj.planningLaunchDate //可上新日期
                    this.ruleForm.upnewDate = this.selectObj.launchDate //上新日期
                    this.ruleForm.remark = this.selectObj.remark //备注
                    this.ruleForm.bilv = this.selectObj.orderRatio//比率
                    let data = {}
                    data.mainId = this.selectObj.id
                    this.request('goods_planning_manage_detail', data, true).then(res => {
                        if (res.code == 1) {
                            res.data.map((item) => {
                                this.addTableList.push({
                                    one: [item.firstLevel, item.secondLevel, item.thirdLevel],
                                    xl: item.series,
                                    kfks: item.developStyleQty,
                                    cbxx: item.costLowerLimit,
                                    cbsx: item.costUpperLimit,
                                    kfcb: item.developCostPrice,
                                    sb: item.colorRate,
                                    zs: item.mainColorQty,
                                    fs: item.subColorQty,
                                    // xdkl: item.orderStyleQty,
                                    remark: item.remark,
                                    mainId: item.mainId,
                                    id:item.id
                                })
                            })
                        }
                    })
                    }
                }
            }
        },
        //新增
        addSave() {
            let brand = {}
            //获取品牌所有信息
            this.brandList.map((i) => {
                if (i.id == this.ruleForm.brand) {
                    brand = i
                }
            })
            this.dialogVisible = true
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) { //新增保存
                    let allFlag = false
                    if (this.addTableList.length == 0) {
                        this.$message.warning('请先添加明细再保存')
                    } else {
                        this.addTableList.map((item) => {
                            if (item.one.length == 0 || !item.xl || !item.kfks || !item.cbxx || !item.cbsx || !item.kfcb || !item.sb || !item.zs || !item.fs) {
                                return allFlag = true
                            }
                        })
                        if (allFlag) {
                            this.$message.warning('数据不完整')
                        } else {
                            let list = []
                            let bilv = this.ruleForm.bilv
                            this.addTableList.map((i) => {
                                list.push({
                                    id:i.id,
                                    mainId:i.mainId,
                                    firstLevel: i.one[0],
                                    secondLevel: i.one[1],
                                    thirdLevel: i.one[2],
                                    series: i.xl,
                                    developStyleQty: i.kfks,
                                    costLowerLimit: i.cbxx,
                                    costUpperLimit: i.cbsx,
                                    developCostPrice: i.kfcb,
                                    colorRate: i.sb,
                                    mainColorQty: i.zs,
                                    subColorQty: i.fs,
                                    orderStyleQty: (i.kfks*bilv).toFixed(2),
                                    orderTotalQty: Math.floor((i.kfks*bilv * i.zs) + (i.kfks*bilv * i.fs * (i.sb - 1))),
                                    orderTotalAmount: (i.kfcb * Math.floor((i.kfks*bilv * i.zs) + (i.kfks*bilv * i.fs * (i.sb - 1)))).toFixed(2),
                                    remark: i.remark
                                })
                            })
                            let data = {}
                            let postUrl = ''
                            if (this.addtitle == '编辑') {
                                data.bizNo = this.selectObj.bizNo
                                data.id = this.selectObj.id
                                data.versionNumber = this.selectObj.versionNumber
                                postUrl = 'goods_planning_manage_edit'
                            } else {
                                postUrl = "goods_planning_manage_add"
                            }
                            data.basicBrandId = this.ruleForm.brand
                            !!brand.code ? data.basicBrandCode = brand.code : data.basicBrandCode = this.selectObj.basicBrandCode
                            !!brand.name ? data.basicBrandName = brand.name : data.basicBrandName = this.selectObj.basicBrandName
                            data.years = Util.dateFormat(this.ruleForm.year, 'yyyy') //规划开发时间
                            data.season = this.ruleForm.season
                            data.waveBand = this.ruleForm.waveBand
                            data.orderRatio = this.ruleForm.bilv
                            data.remark = this.ruleForm.remark
                            data.planningDevelopDate = Util.dateFormat(this.ruleForm.developDate, 'yyyy-MM-dd') //规划开发时间
                            data.planningDeliverDate = Util.dateFormat(this.ruleForm.handoverDate, 'yyyy-MM-dd') //规划交接日期
                            data.colorSimpleDate = Util.dateFormat(this.ruleForm.colorDate, 'yyyy-MM-dd') //齐色样日期
                            data.planningArriveDate = Util.dateFormat(this.ruleForm.arriveDate, 'yyyy-MM-dd') //规划到货日期
                            data.photoDate = Util.dateFormat(this.ruleForm.photoDate, 'yyyy-MM-dd') //拍照日期
                            data.planningLaunchDate = Util.dateFormat(this.ruleForm.canUpnewDate, 'yyyy-MM-dd') //可 上新日期
                            data.launchDate = Util.dateFormat(this.ruleForm.upnewDate, 'yyyy-MM-dd') //上新日期

                            data.detailsFoList = list
                            this.request(postUrl, data, true).then(res => {
                                if (res.code == 1) {
                                    this.$message.success('保存成功')
                                    this.getData()
                                    this.addTableList = []
                                    this.$refs['ruleForm'].resetFields();
                                    this.ruleForm = {
                                        purchaseOrderNo: '',
                                        brand: '',
                                        season: '',
                                        year: '',
                                        waveBand: '',
                                        developDate: '',
                                        handoverDate: '',
                                        colorDate: '',
                                        arriveDate: '',
                                        photoDate: '',
                                        canUpnewDate: '',
                                        upnewDate: '',
                                        remark: '',
                                        bilv:0.8
                                    }
                                    this.dialogVisible = false
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                        }

                    }
                } else { //验证表单
                    return false;
                }
            });
        },
        addCancel() {
            this.addTableList = []
            this.dialogVisible = false
            this.ruleForm = {
                purchaseOrderNo: '',
                brand: '',
                season: '',
                year: '',
                waveBand: '',
                developDate: '',
                handoverDate: '',
                colorDate: '',
                arriveDate: '',
                photoDate: '',
                canUpnewDate: '',
                upnewDate: '',
                remark: '',
                bilv:0.8,
            }
            this.$refs['ruleForm'].resetFields();

        },
        //改变品牌
        changeBrand(name) {
            let data = {}
            data.basicBrandId = name
            this.request('goods_planning_manage_createCheck', data, true).then(res => {
                if (res.code == 1) {} else {
                    this.$message.error(res.msg)
                }
            })
        },
        addTable() {
            if (this.addTableList.length == 0) {
                this.addTableList.push({ //没有默认值
                    one: [],
                })
            } else {
                let allFlag = false
                this.addTableList.map((item) => {
                    if (item.one.length == 0 || !item.xl || !item.kfks || !item.cbxx || !item.cbsx || !item.kfcb || !item.sb || !item.zs || !item.fs) {
                        return allFlag = true
                    }
                })
                if (allFlag) {
                    this.$message.warning('数据不完整！')
                } else {
                    this.addTableList.push({ //没有默认值
                        one: [],
                    })
                }
            }
        },
        //删除
        deleteTable() {
            if (this.selectionList.length == 0) {
                this.$message.warning('请先选中删除的数据')
            } else {
                this.selectionList.map((i, index) => {
                    this.addTableList.map((y, t) => {
                        if (i.one == y.one) {
                            this.addTableList.splice(t, 1)
                        }
                    })
                })
                this.$message.success('删除成功')
            }
        },
    //     getSummaries(param) {
    //     const { columns, data } = param;
    //         const sums = [];
    //         columns.forEach((column, index) => {
    //         if (index === 0) {
    //             sums[index] = '合计';
    //             return;
    //         }
    //              sums[5] = 11
    //              sums[6] = 22
    //              sums[7] = 22
    //              sums[8] = 22
    //              sums[14] = 22
    //              sums[15] = 22
    //         });
    //         return sums;
    //   },
        //查询
        onSearch() {
            this.visibleStatus = null
            this.currentPage = 1
            this.getData()

        },
        //重置
        onReset() {
            this.formSearch = {
                planningStatus:[],
                years:'',
                bizNo:'',
                brand:[],
                season:'',
                waveBand:'',
                remark:''
            }
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
    padding: 10px 10px 10px 10px;
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

<style>
.el-cascader-menu__wrap{
    height: 204px !important;
}

</style>
