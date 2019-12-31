<template>
<div id="employee-review">
    <Row class="margin-bottom-10 background-color-white exhibition">
        <Col span="24">
        <Form :model="formSearch" class="addForm" ref="formSearch" :label-width="100" inline
            label-position="right">
             <Row>
                <Form-item label="考核员工:" :label-width="80" >
                    　<Select @on-change="employeeChange"  v-model="formSearch.employee_id" filterable style="width:170px">
                        <Option v-for="item in employeeList" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </Select>
                </Form-item>

                <Form-item label="部门:" :label-width="80">
                    　　　<Input readonly v-model="formSearch.org_department_name" ></Input>
                    </Select>
                </Form-item>
                <Form-item label="所属部门:" :label-width="100">
                    　<Input readonly  v-model="formSearch.org_department_root_name" ></Input>
                </Form-item>
            </Row>
            <Row>

                 <Form-item label="员工类型:" :label-width="80">
                      <Input readonly  v-model="formSearch.employee_type" ></Input>
                </Form-item>
                <Form-item label="职级:" :label-width="80">
                    　<Input readonly width="150px;" v-model="formSearch.level_name"></Input>
                </Form-item>

                <Form-item label="考核周期:" :label-width="100">
                    　<Select v-model="formSearch.review_period" style="width:170px">
                        <Option v-for="item in reviewPeriodList" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                </Form-item>
            </Row>

            <Row>
                <Form-item label="评委姓名:" :label-width="80">
                    　<Input readonly v-model="userInfo.userName" ></Input>
                </Form-item>

                 <Form-item label="评委类型:" :label-width="80" >
                    　<Select v-model="formSearch.review_type" @on-change="reviewTypeChange" style="width:170px">
                        <Option v-for="item in reviewTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                </Form-item>
                 <Form-item label="评委比重(%):" :label-width="100" >
                    　<Input readonly style="width:170px"  v-model="formSearch.weight" ></Input>
                </Form-item>
            </Row>
             <Row>
                <Form-item label="评审时间:" :label-width="80">
                    　<Input readonly width="150px;" v-model="formSearch.review_date"></Input>
                </Form-item>
                <Form-item label="评委分数:" :label-width="80">
                    　<Input readonly v-model="formSearch.score" ></Input>
                </Form-item>
            </Row>
        </Form>
        </Col> 
    </Row>
    <Row class="margin-bottom-10 background-color-white exhibition">
        <Tabs type="card" @on-click='getList' v-model='cardName'>
            <TabPane label="考核评分" name='kfyy'>
                 <Col span="16">

         <Card>
            <p slot="title">能力考核评分表</p>
              <Table :columns="abilityColumns" size="small" highlight-row :data="abilityList"></Table>
         </Card>
      
        </Col>

          <Col span="16">

         <Card style="margin-top:3px;">
            <p slot="title">价值观考核评分表</p>
              <Table :columns="valueColumns" size="small" highlight-row :data="valueList"></Table>
            </Card>
        </Col>

         <Col span="16">

         <Card style="margin-top:3px;">
            <p slot="title">整体评价</p>
               <Input v-model="overallEvaluation" type="textarea" placeholder="必须填写评价信息" />
            </Card>
        </Col>
      
        <Col style="text-align:center" class="margin-top-10" span="24" >
        <Button type="primary" @click="save">确认</Button>
        </Col>
            </TabPane>
            <TabPane label="成长记录" name='dhxd'>
                <Table :columns="czjlColums"  highlight-row :data="listDhxd"></Table>
                <Page style="margin-top:5px;" :total="total" :page-size="pageSize" :current="page" show-sizer show-total
            show-elevator @on-change="currentChange" @on-page-size-change="sizeChange"></Page>
            </TabPane>
        </Tabs>
    </Row>
    <Modal v-model="visible" title="考核评分详情" @on-ok='saveClick' @on-cancel='cancel' :width="30" class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <Col span="24">
                <Form-item label="能力考核评分:" :label-width="0">
                    <Input readonly v-model="jzgkhpfb" disabled ></Input>
                </Form-item>
                <Form-item label="价值观考核评分:" :label-width="0">
                    <Input readonly v-model="nlkhpfb" disabled ></Input>
                </Form-item>
                <Form-item label="整体评价:" :label-width="0">
                    <Input v-model="overallEvaluation" type="textarea" disabled/>
                </Form-item>
            </Col>
        </Row>
    </Modal>
</div>
</template>

<script>
    import Util from 'libs/util';

    export default {
        name: 'employee-review',
        desc: '员工评审',
        data() {
            return {
                nlkhpfb:'',
                jzgkhpfb:'',
                overallEvaluation:'',
                formSearch: {
                    type:'employee',
                    weight: null,
                    score:null
                },
                czjlColums:[
                    {   type:'index',
                        title: '序号',
                        key: 'serialNo',
                        align: 'center',
                        width:80
                    },{
                        title: '日期',
                        key: 'date_time',
                        align: 'center',
                        width:150
                    },{
                        title: '指标',
                        key: 'target',
                        align: 'center',
                        width:150
                    },{
                        title: '案例类型',
                        key: 'case_type',
                        align: 'center',
                        width:150
                    },{
                        title: '事件描述',
                        key: 'event_desc',
                        align: 'center',
                    },{
                        title: '记录人',
                        key: 'created_user',
                        align: 'center',
                        width:150
                    },{
                        title: '记录时间',
                        key: 'created',
                        align: 'center',
                        width:150
                    }
                ],
                abilityColumns: [{
                        title: '序号',
                        key: 'serialNo',
                        align: 'center',
                        width: 100,
                        render: (h, params) => {
                            if(params.row.serialNo=='评分合计'){
                                return h('span','评分合计')
                            }else{
                                return h('span',params.index+1)
                            }
                        }
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
                        width: 150,
                        render: (h, params) => {
                            if(params.row.serialNo=='评分合计'){
                                 return h('span',params.row.process_score)
                            }
                            return h('Select', {
                                    props: {
                                        value: this.abilityList[params.index].process_score,
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            params.row.process_score = value;
                                            params.row.finally_score =  params.row.result_score+params.row.process_score
                                          
                                            for(let item of  this.abilityList[params.index].processScoreList){
                                                if(item.value == value){
                                                    params.row.process_score_level = item.label
                                                    break;
                                                }
                                            }
                                            this.abilityList[params.index] = params.row;
                                            this.updateScore()
                                        }
                                    },
                                },
                                this.abilityList[params.index].processScoreList.map(function (item) {
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
                        width: 150,
                        render: (h, params) => {
                            if(params.row.serialNo=='评分合计'){
                                 return h('span',params.row.result_score)
                            }
                            return h('Select', {
                                    props: {
                                        value: this.abilityList[params.index].result_score,
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            params.row.result_score = value;
                                            params.row.finally_score =  params.row.result_score+params.row.process_score
                                             for(let item of  this.abilityList[params.index].resultScoreList){
                                                       if(item.value == value){
                                                           params.row.result_score_level = item.label
                                                           break;
                                                       }
                                            }
                                            this.abilityList[params.index] = params.row
                                            this.updateScore()
                                        }
                                    },
                                },
                                this.abilityList[params.index].processScoreList.map(function (item) {
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
                valueColumns: [{
                        title: '序号',
                        key: 'serialNo',
                        align: 'center',
                        width: 100,
                        render: (h, params) => {
                            if(params.row.serialNo=='评分合计'){
                                return h('span','评分合计')
                            }else{
                                return h('span',params.index+1)
                            }
                        }
                    },
                    {
                        title: '指标',
                        key: 'title',
                        align: 'center',
                        minWidth: 150
                    }, {
                        title: '结果分值',
                        key: 'result_score',
                        align: 'center',
                        width: 150,
                        render: (h, params) => {
                            if(params.row.serialNo=='评分合计'){
                                 return h('span',params.row.result_score)
                            }
                            return h('Select', {
                                    props: {
                                        value: this.valueList[params.index].result_score,
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            params.row.result_score = value;
                                            params.row.finally_score =  params.row.result_score
                                            console.log(this.valueList[params.index].resultScoreList)
                                             for(let item of  this.valueList[params.index].resultScoreList){
                                                       if(item.value == value){
                                                           params.row.result_score_level = item.label
                                                           break;
                                                       }
                                            }
                                            this.valueList[params.index] = params.row
                                            this.updateScore()
                                        }
                                    },
                                },
                                this.valueList[params.index].resultScoreList.map(function (item) {
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
                visible:false,
                listDhxd:[],
                list: [],
                abilityList: [], //能力考核
                valueList: [], //价值观
                employeeList: [],
                employeeTypeList: [{
                        label: "基层",
                        value: "基层"
                    },
                    {
                        label: "中层",
                        value: "中层"
                    },
                    {
                        label: "班长",
                        value: "班长"
                    }
                ],
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
                reviewTypeList: [],
                total: 0,
                page: 1,
                pageSize: 10,
            }
        },
        mounted() {
            this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
            this.formSearch.review_date = Util.dateFormat(new Date,'yyyy-MM-dd')
            this.getEmployeeList()
            this.formSearch.review_period = '2019年上半年'
        },
        activated() {

        },
        methods: {
            getData() {
                let data = {}
                data.type = 'employee'
                data.employee_type = this.formSearch.employee_type
                this.valueList = []
                this.abilityList = []
                this.request('get_performance_target_list_data', data, true).then((res) => {
                    if (res.errno == 0) {
                        for (let item of res.data) {
                            item.processScoreList = this.generateScoreLevelList(item.process_score)
                            item.resultScoreList = this.generateScoreLevelList(item.result_score)
                             item.process_score =null
                             item.result_score =null
                            if (item.target_type == '价值观考核') {
                                this.valueList.push(item)
                            } else if (item.target_type == '能力考核') {
                                this.abilityList.push(item)
                            }
                        }

                        this.valueList.push({
                            serialNo: '评分合计',
                            process_score:0,
                            result_score:0,
                            finally_score:0
                        })

                         this.abilityList.push({
                            serialNo: '评分合计',
                            process_score:0,
                            result_score:0,
                            finally_score:0
                        })
                    }
                })
            },
            cancel(){
                this.visible = false
            },
            saveClick(){
                let data = Util.deepClone(this.formSearch)
                data.overall_evaluation = this.overallEvaluation
                data.list=this.valueList
                data.list = data.list.concat(this.abilityList)
                for(let item of data.list){
                    // delete item.processScoreList
                    // delete item.resultScoreList
                }
                 this.request('save_performance_review_data', data, '正在保存...').then((res) => {
                      if (res.errno == 0) {
                          this.$Message.success('保存成功');
                          let id = res.data
                          this.visible = false
                          this.getData()
                          this.formSearch.employee_id = ''
                          this.formSearch.org_department_name = ''
                          this.formSearch.org_department_root_name = ''
                          this.formSearch.employee_type = ''
                          this.formSearch.level_name = ''
                          this.formSearch.review_type = ''
                          this.formSearch.weight = ''
                          this.formSearch.score = ''
                          this.overallEvaluation = ''
                    } else {
                         this.$Message.warning(res.errmsg);
                    }
                })
            },
            save() {
                let data = Util.deepClone(this.formSearch)
                data.overall_evaluation = this.overallEvaluation
                data.list=this.valueList
                data.list = data.list.concat(this.abilityList)
                for(let item of data.list){
                    // delete item.processScoreList
                    // delete item.resultScoreList
                }
                if(!this.formSearch.review_type) return  this.$Message.warning('评委类型不能为空')
                if(this.abilityList[0].result_score == null ||this.abilityList[1].result_score == null ||this.abilityList[2].result_score == null ||this.abilityList[3].result_score == null 
                ||this.abilityList[0].process_score == null ||this.abilityList[1].process_score == null ||this.abilityList[2].process_score == null ||this.abilityList[3].process_score == null 
                ||this.valueList[0].result_score == null ||this.valueList[1].result_score == null ||this.valueList[2].result_score == null ||this.valueList[3].result_score == null 
                ||this.valueList[4].result_score == null ||this.valueList[5].result_score == null ){
                    this.$Message.warning('数据不完整，请填写！')
                }else{
                    if(this.overallEvaluation == ''){
                        this.$Message.warning('整体评价为空，请填写！')
                    }else{
                        this.visible = true;
                //         this.request('save_performance_review_data', data, '正在保存...').then((res) => {
                //       if (res.errno == 0) {
                //           this.$Message.success('保存成功');
                //           let id = res.data


                //         //   this.$router.push({
                //         //   name: 'employee-review-detail',
                //         //     params: {
                //         //         reviewId: id,
                //         //     }
                //         //   });
                //     } else {
                //          this.$Message.warning(res.errmsg);
                //     }
                // })
                    }
                }
            },
            getEmployeeList() {
                this.request('get_employee_list', {}, false).then((res) => {
                    if (res.errno == 0) {
                        console.log(res.data,'0909798787678764')
                        this.employeeList = res.data
                    }
                })
            },
            employeeChange() {
                for (let item of this.employeeList) {
                    if (item.id == this.formSearch.employee_id) {
                        this.formSearch.level_name = item.level_name
                        this.formSearch.org_department_name = item.org_department_name
                        this.formSearch.org_department_root_name = item.org_department_root_name
                        this.formSearch.employee_type = item.employee_type
                        this.overallEvaluation = ''
                        this.getData()
                        this.getReviewTypeList()
                        this.getCzjlList(item.id)
                        break;
                    }
                }
                this.formSearch.review_type = ''
                this.formSearch.weight = ''
            },
            getCzjlList(v){
                for (let item of this.employeeList) {
                    if (item.id == this.formSearch.employee_id) {
                        console.log('-0-0-0-')
                        let userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
                 this.request('get_examine_detail_list',{data:{id:item.id,start:(this.page-1)*this.pageSize,length:this.pageSize,user_id:userInfo.userId}
                },false).then((res)=>{
                    if(res.code == '1'){
                        this.total = res.data.count
                        this.listDhxd = res.data.examineDetailList
                        console.log(this.listDhxd,'-=-=-=')
                    }else{
                        console.log('-0-0')
                    }  
                })  
                    }
                }   
            },
            currentChange(page) {
                this.page = page
                this.getCzjlList()
            },
            sizeChange(pageSize) {
                this.pageSize = pageSize
                this.getCzjlList()
            },
            getReviewTypeList(){
                this.request('get_review_type_list',{
                    type:'employee',
                    employee_type:this.formSearch.employee_type
                },false).then((res)=>{
                       this.reviewTypeList = res.data
                })     
            },
            employeeTypeChange() {
                this.getData()
            },
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
             reviewTypeChange(){
                 console.log('900909')
              this.formSearch.weight =null
                this.formSearch.score=null
                for(let item of this.reviewTypeList){
                    if(item.value == this.formSearch.review_type){
                           this.formSearch.weight = item.weight
                           this.updateScore()
                           break
                    }
                }
                console.log(this.formSearch.review_type,'4343434343')
                if(this.formSearch.review_type !== undefined){
                     this.request('employee_review_exist',{data:{review_period:this.formSearch.review_period,type:'employee',review_type:this.formSearch.review_type,employee_id:this.formSearch.employee_id}
                },false).then((res)=>{
                        console.log('090909zhanzhanzhanzhanzhanzhanzhanz')
                })     
                }
            },
            updateScore(){
                let total_value_process_score =0
                let total_value_result_score =0
                let total_value_finally_score =0

                for(let item of this.valueList){
                    if(item.serialNo=='评分合计'){
                        item.process_score = total_value_process_score
                        item.result_score = total_value_result_score
                        item.finally_score = total_value_finally_score

                    }else{
                        total_value_process_score += Util.toNumber(item.process_score)
                        total_value_result_score += Util.toNumber(item.result_score)
                        total_value_finally_score+=Util.toNumber(item.finally_score)
                    }
                }
                this.nlkhpfb = total_value_finally_score
                console.log(total_value_finally_score,'11111111111111')

                let total_ability_process_score =0
                let total_ability_result_score =0
                let total_ability_finally_score =0

               for(let item of this.abilityList){
                    if(item.serialNo=='评分合计'){
                        item.process_score = total_ability_process_score
                        item.result_score = total_ability_result_score
                        item.finally_score = total_ability_finally_score

                    }else{
                        total_ability_process_score += Util.toNumber(item.process_score)
                        total_ability_result_score += Util.toNumber(item.result_score)
                        total_ability_finally_score+=Util.toNumber(item.finally_score)
                    }
                }
                this.jzgkhpfb = total_ability_finally_score
                console.log(total_ability_finally_score,'222222222222222222')

                //计算总分

                this.formSearch.score = (0.5 * total_value_finally_score + 0.5 * total_ability_finally_score) / 100 * Util.toDecimal(this.formSearch.weight)
                this.formSearch.score = Util.toDecimal(this.formSearch.score)
            }
        },
    }
</script>
