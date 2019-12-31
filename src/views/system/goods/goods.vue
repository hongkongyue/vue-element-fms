<template>
<div style="padding-bottom:10px" class="background-color-white exhibition" id="goods_spec">
    <div >
        <Row class="margin-bottom-10">
            <Col span="24" class="search">
            <Form :model="formSearch" :label-width="100" inline label-position="right">
                <Row>
                     <Form-item label="分类:">
                          <treeselect maxHeight="150" style="width:150px"   placeholder="请选择分类" v-model="formSearch.class_id" :multiple="true" :options="classList" />
                    </Form-item>
                    <Form-item label="款号:">
                     <Input style="width:100px" size="small" v-model="formSearch.goods_no" placeholder="请输入款号"></Input>
                    </Form-item>
                     <Form-item label="商品名称:">
                     <Input style="width:180px" size="small" v-model="formSearch.goods_name" placeholder="请输入商品名称"></Input>
                    </Form-item>
                    <Form-item label="年份:">
                     <Input style="width:100px" size="small" v-model="formSearch.year" placeholder="请输入年份"></Input>
                    </Form-item>
                     <Form-item label="季节:">
                     <Input style="width:100px" size="small" v-model="formSearch.season" placeholder="请输入季节"></Input>
                    </Form-item>
                    <Form-item :label-width="1">
                        <Button type="primary" size="small" @click="search" icon="ios-search">查询</Button>
                        <Button type="default" size="small" @click="handleReset">重置</Button>
                    </Form-item>
                </Row>
            </Form>
            </Col>
            <Col span="24">
            <Table height="300"  size="small" :columns="columns" :data="list" border highlight-row  @on-select-all='selectTable' @on-select="selectTable"></Table>
            </Col>
        </Row>
        <Row>
            <Page :total="total" size="small" :page-size-opts="[10,20,30,'全部']" :page-size="pageSize" :current="page" show-sizer show-total show-elevator @on-change="changePage" @on-page-size-change="changePageSize"></Page>
        </Row>
    </div>
</div>
</template>

<script>
    import Util from 'libs/util';
    import {mapState} from 'vuex'
    export default {
        name: 'goods_chose',
        props: {
            brand_id: Number ,
            _list: Array
        },
        data() {
            return {
               columns: [
                     {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '款号',
                        key: 'goods_no',
                         width: 120,
                    },
                    {
                        title: '商品名称',
                        key: 'goods_name'
                    },
                    {
                        title: '品牌',
                        key: 'brand_name',
                        width: 120,
                    },
                    {
                        title: '分类',
                        key: 'class_name',
                        width: 150,
                    },
                    {
                        title: '年份',
                        key: 'prop1',
                        width: 80,
                    },
                     {
                        title: '季节',
                        key: 'prop2',
                        width: 80,
                    }
                ],
                list:[],
                classList:[],
                formSearch:{},
                pageSize:20,
                total:0,
                page:1,
                _list:[]
            }
        },
        methods: {
            search(){
               this.getGoodsList()
            },
            getGoodsList(){
              let data = this.formSearch
               data.page = this.page
               data.pageSize = this.pageSize == '全部' ? '' : this.pageSize
               data.brand_id = this.brand_id
              this.request('get_goods_list',data,'正在查询商品...').then((res)=>{
                    this.list = !!data.pageSize ? res.data.data : res.data;
                    this.total = !!data.pageSize ? res.data.count : res.data.length;
                    for(let x of this._list){
                        this.list.map(y=>{
                            if(x.goods_no == y.goods_no){
                                y._disabled = true;
                            }
                        })
                    }
              })
            },
              getClassList(){

              this.request('get_class_list',{},false).then((res)=>{
                      this.classList = res.data
              })
            },
            
            selectTable(selection,row){
                this.$parent.goods = selection;
            },
            changePage(page){
               this.page = page;
               this.search()
            },
            changePageSize(pageSize){
               this.pageSize = pageSize
               this.search()
            }
        },
        computed: {
            ...mapState({
                _list: state => state.common._list
            })
        },
        mounted() {
            this.getClassList()
        }
    }
</script>
<style>
   
</style>

