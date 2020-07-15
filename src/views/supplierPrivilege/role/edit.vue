<template>
    <div>
          <header class="headerstyle">
                                   <el-form :inline="true" :model="formSearch" class="demo-form-inline " :rules="rules">
                                            <el-form-item label="角色编码"   size="small">
                                                <el-input disabled="disabled" v-model="formSearch.code" placeholder="角色编码" style="width:130px"></el-input>
                                            </el-form-item>
                                            <el-form-item label="角色名称" size="small" prop="name">
                                                <el-input v-model="formSearch.name"  :disabled="formSearch.name=='admin'" placeholder="角色名称" style="width:100px"></el-input>
                                            </el-form-item>
                                            <el-form-item label="状态" size="small" prop="status">
                                                <el-select v-model="formSearch.status" :disabled="formSearch.name=='admin'" placeholder="请选择" style="width:100px"   filterable>
                                                    <el-option label="启用"  value="1"></el-option>
                                                    <el-option label="禁用"  value="0"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="备注" size="small">
                                                <el-input v-model="formSearch.remark"    :disabled="formSearch.name=='admin'" placeholder="备注" style="width:100px"></el-input>
                                            </el-form-item>
                                            <el-form-item   size="small">
                                                <el-button   size="small" type="primary" @click="confirmSave">保存</el-button>
                                            </el-form-item>
                                              <el-form-item   size="small">
                                                <el-button   size="small" type="primary" @click="directSave">返回上一页</el-button>
                                            </el-form-item>
                                    </el-form>
            </header>
     <div class="headerstyle" :style="{minHeight:showBink?'740px':'530px'}">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
              <el-tab-pane label="角色包含权限" name="first">
                       <section class="middle">
                               <tree-transfer  :title="title"  :button_text='["分配 ","撤销"]' :from_data='fromData' @addBtn='addsss' @removeBtn='remove' :to_data='toData' :defaultProps="{label:'label'}" :mode='mode' height='540px' placeholder="请输入权限名称" filter :defaultTransfer="true" :transferOpenNode="false">
                               </tree-transfer>
                       </section>
              </el-tab-pane>
              <el-tab-pane label="角色包含用户" name="second">
                  <header class="headerstyle">
                            <el-form :inline="true" :model="editFormLine" class="demo-form-inline ">
                                       <el-form-item label="工号"   size="small">
                                          <el-select v-model="editFormLine.code" placeholder="请选择" style="width:100px" filterable @change="watchName('1',editFormLine.code)">
                                              <el-option  v-for="v in userList"  v-if="v.code"  :key="v.id"  :label="v.code"  :value="v.code"></el-option>
                                          </el-select>
                                      </el-form-item>
                                      <el-form-item label="姓名" size="small">
                                          <el-select v-model="editFormLine.name" placeholder="请选择" style="width:100px" filterable @change="watchName('2',editFormLine.name)">
                                              <el-option v-for="v in userList" :key="v.id"  :label="v.name"  :value="v.name"></el-option>
                                          </el-select>
                                      </el-form-item>
                                      <el-form-item   size="small">
                                           <el-button   size="small" type="primary" @click="onSearch">查询</el-button>
                                      </el-form-item>
                                      <el-form-item   size="small">
                                           <el-button   size="small" type="default" @click="onReset">重置</el-button>
                                      </el-form-item>
                                       <el-form-item   size="small">
                                          <el-button   size="small" type="primary" @click="onAdd">新增</el-button>
                                      </el-form-item>
                                      <el-form-item   size="small" v-if="list.length>0">
                                                <el-button   size="small" type="primary" @click="newAddSave">保存</el-button>
                                      </el-form-item>
                            </el-form>
                       </header>
                       <section class="middle">
                                <el-table
                                    ref="multipleTabless"
                                    :data="list"
                                    style="width: 100%"
                                    class="pointer"
                                    border
                                    tooltip-effect="dark"
                                    max-height="250"
                                    highlight-current-row 
                                      >
                                    <el-table-column
                                      type="index"
                                        width="55"
                                        label="序号"
                                        align="center"
                                      >
                                    </el-table-column>
                                    <el-table-column
                                      prop="userCode"
                                      label="工号"
                                      min-width="120"
                                      align="center"
                                      >
                                      <template slot-scope="scope">
                                                <!-- <el-select v-if="!scope.row.id"  v-model="scope.row.staffCode" placeholder="请选择" style="width:100px" @change="getRowDta(scope.$index,scope.row.staffCode)" filterable>
                                                    <!-- <el-option v-for="v in userList" :key="v.id"  :label="v.code"  :value="v.id"></el-option> -->
                                                <!-- </el-select> --> 
                                                <!-- <el-input    v-model="" placeholder="请输入工号" readonly="readonly" @focus="editCode(scope.$index)"></el-input> -->
                                                <div   v-if="!scope.row.id"  style="width:100px;height:30px;border:1px solid #ccc" @click="editCode(scope.$index)">{{scope.row.userCode}}</div>
                                                <span  v-if="scope.row.id">{{scope.row.userCode}}</span>
                                      </template>
                                    </el-table-column>
                                    <el-table-column
                                      prop="supplierStaffName"
                                      label="姓名"
                                      min-width="120"
                                      align="center"
                                      show-overflow-tooltip>
                                              <template slot-scope="scope">
                                                <!-- <el-select v-if="!scope.row.id" v-model="scope.row.userName" placeholder="请选择" style="width:100px"  @change="getRowDta2(scope.$index,scope.row.userName)" filterable>
                                                    <el-option v-for="v in userList" :key="v.id"  :label="v.name"  :value="v.id"></el-option>
                                               </el-select> -->
                                                <!-- <el-input   v-if="!scope.row.id"  v-model="scope.row.userName" placeholder="请输入姓名" style="width:100px" readonly="readonly"@focus="editName(scope.$index)"></el-input> -->
                                                 <div   v-if="!scope.row.id"  style="width:100px;height:30px;border:1px solid #ccc" @click="editCode(scope.$index)">{{scope.row.supplierStaffName}}</div>
                                                <span  v-if="scope.row.id">{{scope.row.supplierStaffName}}</span>
                                      </template>
                                    </el-table-column>
                                    <el-table-column
                                      prop="stationName"
                                      label="岗位"
                                      min-width="120"
                                      align="center"
                                      show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                      prop="omsShopCode"
                                      label="操作"
                                      min-width="120"
                                      align="center"
                                      show-overflow-tooltip>
                                           <template slot-scope="scope">
                                            <el-button
                                              size="mini"
                                              type="primary"
                                              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                          </template>
                                    </el-table-column>
                            </el-table>
                       </section>
              </el-tab-pane>
        </el-tabs>
     </div>
           <!--编辑弹框-->
          <Modal v-model="editVisible"    title="请选择工号姓名"  @on-cancel='selectCancel' :width="510"
            class-name="customize-modal-center"> 
            <Row class="margin-bottom-10 background-color-white exhibition">
             <el-form :inline="true" :model="addFormLine" class="demo-form-inline ">
                                       <el-form-item label="工号"   size="small">
                                          <el-select v-model="addFormLine.code" placeholder="请选择" style="width:100px" filterable @change="watchNames('1',addFormLine.code)">
                                              <el-option v-for="v in userList" v-if="v.code" :key="v.id"  :label="v.code"  :value="v.code"></el-option>
                                          </el-select>
                                      </el-form-item>
                                      <el-form-item label="姓名" size="small">
                                          <el-select v-model="addFormLine.name" placeholder="请选择" style="width:100px" filterable @change="watchNames('2',addFormLine.name)">
                                              <el-option v-for="v in userList" :key="v.id"  :label="v.name"  :value="v.name"></el-option>
                                          </el-select>
                                      </el-form-item>
                                      <el-form-item   size="small">
                                           <el-button   size="small" type="primary" @click="selectConfirm">确定</el-button>
                                      </el-form-item>
                                      <el-form-item   size="small">
                                           <el-button   size="small" type="default" @click="selectCancel">取消</el-button>
                                      </el-form-item>
                            </el-form>
              </Row>
            <div slot="footer"></div>
          </Modal>
    </div>
      
</template>

<script>
  import filters from '../../../filter/'
  import treeTransfer from 'el-tree-transfer' // 引入
import {debounce} from 'mixins/debounce'
import {burypoint} from 'mixins/burypoint'
export default {
    mixins: [debounce,burypoint],
    data() {
      return {
        activeName2  :'first',
        title        : ['全选--权限列表','全选--开放权限'],
        userInfo     : {},             //用户信息
        mode         : "transfer", // transfer addressList
        toData       : [],
        formSearch   :{
                      code:'',
                      name:'',
                      status:'',
                      remark:''      
        },
        addFormLine:{
                 code:'',
                 name:''
        },
        add:false,
        fromData: [],
        dialogVisible:false,
        editVisible  :false,
        detailData:'',
        editformdata : {},
        userList:[],
        editFormLine : {
                       code:'',
                       name:''
        },           //编辑信息
        storeFormData: [],//存储的数据
        dialogtitle  : '新增',
        storeData    :  [],
        page         :  1,
        index        :  '',
        pageSize     :  10,
        h            :  0,
        chaXun       :  0,//查询
        mystyle:{
                 top : '150px',
                },
        // 日志相关
        dataFlag:true,
        logList:[], //日志列表
        billNo:'',
        currentPage:1,
        // 日志相关
        list   :[],
        rules: {
                name: [
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                status: [
                    { required: true, message: '请选择', trigger: 'change'}
                ],
         },
      }
    },
    mounted(){
       let obj=this.$route.query.obj
       this.formSearch.code=obj.roleCode
       this.formSearch.name=obj.roleName
      //  if(this.formSearch.name=='admin'){
      //    $('.transfer-center').addClass('none')
      //  }else{
      //    $('.transfer-center').removeClass('none')  
      //  }
       this.formSearch.status=String(obj.enable)
       this.formSearch.remark=obj.remark
       this.getRightTree()
       this.getEditRole()
       this.getUser()
       this.getSelectuser()
    },
    components:{ treeTransfer }, // 注册
    methods: {
              selectCancel(){
                   this.editVisible=false;
                   this.addFormLine.code=''
                   this.addFormLine.name=''
              },
              selectConfirm(){
                  for(let i=0,len=this.list.length;i<len;i++){
                      if(this.list[i].userCode==this.addFormLine.code) return this.$message.error('人员重复!')
                   }
                   this.$set(this.list,this.index,this.detailData) 
                   this.selectCancel()
              },
              editCode(index){
                  this.index=index
                  this.editVisible=true
                  console.log(index)
              },
              handleDelete(index){
                this.list.splice(index,1)
              },
             getRowDta($index,code){
                    this.list[$index].staffCode=code
                    this.list[$index].userName=''
             },
             getRowDta2($index,code){
                    this.list[$index].staffCode=code
                    this.list[$index].departmentName=''
             },
             confirmSave(){
               this.setBuryPoint('保存')
                    let arr=[]
                    let userIds=[]
                    if(!this.formSearch.code)return this.$message.error('角色编码不能为空')
                    if(!this.formSearch.name)return this.$message.error('角色名称不能为空')
                    if(this.toData.length>0){
                        for(let i=0;i<this.toData.length;i++){
                            arr.push(Number(this.toData[i].dataId))
                            for(let j=0;j<this.toData[i].children.length;j++){
                              arr.push(this.toData[i].children[j].dataId)
                               for(let h=0;h<this.toData[i].children[j].children.length;h++){
                                   arr.push(this.toData[i].children[j].children[h].dataId)
                                    for(let k=0;k<this.toData[i].children[j].children[h].children.length;k++){
                                     arr.push(this.toData[i].children[j].children[h].children[k].dataId)  
                                   }
                               }
                            }
                        }
                    }
                    
                    if(this.list){
                       if(this.chaXun>0){
                            this.list=[...this.list,...this.storeData];
                       } 
                        for(let i=0;i<this.list.length;i++){
                           userIds.push(this.list[i].id)
                        }
                    }
                     let data={}
                         data.id      = this.$route.query.obj.id
                         data.roleName    = this.formSearch.name
                         data.enable      = Number(this.formSearch.status)
                         data.remark      = this.formSearch.remark
                         data.resourceIds = arr
                         data.userIds     = userIds
                         data.modifyType  = 0
                         data.roleCode    = this.formSearch.code
                     this.request('basicsupplierrole_basic_supplier_role_update', data, true).then((res) => {
                              if (res.code == 1) {
                                        this.$message.success('保存成功')
                                        this.getUser()
                                       
                              }else{
                                        this.$message.error(res.msg)
                                        this.list=this.storeData
                              }
                          })
          },
          tranferSave(){
                    let arr=[]
                    let userIds=[]
                    if(!this.formSearch.code)return this.$message.error('角色编码不能为空')
                    if(!this.formSearch.name)return this.$message.error('角色名称不能为空')
                    if(this.toData.length>0){
                        for(let i=0;i<this.toData.length;i++){
                            arr.push(Number(this.toData[i].dataId))
                            for(let j=0;j<this.toData[i].children.length;j++){
                              arr.push(this.toData[i].children[j].dataId)
                               for(let h=0;h<this.toData[i].children[j].children.length;h++){
                                   arr.push(this.toData[i].children[j].children[h].dataId)
                                   for(let k=0;k<this.toData[i].children[j].children[h].children.length;k++){
                                     arr.push(this.toData[i].children[j].children[h].children[k].dataId)  
                                   }
                               }
                            }
                        }
                    }
                    
                    if(this.list){
                       if(this.chaXun>0){
                            this.list=[...this.list,...this.storeData];
                       } 
                        for(let i=0;i<this.list.length;i++){
                           userIds.push(this.list[i].id)
                        }
                    }
                     let data={}
                         data.id          = this.$route.query.obj.id
                         data.roleName    = this.formSearch.name
                         data.enable      = Number(this.formSearch.status)
                         data.remark      = this.formSearch.remark
                         data.permissionIds=arr
                         data.userIds     =userIds
                         data.modifyType  =1
                         data.roleCode    = this.formSearch.code
                     this.request('basicsupplierrole_basic_supplier_role_update', data, true).then((res) => {
                              if (res.code == 1) {
                                        this.$message.success('操作权限列表成功')
                                        this.getUser()
                                       
                              }else{
                                        this.$message.error(res.msg)
                                        this.list=this.storeData
                              }
                          })
          },
           newAddSave(){
                    let arr=[]
                    let userIds=[]
                    if(!this.formSearch.code)return this.$message.error('角色编码不能为空')
                    if(!this.formSearch.name)return this.$message.error('角色名称不能为空')
                    if(this.toData.length>0){
                        for(let i=0;i<this.toData.length;i++){
                            arr.push(Number(this.toData[i].dataId))
                            for(let j=0;j<this.toData[i].children.length;j++){
                              arr.push(this.toData[i].children[j].dataId)
                               for(let h=0;h<this.toData[i].children[j].children.length;h++){
                                   arr.push(this.toData[i].children[j].children[h].dataId)
                               }
                            }
                        }
                    }
                    
                    if(this.list){
                       if(this.chaXun>0){
                            this.list=[...this.list,...this.storeData];
                       } 
                        for(let i=0;i<this.list.length;i++){
                           userIds.push(this.list[i].id)
                        }
                    }
                     let data={}
                         data.id     = this.$route.query.obj.id
                         data.roleName    = this.formSearch.name
                         data.enable      = Number(this.formSearch.status)
                         data.remark      = this.formSearch.remark
                         data.permissionIds =  arr
                         data.userIds     = userIds
                         data.modifyType  =2
                         data.roleCode    = this.formSearch.code
                        this.request('basicsupplierrole_basic_supplier_role_update', data, true).then((res) => {
                              if (res.code == 1) {
                                        this.$message.success('保存角色用户成功')
                                        this.getUser()
                                       
                              }else{
                                        this.$message.error(res.msg)
                                        this.list=this.storeData
                              }
                          })
          },
          directSave(){
            this.setBuryPoint('返回上一页')
                    this.$router.push({
                                             name:'supply_role_list',
                                        })  
          },
          watchName(type,v){
             if(type==1){
                   for(let i=0;i<this.userList.length;i++){
                      console.log(v)
                     if(this.userList[i].code==v){
                       return this.editFormLine.name=this.userList[i].name
                     }
                   }
             }else{
                   for(let i=0;i<this.userList.length;i++){
                     if(this.userList[i].name==v){
                       return this.editFormLine.code=this.userList[i].code
                     }
                   }
             }
          },
          // getDetail(){
          //        let data={}
          //            data.userName=this.addFormLine.name
          //            this.request('user_page', data, false).then((res) => {
          //                     if (res.code == 1) {  
          //                         this.detailData=res.data.records[0]
          //                     }else{
          //                         this.$message.error(res.msg)
          //                     }
          //                 })

          // },
            getDetail(){
                 let data={}
                     data.userCode=this.addFormLine.code
                     this.request('basicsupplieruser_basic_supplier_user_pageQuery', data, false).then((res) => {
                              if (res.code == 1) {  
                                  this.detailData=res.data.records[0]
                              }else{
                                  this.$message.error(res.msg)
                              }
                          })

           },
           watchNames(type,v){
             if(type==1){
                   for(let i=0;i<this.userList.length;i++){
                      console.log(v)
                     if(this.userList[i].code==v){
                        this.addFormLine.name=this.userList[i].name
                         return  this.getDetail()
                       
                     }
                   }
                 
             }else{
                    this.getDetail()
                   for(let i=0;i<this.userList.length;i++){
                     if(this.userList[i].name==v){
                          this.addFormLine.code=this.userList[i].code
                          return this.getDetail()
                         
                     }
                   }
                   
             }
             console.log('9999')
             
          },
        //用户下拉接口
          // getSelectuser(){
          //       let data={}
          //             this.request('user_selector', data, true).then((res) => {
          //                     if (res.code == 1) {
          //                           this.userList=res.data
          //                     }
          //                 })       
          // },
             //用户下拉接口
          getSelectuser(){
                let data={}
                      this.request('basicsupplieruser_basi_supplier_user_selector', data, true).then((res) => {
                              if (res.code == 1) {
                                         this.userList=res.data
                              }
                          })       
          },
          onSearch(){
                    this.chaXun++;
                    this.getData()
          },
          onReset(){
                    this.chaXun=0;
                    this.editFormLine={}
                    // this.list=[]
                    this.add=false
                    this.getUser()
          },
          onAdd(){
                   this.add=true
                   setTimeout(()=>{
                           this.list.unshift({ active:'',departmentName:'',id:'',phoneNo:'',registerSource:'',roleIds:'',
                           roleNames:'',staffCode:'',stationName:'',status:'',userName:''
                      })
                   },1000)
                   
          },
          getIds(code){
               for(let i=0;i<this.userList.length;i++){
                 if(this.userList[i].code==code){
                   return this.userList[i].id
                 }
               }
          },
          getData(){
                  if(!this.editFormLine.code&&!this.editFormLine.name) return this.$message.error('工号或姓名不能为空')
                  let data={}
                      data.userId=this.getIds(this.editFormLine.code)
                      data.roleId=this.$route.query.obj.id
                      this.request('masterData_basicRole_checkUserInThisRole', data, true).then((res) => {
                              if (res.code == 1) {
                                 if(res.data){
                                      this.list=[]
                                      this.list.push(res.data)
                                 }else{
                                      this.list=[]
                                 }
                                 
                              }
                          })
          },
          getUser(){
                  let vars={}
                      vars.id=this.$route.query.obj.id
               this.requestWithUriVars('basicsupplierrole_basic_supplier_role_getUserOfCurrentRole', vars,null, false).then((res) => {
                              if (res.code == 1) {
                                   this.list=[]
                                   this.list=res.data
                                   this.storeData=res.data;
                              }
                          })     
          },
          getRightTree(){
                  // let data={}
                  //     this.request('masterData_basicRole_getResourcePermissionTree', data, true).then((res) => {
                                   let vars={}
                                       vars.isContainBtn=1
                                      // this.request('masterData_basicRole_getResourcePermissionTree', data, true).then((res) => {
                                       this.requestWithUriVars('basicsuppliermenupermission_basic_supplier_menu_permission_getWholeResourceTree', vars, null, true).then((res) => {
                              if (res.code == 1){
                                    for(let i=0;i<res.data.children.length;i++){
                                        res.data.children[i].dataId=res.data.children[i].id
                                        if(res.data.children[i].usedPlatform){
                                            res.data.children[i].label=res.data.children[i].text+'(微信)'
                                        }else{
                                            res.data.children[i].label=res.data.children[i].text+'(PC)'
                                        }
                                        res.data.children[i].id=res.data.children[i].code
                                        res.data.children[i].pid=0
                                        for(let j=0;j<res.data.children[i].children.length;j++){
                                            res.data.children[i].children[j].dataId=res.data.children[i].children[j].id
                                            res.data.children[i].children[j].label=res.data.children[i].children[j].text
                                            res.data.children[i].children[j].id=res.data.children[i].children[j].code
                                            res.data.children[i].children[j].pid=res.data.children[i].children[j].parentCode
                                            for(let h=0;h<res.data.children[i].children[j].children.length;h++){
                                                res.data.children[i].children[j].children[h].dataId=res.data.children[i].children[j].children[h].id
                                                res.data.children[i].children[j].children[h].label=res.data.children[i].children[j].children[h].text
                                                res.data.children[i].children[j].children[h].id=res.data.children[i].children[j].children[h].code
                                                res.data.children[i].children[j].children[h].pid=res.data.children[i].children[j].children[h].parentCode
                                                for(let k=0;k<res.data.children[i].children[j].children[h].children.length;k++){
                                                    res.data.children[i].children[j].children[h].children[k].dataId=res.data.children[i].children[j].children[h].children[k].id
                                                    res.data.children[i].children[j].children[h].children[k].label=res.data.children[i].children[j].children[h].children[k].text
                                                    res.data.children[i].children[j].children[h].children[k].id=res.data.children[i].children[j].children[h].children[k].code
                                                    res.data.children[i].children[j].children[h].children[k].pid=res.data.children[i].children[j].children[h].children[k].parentCode
                                                }
                                            }
                                        }
                                    }
                                    this.fromData=res.data.children
                                    this.storeFormData=res.data.children;
                              }
                          }) 
        },
        //
        getEditRole(){        
                      let vars={}
                          vars.id=this.$route.query.obj.id
                      this.requestWithUriVars('basicsupplierrole_basic_supplier_role_getPermissionOfCurrentRole',vars,null, false).then((res) => {
                              if (res.code == 1) {
                                  if(res.data){
                                        for(let i=0;i<res.data.children.length;i++){
                                        res.data.children[i].dataId=res.data.children[i].id
                                        res.data.children[i].label=res.data.children[i].text
                                        res.data.children[i].id=res.data.children[i].code
                                        res.data.children[i].pid=0
                                        for(let j=0;j<res.data.children[i].children.length;j++){
                                            res.data.children[i].children[j].dataId=res.data.children[i].children[j].id
                                            res.data.children[i].children[j].label=res.data.children[i].children[j].text
                                            res.data.children[i].children[j].id=res.data.children[i].children[j].code
                                            res.data.children[i].children[j].pid=res.data.children[i].children[j].parentCode
                                            for(let h=0;h<res.data.children[i].children[j].children.length;h++){
                                                res.data.children[i].children[j].children[h].dataId=res.data.children[i].children[j].children[h].id
                                                res.data.children[i].children[j].children[h].label=res.data.children[i].children[j].children[h].text
                                                res.data.children[i].children[j].children[h].id=res.data.children[i].children[j].children[h].code
                                                res.data.children[i].children[j].children[h].pid=res.data.children[i].children[j].children[h].parentCode
                                                 for(let k=0;k<res.data.children[i].children[j].children[h].children.length;k++){
                                                    res.data.children[i].children[j].children[h].children[k].dataId=res.data.children[i].children[j].children[h].children[k].id
                                                    res.data.children[i].children[j].children[h].children[k].label=res.data.children[i].children[j].children[h].children[k].text
                                                    res.data.children[i].children[j].children[h].children[k].id=res.data.children[i].children[j].children[h].children[k].code
                                                    res.data.children[i].children[j].children[h].children[k].pid=res.data.children[i].children[j].children[h].children[k].parentCode
                                                }
                                            }
                                        }
                                    }
                                      this.toData=res.data.children
                                  }else{
                                       this.toData=[]
                                  }
                                   
                                  
                              }
                          })   
        },
        cancel(){
                  this.resetForm('ruleForm')
                  this.dialogVisible=false;
                  this.editVisible=false;
        },
              // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
        changeMode() {
            if (this.mode == "transfer") {
                  this.mode = "addressList";
            } else {
                  this.mode = "transfer";
            }
        },
      // 监听穿梭框组件添加
        addsss(fromData,toData,obj){
            this.h++;
            this.toData=toData;
            this.fromData=this.storeFormData
            if(this.h>1){
                this.tranferSave()
            }
           
        },
      // 监听穿梭框组件移除
        remove(fromData,toData,obj){
             this.toData  =toData;
             this.fromData=this.storeFormData
              this.tranferSave()
        }
    // },
    // },

    }
  }
</script>
<style scoped="scoped" lang="less">
    .headerstyle,.main,.middle,.footer{
      width:99%;margin:0 auto;background:#fff;
      padding: 20px 20px 10px 20px;
      margin-bottom:10px;
    }
    .none{
      display:none!important
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