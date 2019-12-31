<style>
  #print {

  }
</style>

<template>
  <div class="background-color-white exhibition" id="print">
    <div ref="report-content" id="report-content">
      <iframe id="report" :src="print_href" name="ifd"
              style="height:inherit"
              width="100%" scrolling="no"
              frameborder="0">
      </iframe>
    </div>
  </div>
</template>

<script>
  export default {
    name: "print",
    data() {
      return {
        print_href: ''
      }
    },
    mounted() {
      this.$refs['report-content'].style.height=window.innerHeight-180+'px'
      const that = this;
      window.onresize = function temp() {
        that.$refs['report-content'].style.height=window.innerHeight-180+'px'
      };

      switch (this.$route.params.orderType){
        case 'LJY':
          this.print_href = `/WebReport/ReportServer?reportlet=order_detail.cpt&order_id=${this.$route.params.orderId}`;
          break;
        case 'GH':
          this.print_href = `/WebReport/ReportServer?reportlet=return_order_detail.cpt&return_code=${this.$route.params.orderId}`;
          break;
        default:
          break;
      }
    }
  }
</script>
