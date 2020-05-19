<template>
     <div>
          <header class="headerstyle" >
                <el-form :inline="true" :model="formData" class="demo-form-inline ">
                          <el-form-item label="账号："   size="small">
                            <!-- <el-input v-model="formSearch.staffCode" style="width:100px"></el-input> -->
                                <el-select v-model="formSearch.staffCode" placeholder="请选择" style="width:100px"      filterable>
                                    <el-option v-for="v in platformList" :key="v.id"  :label="v.code"  :value="v.code"></el-option>
                                 </el-select>
                              <!-- <el-select v-model="formSearch.staffCode" placeholder="请选择" style="width:100px" filterable>
                                  <el-option v-for="v in platformList" :key="v.code"  :label="v.code"  :value="v.code"></el-option>
                              </el-select> -->
                          </el-form-item>
                          <el-form-item label="用户名：" size="small">
                              <el-select v-model="formSearch.userName" placeholder="请选择" style="width:100px"         filterable>
                                <el-option v-for="v in staffList" :key="v.id"  :label="v.name"  :value="v.id"></el-option>
                              </el-select>
                          </el-form-item>
                           <el-form-item label="供应商：" size="small">
                              <el-select v-model="formSearch.departmentName" placeholder="请选择" style="width:100px"   filterable>
                                  <el-option v-for="v in supplyList" :key="v.id"  :label="v.name"  :value="v.id"></el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item label="岗位：" size="small">
                            <!-- <el-input v-model="formSearch.stationName" style="width:100px"></el-input> -->
                              <el-select v-model="formSearch.stationName" placeholder="请选择" style="width:100px"      filterable>
                                <el-option v-for="v in shopList"  :key="v.id"  :label="v.name"  :value="v.id"></el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item    size="small">
                              <el-button   size="small" type="primary" @click="onSearch">查询</el-button>
                          </el-form-item>
                           <el-form-item   size="small">
                              <el-button   size="small" type="default" @click="onReset">重置</el-button>
                          </el-form-item>
                           <el-form-item   size="small">
                              <el-button   size="small" type="primary" @click="onAdd">新增</el-button>
                          </el-form-item>
                          <el-form-item   size="small">
                              <el-button   size="small" type="primary" @click="onEdit">编辑</el-button>
                          </el-form-item>
                          <!-- <el-form-item   size="small">
                              <el-button   size="small" type="primary" @click="onResetPwd">重置密码</el-button>
                          </el-form-item> -->
                </el-form>
          </header>
          <section class="middle" :style="{minHeight:showBink?'740px':'530px'}">
          <el-pagination  style="margin-bottom:10px;text-align:right"  
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
               >
          </el-pagination>
           <el-table
                 ref="multipleTable"
                 :data="list"
                 style="width: 100%"
                 class="pointer"
                 border
                 tooltip-effect="dark"
                 max-height="650"
                 highlight-current-row
                 @cell-click="onClick"
                 @selection-change="handleSelectionChange"
                  >
                  <el-table-column
                type="selection"
                width="55">
            </el-table-column>
                <el-table-column
                   type="index"
                    width="55"
                    label="序号"
                    align="center"
                  >
                </el-table-column>
                <el-table-column
                  prop="supplierName"
                  label="所属供应商"
                  min-width="120"
                  align="center"
                  >
                  <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
                </el-table-column>
                <el-table-column
                  prop="userCode"
                  label="账号"
                  min-width="120"
                  align="center"
                  >
                  <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
                </el-table-column>
                <el-table-column
                  prop="supplierStaffName"
                  label="人员名称"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                 <el-table-column
                  prop="positionNameList"
                  label="岗位"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                 <el-table-column
                  prop="roleName"
                  label="角色名称"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="telephone"
                  label="手机号"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="email"
                  label="绑定邮箱"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="statusStr"
                  label="状态"
                  min-width="120"
                  align="center"
                  show-overflow-tooltip>
                </el-table-column>
         </el-table>
        </section>
        <Modal v-model="visible" @on-cancel="cancelvisible" :width="250" class-name="customize-modal-center" title="新密码">
                <div>{{this.Password}}</div>
                <div slot="footer">
                    <Button type="default" @click="cancelvisible">取消</Button>
                    <Button type="primary" @click="cancelvisible">确定</Button>
                </div>
            </Modal>
     </div>
</template>


<script>
   import {debounce} from 'mixins/debounce'
export default {
    mixins: [debounce],
    data() {
      return {
          formSearch:{},
          platformList:[],//工号
          companyList:[],//用户名
          brandList:[],//部门
          shopList:[],//岗位
          list:[],//列表数组
          total:0,
          pageSize:10,
          currentPage:1,
          rowId:null,
          Password:null,//密码
          visible:false,
          rowLenght:0,//选择几条数据
          rowObj:{},//选择的数据对象,
          supplyList:[],//供应商列表,
          staffList:[],//人员列表
      }
    },
    mounted(){
         this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
         this.getSaffList()
         this.getUserList()
         this.getCompanyName()
         this.getDepartmentList()
         this.getSupplyList();

    },
    methods: {
      handleSelectionChange(row){
        console.log(row)
        this.rowLenght = row.length
        this.rowObj = row[0]
        console.log(this.rowObj)
      },
      //用户名
      getSaffList(){
        this.request('basicsupplierstaff1_basic_supplie_staff_selector',{},false).then(res=>{
             if(res.code==1){
                   this.staffList=res.data 
             }
        })
      },
      //工号
      getUserList(){
        this.request('basicsupplieruser_basic_supplier_user_selector', {}, true).then(res => {
                if (res.code==1) {
                  this.platformList = res.data;
                  console.log(this.platformList,'09-0-0-0-0-0-0-0')
                  }
                })
      },
      //岗位
      getCompanyName(){
         let data = {}
        this.request('basicsupplierposition_basic_supplier_position_selector', data, true).then(res => {
          if (res.code==1) {
            this.shopList = res.data
            console.log(this.shopList,'////')
            // this.tableData = res.data.records;
            }
          })
      },
      onAdd(){
              this.$router.push({
                    name:'add_supply_user',
                })
      },
      //部门
      getDepartmentList(){
                 let data={}
                    this.request('masterData_department_selector', data, true).then((res) => {
                            if (res.code == 1) {
                                  this.brandList=res.data
                            }
                        }) 
        },
          handleSizeChange(pageSize) {
            console.log(pageSize)
                    this.pageSize = pageSize
                    this.getData()
          },
          handleCurrentChange(page) {
            console.log(page)
                    this.currentPage = page
                    this.getData()
          },
          onSearch(){
            this.currentPage = 1
                    this.getData()
                    
          },
          onReset(){
                    this.formSearch={}
                    // this.currentPage=1;
                    // this.getData()
          },
          getSupplyList(){
              let data={}
                  this.request('supplier_selector',data,false).then(res=>{
                          if(res.code==1){
                                 this.supplyList=res.data
                          }
                  })
          },
          getData(){
            let data = {}
                data.currentPage = this.currentPage
                data.pageSize = this.pageSize
                data.userCode           = this.formSearch.staffCode
                data.supplierStaffId    = this.formSearch.userName
                data.supplierId         = this.formSearch.departmentName
                data.supplierPositionId = this.formSearch.stationName
              this.request('basicsupplieruser_basic_supplier_user_pageQuery', data, true).then(res => { 
                if (res.code==1) {
                  this.total = res.data.count
                  this.list = res.data.records
                  // this.platformList = res.data;
                  }
                })
          },
          //单机选中 点重置密码
          onClick(row){
            this.rowId = row.id
            console.log(row,'-0-00-0-0-')
            
          },
          //重置密码
          // onResetPwd(){
          //   if(this.rowId == null){
          //     this.$message.warning('请先选中一条数据，再进行重置密码操作！')
          //   }else{
          //     let data = {}
          //   data.id = this.rowId
          //   this.request('user_resetPassword', data, true).then(res => { 
          //       if (res.code==1) {
          //         this.$message.warning(res.msg)
          //         this.visible = true
          //         this.Password = res.data
          //         }
          //     })
          //   }
          // },
          cancelvisible(){
            this.Password = null
            this.visible = false
          },
          // 进入编辑页
          onEdit(){
            console.log(this.rowLenght)
            if(this.rowLenght == 0){
            this.$message.error('请先选择修改的数据！')
          }else if(this.rowLenght > 1){
            this.$message.error('一次只能修改一条数据！')
          }else{
            console.log('uiytewert]iuo')
            this.$router.push({
                    name:'edit_supply_user',
                    query: { 
                        userCode:this.rowObj.userCode,
                        supplierStaffName:this.rowObj.supplierStaffName,
                        // departmentName:this.rowObj.departmentName,
                        // stationName:this.rowObj.stationName,
                        // phoneNo:this.rowObj.phoneNo,
                        // email:this.rowObj.email,
                        status:this.rowObj.status,
                        id:this.rowObj.id,
                        // roleIdList:this.rowObj.roleIds
                    }
                })
          }
          },
         
    }
  }
</script>
<style scoped="scoped" lang="less">
    .headerstyle,.main,.middle,.footer{
      width:99%;margin:0 auto;background:#fff;
      padding: 20px 20px 10px 20px;
      margin-bottom:10px;
    }
    .getmore{
          padding-top: 6px;
          width:100%;
          height:40px;
          line-height:40px;
          text-align: center;
          font-size:12px;
          cursor:pointer;
    }
    .pointer{
        cursor:pointer;
    }
    .pl20{
      padding-left: 20px
    }
     .el-table__row td{
    padding: 0;
}
  /* 用来设置当前页面element全局table 选中某行时的背景色*/
  .el-table__body tr.current-row>td{
    background-color: #f19944 !important;
    /* color: #f19944; */  /* 设置文字颜色，可以选择不设置 */
  }
  /* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #f19944;
    /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
  }

</style>