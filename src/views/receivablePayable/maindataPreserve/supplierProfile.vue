<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button size="small" type="default" @click="onReset">重置</el-button>
            </el-form-item>
            <el-form-item size="small">
                <!-- v-if="judgeMenu.indexOf('新增') !== -1" -->
                <el-button v-if="judgeMenu.indexOf('新增') !== -1" size="small" type="primary" @click="onAdd">新增</el-button>
            </el-form-item>
            <el-form-item size="small">
                <!-- v-if="judgeMenu.indexOf('修改') !== -1" -->
                <el-button v-if="judgeMenu.indexOf('修改') !== -1" size="small" type="primary" @click="clickTable">编辑</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('同步') !== -1" size="small" type="primary" @click="getNewData">同步</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('供应商功能启用配置') !== -1" size="small" type="primary" @click="progressShow">供应商功能启用配置</el-button>
            </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <el-form-item label="开发年份：" size="small">
                <el-date-picker v-model="formSearch.years" value-format="yyyy" type="year" style="width:150px" placeholder="选择年">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="供应商编号：" size="small">
                <el-input style="width:140px" v-model="formSearch.code" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="供应商简称：" size="small">
                <el-input style="width:140px" v-model="formSearch.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="供应商全称：" size="small">
                <el-select v-model="formSearch.allName" value-key="id" filterable placeholder="请选择" style="width:300px">
                    <el-option v-for="item in allNameList" :key="item.id" :label="item.displaySupplier" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属对账人员：" size="small">
                <el-select v-model="formSearch.payableUser" value-key="id" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in payableUserList" :key="item.payableUserId" :label="item.payableUser" :value="item.payableUserId"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </header>
    <section class="middle" :style="{minHeight:showBink?'680px':'480px'}" style="padding-top:10px">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <el-table ref="multipleTable" @row-click="showLog" :data="tableData" style="width: 100%" border tooltip-effect="dark" :maxHeight="tableHieght" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
            <el-table-column prop="name" label="供应商全称" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="shortName" label="供应商简称" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="code" label="供应商编号" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="payableUser" label="所属对账人员" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="pinyinCode" label="拼音代号" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="type" label="供应商类型" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="options" label="属性" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="enable" label="启用" min-width="120" align="center">
                <template slot-scope="scope">{{scope.row.enable == 0 ? '停用' : '启用'}}</template>
            </el-table-column>
            <el-table-column prop="created" label="创建时间" align="center" min-width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="dataSource" label="数据来源" align="center" min-width="120">
                <template slot-scope="scope">{{scope.row.dataSource == '1' ? '同步' : '手动创建'}}</template>
            </el-table-column>
            <el-table-column prop="openYear" label="开发年份" align="center" min-width="120">
            </el-table-column>
            
            <el-table-column prop="outDevelop" label="外部开发" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            
            <el-table-column prop="mainProduct" label="主供产品" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="contacts" label="联系人" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="telephone" label="电话" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="province" label="省份" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="city" label="城市" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="settleAccountsType" label="结算方式" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="lastUpdated" label="最后修改时间" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
           </el-table>
                <section class="footer" style="margin-bottom:0px;margin-top:0px">
                    <div style="width:100%;font-size:20px;">操作日志</div>
                </section>
                <section class="log">
                    <el-table :data="logList" style="width: 100%" border tooltip-effect="dark" max-height="250">
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
                </section>
    </section>
  
    <!-- 新增弹框 -->
    <Modal v-model="dialogVisible" @on-cancel="addCancel" :styles="mystyle" title="新增" :width="1000" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :rules="rules" ref="ruleForm" label-width="130px" :model="ruleForm" class="demo-ruleForm " :label-position="right">
                <el-row type="flex">
                    <el-col :span="8">
                        <el-form-item label="启用？：" size="small">
                            <el-checkbox v-model="ruleForm.checked"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="开发年份：" prop="years" size="small">
                            <el-input v-model="ruleForm.years" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="供应商类型：" prop="type" size="small">
                            <el-select v-model="ruleForm.type" value-key="id" filterable placeholder="请选择" style="width:150px">
                                <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="8">
                        <el-form-item label="属性：" prop="attribute" size="small">
                            <!-- <el-input v-model="ruleForm.attribute" style="width:150px"></el-input> -->
                            <el-select v-model="ruleForm.attribute" value-key="id" filterable placeholder="请选择" style="width:150px">
                                <el-option v-for="item in attributeList" :key="item.id" :label="item.name" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="供应商编号：" prop="code" size="small">
                            <el-input v-model="ruleForm.code" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="供应商简称：" prop="abbreviation" size="small">
                            <el-input v-model="ruleForm.abbreviation" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="8">
                        <el-form-item label="拼音代码：" prop="pinyin" size="small">
                            <el-input v-model="ruleForm.pinyin" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="供应商全称：" prop="fullName" size="small">
                            <el-input v-model="ruleForm.fullName" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="等级：" size="small">
                            <!-- <el-input v-model="ruleForm.grade" style="width:150px"></el-input> -->
                            <el-select v-model="ruleForm.grade" value-key="id" filterable placeholder="请选择" style="width:150px">
                                <el-option v-for="item in leaveList" :key="item.id" :label="item.name" :value="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="24">
                        <el-form-item label="主供产品：" prop="mainSupplier" size="small">
                            <el-input v-model="ruleForm.mainSupplier" style="width:775px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="8">
                        <el-form-item label="外部开发？：" size="small">
                            <!-- <el-input v-model="ruleForm.external" style="width:150px"></el-input> -->
                            <el-select v-model="ruleForm.external" value-key="id" filterable placeholder="请选择" style="width:150px">
                                <el-option v-for="item in devTypeList" :key="item.id" :label="item.name" :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系人：" prop="person" size="small">
                            <el-input v-model="ruleForm.person" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="职务：" size="small">
                            <el-input v-model="ruleForm.post" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="8">
                        <el-form-item label="手机：" size="small">
                            <el-input v-model="ruleForm.mobilePhone" maxlength="11" oninput="value=value.replace(/[^\d.]/g,'')" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="电话：" prop="telephone" size="small">
                            <el-input v-model="ruleForm.telephone" maxlength="20" oninput="value=value.replace(/[^\d.]/g,'')" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="传真：" size="small">
                            <el-input v-model="ruleForm.fax" maxlength="20" oninput="value=value.replace(/[^\d.]/g,'')" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="8">
                        <el-form-item label="电子邮件：" size="small">
                            <el-input v-model="ruleForm.email" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="省份：" prop="province" size="small">
                            <el-select v-model="ruleForm.province" @change="changeProvinceAdd(ruleForm.province)" value-key="id" filterable placeholder="请选择" style="width:150px">
                                <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="城市：" prop="city" size="small">
                            <el-select v-model="ruleForm.city" filterable placeholder="请选择" style="width:150px">
                                <el-option v-for="item in cityList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="24">
                        <el-form-item label="地址：" size="small">
                            <el-input v-model="ruleForm.address" style="width:775px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="8">
                        <el-form-item label="结算方式：" prop="method" size="small">
                            <el-select v-model="ruleForm.method" value-key="id" filterable placeholder="请选择" style="width:150px">
                                <el-option v-for="item in methodList" :key="item.id" :label="item.name" :value="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="开票：" size="small">
                            <!-- <el-input v-model="ruleForm.invoice" style="width:150px"></el-input> -->
                            <el-checkbox v-model="ruleForm.invoice"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="账户1：" size="small">
                            <el-input v-model="ruleForm.account1" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="8">
                        <el-form-item label="账户名1：" size="small">
                            <el-input v-model="ruleForm.accountName1" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="开户行1：" size="small">
                            <el-input v-model="ruleForm.openingBank1" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="开户行行号1：" size="small">
                            <el-input v-model="ruleForm.bankCode1" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="8">
                        <el-form-item label="账号1：" size="small">
                            <el-input v-model="ruleForm.accountNumber1" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="账户2：" size="small">
                            <el-input v-model="ruleForm.account2" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="账户名2：" size="small">
                            <el-input v-model="ruleForm.accountName2" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                     <el-col :span="8">
                        <el-form-item label="开户行2：" size="small">
                            <el-input v-model="ruleForm.openingBank2" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="账号2：" size="small">
                            <el-input v-model="ruleForm.accountNumber2" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="生产理单员：" size="small">
                            <!-- <el-input v-model="ruleForm.manager" style="width:150px"></el-input> -->
                            <el-select v-model="ruleForm.manager" value-key="id" filterable placeholder="请选择" style="width:150px">
                                <el-option v-for="item in managerList" :key="item.id" :label="item.name" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                     <el-col :span="12">
                        <el-form-item label="加工厂：" size="small">
                            <el-input v-model="ruleForm.factory" style="width:300px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="备注：" size="small">
                            <el-input v-model="ruleForm.remark" style="width:300px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="8">
                        <el-form-item label="需替换供应商：" size="small">
                            <el-input v-model="ruleForm.replacedOne" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="替换后供应商：" size="small">
                            <el-input v-model="ruleForm.replacedTwo" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="OMS供应商ID：" prop="omsID" size="small">
                            <el-input v-model="ruleForm.omsID" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="8">
                        <el-form-item label="试制费占比%：" size="small">
                            <el-input v-model="ruleForm.cost" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="扣款折扣%：" size="small">
                            <el-input v-model="ruleForm.discount" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="数据来源：" size="small">
                            <el-input disabled v-model="ruleForm.dataSources" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="8">
                        <el-form-item label="所属对账人员：" size="small">
                            <el-select v-model="ruleForm.payableUser" value-key="id" filterable placeholder="请选择" style="width:150px">
                                <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <Col span="24">
            <div style="text-align:center">
                <Button type="primary" @click="addSave('ruleForm')">确认</Button>
                <Button type="default" @click="addCancel">取消</Button>
            </div>
            </Col>

        </Row>
        <div slot="footer"></div>
    </Modal>

    <!-- 编辑弹框 -->
    <Modal v-model="changeVisible" :styles="mystyle" title="编辑" @on-cancel='changeCancel' :width="1000" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form ref="formChange" :model="formChange" label-width="130px" class="demo-ruleForm " :label-position="left">
                <el-row type="flex">
                    <el-col :span="8">
                        <el-form-item label="启用？：" size="small">
                            <el-checkbox :disabled='editDisabled' v-model="formChange.checked"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="开发年份：" prop="years" size="small">
                            <el-input disabled v-model="formChange.years" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="供应商类型：" prop="type" size="small">
                            <el-select disabled v-model="formChange.type" value-key="id" filterable placeholder="请选择" style="width:150px">
                                <el-option v-for="item in documentTypeList" :key="item.id" :label="item.name" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="8">
                        <el-form-item label="属性：" prop="attribute" size="small">
                            <el-input disabled v-model="formChange.attribute" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="供应商编号：" prop="code" size="small">
                            <el-input disabled v-model="formChange.code" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="供应商简称：" prop="abbreviation" size="small">
                            <el-input disabled v-model="formChange.abbreviation" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="8">
                        <el-form-item label="拼音代码：" prop="pinyin" size="small">
                            <el-input :disabled='editDisabled' v-model="formChange.pinyin" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="供应商全称：" prop="fullName" size="small">
                            <el-input :disabled='editDisabled' v-model="formChange.fullName" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="等级：" size="small">
                            <!-- <el-input :disabled='editDisabled' v-model="formChange.grade" style="width:150px"></el-input> -->
                            <el-select :disabled='editDisabled' v-model="formChange.grade" value-key="id" filterable placeholder="请选择" style="width:150px">
                                <el-option v-for="item in leaveList" :key="item.id" :label="item.name" :value="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="24">
                        <el-form-item label="主供产品：" prop="mainSupplier" size="small">
                            <el-input :disabled='editDisabled' v-model="formChange.mainSupplier" style="width:775px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="8">
                        <el-form-item label="外部开发？：" prop="external" size="small">
                            <!-- <el-input :disabled='editDisabled' v-model="formChange.external" style="width:150px"></el-input> -->
                            <el-select :disabled='editDisabled' v-model="formChange.external" value-key="id" filterable placeholder="请选择" style="width:150px">
                                <el-option v-for="item in devTypeList" :key="item.id" :label="item.name" :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系人：" prop="person" size="small">
                            <el-input :disabled='editDisabled' v-model="formChange.person" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="职务：" size="small">
                            <el-input :disabled='editDisabled' v-model="formChange.post" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="8">
                        <el-form-item label="电话：" prop="telephone" size="small">
                            <el-input :disabled='editDisabled' v-model="formChange.telephone" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="手机：" size="small">
                            <el-input :disabled='editDisabled' v-model="formChange.mobilePhone" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="电子邮件：" size="small">
                            <el-input :disabled='editDisabled' v-model="formChange.email" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="8">
                        <el-form-item label="传真：" size="small">
                            <el-input :disabled='editDisabled' v-model="formChange.fax" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="省份：" prop="province" size="small">
                            <el-select :disabled='editDisabled' v-model="formChange.province" @change="changeProvince(formChange.province)" value-key="id" filterable placeholder="请选择" style="width:150px">
                                <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="城市：" prop="city" size="small">
                            <el-select :disabled='editDisabled' v-model="formChange.city" value-key="id" filterable placeholder="请选择" style="width:150px">
                                <el-option v-for="item in cityListA" :key="item.id" :label="item.name" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="24">
                        <el-form-item label="地址：" size="small">
                            <el-input :disabled='editDisabled' v-model="formChange.address" style="width:775px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="8">
                        <el-form-item label="结算方式：" prop="method" size="small">
                            <el-select :disabled='editDisabled' v-model="formChange.method" value-key="id" filterable placeholder="请选择" style="width:150px">
                                <el-option v-for="item in documentTypeList" :key="item.id" :label="item.name" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="开票：" size="small">
                            <!-- <el-input disabled v-model="formChange.invoice" style="width:150px"></el-input> -->
                            <el-checkbox :disabled='editDisabled' v-model="formChange.invoice"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="账户1：" size="small">
                            <el-input  v-model.trim="formChange.account1" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="8">
                        <el-form-item label="账户名1：" size="small">
                            <el-input  v-model.trim="formChange.accountName1" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="开户行1：" size="small">
                            <el-input  v-model.trim="formChange.openingBank1" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="开户行行号1：" size="small">
                            <el-input v-model.trim="formChange.bankCode1" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                     <el-col :span="8">
                        <el-form-item label="账号1：" size="small">
                            <el-input  v-model.trim="formChange.accountNumber1" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="账户2：" size="small">
                            <!-- :disabled='editDisabled' -->
                            <el-input  v-model.trim="formChange.account2"       style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="账户名2：" size="small">
                            <el-input  v-model.trim="formChange.accountName2"    style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                     <el-col :span="8">
                        <el-form-item label="开户行2：" size="small">
                            <el-input  v-model.trim="formChange.openingBank2"     style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="账号2：" size="small">
                            <el-input  v-model.trim="formChange.accountNumber2"   style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="生产理单员：" size="small">
                            <!-- <el-input :disabled='editDisabled' v-model="formChange.manager" style="width:150px"></el-input> -->
                            <el-select :disabled='editDisabled' v-model="formChange.manager" value-key="id" filterable placeholder="请选择" style="width:150px">
                                <el-option v-for="item in managerList" :key="item.id" :label="item.name" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                     <el-col :span="12">
                        <el-form-item label="加工厂：" size="small">
                            <el-input :disabled='editDisabled' v-model="formChange.factory" style="width:300px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="备注：" size="small">
                            <el-input :disabled='editDisabled' v-model="formChange.remark" style="width:300px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="8">
                        <el-form-item label="需替换供应商：" size="small">
                            <el-input :disabled='editDisabled' v-model="formChange.replacedOne" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="替换后供应商：" size="small">
                            <el-input :disabled='editDisabled' v-model="formChange.replacedTwo" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="OMS供应商ID：" size="small">
                            <el-input :disabled='editDisabled' v-model="formChange.omsID" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="8">
                        <el-form-item label="试制费占比%：" size="small">
                            <el-input :disabled='editDisabled' v-model="formChange.cost" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="扣款折扣%：" size="small">
                            <el-input v-model="formChange.discount" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="数据来源：" size="small">
                            <el-input disabled v-model="formChange.dataSources" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="8">
                        <el-form-item label="所属对账人员：" size="small">
                            <el-select v-model="formChange.payableUser" value-key="id" filterable placeholder="请选择" style="width:150px">
                                <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <Col span="24">
            <div style="text-align:center">
                <Button type="primary" @click="changeSave">确认</Button>
                <Button type="default" @click="changeCancel">取消</Button>
            </div>
            </Col>

        </Row>
        <div slot="footer"></div>
    </Modal>
    <!--流程配配置 -->
      <Modal v-model="progressControl" :styles="mystyle" title="供应商功能启用配置" @on-cancel='progressCancel' :width="650" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form ref="formChange" :model="formData" :inline="true" label-width="120px" class="demo-form-inline demo-ruleForm" :label-position="left">
                    <Col>
                         <el-form-item label="供应商名称 : " size="small"> {{formData.name}}</el-form-item> <el-form-item label="供应商属性：" size="small">{{formData.options}}</el-form-item>
                    </Col>
                    <el-divider >流程</el-divider>
                    <Col>
                         <el-form-item label="面料货期流程 : "  size="small"><el-checkbox  v-model="check1" @change="getStatus" :false-label="false" :true-label="true" ></el-checkbox></el-form-item>
                         <el-form-item label="合约货期流程 : " size="small"><el-checkbox   v-model="check2" @change="getStatus" :false-label="false"  :true-label="true" ></el-checkbox></el-form-item>
                         <el-form-item label="开票建议 : " size="small"> <el-checkbox      v-model="check3" @change="getStatus" :false-label="false"  :true-label="true" ></el-checkbox></el-form-item>
                         <el-form-item label="对账单确认 : " size="small"> <el-checkbox    v-model="check4" @change="getStatus" :false-label="false"  :true-label="true" ></el-checkbox></el-form-item>
                    </Col>
                
            </el-form>
            <Col span="24">
            <div style="text-align:center">
                    <Button type="primary" @click="progressConfirm">确认</Button>
                    <Button type="default" @click="progressCancel">取消</Button>
            </div>
            </Col>

        </Row>
        <div slot="footer"></div>
    </Modal>
</div>
</template>

<script>
 import {debounce} from 'mixins/debounce'
 import {burypoint} from 'mixins/burypoint'
export default {
    mixins:[debounce,burypoint],
    data() {
        return {
            userList:[],
            allNameList:[],//供应商全称
            payableUserList:[],//所属对账人员
            leaveList: [],
            cityList: [],
            cityListA: [],
            provinceList: [],
            devTypeList: [],
            managerList: [],
            methodList: [],
            typeList: [],
            attributeList: [],
            editDisabled: true,
            enableList: [{
                value: 0,
                name: '停用'
            }, {
                value: 1,
                name: '启用'
            }],
            logList: [], //日志
            billNo: '',
            rowId: '',
            rowStatus: '',
            platformOptions: [],
            dialogVisible: false, //新增
            changeVisible: false, //编辑
            formSearch: {
                user: '',
                region: '',

            },
            formChange: {
                checked: false, //启用
                years: '', //开发年份
                type: '', //供应商类型
                attribute: '', //属性
                code: '', //供应商编号
                abbreviation: '', //供应商简称
                pinyin: "", //拼音代号
                fullName: "", //供应商全称
                grade: '', //等级
                external: '', //外部开发
                mainSupplier: "", //主供产品
                person: '', //联系人
                post: '', //职务
                mobilePhone: '', //手机号
                telephone: '', //电话
                fax: '', //传真
                email: '', //邮件
                province: '', //省份
                city: '', //城市
                address: "", //地址
                method: '', //结算方式
                invoice: false, //开票
                account1: '', //账户1
                accountName1: "", //账户名1
                openingBank1: '', //开户行1
                accountNumber1: '', //账号1
                account2: '', //账户2
                accountName2: '', //账户名2
                openingBank2: '', //开户行2
                accountNumber2: '', //账号2
                manager: '', //生产理单员
                factory: '', //加工厂
                remark: '', //备注
                replacedOne: '', //需要替换的供应商
                replacedTwo: '', //替换后的供应商
                omsID: '', //oms供应商id
                cost: '', //试制费占比
                discount: '',
                dataSource: '', //数据来源
                bankCode1:'', //开户行行号1
                payableUser:'',//所属对账人员
            },
            ruleForm: {
                checked: true, //启用
                years: '', //开发年份
                type: '', //供应商类型
                attribute: '', //属性
                code: '', //供应商编号
                abbreviation: '', //供应商简称
                pinyin: "", //拼音代号
                fullName: "", //供应商全称
                grade: '', //等级
                external: '', //外部开发
                mainSupplier: "", //主供产品
                person: '', //联系人
                post: '', //职务
                mobilePhone: '', //手机号
                telephone: '', //电话
                fax: '', //传真
                email: '', //邮件
                province: '', //省份
                city: '', //城市
                address: "", //地址
                method: '', //结算方式
                invoice: false, //开票
                account1: '', //账户1
                accountName1: "", //账户名1
                openingBank1: '', //开户行1
                accountNumber1: '', //账号1
                account2: '', //账户2
                accountName2: '', //账户名2
                openingBank2: '', //开户行2
                accountNumber2: '', //账号2
                manager: '', //生产理单员
                factory: '', //加工厂
                remark: '', //备注
                replacedOne: '', //需要替换的供应商
                replacedTwo: '', //替换后的供应商
                omsID: '', //oms供应商id
                cost: '', //试制费占比
                discount: '',
                dataSource: '', //数据来源
                bankCode1:'',//来源
                payableUser:'',//所属对账人员
            },
            rules: {
                omsID: [{
                    required: true,
                    message: '请输入',
                    trigger: 'blur'
                }],
                years: [{
                    required: true,
                    message: '请输入',
                    trigger: 'blur'
                }],
                type: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                attribute: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                province: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                city: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                method: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                code: [{
                        required: true,
                        message: '请输入',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 20,
                        message: '长度在20个字符以内',
                        trigger: 'blur'
                    }
                ],
                abbreviation: [{
                        required: true,
                        message: '请输入',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 20,
                        message: '长度在20个字符以内',
                        trigger: 'blur'
                    }
                ],
                pinyin: [{
                        required: true,
                        message: '请输入',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 20,
                        message: '长度在20个字符以内',
                        trigger: 'blur'
                    }
                ],
                fullName: [{
                        required: true,
                        message: '请输入',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 20,
                        message: '长度在20个字符以内',
                        trigger: 'blur'
                    }
                ],
                mainSupplier: [{
                        required: true,
                        message: '请输入',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 50,
                        message: '长度在50个字符以内',
                        trigger: 'blur'
                    }
                ],
                external: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                person: [{
                        required: true,
                        message: '请输入',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 20,
                        message: '长度在20个字符以内',
                        trigger: 'blur'
                    }
                ],
                telephone: [{
                        required: true,
                        message: '请输入',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 20,
                        message: '长度在20个字符以内',
                        trigger: 'blur'
                    }
                ],
            },
            total: 0,
            pagesize: 10,
            currentPage: 1,
            tableData: [], //主table数据
            tableJournal: [], //操作日志数据
            rowLenght: 0, //选择几条数据
            rowObj: {}, //选择的数据对象
            buttonList: [], //按钮权限
            searchButton: false, //查询按钮
            addButton: false, //新增按钮
            editButton: false, //编辑按钮
            judgeMenu: [],
            documentTypeList: [],
            stockList: [{
                value: 0,
                name: '出库'
            }, {
                value: 1,
                name: '入库'
            }],
            progressControl:false,
            formData:{
                    name:'',
                    options:'',
            },
            check1:false,
            check2:false,
            check3:false,
            check4:false,
            selectIDS:[],
            subArr:[],
        }
    },
    mounted() {
        this.getData()
        this.getPayableUser()//
        this.getAllNameList()
        this.getMethodList()
        this.getTypeList()
        this.getLeaveList()
        this.getDevTypeList()
        this.getManagerList()
        this.getAttributeList()
        this.getProvinceSelector() //省份
        // this.getCitySelector()//城市
        this.getButtonJurisdiction() //按钮权限
        this.getStatus()
        this.getSelectuser()
    },
    methods: {
        getAllNameList(){
            this.request('masterData_supplier_selector', {}, true).then(res => {
                if (res.code == 1) {
                    this.allNameList = res.data
                }
            })
        },
        getPayableUser(){
            this.request('supplier_selectorPayable', {}, true).then(res => {
                if (res.code == 1) {
                    this.payableUserList = res.data
                }
            })
        },
        //用户下拉接口
        getSelectuser(){
               let data={}
                    this.request('user_selector', data, true).then((res) => {
                            if (res.code == 1) {
                                  this.userList=res.data
                            }
                        })       
        },
        //同步
        getNewData() {
            this.setBuryPoint('同步')
            this.request('supplier_sync', {}, true).then(res => {
                if (res.code == 1) {
                    this.$notify.success({
                        title: '同步',
                        message: res.data,
                        duration: 0,
                    });
                    this.getData()
                }
            })
        },
        //获取城市接口
        changeProvinceAdd(code) {
            this.ruleForm.city = ''
            this.cityList = []
            // this.$refs['ruleForm'].resetFields();
            let data = {}
            data.provinceCode = code.code
            this.request('supplier_citySelector', data, true).then(res => {
                if (res.code == 1) {
                    this.cityList = res.data;
                }
            })
        },
        changeProvince(code) {
            this.formChange.city = ''
            this.cityListA = []
            let data = {}
            data.provinceCode = code.code
            this.request('supplier_citySelector', data, true).then(res => {
                if (res.code == 1) {
                    this.cityListA = res.data;
                }
            })
        },
        getProvinceSelector() { //省份
            this.request('supplier_provinceSelector', {}, true).then(res => {
                if (res.code == 1) {
                    this.provinceList = res.data;
                }
            })
        },
        getManagerList() { //生产理单员
            this.request('supplier_multipleSelector', {}, true).then(res => {
                if (res.code == 1) {
                    this.managerList = res.data.name;
                }
            })
        },
        getDevTypeList() { //开发类型
            let data = {}
            data.type = 'develop_type'
            this.request('supplier_constant', data, true).then(res => {
                if (res.code == 1) {
                    this.devTypeList = res.data;
                }
            })
        },
        getLeaveList() { //供应商类型
            let data = {}
            data.type = 'supplier_level'
            this.request('supplier_constant', data, true).then(res => {
                if (res.code == 1) {
                    this.leaveList = res.data;
                }
            })
        },
        getTypeList() { //供应商类型
            let data = {}
            data.type = 'supplier_type'
            this.request('supplier_constant', data, true).then(res => {
                if (res.code == 1) {
                    this.typeList = res.data;
                }
            })
        },
        getAttributeList() { //属性
            let data = {}
            data.type = 'supplier_options'
            this.request('supplier_constant', data, true).then(res => {
                if (res.code == 1) {
                    this.attributeList = res.data;
                }
            })
        },
        getMethodList() { //结算方式
            let data = {}
            data.type = 'settle_accounts_type'
            this.request('supplier_constant', data, true).then(res => {
                if (res.code == 1) {
                    this.methodList = res.data;
                }
            })
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
            this.rowLenght = row.length
            this.rowObj = row[0]
        },
        getData() {
            this.logList = []
            let data = {}
            data.payableUserId = this.formSearch.payableUser //所属对账人员
            data.supplierId = this.formSearch.allName //全称
            data.openYear = this.formSearch.years
            data.code = this.formSearch.code
            data.shortName = this.formSearch.name
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            this.request('supplier_page', data, true).then(res => {
                if (res.code == '1') {
                    this.total = res.data.count;
                    this.tableData = res.data.records;
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        getLoglist(billNo) {
            this.billNo = billNo
            this.currentPage = 1
            let data = {}
            data.billNo = "master_data_supplier_" + this.billNo
            data.pageSize = 3
            data.currentPage = this.currentPage
            this.request('supplier_getPagingByBillNo', data, true).then((res) => {
                if (res.code == 1) {
                    if (res.data.length < data.pageSize) {
                        this.dataFlag = false
                    } else {
                        this.dataFlag = true
                    }
                    if (this.currentPage == 1) {
                        this.logList = res.data
                    } else {
                        this.logList = this.logList.concat(res.data)
                    }
                }
            })
        },
        getMore() {
            this.currentPage++
            let data = {}
            data.billNo = "master_data_supplier_" + this.billNo
            data.pageSize = 3
            data.currentPage = this.currentPage
            this.request('supplier_getPagingByBillNo', data, true).then((res) => {
                if (res.code == 1) {
                    if (res.data.length < data.pageSize) {
                        this.dataFlag = false
                    } else {
                        this.dataFlag = true
                    }
                    if (this.currentPage == 1) {
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
        getCodeTypeList() {
            this.request('masterData_code_selector', {}, true).then(res => {
                if (res.code == 1) {
                    this.documentTypeList = res.data;
                }
            })
        },

        //新增
        addSave() {
            this.setBuryPoint('新增确认')
            console.log(this.ruleForm.mobilePhone)
            this.dialogVisible = true
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) { //新增保存
                    let data = {}
                    this.ruleForm.checked == false ? data.enable = 0 : data.enable = 1 //启用
                    data.openYear = this.ruleForm.years //开发年份
                    data.type = this.ruleForm.type.name //供应商类型
                    data.options = this.ruleForm.attribute.name //属性
                    data.code = this.ruleForm.code //供应商编号
                    data.shortName = this.ruleForm.abbreviation //供应商简称
                    data.pinyinCode = this.ruleForm.pinyin //拼音代号
                    data.name = this.ruleForm.fullName //供应商全称
                    data.level = this.ruleForm.grade //等级
                    data.outDevelop = this.ruleForm.external //外部开发
                    data.mainProduct = this.ruleForm.mainSupplier //主供产品
                    data.contacts = this.ruleForm.person //联系人
                    data.post = this.ruleForm.post //职务
                    data.mobile = this.ruleForm.mobilePhone //手机号
                    data.telephone = this.ruleForm.telephone //电话
                    data.fax = this.ruleForm.fax //传真
                    data.email = this.ruleForm.email //邮件
                    data.province = this.ruleForm.province.name //省份
                    data.city = this.ruleForm.city //城市
                    data.address = this.ruleForm.address //地址
                    data.settleAccountsType = this.ruleForm.method //结算方式
                    this.ruleForm.invoice == true ? data.invoice = '1' : data.invoice = '0' //开票
                    data.account1 = this.ruleForm.account1 //账户1
                    data.account1Name = this.ruleForm.accountName1 //账户名1
                    data.openingBankOfAccount1 = this.ruleForm.openingBank1 //开户行1
                    data.account1Number = this.ruleForm.accountNumber1 //账号1
                    data.account2 = this.ruleForm.account2 //账户2
                    data.account2Name = this.ruleForm.accountName2 //账户名2
                    data.openingBankOfAccount2 = this.ruleForm.openingBank2 //开户行2
                    data.account2Number = this.ruleForm.accountNumber2 //账号2
                    data.productionOrderManager = this.ruleForm.manager //生产理单员
                    data.factory = this.ruleForm.factory //加工厂
                    data.remark = this.ruleForm.remark //备注
                    data.suppliersToBeReplaced = this.ruleForm.replacedOne //需要替换的供应商
                    data.replacedSupplier = this.ruleForm.replacedTwo //替换后的供应商
                    data.codeOfOms = this.ruleForm.omsID //oms供应商id
                    data.trialProductionFeeProportion = this.ruleForm.cost //试制费占比
                    data.chargeDiscount = this.ruleForm.discount //扣款折扣%
                    data.dataSource = '2' //数据来源
                    // data.payableUser = this.ruleForm.payableUser.payableUser
                    data.payableUserId = this.ruleForm.payableUser
                    data.bankCode1=this.ruleForm.bankCode1 
                    this.request('supplier_add', data, true).then(res => {
                        if (res.code == '1') {
                            this.$message.success(res.msg)
                            this.getData()
                            this.dialogVisible = false
                            // this.ruleForm = {
                            //     checked: true, //启用
                            //     years: '', //开发年份
                            //     type: '', //供应商类型
                            //     attribute: '', //属性
                            //     code: '', //供应商编号
                            //     abbreviation: '', //供应商简称
                            //     pinyin: "", //拼音代号
                            //     fullName: "", //供应商全称
                            //     grade: '', //等级
                            //     external: '', //外部开发
                            //     mainSupplier: "", //主供产品
                            //     person: '', //联系人
                            //     post: '', //职务
                            //     mobilePhone: '', //手机号
                            //     telephone: '', //电话
                            //     fax: '', //传真
                            //     email: '', //邮件
                            //     province: '', //省份
                            //     city: '', //城市
                            //     address: "", //地址
                            //     method: '', //结算方式
                            //     invoice: false, //开票
                            //     account1: '', //账户1
                            //     accountName1: "", //账户名1
                            //     openingBank1: '', //开户行1
                            //     accountNumber1: '', //账号1
                            //     account2: '', //账户2
                            //     accountName2: '', //账户名2
                            //     openingBank2: '', //开户行2
                            //     accountNumber2: '', //账号2
                            //     manager: '', //生产理单员
                            //     factory: '', //加工厂
                            //     remark: '', //备注
                            //     replacedOne: '', //需要替换的供应商
                            //     replacedTwo: '', //替换后的供应商
                            //     omsID: '', //oms供应商id
                            //     cost: '', //试制费占比
                            //     discount: '',
                            //     dataSource: '', //数据来源
                            // }
                            for(let i in this.ruleForm){
                                this.ruleForm[i]=''
                            }
                            this.$refs['ruleForm'].resetFields();
                            this.cityList = []
                            
                        } else {
                            this.$message.error(res.msg)
                            // this.dialogVisible = false
                            // this.ruleForm = {}
                        }
                    })
                } else { //验证表单
                    return false;
                }
            });
        },
        addCancel() {
            this.dialogVisible = false
            this.ruleForm = {}
            this.cityList = []
            this.$refs['ruleForm'].resetFields();

        },
        progressConfirm(){
            this.setBuryPoint('供应商功能启用配置确认')
               let data={}
                   data.supplierId=this.formData.id
                   data.infos=this.subArr
               this.request('masterData_supplier_addFunctions',data,false).then(res=>{
                    if(res.code==1){
                        this.progressControl=false
                        this.selectIDS=[];
                        this.subArr=[]
                        this.$message.success(res.msg)
                        this.getData()
                    }else{
                        this.$message.error(res.msg)
                    }
               })       
        },
        progressCancel(){
                this.progressControl=false;
                this.check1=false;
                this.check2=false
                this.check3=false
                this.check4=false
        },
        
        getStatus(){
                 if(this.check1){
                    this.subArr.push({
                          supplierId:this.formData.id,
                          supplierCode:this.formData.code,
                          supplierName:this.formData.name,
                          supplierFunctionName:'面料货期流程',
                          supplierType:this.formData.options,
                          supplierShortName:this.formData.shortName,
                          enable:1,
                    })
                   }else{
                       for(let i=0,len=this.subArr.length;i<len;i++){
                           if(this.subArr[i].supplierFunctionName=='面料货期流程'){
                                this.subArr.splice(i,1);
                           }
                       }
                   }
                  if(this.check2){
                    this.subArr.push({
                          supplierId:this.formData.id,
                          supplierCode:this.formData.code,
                          supplierName:this.formData.name,
                          supplierFunctionName:'合约货期流程',
                          supplierType:this.formData.options,
                          supplierShortName:this.formData.shortName,
                          enable:1,
                    })
                   }else{
                       for(let i=0,len=this.subArr.length;i<len;i++){
                           if(this.subArr[i].supplierFunctionName=='合约货期流程'){
                                this.subArr.splice(i,1);
                           }
                       }
                   }
                  if(this.check3){
                    this.subArr.push({
                          supplierId:this.formData.id,
                          supplierCode:this.formData.code,
                          supplierName:this.formData.name,
                          supplierFunctionName:'开票建议',
                          supplierType:this.formData.options,
                          supplierShortName:this.formData.shortName,
                          enable:1,
                    })
                   }else{
                       for(let i=0,len=this.subArr.length;i<len;i++){
                           if(this.subArr[i].supplierFunctionName=='开票建议'){
                                this.subArr.splice(i,1);
                           }
                       }
                   }
                  if(this.check4){
                    this.subArr.push({
                          supplierId:this.formData.id,
                          supplierCode:this.formData.code,
                          supplierName:this.formData.name,
                          supplierFunctionName:'对账单确认',
                          supplierType:this.formData.options,
                          supplierShortName:this.formData.shortName,
                          enable:1,
                    })
                   }else{
                       for(let i=0,len=this.subArr.length;i<len;i++){
                           if(this.subArr[i].supplierFunctionName=='对账单确认'){
                                this.subArr.splice(i,1);
                           }
                       }
                   }
                    for(let i = 0, len=this.subArr.length;i<len; i++){
                        for(let j = i + 1; j < len; j++){
                        if(this.subArr[i].supplierFunctionName ==this.subArr[j].supplierFunctionName){
                                this.subArr.splice(j,1);
                                  len--;
                                  j--;
                                }
                             }
                         }
                    //  console.log(this.subArr,'000000000')
        },
        getProgressDetail(id){
                let data={}
                    data.supplierId=id
               this.request('masterData_supplier_selectFunction',data,false).then(res=>{
                   if(res.code==1){
                           this.selectIDS=res.data
                        //    setTimeout(()=>{
                               this.givenStatus(res.data)
                        //    },100)
                   }
               })
        },
        givenStatus(arr){
                   if(arr.length==0){
                        this.check1=false;
                        this.check2=false
                        this.check3=false
                        this.check4=false 
                   }else{
                      for(let i=0,len=arr.length;i<len;i++){
                        if(this.selectIDS[i].supplierFunctionName.indexOf('面料货期流程')>-1){
                            this.check1=true
                        }
                        if(this.selectIDS[i].supplierFunctionName.indexOf('合约货期流程')>-1){
                            this.check2=true
                        }
                        if(this.selectIDS[i].supplierFunctionName.indexOf('开票建议')>-1){
                            this.check3=true
                        }
                        if(this.selectIDS[i].supplierFunctionName.indexOf('对账单')>-1){
                            this.check4=true
                        }
                     }
                   }
                   
        },
        progressShow(){
               this.setBuryPoint('供应商功能启用配置')
               let obj = this.rowObj
               console.log(obj, '456789')
            if (this.rowLenght == 0) {
                this.$message.error('请先选择供应商功能启用配置的数据！')
            } else if (this.rowLenght > 1) {
                this.$message.error('一次只能选择一条数据！')
            } else {
                this.progressControl=true
                this.formData=obj;
                this.getProgressDetail(obj.id)
                
            }
        },
        //编辑
        clickTable() {
            this.setBuryPoint('编辑')
            // console.log(this.rowObj, '/45678')
            let obj = this.rowObj
            console.log(obj.enable, '456789')
            console.log(obj.dataSource)
            if (this.rowLenght == 0) {
                this.$message.error('请先选择修改的数据！')
            } else if (this.rowLenght > 1) {
                this.$message.error('一次只能修改一条数据！')
            } else {
                // this.formChange.dataSources = '同步'
                this.rowId = obj.id
                this.changeVisible = true
                obj.enable == 1 ? this.formChange.checked = true : false //启用
                this.formChange.years = obj.openYear //开发年份
                this.formChange.type = obj.type //供应商类型
                this.formChange.attribute = obj.options //属性
                this.formChange.code = obj.code //供应商编号
                this.formChange.abbreviation = obj.shortName //供应商简称
                this.formChange.pinyin = obj.pinyinCode //拼音代号
                this.formChange.fullName = obj.name //供应商全称
                this.formChange.grade = obj.level //等级
                this.formChange.external = obj.outDevelop //外部开发
                this.formChange.mainSupplier = obj.mainProduct //主供产品
                this.formChange.person = obj.contacts //联系人
                this.formChange.post = obj.post //职务
                this.formChange.mobilePhone = obj.mobile //手机号
                this.formChange.telephone = obj.telephone //电话
                this.formChange.fax = obj.fax //传真
                this.formChange.email = obj.email //邮件
                this.formChange.province = obj.province //省份
                this.formChange.city = obj.city //城市
                this.formChange.address = obj.address //地址
                this.formChange.method = obj.settleAccountsType //结算方式
                obj.invoice == '1' ? this.formChange.invoice = true : false //开票
                this.formChange.account1 = obj.account1 //账户1
                this.formChange.accountName1 = obj.account1Name //账户名1
                this.formChange.openingBank1 = obj.openingBankOfAccount1 //开户行1
                this.formChange.accountNumber1 = obj.account1Number //账号1
                this.formChange.account2 = obj.account2 //账户2
                this.formChange.accountName2 = obj.account2Name //账户名2
                this.formChange.openingBank2 = obj.openingBankOfAccount2 //开户行2
                this.formChange.accountNumber2 = obj.account2Number //账号2
                this.formChange.manager = obj.productionOrderManager //生产理单员
                this.formChange.factory = obj.factory //加工厂
                this.formChange.remark = obj.remark //备注
                this.formChange.replacedOne = obj.suppliersToBeReplaced //需要替换的供应商
                this.formChange.replacedTwo = obj.replacedSupplier //替换后的供应商
                this.formChange.omsID = obj.codeOfOms //oms供应商id
                this.formChange.cost = obj.trialProductionFeeProportion //试制费占比
                this.formChange.discount = obj.chargeDiscount //扣款折扣%
                this.formChange.bankCode1=obj.bankCode1
                this.formChange.payableUser=obj.payableUserId,//所属对账人员
                obj.dataSource == '1' ? this.formChange.dataSources = '同步' : this.formChange.dataSources = '手动创建' //数据来源
                if (obj.dataSource !== '1') {
                    this.editDisabled = false
                } else {
                    this.editDisabled = true
                }
            }
        },
        //编辑保存
        changeSave() {
            this.setBuryPoint('编辑确认')
            if (this.formChange.pinyin == '') {
                this.$message.warning('拼音代号不能为空！')
            } else if (this.formChange.fullName == '') {
                this.$message.warning('供应商全称不能为空！')
            } else if (this.formChange.mainSupplier == '') {
                this.$message.warning('主供产品不能为空！')
            } else if (this.formChange.person == '') {
                this.$message.warning('联系人不能为空！')
            } else if (this.formChange.telephone == '') {
                this.$message.warning('电话不能为空！')
            } else if (this.formChange.province == '') {
                this.$message.warning('省份不能为空！')
            } else if (this.formChange.city == '') {
                this.$message.warning('城市不能为空！')
            } else {
                let data = {}
                data.id = this.rowId
                this.formChange.checked == false ? data.enable = 0 : data.enable = 1 //启用
                data.pinyinCode = this.formChange.pinyin //拼音代号
                data.name = this.formChange.fullName //供应商全称
                data.level = this.formChange.grade //等级
                data.outDevelop = this.formChange.external //外部开发
                data.mainProduct = this.formChange.mainSupplier //主供产品
                data.contacts = this.formChange.person //联系人
                data.post = this.formChange.post //职务
                data.mobile = this.formChange.mobilePhone //手机号
                data.telephone = this.formChange.telephone //电话
                data.fax = this.formChange.fax //传真
                data.email = this.formChange.email //邮件
                data.province = this.formChange.province.name //省份
                data.city = this.formChange.city.name //城市
                data.address = this.formChange.address //地址
                data.settleAccountsType = this.formChange.method.name //结算方式
                this.formChange.invoice == true ? data.invoice = '1' : data.invoice = '0' //开票
                data.account1 = this.formChange.account1 //账户1
                data.account1Name = this.formChange.accountName1 //账户名1
                data.openingBankOfAccount1 = this.formChange.openingBank1 //开户行1
                data.account1Number = this.formChange.accountNumber1 //账号1
                data.account2 = this.formChange.account2 //账户2
                data.account2Name = this.formChange.accountName2 //账户名2
                data.openingBankOfAccount2 = this.formChange.openingBank2 //开户行2
                data.account2Number = this.formChange.accountNumber2 //账号2
                data.productionOrderManager = this.formChange.manager //生产理单员
                data.factory = this.formChange.factory //加工厂
                data.remark = this.formChange.remark //备注
                data.suppliersToBeReplaced = this.formChange.replacedOne //需要替换的供应商
                data.replacedSupplier = this.formChange.replacedTwo //替换后的供应商
                data.codeOfOms = this.formChange.omsID //oms供应商id
                data.trialProductionFeeProportion = this.formChange.cost //试制费占比
                data.chargeDiscount = this.formChange.discount //扣款折扣%
                data.bankCode1=this.formChange.bankCode1//开户行行号1
                data.payableUserId = this.formChange.payableUser //所属对账人员
                // data.dataSource = this.formChange.dataSources  //数据来源
                this.request('supplier_update', data, true).then(res => {
                    if (res.code == 1) {
                        this.$message.success(res.msg)
                        this.getData()
                        this.changeVisible = false
                    } else {
                        // this.changeVisible = false
                        this.$message.error(res.msg)
                    }
                })
            }
        },
        //编辑取消
        changeCancel() {
            this.changeVisible = false
            this.formChange = {
                checked: false, //启用
                years: '', //开发年份
                type: '', //供应商类型
                attribute: '', //属性
                code: '', //供应商编号
                abbreviation: '', //供应商简称
                pinyin: "", //拼音代号
                fullName: "", //供应商全称
                grade: '', //等级
                external: '', //外部开发
                mainSupplier: "", //主供产品
                person: '', //联系人
                post: '', //职务
                mobilePhone: '', //手机号
                telephone: '', //电话
                fax: '', //传真
                email: '', //邮件
                province: '', //省份
                city: '', //城市
                address: "", //地址
                method: '', //结算方式
                invoice: false, //开票
                account1: '', //账户1
                accountName1: "", //账户名1
                openingBank1: '', //开户行1
                accountNumber1: '', //账号1
                account2: '', //账户2
                accountName2: '', //账户名2
                openingBank2: '', //开户行2
                accountNumber2: '', //账号2
                manager: '', //生产理单员
                factory: '', //加工厂
                remark: '', //备注
                replacedOne: '', //需要替换的供应商
                replacedTwo: '', //替换后的供应商
                omsID: '', //oms供应商id
                cost: '', //试制费占比
                discount: '',
                dataSource: '', //数据来源
                bankCode1:'', //开户行行号1
                payableUser:'',//所属对账人员
            }
        },
        handleSizeChange(val) {
            this.pagesize = val
            this.getData()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getData()
        },
        onAdd() {
            this.setBuryPoint('新增')
            this.dialogVisible = true
            this.ruleForm.checked = true
            this.ruleForm.dataSources = '手动新建'
            this.ruleForm.years = new Date().getFullYear()
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
    .middle{
      width: 99%;
      margin: 0 auto;
      background: #fff;
      padding: 0px 10px 10px 10px;
      margin-top: 0px;
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
