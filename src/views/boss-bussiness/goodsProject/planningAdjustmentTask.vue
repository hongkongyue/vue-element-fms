<template>
        <div>
             <Row class="margin-bottom-10 background-color-white exhibition" style="padding-left:20px" :style="{minHeight:showBink?'820px':'620px'}">
                <Tabs type="card" @on-click="getInitRequest">
                        <TabPane label="待完成" name="a">
                             <wait-a ref="aa"></wait-a>
                        </TabPane>
                        <TabPane label="进行中" name="b" >
                            <going-b  ref="bb"></going-b>
                        </TabPane>
                        <TabPane label="已完成" name="c">
                            <completed-c  ref="cc"></completed-c>
                        </TabPane>
                </Tabs>
             </Row>
       </div>
</template> 

<script>
    // import Util from 'libs/util'
    import waitA from '../list/fabricwait.vue'
    import goingB  from '../list/fabricgoing.vue'
    import completedC from '../list/fabriced.vue'
    import {debounce} from 'mixins/debounce'
    function formSearch() {
        return {
            search: ''
        }
    }
    export default {
        mixins: [debounce],
        data() {
            return {
            }
        },
        components:{
                  waitA,
                  goingB,
                  completedC
        },
        mounted() {
        },
        activated() {

        },
        methods: {
                getInitRequest(name){
                      console.log(name)
                      if(name=='a'){
                            this.$refs.aa.initdata()
                      } else if(name=='b'){
                            this.$refs.bb.initdata()
                      }else if(name=='c'){
                            this.$refs.cc.initdata()
                      }        
                }       
        }       
    }
</script>

<style>
    .ivu-modal-footer{
        border-top:0;
    }
        .demo-upload-list{
            display: inline-block;
            width: 60px;
            height: 60px;
            text-align: center;
            line-height: 60px;
            border: 1px solid transparent;
            border-radius: 4px;
            overflow: hidden;
            background: #fff;
            position: relative;
            box-shadow: 0 1px 1px rgba(0,0,0,.2);
            margin-right: 4px;
        }
        .demo-upload-list img{
            width: 100%;
            height: 100%;
        }
        .demo-upload-list-cover{
            display: none;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0,0,0,.6);
        }
        .demo-upload-list:hover .demo-upload-list-cover{
            display: block;
        }
        .demo-upload-list-cover i{
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            margin: 0 2px;
        }
</style>
