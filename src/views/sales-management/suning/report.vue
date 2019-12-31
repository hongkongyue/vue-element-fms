<template>
    <div>
        <report_template orderType="SNTM" :orderId="$route.params.orderId"></report_template>
    </div>
</template>

<script>
    import report_template from '../../common-page/report'
    export default {
        name: "suning_report",
        components:{
            report_template
        }
    }
</script>

<style scoped>

</style>
