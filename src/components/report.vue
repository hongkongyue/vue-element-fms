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
                report_href: 'http://eop.eptison.com/WebReport/ReportServer?reportlet=FMS%2FFMS_supplier_settlement_progress.cpt&op=fs&__bypagesize__=false'
            }
        },
        props: ["orderType", "orderId"],
         mounted() {
            this.$refs['report-content'].style.height = window.innerHeight - 150 + 'px'
            const that = this;
            window.onresize = function temp() {
                that.$refs['report-content'].style.height = window.innerHeight - 150 + 'px'
            };
            console.log(this.orderType,this.orderId,'7777777777777777777777777777777777')
            // switch (this.orderType) {
              
            // }
        }
        
    }
</script>

<style scoped>

</style>
