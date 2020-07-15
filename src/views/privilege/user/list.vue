<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formData" class="demo-form-inline ">
            <el-form-item label="工号：" size="small">
                <el-input v-model="formSearch.staffCode" style="width:100px"></el-input>
                <!-- <el-select v-model="formSearch.staffCode" placeholder="请选择" style="width:100px" filterable>
                                  <el-option v-for="v in platformList" :key="v.code"  :label="v.code"  :value="v.code"></el-option>
                              </el-select> -->
            </el-form-item>
            <el-form-item label="用户名：" size="small">
                <el-select v-model="formSearch.userName" placeholder="请选择" style="width:100px" filterable>
                    <el-option v-for="v in platformList" :key="v.id" :label="v.name" :value="v.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="部门：" size="small">
                <el-select v-model="formSearch.departmentName" placeholder="请选择" style="width:100px" filterable>
                    <el-option v-for="v in brandList" :key="v.id" :label="v.name" :value="v.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="岗位：" size="small">
                <!-- <el-input v-model="formSearch.stationName" style="width:100px"></el-input> -->
                <el-select v-model="formSearch.stationName" placeholder="请选择" style="width:100px" filterable>
                    <el-option v-for="v in shopList" :key="v.basicStationName" :label="v.basicStationName" :value="v.basicStationName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="small">
                <el-button size="small" v-if="judgeMenu.indexOf('查询') !== -1" type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button size="small" type="default" @click="onReset">重置</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button size="small" v-if="judgeMenu.indexOf('编辑') !== -1" type="primary" @click="onEdit">编辑</el-button>
            </el-form-item>
            <el-form-item size="small">
                <el-button size="small"  v-if="judgeMenu.indexOf('权限复制') !== -1"  type="primary" @click="onCopy">权限复制</el-button>
            </el-form-item>
            <!-- <el-form-item   size="small">
                              <el-button   size="small" type="primary" @click="onResetPwd">重置密码</el-button>
                          </el-form-item> -->
        </el-form>
    </header>
    <section class="middle" :style="{minHeight:showBink?'740px':'520px'}">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <el-table ref="multipleTable" :data="list" style="width: 100%" class="pointer" border tooltip-effect="dark" max-height="650" highlight-current-row @cell-click="onClick" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="55" label="序号" align="center">
            </el-table-column>
            <el-table-column prop="staffCode" label="账号" min-width="120" align="center">
                <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column prop="userName" label="用户名" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="departmentName" label="部门" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="stationName" label="岗位" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="roleNames" label="角色名称" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="phoneNo" label="手机号" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="email" label="绑定邮箱" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="status" label="状态" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.status==0 ? '禁用' :(scope.row.status==1 ? '启用' : '锁定') }}</template>
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

    <Modal v-model="copyVisible" @on-cancel="cancelCopy" :width="850" class-name="customize-modal-center" title="权限复制">
        <div>
            <el-form :inline="true" :model="formCopy" label-width="120px" class="demo-form-inline ">
                <h3>参照用户</h3>
                <el-form-item label="用户名：" size="small">
                    <el-select v-model="formCopy.userName" placeholder="请选择" @change="changeUserName(formCopy.userName)" style="width:250px" filterable>
                        <el-option v-for="v in userNameList" :key="v.id" :label="v.userName" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="工号：" size="small">
                    <el-select v-model="formCopy.userNo" placeholder="请选择" @change="changeStaffCode(formCopy.userNo)" style="width:250px" filterable>
                        <el-option v-for="v in userNameList" :key="v.id" :label="v.staffCode" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门：" size="small">
                    <el-input v-model="formCopy.department" disabled style="width:250px"></el-input>
                </el-form-item>
                <el-form-item label="岗位：" size="small">
                    <el-input v-model="formCopy.post" disabled style="width:250px"></el-input>
                </el-form-item>
                
                <div style="dispaly:inline-flex">
                  <span style="font-size: 1.17em;font-weight: bold;">所需权限</span> <el-checkbox style="margin-left:80px" @change="changeAllType(formCopy.alltype)" v-model="formCopy.alltype">全选</el-checkbox>
                </div>
                
                <el-form-item label="" >
                    <el-checkbox-group style="margin-left:50px" @change="changeCopyType(formCopy.type)" v-model="formCopy.type">
                        <el-checkbox label="角色权限" name="type"></el-checkbox>
                        <el-checkbox label="公司权限" name="type"></el-checkbox>
                        <el-checkbox label="品牌权限" name="type"></el-checkbox>
                        <el-checkbox label="店铺权限" name="type"></el-checkbox>
                        <el-checkbox label="供应商权限" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer">
            <Button type="default" @click="cancelCopy">取消</Button>
            <Button type="primary" @click="saveCopy">确定</Button>
        </div>
    </Modal>
</div>
</template>

<script>
import filters from '../../../filter/'
import {
    debounce
} from 'mixins/debounce'
import {burypoint} from 'mixins/burypoint'
export default {
    mixins: [debounce,burypoint],
    data() {
        return {
          rowIds:[],
            copyVisible: false,
            formCopy: {
              type:[],
              alltype:false,
              department:'',
              post:'',
            },
            userNameList:[],
            formSearch: {},
            platformList: [], //工号
            companyList: [], //用户名
            brandList: [], //部门
            shopList: [], //岗位
            list: [], //列表数组
            total: 0,
            pageSize: 10,
            currentPage: 1,
            rowId: null,
            Password: null, //密码
            visible: false,
            rowLenght: 0, //选择几条数据
            rowObj: {}, //选择的数据对象
            judgeMenu: [],
            buttonList: [], //按钮权限
        }
    },
    mounted() {
        this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
        this.getUserList()
        this.getUserName()
        this.getCompanyName()
        this.getDepartmentList()
        this.getButtonJurisdiction()
    },
    methods: {
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
      getUserName(){
        let data = {}
        data.pageSize = 10000
        data.currentPage = 1
        this.request('user_page', data, true).then(res => {
                if (res.code == 1) {
                    this.userNameList = res.data.records
                }
            })
      },
      changeUserName(name){
        console.log(name,'0000000000')
        let obj = {}
        this.userNameList.map((item)=>{
          if(name == item.id){
            obj = item
          }
        })
        this.formCopy.userNo = obj.id
        this.formCopy.department = obj.departmentName
        this.formCopy.post = obj.stationName
      },
      changeStaffCode(code){
        let obj = {}
        this.userNameList.map((item)=>{
          if(code == item.id){
            obj = item
          }
        })
        this.formCopy.userName = obj.id
        this.formCopy.department = obj.departmentName
        this.formCopy.post = obj.stationName
      },
      changeCopyType(type){
            if(type.length == 5){
                this.formCopy.alltype = true
            }else{
                this.formCopy.alltype = false
            }
        },
      changeAllType(type){
        if(type){
          this.formCopy.type = ["角色权限", "公司权限", "品牌权限", "店铺权限", "供应商权限"]
        }else{
          this.formCopy.type = []
        }
        console.log(type,'-------------------',this.formCopy.type)
      },
      saveCopy(){
        this.setBuryPoint('权限复制确定')
        if(!this.formCopy.userName){
          this.$message.warning('请先选择参照用户的用户名或工号')
        }else{
            console.log(this.rowIds)
          let data = {}
          data.fromUserId = this.formCopy.userName
          data.toUserIds = this.rowIds
          this.formCopy.type.indexOf('角色权限') !== -1 ? data.includeRole = true : data.includeRole = false
          this.formCopy.type.indexOf('公司权限') !== -1 ? data.includeCompany = true : data.includeCompany = false
          this.formCopy.type.indexOf('品牌权限') !== -1 ? data.includeBrand = true : data.includeBrand = false
          this.formCopy.type.indexOf('店铺权限') !== -1 ? data.includeStore = true : data.includeStore = false
          this.formCopy.type.indexOf('供应商权限') !== -1 ? data.includeSupplier = true : data.includeSupplier = false
          this.request('masterData_copyPermission', data, true).then(res => {
                if (res.code == 1) {
                  this.rowIds = []
                  this.$message.success('权限复制成功')
                  this.getData()
                  this.cancelCopy()
                }else{
                  this.$message.error(res.msg)
                }
            })
        }
      },
      cancelCopy(){
        this.formCopy = {
          type:[],
          alltype:false,
          department:'',
          post:'',
        }
        this.copyVisible = false
      },
      onCopy() {
          this.setBuryPoint('权限复制')
        if(this.rowIds.length == 0){
          this.$message.warning('请先选择数据')
        }else{
          this.copyVisible = true
        } 
        },
        handleSelectionChange(row) {
          let list = []
          row.map((item)=>{
            list.push(item.id)
          })
          this.rowIds = list
            console.log(row)
            this.rowLenght = row.length
            this.rowObj = row[0]
            console.log(this.rowObj)
        },
        getUserList() {
            this.request('user_selector', {}, true).then(res => {
                if (res.code == 1) {
                    this.platformList = res.data;
                    console.log(this.platformList, '09-0-0-0-0-0-0-0')
                }
            })
        },
        //岗位
        getCompanyName() {
            let data = {}
            this.request('basic_station_commonQuery', data, true).then(res => {
                if (res.code == 1) {
                    this.shopList = res.data
                    console.log(this.shopList, '////')
                    // this.tableData = res.data.records;
                }
            })
        },
        //部门
        getDepartmentList() {
            let data = {}
            this.request('masterData_department_selector', data, true).then((res) => {
                if (res.code == 1) {
                    this.brandList = res.data
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
        onSearch() {
            this.setBuryPoint('查询')
            this.currentPage = 1
            this.getData()

        },
        onReset() {
            this.formSearch = {}
            // this.currentPage=1;
            // this.getData()
        },
        getData() {
            let data = {}
            data.currentPage = this.currentPage
            data.pageSize = this.pageSize
            data.staffCode = this.formSearch.staffCode
            data.userName = this.formSearch.userName
            data.departmentName = this.formSearch.departmentName
            data.stationName = this.formSearch.stationName
            this.request('user_page', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count
                    this.list = res.data.records
                    // this.platformList = res.data;
                }
            })
        },
        //单机选中 点重置密码
        onClick(row) {
            this.rowId = row.id
            console.log(row, '-0-00-0-0-')

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
        cancelvisible() {
            this.Password = null
            this.visible = false
        },
        // 进入编辑页
        onEdit() {
            console.log(this.rowLenght)
            if (this.rowLenght == 0) {
                this.$message.error('请先选择修改的数据！')
            } else if (this.rowLenght > 1) {
                this.$message.error('一次只能修改一条数据！')
            } else {
                console.log('uiytewert]iuo')
                this.$router.push({
                    name: 'new_user_edit',
                    query: {
                        userAcount: this.rowObj.staffCode,
                        userName: this.rowObj.userName,
                        departmentName: this.rowObj.departmentName,
                        stationName: this.rowObj.stationName,
                        phoneNo: this.rowObj.phoneNo,
                        email: this.rowObj.email,
                        status: this.rowObj.status,
                        id: this.rowObj.id,
                        roleIdList: this.rowObj.roleIds
                    }
                })
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

.el-table__row td {
    padding: 0;
}

/* 用来设置当前页面element全局table 选中某行时的背景色*/
.el-table__body tr.current-row>td {
    background-color: #f19944 !important;
    /* color: #f19944; */
    /* 设置文字颜色，可以选择不设置 */
}

/* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
.el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #f19944;
    /* color: #f19944; */
    /* 设置文字颜色，可以选择不设置 */
}
</style>
