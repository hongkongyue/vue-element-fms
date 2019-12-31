<template>
    <div id="loginLogReport"></div>
</template>

<script>

    export default {
        name: 'loginLogReport',
        props: {
            updateLog: Array
        },
        data() {
            return {
               
            }
        },
        methods: {
            getReportData() {
                this.request('get_login_count_report', {}, false).then((res) => {

                    this.initReport(res.data)

                })
            },
            initReport(data) {

                var chart = new G2.Chart({
                    container: 'loginLogReport',
                    forceFit: true,
                    height: 250,
                    padding: ['auto', '50', 'auto', 'auto']
                });
                const defs = {
                'login_count_success':{
                    alias: '登录成功', 
                    min:0
                },
                'login_count_fail':{
                    alias: '登录失败', 
                },
                };
                chart.source(data,defs);
                chart.tooltip({
                    crosshairs: {
                        type: 'line'
                    }
                });
                chart.axis('login_date', {
                label:{
                    autoRotate:false,
                    textStyle:{
                         rotate: 20*Math.PI/180,
                         textAlign: 'start'
                    },
                    subTickCount:2
                }
                });
                chart.line().position('login_date*login_count_success').tooltip('login_count_success*login_count_fail')
                chart.point().position('login_date*login_count_success*login_count_fail').size(4).shape('circle').style({
                    stroke: '#fff',
                    lineWidth: 1
                });
                chart.render();
            }
        },
        mounted() {
                this.getReportData()
        }
    }; 
</script>


