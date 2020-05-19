<template>
     <div>
          <header class="headerstyle">
                <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline ">
                         <div>
                             <el-form-item   size="small">
                              <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
                          </el-form-item>
                          <el-form-item   size="small">
                              <el-button  size="small" type="default" @click="onReset">重置</el-button>
                          </el-form-item>
                         </div>
                          <el-form-item label="品牌" size="small">
                              <el-select v-model="formData.brandId" placeholder="请选择" style="width:160px" filterable multiple>
                                 <el-option v-for="v in brandList" :key="v.id"  :label="v.name"  :value="v.id"></el-option>
                              </el-select>
                          </el-form-item>
                           <el-form-item label="货品编码"   size="small">
                                   <el-input v-model="formData.goodsNo" style="width:100px" placeholder="请输入"></el-input>
                          </el-form-item>
                           <el-form-item label="商家编码" size="small">
                                   <el-input v-model="formData.merchantCode" style="width:100px" placeholder="请输入"></el-input>
                          </el-form-item>
                           <el-form-item label="年份" size="small" >
                                          <el-date-picker   style="width:120px"
                                                v-model="formData.year"
                                                align="right"
                                                type="year"
                                                placeholder="选择年">
                                           </el-date-picker>
                                      </el-form-item>
                           <el-form-item label="季节" size="small">
                              <el-select v-model="formData.seasons" placeholder="请选择" style="width:100px" filterable	 multiple>
                                   <el-option label="春季"  value="春季"></el-option>
                                   <el-option label="夏季"  value="夏季"></el-option>
                                   <el-option label="秋季"  value="秋季"></el-option>
                                   <el-option label="冬季"  value="冬季"></el-option>
                              </el-select>
                          </el-form-item>
                          
                           <!-- <el-form-item   size="small">
                              <el-button v-if="judgeMenu.indexOf('新增') !== -1" size="small" type="primary" @click="onAdd">新增</el-button>
                          </el-form-item>
                           <el-form-item    size="small">
                              <el-button  v-if="judgeMenu.indexOf('修改') !== -1"  size="small" type="primary" @click="onEdit">编辑</el-button>
                           </el-form-item> -->
                </el-form>
          </header>
           <section class="middle" :style="{minHeight:showBink?'680px':'480px'}">
                <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[1000, 5000, 10000, 20000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
                <div id="goodsDetail" style="width: 100%; height: 400px;"></div>
         </section>
     </div>
</template>
<script>
  import filters from '../../../filter/'
  import {debounce} from 'mixins/debounce'
  export default {
    mixins:[debounce],
    data() {
      return {
        page              :1,
        pageSize          :1000,
        currentPage       :1,
        formData: {
                  goodsNo     : '',
                  brandId     : '',
                  merchantCode: '',
                  year        : '',
                  seasons     : ''
        },
        total:'',
        brandList:[],   //品牌列表
        buttonList:[],//按钮权限
        judgeMenu:[]
      }
    },
    mounted(){
        //  this.getData()
         this.getBrandList()
         this.initTable([])
         this.getButtonJurisdiction()//按钮权限
    },
    methods: {
      getButtonJurisdiction(){
        let data = {}
        data.parentResourceCode = this.$route.query.code
        this.request('masterData_resource_buttonResource', data, true).then(res => {
          if (res.code==1) {
            this.buttonList = res.data
            let newList = []
            this.buttonList.map(function(item){
              newList.push(item.resourceName)
            })
            this.judgeMenu = newList
            }
          })
      },
              onEdit(row){
                   
          },
            onEdit(){
                 if(this.IDS.length==1){
                    this.dialogtitle="编辑"
                    this.dialogVisible=true
                    this.addformdata = Object.assign({},this.addformdata,this.IDS[0])
                    this.addformdata.brandNumber=this.IDS[0].code
                    this.addformdata.brandName=this.IDS[0].name
                    this.addformdata.includesReponsor=this.IDS[0].leader
                    this.addformdata.brandsuo=this.IDS[0].shortName
                    this.addformdata.diaopai=this.IDS[0].dropName
                    this.addformdata.type=(this.IDS[0].type).toString()
                    this.addformdata.goodsStore=this.IDS[0].warehouseName
                    this.addformdata.costRate=this.IDS[0].costMultiplying?(this.IDS[0].costMultiplying).toString():''
                    this.addformdata.tailMoney=this.IDS[0].soPriceTail?(this.IDS[0].soPriceTail).toString():''
                    this.addformdata.companyName=this.IDS[0].companyName
                    this.addformdata.companyAddress=this.IDS[0].companyAddress
                    this.addformdata.companyPhone=this.IDS[0].companyPhone
                    this.addformdata.includesMoney=(this.IDS[0].containsTrialFee).toString()
                    this.addformdata.id           =this.IDS[0].id
                 }else if(this.IDS.length==0){
                     this.$message.error('请先选择修改的数据!')
                 }else if(this.IDS.length>1){
                     this.$message.error('一次只能修改一条数据!')
                 }
          },
          handleSizeChange(pageSize) {
                    this.pageSize = pageSize
                    this.getData()
          },
          handleCurrentChange(page) {
                    this.page = page
                    this.getData()
          },
          onSearch(){
                     this.page = 1;
                     this.getData()
          },
         initTable(arr = [], current, total) {
            let self = this;
            $(function () {
                $('#goodsDetail').w2grid({
                    name: 'goodsDetail',
                    show: {
                        toolbar: true,
                        selectColumn: true,
                    },
                    reorderColumns: true,
                    reorderRows: true,
                    columns: [
                        {
                            field: 'basicBrandName',
                            caption: '品牌',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'goodsNo',
                            caption: '货品编码',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'merchantCode',
                            caption: '商家编码',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'specificationName',
                            caption: '规格名称',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'goodsName',
                            caption: '货品名称',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'kinds',
                            caption: '分类',
                            size: '130px'
                        },
                        {
                            field: 'color',
                            caption: '颜色',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'year',
                            caption: '年份',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'season',
                            caption: '季节',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'type',
                            caption: '类型',
                            size: '130px',
                            sortable: true
                        },
                        {
                            field: 'weight',
                            caption: '重量',
                            size: '100px',
                            sortable: true
                        },
                         {
                            field: 'cost',
                            caption: '成本价',
                            size: '100px',
                            sortable: true
                        },
                         {
                            field: 'salePrice',
                            caption: '零售价',
                            size: '100px',
                            sortable: true
                        },
                    ],
                    onClick: function (event) {
                    }
                })
            });
            if (arr.length > 0) {
                w2ui.goodsDetail.clear(); //清空
                w2ui.goodsDetail.records = arr
                $('#goodsDetail').w2render('goodsDetail');
                w2ui.goodsDetail.refresh();
            } else {
                 $(document).ready(function(){
                            $('#goodsDetail').w2render('goodsDetail');
                            w2ui['goodsDetail'].records = []
                            w2ui.goodsDetail.clear()
                            w2ui.goodsDetail.refresh();
                 })
            }

        },
        clear(){
               for(let i in this.formData){
                    this.formData[i]=''    
               }
        },
        onReset() {
            this.clear()
            this.$refs['formData'].resetFields();
            this.initTable([])
            this.page=1;
            this.getData()
        },
         getData(){
                let data={}
                    data.currentPage= this.page
                    data.pageSize   = this.pageSize
                    data.basicBrandIds=this.formData.brandId
                    data.goodsNo=this.formData.goodsNo
                    data.year   =filters.get_unix_only(this.formData.year)
                    data.seasons=this.formData.seasons
                    data.merchantCode=this.formData.merchantCode
                    data.basicBrandIds.length>0?'':delete data.basicBrandIds
                    data.seasons.length>0?'':delete data.seasons
                    data.goodsNo?'':delete  data.goodsNo
                    data.merchantCode?'':delete data.merchantCode
                    this.request('masterData_sys_s_page', data, true).then((res) => {
                            if (res.code == 1) {
                                this.total = res.data.count;
                                if (res.data.records) {
                                    for (let i = 0, len = res.data.records.length; i < len; i++) {
                                        res.data.records[i].recid = res.data.records[i].id
                                    }
                                    this.initTable(res.data.records)
                                } else {
                                    this.initTable([])
                                }
                                this.loading = false
                                //   this.perAmount = res.data.perAmount
                                //   this.totalAmount = res.data.totalAmount
                            } else {
                                this.$message({
                                    message: res.msg,
                                    type: 'error'
                                });
                            }
                        })
        },
         getBrandList(){
                 let data={}
                    this.request('masterData_brand_selector', data, true).then((res) => {
                            if (res.code == 1) {
                                  this.brandList=res.data
                            }
                        }) 
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
  .el-table__header-wrapper{
 
       width:99.9% !important;

}

</style>