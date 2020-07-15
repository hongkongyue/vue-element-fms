<template>
  <div>
    <header class="headerstyle">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <Col style="margin-bottom:0px">
          <el-form-item size="small" class="marginT0">
            <!--   -->
            <el-button v-if="judgeMenu.indexOf('查询') != -1"  size="small" type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
          <el-form-item size="small" class="marginT0">
            <el-button size="small" type="default" @click="onReset">重置</el-button>
          </el-form-item>
          <el-form-item size="small" class="marginT0">
            <!--   " -->
            <el-button  v-if="judgeMenu.indexOf('新增') != -1" size="small" type="primary" @click="onAdd">新增</el-button>
          </el-form-item>
          <el-form-item size="small" class="marginT0">
            <!--   -->
            <el-button v-if="judgeMenu.indexOf('编辑') != -1" size="small" type="primary" @click="onEdit">编辑</el-button>
          </el-form-item>
          <el-form-item size="small" class="marginT0">
            <!---->
            <el-button  v-if="judgeMenu.indexOf('删除') != -1"  size="small" type="primary" @click="del111">删除</el-button>
          </el-form-item>
        </Col>
        <!-- <el-form-item label="供应商全称：" size="small">
          <el-select
            v-model="formSearch.supplierId"
            placeholder="请选择"
            style="width:150px"
            filterable
          >
            <el-option v-for="v in suppyList" :key="v.id" :label="v.name" :value="v.id"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="加工类型：" size="small">
          <el-input v-model="formSearch.processType" placeholder="请输入"></el-input>
        </el-form-item>
        <!-- <el-form-item label="生效期间：" size="small">
          <el-date-picker
            v-model="formSearch.date"
            type="daterange"
            range-separator="~"
            start-placeholder="生效日期"
            end-placeholder="失效日期"
          ></el-date-picker>
        </el-form-item>-->
      </el-form>
    </header>
    <section class="middle" :style="{minHeight:showBink?'700px':'480px'}">
      <el-pagination
        style="margin-bottom:10px;text-align:right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <el-table
        @selection-change="selection"
        @row-click="showLog"
        @select-all="selection"
        @select="selection"
        ref="multipleTable"
        :data="list"
        style="width: 100%"
        class="pointer"
        border
        tooltip-effect="dark"
        :maxHeight="tableHieght"
        highlight-current-row
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
        <el-table-column prop="processType" label="加工类型" min-width="120" align="center">
          <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
        </el-table-column>
        <el-table-column
          prop="createUser"
          label="创建人"
          min-width="120"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="created"
          label="创建时间"
          min-width="120"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="lastUpdateUser"
          label="修改人"
          min-width="120"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="lastUpdated"
          label="修改时间"
          min-width="120"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
      <section class="footer" style="margin-bottom:0px">
      <div style="width:100%;font-size:20px;">操作日志</div>
      </section>
      <section class="log">
        <el-table :data="logList" style="width: 100%" border tooltip-effect="dark" max-height="170">
          <el-table-column prop="operator" label="操作员" min-width="120" align="center"></el-table-column>
          <el-table-column prop="operateTime" label="操作时间" align="center" min-width="120">
            <template slot-scope="scope">{{scope.row.operateTime}}</template>
          </el-table-column>
          <el-table-column
            prop="logContent"
            label="操作记录"
            min-width="120"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
        <div class="getmore" v-if="logList.length>0&&dataFlag" @click="getMore">点击加载更多</div>
        <div class="getmore" v-if="logList.length>0&&!dataFlag">没有更多了…</div>
      </section>
    </section>
    
    <!-- 编辑新增弹框 -->
    <Modal
      v-model="dialogVisible"
      :styles="mystyle"
      :title="dialogtitle"
      :width="560"
      @on-cancel="cancel1"
      class-name="customize-modal-center"
    >
      <Row class="margin-bottom-10 background-color-white exhibition">
        <el-form
          :inline="true"
          ref="ruleForm"
          :model="formData"
          label-width="80px"
          class="demo-form-inline demo-ruleForm"
          label-position="left"
          :rules="rules"
        >
          <!-- <Col> -->
          <el-form-item label="加工类型" size="small" label-width="95px" prop="processType">
            <!--   <el-input  v-model="formData.supplierName" maxlength="20" style="width:120px"></el-input> -->
             <el-input
                type="text"
                v-model="formData.processType"
                maxlength="1000"
                placeholder="请输入"
                style="width:380px"
              ></el-input>
          </el-form-item>
         
          <el-form-item style="padding-left:210px">
            <Button type="primary" v-if="dialogtitle!='编辑'" @click="submitForm('ruleForm')">确认</Button>
            <Button type="primary" v-else @click="submitFormEdit('ruleForm')">确认</Button>
            <Button type="default" @click="cancel1">取消</Button>
          </el-form-item>
        </el-form>
      </Row>
      <div slot="footer"></div>
    </Modal>
    <Modal
      v-model="importVisible"
      :styles="mystyle"
      title="导入"
      :width="610"
      @on-cancel="cancelimportConfirm"
      class-name="customize-modal-center"
    >
      <Row class="margin-bottom-10 background-color-white exhibition">
        <el-form :inline="true" class="demo-form-inline demo-ruleForm" :label-position="left">
          <Col>
            <el-form-item>
              <el-upload
                class="upload-demo"
                :before-upload="getFile"
                :on-change="getFile"
                :auto-upload="false"
                :show-file-list="false"
                action="/eop-boot/masterData/deductionDiscount/uploadAsync"
              >
                <el-button size="small" type="default">点击上传</el-button>
                <span
                  v-if="this.uploadList.length==0"
                  style="padding-left:10px"
                  size="small"
                  type="default"
                >未选择任何文件</span>
              </el-upload>
            </el-form-item>
          </Col>
          <Col v-if="uploadList.length>0">{{uploadList[0].name}}</Col>
          <el-form-item style="padding-left:215px">
            <Button type="primary" @click="importConfirm">确认</Button>
            <Button type="default" @click="cancelimportConfirm">取消</Button>
          </el-form-item>
        </el-form>
      </Row>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
import filters from "../../../filter/";
import {debounce} from 'mixins/debounce'
import {burypoint} from 'mixins/burypoint'
export default {
  mixins:[debounce,burypoint],
  data() {
    return {
      true: true,
      dialogVisible: false,
      downLoadVisible: false,
      downLoadVisible: false,
      cancelVisible: false,
      importVisible: false,
      logList: [],
      file: "",
      uploadList: [],
      formSearch: {
        processType: "",
      },
      formData: {
       processType:''
      },
      dialogtitle: "新增",
      suppyList: [], //供应商列表
      page: 1,
      total: "",
      pageSize: 10,
      currentPage: 1,
      mystyle: {
        top: "150px"
      },
      IDS: [],
      list: [],
      judgeMenu: [],
      judgeMenu: [],
      buttonList: [], //按钮权限
      rules: {
        processType: [
          { required: true, message: "请输入加工类型", trigger: "blur" }
        ],
        // startTime: [
        //   { required: true, message: "请选择生效日期", trigger: "blur" }
        // ],
        // endTime: [
        //   { required: true, message: "请选择失效日期", trigger: "blur" }
        // ],
        discount: [
          { required: true, message: "请输入折扣", trigger: "change" },
          { pattern: /^[1-9]\d*(\.\d+)?$/i, message: "折扣须大于0" }
        ]
      }
    };
  },
  mounted() {
    this.getData();
    this.getButtonJurisdiction();
  },
  methods: {
    getButtonJurisdiction() {
      let data = {};
      data.parentResourceCode = this.$route.query.code;
      this.request("masterData_resource_buttonResource", data, true).then(
        res => {
          if (res.code == 1) {
            this.buttonList = res.data;
            let newList = [];
            this.buttonList.map(function(item) {
              newList.push(item.resourceName);
            });
            this.judgeMenu = newList;
          }
        }
      );
    },
    confirmDel() {
      let data = {};
      data.id = this.IDS[0].id;
      this.request("masterData_deductionDiscount_delete", data, false).then(
        res => {
          if (res.code == 1) {
            this.$message.success(res.msg);
            this.getData();
            this.cancelVisible = false;
          } else {
            this.$message.error(res.msg);
          }
        }
      );
    },
    cancelonfirmDel() {
      this.cancelVisible = false;
    },
    delAll(ids){
        this.setBuryPoint('删除确认')
        this.request('discount_markChangeProcessType_delete',{ids:ids},false).then(res=>{
          if(res.code==1){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
           this.getData()
          }
        })
    },
    del111() {
      this.setBuryPoint('删除')
      if (this.IDS.length >0) {
       this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             let ids=[]
                 this.IDS.map((i)=>{
                   ids.push(i.id)
                 })
             this.delAll(ids)   
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
    onEdit() {
      this.setBuryPoint('编辑')
      if (this.IDS.length == 1) {
        this.dialogtitle = "编辑";
        this.dialogVisible = true;
        this.formData = Object.assign({}, this.formData, this.IDS[0]);
        this.formData.id = this.IDS[0].id;
        console.log(this.formData, "9999999");
      } else if (this.IDS.length == 0) {
        this.$message.error("请先选择修改的数据！");
      } else if (this.IDS.length > 1) {
        this.$message.error("一次只能修改一条数据！");
      }
    },
    selection(selection) {
      this.IDS = selection;
    },

    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getData();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getData();
    },
    getLoglist(billNo) {
      this.billNo = billNo;
      this.currentPage = 1;
      console.log(filters.getConstant("brand"), "000000000");
      let data = {};
      data.billNo = "mark_change_process_type_record_" + this.billNo;
      data.pageSize = 3;
      data.currentPage = this.currentPage;
      this.request("billLog_getPagingByBillNo", data, true).then(res => {
        if (res.code == 1) {
          if (res.data.length < data.pageSize) {
            this.dataFlag = false;
          } else {
            this.dataFlag = true;
          }
          if (this.currentPage == 1) {
            this.logList = res.data;
          } else {
            this.logList = this.logList.concat(res.data);
          }
        }
      });
    },
    getMore() {
      this.currentPage++;
      let data = {};
      data.billNo = "mark_change_process_type_record_" + this.billNo;
      data.pageSize = 3;
      data.currentPage = this.currentPage;
      this.request("billLog_getPagingByBillNo", data, true).then(res => {
        if (res.code == 1) {
          if (res.data.length < data.pageSize) {
            this.dataFlag = false;
          } else {
            this.dataFlag = true;
          }
          if (this.currentPage == 1) {
            this.logList = res.data;
          } else {
            this.logList = this.logList.concat(res.data);
          }
        }
      });
    },
    onAdd() {
      this.setBuryPoint('新增')
      this.dialogtitle = "新增";
      this.dialogVisible = true;
    },
    onSearch() {
      this.setBuryPoint('查询')
      this.page = 1;
      this.getData();
    },
    onReset() {
      for (let i in this.formSearch) {
        this.formSearch[i] = "";
      }
      this.page = 1;
      this.getData();
    },

    submitForm(formName) {
      this.setBuryPoint('新增确认')
      this.dialogVisible = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addBrand();
        } else {
          return false;
        }
      });
    },
    submitFormEdit(formName) {
      this.setBuryPoint('编辑确认')
      this.dialogVisible = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editBrand();
        } else {
          return false;
        }
      });
    },
    choiced(id) {
      console.log(id);
      for (let i = 0, len = this.companyList.length; i < len; i++) {
        if (this.companyList[i].id == id) {
          this.addformdata.companyAddress = this.companyList[i].address;
          this.addformdata.companyPhone = this.companyList[i].companyPhone;
        }
      }
    },
    getData() {
      this.logList = [];
      let data = {};
      data.currentPage = this.page;
      data.pageSize = this.pageSize;
      !!this.formSearch.processType? data.processType = this.formSearch.processType:delete data.processType 
      this.request("discount_markChangeProcessType_query_page", data, true).then(
        res => {
          if (res.code == 1) {
            this.list = res.data.records;
            this.total = res.data.count;
          } else {
            this.list = [];
            this.total = "0";
          }
        }
      );
    },
    getResponse() {
      let data = {};
      this.request("masterData_supplier_selector", data, true).then(res => {
        if (res.code == 1) {
          this.suppyList = res.data;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    cancel1() {
      this.dialogVisible = false;
      this.resetForm("ruleForm");
    },
    addBrand() {
      let data = {};
          data.processType=this.formData.processType
      this.request("discount_markChangeProcessType_add", data, true).then(res => {
        if (res.code == 1) {
          this.$message({
            message: "新增成功",
            type: "success"
          });
          this.cancel1();
          this.getData();
          this.formData.processType = "";
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
          this.formData.processType = "";
        }
      });
    },
    editBrand() {
      let data = {};
      data.id = this.formData.id;
      data.processType=this.formData.processType
      this.request("discount_markChangeProcessType_update", data, true).then(
        res => {
          if (res.code == 1) {
            this.$message({
              message: "编辑成功",
              type: "success"
            });
            this.dialogVisible = false;
            this.cancel1();
            this.getData();
            this.cancel();
            this.formData.processType = "";
          } else {
            this.formData.processType = "";
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        }
      );
    },
    cancel() {
      this.resetEditForm();
      this.resetForm("ruleForm");
      this.dialogVisible = false;
    },
    onImport() {
      this.importVisible = true;
    },
    showLog(row) {
      this.getLoglist(row.id);
    },
    cancelimportConfirm() {
      this.importVisible = false;
      this.file = "";
      this.uploadList = [];
    },
  }
};
</script>

<style lang="less" scoped>
.headerstyle,
.main,
.middle,
.footer {
  width: 99%;
  margin: 0 auto;
  background: #fff;
  padding: 10px 20px 10px 20px;
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
  padding-left: 20px;
}

.el-table__row td {
  padding: 0;
}

/* 用来设置当前页面element全局table 选中某行时的背景色*/
.el-table__body tr.current-row > td {
  background-color: #f19944 !important;
  /* color: #f19944; */
  /* 设置文字颜色，可以选择不设置 */
}

/* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #f19944;
  /* color: #f19944; */
  /* 设置文字颜色，可以选择不设置 */
}
</style>
