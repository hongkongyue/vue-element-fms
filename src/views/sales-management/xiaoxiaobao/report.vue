<template>
    <div>
        <report_template orderType="XXB" :orderId="$route.params.orderId"></report_template>
    </div>
</template>

<script>
    import report_template from '../../common-page/report'
    export default {
        name: "xxb_report",
        components:{
            report_template
        }
    }
</script>

<style scoped>

</style>
