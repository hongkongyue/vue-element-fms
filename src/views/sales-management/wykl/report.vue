<template>
    <div>
        <report_template orderType="WYKL" :orderId="$route.params.orderId"></report_template>
    </div>
</template>

<script>
    import report_template from '../../common-page/report'
    export default {
        name: "wykl_report",
        components:{
            report_template
        }
    }
</script>

<style scoped>

</style>
