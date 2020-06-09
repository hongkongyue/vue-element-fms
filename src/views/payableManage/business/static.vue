<template>
  <div>
    <report_template orderType="FD_count" :orderId="$route.params.orderId"></report_template>
  </div>
</template>

<script>
  import report_template from '_c/report'
  export default {
    name: "quickrepeatorder_statistical",
    components:{
      report_template
    }
  }
</script>

<style scoped>

</style>
