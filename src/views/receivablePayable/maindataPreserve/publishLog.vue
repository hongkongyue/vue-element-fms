<template>
<div>
    <section class="middle">
    <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        <ul class="container">  
            <li v-for="(v,index) in tableData" :key="v.id"  @click="show(v,index)">
                 {{v.releaseTime+'更新内容(版本号:'+v.versionNo+')'}} <Badge v-if="v.currentVersion==1" text="new"></Badge> <i v-show="!v.visible"  class="el-icon-arrow-down"></i> <i v-show="v.visible" class="el-icon-arrow-up"></i>
                 <div v-show="v.visible" v-html="v.releaseContent"></div>
            </li>
        </ul>
    </section>
</div>
</template>

<script>
import filters from '../../../filter/'
import E from 'wangeditor'
export default {
    data() {
        return {
            total: 0,
            pagesize: 10,
            currentPage: 1,
            tableData: [],
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData() {
            let data = {}
                data.pageSize = this.pagesize
                data.currentPage = this.currentPage
            this.request('masterData_versionLog_page', data, true).then(res => {
                if (res.code == 1) {
                    this.title='新增'
                    this.total = res.data.total;
                    let number = (this.currentPage - 1) * this.pagesize
                    res.data.records.forEach(item => {
                        number++
                        item.order = number
                    });
                    this.tableData = res.data.records;
                    for(let i=0,len=this.tableData.length;i<len;i++){
                      this.tableData[i].visible=false;  
                    }
                }
            })
        },
        show(v,index){
             if(v.visible){
                 v.visible=false
             }else{
                v.visible=true
             }
             console.log(index)
             this.tableData[index].visible=v.visible
            //    this.$set(this.list,this.index,this.detailData) 
             this.$set(this.tableData,index,v)
          
        },
        onSearch() {
            this.currentPage = 1
            this.getData()

        },
        handleSizeChange(val) {
            this.pagesize = val
            this.getData()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getData()
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
.container{
    width:100%;
    li {

        width:100%;
        background: #fff;
        min-height:50px;
        font-size:16px;
        line-height: 50px;
        padding: 0 20px;
        border-radius:10px;
        margin-bottom:10px;
        i{
            float: right;
            font-size:25px;
            margin-top: 12px;
            cursor: pointer;
        }
        div{
            border-top:1px solid #eee
            
        }
    }
}
</style>
