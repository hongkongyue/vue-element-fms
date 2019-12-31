<template>
    <div id="mountNode"></div>
</template>

<script>

    export default {
        name: 'staffOrderNeigouReport',
        props: {
            updateLog: Array
        },
        data() {
            return {
               
            }
        },
        methods: {
            getReportData() {
                this.request('get_staff_order_report', {}, false).then((res) => {

                    this.initReport(res.data)

                })
            },
            initReport(data) {
                let dataArray=[];
                for(let item of data){
                    dataArray.push(
                        {
                            day:item.order_date,
                            count:item.order_count,
                            amount:(item.order_amount).toFixed(2)
                        }
                    )
                    // dataArray.push(
                    //     {
                    //         day:item.order_date,
                    //         count:item.order_amount,
                    //         name:'订单金额'
                    //     }
                    // )
                }

                var chart = new G2.Chart({
                    container: 'mountNode',
                    forceFit: true,
                    height: 250,
                    padding:'auto'
                }); 
                chart.source(dataArray,{
                'count':{
                    alias: '订单数',
                    min:0
                },
                'amount':{
                    alias: '订单金额',
                    min:0
                },
                });
                chart.tooltip({
                    crosshairs: {
                        type: 'line'
                    }
                });
                chart.axis('count', {
                    label: {
                        formatter: function formatter(val) {
                            return val;
                        }
                    },
                    position:'right'
                });
                chart.axis('day', {
                label:{
                    autoRotate:false,
                    textStyle:{
                          rotate: 20*Math.PI/180,
                          textAlign: 'start'
                    },
                    subTickCount:2
                }
                });
                chart.axis('amount', {
                 position:'left'
                });
                // chart.legend('name', {
                //  position: 'top'
                // });
                // chart.legend(false); 
                chart.legend({
                    position:'top',
                    itemFormatter(val) {
                     if(val=='count'){
                        return '订单数'
                     }else if(val=='amount'){
                        return '订单金额'
                     }
                    }
                });
                chart.line().position('day*count').style({
                    stroke: 'orange'
                }).color('orange')
                chart.line().position('day*amount')
                // chart.point().position('day*count').size(4).shape('circle').style({
                //     stroke: '#fff',
                //     lineWidth: 1
                // });
                //  chart.point().position('day*amount').size(4).shape('circle').style({
                //     stroke: '#fff',
                //     lineWidth: 1
                // });
                chart.render();
            }
        },
        mounted() {
                this.getReportData()
        },
       
    }; 
</script>


