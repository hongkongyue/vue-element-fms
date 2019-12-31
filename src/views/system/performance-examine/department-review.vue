<template>
<div id="department-review">
    <Row class="margin-bottom-10 background-color-white exhibition">
        <Col span="24">
        <Form :model="formSearch" class="addForm" ref="formSearch" :label-width="90" inline
            label-position="right">
            <Row>
                <Form-item label="考核周期:" :label-width="80">
                    　<Select v-model="formSearch.review_period" style="width:150px">
                        <Option v-for="item in reviewPeriodList" :value="item.value" :key="item.value">
                            {{ item.label }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="考核部门:" :label-width="80">
                    　<Select v-model="formSearch.department_id" @on-change="departmentChange" style="width:150px">
                        <Option v-for="item in departmentList" :value="item.id" :key="item.id">
                            {{ item.label }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="评审时间:" :label-width="100">
                    　<Input readonly  v-model="formSearch.review_date"></Input>
                </Form-item>
            </Row>
            <Row>
                <Form-item label="评委姓名:" :label-width="80">

                    　<Input v-model="formSearch.review_name" style="width:150px;" value="王涛"></Input>
                </Form-item>
                <Form-item label="评委类型:" :label-width="80">
                    　<Select v-model="formSearch.review_type" @on-change="reviewTypeChange" style="width:150px">
                        <Option v-for="item in reviewTypeList" :value="item.value" :key="item.value">
                            {{ item.label }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="评委比重(%):" :label-width="100">
                    　<Input readonly v-model="formSearch.weight"></Input>
                </Form-item>
            </Row>
            <Row>
                <Form-item label="评委分数:" :label-width="80">
                    　<InputNumber readonly v-model="formSearch.score"></InputNumber>
                </Form-item>
            </Row>
        </Form>
        </Col>
    </Row>

    <Row class="margin-bottom-10 background-color-white exhibition">
        <Col span="16">
        <Table :columns="columns" size="small" highlight-row :data="list"></Table>
        </Col>

         <Col style="text-align:center" class="margin-top-10" span="24" >
        <Button type="primary" @click="save">确认</Button>
        </Col>
    </Row>
</div>
</template>

<script>
    import Util from 'libs/util';

    export default {
        name: 'department-review',
        desc: '部门评审',
        data() {
            return {
                formSearch: {
                    weight:null,
                    score:null
                },
                columns: [{
                        title: '序号',
                        key: 'serialNo',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '指标',
                        key: 'title',
                        align: 'center',
                        minWidth: 150
                    }, {
                        title: '过程分值',
                        key: 'process_score',
                        align: 'center',
                        width: 180,
                        render: (h, params) => {
                            if(params.row.serialNo=='评分合计'){
                                 return h('span',params.row.process_score)
                            }
                            return h('Select', {
                                    props: {
                                        value: this.list[params.index].process_score,
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            params.row.process_score = value;
                                            params.row.finally_score =  params.row.result_score+params.row.process_score
                                          
                                            for(let item of  this.list[params.index].processScoreList){
                                                       if(item.value == value){
                                                           params.row.process_score_level = item.label
                                                           break;
                                                       }
                                            }
                                            this.list[params.index] =   params.row
                                            this.updateScore()
                                        }
                                    },
                                },
                                this.list[params.index].processScoreList.map(function (item) {
                                    return h('Option', {
                                        props: {
                                            value: item.value
                                        }
                                    }, item.label);
                                })
                            );
                        },
                    }, {
                        title: '结果分值',
                        key: 'result_score',
                        align: 'center',
                        width: 180,
                        render: (h, params) => {
                            if(params.row.serialNo=='评分合计'){
                                 return h('span',params.row.result_score)
                            }
                            return h('Select', {
                                    props: {
                                        value: this.list[params.index].result_score,
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            params.row.result_score = value;
                                            params.row.finally_score =  params.row.result_score+params.row.process_score
                                             for(let item of  this.list[params.index].resultScoreList){
                                                       if(item.value == value){
                                                           params.row.result_score_level = item.label
                                                           break;
                                                       }
                                            }
                                            this.list[params.index] =   params.row
                                            this.updateScore()
                                        }
                                    },
                                },
                                this.list[params.index].resultScoreList.map(function (item) {
                                    return h('Option', {
                                        props: {
                                            value: item.value
                                        }
                                    }, item.label);
                                })
                            );
                        },
                    },
                    {
                        title: '得分',
                        key: 'finally_score',
                        align: 'center',
                        width: 120
                    }
                ],
                list: [],
                departmentList: [],
                submit_data: {
                    id: 0,
                    title: '',
                    process_score: 10,
                    result_score: 90
                },
                reviewPeriodList: [{
                        label: '2019年上半年',
                        value: '2019年上半年'
                    },
                    {
                        label: '2019年下半年',
                        value: '2019年下半年'
                    },
                    {
                        label: '2020年上半年',
                        value: '2020年上半年'
                    }, {
                        label: '2020年下半年',
                        value: '2020年下半年'
                    }
                ],
                reviewTypeList:[]
            }
        },
        mounted() {
            this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
            this.getDepartmentList()
            this.getReviewTypeList()
            this.formSearch.review_name = this.userInfo.userName
            this.formSearch.review_date = Util.dateFormat(new Date(),'yyyy-MM-dd')
            this.formSearch.review_period = '2019年上半年'
        },
        activated() {

        },
        methods: {
            search() {
                this.getData()
            },
            getData() {
                let data ={}
                data.type='department'
                data.department_id = this.formSearch.department_id
                this.request('get_performance_target_list_data',data, true).then((res) => {
                    this.list=[]
                    if (res.errno == 0) {
                        let serialNoBegain = 0
                        for (let item of res.data) {
                            serialNoBegain++;
                            item.serialNo = serialNoBegain;
                            item.finally_score =0
                            item.processScoreList = this.generateScoreLevelList(item.process_score)
                            item.resultScoreList = this.generateScoreLevelList(item.result_score)
                            item.process_score =null
                            item.result_score =null
                        }
                        this.list = res.data
                        this.list.push({
                            serialNo: '评分合计',
                            process_score:0,
                            result_score:0,
                            finally_score:0
                        })
                        this.total = res.data.count
                    }
                })
            },
            add() {
                this.addModal = true
            },
            cancel() {
                this.addModal = false
            },
            getDepartmentList(){
                this.request('get_department_list', {
                    unitLength:12
                }, false).then((res) => {
                    if (res.errno == 0) {
                        this.departmentList = res.data
                    }
                })
            },
            save() {
                let errMsg=''
                let data = Util.deepClone(this.formSearch)
                if(!data.department_id){
                     this.$Message.warning('请选择考核部门')
                     return;
                }else  if(!data.review_type){
                     this.$Message.warning('请选择评委类型')
                     return;
                }
                data.type='department'
                data.list = Util.deepClone(this.list)
                for(let item of data.list){
                    if(!item.process_score){
                        errMsg='评分数据不完整,请检查'
                        break
                    }else if(!item.result_score){
                        errMsg='评分数据不完整,请检查'
                        break
                    }
                   delete item.processScoreList
                   delete item.resultScoreList
                }

                if(errMsg){
                  this.$Message.warning(errMsg)
                  return;
                }
                this.request('save_performance_review_data', data, '正在保存...').then((res) => {

                    if (res.errno == 0) {
                          this.$Message.success('保存成功');
                          let id = res.data
                          this.$router.push({
                            name: 'department-review-detail',
                            params: {
                                reviewId: id,
                            }
                          });
                    } else {
                         this.$Message.warning(res.errmsg);
                    }
                })
            },
            departmentChange(){
                this.getData()
                this.formSearch.review_type = ''
                this.formSearch.weight = ''
            },
            /**
             * 根据分数生成等级列表
             */
            /**
             * 根据分数生成等级列表
             */
            generateScoreLevelList(score) {
                let list = []
                if(!score){
                    return list
                }
                let dScore = (score / 5)
                list.push({
                    label: 'S(' + score + '分)',
                    value: score,
                    score: score
                })

                list.push({
                    label: 'A(' + Util.toDecimal(dScore * 4) + '分)',
                    value:Util.toDecimal(dScore * 4),
                    score: Util.toDecimal(dScore * 4)
                })

                list.push({
                    label: 'B(' + Util.toDecimal(dScore * 3) + '分)',
                    value: Util.toDecimal(dScore * 3),
                    score: Util.toDecimal(dScore * 3)
                })

                list.push({
                    label: 'C(' + Math.round(dScore * 2) + '分)',
                    value: Util.toDecimal(dScore * 2),
                    score: Util.toDecimal(dScore * 2)
                })

                list.push({
                    label: 'D(' + Util.toDecimal(dScore) + '分)',
                    value: Util.toDecimal(dScore),
                    score: Util.toDecimal(dScore)
                })
                return list
            },
            getReviewTypeList(){
                this.request('get_review_type_list',{
                    type:'department'
                },false).then((res)=>{
                       this.reviewTypeList = res.data
                })     
            },
            reviewTypeChange(){
                this.formSearch.weight =null
                for(let item of this.reviewTypeList){
                    if(item.value == this.formSearch.review_type){
                           this.formSearch.weight = item.weight
                           this.updateScore()
                           break
                    }
                }
                if(this.formSearch.review_type !== undefined){
                    this.request('department_review_exist',{data:{review_period:this.formSearch.review_period,type:'department',review_type:this.formSearch.review_type,department_id:this.formSearch.department_id}
                },false).then((res)=>{
                        console.log('090909zhanzhanzhanzhanzhanzhanzhanz')
                })     
                }
            },
            /**
             * 更新页面分数
             */
            updateScore(){
                let total_process_score = 0
                let total_result_score = 0
                let total_finally_score = 0
                for (let item of this.list) {
                    if (item.serialNo == '评分合计') {
                        item.process_score = total_process_score
                        item.result_score = total_result_score
                        item.finally_score = total_finally_score
                    } else {
                        total_process_score += Util.toNumber(item.process_score)
                        total_result_score += Util.toNumber(item.result_score)
                        total_finally_score+=Util.toNumber(item.finally_score)
                    }
                }

                this.formSearch.score = this.formSearch.weight*total_finally_score/100
            }
        },
    }
</script>
