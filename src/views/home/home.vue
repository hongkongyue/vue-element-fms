<style lang="less">
    @import "./home.less";

    .fastMenu {
        margin-bottom: 8px;
    }

    .home-main-modal .ivu-modal-body {
        padding: 10px 0;
    }

    .home-main .ivu-card-body {
        padding: 10px 0;
    }

    .fastMenu .res_item {
        display: inline-block;
        margin: 0 5px;width:50px;text-align:center;
    }

    .fastMenu .res_item:hover, .home-main-modal .res_item:hover {
        cursor: pointer;
    }

    .fastMenu p {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #2D8CF0;
        transition: all 0.3s;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
    }

    .fastMenu .shadow {
        box-shadow: 0px 1px 10px black;
    }

    .fastMenu .item_title {
        display: inline-block;
        width: inherit;
        text-align: center;
        color: grey;
        font-size: x-small;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .fastMenu img {
        margin-top: -12px;
        margin-left: -12px;
        width: 60px;
        min-height: 40px;
    }
    .fastMenu .third_party_system_img{
        height: 100%;
        margin: 0px;
        width: auto;
    }
    .home-main-modal ul {
        transition: all 0.3s;
        box-sizing: border-box;
        display: inline-block;
    }

    .home-main-modal img {
        width: 100px;
        min-height: 130px
    }

    .home-main-modal li {
        float: left;
        position: relative;
        margin: 0 10px;
    }

    .home-main-modal .modal_content {
        height: 500px;
        overflow: auto;
        position: relative;
    }

    .home-main-modal .ivu-modal-header p,
    .home-main-modal .ivu-modal-header-inner {
        color: #999;
    }

    .home-main-modal .ivu-modal-header {
        border-bottom: 1px solid #e9eaec;
        padding: 14px 16px;
        line-height: 1;
        border-top: 5px solid #0088FF;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }

    .home-main-modal .ivu-input-group .ivu-input {
        float: right;
        width: 200px;
    }

    .home-main-modal .ivu-input {
        border: 1px solid #aaa;
    }

    .home-main-modal .ivu-input-group-append,
    .home-main-modal .ivu-input-group-prepend {
        border: 1px solid #aaa;
        border-left: 0px;
    }

    .home-main-modal .res_item {
        position: relative;
        top: 0;
        left: 0;
        margin: 0 20px;
    }

    .home-main-modal .search {
        margin: 0 20px;
        border-bottom: solid 1px #7DC1FD;
        height: 40px;
        margin-bottom: 2px;
    }

    .home-main-modal .Virtual_block {
        position: absolute;
        bottom: 0;
        width: 100px;
        height: 30px;
        line-height: 30px;
    }
    .home-main-modal .Virtual_block span{
        display: block;
        color: rgb(255,255,255);
        font-size: 14px;
        width:100px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        text-align:center;
    }
    .home-main-modal .ivu-modal-body {
        background: url('../../assets/quick_img/bg1.jpg') #FFF;
    }

    @media screen and (min-width: 1366px) {
        .home-main-modal > .ivu-modal {
            width: 1020px !important;
        }

        .home-main-modal .content {
            width: 960px !important;
            overflow: auto;
        }
    }

    @media screen and (max-width: 1366px) and (min-width: 1246px) {
        .home-main-modal > .ivu-modal {
            width: 900px !important;
        }

        .home-main-modal .content {
            width: 840px !important;
            overflow: auto;
        }
    }

    @media screen and (max-width: 1246px) and (min-width: 1126px) {
        .home-main-modal > .ivu-modal {
            width: 780px !important;
        }

        .home-main-modal .content {
            width: 720px !important;
            overflow: auto;
        }
    }

    @media screen and (max-width: 1126px) and (min-width: 1006px) {
        .home-main-modal > .ivu-modal {
            width: 660px !important;
        }

        .home-main-modal .content {
            width: 600px !important;
            overflow: auto;
        }
    }

    @media screen and (max-width: 1006px) and (min-width: 886px) {
        .home-main-modal > .ivu-modal {
            width: 540px !important;
        }

        .home-main-modal .content {
            width: 480px !important;
            overflow: auto;
        }
    }

    @media screen and (max-width: 886px) and (min-width: 766px) {
        .home-main-modal > .ivu-modal {
            width: 420px !important;
        }

        .home-main-modal .content {
            width: 360px !important;
            overflow: auto;
        }
    }

    @media screen and (max-width: 766px) {
        .home-main-modal > .ivu-modal {
            width: 300px !important;
        }

        .home-main-modal .content {
            width: 240px !important;
            overflow: auto;
        }
    }
    .home-main .system_link .ivu-card-body{
         display: flex;
         justify-content: space-around;
    }
</style>
<template>
<div class="home-main">
    <Row :gutter="10">
        <Col span="8" class="fastMenu system_link">
        <Card>
            <div v-for="(item,index) in third_party_system_list" v-bind:key="index" class="res_item" @mouseenter="mouseEnter(item.ref,index)" 
                @mouseleave="mouseLeave(item.ref,index)" @click='third_party_jump(item.ref)'>
                <p :ref="item.ref" :style="{background:item.ref == 'FineReport' ? '' : 'white','margin-left':'5px'}">
                    <img :src="item.img_url" :title="item.title"
                        class="third_party_system_img"
                        :style="{
                            transform:item.ref == 'FineReport' ? 'scale(0.6)' : '',
                            width:item.ref == 'SCM' || item.ref == 'GLTTX' || item.ref == 'YLTTX' ? '40px' : '',
                            height:item.ref == 'SCM'  || item.ref == 'GLTTX' || item.ref == 'YLTTX' ? '20px' : '',
                            'margin-top':item.ref == 'SCM'  || item.ref == 'GLTTX' || item.ref == 'YLTTX' ? '10px' : '',
                            'min-height':item.ref == 'SCM'  || item.ref == 'GLTTX' || item.ref == 'YLTTX' ? '0' : '',
                        }"
                        :alt="item.img_alt">
                </p>
                <a class="item_title" :title="item.title">{{item.title}}</a>
            </div>
        </Card>
        </Col>
        <Col span="16" class="fastMenu">
        <Card>
            <div v-for="(item,index) in user_resource" v-bind:key="index" class="res_item" style="margin-right:10px" @mouseenter="mouseEnter('fastMenu',index)"
                @mouseleave="mouseLeave('fastMenu',index)" @click="$router.push({name:item.menuUrl})">
                <p ref="radius_btn" style="margin-left:5px">
                    <img :title="item.resourceName" :src="!!item.resourcePicurl ? hostname + item.resourcePicurl + '?t='+Math.random() : defaultImg"
                        :alt="item.resourceName">
                </p>
                <a class="item_title" :title="item.resourceName">{{item.resourceName}}</a>
            </div>
            <div style="display: inline-block;cursor: pointer;margin-left:5px;position: relative" @mouseenter="mouseEnter('addQuick')"
                @mouseleave="mouseLeave('addQuick')" @click="openModal">
                <p ref="add_btn" style="background: lightgray"></p>
                <Icon type="md-add" style="position: absolute;top:8px;left:10px;color:#808695;font-size: 25px"></Icon>
                <a class="item_title">添加快捷</a>
            </div>
        </Card>
        </Col>
        <Col span="24">
        <Row class-name="home-page-row1" :gutter="10">
            <Col span="8" :style="{marginBottom: '10px'}">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="volume-high"></Icon>
                    系统公告
                </p>
                <!-- <announcement></announcement> -->
                <div style="height:150px"></div>
            </Card>
            </Col>
            <Col span="8" :style="{marginBottom: '10px'}">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="android-checkbox-outline"></Icon>
                    更新日志
                </p>
                <update-log></update-log>
                <!-- <div style="height:150px"></div> -->
            </Card>
            </Col>
            <Col span="8" :style="{marginBottom: '10px'}">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="help-circled"></Icon>
                    帮助中心
                </p>
                <div >
                    <!-- <help-center></help-center> -->
                    <!-- <announcement></announcement> -->
                    <div style="height:150px"></div>
                </div>
            </Card>
            </Col>
        </Row>
        </Col>
    </Row>
    <Row :gutter="10">
         <!-- <Col span="8">
            <Card>
                <p slot="title" class="card-title">
                     <RadioGroup v-model="workTimeType" @on-change="workTimeTypeChange" >
                        <Radio label="lastDay">
                            <span>昨天</span>
                        </Radio>
                        <Radio label="thisWeek">
                            <span>本周</span>
                        </Radio>
                        <Radio label="lastWeek">
                            <span>上周</span>
                        </Radio>
                     </RadioGroup>
                </p>
                <department-work-time-report :work_time_type="workTimeType"></department-work-time-report>
            </Card>
       </Col> -->
      
        <!-- <Col span="8">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="stats-bars"></Icon>
                    近7天EOP登录统计
                </p>
                <login-log-report></login-log-report>
            </Card>
       </Col> -->
        
        <!-- <Col span="8">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="stats-bars"></Icon>
                    近7天内购订单数/订单金额
                </p>
                <staff-order-neigou-report></staff-order-neigou-report>
            </Card>
       </Col> -->
    </Row>
    <div>
        <Modal v-model="modal_visible" title="添加快捷" :mask-closable="false" scrollable="true" :height="600" class-name="home-main-modal">
            <div class="search" @keyup.enter.prevent="searchApp">
                <Input v-model="search" placeholder="请输入你要查询的应用...">
                <Button slot="append" icon="ios-search" @click="searchApp"></Button>
                </Input>
            </div>
            <div class="modal_content" ref="modal_content" @mouseenter="mouseEnter('modal_content')" @mouseleave="mouseLeave('modal_content')">
                <div v-for="(item,index) in Level_One_Res" v-bind:key="index" class="res_item">
                    <div style="margin:5px 0px 5px 10px;font-size: 14px;color: #6B6C6B;">{{item.resourceName}}</div>
                    <div class="content">
                        <ul :style="{ 'width': item.resouceList.length * 120 + 'px' }" ref="content_ul">
                            <li v-for="(x,y) in item.resouceList" style="font-size:0;width:100px;height:130px" v-bind:key="y" @mouseenter="mouseEnter('Virtual_block',y,index,x)"
                                @mouseleave="mouseLeave('Virtual_block',y,index,x)" @click="click_contentItem(index,y,x)">
                                <img :src="!!x.resourcePicurl ? hostname + x.resourcePicurl : defaultImg" :alt="x.resourceName">
                                <div ref="Virtual_block" class="Virtual_block" v-if="!x.isCheck">
                                    <span>{{ x.resourceName }}</span>
                                </div>
                                <div class="Virtual_block" style="background: rgb(128,128,128,0.6)" v-else>
                                    <span>{{ x.resourceName }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <Button type="primary" @click="ok">确 定</Button>
                <Button type="default" @click="modal_visible = false">取消</Button>
            </div>
        </Modal>
    </div>
</div>
</template>

<script>
    import homeMap from './components/map.vue';
    import dataSourcePie from './components/dataSourcePie.vue';
    import visiteVolume from './components/visiteVolume.vue';
    import serviceRequests from './components/serviceRequests.vue';
    import userFlow from './components/userFlow.vue';
    import countUp from './components/countUp.vue';
    import inforCard from './components/inforCard.vue';
    import mapDataTable from './components/mapDataTable.vue';
    import toDoListItem from './components/toDoListItem.vue';
    import updateLog from './components/updateLog.vue';
    import announcement from './components/announcement.vue';
    import helpCenter from './components/helpCenter.vue';
    import staffOrderNeigouReport from './components/staffOrderNeigouReport.vue';
    import departmentWorkTimeReport from './components/departmentWorkTimeReport.vue'
    import loginLogReport from './components/loginLogReport.vue'
    import {mapState} from 'vuex';
    import Util from 'libs/util'

    export default {
        name: 'home_index',
        components: {
            homeMap,
            dataSourcePie,
            visiteVolume,
            serviceRequests,
            userFlow,
            countUp,
            inforCard,
            mapDataTable,
            toDoListItem,
            updateLog,
            helpCenter,
            announcement,
            staffOrderNeigouReport,
            departmentWorkTimeReport,
            loginLogReport
        },
        data() {
            return {
                timeAA:null,
                toDoList: [
                ],
                count: {
                    createUser: 496,
                    visit: 3264,
                    collection: 24389305,
                    transfer: 39503498
                },
                ResourceList: [],
                showAddNewTodo: false,
                newToDoItemValue: '',
                modal_visible: false,
                user_resource: [],
                ResourceList_All: [],
                Level_One_Res: [],
                temp_Level_One_Res: [],
                search: '',
                hostname:'',
                defaultImg:'',
                workTimeType:'lastDay',
                userInfo:{},
                third_party_system_list:[
                    {
                        title:'帆软报表',
                        ref:'FineReport',
                        img_url:require('../../assets/FineReport.png'),
                        img_alt:'帆软报表系统'
                    },
                    {
                        title:'OA系统',
                        ref:'OA',
                        img_url:require('../../assets/OA.png'),
                        img_alt:'OA系统'
                    },
                    {
                        title:'SCM系统',
                        ref:'SCM',
                        img_url:require('../../assets/scm.png'),
                        img_alt:'SCM系统'
                    },
                    {
                        title:'瓜沥',
                        ref:'GLTTX',
                        img_url:require('../../assets/TTX.png'),
                        img_alt:'瓜沥通天晓系统'
                    },
                    {
                        title:'宇隆',
                        ref:'YLTTX',
                        img_url:require('../../assets/TTX.png'),
                        img_alt:'宇隆通天晓系统'
                    }
                ]
            };
        },
        computed: {
            avatorPath() {
                return localStorage.avatorImgPath;
            },
            ...mapState({
                menuList: state => state.app.menuList
            })
        },
        watch: {},
        mounted() {
            
            this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
            console.log(this.userInfo)
            // this.get_user_resource();
            this.hostname = window.location.origin + '/eop/';
            this.defaultImg = require('../../assets/quick_img/d_todoevent.png');
        },
        methods: {
            //获取所有key    
        //     validTypes.forEach((item) => {
        //   certainType[item] = item === type;
        // });
            
            get_user_resource() {
                this.request('get_user_resource', {
                    data: {
                        userId: this.userInfo.userId
                    }
                }, true).then(res => {
                    if (res.code == 1) {
                        this.user_resource = res.data;
                    }
                })
            },
            GetResourceList() {
                this.request('get_urpr_by_type', {data: {type: 4}}, true).then(res => {
                    this.ResourceList_All = res.data.res;
                    this.getResourceList(this.menuList).then(data => {
                        data.map(x => {
                            this.setLevelOneRes(x);
                        })
                    });
                    this.menuList.map(x => {
                        if (x.menuLevel == 1) {
                            this.Level_One_Res.push({
                                resourceName: x.resourceName,
                                resourceId: x.resourceId,
                                resouceList: []
                            })
                        }
                    })
                })
            },
            getResourceList(arr) {
                return new Promise((resolve, reject) => {
                    arr.map(x => {
                        if (x.childrenResource && x.childrenResource.length != 0) {
                            this.getResourceList(x.childrenResource)
                        } else {
                            if (x.isLeaf == 1) {
                                this.ResourceList.push(x)
                            }
                        }
                    })
                    resolve(this.ResourceList)
                })
            },
            setLevelOneRes(obj) {
                this.ResourceList_All.map((k, j) => {
                    if (obj.parentId == k.resourceId) {
                        if (k.menuLevel == 1) {
                            this.Level_One_Res.map(x => {
                                if (k.resourceName == x.resourceName) {
                                    let data;
                                    data = x.resouceList.filter(y => {
                                        return y.resourceId == obj.resourceId
                                    })
                                    if (data.length == 0) {
                                        obj.isCheck = false;
                                        x.resouceList.push(obj)
                                    }
                                }
                            })
                        } else {
                            obj.parentId = k.parentId;
                            this.setLevelOneRes(obj);
                        }
                    }
                })
                this.user_resource.map(x => {
                    this.Level_One_Res.map((k, j) => {
                        k.resouceList.map((z, v) => {
                            if (x.resourceId == z.resourceId) {
                                this.$set(this.Level_One_Res[j].resouceList[v], 'isCheck', true);
                            }
                        })
                    })
                })
                this.temp_Level_One_Res = this.Level_One_Res;
            },
            click_contentItem(ul_index, li_index, li_item) {
                let Level_One_Res = Util.deepClone(this.Level_One_Res);
                this.temp_Level_One_Res.map((x, y) => {
                    x.resouceList.map((k, j) => {
                        if (li_item.resourceId == k.resourceId) {
                            this.temp_Level_One_Res[y].resouceList[j].isCheck = !this.temp_Level_One_Res[y].resouceList[j].isCheck
                        }
                    })
                })
                Level_One_Res[ul_index].resouceList[li_index].isCheck = !Level_One_Res[ul_index].resouceList[li_index].isCheck;
                this.$set(this, 'Level_One_Res', Level_One_Res);
            },
            mouseEnter(type, index, _index, item) {
                switch (type) {
                    case 'FineReport':
                        this.$refs['FineReport'][0].className = 'shadow';
                        break; 
                    case 'OA':
                        this.$refs['OA'][0].className = 'shadow';
                        break;  
                    case 'SCM':
                        this.$refs['SCM'][0].className = 'shadow';
                        break;                     
                    case 'fastMenu':
                        this.$refs['radius_btn'][index].className = 'shadow';
                        break;
                    case 'addQuick':
                        this.$refs['add_btn'].className = 'shadow';
                        break;
                    case 'modal_content':
                        this.$refs['modal_content'].style.overflow = 'auto';
                        break;
                    case 'GLTTX':
                        this.$refs['GLTTX'][0].className = 'shadow';
                        break;  
                    case 'YLTTX':
                        this.$refs['YLTTX'][0].className = 'shadow';
                        break;      
                    case 'Virtual_block':
                        if (!item.isCheck) {
                            this.$refs['content_ul'][_index]
                                .getElementsByTagName('li')[index]
                                .getElementsByTagName('div')[0].style = "background: rgb(128,128,128,0.6)"
                        }
                        break;
                    default:
                        break;
                }
            },
            mouseLeave(type, index, _index, item) {
                switch (type) {
                    case 'FineReport':
                        this.$refs['FineReport'][0].className = '';
                        break;
                    case 'OA':
                        this.$refs['OA'][0].className = '';
                        break;
                    case 'SCM':
                        this.$refs['SCM'][0].className = '';
                        break;
                    case 'GLTTX':
                        this.$refs['GLTTX'][0].className = '';
                        break;  
                    case 'YLTTX':
                        this.$refs['YLTTX'][0].className = '';
                        break;  
                    case 'fastMenu':
                        this.$refs['radius_btn'][index].className = '';
                        break;
                    case 'addQuick':
                        this.$refs['add_btn'].className = '';
                        break;
                    case 'modal_content':
                        this.$refs['modal_content'].style.overflow = 'hidden';
                        break;
                    case 'Virtual_block':
                        if (!item.isCheck) {
                            this.$refs['content_ul'][_index]
                                .getElementsByTagName('li')[index]
                                .getElementsByTagName('div')[0].style = "background: none"
                        }
                        break;
                    default:
                        break;
                }
            },
            searchApp() {
                let data = Util.deepClone(this.temp_Level_One_Res);
                if (!this.search) {
                    this.Level_One_Res = data;
                } else {
                    let newData = [];
                    data.map((x, y) => {
                        x.resouceList.filter((k, j) => {
                            if (k.resourceName.indexOf(this.search) != -1) {
                                let arr = newData.filter(z => {
                                    return z.resourceName == x.resourceName
                                })
                                if (arr.length == 0) {
                                    let pushData = x;
                                    pushData.resouceList = [];
                                    pushData.resouceList.push(k);
                                    newData.push(pushData);
                                } else {
                                    newData.map((q, w) => {
                                        if (q.resourceName == x.resourceName) {
                                            newData[w].resouceList.push(k)
                                        }
                                    })
                                }
                            }
                        })
                    })
                    // this.Level_One_Res = newData;
                    this.$set(this, 'Level_One_Res', newData);
                }
            },
            openModal() {
                this.search = '';
                this.modal_visible = true;
                this.ResourceList = [];
                this.ResourceList_All = [];
                this.Level_One_Res = [];
                this.temp_Level_One_Res = [];
                this.$store.dispatch('updateMenuList').then(() => {
                    this.GetResourceList();
                });
            },
            ok() {
                let data = Util.deepClone(this.temp_Level_One_Res);
                let list = [];
                data.map(x => {
                    x.resouceList.map(y => {
                        if (y.isCheck) {
                            list.push({
                                resourceId: y.resourceId,
                                userId: this.userInfo.userId
                            })
                        }
                    })
                })
                this.request('add_user_resource', {
                    data: {
                        list: list
                    }
                }).then(res => {
                    if (res.code == 1) {
                        this.modal_visible = false;
                        this.get_user_resource();
                    }
                })
            },
            addNewToDoItem() {
                this.showAddNewTodo = true;
            },
            addNew() {
                if (this.newToDoItemValue.length !== 0) {
                    this.toDoList.unshift({
                        title: this.newToDoItemValue
                    });
                    setTimeout(() => {
                        this.newToDoItemValue = '';
                    }, 200);
                    this.showAddNewTodo = false;
                } else {
                    this.$Message.error('请输入待办事项内容');
                }
            },
            cancelAdd() {
                this.showAddNewTodo = false;
                this.newToDoItemValue = '';
            },
            workTimeTypeChange(value){
                //console.log(value)
            },
            third_party_jump(value){
                let that = this;                
                switch(value){
                    case 'FineReport':
                        let host = location.origin
                        let password = Util.JSEncrypt('decrypt',window.sessionStorage.getItem('password'));
                        this.jsonp(`${host}/WebReport/ReportServer?op=fs_load&cmd=sso&fr_username=${this.userInfo.userAccount}&fr_password=${password}`, {
                        
                        }, function (err, data) {
                            if (err) {
                                that.$Message.error(err.message);
                            } else {
                                if (data.status === "success") {
                                    if (data.url == 'http://eop.quanshangtech.com:80/WebReport/ReportServer?op=fs') {
                                        data.url = 'http://eop.quanshangtech.com:888/WebReport/ReportServer?op=fs'
                                    }
                                    window.open(data.url); //认证成功跳转页面，因为ajax不支持重定向所有需要跳转的设置   
                                } else if (data.status === "fail") {
                                    that.$Message.warning("用户名或密码错误"); //登录失败（用户名或密码错误）    
                                }
                            }
                        });
                        break;
                    case 'OA':
                        window.open('http://oa.eptison.com:8000');
                        break;
                    case 'SCM':
                        window.open('http://scm.eptison.com:8008/scm/P/Default.aspx');
                        break;
                    case 'GLTTX':
                        window.open('https://122.224.139.26:30104/wms.html?customer=wms&lang=zh');
                        break;  
                    case 'YLTTX':
                        window.open('http://183.129.162.50:30015/wms.html?customer=wms&lang=zh');
                        break; 
                    default:
                        break;
                }
                
            }
        }
    };
</script>
