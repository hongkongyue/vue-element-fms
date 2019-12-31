<template>
<div id="department-review">
    <Row class="margin-bottom-10 background-color-white exhibition">
        <Col span="24">
        <Form :model="formSearch" class="detailForm" ref="formSearch" :label-width="90" inline
            label-position="right">
            <Row>
                <Col span="6">
                <Form-item label="考核周期:">
                  {{formSearch.review_period}}
                </Form-item>
                </Col>
                <Col span="6">
                <Form-item label="考核部门:">
                  {{formSearch.department_name}}
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
                    　{{formSearch.score}}
                </Form-item>
                </Col>
            </Row>
        </Form>
        </Col>
    </Row>

    <Row class="margin-bottom-10 background-color-white exhibition">
        <Col span="16">
        <Table :columns="columns" size="small" highlight-row :data="list"></Table>
        </Col>
    </Row>
</div>
</template>

<script>
    import Util from 'libs/util';

    export default {
        name: 'department-review-detail-v',
        desc: '部门评审详情',
        data() {
            return {
                formSearch: {
                    weight:null,
                    score:null
                },
                columns: [{
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
                list: []
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
                        delete this.formSearch.detail
                        this.list = res.data.detail
                    }
                })
            },
        },
    }
</script>
