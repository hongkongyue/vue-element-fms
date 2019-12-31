<template>
    <div>
    <div style="text-align:center;">各部门人效统计</div>
    <div  id="workTimeReport"></div>
    </div>
</template>

<script>

    export default {
        name: 'departmentWorkTimeReport',
        props: {
            work_time_type: String
        },
        data() {
            return {
               reportObj:null
            }
        },
        methods: {
            getReportData(workTimeType) {
                this.request('get_work_time_report', {
                    workTimeType:workTimeType
                }, '正在获取数据...').then((res) => {

                    this.initReport(res.data)

                })
            },
            initReport(data) {
                for(let item of data){
                    if(item.work_hours<8){
                        item.work_hours=8
                    }
                }

                if(this.reportObj){
                  this.reportObj.changeData(data)
                  return;
                }
             
                var chart = new G2.Chart({
                    container: 'workTimeReport',
                    forceFit: true,
                    height: 229,
                    title: false,
                    padding: ['auto', '45', 'auto', 'auto']
                });
                const defs = {
                'name':{
                    type: 'cat',
                    alias: '部门名称', // 别名，如果没有别名显示成字段名 month
                },
                'work_show': {
                    alias: '工作时长'
                },
                'work_hours': {
                  min:8,
                  max:16
                },
                'work_num': {
                    alias: '统计人数'
                }
                };
                chart.source(data,defs);
                chart.axis('work_hours', {
                    label: {
                        formatter: function formatter(val) {
                            return val;
                        },
                         textStyle: {
                            textAlign: 'center', // 文本对齐方向，可取值为： start middle end
                            fill: '#ffffff', // 文本的颜色
                          }
                    },
                //     title: {
                //     // 设置标题的文本样式
                //     textStyle: {
                //         textAlign: 'center', // 文本对齐方向，可取值为： start middle end
                //         fill: '#404040', // 文本的颜色
                //         fontSize: '12', // 文本大小
                //         fontWeight: 'bold', // 文本粗细
                //         rotate: 30, // 文本旋转角度，以角度为单位，仅当 autoRotate 为 false 时生效
                //         textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
                //     },
                //     position:'center',
                //     autoRotate:true,
                //     formatter:function  formatter(text, item, index) {
                //         return '平均工作时长(小时)';
                //     }
                //    }
                });
                chart.axis('name', {
                label:{
                    textStyle:{
                          rotate: 25*Math.PI/180,
                          textAlign: 'end'
                    },
                    subTickCount:1
                }
                });
                chart.interval().position('name*work_hours').color('desc').tooltip('name*work_num');
                chart.tooltip(true, {
                   showTitle: false // 默认标题不显示
                 });
                chart.legend(false); 
                chart.render();
                this.reportObj = chart;
            }
        },
        watch: {
            'work_time_type':{
                  handler(newVal, oldVal) {
                     this.getReportData(newVal)
                  }
            }
        },
        mounted() {
                this.getReportData('lastDay')
        }
    }; 
</script>


