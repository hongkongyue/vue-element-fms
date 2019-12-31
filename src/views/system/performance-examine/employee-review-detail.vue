<template>
<div id="department-review">
    <Row class="margin-bottom-10 background-color-white exhibition">
        <Col span="24">
        <Form :model="formSearch" class="detailForm" ref="formSearch" :label-width="90" inline
            label-position="right">
            <Row>
                <Col span="6">
                <Form-item label="考核员工:">
                  {{formSearch.employee_name}}
                </Form-item>
                </Col>
                <Col span="6">
                <Form-item label="部门:">
                  {{formSearch.org_department_name}}
                </Form-item>
                </Col>
                <Col span="6">
                <Form-item label="所属部门:">
                    {{formSearch.org_department_root_name}}
                </Form-item>
                </Col>
            </Row>
             <Row>
                <Col span="6">
                <Form-item label="员工类型:">
                  {{formSearch.employee_type}}
                </Form-item>
                </Col>
                <Col span="6">
                <Form-item label="考核周期:">
                  {{formSearch.review_period}}
                </Form-item>
                </Col>
                <Col span="6">
                <Form-item label="评审时间:">
                    {{formSearch.review_date}}
                </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="6">
                <Form-item label="评委姓名:">
                    {{formSearch.review_user_name}}
                </Form-item>
                </Col>
                <Col span="6">
                <Form-item label="评委类型:">
                    {{formSearch.review_type}}
                </Form-item>
                </col>
                <Col span="6">
                <Form-item label="评委比重:">
                    　{{formSearch.weight}}%
                </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="6">
                <Form-item label="评委分数:">
                    　{{formSearch.score.toFixed(2)}}
                </Form-item>
                </Col>
            </Row>
        </Form>
        </Col>
    </Row>

    <Row class="margin-bottom-10 background-color-white exhibition">
         
        <Col span="18">

         <Card>
            <p slot="title">能力考核评分表</p>
              <Table :columns="abilityColumns" size="small" highlight-row :data="abilityList"></Table>
         </Card>
      
        </Col>

          <Col span="18">

         <Card style="margin-top:3px;">
            <p slot="title">价值观考核评分表</p>
              <Table :columns="valueColumns" size="small" highlight-row :data="valueList"></Table>
            </Card>
        </Col>
         <Col span="18">

         <Card style="margin-top:3px;">
            <p slot="title">整体评价</p>
               <Input v-model="overallEvaluation" type="textarea" placeholder="必须填写评价信息" disabled/>
            </Card>
        </Col>
    </Row>
</div>
</template>

<script>
    import Util from 'libs/util';

    export default {
        name: 'employee-review-detail-v',
        desc: '个人评审详情',
        data() {
            return {
                formSearch: {
                    weight:null,
                    score:null
                },
                overallEvaluation:'',
                abilityColumns: [{
                        title: '序号',
                        type: 'index',
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
                        key: 'process_score_level',
                        align: 'center',
                        width: 180,
                    }, {
                        title: '结果分值',
                        key: 'result_score_level',
                        align: 'center',
                        width: 180,
                    },
                    {
                        title: '得分',
                        key: 'finally_score',
                        align: 'center',
                        width: 120
                    }
                ],
                 valueColumns: [{
                        title: '序号',
                        type: 'index',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '指标',
                        key: 'title',
                        align: 'center',
                        minWidth: 150
                    },{
                        title: '结果分值',
                        key: 'result_score_level',
                        align: 'center',
                        width: 180,
                    },
                    {
                        title: '得分',
                        key: 'finally_score',
                        align: 'center',
                        width: 120
                    }
                ],
                abilityList: [], //能力考核
                valueList: [], //价值观
            }
        },
        mounted() {
            this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
            this.reviewId = this.$route.params.reviewId
            this.getData()
        },
        methods: {
            getData() {
                this.request('get_performance_review_detail',{
                    id:this.reviewId
                }, true).then((res) => {
                    if (res.errno == 0) {
                        this.formSearch = Util.deepClone(res.data)
                        this.overallEvaluation = res.data.overall_evaluation
                        console.log(this.overallEvaluation,'-0-0-0-0')
                        delete this.formSearch.detail
                        for(let item of res.data.detail){

                            if(item.target_type=='能力考核'){
                                 this.abilityList.push(item)
                            }else if(item.target_type=='价值观考核'){
                                 this.valueList.push(item)
                            }
                        }
                    }
                })
            },
        },
    }
</script>
