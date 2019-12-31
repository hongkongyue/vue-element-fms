<template>
  <div>
    <header class="headerstyle">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <Col style="margin-bottom:20px">
          <el-form-item size="small" class="marginT0">
            <!--    -->
            <el-button v-if="judgeMenu.indexOf('查询') != -1" size="small" type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
          <el-form-item size="small" class="marginT0">
            <el-button size="small" type="default" @click="onReset">重置</el-button>
          </el-form-item>
          <el-form-item size="small" class="marginT0">
            <!--  " -->
            <el-button   v-if="judgeMenu.indexOf('新增') != -1"  size="small" type="primary" @click="onAdd">新增</el-button>
          </el-form-item>
          <el-form-item size="small" class="marginT0">
            <!--   -->
            <el-button v-if="judgeMenu.indexOf('编辑') != -1" size="small" type="primary" @click="onEdit">编辑</el-button>
          </el-form-item>
        </Col>
         <el-form-item label="品牌：" size="small">
                              <el-select v-model="formSearch.basicBrandId" placeholder="请选择" style="width:160px" filterable>
                                 <el-option v-for="v in brandList" :key="v.id"  :label="v.name"  :value="v.id"></el-option>
                              </el-select>
         </el-form-item>
         <el-form-item label="状态：" size="small">
                              <el-select v-model="formSearch.status" placeholder="请选择" style="width:160px" filterable>
                                 <el-option  label="启用"  value="1"></el-option>
                                 <el-option  label="禁用"  value="0"></el-option>
                              </el-select>
         </el-form-item>
      </el-form>
    </header>
    <section class="middle">
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
        max-height="250"
        highlight-current-row
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
        <el-table-column prop="basicBrandName" label="品牌" min-width="120" align="center">
          <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
        </el-table-column>
        <el-table-column
          prop="discountRate"
          label="减值率%"
          min-width="120"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          min-width="120"
          align="center"
          show-overflow-tooltip
        >
        <template slot-scope="scope">{{scope.row.status==1?'启用':'禁用'}}</template>
        </el-table-column>
      </el-table>
    </section>
    <section class="footer" style="margin-bottom:0px">
      <div style="width:100%;font-size:20px;">操作日志</div>
    </section>
    <section class="middle">
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
    <!-- 编辑新增弹框 -->
    <Modal
      v-model="dialogVisible"
      :styles="mystyle"
      :title="dialogtitle"
      :width="420"
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
          <el-form-item label="品牌" size="small" label-width="95px" prop="basicBrandId">
            <!--   <el-input  v-model="formData.supplierName" maxlength="20" style="width:120px"></el-input> -->
             <el-select :disabled="this.dialogtitle=='编辑'" v-model="formData.basicBrandId" placeholder="请选择" style="width:160px" filterable>
                    <el-option v-for="v in brandList" :key="v.id"  :label="v.name"  :value="v.id"></el-option>
             </el-select>
          </el-form-item>
          <el-form-item label="减值率%" size="small" label-width="95px" prop="discountRate">
            <!--   <el-input type="number" v-model="formData.discount" :min="0" maxlength="20" style="width:110px"></el-input> -->
            <el-input-number
              v-model="formData.discountRate"
              controls-position="right"
              :precision="2"
              :max="100"
              style="width:160px"
            ></el-input-number>
          </el-form-item>
          <Col>
              <el-form-item label="状态" size="small" label-width="95px" prop="status">
                <el-select v-model="formData.status" placeholder="请选择" style="width:160px" filterable>
                        <el-option  label="启用"  value="1"></el-option>
                        <el-option  label="禁用"  value="0"></el-option>
                </el-select>
             </el-form-item>
          </Col>
          <el-form-item style="padding-left:130px">
            <Button type="primary" v-if="dialogtitle!='编辑'" @click="submitForm('ruleForm')">确认</Button>
            <Button type="primary" v-else @click="submitFormEdit('ruleForm')">确认</Button>
            <Button type="default" @click="cancel1">取消</Button>
          </el-form-item>
        </el-form>
      </Row>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
import filters from "../../../filter/";
export default {
  data() {
    return {
      true: true,
      dialogVisible: false,
      downLoadVisible: false,
      downLoadVisible: false,
      cancelVisible:  false,
      importVisible:  false,
      brandList:[],   //品牌列表
      logList: [],
      formSearch: {
        basicBrandId: "",
        status:''
      },
      formData: {
            basicBrandId:'',
            discountRate:'100',
            status:''
      },
      dialogtitle: "新增",
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
      buttonList: [], //按钮权限
      rules: {
         basicBrandId: [
            { required: true, message: "请选择品牌", trigger: "change" }
         ],
         status: [
           { required: true, message: "请选择状态", trigger: "change" }
        ],
        discountRate: [
          { required: true, message: "请输入减值率", trigger: "change" },
          { pattern: /^[1-9]\d*(\.\d+)?$/i, message: "减值率须大于0" }
        ]
      }
    };
  },
  mounted() {
    this.getBrandList()
    this.getData();
    this.getButtonJurisdiction();
   
  },
  methods: {
     getBrandList(){
                 let data={}
                    this.request('masterData_brand_selector', data, true).then((res) => {
                            if (res.code == 1) {
                                  this.brandList=res.data
                            }
                        }) 
        },
    watchSupplierId(id) {
      console.log(this.getName(id), "999999");
      this.formSearch.supplierShortName = this.getName(id);
    },
    watchSupplierId2(id) {
      // console.log(this.getName(id),'999999')
      this.formData.supplierShortName = this.getName(id);
    },
    getName(id) {
      for (let i = 0, len = this.suppyList.length; i < len; i++) {
        if (this.suppyList[i].id == id) {
          return this.suppyList[i].shortName;
        }
      }
    },
    getCode(id) {
      for (let i = 0, len = this.suppyList.length; i < len; i++) {
        if (this.suppyList[i].id == id) {
          return this.suppyList[i].code;
        }
      }
    },
    getName2(id) {
      for (let i = 0, len = this.suppyList.length; i < len; i++) {
        if (this.suppyList[i].id == id) {
          return this.suppyList[i].name;
        }
      }
    },
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
    del111() {
      if (this.IDS.length == 1) {
        this.cancelVisible = true;
      } else if (this.IDS.length == 0) {
        this.$message.error("请先选择删除的数据！");
      } else if (this.IDS.length > 1) {
        this.$message.error("一次只能删除一条数据！");
      }
    },
    onEdit() {
      if (this.IDS.length == 1) {
        this.dialogtitle = "编辑";
        this.dialogVisible = true;
        this.formData = Object.assign({}, this.formData, this.IDS[0]);
        this.formData.status=String(this.IDS[0].status)
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
      data.billNo = "master_data_discount_dict_" + this.billNo;
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
      data.billNo = "master_data_discount_dict_" + this.billNo;
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
      this.dialogtitle = "新增";
      this.dialogVisible = true;
    },
    onSearch() {
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
      !!this.formSearch.status?data.status=Number(this.formSearch.status):delete data.status
      !!this.formSearch.basicBrandId?data.basicBrandId = this.formSearch.basicBrandId:delete data.basicBrandId ;
      this.request("discount_dict_page", data, true).then(
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    cancel1() {
      this.dialogVisible = false;
      this.resetForm("ruleForm");
    },
    addBrand() {
      let data = {};
      data.basicBrandId = this.formData.basicBrandId;
      data.discountRate = this.formData.discountRate;
      data.status = Number(this.formData.status);
      this.request("discount_dict_add", data, true).then(res => {
        if (res.code == 1) {
          this.$message({
            message: "新增成功",
            type: "success"
          });
          this.cancel1();
          this.getData();
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    editBrand() {
      let data = {};
      data.id = this.formData.id;
      data.discountRate = Number(this.formData.discountRate);
      data.status =  Number(this.formData.status);
      this.request("discount_dict_update", data, true).then(
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
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        }
      );
    },
    downLoadTemplate() {
      this.downLoadVisible = true;
    },
    confirmDownload() {
      window.location = "/excel/扣款折扣导入模板.xlsx";
      this.$message.success("下载模板成功");
      this.downLoadVisible = false;
    },
    cancelconfirmDownload() {
      this.downLoadVisible = false;
    },
    cancel() {
      // this.resetEditForm();
      this.resetForm("ruleForm");
      this.dialogVisible = false;
    },
    onImport() {
      this.importVisible = true;
    },
    showLog(row) {
      this.getLoglist(row.id);
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    getFile(file) {
      console.log(file);
      if (!/\.xls$|.xlsx$|.csv$/.test(file.name)) {
        this.$Message.warning("文件类型不符,请重新选择文件");
        return false;
      }
      this.uploadList[0] = file;
      this.file = file;
      this.$set(this.uploadList, 0, file);
      console.log(this.file);
    },
    importConfirm() {
      let data = new FormData();
      data.append("file", this.file.raw);
      this.request(
        "masterData_deductionDiscount_uploadAsync",
        data,
        false
      ).then(res => {
        if (res.code == 1) {
          this.importVisible = false;
          this.uploadList = [];
          this.getKeyD(res.data);
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    getKeyD(key) {
      const h = this.$createElement;
      let data = {};
      data.taskKey = key;
      this.timeBB = setTimeout(() => {
        this.request("getProcessResultByTaskKey", data, false).then(res => {
          if (res.code == 1) {
            if (res.data.processStatus !== 0) {
              this.$notify.success({
                title: res.data.title,
                message: h("p", null, [
                  h(
                    "a",
                    {
                      on: {}
                    },
                    res.data.subTitle.indexOf("[") == -1
                      ? res.data.subTitle
                      : res.data.subTitle
                  )
                ]),
                duration: 0
              });
              this.cleanKey(key);
              function myStopFunction() {
                clearTimeout(this.timeBB);
              }
            } else {
              this.$notify.success({
                title: res.data.title,
                message: res.data.subTitle,
                duration: 3000
              });
              this.getKeyD(key);
            }
          } else {
            this.$message.warning(res.msg);
          }
        });
      }, 5000);
    },
    clickA(url) {
      if (url.indexOf("[") == -1) {
        console.log("没有地址");
      } else {
        url.replace();
        let aPos = url.indexOf("[");
        let bPos = url.indexOf("]");
        let r = url.substr(aPos + 1, bPos - aPos - 1);
        // window.location.href = r
        this.getData();
      }
    },
    cleanKey(key) {
      let data = {};
      data.taskKey = key;
      this.request("delByTaskKey", data, false).then(res => {
        if (res.code == 1) {
          console.log("oooo");
        }
      });
    },
    cancelimportConfirm() {
      this.importVisible = false;
      this.file = "";
      this.uploadList = [];
    },
    beforeRemove(file, fileList) {
      return this.$message.success(`成功移除文件`);
    }
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
