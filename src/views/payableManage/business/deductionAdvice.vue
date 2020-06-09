<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <el-form-item size="small" v-if="judgeMenu.indexOf('查询') !== -1">
                <el-button size="small" type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item size="small" v-if="judgeMenu.indexOf('新增') !== -1">
                <el-button size="small" type="primary" @click="onAdd">新增</el-button>
            </el-form-item>
            <el-form-item size="small" v-if="judgeMenu.indexOf('修改') !== -1">
                <el-button size="small" type="primary" @click="onEdit">编辑</el-button>
            </el-form-item>
            <el-form-item size="small" v-if="judgeMenu.indexOf('审核') !== -1">
                <el-button size="small" type="primary" @click="onExamine">审核</el-button>
            </el-form-item>
            <el-form-item size="small" v-if="judgeMenu.indexOf('取消审核') !== -1">
                <el-button size="small" type="primary" @click="offExamine">取消审核</el-button>
            </el-form-item>
            <el-form-item size="small" v-if="judgeMenu.indexOf('关闭') !== -1">
                <el-button size="small" type="primary" @click="onClose">关闭</el-button>
            </el-form-item>
            <el-form-item size="small" v-if="judgeMenu.indexOf('删除') !== -1">
                <el-button size="small" type="primary" @click="onDelete">删除</el-button>
            </el-form-item>
            <el-form-item size="small" v-if="judgeMenu.indexOf('生成扣款单') !== -1">
                <el-button size="small" type="primary" @click="onDeduction">生成扣款单</el-button>
            </el-form-item>
            <el-form-item size="small" v-if="judgeMenu.indexOf('下载模板') !== -1">
                <el-button size="small" type="primary" @click="onDownload">下载模板</el-button>
            </el-form-item>
            <el-form-item size="small" v-if="judgeMenu.indexOf('导入') !== -1">
                <el-button size="small" type="primary" @click="onImportBill">导入</el-button>
            </el-form-item>
              <el-form-item size="small" class="marginT0">
                    <el-button v-if="judgeMenu.indexOf('导出') !== -1" size="small" type="primary" @click="checkExport">导出</el-button>
                </el-form-item>
            <el-form-item size="small">
                <el-button size="small" type="default" @click="onReset">重置</el-button>
            </el-form-item>

            <!-- <el-form-item size="small">
                <el-button v-if="judgeMenu.indexOf('强制核销') !== -1" size="small" type="primary" @click="forceWrite">强制核销</el-button>
            </el-form-item> -->
        </el-form>
        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <el-form-item label="年份：" size="small">
                <el-date-picker style="width:100px" value-format="yyyy" v-model="formSearch.year" type="year" placeholder="选择年份">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="大货款号：" size="small">
                <el-input v-model="formSearch.goodsNo" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="制单号：" size="small">
                <el-input v-model="formSearch.oddsNo" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item  label="所属对账人员：" size="small">
                <el-select v-model="formSearch.payableUser" @change="changePayable(formSearch.payableUser)" filterable placeholder="请选择" style="width:120px">
                    <el-option v-for="item in payableUserList" :key="item.payableUserId" :label="item.payableUser" :value="item.payableUserId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="供应商：" size="small">
                <el-select v-model="formSearch.supplier" value-key="id" filterable placeholder="请选择" style="width:230px">
                    <el-option v-for="item in typeList" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show == true" label="扣款类型：" size="small">
                <el-select v-model="formSearch.deductionType" value-key="id" filterable placeholder="请选择" style="width:150px">
                    <el-option v-for="item in deductionTypeList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show == true" label="结算制单号：" size="small">
                <el-input v-model="formSearch.settlementsNo" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item v-if="show == true" label="单据状态：" size="small">
                <el-select v-model="formSearch.status" value-key="id" filterable placeholder="请选择" style="width:100px">
                    <el-option v-for="item in statusList" :key="item.name" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show == true" label="公司：" size="small">
                <el-select v-model="formSearch.name" value-key="id" filterable placeholder="请选择" style="width:220px">
                    <el-option v-for="item in companyCodeOptions" :key="item.name" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="show == true" label="单据日期：" size="small">
                <el-date-picker v-model="formSearch.documentDate" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item v-if="show==true" label="是否已生成扣款单：" size="small" label-width="140px">
                <el-select v-model="formSearch.deduction" filterable placeholder="请选择" style="width:100px">
                   <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item size="small">
                <el-button v-if="show == false" @click="changeShow" style="float:right" size="small"><i class="el-icon-bottom"></i></el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button v-if="show == true" @click="changeHidden" style="float:right" size="small"><i class="el-icon-top"></i></el-button>
            </el-form-item>
        </el-form>
    </header>
    <section class="middle">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

        <div id="main" style="width: 100%; height: 400px;"></div>
    </section>

    <Modal :mask-closable="false" v-model="downloadVisible" :styles="mystyle" @on-cancel="downloadCancel" title="下载模板" :width="450" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form class="demo-ruleForm " :label-position="left">
                <Col span="24">
                <el-form-item label="选择扣款类型：" label-width="120px" size="small">
                    <el-select v-model="deductionTypeDownload" value-key="id" filterable placeholder="请选择" style="width:150px">
                        <el-option v-for="item in deductionTypeList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="24">
                <el-form-item style="text-align:center">
                    <Button type="primary" @click="downloadSave">确定</Button>
                    <Button type="default" @click="downloadCancel">取消</Button>
                </el-form-item>
                </Col>

            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
    <!-- 新增弹框 -->
    <Modal :mask-closable="false" v-model="addVisible" :styles="mystyle" @on-cancel="addCancel" title="新增" :width="750" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm " :label-position="left">
                <el-row type="flex">
                    <el-col :span="12">
                        <el-form-item label="制单号：" prop="markNo" size="small">
                            <el-input v-model="ruleForm.markNo" @blur="changeBlur(ruleForm.markNo)" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="批次：" size="small">
                            <el-input disabled v-model="ruleForm.batch" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="12">
                        <el-form-item label="大货款号：" size="small">
                            <el-input disabled v-model="ruleForm.goodsNo" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="折扣：" size="small">
                            <el-input disabled v-model="ruleForm.discount" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="12">
                        <el-form-item label="扣款类型：" prop="manager" size="small">
                            <el-select v-model="ruleForm.manager" value-key="id" @change="changeManager(ruleForm.manager)" filterable placeholder="请选择" style="width:150px">
                                <el-option v-for="item in deductionTypeList" :key="item.id" :label="item.name" :value="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="结算制单号：" prop="overNo" size="small">
                            <el-input v-model="ruleForm.overNo" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="12" v-if="ruleForm.manager == '质量原因' || ruleForm.manager == '其他原因' ">
                        <el-form-item label="扣款金额：" prop="money" size="small">
                            <el-input v-model="ruleForm.money" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="ruleForm.manager == '取消原因'">
                        <el-form-item label="订单数量：" prop="ordersNo" size="small">
                            <el-input v-model="ruleForm.ordersNo" oninput="value=value.replace(/[^\d.]/g,'')" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="ruleForm.manager == '拍照样延期'">
                        <el-form-item label="延期天数：" prop="days" size="small">
                            <el-input v-model="ruleForm.days" oninput="value=value.replace(/[^\d.]/g,'')" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="24">
                        <el-form-item label="备注：" size="small">
                            <el-input v-model="ruleForm.remark" style="width:500px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <Col span="24">
                <el-form-item style="text-align:center">
                    <Button type="primary" @click="addSave('ruleForm',1)">保存并审核</Button>
                    <Button type="primary" @click="addSave('ruleForm',0)">保存</Button>
                    <Button type="default" @click="addCancel">取消</Button>
                </el-form-item>
                </Col>

            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>

    <!-- 编辑弹框 -->
    <Modal :mask-closable="false" v-model="editVisible" :styles="mystyle" @on-cancel="editCancel" title="编辑" :width="750" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :model="changeForm" ref="changeForm" label-width="130px" class="demo-ruleForm " :label-position="left">
                <el-row type="flex">
                    <el-col :span="12">
                        <el-form-item label="制单号：" prop="markNo" size="small">
                            <el-input disabled v-model="changeForm.markNo" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="批次：" size="small">
                            <el-input disabled v-model="changeForm.batch" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="12">
                        <el-form-item label="大货款号：" size="small">
                            <el-input disabled v-model="changeForm.goodsNo" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="折扣：" size="small">
                            <el-input disabled v-model="changeForm.discount" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="12">
                        <el-form-item label="扣款类型：" prop="manager" size="small">
                            <el-select disabled v-model="changeForm.manager" value-key="id" filterable placeholder="请选择" style="width:150px">
                                <el-option v-for="item in deductionTypeList" :key="item.id" :label="item.name" :value="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="扣款金额：" prop="money" size="small">
                            <el-input disabled v-model="changeForm.money" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="结算制单号：" prop="overNo" size="small">
                            <el-input v-model="changeForm.overNo" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="changeForm.manager == '拍照样延期' || changeForm.manager == '大货延期'">
                        <el-form-item label="延期天数：" prop="days" size="small">
                            <el-input disabled v-model="changeForm.days" oninput="value=value.replace(/[^\d.]/g,'')" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="changeForm.manager == '取消原因'">
                        <el-form-item label="订单数量：" size="small">
                            <el-input v-model="changeForm.ordersNo" disabled oninput="value=value.replace(/[^\d.]/g,'')" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="changeForm.manager == '大货延期'">
                        <el-form-item label="调整后订单量：" size="small">
                            <el-input v-model="changeForm.ordersNo" oninput="value=value.replace(/[^\d.]/g,'')" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="调整金额：" size="small">
                            <el-input v-model="changeForm.changeMoney" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="changeForm.manager == '大货延期'">
                        <el-form-item label="合约货期：" size="small">
                            <el-input v-model="changeForm.contract" style="width:150px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="24">
                        <el-form-item label="备注：" size="small">
                            <el-input v-model="changeForm.remark" style="width:500px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <Col span="24">
                <el-form-item style="text-align:center">
                    <Button type="primary" @click="editSave('ruleForm',1)">保存并审核</Button>
                    <Button type="primary" @click="editSave('ruleForm',0)">保存</Button>
                    <Button type="default" @click="editCancel">取消</Button>
                </el-form-item>
                </Col>

            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>

    <Modal :mask-closable="false" v-model="importVisible" :styles="mystyle" @on-cancel="importTwoCancel" title="导入" :width="450" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form class="demo-ruleForm " :label-position="left">
                <Col span="24">
                <el-form-item label="选择扣款类型：" label-width="120px" size="small">
                    <el-select v-model="deductionTypeAdd" value-key="id" filterable placeholder="请选择" style="width:150px">
                        <el-option v-for="item in deductionTypeList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="24">
                <el-form-item label-width="70px">
                    <Button type="default" @click="choses">选择文件</Button>
                    <span>{{this.file ? this.file.name : '未选择任何文件' }}</span><br>
                    <!-- <span v-if="ruleForm.resource == '特定格式'">（*支持文件类型为.csv.xls.xlt.xlsm.xlsx）</span> -->
                </el-form-item>
                </Col>
                <Col span="24">
                <el-form-item style="text-align:center">
                    <Button type="primary" @click="importSave">导入</Button>
                    <Button type="default" @click="importCancel">取消</Button>
                </el-form-item>
                </Col>

            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>

    <!--导入账单选择文件-->
    <Modal v-model="visible" title="导入账单文件">
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
            <Button type="default" @click="cancelGood">取消</Button>
            <Button type="primary" @click="upload">确定</Button>
        </div>
    </Modal>

    <section class="footer" style="margin-bottom:0px">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="明细" name="first">
                <el-table :data="goodsListOne" style="width: 100%" border tooltip-effect="dark" max-height="250" size="mini">
                    <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="制单号" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="goodsNo" label="款号" align="center" min-width="120" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="batchNo" label="批次" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="delayDays" label="延期天数" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="contractDate" label="合约货期" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="afterClippingOrderQty" label="裁剪后订单量" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="deductionAmount" label="扣款金额" min-width="120" align="center" show-overflow-tooltip>
                         <template slot-scope="scope"><div style="text-align:right">{{scope.row.deductionAmount|moneyFilters}}</div></template>
                    </el-table-column>
                    <el-table-column prop="orderQty" label="订单数量" min-width="120" align="center" show-overflow-tooltip>
                        
                    </el-table-column>
                    <el-table-column prop="adjustAmount" label="调整金额" min-width="120" align="center" show-overflow-tooltip>
                         <template slot-scope="scope"><div style="text-align:right">{{scope.row.adjustAmount|moneyFilters}}</div></template>
                    </el-table-column>
                    <el-table-column prop="discountStr" label="折扣" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="remark" label="备注" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="操作日志" name="second">
                <el-table :data="goodsList" style="width: 100%" border tooltip-effect="dark" max-height="250">
                    <el-table-column prop="operator" label="操作员" min-width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="operateTime" label="操作时间" align="center" min-width="120">
                        <!-- <template slot-scope="scope">{{scope.row.operateTime|normalTime}}</template> -->
                    </el-table-column>
                    <el-table-column prop="logContent" label="操作记录" min-width="120" align="center" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <div class="getmore" v-if="goodsList.length>0&&dataFlag" @click="getMore">点击加载更多</div>
                <div class="getmore" v-if="goodsList.length>0&&!dataFlag">没有更多了…</div>
            </el-tab-pane>
        </el-tabs>
    </section>
     <!-- 导出 -->
    <Modal v-model="exportVisible" title="导出" @on-cancel='cancelExport' :width="430" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="exportObj" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col v-show="!moreLarge">
                    <el-form-item label="导出类型" size="small" label-width="95px" prop="platform">
                        <el-select  v-model="exportObj.selected" filterable placeholder="请选择" style="width:150px">
                            <el-option label="导出主表" value="1"></el-option>
                            <el-option label="导出主表+明细" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </Col>
                <Col v-show="moreLarge" style="text-align:center">
                       结算明细主单超过100000行, 确认导出？
                </Col>
                <el-form-item style="padding-left:130px">
                    <Button type="primary" v-if="!moreLarge" @click="getExportTotal">确认</Button>
                    <!-- 二次确认 -->
                    <Button type="primary" v-if="moreLarge" @click="onImport">确认</Button> 
                    <Button type="default" @click="cancelExport">取消</Button>
                </el-form-item>
            </el-form>
        </Row>
        <div slot="footer"></div>
    </Modal>
</div>
</template>

<script>
var record
import downLoad from '../../../filter/downLoad'
import filters from '../../../filter/'
export default {

    data() {
        return {
            payableUserList:[],
            exportObj:{
                       selected:''
            },
            exportVisible:false,
            moreLarge:false,
            purchaseOrderNoObj: {}, //通过采购单号获取采购单数据
            deductionTypeDownload: '',
            deductionTypeAdd: '',
            statusList: [{
                value: 0,
                name: '待审核'
            }, {
                value: 1,
                name: '已审核'
            }, {
                value: 2,
                name: '已关闭'
            }],
            typeList: [],
            deductionTypeList: [],
            addVisible: false,
            editVisible: false,
            codeA: '',
            visible: false,
            importVisible: false,
            downloadVisible: false,
            platformOptions: [],
            activeName: 'first',

            timeAA: null,
            timeBB: null,
            logList: [], //日志
            billNo: '',
            show: false,
            file: null,
            visible: false,
            brandList: [],
            companyCodeOptions: [],
            dialogVisible: false, //新增
            formSearch: {
                code: '',
                name: '',
                person: '',
                supplier:''
            },
            changeForm: {
                changeOrdersNo: '',
                changeMoney: '',
                contract: '',
                manager: '',
                markNo: '',
                overNo: '',
                money: '',
                ordersNo: '',
                days: '',
                batch: '',
                goodsNo: '',
                discount: '',
                remark: '',
            },
            total: 0,
            pagesize: 1000,
            currentPage: 1,
            currentPageDelait: 1,
            footerData: [],
            judgeMenu: [],
            buttonList: [], //按钮权限
            delaiList: [],
            ASDid: '',
            ruleForm: {
                manager: '',
                markNo: '',
                overNo: '',
                money: '',
                ordersNo: '',
                days: '',
                batch: '',
                goodsNo: '',
                discount: '',
                remark: '',
            },
            rules: {
                markNo: [{
                    required: true,
                    message: '请输入',
                    trigger: 'blur',
                }],
                manager: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change',
                }],
                overNo: [{
                    required: true,
                    message: '请输入',
                    trigger: 'blur',
                }],
                money: [{
                    required: true,
                    message: '请输入',
                    trigger: 'blur',
                }],
                ordersNo: [{
                    required: true,
                    message: '请输入',
                    trigger: 'blur',
                }],
                days: [{
                    required: true,
                    message: '请输入',
                    trigger: 'blur',
                }]
            },
        }
    },
    computed: {
        goodsList() {
            return this.$store.state.app.delayAllocationList
        },
        goodsListOne() {
            return this.$store.state.app.onedelayAllocationList
        }
    },
    destroyed() {
        this.$store.commit('cleardelayAllocation')
    },
    mounted() {
        this.getPayableUser()
        this.getplatformOptions()
        this.getCompany()
        this.getDeductionTypeList()
        // this.getShop()
        this.getTypeList()
        this.getBrandList()
        this.getButtonJurisdiction() //按钮权限
        this.initTable([], '')
    },
    methods: {
        //重新获取供应商下拉
        changePayable(name){
            this.formSearch.supplier = ''
            console.log(name)
            let vars = {}
            vars.payableUserId = name
             this.requestWithUriVars('selectorPayableSupplier', vars, null, true).then(res => {
          if (res.code==1) {
              this.typeList = res.data
            }else{
                this.typeList = []
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
        changeManager(name) {
            console.log(name)
            if (name == "大货延期") {
                this.$message.error('大货延期不支持新增')
            } else {
                console.log('45678')
            }
        },
        changeBlur(code) {
            console.log(!code, '7679876')
            if (!code == true) {
                this.$message.error('请输入制单号')
            } else {
                let data = {}
                data.purchaseOrderNo = code
                this.request('order_queryByNo', data, true).then(res => {
                    if (res.code == '1') {
                        console.log(res.data)
                        if (res.data == undefined) {
                            this.$message.error('制单号不存在!')
                        } else {
                            console.log(res.data, '00000000000000000')
                            this.ruleForm.goodsNo = res.data.goodsNo //大货款号
                            this.ruleForm.batch = res.data.orderBatch //批次
                            this.ruleForm.discount = res.data.chargeDiscount //折扣
                            this.ruleForm.overNo = code //结算制单号
                        }
                    }
                })
            }
        },
        addSave(name, code) {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) { //新增保存
                    let data = {}
                    data.audit = code //code = 0保存不审核 code = 1保存并审核
                    data.purchaseOrderNo = this.ruleForm.markNo //制单号
                    data.targetPurchaseOrderNo = this.ruleForm.overNo //结算制单号
                    data.goodsNo = this.ruleForm.goodsNo //大货款号
                    data.batchNo = this.ruleForm.batch //批次
                    data.discount = this.ruleForm.discount //折扣
                    this.ruleForm.manager ? data.deductionType = this.ruleForm.manager : delete data.deductionType //扣款类型
                    this.ruleForm.money ? data.deductionAmount = this.ruleForm.money : delete data.deductionAmount //扣款金额
                    this.ruleForm.days ? data.delayDays = this.ruleForm.days : delete data.delayDays //延期天数
                    this.ruleForm.ordersNo ? data.afterClippingOrderQty = this.ruleForm.ordersNo : delete data.afterClippingOrderQty //订单数量
                    data.remark = this.ruleForm.remark //备注
                    this.request('deductionAdvice_add', data, true).then(res => {
                        if (res.code == '1') {
                            this.$message.success(res.msg)
                            this.getData()
                            this.addVisible = false
                            this.ruleForm = {
                                manager: '',
                                markNo: '',
                                overNo: '',
                                money: '',
                                ordersNo: '',
                                days: '',
                                batch: '',
                                goodsNo: '',
                                discount: '',
                                remark: '',
                            }
                            this.$refs['ruleForm'].resetFields();
                        } else {
                            this.$message.error(res.msg)
                            // this.addVisible = false
                            // this.ruleForm = {}
                        }
                    })
                } else { //验证表单
                    return false;
                }
            });
        },
        addCancel() {
            this.addVisible = false
            this.ruleForm = {
                manager: '',
                markNo: '',
                overNo: '',
                money: '',
                ordersNo: '',
                days: '',
                batch: '',
                goodsNo: '',
                discount: ''
            }
            this.$refs['ruleForm'].resetFields();
        },

        //供应商列表
        getTypeList() {
            this.request('masterData_supplier_selector', {}, false).then(res => {
                if (res.code == 1) {
                    this.typeList = res.data
                }
            })
        },
        getDeductionTypeList() { //扣款类型
            let data = {}
            data.type = 'deduction_type'
            this.request('supplier_constant', data, true).then(res => {
                if (res.code == 1) {
                    this.deductionTypeList = res.data;
                }
            })
        },
        //新增
        onAdd() {
            this.addVisible = true
        },
        //编辑
        onEdit() {
            let arr = w2ui.deductionAdvice.getSelection()
            console.log(arr)
            if (arr.length > 1) {
                this.$message.error('一次只能编辑一条数据')
            } else if (arr.length == 0) {
                this.$message.error('请先选择数据再编辑')
            } else {
                console.log(record, '56789')
                this.editVisible = true
                this.changeForm.markNo = record.purchaseOrderNo //制单号
                this.changeForm.batch = record.batchNo //批次
                this.changeForm.goodsNo = record.goodsNo //大货款号
                this.changeForm.discount = record.discount //折扣
                this.changeForm.manager = record.deductionType //扣款类型
                this.changeForm.money = record.deductionAmount //扣款金额
                this.changeForm.overNo = record.targetPurchaseOrderNo //结算制单号
                this.changeForm.days = record.delayDays //延期天数
                this.changeForm.ordersNo = record.afterClippingOrderQty //订单数量
                // this.changeForm.changeOrdersNo = record.afterClippingOrderQty //调整后订单量
                this.changeForm.changeMoney = record.adjustAmount //调整金额
                this.changeForm.contract = record.contractDate //合约货期
                this.changeForm.remark = record.remark //备注
            }
        },
        editSave(name, code) {
            if (this.changeForm.overNo.length == 0) {
                this.$message.error('结算之单号不能为空')
            } else {
                let data = {}
                data.id = record.id
                data.audit = code //code = 0保存不审核 code = 1保存并审核
                data.purchaseOrderNo = this.changeForm.markNo //制单号
                data.batchNo = this.changeForm.batch //批次
                data.goodsNo = this.changeForm.goodsNo //大货款号
                data.discount = this.changeForm.discount //折扣
                data.deductionType = this.changeForm.manager //扣款类型
                data.deductionAmount = filters.specialSymbol(this.changeForm.money) //扣款金额
                data.targetPurchaseOrderNo = this.changeForm.overNo //结算制单号
                data.delayDays = this.changeForm.days //延期天数
                data.afterClippingOrderQty = this.changeForm.ordersNo //订单数量
                // this.changeForm.changeOrdersNo = data.afterClippingOrderQty //调整后订单量
                data.adjustAmount = filters.specialSymbol(this.changeForm.changeMoney) //调整金额
                data.contractDate = this.changeForm.contract //合约货期
                data.remark = this.changeForm.remark //备注
                this.request('deductionAdvice_update', data, true).then(res => {
                    if (res.code == '1') {
                        this.$message.success(res.msg)
                        this.getData()
                        this.changeForm = {
                            changeOrdersNo: '',
                            changeMoney: '',
                            contract: '',
                            manager: '',
                            markNo: '',
                            overNo: '',
                            money: '',
                            ordersNo: '',
                            days: '',
                            batch: '',
                            goodsNo: '',
                            discount: '',
                            remark:''
                        }
                    } else {
                        this.$message.error(res.msg)
                    }
                    this.editVisible = false
                })
            }
        },
        //取消编辑
        editCancel() {
            this.editVisible = false
        },
        //导入
        onImportBill() {
            this.importVisible = true
        },
        //导入
        importSave() {
            if (this.file == null) {
                this.$message.error('请先选择文件再导入')
            } else if (this.deductionTypeAdd == '') {
                this.$message.error('请先选择扣款类型')
            } else {
                let data = new FormData
                data.append('deductionType', this.deductionTypeAdd)
                data.append('file', this.file)
                // data.deductionType = this.deductionTypeAdd //扣款类型
                // data.file = this.file
                this.request('deductionAdvice_uploadAsync', data, true).then(res => {
                    if (res.code == '1') {
                        this.getKey(res.data)
                    } else {
                        this.$message.error(res.msg)
                    }
                })
                this.importVisible = false
                this.file = null
                this.deductionTypeAdd = ''
            }
        },
        importCancel() {
            this.importVisible = false
            this.file = null
            this.deductionTypeAdd = ''
        },
        //选择文件
        choses() {
            this.visible = true
        },
        upload() {
            if (this.file == null) {
                this.$message.warning('请先选择文件再导入')
            } else {
                this.visible = false
            }
        },
        //上传之前
        handleUpload(file) {
            if (!/\.csv$|.xls$|.xlsm$|.xlsx$|.xlt$/.test(file.name)) {
                this.$message.warning('文件类型不符,请重新选择文件');
                return false
            } else {
                this.file = file //需要传给后台的file文件
                this.name = file.name
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
        //下载模板 
        onDownload() {
            this.downloadVisible = true
        },
        downloadSave() { //确认下载模板   
            if (this.deductionTypeDownload == '') {
                this.$message.error('请先选择扣款类型')
            } else {
                let data = {}
                switch(this.deductionTypeDownload){
                    case'大货延期':
                    location.href="https://eptison.oss-cn-hangzhou.aliyuncs.com/upload/prd/eop-fms/payableDeductionAdviceController/templateFile/大货延期导入模板.xlsx"
                    break;
                    case'其他原因':
                    location.href="https://eptison.oss-cn-hangzhou.aliyuncs.com/upload/prd/eop-fms/payableDeductionAdviceController/templateFile/其他原因导入模板.xlsx"
                    break;
                    case'拍照样延期':
                    location.href="https://eptison.oss-cn-hangzhou.aliyuncs.com/upload/prd/eop-fms/payableDeductionAdviceController/templateFile/拍照样延期导入模板.xlsx"
                    break;
                     case'取消原因':
                    location.href="https://eptison.oss-cn-hangzhou.aliyuncs.com/upload/prd/eop-fms/payableDeductionAdviceController/templateFile/取消原因导入模板.xlsx"
                    break;
                      case'质量原因':
                    location.href="https://eptison.oss-cn-hangzhou.aliyuncs.com/upload/prd/eop-fms/payableDeductionAdviceController/templateFile/质量原因导入模板.xlsx"
                    break;
                }
                setTimeout(()=>{
                      this.downloadVisible       = false
                      this.deductionTypeDownload = ''
                },1500)
                
                // data.deductionType = this.deductionTypeDownload

                // downLoad.downLoad(data, '/eop-boot/payable/deductionAdvice/templateFile')
                // this.downloadVisible = false
                // this.deductionTypeDownload = ''
            }
        },
        //取消下载文件
        downloadCancel() {
            this.downloadVisible = false
            this.deductionTypeDownload = ''
        },
        checkSelection() {
            let arr = w2ui.deductionAdvice.getSelection()
            if (arr.length > 0) {
                return true
            }
            return false
        },
        //审核
        onExamine() {
            let arr = w2ui.deductionAdvice.getSelection()
            let data = {};
            data.command = 'audit'
            data.ids = arr
            if (this.checkSelection()) {
                this.request('deductionAdvice_check', data, false).then((res) => {
                    if (res.code == 1) {
                        this.$prompt('确定要审核选中的数据吗', '操作确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({
                            value
                        }) => {
                            data.remark = '审核 备注:'+(value?value:'无')
                            this.request('deductionAdvice_command', data, false).then((res) => {
                                if (res.code == 1) {
                                    this.$message.success(res.msg)
                                    this.getData()
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消审核'
                            });
                        });
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            } else {
                this.$message.error('请勾选审核数据')
            }
        },
        //取消审核
        offExamine() {
            let arr = w2ui.deductionAdvice.getSelection()
            let data = {};
            data.command = 'unAudit'
            data.ids = arr
            if (this.checkSelection()) {
                this.request('deductionAdvice_check', data, false).then((res) => {
                    if (res.code == 1) {
                        this.$prompt('确定要取消审核选中的数据吗', '操作确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({
                            value
                        }) => {
                            data.remark = '取消审核 备注:' +(value?value:'无')
                            this.request('deductionAdvice_command', data, false).then((res) => {
                                if (res.code == 1) {
                                    this.$message.success(res.msg)
                                    this.getData()
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            } else {
                this.$message.error('请勾选取消审核数据')
            }
        },
        //关闭
        onClose() {
            let arr = w2ui.deductionAdvice.getSelection()
            let data = {};
            data.command = 'close'
            data.ids = arr
            if (this.checkSelection()) {
                this.request('deductionAdvice_check', data, false).then((res) => {
                    if (res.code == 1) {
                        this.$prompt('确定要关闭选中的数据吗', '操作确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({
                            value
                        }) => {
                            data.remark = '关闭 备注:' +(value?value:'无')
                            this.request('deductionAdvice_command', data, false).then((res) => {
                                if (res.code == 1) {
                                    this.$message.success(res.msg)
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
                        this.$message.error(res.msg)
                    }
                })
            } else {
                this.$message.error('请勾选关闭数据')
            }
        },
        //删除
        onDelete() {
            let arr = w2ui.deductionAdvice.getSelection()
            let data = {};
            data.command = 'delete'
            data.ids = arr
            if (this.checkSelection()) {
                this.request('deductionAdvice_check', data, false).then((res) => {
                    if (res.code == 1) {
                        this.$prompt('确定要删除选中的数据吗', '操作确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({
                            value
                        }) => {
                            data.remark = '删除 备注:' +(value?value:'无')
                            this.request('deductionAdvice_command', data, false).then((res) => {
                                if (res.code == 1) {
                                    this.$message.success(res.msg)
                                    this.getData()
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            } else {
                this.$message.error('请勾选取消删除数据')
            }
        },
        //生成扣款单
        onDeduction() {
            let arr = w2ui.deductionAdvice.getSelection()
            let data = {};
            data.command = 'generateDeductionOrder'
            data.ids = arr
            if (this.checkSelection()) {
                this.request('deductionAdvice_check', data, false).then((res) => {
                    if (res.code == 1) {
                        this.$prompt('确定要生成扣款单选中的数据吗', '操作确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({
                            value
                        }) => {
                            data.remark = '生成扣款单 备注:' +(value?value:'无')
                            this.request('deductionAdvice_command', data, false).then((res) => {
                                if (res.code == 1) {
                                    this.$message.success(res.msg)
                                    this.getData()
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            } else {
                this.$message.error('请勾选生成扣款单数据')
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
        initTable(arr = [], page, total) {
            let self = this;
            $(function () {
                $('#main').w2grid({
                    name: 'deductionAdvice',
                    show: {
                        // footer    : true,
                        toolbar: true,
                        selectColumn: true,
                    },
                    reorderColumns: true,
                    reorderRows: true,
                    columns: [
                         {
                            field: 'index',
                            caption: '序号',
                            size: '80px',
                            sortable: true,
                            info: true
                        },
                        {
                            field: 'statusStr',
                            caption: '单据状态',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'bizCode',
                            caption: '单据编号',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'bizDate',
                            caption: '单据日期',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'companyName',
                            caption: '公司',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'supplierName',
                            caption: '供应商',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'brandName',
                            caption: '品牌',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'targetPurchaseOrderNo',
                            caption: '结算制单号',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'deductionAmount',
                            caption: '最终扣款',
                            size: '100px',
                            render:'money',
                            sortable: true
                        },
                        {
                            field: 'deductionType',
                            caption: '扣款类型',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'deductionOrderCode',
                            caption: '扣款单编号',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'dataSources',
                            caption: '数据来源',
                            size: '100px',
                            sortable: true
                        },
                        {
                            field: 'lastUpdated',
                            caption: '最后修改时间',
                            size: '100px',
                            sortable: true
                        },
                    ],
                    onClick: function (event) {
                        // self.$store.commit('cleardelayAllocation')
                        record = this.get(event.recid);
                        // self.getLoglist(event.recid)
                        // self.getOrderList(event.recid)
                        // self.currentPageDelait = 1;
                        // self.currentPage = 1;
                        
                        setTimeout(function(){
                            if(w2ui.deductionAdvice.getSelection().length == 1){
                                self.$store.commit('cleardelayAllocation')
                                let arr = w2ui.deductionAdvice.getSelection()
                               if(arr[0] != record.id){
                                    self.$store.commit('cleardelayAllocation')
                                }else{
                                    console.log(record.id)
                                    self.activeName='first'
                                    self.getLoglist(event.recid)
                                    self.getOrderList(event.recid)
                                    self.currentPageDelait = 1;
                                    self.currentPage = 1;
                                  }
                            }else{
                                 self.$store.commit('cleardelayAllocation')
                            }
                        }, 200);
                    }
                })
            });
            if (arr.length > 0) {
                console.log(arr, '56789')
                w2ui.deductionAdvice.clear(); //清空
                w2ui.deductionAdvice.records = arr
                w2ui.deductionAdvice.records.push({
                    w2ui: {
                        summary: true
                    },
                    index: '<span>当页小计</span>',
                    deductionAmount: page.deductionAmount,
                }, {
                    w2ui: {
                        summary: true
                    },
                    index: '<span >合计</span>',
                    deductionAmount: total.deductionAmount,
                })
                $('#main').w2render('deductionAdvice');
                w2ui.deductionAdvice.refresh();
            } else {
                $(document).ready(function () {
                    w2ui.deductionAdvice.clear(); //清空
                    w2ui['deductionAdvice'].records = []
                    w2ui.deductionAdvice.refresh();
                    $('#main').w2render('deductionAdvice')
                })

            }

        },

        //循环key
        getKey(key) {
            let data = {}
            data.taskKey = key
            this.timeAA = setTimeout(() => {
                this.request('getProcessResultByTaskKey', data, false).then(res => {
                    if (res.code == 1) {
                        if (res.data.processStatus !== 0) {
                            if (res.data.processStatus == 1) {
                                this.$notify.success({
                                    title: res.data.title,
                                    message: res.data.subTitle,
                                    duration: 0,
                                });
                            } else {
                                this.$notify.error({
                                    title: res.data.title,
                                    message: res.data.subTitle,
                                    duration: 0,
                                });
                            }
                            this.cleanKey(key)

                            function myStopFunction() {
                                clearTimeout(this.timeAA);
                            }
                        } else {
                            this.$notify.success({
                                title: res.data.title,
                                message: res.data.subTitle,
                                duration: 3000
                            });
                            this.getKey(key)
                        }
                    } else {
                        this.message.warning(res.msg)
                    }
                })
            }, 5000)
        },
        cleanKey(key) {
            let data = {}
            data.taskKey = key
            this.request('delByTaskKey', data, false).then(res => {
                if (res.code == 1) {
                    console.log('oooo')
                }
            })
        },
        onReset() {
            this.formSearch = {
                code: '',
                name: '',
                person: '',
                supplier:''
            }
            this.getTypeList()
        },
        getplatformOptions() {
            this.request('getPlatformSelector', {}, true).then(res => {
                if (res.code == 1) {
                    this.platformOptions = res.data;
                }
            })
        },
        getCompany() {
            let data = {}
            this.request('selectorCompany', data, true).then(res => {
                if (res.code == 1) {
                    this.companyCodeOptions = res.data
                }
            })
        },
        getBrandList() {
            let data = {}
            this.request('masterData_brand_selector', data, true).then(res => {
                if (res.code == 1) {
                    this.brandList = res.data
                }
            })
        },
        getData() {
            this.$store.commit('cleardelayAllocation')
            this.logList = []
            let data = {}
            data.pageSize = this.pagesize
            data.currentPage = this.currentPage
            data.year = this.formSearch.year
            data.goodsNo = this.formSearch.goodsNo
            data.purchaseOrderNo = this.formSearch.oddsNo //制单号
            data.supplierId = this.formSearch.supplier //供应商ID
            data.payableUserId = this.formSearch.payableUser//所属人员
            data.deductionType = this.formSearch.deductionType //扣款类型
            data.targetPurchaseOrderNo = this.formSearch.settlementsNo //结算制单号
            data.status = this.formSearch.status //单据状态
            data.companyId = this.formSearch.name //公司ID
            this.formSearch.deduction ? data.deduction=Number(this.formSearch.deduction):delete data.deduction
            this.formSearch.documentDate ? data.startDate = this.formSearch.documentDate[0] : delete data.startDate //开始时间
            this.formSearch.documentDate ? data.endDate = this.formSearch.documentDate[1] : delete data.endDate //结束时间
            this.request('deductionAdvice_page', data, true).then(res => {
                if (res.code == '1') {
                    this.total = res.data.count;
                    //   this.tableData = res.data.records;
                    if (res.data.records) {
                        for (let i = 0, len = res.data.records.length; i < len; i++) {
                              res.data.records[i].index =i+1
                            res.data.records[i].recid = res.data.records[i].id
                        }
                        this.initTable(res.data.records, res.data.currentPageSum, res.data.totalPageSum)
                        // this.hasData=true
                    } else {
                        this.initTable([])
                    }
                    this.loading = false
                } else {
                    this.initTable([])
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            })
        },
        //订单明细
        getOrderList(code) {
            this.ASDid = code
            let data = {}
            data.id = code
            this.request('deductionAdvice_detail', data, true).then(res => {
                this.delaiList = res.data
                this.$store.commit('OnedelayAllocation', this.delaiList)
            })
        },
        getLoglist(billNo) {
            this.billNo = 'payable_deduction_advice_' + billNo
            this.currentPage = 1
            let data = {}
            data.billNo = 'payable_deduction_advice_' + billNo
            data.pageSize = 3
            data.currentPage = this.currentPage
            this.request('billLog_getPagingByBillNo', data, false).then((res) => {
                if (res.code == 1) {
                    if (res.data.length < data.pageSize) {
                        this.dataFlag = false
                    } else {
                        this.dataFlag = true
                    }
                    if (this.currentPage == 1) {
                        this.logList = res.data
                        this.$store.commit('delayAllocation', this.logList)
                    } else {
                        this.logList = this.logList.concat(res.data)
                        this.$store.commit('delayAllocation', this.logList)
                    }
                }
            })
        },
        getMore() {
            this.currentPage++
            let data = {}
            data.billNo = this.billNo
            data.pageSize = 3
            data.currentPage = this.currentPage
            this.request('billLog_getPagingByBillNo', data, false).then((res) => {
                if (res.code == 1) {
                    if (res.data.length < data.pageSize) {
                        this.dataFlag = false
                    } else {
                        this.dataFlag = true
                    }
                    if (this.currentPage == 1) {
                        this.logList = res.data
                        this.$store.commit('delayAllocation', this.logList)
                    } else {
                        this.logList = this.logList.concat(res.data)
                        this.$store.commit('delayAllocation', this.logList)
                    }
                }
            })
        },
        // showLog(row) {
        //     this.getLoglist(row.orderId)
        // },
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
               //导出相关
        checkExport(){
                 if(this.checkSelection()){
                    // this.onImport()
                     this.exportVisible=true
                 }else{
                     this.exportVisible=true
                 }
        },
        cancelExport(){
                   this.exportVisible=false;
                   this.moreLarge=false;
                   this.exportObj.selected=''
        },
        getExportTotal(){
           if(!this.exportObj.selected) return this.$message.error('请选择导出类型')
           let data={}
                        data.pageSize = this.pagesize
                        data.currentPage = this.currentPage
                        data.year = this.formSearch.year
                        data.goodsNo = this.formSearch.goodsNo
                        data.purchaseOrderNo = this.formSearch.oddsNo //制单号
                        data.supplierId = this.formSearch.supplier //供应商ID
                        data.payableUserId = this.formSearch.payableUser//所属人员
                        data.deductionType = this.formSearch.deductionType //扣款类型
                        data.targetPurchaseOrderNo = this.formSearch.settlementsNo //结算制单号
                        data.status = this.formSearch.status //单据状态
                        data.companyId = this.formSearch.name //公司ID
                        this.formSearch.deduction ? data.deduction=Number(this.formSearch.deduction):delete data.deduction // 是否生成扣款单
                        this.formSearch.documentDate ? data.startDate = this.formSearch.documentDate[0] : delete data.startDate //开始时间
                        this.formSearch.documentDate ? data.endDate = this.formSearch.documentDate[1] : delete data.endDate //结束时间
                        w2ui.deductionAdvice.getSelection().length>0?data.ids= w2ui.deductionAdvice.getSelection():delete data.ids
                        this.exportObj.selected==1? data.inclusionDetails=false:data.inclusionDetails=true;
           this.request('payable_deductionAdvice_count',data,false).then(res=>{
               if(res.code==1){
                   if(res.data>100000){
                       this.moreLarge=true
                   }else{
                       this.moreLarge=false
                       this.onImport()
                   }
               }else{
                   this.$message.error(res.msg)
               }
           })
        },
         //导出
        onImport(){
                    let data={}
                        data.pageSize = this.pagesize
                        data.currentPage = this.currentPage
                        data.year = this.formSearch.year
                        data.goodsNo = this.formSearch.goodsNo
                        data.purchaseOrderNo = this.formSearch.oddsNo //制单号
                        data.supplierId = this.formSearch.supplier //供应商ID
                        data.payableUserId = this.formSearch.payableUser//所属人员
                        data.deductionType = this.formSearch.deductionType //扣款类型
                        data.targetPurchaseOrderNo = this.formSearch.settlementsNo //结算制单号
                        data.status = this.formSearch.status //单据状态
                        data.companyId = this.formSearch.name //公司ID
                        this.formSearch.deduction ? data.deduction=Number(this.formSearch.deduction):delete data.deduction // 是否生成扣款单
                        this.formSearch.documentDate ? data.startDate = this.formSearch.documentDate[0] : delete data.startDate //开始时间
                        this.formSearch.documentDate ? data.endDate = this.formSearch.documentDate[1] : delete data.endDate //结束时间
                        w2ui.deductionAdvice.getSelection().length>0?data.ids= w2ui.deductionAdvice.getSelection():delete data.ids
                        this.exportObj.selected==1? data.inclusionDetails=false:data.inclusionDetails=true;
                      this.request('payable_deductionAdvice_exportAsync', data, false).then(res => {
                        if (res.code == 1) {
                            this.cancelExport()
                            this.getKeyD(res.data)
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                }) 
        },
          getKeyD(key) {
            const h = this.$createElement;
            let data = {}
                data.taskKey = key
            this.timeBB = setTimeout(() => {
                this.request('getProcessResultByTaskKey', data, false).then(res => {
                    if (res.code == 1) {
                        if (res.data.processStatus !== 0) {
                            this.$notify.success({
                                title: res.data.title,
                                message: h('p', null, [
                                    h('a', {
                                        on: {
                                            click: this.clickA(res.data.subTitle)
                                        }
                                    }, res.data.subTitle.indexOf('[') == -1 ? res.data.subTitle : "下载链接"),
                                ]),
                                duration: 0,
                            });
                            this.cleanKey(key)
                            function myStopFunction() {
                                clearTimeout(this.timeBB);
                            }
                        } else {
                            this.$notify.success({
                                title: res.data.title,
                                message: res.data.subTitle,
                                duration: 3000
                            });
                            this.getKeyD(key)
                        }
                    } else {
                        this.$message.warning(res.msg)
                    }
                })
            }, 5000)
        },
        clickA(url) {
            console.log(url)
            if (url.indexOf('[') == -1) {
                console.log('没有地址')
            } else {
                url.replace()
                let aPos = url.indexOf('[');
                let bPos = url.indexOf(']');
                let r = url.substr(aPos + 1, bPos - aPos - 1);
                window.location.href = r
            }
        },
        cleanKey(key) {
            let data = {}
                data.taskKey = key
            this.request('delByTaskKey', data, false).then(res => {
                if (res.code == 1) {
                    console.log('oooo')
                }
            })
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
