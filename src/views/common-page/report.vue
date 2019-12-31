<template>
    <div class="background-color-white exhibition">
        <div ref="report-content" id="report-content">
            <iframe id="report" :src="report_href" name="ifd"
                    style="height:inherit"
                    width="100%" scrolling="no"
                    frameborder="0">
            </iframe>
        </div>
    </div>
</template>

<script>
    import Util from 'libs/util';

    export default {
        name: "report_template",
        data() {
            return {
                report_href: ''
            }
        },
        props: ["orderType", "orderId"],
        mounted() {
            this.$refs['report-content'].style.height = window.innerHeight - 150 + 'px'
            const that = this;
            window.onresize = function temp() {
                that.$refs['report-content'].style.height = window.innerHeight - 150 + 'px'
            };
            switch (this.orderType) {
                case 'FD':
                    this.report_href = `/WebReport/ReportServer?reportlet=FD_reorder_detail.cpt&op=view&reorderCode=${this.orderId}`
                    break;
                case 'NG':
                    this.report_href = `/WebReport/ReportServer?reportlet=NG_return.cpt&op=view&sourceReturnCode=${this.orderId}`
                    break;
                case 'DX':
                    this.report_href = `/WebReport/ReportServer?reportlet=DX_return_report.cpt&op=view`
                    break;
                case 'AKC':
                    this.report_href = `/WebReport/ReportServer?reportlet=AKC_sell_statistics.cpt&op=view`
                    break;
                case 'HYC':
                    this.report_href = `/WebReport/ReportServer?reportlet=HYC_sell_statistics.cpt&op=view`
                    break;
                case 'BBC':
                    this.report_href = `/WebReport/ReportServer?reportlet=BBC_sell_statistics.cpt&op=view`
                    break;
                case 'SNTM':
                    this.report_href = `/WebReport/ReportServer?reportlet=SNTM_sell_statistics.cpt&op=view`
                    break;
                case 'THMS':
                    this.report_href = `/WebReport/ReportServer?reportlet=THMS_sell_statistics.cpt&op=view`
                    break;
                case 'DLJ':
                    this.report_href = `/WebReport/ReportServer?reportlet=DLJ_sell_statistics.cpt&op=view`
                    break;
                case 'DX_kucun':
                    this.report_href = `/WebReport/ReportServer?reportlet=DX_kucun.cpt&op=view`
                    break;
                case 'XXB':
                    this.report_href = `/WebReport/ReportServer?reportlet=XXB_sell_statistics.cpt&op=view`
                    break;       
                case 'WYKL':
                    this.report_href = `/WebReport/ReportServer?reportlet=WYKL_sell_statistics.cpt&op=view`
                    break; 
                case 'FD_count':
                    this.report_href = `/WebReport/ReportServer?formlet=FD_count.frm&op=view`
                    break;    
                case 'WLDZ':
                    this.report_href = `/WebReport/ReportServer?reportlet=Fin_wl_account_report.cpt&op=view`
                    break; 
                case 'FXDZ':
                    this.report_href = `/WebReport/ReportServer?reportlet=Fin_fanxiu_rk.cpt&op=view`
                    break;       
                default:
                    break;
            }
        }
    }
</script>

<style scoped>

</style>
