<style lang="less" scoped>

.showdragmodal .ivu-modal {
    top: 10px !important
}

.drag-box-card {
    display: inline-block;
    width: 600px;
    height: 600px;

    .drag-list-con {
        overflow: scroll;
        min-height: 600px;
    }

    //   background: #eee;
    .drag-item {
        margin: 6px;
        border: 1px solid #eee;
        cursor: pointer;
        // background: #fff;
    }

    h3 {
        padding: 10px 15px;
    }

    .right-drop-box {
        margin-right: 0px;
    }
}

.handle-log-box {
    display: inline-block;
    margin-left: 20px;
    border: 1px solid #eeeeee;
    vertical-align: top;
    width: 200px;
    height: 500px;

    h3 {
        padding: 10px 14px;
    }

    .handle-inner-box {
        height: ~"calc(100% - 44px)";
        overflow: auto;

        p {
            padding: 14px 0;
            margin: 0 14px;
            border-bottom: 1px dashed #eeeeee;
        }
    }
}

.res-show-box {
    display: inline-block;
    margin-left: 20px;
    border: 1px solid #eeeeee;
    vertical-align: top;
    width: 350px;
    height: 570px;
}

.headerstyle {
    width: 99%;
    margin: 0 auto;
    background: #fff;
    padding: 10px 10px;
    height: 50px;
    margin-bottom: 10px;

}

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

.sum_footer {
    display: flex;
    display: -webkit-flex;
    line-height: 30px;
    color: #606266;
}

.sum_footer_unit {
    flex: 1;
    /* -webkit-flex-grow:1; */
    text-indent: 30px;
    font-size: 13px;

    &:nth-child(1) {
        text-indent: 25px;

    }

    ;

    &:nth-child(2) {
        text-indent: 25px;
    }

    ;

    &:nth-child(3) {
        text-indent: 25px;
    }

    ;

    &:nth-child(4) {
        text-indent: 15px;
    }

    ;

    &:nth-child(5) {
        text-indent: -15px;
    }

    ;

    &:nth-child(7) {
        text-indent: 90px;
    }

    ;
}

.sum_footer_unit.center {
    text-align: center;
    // text-indent:10px;
}

.sum_footer.xiaoji,
.sum_footer.heji {
    border-bottom: 1px solid #EBEEF5;
    border-left: 1px solid #EBEEF5;
    border-right: 1px solid #EBEEF5;

}

.el-table__append-wrapper {
    margin-top: -1px;

}
</style>
<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline ">
            <el-form-item size="small">
                <el-button size="small" type="primary" @click="onExport">导出</el-button>
            </el-form-item>
        </el-form>
    </header>
    <section class="middle">
        <div :style="{minHeight:showBink?'730px':'530px'}">
            <plx-table-grid :data="list" border style="width: 100%" size="mini" @row-click="clickRow" :height="showBink?315:215" :pagination-show="false">
                <plx-table-column type="index" width="95" label="序号" resizable align="center" />
                <plx-table-column prop="bizNo" min-width="95" resizable label="企划单号" align="center" />
                <plx-table-column prop="versionNumber" min-width="95" label="版本号" resizable align="center" />
                <plx-table-column prop="planningStatus" min-width="95" resizable label="企划状态" align="center" />
                <plx-table-column prop="basicBrandName" min-width="95" resizable label="品牌" align="center" />
                <plx-table-column prop="years" min-width="95" resizable label="年份" align="center" />
                <plx-table-column prop="season" min-width="95" resizable label="季节" align="center" />
                <plx-table-column prop="waveBand" min-width="95" resizable label="波段" align="center" />
                <plx-table-column prop="planningDevelopDate" min-width="95" resizable label="规划开发日期" align="center" />
                <plx-table-column prop="planningDeliverDate" min-width="95" resizable label="规划交接日期" align="center" />
                <plx-table-column prop="colorSimpleDate" min-width="95" resizable label="齐色样日期" align="center" />
                <plx-table-column prop="planningArriveDate" min-width="95" resizable label="规划到货日期" align="center" />
                <plx-table-column prop="photoDate" min-width="95" resizable label="拍照日期" align="center" />
                <plx-table-column prop="planningLaunchDate" min-width="95" resizable label="可上新日期" align="center" />
                <plx-table-column prop="launchDate" min-width="95" resizable label="上新日期" align="center" />
                <plx-table-column prop="remark" min-width="95" resizable label="备注" align="center" />
                <!-- <plx-table-column   prop="purchaseOrderNo"  min-width="95"  resizable  label="波段"  align="center"/>
                        <plx-table-column   prop="purchaseOrderNo"  min-width="95"  resizable  label="规划开发日期"  align="center"/> -->
            </plx-table-grid>
            <div style="height:40px;line-height:40px;padding-left:20px">企划调整明细</div>
            <plx-table-grid :data="detailsList" border style="width: 100%" size="mini" :height="showBink?365:255" :pagination-show="false">
                <plx-table-column type="index" width="95" label="序号" resizable align="center" />
                <plx-table-column prop="firstLevel" min-width="95" resizable label="一级品类" align="center" />
                <plx-table-column prop="secondLevel" min-width="95" label="二级品类" resizable align="center" />
                <plx-table-column prop="thirdLevel" min-width="95" resizable label="三级品类" align="center" />
                <plx-table-column prop="series" min-width="95" resizable label="系列" align="center" />
                <plx-table-column prop="developStyleQty" min-width="95" label="开发款数" resizable align="center" />
                <plx-table-column prop="costLowerLimit" min-width="95" resizable label="成本下限" align="center" />
                <plx-table-column prop="costUpperLimit" min-width="95" label="成本上限" resizable align="center" />
                <plx-table-column prop="developCostPrice" min-width="95" resizable label="开发成本" align="center" />
                <plx-table-column prop="colorRate" min-width="95" resizable label="色比" align="center" />
                <plx-table-column prop="mainColorQty" min-width="95" label="主色" resizable align="center" />
                <plx-table-column prop="subColorQty" min-width="95" resizable label="辅色" align="center" />
                <plx-table-column prop="orderStyleQty" min-width="95" label="下单款量" resizable align="center" />
                <plx-table-column prop="orderTotalQty" min-width="95" resizable label="下单数量" align="center" />
                <plx-table-column prop="orderTotalAmount" min-width="95" resizable label="下单金额" align="center" />
                <plx-table-column prop="remark" min-width="95" label="明细备注" resizable align="center" />
            </plx-table-grid>
        </div>
    </section>

</div>
</template>

<script>
var totalPageSum = {}
import filters from '../../../filter/'
import downLoad from '../../../filter/downLoad'
import {
    debounce
} from 'mixins/debounce.js'
import {burypoint} from 'mixins/burypoint'
export default {
    mixins: [debounce,burypoint],
    components: {
        //    DragList
    },
    data() {
        return {
            detailsList: [],
            list: [],
            showEdit: false,
            formData: {},
            dialogVisible: false, //新增
            tableList: [{
                radio: '1',
                status: '已下单'

            }, {
                radio: '2',
                status: '已下单'

            }, {
                radio: '1',
                status: '已下单'

            }, {
                radio: '1',
                status: '已下单'

            }]
        }
    },
    computed: {},
    destroyed() {
        this.$store.commit('clearscmOrder')
    },
    mounted() {
        this.getData()
        // $(document).on('click', '.active', function () {
        //     $(this).css({
        //         'background': '#99ff99'
        //     }).parents('td').siblings().find('.active').css({
        //         'background': ''
        //     })
        //     $(this).css({
        //         'background': '#99ff99'
        //     }).parents('tr').siblings().find('.active').css({
        //         'background': ''
        //     })
        // })
    },
    methods: {
        getData() {
            let data = {}
            data.messageId = this.$route.query.id
            //  data.pageSize = this.pagesize
            // //  data.currentPage = this.currentPage
            // $('.active').css({
            //     'background': ''
            // })
            this.request('bossGoodsPlanningParameterSend_showMainOrder', data, true).then(res => {
                if (res.code == 1) {
                    this.total = res.data.count;
                    this.list = res.data
                    console.log(this.list)
                    this.loading = false
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            })
        },
        clickRow(row) {
            let data = {}
            data.mainId = row.id
            this.request('bossGoodsPlanningParameterSend_showDetailOrder', data, false).then((res) => {
                if (res.code == 1) {
                    this.detailsList = res.data
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        //导出
        onExport(){
            this.setBuryPoint('导出')
            let data = {}
            data.messageId = this.$route.query.id
            downLoad.downLoad(data,'/eop-boot/boss/bossGoodsPlanningParameterSend/export')
        },
    }
}
</script> 

<style>
 .plx-table .plx-header--column.col--ellipsis{
    height: 4px;
}
 .plx-table .plx-body--column.col--ellipsis{
    height: 40px;
}

.plx-table tr, .plx-table th {
    padding-top: 6px!important;
    padding-bottom: 6px!important;
}
/* .plx-table--header-wrapper{
       line-height:40px!important;
       height:40px!important;
       padding:0!important;
} */
 .plx-table--empty-block{
     height:60px!important;
     line-height: 60px!important;
 }
 /* .plx-table--empty-content{
     /* padding-top: 45px; */
 /* }  */
.ivu-card-body {
    padding: 4px 16px 4px 26px!important;
}
.drop-box{
    border: 1px solid #eeeeee;
    height: 540px;
    border-radius: 5px;
    overflow:auto;
  }
  .left-drop-box{
    margin-right: 10px;
  }
  .ivu-modal-body {
    padding: 10px;
    font-size: 12px;
    line-height: 1; 
} 
</style>
